var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

var port = 3000;

var password = "";

// app.use(function(request, response, next){
//     console.log("첫 번째 미들웨어")
// });

// app.use(function(request, response, next){
//     console.log("두 번째 미들웨어")
// });
// 어떤 라우터든 실행을 하면 무조건 동작하는 기능 : 미들웨어

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
app.post('/loginCheck', function(req,res){
    var id = req.body.id;
    var pw = req.body.pw;

    var conn = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : password,
        database : 'software'
    });

    conn.connect();
    var sql = `select * from software.member where id = ? and pw = ?`;
    conn.query(sql, [id, pw], function(err, rows){
        if(!err){
            if (rows.length != 0){
                console.log("로그인 성공");
                res.sendFile(__dirname + "/loginS.html")
            }else{
                console.log("로그인 실패");
                res.sendFile(__dirname + "/loginF.html")  
            }
        }else{
            console.log("ERR실패");
        }
    });
});

app.post('/Join', function(req,res){
    var id = req.body.id;
    var pw = req.body.pw;
    var name = req.body.nick;

    var conn = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : password,
        database : 'software'
    });
    conn.connect();
    var sql = `insert into software.member values(?, ?, ?)`;
    
    console.log(`id :${id}pw :${pw}name:${name}`);
    conn.query(sql, [id, pw, name], function(err, rows){
        if(!err){
            console.log("입력 성공");
        }else{
            console.log(err.message);
            console.log("입력 실패");       
        }
    });
    res.send("완료");       
    // res.send(`<h1>id :${id}<br>pw :${pw}<br>name:${name}</h1>`);
    // if (id === 'smart' && pw ==='123'){
    //     res.redirect('http://127.0.0.1:5500/LoginS.html');
    // }else{
    //     res.redirect('http://127.0.0.1:5500/LoginF.html');
    //}
});
app.post('/Delete', function(req,res){
    var id = req.body.id;
    var conn = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : password,
        database : 'software'
    });
    conn.connect();
    var sql = `delete from software.member where id = ?`;
    console.log(`id :${id}`);
    conn.query(sql, [id], function(err, rows){
        if(!err){
            console.log("삭제 성공");
        }else{
            console.log(err.message);
            console.log("삭제 실패");       
        }
    });
    res.send("완료"); 
});
app.post('/Update', function(req,res){
    var id = req.body.id;
    var pw = req.body.pw;

    var conn = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : password,
        database : 'software'
    });
    conn.connect();
    var sql = `update software.member set pw = ? where id = ?`;
    console.log(`id :${id}pw :${pw}`);
    conn.query(sql, [pw, id], function(err, rows){
        if(!err){
            console.log("수정 성공");
        }else{
            console.log(err.message);
            console.log("수정 실패");       
        }
    });
    res.send("완료"); 
});
app.post('/OneSelect', function(req,res){
    var id = req.body.id;

    var conn = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : password,
        database : 'software'
    });

    conn.connect();
    var sql = `select * from software.member where id = ?`;
    conn.query(sql, [id], function(err, rows){
        if(!err){
            console.log("검색된 데이터 :", rows);
            for (var i = 0; i< rows.length; i++){
                console.log(`id :${rows[i].id}\npw :${rows[i].pw}\nname:${rows[i].nickname}`);
                console.log(`===============`);
            }
        }else{
            console.log(err.message);
            console.log("검색 실패");       
        }
    });
    res.send("완료"); 
});

app.listen(port, function(){
    console.log(`${port}포트로 서버 실행!`);
});