import { Wind, Settings, CircleDashed, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

export function GuiaServicos() {
  const conteudos = [
    {
      id: "ac",
      icon: Wind,
      titulo: "Sistema de Climatização (A/C)",
      texto1: "Sente um odor desagradável ao ligar a ventilação ou o seu carro demora uma eternidade a refrescar o habitáculo nos dias quentes? Um aumento repentino no consumo de combustível com o A/C ligado também é um forte indicador de que o sistema está em esforço e a perder eficiência.",
      texto2: "Na AutoEquip, realizamos um ",
      destaque: "diagnóstico rigoroso ao circuito de refrigeração",
      texto3: ", detetamos micro-fugas, substituímos filtros de habitáculo e garantimos a higienização completa para que respire ar puro e viaje com o máximo conforto."
    },
    {
      id: "correia",
      icon: Settings,
      titulo: "Correia de Distribuição",
      texto1: "Esta é, indiscutivelmente, a peça mais crítica do seu motor. Ao contrário de outras avarias, a correia raramente dá avisos antes de ceder, mas se notar um ruído metálico contínuo ou um ralenti invulgarmente instável, pode estar perante um alerta vermelho. A sua quebra em andamento resulta em danos catastróficos e reparações caríssimas.",
      texto2: "Não arrisque. Confie nos nossos técnicos para uma ",
      destaque: "substituição preventiva com kits originais",
      texto3: ", respeitando sempre os intervalos de quilometragem e idade recomendados pela marca do seu veículo."
    },
    {
      id: "embraiagem",
      icon: CircleDashed,
      titulo: "Embraiagem e Caixa de Velocidades",
      texto1: "Tem dificuldade em engrenar as mudanças, sente o pedal invulgarmente duro, ou nota que o motor 'grita' mas o carro não desenvolve velocidade (a chamada embraiagem a patinar)? Estes são sintomas clássicos de desgaste acentuado no disco e nos componentes de fricção.",
      texto2: "Forçar a condução nestas condições pode danificar permanentemente a caixa de velocidades. Procedemos à ",
      destaque: "substituição integral do kit de embraiagem e bimassa",
      texto3: " para devolver a resposta rápida e a suavidade absoluta à sua condução."
    },
    {
      id: "travoes",
      icon: ShieldAlert,
      titulo: "Sistema de Travagem",
      texto1: "Ouvir um chiar agudo ao pisar o travão, sentir o pedal demasiado 'esponjoso' ou notar que o carro foge ligeiramente para um dos lados durante uma travagem são sinais evidentes de que a sua segurança está seriamente comprometida na estrada.",
      texto2: "Não facilite quando se trata de parar a tempo. Na nossa oficina, avaliamos detalhadamente o desgaste de ",
      destaque: "pastilhas, discos e tubagens",
      texto3: ", substituindo o fluido dos travões com equipamentos de sangramento de última geração."
    }
  ];

  return (
    <section className="py-24 bg-zinc-950 relative border-t border-zinc-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Sinais de <span className="text-blue-500">Alerta</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Aprenda a identificar os sintomas antes que uma pequena anomalia se transforme numa reparação dispendiosa. O seu carro fala consigo.
          </p>
        </div>

        <div className="space-y-16">
          {conteudos.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-6 md:pl-10 border-l-4 border-blue-600/50 hover:border-blue-500 transition-colors"
              >
                <div className="absolute -left-[26px] md:-left-[30px] top-0 bg-zinc-950 border-4 border-zinc-950 rounded-full">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 pt-1 md:pt-2">
                  {item.titulo}
                </h3>
                
                <div className="space-y-4 text-zinc-300 md:text-lg leading-relaxed font-light">
                  <p>{item.texto1}</p>
                  <p>
                    {item.texto2}
                    <strong className="text-blue-400 font-semibold">{item.destaque}</strong>
                    {item.texto3}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
