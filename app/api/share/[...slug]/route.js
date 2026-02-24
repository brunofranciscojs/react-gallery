import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://utyaegtlratnhymumqjm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0eWFlZ3RscmF0bmh5bXVtcWptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNTU5MDUsImV4cCI6MjA1ODkzMTkwNX0.B2-GTy9rJPgGTmDeB70CwfzbbTTdocp-1QzRaMNDntQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request, { params }) {
    const { slug } = await params;
    const host = request.headers.get('host');

    const slugify = (text) => {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");
    }

    if (!slug || slug.length < 2) {
        return new Response('Rota inválida', { status: 404 });
    }

    const categoria = slug[0];
    const nomeBase64 = slug[1];
    const nomeDaImagem = atob(nomeBase64);

    const extRm = (string) => string.replace('.webp', '').replace('.avif', '').replace('.jpg', '').replace('.png', '')

    const { data, error } = await supabase
        .from('imagens')
        .select('id, nome, url, categoria')
        .eq('nome', nomeDaImagem)
        .eq('categoria', categoria)
        .single();

    if (error || !data) {
        return new Response('Imagem não encontrada', { status: 404 });
    }

    const html = `<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8" />
    <title>${extRm(data.nome)} - Ilustras Bruno</title>

    <!-- Open Graph -->
    <meta property="og:title" content="${extRm(data.nome)} - Ilustras Bruno" />
    <meta property="og:description" content="Confira esta imagem incrível da categoria ${data.categoria}!" />
    <meta property="og:image" content="${data.url}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://${host}/api/share/${categoria}/${nomeBase64}" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${extRm(data.nome)} - Ilustras Bruno" />
    <meta name="twitter:image" content="${data.url}" />

    <!-- Redirecionamento para SPA -->
    <meta http-equiv="refresh" content="0; url=/${slugify(data.categoria)}/${data.id}" />
  </head>
  <body>
    <p>Redirecionando para a página da galeria...</p>
    <p><a href="/${slugify(data.categoria)}/${data.id}">Clique aqui se não redirecionar automaticamente</a></p>
  </body>
</html>`;

    return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
}
