import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import * as site from './site.js';

const app = express();

app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.get('/', site.index);

app.listen(3000, () => {
    console.log('The server is listening on port 3000');
})