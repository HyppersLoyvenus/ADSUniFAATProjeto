import sequelize from '../config/sequelize.js';
import * as models from '../Models/index.js';

import constants from '../config/constants.js';
globalThis.CONSTANTS = constants;

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');

        await sequelize.sync({ alter: true });
        console.log('Todos os modelos foram sincronizados com sucesso!');

    } catch (error) {
        console.error('Falha ao inicializar o banco de dados:', error);
        process.exit(1);
    }
}

export { initializeDatabase };