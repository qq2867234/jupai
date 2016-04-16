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
          	<c:if test="${empty orderList }">
          		<div style="width:100px; text-align: center; font-size:16px; margin: 50px auto">暂无订单</div>
          	</c:if>
          <div class="order-list">
            <ul>
            	<c:forEach items="${orderList }" var="order">
		            <li class="normal">
		            	<div>
		            		<a class="title mark" href="/Search.action?goToRoomDetailPage&roomId=${order.roomId }">房间名：《${order.roomName }》</a> 
		            		<div class="clearfix">
				            	<label class="clear">地址：${order.address }</label>
				            	<label class="fl">联系人：${order.name }</label>
				            	<label class="fr">入住日期：${order.checkInDay }</label>
				            	<label class="clear-left fl">手机号：${order.mobile }</label>
				            	<label class="fr">退房日期：${order.checkOutDay }</label>
				            </div>
				            <div class="clearfix" style="border-top: 1px solid #e1e1e1; padding-top:5px;margin-top:5px;">
				            	<div>订单编号：${order.orderId }</div>
		            			<div>订单金额：￥<b class="c-f60 f-14">${order.amount }</b></div>
				            	<div>订单状态：<b class="success f-14 ">${order.status }</b></div>
				            </div>
		            		<div class="total" style="height:auto; overflow:hidden;">
		            			<a class="order-list-btn fr" href="/Order.action?goToCheckInGuidePage&roomId=${order.roomId }">入住指南</a>
		            			<c:if test="${order.payStatus == 1 }">
		            			<a class="order-list-btn fr refund" onclick="$('.confirmDialog').show();" orderId="${order.orderId }" style="margin-right: 10px; background-color: #ff6600">申请退订</a>
		            			</c:if>
		            		</div>
		            	</div>
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
<div class="confirmDialog" style="display:none;">
     <div class="confirm-shadow"></div>
     <div class="confirm-content">
         <b>确定要申请退订吗？</b>
         <a onclick="$('.confirmDialog').hide();">取消</a><a onclick="refund()">确定</a>
       </div>
</div> 
<style>
/* 弹出层 */
.confirmDialog{ position:fixed; width:100%; height:100%; display:block; z-index:10000; top:0px;}	
.confirmDialog .confirm-shadow{ width:100%;height:100%; background:#000;opacity:0.5;}
.confirmDialog .confirm-content{  background:#FFF; position:absolute; left:50px; right:50px; top:50%; margin-top:-50px; border-radius:5px; padding:20px 0px 0px 0px;}
.confirmDialog .confirm-content b{ display:block; text-align:center; border-bottom:1px #e1e1e1 solid; padding-bottom:20px;}
.confirmDialog .confirm-content a{ float:left; width:50%; text-align:center; border-right:1px #e1e1e1 solid; margin:0px 0px 0px -1px; line-height:40px; color:#2eb657;}
.confirmDialog .confirm-content a:last-child{ border:none;}
</style>
<script src="/scripts/public/jquery-1.9.1.min.js"></script>
<script type="text/javascript">
var $refundBtn;
$(function(){
	$(".refund").click(function(){
		$refundBtn = $(this);
		$(".confirmDialog").show();
	});
});
function refund() {
	if($refundBtn == undefined) return;
	$.post("/Order.action?applyRefund&orderId="+$refundBtn.attr("orderId"), function(data){
		$(".confirmDialog").hide();
		if(data.status == "1") {
			$refundBtn.hide();
			$refundBtn.parent().prev().find(".success").text("申请退订中");
			alert("申请成功");
		}else{
			alert(data.info);
		}
	});
}
</script>
</body>
</html>