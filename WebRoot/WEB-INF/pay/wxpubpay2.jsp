<%@ page pageEncoding="UTF-8"%> 
<!DOCTYPE html>
<html>
<head>
<title>支付2-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>
</head>
<body>
	<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="/scripts/pay/pingpp.js"></script>
	<script type="text/javascript">
	$(function(){
		$.ajax({
		    type: "post", 
		    url: "/Pay.action?createCharge", 
		    dataType:"json",
		    data:{
		    	channel: "wx_pub",
		    	code: "${code }"
	    	},
		    success: function(json) {
		    	// 失败
		    	if(json.status == "n") {
		    		alert(json.info);
		    		return;
		    	}
		    	pingpp.createPayment(json.charge, function(result, err){
		    		if (result == "success") {
		    	        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
		    	        alert("支付成功");
		    	        $.ajax({
		    			    type: "post", 
		    			    url: "/PingPP.action?chargeSucceeded", 
		    			    dataType: "json",
		    			    data: {
		    			    	channel: "wx_pub",
		    			    	code: "${code }",
		    			    	amount: "${amount }"
		    		    	},
		    			    success: function(json) {
		    			    	
		    			    }
	    		    	});
		    	    } else if (result == "fail") {
		    	        // charge 不正确或者微信公众账号支付失败时会在此处返回
		    	    	alert(result+" "+err.msg+" "+err.extra);
		    	    	 $.ajax({
			    			    type: "post", 
			    			    url: "/PingPP.action?chargeFailed", 
			    			    dataType: "json",
			    			    data: {
			    			    	channel: "wx_pub",
			    			    	code: "${code }",
			    			    	amount: "${amount }"
			    		    	},
			    			    success: function(json) {
			    			    	
			    			    }
		    		    	});
		    	    } else if (result == "cancel") {
		    	        // 微信公众账号支付取消支付
		    	        alert("取消成功");
		    	    }
	    		});
		    }
		});
	});
</script>
</body>
</html>
