function permitirPerfis(...perfisPermitidos) {
  return (req, res, next) => {
    if (!req.usuario || !perfisPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({ erro: 'Você não tem permissão para realizar esta ação.' });
    }

    next();
  };
}

module.exports = permitirPerfis;
