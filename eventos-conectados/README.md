# Eventos Conectados

**Projeto Web Técnico | Entrega 1 e 2**

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

## 8. Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| HTML5 | Estrutura das páginas. |
| CSS3 | Estilização da interface. |
| JavaScript | Interatividade e comunicação com a API. |
| Node.js | Ambiente de execução do servidor. |
| Express | Criação das rotas e da API REST. |
| MySQL | Banco de dados relacional. |
| MySQL2 | Conexão entre Node.js e MySQL. |
| JWT | Autenticação dos usuários. |
| bcryptjs | Proteção das senhas por hash. |
| Fetch API | Comunicação entre front-end e back-end. |
| Git e GitHub | Versionamento e armazenamento do código. |

## 9. Estrutura do projeto

```text
eventos-conectados/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── eventosController.js
│   ├── database/
│   │   └── conexao.js
│   ├── middlewares/
│   │   ├── autenticacaoMiddleware.js
│   │   └── autorizacaoMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── eventosRoutes.js
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

## 10. Banco de dados

O projeto utiliza o MySQL para armazenar as informações do sistema.

Foram planejadas e criadas três tabelas principais:

### Tabela `usuarios`

Armazena os dados das contas cadastradas.

Principais informações:
- ID do usuário.
- Nome.
- E-mail.
- Senha armazenada em hash.
- Perfil de acesso.
- Situação da conta.

### Tabela `eventos`

Armazena os dados dos eventos cadastrados.

Principais informações:
- ID do evento.
- ID do organizador responsável.
- Título.
- Descrição.
- Categoria.
- Local.
- Data e horário.
- Situação do evento.

### Tabela `inscricoes`

Estrutura destinada ao registro das inscrições dos usuários nos eventos, com relacionamento entre usuários e eventos.

## 11. API e rotas de autenticação

As rotas de autenticação estão organizadas no endereço `/api/auth`.

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/cadastro` | Realiza o cadastro de um usuário. |
| POST | `/api/auth/login` | Verifica as credenciais e gera um JWT. |
| GET | `/api/auth/me` | Retorna os dados do usuário autenticado. |

O cadastro público permite criar contas com os perfis autorizados. A criação de administradores deve ocorrer por um procedimento controlado.

## 12. Segurança

O sistema utiliza mecanismos básicos de segurança:

- Senhas armazenadas com hash utilizando bcryptjs.
- Autenticação por meio de tokens JWT.
- Verificação de tokens em rotas protegidas.
- Controle de permissões por perfil de usuário.
- Variáveis de ambiente para armazenar configurações sensíveis.
- Arquivo `.gitignore` para evitar o envio de arquivos privados ao GitHub.

O token utilizado no ambiente de desenvolvimento é armazenado no `sessionStorage` do navegador. Essa abordagem serve para testes locais e não representa, sozinha, uma solução completa de segurança para produção.

## 13. Como executar o projeto localmente

### Pré-requisitos

- Node.js instalado.
- MySQL instalado.
- MySQL Workbench.
- Visual Studio Code.

### Passo 1: Criar o banco de dados

Abra o MySQL Workbench e execute o script:

```text
sql/banco.sql
```

### Passo 2: Instalar as dependências

Abra o terminal na pasta `backend` e execute:

```bash
npm install
```

### Passo 3: Configurar as variáveis de ambiente

Copie o arquivo `.env.example` e crie um arquivo chamado `.env` na pasta `backend`.

Preencha as configurações de conexão com o MySQL e a chave secreta do JWT conforme os nomes definidos no arquivo de exemplo.

**Importante:** não envie o arquivo `.env` para o GitHub.

### Passo 4: Iniciar o servidor

Dentro da pasta `backend`, execute:

```bash
npm run dev
```

O servidor será iniciado em:

```text
http://localhost:3000
```

### Passo 5: Verificar o funcionamento

Acesse no navegador:

```text
http://localhost:3000/api/health
```

Para acessar a interface, abra o arquivo:

```text
frontend/index.html
```

## 14. Planejamento das entregas

| Entrega | Desenvolvimento |
|---|---|
| Entrega 1 | Definição do problema, proposta de solução, público-alvo, funcionalidades, fluxo e estrutura inicial do projeto. |
| Entrega 2 | Criação do banco de dados, cadastro e login, proteção de senhas, JWT e middlewares de autenticação e autorização. |
| Entrega 3 | Implementação do CRUD de eventos, integração entre front-end, API REST e MySQL, validações e controle de permissões. |
| Entrega 4 | Finalização do sistema, testes, tratamento de erros, documentação e apresentação do projeto. |

## 15. Estado atual do projeto

**Entrega 1: Concluída.**

Foi realizada a definição do problema, da proposta de solução, dos perfis de usuários, das funcionalidades previstas e da estrutura inicial do projeto.

**Entrega 2: Desenvolvida.**

Foi criada a estrutura do banco de dados, implementados os recursos de cadastro e login, proteção de senhas com bcryptjs, autenticação JWT e middlewares de controle de acesso.

Os recursos devem ser executados e testados no ambiente local para verificar seu funcionamento.

**Próxima etapa: Entrega 3.**

Será desenvolvido o CRUD de eventos, permitindo cadastrar, consultar, editar e excluir eventos, com integração ao banco de dados e controle de permissões.
