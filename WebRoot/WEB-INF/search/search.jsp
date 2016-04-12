<%@ page pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<!DOCTYPE html>
<html>
<head>
	<title>居派</title>
	<!-- meta 以及 公用的css -->
	<%@ include file="/WEB-INF/include/public.jsp" %>
	<link href="/css/search/search_list.css?v=12" rel="stylesheet" >
</head>

<body>
<div id="indexPage">
	<input type="hidden" id="location" 		value="${condition.location }">
	<input type="hidden" id="checkInDay" 	value="${condition.checkInDay }">
	<input type="hidden" id="checkOutDay" 	value="${condition.checkOutDay }">
	<input type="hidden" id="lng" 			value="${condition.lng }">
	<input type="hidden" id="lat" 			value="${condition.lat }">
	<input type="hidden" id="sort" 			value="${condition.sort }">
	<input type="hidden" id="nearby" 		value="${nearby }">
	
	<article>
		<!--头部-->
		<div class="head-fixed">
			<header class="mayi-top-search head">
		    	<a class="back left" rel="nofollow" href="javascript:backleft();"></a>
				<a>搜索</a>
			</header>
			<nav class="sort">
			    <ul style="border-bottom: 1px solid #c9cbce;">
			    	<c:choose>
				     	<c:when test="${empty condition.checkInDay or empty condition.checkOutDay }">
					     	<li id="reportrange" style="cursor:pointer"><span>日期</span></li>
				     	</c:when>
				     	<c:otherwise>
				        	<li id="reportrange" style="cursor:pointer"><span class="c22bb62">${fn:replace(fn:substring(condition.checkInDay,5,10),'-','.')}-${fn:replace(fn:substring(condition.checkOutDay,5,10),'-','.')}</span></li>
				     	</c:otherwise>
			     	</c:choose>
			    	<c:choose>
				     	<c:when test="${(empty condition.lng or empty condition.lat) and empty nearby }">
					     	<li class="js-nearby" style="cursor:pointer"><span>附近</span></li>
				     	</c:when>
				     	<c:otherwise>
					     	<li class="js-nearby" style="cursor:pointer"><span class="c22bb62">附近</span></li>
				     	</c:otherwise>
			     	</c:choose>
			     	<c:choose>
				     	<c:when test="${empty condition.location }">
				        	<li class="js-search" style="cursor:pointer"><span>位置区域</span></li>
				     	</c:when>
				     	<c:otherwise>
				        	<li class="js-search" style="cursor:pointer"><span class="c22bb62">${condition.location }</span></li>
				     	</c:otherwise>
			     	</c:choose>
		            <c:choose>
				     	<c:when test="${empty condition.sort or condition.sort == 0 }">
			            	<li class="js-sort" style="cursor:pointer"><span>默认排序</span></li>
				     	</c:when>
				     	<c:when test="${condition.sort == 1 }">
			            	<li class="js-sort" style="cursor:pointer"><span class="c22bb62">价格最高</span></li>
				     	</c:when>
				     	<c:when test="${condition.sort == 2 }">
			            	<li class="js-sort" style="cursor:pointer"><span class="c22bb62">价格最低</span></li>
				     	</c:when>
			     	</c:choose>
			    </ul>
			</nav>
		</div>
		<!--头部结束-->
		
	    <!--内容-->
	    <section class="section">    	
	        <aside class="index list-mian">    
	        	<!-- 无结果 -->
	        	<c:if test="${fn:length(pageModel.result) == 0 and empty nearby}">
	        		<div style="width: 150px; font-size: 15px; margin: 0px auto; padding-top: 50px;">没有符合条件的房源</div>
	        	</c:if> 
	        	<!-- 有结果 -->
	        	<c:forEach items="${pageModel.result }" var="room">
	        		<div class="cont">
			            <a href="/Search.action?goToRoomDetailPage&roomId=${room.id }">
			                <mark class="n-img"><img src="${room.default_pic }"  alt="房间图片"></mark>
			                <dl>
			                    <dt>
			                    	<b class="dx-b01 fl">房间名：${room.name }</b>
			                        <b class="dx-b01 fr price">¥ ${room.price }</b>
					            </dt>
					            <!-- <dd>
			                    	<nav class="d-nr">
			                        <b>9条评论</b>&nbsp;·&nbsp;
			                        <b>二居</b>&nbsp;·&nbsp;
			                        <b>可住6人</b>&nbsp;·&nbsp;
			                        <b class="b-wz">朝阳三里屯</b>
			                       </nav>
			                    </dd> -->
			                </dl>	               
			             </a> 
		            </div> 
	        	</c:forEach>
	        </aside>
	        
	        <div class="more" style="line-height: 55px;height: 55px; font-size: 16px;">
	        	 
	             <a class="btn-more" href="javascript:nextPage(${pageModel.pages });" <c:if test="${empty condition or empty pageModel or pageModel.pages == 0 or condition.pageNow == pageModel.pages }">style="display:none;"</c:if>>点击加载更多</a>
	             <!-- 加载中图标（如果是附近搜索，则默认显示加载中） -->
	             <span class="loading" <c:if test="${empty nearby }">style="display:none;"</c:if>></span>
	        </div>
	    </section>
	
		<footer id="common_footer" class="index-footer" style="display: none;">
			<div class="ft_wz">客服电话<a href="tel:13810316841"> 13810316841</a></div>
			<div class="ft-b">©2016居派 京ICP证130021号</div>
		</footer>

	</article>
	
	<!--排序-->
	<div class="rm-type" id="mr" style="display: none;">
		<div class="rm-top"></div>
	    <div class="mr-show">
	        <ul class="price u_sort"> 
	            <li data="0" class="default <c:if test='${empty condition.sort or condition.sort == 0}'>uLi_on</c:if>">默认排序</li>
	            <li data="1" class="highest <c:if test='${condition.sort == 1}'>uLi_on</c:if>">价格最高</li>
	            <li data="2" class="lowest <c:if test='${condition.sort == 2}'>uLi_on</c:if>">价格最低</li>
	        </ul>            
	    </div>   
	</div>
