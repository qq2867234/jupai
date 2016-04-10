var submitFlag ="1"; // 防止重复提交

$(function() {
	//提交订单
    $(".order-fix .btn-ok").on("click",submitOrder);
    
	$("#confirmDate").on("click", function(e) {
		$("#reportrange").data("daterangepicker").toggle();
		// 阻止冒泡
		return false;
	});
});     

function submitOrder()
{ 	
    var d = {
        'roomid': roomId,
        'roomnum': 1,
        'checkinday': $startdate.text(),
        'checkoutday': $enddate.text()
    };
    if($startdate.text()=="选择日期"||$enddate.text()=="选择日期")
    {
    	$(".add_tx").show();;
    	return ;
    }
    
    var ua = window.navigator.userAgent.toLowerCase();
    
    var source="";
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    	source="public";
    }else{
		source="wap";
    }
    
    ajaxFun({
        type: "get",
        data: d,
        url: Urls.detail.checkstock,
        success: function(d) {
			if(d.status == 0){
				submitFlag="1";
				showTip(d.tipmsg);
			}else{
				if(submitFlag=="1"){
					submitFlag="2";
//					window.location.href ='/order/pre?roomId=' + roomId + '&checkinday=' + $startdate.text() + '&checkoutday=' + $enddate.text()+'&roomNum='+$("#roomNum").val()+'&phone='+$("#phone").val()+'&source='+source ;
					// TODO 跳转到订单页面
				}
			}
        }
    });
}

function cancelInputDate() {
	$(".add_tx").hide();
}

var op='';
if(op=='submit')
{
	submitOrder();
}
