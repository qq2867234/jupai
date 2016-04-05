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
      <h2>已签约列表</h2>
      <ul class="secMenu">
        <li><a href="/Sign.action?goToLandlordUnSignListPage">待签约</a></li>
        <li><a href="###" class="on">已签约</a></li>
      </ul>
   	  <div class="houseList">
	      <c:if test="${signedList.pages == 0}">
			<div style="width:100px;margin:10px auto;font-size:15px;text-align: center;">暂无记录</div>
		  </c:if>
	      <c:forEach items="${signedList.result }" var="contrast">
	      		<a href='###' class="house">
		          <strong>${contrast.address }</strong>
		          <span class="houseInfo">${contrast.price } 元/月，${contrast.area }平</span>
		          <c:if test="${not empty contrast.pay_type }">
						<span class="time">${contrast.pay_type }</span>
				  </c:if>
	              <span class="zgIcon zgIcon-user"></span>租客：${contrast.b_name }，${contrast.b_mobile }
		          <span class="time">${contrast.createdtime }</span>
		        </a>
				<a href="${contrast.viewpdf_url }" class="btn">查看合同</a>
	       		<a href="${contrast.download_url }" class="btn">下载合同</a>
		  </c:forEach>
      </div>
  </div>
</body>
<script type="text/javascript" src="/scripts/weixin/vCheckList.js"></script>
</html>
