exports.template = (page, query)=>{

    return `<html>
    <head>
    <meta charset='utf-8'>
    </head>
    <body>
    <font size = 7; color = red>${page} PAGE!!</font>
    <br>사용자가 보내주는 QueryString1 : ${query.id}
    <br>사용자가 보내주는 QueryString2 : ${query.id2}
    </body>
    </html>`
}

exports.table = (data)=>{
    var txt = ''
    for(var i=1;i<=data;i++){
        txt +=`<th>${i}`
    }
    return txt;
}