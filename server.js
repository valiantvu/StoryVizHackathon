var http = require("http");
var fs = require("fs");
var port = 8000;
var ip = "127.0.0.1";
var server = http.createServer(function(req, res) {
    
    headers = {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
      "access-control-allow-headers": "content-type, accept",
      "access-control-max-age": 10,
      'Content-Type': "text/html"
    };
    res.writeHead(200, headers);
    res.end(fs.readFileSync('index.html'));
});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);