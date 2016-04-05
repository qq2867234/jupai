<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<title>${data['broker']['name']}的经纪人主页</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>


<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>

<script type="text/javascript" src="/scripts/plugIn/bootstrap.min.js"></script>
<link href="/css/css/weixin/base.css" rel="stylesheet" type="text/css">
<link href="/css/css/weixin/broker.css" rel="stylesheet" type="text/css">
<script type="text/javascript">
	var zid = "${data['broker']['zid']}";
	var reviews = "${data['broker']['reviews']}";
	var listType = "${listType}";
	//当图片加载失败是指定默认图片
	function showImgDelay(imgObj,imgSrc,maxErrorNum){  
	      if(maxErrorNum>0){  
	          imgObj.onerror=function(){  
	              showImgDelay(imgObj,imgSrc,maxErrorNum-1);  
	          };  
	          setTimeout(function(){  
	              imgObj.src=imgSrc;  
	          },500);  
	      }else{  
	          imgObj.onerror=null;  
	          imgObj.src=imgSrc;  
	      }  
	  }
</script>
</head>
<body>
	<input type="hidden" id="cityCode" value="${data['broker']['city_code']}">
<!-- 
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <a class="navbar-left" href="/mobile/home">
            <span class="glyphicon glyphicon-home"></span>
        </a>
        <div class="input-group searchDiv navbar-right">
          <input type="text" class="form-control" placeholder="关键字">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button">
                <span class="zgIcon zgIcon-search"></span>
            </button>
          </span>
        </div>
    </div>
</nav>
<div class="container">
    
    <div role="tabpanel" class="tabPanel">

      <ul class="nav nav-pills" role="tablist" id="brokerMsg">
        <li role="presentation" class="active"><a href="#information" aria-controls="information" role="tab" data-toggle="tab">基本资料</a></li>
        <li id="knowledgeBtn" role="presentation"><a href="#knowledge" aria-controls="knowledge" role="tab" data-toggle="tab">知道</a></li>
        <li id="footprintBtn" role="presentation"><a href="#footprint" aria-controls="footprint" role="tab" data-toggle="tab">经历</a></li>
      </ul>

      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="information">
            <div class="headPic">
                <img src="${PHOTO_URL }/${data['broker']['pic']}" alt="" />
                <h4>${data['broker']['name']}</h4>
            </div>
            <div class="row">
                <div class='col-xs-2'>电话:</div>
                <div class='col-xs-10'>${data['broker']['mobile']}&nbsp;</div>
                <div class='col-xs-2'>公司:</div>
                <div class='col-xs-10'>${data['broker']['brokerage_name']}&nbsp;</div>
                <div class='col-xs-2'>邮箱:</div>
                <div class='col-xs-10'>${data['broker']['email']}&nbsp;</div>
                <div class='col-xs-2'>标签:</div>
                <div class='col-xs-10'>
                	<c:forEach items="${data['broker']['tag']}" var="one" >
                        <c:if test="${fn:trim(one) != '' }">
                            <c:forEach items="${fn:split(one, ';')}" varStatus="status" var="tt">
                                <button type="button" class="hollowTag hollowTag-primary sm-tag">${tt }</button>
                            </c:forEach>
                        </c:if>
                    </c:forEach>
                </div>
                <div class='col-xs-2'>介绍:</div>
                <div class='col-xs-10 intro'>${data['broker']['introduction']}&nbsp;
                </div>
            </div>
        </div>
        <div role="tabpanel" class="tab-pane" id="knowledge">
            <div class="bgLine"></div>
            <c:forEach items="${data['broker']['timelines'] }" var="line">
            	<div class='timeBlock'>
    	            <span class='zgIcon zgIcon-circle'></span>
    	            <p>${line.moment }
    	            	<strong>${line.comment }</strong>
    	                <b>${line.fulldate }</b>
    	            </p>
            	</div>
            </c:forEach>
        </div>
        <div role="tabpanel" class="tab-pane" id="footprint">
            
            
        </div>
      </div>
    </div>
    <div class="footer row">
        ©2015 真格在线&nbsp;&nbsp;&nbsp;&nbsp;400-115-6080
    </div>
</div> -->
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <a id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="navbar-left menu">
            <span class='glyphicon glyphicon-list'></span>
        </a>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
            <li><a href="/mobile/home">主页</a></li>
            <li><a href="/mobile/fav">我的收藏</a></li>
        </ul>
        <div class="navbar-brand">${data['broker']['name']}</div>
		<a class="navbar-right " href="#">
           <span class='zgIcon zgIcon-heart-o fav'></span>收藏
        </a>
    </div>
