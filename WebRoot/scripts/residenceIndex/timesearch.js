//分页相关的参数
var timesearchCurrentPages=1;
var timesearchTotalPage = 1;
//接收小区编号
var timesearchResidenceIds = [];
//接收路线
var timesearchRoutes = [];
//var timesearchAllRoutes = [];
var timesearchResidenceNames = [];
var timesearchDurations = [];
var timesearchResidences = [];
var timesearchDestination;
var data={};
var destination = "";
var mode = "";
var time = 10;
var lngLat;
var num;
var timesearchCount = 0;
var intPage = 1;
var residenceLocations = [];


//2表示精确 1表示模糊
var isFuzzy = 2;
//1表示没有符合的小区
var isNotContain = 0;
//模糊结果集合
var fuzzyResults = [];
//判断是place操作 0代表不是place操作，1代表是place操作
var isPlace = 1;
var oldDestination = "";
var oldMode = "";
var oldTime = 10;
//右侧小区经纬度在数组中的下标
var timeSearchResidenceIndex = -1;

// 是否通过点击模糊结果进行搜索，默认不是
var isClickFuzzyResult = 0;


//在首页的时候使后退按钮失效
function invalidateTimesearchPre() {
	if(timesearchCurrentPages == 1){
		$("#timesearchPre").addClass("unAvailable");
	} else if($("#timesearchPre").hasClass("unAvailable")) {
		$("#timesearchPre").removeClass("unAvailable").addClass('prevPage');
	}
}

//在最后一页的时候使前进按钮失效
function invalidateTimesearchNext() {
	if(timesearchCurrentPages == timesearchTotalPage) {
		$("#timesearchNext").addClass("unAvailable");
	} else if($("#timesearchNext").hasClass("unAvailable")) {
		$("#timesearchNext").removeClass("unAvailable").addClass('nextPage');
	}
}
var newResidenceData = [];
//准备用于时刻搜的地图数据
function readyTimesearchMapData(data) {
	 residenceLocations=[];
	 newResidenceData = []
	 $.each(data, function(i,item){
		  var point=new BMap.Point(item.longitude,item.latitude);
		  residenceLocations.push(point);
		  newResidenceData.push(item);
		  timesearchResidenceIds.push(item.residenceId);
		  timesearchResidenceNames.push(item.residenceName);
  		  timesearchDurations.push(item.duration);
	 });
}
//在地图上标注出小区
function showTimesearchResidences(){
	var markers = [];
	var myIcon;
	var marker;
	var point;
	for(var i=0;i<timesearchResidenceIds.length;i++){
		myIcon = new BMap.Icon(newResidenceData[i].iconBas, new BMap.Size(30, 40), {
			   anchor: new BMap.Size(10, 10)
		});
		point=new BMap.Point(residenceLocations[i].lng,residenceLocations[i].lat);
		marker = new BMap.Marker(point, {icon: myIcon});
		//markers.push(marker);

		BMapLib.EventWrapper.addListener(marker, 'click', function(e) {
		markerClick(e);
	});
		map.addOverlay(marker); 
	}
	myIcon = new BMap.Icon("/images/public/map/locationSec.png", new BMap.Size(34, 38), {
		   //anchor: new BMap.Size(-30, 40)
	});
	point=new BMap.Point(timesearchDestination.lng,timesearchDestination.lat);
	map.setCenter(point);
	marker = new BMap.Marker(point, {icon: myIcon});
	/*addclickListener(marker);*/
	map.addOverlay(marker);   
	//var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markers});
}





//下一页
function timesearchNextPage(){
	isPlace = 0;
	if(intPage < timesearchTotalPage) {
		timesearchCurrentPages = intPage + 1;
		show();
	} else {
		timesearchCurrentPages = timesearchTotalPage;
	}
}

//上一页
function timesearchPrevPage(){
	isPlace = 0;
	if(intPage > 1) {
		timesearchCurrentPages = intPage - 1;
		show();
	} else {
		timesearchCurrentPages = 1;
	}
}

$(function(){
	

});

function clearTimesearchdata() {
	timesearchResidenceIds = [];
	timesearchAllRoutes = [];
	timesearchResidenceNames = [];
	timesearchDurations = [];
	timesearchRoutes = [];
	timesearchResidences = [];
	fuzzyResults = [];
}

