import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Star, ShieldCheck, Wrench, Clock, Search } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950 pt-32 pb-16 md:pt-20 md:pb-0">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url("https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80&w=2000")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-zinc-950 pointer-events-none"></div>
        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-blue-500 text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>A sua Oficina de Confiança</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 md:mb-6 leading-tight">
              Especialistas na <span className="text-blue-500">Manutenção</span> do seu Veículo.
            </h1>
            <p className="text-lg md:text-2xl text-zinc-400 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
              Serviços automóveis de excelência, agendamento simples e acompanhamento da reparação por vídeo. <strong className="text-white">Qualidade sem compromissos.</strong>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto text-lg gap-2" onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}>
              <Clock className="w-5 h-5" />
              Agendar Serviço
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg gap-2" onClick={() => document.getElementById('tracker')?.scrollIntoView({ behavior: 'smooth' })}>
              <Search className="w-5 h-5" />
              Rastrear Viatura
            </Button>
            <Button size="lg" variant="ghost" className="w-full sm:w-auto text-lg gap-2 hidden lg:flex hover:bg-zinc-800" onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}>
              <Wrench className="w-5 h-5" />
              Ver Serviços
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex items-center justify-center gap-3 text-zinc-300"
          >
            <div className="flex gap-1 text-blue-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="font-medium">4.9/5 no Google Maps</span>
            <span className="text-zinc-500 hidden sm:inline">(Mais de 1.500 avaliações reais)</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
