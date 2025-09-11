import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_ENDPOINT;
const supabaseKey = process.env.VITE_API_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { imageId } = req.query;
  const slugify = (text) =>{
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");
    }
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
    nome: btoa(data.nome),
    url: data.url,
    categoria: slugify(data.categoria),
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

      <!-- Redirecionamento -->
      <meta http-equiv="refresh" content="0; url=/${imageData.categoria}/${imageId}" />
    </head>
    <body>
      <p>Redirecionando para a página...</p>
    </body>
  </html>
`);
}
