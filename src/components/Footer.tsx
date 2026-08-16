import { Wrench, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-white font-black text-lg tracking-tight">AUTO<span className="text-blue-500">EQUIP</span></span>
            </div>
            <p className="text-zinc-500 text-sm mb-6">
              A rede de oficinas automóvel de confiança, pautada pela excelência e qualidade no serviço.
            </p>
            <div className="flex gap-4 text-zinc-400">
              <a href="#" className="hover:text-blue-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Serviços</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Revisão Oficial</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Mudança de Óleo</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Pneus e Alinhamento</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Baterias e Diagnóstico</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Sobre Nós</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-blue-500 transition-colors">A Nossa Garantia</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">A Nossa História</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Localizador de Oficinas</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Carreiras</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contactos</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>Apoio Cliente: 800 200 300</li>
              <li>WhatsApp: +351 912 345 678</li>
              <li>Email: info@autoequip.pt</li>
              <li className="pt-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-blue-500 text-xs font-bold uppercase">
                  Oficinas Abertas
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Autoequip. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Serviço</a>
            <a href="#" className="hover:text-white transition-colors">Livro de Reclamações Online</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
