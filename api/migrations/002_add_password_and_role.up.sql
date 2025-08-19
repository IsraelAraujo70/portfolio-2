-- Adicionar coluna password (caso não exista)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='password') THEN
        ALTER TABLE users ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT '';
    END IF;
END $$;

-- Adicionar coluna role (caso não exista)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN
        ALTER TABLE users ADD COLUMN role VARCHAR(50) NOT NULL DEFAULT 'user';
    END IF;
END $$;

-- Criar índices (caso não existam)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);