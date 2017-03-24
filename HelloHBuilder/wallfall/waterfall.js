Waterfall = function() {
	this.init.apply(this, arguments);
};
Waterfall.prototype = {
	init: function(parentName, cofig) {
		this.container = document.getElementById(parentName);
		this.config = config;
		this.lastImgIndex = 0;
		this.insertImgs();
	},
	insertImgs: function() {
		var dataImag = this.config.dataImgs;
		//获取div层中的最小高度
		var _perLoadCount = this.config.perLoadCount?this.config.perLoadCount:20;
		var _endImgIndex = dataImag.length;
		if(this.lastImgIndex+_perLoadCount<dataImag.length){
			_endImgIndex = this.lastImgIndex+_perLoadCount;
		}
		for (var i=this.lastImgIndex;i<_endImgIndex;i++) {
			var imgUrl = "images/" + dataImag[i];
			var pinDiv = document.createElement("div");
			pinDiv.setAttribute("class", "pin");
			var boxDiv = document.createElement("div");
			boxDiv.setAttribute("class", "box");
			var imgEle = document.createElement("img");
			imgEle.setAttribute("src", imgUrl);

			pinDiv.appendChild(boxDiv);
			boxDiv.appendChild(imgEle);
			this.container.appendChild(pinDiv);
		}
		this.lastImgIndex = _endImgIndex;
		setTimeout(this.resetPosition(), 400);
	},
	resetPosition: function() {
		var boxArray = this.getClassObj("pin");
		
		//var boxArray = this.container.getElementsByClassName("pin");
		//默认铺满整个屏
		var iPinW = boxArray[0].offsetWidth;
		var num = Math.floor(document.documentElement.clientWidth / iPinW);
		this.container.style.cssText = "width:" + iPinW * num + "px;margin:o auto;";
		var boxArrIndex = [];
		for (var i = 0; i < boxArray.length; i++) {
			var oH = boxArray[i].offsetHeight;
			if (i < num) {
				//此处限制此属性后，resize放大后，界面正常。去掉后，不正确
				boxArray[i].style.position = 'static';
				boxArray[i].getElementsByTagName("img")[0].setAttribute("title","offsetH ="+oH);
				boxArrIndex[i] = oH;
			} else {
				var minHeight = Math.min.apply(null, boxArrIndex);
				var minI = this.getMinBoxIndex(boxArrIndex, minHeight);
				boxArray[i].getElementsByTagName("img")[0].setAttribute("title","offsetH ="+minHeight);
				boxArray[i].style.cssText = "position:absolute;top:" + minHeight + "px;left:"+boxArray[minI].offsetLeft + "px";
				boxArrIndex[minI] += oH;
			}
		}
	},
	checkscrollside: function() {
		var aPin = this.getClassObj('pin');
		var lastPinH = aPin[aPin.length - 1].offsetTop + Math.floor(aPin[aPin.length - 1].offsetHeight / 2); //创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var documentH = document.documentElement.clientHeight; //页面高度
		//console.log("lastPinH="+lastPinH+";b="+(scrollTop + documentH))
		return (lastPinH < scrollTop + documentH) ? true : false; //到达指定高度后 返回true，触发waterfall()函数
	},
	getMinBoxIndex: function(arr,minH) {
		for (var i in arr) {
			if (arr[i] == minH) return i;
		}
	},
	getClassObj: function(className) {
		var obj = this.container.getElementsByTagName('*'); //获取 父级的所有子集
		var pinS = []; //创建一个数组 用于收集子元素
		for (var i = 0; i < obj.length; i++) { //遍历子元素、判断类别、压入数组
			if (obj[i].className == className) {
				pinS.push(obj[i]);
			}
		};
		return pinS;
	}
}