const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  const cabecalho = req.headers.authorization;

  if (!cabecalho || !cabecalho.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token de acesso não informado.' });
  }

  const token = cabecalho.slice(7);

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}

module.exports = autenticar;
