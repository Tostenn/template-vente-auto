import { Phone, MessageSquare, Clock, MapPin } from "lucide-react";
import { ADVISORS } from "../data";

export default function Navbar() {
  const primaryAdvisor = ADVISORS[0];

  return (
    <header id="app-header" className="sticky top-0 z-40 bg-slate-900 text-white shadow-md border-b border-slate-800">
      {/* Top Banner with info */}
      <div className="bg-slate-950 text-slate-400 text-xs py-2 px-4 border-b border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" /> Abidjan, Côte d’Ivoire
            </span>
            <span className="flex items-center gap-1 hidden md:inline-flex">
              <Clock className="w-3.5 h-3.5 text-emerald-500" /> Showroom ouvert de 8h00 à 19h00 — Lun au Sam
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Conseiller actif :</span>
            <div className="flex items-center gap-1.5 text-white font-medium text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Jean-Luc K. ({primaryAdvisor.phone})
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-500 text-slate-950 p-2 rounded-lg font-black tracking-widest text-lg">
            V&L
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white m-0 leading-tight">
              Prestige Automobiles
            </h1>
            <p className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase m-0 leading-none">
              Vente & Location Exclusive
            </p>
          </div>
        </div>

        {/* Action button container */}
        <div className="flex items-center gap-3">
          {/* Direct call commercial advisor */}
          <a
            id="nav-call-advisor"
            href={`tel:${primaryAdvisor.whatsapp}`}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border border-slate-700"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Appeler un conseiller</span>
          </a>

          {/* Quick WhatsApp chat */}
          <a
            id="nav-whatsapp"
            href={`https://wa.me/${primaryAdvisor.whatsapp}?text=Bonjour,%20je%20souhaite%20me%20faire%20recommander%20un%20véhicule%20chez%20Prestige%20Automobiles.`}
            target="_blank"
            referrerPolicy="no-referrer"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-emerald-950/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
