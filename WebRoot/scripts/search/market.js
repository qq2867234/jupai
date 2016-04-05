var $container = $(".chartList");

var hotResidence;
var Map;

// 初始化地图
function initBaiduMap() {
	// 定义地图子类
	function BaiduMapSubClass() { }
	// 继承地图父类
	BaiduMapSubClass.prototype = new BaiduMap({
		mapBox: $("#map"),	// 地图容器
		needControl: true,	// 需要控制按钮
		markerDefault: "/images/map/marker_red.png", 	// 小图标
		markerHighlight: "/images/map/marker_blue.png",	// 大图片
		markerBeat: "/images/map/marker_wave.gif"		// 跳动图标
	});
	// 重写获取信息窗口内容方法
	BaiduMapSubClass.prototype.getInfoBoxHtml = function(data) {
		return "<div class='myInfoBox'><h5 style='text-align:center;'><a href='"+(data.url ? data.url+"' target='_blank'" : "###'") + ">"+data.residence_name+"</a></h5><p class='arr'></p></div>";
	};
	// 重写标注点点击事件
	BaiduMapSubClass.prototype.markerClick = function(data, marker) {
		$("#keyword").val(data.residence_name);
		$("#rid").val(data.rid);
		$("#clearBtn").show();
		fetchLayoutPriceData(data.rid);
	};
	
	// 实例化地图子类
	Map = new BaiduMapSubClass();
	if(Map.status != 1) return;
	Map.map.addEventListener('dragend', dragSearch);
	Map.map.addEventListener('zoomend', zoomSearch);
	Map.map.setMaxZoom(16);
}

// 从数据库中取出数据
function fetchLayoutPriceData(rid) {
	var isClickMarker = false;
	if(rid != undefined) {
		isClickMarker = true;
	} 
	rid = rid || $("#rid").val();
	loading();
	$.ajax({
      url: '/Market.action?fetchLayoutPriceData',
      data: {rid: rid},
      dataType: "json",
      async: false,
      cache: false,
      success: function(json, status, xhr) {
    	  loaded();
    	  
    	  // 小区不明确
    	  if(json.status == "n") {
    		  $("#keyword").autocomplete("search");
    		  showWarnInfo(json.info);
    		  return ;
    	  }
    	  
    	  // 户型数据
    	  if(json.layoutData != undefined) {
    		  var html = "";
    		  var index = 1;
    		  for(var key in json.layoutData){
    			  html = '<div class="chartList_info"><div class="chartList_chart" id="rid'+index+'"></div>';
    			  html += '<div class="chartList_table">';
    			  var medianList = json.layoutData[key].medianList;
    			  var minMaxList = json.layoutData[key].minMaxList;
    			  html += "<h4>"+key+"居</h4>";
    			  for ( var i = 0; i < medianList.length; i++) {
                    html += "<div class='chartList_table_tr'><span>"+medianList[i][0].substring(0,medianList[i][0].length-2)+" ㎡</span>"+"<strong>"+medianList[i][1]+"</strong><b>元</b>";
    				  if(minMaxList[i][1] != minMaxList[i][2]) {
                     html += " <q>报价 "+minMaxList[i][1]+"-"+minMaxList[i][2]+"</q>";
    				  } else {
    				  }
    				  html += "</div>";
    			  }
    			  html += "</div></div>";
    			  $container.append(html);
    			  drawLayoutChart($("#rid"+index), json.layoutData[key]);
    			  index++;
              }  
    	  } else {
    		  showWarnInfo("该小区暂时没有行情数据，你可以点击地图上的周边小区查看行情。");
    	  }
    	  
    	  // 周边小区
    	  if(json.aroundResidence.length > 0 && !isClickMarker) {
    		  showMapMarker(json.aroundResidence.slice(1));
    		  Map.addMarker(json.aroundResidence[0], Map.iconBeat, true);
    		  adjustMapView();
    	  }
    	  
		  adjustFooter();
      },
      error: function(json) {
    	  loaded();
    	  showWarnInfo("服务器繁忙，请稍后再试。");
    	  adjustFooter();
      }
   });
}

//拖动搜索   
function dragSearch() {
	mapSearch(1);
}

//缩放搜索
function zoomSearch() {
	mapSearch(2);
}

// 地图范围内搜索
// flag: 1-拖动 2-缩放
function mapSearch(flag) {
	if(Map.status != 1) return;
	
}


function clickSearch() {
	if($("#keyword").val() == "") {
		showHotResidence();
	} else {
		fetchLayoutPriceData();
	}
}

