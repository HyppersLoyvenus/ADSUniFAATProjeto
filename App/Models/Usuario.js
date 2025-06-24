import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const Usuario = sequelize.define("Usuario", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    senha: {
        type: DataTypes.STRING(255), //criptografar dps
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'Ativo',
        validate: {
            isIn: [['Ativo', 'Inativo']]
        }
    }
},
{
    tableName: 'usuario',
    timestamps: false, //fazer dps ?
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default Usuario;