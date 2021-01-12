import {Router} from 'express';

let router = Router();

router.get('/',function (req, res, next) {
    res.json({data: 'Hello World!'});
});

export default router;