import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, User, Wrench, Calendar, Phone } from "lucide-react";

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
  isActionable?: boolean;
};

export function ChatSuporte() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Olá! 👋 Sou a Joana, Consultora Técnica da Autoequip. Em que posso ajudar? Descreva um sintoma do carro ou pergunte-me sobre os nossos serviços e agendamentos.",
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    const currentHistory = messages.map(m => ({ sender: m.sender, text: m.text }));
    setMessages(prev => [...prev, { id: Date.now(), sender: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: currentHistory })
      });
      
      setIsTyping(false);

      if (!response.body) throw new Error("Sem resposta do servidor");
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      const botMessageId = Date.now();
      let accumulatedText = "";

      setMessages(prev => [...prev, { id: botMessageId, sender: "bot", text: "", isActionable: false }]);

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          setMessages(prev => prev.map(m => m.id === botMessageId ? { ...m, isActionable: true } : m));
          break;
        }
        
        accumulatedText += decoder.decode(value, { stream: true });
        
        setMessages(prev => prev.map(m => 
          m.id === botMessageId ? { ...m, text: accumulatedText } : m
        ));
      }
    } catch (error) {
      console.error(error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        sender: "bot", 
        text: 'Não consegui ligar-me ao sistema agora. Pode tentar novamente em segundos?',
        isActionable: true
      }]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform z-50 shadow-blue-500/30"
          >
            <MessageSquare className="w-8 h-8" />
            <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-zinc-950 animate-pulse"></div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[85vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex items-center justify-between relative overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-20 mix-blend-luminosity pointer-events-none" style={{ maskImage: 'linear-gradient(to right, transparent, black)' }} alt="Consultor" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center overflow-hidden border border-blue-500/30 shadow-inner">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" alt="Consultora Joana" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">Joana (IA Gemini)</h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span> Conectada
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors relative z-10 bg-zinc-900 p-1.5 rounded-lg hover:bg-zinc-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-hide bg-zinc-950/30">
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-3 ${m.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden shadow-sm ${m.sender === "user" ? "bg-zinc-800 border border-zinc-700" : "bg-blue-600/20 text-blue-500 border border-blue-500/30"}`}>
                    {m.sender === "user" ? <User className="w-4 h-4 text-zinc-300" /> : <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" alt="Joana" className="w-full h-full object-cover" />}
                  </div>
                  <div className={`p-3.5 rounded-2xl max-w-[85%] text-[13px] leading-relaxed shadow-sm ${m.sender === "user" ? "bg-blue-600 text-white rounded-tr-sm" : "bg-zinc-800 border border-zinc-700/50 text-zinc-200 rounded-tl-sm"} whitespace-pre-wrap`}>
                    {m.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-blue-600/20 border border-blue-500/30">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" alt="Joana" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-800 border border-zinc-700/50 rounded-tl-sm flex items-center gap-1.5">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                  </div>
                </div>
              )}

              {messages[messages.length - 1]?.isActionable && !isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2 pl-11 pr-4 pt-1">
                  <button onClick={() => { setIsOpen(false); document.getElementById('agendamento')?.scrollIntoView({behavior: 'smooth'}) }} className="text-left text-xs bg-zinc-900 border border-zinc-700/80 hover:border-blue-500 hover:text-blue-400 text-zinc-300 py-2.5 px-3 rounded-xl transition-all shadow-sm flex items-center gap-2 group">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-500 transition-colors" /> Ir para a Agenda Online
                  </button>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 bg-zinc-950 border-t border-zinc-800 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.5)] z-10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Escreva a sua dúvida..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-3 pl-4 pr-12 text-[13px] text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-transparent flex items-center justify-center text-white disabled:text-zinc-600 transition-all"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
