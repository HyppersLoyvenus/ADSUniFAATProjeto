import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const ProfessorTurma = sequelize.define("ProfessorTurma", {
    id_professor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_turma: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
},
{
    tableName: 'professor_turma',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default ProfessorTurma;