import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Activity, Video, FileText, CheckCircle2, Settings } from "lucide-react";

export function HistoricoClinico() {
  return (
    <section className="py-24 bg-zinc-900 border-y border-zinc-800 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none"></div>

      <motion.div 
        className="container mx-auto px-4 max-w-6xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">O "Histórico Clínico" do Seu Carro</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Acompanhe o estado da reparação em tempo real. Veja faturas, histórico e até o vídeo gravado pelo técnico durante o diagnóstico.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Status Timeline */}
          <div className="lg:col-span-1 bg-zinc-950 rounded-2xl border border-zinc-800 p-6 shadow-xl flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-2xl"></div>
            <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400" alt="Audi A3" className="w-full h-32 object-cover rounded-xl mb-6 opacity-80 mix-blend-luminosity border border-zinc-800 group-hover:mix-blend-normal transition-all" />
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Estado Atual (Audi A3)
            </h3>
            
            <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-blue-500 bg-zinc-950 text-blue-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 -ml-3 md:left-1/2 shadow">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="w-full ml-8 md:w-[calc(50%-2.5rem)] md:ml-0">
                  <div className="flex flex-col">
                    <span className="font-bold text-white">Veículo Recebido</span>
                    <span className="text-sm text-zinc-500">09:15</span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-blue-500 bg-blue-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 -ml-3 md:left-1/2 shadow shadow-blue-500/50">
                  <Settings className="w-3 h-3 animate-spin" />
                </div>
                <div className="w-full ml-8 md:w-[calc(50%-2.5rem)] md:ml-0">
                  <div className="flex flex-col">
                    <span className="font-bold text-white">Em Diagnóstico</span>
                    <span className="text-sm text-blue-500">Agora</span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group opacity-50">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-zinc-700 bg-zinc-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 -ml-3 md:left-1/2 shadow">
                </div>
                <div className="w-full ml-8 md:w-[calc(50%-2.5rem)] md:ml-0">
                  <div className="flex flex-col">
                    <span className="font-bold text-white">Peças Solicitadas</span>
                    <span className="text-sm text-zinc-500">Pendente</span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group opacity-50">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-zinc-700 bg-zinc-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 -ml-3 md:left-1/2 shadow">
                </div>
                <div className="w-full ml-8 md:w-[calc(50%-2.5rem)] md:ml-0">
                  <div className="flex flex-col">
                    <span className="font-bold text-white">Pronto a Levantar</span>
                    <span className="text-sm text-zinc-500">Pendente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Card */}
            <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="bg-zinc-900 rounded-xl p-6 relative flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-48 h-32 bg-zinc-950 rounded-lg relative overflow-hidden shrink-0 border border-zinc-800 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&q=80&w=400" alt="Engine" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity" />
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center relative z-10 cursor-pointer hover:scale-110 transition-transform">
                    <Video className="w-5 h-5 ml-1" />
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-red-500/10 text-red-500 mb-3 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Novo Vídeo do Técnico
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Diagnóstico dos Travões</h4>
                  <p className="text-zinc-400 text-sm mb-4">O nosso técnico João preparou um vídeo de 2 mins a explicar o desgaste das pastilhas dianteiras.</p>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">Ver Vídeo do Diagnóstico</Button>
                </div>
              </div>
            </div>

            {/* History Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-400">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Última Fatura</h4>
                <p className="text-zinc-500 text-sm mb-4">Revisão Geral • 12 Fev 2023</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                  <span className="text-white font-bold">150.000 Kz</span>
                  <a href="#" className="text-blue-500 text-sm font-semibold hover:underline">Descarregar PDF</a>
                </div>
              </div>
              <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-400">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Próxima Revisão</h4>
                <p className="text-zinc-500 text-sm mb-4">Recomendada aos 120.000 km</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                  <span className="text-zinc-400 text-sm">Faltam 5.000 km</span>
                  <a href="#agendamento" className="text-blue-500 text-sm font-semibold hover:underline">Agendar Já</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
