$(function() {	
	$('.u_sort li').click(function(){
		$('.u_sort li').removeClass('uLi_on');
		$(this).addClass('uLi_on');
	})
	$('.js-sort').click(function(event) {
		if($(".rm-type").is(":hidden")) {
			$('.rm-type').show();
			$('.rm-top').show();
		} else {
			$('.rm-type').hide();
			$('.rm-top').hide();
		}
		event.stopPropagation();
	})
	$(document).click(function() {
		$('.rm-type').hide();
		$('.rm-top').hide();
	});
	
	// 排序
	$('.price.u_sort li').click(function(event) {
		changeUrlParamVlaue("sort", $(this).attr("data"));
		// TODO 排序搜索
	})
	
	$('.js-search').click(function(){
		$('.search_tan').show();
	})
	
	$('.search_tan .back').click(function(){
		$('.search_tan').hide();
	})
	
    initTime();   

	 initNearBy();
})

/**
 * 初始化时间选择
 */
function initTime()
{	  
	var options = {
		 startDate:$("#search_startdate").val(),
		 endDate:$("#search_enddate").val(),
		 veiwType:'view',
		 enterFun:function(){$("#indexPage").hide();},
		 backFun:function(){
			 $(".dropdown-menu").hide();
			 $("#indexPage").show();
			 $("#reportrange").removeClass("active");
		}
	}; 
	
	$('#reportrange').daterangepicker(options, changeDate); 
	  
//	  if(m.sBegin!=''&&m.sEnd!=''){
//		  $('#reportrange span').html('<b>'+(m.sBegin.substring(5,m.sBegin.length)).replace('-','.')+'</b><b>-'+(m.sEnd.substring(5,m.sEnd.length)).replace('-','.')+'</b>');	  
//		  $('#reportrange').addClass("avtive");
//		  $('#dateClearUp').show();
//	  }
//	  else
//		  $('#dateClearUp').hide(); 
}

//选择完日期进行处理
function changeDate(sBegin, sEnd) {
	changeUrlParamVlaue("startdate", sBegin);
	changeUrlParamVlaue("enddate", sEnd);
	$('#list-wap').show();
	$('#reportrange span').html('<b>'+(sBegin.substring(5,sBegin.length)).replace('-','.')+'</b><b>-'+(sEnd.substring(5,sEnd.length)).replace('-','.')+'</b>');	  
	$('#reportrange').addClass("avtive");
	$('#dateClearUp').show();
	// TODO 日期搜索
}

// 清除日期
function dateSearch()
{
	changeUrlParamVlaue("startdate","");
	changeUrlParamVlaue("enddate","");
	// add 
	// 隐藏清除按钮
	$('#dateClearUp').hide(); 
	// 隐藏日历
	$(".dropdown-menu").hide();
	// 显示搜索页面
	$("#indexPage").show();
	
	// 还原日历状态
	$("#reportrange").html("<span>日期</span>").removeClass("active").removeClass("avtive");
	$('.in-range').each(function(){
		$(this).removeClass('in-range');
	})
	$('.start-date').each(function(){
		// t-2016-04-07
		var startDate = $('.start-date').attr('id');
		if(startDate.substring(2) == dateFormat(new Date(), "yyyy-MM-dd")) {
			$('.start-date').html("<i>今日</i>");
		} else {
			$('.start-date').text(parseInt(startDate.split("-")[3]));
		}
		$(this).removeClass('start-date');
	})
	$('.end-date').each(function(){
		$('.end-date').text(parseInt($('.end-date').attr('id').split("-")[3]));
		$(this).removeClass('end-date');
	})
	// TODO 日期搜索
}
///////////////////////////////////////

function setInfo(cityname,citypinyin){
	$('#cityname').val(cityname);
	setCityname(cityname);
	$('.search_tan').hide();
}

function setCityname(cityname){
	var name = cityname;
	if(name.length>9){
		name = name.substring(0,9)+'...';
	}
	$('.cityname').text(name);
	$('.cityname').addClass("c22bb62");
}

//初始化当前位置
function initNearBy()
{
	var nearby = $("#nearby").val();
	if(nearby=="1")
	{
	  $('#toploading').show();
	  navigator.geolocation.getCurrentPosition(findposition, locationError);
	}
}
function  findposition(position)
{
	 var lon = position.coords.longitude;
     var lat = position.coords.latitude;  
     var gpsPoint = new BMap.Point(lon,lat);
     BMap.Convertor.translate(gpsPoint,0,translateCallback);    
}
//百度坐标转换
function translateCallback(point){
	 var lon = point.lng;
	 var lat = point.lat;	
	 sendRequest(lat+","+lon);	
}
function locationError()
{
	$("#errormsg b").html("获取当前位置失败,默认跳转到当前城市列表");	
	$("#errormsg").show();
	sendRequest("");
}
function sendRequest(latlng)
{			
	$('#toploading').show();
	if(latlng==null)
		latlng = "";
	var d = {latlng:latlng,distance:"2000"};
	var ctx=$('#ctx').val();
	var url  = ctx+"/ajax/findposition";
	var para = {
            type: "get",
            url: url,
            data: d,
            success: function(d) {             
            	var citypinyin = d.citypinyin;
            	var skeyword = d.skeyword;
            	var cityName = d.cityName;
            	var skeywordShow = d.skeywordShow;            	
            	$("#search_citypy").val(citypinyin);            	
            	$("#search_skeyword").val(skeyword);             	
            	if(skeyword!='')
            	{
	            	$(".adress_of").html("距离："+skeywordShow+"<span></span>");
	            	if($(".fc2015").css("display")=="none")
	            	{
	            		$("#top_div").css("bottom",10);
	            		$(".index-footer").css("padding-bottom",34);
	            		$('.adress_of').css('bottom','0');
	            		$('.adress_of').show();
	            	} 
	            	else
	            	{
	            		$("#top_div").css("bottom",10);
	            		$(".index-footer").css("padding-bottom",80);
	            		$('.adress_of').css('bottom','50');
	            		$('.adress_of').show();
	            	}	            	
            	}
            	else
            		$('.adress_of').hide();
            	$("#cityName").html(cityName);
            	$("#skeyword").html(skeywordShow);  
            	$("#query_str").val(citypinyin);  
            	$("#sortzuijin").show();             	
            	soumore();   
            	
            	//发送日志
            	MY.log_type=3;
            	$("#my_p_y").val(citypinyin);  
        		MY.send_p();
            },
            error: function() {            	
            }
    };
	ajaxFun(para);
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


//改变多选的值
function changeMoreSelcet(key,replacestr)
{
	var search_key = $("#search_"+key).val();
    var replacestr = replacestr.replace(key+"|","");
    var newstr = replaceMoreSelect(search_key,replacestr,"_");
    changeUrlParamVlaue(key,newstr);		
}

//多选替换
function replaceMoreSelect(str,replacestr,sperator)
{
	var newstr = "";
	if(str!=''&&replacestr!='')
	{
		var strs = str.split(sperator);
		var replacestrs = replacestr.split(sperator);
		for(var i=0;i<strs.length;i++)
		{
			var isadd = true;
			for(var j=0;j<replacestrs.length;j++)
			{
				if(strs[i]==replacestrs[j])
				{
					isadd = false;
					break;
				}
			}	
			if(isadd)
			{
				if(newstr=="")
					newstr+=strs[i];
				else
					newstr+=sperator+strs[i];
			}	
		}			
		return newstr;
	}
	else
	{
		return str;
	}
}


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
    }
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
}

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