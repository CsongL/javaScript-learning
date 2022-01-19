import http from 'http';
import url from 'url';


const hostname = '127.0.0.1';
const port = 3000;
const serverUrl = `http://${hostname}:${port}`;

function getName(req) {
    let {name} = url.parse(req.url, true).query;

    return name;
}

function getGreeting(name) {
    let greet = `Hello ${name}`;
 
    return greet;
}

const server = http.createServer((req, res) => {
    const name = getName(req);
    const greet = getGreeting(name); 

    res. statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
     res.end(`${greet}!`);
});

server.listen(port, hostname, () => {
    console.log(`Server running on ${serverUrl}`);
});