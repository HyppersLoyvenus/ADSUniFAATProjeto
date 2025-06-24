CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL, -- deve-se usar hash
    status VARCHAR(20) NOT NULL
        DEFAULT 'Ativo' CHECK (status IN ('Ativo', 'Inativo'))
);

CREATE TABLE IF NOT EXISTS responsavel(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    endereco VARCHAR(500) NOT NULL,
    id_usuario INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE -- usuário deletado, o responsável também é
);

CREATE TABLE IF NOT EXISTS professor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    area VARCHAR(100),
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    data_contratacao DATE NOT NULL,
    id_usuario INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE -- usuário deletado, o professor também é
);

CREATE TABLE IF NOT EXISTS turma (
    id SERIAL PRIMARY KEY,
    nome_turma VARCHAR(100) NOT NULL,
    ano_letivo INTEGER NOT NULL,
    capacidade INTEGER NOT NULL,
    CONSTRAINT uk_turma_nome_ano UNIQUE (nome_turma, ano_letivo) -- garante que o nome da turma seja único por ano letivo
);

CREATE TABLE IF NOT EXISTS aluno (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    data_matricula DATE NOT NULL,
    status_matricula VARCHAR(50) NOT NULL
        CHECK (status_matricula IN ('Ativo', 'Inativo', 'Concluído', 'Transferido')),
    id_responsavel INTEGER NOT NULL,
    id_turma INTEGER,
    FOREIGN KEY (id_responsavel) REFERENCES responsavel(id) ON DELETE RESTRICT, -- restringe a exclusão do responsável se ele tiver alunos
    FOREIGN KEY (id_turma) REFERENCES turma(id) ON DELETE SET NULL -- turma deletada, id_turma do aluno vira NULL (para manter o histórico do aluno)
);

CREATE TABLE IF NOT EXISTS professor_turma (
    id_professor INTEGER NOT NULL,
    id_turma INTEGER NOT NULL,
    PRIMARY KEY (id_professor, id_turma),
    FOREIGN KEY (id_professor) REFERENCES professor(id) ON DELETE CASCADE, -- professor deletado, a associação é deletada
    FOREIGN KEY (id_turma) REFERENCES turma(id) ON DELETE CASCADE -- turma deletada, a associação é deletada
);

CREATE TABLE IF NOT EXISTS pagamento (
    id SERIAL PRIMARY KEY,
    id_responsavel INTEGER NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL
        CHECK (status IN ('Pago', 'Pendente', 'Vencido')),
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    detalhes TEXT,
    FOREIGN KEY (id_responsavel) REFERENCES responsavel(id) ON DELETE RESTRICT -- restringe a exclusão do responsável se ele tiver pagamentos
);

CREATE TABLE IF NOT EXISTS atividade (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    data_atividade DATE NOT NULL,
    id_turma INTEGER NOT NULL,
    FOREIGN KEY (id_turma) REFERENCES turma(id) ON DELETE CASCADE -- turma deletada, atividades da turma também são
);

CREATE TABLE IF NOT EXISTS presenca (
    id SERIAL PRIMARY KEY,
    id_aluno INTEGER NOT NULL,
    id_professor INTEGER,
    data_presenca DATE NOT NULL,
    status VARCHAR(50) NOT NULL
        CHECK (status IN ('Presente', 'Ausente', 'Atraso')),
    CONSTRAINT unique_presenca_aluno_data UNIQUE (id_aluno, data_presenca), -- faz aluno ter só um registro de presença por dia
    FOREIGN KEY (id_aluno) REFERENCES aluno(id) ON DELETE CASCADE, -- aluno deletado, registros de presença também são
    FOREIGN KEY (id_professor) REFERENCES professor(id) ON DELETE SET NULL -- professor deletado, id_professor na presença vira NULL
);

CREATE TABLE IF NOT EXISTS aluno_atividade (
    id_aluno INTEGER NOT NULL,
    id_atividade INTEGER NOT NULL,
    id_professor INTEGER,
    avaliacao VARCHAR(100),
    PRIMARY KEY (id_aluno, id_atividade),
    FOREIGN KEY (id_aluno) REFERENCES aluno(id) ON DELETE CASCADE, -- aluno deletado, participações em atividades deletadas
    FOREIGN KEY (id_atividade) REFERENCES atividade(id) ON DELETE CASCADE, -- atividade deletada, participações de alunos deletadas
    FOREIGN KEY (id_professor) REFERENCES professor(id) ON DELETE SET NULL -- professor deletado, id_professor vira NULL
);

-- índices para operações frequentes:
CREATE INDEX IF NOT EXISTS idx_aluno_responsavel ON aluno(id_responsavel);
CREATE INDEX IF NOT EXISTS idx_aluno_turma ON aluno(id_turma);
CREATE INDEX IF NOT EXISTS idx_pagamento_responsavel ON pagamento(id_responsavel);
CREATE INDEX IF NOT EXISTS idx_atividade_turma ON atividade(id_turma);
CREATE INDEX IF NOT EXISTS idx_presenca_aluno ON presenca(id_aluno);