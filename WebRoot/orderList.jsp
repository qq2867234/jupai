<%@ page language="java" import="java.util.HashMap" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<title>我的订单 - 居派</title>
	
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta name="keywords" content="居派，短租，住宿"/>
	<meta name="description" content="居派青年空间是带有移动互联网属性的短期住宿产品，是可链接各类外部服务的集“自助入住退房、主题化风格、创意家居植入、空间社交”于一身的点式微生活中心。"/>
	
	<link href="/css/order/orderList.css" rel="stylesheet"> 
</head>

<body>
<article>
    <div class="container b-e9e7e7">
     <header>
	    <nav>
	      <div class="title list-top">我的订单</div>
	      <a class="back left" rel="nofollow" href="javascript:history.back();"></a> 
	    </nav>
	  </header>
      <div class="content">
        <div class="order-manage">
          <div class="order-list">
            <ul>
		            <li class="normal">
		            	<div>
		            		<a class="title mark">房间名：《${order.roomName }》</a>
		            		<div class="clearfix">
				            	<label class="clear">地址：${order.address }</label>
				            	<label class="fl">联系人：${order.name }</label>
				            	<label class="fr">入住日期：${order.checkInDay }</label>
				            	<label class="clear-left fl">手机号：${order.mobile }</label>
				            	<label class="fr">退房日期：${order.checkOutDay }</label>
				            </div>
				            <div class="clearfix" style="border-top: 1px solid #e1e1e1; padding-top:5px;margin-top:5px;">
				            	<div>订单编号：${order.orderId }</div>
		            			<div>订单金额：￥<b class="c-f60 f-14">178</b></div>
				            	<div>订单状态：<b class="success f-14">已付款</b></div>
				            </div>
		            		<div class="total" style="height:auto; overflow:hidden;">
		            			<a class="order-list-btn fr">入住指南</a>
		            			<a class="order-list-btn fr" style="margin-right: 10px; background-color: #ff6600">申请退订</a>
		            		</div>
		            	</div>
		            </li>
            </ul>
          	<!-- <a class="btn-more" style="display: none;">点击加载更多</a>
          	<span class="loading" style="display: none;"></span> -->
          </div>
        </div>
      </div>
    </div>
</article>
</body>
</html>