import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Phone,
  MessageSquare,
  Sparkle,
  Gauge,
  Zap,
  Fuel,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  Heart,
  Maximize2
} from "lucide-react";
import { Vehicle, CommercialAdvisor } from "../types";
import { ADVISORS } from "../data";
import CallbackForm from "./CallbackForm";

interface CarDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export default function CarDetailModal({ vehicle, onClose }: CarDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!vehicle) return null;

  // We assign a counselor based on the vehicle type: 
  // Premium and sport go to Thomas, intermediate / rentals are managed together or balanced
  const advisor: CommercialAdvisor = vehicle.offerType === "Location" ? ADVISORS[1] : ADVISORS[0];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  // Generate WhatsApp text
  const isRent = vehicle.offerType === "Location";
  const whatsappBaseText = `Bonjour ${advisor.name}, je suis très intéressé par le véhicule ${vehicle.brand} ${vehicle.model} (${vehicle.year}) proposé en ${vehicle.offerType.toLowerCase()} au tarif de ${vehicle.price.toLocaleString()} FCFA${isRent ? "/jour" : ""}. Est-il disponible pour une présentation ou un essai ?`;
  const whatsappUrl = `https://wa.me/${advisor.whatsapp}?text=${encodeURIComponent(whatsappBaseText)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-6xl my-8 flex flex-col md:flex-row"
          >
            {/* Close button top right */}
            <button
              id="modal-close-btn"
              onClick={onClose}
              className="absolute top-4 right-4 z-30 bg-slate-900/80 hover:bg-emerald-600 text-white p-2 rounded-full backdrop-blur-xs transition shadow-lg"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Visuals & Metadata */}
            <div className="w-full md:w-3/5 bg-slate-50 border-r border-slate-100 flex flex-col">
              {/* Main vehicle display stage */}
              <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <img
                  src={vehicle.images[activeImageIndex]}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Cover image filters overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Left-right gallery arrows if multiple images exist */}
                {vehicle.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 p-2 rounded-full shadow-lg transition z-10"
                    >
                      <ChevronLeft className="w-4 h-4 stroke-[3]" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 p-2 rounded-full shadow-lg transition z-10"
                    >
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </>
                )}

                {/* Bottom thumbnail counters */}
                <div className="absolute bottom-4 left-4 z-10 bg-slate-900/80 backdrop-blur-xs text-xs font-bold text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
                  <span>Image {activeImageIndex + 1} sur {vehicle.images.length}</span>
                </div>

                {/* Save list indicator */}
                <button
                  type="button"
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute bottom-4 right-4 z-10 bg-white/95 hover:bg-rose-50 text-slate-800 p-2 px-3.5 rounded-xl shadow-lg transition flex items-center gap-1.5 text-xs font-bold"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500 text-rose-500" : "text-slate-600"}`} />
                  <span>{isLiked ? "Favori" : "Enregistrer"}</span>
                </button>
              </div>

              {/* Thumbnails row */}
              {vehicle.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto bg-slate-100 border-b border-slate-200">
                  {vehicle.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 aspect-video rounded-lg overflow-hidden border-2 transition ${
                        activeImageIndex === idx ? "border-emerald-600 scale-95" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}

              {/* Core technical block */}
              <div className="p-6 sm:p-8 flex-grow">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs bg-slate-800 text-white font-bold tracking-wider px-2.5 py-1 rounded-md uppercase">
                    {vehicle.offerType}
                  </span>
                  <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-100 font-bold px-2.5 py-1 rounded-md">
                    ⚡ {vehicle.fuel}
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-md">
                    🏎️ {vehicle.category}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {vehicle.brand} <span className="font-semibold text-slate-600">{vehicle.model}</span>
                </h2>
                <p className="text-sm font-semibold text-slate-400 mt-1">Coloris : {vehicle.color}</p>

                {/* Narrative description */}
                <p className="text-sm text-slate-600 leading-relaxed mt-4 border-l-4 border-emerald-500 pl-4 bg-emerald-500/5 py-1 rounded-r-lg">
                  {vehicle.description}
                </p>

                {/* Multi-grid technical checklist */}
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mt-6 mb-3">
                  Fiche Technique Détaillée
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mise en circulation</span>
                    <span className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-600" /> {vehicle.year}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Kilométrage certifié</span>
                    <span className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-emerald-600" /> {vehicle.mileage.toLocaleString()} km
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Puissance maximale</span>
                    <span className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-emerald-600" /> {vehicle.power} ch
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Boîte de vitesse</span>
                    <span className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-emerald-600" /> {vehicle.transmission}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Zéro à 100 km/h</span>
                    <span className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                      🏎️ {vehicle.acceleration}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Places & Portes</span>
                    <span className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                      👥 {vehicle.seats}pl. / {vehicle.doors}p.
                    </span>
                  </div>
                </div>

                {/* Major premium options */}
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mt-6 mb-3">
                  Équipements de pointe inclus
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {vehicle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-emerald-500 font-black shrink-0 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Commercial Interaction Desk (WhatsApp, Call, Form) */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between self-stretch bg-slate-50/50">
              <div>
                {/* Highlighted core Price Tag */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl mb-6 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-8 translate-x-8" />
                  <span className="text-emerald-400 text-xs font-black uppercase tracking-wider block">
                    Mode {vehicle.offerType} — Prix Clé en Main
                  </span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-black tracking-tight font-mono text-white">
                      {vehicle.price.toLocaleString()} FCFA
                    </span>
                    {isRent && (
                      <span className="text-slate-300 text-sm font-medium">/ jour TTC</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                    {isRent 
                      ? "Inclus assurance tous risques premium, assistance 24/7 et forfait kilométrique journalier."
                      : "Inclus contrôle d'importation d'origine rigoureux 110 points, révision complète et formalités de mutation d'immatriculation d'Abidjan incluses."}
                  </p>
                </div>

                {/* Commercial Advisor Block (Primary sales trigger) */}
                <div className="bg-white border border-slate-100 p-5 rounded-2xl mb-6 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Votre Conseiller Commercial d'Exception
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={advisor.avatar}
                        alt={advisor.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-emerald-100"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" title="En ligne" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 m-0 leading-tight">
                        {advisor.name}
                      </h4>
                      <p className="text-xs text-emerald-700 m-0 font-semibold mt-0.5">{advisor.role}</p>
                      <p className="text-[10px] text-slate-400 font-medium m-0 mt-1">🕒 {advisor.availability}</p>
                    </div>
                  </div>

                  {/* Primary interactive targets: CALL now or WHATSAPP */}
                  <div className="space-y-3">
                    <a
                      id="modal-wa-trigger"
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl transition shadow-lg shadow-emerald-600/15"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                        alt="WhatsApp"
                        className="w-4.5 h-4.5 filter brightness-100"
                      />
                      <span>Continuer sur WhatsApp</span>
                    </a>

                    <a
                      id="modal-phone-trigger"
                      href={`tel:${advisor.whatsapp}`} // Bind to click/call easily
                      className="flex items-center justify-center gap-2.5 w-full py-3 bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-sm rounded-xl transition border border-slate-200"
                    >
                      <Phone className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                      <span>Appeler le conseiller</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant Callback Form built in */}
              <div>
                <CallbackForm vehicle={vehicle} />
              </div>

              {/* Reassurance banner cards */}
              <div className="mt-6 grid grid-cols-2 gap-3.5 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 bg-emerald-500/5 p-2 rounded-xl text-left border border-emerald-500/10">
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-800 m-0 leading-tight">Garantie Totale</h5>
                    <p className="text-[9px] text-slate-500 m-0">12 mois minimum</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/5 p-2 rounded-xl text-left border border-emerald-500/10">
                  <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-800 m-0 leading-tight">Livraison Rapide</h5>
                    <p className="text-[9px] text-slate-500 m-0">À domicile ou agence</p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
