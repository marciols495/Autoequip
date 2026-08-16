import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Wrench, FileText, CarFront, ChevronRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const mockServices = [
    { id: 1, name: "Revisão Oficial", desc: "Mudança de óleo, filtros e check-up a 50 pontos, mantendo a garantia da marca.", type: "service" },
    { id: 2, name: "Mudança de Óleo", desc: "Óleos Premium e originais para prolongar a vida útil do motor.", type: "service" },
    { id: 3, name: "Travões", desc: "Substituição de pastilhas e discos com peças originais e garantia.", type: "service" },
    { id: 4, name: "Baterias", desc: "Diagnóstico eletrónico e substituição imediata de baterias.", type: "service" },
    { id: 5, name: "Diagnóstico 4K", desc: "Análise computorizada avançada para deteção precisa de anomalias.", type: "service" },
    { id: 6, name: "Motor e Caixa", desc: "Reparações profundas, reconstrução de motores e caixas de velocidades.", type: "service" },
  ];

  const searchResults = query.length > 1 
    ? mockServices.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.desc.toLowerCase().includes(query.toLowerCase()))
    : [];

  const isPlateSearch = /^[a-zA-Z0-9]{2}-?[a-zA-Z0-9]{2}-?[a-zA-Z0-9]{2}$|^[a-zA-Z0-9]{6}$/.test(query.replace(/\s/g, ''));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-16 px-4 sm:pt-24 bg-zinc-950/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="relative p-4 border-b border-zinc-800 flex items-center">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400 absolute left-4 sm:left-6" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pesquisar serviço ou Matrícula (ex: AA-00-AA)..."
                className="w-full bg-transparent border-none py-3 pl-10 sm:pl-12 pr-12 text-base sm:text-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-0"
              />
              <button 
                onClick={onClose}
                className="absolute right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[65vh] overflow-y-auto p-4 bg-zinc-950/50 scrollbar-hide">
              {query.length === 0 && (
                <div className="text-center py-12 text-zinc-500">
                  <Search className="w-10 h-10 mx-auto mb-4 opacity-20" />
                  <p className="max-w-xs mx-auto text-sm">Escreva o nome de um serviço ou insira a matrícula para ver o histórico do veículo.</p>
                </div>
              )}

              {query.length > 0 && !isPlateSearch && searchResults.length === 0 && (
                <div className="text-center py-12 text-zinc-500">
                  <p>Nenhum resultado encontrado para "{query}".</p>
                </div>
              )}

              {searchResults.length > 0 && !isPlateSearch && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 px-2">Serviços Encontrados</div>
                  {searchResults.map(s => (
                    <div key={s.id} onClick={() => { onClose(); document.getElementById('agendamento')?.scrollIntoView({behavior: 'smooth'}); }} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 border border-transparent hover:border-zinc-700 cursor-pointer transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-500 flex items-center justify-center shrink-0">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{s.name}</div>
                        <div className="text-xs sm:text-sm text-zinc-500">{s.desc}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                    </div>
                  ))}
                </div>
              )}

              {isPlateSearch && (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-2">Veículo Encontrado</div>
                  <div className="p-5 sm:p-6 rounded-xl border border-blue-500/30 bg-blue-500/5 flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white shrink-0">
                          <CarFront className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-base sm:text-lg tracking-widest">{query.toUpperCase()}</div>
                          <div className="text-xs sm:text-sm text-zinc-400">Última visita: há 4 meses</div>
                        </div>
                      </div>
                      <div className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] sm:text-xs font-bold border border-green-500/20 uppercase">
                        Ativo
                      </div>
                    </div>
                    
                    <div className="h-px w-full bg-zinc-800 my-2"></div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><FileText className="w-4 h-4 text-blue-500"/> Histórico Clínico</h4>
                      <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                        <li className="flex justify-between items-center p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                          <span className="text-zinc-300">Revisão Geral (Óleo + Filtros)</span>
                          <span className="text-zinc-500">12 Mai 2023</span>
                        </li>
                        <li className="flex justify-between items-center p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                          <span className="text-zinc-300">Pastilhas de Travão Dianteiras</span>
                          <span className="text-zinc-500">05 Nov 2022</span>
                        </li>
                      </ul>
                    </div>
                    <button onClick={() => { onClose(); document.getElementById('agendamento')?.scrollIntoView({behavior: 'smooth'}) }} className="w-full mt-2 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors text-sm">
                      Agendar Manutenção
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
