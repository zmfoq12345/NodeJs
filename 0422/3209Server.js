var http = require('http');
// 로컬IP : 127.0.0.1 / localhost
var url = require('url');
// 쿼리스트링을 분석 / 분리하여 문자열로 변환하는 모듈
http.createServer(function(req, res){
    var path = url.parse(req.url, true).pathname;
    var query = url.parse(req.url, true).query;

    if(path === '/plus'){
        // res.end("ID : " + query.id + "PW : "+query.pw);
        res.end(`${parseInt(query.num1)+parseInt(query.num2)}`);
    }
}).listen(3001);