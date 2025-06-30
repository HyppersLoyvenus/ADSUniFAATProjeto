import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const Responsavel = sequelize.define("Responsavel", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    }
},
{
    tableName: 'responsavel',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default Responsavel;