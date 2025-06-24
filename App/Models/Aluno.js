import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const Aluno = sequelize.define("Aluno", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_matricula: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status_matricula: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isIn: [['Ativo', 'Inativo', 'Concluido', 'Transferido']]
        }
    },
    id_responsavel: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_turma: {
        type: DataTypes.INTEGER
    }
},
{
    tableName: 'aluno',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default Aluno;