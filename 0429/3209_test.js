var http = require('http');
// 로컬IP : 127.0.0.1 / localhost
var url = require('url');
var qs = require('querystring');
// 쿼리스트링을 분석 / 분리하여 문자열로 변환하는 모듈
http.createServer(function(req, res){
    var path = url.parse(req.url, true).pathname;
    var query = url.parse(req.url, true).query;

    
}).listen(3001);