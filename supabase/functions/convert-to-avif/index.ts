// supabase/functions/convert-to-avif/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import sharp from "npm:sharp";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const fileBuffer = await req.arrayBuffer();

    const avifBuffer = await sharp(Buffer.from(fileBuffer))
      .toFormat("avif", { quality: 60 })
      .toBuffer();

    return new Response(avifBuffer, {
      headers: { "Content-Type": "image/avif" },
    });
  } catch (err) {
    return new Response("Erro: " + err.message, { status: 500 });
  }
});
