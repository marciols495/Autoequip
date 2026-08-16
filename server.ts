import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

async function createServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || 'fake-key',
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
  });

  app.post('/api/upload', (req, res) => {
    try {
      const { filename, imageBase64 } = req.body;
      if (!filename || !imageBase64) throw new Error("Missing filename or image data");
      
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const assetsDir = path.join(process.cwd(), 'public', 'assets');
      
      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }
      
      const filePath = path.join(assetsDir, filename);
      fs.writeFileSync(filePath, base64Data, 'base64');
      
      res.json({ success: true, url: `/assets/${filename}` });
    } catch (e: any) {
      console.error("Upload error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const contents = history ? history.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })) : [];
      contents.push({ role: 'user', parts: [{ text: message }] });
      
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Transfer-Encoding', 'chunked');

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3.7-flash',
        config: {
          systemInstruction: "És a Joana, Consultora Técnica de uma oficina moderna (Autoequip). És super simpática, concisa e focada em ajudar. Ofereces informações sobre serviços, agendamentos, e o serviço Valet. Tens política de mostrar peças usadas e vídeo do problema. Encaminha clientes para a Agenda Digital do site sempre que fizer sentido. Responde de forma natural e empática.",
          temperature: 0.7,
        },
        contents: contents
      });
      
      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(chunk.text);
        }
      }
      res.end();
    } catch (e: any) {
      console.error(e);
      // Graceful fallback se ocorrer erro no início
      if (!res.headersSent) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      }
      if (e.message && e.message.includes("high demand") || (e.status === 503)) {
        res.write("Desculpe, neste momento estou a processar muitos pedidos. Por favor, tente novamente em alguns minutos ou use o nosso simulador de orçamentos e a agenda online.");
      } else {
        res.write("Não consegui ligar-me ao sistema agora. Pode tentar novamente em segundos?");
      }
      res.end();
    }
  });

  app.use('/assets', express.static(path.join(process.cwd(), 'public', 'assets')));
  
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  app.use(vite.middlewares);

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

createServer();
