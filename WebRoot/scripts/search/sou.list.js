var $checkInDay = $("#checkInDay");
var $checkOutDay = $("#checkOutDay");
var $location = $("#location");
var $sort = $("#sort");
var $lng = $("#lng");
var $lat = $("#lat");

$(function() {	
	adjustFooter();
	// 位置搜索
	$('.locationUl li').on('click', function(){
		$location.val($(this).text());
		$lng.val("");
		$lat.val("");
		$('.js-search span').text($(this).text()).addClass('c22bb62');
		search();
	});
	
	// 排序
	$('.u_sort li').click(function(){
		$('.u_sort li').removeClass('uLi_on');
		$(this).addClass('uLi_on');
		$sort.val($(this).attr("data"));
		search();
	});
	$('.js-sort').click(function(event) {
		if($(".rm-type").is(":hidden")) {
			$('.rm-type').show();
			$('.rm-top').show();
		} else {
			$('.rm-type').hide();
			$('.rm-top').hide();
		}
		event.stopPropagation();
	});
	$(document).click(function() {
		$('.rm-type').hide();
		$('.rm-top').hide();
	});
	
	// 附近搜索
	$(".js-nearby").click(function(event) {
		// 取消附近搜索
		if($lng.val() != "" && $lat.val() != "") {
			showTip("取消附近搜索", 3);
			$lng.val("");
			$lat.val("");
			search();
			return ;
		}
		// 附近搜索
		if(wxReadyStatus) {
			showTip("定位中...", 10);
			wx.getLocation({
				type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				success: function (res) {
					nearbySearch(res.longitude, res.latitude);
				},
				fail: function() {
					showTip("定位失败", 2);
				}
			});
		} else {
			showTip("定位失败，请重试", 2);
		}
		event.stopPropagation();
	});
	
	// 位置弹窗
	$('.js-search').click(function(){
		$('.search_tan').show();
		$('#indexPage').hide();
	});
	
    initCalendar();   
});


function search(){
	var location = $location.val();
	var checkInDay = $checkInDay.val();
	var checkOutDay = $checkOutDay.val();
	var sort = $sort.val();
	var lng = $lng.val();
	var lat = $lat.val();
	var queryString = "";
	if(location != ""){
		queryString += "&location="+encodeURIComponent(encodeURIComponent(location));	
	}
	if(checkInDay != "" && checkOutDay != ""){
		queryString += "&checkInDay=" + checkInDay + "&checkOutDay=" + checkOutDay;
	}
	if(sort != ""){
		queryString += "&sort=" + sort;
	}
	if(lng != "" && lat != "") {
		queryString += "&lng=" + lng + "&lat=" + lat;
	}
	window.location.href = "/Search.action?searchRooms" + queryString;
}

function nearbySearch(lng, lat) {
    var pointArr = [];
    pointArr.push(new BMap.Point(lng, lat));
    new BMap.Convertor().translate(pointArr, 1, 5, function (data){
        if(data.status === 0) {
             $lng.val(data.points[0].lng);
	       	 $lat.val(data.points[0].lat);
        }
        // 坐标转换异常，直接使用未转换的坐标
        else {
        	 $lng.val(lng);
	       	 $lat.val(lat);
        }
        $location.val("");
        search();
    });
}

/**
 * 初始化时间选择
 */
function initCalendar()
{	  
	var checkInDay = $checkInDay.val();
	var checkOutDay = $checkOutDay.val();
	var options = {
		 startDate:checkInDay,
		 endDate:checkOutDay,
		 veiwType:'view',
		 enterFun:function(){$("#indexPage").hide();},
		 backFun:function(){
			 $("#indexPage").show();
		}
	}; 
	
	$('#reportrange').daterangepicker(options, selectDate); 
	  
	  if(checkInDay!=''&&checkOutDay!=''){
		  showCheckInOutDay(checkInDay, checkOutDay);		  
		  $('#dateClearUp').show();
	  }
	  else
		  $('#dateClearUp').hide(); 
}

//选择完日期进行处理
function selectDate(checkInDay, checkOutDay) {
	$checkInDay.val(checkInDay);
	$checkOutDay.val(checkOutDay);
	showCheckInOutDay(checkInDay, checkOutDay);
	$('#list-wap').show();
	$('#dateClearUp').show();
	search();
}

function showCheckInOutDay(checkInDay, checkOutDay) {
	  $('#reportrange span').html((checkInDay.substring(5,10)).replace('-','.')+'-'+(checkOutDay.substring(5,10)).replace('-','.')).addClass("c22bb62");	  
}

