export type FuelType = "Électrique" | "Hybride" | "Essence" | "Diesel";
export type TransmissionType = "Automatique" | "Manuelle";
export type CategoryType = "SUV" | "Berline" | "Sportive" | "Citadine" | "Premium";
export type OfferType = "Vente" | "Location";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  category: CategoryType;
  offerType: OfferType;
  price: number; // For Vente, direct price. For Location, price per day.
  year: number;
  fuel: FuelType;
  transmission: TransmissionType;
  mileage: number; // in km
  power: number; // in HP/ch
  acceleration: string; // 0-100 km/h
  images: string[];
  color: string;
  seats: number;
  doors: number;
  description: string;
  features: string[];
  isFeatured?: boolean;
  status: "Disponible" | "Réservé" | "Loué";
}

export interface CommercialAdvisor {
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  avatar: string;
  availability: string;
}
