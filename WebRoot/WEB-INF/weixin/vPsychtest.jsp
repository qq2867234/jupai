<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>你在过怎样的生活-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<link href="/css/css/weixin/vPsychtest.css" rel="stylesheet" type="text/css">
</head>
<body>

<header>
    <img src="/images/weixin/psychtest_bg.jpg" alt="你在过怎样的生活" />
    <input type="hidden" id="cityCode" value="110000"/>
    <div class="header_location">
        <div class="header_location_input">
            <span class="zgIcon zgIcon-location"></span>
            <input type="text" placeholder='你的工作地点' id="workplaceLngLat"/>
            <span class="zgIcon zgIcon-remove hide"></span>
        </div>
        <div class="header_location_input">
            <span class="zgIcon zgIcon-house"></span>
            <input type="text" placeholder='你的居住地点' id="liveLngLat"/>
            <span class="zgIcon zgIcon-remove hide"></span>
        </div>
    </div>
    <input class="header_search" id="post" type="image" src="images\weixin\psychtest_btn.png">
</header>

<div class="mainDiv">
    <div id="curResault">
       
    </div>
    <div id="allResault">
       
    </div>
</div>

<footer>
    <h4><img src="/images/weixin/zgzf_text.png" alt="来真格" /></h4>
    <img src="/images/weixin/zgzf.png" alt="真格租房" />
    <h5>长按识别二维码，关注真格租房</h5>
</footer>
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
<script type="text/javascript" src="/scripts/weixin/onesLife.js"></script>
<script type="text/javascript" src="/scripts/public/jquery-ui-1.10.4.custom.min.js"></script>
</body>
</html>