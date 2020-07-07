var conn = require('./config_database');
const session = require('express-session');

exports.loginCheck = function(req, res){
    var email = req.body.email;
    var pw = req.body.pw;
    var sql = `select * from software.WEB_MEMBER where email = ? and pw = ?`;
    conn.query(sql, [email, pw], function(err, rows){
        if(!err){
            if (rows.length != 0){
                console.log("로그인 성공")
                req.session.user = {
                    email : rows[0].email,
                    pw : rows[0].pw,
                    tel : rows[0].tel,
                    address : rows[0].address
                }

                
                console.log(`email :${req.session.user.email}\npw :${req.session.user.pw}\ntel:${req.session.user.tel}\naddress:${req.session.user.address}`);

                res.render('Message', {
                    user : req.session.user
                });
            }else{
                console.log("로그인 실패");
                delete req.session.user;
                res.render('message', {
                    user : null
                });  
            }
        }else{
            console.log("ERR실패");
        }
    }); // conn.end() // 자동실행
};
exports.join = function(req, res){
    var email = req.body.email;
    var pw = req.body.pw;
    var tel = req.body.tel;
    var address = req.body.address;

    var sql = `insert into software.WEB_MEMBER values(?, ?, ?, ?)`;
    console.log(`email :${email}\npw :${pw}\ntel:${tel}\naddress:${address}`);
    conn.query(sql, [email, pw, tel, address], function(err, rows){
        if(!err){
            console.log("입력 성공");
        }else{
            console.log(err.message);
            console.log("입력 실패");       
        }
    });
    res.render('Message',{

    });   
};
exports.Delete = function(req, res){
    var id = req.query.id;
    var sql = `delete from software.member where id = ?`;
    console.log(`id :${id}`);
    conn.query(sql, [id], function(err, rows){
        if(!err){
            console.log("삭제 성공");
        }else{
            console.log(err.message);
            console.log("삭제 실패");    
        }
        res.redirect('http://localhost:3000/AllSelect');
    });
};
exports.Update = function(req, res){
    var pw = req.body.pw;
    var tel = req.body.tel;
    var addr = req.body.address;
    var sql = `update software.web_member set pw = ?, tel = ?, address = ? where email = ?`;
    conn.query(sql, [pw, tel, addr, req.session.user.email], function(err, rows){
        if(!err){
            req.session.user = {
                email : req.session.user.email,
                pw : pw,
                tel : tel,
                address : addr
            }
            console.log("수정 성공");
        
        }else{
            console.log(err.message);
            console.log("수정 실패");       
        }
    });
    res.render('Message', {
        user : req.session.user
    });
};
exports.AllSelect = function(req, res){
    var conn = require('./config_database.js');
    var sql = `select * from software.member`;// where id = ?`;
    conn.query(sql, function(err, rows){
        if(!err){
            res.render('AllSelect', {
                rows : rows,
                user : req.session.user
            });

        }else{
            console.log(err.message);
            console.log("검색 실패");       
        }
    });
    // res.send("완료"); 
};