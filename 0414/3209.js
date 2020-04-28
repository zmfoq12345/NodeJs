var http = require('http');
// 로컬IP : 127.0.0.1 / localhost
var fs = require('fs');
// 파일 처리와 관련된 모듈
var url = require('url');
// 쿼리스트링을 분석 / 분리하여 문자열로 변환하는 모듈
var temp = require("./Temp.js");
http.createServer(function(req, res){
    var path = url.parse(req.url, true).pathname;
    var query = url.parse(req.url, true).query;

    console.log(req.url); // url
    console.log(path); // url에서 분석한 파일명
    console.log(query.id); // 쿼리스트링의 데이터

    if(path === '/html'){
        var tempRes = temp.template("html", query);

        res.end(tempRes);

    }else if(path === '/nodejs'){
        var tempRes = temp.template("nodejs", query);
        
        res.end(tempRes);

    }else if(path === '/query'){
        var tempRes = temp.template("query", query);
        
        res.end(tempRes);

    }else if(path === '/table'){
        var table = temp.table(parseInt(query.id));
        res.end(`
            <table border=1>
                ${table}
            </table>
        `)
    }else{
        var tempRes = temp.template("other", query);
        
        res.end(tempRes);
    }
}).listen(3000);