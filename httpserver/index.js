const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.end('This is home page');
    } else if (req.url == '/about') {
        res.end('This is about us page');
    } else {
        res.writeHead(404,{"content-type":"text/html"})
        res.end('<h1>404 error page. Page does not exist</h1>')
    }

});

server.listen(8000, '127.0.0.1', () => {
    console.log("listening to the port no 8000")
})