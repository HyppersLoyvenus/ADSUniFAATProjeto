import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const Pagamento = sequelize.define("Pagamento", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isIn: [['Pago', 'Pendente', 'Vencido']]
        }
    },
    data_vencimento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_pagamento: {
        type: DataTypes.DATE
    },
    detalhes: {
        type: DataTypes.TEXT
    },
    id_responsavel: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'pagamento',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default Pagamento;