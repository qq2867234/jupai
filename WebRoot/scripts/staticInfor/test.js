var locationString = "";
var num=0;
var imagePath0 = "/images/public/map/location.png";
var imagePath = "";
var lastLng = "";
var lastLat = "";
var mouseLng = "";
var mouseLat = "";
var map;
var point;
function addMap(){
	map = new BMap.Map("container");				//创建地图实例  
	point = new BMap.Point(centerLng, centerLat);  	//创建点坐标  
	map.centerAndZoom(point, 14);              	 	//初始化地图，设置中心点坐标和地图级别
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
	]
		});
		
	map.enableScrollWheelZoom(true);					//启用地体滚轴缩放功能
	facilitiesClick();
}

	
function facilitiesClick(){
	if(num==0){		
		locationString = $.trim(residenceBus);
		imagePath = "/images/map/bus1.png";
	}else if(num==1){	
		locationString = $.trim(residenceMetro);
		imagePath = "/images/map/subway1.png";
	}else if(num==2){	
		locationString = $.trim(residenceSchool);
		imagePath = "/images/map/school1.png";
	}else if(num==3){	
		locationString = $.trim(residenceHospital);
		imagePath = "/images/map/hospital1.png";
	}else if(num==4){	
		locationString = $.trim(residenceShop);
		imagePath = "/images/map/shop1.png";
	}else if(num==5){		
		locationString = $.trim(residenceMarket);
		imagePath = "/images/map/market1.png";
	}
	if(map != undefined) {
		map.clearOverlays();
		// 在地图上标注小区的位置
		var myIcon = new BMap.Icon(imagePath0, new BMap.Size(23, 25), {});      
		var marker = new BMap.Marker(point,{icon: myIcon});    
		map.addOverlay(marker);
		marker.setAnimation(BMAP_ANIMATION_BOUNCE);
		// 在地图上标注配套位置
		for(var i = 0;i<locationString.split(";").length;i++){
			var locations = locationString.split(";")[i].split("&&")[0];
			var points = new BMap.Point(locations.split("-")[0], locations.split("-")[1]);  //设置标注坐标 
			addMarker(points);
		}
	}
	
}
var current_infobox;	
function addMarker(point){ 
	//创建图标对象   	
	var myIcon = new BMap.Icon(imagePath, new BMap.Size(20, 20), {});      
	//创建标注对象并添加到地图   
	var marker = new BMap.Marker(point,{icon: myIcon});    
	map.addOverlay(marker);
	marker.addEventListener("mouseover", function(){
		if(current_infobox) {
			current_infobox.close();
		}   
		if(mouseLng!=""&&mouseLat!=""){
//			restoreIcon(searchMarker(mouseLng,mouseLat));
		}
//		var imagePath2 = "";
		if(num==0){		
			locationString = $.trim(residenceBus);
//			imagePath2 = "/images/map/bus2.png";
		}
//		else if(num==1){	
//			imagePath2 = "/images/map/subway2.png";
//		}else if(num==2){	
//			imagePath2 = "/images/map/schools.png";
//		}else if(num==3){	
//			imagePath2 = "/images/map/hospital2.png";
//		}else if(num==4){	
//			imagePath2 = "/images/map/shop2.png";
//		}else if(num==5){		
//			imagePath2 = "/images/map/market2.png";
//		}
//		var myIcons = new BMap.Icon(imagePath2, new BMap.Size(34, 38), {});      
//		marker.setIcon(myIcons); 
 		var pointLocation = this.getPosition();
 		var lng;
 		var lat;
 		lng =pointLocation.lng;			
 		lat =pointLocation.lat;	
 		mouseLng = pointLocation.lng;
 		mouseLat = pointLocation.lat;
 		if(lng!=centerLng&&lat!=centerLat){
 			if(lng.length<10){
 	 			lng +="0";
 	 		}			
 	 		if(lat.length<9){
 	 			lat +="0";
 	 		}
 	 		var info = "";			
 	 		for(var i = 0;i<locationString.split(";").length-1;i++){
 				var locations = locationString.split(";")[i].split("&&")[0];				
 				if(lng==locations.split("-")[0]&&lat==locations.split("-")[1]){
 					info = locationString.split(";")[i].split("&&")[1];
 					break;
 				}
 			}
 	 		var content = "";
 	 		if(num == 0) {
 	 			content = "<div class='myInfoBox'><h5 style='background:#fff'>"+info.split("--")[0]+"</h5>"
 	 			+ "<div class='comAddress' style='background:#fff'>公交：" + info.split("--")[1] + "</div>"
 	 			+ " <span class='inforArr'></span></div>";    
 	 		} else if(num==1){
 	 			content = "<div class='myInfoBox'><h5 style='background:#fff'>"+info.split("--")[0]+"</h5>"
 	 			+ "<div class='comAddress' style='background:#fff'>地铁：" + info.split("--")[1] + "</div>"
 	 			+ " <span class='inforArr'></span></div>";    
 	 		} else if(num==2){
// 	 			var type="";
// 	 			if(info.split("--")[2]=="1"){
// 	 				type="幼儿园";
// 	 			}else if(info.split("--")[2]=="2"){
// 	 				type="小学";
// 	 			}else if(info.split("--")[2]=="3"){
// 	 				type="初级中学";
// 	 			}else if(info.split("--")[2]=="4"){
// 	 				type="高级中学";
// 	 			}else if(info.split("--")[2]=="5"){
// 	 				type="九年一贯制学校";
// 	 			}else if(info.split("--")[2]=="6"){
// 	 				type="十二年一贯制学校";
// 	 			}else if(info.split("--")[2]=="7"){
// 	 				type="完全中学";
// 	 			}else if(info.split("--")[2]=="22"){
// 	 				type="非标准小学";
// 	 			}else if(info.split("--")[2]=="23"){
// 	 				type="非标准中学";
// 	 			}	
// 	 			var phone = "";
// 	 			if(info.split("--")[4]=="null"){
// 	 				phone = "暂无";
// 	 			}else{
// 	 				phone = info.split("--")[4];
// 	 			}
// 	 			var web = "";
// 	 			if(info.split("--")[5]=="null"){
// 	 				web  = "暂无";
// 	 			}else{
// 	 				web = info.split("--")[5];
// 	 			}
 	 			content = "<div class='myInfoBox'><h5 style='background:#fff'>"+info.split("--")[0]+"</h5>"
// 	 			+ "<div class='comAddress' style='background:#fff'>地址：" + info.split("--")[1] + "</div>"
// 	 			+ "<div class='comAddress' style='background:#fff'>邮编：" + info.split("--")[3]
// 	 			+ "<div class='comAddress' style='background:#fff'>类型：" + type
// 	 			+ "<div class='comAddress' style='background:#fff'>电话：" + phone
// 	 			+ "<div class='comAddress' style='background:#fff'>网址：" + web
 	 			+ "<span class='inforArr'></span></div>";    
 	 		}else if(num==3){
// 	 			var type = "";
// 	 			if(info.split("--")[2]=="1"){
// 	 				type = "是";
// 	 			}else if(info.split("--")[2]=="0"){
// 	 				type="否";
// 	 			}else{
// 	 				type = "未知";
// 	 			}
// 	 			var phone = "";
// 	 			if(info.split("--")[4]=="null"){
// 	 				phone = "暂无";
// 	 			}else{
// 	 				phone = info.split("--")[4];
// 	 			}
 	 			content = "<div class='myInfoBox'><h5 style='background:#fff'>"+info.split("--")[0]+"</h5>"
// 	 			+ "<div class='comAddress' style='background:#fff'>地址：" + info.split("--")[1] + "</div>"
// 	 			+ "<div class='comAddress' style='background:#fff'>是否医保：" + type
// 	 			+ "<div class='comAddress' style='background:#fff'>等级：" + info.split("--")[3]
// 	 			+ "<div class='comAddress' style='background:#fff'>电话：" + phone
 	 			+ "<span class='inforArr'></span></div>";        
 	 		}else{
 	 			content = "<div class='myInfoBox'><h5 style='background:#fff'>"+info.split("--")[0]+"</h5>"
// 	 			+ "<div class='comAddress' style='background:#fff'>地址：" + info.split("--")[1] + "</div>"
 	 			+ "<span class='inforArr'></span></div>";        
 	 		}
 	 		var infoBox = new BMapLib.InfoBox(map,content,{
	 	 			boxStyle:{
	 	 				width: "210px"
	 	 			}
	 	 			,closeIconMargin: "5px 5px 0 0"
	 	 			,closeIconUrl : "/images/public/close.png"
	 	 			,enableAutoPan: true
	 	 			,align: INFOBOX_AT_TOP
	 	 			,offset:new BMap.Size(0, 18)
	 	 		});
	 		infoBox.open(point);
	 		current_infobox = infoBox;
 		}		 
	});			
}

