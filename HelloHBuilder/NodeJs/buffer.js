var buf = new Buffer(256);
var len = buf.write("www.runoob.com");

console.log("写入字节数："+len+"\n");

console.log(buf.toString('utf8',0,14));


var buf1 = new Buffer('www.runoob.com');
var json = buf1.toJSON(buf1);
console.log(json);

var buf2 = Buffer.concat([buf,buf1]);
console.log(buf2.toString());



