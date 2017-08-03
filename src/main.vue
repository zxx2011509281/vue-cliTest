<template>
<div class='all '>
	<div class='contentCenter '>
		<div class="logoTop">
			<div class='logo1'></div>
			<div class='userName'>super</div>
			<div class='logoOut'></div>
		</div>
		<div class="main ">
			<div class="nav"> 
				<ul class="navMain"> 
					<li v-for="menusItem in menus">
						<router-link v-if="menusItem.childMenus==''" :to="{path:menusItem.url}"
								>{{menusItem.name}}</router-link>
						<!-- <span v-else class="sj">{{menusItem.name}}</span> -->
						<router-link v-else class="sj" :to="{path:menusItem.url}"
								>{{menusItem.name}}</router-link>		
						<ul class='upgrade' v-for='(item,index) in menusItem.childMenus'>
							<li class=''>
								<router-link v-if="item.childMenus==''"  :to="{path:(item.url),params:{id:(item.url)}}"
								>{{item.name}}</router-link>
								<router-link v-else class="sj"  :to="{path:(item.url),params:{id:(item.url)}}"
								>{{item.name}}</router-link>
								<ul class='upgrade' v-for='(item2,index) in item.childMenus'>
									<li class=''>
										<router-link :to="{path:(item2.url),params:{id:(item2.url)}}"
										>{{item2.name}}</router-link>
									</li>
								</ul>
							</li>
						</ul>  
					</li>
				</ul> 
			</div>
		</div>

	   <div class='router '>
			<keep-alive><router-view></router-view></keep-alive>
	   </div>
	</div>
</div>
</template>

<script>
import axios from 'axios'
import $ from '../static/js/jquery2.js'
export  default {
	data(){
		  return {
		    fold:{},
		    menus:{},
		    childMenus:{}
		    

		  }
	},
	methods:{
	},
	beforeCreate(){
			
	},
	created(){
		const that=this;
		//获取对应用户可以查看权限
		//const url='/manager/user/menus';
		/*const url='/user/menus';
		const Data={};
		common.$post(url,Data,function(data){
			if(Object.prototype.toString.call(data) === "[object String]"){
				if(JSON.parse(data).code=='888'){
					//上线的时候开启
					// alert('登录超时，请重新登录');
					window.location.href = "./index.html";
				}
				return false;
			}
			that.menus=data.data.menus;
		})*/

		$.ajax({
		  type: 'POST',
		  url: 'http://javaport.bbtree.com/oa/user/menus',
		  data: {},
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
		  		that.menus=mess.data.menus;
		  	}
		  },
		  error:function(err,textStatus,xhr){
		  	console.log(err);
		  }
		});

	},
	mounted(){
		const that=this;
		//显示用户
		// $('.userName').text(common.session.get('name'));
		$('.userName').text( window.sessionStorage.getItem('name'));

		
		//添加activity样式
		$('.nav').on('click','.navMain>li>span',function(){
			$(this).parent().toggleClass('activity');
		})

		$('.nav').on('click','.navMain>li>a',function(){
			$(this).parent().toggleClass('activity');
			sjIF(this);
		})


		/*第三极菜单start*/
		$('.nav').on('click','.navMain>li>ul>li>a',function(){
			$(this).parent().toggleClass('activity');
			sjIF(this);
		})

		//点击软件升级下的li标签添加样式，并去掉其他样式
		$('.nav').on('click','.navMain>li>ul>li>ul>li>a',function(){
			// $(".navMain>li>ul>li>ul>li>a").parent().toggleClass('activity');
			// $(this).parent().addClass('activity');
			$(this).parent().toggleClass('activity');
			sjIF(this);
		})

		/*第三极菜单end*/

		//三角形是否更换
		function sjIF(_this){
			if($(_this).hasClass('sj')){
				$(_this).removeClass('sj').addClass('dsj');
			}else if($(_this).hasClass('dsj')){
				$(_this).removeClass('dsj').addClass('sj');
			}
		}


		//添加color样式
		$('.nav').on('click','.navMain>li>a',function(){
			$(".navMain>li>a").parent().removeClass('color');
			// $(".navMain>li>ul>li>a").parent().removeClass('activity');
			$(this).parent().addClass('color');
		})
		//点击软件升级下的li标签添加样式，并去掉其他样式
		$('.nav').on('click','.navMain>li>ul>li>a',function(){
			// $(".navMain>li>ul>li>a").parent().removeClass('activity');
			// $(".navMain>li>ul>li>ul>li>a").parent().removeClass('activity');//去掉三级菜单样式
			$(".navMain>li>a").parent().removeClass('color');
			// $(this).parent().addClass('activity');
			
		})
		//登出
		$('.logoOut').click(function(){
			/*const url='/user/logout';
			const Data=''
			common.$post(url,Data,function(mess){	
				if(mess.code=='000'){
					alert('退出成功')
					window.location.href = "./index.html";
				}
				
			})*/
				$.ajax({
					  type: 'POST',
					  url: 'http://javaport.bbtree.com/oa/user/logout',
					  data: '',
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
					  		if(mess.code=='000'){
								alert('退出成功')
								window.location.href = "./index.html";
							}
					  	}
					  },
					  error:function(err,textStatus,xhr){
					  	console.log(err);
					  }
					});
			
		})

		
	},
	 updated(){//数据改变触发
    	//this.$router.push({aaa:this.isSelect})
  }

}


