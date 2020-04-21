var http = require('http');
// 로컬IP : 127.0.0.1 / localhost
var fs = require('fs');
// 파일 처리와 관련된 모듈
var url = require('url');
// 쿼리스트링을 분석 / 분리하여 문자열로 변환하는 모듈
var queryString = require('query-string');


http.createServer(function(req, res){
    var path = url.parse(req.url, true).pathname;
    var query = url.parse(req.url, true).query;

    console.log(req.url); // url
    console.log(path); // url에서 분석한 파일명
    console.log(query.id); // 쿼리스트링의 데이터

    if(path === '/html'){
        fs.readFile('./txtFile/html','utf-8', function(err, txt){
            if (err){
                console.log(err.message);
            }else{
                res.end(txt);
            }
        });
    }else if(path === '/nodejs'){
        fs.readFile('./txtFile/nodejs','utf-8', function(err, txt){
            if (err){
                console.log(err.message);
            }else{
                res.end(txt);
            }
        });
    }else if(path === './txtFile/table'){
        const queryObject = queryString.parse(query);
        table = ''
        for(i=1;i<=parseInt(queryObject.id);i++){
            table+='<th>'+i.toString();
        }
        res.end(`<html>
            <head>
            <meta charset='utf-8'>
            </head>
                <body>
                    <table border="1">
                        ${table}
                    </table>
                </body>
            </html>`)
    }else{
        fs.readFile('./txtFile/other','utf-8', function(err, txt){
            if (err){
                console.log(err.message)
            }else{
                res.end(txt);
            }
        });
    }
}).listen(3000);