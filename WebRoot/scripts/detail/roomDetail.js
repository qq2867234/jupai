var submitFlag ="1"; // 防止重复提交

$(function() {
	//提交订单
    $(".order-fix .btn-ok").on("click", submitOrder);
    
	$("#confirmDate").on("click", function(e) {
		$("#reportrange").data("daterangepicker").toggle();
		// 阻止冒泡
		return false;
	});
});     

function submitOrder() { 	
    if($checkInDay.text()=="选择日期" || $checkOutDay.text()=="选择日期") {
    	$(".add_tx").show();;
    	return ;
    }
    disable(true);
    ajaxFun({
        type: "get",
        url: "/Order.action?isCanRent",
        data: {
    		'roomId': $roomId.val(),
    		'checkInDay': $checkInDay.text(),
    		'checkOutDay': $checkOutDay.text()
        },
        success: function(data) {
        	disable(false);
			if(data.isCanRent){
				if(submitFlag=="1"){
					submitFlag="2";
					window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+$("#appid").val()+
						"&redirect_uri=" + encodeURIComponent('http://'+$("#domain").val()+'/Order.action?goToOrderDetailPage&roomId=' + $roomId.val() + '&checkInDay=' + $checkInDay.text() + '&checkOutDay=' + $checkOutDay.text())+
						"&response_type=code&scope=snsapi_base&state="+$roomId.val()+"#wechat_redirect";
				}
			}else{
				submitFlag="1";
				showTip("行程内已有房间被预定完！");
			}
        },
        error: function() {
			showTip("系统异常，请稍后再试");
			disable(false);
		}
    });
}

function cancelInputDate() {
	$(".add_tx").hide();
}

function disable(state) {
	if(state) {
		$(".footer .or-btn").text('处理中...');
		$(".footer .or-btn").attr("disabled", "true");
	} else {
		$(".footer .or-btn").text('立即预定');
		$(".footer .or-btn").removeAttr("disabled");
	}
}
