import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const Presenca = sequelize.define("Presenca", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data_presenca: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isIn: [['Presente', 'Ausente', 'Atraso']]
        }
    },
    id_aluno: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_professor: {
        type: DataTypes.INTEGER
    }
},
{
    tableName: 'presenca',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default Presenca;