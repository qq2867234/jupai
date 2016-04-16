<%@ page language="java" import="java.util.HashMap" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<title>订单详情 - 居派</title>
	
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta name="keywords" content="居派，短租，住宿"/>
	<meta name="description" content="居派青年空间是带有移动互联网属性的短期住宿产品，是可链接各类外部服务的集“自助入住退房、主题化风格、创意家居植入、空间社交”于一身的点式微生活中心。"/>
	
	<link href="/css/public/global.css" rel="stylesheet"> 
	<link href="/css/public/font-awesome.min.css" rel="stylesheet">
	<link href="/css/order/orderDetial.css" rel="stylesheet">
	
</head>

<body>
<article>
	<!--共公共头部-->
	<header>
	    <nav>
	      <div class="title list-top">
	        	订单详情
	      </div>
	      <a class="back left" rel="nofollow" href="javascript:backleft();"></a> 
	    </nav>
	</header>
	<!--共公头部结束-->

	<input type="hidden" id="roomId" value="850253366">
	<article class="order-vc details" style="min-width:297px;">
		<b class="de-wz">
			订单号：850582388
			<input type="hidden" id="orderId" value="850582388">
		</b>
		<b class="de-wz">订单状态：<span style="color:#22bb62">支付超时已取消</span></b>
		<aside class="list title">
			<b class="vc-b ">房间名：《鸟语花香》</b>
		</aside>
	    <aside class="list room map">
	    	<div id="reportrange01" class="btn" style="display: inline-block; cursor: pointer; width:100%; padding:0px; text-align:left;">
	            <span>
	                <b>
	                    <font>入&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;住：</font>
	                    <em id="startdate">2016-04-10</em>
	                </b>
	                <b>
	                    <font>离&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开：</font>
	                    <em id="enddate">2016-04-11</em>
	                </b>
	            </span>
	        </div>
	        <div class="show-w">共<em id="totalDays"> 1 </em>晚</div>
	    </aside>
	    <aside class="room money">
	    	<p>房价总额：￥788</p>
	    	<p>预付订金：￥788</p>
	    </aside>
	   
	    <aside class="list room iphone"><b>联系人：<font>吕越彬</font></b></aside>
	    <aside class="list room iphone" style="border-top: none;"><b>手机号：<font>13141350209</font></b></aside>
	    <aside class="tuikuan">
	    		<i>入住日前1天取消，可全额退款</i>
	    </aside>
	    <aside class="border-top">
			<a class="btn-default">查看入住指南</a>
		</aside>
	</article>
</article>
</body>
</html>