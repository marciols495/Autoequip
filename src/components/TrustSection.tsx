import { Box, Camera, Star, Quote } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useState, useRef } from "react";

function AnimatedNumber({ value, duration = 2, suffix = "", decimals = 0 }: { value: number, duration?: number, suffix?: string, decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeOut * value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString('pt-PT', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}

export function TrustSection() {
  const reviews = [
    { name: "Carlos Mendes", car: "BMW Serie 3", text: "Primeira vez que vejo um mecânico mostrar num vídeo o que está estragado antes de pedir aprovação. Excelente!", rating: 5 },
    { name: "Ana Rita", car: "Renault Clio", text: "Entregaram-me as peças antigas numa caixa. Senti uma confiança brutal no serviço. Recomendo a 100%.", rating: 5 },
    { name: "João Pereira", car: "Toyota Corolla", text: "Orçamento claro e cumprido à risca. Sem aquelas 'surpresas' de última hora no momento de pagar.", rating: 5 }
  ];

  return (
    <motion.section 
      className="py-24 bg-zinc-950"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Confiança <span className="text-blue-500">Radical</span></h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Acabaram-se os mitos e a desconfiança. Trabalhamos de portas abertas e com a câmara ligada.
          </p>
        </div>

        {/* Stats Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl md:text-5xl font-black text-blue-500 mb-2">
              <AnimatedNumber value={15000} suffix="+" />
            </div>
            <div className="text-xs md:text-sm text-zinc-400 font-medium uppercase tracking-wider">Carros Reparados</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl md:text-5xl font-black text-blue-500 mb-2">
              <AnimatedNumber value={25} suffix="+" />
            </div>
            <div className="text-xs md:text-sm text-zinc-400 font-medium uppercase tracking-wider">Anos de Experiência</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl md:text-5xl font-black text-blue-500 mb-2">
              <AnimatedNumber value={100} suffix="%" />
            </div>
            <div className="text-xs md:text-sm text-zinc-400 font-medium uppercase tracking-wider">Transparência</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl md:text-5xl font-black text-blue-500 mb-2 flex justify-center items-center gap-1">
              <AnimatedNumber value={4.9} decimals={1} />
              <Star className="w-6 h-6 md:w-8 md:h-8 fill-current text-blue-500" />
            </div>
            <div className="text-xs md:text-sm text-zinc-400 font-medium uppercase tracking-wider">Classificação</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 relative overflow-hidden group flex flex-col">
            <div className="h-64 w-full relative">
              <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800" alt="Caixa da Verdade" className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent"></div>
            </div>
            <div className="p-6 sm:p-8 relative -mt-12">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-xl border border-blue-400 relative z-10">
                <Box className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">A Caixa da Verdade</h3>
              <p className="text-zinc-400 leading-relaxed">
                <strong>Mecânica Sem Segredos:</strong> Todas as reparações antigas e peças substituídas são higienizadas e entregues numa caixa selada ao cliente. O que é seu, volta para si.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 relative overflow-hidden group flex flex-col">
            <div className="h-64 w-full relative">
              <img src="https://images.unsplash.com/photo-1632050986689-53b0e1d53347?auto=format&fit=crop&q=80&w=800" alt="Vídeo Diagnóstico" className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent"></div>
            </div>
            <div className="p-6 sm:p-8 relative -mt-12">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-xl border border-blue-400 relative z-10">
                <Camera className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Vídeo-Diagnóstico 4K</h3>
              <p className="text-zinc-400 leading-relaxed">
                Receba no seu WhatsApp um vídeo detalhado gravado pelo técnico a explicar a avaria. <strong>Nenhuma peça é encomendada sem a sua visualização e aprovação no telemóvel.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800/50 flex flex-col h-full">
              <div className="flex text-blue-500 mb-4">
                {[...Array(r.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <Quote className="w-8 h-8 text-zinc-800 mb-2" />
              <p className="text-zinc-300 mb-6 flex-grow">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{r.name}</div>
                  <div className="text-xs text-zinc-500">{r.car}</div>
                </div>
                <div className="ml-auto w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
                  <span className="text-[10px] text-zinc-400">G</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
