var events = require("events");
var eventEmitter = new events.EventEmitter();

//监听器 #1
var listener1 = function listener1(){
	console.log('监听器listener1执行');
}
//监听器#2
var listener2 = function listener2(){
	console.log('监听器listener2执行');
}

eventEmitter.addListener("connection",listener1);

eventEmitter.on("connection",listener2);

var listenCount = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(listenCount+"===");


eventEmitter.emit('connection');

eventEmitter.removeListener('connection',listener2);
console.log("listener2不再受监听");

eventEmitter.emit('connection');
listenCount = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(listenCount+"===");



console.log("程序执行完毕");
