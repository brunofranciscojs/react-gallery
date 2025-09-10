import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_ENDPOINT;
const supabaseKey = process.env.VITE_API_KEY; // ⚠️ use variáveis no Vercel, não hardcode
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { imageId } = req.query;

  // busca no Supabase
  const { data, error } = await supabase
    .from('imagens')
    .select('id, nome, url, categoria')
    .eq('id', imageId)
    .single();

  if (error || !data) {
    res.status(404).send('Imagem não encontrada');
    return;
  }

  const imageData = {
    id: data.id,
    nome: data.nome,
    url: data.url,
    categoria: data.categoria,
  };

  res.setHeader("Content-Type", "text/html");

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
      <head>
        <meta charset="utf-8" />
        <title>${imageData.nome}</title>

        <!-- Open Graph -->
        <meta property="og:title" content="${imageData.nome}" />
        <meta property="og:description" content="Confira esta imagem incrível da categoria ${imageData.categoria}!" />
        <meta property="og:image" content="${imageData.url}" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://${req.headers.host}/api/share/${imageId}" />

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${imageData.nome}" />
        <meta name="twitter:image" content="${imageData.url}" />

        <!-- Reddit / WhatsApp usam os OG acima -->
      </head>
      <body>
        <script>
          // redireciona para a página real da galeria
          window.location.href = "/galeria/${imageId}";
        </script>
      </body>
    </html>
  `);
}
