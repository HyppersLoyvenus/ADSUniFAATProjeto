import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const Turma = sequelize.define("Turma", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_turma: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    ano_letivo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'turma',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    
    //CONSTRAINT
    indexes: [
        {
            unique: true,
            fields: ['nome_turma', 'ano_letivo'],
            name: 'turma_nome_e_ano'
        }
    ]
});

export default Turma;