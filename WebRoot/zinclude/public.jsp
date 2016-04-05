<%@ page pageEncoding="UTF-8" import="com.jupai.account.domain.Account"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="stripes" uri="http://stripes.sourceforge.net/stripes.tld"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	String PHOTO_URL = application.getAttribute("PHOTO_URL").toString();
	String HOME_PIC = application.getAttribute("HOME_PIC").toString();
	
	Account account = ((Account)session.getAttribute("account"));

	Integer zid = null;
	if(account != null) {
		zid = account.getZid();
	} else {
		Cookie [] cookies = request.getCookies();
		if (cookies != null) {
			for (int i = 0; i < cookies.length; i++) {
				if("displayName".equals(cookies[i].getName()) || "role".equals(cookies[i].getName())) {
					Cookie cookie = cookies[i];
					cookie.setMaxAge(0);
					cookie.setPath("/");
					response.addCookie(cookie);
				}
			}
		}
	}
%>

<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="renderer" content="webkit">

<link rel="shortcut icon" type="image/x-icon" href="/images/favicon.png" />
<link rel="stylesheet" type="text/css" href="/css/css/func/base.css">
 
<!--[if lt IE 8 ]>
<script src="/scripts/friend/json2.js"></script>
<![endif]-->

<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/public/fn.js"></script>
<script type="text/javascript">
//初始化系统路径参数，js中直接使用 
// 用户头像或群组头像相对路径
var brokerListPhtoto = '<%=PHOTO_URL %>';
var homePhoto= '<%=HOME_PIC%>'; 

// 当前用户zid
var zid = '<%=zid%>'; 
// 当前用户的名称
var name = $.cookie("displayName"); 

var errorCount;
$(function(){
  	 	var curRole = $.cookie("role");
  	 	if(curRole == 5) {
			$(".noBrokerage").remove();
		} else if(curRole == 1 || curRole == 6 || curRole == 7) {
			$(".noPerson").remove();
		} else if(curRole == 2) {
			$(".noBroker").remove();
		}
  	 	
		var nowLocation = window.location.pathname.split("/")[1];
		var param = window.location.search;
		//修改个人资料
		if(nowLocation + param == "UserCenterController.action?goToUserCenter") {
			$(".zgIcon").parent().removeClass("on");
			$(".zgIcon-edit").parent().addClass("on");
		}
		//修改密码
		else if(nowLocation + param == "UserCenterController.action?goToSecurityCenter") {
			$(".zgIcon").parent().removeClass("on");
			$(".zgIcon-password").parent().addClass("on");
		}
		//手机认证
		else if(nowLocation + param == "UserCenterController.action?goToCheckVerifyAuthority&dest=1") {
			$(".zgIcon").parent().removeClass("on");
			$(".zgIcon-phone").parent().addClass("on");
		}
		//实名验证
		else if(nowLocation + param == "UserCenterController.action?goToVerifyIdPage") {
			$(".zgIcon").parent().removeClass("on");
			$(".zgIcon-realName").parent().addClass("on");
		}
		//名片认证
		else if(nowLocation + param == "UserCenterController.action?goToCheckVerifyAuthority&dest=4") {
			$(".zgIcon").parent().removeClass("on");
			$(".zgIcon-card").parent().addClass("on");
		} 
		//联系人(租客)-等待确认
		else if(nowLocation + param == "RentListController.action?goToContactPage&type=3") {
			$(".mods li").removeClass("on");
			$(".waitConfirm").addClass("on");
		}
		//联系人(租客)-已建立联系
		else if(nowLocation + param == "RentListController.action?goToContactPage&type=1") {
			$(".mods li").removeClass("on");
			$(".isConfirm").addClass("on");
		}
		//联系人(房东)-等待确认
		else if(nowLocation + param == "RentListController.action?goToContactPage&type=4") {
			$(".mods li").removeClass("on");
			$(".waitConfirm").addClass("on");
		}
		//联系人(房东)-已建立联系
		else if(nowLocation + param == "RentListController.action?goToContactPage&type=2") {
			$(".mods li").removeClass("on");
			$(".isConfirm").addClass("on");
		}
		//发布租单
		else if(nowLocation + param == "RentListController.action?goToAddRentPage") {
			$(".mods li").removeClass("on");
			$(".addPub").addClass("on");
		}
		//我的房源
		else if(nowLocation + param == "RentListController.action?goToPublishedRentList") {
			$(".mods li").removeClass("on");
			$(".myHouse").addClass("on");
		}
		//我的签约-待签约
		else if(nowLocation + param == "Sign.action?goToSignListPage&type=1") {
			$(".mods li").removeClass("on");
			$(".unSignList").addClass("on");
		}
		//我的签约-已签约
		else if(nowLocation + param == "Sign.action?goToSignListPage&type=2") {
			$(".mods li").removeClass("on");
			$(".signedList").addClass("on");
		}
		// 首页
		else{
			$("#navLayer1").find("a").removeClass("on");
			$("#isHome").addClass("on");
		}
		
	}); 	
	
//var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.src = "//hm.baidu.com/hm.js?f43fa260138f2460df229f65d2e1d3cf"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s);	})(); 
</script>

<script type="text/javascript" src="/scripts/public/public.js"></script>
<script type="text/javascript" src="/scripts/upload/kindeditor-min.js"></script>
<script type="text/javascript" src="/scripts/upload/zh_CN.js"></script>

<!-- 短信验证码 -->
<script type="text/javascript" src="/scripts/uhome/MobileValidCode.js"></script>

<!-- 实现通话功能主要js文件 -->
<!-- <script type="text/javascript" src="/scripts/friend/friend.js"></script> -->

<!-- 实现通话功能的核心基础js库文件 -->
<!-- <script type="text/javascript" src="/scripts/public/socket.io.js"></script> -->
<!--[if lte IE 7]> 
<link type="text/css" rel="stylesheet" href="/css/css/public/ie7.css" mce_href="/css/css/public/ie7.css" />
<![endif]--> 
<!--[if lte IE 6]> 
<link type="text/css" rel="stylesheet" href="/css/css/public/ie6.css" mce_href="/css/css/public/ie7.css" />

<![endif]--> 
