import {Router} from 'express';
import webPush from 'web-push'

let publicVapidKey = 'BDx28bcf7oDH_HId1bBMJxyvuxKjCCViF55i6MVDhVNFg8vCgQ0SbTaa-lQbrZTTXjiwo1S_VIqOJjD2FBkoQQE';
let privateVapidKey = '38fG8nNHiOtGpp6_esIOzbFQ5u02STFZY6Tf8ARQXrs';
webPush.setVapidDetails('mailto: test@test.com', publicVapidKey, privateVapidKey);

let router = Router();

router.post('/', function (req, res, next) {
    let subscription = req.body;

    res.status(201).json({});

    const payload = JSON.stringify({title: 'Push Test'});

    webPush.sendNotification(subscription, payload).catch(err=>console.log('Error', err));
});

export default router;