</nav>
<div class="container" id="brokers">
    <h3>
      <span>${data['broker']['name']}</span>
      <!-- <span class='zgIcon zgIcon-heart-o fav'></span> -->
      <!-- <span class='zgIcon zgIcon-weixin'></span> -->
    </h3>
    <div class="media">
        <div class="media-body">
            <div class="pingfen">
              <c:forEach begin="0" end="4" step="1" var="i">
                    <c:choose>
                    <c:when test="${(data['broker']['score']-i*10) < 3 }">
                        <q class='zgIcon zgIcon-star-o'></q>
                    </c:when>
                    <c:when test="${(data['broker']['score']-i*10) > 8 }">
                        <q class='zgIcon zgIcon-star'></q>
                    </c:when>
                    <c:otherwise>
                        <q class='zgIcon zgIcon-star-half-o'></q>
                    </c:otherwise>
                    </c:choose>
              </c:forEach>
            <c:choose>
                <c:when test="${data['broker']['reviews'] > 0 }">
                    <span>${data['broker']['reviews'] }人评价</span>
                </c:when>
                <c:otherwise>
                    <span>暂无评价</span>
                </c:otherwise>
            </c:choose>
          </div>
            <div class='intro'>
                ${data['broker']['brokerage_name']}
                <c:if test="${data['broker']['salesoffice_name'] != ''}">, ${data['broker']['salesoffice_name']}</c:if>
            </div>
            <div class='intro'>
                <q class="zgIcon zgIcon-phone"></q><a href="tel:${data['broker']['mobile']}" id="zMobile">${data['broker']['mobile']}</a>
            </div>
            <c:if test="${data['broker']['email'] != null}">
            <div class='intro'>
                <q class="zgIcon zgIcon-envelope"></q>${data['broker']['email']}
            </div>
            </c:if>
        </div>
        <div class="media-right">
            <img src="${PHOTO_URL }/${data['broker']['pic']}" onerror="showImgDelay(this,'/images/defaultPic/head.png',2)"/>
        </div>
    </div>
</div>
<div class="container">
    <h4>
      个人介绍
    </h4>
    <p class="tag">
    	<c:forEach items="${data['broker']['tag']}" var="one" >
            <c:if test="${fn:trim(one) != '' }">
                <c:forEach items="${fn:split(one, ';')}" varStatus="status" var="tt">
                	<c:if test="${status.index == 0 }">
	                    <button class="hollowTag hollowTag-primary">${tt }</button>
                	</c:if>
                	<c:if test="${status.index == 1 }">
	                    <button class="hollowTag hollowTag-info">${tt }</button>
                	</c:if>
                	<c:if test="${status.index == 2 }">
	                    <button class="hollowTag hollowTag-warning">${tt }</button>
                	</c:if>
                </c:forEach>
            </c:if>
        </c:forEach>
    </p>
    <p class="zIntro">
      ${data['broker']['introduction']}
    </p>
</div>
<c:if test="${fn:length(data.footprint) > 0}">
<div class="container" id="footprint">
    <h4>
      经历
    </h4>
    <c:forEach items="${data.footprint }" var="timeline" varStatus="status">
    	<c:if test="${status.index < 2 }">
    	<div class="timeBlock">
	      <span class="zgIcon zgIcon-circle"></span>
	      <p>${timeline.moment }<strong>${timeline.comment }</strong><b>${timeline.fulldate }</b></p>
	    </div>
	    </c:if>
    </c:forEach>
    <c:if test="${fn:length(data.footprint) > 2}">
    <button type="button" class="loadMore">加载更多</button>
    </c:if>
</div>
</c:if>
<c:if test="${fn:length(data.knowledge) > 0}">
<div class="container" id="knowledge">
    <h4>
      知道
    </h4>
    <c:forEach items="${data.knowledge }" var="timeline" varStatus="status">
    	<c:if test="${status.index < 2 }">
    	<div class="timeBlock">
	      <span class="zgIcon zgIcon-circle"></span>
	      <p>${timeline.moment }<strong>${timeline.comment }</strong><b>${timeline.fulldate }</b></p>
	    </div>
	    </c:if>
    </c:forEach>
    <c:if test="${fn:length(data.knowledge) > 2}">
    <button type="button" class="loadMore">加载更多</button>
    </c:if>
</div>
</c:if>
<div class="container" id="brokerReview">
  <h4 style="margin-bottom:0;">
    经纪人评价
  </h4>
  <button type="button" class="loadMore">加载更多</button>
</div>
<div class="container" id="homeList">
  <h4>房产信息</h4>
  <button type="button" class="loadMore">加载更多</button>
</div>
<div class="footer row">
    ©2015 真格在线&nbsp;&nbsp;&nbsp;&nbsp;400-115-6080
</div>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="/scripts/weixin/broker.js"></script>
</body>
</html>