var http = require('http');
// 로컬IP : 127.0.0.1 / localhost
var url = require('url');
var qs = require('querystring');
// 쿼리스트링을 분석 / 분리하여 문자열로 변환하는 모듈
http.createServer(function(req, res){
    var path = url.parse(req.url, true).pathname;
    var query = url.parse(req.url, true).query;
    if (path === '/grade'){
        var body = "";
        req.on('data', function(data){
            body += data;
        });

        req.on('end', function(){
            var post = qs.parse(body);
            var sum = parseInt(post.html)+parseInt(post.css)+parseInt(post.nodejs)+parseInt(post.android);
            res.end(`
                name:${post.name}
                html:${post.html}
                css:${post.css}
                nodejs:${post.nodejs}
                android:${post.android}
                grade:${grade}
            `);
        });
        
    }
}).listen(3001);