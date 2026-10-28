# Eventos Conectados

**Projeto Web Técnico | Entrega 1: Problema e estrutura inicial**

## 1. Descrição do projeto

O **Eventos Conectados** é um sistema web planejado para facilitar a organização e a divulgação de festas e eventos. A proposta é reunir em um único lugar informações como nome do evento, data, horário, local, descrição, atrações e situação das inscrições.

Nesta primeira entrega, o projeto apresenta o problema, a proposta de solução, os perfis de usuário, as funcionalidades previstas, o fluxo básico e a estrutura inicial de pastas. As funcionalidades serão implementadas progressivamente nas próximas entregas.

## 2. Problema identificado

Informações sobre festas e eventos costumam ficar espalhadas por redes sociais, cartazes, mensagens e publicações diferentes. Isso pode dificultar encontrar informações atualizadas, comparar eventos e manter os dados organizados para quem organiza as atividades.

Organizadores também podem ter dificuldade para atualizar informações e controlar os eventos em um só lugar.

### Público afetado
- Pessoas que procuram festas, shows e eventos culturais.
- Organizadores responsáveis por cadastrar e divulgar eventos.
- Administradores responsáveis por manter o sistema organizado.

### Justificativa
Uma plataforma centralizada pode facilitar o acesso às informações, reduzir a desorganização e tornar a divulgação e o gerenciamento dos eventos mais simples.

## 3. Proposta de solução

Desenvolver uma aplicação web na qual usuários possam consultar eventos publicados e organizadores possam cadastrar e manter os eventos sob sua responsabilidade. Um administrador terá permissões adicionais para moderar cadastros e gerenciar o conteúdo.

O sistema será desenvolvido com HTML, CSS e JavaScript no front-end e Node.js, Express e MySQL no back-end. A comunicação entre a interface e o servidor será feita por uma API REST. O acesso autenticado será controlado com JWT e permissões por perfil.

## 4. Objetivos

### Objetivo geral
Facilitar a divulgação e a organização de festas e eventos por meio de uma plataforma web centralizada.

### Objetivos específicos
- Centralizar informações importantes dos eventos.
- Permitir cadastro, consulta, edição e exclusão de eventos conforme as permissões.
- Oferecer cadastro e login de usuários.
- Diferenciar os acessos de visitante/participante, organizador e administrador.
- Armazenar usuários e eventos em um banco de dados relacional.
- Aplicar validações e regras de negócio no servidor.
- Manter o código organizado e documentado no GitHub.

## 5. Funcionalidades previstas

1. Criar conta e entrar no sistema.
2. Consultar a lista de eventos publicados.
3. Visualizar detalhes de um evento, incluindo data, horário, local e descrição.
4. Permitir que organizadores cadastrem eventos.
5. Permitir que organizadores editem ou excluam os próprios eventos, respeitando as regras do sistema.
6. Permitir que administradores consultem e moderem eventos e usuários.
7. Validar os dados enviados e apresentar mensagens de erro compreensíveis.
8. Proteger rotas da API com autenticação JWT e autorização por perfil.
9. Pesquisar ou filtrar eventos por data, nome ou categoria (funcionalidade planejada).
10. Registrar no banco de dados os usuários e eventos.

> **Escopo:** as funcionalidades acima são planejadas. A Entrega 1 estabelece a proposta e a estrutura; autenticação, banco de dados e CRUD serão desenvolvidos nas entregas seguintes.

## 6. Tipos de usuários e permissões previstas

| Perfil | Ações previstas |
|---|---|
| Visitante/participante | Consultar eventos publicados e visualizar seus detalhes. Poderá criar conta e entrar no sistema. |
| Organizador | Consultar eventos e cadastrar, editar ou excluir os próprios eventos. Não poderá administrar contas de outros usuários. |
| Administrador | Gerenciar usuários e eventos, moderar publicações e acessar funções administrativas. |

As permissões serão verificadas no back-end por meio de middlewares. Esconder botões na interface não será considerado suficiente para proteger uma operação.

## 7. Fluxo básico de funcionamento

1. A pessoa acessa a página inicial.
2. O sistema apresenta os eventos publicados.
3. A pessoa escolhe um evento e consulta os detalhes.
4. Para cadastrar eventos, o usuário cria uma conta ou faz login com seu cadastro.
5. O servidor valida as credenciais e, quando o login for válido, emitirá um token JWT.
6. O organizador acessa a área de gerenciamento e envia os dados do evento.
7. A API verifica o token, o perfil e os dados recebidos antes de permitir a operação.
8. Os dados válidos serão armazenados no MySQL e a interface será atualizada com a resposta da API.
9. O administrador poderá moderar eventos e usuários conforme suas permissões.

## 8. Tecnologias previstas

- **Front-end:** HTML5, CSS3 e JavaScript.
- **Back-end:** Node.js e Express.
- **Banco de dados:** MySQL.
- **Comunicação:** API REST, JSON e Fetch API.
- **Autenticação:** JWT.
- **Proteção de senha:** hash com biblioteca apropriada, como bcrypt.
- **Versionamento:** Git e GitHub.

## 9. Estrutura inicial do projeto

```text
eventos-conectados/
├── backend/
│   ├── controllers/
│   │   └── eventosController.js
│   ├── database/
│   │   └── conexao.js
│   ├── middlewares/
│   │   ├── autenticacaoMiddleware.js
│   │   └── autorizacaoMiddleware.js
│   ├── routes/
│   │   ├── eventosRoutes.js
│   │   └── authRoutes.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── index.html
├── sql/
│   └── banco.sql
├── .gitignore
└── README.md
```

A organização segue a separação usada como referência no material `loja-online.zip`: rotas recebem as requisições, controllers concentram a lógica, middlewares tratam autenticação/autorização e database reúne a conexão com o banco.

## 10. Planejamento das quatro entregas

- **Entrega 1:** definição do problema, proposta, perfis, fluxo, README e estrutura inicial.
- **Entrega 2:** criação das tabelas relacionadas no MySQL, cadastro/login, proteção de senhas, JWT e middlewares.
- **Entrega 3:** CRUD de eventos integrado entre front-end, API REST e MySQL, com validações e permissões.
- **Entrega 4:** finalização, testes, tratamento de erros, documentação completa e apresentação do sistema em funcionamento.

## 11. Como preparar o ambiente

Requisitos previstos para as próximas etapas:
- Node.js e npm instalados.
- MySQL Server e uma ferramenta para executar scripts SQL.
- Git instalado.
- Conta no GitHub.
- Editor de código, como Visual Studio Code.

Os comandos de instalação e execução serão documentados conforme o servidor e a conexão com o banco forem implementados nas próximas entregas.

## 12. GitHub e histórico de desenvolvimento

Todo o projeto será mantido em um único repositório do GitHub durante as quatro entregas. O README será atualizado a cada etapa e o histórico deverá conter commits que descrevam as mudanças realizadas.

Exemplos de mensagens de commit:
- `docs: documenta problema e proposta do projeto`
- `chore: cria estrutura inicial de pastas`
- `feat: adiciona cadastro e autenticação`
- `feat: implementa CRUD de eventos`
- `docs: atualiza instruções de execução`

Não devem ser enviados ao repositório `node_modules`, arquivos `.env`, senhas, tokens ou credenciais privadas.

## 13. Estado atual

**Entrega 1: planejamento e estrutura inicial.** Os arquivos de código são apenas pontos de partida e não representam ainda um sistema completo em funcionamento.