</div>

<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=sEhlVR2sZiMlajeCYrmyYswv"></script>

<script type="text/javascript">
wx.config({
    debug: false,
    appId: '${sp.appId}',
    timestamp: '${sp.timestamp}',
    nonceStr: '${sp.nonceStr}',
    signature: '${sp.signature}',
    jsApiList: [
        'getLocation'
    ]
});
/* if('${nearby}' == 1) {
	(function() { 
		var bdapi = document.createElement("script");
		bdapi.src = "http://api.map.baidu.com/api?v=2.0&ak=sEhlVR2sZiMlajeCYrmyYswv"; 
		var s = document.getElementsByTagName("script")[0]; 
		s.parentNode.insertBefore(bdapi, s);	
	})(); 
} */

var wxReadyStatus = false;
wx.ready(function(){
	wxReadyStatus = true;
	if('${nearby}' == 1) {
		wx.getLocation({
			type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			success: function (res) {
				nearbySearch(res.longitude, res.latitude);
			},
			fail: function() {
				showTip("定位失败", 2);
				$(".loading").hide();
			}
		});
	}
});


</script>
<script src="/scripts/index/jquery-1.9.1.min.js"></script>
<script src="/scripts/index/main.js"></script>
<script src="/scripts/index/c.js"></script>
<script src="/scripts/index/moment.js"></script> 
<script src="/scripts/index/daterangepicker.js"></script> 
<script src="/scripts/index/backleft.js?v=1"></script>

<script src="/scripts/search/sou.list.js?v=27"></script>
<!-- <script src="/scripts/search/sou.more.js"></script> -->

<%@ include file="/WEB-INF/include/location.jsp"%>
</body>
</html>