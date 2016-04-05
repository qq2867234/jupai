<%@ page pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>在线支付，真格租房，独一无二的租房规划，你能选到更合适的家</title>
        <meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
        <meta name="description" content="真格租房，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！北京房屋出租，北京房屋租赁"/>
        <%@ include file="/zinclude/public.jsp"%>
        <link rel="stylesheet" type="text/css" href="/css/css/pay/pcPay.css">
    </head>
<body>
<%-- <%@include file="/WEB-INF/include/header.jsp" %> --%>
<!--#include virtual="/zinclude/header.html"-->
<div class="main shortPage">
    <div class="container">
        <%-- <div class="service">
            <h3>服务介绍</h3>
            <ul>
              ${serviceInfo }
            </ul>
        </div> --%>
        <div class="cost">
            <h3>价格介绍</h3>
            <div class="price">
                <!-- ${amount }<i>RMB/${chance }次</i> -->
                ¥&nbsp;${amount }<i>元整</i>
            </div>
            <div class="tips">
              ${priceInfo }
            </div>
            <a class="payIcon" href='###' onclick="pay('wx_pub_qr')">
                <b class="zgIcon zgIcon-wxPay"></b>
                <button type="button" class="wxPay" >立即支付</button>
            </a>
            <a class="payIcon" href='###' onclick="pay('alipay_pc_direct')">
                <b class="zgIcon zgIcon-aliPay"></b>
                <button type="button" class="aliPay">立即支付</button>
            </a>
            <div id="qrcode"></div>
	        </div>
        </div>
    </div>
</div>
<!--#include virtual="/zinclude/bottom.html"-->
<%-- <%@include file="/WEB-INF/include/bottom.jsp" %>  --%>
<script type="text/javascript" src="/scripts/pay/pingpp-pc.js"></script>
<script type="text/javascript" src="/scripts/public/jquery.qrcode.min.js"></script>
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
		    	// 支付宝扫码支付
		    	if(channel == 'alipay_qr'){
		    		$("#qrcode").empty().qrcode({width: 200, height: 200, text: json.charge.credential.alipay_qr});
		    		$(window).scrollTop($(window).height());
		    	}
		    	// 微信扫码支付
		    	else if(channel == 'wx_pub_qr'){
		    		$("#qrcode").empty().qrcode({width: 200, height: 200, text: json.charge.credential.wx_pub_qr})
                        .append("<div class='qrTips'>扫描二维码微信支付</div>");
                    $(".payIcon").last().addClass("unactivated");
                    Init();
                    $(window).scrollTop($(window).height());
		    	}
		    	// 其它支付
		    	else{
			    	pingppPc.createPayment(json.charge, function(result, err){
			    		if (result == "success") {
			    	        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
			    	    } else if (result == "fail") {
			    	        // charge 不正确或者微信公众账号支付失败时会在此处返回
			    	    } else if (result == "cancel") {
			    	        // 微信公众账号支付取消支付
			    	    }
		    		});
		    	}
		    	isCharged(json.charge.orderNo);
		    }
		});
	}
	
	function isCharged(orderno) {
		// 定时获取扫描结果
		var t = setInterval(function() {
			$.post("/Pay.action?isCharged", {orderNo: orderno}, function(json){
				var role = json.role;
				switch (json.status) {
				case 1: //支付成功
					if(role == 1) {
						window.location.href = "/Pay.action?goToPaySuccessPageForPCTenant";
					} else {
						window.location.href = "/Pay.action?goToPaySuccessPageForPCLandlord";
					}
					break;
				case -1: // 支付不成功
					if(role == 1) {
						window.location.href = "/Pay.action?goToPayFailedPageForPCTenant";
					} else {
						window.location.href = "/Pay.action?goToPayFailedPageForPCLandlord";
					}
					break;
				case "e": // 订单号不存在
				default:
					break;
				}
			});
		}, 3000);
	}
</script>

</body>
</html>