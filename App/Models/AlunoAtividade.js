import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const AlunoAtividade = sequelize.define("AlunoAtividade", {
    id_aluno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_atividade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_professor: {
        type: DataTypes.INTEGER
    },
    avaliacao: {
        type: DataTypes.STRING(100)
    }
},
{
    tableName: 'aluno_atividade',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default AlunoAtividade;