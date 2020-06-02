var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
var funcDB = require('./func_database');
// app.use(0function(request, response, next){
//     console.log("첫 번째 미들웨어")
// });

// app.use(function(request, response, next){
//     console.log("두 번째 미들웨어")
// });
// 어떤 라우터든 실행을 하면 무조건 동작하는 기능 : 미들웨어

{ // OnlineClass
app.use(bodyParser.urlencoded({extended:false}));
app.get('/', function(request, response){
    response.send('index 페이지..');
});
app.get('/page', function(request, response){
    response.send(`page 페이지..${request.query.pageNo}`);

});
app.get('/board', function(request, response){
    response.send(`
    Date : ${request.query.targetDt}<br>
    board ${request.query.pageNo} Page!`);

});
app.get('/admin/:id/:Dt', function(request, response){
    response.send(`${request.params.id}<br>${request.params.Dt}`);

});
app.get('/numberSum/:start/:end', function(request, response){
    var sum = 0;
    var start = parseInt(request.params.start);
    var end = parseInt(request.params.end);

    for(var i = start; i<end; i++)
    {
        sum+=i;
    }
    console.log(sum);

    response.send(`<h1>${start}~${end}까지의 합</h1>
    <br>
    결과 : ${sum}`);
});
app.get('/naver', function(request, response){
    response.redirect(`https://www.naver.com`);
}); 
app.get('/siteMove', function(request, response){
    var domain = "com";
    var site = request.query.site;
    console.log(site);

    if (site == "DAUM") domain = "net";

    response.redirect(`https://www.${site}.${domain}`);
});
}

app.post('/loginCheck', function(req,res){
    funcDB.loginCheck(req,res);
});      
app.post('/Join', function(req,res){
    funcDB.join(req,res);
});
app.post('/Delete', function(req,res){
    funcDB.Delete(req,res);
});
app.post('/Update', function(req,res){
    funcDB.Update(req,res);
});
app.post('/AllSelect', function(req,res){
    funcDB.AllSelect(req,res);
});


app.listen(port, function(){
    console.log(`${port}포트로 서버 실행!`);
});