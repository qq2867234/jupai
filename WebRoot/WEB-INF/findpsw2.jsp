<%@ page language="java"  pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
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
<div id="main" class="shortPage">
      <div id="verContent" class='w-33' style='padding-bottom:20px;'>
        <h3>找回密码</h3>
        <ul class="step">
          <li>1.发送验证</li>
          <li>></li>
          <li class="on">2.重置密码</li>
        </ul>
        <form action="/EditUserInfo.action?changePwdForBack" id="getBack" method="post" class="form-inline">
            <div class="form-control">
                <label for="password2">新密码:</label>
                <input type="password" name="password2" placeholder="6-16位数字或字母" nullmsg="请输入新密码" datatype="password" errormsg="请输入6-16位数字或字母" id="password2" >
                <span class="Validform_checktip"></span>
            </div>
            <div class="btn-group">
                <button type="submit" class="btn btn-primary btn-only">确定</button>
            </div>
        </form>
      </div>
</div>
<script type="text/javascript" src="/scripts/findpsw.js"></script>
<!--#include virtual="/zinclude/bottom.html"-->
</body>
</html>