// Ponto de partida do back-end. A API será implementada nas próximas entregas.
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ mensagem: 'API Eventos Conectados iniciada.' });
});

// As rotas de autenticação e eventos serão conectadas nas próximas entregas.

app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
