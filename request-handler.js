var fs = require("fs");
var path = require("path");
var url = require("url");

exports.handleRequest = function(req, res) {
    
    headers = {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
      "access-control-allow-headers": "content-type, accept",
      "access-control-max-age": 10,
      'Content-Type': "text/html"
    };

    var pathName =url.parse(req.url).pathname;
    var statusCode;

    if (req.method === 'GET') {
      if (req.url === '/') {
        statusCode = 200;
        res.writeHead(statusCode, headers);
        res.end(fs.readFileSync('index.html'));
          
      } else {
        statusCode = 200;
        headers['Content-Type'] = 'application/javascript';
        res.writeHead(statusCode, headers);
        res.end();
      }

    }
}