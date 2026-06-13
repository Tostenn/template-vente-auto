import React, { useState } from "react";
import { PhoneCall, Check, Sparkles, Send } from "lucide-react";
import { Vehicle } from "../types";

interface CallbackFormProps {
  vehicle?: Vehicle;
  onSuccess?: () => void;
}

export default function CallbackForm({ vehicle, onSuccess }: CallbackFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    timeRange: "immédiatement",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    setLoading(true);
    // Simulate real database or API callback registration nicely
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 rounded-2xl p-6 text-center flex flex-col items-center justify-center animate-fade-in">
        <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4 animate-bounce">
          <Check className="w-6 h-6 stroke-[3]" />
        </div>
        <h4 className="text-lg font-bold text-slate-900 mb-2">Demande reçue !</h4>
        <p className="text-sm text-slate-700 max-w-xs leading-relaxed">
          Un conseiller commercial va vous rappeler au <strong>{formData.phone}</strong> sous peu ({formData.timeRange}).
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({ fullName: "", phone: "", timeRange: "immédiatement", message: "" });
          }}
          className="mt-5 text-xs text-emerald-700 hover:text-emerald-900 font-bold underline underline-offset-4"
        >
          Faire une autre demande
        </button>
      </div>
    );
  }

  return (
    <form
      id="callback-form"
      onSubmit={handleSubmit}
      className="bg-slate-50 border border-slate-100 rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
          <PhoneCall className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 m-0">Être rappelé gratuitement</h4>
          <p className="text-xs text-slate-500 m-0">Un conseiller vous appelle au créneau de votre choix</p>
        </div>
      </div>

      {vehicle && (
        <div className="mb-4 bg-emerald-500/5 border border-emerald-500/15 p-2 px-3 rounded-lg flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Véhicule ciblé :</span>
          <span className="text-xs font-bold text-emerald-800">
            {vehicle.brand} {vehicle.model}
          </span>
        </div>
      )}

      <div className="space-y-3.5">
        <div>
          <label htmlFor="callback-name" className="block text-xs font-bold text-slate-600 mb-1">
            Nom complet <span className="text-rose-500">*</span>
          </label>
          <input
            id="callback-name"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Ex : M. Kouassi Yao"
            className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-800"
          />
        </div>

        <div>
          <label htmlFor="callback-phone" className="block text-xs font-bold text-slate-600 mb-1">
            Numéro de téléphone <span className="text-rose-500">*</span>
          </label>
          <input
            id="callback-phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Ex : +225 07 08 45 12 12"
            className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-800"
          />
        </div>

        <div>
          <label htmlFor="callback-timerange" className="block text-xs font-bold text-slate-600 mb-1">
            Quand souhaitez-vous être rappelé ?
          </label>
          <select
            id="callback-timerange"
            value={formData.timeRange}
            onChange={(e) => setFormData({ ...formData, timeRange: e.target.value })}
            className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-800"
          >
            <option value="immédiatement">Immédiatement (moins de 15 minutes)</option>
            <option value="cet après-midi">Cet après-midi</option>
            <option value="demain matin">Demain matin</option>
            <option value="en fin de journée (17h-19h)">En fin de journée (17h-19h)</option>
          </select>
        </div>

        <div>
          <label htmlFor="callback-msg" className="block text-xs font-bold text-slate-600 mb-1">
            Précisions ou questions (optionnel)
          </label>
          <textarea
            id="callback-msg"
            rows={2}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Ex : Je souhaite faire une reprise ou planifier un essai."
            className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-800 resize-none"
          />
        </div>

        <button
          id="callback-submit"
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Valider ma demande de rappel</span>
            </>
          )}
        </button>
      </div>

      <p className="text-[10px] text-slate-400 text-center mt-3">
        Service gratuit et sans engagement. Vos données restent confidentielles.
      </p>
    </form>
  );
}
