import { useState } from "react";
import { Button } from "./ui/button";
import { Clock, MapPin, Truck } from "lucide-react";
import { motion } from "motion/react";

export function AgendaDigital() {
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
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center uppercase tracking-tight">
              Contacte-nos e marque a <span className="text-blue-500">sua revisão</span>
            </h3>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleAgendar(); }}>
              {/* Dados do Veículo */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide border-b border-zinc-800 pb-2">Dados do Veículo</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Matrícula*</label>
                    <input required type="text" placeholder="Insira aqui a matrícula" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all uppercase" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Marca*</label>
                    <input required type="text" placeholder="Insira aqui a marca" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all capitalize" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Modelo</label>
                    <input type="text" placeholder="Insira aqui o modelo" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all capitalize" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Quilometragem*</label>
                    <input required type="text" placeholder="Quantos km tem?" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                  </div>
                </div>
              </div>

              {/* Indicação das falhas */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide border-b border-zinc-800 pb-2">Indicação das Falhas</h4>
                <div>
                  <textarea placeholder="Descreva aqui as falhas ou avarias do seu veículo..." rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"></textarea>
                </div>
              </div>

              {/* Dados Pessoais */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide border-b border-zinc-800 pb-2">Dados Pessoais</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Nome*</label>
                    <input required type="text" placeholder="O seu nome" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">E-Mail</label>
                    <input type="email" placeholder="O seu e-mail" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Telefone*</label>
                    <input required type="tel" placeholder="O seu telefone" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Contribuinte</label>
                    <input type="text" placeholder="O seu número de contribuinte" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-zinc-500 text-right">*Campos obrigatórios</div>

              <div className="pt-2 space-y-3">
                <Button type="submit" size="lg" className="w-full text-lg h-14 font-bold tracking-wide" disabled={agendado}>
                  {agendado ? "ENVIADO COM SUCESSO! 🎉" : "ENVIAR"}
                </Button>
                
                <a href="tel:+244936963877" className="w-full h-14 flex items-center justify-center bg-zinc-950 hover:bg-zinc-800 text-white border border-zinc-800 rounded-xl font-bold transition-colors text-lg tracking-wide">
                  +244 936 963 877
                </a>
                
                <a href="mailto:geral@lidermobile.com" className="w-full h-14 flex items-center justify-center bg-zinc-950 hover:bg-zinc-800 text-white border border-zinc-800 rounded-xl font-bold transition-colors text-lg tracking-wide">
                  geral@lidermobile.com
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
