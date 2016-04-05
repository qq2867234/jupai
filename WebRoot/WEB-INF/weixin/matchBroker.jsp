<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>帮我找-真格租房</title>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>

<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<link href="/css/css/weixin/base.css?v=1" rel="stylesheet" type="text/css">
<link href="/css/css/weixin/helpMe.css?v=1" rel="stylesheet" type="text/css">

<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/bootstrap.min.js"></script>
<script type="text/javascript" src="/scripts/Validform_v5.3.2.js"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
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
        <div class="navbar-brand">挑选经纪人</div>
    </div>
</nav>
<div class="container" id="condition" style="padding-top:0;">
   
  <form class="form-horizontal" id="matchBroker" action="/BrokerWeiXin.action?getMatchBroker" method="post">
  	<div class="form-group">
	  <div class="btn-group listType row" role="group" >
	    <button type="button" class="btn btn-default btn-primary col-xs-4">买房</button>
	    <button type="button" class="btn btn-default col-xs-4">租房</button>
	    <input name="needs.type" id="listType" value="1" type="hidden">
	  </div>
	</div>
    <div class="form-group">
      <label for="rooms" class="sr-only">商圈/小区</label>
      <div class="row">
        <input name="needs.place" value="${needs.place }" class="form-control" id="place" placeholder="商圈/小区" onblur="placeBlur()">
      </div>
    </div>
    <div class="form-group">
      <label for="totalPrice" class="sr-only">总价</label>
      <div class="row">
        <input name="needs.price" value="${needs.price }" class="form-control" id="price" placeholder="期望的总价(万元)" ignore="ignore" datatype="n1-5" errormsg="请输入合法的总价" sucmsg=" ">
        <p class="form-control-static Validform_checktip"></p>
      </div>
    </div>
    <div class="form-group">
      <label for="rooms" class="sr-only">居室</label>
      <div class="row">
        <input name="needs.beds" value="${needs.beds }" class="form-control" id="beds" placeholder="居室" ignore="ignore" datatype="n1-1" errormsg="请输入1位数字" sucmsg=" ">
        <p class="form-control-static Validform_checktip"></p>
      </div>
    </div>
    <div class="form-group">
      <label for="rooms" class="sr-only">备注</label>
      <div class="row">
        <input name="needs.comment" value="${needs.comment }" class="form-control" id="comment" placeholder="特别的要求">
        <p class="form-control-static">填写特别的要求以便我们为您提供更好的服务。</p>
      </div>
      
    </div>

    <button type="submit" class="btn btn-info btn-lg btn-block" id="needSubmit">开始挑选</button>
  </form>
</div>
<div class="footer row">
    ©2015 真格在线&nbsp;&nbsp;&nbsp;&nbsp;400-115-6080
</div>
<script type="text/javascript">

$(function() {
    
    $("#matchBroker").Validform({
		tiptype:4,
		ajaxPost:false,
		btnSubmit:"#needSubmit",
		beforeSubmit:function(curform){
			//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话表单将不会提交;
			if($("#place").val()=='' && $("#price").val()==''){
				if($("#listType").val() == 1)
					$("#price").next().text("商圈/小区和总价必须输入一项");
				else
					$("#price").next().text("商圈/小区和租金必须输入一项");
				return false;
			}
		}
	});
    
    $(".listType").children().click(function() {
		$(this).addClass("btn-primary").siblings().removeClass("btn-primary");
		if($(this).index() == 0) {
			$("#listType").val(1);
			$("#price").prop("placeholder","期望的总价(万元)");
		}
		if($(this).index() == 1) {
			$("#listType").val(2);
			$("#price").prop("placeholder","期望的租金(元)");
		}
	});
});

function placeBlur() {
	if($("#place").val() != '')
		$("#price").next().text("");
}

</script>
</body>
</html>