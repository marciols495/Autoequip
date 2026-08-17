import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;
    
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || 'fake-key',
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });

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
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    }
    res.write("Desculpe, neste momento estou a processar muitos pedidos. Por favor, tente novamente em alguns minutos ou use a agenda online.");
    res.end();
  }
}
