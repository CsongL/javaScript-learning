import http from 'http';

const course = {
    name: 'Node.js',
    classification: 'Front_End' 
};

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write("Hello World");
        res.end();
    }
    if(req.url === '/api/course') {
        res.write(JSON.stringify(course));
        res.end();
    }
});

server.listen(3000);

console.log("The server is listening 3000 port");
