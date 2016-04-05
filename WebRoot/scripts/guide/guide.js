/* 
* @Author: anchen
* @Date:   2015-03-17 13:05:44
* @Last Modified by:   anchen
* @Last Modified time: 2015-11-16 10:36:50
*/

var map;

$(document).ready(function(){
    initMap();
});

function initMap(){
   
    //判断地图是否加载成功
	if (typeof BMap === 'undefined') {
		$("#map").html("<center><h1>网络问题，无法加载地图！</h1></center>");
	} else {
		map = new BMap.Map("map", {
			enableMapClick : false
		});  // 创建Map实例 并设置MapOptions
		var point = new BMap.Point(116.404, 39.915); //设置中心点坐标
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
		
		initCustomOverlay(); // 初始化商圈显示样式
		showArea();
	}
}

function AreaCustomOverlay(point, text, mouseoverText, fClick){
  this._point = point;
  this._text = text;
  this._overText = mouseoverText;
  this._fClick = fClick;
}

function createCircleDiv() {
	div.style.position = "absolute";
	div.style.textAlign = "center";
	div.style.background = "url(/images/public/bigCircle.png) no-repeat";
	div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.overflow = "hidden";
	div.style.color = "#222";
	div.style.height = "18px";
    div.style.lineHeight = "20px";
	div.style.width = "74px";
	div.style.height = "74px";
}

// 初始化板块显示样式
function initCustomOverlay(){
	AreaCustomOverlay.prototype = new BMap.Overlay();
    AreaCustomOverlay.prototype.initialize = function(map){
      this._map = map;
      // 攻略上的区域样式为浅红色底黑字(background:#FCEDD9,border-color:#f0ad4e,color:#222)，
      // 鼠标滑过变为深红色底白字(background:#d9534f,border-color:#D4403A,color:#fff,)
      var div = this._div = document.createElement("div");
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      div.style.backgroundColor = "#FEFAF5";
      div.style.border = "1px solid #f0ad4e";
      div.style.color = "#222";
      div.style.height = "18px";
      div.style.padding = "2px 10px";
      div.style.lineHeight = "18px";
      div.style.whiteSpace = "nowrap";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "12px";
      var span = this._span = document.createElement("span");
      div.appendChild(span);
      span.appendChild(document.createTextNode(this._text));      
      var that = this;

      var arrow = this._arrow = document.createElement("div");
      arrow.style.background = "url(/images/public/sprite.png) no-repeat";
      arrow.style.position = "absolute";
      arrow.style.width = "11px";
      arrow.style.height = "10px";
      arrow.style.top = "22px";
      arrow.style.left = "10px";
      arrow.style.backgroundPosition = "-193px -13px";
      arrow.style.overflow = "hidden";
      div.appendChild(arrow);
     
      div.onmouseover = function(){
        this.style.backgroundColor = "#f0ad4e";
        this.style.borderColor = "f0ad4e";
        this.style.color = "#fff";
        this.style.zIndex = 10000;
        this.getElementsByTagName("span")[0].innerHTML = that._overText;
        arrow.style.backgroundPosition = "-221px -13px";
      };

      div.onmouseout = function(){
        this.style.backgroundColor = "#FEFAF5";
        this.style.borderColor = "#f0ad4e";
        this.style.color = "#222";
        this.style.zIndex = 1000;
        this.getElementsByTagName("span")[0].innerHTML = that._text;
        arrow.style.backgroundPosition = "-193px -13px";
      };
      
      if(this._fClick != undefined)
    	  div.onclick = this._fClick;

      map.getPanes().labelPane.appendChild(div);
      
      return div;
    };
    AreaCustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
      this._div.style.top  = pixel.y - 30 + "px";
    };
}

// 显示指定城市下的所有板块
function showArea(){
	$.getJSON("/Guide.action?getAreaByCityCode", function(data){
		$.each(data, function(i,item){
			var point = new BMap.Point(item.longitude, item.latitude);
			var txt = item.areaName;
			var mouseoverTxt = txt+":&nbsp;&nbsp;&nbsp;&nbsp;"+item.tag;
			var myCompOverlay = new AreaCustomOverlay(point, txt, mouseoverTxt, function(){
				window.location.href="/guide/area/"+item.areaCode;
			});
			map.addOverlay(myCompOverlay);
	  });
	});
}