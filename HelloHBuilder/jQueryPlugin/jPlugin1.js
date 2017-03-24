/**
 * a) 避免全局依赖。 
 * b) 避免第三方破坏。 
 * c) 兼容jQuery操作符'$'和'jQuery ' 
 */

/*(function($){
	//code in here
	
})(jQuery);*/


alert(fn()); //输出Helloworld!    
 
function fn() {
return 'Helloworld!';
}





