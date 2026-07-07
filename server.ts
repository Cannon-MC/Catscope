import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

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

// Pre-packaged offline breed profiles so the app is beautiful and responsive immediately
const OFFLINE_BREEDS: Record<string, any> = {
  ragdoll: {
    breedName: "Ragdoll",
    shortDescription: "Gentle, affectionate, and famously docile lap cats.",
    origin: "United States",
    lifespan: "12-15 Years",
    breedProfile: [
      "The Ragdoll is one of the largest domesticated cat breeds, famous for its striking blue eyes, soft colorpoint coat, and famously sweet temperament. First developed in California in the 1960s, these cats are named for their tendency to go entirely limp and relaxed when held.",
      "They are exceptionally docile and affectionate, often following their owners from room to room. Their soft-spoken voice and calm nature make them an absolute favorite for families seeking a peaceful indoor companion."
    ],
    topTraits: [
      { name: "Affectionate", icon: "heart" },
      { name: "Placid/Docile", icon: "smile" },
      { name: "Kid Friendly", icon: "baby" }
    ],
    pros: [
      "Extremely gentle and safe with small children",
      "Very low aggression, adapts easily to multi-pet homes",
      "Quiet, sweet-voiced and loves physical contact",
      "Highly social and acts like a puppy companion"
    ],
    cons: [
      "Prone to weight gain if diet is not monitored",
      "Strictly an indoor cat due to their trusting nature",
      "Sheds seasonally and requires regular brushing",
      "Requires constant attention and hates being lonely"
    ],
    healthAndCare: [
      { title: "Grooming Routine", description: "Twice-weekly brushing is recommended to maintain their silky coat and avoid knots." },
      { title: "HCM Watch", description: "Regular screening for Hypertrophic Cardiomyopathy (HCM) is recommended for senior Ragdolls." },
      { title: "Weight Guidance", description: "Keep them active using laser toys or feather wands as they tend to lounge all day." }
    ],
    funFact: "Ragdoll kittens are born completely pure white! Their colored point markings slowly develop over the first few weeks and take up to 4 years to reach full color."
  },
  bengal: {
    breedName: "Bengal",
    shortDescription: "A wild-looking leopard-patterned athlete with high intelligence.",
    origin: "United States",
    lifespan: "12-16 Years",
    breedProfile: [
      "The Bengal is a highly active and exotic breed created by crossing the Asian Leopard Cat with domestic cats. They boast a majestic, glittery coat with distinct leopard-like rosettes, muscular builds, and incredibly athletic movements.",
      "Bengals are highly intelligent and curious, often showing a unique fascination with water. They thrive in active households where they receive plenty of play, mental stimulation, and climbing space."
    ],
    topTraits: [
      { name: "Active", icon: "zap" },
      { name: "High IQ", icon: "brain" },
      { name: "Water Loving", icon: "droplet" }
    ],
    pros: [
      "Extremely energetic, playful, and interactive",
      "Hypoallergenic qualities with low shedding",
      "Highly trainable (can walk on a leash and fetch)",
      "Striking, unique wild leopard appearance"
    ],
    cons: [
      "Needs hours of active play daily or can get destructive",
      "Highly vocal, demanding your full attention",
      "Will climb onto any cabinet, shelf, or door frame",
      "High prey drive — may stalk birds or fish tanks"
    ],
    healthAndCare: [
      { title: "Climbing Environment", description: "Provide tall cat trees or wall shelves. Bengals must observe their kingdom from high up." },
      { title: "Hydration Play", description: "Give them access to dripping taps or water fountains; they absolutely love playing with water." },
      { title: "Mental Stim", description: "Use interactive puzzle toys or clicker training to satisfy their sharp, curious minds." }
    ],
    funFact: "Bengals have a 'glitter gene' that gives their fur a beautiful, iridescent sheen, making them look as if they've been dusted in gold or silver under the sun!"
  },
  mainecoon: {
    breedName: "Maine Coon",
    shortDescription: "Known as the 'dogs of the cat world,' they are gentle giants.",
    origin: "North America",
    lifespan: "12-15 Years",
    breedProfile: [
      "The Maine Coon is one of the largest domesticated cat breeds. It has a distinctive physical appearance with a massive, sturdy body, tufted ears like a lynx, and a magnificent bushy tail. Native to the state of Maine, it is the official state cat and a legendary winter survivalist.",
      "Their temperament is famously social and warm; they are cats that want to be right where the action is. Unlike many breeds, they often enjoy water, are highly trainable, and are known for their sweet, melodious chirping vocals."
    ],
    topTraits: [
      { name: "Gentle", icon: "heart" },
      { name: "High IQ", icon: "brain" },
      { name: "Kid Friendly", icon: "baby" }
    ],
    pros: [
      "Extremely loyal, loving, and people-oriented",
      "Excellent with other pets, dogs, and children",
      "Robust and sturdy constitution, highly adaptable",
      "Very vocal with cute expressive chirps and trills"
    ],
    cons: [
      "Requires significant grooming and regular detangling",
      "Prone to certain genetic issues like hip dysplasia",
      "Higher food, litter, and larger accessory costs",
      "Needs plenty of vertical and horizontal physical space"
    ],
    healthAndCare: [
      { title: "Grooming Routine", description: "Daily brushing is recommended to prevent matting of their thick, water-resistant double coat." },
      { title: "Cardiac Watch", description: "Be aware of HCM (Hypertrophic Cardiomyopathy), a common heart condition in this giant breed." },
      { title: "Hip Health", description: "Due to their heavy size, hip dysplasia is more common. Keep their weight carefully managed." }
    ],
    funFact: "Maine Coons have 'snowshoe' paws — huge, tufted feet that help them navigate deep winter snow easily! They are built naturally for the rugged, freezing cold wilderness."
  }
};

// API: Get preloaded breeds list
app.get("/api/breeds", (req, res) => {
  res.json({ success: true, breeds: OFFLINE_BREEDS });
});

// API: Get a specific breed detail
app.get("/api/breeds/:id", (req, res) => {
  const breedId = req.params.id.toLowerCase().replace(/\s+/g, "");
  if (OFFLINE_BREEDS[breedId]) {
    res.json({ success: true, data: OFFLINE_BREEDS[breedId] });
  } else {
    res.status(404).json({ success: false, error: "Breed profile not found." });
  }
});

// API: Gemini Cat Identifier Scan
app.post("/api/scan", async (req, res) => {
  const { image, mimeType } = req.body;

  if (!image) {
    return res.status(400).json({ success: false, error: "No image data provided." });
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
    res.json({ success: true, data: parsedResult });

  } catch (error: any) {
    console.error("Gemini Scan Error:", error);
    // Graceful fallback simulation if key is missing or invalid, so that developers and users can still test the interface!
    if (error.message && (error.message.includes("missing") || error.message.includes("Secrets") || error.message.includes("API_KEY"))) {
      return res.status(200).json({
        success: true,
        isDemoFallback: true,
        errorMsg: error.message,
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

    res.status(500).json({ success: false, error: error.message || "An error occurred during scan." });
  }
});

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
