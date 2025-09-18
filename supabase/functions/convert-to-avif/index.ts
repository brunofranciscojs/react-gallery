// supabase/functions/convert-to-avif/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import sharp from "npm:sharp";

serve(async (req) => {
  try {
    const fileBuffer = await req.arrayBuffer();

    const avifBuffer = await sharp(Buffer.from(fileBuffer))
      .toFormat("avif", { quality: 70 })
      .toBuffer();

    return new Response(avifBuffer, {
      headers: { "Content-Type": "image/avif" },
    });
  } catch (err) {
    return new Response("Erro: " + err.message, { status: 500 });
  }
});
