export interface Trait {
  name: string;
  icon: string;
}

export interface HealthAndCareItem {
  title: string;
  description: string;
}

export interface BreedDetail {
  breedName: string;
  shortDescription: string;
  origin: string;
  lifespan: string;
  breedProfile: string[];
  topTraits: Trait[];
  pros: string[];
  cons: string[];
  healthAndCare: HealthAndCareItem[];
  funFact: string;
  isCat?: boolean;
}

export interface SavedCat {
  id: string;
  breedName: string;
  shortDescription: string;
  scannedAt: string;
  imageUrl: string;
  notes?: string;
}

export type TabType = "home" | "scan" | "saved" | "profile";
