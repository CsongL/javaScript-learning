import http from 'http';
import qs from 'querystring';

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.writeHead(200, { "Content-Type" : "text/html"});
        res.end([
            '<form method="POST" action="/url">',
            '<h1>My Form</h1>',
            '<fieldset>',
            '<label>Personal Information</label>',
            '<p>What is your name</p>',
            '<input type="text" name="name">',
            '<p><button>Submit</button></p>',
            '</form>'
        ].join(''));
    } else if(req.url === '/url' && req.method === 'POST') {
        let body = '';
        req.on('data', data => {
            body = body + data;
        });
        req.on('end', () => {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end('<p>Your name is <b>'+ qs.parse(body).name+'</b></p>')
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3030, 'localhost', () => {
    console.log('The server is listening the port 3030');
});