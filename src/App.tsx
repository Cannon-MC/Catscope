import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Smile,
  Baby,
  Zap,
  Brain,
  Droplet,
  Sparkles,
  Clock,
  ArrowLeft,
  Camera,
  Bookmark,
  User,
  Home,
  Search,

  ChevronRight,
  HelpCircle,
  X,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  FileText,
  Upload,
  BookMarked,

  Trash2,

  Compass,

  Calendar,
  Lightbulb,
  Globe,
  Volume2
} from "lucide-react";
import { IMAGES, STANDARD_BREEDS, DEFAULT_AVATAR } from "./constants";
import { BREED_PROFILES } from "./breedProfiles";
import { BreedDetail, SavedCat, TabType } from "./types";
import {
  translate,
  isValidLanguage,
  Language,
  LANGUAGE_LABELS,
  SUPPORTED_LANGUAGES,
  TranslationKey
} from "./translations";

// Offline-safe illustration of a cat chewing colorful cables
const OfflineCatIllustration = () => (
  <img
    src={IMAGES.offlineCat}
    alt={"A real cat looking curious"}
    className="w-full h-full object-cover"
  />
);

export default function App() {
  // Navigation & Authentication
  const [user, setUser] = useState<{ name: string; email: string; avatarUrl: string } | null>(null);

  // Language preference
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("catscope_lang");
    return isValidLanguage(stored) ? stored : "en";
  });

  useEffect(() => {
    localStorage.setItem("catscope_lang", language);
  }, [language]);

  const t = (key: TranslationKey, params?: Record<string, string | number>) =>
    translate(language, key, params);

  // Breed id helpers: names from the API may contain spaces/caps, but our
  // STANDARD_BREEDS ids are normalized (lowercase, no spaces).
  const normalizeBreedId = (id: string) => id.toLowerCase().replace(/\s+/g, "");
  const getBreedByIdOrName = (idOrName: string | null) =>
    idOrName ? STANDARD_BREEDS.find((b) => b.id === normalizeBreedId(idOrName)) : undefined;

  // App views & flows
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [selectedBreedId, setSelectedBreedId] = useState<string | null>(null);
  const [selectedBreedDetail, setSelectedBreedDetail] = useState<BreedDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  // Login form state


  // Search input
  const [searchQuery, setSearchQuery] = useState("");

  // Breed discovery expand/collapse
  const [showAllBreeds, setShowAllBreeds] = useState(false);
  const [showBreedDiscoveryPage, setShowBreedDiscoveryPage] = useState(false);

  // Storage / Saved Cats
  const [savedCats, setSavedCats] = useState<SavedCat[]>([]);

  // Modals & Interactive features
  const [showErrorScreen, setShowErrorScreen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNameSetup, setShowNameSetup] = useState(false);
  const [setupName, setSetupName] = useState("");

  // Scan state
  const [scanImage, setScanImage] = useState<string | null>(null);
  const [scanMimeType, setScanMimeType] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  // File Upload trigger
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live camera preview state
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Load a previously-uploaded avatar for a given email, falling back to the white default
  const getStoredAvatar = (email: string): string => {
    try {
      return localStorage.getItem(`catscope_avatar_${email}`) || DEFAULT_AVATAR;
    } catch {
      return DEFAULT_AVATAR;
    }
  };

  // Simulated device-password gate for social login
  const handleSocialLogin = (provider: "Google" | "Apple") => {
    const password = window.prompt(t("devicePasswordPrompt", { provider }));
    if (password === "password") {
      const email = `${provider.toLowerCase()}@catscope.com`;
      setUser({
        name: "",
        email,
        avatarUrl: getStoredAvatar(email)
      });
      setSetupName("");
      setShowNameSetup(true);
    } else {
      alert(t("incorrectPassword"));
    }
  };

  // Track online / offline state for the no-connection page
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Initial load
  useEffect(() => {
    const saved = localStorage.getItem("catscope_saved");
    if (saved) {
      try {
        setSavedCats(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Add a couple of initial saved cats for visual completeness
      const initial: SavedCat[] = [
        {
          id: "1",
          breedName: "Maine Coon",
          shortDescription: t("maineCoonDescription"),
          scannedAt: "2026-07-05T14:32:00Z",
          imageUrl: IMAGES.maineCoon,
          notes: t("sampleNoteMaineCoon")
        },
        {
          id: "2",
          breedName: "Ragdoll",
          shortDescription: t("ragdollDescription"),
          scannedAt: "2026-07-04T09:15:00Z",
          imageUrl: IMAGES.ragdoll,
          notes: t("sampleNoteRagdoll")
        }
      ];
      setSavedCats(initial);
      localStorage.setItem("catscope_saved", JSON.stringify(initial));
    }
  }, []);

  // Sync saved cats to localStorage
  const saveCatsToStorage = (updated: SavedCat[]) => {
    setSavedCats(updated);
    localStorage.setItem("catscope_saved", JSON.stringify(updated));
  };

  // View specific breed details (use embedded offline profiles first, then API)
  const handleViewBreedDetail = async (id: string) => {
    const normalizedId = normalizeBreedId(id);
    setSelectedBreedId(normalizedId);
    setSelectedBreedDetail(null);
    setIsDetailLoading(true);
    try {
      const localProfile = BREED_PROFILES[normalizedId];
      if (localProfile) {
        setSelectedBreedDetail(localProfile);
        setIsDetailLoading(false);
        return;
      }

      const res = await fetch(`/api/breeds/${id}`);
      const result = await res.json();
      if (result.success) {
        setSelectedBreedDetail(result.data);
      } else {
        setScanError(result.error || t("failedLoadBreedDetails"));
      }
    } catch (err) {
      console.error(err);
      setScanError(t("unableToConnect"));
    } finally {
      setIsDetailLoading(false);
    }
  };

  // Scan execution
  const handleRunScan = async (
    base64Image: string,
    mimeType: string = "image/jpeg",
    source: "gallery" | "camera" | "preset" = "gallery"
  ) => {
    setIsScanning(true);
    setScanError(null);
    try {
      const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
      const userId = user?.email || null;
      
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: cleanBase64, mimeType, userId, source })
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        const payload: BreedDetail = result.data;
        if (payload.isCat === false) {
          setScanError(t("noCatDetected"));
          setIsScanning(false);
          return;
        }
        
        // Success
        setSelectedBreedDetail(payload);
        setSelectedBreedId(normalizeBreedId(payload.breedName));
        
        // Auto-save scanned cat to list using server-persisted image URL when available
        const persistedImageUrl = result.savedImageUrl || null;
        const fallbackImageUrl = base64Image.startsWith("data:")
          ? base64Image
          : `data:${mimeType};base64,${cleanBase64}`;
        
        const newSaved: SavedCat = {
          id: Date.now().toString(),
          breedName: payload.breedName,
          shortDescription: payload.shortDescription,
          scannedAt: new Date().toISOString(),
          imageUrl: persistedImageUrl || fallbackImageUrl,
          notes: result.isDemoFallback ? t("demoModeNote") : t("identifiedNote")
        };
        saveCatsToStorage([newSaved, ...savedCats]);
      } else {
        setScanError(result.error || t("identificationFailed"));
      }
    } catch (err: any) {
      console.error(err);
      setScanError(t("networkError"));
    } finally {
      setIsScanning(false);
    }
  };

  // Photo upload handling (gallery or camera)
  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    source: "gallery" | "camera" = "gallery"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setScanImage(reader.result);
        setScanMimeType(file.type);
        handleRunScan(reader.result, file.type, source);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Profile picture upload handling
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const avatarUrl = reader.result;
        setUser({ ...user, avatarUrl });
        try {
          localStorage.setItem(`catscope_avatar_${user.email}`, avatarUrl);
        } catch (err) {
          console.error("Failed to save avatar:", err);
        }
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Helper mapping icon keys to actual lucide components
  const renderTraitIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "heart": return <Heart className="w-5 h-5" />;
      case "smile": return <Smile className="w-5 h-5" />;
      case "baby": return <Baby className="w-5 h-5" />;
      case "zap": return <Zap className="w-5 h-5" />;
      case "brain": return <Brain className="w-5 h-5" />;
      case "droplet": return <Droplet className="w-5 h-5" />;
      case "volume-2": return <Volume2 className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  // Search filtered breeds
  const filteredBreeds = STANDARD_BREEDS.filter(
    b => b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         b.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Daily Nutrition formula
  // Save customized note to a saved cat
  const handleUpdateCatNotes = (id: string, notes: string) => {
    const updated = savedCats.map(c => c.id === id ? { ...c, notes } : c);
    saveCatsToStorage(updated);
  };

  // Delete a saved cat
  const handleDeleteSavedCat = (id: string) => {
    const updated = savedCats.filter(c => c.id !== id);
    saveCatsToStorage(updated);
  };

  // Toggle favorite trigger
  const isSaved = selectedBreedDetail ? savedCats.some(c => c.breedName === selectedBreedDetail.breedName) : false;
  const toggleSaveCurrentBreed = () => {
    if (!selectedBreedDetail) return;
    if (isSaved) {
      const updated = savedCats.filter(c => c.breedName !== selectedBreedDetail.breedName);
      saveCatsToStorage(updated);
    } else {
      const newSaved: SavedCat = {
        id: Date.now().toString(),
        breedName: selectedBreedDetail.breedName,
        shortDescription: selectedBreedDetail.shortDescription,
        scannedAt: new Date().toISOString(),
        imageUrl: getBreedByIdOrName(selectedBreedId)?.image || scanImage || IMAGES.cameraFeed,
        notes: t("savedFromExplorerNote")
      };
      saveCatsToStorage([newSaved, ...savedCats]);
    }
  };

  // Live camera preview helpers
  const startCamera = async () => {
    setCameraError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError(t("cameraNotSupported"));
      return;
    }

    let stream: MediaStream | null = null;
    try {
      // Prefer the rear/environment camera on mobile; fall back to any camera on desktop Macs
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false
      });
    } catch {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      } catch (err) {
        console.error("Camera access error:", err);
        setCameraError(t("cameraAccessError"));
        return;
      }
    }

    setCameraStream(stream);
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !cameraStream) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    stopCamera();
    setScanImage(dataUrl);
    setScanMimeType("image/jpeg");
    handleRunScan(dataUrl, "image/jpeg", "camera");
  };

  // Trigger flash shutter simulation
  const handleTriggerShutter = () => {
    if (cameraStream) {
      capturePhoto();
      return;
    }
    // Always start the camera when the shutter is pressed, so users can retake photos
    startCamera();
  };

  // Attach the camera stream to the video element once it is rendered
  useEffect(() => {
    if (cameraStream && videoRef.current) {
      if (videoRef.current.srcObject !== cameraStream) {
        videoRef.current.srcObject = cameraStream;
      }
      videoRef.current.play().catch((err) => {
        console.error("Video play error:", err);
      });
    }
  }, [cameraStream]);

  // Stop the camera when leaving the scan tab
  useEffect(() => {
    if (activeTab !== "scan") {
      stopCamera();
    }
  }, [activeTab]);

  // Helper to render a language selector control
  const LanguageSelector = ({ className = "" }: { className?: string }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
      <div ref={menuRef} className={`relative ${className}`}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={t("language")}
          className="flex items-center gap-1.5 bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant rounded-full pl-2.5 pr-1.5 py-1 text-sm font-bold text-on-surface shadow-sm transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <Globe className="w-4 h-4 text-primary" />
          <span className="uppercase tracking-wide">{language}</span>
          <span
            className={`ml-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <ChevronRight className="w-3.5 h-3.5 rotate-90" />
          </span>
        </button>

        {open && (
          <div
            role="listbox"
            className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-outline-variant/40 py-1.5 z-50 overflow-hidden origin-top-right"
          >
            {SUPPORTED_LANGUAGES.map((lang) => {
              const active = lang === language;
              return (
                <button
                  key={lang}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setLanguage(lang);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-colors ${
                    active
                      ? "bg-primary/8 text-primary"
                      : "text-on-surface hover:bg-surface-container-low"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-extrabold ${
                        active
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-high text-on-surface-variant"
                      }`}
                    >
                      {lang.toUpperCase()}
                    </span>
                    <span className="text-sm font-semibold">{LANGUAGE_LABELS[lang]}</span>
                  </span>
                  {active && <CheckCircle2 className="w-4 h-4 text-primary" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // 1. OFFLINE / INTERNET CONNECTION ERROR VIEW
  if (showErrorScreen || !isOnline) {
    return (
      <div id="error-screen" className="phone-frame bg-surface text-on-surface flex flex-col font-sans overflow-x-hidden">
        <header className="bg-surface flex justify-between items-center px-6 w-full fixed top-0 z-50 border-b border-outline-variant/20 mobile-header">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl font-bold">pets</span>
            <span className="font-bold text-xl text-primary tracking-tight font-sans">{t("appName")}</span>
          </div>
          {isOnline && (
            <button 
              onClick={() => setShowErrorScreen(false)}
              className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </header>
        
        <main className="flex-grow flex flex-col items-center justify-center px-5 sm:px-6 pb-20 error-main">
          <div className="w-full max-w-sm text-center space-y-6">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-700"></div>
              <div className="relative w-full aspect-square overflow-hidden rounded-[40px] shadow-sm border border-outline-variant/30 bg-surface-container-low">
                <OfflineCatIllustration />
              </div>
            </div>

            <div className="space-y-3 px-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight font-sans">
                {t("errorTitle")}
              </h2>
              <p className="text-base text-on-surface-variant leading-relaxed">
                {t("errorDescription")}
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full pt-2">
              <button 
                onClick={() => {
                  if (navigator.onLine) {
                    setShowErrorScreen(false);
                    setActiveTab("home");
                    setShowBreedDiscoveryPage(false);
                  } else {
                    window.location.reload();
                  }
                }}
                className="squishy-interaction w-full h-[56px] bg-primary text-on-primary rounded-full font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:brightness-110"
              >
                <RefreshCw className="w-5 h-5 animate-spin" />
                {t("tryAgain")}
              </button>
            </div>

            <button 
              onClick={() => alert(t("supportTicketMessage"))}
              className="text-on-surface-variant font-medium text-xs underline decoration-outline-variant/50 underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
            >
              {t("contactSupport")}
            </button>
          </div>
        </main>
      </div>
    );
  }

  // 2. UNAUTHENTICATED / LOGIN VIEW
  if (!user) {
    return (
      <div id="login-view" className="phone-frame bg-background text-on-background flex flex-col font-sans overflow-x-hidden relative">
        <header className="flex justify-center items-center px-6 w-full bg-surface login-header">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">pets</span>
            <h1 className="text-2xl font-bold text-primary tracking-tight font-sans">{t("appName")}</h1>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center px-5 sm:px-6 pb-12 relative overflow-hidden">
          {/* Ambient organic blobs for Boutique style */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-fixed opacity-20 organic-blob blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary-fixed opacity-10 organic-blob blur-3xl pointer-events-none"></div>

          {/* Hero Content */}
          <div className="text-center mb-8 w-full max-w-sm z-10">
            <div className="mb-4 inline-block">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-surface-container shadow-sm">
                <img 
                  className="w-full h-full object-cover" 
                  alt={t("calicoAlt")} 
                  src={IMAGES.calicoLogin}
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-on-surface mb-2 font-sans">
              {t("welcomeTitle")}
            </h2>
            <p className="text-base text-on-surface-variant px-4">
              {t("welcomeSubtitle")}
            </p>
          </div>

          {/* Social Login */}
          <div className="w-full max-w-sm flex flex-col gap-4 z-10">
            <p className="text-center text-sm font-semibold text-on-surface-variant">{t("signInWith")}</p>

            <button 
              type="button"
              onClick={() => handleSocialLogin("Google")}
              className="w-full h-14 border border-outline-variant rounded-xl flex items-center justify-center bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="text-sm font-bold">{t("continueWithGoogle")}</span>
            </button>
            
            <button 
              type="button"
              onClick={() => handleSocialLogin("Apple")}
              className="w-full h-14 border border-outline-variant rounded-xl flex items-center justify-center bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer gap-3"
            >
              <span className="material-symbols-outlined text-black">apps</span>
              <span className="text-sm font-bold">{t("continueWithApple")}</span>
            </button>

            {/* Language toggle */}
            <div className="mt-4 flex items-center justify-center">
              <LanguageSelector />
            </div>
          </div>
        </main>
      </div>
    );
  }


  // 3. MAIN AUTHENTICATED APP SYSTEM
  if (showNameSetup) {
    return (
      <div className="phone-frame bg-background text-on-background font-sans flex flex-col overflow-x-hidden relative">
        <header className="flex justify-center items-center px-6 w-full bg-surface login-header">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">pets</span>
            <h1 className="text-2xl font-bold text-primary tracking-tight font-sans">{t("appName")}</h1>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center px-5 sm:px-6 pb-12 relative">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-fixed opacity-20 organic-blob blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary-fixed opacity-10 organic-blob blur-3xl pointer-events-none"></div>

          <div className="text-center mb-8 w-full max-w-sm z-10">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-surface-container shadow-sm mb-4">
              <img className="w-full h-full object-cover" alt={t("calicoAlt")} src={IMAGES.calicoLogin} />
            </div>
            <h2 className="text-2xl font-bold text-on-surface mb-2 font-sans">{t("nameSetupTitle")}</h2>
            <p className="text-base text-on-surface-variant px-4">{t("nameSetupSubtitle")}</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const trimmed = setupName.trim();
              if (!trimmed) {
                alert(t("nameRequired"));
                return;
              }
              if (user) {
                setUser({ ...user, name: trimmed });
              }
              setShowNameSetup(false);
            }}
            className="w-full max-w-sm flex flex-col gap-4 z-10"
          >
            <div className="relative">
              <input
                type="text"
                value={setupName}
                onChange={(e) => setSetupName(e.target.value.slice(0, 16))}
                placeholder={t("namePlaceholder")}
                maxLength={16}
                className="w-full h-14 px-4 bg-surface-container-lowest border border-outline-variant rounded-xl text-base font-semibold text-on-surface placeholder-on-surface-variant/40 focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-on-surface-variant/60">
                {setupName.length}/16
              </div>
            </div>
            <button
              type="submit"
              className="w-full h-14 bg-primary text-on-primary font-bold text-lg rounded-full shadow-sm hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              {t("continueButton")}
            </button>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="phone-frame bg-background text-on-background font-sans flex flex-col relative overflow-x-hidden">
      
      {/* A. DESKTOP SIDEBAR NAVIGATION */}
      <div className="hidden fixed left-0 top-0 h-screen w-20 flex-col items-center py-6 gap-8 bg-surface border-r border-outline-variant/30 z-50">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-2xl font-bold">pets</span>
        </div>

        <nav className="flex flex-col gap-4 mt-6">
          <button 
            onClick={() => { setActiveTab("home"); setSelectedBreedId(null); setSelectedBreedDetail(null); setShowBreedDiscoveryPage(false); }}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all squishy-interaction ${
              activeTab === "home" && !selectedBreedId ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
            title={t("navHome")}
          >
            <Home className="w-5 h-5" />
          </button>

          <button 
            onClick={() => { setActiveTab("scan"); setSelectedBreedId(null); setSelectedBreedDetail(null); setShowBreedDiscoveryPage(false); }}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all squishy-interaction ${
              activeTab === "scan" && !selectedBreedId ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
            title={t("navScan")}
          >
            <Camera className="w-5 h-5" />
          </button>

          <button 
            onClick={() => { setActiveTab("saved"); setSelectedBreedId(null); setSelectedBreedDetail(null); setShowBreedDiscoveryPage(false); }}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all squishy-interaction ${
              activeTab === "saved" && !selectedBreedId ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
            title={t("navSaved")}
          >
            <Bookmark className="w-5 h-5" />
          </button>

          <button 
            onClick={() => { setActiveTab("profile"); setSelectedBreedId(null); setSelectedBreedDetail(null); setShowBreedDiscoveryPage(false); }}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all squishy-interaction ${
              activeTab === "profile" && !selectedBreedId ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
            title={t("navProfile")}
          >
            <User className="w-5 h-5" />
          </button>
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden">
            <img className="w-full h-full object-cover" alt={t("navProfile")} src={user.avatarUrl} />
          </div>
        </div>
      </div>

      {/* B. MOBILE HEADER BAR */}
      <header className="bg-surface flex justify-between items-center px-4 sm:px-6 w-full fixed top-0 z-50 border-b border-outline-variant/10 mobile-header">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl font-bold">pets</span>
          <span className="font-bold text-xl text-primary tracking-tight">{t("appName")}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-secondary overflow-hidden">
            <img className="w-full h-full object-cover" alt={t("navProfile")} src={user.avatarUrl} />
          </div>
        </div>
      </header>

      {/* C. MAIN WORKSPACE CONTENT */}
      <div className={`flex-1 min-h-0 flex flex-col app-main-content ${activeTab === "scan" ? "!pb-0" : ""}`}>
        
        {/* VIEW ROUTER FOR BREED DETAIL OR CURRENT SELECTED TAB */}
        {selectedBreedId ? (
          /* ==================== SCREEN: BREED DETAIL VIEW ==================== */
          <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 w-full flex-grow">
            <button 
              onClick={() => { setSelectedBreedId(null); setSelectedBreedDetail(null); }}
              className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-4 font-semibold text-sm focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{activeTab === "saved" ? t("backToLibrary") : t("backToDiscovery")}</span>
            </button>

            {isDetailLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-on-surface-variant">
                <RefreshCw className="w-10 h-10 text-primary animate-spin" />
                <p className="font-semibold text-base animate-pulse">{t("consultingEncyclopedias")}</p>
              </div>
            ) : selectedBreedDetail ? (
              <div className="space-y-6">
                {/* Hero Section */}
                <section className="relative overflow-hidden rounded-[24px] bg-surface-container shadow-sm border border-outline-variant/30">
                  <div className="flex flex-col lg:flex-row min-h-[380px]">
                    <div className="lg:w-1/2 relative h-64 lg:h-auto overflow-hidden">
                      <img 
                        alt={selectedBreedDetail.breedName} 
                        className="absolute inset-0 w-full h-full object-cover"
                        src={
                          getBreedByIdOrName(selectedBreedId)?.image ||
                          scanImage ||
                          IMAGES.cameraFeed
                        }
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-semibold text-xs shadow-sm">
                          {selectedBreedDetail.lifespan} {t("lifespanAverage")}
                        </span>
                      </div>
                    </div>
                    
                    <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-2">
                        <h1 className="text-3xl font-extrabold text-primary tracking-tight font-sans">
                          {selectedBreedDetail.breedName}
                        </h1>
                        <button 
                          onClick={toggleSaveCurrentBreed}
                          className="p-2 rounded-full hover:bg-surface-container-high text-primary transition-colors focus:outline-none"
                          title={isSaved ? t("removeFromLibrary") : t("saveToLibrary")}
                        >
                          <Bookmark className={`w-6 h-6 ${isSaved ? "fill-primary text-primary" : "text-on-surface-variant"}`} />
                        </button>
                      </div>
                      
                      <p className="text-lg text-on-surface-variant mb-6 leading-relaxed">
                        {selectedBreedDetail.shortDescription}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-surface-container-high px-4 py-2 rounded-full font-semibold text-xs border border-outline-variant/20 flex items-center gap-2 text-on-surface">
                          <Compass className="w-4 h-4 text-primary" /> {t("region", { origin: selectedBreedDetail.origin })}
                        </span>
                        <span className="bg-surface-container-high px-4 py-2 rounded-full font-semibold text-xs border border-outline-variant/20 flex items-center gap-2 text-on-surface">
                          <Clock className="w-4 h-4 text-primary" /> {t("lifespan", { lifespan: selectedBreedDetail.lifespan })}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Bento Grid: Breed Profile & Traits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Profile Paragraphs */}
                  <div className="md:col-span-2 bg-white rounded-[24px] p-6 md:p-8 border border-outline-variant/30 shadow-sm">
                    <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" /> {t("breedProfile")}
                    </h2>
                    <div className="space-y-4 text-on-surface-variant leading-relaxed text-base">
                      {selectedBreedDetail.breedProfile.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Top Traits (Boutique Style) */}
                  <div className="bg-secondary-container/20 rounded-[24px] p-6 border border-secondary-container/50 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-on-secondary-container uppercase tracking-wider mb-4">{t("topTraits")}</h3>
                      <div className="space-y-4">
                        {selectedBreedDetail.topTraits.map((trait, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="bg-secondary text-white p-2 rounded-xl flex items-center justify-center">
                              {renderTraitIcon(trait.icon)}
                            </div>
                            <span className="font-semibold text-sm text-on-surface">{trait.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => alert(t("careGuideDownloaded"))}
                      className="mt-8 bg-primary text-on-primary w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 squishy-interaction shadow-md hover:brightness-110"
                    >
                      <Download className="w-4 h-4" />
                      {t("downloadCareGuide")}
                    </button>
                  </div>
                </div>

                {/* Pros & Cons Section */}
                <div className="bg-white rounded-[24px] p-6 md:p-8 border border-outline-variant/30 shadow-sm">
                  <h2 className="text-xl font-bold text-primary mb-6">{t("rightCatForYou")}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Pros */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-sm text-secondary uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-secondary" /> {t("thePros")}
                      </h3>
                      <ul className="text-on-surface-variant space-y-3 font-medium text-base">
                        {selectedBreedDetail.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-secondary">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Cons */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-sm text-primary uppercase tracking-wider flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-primary" /> {t("theCons")}
                      </h3>
                      <ul className="text-on-surface-variant space-y-3 font-medium text-base">
                        {selectedBreedDetail.cons.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Health & Care Advice Section */}
                <div className="bg-surface-container rounded-[24px] p-6 md:p-8 border border-outline-variant/30 relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary" /> {t("healthCareRoutine")}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      {selectedBreedDetail.healthAndCare.map((item, idx) => (
                        <div key={idx} className="p-4 bg-white/60 rounded-xl border border-white">
                          <h4 className="font-bold text-sm text-on-surface mb-1">{item.title}</h4>
                          <p className="text-sm text-on-surface-variant">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                </div>

                {/* Did You Know Highlight */}
                <section className="bg-inverse-surface text-inverse-on-surface p-6 md:p-8 rounded-[24px] flex flex-col md:flex-row items-center gap-6 overflow-hidden">
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-2 text-black">{t("didYouKnow")}</h3>
                    <p className="text-base text-black leading-relaxed font-medium">
                      {selectedBreedDetail.funFact || t("didYouKnowFallback")}
                    </p>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-pulse">
                      <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-on-surface-variant font-medium">{t("breedDetailError")}</p>
              </div>
            )}
          </main>
        ) : showBreedDiscoveryPage ? (
          /* ==================== SCREEN: ALL BREEDS ==================== */
          <main className="px-4 sm:px-6 pt-6 pb-12 max-w-4xl mx-auto w-full flex-grow space-y-6">
            <button 
              onClick={() => setShowBreedDiscoveryPage(false)}
              className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity font-semibold text-sm focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("backToDiscovery")}</span>
            </button>

            <div>
              <h1 className="text-3xl font-extrabold text-on-surface mb-2 font-sans">{t("breedDiscovery")}</h1>
              <p className="text-base text-on-surface-variant font-medium">
                {t("allBreedsSubtitle", { count: STANDARD_BREEDS.length })}
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                <Search className="w-5 h-5" />
              </div>
              <input 
                className="w-full h-12 pl-12 pr-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-base font-medium transition-all shadow-sm"
                placeholder={t("searchPlaceholder")} 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBreeds.length > 0 ? (
                filteredBreeds.map((breed) => (
                  <div 
                    key={breed.id}
                    onClick={() => handleViewBreedDetail(breed.id)}
                    className="relative overflow-hidden rounded-[24px] aspect-[4/3] md:h-72 card-shadow group cursor-pointer border border-outline-variant/30 hover:shadow-md transition-shadow"
                  >
                    <img 
                      alt={breed.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      src={breed.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"></div>
                    
                    {breed.isFeatured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                          {t("featuredBadge")}
                        </span>
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold font-sans">{breed.name}</h3>
                      <p className="text-white/80 text-sm font-medium">{breed.tagline}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-on-surface-variant font-semibold">
                  {t("noBreedsFound")}
                </div>
              )}
            </div>
          </main>
        ) : (
          /* ==================== SCREEN CHANGER BY TABS ==================== */
          <>
            {activeTab === "home" && (
              /* ==================== SCREEN: DASHBOARD ==================== */
              <main className="px-4 sm:px-6 pt-6 pb-12 max-w-4xl mx-auto w-full flex-grow space-y-8">
                {/* Welcome Header */}
                <section className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-extrabold text-on-surface mb-1 font-sans">
                      {t("greeting", { name: user.name })}
                    </h1>
                    <p className="text-base text-on-surface-variant font-medium">
                      {t("homeSubtitle")}
                    </p>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                      <Search className="w-5 h-5" />
                    </div>
                    <input 
                      className="w-full h-12 pl-12 pr-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-base font-medium transition-all shadow-sm"
                      placeholder={t("searchPlaceholder")} 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </section>

                {/* Breed Discovery */}
                <section className="space-y-4">
                  <div className="flex justify-between items-end">
                    <button
                      onClick={() => setShowBreedDiscoveryPage(true)}
                      className="text-xl font-extrabold text-on-surface tracking-tight hover:text-primary transition-colors"
                    >
                      {t("breedDiscovery")}
                    </button>
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")} 
                        className="text-sm font-semibold text-primary hover:underline"
                      >
                        {t("clearSearch")}
                      </button>
                    )}
                    {!searchQuery && filteredBreeds.length > 3 && (
                      <button
                        onClick={() => setShowBreedDiscoveryPage(true)}
                        className="text-sm font-semibold text-primary hover:underline"
                      >
                        {t("moreBreeds", { count: filteredBreeds.length - 3 })}
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredBreeds.length > 0 ? (
                      filteredBreeds.slice(0, 3).map((breed) => (
                        <div 
                          key={breed.id}
                          onClick={() => handleViewBreedDetail(breed.id)}
                          className="relative overflow-hidden rounded-[24px] aspect-[4/3] md:h-80 card-shadow group cursor-pointer border border-outline-variant/30 hover:shadow-md transition-shadow"
                        >
                          <img 
                            alt={breed.name} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            src={breed.image}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"></div>
                          
                          {breed.isFeatured && (
                            <div className="absolute top-4 right-4">
                              <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                                {t("featuredBadge")}
                              </span>
                            </div>
                          )}
                          
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-bold font-sans">{breed.name}</h3>
                            <p className="text-white/80 text-sm font-medium">{breed.tagline}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full py-12 text-center text-on-surface-variant font-semibold">
                        {t("noBreedsFound")}
                      </div>
                    )}
                  </div>
                </section>

                {/* Daily Care Tips */}
                <section className="space-y-4">
                  <h2 className="text-xl font-extrabold text-on-surface tracking-tight">{t("dailyCare")}</h2>
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-[24px] p-5 card-shadow">
                    <p className="text-base text-on-surface-variant leading-relaxed font-medium">
                      {t("dailyCareTips")}
                    </p>
                  </div>
                </section>

                {/* Weekly tip section */}
                <section>
                  <div className="bg-secondary-container rounded-[32px] p-6 md:p-8 relative overflow-hidden">
                    <div className="relative z-10 md:w-2/3">
                      <span className="text-on-secondary-container font-bold text-xs uppercase tracking-wider mb-2 block">{t("weeklyTipLabel")}</span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-on-secondary-container mb-4">{t("weeklyTipTitle")}</h2>
                      <p className="text-base text-on-secondary-container opacity-90 mb-6 font-medium">
                        {t("weeklyTipBody")}
                      </p>
                      <button 
                        onClick={() => alert(t("learnMoreTip"))}
                        className="bg-on-secondary-container text-white px-6 py-3 rounded-full font-bold text-sm squishy-interaction cursor-pointer hover:opacity-90"
                      >
                        {t("learnMore")}
                      </button>
                    </div>
                    {/* Abstract "Squishy" Shapes */}
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-secondary rounded-full opacity-10 blur-3xl"></div>
                    <div className="absolute right-10 top-10 w-32 h-32 bg-primary rounded-full opacity-5 blur-2xl"></div>
                  </div>
                </section>
              </main>
            )}

            {activeTab === "scan" && (
              /* ==================== SCREEN: AI SCANNER ==================== */
              <main className="flex-1 min-h-0 relative">
                {/* Full-screen Camera Feed Container */}
                <div className="absolute inset-0 overflow-hidden bg-black">
                  
                  {/* Display live camera preview, selected scanning picture, or placeholder */}
                  <div className="absolute inset-0 w-full h-full">
                    {cameraStream ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        className="w-full h-full object-cover" 
                        alt={t("cameraAlt")} 
                        src={scanImage || IMAGES.cameraFeed} 
                      />
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                  </div>

                  {/* Overlays / Viewfinder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none camera-overlay-gradient">
                    
                    {/* Status badges */}
                    <div className="absolute top-6 left-0 right-0 flex justify-center gap-3 px-4 pointer-events-auto">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
                        <span className={`w-2.5 h-2.5 rounded-full ${flashOn ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`}></span>
                        <span className="text-white font-bold text-xs">{t("optimalLight")}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed-dim"></span>
                        <span className="text-white font-bold text-xs">{t("focusLocked")}</span>
                      </div>
                    </div>

                    {/* Framing corners */}
                    <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white/80 rounded-tl-2xl"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white/80 rounded-tr-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white/80 rounded-bl-2xl"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white/80 rounded-br-2xl"></div>

                      {/* Moving Scanner Laser Bar */}
                      {isScanning && (
                        <div className="absolute left-0 right-0 h-1 bg-primary scan-line shadow-[0_0_15px_rgba(153,70,42,1)]"></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Floating bottom controls */}
                <div className="absolute bottom-0 left-0 right-0 z-[60] pb-[calc(5rem+env(safe-area-inset-bottom))]">
                  {/* Scan prompt overlay */}
                  <div className="text-center w-full px-6 mb-4">
                    <p className="text-white font-semibold text-sm drop-shadow-md bg-black/30 px-4 py-1.5 rounded-full inline-block">
                      {isScanning
                        ? t("scanPromptScanning")
                        : cameraStream
                          ? t("scanPromptCapture")
                          : scanImage
                            ? t("scanPromptRetake")
                            : t("scanPromptIdle")}
                    </p>
                  </div>

                  {/* Camera error message */}
                  {cameraError && (
                    <div className="bg-amber-50 border-y border-amber-200 p-3 flex gap-2 text-amber-800 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
                      <p className="font-medium">{cameraError}</p>
                    </div>
                  )}

                  {/* Shutter controls */}
                  <div className="bg-surface-container-low/85 backdrop-blur-xl p-5 pb-7 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.08)] border-t border-white/10">
                    
                    {/* Gallery upload */}
                    <div className="flex flex-col items-center gap-1">
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={(e) => handlePhotoUpload(e, "gallery")}
                        accept="image/*"
                        className="hidden"
                      />
                      <input 
                        type="file" 
                        ref={cameraInputRef}
                        onChange={(e) => handlePhotoUpload(e, "camera")}
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                      />
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-on-surface-variant hover:bg-white hover:text-primary transition-colors focus:outline-none shadow-sm"
                        title={t("uploadCatPhoto")}
                      >
                        <Upload className="w-5 h-5" />
                      </button>
                      <span className="text-xs font-bold text-white drop-shadow-md">{t("gallery")}</span>
                    </div>

                    {/* Big Shutter trigger button */}
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 blur-xl"></div>
                      <button 
                        onClick={handleTriggerShutter}
                        disabled={isScanning}
                        className={`relative w-20 h-20 bg-primary rounded-full flex items-center justify-center border-4 border-white active:scale-90 transition-all duration-200 shadow-lg ${
                          isScanning ? "opacity-55 cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <Camera className="w-8 h-8 text-white" />
                      </button>
                    </div>

                    {/* Toggle Flash */}
                    <div className="flex flex-col items-center gap-1">
                      <button 
                        onClick={() => setFlashOn(!flashOn)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors focus:outline-none shadow-sm ${
                          flashOn ? "bg-amber-100 text-amber-600" : "bg-white/90 text-on-surface-variant hover:bg-white"
                        }`}
                        title={t("toggleFlash")}
                      >
                        <Zap className="w-5 h-5" />
                      </button>
                      <span className="text-xs font-bold text-white drop-shadow-md">{t("flash")}</span>
                    </div>
                  </div>

                  {/* Error handling block */}
                  {scanError && (
                    <div className="bg-red-50 border-t border-red-200 p-4 flex gap-3 text-red-800 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                      <div>
                        <p className="font-bold">{t("scanProblem")}</p>
                        <p className="font-medium">{scanError}</p>
                        <button 
                          onClick={() => setScanError(null)} 
                          className="mt-1 text-xs font-bold underline cursor-pointer text-red-900 block"
                        >
                          {t("dismiss")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </main>
            )}

            {activeTab === "saved" && (
              /* ==================== SCREEN: SAVED LIBRARY ==================== */
              <main className="px-4 sm:px-6 pt-6 pb-12 max-w-4xl mx-auto w-full flex-grow space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-extrabold text-on-surface tracking-tight">{t("savedLibraryTitle")}</h1>
                    <p className="text-sm text-on-surface-variant font-medium">{t("savedLibrarySubtitle", { count: savedCats.length })}</p>
                  </div>
                  <button 
                    onClick={() => {
                      if (confirm(t("clearLibraryConfirm"))) {
                        saveCatsToStorage([]);
                      }
                    }}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    {t("clearAll")}
                  </button>
                </div>

                {savedCats.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedCats.map((cat) => (
                      <div 
                        key={cat.id} 
                        className="bg-white rounded-[24px] border border-outline-variant/30 overflow-hidden shadow-sm flex flex-col"
                      >
                        {/* Image banner */}
                        <div className="relative h-48 bg-surface-dim">
                          <img 
                            className="w-full h-full object-cover" 
                            alt={cat.breedName} 
                            src={cat.imageUrl} 
                          />
                          <div className="absolute top-4 right-4">
                            <button 
                              onClick={() => handleDeleteSavedCat(cat.id)}
                              className="p-2 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors cursor-pointer"
                              title={t("deleteEntry")}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Text and interaction block */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-bold text-primary">{cat.breedName}</h3>
                              <span className="text-xs font-bold text-on-surface-variant flex items-center gap-1 bg-surface-container px-2 py-1 rounded-md">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(cat.scannedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                              </span>
                            </div>
                            <p className="text-sm text-on-surface-variant line-clamp-2 font-medium">{cat.shortDescription}</p>
                          </div>

                          {/* Personal notes box */}
                          <div className="mt-4 pt-4 border-t border-outline-variant/30">
                            <label className="block text-xs font-bold text-on-surface-variant mb-1">{t("myNotes")}</label>
                            <textarea 
                              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg p-2 text-sm text-on-surface placeholder-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:outline-none h-16 resize-none"
                              placeholder={t("notesPlaceholder")}
                              value={cat.notes || ""}
                              onChange={(e) => handleUpdateCatNotes(cat.id, e.target.value)}
                            />
                          </div>

                          <button 
                            onClick={() => {
                              // Retrieve breed details or map to preloaded detail profile
                              const staticId = cat.breedName.toLowerCase().replace(/\s+/g, "");
                              handleViewBreedDetail(STANDARD_BREEDS.some(b => b.id === staticId) ? staticId : cat.breedName);
                              // Maintain image state
                              setScanImage(cat.imageUrl);
                            }}
                            className="mt-4 w-full h-10 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Compass className="w-4 h-4" />
                            {t("fullBreedProfile")}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center space-y-4">
                    <Bookmark className="w-12 h-12 text-on-surface-variant/40 mx-auto" />
                    <p className="text-on-surface-variant font-bold">{t("emptyLibraryTitle")}</p>
                    <p className="text-sm text-on-surface-variant max-w-sm mx-auto font-medium">{t("emptyLibraryDescription")}</p>
                  </div>
                )}
              </main>
            )}

            {activeTab === "profile" && (
              /* ==================== SCREEN: PROFILE & DEV TOOLS ==================== */
              <main className="px-4 sm:px-6 pt-6 pb-12 max-w-2xl mx-auto w-full flex-grow space-y-6">
                {/* User Info */}
                <div className="bg-white rounded-[24px] p-6 border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative shrink-0">
                    <input
                      type="file"
                      ref={avatarInputRef}
                      onChange={handleAvatarUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden relative group focus:outline-none"
                      title={t("changeProfilePicture")}
                    >
                      <img className="w-full h-full object-cover" alt={t("navProfile")} src={user.avatarUrl} />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </button>
                  </div>
                  <div className="text-center sm:text-left space-y-2">
                    <h2 className="text-2xl font-bold text-on-surface">{user.name}</h2>
                    <p className="text-sm text-on-surface-variant font-semibold">{user.email}</p>
                  </div>
                </div>

                {/* Preferences / Info */}
                <div className="bg-white rounded-[24px] p-6 border border-outline-variant/30 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-primary">{t("catscopeSettings")}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                      <span className="text-sm font-bold text-on-surface">{t("autoSaveScans")}</span>
                      <span className="text-xs font-bold text-secondary bg-secondary-container px-2 py-1 rounded">{t("on")}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                      <span className="text-sm font-bold text-on-surface">{t("metricWeightUnits")}</span>
                      <span className="text-xs font-bold text-on-surface-variant">{t("unitLbs")}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                      <span className="text-sm font-bold text-on-surface">{t("language")}</span>
                      <LanguageSelector />
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm font-bold text-on-surface">{t("appVersion")}</span>
                      <span className="text-xs font-semibold text-on-surface-variant">{t("appVersionValue")}</span>
                    </div>
                  </div>
                </div>

                {/* Log Out */}
                <button 
                  onClick={() => {
                    if (confirm(t("logOutConfirm"))) {
                      setUser(null);
                    }
                  }}
                  className="w-full bg-surface-container-high border border-outline-variant/30 text-primary font-bold text-sm py-3 rounded-xl squishy-interaction text-center hover:bg-surface-container-highest cursor-pointer"
                >
                  {t("logOut")}
                </button>
              </main>
            )}
          </>
        )}

      </div>

      {/* E. MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 w-full z-50 grid grid-cols-4 items-center bg-white border-t border-outline-variant/20 shadow-lg rounded-t-2xl mobile-bottom-nav">
        <button 
          onClick={() => { setActiveTab("home"); setSelectedBreedId(null); setSelectedBreedDetail(null); setShowBreedDiscoveryPage(false); }}
          className={`flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-200 ${
            activeTab === "home" && !selectedBreedId ? "bg-secondary-container text-on-secondary-container" : "text-on-surface-variant"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] font-bold mt-1">{t("navHome")}</span>
        </button>

        <button 
          onClick={() => { setActiveTab("scan"); setSelectedBreedId(null); setSelectedBreedDetail(null); setShowBreedDiscoveryPage(false); }}
          className={`flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-200 ${
            activeTab === "scan" && !selectedBreedId ? "bg-secondary-container text-on-secondary-container" : "text-on-surface-variant"
          }`}
        >
          <Camera className="w-5 h-5" />
          <span className="text-[11px] font-bold mt-1">{t("navScan")}</span>
        </button>

        <button 
          onClick={() => { setActiveTab("saved"); setSelectedBreedId(null); setSelectedBreedDetail(null); setShowBreedDiscoveryPage(false); }}
          className={`flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-200 ${
            activeTab === "saved" && !selectedBreedId ? "bg-secondary-container text-on-secondary-container" : "text-on-surface-variant"
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="text-[11px] font-bold mt-1">{t("navSaved")}</span>
        </button>

        <button 
          onClick={() => { setActiveTab("profile"); setSelectedBreedId(null); setSelectedBreedDetail(null); setShowBreedDiscoveryPage(false); }}
          className={`flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-200 ${
            activeTab === "profile" && !selectedBreedId ? "bg-secondary-container text-on-secondary-container" : "text-on-surface-variant"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[11px] font-bold mt-1">{t("navProfile")}</span>
        </button>
      </nav>

    </div>
  );
}
