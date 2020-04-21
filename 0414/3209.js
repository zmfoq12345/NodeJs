var http = require('http');
var fs = require('fs');
var queryString = require('query-string');
// 로컬IP : 127.0.0.1 / localhost

http.createServer(function(req, res){
    var _url = req.url.split('?');
    var reqUrl = _url[0]
    if(reqUrl === '/html'){
        fs.readFile('./txtFile/html','utf-8', function(err, txt){
            if (err){
                console.log(err.message);
            }else{
                res.end(txt);
            }
        });
    }else if(reqUrl === '/nodejs'){
        fs.readFile('./txtFile/nodejs','utf-8', function(err, txt){
            if (err){
                console.log(err.message);
            }else{
                res.end(txt);
            }
        });
    }else if(reqUrl === './txtFile/table'){
        const queryObject = queryString.parse(_url[1]);
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