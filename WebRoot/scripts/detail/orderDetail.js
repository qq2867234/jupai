// 防止重复提交订单
var submitFlag ="1";

var channel;
$(function(){
	
//	$("#name").bind('focus', function() {
//		$(window).scrollTop($(this).offset().top - 60);
//	});

	// 提交订单
	$(".footer .or-btn").click(function(){
		disable(true);
		// 下单人姓名验证
		if(!nameCheck())
			return;					
		// 手机验证
		if(!mobileCheck())
			return;					
		// 身份证验证
		if(!idNumberCheck())
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
function idNumberCheck(){
	if ($("#idNumber").val() == '') {
		showTip("请填写身份证号");
		disable(false);
		return false;
	} 
	if(!virIdNumber()) {
		showTip("请填写有效的身份证");
		return false;
	}
	return true;
}
function virIdNumber() {
	var idcard = $("#idNumber").val().trim(); var city = {11 : "北京", 12 : "天津", 13 : "河北", 14 : "山西", 15 : "内蒙古", 21 : "辽宁", 22 : "吉林", 23 : "黑龙江 ", 31 : "上海", 32 : "江苏", 33 : "浙江", 34 : "安徽", 35 : "福建", 36 : "江西", 37 : "山东", 41 : "河南", 42 : "湖北 ", 43 : "湖南", 44 : "广东", 45 : "广西", 46 : "海南", 50 : "重庆", 51 : "四川", 52 : "贵州", 53 : "云南", 54 : "西藏 ", 61 : "陕西", 62 : "甘肃", 63 : "青海", 64 : "宁夏", 65 : "新疆", 71 : "台湾", 81 : "香港", 82 : "澳门", 91 : "国外 "}; var pass = true; if (idcard.length != 15 && idcard.length != 18) {pass = false; return pass; } var Ai = ""; if (idcard.length == 18) {Ai = idcard.substring(0, 17); } else if (idcard.length == 15) {Ai = idcard.substring(0, 6) + "19" + idcard.substring(6, 15); } var numValid = /^\d+$/; if (numValid.test(Ai) == false) {pass = false; return pass; } if (parseInt(Ai.substr(6, 4)) % 4 == 0 || (parseInt(Ai.substr(6, 4)) % 100 == 0 && parseInt(Ai.substr(6, 4)) % 4 == 0)) {ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; } else {ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; } if (ereg.test(idcard) == false) {pass = false; return pass; } if (!city[idcard.substr(0, 2)]) {pass = false; return pass; } else {if (idcard.length == 18) {idcard = idcard.split(''); var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]; var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]; var sum = 0; var ai = 0; var wi = 0; for ( var i = 0; i < 17; i++) {ai = idcard[i]; wi = factor[i]; sum += ai * wi; } var last = parity[sum % 11]; if (last != idcard[17]) {pass = false; return pass; } } } return pass;
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
                "name":$("#name").val().replace(/\s+/g, ""),
                "mobile":$("#mobile").val().replace(/\s+/g, ""),
                "idNumber":$("#idNumber").val().replace(/\s+/g, ""),
                "channel":channel,
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