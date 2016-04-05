<%@ page pageEncoding="UTF-8"%> 
<!DOCTYPE html>
<html>
<head>


<title>找房-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
</head>
<body>
<div id="main">
    <div class="map" id="map" style="width:800px;height:600px;float:left;"></div>
</div>

<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=w3ovVmMCs8xAuhEwfI388u9L"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"></script>
<script type="text/javascript" src="/scripts/search/InfoBox_min.js"></script>
<script type="text/javascript" src="/scripts/search/EventWrapper.min.js"></script>
<script type="text/javascript" src="/scripts/public/jquery-ui-1.10.4.custom.min.js"></script>
<script type="text/javascript" src="/scripts/search/BaiduMap.js"></script>
<script type="text/javascript" src="/mosaic2.json"></script>
<script type="text/javascript">
var Map;
var queryObj;
$(function(){
	 Map = new BaiduMap({
		mapBox: $("#map"),	// 地图容器
		needControl: false,	// 需要控制按钮
		level:12,
		smallMarker: "/images/map/marker_red_sprite.png", 	// 小图标
		bigMarker: "/images/map/marker_blue_sprit.png",		// 大图片
		beatMarker: "/images/map/marker_beat.png"			// 跳动图标
	});
 	var mosaicList = [116319, 130779];
	 // 显示马赛克
	 showMosaic(mosaicList);
		 
	// showBoundary("北京昌平区");
	
});

var weColor = {"blue":"#4BA5FB", "red":"#FB4B4E", "green":"#4EFB4B", "yellow":"#FFCC33"};
function showMosaic(mosaicList) {
	var highlightColor = weColor.red;
	$.each(mosaicList, function(i, item){
		var color = weColor.blue;
		// 多边形覆盖物
		var polygon = new BMap.Polygon(mosaic[item], {strokeWeight: 0.1, strokeOpacity: 1, strokeColor: color, fillColor:color});
		// 添加覆盖物
		Map.map.addOverlay(polygon);  
		// 添加鼠标事件
		polygon.addEventListener("mouseover",function(){
			polygon.setStrokeColor(highlightColor);
			polygon.setFillColor(highlightColor);
		});
		polygon.addEventListener("mouseout",function(){
			polygon.setStrokeColor(color);
			polygon.setFillColor(color);
		});
	});
}

//通过百度的城市区域数据，显示边界
//showBoundary("北京昌平区");
function showBoundary(name){
	var boundary = new BMap.Boundary();
	// 返回行政区域的边界 (name:查询省、直辖市、地级市、或县的名称。)
	boundary.get(name, function(rs){
		 //一个省可能有好几个闭合的多边形区域
	     for (var i = 0; i < rs.boundaries.length; i++) {
	    	 // 多边形覆盖物
	    	 var polygon = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 1, strokeOpacity: 1, strokeColor: "#4BA5FB", fillColor:"#4BA5FB"});
	    	 // 添加覆盖物
	    	 Map.map.addOverlay(polygon);  
	    	// 添加鼠标事件
 		polygon.addEventListener("mouseover",function(){
 			polygon.setStrokeColor("#FB4B4E");
 		});
 		polygon.addEventListener("mouseout",function(){
 			polygon.setStrokeColor("#4BA5FB");
 		});
	     }    
	});  
}
</script>
</body>
</html>
