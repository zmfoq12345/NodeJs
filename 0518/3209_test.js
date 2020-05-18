var http = require('http');
var url = require('url');
var port = 3000;

http.createServer(function(request, response){

        path = url.parse(request.url, true).pathname;

        console.log(path);
        
}).listen(port);
