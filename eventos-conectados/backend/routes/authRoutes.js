const express = require('express');
const { cadastro, login, me } = require('../controllers/authController');
const autenticar = require('../middlewares/autenticacaoMiddleware');

const router = express.Router();

router.post('/cadastro', cadastro);
router.post('/login', login);
router.get('/me', autenticar, me);

module.exports = router;