// 查找指定小区 到达 目标建筑 的路线（调direction API获取）
function getRoute(residenceName){
	timesearchRoutes = [];
	timesearchResidenceIds = [];
//	// 截取小区名
//	residenceName = origin.substring(0,origin.indexOf('('));
//	// 截取耗时
//	duration = origin.substring(origin.indexOf('(')+1,origin.indexOf('分钟'));
	
	// 异步查询小区到目的地路线
	$.ajax({
        type: "post",
        async:false,
        data: {
        	destination: destination,
        	mode: mode,
        	residenceName: residenceName
        },
        url: "/TimeSearch.action?route"
    }).done(
    function(rtnData) {
//    	rtnData = eval("(" + rtnData + ")");
    	timesearchResidenceIds.push(rtnData.residenceId);
        $.each(
        rtnData.route,
        function(index, route) {
        	timesearchRoutes.push(route);
		});
    });
//	timesearchAllRoutes.push(timesearchRoutes);
}

//填充检索出来的信息到页面上
function fillSearchData() {
	if(isNotContain == 1) {
		$("#timeSearch").show();
		$("#timesearchCurrPage").text(timesearchCurrentPages);
		$("#vagueList").empty();
		$("#warningEm").text("目前没有符合的小区");
		$("#warningEm").css("color","red");
		$("#timesearchTotalPage").text(timesearchTotalPage);
		$("#timesearchCurrPage").text(timesearchCurrentPages);
		invalidateTimesearchPre();
		invalidateTimesearchNext();
		return false;
	}
	if(isFuzzy == 2) {
		$("#timeSearch").hide();
		if(timesearchTotalPage > 50) {
			$("#timesearchTotalPage").text("50+")
		} else {
			$("#timesearchTotalPage").text(timesearchTotalPage);
		}
		$("#timesearchCurrPage").text(timesearchCurrentPages);
		// 移除等待提示
		//$("#waiting").remove();
		$("#searchPaging").hide();
		$("#searchTimePaging").show();
		//var part1 = "<dl class='tra clearfix'> <dt><img src='' /></dt> <dd class='community clearfix'><a href=\"#\">傲城融富中心</a><span>均价:32813元/平,1998年建</span><a class='traffic' alt='交通' href='#'></a><a class='broker' alt='租售服务' href='#'></a></dd>";
		//var part2 = "<dd class='household clearfix'> <span class='h1' title='总价范围131-540万,中间价340万'>131万</span><span class='h2' title='总价范围368-789万,中间价549万'>368万</span></dd>";
		var part3 = "";
		var residence = "";
		var unit = "万";
		for(var i = 0; i < timesearchResidences.length; i++) {
//			residence = "";
//			var builtYear=timesearchResidences[i].builtYear === undefined?"":'建于'+timesearchResidences[i].builtYear + '年 ';
//			var unitPriceall=timesearchResidences[i].unitPriceall!==undefined&&timesearchResidences[i].unitPriceall>0?"<p><b>"+timesearchResidences[i].unitPriceall+"</b>元/平</p>":"";
//			var school_tag=timesearchResidences[i].school_tag!==undefined?"<span class='school tags tag1'>"+timesearchResidences[i].school_tag+"</span>":'';
//			var metro=timesearchResidences[i].metro>0?"<span class='metro tags tag2'>地铁</span>":'';
//			var homePth="/home/"+timesearchResidences[i].residenceId+houseType+0;
//			var brokerPath="/residencebroker/"+timesearchResidences[i].residenceId+houseType;
//			residence = residence
//				+"<dl>"
//				+"<dt>"
//				+"<img src='"+timesearchResidences[i].smallPic+"' width='323' height='220'  alt=''/>"
//				+unitPriceall
//				+"</dt>"
//				+"<dd class='dlName'><a href='"+timesearchResidences[i].url+"'>"+timesearchResidences[i].residenceName+"</a></dd>"
//				+"<dd>"
//				/*+"<p>"+resObgs[i].address+builtYear+"</p>"*/
//				+"<p>"+builtYear+"</p>"
//				+school_tag
//				+metro
//				+"</dd>"
//				+"<dd class='dlText'><span>"+timesearchResidences[i].roomString+"居房产符合条件,</span><span><a href='"+homePth+"'>"+timesearchResidences[i].listNum+"</a>套房产在售</span><span><a href='"+brokerPath+"'>"+timesearchResidences[i].brokerNum+"</a>位经纪人为您服务</span></dd>"
//				+" </dl>";
			var builtYear = timesearchResidences[i].builtYear === undefined?"":'建于'+timesearchResidences[i].builtYear + '年 ';
			var unitPriceall = timesearchResidences[i].unitPriceall!==undefined&&timesearchResidences[i].unitPriceall>0?timesearchResidences[i].unitPriceall+"元/平":"";
			var school_tag = timesearchResidences[i].school_tag !== undefined ? "<a href='###' class='schoolIcon' title='"+timesearchResidences[i].school_tag+"'></a>"
					: '';
			var metro = timesearchResidences[i].metro > 0 ? "<a href='###' class='subway' title='地铁'></a>"
					: '';
			var homePath = "/home/"+timesearchResidences[i].residenceId+houseType+0;
			var brokerPath="/residencebroker/"+timesearchResidences[i].residenceId+houseType;
			var housety = houseType == 1 ? '在售' : '出租';
			if (resObgs[i].listNum == 0 && resObgs[i].brokerNum == 0) {
				serviceInfo = "";
			} else if (timesearchResidences[i].listNum != 0 && timesearchResidences[i].brokerNum != 0) {
				serviceInfo = " <dd class='broker'><a href='"+brokerPath+"' class='btn' target='_blank'><span></span>经纪人("+timesearchResidences[i].brokerNum+")</a></dd>"+
	            "<dd class='onsale'><a href='"+homePath+"' target='_blank'>" + timesearchResidences[i].roomString+"居房产符合条件" + timesearchResidences[i].listNum+"套房产"+housety+"</a></dd>";
				
				
			} else if (timesearchResidences[i].listNum == 0 && timesearchResidences[i].brokerNum != 0) {
				serviceInfo = "<dd class='broker'><a href='"+brokerPath+"' class='btn' target='_blank'><span></span>经纪人("+timesearchResidences[i].brokerNum+")</a></dd>" +
				 "<dd class='onsale'><a href='###' target='_blank'>" + timesearchResidences[i].roomString+"居房产符合条件</a></dd>";;
	
			} else if (timesearchResidences[i].listNum != 0 && timesearchResidences[i].brokerNum == 0) {
				serviceInfo = "<dd class='onsale'><a href='"+homePath+"' target='_blank'>"+timesearchResidences[i].listNum+"套房产"+housety+"</a></dd>";
			}
			residence = residence + "<dl><a class='img' target='_blank' href='"+timesearchResidences[i].url+"'><img src='"+timesearchResidences[i].smallPic+"' alt='"+timesearchResidences[i].brokerNum+"'/></a>" 
			+ "<dt><a target='_blank' href='"+timesearchResidences[i].url+"'>"+timesearchResidences[i].residenceName+"</a></dt><dd class='year'>"+builtYear+"</dd>" +
			  "<dd class='icon'>" +
			  school_tag +
			  metro + 
			  "</dd>" +
			  "<dd class='price'>"+unitPriceall+"</dd>" +
			  serviceInfo + "</dl>";
			if(num == 1 && timesearchResidenceNames[i].indexOf("没有") != -1){
				part3 = "<ul class='route'><li class=\"des clearfix timesearchTitle\"><span class=\"origin\"></span><a class='originName'>"+timesearchResidenceNames[i]+"</a></li>";
			}else{
				var timeD = "";
				if(timesearchDurations[i] != null) {
					timeD = "时长" + timesearchDurations[i] + "分钟";
				} 
		    	part3 = "<ul class='route'><li class=\"des clearfix timesearchTitle\"><span class=\"origin\"></span><a class='originName'>"+timesearchResidenceNames[i]+"</a><span class=\"finish\"></span><a>"+destination+"</a><span class=\"time\">"+timeD+"</span></li>";
			}
			var part4 = "</ul></dl>";
			if(residence.length>0) {
//				$("#listPan").append(residence + part3 + part4);
				$("#listPan").append(residence);
				$("#listPan dl").eq(i).bind("mouseenter" ,function(){
					current_index = $("#listPan dl").index(this);
					var markobj = searchMarker(
							current_obj[current_index].longitude,
							current_obj[current_index].latitude);
					BMapLib.EventWrapper.trigger(markobj, 'click', {
						'obj' : markobj
					});
					
					
					
					/*if(current_marker != undefined) {
						restoreIcon(current_marker);
					}
					current_index = $("#listPan dl").index(this);
					current_marker = searchMarker(current_obj[current_index].longitude, current_obj[current_index].latitude);
					changIcon(current_marker);
					openWindow();*/
					
					
					
				});
				initMap(990,1200,10);
			}
			residence="";
		}
		//查询交通状况traffic
		$(".traffic").bind('click',function() {
			$("ul.route").hide();
			$(this).parents("dl").find("ul").show();
			
			//var duration = $(this).parents("dl").find(".time").text();
			var liLength = $(this).parents("dl").find("ul").children().length;
			if(liLength <= 1) {
				$(this).parents("dl").find("ul").children().not("li:first").remove();
				var residenceName = $(this).parents("dl").find(".originName").text();
				getRoute(residenceName);
				var part3 = "";
				for(var i = 0; i < timesearchRoutes.length; i++) {
					if(mode == "步行"){
						part3 += "<li><span class='walk'></span> "+timesearchRoutes[i]+" </li>";
					} else if(mode == "公交"){
						var start = timesearchRoutes[i].indexOf("乘坐");
						if(start == 0){
							part3  += "<li><span class='bus'></span> "+timesearchRoutes[i]+" </li>";
						} else if(start == -1){
							part3  += "<li><span class='walk'></span> "+timesearchRoutes[i]+" </li>";
						} else {
							part3 += "</ul>";
						}
					} else {
						part3 += "<li><span class='car'></span> "+timesearchRoutes[i]+" </li>";
					}
				}
				var part4 = "";
				$(this).parents("dl").find("ul").append(part3);
			} 
			
//			if($(".route li").not(".timesearchTitle").length>3)
//			{
//	    		$(".route li:gt(3)").hide();
//	    		var oMore = "<li class='loadMore'>更多</li>";
//	    		$(".route").append(oMore);
//	    		$(".route .loadMore").click(function(){
//	    			$(this).remove();
//	    			$(".route li:gt(3)").show();
//	    		});
//			}
		});
		
	} else {
		if(fuzzyResults.length > 0) {
			for(var i=0; i < fuzzyResults.length; i++) {
				var address = fuzzyResults[i].address;
				var a = address.charAt(0);
				var a1 = parseInt(a);
				var part1;
				// 首字符不是数字，address里存的是地址
				if (isNaN(a1)){
					part1 = "<dl><dt>"+fuzzyResults[i].name+"</dt><dd>地址："+fuzzyResults[i].address+"</dd><input type='hidden' value='"+fuzzyResults[i].lngLat+"'></dl>";
				}
				// 首字符是数字，address里存的是途径公交
				else{
					part1 = "<dl><dt>"+fuzzyResults[i].name+" - 公交站</dt><dd>途径公交车："+fuzzyResults[i].address+"</dd><input type='hidden' value='"+fuzzyResults[i].lngLat+"'></dl>";
				}
				$("#vagueList").append(part1);
			}
			$("#vagueList").children("dl").bind("click", function() {
				var destination = $(this).children("dt").text().split(" ")[0];
				var lngLat = $(this).children("input").val();
				
				$("#destination").val(destination);
				$("#lngLat").val(lngLat);
				// 标志是通过点击模糊结果进行时刻搜
//				alert("通过点击模糊结果进行时刻搜");
				isClickFuzzyResult = 1;
				$("#direction").click();
			});
		} else {
			$("#vagueList").empty();
			$("#warningEm").text("目前没有符合的小区");
			$("#warningEm").css("color","red");
		}
	}
	
}
//进行时刻搜
function timesearchPaging() {
	clearTimesearchdata();
	setTimesearchOptions();
	setTimesearchMapOptions();
	keywords=formatKeyword(keywords);
	$("#keywords").val(keywords);
	rent=formatRent(rent);
	if(typeof(rent) != "undefined" && rent != "") {
		$("#price").val(rent+"(万)");
	}
	
	if(destination == "" || mode == "" || time == "" ){
		$("#listPan").children().remove();
		$("#warningEm").text("请设置小区、出行方式、时间");
		$("#warningEm").css("color","red");
		return false;
	} else {
		$("#warningEm").text("");
		var i = 0;
		// 清空原来显示结果
		$("#listPan").children().remove();
		$(".holder").empty();
		
		// 等待提示
		var oWait = "<div id='waiting'></div>";
		$("#listPan").append(oWait);
		
		// 截取时间里的数字
		var newTime = time.substring(0,time.indexOf("分钟"));
		var url = "";
		if(isPlace == 0) {
			url = "/TimeSearch.action?palceDestinationNew";
		} else {
			url = "/TimeSearch.action?palceDestinationNew";
		}
		// 异步查询合格小区
		$.ajax({
            type: "post",
            async:false,
            data: {
            	queryStrings:transTimesearchURL()
//            	destination: destination,
//            	mode: mode,
//            	time: newTime,
//            	currPage:timesearchCurrentPages
            },
            url:url
        }).done(
        function(rtnData) {
        	// 移除等待提示
        	$("#waiting").remove();
//        	rtnData = eval("(" + rtnData + ")");
        	if(rtnData.isNull == "true") {
        		$("#").text("请设置小区、出行方式、时间");
        		$("#warningEm").css("color","red");
        		return false;
        	}
        	timesearchTotalPage = rtnData.pages;
        	intPage = rtnData.intPage;
        	if(rtnData.notContain == "目前没有符合的小区") {
        		isNotContain = 1;
        		return false;
        	} else {
        		isNotContain = 0;
        	}
    		//$("#timeSearch").remove();
    		//CoverLayer(0);
        	
            // 保存结果以供下次使用
            data = rtnData.result;
        	timesearchTotalPage = rtnData.pages;
        	intPage = rtnData.intPage;
            // 精确结果
           if(rtnData.type == 2){
        	   current_obj = [];
        	   isFuzzy = 2;
	            // 小区数量
	            num = rtnData.residences.length;
	            timesearchDestination = rtnData.destination;
	            readyTimesearchMapData(rtnData.residences);
	            showTimesearchResidences();
//	            // 遍历所有小区并显示
//	            $.each(
//	            rtnData.result,
//	            function(index, element) { 
//            		timesearchResidenceNames.push(element.residenceName);
//            		timesearchDurations.push(element.duration);
//            		//timesearchResidenceIds.push(element.residenceId);
//	            });
	            $.each(
    	            rtnData.residences,
    	            function(index, element) { 
    	            	var showPrice=findshowPrice(element);
    	            	element.showPrice=showPrice;
    	            	current_obj.push(element);
    	            	timesearchResidences.push(element);
    	            });
	            var url = "/search"; 
				url = url + "/" + transTimesearchURL();
//				window.history.pushState({},0,url);   
           } else if(rtnData.type == 1){
        	   isFuzzy = 1;
        	   if(rtnData.isCorrect == "true") {
        		   $("#warningEm").text("为了准确定位，请在以下名称中选择您的起始地点：");
        		   $("#warningEm").css("color","red");
        		   $.each(rtnData.result, function(index, element) {
        			   fuzzyResults.push(element);
              	   });
        	   } else {
        		   fuzzyResults = [];
        	   }
           }
        });	
		
	}
}
//恢复时刻搜搜索现场
function restoreTimesearchScene() {
	var queries;
	var oldURL = location.href;
	var querys = [];
	var mapDetails = [];
	querys = oldURL.split("search/");
	if(querys[1] != null) {
		mapDetails = querys[1].split("_");
		if(mapDetails[17] != null && mapDetails[17] == 1) {
			if(mapDetails.length>10) {
				var point = new BMap.Point(Number(mapDetails[12]),Number(mapDetails[13]));    
				map.centerAndZoom(point,Number(mapDetails[5])); 
				queries = querys[1];
				isTimesearch = mapDetails[17];
				if(mapDetails[0] == 0) {
					 $("#keywords").val("");
				}
				else {
					$("#keywords").val(decodeURIComponent(mapDetails[0]));	
				}
				if(mapDetails[1]==1) {
					$("#type").val("买房");
					if(mapDetails[2] != 0) {
						$("#price").val(mapDetails[2]+"万");
					} else {
						$("#price").val("预算");
					}
					if(mapDetails[4] != 0) {
						newTag = mapDetails[4];
					}
				} else {
					$("#type").val("租房");
					if(mapDetails[2]!=0) {
						$("#price").val(mapDetails[2]+"元");
					} else {
						$("#price").val("预算");
					}
				}
			   if(mapDetails[3] == 0) {
				   $("#bedroom").val("居室");
			   }
			   else {
				   $("#bedroom").val(mapDetails[3]+"+");  
			   }
			   
			   destination = decodeURI(mapDetails[14]);
			   mode = decodeURI(mapDetails[15]);
			   time = mapDetails[16] + "分钟";
			   oldDestination = destination;
			   oldMode = mode;
			   oldTime = time;
			   timesearchCurrentPages = mapDetails[10];
			   $(".destination").val(destination);
			   $(".modeInput").val(mode);
			   $(".timeInput").val(time);
		    } else {
				if(mapDetails[0] == 0) {
					 $("#keywords").val("");
				}
				else {
					$("#keywords").val(decodeURIComponent(mapDetails[0]));	
				}
				if(mapDetails[1]==1) {
					$("#type").val("买房");
					if(mapDetails[2] != 0) {
						$("#price").val(mapDetails[2]+"万");
					} else {
						$("#price").val("预算");
					}
				} else {
					$("#type").val("租房");
					if(mapDetails[2]!=0) {
						$("#price").val(mapDetails[2]+"元");
					} else {
						$("#price").val("预算");
					}
				}
			   if(mapDetails[3] == 0) {
				   $("#bedroom").val("居室");
			   }
			   else {
				   $("#bedroom").val(mapDetails[3]+"+");  
			   }
		   } 
			queries = transTimesearchURL();
			var TimeKey = $(".destination").val()+','+ $(".modeInput").val()+','+ $(".timeInput").val();
			$("#condSpan").text(TimeKey);
			$("#clockA").hide().next().show().next().show();
		}		
	}
}

