function isAuthenticated(req, res, next) {
  if (req.session && req.session.authenticate === true) {
    // O usuário está autenticado, continue para a próxima rota
    return next();
  } else {
    // O usuário não está autenticado, redirecione para a página de login ou envie uma resposta de erro
    res.redirect('/login'); // ou res.status(401).send('Não autorizado');
  }
}

module.exports = isAuthenticated;