$(function(){
	$(".surUlMenu li").click(function() {
		num = $(this).index();
		imagePath = "/images/public/map/location.png";
		facilitiesClick();
		lastLng = "";
		lastLat = "";
		mouseLng = "";
		mouseLat = "";
	});
	$(".item").children("li").click(function(){
		if(lastLng!=""&&lastLat!=""){
			restoreIcon(searchMarker(lastLng,lastLat));
		}
		var locations = $(this).children("input").val();
		var location = locations.split("&&")[0];
		var info = locations.split("&&")[1];
		lastLng = location.split("-")[0];
		lastLat = location.split("-")[1];
		changIcon(searchMarker(location.split("-")[0],location.split("-")[1]));
		var point = new BMap.Point(location.split("-")[0],location.split("-")[1]);
		var opts = {    
			 width : 250,     				// 信息窗口宽度    
			 height: 100,    	 			// 信息窗口高度    
			 title : info.split("--")[0],  	// 信息窗口标题   
			 enableMessage:false
		}; 
		if(num==2){	
			var type="";
 			if(info.split("--")[2]=="1"){
 				type="幼儿园";
 			}else if(info.split("--")[2]=="2"){
 				type="小学";
 			}else if(info.split("--")[2]=="3"){
 				type="初级中学";
 			}else if(info.split("--")[2]=="4"){
 				type="高级中学";
 			}else if(info.split("--")[2]=="5"){
 				type="九年一贯制学校";
 			}else if(info.split("--")[2]=="6"){
 				type="十二年一贯制学校";
 			}else if(info.split("--")[2]=="7"){
 				type="完全中学";
 			}else if(info.split("--")[2]=="22"){
 				type="非标准小学";
 			}else if(info.split("--")[2]=="23"){
 				type="非标准中学";
 			}
 			var phone = "";
 			if(info.split("--")[4]=="null"){
 				phone = "电话：暂无";
 			}else{
 				phone = info.split("--")[4];
 			}	
 			var web = "";
 			if(info.split("--")[5]=="null"){
 				web  = "网址：暂无";
 			}else{
 				web = info.split("--")[5];
 			}
			var infoWindow = new BMap.InfoWindow(info.split("--")[1]+"<br>"+info.split("--")[3]+"<br>"+type+"<br>"+phone+"<br>"+web, opts);  // 创建信息窗口对象    
			map.openInfoWindow(infoWindow,point); 		
		}else if(num==3){
			var type = "";
 			if(info.split("--")[2]=="1"){
 				type = "医保定点";
 			}else if(info.split("--")[2]=="0"){
 				type = "非医保定点";
 			}else{
 				type = "是否医保：未知";
 			}
 			var phone = "";
 			if(info.split("--")[5]=="null"){
 				phone = "电话：暂无";
 			}else{
 				phone = info.split("--")[5];
 			}
			var infoWindow = new BMap.InfoWindow(info.split("--")[1]+"<br>"+type+"<br>"+info.split("--")[3]+"<br>"+info.split("--")[4]+"<br>"+phone, opts);  // 创建信息窗口对象    
			map.openInfoWindow(infoWindow,point); 		
		}else{
			var infoWindow = new BMap.InfoWindow(info.split("--")[1], opts);  // 创建信息窗口对象    
			map.openInfoWindow(infoWindow,point); 
		}				 
	});
}); 
	
	
//根据经纬度找出对应的覆盖物
function searchMarker(rlg,rlt){	
	var marks=map.getOverlays() ;
	for(var i=0;i<marks.length;i++){
		var eachpoint=marks[i].getPosition() ;
		if(eachpoint.lng==rlg&&eachpoint.lat==rlt){
			return marks[i];
		}
	}
}

