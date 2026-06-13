import React, { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import CarCard from "./components/CarCard";
import CarDetailModal from "./components/CarDetailModal";
import CallbackForm from "./components/CallbackForm";
import { VEHICLES, ADVISORS } from "./data";
import { Vehicle, OfferType, CategoryType, FuelType } from "./types";
import { 
  Sparkle, 
  ShieldCheck, 
  Compass, 
  HelpCircle, 
  Calculator, 
  Coins, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle,
  MessageSquare,
  PhoneCall
} from "lucide-react";

export default function App() {
  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<OfferType | "Tous">("Tous");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "Tous">("Tous");
  const [selectedFuel, setSelectedFuel] = useState<FuelType | "Tous">("Tous");
  const [maxPrice, setMaxPrice] = useState<number>(120000000); // 120 Millions FCFA default
  const [sortBy, setSortBy] = useState("recommanded");

  // Interaction State
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  
  // Finance Simulator State in FCFA
  const [simulatedPrice, setSimulatedPrice] = useState<number>(45000000); // 45 Millions FCFA
  const [simApport, setSimApport] = useState<number>(5000000); // 5 Millions FCFA
  const [simDuration, setSimDuration] = useState<number>(48); // months
  const [creditRate, setCreditRate] = useState<number>(6.5); // % APR (typical local standard rate)

  // FAQ Active State
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Compute filtered cars
  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((vehicle) => {
      // 1. Text Search query
      const matchSearch =
        vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Offer Type Vente / Location
      const matchOffer = selectedOffer === "Tous" || vehicle.offerType === selectedOffer;

      // 3. Category matching
      const matchCategory = selectedCategory === "Tous" || vehicle.category === selectedCategory;

      // 4. Fuel type matching
      const matchFuel = selectedFuel === "Tous" || vehicle.fuel === selectedFuel;

      // 5. Max price budget
      const matchPrice = vehicle.price <= maxPrice;

      return matchSearch && matchOffer && matchCategory && matchFuel && matchPrice;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "year") return b.year - a.year;
      if (sortBy === "mileage") return a.mileage - b.mileage;
      // Default: recommanded order (featured first, then higher price/quality ratio)
      const weightA = (a.isFeatured ? 20000000 : 0) + (a.year * 1000);
      const weightB = (b.isFeatured ? 20000000 : 0) + (b.year * 1000);
      return weightB - weightA;
    });
  }, [searchQuery, selectedOffer, selectedCategory, selectedFuel, maxPrice, sortBy]);

  // Handle Quick WhatsApp Trigger from Card
  const handleQuickWhatsApp = (vehicle: Vehicle, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering open modal
    const advisor = vehicle.offerType === "Location" ? ADVISORS[1] : ADVISORS[0];
    const isRent = vehicle.offerType === "Location";
    const text = `Bonjour ${advisor.name}, je suis intéressé par l'offre de ${vehicle.offerType.toLowerCase()} pour la ${vehicle.brand} ${vehicle.model} (${vehicle.price.toLocaleString()} FCFA${isRent ? "/jour" : ""}). Est-elle toujours disponible ?`;
    window.open(`https://wa.me/${advisor.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  // Finance Monthly Payment helper formula
  const calculatedMonthlyPayment = useMemo(() => {
    const principal = simulatedPrice - simApport;
    if (principal <= 0) return 0;
    const monthlyRate = (creditRate / 100) / 12;
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, simDuration)) / (Math.pow(1 + monthlyRate, simDuration) - 1);
    return Math.round(payment);
  }, [simulatedPrice, simApport, simDuration, creditRate]);

  // Localized Ivorian FAQs
  const FAQS = [
    {
      q: "Quelles sont les pièces nécessaires pour l'achat ou location d'un véhicule ?",
      a: "Pour finaliser votre dossier d'achat ou de location, veuillez nous fournir : une pièce d'identité ivoirienne en cours de validité (CNI, Passeport ou carte de résident), un permis de conduire valide, une attestation ou un justificatif de domicile à Abidjan, ainsi que vos 3 derniers bulletins de salaire ou états financiers d'entreprise. Nos commerciaux s'occupent de toutes les formalités d'immatriculation d'Abidjan."
    },
    {
      q: "Comment fonctionne le service de Location Prestige ?",
      a: "Nos locations haut de gamme à la journée incluent une assurance tous risques premium, une assistance 24h/24 et 7j/7 sur tout le territoire, et une mise à disposition rapide à Cocody, Marcory ou à l'Aéroport Félix-Houphouët-Boigny d'Abidjan. Une pré-autorisation sur carte bancaire est requise au départ."
    },
    {
      q: "Proposez-vous des garanties mécaniques certifiées ?",
      a: "Oui, absolument. Tous nos véhicules bénéficient d'une garantie totale de 12 mois minimum, extensible jusqu'à 36 mois selon vos envies. Nos voitures d'importation subissent une révision exhaustive en 110 points de contrôle spécialement adaptée aux contraintes climatiques et routières tropicales."
    },
    {
      q: "Est-il possible de se faire livrer le véhicule à l'intérieur de la Côte d'Ivoire ?",
      a: "Prestige Automobiles propose la livraison sécurisée à domicile ou à votre bureau à Abidjan, mais également sur l'ensemble du territoire ivoirien (Yamoussoukro, San Pedro, Bouaké, Korhogo, Assinie). Un conseiller fait la mise en main en mains propres."
    }
  ];

  return (
    <div id="main-app" className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      {/* Complete Header and Brand Area */}
      <Navbar />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-grow w-full">
        
        {/* Sales Dynamic Hero Banner */}
        <div id="hero-banner" className="relative rounded-3xl bg-slate-900 overflow-hidden shadow-2xl mb-10 py-16 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1500')] bg-cover bg-center opacity-15" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -translate-y-20 translate-x-10 pointer-events-none" />
          
          <div className="relative z-10 max-w-xl text-left">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4 border border-emerald-500/20">
              <Sparkle className="w-3.5 h-3.5 fill-emerald-400" />
              <span>Référence Absolue de l'Automobile de Prestige en Côte d'Ivoire</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight m-0">
              L'Exception Automobile. <br />
              Vente & Location Premium.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed max-w-lg m-0">
              Découvrez une sélection exclusive de supercars, SUV de luxe et berlines prestigieuses adaptées au climat local.
              Échangez directement avec nos conseillers via WhatsApp ou par téléphone pour un service VIP clé en main.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-xs px-3.5 py-1.5 rounded-xl text-xs text-slate-200 border border-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Garantie 12 Mois Constructeur</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-xs px-3.5 py-1.5 rounded-xl text-xs text-slate-200 border border-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Immatriculation Abidjan incluse</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 bg-slate-950/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 text-left w-full md:max-w-sm shrink-0 shadow-lg">
            <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-widest font-mono">Financement Local</span>
            <h3 className="text-base font-bold text-white mt-1 mb-2.5 flex items-center gap-1.5">
              <Calculator className="w-4.5 h-4.5 text-emerald-500" />
              <span>Simulateur de Mensualité</span>
            </h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Prix d'achat conseillé :</span>
                  <span className="font-bold text-white font-mono">{simulatedPrice.toLocaleString()} FCFA</span>
                </div>
                <input
                  type="range"
                  min={15000000}
                  max={120000000}
                  step={5000000}
                  value={simulatedPrice}
                  onChange={(e) => {
                    const price = Number(e.target.value);
                    setSimulatedPrice(price);
                    // Prevent Apport from exceeding price
                    if (simApport > price * 0.8) {
                      setSimApport(Math.round(price * 0.2));
                    }
                  }}
                  className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Votre Apport Initial :</span>
                  <span className="font-bold text-white font-mono">{simApport.toLocaleString()} FCFA</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={simulatedPrice * 0.8}
                  step={2000000}
                  value={simApport}
                  onChange={(e) => setSimApport(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">Durée (mois)</label>
                  <select
                    value={simDuration}
                    onChange={(e) => setSimDuration(Number(e.target.value))}
                    className="w-full text-xs bg-slate-900 border border-slate-800 text-white p-2 rounded-lg font-bold"
                  >
                    <option value={24}>24 mois</option>
                    <option value={36}>36 mois</option>
                    <option value={48}>48 mois</option>
                    <option value={60}>60 mois</option>
                    <option value={72}>72 mois</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">Taux local</label>
                  <input
                    type="text"
                    disabled
                    value={`${creditRate}% fixe`}
                    className="w-full text-xs bg-slate-900 border border-slate-800 text-emerald-400 p-2 rounded-lg font-bold text-center"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-none block">Mensualité Estimée</span>
                  <span className="text-xl font-black text-emerald-400 mt-1 block font-mono">
                    {calculatedMonthlyPayment.toLocaleString()} F <span className="text-[10px] text-white">/ mois</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const firstAdvisor = ADVISORS[0];
                    const msg = `Bonjour Jean-Luc, j'ai réalisé une simulation de mensualité pour un véhicule de ${simulatedPrice.toLocaleString()} FCFA avec un apport de ${simApport.toLocaleString()} FCFA sur ${simDuration} mois. Je souhaite valider mon dossier d'accord de principe personnalisé.`;
                    window.open(`https://wa.me/${firstAdvisor.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
                  }}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-lg text-xs transition"
                >
                  Dossier VIP
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Filters Widget */}
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedOffer={selectedOffer}
          setSelectedOffer={setSelectedOffer}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedFuel={selectedFuel}
          setSelectedFuel={setSelectedFuel}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Catalog Showroom Header */}
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2 mb-6">
          <div>
            <h3 className="text-2xl font-black text-slate-900 m-0 tracking-tight flex items-center gap-2">
              <Compass className="w-6 h-6 text-emerald-600" />
              <span>Notre Showroom Automobile Abidjan</span>
            </h3>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              {filteredVehicles.length} {filteredVehicles.length > 1 ? "véhicules disponibles" : "véhicule disponible"} selon vos critères
            </p>
          </div>
        </div>

        {/* Vehicles Grid list */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle) => (
              <CarCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={(veh) => setSelectedVehicle(veh)}
                onQuickWhatsApp={handleQuickWhatsApp}
              />
            ))}
          </div>
        ) : (
          /* Custom search empty state */
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-sm flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-5">
              <Compass className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1">Aucun modèle ne correspond à vos filtres</h4>
            <p className="text-sm text-slate-500 max-w-sm my-2">
              Certaines combinaisons d'options ou de gammes budgétaires peuvent être très spécifiques. Notre agence peut rechercher ou importer le modèle de vos rêves sur commande spéciale.
            </p>
            <div className="flex gap-3 justify-center mt-5">
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
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
              >
                Réinitialiser les filtres
              </button>
              <a
                href={`https://wa.me/${ADVISORS[0].whatsapp}?text=Bonjour,%20je%20recherche%20un%20modèle%20de%20véhicule%20spécifique%20qui%20n'est%20pas%20affiché%20dans%2520votre%2520showroom.%20Pouvez-vous%20m'aider?`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contacter l'agence d'Abidjan</span>
              </a>
            </div>
          </div>
        )}

        {/* Business Benefits Trust banner */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 m-0">Achat Serein Certifié</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Tous nos véhicules sont expertisés complets (contrôle technique d'importation rigoureux), révisés et garantis 12 mois minimum. Zéro frais à prévoir.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
              <Coins className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 m-0">Moyens de Financement</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Apport de départ flexible, formules adaptées aux particuliers et entreprises ivoiriennes. Nos équipes conçoivent la meilleure option de paiement.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 m-0">Estimation de Reprise d'Abidjan</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Nous rachetons ou reprenons votre ancien véhicule au meilleur prix du marché à Abidjan après une vérification rigoureuse par nos techniciens.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Dual Section client help & general callback form */}
        <div id="additional-customer-sections" className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Diagnostic FAQ accordion block */}
          <div className="lg:col-span-7 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 m-0 tracking-tight flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              <span>Questions Fréquentes — FAQ Côte d'Ivoire</span>
            </h3>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="border-b border-slate-100 last:border-0 pb-3 h-auto"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaqIndex(activeFaqIndex === idx ? null : idx)}
                    className="w-full text-left font-bold text-sm sm:text-base text-slate-800 hover:text-emerald-700 transition flex justify-between items-center py-2"
                  >
                    <span>{faq.q}</span>
                    <span className="text-emerald-500 font-extrabold text-lg select-none">
                      {activeFaqIndex === idx ? "−" : "+"}
                    </span>
                  </button>
                  {activeFaqIndex === idx && (
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1 animate-fade-in bg-slate-50 p-3 rounded-lg">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick callback general reservation block */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-2">
              <CallbackForm />
            </div>
          </div>

        </div>

      </main>

      {/* Immersive Vehicle Detail Drawer Modal dialog popup */}
      <CarDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />

      {/* Structured Footer with address, map elements, links and disclaimer */}
      <footer id="main-footer" className="bg-slate-900 text-slate-400 mt-24 border-t border-slate-800 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo, tagline, physical location */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 text-slate-950 p-1.5 rounded-lg font-bold text-sm">
                V&L
              </div>
              <span className="text-white font-black text-base tracking-tight">Prestige Automobiles</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Showroom haut de gamme de prestige spécialisé dans la vente et la location de véhicules exceptionnels conçus pour les passionnés d'automobile en Côte d'Ivoire.
            </p>
            <p className="text-[11px] text-emerald-400 font-semibold">
              📍 Boulevard Valéry Giscard d'Estaing, Marcory Zone 4, Abidjan, Côte d'Ivoire
            </p>
          </div>

          {/* Opening Times */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Horaires d'ouverture</h4>
            <ul className="space-y-1 text-xs">
              <li className="flex justify-between"><span>Lundi :</span> <span className="text-white">8h00 - 19h00</span></li>
              <li className="flex justify-between"><span>Mardi :</span> <span className="text-white">8h00 - 19h00</span></li>
              <li className="flex justify-between"><span>Mercredi :</span> <span className="text-white">8h00 - 19h00</span></li>
              <li className="flex justify-between"><span>Jeudi :</span> <span className="text-white">8h00 - 19h00</span></li>
              <li className="flex justify-between"><span>Vendredi :</span> <span className="text-white">8h00 - 19h00</span></li>
              <li className="flex justify-between"><span>Samedi :</span> <span className="text-white">8h00 - 19h00</span></li>
              <li className="flex justify-between text-emerald-400 font-semibold"><span>Dimanche :</span> <span>Fermé</span></li>
            </ul>
          </div>

          {/* Quick contact and advice links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Conseil & Assistance</h4>
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${ADVISORS[0].whatsapp}`}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <PhoneCall className="w-4 h-4 text-emerald-500" />
                <span>Jean-Luc Koffi : {ADVISORS[0].phone}</span>
              </a>
              <a
                href={`tel:${ADVISORS[1].whatsapp}`}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <PhoneCall className="w-4 h-4 text-emerald-500" />
                <span>Alima Coulibaly : {ADVISORS[1].phone}</span>
              </a>
              <a
                href={`https://wa.me/${ADVISORS[0].whatsapp}?text=Bonjour%20Jean-Luc%20Prestige%20Automobiles,%20je%20souhaite%20prendre%20un%20rendez-vous%20au%20showroom.`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition font-bold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discuter via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Reassurance values certifications */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Nos Engagements</h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex gap-2 items-center text-slate-300">
                <span className="text-emerald-500 text-base">✓</span>
                <span>Contrôles rigoureux adaptés au climat</span>
              </p>
              <p className="flex gap-2 items-center text-slate-300">
                <span className="text-emerald-500 text-base">✓</span>
                <span>Kilométrage contractuel certifié</span>
              </p>
              <p className="flex gap-2 items-center text-slate-300">
                <span className="text-emerald-500 text-base">✓</span>
                <span>Service d'immatriculation express</span>
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer signature line */}
        <div className="bg-slate-950 py-4 border-t border-slate-900 text-center text-[10px] text-slate-500">
          <p>© 2026 Prestige Automobiles Abidjan. Tous droits réservés. Mentions légales et CGU contractuelles.</p>
        </div>
      </footer>
    </div>
  );
}
