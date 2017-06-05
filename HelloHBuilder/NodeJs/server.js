var http = require ("http");
http.createServer(function(request,response){
	//发送http头部
	//http状态值200 为OK
	//内容类型：text/plain
	response.writeHead(200,{'Content-Type':'text/plain'});
    //发送响应数据
    response.end("Hello World \n");
}).listen(8888);

//终端打印如下：
console.log('server running at http://localhost:8888');