import {Router} from 'express';
import * as userService from '../service/user-service';

let router = Router();

router.get('/',function (req, res, next) {
    userService.displayUser()
        .then(userList=>{
            res.json({userList: userList})
        })
        .catch(err=>{
            res.json({data: 'Database Error', error: err});
        })
});

export default router;