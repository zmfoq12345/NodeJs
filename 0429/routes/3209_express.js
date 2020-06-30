var express = require('express');
var bodyParser = require('body-parser');
var sessionP = require('express-session')
var app = express();
var port = 3000;
var funcDB = require('../conf/func_database');
var ejs = require('ejs');
const session = require('express-session');
// app.use(0function(request, response, next){
//     console.log("첫 번째 미들웨어")
// });

// app.use(function(request, response, next){
//     console.log("두 번째 미들웨어")
// });
// 어떤 라우터든 실행을 하면 무조건 동작하는 기능 : 미들웨어

{ // OnlineClass
app.use(sessionP({
    secret : "3209",  // session 암호키값
    resave : false,  // session만들때마다 다른 ID값을 부여할건지
    saveUninitialized : true  // session을 사용할 때만 ID값을 부여

}));
app.use(bodyParser.urlencoded({extended:false}));
app.set("views", '../views');
app.use(express.static('../public'));
app.set("view engine", 'ejs');

app.get('/', function(request, response){
    request.session.user = {
        "name" : "json",
        "age" : "20"
    }
    console.log("session 저장 성공");
    response.render('review', {
        num : 5
    });
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
app.get('/Delete', function(req,res){
    funcDB.Delete(req,res);
});
app.post('/Update', function(req,res){
    funcDB.Update(req,res);
});
app.get('/AllSelect', function(req,res){
    console.log(req.session.user.name);
    funcDB.AllSelect(req,res);
});
app.get('/Login', function(req,res){
    if (req.session.user){
        res.render('Login', {
            user : req.session.user
        });
    }else{
        res.render('Login', {
            user : null
        });
    }
});
app.get('/Logout', function(req,res){
    delete req.session.user;
    res.redirect('http://localhost:3000/Message');
});

app.get('/Message', function(req,res){
    res.render('message', {
        user : null
    });
});

app.post('/td', function(req,res){
    res.render('index', {
        num : req.body.td
    });
});

app.get('/mail', function(req,res){
    res.render('mail', {
    });
});

app.listen(port, function(){
    console.log(`${port}포트로 서버 실행!`);
});