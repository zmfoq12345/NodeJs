var express = require('express');
var app = express();
var port = 3000;

app.get('/', function(req, res){
    res.send('index 페이지..');

});

app.post('/', function(req, res){
    res.send('index 페이지..');
})

app.listen(port, function(){
    console.log("1");
});