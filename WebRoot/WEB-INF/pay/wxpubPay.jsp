<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>支付服务费，真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/css/pay/wapPay.css">
</head>
<body>
<div class="main">
    <h2>
       支付服务费
    </h2>
    <h3 class="price">
         ${amount }<i>RMB/${chance }次</i>
    </h3>
    <%-- <div class="introTips">
         ${priceInfo }
    </div> --%>
    <a class="payIcon" href='###' onclick="pay('wx_pub')">
        <b class="zgIcon zgIcon-wxPay"></b>
        <button type="button" class="wxPay" >支付</button>
    </a>
    <!-- <a class="payIcon" href='###' onclick="pay('alipay_wap')"> 
        <b class="zgIcon zgIcon-aliPay"></b>
        <button type="button" class="aliPay">支付</button>
    </a> -->
    <%-- <ul class="service tips">
        ${serviceInfo }
    </ul> --%>
</div>
<script type="text/javascript" src="/scripts/pay/ap.js"></script>
<script type="text/javascript" src="/scripts/pay/pingpp.js"></script>
<script type="text/javascript">
	function pay(channel) {
	    $.ajax({
		    type: "post", 
		    url: "/Pay.action?createCharge", 
		    dataType:"json",
		    data:{
		    	channel: channel,
	    	},
		    success: function(json) {
		    	// 失败
		    	if(json.status == "n") {
		    		alert(json.info);
		    		return;
		    	}
		    	if(json.status == "t") {
		    		window.location.href = "/Pay.action?goToPaySuccessPageForPCLandlord";
		    		return;
		    	}
		    	pingpp.createPayment(json.charge, function(result, err){
		    		if (result == "success") {
		    	        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
		    	        window.location.href = "/Pay.action?goToPaySuccessPageForPCLandlord";
		    	    } else if (result == "fail") {
		    	        // charge 不正确或者微信公众账号支付失败时会在此处返回
		    	        dialog.content = "支付失败";
						fnCreateDialog(dialog);
		    	    } else if (result == "cancel") {
		    	    	dialog.content = "支付已取消";
						fnCreateDialog(dialog);
		    	    }
	    		});
		    }
		});
	}
</script>
</body>
</html>