import {Router} from 'express';
import * as userService from '../service/user-service';

let router = Router();

router.post('/login', function (req, res, next) {
    userService.verifyUser(req.body)
        .then(response => {
            res.json({data: response});
        })
        .catch(err => {
            res.json({data: 'Database Error', error: err});
        })
});

router.post('/register', function (req, res, next) {
    let newUser = req.body;
    userService.findUser(newUser.email)
        .then((response) => {
            if (response == undefined) {
                return userService.registerUser(newUser)
                    .then(addedUser => {
                        res.json({userDetails: addedUser[0], message: 'New User Registered'});
                    })
                    .catch(err => {
                        res.json({data: 'Database Error', error: err});
                    })
            } else {
                res.json({userDetails: response, message: 'Existing User'});
            }
        })
        .catch(err => {
            res.json({data: 'Database Error', error: err});
        })

});

export default router;
