CREATE TABLE IF NOT EXISTS ai_chat_config (
  id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  provider VARCHAR(32) NOT NULL,
  api_key VARCHAR(255) NOT NULL,
  base_url VARCHAR(255) NOT NULL,
  model VARCHAR(128) NOT NULL,
  temperature DECIMAL(4,2) NOT NULL DEFAULT 0.70,
  max_tokens INT NULL,
  system_prompt TEXT NULL,
  azure_deployment VARCHAR(128) NULL,
  azure_api_version VARCHAR(32) NULL,
  create_time DATETIME NOT NULL,
  update_time DATETIME NOT NULL,
  UNIQUE KEY uk_ai_chat_config_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AI chat user config';

CREATE TABLE IF NOT EXISTS ai_chat_session (
  id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT NULL,
  last_message_time DATETIME NULL,
  create_time DATETIME NOT NULL,
  update_time DATETIME NOT NULL,
  KEY idx_ai_chat_session_user (user_id),
  KEY idx_ai_chat_session_time (last_message_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AI chat sessions';

CREATE TABLE IF NOT EXISTS ai_chat_message (
  id BIGINT PRIMARY KEY,
  session_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  role VARCHAR(16) NOT NULL,
  content LONGTEXT NOT NULL,
  create_time DATETIME NOT NULL,
  KEY idx_ai_chat_message_session (session_id),
  KEY idx_ai_chat_message_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AI chat messages';
