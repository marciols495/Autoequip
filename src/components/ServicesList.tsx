import { motion, AnimatePresence } from "motion/react";
import { Wrench, Battery, Droplets, Thermometer, ShieldCheck, Cog, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const CATEGORIAS = [
  { id: "todas", name: "Todos os Serviços" },
  { id: "manutencao", name: "Manutenção Preventiva" },
  { id: "mecanica", name: "Mecânica Geral" },
  { id: "eletrica", name: "Eletricidade & Eletrónica" },
];

const SERVICOS = [
  {
    id: 1,
    categoria: "manutencao",
    name: "Revisão Oficial",
    desc: "Mudança de óleo, filtros e check-up a 50 pontos, mantendo a garantia da marca.",
    images: [
      "https://images.unsplash.com/photo-1632823462943-7f28876800fa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=800"
    ],
    icon: <Wrench />,
  },
  {
    id: 2,
    categoria: "manutencao",
    name: "Mudança de Óleo",
    desc: "Óleos Premium e originais para prolongar a vida útil do motor.",
    images: [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1503376713356-78e78fc6477f?auto=format&fit=crop&q=80&w=800"
    ],
    icon: <Droplets />,
  },
  {
    id: 3,
    categoria: "mecanica",
    name: "Travões",
    desc: "Substituição de pastilhas e discos com peças originais e garantia.",
    images: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&q=80&w=800"
    ],
    icon: <ShieldCheck />,
  },
  {
    id: 4,
    categoria: "eletrica",
    name: "Baterias",
    desc: "Diagnóstico eletrónico e substituição imediata de baterias.",
    images: [
      "https://images.unsplash.com/photo-1621360156942-8c105ab8c237?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&q=80&w=800"
    ],
    icon: <Battery />,
  },
  {
    id: 5,
    categoria: "mecanica",
    name: "Climatização (AC)",
    desc: "Carregamento de gás, higienização e reparação de compressores.",
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800"
    ],
    icon: <Thermometer />,
  },
  {
    id: 6,
    categoria: "mecanica",
    name: "Transmissão",
    desc: "Reparação de caixas manuais e automáticas, substituição de embraiagem.",
    images: [
      "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1503376713356-78e78fc6477f?auto=format&fit=crop&q=80&w=800"
    ],
    icon: <Cog />,
  }
];

function ImageGallery({ images: initialImages, serviceId }: { images: string[], serviceId: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % initialImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + initialImages.length) % initialImages.length);
  };
  
  const localImage = `/assets/servico-${serviceId}.jpg`;

  return (
    <div className="h-40 sm:h-48 w-full relative group z-0">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={localImage}
          onError={(e) => {
             if (!e.currentTarget.src.includes('unsplash')) {
                e.currentTarget.src = initialImages[currentIndex];
             }
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500"
          alt="Serviço Auto"
          loading="lazy"
          decoding="async"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
      
      {initialImages.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={prevImage} className="p-1.5 rounded-full bg-zinc-950/80 text-white hover:bg-blue-600 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={nextImage} className="p-1.5 rounded-full bg-zinc-950/80 text-white hover:bg-blue-600 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {/* Pagination indicators */}
      {initialImages.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {initialImages.map((_, idx) => (
            <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-4 bg-blue-500' : 'w-1.5 bg-zinc-500/80'}`}></div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ServicesList() {
  const [filtro, setFiltro] = useState("todas");

  const servicosFiltrados = filtro === "todas" 
    ? SERVICOS 
    : SERVICOS.filter(s => s.categoria === filtro);

  return (
    <motion.section 
      id="servicos" 
      className="py-24 bg-zinc-950"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Oficina Completa, <span className="text-blue-500">Multimarca.</span></h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Equipamentos de última geração e técnicos certificados para qualquer intervenção no seu veículo, independentemente da marca ou modelo.</p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {CATEGORIAS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFiltro(cat.id)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all ${filtro === cat.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grelha de Serviços */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {servicosFiltrados.map((servico) => (
              <motion.div
                key={servico.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-blue-500/50 transition-colors overflow-hidden group flex flex-col"
              >
                <div className="relative z-0">
                  <ImageGallery images={servico.images} serviceId={servico.id} />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-blue-600 border border-blue-400 text-white flex items-center justify-center shadow-lg z-10">
                    <div className="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">{servico.icon}</div>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="text-xl font-bold text-white mb-3">{servico.name}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed flex-1">{servico.desc}</p>
                  
                  <button onClick={() => document.getElementById('agendamento')?.scrollIntoView({behavior: 'smooth'})} className="mt-6 w-full py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-medium hover:bg-blue-600 hover:border-blue-500 transition-all text-sm flex items-center justify-center gap-2">
                    Agendar Serviço <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
