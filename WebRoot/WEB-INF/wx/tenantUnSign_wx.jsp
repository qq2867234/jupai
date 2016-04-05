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
	                <h3 class="weui_msg_title">暂无正在进行的洽谈</h3>
	            </div>
	        </div>
	    </c:when>
	    <c:otherwise>
	    <div class="progress">
      	<c:forEach items="${unSignList.result }" var="progress">
      		<!-- 房源信息 -->
      		<div class="house">
	          <!-- <span class="img"><img src="${progress.default_pic }" alt="房源图" onerror="showImgDelay(this,'/images/public/defaultHome.jpg',2)" /></span> -->
	          <strong>${progress.residence_name }</strong>
	          <span class="houseInfo">${progress.use_type }，${progress.beds }室${progress.baths}卫，${progress.area }平，${progress.price }元/月</span>
	          <c:if test="${not empty progress.pay_type }">
					<span class="houseInfo">${progress.pay_type }</span>
			  </c:if>
			  <!-- 房东信息 -->			  
			  <c:if test="${not empty progress.a_mobile }">
		          <a class="tel" href='tel:${progress.a_mobile }'><i class='zgIcon zgIcon-phone'></i>房东：${progress.a_name }，${progress.a_mobile }</a>
		         <!--  <a class="tel" href='tel:189127121'><i class='zgIcon zgIcon-phone'></i>房东：123131，123123131</a> -->
			  </c:if>
	        
	        <c:if test="${progress.step == 1 }">
				<a href="/ProgressOperation.action?goToProgressPageByStep&pid=${progress.id }&lid=${progress.lid}" class="btn">进行实名验证</a>
			</c:if>
			<c:if test="${progress.step == 2 }">
				<a href="/ProgressOperation.action?goToProgressPageByStep&pid=${progress.id }&lid=${progress.lid}" class="btn">联系房东</a>
			</c:if>
			<c:if test="${progress.step == 3 && empty progress.contractStatus }">
				<a href="###" proId="${progress.id }" class="btn cancelBB">取消签约</a>
        		<a href="/ProgressOperation.action?goToProgressPageByStep&pid=${progress.id }&lid=${progress.lid}" class="btn">检查房屋</a>
			</c:if>
			<c:if test="${progress.step == 3 || progress.step == 4 || progress.step == 5 }">
				<!-- 状态描述 -->
				<c:if test="${not empty progress.statusDesc }">
					<div class="status">${progress.statusDesc }</div>
		        </c:if>
		        <!-- 可进行的操作 -->
				<c:if test="${progress.contractStatus == -1}">
					<a href="###" proId="${progress.id }" class="btn cancelBB">取消签约</a>
				</c:if>
				<c:if test="${progress.contractStatus == -4}">
					<a href="###" proId="${progress.id }" class="btn cancelBB">取消签约</a>
	        		<a href="/ProgressOperation.action?goToRentNoticePage&pid=${progress.id }" class="btn">检查房屋</a>
				</c:if>
				<c:if test="${progress.contractStatus == -5}">
					<a href="###" proId="${progress.id }" class="btn cancelBB">取消签约</a>
				</c:if>
				<c:if test="${progress.contractStatus == -2}">
					<a href="###" proId="${progress.id }" class="btn cancelBB">取消签约</a>
					<a href="/ProgressOperation.action?goToProgressPageByStep&pid=${progress.id }&lid=${progress.lid}" class="btn">查看合同</a>
				</c:if>
				<c:if test="${progress.contractStatus == -3}">
					<a href="###" proId="${progress.id }" class="btn cancelBB">取消签约</a>
					<a href="/ProgressOperation.action?goToProgressPageByStep&pid=${progress.id }&lid=${progress.lid}" class="btn">查看合同</a>
				</c:if>
				<c:if test="${progress.contractStatus == -6}">
					<a href="###" proId="${progress.id }" class="btn cancelBB">取消签约</a>
					<a href="/ProgressOperation.action?goToOnlineSignPage&pid=${progress.id }&contractId=${progress.contract_id}" class="btn">在线签约</a>
				</c:if>
				<c:if test="${progress.contractStatus == -7}">
					<a href="###" proId="${progress.id }" class="btn cancelBB">取消签约</a>
				</c:if>
			</c:if>
			</div>
		</c:forEach>
		<!-- 已签约列表 -->
		<c:forEach items="${signedList.result }" var="contrast">
      		<div class="house">
	          <strong>${contrast.address }</strong>
	          <span class="houseInfo">${contrast.price } 元/月，${contrast.area }平</span>
	          <c:if test="${not empty contrast.pay_type }">
					<span class="houseInfo">${contrast.pay_type }</span>
			  </c:if>
	          <a class="tel" href="tel:${contrast.a_mobile }">房东：${contrast.a_name }，${contrast.a_mobile }</a>
	        <div class="status">已签约</div>
			<a href="${contrast.viewpdf_url }" class="btn">查看合同</a>
       		<a href="${contrast.download_url }" class="btn">下载合同</a>
       		</div>
	    </c:forEach>
	  </div>
    </c:otherwise>
    </c:choose>
  </div>

<script type="text/javascript">
$(function() {
	//取消签约
	$(".cancelBB").click(function() {
		var cb = $(this);
		dialog.content = "确定要取消签约吗？";
		dialog.confirmFn = function() {
			$.showLoading("操作中...");
			window.location.href="/ProgressOperation.action?stopOneRentProgress&pid=" + cb.attr("proId");
		}
		fnCreateDialog(dialog);
	});
});

</script>
</body>
</html>