// 显示热门小区
function showHotResidence(json) {
	loading();
	loaded();
	showWarnInfo("<strong>指定小区，了解市场行情</strong>");
	json = hotResidence || json || ajaxPost("/Market.action?fetchHotResidence", {});
	if(!hotResidence) hotResidence = json;
	showMapMarker(json);
	adjustMapView(12);
	adjustFooter();
}

$(function() {
	
	initMap();
    
    initBaiduMap();
    
    showHotResidence();
    
    eventBind();
    
    initHouseListHeight();
});

// 进行所有的事件绑定
function eventBind(){
	
	// 点击搜索按钮触发   
    $(".searchBtn").bind("click", clickSearch);
    
    keywordSuggestion();
    
    addEnterKeyClick();
    
    
    // 关键词输入监听
    $('#keyword').bind('input propertychange', function() {
    	$("#rid").val("");
    	if($("#keyword").val() != ""){
    		$("#clearBtn").show();
    		$(this).parent().removeClass("danger");
    	}else{
    		$("#clearBtn").hide();
    	}
	}).bind('blur', function() {
		if($(this).val()!="")
			$(this).parent().removeClass("danger");
		else
			$(this).parent().addClass("danger");
	});
    // 清空搜索条件 点击事件
    $("#clearBtn").click(function() {
    	if($("#keyword").val() != "") {
    		// 清空关键词
    		$("#keyword").val("");
    		$("#rid").val("");
    	}
    	$("#clearBtn").hide();
		$("#keyword").focus();
	});
	
	$(window).resize(function(){
		Init();
		initMap();
	});
}

//加载中
function loading() {
	$container.empty().append("<div id='waiting'></div>");
	$("#footer").hide();
}

// 加载完成
function loaded() {
	$("#waiting, #loading").remove();
}

// 清空地图标注
function clearMapMarker() {
	Map.clearMapMarker();
}

// 显示地图标注
function showMapMarker(data) {
	if(Map.status == 0) return;
	clearMapMarker();
	
	var lngLat = [];
	$.each(data, function(j, item) {
		// 去除重复的坐标
		var exist = false;
		for ( var i = 0; i < lngLat.length; i++) {
			if(item.lng+"_"+item.lat == lngLat[i]){
				exist = true;
			}
		}
		if(!exist){
			lngLat.push(item.lng+"_"+item.lat);
			Map.addMarker(item, Map.iconDefault);
		}
	});
}

// 设置滚动条   
function initMap(){
	var bodyHeight = document.documentElement.clientHeight;
    var headerHeight = $(".header").height()+1;
    var mainHeight = bodyHeight - headerHeight;
    $("#main,.sidebar,#map").css('height',mainHeight+'px');
    $(".chartList").css('height',mainHeight - 118 - 73 +'px');

}

// 重新计算房源列表高度
function initHouseListHeight(){
	$(".chartList").css('height', 'auto');
	var prHeight = document.documentElement.clientHeight-$(".header").height()-$(".filter").outerHeight(true)-71;
	if($(".chartList").height() < prHeight){
		$(".chartList").css('height',prHeight+'px');
	}
}

// 调整地图视角  （通过百度api获取地图上的所有点，然后调整到最佳视角）
function adjustMapView(level) {
	if(Map.status == 0) return;
	Map.map.removeEventListener('zoomend', zoomSearch);
	Map.adjustMapView(level);
	Map.map.addEventListener('zoomend', zoomSearch);
}

// 显示提示信息
function showWarnInfo(info) {
	if($(".warnInfo").length > 0) $(".warnInfo").html(info);
	else $container.append("<div class='warnInfo'>"+info+"</div>");
}

function adjustFooter() {
	$("#footer").show();
	initHouseListHeight();
}

//添加回车事件
function addEnterKeyClick() {
	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if (e && e.keyCode == 13) {
			clickSearch();
		}
	};
}

Array.prototype.remove=function(value) {
    if(value==undefined && value.length==0)return false;
    if(this.indexOf(value) == -1) return false;
    for(var i=0,n=0;i<this.length;i++)
        if(this[i]!=value) this[n++]=this[i];
    this.length--;
};

/**
 * ajax同步请求
 * @param url
 * @param requestParam
 * @returns
 */
function ajaxPost(url, requestParam) {
    var returnData = null;
    $.ajax({
        type     : "POST",
        dataType : 'json',
        url      : url,
        data     : requestParam || {},
        async    : false,
        success  : function(datas){returnData = datas;},
        error : function (XMLHttpRequest, textStatus, errorThrown){
            // alertDialog('网络错误,请刷新页面重试');
        }
    });
    return returnData;
}

