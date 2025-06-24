import Usuario from './Usuario.js';
import Responsavel from './Responsavel.js';
import Professor from './Professor.js';
import Turma from './Turma.js';
import Aluno from './Aluno.js';
import Pagamento from './Pagamento.js';
import Atividade from './Atividade.js';
import Presenca from './Presenca.js';
import AlunoAtividade from './AlunoAtividade.js';
import ProfessorTurma from './ProfessorTurma.js';

// --- RELACIONAMENTOS 1 PARA 1 ---

// Um usuário pode ser um responsável, e um responsável está ligado a um único usuário.
// Usuario ↔ Responsavel (1:1)
Usuario.hasOne(Responsavel, { foreignKey: 'id_usuario', as: 'responsavel', onDelete: 'CASCADE' });
Responsavel.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

// Usuario ↔ Professor (1:1)
Usuario.hasOne(Professor, { foreignKey: 'id_usuario', as: 'professor', onDelete: 'CASCADE' });
Professor.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

// --- RELACIONAMENTOS 1 PARA MUITOS ---

// Um responsável pode ter vários alunos, mas um aluno tem apenas um responsável.
// Responsavel → Aluno (1:N)
Responsavel.hasMany(Aluno, { foreignKey: 'id_responsavel', as: 'alunos', onDelete: 'RESTRICT' });
Aluno.belongsTo(Responsavel, { foreignKey: 'id_responsavel', as: 'responsavel' });

// Turma → Aluno (1:N)
Turma.hasMany(Aluno, { foreignKey: 'id_turma', as: 'alunos', onDelete: 'SET NULL' });
Aluno.belongsTo(Turma, { foreignKey: 'id_turma', as: 'turma' });

// Responsavel → Pagamento (1:N)
Responsavel.hasMany(Pagamento, { foreignKey: 'id_responsavel', as: 'pagamentos', onDelete: 'RESTRICT' });
Pagamento.belongsTo(Responsavel, { foreignKey: 'id_responsavel', as: 'responsavel' });

// Turma → Atividade (1:N)
Turma.hasMany(Atividade, { foreignKey: 'id_turma', as: 'atividades', onDelete: 'CASCADE' });
Atividade.belongsTo(Turma, { foreignKey: 'id_turma', as: 'turma' });

// Aluno → Presenca (1:N)
Aluno.hasMany(Presenca, { foreignKey: 'id_aluno', as: 'presencas', onDelete: 'CASCADE' });
Presenca.belongsTo(Aluno, { foreignKey: 'id_aluno', as: 'aluno' });

// Professor → Presenca (1:N)
Professor.hasMany(Presenca, { foreignKey: 'id_professor', as: 'registrosPresenca', onDelete: 'SET NULL' });
Presenca.belongsTo(Professor, { foreignKey: 'id_professor', as: 'professor' });

// --- RELACIONAMENTOS MUITOS PARA MUITOS (Many-to-Many) ---

// Professor ↔ Turma (N:M)
Professor.belongsToMany(Turma, { through: ProfessorTurma, foreignKey: 'id_professor', otherKey: 'id_turma', as: 'turmas' });
Turma.belongsToMany(Professor, { through: ProfessorTurma, foreignKey: 'id_turma', otherKey: 'id_professor', as: 'professores' });

// Aluno ↔ Atividade (N:M)
Aluno.belongsToMany(Atividade, { through: AlunoAtividade, foreignKey: 'id_aluno', otherKey: 'id_atividade', as: 'atividades' });
Atividade.belongsToMany(Aluno, { through: AlunoAtividade, foreignKey: 'id_atividade', otherKey: 'id_aluno', as: 'alunos' });

Professor.hasMany(AlunoAtividade, { foreignKey: 'id_professor', as: 'avaliacoesAtividades', onDelete: 'SET NULL' });
AlunoAtividade.belongsTo(Professor, { foreignKey: 'id_professor', as: 'professor' });