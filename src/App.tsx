import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { RepairTracker } from "./components/RepairTracker";
import { ServicesList } from "./components/ServicesList";
import { AgendaDigital } from "./components/AgendaDigital";
import { GuiaServicos } from "./components/GuiaServicos";
import { HistoricoClinico } from "./components/HistoricoClinico";
import { TrustSection } from "./components/TrustSection";
import { LocationMap } from "./components/LocationMap";
import { ChatSuporte } from "./components/ChatSuporte";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-blue-500 selection:text-white">
      <Header />
      <main>
        <Hero />
        <RepairTracker />
        <AgendaDigital />
        <ServicesList />
        <GuiaServicos />
        <HistoricoClinico />
        <TrustSection />
        <LocationMap />
      </main>
      <Footer />
      <ChatSuporte />
    </div>
  );
}
