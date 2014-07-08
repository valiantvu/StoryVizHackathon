var fs = require("fs");
var path = require("path");
var url = require("url");

exports.handleRequest = function(req, res) {
    var pathName = url.parse(req.url).pathname;
    var file = pathName.split('.');
    var fileType = file[file.length - 1];

    headers = {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
      "access-control-allow-headers": "content-type, accept",
      "access-control-max-age": 10,
      'Content-Type': "text/html"
    };

    var pathName = url.parse(req.url).pathname;
    var statusCode;

    var serveAsset = function(statusCode, headers, path) {
      res.writeHead(statusCode, headers);
      res.end(fs.readFileSync(path));
    }

    if (req.method === 'GET') {
      if (req.url === '/') {
        serveAsset(200, headers, 'index.html');
      } else if (fileType === 'css') {
        headers['Content-Type'] = 'text/css';
        serveAsset(200, headers, "." + pathName);
      } else if (fileType === 'png') {
        headers['Content-Type'] = 'image/png';
        serveAsset(200, headers, "." + pathName);
      } else {
        headers['Content-Type'] = 'application/javascript';
        serveAsset(200, headers, "." + pathName);
      }

    }
}