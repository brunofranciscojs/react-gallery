import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = 'https://utyaegtlratnhymumqjm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0eWFlZ3RscmF0bmh5bXVtcWptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNTU5MDUsImV4cCI6MjA1ODkzMTkwNX0.B2-GTy9rJPgGTmDeB70CwfzbbTTdocp-1QzRaMNDntQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request, { params }) {
    const { imageId } = await params;
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

    const { data, error } = await supabase
        .from('imagens')
        .select('id, nome, url, categoria')
        .eq('id', imageId)
        .single();

    if (error || !data) {
        return new Response('Imagem não encontrada', { status: 404 });
    }

    const imageData = {
        id: data.id,
        nome: btoa(data.nome),
        url: data.url,
        categoria: slugify(data.categoria),
    };

    const html = `<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8" />
    <title>${imageData.nome}</title>

    <!-- Open Graph -->
    <meta property="og:title" content="${imageData.nome}" />
    <meta property="og:description" content="Confira esta imagem incrível da categoria ${imageData.categoria}!" />
    <meta property="og:image" content="${imageData.url}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://${host}/api/share/${imageData.nome}" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${imageData.nome}" />
    <meta name="twitter:image" content="${imageData.url}" />

    <!-- Meta refresh para redirecionar a página -->
    <meta http-equiv="refresh" content="0; url=/${imageData.categoria}/${imageData.nome}" />
  </head>
  <body>
    <p>Redirecionando para a página da imagem...</p>
    <p><a href="/${imageData.categoria}/${imageData.id}">Clique aqui se não redirecionar automaticamente</a></p>
  </body>
</html>`;

    return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
}