//设置时刻搜的搜索条件
function setTimesearchOptions() {
	// 得到终点名称
	destination = $.trim($("#destination").val());
	// 得到交通方式
	mode = $.trim($("#modeInput").val());
	// 得到可接受时间
	time = $.trim($("#timeInput").val());
	if(isClickFuzzyResult == 1){
//		alert("setTimesearchOptions"+"isClickFuzzyResult=1");
		// 得到经纬度
		lngLat = $.trim($("#lngLat").val());
		isClickFuzzyResult = 0;
	}else{
//		alert("setTimesearchOptions"+"isClickFuzzyResult=0");
		lngLat = null;
	}
	//得到关键字
	keywords=$.trim($("#keywords").val());
	//等到租/卖类型
	houseType=$("#indexRoomtype").val();
	if(houseType=="买房") {
		houseType=1;
	} else {
		houseType=2;
		//readyHome=$("#rent_readyHome").val();
	}
	rent=formatRent($("#price").val());
	bedroom=$("#bedroom").val();
}
//设置地图状态
function setTimesearchMapOptions() {
	var bounds=map.getBounds();
	 lowLatitude=bounds.getSouthWest().lat;
	 lowLongitude=bounds.getSouthWest().lng;
	 highLongitude=bounds.getNorthEast().lng;
	 highLatitude=bounds.getNorthEast().lat;
	 var centerPoint=map.getCenter();
	 centerLatitude=centerPoint.lat;
	 centerLongitude=centerPoint.lng;
}

