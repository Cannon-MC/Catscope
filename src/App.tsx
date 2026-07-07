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
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Plus,
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
  Sparkle,
  Trash2,
  Save,
  Compass,
  MapPin,
  Calendar,
  Lightbulb
} from "lucide-react";
import { IMAGES, STANDARD_BREEDS } from "./constants";
import { BreedDetail, SavedCat, TabType } from "./types";

export default function App() {
  // Navigation & Authentication
  const [user, setUser] = useState<{ name: string; email: string; avatarUrl: string } | null>({
    name: "Alex",
    email: "alex@example.com",
    avatarUrl: IMAGES.userProfile
  });
  
  // App views & flows
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [selectedBreedId, setSelectedBreedId] = useState<string | null>(null);
  const [selectedBreedDetail, setSelectedBreedDetail] = useState<BreedDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  // Login form state
  const [email, setEmail] = useState("name@example.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  // Search input
  const [searchQuery, setSearchQuery] = useState("");

  // Storage / Saved Cats
  const [savedCats, setSavedCats] = useState<SavedCat[]>([]);

  // Modals & Interactive features
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const [showErrorScreen, setShowErrorScreen] = useState(false);

  // Scan state
  const [scanImage, setScanImage] = useState<string | null>(null);
  const [scanMimeType, setScanMimeType] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  
  // Interactive presets to scan instantly
  const scanPresets = [
    {
      name: "Maine Coon (Classic)",
      img: IMAGES.cameraFeed,
      description: "Majestic fluffy orange giant sitting indoor"
    },
    {
      name: "Cute Calico",
      img: IMAGES.calicoLogin,
      description: "Warm amber eyes, tri-color calico close-up"
    }
  ];

  // Nutrition state
  const [catWeight, setCatWeight] = useState(10); // in lbs
  const [activityLevel, setActivityLevel] = useState<"low" | "medium" | "high">("medium");
  const [completedMeals, setCompletedMeals] = useState<Record<string, boolean>>({
    breakfast: true,
    lunch: false,
    dinner: false
  });

  // Vitals state
  const [vitalsHeartRate, setVitalsHeartRate] = useState(130);
  const [vitalsWeight, setVitalsWeight] = useState(10.4);
  const [vitalsIsMeasuring, setVitalsIsMeasuring] = useState(false);
  const [vitalsCompleted, setVitalsCompleted] = useState(false);

  // File Upload trigger
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          shortDescription: "Gentle giant with snowshoe paws from North America.",
          scannedAt: "2026-07-05T14:32:00Z",
          imageUrl: IMAGES.maineCoon,
          notes: "Met this absolute unit at the park. So soft!"
        },
        {
          id: "2",
          breedName: "Ragdoll",
          shortDescription: "Gentle, affectionate, and famously docile lap cats.",
          scannedAt: "2026-07-04T09:15:00Z",
          imageUrl: IMAGES.ragdoll,
          notes: "Very fluffy and went limp when I held him."
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

  // Log in
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      name: "Alex",
      email: email,
      avatarUrl: IMAGES.userProfile
    });
    setActiveTab("home");
  };

  // View specific breed details (either static preloaded or through endpoint)
  const handleViewBreedDetail = async (id: string) => {
    setSelectedBreedId(id);
    setSelectedBreedDetail(null);
    setIsDetailLoading(true);
    try {
      const res = await fetch(`/api/breeds/${id}`);
      const result = await res.json();
      if (result.success) {
        setSelectedBreedDetail(result.data);
      } else {
        setScanError(result.error || "Failed to load breed details.");
      }
    } catch (err) {
      console.error(err);
      setScanError("Unable to connect to service.");
    } finally {
      setIsDetailLoading(false);
    }
  };

  // Scan execution
  const handleRunScan = async (base64Image: string, mimeType: string = "image/jpeg") => {
    setIsScanning(true);
    setScanError(null);
    try {
      const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
      
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: cleanBase64, mimeType })
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        const payload: BreedDetail = result.data;
        if (payload.isCat === false) {
          setScanError("No cat was detected in this image. Please capture or select a clear picture of a cat!");
          setIsScanning(false);
          return;
        }
        
        // Success
        setSelectedBreedDetail(payload);
        setSelectedBreedId(payload.breedName);
        
        // Auto-save scanned cat to list
        const newSaved: SavedCat = {
          id: Date.now().toString(),
          breedName: payload.breedName,
          shortDescription: payload.shortDescription,
          scannedAt: new Date().toISOString(),
          imageUrl: base64Image.startsWith("data:") ? base64Image : `data:${mimeType};base64,${cleanBase64}`,
          notes: result.isDemoFallback ? "Scanned in Demo Mode! Add your notes here." : "Identified with CatScope AI!"
        };
        saveCatsToStorage([newSaved, ...savedCats]);
      } else {
        setScanError(result.error || "Identification failed. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setScanError("Network or server connection issue. Please verify your internet connection.");
    } finally {
      setIsScanning(false);
    }
  };

  // Photo upload handling
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setScanImage(reader.result);
        setScanMimeType(file.type);
        handleRunScan(reader.result, file.type);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Preset Selection for immediate scanning
  const handleScanPreset = async (presetImgUrl: string) => {
    setIsScanning(true);
    setScanError(null);
    setScanImage(presetImgUrl);

    try {
      // We convert preset hotlinks to base64 via a quick fetch to server proxy if needed,
      // or we can pass the URL or let server handle it. Here, we can fetch & convert to base64
      const response = await fetch(presetImgUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          handleRunScan(reader.result, blob.type);
        }
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      // Fallback: If image fetch is CORS blocked in preview sandbox, simulate scanning directly by asking server
      // our endpoint handles errors gracefully
      handleRunScan(presetImgUrl, "image/jpeg");
    }
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
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  // Search filtered breeds
  const filteredBreeds = STANDARD_BREEDS.filter(
    b => b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         b.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Daily Nutrition formula
  const calculatedCalories = Math.round(
    activityLevel === "low" ? catWeight * 20 : activityLevel === "medium" ? catWeight * 24 : catWeight * 30
  );

  // Vitals simulation run
  const runVitalsSimulation = () => {
    setVitalsIsMeasuring(true);
    setVitalsCompleted(false);
    let count = 0;
    const interval = setInterval(() => {
      setVitalsHeartRate(Math.floor(120 + Math.random() * 25));
      setVitalsWeight(Number((10.0 + Math.random() * 0.8).toFixed(1)));
      count++;
      if (count > 15) {
        clearInterval(interval);
        setVitalsIsMeasuring(false);
        setVitalsCompleted(true);
      }
    }, 150);
  };

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
        imageUrl: selectedBreedId ? (STANDARD_BREEDS.find(b => b.id === selectedBreedId)?.image || IMAGES.cameraFeed) : IMAGES.cameraFeed,
        notes: "Saved from search explorer!"
      };
      saveCatsToStorage([newSaved, ...savedCats]);
    }
  };

  // Trigger flash shutter simulation
  const handleTriggerShutter = () => {
    if (!scanImage) {
      // Trigger preset or mock upload if no image
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
      return;
    }
    // Simulate shutter click flash overlay
    const flashOverlay = document.createElement("div");
    flashOverlay.className = "fixed inset-0 bg-white z-50 transition-opacity duration-300 opacity-100";
    document.body.appendChild(flashOverlay);
    setTimeout(() => {
      flashOverlay.style.opacity = "0";
      setTimeout(() => flashOverlay.remove(), 300);
    }, 50);
    
    handleRunScan(scanImage, scanMimeType || "image/jpeg");
  };

  // 1. FALLBACK / MOCK INTERNET CONNECTION ERROR VIEW
  if (showErrorScreen) {
    return (
      <div id="error-screen" className="bg-surface text-on-surface min-h-screen flex flex-col font-sans">
        <header className="bg-surface flex justify-between items-center px-6 h-14 w-full fixed top-0 z-50 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl font-bold">pets</span>
            <span className="font-bold text-xl text-primary tracking-tight font-sans">CatScope</span>
          </div>
          <button 
            onClick={() => setShowErrorScreen(false)}
            className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant"
          >
            <X className="w-5 h-5" />
          </button>
        </header>
        
        <main className="flex-grow flex flex-col items-center justify-center px-6 pt-16 pb-20">
          <div className="w-full max-w-sm text-center space-y-6">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-700"></div>
              <div className="relative w-full aspect-square overflow-hidden rounded-[40px] shadow-sm border border-outline-variant/30">
                <img 
                  alt="Error illustration - Cat with cables" 
                  className="w-full h-full object-cover" 
                  src={IMAGES.cableChewing}
                />
              </div>
            </div>

            <div className="space-y-3 px-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight font-sans">
                Oops! There appears to be a problem.
              </h2>
              <p className="text-base text-on-surface-variant leading-relaxed">
                It looks like a little helper might have disconnected the internet. Let's get you back on track.
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full pt-2">
              <button 
                onClick={() => {
                  setShowErrorScreen(false);
                  setActiveTab("home");
                }}
                className="squishy-interaction w-full h-[56px] bg-primary text-on-primary rounded-full font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:brightness-110"
              >
                <RefreshCw className="w-5 h-5 animate-spin" />
                Try Again
              </button>
            </div>

            <button 
              onClick={() => alert("Support ticket simulated. We'll secure the cables from kitty chewing soon!")}
              className="text-on-surface-variant font-medium text-xs underline decoration-outline-variant/50 underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
            >
              Contact support if this persists
            </button>
          </div>
        </main>
      </div>
    );
  }

  // 2. UNAUTHENTICATED / LOGIN VIEW
  if (!user) {
    return (
      <div id="login-view" className="bg-background text-on-background min-h-screen flex flex-col font-sans overflow-x-hidden relative">
        <header className="flex justify-center items-center px-6 h-20 w-full bg-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">pets</span>
            <h1 className="text-2xl font-bold text-primary tracking-tight font-sans">CatScope</h1>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center px-6 pb-12 relative overflow-hidden">
          {/* Ambient organic blobs for Boutique style */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-fixed opacity-20 organic-blob blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary-fixed opacity-10 organic-blob blur-3xl pointer-events-none"></div>

          {/* Hero Content */}
          <div className="text-center mb-8 w-full max-w-sm z-10">
            <div className="mb-4 inline-block">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-surface-container shadow-sm">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Happy calico cat" 
                  src={IMAGES.calicoLogin}
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-on-surface mb-2 font-sans">
              {isLoginView ? "Welcome Back, Cat Lover!" : "Join CatScope Today!"}
            </h2>
            <p className="text-base text-on-surface-variant px-4">
              {isLoginView 
                ? "Log in to keep track of your feline friends and their health journeys."
                : "Create a pet profile, identify breeds with AI, and track their daily vitals."
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4 z-10 transition-all duration-300">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-on-surface-variant ml-1" htmlFor="email">Email Address</label>
              <div className="relative flex items-center bg-surface-container-low border border-outline-variant rounded-xl transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                <Mail className="absolute left-4 text-on-surface-variant w-5 h-5" />
                <input 
                  id="email"
                  type="email" 
                  className="w-full bg-transparent border-none py-4 pl-12 pr-4 text-base text-on-surface placeholder-on-surface-variant/40 rounded-xl focus:outline-none"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-on-surface-variant ml-1" htmlFor="password">Password</label>
              <div className="relative flex items-center bg-surface-container-low border border-outline-variant rounded-xl transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                <Lock className="absolute left-4 text-on-surface-variant w-5 h-5" />
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"} 
                  className="w-full bg-transparent border-none py-4 pl-12 pr-12 text-base text-on-surface placeholder-on-surface-variant/40 rounded-xl focus:outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-on-surface-variant/60 hover:text-primary transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {isLoginView && (
                <div className="flex justify-end mt-1">
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("Use 'password' to login to this demo!"); }} className="text-sm font-semibold text-primary hover:underline transition-all">
                    Forgot Password?
                  </a>
                </div>
              )}
            </div>

            {/* Submit */}
            <button 
              type="submit"
              className="w-full h-14 mt-4 bg-primary text-on-primary font-bold text-lg rounded-full shadow-sm hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoginView ? "Log In" : "Sign Up"}
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-2">
              <div className="flex-grow h-px bg-outline-variant/40"></div>
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">or continue with</span>
              <div className="flex-grow h-px bg-outline-variant/40"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setUser({ name: "Google Friend", email: "google@catscope.com", avatarUrl: IMAGES.userProfile })}
                className="flex-1 h-12 border border-outline-variant rounded-xl flex items-center justify-center bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="text-sm font-semibold">Google</span>
              </button>
              
              <button 
                type="button"
                onClick={() => setUser({ name: "Apple Friend", email: "apple@catscope.com", avatarUrl: IMAGES.userProfile })}
                className="flex-1 h-12 border border-outline-variant rounded-xl flex items-center justify-center bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-black mr-2">apps</span>
                <span className="text-sm font-semibold">Apple</span>
              </button>
            </div>
          </form>

          {/* Switch link */}
          <div className="mt-8 text-center z-10">
            <p className="text-sm text-on-surface-variant">
              {isLoginView ? "New to CatScope? " : "Already have an account? "}
              <button 
                onClick={() => setIsLoginView(!isLoginView)} 
                className="text-primary font-bold hover:underline transition-all focus:outline-none"
              >
                {isLoginView ? "Sign Up" : "Log In"}
              </button>
            </p>
          </div>
        </main>

        <footer className="py-8 flex justify-center opacity-30 pointer-events-none">
          <div className="flex gap-4 text-primary">
            <span className="material-symbols-outlined">pets</span>
            <span className="material-symbols-outlined">favorite</span>
            <span className="material-symbols-outlined">pets</span>
          </div>
        </footer>
      </div>
    );
  }

  // 3. MAIN AUTHENTICATED APP SYSTEM
  return (
    <div className="min-h-screen bg-background text-on-background font-sans flex flex-col md:flex-row pb-24 md:pb-0 relative">
      
      {/* A. DESKTOP SIDEBAR NAVIGATION */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-20 flex-col items-center py-6 gap-8 bg-surface border-r border-outline-variant/30 z-50">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-2xl font-bold">pets</span>
        </div>

        <nav className="flex flex-col gap-4 mt-6">
          <button 
            onClick={() => { setActiveTab("home"); setSelectedBreedId(null); setSelectedBreedDetail(null); }}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all squishy-interaction ${
              activeTab === "home" && !selectedBreedId ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
            title="Home"
          >
            <Home className="w-5 h-5" />
          </button>

          <button 
            onClick={() => { setActiveTab("scan"); setSelectedBreedId(null); setSelectedBreedDetail(null); }}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all squishy-interaction ${
              activeTab === "scan" && !selectedBreedId ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
            title="AI Scan"
          >
            <Camera className="w-5 h-5" />
          </button>

          <button 
            onClick={() => { setActiveTab("saved"); setSelectedBreedId(null); setSelectedBreedDetail(null); }}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all squishy-interaction ${
              activeTab === "saved" && !selectedBreedId ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
            title="Saved Library"
          >
            <Bookmark className="w-5 h-5" />
          </button>

          <button 
            onClick={() => { setActiveTab("profile"); setSelectedBreedId(null); setSelectedBreedDetail(null); }}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all squishy-interaction ${
              activeTab === "profile" && !selectedBreedId ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
            title="Profile & Settings"
          >
            <User className="w-5 h-5" />
          </button>
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <button 
            onClick={() => setShowErrorScreen(true)}
            className="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-2xl transition-all"
            title="Test Error Page"
          >
            <AlertCircle className="w-5 h-5 text-primary" />
          </button>
          
          <div className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden">
            <img className="w-full h-full object-cover" alt="User avatar" src={user.avatarUrl} />
          </div>
        </div>
      </div>

      {/* B. MOBILE HEADER BAR */}
      <header className="md:hidden bg-surface flex justify-between items-center px-6 h-14 w-full fixed top-0 z-50 border-b border-outline-variant/10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl font-bold">pets</span>
          <span className="font-bold text-xl text-primary tracking-tight">CatScope</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowErrorScreen(true)}
            className="p-1.5 rounded-full hover:bg-surface-container-low text-primary flex items-center justify-center"
            title="Simulate Error View"
          >
            <AlertCircle className="w-5 h-5" />
          </button>
          
          <div className="w-8 h-8 rounded-full border border-secondary overflow-hidden">
            <img className="w-full h-full object-cover" alt="User profile icon" src={user.avatarUrl} />
          </div>
        </div>
      </header>

      {/* C. MAIN WORKSPACE CONTENT */}
      <div className="flex-1 md:pl-20 pt-14 md:pt-0 min-h-screen flex flex-col">
        
        {/* VIEW ROUTER FOR BREED DETAIL OR CURRENT SELECTED TAB */}
        {selectedBreedId ? (
          /* ==================== SCREEN: BREED DETAIL VIEW ==================== */
          <main className="max-w-4xl mx-auto px-6 py-6 w-full flex-grow">
            <button 
              onClick={() => { setSelectedBreedId(null); setSelectedBreedDetail(null); }}
              className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-4 font-semibold text-sm focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {activeTab === "saved" ? "Library" : "Discovery"}</span>
            </button>

            {isDetailLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-on-surface-variant">
                <RefreshCw className="w-10 h-10 text-primary animate-spin" />
                <p className="font-semibold text-base animate-pulse">Consulting feline encyclopedias...</p>
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
                          selectedBreedId === "ragdoll" ? IMAGES.ragdoll :
                          selectedBreedId === "bengal" ? IMAGES.bengal :
                          selectedBreedId === "mainecoon" ? IMAGES.maineCoon :
                          scanImage || IMAGES.cameraFeed
                        }
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-semibold text-xs shadow-sm">
                          {selectedBreedDetail.lifespan} average
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
                          title={isSaved ? "Remove from Library" : "Save to Library"}
                        >
                          <Bookmark className={`w-6 h-6 ${isSaved ? "fill-primary text-primary" : "text-on-surface-variant"}`} />
                        </button>
                      </div>
                      
                      <p className="text-lg text-on-surface-variant mb-6 leading-relaxed">
                        {selectedBreedDetail.shortDescription}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-surface-container-high px-4 py-2 rounded-full font-semibold text-xs border border-outline-variant/20 flex items-center gap-2 text-on-surface">
                          <Compass className="w-4 h-4 text-primary" /> Region: {selectedBreedDetail.origin}
                        </span>
                        <span className="bg-surface-container-high px-4 py-2 rounded-full font-semibold text-xs border border-outline-variant/20 flex items-center gap-2 text-on-surface">
                          <Clock className="w-4 h-4 text-primary" /> Lifespan: {selectedBreedDetail.lifespan}
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
                      <FileText className="w-5 h-5" /> Breed Profile
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
                      <h3 className="text-xs font-bold text-on-secondary-container uppercase tracking-wider mb-4">Top Traits</h3>
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
                      onClick={() => alert("Care guide PDF download simulated. Kitty-proofing guidelines are saved!")}
                      className="mt-8 bg-primary text-on-primary w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 squishy-interaction shadow-md hover:brightness-110"
                    >
                      <Download className="w-4 h-4" />
                      Download Care Guide
                    </button>
                  </div>
                </div>

                {/* Pros & Cons Section */}
                <div className="bg-white rounded-[24px] p-6 md:p-8 border border-outline-variant/30 shadow-sm">
                  <h2 className="text-xl font-bold text-primary mb-6">Is it the right cat for you?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Pros */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-sm text-secondary uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-secondary" /> The Pros
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
                        <XCircle className="w-5 h-5 text-primary" /> The Cons
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
                      <Heart className="w-5 h-5 text-primary" /> Health & Care Routine
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
                    <h3 className="text-xl font-bold mb-2 text-primary-fixed-dim">Did you know?</h3>
                    <p className="text-base text-white/90 leading-relaxed font-medium">
                      {selectedBreedDetail.funFact || "Maine Coons are the only native American long-haired breed and have highly functional winter attributes."}
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
                <p className="text-on-surface-variant font-medium">Something went wrong while retrieving detail. Back out and try again!</p>
              </div>
            )}
          </main>
        ) : (
          /* ==================== SCREEN CHANGER BY TABS ==================== */
          <>
            {activeTab === "home" && (
              /* ==================== SCREEN: DASHBOARD ==================== */
              <main className="px-6 pt-6 pb-12 max-w-4xl mx-auto w-full flex-grow space-y-8">
                {/* Welcome Header */}
                <section className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-extrabold text-on-surface mb-1 font-sans">
                      Hello, {user.name}!
                    </h1>
                    <p className="text-base text-on-surface-variant font-medium">
                      Your feline companions are doing great today.
                    </p>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                      <Search className="w-5 h-5" />
                    </div>
                    <input 
                      className="w-full h-12 pl-12 pr-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-base font-medium transition-all shadow-sm"
                      placeholder="Search cat breeds..." 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </section>

                {/* Breed Discovery */}
                <section className="space-y-4">
                  <div className="flex justify-between items-end">
                    <h2 className="text-xl font-extrabold text-on-surface tracking-tight">Breed Discovery</h2>
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")} 
                        className="text-sm font-semibold text-primary hover:underline"
                      >
                        Clear Search
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredBreeds.length > 0 ? (
                      filteredBreeds.map((breed) => (
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
                                Featured
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
                        No breeds match your search term.
                      </div>
                    )}
                  </div>
                </section>

                {/* Daily Care Stack */}
                <section className="space-y-6">
                  <h2 className="text-xl font-extrabold text-on-surface tracking-tight">Daily Care</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nutrition Card */}
                    <div 
                      onClick={() => setShowNutritionModal(true)}
                      className="bg-surface-container-lowest border border-outline-variant rounded-[24px] p-4 flex gap-4 items-center card-shadow squishy-interaction cursor-pointer"
                    >
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                        <img alt="Nutrition meal prep" className="w-full h-full object-cover" src={IMAGES.nutrition} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-on-surface">Nutrition Planner</h3>
                        <p className="text-sm text-on-surface-variant mb-2">Track dietary needs & daily meals</p>
                        <div className="flex items-center gap-1 text-secondary font-semibold text-sm">
                          <span>Manage Plan</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Vitals Check Card */}
                    <div 
                      onClick={() => { setShowVitalsModal(true); runVitalsSimulation(); }}
                      className="bg-surface-container-lowest border border-outline-variant rounded-[24px] p-4 flex gap-4 items-center card-shadow squishy-interaction cursor-pointer"
                    >
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                        <img alt="Vitals monitor kit" className="w-full h-full object-cover" src={IMAGES.vitals} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-on-surface">Vitals Check</h3>
                        <p className="text-sm text-on-surface-variant mb-2">Monitor heart rate & weight metrics</p>
                        <div className="flex items-center gap-1 text-secondary font-semibold text-sm">
                          <span>New Scan</span>
                          <Plus className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Weekly tip section */}
                <section>
                  <div className="bg-secondary-container rounded-[32px] p-6 md:p-8 relative overflow-hidden">
                    <div className="relative z-10 md:w-2/3">
                      <span className="text-on-secondary-container font-bold text-xs uppercase tracking-wider mb-2 block">Weekly Tip</span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-on-secondary-container mb-4">Keeping Hydrated</h2>
                      <p className="text-base text-on-secondary-container opacity-90 mb-6 font-medium">
                        Cats often prefer running water to stagnant bowls. Consider getting an active drinking fountain to encourage more frequent drinking habits and support robust kidney function.
                      </p>
                      <button 
                        onClick={() => alert("Fun Tip! Adding one ice cube to your kitty's bowl also stimulates curiosity and drinking interest.")}
                        className="bg-on-secondary-container text-white px-6 py-3 rounded-full font-bold text-sm squishy-interaction cursor-pointer hover:opacity-90"
                      >
                        Learn More
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
              <main className="flex-grow flex flex-col px-6 py-4 relative max-w-3xl mx-auto w-full">
                {/* Camera Feed Container */}
                <div className="flex-1 min-h-[400px] relative rounded-[32px] overflow-hidden shadow-xl border-4 border-surface-container-highest bg-surface-dim">
                  
                  {/* Display selected scanning picture */}
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="Simulated live camera preview of majestic cat" 
                      src={scanImage || IMAGES.cameraFeed} 
                    />
                  </div>

                  {/* Overlays / Viewfinder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none camera-overlay-gradient">
                    
                    {/* Status badges */}
                    <div className="absolute top-6 left-0 right-0 flex justify-center gap-4 px-6 pointer-events-auto">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
                        <span className={`w-2.5 h-2.5 rounded-full ${flashOn ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`}></span>
                        <span className="text-white font-bold text-xs">Optimal Light</span>
                      </div>
                      
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed-dim"></span>
                        <span className="text-white font-bold text-xs">Focus Locked</span>
                      </div>
                    </div>

                    {/* Framing corners */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white/80 rounded-tl-2xl"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white/80 rounded-tr-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white/80 rounded-bl-2xl"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white/80 rounded-br-2xl"></div>

                      {/* Moving Scanner Laser Bar */}
                      {isScanning && (
                        <div className="absolute left-0 right-0 h-1 bg-primary scan-line shadow-[0_0_15px_rgba(153,70,42,1)]"></div>
                      )}
                      
                      {/* Interactive presets wrapper inside camera feed */}
                      {!isScanning && !scanImage && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 backdrop-blur-sm pointer-events-auto rounded-[24px] p-4 text-center text-white">
                          <p className="text-sm font-bold">Select a preset to test AI identification instantly:</p>
                          <div className="flex flex-col gap-2 w-full max-w-xs mt-2">
                            {scanPresets.map((preset, idx) => (
                              <button 
                                key={idx}
                                onClick={() => handleScanPreset(preset.img)}
                                className="w-full bg-primary/95 text-white font-bold text-xs py-2.5 rounded-xl hover:brightness-110 squishy-interaction cursor-pointer"
                              >
                                {preset.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Scan prompt overlay */}
                    <div className="absolute bottom-6 text-center w-full px-6">
                      <p className="text-white font-semibold text-sm drop-shadow-md bg-black/30 px-4 py-1.5 rounded-full inline-block">
                        {isScanning ? "AI Identification in progress..." : "Point at a cat & click Shutter"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shutter controls section */}
                <div className="mt-4 mb-20 z-10">
                  <div className="bg-surface-container-low/95 backdrop-blur-xl rounded-[32px] p-5 flex items-center justify-around shadow-lg border border-outline-variant/30">
                    
                    {/* Gallery upload */}
                    <div className="flex flex-col items-center gap-1">
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors focus:outline-none"
                        title="Upload Cat Photo"
                      >
                        <Upload className="w-5 h-5" />
                      </button>
                      <span className="text-xs font-bold text-on-surface-variant">Gallery</span>
                    </div>

                    {/* Big Shutter trigger button */}
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 blur-xl"></div>
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
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors focus:outline-none ${
                          flashOn ? "bg-amber-100 text-amber-600" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                        }`}
                        title="Toggle Flash State"
                      >
                        <Zap className="w-5 h-5" />
                      </button>
                      <span className="text-xs font-bold text-on-surface-variant">Flash</span>
                    </div>
                  </div>
                </div>

                {/* Error handling block */}
                {scanError && (
                  <div className="mt-2 bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 text-red-800 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                    <div>
                      <p className="font-bold">Scan Problem</p>
                      <p className="font-medium">{scanError}</p>
                      <button 
                        onClick={() => setScanError(null)} 
                        className="mt-1 text-xs font-bold underline cursor-pointer text-red-900 block"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </main>
            )}

            {activeTab === "saved" && (
              /* ==================== SCREEN: SAVED LIBRARY ==================== */
              <main className="px-6 pt-6 pb-12 max-w-4xl mx-auto w-full flex-grow space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-extrabold text-on-surface tracking-tight">Saved Feline Library</h1>
                    <p className="text-sm text-on-surface-variant font-medium">Your customized cat encyclopedia entries ({savedCats.length})</p>
                  </div>
                  <button 
                    onClick={() => {
                      if (confirm("Are you sure you want to clear your saved library?")) {
                        saveCatsToStorage([]);
                      }
                    }}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Clear All
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
                              title="Delete entry"
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
                            <label className="block text-xs font-bold text-on-surface-variant mb-1">My Notes:</label>
                            <textarea 
                              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg p-2 text-sm text-on-surface placeholder-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:outline-none h-16 resize-none"
                              placeholder="Add personal observations or notes about this companion..."
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
                            Full Breed Profile
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center space-y-4">
                    <Bookmark className="w-12 h-12 text-on-surface-variant/40 mx-auto" />
                    <p className="text-on-surface-variant font-bold">Your library is currently empty.</p>
                    <p className="text-sm text-on-surface-variant max-w-sm mx-auto font-medium">Head over to the AI Scanner tab to snap a photo, or explore our breeds list to save companions to your collection!</p>
                  </div>
                )}
              </main>
            )}

            {activeTab === "profile" && (
              /* ==================== SCREEN: PROFILE & DEV TOOLS ==================== */
              <main className="px-6 pt-6 pb-12 max-w-2xl mx-auto w-full flex-grow space-y-6">
                {/* User Info */}
                <div className="bg-white rounded-[24px] p-6 border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden shrink-0">
                    <img className="w-full h-full object-cover" alt="User avatar" src={user.avatarUrl} />
                  </div>
                  <div className="text-center sm:text-left space-y-2">
                    <h2 className="text-2xl font-bold text-on-surface">{user.name}</h2>
                    <p className="text-sm text-on-surface-variant font-semibold">{user.email}</p>
                    
                    <div className="flex gap-2 justify-center sm:justify-start">
                      <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                        Cat Enthusiast Level 4
                      </span>
                      <span className="bg-secondary-container text-on-secondary-container text-xs font-bold px-3 py-1 rounded-full">
                        {savedCats.length} Companions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Preferences / Info */}
                <div className="bg-white rounded-[24px] p-6 border border-outline-variant/30 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-primary">CatScope Settings</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                      <span className="text-sm font-bold text-on-surface">Auto-Save Scans</span>
                      <span className="text-xs font-bold text-secondary bg-secondary-container px-2 py-1 rounded">ON</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                      <span className="text-sm font-bold text-on-surface">Metric Weight Units (kg/lbs)</span>
                      <span className="text-xs font-bold text-on-surface-variant">lbs</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm font-bold text-on-surface">App Version</span>
                      <span className="text-xs font-semibold text-on-surface-variant">v2.4 (Plus Jakarta Sans)</span>
                    </div>
                  </div>
                </div>

                {/* Dev Test Error Screen triggers per screenshot */}
                <div className="bg-primary-fixed/20 rounded-[24px] p-6 border border-outline-variant/40 space-y-4">
                  <h3 className="text-lg font-bold text-primary">Demonstration & Mock Screen Testing</h3>
                  <p className="text-sm text-on-surface-variant font-medium">
                    The prompt contains mock screens. Click the button below to test and inspect the Connection Error page layout perfectly matching the design specification.
                  </p>
                  <button 
                    onClick={() => setShowErrorScreen(true)}
                    className="w-full bg-primary text-on-primary font-bold text-sm py-3 rounded-xl squishy-interaction shadow-md flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Open Cable Chewing / Connection Error Page
                  </button>
                </div>

                {/* Log Out */}
                <button 
                  onClick={() => {
                    if (confirm("Are you sure you want to log out of CatScope?")) {
                      setUser(null);
                    }
                  }}
                  className="w-full bg-surface-container-high border border-outline-variant/30 text-primary font-bold text-sm py-3 rounded-xl squishy-interaction text-center hover:bg-surface-container-highest cursor-pointer"
                >
                  Log Out
                </button>
              </main>
            )}
          </>
        )}

        {/* D. FOOTER LOGO DECORATION */}
        <footer className="py-8 flex justify-center opacity-35 pointer-events-none mt-auto">
          <div className="flex gap-4 text-primary">
            <span className="material-symbols-outlined">pets</span>
            <span className="material-symbols-outlined">favorite</span>
            <span className="material-symbols-outlined">pets</span>
          </div>
        </footer>
      </div>

      {/* E. MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center py-2 px-4 bg-white border-t border-outline-variant/20 shadow-lg rounded-t-xl h-20">
        <button 
          onClick={() => { setActiveTab("home"); setSelectedBreedId(null); setSelectedBreedDetail(null); }}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 ${
            activeTab === "home" && !selectedBreedId ? "bg-secondary-container text-on-secondary-container" : "text-on-surface-variant"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] font-bold mt-1">Home</span>
        </button>

        <button 
          onClick={() => { setActiveTab("scan"); setSelectedBreedId(null); setSelectedBreedDetail(null); }}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 ${
            activeTab === "scan" && !selectedBreedId ? "bg-secondary-container text-on-secondary-container" : "text-on-surface-variant"
          }`}
        >
          <Camera className="w-5 h-5" />
          <span className="text-[11px] font-bold mt-1">Scan</span>
        </button>

        <button 
          onClick={() => { setActiveTab("saved"); setSelectedBreedId(null); setSelectedBreedDetail(null); }}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 ${
            activeTab === "saved" && !selectedBreedId ? "bg-secondary-container text-on-secondary-container" : "text-on-surface-variant"
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="text-[11px] font-bold mt-1">Saved</span>
        </button>

        <button 
          onClick={() => { setActiveTab("profile"); setSelectedBreedId(null); setSelectedBreedDetail(null); }}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 ${
            activeTab === "profile" && !selectedBreedId ? "bg-secondary-container text-on-secondary-container" : "text-on-surface-variant"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[11px] font-bold mt-1">Profile</span>
        </button>
      </nav>

      {/* ==================== DIALOG MODAL: NUTRITION PLANNER ==================== */}
      {showNutritionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl border border-outline-variant/30 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-primary text-on-primary p-6 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-2xl font-bold">pets</span>
                <h3 className="font-extrabold text-lg text-white font-sans">Nutrition Planner</h3>
              </div>
              <button 
                onClick={() => setShowNutritionModal(false)}
                className="text-white hover:opacity-80 p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-on-surface">
              {/* Image banner */}
              <div className="h-32 rounded-2xl overflow-hidden">
                <img alt="Feline wet food nutrition bowl" className="w-full h-full object-cover" src={IMAGES.nutrition} />
              </div>

              {/* Slider for cat weight */}
              <div className="space-y-2">
                <div className="flex justify-between items-center font-bold text-sm">
                  <span>Companion Weight:</span>
                  <span className="text-primary">{catWeight} lbs</span>
                </div>
                <input 
                  type="range" 
                  min="4" 
                  max="25" 
                  step="1"
                  className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                  value={catWeight}
                  onChange={(e) => setCatWeight(Number(e.target.value))}
                />
              </div>

              {/* Activity Level Selector */}
              <div className="space-y-2">
                <label className="block text-sm font-bold">Activity Level:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["low", "medium", "high"] as const).map((level) => (
                    <button 
                      key={level}
                      onClick={() => setActivityLevel(level)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer capitalize ${
                        activityLevel === level 
                          ? "bg-secondary text-white border-secondary shadow-sm" 
                          : "bg-surface border-outline-variant/40 hover:bg-surface-container-low"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Result Display */}
              <div className="bg-secondary-container/35 rounded-2xl p-4 text-center border border-secondary-container/50">
                <span className="text-xs uppercase tracking-widest font-bold text-on-secondary-container block mb-1">Recommended Intake</span>
                <h4 className="text-2xl font-black text-on-secondary-container font-sans">{calculatedCalories} kcal <span className="text-sm font-medium">/ day</span></h4>
              </div>

              {/* Daily Feeding Checklists */}
              <div className="space-y-3">
                <span className="block text-sm font-bold">Today's Meals Checklist:</span>
                <div className="space-y-2">
                  {Object.entries(completedMeals).map(([meal, isDone]) => (
                    <div 
                      key={meal}
                      onClick={() => setCompletedMeals({ ...completedMeals, [meal]: !isDone })}
                      className="flex items-center gap-3 p-3 bg-surface-container-low border border-outline-variant/15 rounded-xl cursor-pointer hover:bg-surface-container transition-colors"
                    >
                      <input 
                        type="checkbox" 
                        checked={isDone}
                        readOnly
                        className="rounded border-outline-variant/30 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                      <span className={`text-sm font-bold capitalize ${isDone ? "line-through text-on-surface-variant/50" : "text-on-surface"}`}>
                        {meal} Feed
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Save */}
            <div className="p-4 bg-surface border-t border-outline-variant/20 flex gap-2">
              <button 
                onClick={() => {
                  alert(`Nutrition saved! Target daily calories set to ${calculatedCalories} kcal.`);
                  setShowNutritionModal(false);
                }}
                className="w-full bg-primary text-on-primary font-bold py-3 rounded-full hover:brightness-110 shadow-md squishy-interaction cursor-pointer"
              >
                Save Intake Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== DIALOG MODAL: VITALS SCANNED METRICS ==================== */}
      {showVitalsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl border border-outline-variant/30 flex flex-col">
            {/* Header */}
            <div className="bg-primary text-on-primary p-6 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-2xl font-bold">pets</span>
                <h3 className="font-extrabold text-lg text-white font-sans">Feline Vitals Scanner</h3>
              </div>
              <button 
                onClick={() => setShowVitalsModal(false)}
                className="text-white hover:opacity-80 p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content body */}
            <div className="p-6 space-y-6 text-on-surface">
              {/* Image banner */}
              <div className="h-32 rounded-2xl overflow-hidden">
                <img alt="Pet veterinary vitals stethoscope" className="w-full h-full object-cover" src={IMAGES.vitals} />
              </div>

              {/* Status display */}
              <div className="text-center space-y-2">
                {vitalsIsMeasuring ? (
                  <div className="space-y-2">
                    <div className="flex justify-center items-center gap-1.5 text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                      <span className="text-sm font-extrabold animate-pulse">Positioning stethoscope & weight sensors...</span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-medium">Please secure your kitty comfortably on the platform pad.</p>
                  </div>
                ) : vitalsCompleted ? (
                  <div className="flex justify-center items-center gap-1 text-secondary text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    <span>Scan completed successfully!</span>
                  </div>
                ) : (
                  <p className="text-sm font-bold text-on-surface-variant">Press Measure button to start tracking.</p>
                )}
              </div>

              {/* Double Metrics Presentation */}
              <div className="grid grid-cols-2 gap-4">
                {/* Heart Rate */}
                <div className="bg-surface-container rounded-2xl p-4 text-center border border-outline-variant/20 relative overflow-hidden">
                  <span className="text-xs font-bold text-on-surface-variant uppercase block mb-1">Heart Rate</span>
                  <h4 className={`text-3xl font-black font-sans ${vitalsIsMeasuring ? "text-primary animate-pulse" : "text-primary"}`}>
                    {vitalsHeartRate} <span className="text-sm font-medium">BPM</span>
                  </h4>
                  <p className="text-[10px] font-bold text-secondary mt-1 block">Normal Range: 120-140</p>
                </div>

                {/* Weight */}
                <div className="bg-surface-container rounded-2xl p-4 text-center border border-outline-variant/20 relative overflow-hidden">
                  <span className="text-xs font-bold text-on-surface-variant uppercase block mb-1">Weight</span>
                  <h4 className={`text-3xl font-black font-sans ${vitalsIsMeasuring ? "text-primary animate-pulse" : "text-primary"}`}>
                    {vitalsWeight} <span className="text-sm font-medium">lbs</span>
                  </h4>
                  <p className="text-[10px] font-bold text-secondary mt-1 block">Healthy Companion</p>
                </div>
              </div>

              {/* Simulation button */}
              <button 
                onClick={runVitalsSimulation}
                disabled={vitalsIsMeasuring}
                className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  vitalsIsMeasuring 
                    ? "bg-surface-container-high text-on-surface-variant cursor-not-allowed" 
                    : "bg-secondary text-white hover:brightness-110 squishy-interaction cursor-pointer"
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${vitalsIsMeasuring ? "animate-spin" : ""}`} />
                {vitalsIsMeasuring ? "Scanning metrics..." : "Re-Scan Feline Vitals"}
              </button>
            </div>

            {/* Footer */}
            <div className="p-4 bg-surface border-t border-outline-variant/20">
              <button 
                onClick={() => setShowVitalsModal(false)}
                className="w-full bg-primary text-on-primary font-bold py-3 rounded-full hover:brightness-110 shadow-md squishy-interaction cursor-pointer"
              >
                Close Metrics Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
