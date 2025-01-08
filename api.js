// Importando os módulos
import express from 'express';
import axios from 'axios';

// Criando a aplicação Express
const app = express();

// Configurando CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permite acesso de todos os domínios
  next();
});

// Definindo a rota para buscar os blobs
app.get('/getBlob', async (req, res) => {
  try {
    // Fazendo uma requisição GET para a URL do Vercel Blob
    const response = await axios.get('https://vjjm30byfc5nljjh.public.blob.vercel-storage.com/China/');
    
    // Enviando a resposta dos blobs
    res.send(response.data);
  } catch (error) {
    // Tratando erro de requisição
    res.status(500).send('Erro ao acessar o Blob');
  }
});

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});
