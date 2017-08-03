// import $ from './jquery-3.2.0.js'
//域名前缀
var config={
	  // apiDomain: "http://120.26.210.192:7155"// 数据地址
	  apiDomain: "http://javaport.bbtree.com/oa"// 数据地址

}


//封装的请求
var $json=function(zurl,zData,fn){
		$.ajax({
		  type: 'POST',
		  contentType: "application/json; charset=utf-8",
		  url: config.apiDomain+zurl,
		  xhrFields:{
			withCredentials:true
		  },
		  crossDomain: true,
		  data: JSON.stringify(zData),
		  success: function(mess,textStatus,xhr){
		  	if(mess.code=='888'){
		  		// alert('登录超时，请重新登录');
		  		window.location.href = "./index.html";
		  		return false;
		  	}else{
		  		fn(mess)
		  	}
			
		  },
		  error:function(err,textStatus,xhr){
		  	console.log(err);
		  },
		  statusCode: {
		  	/*200:function(e){
		  		console.log(e,'成功');
		  	}*/
		  },
		  dataType: "json"
		})
	};
var $form=function(zurl,zData,sucFn,befFn,errFn){
	$.ajax({
	url: config.apiDomain+zurl,
	type: "POST",
	data: zData,
	xhrFields:{
			withCredentials:true
		  },
		  crossDomain: true,
	cache: false,
	processData: false,
	contentType: false,
	beforeSend:function(){
		if(befFn){
			befFn();
		}
		
	},
	success: function(mess,textStatus,xhr) {
		if(mess.code=='888'){
		  		// alert('登录超时，请重新登录');
		  		window.location.href = "./index.html";
		  		return false;
		  	}else{
		  		sucFn(mess)
		  	}
	},
	error:function(err,textStatus,xhr){
		console.log(err);
		if(errFn){
			errFn()
		}
		
	}
	})

}
var $post=function(zurl,zData,fn){
	$.ajax({
		  type: 'POST',
		  url: config.apiDomain+zurl,
		  data: zData,
		  xhrFields:{
			withCredentials:true
		  },
		  crossDomain: true,
		  success: function(mess,textStatus,xhr){
		  	if(mess.code=='888'){
		  		// alert('登录超时，请重新登录');
		  		window.location.href = "./index.html";
		  		return false;
		  	}else{
		  		fn(mess);
		  	}
		  },
		  error:function(err,textStatus,xhr){
		  	console.log(err);
		  }
		});
}
var $get=function(zurl,zData,fn){
		$.ajax({
		  type: 'GET',
		  url: config.apiDomain+zurl,
		  data: zData || null,
		  xhrFields:{
			withCredentials:true
		  },
		  crossDomain: true,
		  success: function(mess,textStatus,xhr){
		  	if(mess.code=='888'){
		  		// alert('登录超时，请重新登录');
		  		window.location.href = "./index.html";
		  		return false;
		  	}else{
		  		fn(mess);
		  	}
		  },
		 error:function(err,textStatus,xhr){
		  	console.log(err);
		  }
		});
}

//sessionStrorage
	function saveSession(key,valStr){
		window.sessionStorage.setItem(key,valStr);
	}
	function getSession(key){
		return window.sessionStorage.getItem(key);
	}
	function removeSession(key){
		window.sessionStorage.removeItem(key);
	}
	function clearSessionAll(){
		window.sessionStorage.clear();
	}
//localStorage
	function saveLocal(key,valStr){
		window.localStorage.setItem(key,valStr);
	}
	function getLocal(key){
		return window.localStorage.getItem(key);
	}
	function removeLocal(key){
		window.localStorage.removeItem(key);
	}
	function clearLocalAll(){
		window.localStorage.clear();
	}

//时间戳转换年月日
function timeToday(times){
	if(times=='' || times==null){
		return '';
	}
	return timesChange(times,1);
	//var regTime1=new Date(times)
	//return regTime1.toLocaleDateString().replace(/\//g, "-");
}
//时间戳转换年月日时分秒
function timeToSecond(times){
	if(times==''){
		return '';
	}
	return timesChange(times,2);
	//var regTime1=new Date(times)
	//return regTime1.toLocaleDateString().replace(/\//g, "-") + " " + regTime1.toTimeString().substr(0, 8);
}
//时间转换基础
function timesChange(times,flag){
	var date = new Date(times);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	var D = (date.getDate()+1 < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
	var h = (date.getHours()+1 < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
	var m = (date.getMinutes()+1 < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
	var s = (date.getSeconds()+1 < 10 ? '0'+(date.getSeconds()) : date.getSeconds()); 
	if(flag==1){
		return Y+M+D;
	}else{
		return Y+M+D+h+m+s;
	}
}
function time(box,fn,style,maxDate){
	 $(box).jeDate({
              isinitVal:true,
              ishmsVal:false,
              skinCell:"jedategreen",
              minDate: '1990-01-01 23:59:59',
              //maxDate: $.nowDate(0),
              maxDate: maxDate,
              format: style ||"YYYY-MM-DD",//YYYY-MM-DD hh:mm:ss
              zIndex:3000,
              okfun: function(elem,datas){
              fn(datas)
               },
              choosefun:function(elem, datas) {//选择日期
                fn(datas)
               },
	           clearfun:function(elem, val) {//清除按钮回调函数
	            var datas=null;
	            fn(datas)
	           }   
          });
	 
}


export default {
	config:config,
 	$json:$json,
 	$form:$form,
 	$post:$post,
 	$get:$get,
 	session:{
 		set:saveSession,
 		get:getSession,
 		remove:removeSession,
 		clear:clearSessionAll
 	},
 	local:{
 		set:saveLocal,
 		get:getLocal,
 		remove:removeLocal,
 		clear:clearLocalAll
 	},
 	Timestamp:{
 		day:timeToday,
 		second:timeToSecond
 	},
 	time:time



}