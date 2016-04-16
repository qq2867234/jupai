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
	
	<link href="/css/public/new_global.css" rel="stylesheet"> 
	<link href="/css/public/global.css" rel="stylesheet"> 
	  <style type="text/css">
	  .order-list li.overdue{background:#fff;}
	  </style>
</head>

<body>
<article>
    <div class="container b-e9e7e7">
     <header>
	    <nav>
	      <div class="title list-top">
	        	我的订单
	      </div>
	      <a class="back left" rel="nofollow" href="javascript:backleft();"></a> 
	    </nav>
	  </header>
      <div class="content">
        <div class="order-manage">
          <!-- <div class="user">用户：<span class="userName">nickname</span></div> -->
          	<c:if test="${empty orderList }">
          		<div style="width:100px; text-align: center; font-size:16px; margin: 50px auto">暂无订单</div>
          	</c:if>
          <div class="order-list">
            <ul>
            	<c:forEach items="${orderList }" var="order">
		            <li class="normal">
		            	<a href="###">
		            		<p class="title">房间名：《${order.roomName }》</p> 
		            		<div class="address mark">${order.address }</div> 
		            		<div class="clearfix">
			            		<label class="fl">入住日期：${order.checkInDay }</label>
			            		<label class="fr">退房日期：${order.checkOutDay }</label>
		            		</div>
		            		<div class="total" style="height:auto; overflow:hidden;">
		            			<span class="fl" style="height:34px;">订单金额：￥<b class="c-f60 f-14">${order.amount }</b></span>
		            			<span class="fr wait-conf mark">${order.status }</span>
		            		</div>
		            	</a>
		            </li>
            	</c:forEach>
            </ul>
          	<!-- <a class="btn-more" style="display: none;">点击加载更多</a>
          	<span class="loading" style="display: none;"></span> -->
          </div>
        </div>
      </div>
    </div>
</article>

<script src="/scripts/public/jquery-1.9.1.min.js"></script>
</body>
</html>