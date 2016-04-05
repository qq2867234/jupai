<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>登录-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>

<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/css/weixin/vLogin.css">
</head>
<body>
<div class="main">
    <h1>真格租房
        <img src="/images/public/LOGO_20160311_3.png" alt="真格租房" />
    </h1>
    <input type="hidden" id="redirectUrl" name="redirectUrl" value="${redirectUrl }"/>
    
    <form id="loginForm" action="/Login.action?login" method="post">
    	<input type="hidden" id="loginopenid" name="openId" value="${openid }"/>
        <div class="weui_cells weui_cells_form loginForm">
          <div class="weui_cell">
            <div class="weui_cell_hd"><label class="weui_label zgIcon zgIcon-user"></label></div>
            <div class="weui_cell_bd weui_cell_primary">
                <input class="weui_input" type="tel" autocomplete="off" placeholder="手机号" ignore="ignore" maxlength="11" name="loginId" id="loginId" sucmsg="" nullmsg="请输入手机号" datatype="m|e" errormsg="请输入正确的手机号"  />
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_hd"><label class="weui_label zgIcon zgIcon-lock"></label></div>
            <div class="weui_cell_bd weui_cell_primary">
                <input class="weui_input" type="password" autocomplete="off" placeholder="密码" ignore="ignore" maxlength="16" name="password2" id="password" sucmsg="" nullmsg="请输入密码" altercss="gray" datatype="password" errormsg="请输入6-16位数字或字母" />
            </div>
          </div>
          <div class="weui_cell weui_vcode hide" id="codeInfo">
            <div class="weui_cell_hd"><label class="weui_label zgIcon zgIcon-shield"></label></div>
            <div class="weui_cell_bd weui_cell_primary">
                <input type="text" class="weui_input" autocomplete="off" ignore="ignore" name="code" id="checkCodeStr" datatype="s4-4" placeholder="图片验证码" nullmsg="请输入验证码" errormsg="请输入正确的验证码"/>
            </div>
            <div class="weui_cell_ft" id="codeArea">
            	
            </div>
          </div>

          <div class="validform hide"><span class='zgIcon zgIcon-info-circle'></span><b class='Validform_checktip logcheck'></b></div>
          <div class="weui_btn_area">
            <button id="logins" class="weui_btn weui_btn_primary">登录</button>
          </div>
          <div class="weui_cells_tips">
              <!-- <a href="###" class="forget">忘记密码?</a> -->
              <a href="###" class="signinBtn">免费注册</a>
          </div>
        </div>
    </form>
    <form id="regForm" action="/Register.action?reg" method="post">
    	<input type="hidden" id="regopenid" name="openId" value="${openid }"/>
        <div class="weui_cells weui_cells_form">
          <div class="weui_cell">
            <div class="weui_cell_hd"><label class="weui_label zgIcon zgIcon-user"></label></div>
            <div class="weui_cell_bd weui_cell_primary">
                <input type="tel" autocomplete="off" maxlength="11" datatype="m" placeholder="手机号" ignore="ignore" name="loginId" ajaxurl="/Register.action?checkloginId&type=3" id="regId" sucmsg="" nullmsg="请输入登录名" datatype="e|m" errormsg="请输入正确的手机号" class="weui_input"/>
            </div>
          </div>
         <!--  <div class="weui_cell">
            <div class="weui_cell_hd"><label class="weui_label zgIcon zgIcon-lock"></label></div>
            <div class="weui_cell_bd weui_cell_primary">
                <input type="password" autocomplete="off" name="password2" ignore="ignore" placeholder="请输入6-16位密码" sucmsg="" nullmsg="请输入密码" id="password2" altercss="gray" datatype="password" errormsg="请输入6-16位数字或字母" class="weui_input"/>
            </div>
          </div> -->
          <div class="weui_cell weui_vcode">
            <div class="weui_cell_hd"><label class="weui_label zgIcon zgIcon-shield"></label></div>
            <div class="weui_cell_bd weui_cell_primary">
                <input type="text" autocomplete="off" class="weui_input" name="password2" ignore="ignore" id="validCode" datatype="s6-6" placeholder="初始密码" nullmsg="请输入初始密码" errormsg="请输入正确的初始密码"/>
            </div>
            <div class="weui_cell_ft weui_cell_btn">
                <button type="button" class="weui_btn weui_btn_default" id="sendMobileValidCode">获取初始密码</button>
            </div>
          </div>
          <div class="weui_cell weui_cell_select">
            <div class="weui_cell_bd weui_cell_primary">
              <select class="weui_select" name="role" id="ranking">
                <option value="0">请选择身份</option>
                <option value="1">租客</option>
                <option value="3">房东</option>
              </select>
            </div>
          </div>
          <div class="validform hide"><span class='zgIcon zgIcon-info-circle'></span><b class='Validform_checktip regcheck'></b></div>

          <div class="weui_btn_area">
            <button id="reg" class="weui_btn weui_btn_primary">免费注册</button>
          </div>
          <div class="weui_cells_tips">
              <a href="###" class="loginBtn">已有账户登录</a>
          </div>
        </div>
    </form>
</div>

</body>
<script type="text/javascript" src="/scripts/Validform_v5.3.2.js"></script>
<script type="text/javascript" src="/scripts/weixin/vLogin.js"></script>
<script type="text/javascript" src="/scripts/uhome/MobileValidCode.js"></script>
</html>