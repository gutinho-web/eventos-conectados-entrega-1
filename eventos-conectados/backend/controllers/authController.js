const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../database/conexao');

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function cadastro(req, res) {
  try {
    const nome = String(req.body.nome || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const senha = String(req.body.senha || '');
    const perfilSolicitado = String(req.body.perfil || 'participante').trim();

    if (nome.length < 2 || nome.length > 100) {
      return res.status(400).json({ erro: 'Informe um nome entre 2 e 100 caracteres.' });
    }
    if (!EMAIL_VALIDO.test(email) || email.length > 150) {
      return res.status(400).json({ erro: 'Informe um e-mail válido.' });
    }
    if (senha.length < 8 || senha.length > 72) {
      return res.status(400).json({ erro: 'A senha deve ter entre 8 e 72 caracteres.' });
    }
    if (!['participante', 'organizador'].includes(perfilSolicitado)) {
      return res.status(400).json({ erro: 'Perfil inválido. O cadastro público aceita participante ou organizador.' });
    }

    const [existentes] = await pool.execute(
      'SELECT id FROM usuarios WHERE email = ? LIMIT 1',
      [email]
    );
    if (existentes.length) {
      return res.status(409).json({ erro: 'Este e-mail já está cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 12);
    const [resultado] = await pool.execute(
      'INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES (?, ?, ?, ?)',
      [nome, email, senhaHash, perfilSolicitado]
    );

    return res.status(201).json({
      mensagem: 'Cadastro realizado com sucesso.',
      usuario: { id: resultado.insertId, nome, email, perfil: perfilSolicitado }
    });
  } catch (erro) {
    console.error('Erro no cadastro:', erro.message);
    return res.status(500).json({ erro: 'Não foi possível concluir o cadastro.' });
  }
}

async function login(req, res) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const senha = String(req.body.senha || '');

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Informe e-mail e senha.' });
    }

    const [usuarios] = await pool.execute(
      'SELECT id, nome, email, senha_hash, perfil, ativo FROM usuarios WHERE email = ? LIMIT 1',
      [email]
    );
    const usuario = usuarios[0];

    if (!usuario || !usuario.ativo || !(await bcrypt.compare(senha, usuario.senha_hash))) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      console.error('JWT_SECRET ausente ou muito curta.');
      return res.status(500).json({ erro: 'A configuração de autenticação está incompleta.' });
    }

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, perfil: usuario.perfil },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
    );

    return res.json({
      mensagem: 'Login realizado com sucesso.',
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil }
    });
  } catch (erro) {
    console.error('Erro no login:', erro.message);
    return res.status(500).json({ erro: 'Não foi possível realizar o login.' });
  }
}

async function me(req, res) {
  try {
    const [usuarios] = await pool.execute(
      'SELECT id, nome, email, perfil FROM usuarios WHERE id = ? AND ativo = TRUE LIMIT 1',
      [req.usuario.id]
    );
    if (!usuarios.length) {
      return res.status(404).json({ erro: 'Usuário não encontrado ou inativo.' });
    }
    return res.json({ usuario: usuarios[0] });
  } catch (erro) {
    console.error('Erro ao consultar usuário:', erro.message);
    return res.status(500).json({ erro: 'Não foi possível consultar o usuário.' });
  }
}

module.exports = { cadastro, login, me };
