import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function LocationMap() {
  return (
    <section id="localizacao" className="py-20 bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Visite a Nossa <span className="text-blue-500">Oficina</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Estamos localizados num ponto central e de fácil acesso. Venha visitar-nos e traga o seu veículo para um check-up.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Info Column */}
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">Informações de Contacto</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-white font-medium text-lg">Morada</p>
                  <p className="text-zinc-400">Av. da República 1234, <br/>1050-000 Lisboa, Portugal</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-white font-medium text-lg">Telefone</p>
                  <p className="text-zinc-400">+351 210 000 000</p>
                  <p className="text-sm text-zinc-500">Chamada para a rede fixa nacional</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-white font-medium text-lg">Email</p>
                  <p className="text-zinc-400">geral@autoequip.pt</p>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Horário de Funcionamento
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-zinc-300">
                  <span>Segunda a Sexta</span>
                  <span className="font-medium text-white">08:30 - 18:30</span>
                </li>
                <li className="flex justify-between items-center text-zinc-300">
                  <span>Sábado</span>
                  <span className="font-medium text-white">09:00 - 13:00</span>
                </li>
                <li className="flex justify-between items-center text-zinc-300">
                  <span>Domingo e Feriados</span>
                  <span className="font-medium text-red-400">Encerrado</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Map Column */}
          <div className="h-full min-h-[400px] lg:min-h-full rounded-2xl overflow-hidden border border-zinc-800 relative bg-zinc-900 shadow-xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.5699479421255!2d-9.148107284654522!3d38.74092797959508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1933a2908f5d07%3A0xc3b448f2195dfb4!2sAv.%20da%20Rep%C3%BAblica%2C%20Lisboa!5e0!3m2!1spt-PT!2spt!4v1620000000000!5m2!1spt-PT!2spt" 
              width="100%" 
              height="100%" 
              style={{ border: 0, position: "absolute", top: 0, left: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Oficina"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
