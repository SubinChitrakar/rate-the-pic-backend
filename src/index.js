import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import routes from './routes';

let app = express();

//Setting the port and host
let APP_PORT = process.env.PORT || 8848;
let APP_HOST = process.env.HOST || 'localhost';

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:false, limit:'5mb'}));
app.use(cors());

app.use(express.static('uploads'));

app.use('/', routes);

app.listen(app.get('port'),app.get('host'), function () {
    console.log('Ready, Listening on http://'+app.get('host')+':'+app.get('port'));
});

module.exports = app;
