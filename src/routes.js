import {Router} from 'express';

import user from './controller/user-controller';
import image from './controller/image-controller';
import comment from './controller/comment-controller';
import notification from './controller/notification-controller';

let router = Router();
router.use('/user', user);
router.use('/images', image);
router.use('/comment', comment);
router.use('/notification', notification);

export default  router;
