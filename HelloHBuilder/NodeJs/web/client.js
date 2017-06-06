//注意有可能会出现端口占用的情况，使用命令查看端口是否已经被占用
var http = require('http');

var options = {
	host:'localhost',
	port:'1982',
	path:'/index.html'
};

var callback = function(response){
	var body = '';
	response.on('data',function(data){
		body+=data;
	});
	response.on('end',function(){
		console.log(body);
	});
}



var req = http.request(options,callback);
req.end();

console.log("client�������");
