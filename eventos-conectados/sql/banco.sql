-- Banco de dados da aplicação Eventos Conectados
CREATE DATABASE IF NOT EXISTS eventos_conectados
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE eventos_conectados;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  perfil ENUM('participante', 'organizador', 'administrador') NOT NULL DEFAULT 'participante',
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS eventos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  organizador_id INT UNSIGNED NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  descricao TEXT NOT NULL,
  categoria VARCHAR(80) NOT NULL,
  local VARCHAR(180) NOT NULL,
  data_hora DATETIME NOT NULL,
  status ENUM('rascunho', 'publicado', 'cancelado') NOT NULL DEFAULT 'rascunho',
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_eventos_organizador
    FOREIGN KEY (organizador_id) REFERENCES usuarios(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_eventos_data (data_hora),
  INDEX idx_eventos_status (status)
);

CREATE TABLE IF NOT EXISTS inscricoes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  evento_id INT UNSIGNED NOT NULL,
  usuario_id INT UNSIGNED NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_inscricao_usuario_evento (evento_id, usuario_id),
  CONSTRAINT fk_inscricoes_evento
    FOREIGN KEY (evento_id) REFERENCES eventos(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_inscricoes_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);
