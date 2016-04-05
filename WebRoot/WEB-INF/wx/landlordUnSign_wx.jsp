<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
<link rel="stylesheet" type="text/css" href="/css/css/weixin/vFlowList.css">
</head>
<body>
  <div class="main">
      <h2>我的洽谈</h2>
      <c:choose> 
        <c:when test="${unSignList.pages == 0 && signedList.pages == 0}">
		 <div class="weui_msg">
            <div class="weui_icon_area"><i class="zgIcon zgIcon-info-circle"></i></div>
            <div class="weui_text_area">
                <h3 class="weui_msg_title">暂无记录</h3>
            </div>
        </div>
	 </c:when>
     <c:otherwise>
	  <!-- 待签约 -->
      <div class="progress">
	  <c:forEach items="${unSignList.result }" var="contrast">
			<!-- 房源信息 -->
			<div class="house">
	          <strong>${contrast.residence_name }</strong>
	          <span class="houseInfo">${contrast.use_type }，${contrast.beds }室${contrast.baths}卫，${contrast.area }平，${contrast.price }元/月</span>
	          <c:if test="${not empty contrast.pay_type }">
					<span class="houseInfo">${contrast.pay_type }</span>
			  </c:if>
			  <!-- 租客信息 -->
			  <c:if test="${not empty contrast.b_mobile }">
	          		<a class="tel" href='tel:${contrast.b_mobile }'>租客：${contrast.b_name }，${contrast.b_mobile }</a>
	          </c:if>
        
	        <!-- 状态描述 -->
	        <c:if test="${not empty contrast.statusDesc }">
				<div class="status">${contrast.statusDesc }</div>
	        </c:if>
	        <!-- 可进行的操作 -->
	        <c:if test="${contrast.status == -1 }">
				<a href="/ProgressOperation.action?goToEditContractPage&pid=${contrast.pid }" class="btn">查看房屋检查单</a>
			</c:if>
			<c:if test="${contrast.status == -4 }">
				<a href="/ProgressOperation.action?goToEditContractPage&pid=${contrast.pid }" class="btn">查看房屋检查单</a>
			</c:if>
			<c:if test="${contrast.status == -5 }">
				<a href="/ProgressOperation.action?goToEditContractPage&pid=${contrast.pid }" class="btn">生成合同</a>
			</c:if>
			<c:if test="${contrast.status == -2 }">
				<a href="/ProgressOperation.action?goToPreviewContractPage&pid=${contrast.pid }&backto=2" class="btn">查看合同</a>
			</c:if>
			<c:if test="${contrast.status == -3 }">
				<a href="/ProgressOperation.action?goToEditContractPage&pid=${contrast.pid }" class="btn">修改合同</a>
			</c:if>
			<c:if test="${contrast.status == -6 }">
				<a href="/ProgressOperation.action?goToPreviewContractPage&pid=${contrast.pid }&backto=2" class="btn">查看合同</a>
			</c:if>
			<c:if test="${contrast.status == -7 }">
				<a href="/ProgressOperation.action?goToOnlineSignPage&pid=${contrast.pid }&contractId=${contrast.contract_id}" class="btn">在线签约</a>
			</c:if>
            </div>
		</c:forEach>
		
		<!-- 已签约 -->
		<c:forEach items="${signedList.result }" var="contrast">
      		<div class="house">
	          <strong>${contrast.address }</strong>
	          <span class="houseInfo">${contrast.price } 元/月，${contrast.area }平</span>
	          <c:if test="${not empty contrast.pay_type }">
					<span class="houseInfo">${contrast.pay_type }</span>
			  </c:if>
	          <a class="tel" href="tel:${contrast.b_mobile }">租客：${contrast.b_name }，${contrast.b_mobile }</a>
	        
	        <div class="status">已签约</div>
			<a href="${contrast.viewpdf_url }" class="btn">查看合同</a>
       		<a href="${contrast.download_url }" class="btn">下载合同</a>
            </div>
		 </c:forEach>
      	</div>
     </c:otherwise>
     </c:choose>
  </div>
</body>
</html>
