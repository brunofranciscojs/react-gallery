// supabase/functions/convert-to-avif/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import sharp from "npm:sharp";

serve(async (req) => {
  // 🔹 Tratar pré-flight CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  // 🔹 Apenas POST é permitido
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // Pega arquivo do corpo da requisição
    const fileBuffer = await req.arrayBuffer();

    // Converte para AVIF
    const avifBuffer = await sharp(Buffer.from(fileBuffer))
      .toFormat("avif", { quality: 70 })
      .toBuffer();

    // Retorna AVIF com CORS
    return new Response(avifBuffer, {
      headers: {
        "Content-Type": "image/avif",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response("Erro: " + err.message, { status: 500 });
  }
});
