import http from 'http';
import url, { URLSearchParams } from 'url';

const servidorHost = 'localhost';
const servidorPorta = 3000;

function responderRequisicao(requisicao, resposta) {
  if (requisicao.method === 'GET') {
    const parametros = new URLSearchParams(url.parse(requisicao.url).query);
    const numeroTabuada = parametros.get('tabuada');
    const limiteSequencia = parametros.get('sequencia') || 10;

    resposta.setHeader('Content-Type', 'text/html');
    resposta.write('<!DOCTYPE html>');
    resposta.write('<html lang="pt-br">');
    resposta.write('<head>');
    resposta.write('<meta charset="UTF-8">');
    resposta.write('<title>Calculadora de Tabuada</title>');
    resposta.write(`
      <style>
        body {
          background-color: #f9f9f9;
          color: #333;
          font-family: 'Arial', sans-serif;
          display: flex;
          justify-content: center;
          align-items: flex-start; /* Alinhamento alterado para permitir scroll */
          height: 100vh;
          margin: 0;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 40px;
          width: 400px;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
          text-align: center;
          overflow-y: auto; /* Permite rolagem vertical dentro do contêiner */
          max-height: 80vh; /* Limita a altura do contêiner */
        }
        h1 {
          font-size: 28px;
          margin-bottom: 20px;
          color: #444;
        }
        p {
          font-size: 20px;
          margin: 10px 0;
          color: #666;
        }
        .footer {
          margin-top: 20px;
          font-size: 14px;
          color: #aaa;
        }
      </style>
    `);
    resposta.write('</head>');
    resposta.write('<body>');

    if (numeroTabuada != null) {
      resposta.write('<div class="container">');
      resposta.write(`<h1>Tabuada do ${numeroTabuada} até ${limiteSequencia}</h1>`);
      
      for (let i = 0; i <= limiteSequencia; i++) {
        const resultado = numeroTabuada * i;
        resposta.write(`<p>${numeroTabuada} x ${i} = ${resultado}</p>`);
      }
      resposta.write('</div>');
    } else {
      resposta.write('<div class="container">');
      resposta.write("<h1>Por favor, digite na URL:</h1>");
      resposta.write("<p>localhost:3000/?tabuada=um_numero&sequencia=um_numero</p>");
      resposta.write('</div>');
    }

    resposta.write('</body>');
    resposta.write('</html>');
    resposta.end();
  }
}

const servidor = http.createServer(responderRequisicao);

servidor.listen(servidorPorta, servidorHost, () => {
  console.log('Servidor em execução!!');
});
