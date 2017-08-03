<template>
<div>
  <div class="logInContainer">
    <div class="logInHeader">
      <img class="logo" :src='logoSrc' alt="logo"/>
    </div>      
    <div class="login">     
      <ul>
        <li>
          <input class="userName" v-model.trim='userName' type="text" placeholder="请输入用户名" maxlength="25"/>         
        </li>
        <li>
          <input class="password" v-model.trim='password' type="password" placeholder="请输入密码" maxlength="25" />
        </li>
        <li>
          <a href="javascript:void(0)" id="loginBtn" @click='login'>登&nbsp;录</a>        
        </li>
      </ul>
      <span class="logoInHint">*用户名或密码错误</span>
    </div>
    <div class="logInFooter">
      <p>
        为了您更好的使用体验和安全保障，我们推荐您使用：
             <a href="http://7u2led.com1.z0.glb.clouddn.com/Google%20Chrome.exe">谷歌浏览器</a>
      </p>
      <p>
        北京环宇万维科技有限公司 2006-2015 © 版权所有
      </p>
    </div>
  </div>
</div>
</template>

<script>

import axios from 'axios'
import Qs from 'qs'
export  default {
  data(){
      return {
        logoSrc:require('../static/images/logo.png'),
        userName:'',
        password:''
      }
  },
  methods:{
    login:function(){
      var _this=this;
       axios({
          method:'post',
          url:'http://javaport.bbtree.com/oa/user/login/',
          data:Qs.stringify({
              'username':_this.userName,
          'password':_this.password
          }),
          withCredentials: true, 
          headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
      }).then(function(res){
        var mess=res.data;
          if("000" === mess.code){
            console.log(mess.code)
              window.sessionStorage.setItem('name',mess.data.name);
              window.sessionStorage.setItem('loginName',mess.data.loginName);
              window.sessionStorage.setItem('roleCode',mess.data.roleCode);
              window.location.href = "./main.html";
            }
      });
    }
  },
  beforeCreate(){
      
  },
  created(){
  },
  mounted(){
    /*const that=this;
    $("#loginBtn").on('click', function(event) {
      event.preventDefault();

      var paramObj = getLoginParam();

      if(paramObj !== false){
        const url='/user/login/';
        const Data=paramObj;
        common.$post(url,Data,function(mess){
          if("000" === mess.code){
              window.sessionStorage.setItem('name',mess.data.name);
              window.sessionStorage.setItem('loginName',mess.data.loginName);
              window.sessionStorage.setItem('roleCode',mess.data.roleCode);
              window.location.href = "./main.html";
            }else{
              console.log("登录失败");
              $('.logoInHint').fadeIn(300).delay(2000).fadeOut(300)
          }

        })
        }
    })


      //获得的登录的参数
      function getLoginParam(){
        var userName = $.trim($(".userName").val()),
          password = $(".password").val();
        if(!userName || !password){
          alert("账户名或密码不能为空！");
          return false;
        }
        return {
          "username":userName,
          "password":password
        }
      }
      //捕获回车
      $(document).on('keydown', function(event) {
          if(13 === event.keyCode){
            $("#loginBtn").trigger('click');
          }
        });
*/
  },
   updated(){
  }

}


</script>

<style scoped>
html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
}
ul,li{
  list-style: none;
}
a{
  text-decoration: none;
}
div{
    display: block;
}
.logInContainer {
    height: 800px;
    position: relative;
}

.logInHeader {
    height: 375px;
    box-sizing: border-box;
    padding-top: 104px;
    background: #68c14d url('/static/images/cloud.png') no-repeat center 315px;
}

.logInHeader .logo {
    display: block;
    width: 220px;
    margin: auto auto;
}
.login {
    width: 440px;
    margin: auto auto;
    padding-top: 60px;
    line-height: 60px;
    position: relative;
}
.login li {
    text-align: center;
}
.login input {
  box-sizing: border-box;
    width: 315px;
    line-height: 40px;
    height: 40px;
    border: 1px solid #cccccc;
    border-radius: 15px;
    padding-left: 42px;
    outline: medium none;
    outline-color: white;
    text-align: center;
    
}
.login .userName {
    background: #fff url('/static/images/user.png') no-repeat 20px 10px;
    background-size: 16px 19px;
    text-align: left;
    background-color: rgb(250, 255, 189);
}
.login .password {
    background: #fff url('/static/images/lock.png') no-repeat 20px 10px;
    background-size: 16px 19px;
    text-align: left;
    background-color: rgb(250, 255, 189);
}
.login a {
  display: block;
    line-height: 38px;
    width: 315px;
    height: 38px;
    color: #fff;
    background-color: #68c14d;
    border-radius: 15px;
    margin-top: 30px;
    margin-left: 63px;
}

.login .logoInHint {
    color: red;
    position: absolute;
    top: 62px;
    right: -48px;
    font-size: 12px;
    display: none;
}
.logInFooter {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    width: 440px;
    margin: auto auto;
    font-size: 14px;
    overflow: hidden;
}
.logInFooter p {
    color: #cccccc;
    text-align: center;
    font-size: 12px;
    padding-bottom: 12px;
    word-wrap: break-word;
}


</style>