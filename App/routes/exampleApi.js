import { Router } from 'express';
import ListExampleController from '../Controllers/ModelExample/CreateExampleController.js';
import CreateExampleController from '../Controllers/ModelExample/DeleteExampleController.js';
import GetExampleController from '../Controllers/ModelExample/GetExampleController.js';
import UpdateExampleController from '../Controllers/ModelExample/ListExampleController.js';
import DeleteExampleController from '../Controllers/ModelExample/UpdateExampleController.js';

export default (function () {

    const router = Router();

    // router.metodo("/rota", (request, response) => {...})

    // GET Listar
    router.get('/api/example', ListExampleController);

    // GET Obter um
    router.get('/api/example/:id', GetExampleController);

    // POST Criar
    router.post('/api/example', CreateExampleController);

    // PUT Atualizar
    router.put('/api/example/:id', UpdateExampleController);

    // DELETE Atualizar
    router.delete('/api/example/:id', DeleteExampleController);

    return router;

})();