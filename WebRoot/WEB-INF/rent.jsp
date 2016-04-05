<%@ page pageEncoding="UTF-8"%> 
<!DOCTYPE html>
<html>
<head>
<title>找房-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="真格租房，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！北京房屋出租，北京房屋租赁"/>
<%@ include file="/zinclude/public.jsp"%>
<link rel="stylesheet" type="text/css" href="/css/css/func/rent.css">
</head>
<body>
<!--#include virtual="/zinclude/header.html"-->
<%-- <%@include file="/WEB-INF/include/header.jsp" %> --%>
<div id="main">
    <div class="sidebar">
        <ul class="filter">
            <li class="bedroomLi">
                <div class="label">居室</div>
                <div class="input">
                    <input id="beds" type="text" name="beds" readonly class="readOnly fillSec" placeholder='不限'/>
                    <span class='zgIcon zgIcon-caret-down'></span>
                    <ul class="selectUl">
                         <li><a href='###' class='option'>不限</a></li>
                         <li><a href='###' class='option'>合租</a></li>
                         <li><a href='###' class='option'>1居</a></li>
                         <li><a href='###' class='option'>2居</a></li>
                         <li><a href='###' class='option'>3居</a></li>
                         <li><a href='###' class='option'>4居及以上</a></li>
                    </ul>  
                </div>
            </li>
            <li class="priceLi">
                <div class="label">价格</div>
                <div class="input">
                    <input id="price" type="text" name="price" maxlength="6" class="fillSec"  onKeyUp="value=this.value.replace(/\D+/g,'')"  placeholder='月租'/>
                    <span class='zgIcon zgIcon-caret-down'></span>
                    <ul class="selectUl">
                         <li><a href='###' class='option'>不限</a></li>
                         <li><a href='###' class='option'>1500</a></li>
                         <li><a href='###' class='option'>3000</a></li>
                         <li><a href='###' class='option'>5000</a></li>
                         <li><a href='###' class='option'>8000</a></li>
                    </ul>
                </div>
            </li>
            <li>
                <input type="checkbox" id="showNoRentOnly" />
                <label for="showNoRentOnly">只显示未出租房源</label>
            </li>
            <div class="sepLine"></div>
            <li class="locationLi">
                <div class="label">地点</div>
                <div class="input">
                    <input id="keyword" type="text" name="keyword" maxlength="16" placeholder="你的工作、学习地点" />
                    <input id="lngLat" type="hidden" />
                    <button class="clearBtn" id="clearBtn" type="button" style="display: none;cursor:pointer">
                        <span class="zgIcon zgIcon-remove"></span>
                    </button>
                </div>
                <div class="input" style="margin-left:12px;">
                   <input id="keyword2" type="text" name="keyword2" maxlength="16" placeholder="TA的工作、学习地点(可不填)" />
                   <input id="lngLat2" type="hidden" />
                   <button class="clearBtn" id="clearBtn2" type="button" style="display: none;cursor:pointer">
                        <span class="zgIcon zgIcon-remove"></span>
                    </button>
                </div>
                <button type="button" class="searchBtn" id="innerSearchAnalysis">
                    <span class="zgIcon zgIcon-search"></span>
                </button>
            </li>
        </ul>
        <div class="listView">
            <div class="searchResult">
                <div class="resultRows" style="display: block;"></div>
                <div class="filterResult" style="display: none;">
                    <button type="button" class="btn btn-default xs-btn timeSearchOrder" order="2">距离优先</button>
                    <button type="button" class="btn btn-default xs-btn timeSearchOrder" order="1">价格优先</button>
                    <button type="button" class="btn btn-default xs-btn doubleLoactionSearchOrder" order="3">离TA近</button>
                    <button type="button" class="btn btn-default xs-btn doubleLoactionSearchOrder" order="2">中间地带</button>
                    <button type="button" class="btn btn-default xs-btn doubleLoactionSearchOrder" order="1">离我近</button>
                </div>
            </div>
            <div class="houseList"></div>
            <div class="pagination" style="display: none; float: right; width: auto; clear: both;">
                <div class="pages">
                    <span>第</span><span id="currPage"></span><span>/</span><span id="totalPage"></span><span>页</span>
                </div>   
                <button onclick="prevPage()" id="prevPage" class='prevPage btn btn-primary hollowBtn sm-btn'><span class="zgIcon zgIcon-angle-left"></span></button>
                <button onclick="nextPage()" id="nextPage" class='nextPage btn btn-primary hollowBtn sm-btn'><span class="zgIcon zgIcon-angle-right"></span></button>    
            </div>
        </div>
        <!--#include virtual="/zinclude/bottom.html"-->
    </div>
    <div class="map" id="map">
        
    </div>
</div>

<input type="hidden" id="cityCode" value="${cityCode }">
<input type="hidden" id="searchType" value="${searchType }">
<input type="hidden" id="keywordInput" value="${keyword }">
<input type="hidden" id="keywordInput2" value="${keyword2 }">
<input type="hidden" id="priceInput" value="${price }">
<input type="hidden" id="bedsInput" value="${beds }">
<input type="hidden" id="filterInput" value="${filter }">
<input type="hidden" id="lngLatInput" value="${lngLat }">
<input type="hidden" id="lngLat2Input" value="${lngLat2 }">
<input type="hidden" id="showNoRentOnlyInput" value="${showNoRentOnly }">

<script type="text/javascript" src="/scripts/search/HouseSearch.js"></script>
<script type="text/javascript" src="/scripts/search/houseQuery.js"></script>
<script type="text/javascript" src="/scripts/search/BaiduMap.js"></script>
<script type="text/javascript" src="/scripts/public/jquery-ui-1.10.4.custom.min.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=w3ovVmMCs8xAuhEwfI388u9L"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"></script>
<script type="text/javascript" src="/scripts/search/InfoBox_min.js"></script>
<script type="text/javascript" src="/scripts/search/EventWrapper.min.js"></script>
<!-- <script type="text/javascript" src="/scripts/public/Favorite.js"></script> -->
</body>
</html>
