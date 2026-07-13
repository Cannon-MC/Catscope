export const SUPPORTED_LANGUAGES = ["en", "es", "fr", "zh"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

const EN_TRANSLATIONS = {
    // Brand
    appName: "CatScope",

    // Offline / error screen
    errorTitle: "Oops! There appears to be a problem.",
    errorDescription:
      "It looks like a little helper might have disconnected the internet. Let's get you back on track.",
    tryAgain: "Try Again",
    contactSupport: "Contact support if this persists",
    supportTicketMessage:
      "Support ticket simulated. We'll secure the cables from kitty chewing soon!",

    // Login
    calicoAlt: "Happy calico cat",
    welcomeTitle: "Welcome to CatScope",
    welcomeSubtitle:
      "Log in to identify breeds with AI, track daily vitals, and build your feline library.",
    nameSetupTitle: "What should we call you?",
    nameSetupSubtitle: "This is how we'll greet you inside CatScope.",
    namePlaceholder: "Enter your name",
    continueButton: "Continue",
    nameRequired: "Please enter a name",
    signInWith: "Sign in with",
    continueWithGoogle: "Continue with Google",
    continueWithApple: "Continue with Apple",

    // Navigation labels
    navHome: "Home",
    navScan: "AI Scan",
    navSaved: "Saved Library",
    navProfile: "Profile & Settings",
    testErrorPage: "Test Error Page",
    simulateErrorView: "Simulate Error View",

    // Home screen
    greeting: "Hello, {name}!",
    homeSubtitle: "Your feline companions are doing great today.",
    searchPlaceholder: "Search cat breeds...",
    breedDiscovery: "Breed Discovery",
    allBreedsSubtitle: "Explore {count} amazing cat breeds",
    clearSearch: "Clear Search",
    moreBreeds: "Show {count} More Breeds",
    showLess: "Show Less",
    featuredBadge: "Featured",
    noBreedsFound: "No breeds match your search term.",
    dailyCare: "Daily Care",
    dailyCareTips:
      "Keep your cat's food bowl topped up. When cats worry that food might run out, they tend to eat everything in sight, which can lead to obesity. Offer small snacks regularly to keep them happy and reward good behavior — but never tease them by pretending to give a treat and then taking it away, as this can damage trust between you and your pet. Some cats prefer wet food, while others like dry snacks; wet food is also handy for hiding medicine if your cat refuses pills. Scoop the litter box daily and change the litter completely every few days. If your cat has diarrhea for two days or more, contact your vet.",
    weeklyTipLabel: "Weekly Tip",
    weeklyTipTitle: "Keeping Hydrated",
    weeklyTipBody:
      "Cats often prefer running water to stagnant bowls. Consider getting an active drinking fountain to encourage more frequent drinking habits and support robust kidney function.",
    learnMore: "Learn More",
    learnMoreTip:
      "Fun Tip! Adding one ice cube to your kitty's bowl also stimulates curiosity and drinking interest.",

    // Scan screen
    cameraAlt: "Simulated live camera preview of majestic cat",
    optimalLight: "Optimal Light",
    focusLocked: "Focus Locked",
    scanPresetsPrompt: "Select a preset to test AI identification instantly:",
    presetMaineCoon: "Maine Coon (Classic)",
    presetCalico: "Cute Calico",
    scanPromptIdle: "Point at a cat & click the camera button",
    scanPromptCapture: "Tap the camera button to take a photo",
    scanPromptRescan: "Tap the camera button to scan again",
    scanPromptScanning: "AI Identification in progress...",
    cameraAccessError: "Could not access the camera. Please allow camera permission or use the gallery upload.",
    cameraNotSupported: "Your browser does not support camera access. Please use the gallery upload instead.",
    gallery: "Gallery",
    uploadCatPhoto: "Upload Cat Photo",
    flash: "Flash",
    toggleFlash: "Toggle Flash State",
    scanProblem: "Scan Problem",
    dismiss: "Dismiss",

    // Scan errors
    noCatDetected:
      "No cat was detected in this image. Please capture or select a clear picture of a cat!",
    identificationFailed: "Identification failed. Please try again.",
    networkError: "Network or server connection issue. Please verify your internet connection.",
    failedLoadBreedDetails: "Failed to load breed details.",
    unableToConnect: "Unable to connect to service.",

    // Saved library
    savedLibraryTitle: "Saved Feline Library",
    savedLibrarySubtitle: "Your customized cat encyclopedia entries ({count})",
    clearAll: "Clear All",
    clearLibraryConfirm: "Are you sure you want to clear your saved library?",
    myNotes: "My Notes:",
    notesPlaceholder: "Add personal observations or notes about this companion...",
    fullBreedProfile: "Full Breed Profile",
    deleteEntry: "Delete entry",
    emptyLibraryTitle: "Your library is currently empty.",
    emptyLibraryDescription:
      "Head over to the AI Scanner tab to snap a photo, or explore our breeds list to save companions to your collection!",

    // Default saved notes
    demoModeNote: "Scanned in Demo Mode! Add your notes here.",
    identifiedNote: "Identified with CatScope AI!",
    savedFromExplorerNote: "Saved from search explorer!",
    sampleNoteMaineCoon: "Met this absolute unit at the park. So soft!",
    sampleNoteRagdoll: "Very fluffy and went limp when I held him.",
    maineCoonDescription: "Gentle giant with snowshoe paws from North America.",
    ragdollDescription: "Gentle, affectionate, and famously docile lap cats.",

    // Breed detail
    backToLibrary: "Back to Library",
    backToDiscovery: "Back to Discovery",
    consultingEncyclopedias: "Consulting feline encyclopedias...",
    lifespanAverage: "average",
    saveToLibrary: "Save to Library",
    removeFromLibrary: "Remove from Library",
    region: "Region: {origin}",
    lifespan: "Lifespan: {lifespan}",
    breedProfile: "Breed Profile",
    topTraits: "Top Traits",
    downloadCareGuide: "Download Care Guide",
    careGuideDownloaded:
      "Care guide PDF download simulated. Kitty-proofing guidelines are saved!",
    rightCatForYou: "Is it the right cat for you?",
    thePros: "The Pros",
    theCons: "The Cons",
    healthCareRoutine: "Health & Care Routine",
    didYouKnow: "Did you know?",
    didYouKnowFallback: "Maine Coons are the only native American long-haired breed and have highly functional winter attributes.",
    breedDetailError: "Something went wrong while retrieving detail. Back out and try again!",

    // Profile
    catscopeSettings: "CatScope Settings",
    changeProfilePicture: "Change profile picture",
    autoSaveScans: "Auto-Save Scans",
    on: "ON",
    metricWeightUnits: "Metric Weight Units (kg/lbs)",
    unitLbs: "lbs",
    appVersion: "App Version",
    appVersionValue: "v2.4 (Plus Jakarta Sans)",
    demoTestingTitle: "Demonstration & Mock Screen Testing",
    demoTestingDescription:
      "The prompt contains mock screens. Click the button below to test and inspect the Connection Error page layout perfectly matching the design specification.",
    openConnectionErrorPage: "Open Cable Chewing / Connection Error Page",
    logOut: "Log Out",
    logOutConfirm: "Are you sure you want to log out of CatScope?",

    // Language
    language: "Language",

    // Nutrition modal
    nutritionModalTitle: "Nutrition Planner",
    companionWeight: "Companion Weight:",
    weightValue: "{weight} lbs",
    activityLevel: "Activity Level:",
    activityLow: "Low",
    activityMedium: "Medium",
    activityHigh: "High",
    recommendedIntake: "Recommended Intake",
    caloriesPerDay: "{calories} kcal / day",
    mealsChecklist: "Today's Meals Checklist:",
    mealBreakfast: "Breakfast",
    mealLunch: "Lunch",
    mealDinner: "Dinner",
    mealFeed: "{meal} Feed",
    saveIntakeSettings: "Save Intake Settings",
    nutritionSaved: "Nutrition saved! Target daily calories set to {calories} kcal.",

    // Vitals modal
    vitalsModalTitle: "Feline Vitals Scanner",
    vitalsAlt: "Pet veterinary vitals stethoscope",
    vitalsPositioning: "Positioning stethoscope & weight sensors...",
    vitalsPositioningHint:
      "Please secure your kitty comfortably on the platform pad.",
    vitalsCompleted: "Scan completed successfully!",
    vitalsStartPrompt: "Press Measure button to start tracking.",
    heartRate: "Heart Rate",
    bpmValue: "{rate} BPM",
    normalRange: "Normal Range: 120-140",
    weight: "Weight",
    weightValueShort: "{weight} lbs",
    healthyCompanion: "Healthy Companion",
    scanningMetrics: "Scanning metrics...",
    rescanVitals: "Re-Scan Feline Vitals",
    closeMetrics: "Close Metrics Dashboard",

    // Social login
    devicePasswordPrompt: "Enter your device password to continue with {provider}",
    incorrectPassword: "Incorrect device password. Please try again."
  } as const;

export type TranslationKey = keyof typeof EN_TRANSLATIONS;

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  zh: "中文"
};

