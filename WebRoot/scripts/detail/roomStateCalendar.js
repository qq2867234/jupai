var $roomId = $("#roomId"),
	$checkInDay = $("#checkInDay"),
	$checkOutDay = $("#checkOutDay"),
	calendarButton = $("#reportrange"),
	special;

$(function() {
    
    // 获取房态信息，并生成房态日历。需要点击才能显示房态日历
	generateCalendar();
	
});     

var detailPageScrollTop;
var calendarPageScrollTop;

function generateCalendar() {
	//生成价格日历
    var today = new Date();
    var priceEndDate = new Date(today.getFullYear(), (today.getMonth() + 5), today.getDate());
    // 获取房态信息
    ajaxFun({
        type: "get",
        url: "/Search.action?getRoomStatus",
        data: {
        	"roomId": $roomId.val(),
            'endDate': priceEndDate.getFullYear() + "-" + (priceEndDate.getMonth() < 10 ? "0" + priceEndDate.getMonth() : priceEndDate.getMonth()) + "-01"
        },
        success: function(d) {
            special = (d && d.data) ? showPrice(d.data.items) : new Object;
            function showPrice(d) {
                var special = new Object;
                for (var i = 0; i < d.length; i++) {
                    (d[i].stock <= 0 || !d[i].isRent)  ? special[d[i].date] = {"price":"￥"+(d[i].price/100),"value":(d[i].price/100),"state":"无房","show":true}:special[d[i].date] ={"price":"￥"+(d[i].price/100),"value":(d[i].price/100),"state":"","show":false};
                }
                return special;
            }
            // 显示房态日历
            showClendar();
        },
        error: function() {
        	showTip("生成价格日历失败，请刷新重试");
        	showClendar();
        }
    });
}
    
function showClendar(){
	var options = {
	   startDate: $checkInDay.text() != "选择日期" ? $checkInDay.text() : "",
 	   endDate: $checkInDay.text() != "选择日期" ? $checkInDay.text() : "",
 	   veiwType:'view',
// 	   mindays:1, // 最少入住天数
 	   special:special,
 	   enterFun:function(){
 		   // 记录详情页滚动位置
 		   detailPageScrollTop = $(document).scrollTop();
 		   // 如果有记录日历页面的位置，则滚动到相应位置
 		   if(calendarPageScrollTop) {
 			   $("html,body").animate({scrollTop: calendarPageScrollTop}, 0);
 		   } else {
 			   $("html,body").animate({scrollTop: 0}, 0);
 		   }
 		   $("#indexPage").hide();
 		   $(".add_tx").hide();
 	   },
	   backFun:function(){
	   		// 显示详情
	   		$("#indexPage").show();
	   		// 记录日历页滚动位置
	   		calendarPageScrollTop = $(document).scrollTop();
	   		// 滚动到相应位置
	   		if(detailPageScrollTop) {
 			   $("html,body").animate({scrollTop: detailPageScrollTop}, 0);
	   		}
	   }
 	};
	
	// 初始化房态日历
	$('#reportrange').daterangepicker(options,selectdate);
}

//日历日期选择后日期与晚数赋值
function selectdate(checkInDay,checkOutDay){
	// 入住离开日期
  	$checkInDay.text(checkInDay);
  	$checkOutDay.text(checkOutDay);
    // 每晚价格
	$("#dayprice").text($(".table-condensed .start-date .perice-off input").val());
	// 总晚数
	var totalDays = $DTU.getDateMargin(stringToDate(checkInDay),stringToDate(checkOutDay));
	$('#totalDays').text(' ' + totalDays + ' ').parent().css("display", "inline-block");
	// 房间总价
	var totalMoney = 0;
	$(".table-condensed .start-date, .table-condensed .in-range").find("input").each(function() {
		totalMoney += parseInt($(this).val());
	});
	$(".totalMoney").text(totalMoney);
}