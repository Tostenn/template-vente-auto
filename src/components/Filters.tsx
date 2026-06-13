import { Search, Fuel, Car, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { CategoryType, FuelType, OfferType } from "../types";

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedOffer: OfferType | "Tous";
  setSelectedOffer: (val: OfferType | "Tous") => void;
  selectedCategory: CategoryType | "Tous";
  setSelectedCategory: (val: CategoryType | "Tous") => void;
  selectedFuel: FuelType | "Tous";
  setSelectedFuel: (val: FuelType | "Tous") => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
}

export default function Filters({
  searchQuery,
  setSearchQuery,
  selectedOffer,
  setSelectedOffer,
  selectedCategory,
  setSelectedCategory,
  selectedFuel,
  setSelectedFuel,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
}: FiltersProps) {
  
  // Dynamically set limit values based on chosen offer type in FCFA
  const isRentSelected = selectedOffer === "Location";
  const absoluteMaxPrice = isRentSelected ? 600000 : 120000000; // 600k/day vs 120 Millions FCFA
  
  const handleOfferChange = (type: OfferType | "Tous") => {
    setSelectedOffer(type);
    if (type === "Location") {
      setMaxPrice(600000);
    } else {
      setMaxPrice(120000000);
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 sm:p-6 mb-8">
      {/* Header filter title */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
        <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
        <h3 className="text-lg font-bold text-slate-800 m-0 leading-tight">
          Rechercher votre véhicule idéal en Côte d'Ivoire
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Core Offer toggle (Achat vs Location) */}
        <div className="md:col-span-4 flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Mode d'acquisition
          </label>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              id="filter-offer-all"
              type="button"
              onClick={() => handleOfferChange("Tous")}
              className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg transition-all ${
                selectedOffer === "Tous"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Tous
            </button>
            <button
              id="filter-offer-vente"
              type="button"
              onClick={() => handleOfferChange("Vente")}
              className={`flex-1 py-1 px-1.5 text-center text-[11px] sm:text-xs font-semibold rounded-lg transition-all ${
                selectedOffer === "Vente"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Achat (Vente)
            </button>
            <button
              id="filter-offer-location"
              type="button"
              onClick={() => handleOfferChange("Location")}
              className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg transition-all ${
                selectedOffer === "Location"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Location
            </button>
          </div>
        </div>

        {/* Text Search Box */}
        <div className="md:col-span-5 flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Marque ou Modèle
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="filter-search-text"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ex: Porsche, BMW, Tesla, G 63..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-800 transition"
            />
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div className="md:col-span-3 flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Trier par
          </label>
          <div className="relative">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              id="filter-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-800 appearance-none transition"
            >
              <option value="recommanded">Recommandations</option>
              <option value="price-asc">Prix : croissant</option>
              <option value="price-desc">Prix : décroissant</option>
              <option value="year">Année : récent</option>
              <option value="mileage">Kilométrage : faible</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 pt-5 border-t border-slate-100">
        {/* Category selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Car className="w-3.5 h-3.5" />
            <span>Catégorie</span>
          </div>
          <select
            id="filter-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as CategoryType | "Tous")}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-800 transition"
          >
            <option value="Tous">Toutes les catégories</option>
            <option value="SUV">SUV</option>
            <option value="Sportive">Sportive</option>
            <option value="Berline">Berline</option>
            <option value="Citadine">Citadine</option>
            <option value="Premium">Premium / Luxe</option>
          </select>
        </div>

        {/* Fuel selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Fuel className="w-3.5 h-3.5" />
            <span>Motorisation</span>
          </div>
          <select
            id="filter-fuel"
            value={selectedFuel}
            onChange={(e) => setSelectedFuel(e.target.value as FuelType | "Tous")}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-800 transition"
          >
            <option value="Tous">Toutes les énergies</option>
            <option value="Électrique">Électrique</option>
            <option value="Hybride">Hybride</option>
            <option value="Essence">Essence</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>

        {/* Budget limit slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Budget maximum</span>
            <span className="text-emerald-700 font-bold font-mono">
              {maxPrice >= absoluteMaxPrice
                ? "Illimité"
                : isRentSelected
                ? `${maxPrice.toLocaleString()} FCFA / jour`
                : `${maxPrice.toLocaleString()} FCFA`}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              id="filter-budget-range"
              type="range"
              min={isRentSelected ? 50000 : 15000000}
              max={absoluteMaxPrice}
              step={isRentSelected ? 20000 : 5000000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Quick filters tag suggestions */}
      <div className="flex flex-wrap gap-2 mt-5 pt-3 border-t border-slate-50">
        <span className="text-xs text-slate-400 self-center">Filtres rapides :</span>
        <button
          type="button"
          onClick={() => {
            setSelectedFuel("Électrique");
            setSelectedOffer("Tous");
          }}
          className={`px-3 py-1 text-xs rounded-full border transition ${
            selectedFuel === "Électrique"
              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
              : "hover:bg-slate-50 border-slate-200 text-slate-600"
          }`}
        >
          ⚡ Électriques
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedCategory("Sportive");
            setSelectedOffer("Tous");
          }}
          className={`px-3 py-1 text-xs rounded-full border transition ${
            selectedCategory === "Sportive"
              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
              : "hover:bg-slate-50 border-slate-200 text-slate-600"
          }`}
        >
          🏁 Sportives
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedOffer("Location");
            setMaxPrice(150000);
          }}
          className={`px-3 py-1 text-xs rounded-full border transition ${
            selectedOffer === "Location" && maxPrice <= 150000
              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
              : "hover:bg-slate-50 border-slate-200 text-slate-600"
          }`}
        >
          🗓️ Location &lt; 150K F/jour
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchQuery("");
            setSelectedOffer("Tous");
            setSelectedCategory("Tous");
            setSelectedFuel("Tous");
            setMaxPrice(120000000);
            setSortBy("recommanded");
          }}
          className="ml-auto text-xs text-slate-400 hover:text-emerald-600 transition underline underline-offset-4"
        >
          Réinitialiser tous les filtres
        </button>
      </div>
    </div>
  );
}
