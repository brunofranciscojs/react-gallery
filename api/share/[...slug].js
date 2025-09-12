import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://utyaegtlratnhymumqjm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0eWFlZ3RscmF0bmh5bXVtcWptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNTU5MDUsImV4cCI6MjA1ODkzMTkwNX0.B2-GTy9rJPgGTmDeB70CwfzbbTTdocp-1QzRaMNDntQ'; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
 const host = req.headers.host;
 const slugify = (text) =>{
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
}
  const slug = req.query.slug; 
  if (!slug || slug.length < 2) return res.status(404).send('Rota inválida');

  const categoria = slug[0];
  const nomeBase64 = slug[1];
  const nomeDaImagem = btoa(nomeBase64);

  const { data, error } = await supabase
    .from('imagens')
    .select('id, nome, url, categoria')
    .eq('nome', nomeDaImagem)
    .eq('categoria', categoria)
    .single();

  if (error || !data) {
    res.status(404).send('Imagem não encontrada');
    return;
  }

res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8" />
    <title>${data.nome}</title>

    <!-- Open Graph -->
    <meta property="og:title" content="${data.nome}" />
    <meta property="og:description" content="Confira esta imagem incrível da categoria ${data.categoria}!" />
    <meta property="og:image" content="${data.url}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://${host}/${slugify(data.categoria)}/${nomeBase64}" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${data.nome}" />
    <meta name="twitter:image" content="${data.url}" />

    <!-- Redirecionamento para SPA -->
    <meta http-equiv="refresh" content="0; url=/galeria/${data.categoria}/${nomeBase64}" />
  </head>
  <body>
    <p>Redirecionando para a página da galeria...</p>
    <p><a href="/galeria/${data.categoria}/${nomeBase64}">Clique aqui se não redirecionar automaticamente</a></p>
  </body>
</html>`);
}