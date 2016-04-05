var rent_list = "/ResidencePriceGraph.action?getRentPrice";
var sale_list = "/ResidencePriceGraph.action?getResidencePrice";
var points ;
var color_type = [ "", "rgb(99,184,255)", "rgb(0,0,255)", "rgb(0,0,139)",
		"rgb(0,255,0)", "rgb(34,139,34)", "rgb(255,255,0)", "rgb(255,215,0)",
		"rgb(255,165,0)", "rgb(205,133,0)", "rgb(255,20,147)", "rgb(255,0,0)",
		"rgb(139,0,0)" ];
var rank ;
var flag=1;
var mapType=1;
var loadrent=0;
/*
 * BMAP_POINT_SHAPE_CIRCLE 圆形，为默认形状。 BMAP_POINT_SHAPE_STAR 星形。
 * BMAP_POINT_SHAPE_SQUARE 方形。 BMAP_POINT_SHAPE_RHOMBUS 菱形。
 * BMAP_POINT_SHAPE_WATERDROP 水滴状，该类型无size和color属性。
 * 
 * 
 * 
 * BMAP_POINT_SIZE_TINY 定义点的尺寸为超小，宽高为2px*2px。 BMAP_POINT_SIZE_SMALLER
 * 定义点的尺寸为很小，宽高为4px*4px。 BMAP_POINT_SIZE_SMALL 定义点的尺寸为小，宽高为8px*8px。
 * BMAP_POINT_SIZE_NORMAL 定义点的尺寸为正常，宽高为10px*10px，为海量点默认尺寸。 BMAP_POINT_SIZE_BIG
 * 定义点的尺寸为大，宽高为16px*16px。 BMAP_POINT_SIZE_BIGGER 定义点的尺寸为很大，宽高为20px*20px。
 * BMAP_POINT_SIZE_HUGE 定义点的尺寸为超大，宽高为30px*30px。
 * 
 */
var options = {
	size : BMAP_POINT_SIZE_SMALL,
	shape : BMAP_POINT_SHAPE_CIRCLE,
	color : ''
}
var centerPoint=new BMap.Point(116.404, 39.915);
// 百度地图API功能
var map = new BMap.Map("salePrice", {
	enableMapClick : false
}); // 创建Map实例
var map2 = new BMap.Map("rentPrice", {
	enableMapClick : false
}); // 创建Map实例
map.centerAndZoom(centerPoint, 11); // 初始化地图,设置中心点坐标和地图级别
map.enableScrollWheelZoom(); // 允许滚轮缩放
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL})); 
map2.centerAndZoom(centerPoint, 11);
map2.enableScrollWheelZoom(); // 允许滚轮缩放
map2.addControl(new BMap.ScaleControl());
map2.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL})); 


var mapstyle={
		features : [ "road", "building", "water", "land" ],// 隐藏地图上的poi
		styleJson : [ {
			"featureType" : "highway",
			"elementType" : "geometry.fill",
			"stylers" : {
				"color" : "#ffffff"
			}
		}, {
			"featureType" : "arterial",
			"elementType" : "geometry.fill",
			"stylers" : {
				"color" : "#f9f9f9"
			}
		}, {
			"featureType" : "local",
			"elementType" : "geometry.fill",
			"stylers" : {
				"color" : "#f9f9f9"
			}
		}, {
			"featureType" : "highway",
			"elementType" : "geometry.stroke",
			"stylers" : {
				"color" : "#cccccc"
			}
		}, {
			"featureType" : "arterial",
			"elementType" : "geometry.stroke",
			"stylers" : {
				"color" : "#cccccc"
			}
		}, {
			"featureType" : "local",
			"elementType" : "geometry.stroke",
			"stylers" : {
				"color" : "#cccccc"
			}
		}, {
			"featureType" : "road",
			"elementType" : "labels.text.fill",
			"stylers" : {
				"color" : "#666666"
			}
		}, {
			"featureType" : "poi",
			"elementType" : "labels.text.fill",
			"stylers" : {
				"color" : "#999999"
			}
		}, {
			"featureType" : "label",
			"elementType" : "all",
			"stylers" : {
				"color" : "#ffffff"
			}
		}, {
			"featureType" : "label",
			"elementType" : "labels.text.fill",
			"stylers" : {
				"color" : "#999999"
			}
		}, {
			"featureType" : "highway",
			"elementType" : "labels.text.fill",
			"stylers" : {
				"color" : "#999999"
			}
		}, {
			"featureType" : "highway",
			"elementType" : "labels.text.stroke",
			"stylers" : {
				"color" : "#ffffff"
			}
		}, {
			"featureType" : "highway",
			"elementType" : "labels.icon",
			"stylers" : {
				"visibility" : "off"
			}
		}, {
			"featureType" : "local",
			"elementType" : "labels.text.fill",
			"stylers" : {
				"color" : "#cccccc"
			}
		}, {
			"featureType" : "arterial",
			"elementType" : "labels.text.stroke",
			"stylers" : {
				"color" : "#ffffff"
			}
		}, {
			"featureType" : "arterial",
			"elementType" : "labels.text.fill",
			"stylers" : {
				"color" : "#999999"
			}
		}, {
			"featureType" : "subway",
			"elementType" : "geometry.fill",
			"stylers" : {
				"color" : "#ea9999"
			}
		}, {
			"featureType" : "manmade",
			"elementType" : "geometry.fill",
			"stylers" : {
				"color" : "#eeeeee"
			}
		}, {
			"featureType" : "land",
			"elementType" : "all",
			"stylers" : {
				"color" : "#eeeeee"
			}
		} ]
	};