//设置指定覆盖物的图标为蓝色
function changIcon(markerObj){
	var imagePath2 = "";
	if(num==0){
		imagePath2 = "/images/map/bus2.png";
	}else if(num==1){	
		imagePath2 = "/images/map/subway2.png";
	}else if(num==2){	
		imagePath2 = "/images/map/schools2.png";
	}else if(num==3){	
		imagePath2 = "/images/map/hospital2.png";
	}else if(num==4){	
		imagePath2 = "/images/map/shop2.png";
	}else if(num==5){		
		imagePath2 = "/images/map/market2.png";
	}
	myIcon = new BMap.Icon(imagePath2, new BMap.Size(24, 24), {});
	markerObj.setIcon(myIcon);
}
	
//设置指定覆盖物的图标为红色
function restoreIcon(markerObj){
	var imagePath1 = "";
	if(num==0){
		imagePath1 = "/images/map/bus1.png";
	}else if(num==1){	
		imagePath1 = "/images/map/subway1.png";
	}else if(num==2){	
		imagePath1 = "/images/map/school1.png";
	}else if(num==3){	
		imagePath1 = "/images/map/hospital1.png";
	}else if(num==4){	
		imagePath1 = "/images/map/shop1.png";
	}else if(num==5){		
		imagePath1 = "/images/map/market1.png";
	}
	myIcon = new BMap.Icon(imagePath1, new BMap.Size(24, 24), {});
	markerObj.setIcon(myIcon);
}