// 清除日期
function dateSearch()
{
	$checkInDay.val("");
	$checkOutDay.val("");
	// add 
	// 隐藏清除按钮
	$('#dateClearUp').hide(); 
	// 隐藏日历
	$("#reportrange").data("daterangepicker").toggle();
	// 显示搜索页面
	$("#indexPage").show();
	// 还原日历状态
	$("#reportrange").html("<span>日期</span>");
	$('.in-range').each(function(){
		$(this).removeClass('in-range');
	});
	$('.start-date').each(function(){
		// t-2016-04-07
		var startDate = $('.start-date').attr('id');
		if(startDate.substring(2) == dateFormat(new Date(), "yyyy-MM-dd")) {
			$('.start-date').html("<i>今日</i>");
		} else {
			$('.start-date').text(parseInt(startDate.split("-")[3]));
		}
		$(this).removeClass('start-date active');
	});
	$('.end-date').each(function(){
		$('.end-date').text(parseInt($('.end-date').attr('id').split("-")[3]));
		$(this).removeClass('end-date active');
	});
	search();
}

var pageNow = 2;
// 下一页
function nextPage(pages) {
	// 已经到最后一页
	if(pageNow > pages) return;
	// 正在加载最后一页
	if(pageNow == pages) {
		$(".btn-more").hide();
	}
	$('.btn-more').hide();
    $('.loading').show();
	ajaxFun({
        url: '/Search.action?ajaxSearchRooms',
        data: {
        	location: $location.val(),
        	checkInDay: $checkInDay.val(),
        	checkOutDay: $checkOutDay.val(),
        	sort: $sort.val(),
        	lng: $lng.val(),
        	lat: $lat.val(),
        	pageNow: pageNow++
        },
        success: function(data) {
			if(data != undefined) {
				$.each(data, function(i, room) {
					var html = '<div class="cont"><a href="/Search.action?goToRoomDetailPage&roomId='+room.id+'">';
					html += '<mark class="n-img"><img src="'+room.default_pic+'"  alt="房间图片"></mark>';
					html += '<dl><dt><b class="dx-b01 fl">房间名：'+room.name+'</b><b class="dx-b01 fr price">¥ '+room.price+'</b></dt></dl> </a></div>';	               
					$(".list-mian").append(html);
				});
			}
			if(pageNow <= pages) {
				$('.btn-more').show();
			}
			$('.loading').hide();
			adjustFooter();
		},
		error: function(data) {
			$('.loading').hide();
			alert('访问失败了，请刷新重试');
			adjustFooter();
		}
	});
}

function adjustFooter(){
	$("#common_footer").show();
	$(".section").css('height', 'auto');
	var prHeight = document.documentElement.clientHeight-$(".head-fixed").outerHeight(true)-81+14;
	if($(".section").height() < prHeight){
		$(".section").css('height',prHeight+'px');
	}
}

var ajaxFun = function(d) {
    $.ajax({
        type: d.type || 'post',
        url: d.url || '',
        data: d.data || {},
        async: d.async || true,
        dataType: d.dataType || 'json',
        success: d.success,
        error: d.error ||
        function(d) {
            alert('访问失败了，请刷新重试');
        }
    });
};

var EARTH_RADIUS = 6371004; //单位M 

var PI = Math.PI;

function getRad(d) {
	return d * PI / 180.0;
}

function getGreatCircleDistance(lat1, lng1, lat2, lng2) {
	var radLat1 = getRad(lat1);
	var radLat2 = getRad(lat2);

	var a = radLat1 - radLat2;
	var b = getRad(lng1) - getRad(lng2);

	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
			+ Math.cos(radLat1) * Math.cos(radLat2)
			* Math.pow(Math.sin(b / 2), 2)));

	s = s * EARTH_RADIUS;
	s = Math.round(s * 10000) / 10000.0;

	return s;
}


/**
 * 时间对象的格式化;
 */
Date.prototype.format = function(format) {
    /*
     * eg:format="YYYY-MM-dd hh:mm:ss";
     */
    var o = {
        "M+" :this.getMonth() + 1, // month
        "d+" :this.getDate(), // day
        "h+" :this.getHours(), // hour
        "m+" :this.getMinutes(), // minute
        "s+" :this.getSeconds(), // second
        "q+" :Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" :this.getMilliseconds()
    // millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
    }
    for ( var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

//timestamp为时间戳
//format为时间格式 例： "yyyy/MM/dd hh:mm:ss"
function timestampFormat(timestamp,format){
 return new Date(timestamp).format(format);
}

//datetime为时间对象
//format为时间格式 例： "yyyy/MM/dd hh:mm:ss"
function dateFormat(datetime,format){
 return datetime.format(format);
}