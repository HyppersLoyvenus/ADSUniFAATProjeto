import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const Professor = sequelize.define("Professor", {
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
    area: {
        type: DataTypes.STRING(100)
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    data_contratacao: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    }
},
{
    tableName: 'professor',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default Professor;