</script>

<style scoped>
ul,li{
	list-style: none;
}

.all{
    background: #f7f7f7;
    box-sizing:border-box;
}
/*版心*/
.contentCenter{
	position:relative;
	width:1200px;
	margin:0 auto;
	min-height:900px;
}

/*logo*/
.logoTop{
	position:relative;
	height: 90px;
	background-color: #19b36a;
	margin-bottom:29px;
	padding-right:72px;
}
/*路由位置*/
.router{
	position:absolute;
	display:inline-block;
	border:1px solid #EDEDED;
	margin-left:-6px;
	width:990px;
	top:119px;
	left:215px;
	background-color:#fff;
}
/*导航开始*/
.main{
	display:inline-block;
	width:209px;
	position:absolute;
	left:0;
	top:119px;
}
.nav {
   
}

/*软件升级start*/
.nav ul.navMain>li.activity>ul {
    display: block;
    margin-top:-2px;
}

.nav ul.navMain>li>ul {
    display: none;
}



/*第一个li标签*/
.navMain>li{
	outline:1px solid #EDEDED;
}
span,a{
	padding:0;
}
span:hover,a:hover{
	cursor:pointer;
}
.navMain>li li,.navMain>li span,.navMain>li a{
	box-sizing: border-box;
	width: 209px;
	/*height: 45px;*/
	line-height: 45px;
	background-color: #fff;
	padding-left:45px;
	text-align: left;
	font-size: 14px;
    font-family: "Regular";
    color:#999999;
}
.navMain>li span,.navMain>li>a{
	width:100%;
	height:100%;
	display: inline-block;
	color:#999999;
	margin: 0;
	text-decoration: none;
}
.nav ul.navMain>li ul a {
    color: #333;
    text-decoration: none;
}
.nav>ul.navMain>li>ul>li>a:hover{
    background-color: #28d19d;
    color: #fff;
}
.nav ul.navMain>li>ul>li.activity>a {
    color: #fff;
    background-color: #28d19d;    
} 
.nav ul.navMain>li>ul>li.activity {
    background-color: #28d19d;
    color: #fff;
}
a{
	display: inline-block;
	width: 100%;
    height: 96%;
    margin-left: -45px;
    padding-left: 45px; 
}
.logo1{
	width:135px;
	height:54px;
	position:absolute;
	left:30px;
	top:18px;
	background:url('/static/images/img.png') 0 -29px no-repeat;
}

.userName{
	position:absolute;
	right:85px;
	top:0px;
	height: 90px;
    line-height: 90px;
    font-size: 20px;
    color:#fff;
}
.logoOut{
	cursor:pointer;
	width:72px;
	height:90px;
	position:absolute;
	right:0;
	top:0px;
	background:url('/static/images/img.png') -140px 0 no-repeat;
}
/*软件升级end*/



/*第三极菜单start*/
.nav ul.navMain>li.activity>ul>li.activity>ul {
    display: block;
    margin-top:-2px;
    margin-left: -45px;
}
.nav ul.navMain>li.activity>ul>li>ul {
    margin-top:-2px;
    margin-left: -45px;
}

.nav ul.navMain>li>ul>li>ul {
    display: none;
}
.nav ul.navMain>li>ul>li>ul>li>a:hover {
    background-color: pink;
    color: #fff;

}

.nav ul.navMain>li>ul>li>ul>li.activity>a {
    color: #fff;
    background-color: pink;
    
}  
.navMain>li>ul>li>a{
	padding-left:60px;
}
.navMain>li>ul>li>ul>li>a{
	padding-left:75px;
}
.nav ul.navMain>li>a.sj,.navMain>li>ul>li>a.sj,.navMain>li>ul>li>ul>li>a.sj{
    color: #999;

    background: #fff url(/static/images/sjx.png) no-repeat 178px 18px;
    background-size: 9px 9px;
}
.nav ul.navMain>li>a.dsj,.navMain>li>ul>li>a.dsj,.navMain>li>ul>li>ul>li>a.dsj{
    color: #999;

    background: #fff url(/static/images/sjx2.png) no-repeat 178px 18px;
    background-size: 9px 9px;
}
/*第三极菜单end*/

/*三角形*/
.nav ul.navMain>li>span.sj{
    color: #999;
    background: #fff url('/static/images/sjx.png') no-repeat 178px 18px;
}
.nav ul.navMain>li>span.dsj{
    color: #999;
    background: #fff url('../static/images/sjx2.png') no-repeat 178px 18px;
}
.nav ul.navMain>li.activity>span,.nav ul.navMain>li.activity>a {
    color: #999;
    
}
.nav ul.navMain>li.color>span,.nav ul.navMain>li.color>a {
    color: #fff;
    background-color: #78ba32;
}

</style>