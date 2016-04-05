<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>看房签约-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/css/weixin/vRentFlow.css">
</head>
<body>
<div class="main">
    <h2>
       在线签约
    </h2>
    <c:choose>
    	<c:when test="${pInfo.contractStatus == -6}">
			<div class="weui_msg">
		        <div class="weui_icon_area"><i class="zgIcon zgIcon-edit"></i></div>
		        <div class="weui_text_area">
		             <h3 class="weui_msg_title">在线签约</h3>
		             <p class="weui_msg_desc">点击在线签约按钮即可生成具有法律效益、不可篡改的租房合同。</p>
		        </div>
		        <div class="weui_opr_area">
		            <p class="weui_btn_area">
		                <a href="/ProgressOperation.action?goToOnlineSignPage&pid=${pid }&contractId=${pInfo.contractId}" onclick="$.redirectLoading();" class="weui_btn weui_btn_primary">在线签约</a>
		            </p>
		        </div>
		    </div>
    	</c:when>
    	<c:when test="${contractStatus == -6 && signResult == 'n'}">
			<div class="weui_msg">
		        <div class="weui_icon_area"><i class="zgIcon zgIcon-close-circle"></i></div>
		        <div class="weui_text_area">
		             <h3 class="weui_msg_title">签约失败</h3>
		             <p class="weui_msg_desc">在线签约失败，请稍刷新页面后后重试。</p>
		        </div>
		        <div class="weui_opr_area">
		            <p class="weui_btn_area">
		                <a href="###" class="weui_btn weui_btn_primary" id="reloadPage">刷新页面</a>
		            </p>
		        </div>
		    </div>
    	</c:when>
    	<c:when test="${pInfo.contractStatus == -7 || contractStatus == -7}">
		    <div class="weui_msg">
		        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
		        <div class="weui_text_area">
		            <h3 class="weui_msg_title">签约成功</h3>
		            <p class="weui_msg_desc">您已完成在线签约，请等待房东完成在线签约。</p>
		        </div>
		        <div class="weui_opr_area">
		            <p class="weui_btn_area">
		            	 <a href="${viewpdf_url }" class="weui_btn btns weui_btn_primary">查看合同</a>
		                <a href="${download_url }" class="weui_btn btns weui_btn_primary">下载合同</a>
		            </p>
		        </div>
		    </div>
     	</c:when>
    	<c:when test="${pInfo.contractStatus == 1}">
		    <div class="weui_msg">
		        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
		        <div class="weui_text_area">
		            <h3 class="weui_msg_title">签约成功</h3>
		            <p class="weui_msg_desc">双方均已完成在线签约。</p>
		        </div>
		        <div class="weui_opr_area">
		            <p class="weui_btn_area">
		                <a href="${pInfo.url[0]}" class="weui_btn weui_btn_primary">查看合同</a>
		                <a href="${pInfo.url[1]}" class="weui_btn weui_btn_primary">下载合同</a>
		            </p>
		        </div>
		    </div>
     	</c:when>
    </c:choose>
</div>
</body>
<script type="text/javascript">
	$(function() {
		$("#reloadPage").click(function() {
			$.showLoading("正在刷新页面");
			window.location.reload(true);
		});
	});
</script>
</html>