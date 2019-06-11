const http = require('http');
import authorizeClientCertificate from  'clientCertHandler';

const server = http.createServer(authorizeClientCertificate, (request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!");
});

const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
