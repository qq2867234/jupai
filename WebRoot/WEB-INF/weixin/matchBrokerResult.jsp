<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

<title>帮我找-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>

<script type="text/javascript" src="/scripts/plugIn/bootstrap.min.js"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<link href="/css/css/weixin/base.css" rel="stylesheet" type="text/css">
<link href="/css/css/weixin/helpMe.css" rel="stylesheet" type="text/css">
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
        <div class="navbar-brand">让经纪人联系我</div>
    </div>
</nav>
<div class="container" id="condition">
  <c:choose>
  <c:when test="${status == 'y' }">
	  <h4>您的需求将发送给以下经纪人:</h4>
      <div class="brokers">
	  <c:forEach items="${brokers}" var="broker">
		  <a class="col-xs-3 brokerList" href='###'>
		    <img src="${broker.pic}" alt="头像" onerror="showImgDelay(this,'/images/defaultPic/head.png',2)" />
		    <span>${broker.name}</span>
		    <span class="pingfen">
	      	  <c:forEach begin="0" end="4" step="1" var="i">
			   		<c:choose>
			   		<c:when test="${(broker.score-i*10) < 3 }">
			   			<q class='zgIcon zgIcon-star-o'></q>
			   		</c:when>
			   		<c:when test="${(broker.score-i*10) > 8 }">
			   			<q class='zgIcon zgIcon-star'></q>
			   		</c:when>
			   		<c:otherwise>
			   			<q class='zgIcon zgIcon-star-half-o'></q>
			   		</c:otherwise>
			   		</c:choose>
			  </c:forEach>
	      </span>
		  </a>
	  </c:forEach>
      </div>
  </c:when>
  <c:otherwise>
  	  <h4>${broker.info}</h4>
  </c:otherwise>
  </c:choose>
      <form class="form-horizontal" id="matchBroker" action="/BrokerWeiXin.action?getMatchBroker" method="post" style="padding-top:1.6em;">
        <div class="form-group">
          <label for="rooms" class="sr-only">手机</label>
          <div class="row code">
            <input name="needs.mobile" value="${needs.mobile }" class="form-control" id="mobile" placeholder="手机号" onkeyup="value=value.replace(/[^0-9]+/g,'')" maxlength="11" datatype="m" nullmsg="请输入手机号" errormsg="请输入正确的手机号码！" sucmsg=" ">
            <button type="button" class="btn btn-info" id="sendMobileValidCode">发送验证码</button>
            <p class="form-control-static Validform_checktip mobileInfo"></p>
          </div>
        </div>
        <div class="form-group">
          <label for="rooms" class="sr-only">验证码</label>
          <div class="row">
            <input name="validCode" class="form-control" id="validCode" placeholder="验证码" datatype="s" nullmsg="请输入验证码" sucmsg=" ">
            <p class="form-control-static Validform_checktip validCodeInfo"></p>
          </div>
          <p class="form-control-static"></p>
        </div>
        <button type="button" class="btn btn-info btn-lg btn-block" id="sentMatchInfo">让经纪人联系我</button>
      </form>
   
</div>
<div class="footer row">
    ©2015 真格在线&nbsp;&nbsp;&nbsp;&nbsp;400-115-6080
</div>
<script type="text/javascript">
	var zids = '${zids}';
	var needId = '${needId}';
	
	$(function() {
		// 绑定发送手机验证码事件
		MobileValidCode.bindSendMobileValidCodeEvent($("#sendMobileValidCode"));
		// 确认发送匹配信息
		$("#sentMatchInfo").click(function() {
			if(MobileValidCode.validMobile() && MobileValidCode.validCode()) {
				$.ajax({
					url:"/BrokerWeiXin.action?sentMatchInfo",
					dataType:"json",
					data:{zids:zids, needId:needId, mobile:$("#mobile").val(), validCode:$("#validCode").val()},
					success:function(data, status) {
						if(data.status == 'y'){
							alert("已将您的需求发送给以上经纪人");
						}else if(data.status == 'n'){
							$(".validCodeInfo").val(data.info);
						}else{
							alert(data.info);
						}
					}
				});
			}
		});
	});
	
	/**
	 * 手机验证码类
	 * 手机号输入域 id="mobile", 验证码输入域 id="validCode"
	 * 用法：调用 MobileValidCode.bindSendMobileValidCodeEvent($("#sendMobileValidCode")); // 其中$("#sendMobileValidCode")参数为“发送验证码”按钮对象
	 */
	var MobileValidCode = {
		t : null,
		// 验证手机
		validMobile : function() {
			if($("#mobile").val()==''){
				$("#mobile").siblings(".Validform_checktip").html("请输入手机号");
				return false;
			}
			if (/^1(3|5|8|4)\d{9}$/.test($("#mobile").val())) {
				$("#mobile").siblings(".Validform_checktip").html("");
				return true;
			} else if (/^1(3[4-9]|4[7]|5[0-2|7-9]|8[7-9])[0-9]{8}$/.test($("#mobile").val())) {
				$("#mobile").siblings(".Validform_checktip").html("");
				return true;
			} else {
				$("#mobile").siblings(".Validform_checktip").html("请输入正确的手机号");
				return false;
			}
		},
		// 验证验证码
		validCode : function() {
			if ($("#validCode").val().length == 0) {
				$("#validCode").siblings(".Validform_checktip").html("请输入手机验证码");
				return false;
			} else {
				$("#validCode").siblings(".Validform_checktip").html("");
				return true;
			}
		},
		// 绑定发送验证码事件
		bindSendMobileValidCodeEvent : function(sendBtn) {
			sendBtn.click(function() {
				// 输入正确的手机号
				if (MobileValidCode.validMobile()) {
					var second = 60;
					// 向手机发送验证码
					$.ajax({
						url: "/BrokerWeiXin.action?sendMobileValidCode",
						data: {
							mobile: $("#mobile").val()
						},
						dataType: "json",
						async: false,
						type: "post",
						cache: false,
						success: function(data) {
							switch (data.status) {
								case 0:
									// 手机格式有误
									$("#mobile").siblings(".Validform_checktip").html("请输入正确的手机号");
									break;
								case 1:
									// 发送成功
									$("#validCode").siblings(".Validform_checktip").html("");
									// 禁用发送按钮
									sendBtn.attr("disabled", "true");
									sendBtn.text("重新发送("+second+")");
									MobileValidCode.t = window.setInterval(function() {
										if (second == 0) {
											window.clearInterval(MobileValidCode.t); //停止计时器
											sendBtn.removeAttr("disabled"); //启用发送按钮
											sendBtn.text("重新发送");
										} else {
											second--;
											sendBtn.text("重新发送("+second+")");
										}
									}, 1000); //启动计时器，1秒执行一次
									break;
								case 2:
									// 发送过于频繁
									$("#validCode").siblings(".Validform_checktip").html("发送过于频繁，您可以使用最新的验证码进行验证");
									sendBtn.text("发送验证码");
									break;
								case -1:
									alert("服务器异常，请稍后再试");
									break;
								default:
									alert("服务器异常，请稍后再试");
									break;
							}
						}
					});
				}
			});
		}
	};
</script>
</body>
</html>