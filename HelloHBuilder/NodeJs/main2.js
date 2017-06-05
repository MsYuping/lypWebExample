//事件驱动程序处理IO
var events = require("events");
//创建事件发射器对象
var eventEmitter =new events.EventEmitter();
//创建事件处理程序
var connectHandler = function connected(){
	console.log("连接成功");
	
	//触发事件
	//eventEmitter.emit("data_received");
}
eventEmitter.on("connection",connectHandler);

eventEmitter.emit("connection");

console.log("程序执行完毕");


