const API_URL = 'http://localhost:3000/api';
const mensagem = document.querySelector('#mensagem');

function mostrarMensagem(texto) {
  mensagem.textContent = texto;
}

async function enviarFormulario(url, dados) {
  const resposta = await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  const resultado = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new Error(resultado.erro || 'Não foi possível concluir a operação.');
  return resultado;
}

document.querySelector('#form-cadastro').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const form = new FormData(evento.currentTarget);
  const dados = Object.fromEntries(form.entries());

  try {
    const resultado = await enviarFormulario('/auth/cadastro', dados);
    mostrarMensagem(resultado.mensagem || 'Cadastro concluído.');
    evento.currentTarget.reset();
  } catch (erro) {
    mostrarMensagem(erro.message);
  }
});

document.querySelector('#form-login').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const form = new FormData(evento.currentTarget);
  const dados = Object.fromEntries(form.entries());

  try {
    const resultado = await enviarFormulario('/auth/login', dados);
    // Apenas para demonstração local da etapa. Evite guardar tokens sensíveis
    // em localStorage em aplicações de produção sem uma análise de segurança.
    sessionStorage.setItem('eventosToken', resultado.token);
    mostrarMensagem(`Bem-vindo(a), ${resultado.usuario.nome}! Perfil: ${resultado.usuario.perfil}. Token guardado nesta sessão.`);
    evento.currentTarget.reset();
  } catch (erro) {
    mostrarMensagem(erro.message);
  }
});

document.querySelector('#btn-perfil').addEventListener('click', async () => {
  const token = sessionStorage.getItem('eventosToken');
  if (!token) {
    mostrarMensagem('Faça login antes de consultar sua conta.');
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const resultado = await resposta.json();
    if (!resposta.ok) throw new Error(resultado.erro || 'Não foi possível consultar a conta.');
    mostrarMensagem(`Conta: ${resultado.usuario.nome} | ${resultado.usuario.email} | Perfil: ${resultado.usuario.perfil}`);
  } catch (erro) {
    mostrarMensagem(erro.message);
  }
});

document.querySelector('#btn-sair').addEventListener('click', () => {
  sessionStorage.removeItem('eventosToken');
  mostrarMensagem('Você saiu da sessão local.');
});
