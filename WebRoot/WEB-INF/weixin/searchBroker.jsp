<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<head>
<title>经纪人-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房，二手房，新房，楼盘，租房，出租，整租，合租，房租，拎包入住"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>


<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>

<script type="text/javascript" src="/scripts/plugIn/bootstrap.min.js"></script>
<link href="/css/css/weixin/base.css" rel="stylesheet" type="text/css">
<link href="/css/css/weixin/searchBroker.css" rel="stylesheet" type="text/css">
</head>
<body>

<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">

        <a id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="navbar-left menu">
            <span class='glyphicon glyphicon-list'></span>
        </a>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
            <li><a href="/mobile/home">主页</a></li>
            <li><a href="/mobile/fav">我的收藏</a></li>
        </ul>
        <div class="input-group searchDiv navbar-right" id="searchResidence">
          <input name="cityCode" id="cityCode" type="hidden" value='${cityCode }'/>
          <input name="listType" id="listType" type="hidden" value='${listType }'/>
          <input name="residenceId" id="residenceId" type="hidden"/>
          <input type="text" class="form-control" id="searcInput" placeholder="小区,商圈,姓名,公司,门店,手机,标签">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" id="searc">
                <span class="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div><!-- /input-group -->
    </div>
</nav>
<div class="container">
    <div class="row" id='orderMenu'>
    	<div class="col-xs-6">
            <button id="mul" type="button" class="btn btn-default">综合</button>
        </div>
       <!--  <div class="col-xs-3">
            <button id="distance" type="button" class="btn btn-default">距离<span class='zgIcon zgIcon-long-arrow-down'></span></button>
        </div> -->
        <div class="col-xs-6">
            <button id="score" type="button" class="btn btn-default">评价<span class='zgIcon zgIcon-long-arrow-down fa-long-arrow-up'></span></button>
        </div>
        <!-- <div class="col-xs-3">
            <button id="totalPrice" type="button" class="btn btn-default">中介费<span class='zgIcon zgIcon-long-arrow-down fa-long-arrow-up'></span></button>
        </div> -->
       <!--  <div class="col-xs-3">
            <button id="filter" type="button" class="btn btn-default" data-toggle="modal" data-target="#filterModal">
            筛选
            <span class='zgIcon zgIcon-caret-down'></span>
          </button>
        </div>  -->
    </div>
    <div id="brokers">
        <!-- <a class="media" href='###'>
            <span class="media-left">
                <img src='http://www.zhengor.com/110000/residence/image/18/1164846.jpg'/>
            </span>
            <span class="media-body">
                <strong class="media-heading">李联群
                  <span class="pingfen">
                    <q class="zgIcon zgIcon-star"></q>
                    <q class="zgIcon zgIcon-star"></q>
                    <q class="zgIcon zgIcon-star"></q>
                    <q class="zgIcon zgIcon-star"></q>
                    <q class="zgIcon zgIcon-star-half-o"></q>
                  </span>
                </strong>
                <span class='tag'>
                    <button class="hollowTag hollowTag-primary">大户型</button>
                    <button class="hollowTag hollowTag-info">大户型</button>
                    <button class="hollowTag hollowTag-warning">大户型</button>
                    <q class="zgIcon zgIcon-heart-o fav"></q>
                    标签总字数不超过14,总个数不超过5
                </span>
                <span class='intro'>
                    我爱我家,万科星园店,<b>321</b>套房源
                </span>
            </span>
        </a> -->

    </div>
    <div class="modal fade" id='filterModal' tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">筛选经纪人</h4>
          </div>
          <form class="modal-body">
            <ul class="list-group">
              <li class="list-group-item">
                <label>
                  <input type="checkbox"> 100+经纪人
                </label>
              </li>
              <li class="list-group-item">
                <label>
                  <input type="checkbox"> 有评价
                </label>
              </li>
              <li class="list-group-item">
                <label>
                  <input type="checkbox"> 有资格证书
                </label>
              </li>
            </ul>
            <button type="button" class="btn btn-primary btn-lg btn-block">筛选</button>
          </form>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    
</div>
<div class="footer row">
      ©2015 真格在线&nbsp;&nbsp;&nbsp;&nbsp;400-115-6080
  </div>

</body>

<script type="text/javascript" src="/scripts/public/jquery-ui-1.10.4.custom.min.js"></script>
  <script type="text/javascript" src="/scripts/search/formatJS.js"></script> 
<script type="text/javascript" src="/scripts/weixin/recmdBrokers.js"></script>
</html>