<%@ page pageEncoding="UTF-8"%> 
<!DOCTYPE html>
<html>
<head>
<title>行情-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>
<%@ include file="/zinclude/public.jsp"%>
<link rel="stylesheet" type="text/css" href="/css/css/func/market.css">

</head>
<body>
<!--#include virtual="/zinclude/header.html"-->
<%-- <%@include file="/WEB-INF/include/header.jsp" %> --%>
<div id="main">
    <div class="sidebar">
        <ul class="filter">
            <li class="locationLi">
                <div class="label">小区</div>
                <div class="input">
                    <input id="keyword" type="text" name="keyword" placeholder="输入小区名称" />
                    <input id="rid" type="hidden" />
                    <button class="clearBtn" id="clearBtn" type="button" style="display: none;cursor:pointer">
                        <span class="zgIcon zgIcon-remove"></span>
                    </button>
                </div>
                <button type="button" class="searchBtn" id="innerSearchAnalysis">
                    <span class="zgIcon zgIcon-search"></span>
                </button>
            </li>
        </ul>
        <div class="listView">
            <div class="chartList"></div>
        </div>
        <!--#include virtual="/zinclude/bottom.html"-->
    </div>
    <div class="map" id="map">
        
    </div>
</div>

<input type="hidden" id="cityCode" value="${cityCode }">
<input type="hidden" id="searchType" value="${searchType }">
<input type="hidden" id="keywordInput" value="${keyword }">

<script type="text/javascript" src="/scripts/search/market.js"></script>
<script type="text/javascript" src="/scripts/search/BaiduMap.js"></script>
<script type="text/javascript" src="/scripts/public/jquery-ui-1.10.4.custom.min.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=w3ovVmMCs8xAuhEwfI388u9L"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"></script>
<script type="text/javascript" src="/scripts/search/InfoBox_min.js"></script>
<script type="text/javascript" src="/scripts/search/EventWrapper.min.js"></script>
<script type="text/javascript" src="/scripts/graph/highcharts.js"></script>
<script type="text/javascript" src="/scripts/graph/highcharts-more.js"></script>
</body>
</html>
