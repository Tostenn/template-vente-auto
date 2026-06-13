import React from "react";
import { Calendar, Gauge, Zap, Fuel, Sparkle } from "lucide-react";
import { Vehicle } from "../types";

interface CarCardProps {
  key?: string;
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  onQuickWhatsApp: (vehicle: Vehicle, e: React.MouseEvent) => void;
}

export default function CarCard({ vehicle, onSelect, onQuickWhatsApp }: CarCardProps) {
  const isRent = vehicle.offerType === "Location";

  return (
    <div
      id={`car-card-${vehicle.id}`}
      onClick={() => onSelect(vehicle)}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full relative"
    >
      {/* Dynamic badges atop the cover image */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
        <span
          className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm ${
            isRent
              ? "bg-emerald-600 text-white"
              : "bg-slate-900 text-white"
          }`}
        >
          {vehicle.offerType === "Location" ? "Location" : "Prêt à l'achat"}
        </span>
        {vehicle.isFeatured && (
          <span className="bg-amber-500 text-slate-950 text-[11px] font-bold uppercase py-1 px-2.5 rounded-md flex items-center gap-1 shadow-sm">
            <Sparkle className="w-3 h-3 fill-slate-950 text-slate-950" />
            <span>Vedette</span>
          </span>
        )}
      </div>

      <div className="absolute top-3 right-3 z-10">
        <span className="bg-white/90 backdrop-blur-xs text-slate-900 border border-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {vehicle.category}
        </span>
      </div>

      {/* Hero Image frame */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Main content elements */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title and year */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition">
              {vehicle.brand} <span className="font-medium text-slate-600">{vehicle.model}</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">{vehicle.color}</p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded-md">
            {vehicle.year}
          </span>
        </div>

        {/* Technical specs grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 mb-5 border-t border-b border-slate-50 py-3.5">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Gauge className="w-3.5 h-3.5 text-slate-400" />
            <span>{vehicle.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Zap className="w-3.5 h-3.5 text-slate-400" />
            <span>{vehicle.power} ch (HP)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Fuel className="w-3.5 h-3.5 text-slate-400" />
            <span>{vehicle.fuel}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{vehicle.transmission}</span>
          </div>
        </div>

        {/* Pricing block and CTA alignment */}
        <div className="mt-auto flex items-center justify-between gap-2.5">
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider leading-none">
              Tarif {isRent ? "Journalier" : "Conseillé"}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-slate-900 tracking-tight">
                {vehicle.price.toLocaleString()} FCFA
              </span>
              {isRent && (
                <span className="text-xs text-slate-500 font-medium">/ jour</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id={`car-card-wa-btn-${vehicle.id}`}
              type="button"
              onClick={(e) => onQuickWhatsApp(vehicle, e)}
              className="p-2 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition border border-emerald-100 flex items-center gap-1 text-xs font-semibold"
              title="Discuter immédiatement de ce modèle sur WhatsApp"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-4 h-4"
              />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              id={`car-card-detail-btn-${vehicle.id}`}
              type="button"
              className="bg-slate-900 text-white hover:bg-emerald-600 px-3.5 py-2.5 rounded-xl font-bold text-xs transition duration-200"
            >
              Consulter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
