import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Car, Wrench, CheckCircle2, Clock, MapPin, ChevronRight, Check } from "lucide-react";

type RepairStatus = "waiting" | "diagnosing" | "parts" | "repairing" | "ready";

interface RepairInfo {
  plate: string;
  vehicle: string;
  status: RepairStatus;
  progress: number;
  mechanic: string;
  estimatedCompletion: string;
  budgetApprovable?: boolean;
  budgetValue?: number;
}

const mockDatabase: Record<string, RepairInfo> = {
  "AA-00-AA": {
    plate: "AA-00-AA",
    vehicle: "BMW Série 3 (2019)",
    status: "repairing",
    progress: 75,
    mechanic: "Carlos S.",
    estimatedCompletion: "Hoje às 17:30",
  },
  "11-ZZ-22": {
    plate: "11-ZZ-22",
    vehicle: "Renault Clio (2021)",
    status: "parts",
    progress: 40,
    mechanic: "Tiago M.",
    estimatedCompletion: "Amanhã de manhã",
    budgetApprovable: true,
    budgetValue: 185.50
  },
  "TESTE": {
    plate: "TESTE",
    vehicle: "Mercedes Classe A",
    status: "diagnosing",
    progress: 20,
    mechanic: "Ricardo",
    estimatedCompletion: "Hoje",
  }
};

const steps = [
  { id: "waiting", label: "Na Fila", icon: Clock },
  { id: "diagnosing", label: "Diagnóstico", icon: Search },
  { id: "parts", label: "Peças", icon: MapPin },
  { id: "repairing", label: "Reparação", icon: Wrench },
  { id: "ready", label: "Pronto!", icon: CheckCircle2 }
];

export function RepairTracker() {
  const [plateInput, setPlateInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<RepairInfo | null | "not_found">(null);
  const [budgetApproved, setBudgetApproved] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plateInput.trim()) return;
    
    setIsSearching(true);
    setResult(null);
    setBudgetApproved(false);

    // Simulate network delay
    setTimeout(() => {
      const formattedInput = plateInput.toUpperCase().replace(/\s/g, '');
      const found = mockDatabase[formattedInput];
      
      if (found) {
        setResult(found);
      } else {
        // If not found, create a fake one so the demo always looks good for the client
        setResult({
          plate: plateInput.toUpperCase(),
          vehicle: "Veículo de Cliente",
          status: "repairing",
          progress: 60,
          mechanic: "Equipa AutoEquip",
          estimatedCompletion: "Amanhã",
        });
      }
      setIsSearching(false);
    }, 1200);
  };

  return (
    <section id="tracker" className="py-20 bg-zinc-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Rastreio <span className="text-blue-500">Ao Vivo</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Acompanhe o estado da reparação do seu veículo em tempo real. Transparência total, como deve ser.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Insira a sua Matrícula (ex: AA-00-AA)"
                value={plateInput}
                onChange={(e) => setPlateInput(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white uppercase placeholder:normal-case placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-lg font-mono tracking-widest"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching || !plateInput}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isSearching ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Clock className="w-5 h-5" />
                </motion.div>
              ) : (
                <>Rastrear Viatura <ChevronRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {result && result !== "not_found" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pt-6 border-t border-zinc-800"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{result.vehicle}</h3>
                    <div className="inline-block bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-md text-sm font-mono text-zinc-300">
                      {result.plate}
                    </div>
                  </div>
                  <div className="text-left md:text-right bg-blue-900/20 border border-blue-900/50 p-3 rounded-xl">
                    <p className="text-sm text-blue-400 font-medium mb-0.5">Previsão de Entrega</p>
                    <p className="text-white font-bold">{result.estimatedCompletion}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-12">
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                  
                  <div className="flex justify-between absolute -bottom-10 left-0 right-0">
                    {steps.map((step, idx) => {
                      const isActive = result.progress >= (idx * 25);
                      const isCurrent = step.id === result.status;
                      const Icon = step.icon;
                      
                      return (
                        <div key={step.id} className="flex flex-col items-center relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-zinc-900 border-zinc-700 text-zinc-500'} transition-colors delay-100 relative z-10 -mt-5`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className={`text-xs mt-2 font-medium hidden md:block ${isActive ? 'text-zinc-200' : 'text-zinc-600'}`}>
                            {step.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Mechanic Note & Budget */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex items-start gap-4">
                    <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150" alt="Mecânico" className="w-12 h-12 rounded-full object-cover border-2 border-zinc-800" />
                    <div>
                      <p className="text-sm text-zinc-400 mb-1">Mecânico Responsável</p>
                      <p className="text-white font-bold">{result.mechanic}</p>
                    </div>
                  </div>

                  {result.budgetApprovable && !budgetApproved && (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-blue-600/10 border border-blue-500/30 p-4 rounded-xl flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-sm text-blue-400 font-medium mb-1">Aprovação Necessária</p>
                        <p className="text-white font-bold text-lg">{result.budgetValue?.toFixed(2)}€</p>
                      </div>
                      <button 
                        onClick={() => setBudgetApproved(true)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-lg"
                      >
                        Aprovar
                      </button>
                    </motion.div>
                  )}

                  {budgetApproved && (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-green-600/10 border border-green-500/30 p-4 rounded-xl flex items-center gap-3"
                    >
                      <Check className="w-6 h-6 text-green-500" />
                      <div>
                        <p className="text-green-400 font-medium">Orçamento Aprovado!</p>
                        <p className="text-sm text-zinc-400">A avançar com a reparação.</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
