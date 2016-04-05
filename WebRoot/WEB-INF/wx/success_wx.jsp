<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>${title }-真格租房</title>
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
       	<c:choose>
      		<c:when test="${not empty head }">
      			${head }
      		</c:when>
      		<c:otherwise>
      		 	${title }
      		</c:otherwise>
      	</c:choose>
    </h2>
    <div class="weui_msg">
        <div class="weui_icon_area">
        	<c:choose>
        		<c:when test="${status == 'y' }"><i class="zgIcon zgIcon-check"></i></c:when>
        		<c:when test="${status == 'n' }"><i class="zgIcon zgIcon-close-circle"></i></c:when>
        	</c:choose>
        </div>
        <div class="weui_text_area">
            <h3 class="weui_msg_title">${info }</h3>
            <c:if test="${not empty desc}">
	            <p class="weui_msg_desc">${desc }</p>
            </c:if>
        </div>
        <c:if test="${not empty num }">
        <div class="weui_opr_area">
            <p class="weui_btn_area">
            	<c:choose>
            		<c:when test="${num == 1 }">
            			 <a href="${url1 }" class="weui_btn weui_btn_primary">${btn1 }</a>
            		</c:when>
            		<c:otherwise>
            		 	<a href="${url1 }" class="weui_btn btns weui_btn_primary">${btn1 }</a>
            		 	<a href="${url2 }" class="weui_btn btns weui_btn_primary">${btn2 }</a>
            		</c:otherwise>
            	</c:choose>
            </p>
        </div>
        </c:if>
    </div>
</div>
</body>
</html>