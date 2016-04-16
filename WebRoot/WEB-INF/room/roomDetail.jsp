<%@ page pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<title>房间名：《${room.name }》 - 居派</title>
	<!-- meta 以及 公用的css -->
	<%@ include file="/WEB-INF/include/public.jsp" %>
	<link rel="stylesheet" href="/css/public/swiper-weui.css">
	<link rel="stylesheet" href="/css/detail/roomDetail.css">
</head>

<body>
<div style="display:block" id="indexPage">

	<input type="hidden" id="roomId" value="${room.id }"> 
	<input type="hidden" id="appid" value="${appid }"> 
	<input type="hidden" id="domain" value="${domain }"> 
	
    <header class="jupai-top">
        <a class="back left" rel="nofollow" href="javascript:backleft();"></a>房间详情
    </header>
    
    <div class="swiper-container">
      <div class="swiper-wrapper">
      	<c:forEach items="${room.images }" var="image">
	        <div class="swiper-slide"><img src="${image }" /></div>
      	</c:forEach>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    
    <section class="pd10 section room-title">
        <div class="f18">房间名：《${room.name }》</div>
        <!-- <div class="f14" style="color: gray">西王长安睡眼阑珊，秋千小毯看月凭栏，这里夜色斑斓</div> -->
    </section>
	
	<!-- 日期选择 -->
	<section class="pd10 section" id="reportrange">    	
         <div class="calendar" style="display: inline-block;">
            <span>
                <b style="display: block; line-height: 30px; height: 30px;">
                    <em>入住日期：</em>
                    <c:if test="${empty checkInDay }">
	                    <em id="checkInDay" style="color: #22bb26;">选择日期</em>
                    </c:if>
                    <c:if test="${not empty checkInDay }">
	                    <em id="checkInDay" style="color: #22bb26;">${checkInDay }</em>
                    </c:if>
                </b>
                <b style="display: block; line-height: 30px; height: 30px;">
                    <em>离开日期：</em>
                    <c:if test="${empty checkOutDay }">
	                    <em id="checkOutDay" style="color: #22bb26;">选择日期</em>
                    </c:if>
                    <c:if test="${not empty checkOutDay }">
	                    <em id="checkOutDay" style="color: #22bb26;">${checkOutDay }</em>
                    </c:if>
                </b>
            </span>
        </div>
        <!-- <div style="display: none;position: relative; right: -30px; top: -15px; color: #22bb26;">共<em id="totalDays">  </em>晚</div> -->
        <div style="background: url('/images/public/right.png'); width: 11px; height:20px; float:right; margin-top: 20px;"></div>
	</section>
    <section class="pd10 section">
        <div>${room.intro }</div>
    </section> 

	<%@ include file="/WEB-INF/include/footer.jsp"%>
	<style>
	.index-footer {
	    padding-top: 1px;
	    padding-bottom: 60px;
	}
	</style>
    <section>
        <aside class="bom fixed">
            <b><font id="dayprice" class="f-24" >￥${room.price }</font>/晚</b>
			<div class="order-fix text"><a class="btn-ok text-center">立即预订</a></div>
        </aside>
    </section>
    <div class="add_tx" style="display:none;">
        <div class="add_y"></div>
        <div class="add_nr">
            <b>请选择入住和退房的日期</b>
            <a onclick="cancelInputDate()">取消</a><a id="confirmDate">确认</a>
        </div>
	</div> 
</div>

<script src="/scripts/public/jquery-1.9.1.min.js"></script>
<script src="/scripts/public/swiper.js"></script>
<script>
  $(".swiper-container").swiper({
    loop: true,
    autoplay: 3000
  });
</script>

<script src="/scripts/public/common.js"></script>
<script src="/scripts/public/moment.js"></script> 
<script src="/scripts/public/daterangepicker.js"></script> 

<script src="/scripts/detail/roomDetail.js?v=4"></script>
<script src="/scripts/detail/roomStateCalendar.js"></script>
</body>
</html>