const TRANSLATIONS: Record<Language, Partial<Record<TranslationKey, string>>> = {
  en: EN_TRANSLATIONS,
  es: {
    appName: "CatScope",

    errorTitle: "¡Vaya! Parece que hay un problema.",
    errorDescription:
      "Parece que un pequeño ayudante pudo haber desconectado el internet. Volvamos a encarrilar las cosas.",
    tryAgain: "Intentar de nuevo",
    contactSupport: "Contacta soporte si esto persiste",
    supportTicketMessage:
      "Ticket de soporte simulado. ¡Pronto aseguraremos los cables para que el gatito no los morda!",

    calicoAlt: "Gato calicó feliz",
    welcomeTitle: "Bienvenido a CatScope",
    welcomeSubtitle:
      "Inicia sesión para identificar razas con IA, monitorear signos vitales y construir tu biblioteca felina.",
    nameSetupTitle: "¿Cómo deberíamos llamarte?",
    nameSetupSubtitle: "Así te saludaremos dentro de CatScope.",
    namePlaceholder: "Ingresa tu nombre",
    continueButton: "Continuar",
    nameRequired: "Por favor ingresa un nombre",
    signInWith: "Iniciar sesión con",
    continueWithGoogle: "Continuar con Google",
    continueWithApple: "Continuar con Apple",

    navHome: "Inicio",
    navScan: "Escaner IA",
    navSaved: "Biblioteca",
    navProfile: "Perfil y ajustes",
    testErrorPage: "Probar página de error",
    simulateErrorView: "Simular vista de error",

    greeting: "¡Hola, {name}!",
    homeSubtitle: "Tus compañeros felinos están muy bien hoy.",
    searchPlaceholder: "Buscar razas de gatos...",
    breedDiscovery: "Descubrir razas",
    allBreedsSubtitle: "Explora {count} increíbles razas de gatos",
    clearSearch: "Borrar búsqueda",
    moreBreeds: "Mostrar {count} razas más",
    showLess: "Mostrar menos",
    featuredBadge: "Destacado",
    noBreedsFound: "Ninguna raza coincide con tu búsqueda.",
    dailyCare: "Cuidado diario",
    dailyCareTips:
      "Mantén el comedero de tu gato siempre lleno. Cuando los gatos temen que la comida se acabe, tienden a comer todo lo que ven, lo que puede provocar obesidad. Ofrece pequeños snacks regularmente para mantenerlos contentos y recompensar el buen comportamiento, pero nunca los fastidies fingiendo darles un premio y luego quitándoselo, ya que esto puede dañar la confianza entre tú y tu mascota. Algunos gatos prefieren comida húmeda, mientras que otros prefieren snacks secos; la comida húmeda también sirve para esconder medicinas si tu gato se niega a tomar pastillas. Limpia la caja de arena a diario y cámbiala completamente cada pocos días. Si tu gato tiene diarrea durante dos días o más, contacta a tu veterinario.",
    weeklyTipLabel: "Consejo semanal",
    weeklyTipTitle: "Mantenerse hidratado",
    weeklyTipBody:
      "A los gatos a menudo les gusta más el agua corriente que la estancada. Considera una fuente activa para fomentar hábitos de hidratación y apoyar la función renal.",
    learnMore: "Saber más",
    learnMoreTip:
      "¡Consejo divertido! Agregar un cubito de hielo al bebedero también estimula la curiosidad y el interés por beber.",

    cameraAlt: "Vista previa simulada de cámara de un majestuoso gato",
    optimalLight: "Luz óptima",
    focusLocked: "Enfoque bloqueado",
    scanPresetsPrompt: "Selecciona un preset para probar la identificación con IA al instante:",
    presetMaineCoon: "Maine Coon (Clásico)",
    presetCalico: "Lindo Calicó",
    scanPromptIdle: "Apunta a un gato y presiona el botón de cámara",
    scanPromptCapture: "Toca el botón de cámara para tomar una foto",
    scanPromptRescan: "Toca el botón de cámara para escanear de nuevo",
    scanPromptScanning: "Identificación con IA en curso...",
    cameraAccessError: "No se pudo acceder a la cámara. Permite el acceso a la cámara o usa la galería.",
    cameraNotSupported: "Tu navegador no admite el acceso a la cámara. Usa la galería en su lugar.",
    gallery: "Galería",
    uploadCatPhoto: "Subir foto de gato",
    flash: "Flash",
    toggleFlash: "Alternar estado del flash",
    scanProblem: "Problema de escaneo",
    dismiss: "Descartar",

    noCatDetected:
      "No se detectó ningún gato en esta imagen. ¡Por favor captura o selecciona una foto clara de un gato!",
    identificationFailed: "La identificación falló. Por favor intenta de nuevo.",
    networkError:
      "Problema de red o conexión con el servidor. Por favor verifica tu conexión a internet.",
    failedLoadBreedDetails: "No se pudieron cargar los detalles de la raza.",
    unableToConnect: "No se pudo conectar con el servicio.",

    savedLibraryTitle: "Biblioteca felina guardada",
    savedLibrarySubtitle: "Tus entradas personalizadas de la enciclopedia ({count})",
    clearAll: "Borrar todo",
    clearLibraryConfirm: "¿Estás seguro de que quieres borrar tu biblioteca guardada?",
    myNotes: "Mis notas:",
    notesPlaceholder: "Agrega observaciones personales o notas sobre este compañero...",
    fullBreedProfile: "Perfil completo de la raza",
    deleteEntry: "Eliminar entrada",
    emptyLibraryTitle: "Tu biblioteca está vacía.",
    emptyLibraryDescription:
      "Ve a la pestaña de Escáner IA para tomar una foto, o explora nuestra lista de razas para guardar compañeros en tu colección.",

    demoModeNote: "¡Escaneado en modo demo! Agrega tus notas aquí.",
    identifiedNote: "¡Identificado con CatScope AI!",
    savedFromExplorerNote: "¡Guardado desde el explorador!",
    sampleNoteMaineCoon: "Conocí a esta gran unidad en el parque. ¡Tan suave!",
    sampleNoteRagdoll: "Muy esponjoso y se quedó dormido cuando lo sostuve.",
    maineCoonDescription: "Gigante gentil con patas de raqueta de América del Norte.",
    ragdollDescription: "Gatos de regazo gentiles, afectuosos y famosamente dóciles.",

    backToLibrary: "Volver a la biblioteca",
    backToDiscovery: "Volver al descubrimiento",
    consultingEncyclopedias: "Consultando enciclopedias felinas...",
    lifespanAverage: "promedio",
    saveToLibrary: "Guardar en biblioteca",
    removeFromLibrary: "Quitar de la biblioteca",
    region: "Región: {origin}",
    lifespan: "Esperanza de vida: {lifespan}",
    breedProfile: "Perfil de la raza",
    topTraits: "Rasgos principales",
    downloadCareGuide: "Descargar guía de cuidados",
    careGuideDownloaded:
      "Descarga de guía de cuidados simulada. ¡Las pautas a prueba de gatitos están guardadas!",
    rightCatForYou: "¿Es el gato adecuado para ti?",
    thePros: "Ventajas",
    theCons: "Desventajas",
    healthCareRoutine: "Rutina de salud y cuidado",
    didYouKnow: "¿Sabías que?",
    didYouKnowFallback: "Los Maine Coon son la única raza de pelo largo nativa de América del Norte y tienen atributos invernales muy funcionales.",
    breedDetailError:
      "Algo salió mal al recuperar los detalles. Vuelve atrás e intenta de nuevo.",

    catscopeSettings: "Ajustes de CatScope",
    changeProfilePicture: "Cambiar foto de perfil",
    autoSaveScans: "Guardar escaneos automáticamente",
    on: "ACTIVADO",
    metricWeightUnits: "Unidades de peso métricas (kg/lbs)",
    unitLbs: "lbs",
    appVersion: "Versión de la app",
    appVersionValue: "v2.4 (Plus Jakarta Sans)",
    demoTestingTitle: "Pruebas de demostración y pantallas simuladas",
    demoTestingDescription:
      "El prompt incluye pantallas simuladas. Haz clic en el botón de abajo para probar e inspeccionar el diseño de la página de error de conexión.",
    openConnectionErrorPage: "Abrir página de error de conexión / mordiendo cables",
    logOut: "Cerrar sesión",
    logOutConfirm: "¿Estás seguro de que quieres cerrar sesión en CatScope?",

    language: "Idioma",

    nutritionModalTitle: "Planificador de nutrición",
    companionWeight: "Peso del compañero:",
    weightValue: "{weight} lbs",
    activityLevel: "Nivel de actividad:",
    activityLow: "Bajo",
    activityMedium: "Medio",
    activityHigh: "Alto",
    recommendedIntake: "Ingesta recomendada",
    caloriesPerDay: "{calories} kcal / día",
    mealsChecklist: "Lista de comidas de hoy:",
    mealBreakfast: "Desayuno",
    mealLunch: "Almuerzo",
    mealDinner: "Cena",
    mealFeed: "Comida de {meal}",
    saveIntakeSettings: "Guardar ajustes de ingesta",
    nutritionSaved: "¡Nutrición guardada! Calorías diarias objetivo fijadas en {calories} kcal.",

    vitalsModalTitle: "Escáner de signos vitales felinos",
    vitalsAlt: "Estetoscopio veterinario para signos vitales",
    vitalsPositioning: "Posicionando estetoscopio y sensores de peso...",
    vitalsPositioningHint:
      "Por favor coloca a tu gatito cómodamente sobre la plataforma.",
    vitalsCompleted: "¡Escaneo completado con éxito!",
    vitalsStartPrompt: "Presiona Medir para comenzar a monitorear.",
    heartRate: "Frecuencia cardíaca",
    bpmValue: "{rate} BPM",
    normalRange: "Rango normal: 120-140",
    weight: "Peso",
    weightValueShort: "{weight} lbs",
    healthyCompanion: "Compañero saludable",
    scanningMetrics: "Escaneando métricas...",
    rescanVitals: "Volver a escanear signos vitales",
    closeMetrics: "Cerrar panel de métricas",

    devicePasswordPrompt: "Ingresa la contraseña de tu dispositivo para continuar con {provider}",
    incorrectPassword: "Contraseña incorrecta. Por favor intenta de nuevo."
  },
  fr: {
    appName: "CatScope",

    errorTitle: "Oups ! Il semble y avoir un problème.",
    errorDescription:
      "On dirait qu'un petit assistant a débranché Internet. Remettons les choses en ordre.",
    tryAgain: "Réessayer",
    contactSupport: "Contacter le support si cela persiste",
    supportTicketMessage:
      "Ticket de support simulé. Nous sécuriserons bientôt les câbles contre les morsures de chaton !",

    calicoAlt: "Chat calico heureux",
    welcomeTitle: "Bienvenue sur CatScope",
    welcomeSubtitle:
      "Connectez-vous pour identifier les races avec l'IA, suivre les signes vitaux et construire votre bibliothèque féline.",
    nameSetupTitle: "Comment devrions-nous vous appeler ?",
    nameSetupSubtitle: "C'est ainsi que nous vous saluerons dans CatScope.",
    namePlaceholder: "Entrez votre nom",
    continueButton: "Continuer",
    nameRequired: "Veuillez entrer un nom",
    signInWith: "Se connecter avec",
    continueWithGoogle: "Continuer avec Google",
    continueWithApple: "Continuer avec Apple",

    navHome: "Accueil",
    navScan: "Scan IA",
    navSaved: "Bibliothèque",
    navProfile: "Profil et paramètres",
    testErrorPage: "Tester la page d'erreur",
    simulateErrorView: "Simuler la vue d'erreur",

    greeting: "Bonjour, {name} !",
    homeSubtitle: "Vos compagnons félins se portent bien aujourd'hui.",
    searchPlaceholder: "Rechercher des races de chats...",
    breedDiscovery: "Découverte de races",
    allBreedsSubtitle: "Explorez {count} races de chats extraordinaires",
    clearSearch: "Effacer la recherche",
    moreBreeds: "Afficher {count} races de plus",
    showLess: "Afficher moins",
    featuredBadge: "En vedette",
    noBreedsFound: "Aucune race ne correspond à votre recherche.",
    dailyCare: "Soins quotidiens",
    dailyCareTips:
      "Gardez la gamelle de votre chat toujours pleine. Quand les chats craignent de manquer de nourriture, ils ont tendance à manger tout ce qu'ils voient, ce qui peut entraîner l'obésité. Offrez de petites friandises régulièrement pour les garder heureux et récompenser les bons comportements — mais ne les taquinez jamais en faisant semblant de donner une friandise pour ensuite la retirer, car cela peut nuire à la confiance entre vous et votre animal. Certains chats préfèrent les aliments humides, d'autres les croquettes ; les aliments humides servent aussi à cacher les médicaments si votre chat refuse les comprimés. Nettoyez la litière quotidiennement et changez-la entièrement tous les quelques jours. Si votre chat a la diarrhée pendant deux jours ou plus, contactez votre vétérinaire.",
    weeklyTipLabel: "Astuce de la semaine",
    weeklyTipTitle: "Restez hydraté",
    weeklyTipBody:
      "Les chats préfèrent souvent l'eau courante à l'eau stagnante. Envisagez une fontaine active pour encourager une hydratation régulière et soutenir la fonction rénale.",
    learnMore: "En savoir plus",
    learnMoreTip:
      "Astuce amusante ! Ajouter un glaçon dans le bol de votre chat stimule aussi sa curiosité et son envie de boire.",

    cameraAlt: "Aperçu caméra simulé d'un chat majestueux",
    optimalLight: "Lumière optimale",
    focusLocked: "Mise au point verrouillée",
    scanPresetsPrompt: "Sélectionnez un préréglage pour tester l'identification IA instantanément :",
    presetMaineCoon: "Maine Coon (Classique)",
    presetCalico: "Adorable Calico",
    scanPromptIdle: "Visez un chat et appuyez sur le bouton caméra",
    scanPromptCapture: "Appuyez sur le bouton caméra pour prendre une photo",
    scanPromptRescan: "Appuyez sur le bouton caméra pour scanner à nouveau",
    scanPromptScanning: "Identification IA en cours...",
    cameraAccessError: "Impossible d'accéder à la caméra. Veuillez autoriser l'accès ou utiliser la galerie.",
    cameraNotSupported: "Votre navigateur ne prend pas en charge l'accès à la caméra. Veuillez utiliser la galerie.",
    gallery: "Galerie",
    uploadCatPhoto: "Télécharger une photo de chat",
    flash: "Flash",
    toggleFlash: "Basculer l'état du flash",
    scanProblem: "Problème de scan",
    dismiss: "Ignorer",

    noCatDetected:
      "Aucun chat détecté sur cette image. Veuillez capturer ou sélectionner une photo nette d'un chat !",
    identificationFailed: "L'identification a échoué. Veuillez réessayer.",
    networkError:
      "Problème réseau ou de connexion au serveur. Veuillez vérifier votre connexion Internet.",
    failedLoadBreedDetails: "Impossible de charger les détails de la race.",
    unableToConnect: "Impossible de se connecter au service.",

    savedLibraryTitle: "Bibliothèque féline enregistrée",
    savedLibrarySubtitle: "Vos entrées d'encyclopédie personnalisées ({count})",
    clearAll: "Tout effacer",
    clearLibraryConfirm: "Êtes-vous sûr de vouloir effacer votre bibliothèque enregistrée ?",
    myNotes: "Mes notes :",
    notesPlaceholder: "Ajoutez des observations personnelles ou des notes sur ce compagnon...",
    fullBreedProfile: "Profil complet de la race",
    deleteEntry: "Supprimer l'entrée",
    emptyLibraryTitle: "Votre bibliothèque est vide.",
    emptyLibraryDescription:
      "Allez dans l'onglet Scan IA pour prendre une photo, ou explorez notre liste de races pour enregistrer des compagnons dans votre collection !",

    demoModeNote: "Scanné en mode démo ! Ajoutez vos notes ici.",
    identifiedNote: "Identifié avec CatScope AI !",
    savedFromExplorerNote: "Enregistré depuis l'explorateur !",
    sampleNoteMaineCoon: "J'ai rencontré cette belle unité au parc. Tellement doux !",
    sampleNoteRagdoll: "Très pelucheux et s'est affaissé quand je l'ai tenu.",
    maineCoonDescription: "Géant doux avec des pattes de raquette d'Amérique du Nord.",
    ragdollDescription: "Chats de confort doux, affectueux et fameusement dociles.",

    backToLibrary: "Retour à la bibliothèque",
    backToDiscovery: "Retour à la découverte",
    consultingEncyclopedias: "Consultation des encyclopédies félines...",
    lifespanAverage: "moyenne",
    saveToLibrary: "Enregistrer dans la bibliothèque",
    removeFromLibrary: "Retirer de la bibliothèque",
    region: "Région : {origin}",
    lifespan: "Espérance de vie : {lifespan}",
    breedProfile: "Profil de la race",
    topTraits: "Traits principaux",
    downloadCareGuide: "Télécharger le guide de soins",
    careGuideDownloaded:
      "Téléchargement du guide de soins simulé. Les directives anti-chatons sont enregistrées !",
    rightCatForYou: "Est-ce le bon chat pour vous ?",
    thePros: "Les avantages",
    theCons: "Les inconvénients",
    healthCareRoutine: "Routine santé et soins",
    didYouKnow: "Le saviez-vous ?",
    didYouKnowFallback: "Les Maine Coons sont la seule race américaine à poil long native et possèdent des attributs hivernaux très fonctionnels.",
    breedDetailError:
      "Une erreur s'est produite lors de la récupération des détails. Revenez en arrière et réessayez !",

    catscopeSettings: "Paramètres CatScope",
    changeProfilePicture: "Changer la photo de profil",
    autoSaveScans: "Enregistrer les scans automatiquement",
    on: "ACTIVÉ",
    metricWeightUnits: "Unités de poids métriques (kg/lbs)",
    unitLbs: "lbs",
    appVersion: "Version de l'application",
    appVersionValue: "v2.4 (Plus Jakarta Sans)",
    demoTestingTitle: "Tests de démonstration et écrans simulés",
    demoTestingDescription:
      "Le prompt contient des écrans simulés. Cliquez sur le bouton ci-dessous pour tester et inspecter la mise en page de la page d'erreur de connexion.",
    openConnectionErrorPage: "Ouvrir la page d'erreur de connexion / câbles rongés",
    logOut: "Se déconnecter",
    logOutConfirm: "Êtes-vous sûr de vouloir vous déconnecter de CatScope ?",

    language: "Langue",

    nutritionModalTitle: "Planificateur nutritionnel",
    companionWeight: "Poids du compagnon :",
    weightValue: "{weight} lbs",
    activityLevel: "Niveau d'activité :",
    activityLow: "Faible",
    activityMedium: "Moyen",
    activityHigh: "Élevé",
    recommendedIntake: "Apport recommandé",
    caloriesPerDay: "{calories} kcal / jour",
    mealsChecklist: "Liste des repas d'aujourd'hui :",
    mealBreakfast: "Petit-déjeuner",
    mealLunch: "Déjeuner",
    mealDinner: "Dîner",
    mealFeed: "Repas du {meal}",
    saveIntakeSettings: "Enregistrer les paramètres d'apport",
    nutritionSaved: "Nutrition enregistrée ! Apport calorique quotidien fixé à {calories} kcal.",

    vitalsModalTitle: "Scanner des signes vitaux félins",
    vitalsAlt: "Stéthoscope vétérinaire pour signes vitaux",
    vitalsPositioning: "Positionnement du stéthoscope et des capteurs de poids...",
    vitalsPositioningHint:
      "Veuillez installer votre chaton confortablement sur le tapis de la plateforme.",
    vitalsCompleted: "Scan terminé avec succès !",
    vitalsStartPrompt: "Appuyez sur Mesurer pour commencer le suivi.",
    heartRate: "Rythme cardiaque",
    bpmValue: "{rate} BPM",
    normalRange: "Plage normale : 120-140",
    weight: "Poids",
    weightValueShort: "{weight} lbs",
    healthyCompanion: "Compagnon en bonne santé",
    scanningMetrics: "Scan des métriques...",
    rescanVitals: "Refaire le scan des signes vitaux",
    closeMetrics: "Fermer le tableau de bord",

    devicePasswordPrompt: "Entrez le mot de passe de votre appareil pour continuer avec {provider}",
    incorrectPassword: "Mot de passe incorrect. Veuillez réessayer."
  },
  zh: {
    appName: "CatScope",

    errorTitle: "哎呀！似乎出了问题。",
    errorDescription:
      "看起来有位小助手可能把网线拔掉了。让我们帮你恢复正常。",
    tryAgain: "重试",
    contactSupport: "如果问题持续，请联系支持",
    supportTicketMessage:
      "已模拟提交支持工单。我们会尽快保护好线缆，防止小猫继续啃咬！",

    welcomeTitle: "欢迎来到 CatScope",
    welcomeSubtitle:
      "登录以使用 AI 识别猫品种、追踪每日健康数据并建立您的猫咪图库。",
    nameSetupTitle: "我们该怎么称呼您？",
    nameSetupSubtitle: "这将是 CatScope 中向您问好的方式。",
    namePlaceholder: "输入您的名字",
    continueButton: "继续",
    nameRequired: "请输入名字",
    signInWith: "通过以下方式登录",
    continueWithGoogle: "使用 Google 继续",
    continueWithApple: "使用 Apple 继续",

    navHome: "首页",
    navScan: "AI 扫描",
    navSaved: "保存库",
    navProfile: "个人资料与设置",
    testErrorPage: "测试错误页面",
    simulateErrorView: "模拟错误视图",

    breedDiscovery: "品种发现",
    allBreedsSubtitle: "探索 {count} 种奇妙的猫咪品种",
    searchPlaceholder: "搜索猫品种...",
    noBreedsFound: "没有匹配您搜索的品种。",

    dailyCare: "日常护理",
    dailyCareTips:
      "保持猫的食盆始终有粮。当猫咪担心食物会吃完时，它们会把眼前的食物全部吃光，这可能导致肥胖。定期给小零食让猫咪开心，并奖励良好行为——但千万不要假装要给零食又拿走，这会破坏你和宠物之间的信任。有些猫喜欢湿粮，有些喜欢干粮；湿粮还可以用来藏药，如果猫咪拒绝吃药的话。每天清理猫砂盆，每隔几天彻底更换一次猫砂。如果猫咪连续两天或更久腹泻，请联系兽医。",

    cameraAlt: "相机实时预览",
    scanPromptIdle: "对准猫咪并点击相机按钮",
    scanPromptCapture: "点击相机按钮拍照",
    scanPromptRescan: "点击相机按钮重新扫描",
    scanPromptScanning: "AI 识别中...",
    cameraAccessError: "无法访问相机。请允许相机权限或使用相册上传。",
    cameraNotSupported: "您的浏览器不支持相机访问，请使用相册上传。",
    gallery: "相册",
    uploadCatPhoto: "上传猫咪照片",
    flash: "闪光灯",
    toggleFlash: "切换闪光灯状态",
    scanProblem: "扫描问题",
    dismiss: "忽略",

    language: "语言",

    logOut: "退出登录",
    logOutConfirm: "确定要退出 CatScope 吗？",

    devicePasswordPrompt: "输入您的设备密码以继续使用 {provider}",
    incorrectPassword: "设备密码不正确，请重试。"
  }
};

export type TranslationLanguage = keyof typeof TRANSLATIONS;

export function translate(
  language: Language,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  const dictionary = TRANSLATIONS[language] ?? TRANSLATIONS.en;
  let text = ((dictionary[key] ?? TRANSLATIONS.en[key] ?? key) as string);
  if (params) {
    Object.entries(params).forEach(([paramKey, value]) => {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(value));
    });
  }
  return text;
}

export function isValidLanguage(value: string): value is Language {
  return SUPPORTED_LANGUAGES.includes(value as Language);
}
