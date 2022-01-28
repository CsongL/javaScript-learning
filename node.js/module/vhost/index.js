import express from 'express';
import vhost from 'vhost';

const main = express();

main.get('/', function(req, res) {
    res.send('Welcome to the main app');
});

main.get('/:sub', function(req, res) {
    res.send('requested ' + req.params.sub);
});


const subMain = express();


subMain.get('/redirect', (req, res) => {
    res.redirect('http://example.com:3000/' + req.vhost[0]);
});

const app = express();

app.use(vhost('example.com', main));
app.use(vhost('*.example.com', subMain));

app.listen(3000, (req, res) => {
    console.log('the app server is listening on port 3000');
});