//绘制户型图
function drawLayoutChart($box, layoutData){
	if(layoutData == undefined || layoutData == '') return;
	// 户型数据
	var data;
	data = layoutData;
	var suffix = "";
//	var suffix = "元/月";
	$box = $box || $(".rentChart");
	
	// 该小区无对应的户型报价
	if(data == undefined)
		return;
	// x轴文字的旋转角度，默认为0，当户型超过15过之后，逆时针旋转15°
	var rotation = 0;
//	if(data.medianList.length > 8) rotation = -15;
	
	$box.highcharts({
		chart: {
            width: 360,
            height: 260,
            style: {
                fontFamily: '微软雅黑'
            }
        },
		title: {
			enabled: false,
			text: ''
		},
		xAxis: {
            categories: [],
            title: {
                text: '',
                style: {
                    fontSize: '13pt'
                }
            },
            labels: {
           	 	rotation: rotation,
				style: {
					fontSize: '12px',
					fontWeight: 'bold'
				},
				formatter: function() {
					// 在坐标轴上用'平'代替'平米'
                    return this.value.substring(0,this.value.length-2);
                }
			}
		},
		yAxis: {
			title: {
                text: '',
                style: {
                	padding: '10px',
                    fontSize: '13pt'
                }
			},
            labels: {
                overflow: 'justify',
                formatter: function() {
                    return this.value + suffix;
                }
            },
            // y轴刻度
            tickPositions: data.tickPositions
		},
		// 数据提示框
		tooltip: {
			crosshairs: true, // 显示十字准线
			shared: true,	// 多个数据列共享一个数据提示框[散点图无法共享]
			valueSuffix: suffix, 
            //headerFormat: '<b>一居42平米</b><br>',
            //pointFormat: '价格范围 111-222万<br>中位价150万' 
            style: {  // 提示框内容的样式
	            color: 'black',
	            padding: '10px',    //内边距
	            fontSize: '10pt'
	        },
	        formatter: function () {
		    	var minMax = this.points[0].series.userOptions.data;
		    	var median = this.points[1].series.userOptions.data;
		    	var index = this.x;
		    	if(median[index][1]>0){
               		return "<b>"+minMax[index][0]+"</b><br>"+
               		"参考月租："+ median[index][1]+suffix+"<br>"+
               		"报价："+minMax[index][1]+" - "+minMax[index][2]+suffix;
           		}else{
           			return "<b>"+minMax[index][0]+"</b><br>暂无报价";
           		}  
       		}
		},
		plotOptions: {
           series: {
               pointPadding: 0, //数据点之间的距离值
               groupPadding: 0, //分组之间的距离值
               borderWidth: 0,
               shadow: false,
               pointWidth:5 //柱子宽度
           }
       },
       legend: {
            symbolWidth: 5,
            floating: true,
            align: 'left',
            x: 800,
            y: -60,
            borderWidth: 1
        },
		series: [{
			name: '月租范围',
			data: data.minMaxList,
			type: 'columnrange',
			color: Highcharts.getOptions().colors[0],
			zIndex: 0
		},{
			name: '参考月租',
			data: data.medianList,
            type: 'spline',
			zIndex: 1,
			marker: {
				fillColor: 'white',
				lineWidth: 2,
				lineColor: Highcharts.getOptions().colors[0],
				radius: 5
			
			}, 
			lineWidth: 0 // 曲线图线段的粗线，设为0即可隐藏线段，从而只显示点
		}],
		credits: {
			enabled: false,
			text: 'zhengor.com',
			href: 'http://www.zhengor.com'
		},
        exporting:{
        	enabled: false
        }
	
	});
}

function keywordSuggestion() {
	var $input = $("#keyword");
	var $output = $("#rid");
	var cacheResidence = {}; //小区缓存
	$input.autocomplete({
		minLength: 0,
		width: 318,
		autoFocus: true,
		source: function(request, response) {
			$output.val("");
			var term = request.term;
			if (term in cacheResidence) {
				response($.map(cacheResidence[term], function(item, index) {
					return {
						label: item.residenceName,
						value: item.residenceName,
						rid: item.residenceId
					};
				}));
				return;
			}
			$.ajax({
				url: '/EditBrokerInfo.action?getResidenceListByCityCode',
				data: {cityCode: 110000, keyword:encodeURIComponent(request.term)},
				type: 'post',
				dataType: "json",
				success: function(data, status, xhr) {
					cacheResidence[term] = data;
					response($.map(data, function(item, index) {
						return {
							label: item.residenceName,
							value: item.residenceName,
							rid: item.residenceId
						};
					}));
				},
				error: function(data) {
				}
			});
		},
		select: function(event, ui) {
			event.preventDefault();
			$output.val(ui.item.rid);
			this.value = String(ui.item.value).substring(0, String(ui.item.value).indexOf("("));
			$input.blur();
		}
	});
}