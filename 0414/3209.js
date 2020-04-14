var http = require('http');
var fs = require('fs');
var queryString = require('query-string');
// 로컬IP : 127.0.0.1 / localhost

http.createServer(function(req, res){
    var _url = req.url.split('?');
    if(_url[0] == '/html'){
        fs.readFile('./html','utf-8', function(err, txt){
            if (err){
                console.log(err.message);
            }else{
                res.end(txt);
            }
        });
    }else if(_url[0] == '/nodejs'){
        fs.readFile('./nodejs','utf-8', function(err, txt){
            if (err){
                console.log(err.message);
            }else{
                res.end(txt);
            }
        });
    }else if(_url[0] == '/table'){
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
        fs.readFile('./other','utf-8', function(err, txt){
            if (err){
                console.log(err.message)
            }else{
                res.end(txt);
            }
        });
    }
}).listen(3000);