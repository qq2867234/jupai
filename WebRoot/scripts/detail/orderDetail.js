// 防止重复提交订单
var submitFlag ="1";

var channel;
$(function(){

	// 提交订单
	$(".footer .or-btn").click(function(){
		disable(true);
		// 下单人姓名验证
		if(!nameCheck())
			return;					
		// 手机验证
		if(!mobileCheck())
			return;					
		// 支付选择验证
		if(!payCheck())
			return;
		orderSubmit();				//订单提交
	});
	
	// 查看房源信息
	$(".title").click(function(){
		if($("#roomId").val() != ''){
	        window.location.href='/Search.action?goToRoomDetailPage&roomId='+$("#roomId").val()+ '&checkInDay=' + $("#checkInDay").text() + '&checkOutDay=' + $("#checkOutDay").text();
		}
	});
	
	$("#payOrConfirm").click(function(){
		$(".dowm-tc").hide();
		return false;
	});
	
	$(".pay").click(function(){
		channel = $(this).val();
	});
	
});

function mobileCheck(){
	var mobile=$("#mobile").val().replace(/\s+/g,"");
	if(mobile == "") {
		showTip("请填写手机号");
		disable(false);
		return false;
	}else if (!/^13[0-9]{9}$|14[0-9]{9}&|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/.test(mobile)) {
		showTip("请填写有效的手机号");
		disable(false);
		return false;
    }else{
    	return true;
    }
}

function nameCheck(){
	if ($("#name").val() != '') {
		return true;
    } else {
    	showTip("请填写联系人");
    	disable(false);
		return false;
    }
}

function payCheck() {
	if(channel == undefined) {
		showTip("请选择支付方式");
		disable(false);
		return false;
	} else {
		return true;
	}
}

function orderSubmit(){
    if(submitFlag=="1"){
    	submitFlag="2";
    	ajaxFun({
            url:"/Pay.action?createCharge",
            data:{
                "roomId":$("#roomId").val(),
                "checkInDay":$("#checkInDay").text(),
                "checkOutDay":$("#checkOutDay").text(),
                "name":$("#name").val(),
                "mobile":$("#mobile").val().replace(/\s+/g, ""),
                "channel":channel,
                "openid":$("#openid").val(),
                "csrfToken":$("#csrfToken").val()
            },
            success:function(data){
            	if(data.status == "-1") {
            		showTip(data.info);
            		disable(false);
            		return;
            	}
                if(data.status == "1") {
                	pingpp.createPayment(data.charge, function(result, err){
    		    		if (result == "success") {
    		    	        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
    		    	        window.location.href = "/Pay.action?goToPaySuccessPage";
    		    	    } else if (result == "fail") {
    		    	        // charge 不正确或者微信公众账号支付失败时会在此处返回
    		    	    	showTip("支付失败");
    		    	    	disable(false);
    		    	    } else if (result == "cancel") {
    		    	    	showTip("支付已取消");
    		    	    	disable(false);
    		    	    }
    	    		});
                }
            },
            error:function(){
            	showTip("无法连接，请检查网络");
            	disable(false);
            }
            
        });
    }
}

function disable(state) {
	if(state) {
		$(".footer .or-btn").text('支付中...');
		$(".footer .or-btn").attr("disabled", "true");
	} else {
		$(".footer .or-btn").text('支付');
		$(".footer .or-btn").removeAttr("disabled");
		submitFlag="1";
	}
}