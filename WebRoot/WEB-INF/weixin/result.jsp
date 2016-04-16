<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<!DOCTYPE html>
<html>
<head>
	<title>${title } - 居派</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta name="keywords" content="居派，短租，住宿"/>
	<meta name="description" content="居派青年空间是带有移动互联网属性的短期住宿产品，是可链接各类外部服务的集“自助入住退房、主题化风格、创意家居植入、空间社交”于一身的点式微生活中心。"/>
	<link rel="stylesheet" href="/css/public/weui.min.css">
</head>
<body>
	<div class="weui_msg">
	  <div class="weui_icon_area">
	  	<c:choose>
	  		<c:when test="${status == 'y' }"><i class="weui_icon_success weui_icon_msg"></i></c:when>
	  		<c:when test="${status == 'n' }"><i class="weui_icon_warn weui_icon_msg"></i></c:when>
	  	</c:choose>
	  </div>
	  <div class="weui_text_area">
	    <h2 class="weui_msg_title">${info }</h2>
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
		<c:if test="${not empty extra }">
		  <div class="weui_extra_area">
		    <a href="${extraUrl }">查看详情</a>
		  </div>
		</c:if>
	</div>
</body>
</html>