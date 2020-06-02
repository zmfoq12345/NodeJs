var conn = require('./config_database')

exports.loginCheck = function(req, res){
    var id = req.body.id;
    var pw = req.body.pw;
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
    }); // conn.end() // 자동실행
};
exports.join = function(req, res){
    var id = req.body.id;
    var pw = req.body.pw;
    var name = req.body.nick;

    var sql = `insert into software.member values(?, ?, ?)`;
    
    console.log(`id :${id}\npw :${pw}\nname:${name}`);
    conn.query(sql, [id, pw, name], function(err, rows){
        if(!err){
            console.log("입력 성공");
        }else{
            console.log(err.message);
            console.log("입력 실패");       
        }
    });
    res.send("완료");   
};
exports.Delete = function(req, res){
    var id = req.body.id;
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
};
exports.Update = function(req, res){
    var id = req.body.id;
    var pw = req.body.pw;
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
};
exports.AllSelect = function(req, res){
    var id = req.body.id;
    var conn = require('./config_database.js');
    var sql = `select * from software.member`;// where id = ?`;
    conn.query(sql, [id], function(err, rows){
        if(!err){
            console.log("검색된 데이터 :", rows);
            res.write(`<html>`);
            res.write(`
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            </head>`);
            res.write(`<body>`);
            res.write(`<table border = "1">`);
            for (var i = 0; i< rows.length; i++){
                res.write(`<tr>`);
                res.write(`<td>`);
                //id :${rows[i].id}\npw :${rows[i].pw}\n
                res.write(`<h2>id${i+1} : ${rows[i].id}`);
                res.write(`<br>name${i+1} : ${rows[i].nickname}</h2>`);
                res.write(`</td>`);
                res.write(`</tr>`);
            }
            res.write(`</table>`);
            res.write(`</body>`);
            res.write(`</head>`);
            res.write(`</html>`);
            res.end();
        }else{
            console.log(err.message);
            console.log("검색 실패");       
        }
    });
    // res.send("완료"); 
};