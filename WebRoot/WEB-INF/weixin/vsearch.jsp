<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>找房-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<link href="/css/css/weixin/vBase.css" rel="stylesheet" type="text/css">
<link href="/css/css/weixin/vSearch.css" rel="stylesheet" type="text/css">
</head>
<body>

<%-- <%@ include file="/WEB-INF/include/vHeader.jsp" %> --%>
<!--#include virtual="/zinclude/vHeader.html"-->
<div class="main">
    <div class="main_search">
        <div class="rental houseList"></div>
        <a href="###" class="weui_btn weui_btn_primary" id="nextPage" style="display: none;">加载更多</a>
    </div>
</div>

<input type="hidden" id="cityCode" value="${cityCode }">
<input type="hidden" id="searchType" value="${searchType }">
<input type="hidden" id="keywordInput" value="${keyword }">
<input type="hidden" id="keywordInput2" value="${keyword2 }">
<input type="hidden" id="priceInput" value="${price }">
<input type="hidden" id="bedsInput" value="${beds }">
<input type="hidden" id="filterInput" value="${order }">
<input type="hidden" id="showNoRentOnlyInput" value="${showNoRentOnly }">
<input type="hidden" id="fromHome" value="${fromHome }">

<script type="text/javascript" src="/scripts/public/pager.js"></script>
<script type="text/javascript" src="/scripts/public/Favorite.js"></script>
<script type="text/javascript" src="/scripts/search/HouseSearch.js"></script>
<script type="text/javascript" src="/scripts/weixin/vsearch.js"></script>
<!--#include virtual="/zinclude/vfooter.html"-->
</body>
</html>