function transTimesearchURL() {   
	var url="";
    //关键字
	if(keywords!=null&&keywords.length>0) {
		url=url+encodeURI(keywords)+"_";
	} else {
		url=url+"0_";
	}
	//买卖类型
	if(houseType!=null) {
		url=url+houseType+"_";
	} else {
		url=url+"0_";
	}
	//预算
	if(rent!=null&&rent.length>0) {
		url=url+rent+"_";
	} else {
		url=url+"0_";
	}
	//居室
    if(bedroom === undefined) {
    	bedroom="";
    } else {
	  bedroom=bedroom.replace(/\D/g,"");
    }
	if(bedroom!=null&&bedroom.length>0) {
		url=url+bedroom+"_";
	} else {
		url=url+"0_";
	}
	if(houseType==1) {
		//是否一手
		if(newTag!=null) {
			url=url+newTag+"_";
		} else {
			url=url+"0_";
		}
	} else {
		//是否拎包入住
		if(readyHome!=null) {
			url=url+readyHome+"_";
		} else {
			url=url+"0_";
		}
	}
	//地图级数
	if(mapZoom!=null) {
		url=url+map.getZoom()+"_";
	} else {
		url=url+"10_";
	}
	if(lowLongitude!=null) {
		url=url+lowLongitude+"_";
	}
	if(lowLatitude!=null) {
		url=url+lowLatitude+"_";
	}
	if(highLongitude!=null) {
		url=url+highLongitude+"_";
	}
	if(highLatitude!=null) {
		url=url+highLatitude+"_";
	}
	if(timesearchCurrentPages!=null) {
		url=url+timesearchCurrentPages+"_";
	}
	else {
		url=url+"0_";
	}
	if(timesearchTotalPage!=null) {
		url=url+timesearchTotalPage+"_";
	} else {
		url=url+"0_";
	}
	if(centerLongitude!=null) {
		url=url+centerLongitude+"_";
	}
	if(centerLatitude!=null) {
		url=url+centerLatitude+"_";
	}
	if(destination != null) {
		url += encodeURI(destination) + "_";
	} else {
		url += "0_";
	}
	if(mode != null) {
		url += encodeURI(mode) + "_";
	} else {
		url += "0_";
	} 
	if(time != null) {
		var newTime = time.substring(0,time.indexOf("分钟"));
		url += newTime + "_";
	} else {
		url += "0_";
	}
	if(isTimesearch != null) {
		url += isTimesearch + "_";
	} else {
		url += "0_";
	}
	if(lngLat != null && lngLat.length > 0) {
		url += lngLat + "_";
	} else {
		url += "0_";
	}
	return url;
}


