<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>攻略-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>

<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>

<script type="text/javascript" src="/scripts/plugIn/bootstrap.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
<link href="/css/css/weixin/base.css" rel="stylesheet" type="text/css">
<link href="/css/css/weixin/mGuide.css" rel="stylesheet" type="text/css">


</head>
<body>

<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <a id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="navbar-left menu">
            <span class='glyphicon glyphicon-list'></span>
        </a>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
            <li><a href="/mobile/home">主页</a></li>
            <li><a href="###">我的收藏</a></li>
        </ul>
        <div class="navbar-brand">北京攻略</div>
    </div>
</nav>

<div class="container" style="padding-top:4.5em;">
	<c:forEach items="${areaList}" var="area" varStatus="status">
		<a href='/guide/area/m/${area.areaCode}' class="media">
			 <span class="media-left media-middle">
			  <img onerror="showImgDelay(this,'/images/public/defaultHome.jpg',2);" alt="区域图片" src="${fn:replace(area.pic, '.', '_.') }" class="media-object">
      		  </span>
      	<span class="media-body">
      		  <strong class="media-heading">${area.areaName}</strong>
			<span class="circle">
				<c:forEach items="${fn:split(area.tag, '；|;')}" var="tag">
					${tag}
				</c:forEach>
			</span>
			  </span>
		</a>
	</c:forEach>
    <div class="footer row">
        ©2015 真格在线&nbsp;&nbsp;&nbsp;&nbsp;400-115-6080
    </div>
</div>
<script type="text/javascript">

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
</body>
</html>