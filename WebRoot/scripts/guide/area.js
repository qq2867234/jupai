var map;

$(document).ready(function(){
    initMap();

    if($(".fcon").length>0){
    	Qfast.add('widgets', { path: "/scripts/plugIn/focusPicsWidgets2.2.min.js", type: "js", requires: ['fx'] });  
	    Qfast(false, 'widgets', function () {
	        K.tabs({
	            id: 'fsD1',   //焦点图包裹id  
	            conId: "D1pic1",  //** 大图域包裹id  
	            tabId:"D1fBt",  
	            tabTn:"a",
	            conCn: '.fcon', //** 大图域配置class       
	            auto: 1,   //自动播放 1或0
	            effect: 'fade',   //效果配置
	            eType: 'click', //** 鼠标事件
	            pageBt:true,//是否有按钮切换页码
	            interval: 6000  //** 停顿时间  
	        });
	    });
    }
});

// 初始化地图
function initMap(){
   
    //判断地图是否加载成功
	if (typeof BMap === 'undefined') {
		$("#map").html("<center><h1>网络问题，无法加载地图！</h1></center>");
	} else {
		map = new BMap.Map("map", {
			enableMapClick : false
		});  // 创建Map实例 并设置MapOptions
		var point = new BMap.Point($("#areaLng").val(), $("#areaLat").val()); //设置中心点坐标
		map.centerAndZoom(point, 12); // 初始化地图,设置中心点坐标和地图级别
		map.enableScrollWheelZoom(true); //启用滚轮放大缩小

		map.setMapStyle({
			 features : [ "road", "building", "water", "land" ],// 隐藏地图上的poi
			 styleJson:[
		          {
		                    "featureType": "highway",
		                    "elementType": "geometry.fill",
		                    "stylers": {
		                              "color": "#ffffff"
		                    }
		          },
		          {
		                    "featureType": "arterial",
		                    "elementType": "geometry.fill",
		                    "stylers": {
		                              "color": "#f9f9f9"
		                    }
		          },
		          {
		                    "featureType": "local",
		                    "elementType": "geometry.fill",
		                    "stylers": {
		                              "color": "#f9f9f9"
		                    }
		          },
		          {
		                    "featureType": "highway",
		                    "elementType": "geometry.stroke",
		                    "stylers": {
		                              "color": "#cccccc"
		                    }
		          },
		          {
		                    "featureType": "arterial",
		                    "elementType": "geometry.stroke",
		                    "stylers": {
		                              "color": "#cccccc"
		                    }
		          },
		          {
		                    "featureType": "local",
		                    "elementType": "geometry.stroke",
		                    "stylers": {
		                              "color": "#cccccc"
		                    }
		          },
		          {
		                    "featureType": "road",
		                    "elementType": "labels.text.fill",
		                    "stylers": {
		                              "color": "#666666"
		                    }
		          },
		          {
		                    "featureType": "poi",
		                    "elementType": "labels.text.fill",
		                    "stylers": {
		                              "color": "#999999"
		                    }
		          },
		          {
		                    "featureType": "label",
		                    "elementType": "all",
		                    "stylers": {
		                              "color": "#ffffff"
		                    }
		          },
		          {
		                    "featureType": "label",
		                    "elementType": "labels.text.fill",
		                    "stylers": {
		                              "color": "#999999"
		                    }
		          },
		          {
		                    "featureType": "highway",
		                    "elementType": "labels.text.fill",
		                    "stylers": {
		                              "color": "#999999"
		                    }
		          },
		          {
		                    "featureType": "highway",
		                    "elementType": "labels.text.stroke",
		                    "stylers": {
		                              "color": "#ffffff"
		                    }
		          },
		          {
		                    "featureType": "highway",
		                    "elementType": "labels.icon",
		                    "stylers": {
		                              "visibility": "off"
		                    }
		          },
		          {
		                    "featureType": "local",
		                    "elementType": "labels.text.fill",
		                    "stylers": {
		                              "color": "#cccccc"
		                    }
		          },
		          {
		                    "featureType": "arterial",
		                    "elementType": "labels.text.stroke",
		                    "stylers": {
		                              "color": "#ffffff"
		                    }
		          },
		          {
		                    "featureType": "arterial",
		                    "elementType": "labels.text.fill",
		                    "stylers": {
		                              "color": "#999999"
		                    }
		          },
		          {
		                    "featureType": "subway",
		                    "elementType": "geometry.fill",
		                    "stylers": {
		                              "color": "#ea9999"
		                    }
		          },
		          {
		                    "featureType": "manmade",
		                    "elementType": "geometry.fill",
		                    "stylers": {
		                              "color": "#eeeeee"
		                    }
		          },
		          {
		                    "featureType": "land",
		                    "elementType": "all",
		                    "stylers": {
		                              "color": "#eeeeee"
		                    }
		          }
		]});
		
		// 显示小区
		showAreaResidence();
	}
    
}

