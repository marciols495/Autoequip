import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, Truck, Check } from "lucide-react";
import { motion } from "motion/react";

const SERVICOS_AGENDAMENTO = ["Revisão Geral", "Mudança de Óleo", "Alinhamento 3D", "Travões", "Check-up"];
const DATAS = ["Hoje", "Amanhã", "Seg, 24", "Ter, 25", "Qua, 26"];
const HORARIOS = ["09:00", "10:30", "11:00", "14:00", "15:30", "17:00"];

export function AgendaDigital() {
  const [servicoSelecionado, setServicoSelecionado] = useState(SERVICOS_AGENDAMENTO[0]);
  const [dataSelecionada, setDataSelecionada] = useState(DATAS[1]);
  const [horaSelecionada, setHoraSelecionada] = useState(HORARIOS[0]);
  const [recolha, setRecolha] = useState(false);
  const [agendado, setAgendado] = useState(false);

  const handleAgendar = () => {
    setAgendado(true);
    setTimeout(() => setAgendado(false), 3000);
  };

  return (
    <motion.section 
      id="agendamento" 
      className="py-16 md:py-24 bg-zinc-950 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-12 items-start lg:items-center">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-6">
              <Clock className="w-4 h-4" />
              <span>Sem Filas. Sem Espera.</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Agendamento em <span className="text-blue-500">Tempo Real</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8">
              Escolha a data e hora que melhor lhe convém. Sincronização direta com a agenda dos nossos técnicos.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-zinc-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Localização Premium</h4>
                  <p className="text-zinc-500">Oficinas centrais, limpas e organizadas. Wi-Fi e café expresso gratuitos enquanto espera.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-zinc-300">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Serviço Valet (Door-to-Door)</h4>
                  <p className="text-zinc-500">Nós recolhemos e entregamos o seu carro em casa ou no trabalho. Total conveniência.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="h-48 sm:h-56 rounded-2xl overflow-hidden relative border border-zinc-800 block group">
                <img src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&q=80&w=800" alt="Valet Service" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all" />
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                <div className="absolute bottom-3 left-3 bg-zinc-950/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-zinc-800">Serviço Valet</div>
              </div>
              <div className="h-48 sm:h-56 rounded-2xl overflow-hidden relative border border-zinc-800 block bg-zinc-900 group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.1368940562547!2d-9.141589323719082!3d38.72611736149463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19337d45388065%3A0x6e9f289cf0028e2!2sPra%C3%A7a%20Marqu%C3%AAs%20de%20Pombal%2C%20Lisboa!5e0!3m2!1spt-PT!2spt!4v1715000000000!5m2!1spt-PT!2spt" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)' }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="opacity-80 group-hover:opacity-100 transition-opacity"
                ></iframe>
                <div className="absolute bottom-3 left-3 bg-zinc-950/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-zinc-800 pointer-events-none flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  Oficina Central
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-zinc-900 rounded-2xl border border-zinc-800 p-5 sm:p-6 md:p-8 shadow-xl max-w-full overflow-hidden">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-500" />
              Detalhes da Marcação
            </h3>

            <div className="mb-6">
              <label className="text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wide block mb-3">Serviço Pretendido</label>
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 pt-1 px-1 -mx-1 snap-x snap-mandatory scrollbar-hide">
                {SERVICOS_AGENDAMENTO.map((s) => (
                  <button
                    key={s}
                    onClick={() => setServicoSelecionado(s)}
                    className={`snap-start shrink-0 px-4 sm:px-5 py-2 sm:py-3 rounded-xl whitespace-nowrap text-sm sm:text-base font-medium transition-all ${servicoSelecionado === s ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wide block mb-3">Datas Disponíveis</label>
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 pt-1 px-1 -mx-1 snap-x snap-mandatory scrollbar-hide">
                {DATAS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDataSelecionada(d)}
                    className={`snap-start shrink-0 px-4 sm:px-5 py-2 sm:py-3 rounded-xl whitespace-nowrap text-sm sm:text-base font-medium transition-all ${dataSelecionada === d ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-100 sm:scale-105' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wide block mb-3">Horários ({dataSelecionada})</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {HORARIOS.map((h) => (
                  <button
                    key={h}
                    onClick={() => setHoraSelecionada(h)}
                    className={`py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors ${horaSelecionada === h ? 'bg-white text-zinc-900 border-2 border-white' : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-3 sm:gap-4 cursor-pointer hover:border-blue-500/50 transition-colors" onClick={() => setRecolha(!recolha)}>
              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${recolha ? 'bg-blue-500 border-blue-500' : 'border-zinc-600 bg-zinc-900'}`}>
                {recolha && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
              </div>
              <div>
                <div className="text-white font-bold text-sm sm:text-base mb-1">Quero que recolham o meu carro</div>
                <div className="text-xs sm:text-sm text-zinc-500">Recolha e entrega ao domicílio (+20.000 Kz)</div>
              </div>
            </div>

            <Button size="lg" className="w-full text-lg" onClick={handleAgendar} disabled={agendado}>
              {agendado ? "Agendado com Sucesso! 🎉" : "Confirmar Agendamento"}
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