$(function() {
	$("#clockA").click(function(){
		$("#warningEm").text("");
		$("#timeSearch").show();
		$(this).hide();
		$(".closeTimeSearch").show();
		$("#destination").focus();
		});
	$(".closeTimeSearch").click(function(){
		$("#clockA").show().next().hide().next().hide();
		$("#condSpan").text('');
		$("#timeSearch").hide();
		isTimesearch = 0;
		oldDestination = "";
		oldMode = "";
		oldTime = 10;
		$("#destination").val("");
		$("#modeInput").val("公交");
		$("#timeInput").val("30分钟");
		$("#searchPaging").show();
		$("#searchTimePaging").hide();
		var url = "/search"; 
		window.history.pushState({},0,url);   
		show();
		
		});
	$("#condSpan").click(function(){
		var keyCondition = $("#condSpan").text().split(',');
		$("#destination").val(keyCondition[0]);
		$("#modeInput").val(keyCondition[1]);
		$("#timeInput").val(keyCondition[2]);
		$("#timeSearch").show();
		$("#warningEm").text("");
	});	
	
	$(".modeList li").click(function(){
		$("#modeInput").val($(this).text());
		$("#timeInput").val('20分钟');
		if($(this).text()=='步行')
		{
			$("li.walk").show();
			$("li.bus").hide();
			$("li.walk.bus").show();
		}
		else if($(this).text()=='公交')
		{
			$("li.walk").hide();
			$("li.bus").show();
						
			$("li.walk.bus").show();
		}
		});
	
	$("#closeTime").click(function() {
		$("#warningEm").text("");
		$("#timeSearch").hide();
	});
	
	$("#direction").click(function(){
		if(isClickFuzzyResult == 0 && oldDestination == $.trim($("#destination").val()) && oldMode == $.trim($("#modeInput").val()) && oldTime == $.trim($("#timeInput").val())) {
			$("#timeSearch").hide();
			return false;
		}
		// 得到终点名称
		destination = $.trim($("#destination").val());
		// 得到交通方式
		mode = $.trim($("#modeInput").val());
		// 得到可接受时间
		time = $.trim($("#timeInput").val());
		if(destination !='' && mode != '' && time != '')
		{	
			oldDestination = $.trim($("#destination").val());
			oldMode = $.trim($("#modeInput").val());
			oldTime = $.trim($("#timeInput").val());
			$("#vagueList").empty();
			timesearchCurrentPages = 1;
			var TimeKey = destination+','+ mode +','+ time;
			$("#condSpan").text(TimeKey);
			$("#clockA").hide().next().show().next().show();
			isTimesearch = 1;
			$("#direction").attr("disabled", "disabled");
			isPlace = 1;
			show();
			if(isFuzzy == 2) {
				if(isNotContain != 1) {
					$("#timeSearch").hide();
				}
			}
			$("#direction").removeAttr("disabled");
		}
		else
		{
			$("#warningEm").text("请设置小区、出行方式、时间");
			$("#warningEm").css("color","red");
		}
	});
});