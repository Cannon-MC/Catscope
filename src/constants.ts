// Default white avatar used when the user has not uploaded a profile picture
export const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23ffffff'/%3E%3C/svg%3E";

export const IMAGES = {
  calicoLogin: "/images/calico-login.jpg",
  userProfile: "/images/user-profile.jpg",
  ragdoll: "/images/ragdoll.jpg",
  bengal: "/images/bengal.jpg",
  maineCoon: "/images/maine-coon.jpg",
  cameraFeed: "/images/camera-feed.jpg",
  cableChewing: "/images/cable-chewing.jpg",
  offlineCat: "/images/offline-cat.jpg"
};

// Real-life breed photos downloaded to public/images/breeds
function getBreedImage(id: string): string {
  if (id === "ragdoll") return IMAGES.ragdoll;
  if (id === "bengal") return IMAGES.bengal;
  if (id === "mainecoon") return IMAGES.maineCoon;
  return `/images/breeds/${id}.jpg`;
}

export const STANDARD_BREEDS = [
  {
    id: "ragdoll",
    name: "Ragdoll",
    tagline: "Gentle & Affectionate",
    image: getBreedImage("ragdoll"),
    isFeatured: true
  },
  {
    id: "bengal",
    name: "Bengal",
    tagline: "Active & Playful",
    image: getBreedImage("bengal"),
    isFeatured: false
  },
  {
    id: "mainecoon",
    name: "Maine Coon",
    tagline: "Gentle Giants",
    image: getBreedImage("mainecoon"),
    isFeatured: false
  },
  {
    id: "siamese",
    name: "Siamese",
    tagline: "Vocal & Social",
    image: getBreedImage("siamese"),
    isFeatured: false
  },
  {
    id: "persian",
    name: "Persian",
    tagline: "Calm & Luxurious",
    image: getBreedImage("persian"),
    isFeatured: false
  },
  {
    id: "sphynx",
    name: "Sphynx",
    tagline: "Hairless & Loyal",
    image: getBreedImage("sphynx"),
    isFeatured: false
  },
  {
    id: "abyssinian",
    name: "Abyssinian",
    tagline: "Curious & Energetic",
    image: getBreedImage("abyssinian"),
    isFeatured: false
  },
  {
    id: "britishshorthair",
    name: "British Shorthair",
    tagline: "Easygoing & Round",
    image: getBreedImage("britishshorthair"),
    isFeatured: false
  },
  {
    id: "scottishfold",
    name: "Scottish Fold",
    tagline: "Sweet & Adaptable",
    image: getBreedImage("scottishfold"),
    isFeatured: false
  },
  {
    id: "norwegianforest",
    name: "Norwegian Forest",
    tagline: "Majestic & Hardy",
    image: getBreedImage("norwegianforest"),
    isFeatured: false
  },
  {
    id: "russianblue",
    name: "Russian Blue",
    tagline: "Shy & Elegant",
    image: getBreedImage("russianblue"),
    isFeatured: false
  },
  {
    id: "savannah",
    name: "Savannah",
    tagline: "Exotic & Adventurous",
    image: getBreedImage("savannah"),
    isFeatured: false
  },
  {
    id: "birman",
    name: "Birman",
    tagline: "Silky & Devoted",
    image: getBreedImage("birman"),
    isFeatured: false
  },
  {
    id: "orientalshorthair",
    name: "Oriental Shorthair",
    tagline: "Sleek & Chatty",
    image: getBreedImage("orientalshorthair"),
    isFeatured: false
  },
  {
    id: "devonrex",
    name: "Devon Rex",
    tagline: "Pixie & Playful",
    image: getBreedImage("devonrex"),
    isFeatured: false
  },
  {
    id: "cornishrex",
    name: "Cornish Rex",
    tagline: "Athletic & Warm",
    image: getBreedImage("cornishrex"),
    isFeatured: false
  },
  {
    id: "himalayan",
    name: "Himalayan",
    tagline: "Fluffy & Relaxed",
    image: getBreedImage("himalayan"),
    isFeatured: false
  },
  {
    id: "turkishangora",
    name: "Turkish Angora",
    tagline: "Graceful & Clever",
    image: getBreedImage("turkishangora"),
    isFeatured: false
  },
  {
    id: "americanshorthair",
    name: "American Shorthair",
    tagline: "Friendly & Low-Maintenance",
    image: getBreedImage("americanshorthair"),
    isFeatured: false
  },
  {
    id: "exoticshorthair",
    name: "Exotic Shorthair",
    tagline: "Placid & Cuddly",
    image: getBreedImage("exoticshorthair"),
    isFeatured: false
  },
  {
    id: "balinese",
    name: "Balinese",
    tagline: "Vocal & Graceful",
    image: getBreedImage("balinese"),
    isFeatured: false
  },
  {
    id: "bombay",
    name: "Bombay",
    tagline: "Panther & Affectionate",
    image: getBreedImage("bombay"),
    isFeatured: false
  },
  {
    id: "burmese",
    name: "Burmese",
    tagline: "Velcro & Charming",
    image: getBreedImage("burmese"),
    isFeatured: false
  },
  {
    id: "chartreux",
    name: "Chartreux",
    tagline: "Quiet & Smiling",
    image: getBreedImage("chartreux"),
    isFeatured: false
  },
  {
    id: "egyptianmau",
    name: "Egyptian Mau",
    tagline: "Spotted & Speedy",
    image: getBreedImage("egyptianmau"),
    isFeatured: false
  },
  {
    id: "japanesebobtail",
    name: "Japanese Bobtail",
    tagline: "Lucky & Lively",
    image: getBreedImage("japanesebobtail"),
    isFeatured: false
  },
  {
    id: "korat",
    name: "Korat",
    tagline: "Silver & Sensitive",
    image: getBreedImage("korat"),
    isFeatured: false
  },
  {
    id: "manx",
    name: "Manx",
    tagline: "Tailless & Loyal",
    image: getBreedImage("manx"),
    isFeatured: false
  },
  {
    id: "ocicat",
    name: "Ocicat",
    tagline: "Wild-Look & Social",
    image: getBreedImage("ocicat"),
    isFeatured: false
  },
  {
    id: "somali",
    name: "Somali",
    tagline: "Fox-Like & Busy",
    image: getBreedImage("somali"),
    isFeatured: false
  },
  {
    id: "tonkinese",
    name: "Tonkinese",
    tagline: "Mink & Mischievous",
    image: getBreedImage("tonkinese"),
    isFeatured: false
  },
  {
    id: "turkishvan",
    name: "Turkish Van",
    tagline: "Swimmer & Strong",
    image: getBreedImage("turkishvan"),
    isFeatured: false
  }
];
