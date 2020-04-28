var http = require('http');
// 로컬IP : 127.0.0.1 / localhost
var url = require('url');
var qs = require('querystring');
// 쿼리스트링을 분석 / 분리하여 문자열로 변환하는 모듈
http.createServer(function(req, res){
    var path = url.parse(req.url, true).pathname;
    var query = url.parse(req.url, true).query;

    if(path === '/plus'){
        // console.log(query);
        // res.end("ID : " + query.id + "PW : "+query.pw);
        var result;
        var cal = query.cal;
        if (cal === '+'){
            result = `PLUS : ${parseInt(query.num1)+parseInt(query.num2)}`;
        }else if (cal === '-'){
            result = `MINUS : ${parseInt(query.num1)-parseInt(query.num2)}`;
        }else if (cal === '*'){
            result = `MULTIPLY : ${parseInt(query.num1)*parseInt(query.num2)}`;
        }else if (cal === '/'){
            result = `DIVIDE : ${parseInt(query.num1)/parseInt(query.num2)}`;
        }

        res.end(`<h1>${result}</h1>`);
    }else if (path === '/grade'){
        var body = "";
        req.on('data', function(data){
            body += data;
        });

        req.on('end', function(){
            var post = qs.parse(body);
            console.log(post);
        });
        
    }
}).listen(3001);