map.setMapStyle(mapstyle);
map2.setMapStyle(mapstyle);

$(function() {
	
	$("#toRent").click(function(){
		mapType=2;
		$(this).parents(".hotPrice").css("display", "none");
		$("#rentPriceBox").css("display","block");
	/*	map2.reset();*/
	/*	map2.centerAndZoom(centerPoint, 11);*/

		
		
	});
	$("#toSale").click(function(){
		mapType=1;
		$(this).parents(".hotPrice").css("display", "none");
		$("#salePriceBox").css("display","block");
	});
	if (document.createElement('canvas').getContext) {
		getDate(1);
		/*getDate(2);*/
	} else {
		alert('京城均价功能只支持chrome、safari、IE8+以上浏览器');

	}
	$("#toSale").parents(".hotPrice").css("display", "none");
});


function getDate(type){
	points = [];
	rank=1;
	var dateURL=type==1?sale_list:rent_list;
	$.ajax({
		dataType : "json",
		url : dateURL,
		async : false,
		success : function(e) {

			$.each(e.beans, function(j, bean) {
				if (bean.rank == rank) {
					points.push(new BMap.Point(bean.longitude,
							bean.latitude));
				} else {
					addPointsInMap(type);
					points = [];
					rank++;
					points.push(new BMap.Point(bean.longitude,
							bean.latitude));
				}
			});// each
			addPointsInMap(type);
		}// success

	});
	
	
	
	
}
function addPointsInMap(type) {

	options.color = color_type[rank];
	var pointCollection = new BMap.PointCollection(points, options); // 初始化PointCollection
	if(type==1)map.addOverlay(pointCollection); 
	else if(type==2)map2.addOverlay(pointCollection);// 添加Overlay
	pointCollection.addEventListener('click', clickPoint);
}

function clickPoint(e) {

	if(flag==1)
	{
	var targetUrl=mapType==1?"/ResidencePriceGraph.action?getResByPlace":"/ResidencePriceGraph.action?getRentByPlace"
	var residence;
	$.ajax({
		dataType : "json",
		url : targetUrl,
		async : false,
		data :{
			longitude:e.point.lng,
			latitude:e.point.lat
		},
		success : function(result) {
			var opts = {
					  width : 40,     // 信息窗口宽度
					  height: 30,     // 信息窗口高度
					  title : "<a style='cursor: pointer;' target='_blank' href='/110000/residence/page/"+Math.floor(result.bean.split("_")[0]/100)+"/"+result.bean.split("_")[0]+".html'>"+result.bean.split("_")[1]+"</li>", // 信息窗口标题
					  enableMessage:false,//设置禁止信息窗发送短息
					  message:""
					}
			var infoWindow = new BMap.InfoWindow("均价："+result.bean.split("_")[2]+"元",opts);
			if(mapType==1)map.openInfoWindow(infoWindow,new BMap.Point(e.point.lng,e.point.lat)); 
			else if(mapType==2)map2.openInfoWindow(infoWindow,new BMap.Point(e.point.lng,e.point.lat));
			
			}
		});
	flag=0;
	setTimeout(function(){flag=1;}, 500);
	}
}

map2.addEventListener('tilesloaded', function() {
	loadrent++;
	if(loadrent==2)
		{
		getDate(2);
		}

});
