import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import COS from "cos-nodejs-sdk-v5";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { BREED_PROFILES } from "./src/breedProfiles";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Lazy initializer for Gemini client to prevent crashes if key is missing on startup
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key === "") {
      throw new Error("GEMINI_API_KEY is missing or unconfigured. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Pre-packaged offline breed profiles shared with the frontend
const OFFLINE_BREEDS = BREED_PROFILES;

// Tencent Cloud COS client (optional — falls back to local disk if not configured)
const cosClient = (() => {
  const secretId = process.env.TENCENT_COS_SECRET_ID;
  const secretKey = process.env.TENCENT_COS_SECRET_KEY;
  if (!secretId || !secretKey || secretId === "MY_TENCENT_COS_SECRET_ID" || secretKey === "MY_TENCENT_COS_SECRET_KEY") {
    console.log("[CatScope COS] COS credentials not configured; using local disk storage for images.");
    return null;
  }
  return new COS({ SecretId: secretId, SecretKey: secretKey });
})();

const COS_BUCKET = process.env.TENCENT_COS_BUCKET || "";
const COS_REGION = process.env.TENCENT_COS_REGION || "";
const COS_PREFIX = (process.env.TENCENT_COS_PREFIX || "catscope").replace(/\/$/, "");

// Ensure user-uploaded scan images are persisted on disk
const IMAGES_BASE_DIR = path.join(process.cwd(), "data", "images");

function sanitizeUserId(userId: string): string {
  return userId.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
}

function getExtensionFromMimeType(mimeType: string): string {
  switch (mimeType) {
    case "image/png": return "png";
    case "image/webp": return "webp";
    case "image/gif": return "gif";
    default: return "jpg";
  }
}

function looksLikeBase64(value: string): boolean {
  return /^[A-Za-z0-9+/]+={0,2}$/.test(value) && value.length > 100;
}

async function saveUserImage(userId: string, base64Image: string, mimeType: string) {
  const sanitized = sanitizeUserId(userId);
  const ext = getExtensionFromMimeType(mimeType || "image/jpeg");
  const filename = `${Date.now()}.${ext}`;
  const buffer = Buffer.from(base64Image, "base64");

  // Try uploading to Tencent Cloud COS first if configured
  if (cosClient && COS_BUCKET && COS_REGION) {
    const key = `${COS_PREFIX}/${sanitized}/${filename}`;
    try {
      const result = await cosClient.putObject({
        Bucket: COS_BUCKET,
        Region: COS_REGION,
        Key: key,
        Body: buffer,
        ContentLength: buffer.length,
      });
      const cosUrl = `https://${result.Location || `${COS_BUCKET}.cos.${COS_REGION}.myqcloud.com/${key}`}`;
      console.log("[CatScope COS] Uploaded", key);
      return { filePath: cosUrl, savedImageUrl: cosUrl };
    } catch (cosErr: any) {
      console.error("[CatScope COS] Upload failed, falling back to local disk:", cosErr.message || cosErr);
    }
  }

  // Local disk fallback
  const userDir = path.join(IMAGES_BASE_DIR, sanitized);
  fs.mkdirSync(userDir, { recursive: true });
  const filePath = path.join(userDir, filename);
  fs.writeFileSync(filePath, buffer);

  return {
    filePath,
    savedImageUrl: `/api/images/${sanitized}/${filename}`
  };
}

// API: Get preloaded breeds list
app.get("/api/breeds", (req, res) => {
  res.json({ success: true, breeds: BREED_PROFILES });
});

// API: Get a specific breed detail
app.get("/api/breeds/:id", (req, res) => {
  const breedId = req.params.id.toLowerCase().replace(/\s+/g, "");
  if (BREED_PROFILES[breedId]) {
    res.json({ success: true, data: BREED_PROFILES[breedId] });
  } else {
    res.status(404).json({ success: false, error: "Breed profile not found." });
  }
});

// API: Gemini Cat Identifier Scan
app.post("/api/scan", async (req, res) => {
  const { image, mimeType, userId } = req.body;

  if (!image) {
    return res.status(400).json({ success: false, error: "No image data provided." });
  }

  // Persist uploaded / camera-captured images to data/images/{userId}
  let savedImageUrl: string | undefined;
  let savedImagePath: string | undefined;
  if (userId && looksLikeBase64(image)) {
    try {
      const saved = await saveUserImage(userId, image, mimeType);
      savedImageUrl = saved.savedImageUrl;
      savedImagePath = saved.filePath;
    } catch (saveErr) {
      console.error("Failed to save user scan image:", saveErr);
    }
  }

  try {
    const ai = getGeminiClient();

    const imagePart = {
      inlineData: {
        mimeType: mimeType || "image/jpeg",
        data: image,
      },
    };

    const textPart = {
      text: `Identify the cat breed in this image. Evaluate if there is actually a cat present.
If there is NO cat present, return isCat: false. 
Otherwise, return isCat: true and analyze the cat breed. If the breed is mixed or hard to distinguish, output a suitable generic or specific cat breed name (like "Domestic Shorthair", "Mixed Breed", "Tuxedo Cat", etc.) and generate friendly, accurate details for it following the schema.`,
    };

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        isCat: {
          type: Type.BOOLEAN,
          description: "True if a cat is detected in the image, false otherwise."
        },
        breedName: {
          type: Type.STRING,
          description: "The name of the detected cat breed (e.g. Maine Coon, Siamese, Tabby, etc.)."
        },
        shortDescription: {
          type: Type.STRING,
          description: "A short, punchy, engaging subtitle (e.g., 'An active hunter with a playful heart')."
        },
        origin: {
          type: Type.STRING,
          description: "Origin region or country (e.g., 'Thailand', 'Great Britain')."
        },
        lifespan: {
          type: Type.STRING,
          description: "Average lifespan (e.g., '12-15 Years')."
        },
        breedProfile: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Exactly 2 detailed paragraphs about the breed's history, traits, and temperament."
        },
        topTraits: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Trait name (e.g. 'Playful', 'Vocal', 'Gentle', 'Smart')" },
              icon: { type: Type.STRING, description: "A Lucide icon name (e.g. 'heart', 'brain', 'zap', 'smile', 'volume-2', 'baby')" }
            },
            required: ["name", "icon"]
          },
          description: "Exactly 3 key traits characterizing this breed."
        },
        pros: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "At least 3 positive aspects of this breed."
        },
        cons: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "At least 3 considerations or challenges of this breed."
        },
        healthAndCare: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Care category (e.g. 'Grooming Routine', 'Dietary Needs', 'Heart Health')" },
              description: { type: Type.STRING, description: "Actionable recommendations." }
            },
            required: ["title", "description"]
          },
          description: "Exactly 3 distinct care recommendations."
        },
        funFact: {
          type: Type.STRING,
          description: "A fascinating trivia/fun fact about this breed."
        }
      },
      required: [
        "isCat",
        "breedName",
        "shortDescription",
        "origin",
        "lifespan",
        "breedProfile",
        "topTraits",
        "pros",
        "cons",
        "healthAndCare",
        "funFact"
      ]
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [imagePart, textPart],
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const parsedResult = JSON.parse(response.text?.trim() || "{}");
    res.json({ success: true, data: parsedResult, savedImageUrl, savedImagePath });

  } catch (error: any) {
    console.error("Gemini Scan Error:", error);
    // Graceful fallback simulation if key is missing or invalid, so that developers and users can still test the interface!
    if (error.message && (error.message.includes("missing") || error.message.includes("Secrets") || error.message.includes("API_KEY"))) {
      return res.status(200).json({
        success: true,
        isDemoFallback: true,
        errorMsg: error.message,
        savedImageUrl,
        savedImagePath,
        data: {
          isCat: true,
          breedName: "Orange Tabby (Demo)",
          shortDescription: "A fiery-colored, lovable companion full of charisma.",
          origin: "Global Domestic",
          lifespan: "12-16 Years",
          breedProfile: [
            "Orange Tabby cats are not a distinct breed, but a beautiful coat color pattern featuring the classic 'M' markings on their forehead. Known for their outgoing, friendly, and adventurous personalities, they are the sweethearts of many cat loving homes.",
            "This profile is generated in Demo Mode because your Gemini API Key is not configured yet. You can set your GEMINI_API_KEY in the Secrets panel in AI Studio for live AI identification!"
          ],
          topTraits: [
            { name: "Playful", icon: "zap" },
            { name: "Extroverted", icon: "smile" },
            { name: "Friendly", icon: "heart" }
          ],
          pros: [
            "Very friendly and affectionate",
            "Extremely cute and vibrant classic coat",
            "Great conversationalists with lovely meows"
          ],
          cons: [
            "Can be vocal when demanding snacks",
            "Prone to high energy zoomies at 3:00 AM",
            "Requires standard brushing and loving attention"
          ],
          healthAndCare: [
            { title: "Standard Diet", description: "Tabs are prone to overeating; monitor their portion sizes with love." },
            { title: "Daily Play", description: "Keep them active with string toys or dynamic laser games." },
            { title: "Grooming", description: "Brushing once a week is perfect to keep their ginger coat glossy." }
          ],
          funFact: "Did you know that about 80% of orange tabby cats are male? The ginger gene is linked to the X chromosome, making female orange tabbies rare and special!"
        }
      });
    }

    res.status(500).json({ success: false, error: error.message || "An error occurred during scan.", savedImageUrl, savedImagePath });
  }
});

// Serve persisted user scan images
app.use("/api/images", express.static(IMAGES_BASE_DIR));

// Setup Vite Dev Middleware or Serve Built Assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CatScope Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