function showAreaResidence(){
	$.getJSON("/Guide.action?getResidenceByAreaCode&areaCode="+$("#areaCode").val(), function(data){
		// 缓存
		$("body").data(String("residence"), data);
//		// 遍历的方式加载
//		$.each(data, function(i,item){
//			var point = new BMap.Point(item.longitude, item.latitude);
//			var marker = new BMap.Marker(point); 
//			map.addOverlay(marker);
//			var content = "<span style='color:blue;font-size:21px;'>" + item.residenceName + "</span>" + "</br>地址：" + item.address;
//			// 添加点击事件
//			addClickHandler(content, marker);
//		});
		
		// 海量点方式加载
		var points = [];  // 添加海量点数据 
		$.each(data, function(i,item){
			points.push(new BMap.Point(item.longitude, item.latitude));
		});
		var options = {
	        size: BMAP_POINT_SIZE_NORMAL,
	        shape: BMAP_POINT_SHAPE_WATERDROP,
	        color: '#F00'
	    };
		pointCollection = new BMap.PointCollection(points, options);
	    pointCollection.addEventListener('click', function (e) {
	    	pointCollectionClick(e);
	    });
		map.addOverlay(pointCollection);  // 添加Overlay
	});
}
var current_obj_index;
var current_infobox;
//海量点点击事件
function pointCollectionClick(e) {
	$.each($("body").data(String("residence")), function(i, item) {
		if (item.latitude == e.point.lat && item.longitude == e.point.lng) {
			current_obj_index = i;
			openInfo2();
			return;
		}
	});
}

var opts2 = {
		width : 150,     // 信息窗口宽度
		height: 60,     // 信息窗口高度
		title :  "" , 	 // 信息窗口标题
		enableMessage:false,//设置允许信息窗发送短息
};
// 显示信息窗口
function openInfo2(){
	var residence = $("body").data(String("residence"));
	var content = "<span style='color:blue;font-size:21px;'>" + residence[current_obj_index].residenceName + "</span>" 
		+ "</br>地址：" + residence[current_obj_index].address;
	
	var point = new BMap.Point(residence[current_obj_index].longitude, residence[current_obj_index].latitude);
	var infoWindow = new BMap.InfoWindow(content,opts2);  // 创建信息窗口对象 
	map.openInfoWindow(infoWindow,point); //开启信息窗口
}


//小区标注点击事件
function addClickHandler(content,marker) {
	marker.addEventListener("click",function(e){
		openInfo(content,e);
		}
	);
}
var opts = {
		width : 150,     // 信息窗口宽度
		height: 60,     // 信息窗口高度
		title :  "" , 	 // 信息窗口标题
		enableMessage:false,//设置允许信息窗发送短息
};
// 显示信息窗口
function openInfo(content,e){
	var p = e.target;
	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
	var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
	map.openInfoWindow(infoWindow,point); //开启信息窗口
}