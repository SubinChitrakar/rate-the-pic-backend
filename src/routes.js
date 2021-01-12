import {Router} from 'express';

import register from './controller/register-controller';

let router = Router();
router.use('/',register);

export default  router;