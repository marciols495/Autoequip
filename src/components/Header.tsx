import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Wrench, MapPin, Phone, Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SearchModal } from "./SearchModal";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Serviços", href: "#servicos" },
    { name: "Agendar", href: "#agendamento" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:flex bg-zinc-950 text-zinc-400 text-xs py-2 px-4 justify-between items-center border-b border-zinc-900">
        <div className="container mx-auto flex justify-between items-center max-w-6xl">
           <div className="flex items-center gap-6">
             <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><MapPin className="w-3 h-3" /> Encontrar Oficina</span>
             <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><Phone className="w-3 h-3" /> 800 200 300 (Linha Direta)</span>
           </div>
           <div>Aberto Seg-Sáb das 08:30 às 19:00</div>
        </div>
      </div>

      <header className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 z-50 relative shrink-0">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
                <Wrench className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <span className="text-white font-black text-lg md:text-xl tracking-tight">AUTO<span className="text-blue-500">EQUIP</span></span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.name} href={l.href} className="text-sm font-bold text-zinc-300 hover:text-blue-500 transition-colors uppercase tracking-wide">
                {l.name}
              </a>
            ))}
            <button className="text-zinc-300 hover:text-blue-500 transition-colors" aria-label="Pesquisar" onClick={() => setSearchOpen(true)}>
              <Search className="w-5 h-5" />
            </button>
            <Button size="sm" onClick={() => document.getElementById('agendamento')?.scrollIntoView({behavior: 'smooth'})}>Marcar Visita</Button>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4 md:hidden z-50">
            <button className="text-zinc-300 hover:text-blue-500 transition-colors p-1" aria-label="Pesquisar" onClick={() => setSearchOpen(true)}>
              <Search className="w-6 h-6" />
            </button>
            <button className="text-white relative p-1 -mr-1" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-zinc-950 pt-24 px-4 pb-6 flex flex-col md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center mt-10">
              {links.map((l) => (
                <a key={l.name} href={l.href} onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-zinc-300 hover:text-blue-500">
                  {l.name}
                </a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <Button size="lg" className="w-full" onClick={() => { setMobileOpen(false); document.getElementById('agendamento')?.scrollIntoView({behavior: 'smooth'})}}>Marcar Visita</Button>
              <Button size="lg" variant="outline" className="w-full gap-2"><Phone className="w-5 h-5"/> Ligar Agora</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
