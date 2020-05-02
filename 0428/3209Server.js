var http = require('http');
// 로컬IP : 127.0.0.1 / localhost
var url = require('url');
var qs = require('querystring');
// 쿼리스트링을 분석 / 분리하여 문자열로 변환하는 모듈
http.createServer(function(req, res){
    var path = url.parse(req.url, true).pathname;
    var query = url.parse(req.url, true).query;
    if (path === '/grade'){
        console.log('hello!');
        var body = "";
        req.on('end', ()=> {
            const post = qs.parse(body);
            let avg = (parseInt(post.html)+parseInt(post.css)+parseInt(post.nodejs)+parseInt(post.android))/4
            let grade = resAvg(avg)
            res.end(`
            name: ${post.name}
            html: ${post.html}
            css: ${post.css}
            nodejs: ${post.nodejs}
            android: ${post.android}
            avg: ${avg}
            grade: ${grade}`);
        });
        
    }
}).listen(3001);

resAvg = (avg) =>{
    if(avg >= 95) return "A+"
    else if(avg >= 90) return "A"
    else if(avg >= 85) return "B+"
    else if(avg >= 80) return "B"
    else if(avg >= 75) return "C"
    else return "F"
}