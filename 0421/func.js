function call1(){
    console.log("Call1 호출!");
}
var call2 = function(){
    console.log("Call2 호출!");
}

call1();
call2();

var call3 = function(){
    return "Hello";
}

var res = call3();

console.log(res);