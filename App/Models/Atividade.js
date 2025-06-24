import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const Atividade = sequelize.define("Atividade", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    data_atividade: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_turma: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'atividade',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default Atividade;