<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>联系人-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>

<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/css/weixin/vContact.css">
<script type="text/javascript">
$(function(){
  fnCreateActionSheet({
    btn:$("#showActionSheet"),
    actionSheetDiv:$("#weui_actionsheet"),
    actionCancelBtn:$("#actionsheet_cancel"),
    mask:$("#mask.trans")
  });
});
</script>
</head>
<body>
<div class="main">
<input type="hidden" id="role" value="${role }"/>
<input type="hidden" id="choseType" value="${choseType }"/>
    <h2>
       <a href="###" id="showActionSheet">
       	<span id="currentMenu">
       		<c:choose>
       			<c:when test="${role == 1}">
       				已建立联系
       			</c:when>
       			<c:when test="${empty choseType && role == 3}">
       				需要我确认
       			</c:when>
       			<c:when test="${choseType == 2 && role == 3}">
       				已建立联系
       			</c:when>
       		</c:choose>
       	</span>
       	<span class="zgIcon zgIcon-chevron-circle-down"></span>
       </a>
    </h2>
    <div id="contactList">
    
    </div>
    <!-- <div class="renterList">
      <a href='###' class="renter">
        <span class="img"><img src="/images/focus1.jpg" alt="" /></span>
        <strong>孙燕姿(租客)</strong>
        <span class="renterInfo">
          <i class="zgIcon zgIcon-phone"></i>1891777121
        </span>
        <span class="time">2016-01-21 16:48</span>
      </a>
      <a href="###" class="btn btn-primary">通过审核</a>
      <a href="###" class="btn">不通过</a>
    </div> -->
</div>
<div id="actionSheet_wrap">
    <div class="weui_mask_transition trans" id="mask"></div>
    <div class="weui_actionsheet" id="weui_actionsheet">
        <div class="weui_actionsheet_menu" id="menu">
        	<c:choose>
        		<c:when test="${role == 1 }">
        			<div class="weui_actionsheet_cell">等待确认</div>
        			<div class="weui_actionsheet_cell">已建立联系</div>
        		</c:when>
        		<c:otherwise>
		            <div class="weui_actionsheet_cell">等待确认</div>
		            <div class="weui_actionsheet_cell">已建立联系</div>
        		</c:otherwise>
        	</c:choose>
       </div>
    </div>
</div>
</body>
<script type="text/javascript" src="/scripts/public/pager.js"></script>
<script type="text/javascript" src="/scripts/weixin/vContact.js"></script>
</html>