import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

export function render(url, data) {
  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App initialData={data} />
    </StaticRouter>
  );

  // Gera HTML completo com meta tags OG
  return `
    <!DOCTYPE html>
    <html lang="pt-br">
      <head>
        <meta charset="utf-8"/>
        <title>${data.nome}</title>
        <meta property="og:title" content="${data.nome}" />
        <meta property="og:description" content="Categoria ${data.categoria}" />
        <meta property="og:image" content="${data.url}" />
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script type="module" src="/client.jsx"></script>
      </body>
    </html>
  `;
}
