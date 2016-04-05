<%@ page language="java"  pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<title>找回密码-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="真格租房，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！北京房屋出租，北京房屋租赁"/>

<%@ include file="/zinclude/public.jsp"%>
<link href="/css/css/usercenter/verStep.css" rel="stylesheet" type="text/css">
</head>
<body>
<!--#include virtual="/zinclude/header.html"-->
<%-- <%@include file="/WEB-INF/include/header.jsp" %> --%>
<div id="main" class="shortPage">
      <div id="verContent" class='w-33' style='padding-bottom:20px;'>
        <h3>找回密码</h3>
        <ul class="step">
          <li class="on">1.发送验证</li>
          <li>></li>
          <li>2.重置密码</li>
        </ul>
        <form action="/EditUserInfo.action?checingCode" method="post" id="checking" class="form-inline">
           <div class="form-control">
                <label for="mobile2">需找回的帐号:</label>
                <input type="text" placeholder="请输入手机号" id="mobile2" name="loginId" nullmsg="请输入手机号" datatype="m" errormsg="请输入正确的手机号" ajaxurl="/Register.action?checkloginId&type=2" class="input-units-8"/>
               <button type="button" class="btn btn-primary hollowBtn" id="sendMobileValidCode2">发送验证</button>
               <span class="Validform_checktip"></span>
           </div>
           <div class="form-control">
                <label for="validCode2">收到的验证码:</label>
                <input type="text" placeholder="请输入验证码" name="checkCode" id="validCode2" datatype="s4-6" nullmsg="请输入收到的验证码"  errormsg="验证码输入错误" class="input-units-8">
                <button type="submit" class="btn btn-primary hollowBtn" id="check">验证</button>
                <span class="Validform_checktip" ></span>
           </div>
        </form>
</div>
</div>
<script type="text/javascript" src="/scripts/findpsw.js"></script>
<!--#include virtual="/zinclude/bottom.html"-->
</body>
</html>

