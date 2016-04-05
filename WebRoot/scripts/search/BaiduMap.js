/**
 * 百度地图封装类
 */
function BaiduMap(options) {
	
	this.opts = $.extend({
		mapBox: $("#map"),								// 地图容器
		level: 12,										// 地图级别
		enableScrollWheelZoom: true,					// 是否启用滚轮缩放地图
		needControl: true,								// 是否需要控制按钮
		markerDefault : "/images/map/marker_red.png",	// 默认图标
		markerHighlight : "/images/map/marker_blue.png",// 高亮图标
		markerBeat : "/images/map/marker_beat.png",		// 动态图标
		centerLng : 116.404,							// 地图中心点经度
		centerLat : 39.915								// 地图中心点维度
    }, options);
	
	// 地图状态（1-正常，0-不正常）
	this.status = 1;
	// 当前点击的标注点
	this.currentClickMarker = null;
	// 当前鼠标经过的信息窗口
	this.currentInfoBoxForMouseOver = null;
	// 记录上一个级别
	this.prevLevel = this.opts.level;
	
	this.timer = null;
	
	this.init();
}

/**
 * 地图初始化
 */ 
BaiduMap.prototype.init = function() {
	// 地图加载失败
	if (typeof BMap === 'undefined') {
		this.map = null;
		this.status = 0;
		this.opts.mapBox.html("<center style='margin-top:70px;'><h4>地图加载失败，请按F5刷新页面。</h4></center>");
		var _this = this;
		// 3秒后再次判断BMap
		setTimeout(function() {
			if (typeof BMap !== 'undefined') {
				_this.initMap();
			}
		}, 3000);
	} else {
		this.initMap();
	}
};

BaiduMap.prototype.initMap = function() {
	// 创建Map实例 并设置MapOptions
	this.map = new BMap.Map("map", { enableMapClick : false });
	// 初始化地图,设置中心点坐标和地图级别
	this.map.centerAndZoom(new BMap.Point(this.opts.centerLng, this.opts.centerLat), this.opts.level); 
	// 启用滚轮放大缩小
	this.map.enableScrollWheelZoom(this.opts.enableScrollWheelZoom);
	var _this = this;
	// 地图加载完成后的回调事件
	this.map.addEventListener('tilesloaded', function() {
		_this.status = 1;
	});
	// 设置地图样式
	this.map.setMapStyle({
		features : [ "road", "building", "water", "land" ],	// 隐藏地图上的poi
 		styleJson : [{"featureType": "highway", "elementType": "geometry.fill", "stylers": {"color": "#ffffff"} }, {"featureType": "arterial", "elementType": "geometry.fill", "stylers": {"color": "#ffffff"} }, {"featureType": "local", "elementType": "geometry.fill", "stylers": {"color": "#ffffff"} }, {"featureType": "highway", "elementType": "geometry.stroke", "stylers": {"color": "#cccccc"} }, {"featureType": "arterial", "elementType": "geometry.stroke", "stylers": {"color": "#cccccc"} }, {"featureType": "local", "elementType": "geometry.stroke", "stylers": {"color": "#cccccc"} }, {"featureType": "road", "elementType": "labels.text.fill", "stylers": {"color": "#666666"} }, {"featureType": "poi", "elementType": "labels.text.fill", "stylers": {"color": "#666666"} }, {"featureType": "label", "elementType": "all", "stylers": {"color": "#ffffff"} }, {"featureType": "label", "elementType": "labels.text.fill", "stylers": {"color": "#444444"} }, {"featureType": "highway", "elementType": "labels.text.fill", "stylers": {"color": "#444444"} }, {"featureType": "highway", "elementType": "labels.text.stroke", "stylers": {"color": "#ffffff"} }, {"featureType": "highway", "elementType": "labels.icon", "stylers": {"visibility": "off"} }, {"featureType": "local", "elementType": "labels.text.fill", "stylers": {"color": "#666666"} }, {"featureType": "arterial", "elementType": "labels.text.stroke", "stylers": {"color": "#ffffff"} }, {"featureType": "arterial", "elementType": "labels.text.fill", "stylers": {"color": "#444444"} }, {"featureType": "subway", "elementType": "geometry.fill", "stylers": {"color": "#ff8585"} }, {"featureType": "manmade", "elementType": "geometry.fill", "stylers": {"color": "#eeeeee"} }, {"featureType": "land", "elementType": "all", "stylers": {"color": "#F0EDE5"} }, {"featureType": "green", "elementType": "all", "stylers": {"color": "#b6d7a8"} }, {"featureType": "water", "elementType": "all", "stylers": {"color": "#B3D1FF"} } ]
	});
	// 需要控制按钮
	if(this.opts.needControl){
		this.addControl();
	}
	// 默认图标
	this.iconDefault= new BMap.Icon(this.opts.markerDefault, new BMap.Size(22, 26), { anchor: new BMap.Size(10, 10) });
	// 高亮图标
	this.iconHighlight= new BMap.Icon(this.opts.markerHighlight, new BMap.Size(26, 31), { anchor: new BMap.Size(10, 10) });
	// 动态图标
	this.iconBeat= new BMap.Icon(this.opts.markerBeat, new BMap.Size(20, 20), { anchor: new BMap.Size(10, 10) });
};

/**
 * 添加控制按钮（放大、缩小）
 */
BaiduMap.prototype.addControl = function() {
	// 定义一个控件类
	function ZoomControl() {
		this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;	// 默认停靠位置
		this.defaultOffset = new BMap.Size(12, 16);	// 偏移量
	}
	// 继承BMap.Control类
	ZoomControl.prototype = new BMap.Control();
	// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回。在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中。
	ZoomControl.prototype.initialize = function(map) {
		var mapTool = document.createElement('div');
		mapTool.id = 'mapTool';
		mapTool.className = 'mapTool';
		// 放大
		var enlargeA = document.createElement('A');
		enlargeA.id = 'enlargeA';
		enlargeA.className = 'enlarge zgIcon zgIcon-xs zgIcon-plus';
		enlargeA.title = '放大';
		mapTool.appendChild(enlargeA);
		enlargeA.onclick = function(e) {
			map.zoomTo(map.getZoom() + 1);
		};
		// 缩小
		var reduceA = document.createElement('A');
		reduceA.id = 'reduceA';
		reduceA.className = 'reduce zgIcon zgIcon-xs zgIcon-minus';
		reduceA.title = '缩小';
		mapTool.appendChild(reduceA);
		reduceA.onclick = function(e) {
			map.zoomTo(map.getZoom() - 1);
		};
		// 指定区域
//		var flashLightA = document.createElement('A');
//		flashLightA.id = 'flashLightA';
//		flashLightA.className = 'flashLight zgIcon zgIcon-thumb-tack';
//		flashLightA.title = '指定区域';
//		mapTool.appendChild(flashLightA);
//		flashLightA.onclick = function(e) {
//			if (nearby == 1) {
//				map.setDefaultCursor("pointer");
//				map.enableDragging();
//			} else {
//				map.setDefaultCursor("crosshair");
//				map.disableDragging();
//			}
//		};
		map.getContainer().appendChild(mapTool);
		// 将DOM元素返回
		return mapTool;
	};
	
	// 实例化控件，并将其添加到地图当中
	this.map.addControl(new ZoomControl());
};

/**
 * 调整地图视角（通过map对象获取地图上的所有点，然后调整到最佳视角）
 */
BaiduMap.prototype.adjustMapView = function(level) {
	if(this.status == 0) return;
	var points = [];
	var marks = this.map.getOverlays();
	var point = null;
	for (var i = 0, len = marks.length; i < len; i++) {
		point = this.getPoint(marks[i]);
		points.push(new BMap.Point(point.lng, point.lat));
		if(point.lng1 != undefined){
			points.push(new BMap.Point(point.lng1, point.lat1));
			points.push(new BMap.Point(point.lng2, point.lat2));
			points.push(new BMap.Point(point.lng3, point.lat3));
		}
	}
	var view = this.map.getViewport(points);
	this.map.centerAndZoom(view.center, level || view.zoom);
};

/**
 * 根据经纬度找出对应标注点
 */  
BaiduMap.prototype.searchMarker = function(lng, lat) { 
	if(this.status == 0) return;
	var marks = this.map.getOverlays();
	var point = null;
	for (var i = 0; i < marks.length; i++) {
		point = this.getPoint(marks[i]);
		if (point.lng == lng && point.lat == lat) {
			return marks[i];
		}
	}
};

/**
 * 获取坐标
 * @param e
 * @returns {lng, lat}
 */
BaiduMap.prototype.getPoint = function(e) {
	if(this.status == 0) return;
	var point = {};
	// e.obj存在表示鼠标悬浮到小区列表触发，e.obj不存在表示点击标注(e.obj即为被点击的标注对象)
	if(e.obj) {
		point.lat = e.obj.getPosition().lat;
		point.lng = e.obj.getPosition().lng;
	} else if(e.target) { 
		point.lat = e.target.point.lat;
		point.lng = e.target.point.lng;
	} else if(typeof e.getPath === "function") { // polygon
		point.lat = e.getPath()[0].lat;
		point.lng = e.getPath()[0].lng;
		point.lat1 = e.getPath()[1].lat;
		point.lng1 = e.getPath()[1].lng;
		point.lat2 = e.getPath()[2].lat;
		point.lng2 = e.getPath()[2].lng;
		point.lat3 = e.getPath()[3].lat;
		point.lng3 = e.getPath()[3].lng;
	} else if(e.point) { // marker
		point.lat = e.point.lat;
		point.lng = e.point.lng;
	} else if(e._point) { // 自定义overlay
		point.lat = e._point.lat;
		point.lng = e._point.lng;
	}
	return point;
};

/**
 * 清除地图标注
 */
BaiduMap.prototype.clearMapMarker = function(clearAll) {
	if(this.status == 0) return;
	if(clearAll == undefined || clearAll == true){
		this.map.clearOverlays();
	}
	var _this = this;
	if(clearAll != undefined && clearAll == false) {
		$.each(this.map.getOverlays(), function(i, overlay) {
			// 说明是marker，也就是小区标注点
			// TODO 不能完全保证overlay.point != undefined就是marker
			if(overlay.point != undefined){
				_this.map.removeOverlay(overlay);
			}
		});
	}
};


/**
 * 添加一个标注点到地图上
 * 也可以把marker改为overlay来实现
 * @param data 		标注点数据
 * @param icon 		图标
 * @param showBox	是否在第一次显示marker的时候，就显示信息窗口
 * @param animation 图标是否跳动
 */
BaiduMap.prototype.addMarker = function(data, icon, showBox) {
	if(this.status == 0) return;
	var _this = this;
	var marker = new BMap.Marker(new BMap.Point(data.lng, data.lat), {icon: icon});
	_this.map.addOverlay(marker);
	if(showBox) {
		_this.showInfoBox(data, marker);
	}
//	if(animation) marker.setAnimation(BMAP_ANIMATION_BOUNCE); // 跳动的动画
	BMapLib.EventWrapper.addListener(marker, 'click', function(e) {
		if(icon == _this.iconBeat) {
			_this.highlightClear();
		}else{
//			_this.markerClick(e);
			_this.markerClick(data, marker);
		}
	});
	BMapLib.EventWrapper.addListener(marker, 'mouseover', function(e) {
		if(icon == _this.iconBeat) {
			_this.highlightClear();
			_this.showInfoBox(data, marker);
		}else{
			_this.highlightMarkerAndShowInfoBox(data, marker);
		}
	});
	BMapLib.EventWrapper.addListener(marker, 'mouseout', function(e) {
		_this.timer = setTimeout(function() {
			_this.closeInfoBox();
		}, 100);
	});
};

/**
 * 清除高亮标注点
 */
BaiduMap.prototype.highlightClear = function() {
	if(this.status == 0) return;
	// 取消上一个高亮点
	if(this.currentClickMarker) this.currentClickMarker.setIcon(this.iconDefault);
};

/**
 * 高亮标注点
 */
BaiduMap.prototype.highlightMarker = function(lng, lat) {
	if(this.status == 0) return;

	// 先清除已有的高亮点
	this.highlightClear();
	
	// 再高亮当前所点击的点
	// 如果lng有值，而lat无值，那么lng就是marker，否者是经纬度，需要去查找marker
	var marker = lng && !lat ? lng : this.searchMarker(lng, lat);
	if(marker){
		this.currentClickMarker = marker;
		this.currentClickMarker.setTop(true);
		this.currentClickMarker.setIcon(this.iconHighlight);	
	}
};

/**
 * 鼠标经过marker触发的行为，显示infoBox
 * @param data
 * @param lng 如果下面的lat参数为undefined，lng则是marker对象
 * @param lat
 */
BaiduMap.prototype.highlightMarkerAndShowInfoBox = function(data, marker) {
	if(this.status == 0) return;
	// 高亮marker
	this.highlightMarker(marker);
	// 显示infoBox
	this.showInfoBox(data, marker);
};

/**
 * 标注点点击回调事件，只是高亮标注点（可重载）
 */
BaiduMap.prototype.markerClick = function(data, marker) {
	this.highlightMarker(marker);
};
//BaiduMap.prototype.markerClick = function(e) {
//	var point = this.getPoint(e);
//	this.highlightMarker(point.lng, point.lat);
//};

/**
 * 获取infobox的显示内容（可重载）
 */
BaiduMap.prototype.getInfoBoxHtml = function(data) {
	return "<div class='myInfoBox'><h5>"+data.name+"</h5></div>";
};

/**
 * 显示鼠标经过的标注点的信息窗口
 * @param e
 * @param data
 */
BaiduMap.prototype.showInfoBox = function(data, marker) {
	if(this.status == 0) return;
	// 先隐藏已打开的窗口
	this.closeInfoBox();
	// 获取窗口内容html
	var content = this.getInfoBoxHtml(data);
	// 构造窗口对象
	this.currentInfoBoxForMouseOver = new BMapLib.InfoBox(this.map, content, {
		boxStyle:{
			width: "150px",
			opacity: "0.9"
		},
		enableAutoPan: true,
		closeIconUrl : "/images/public/pixel.png",
		// closeIconMargin: "55px 5px 0 0", align: INFOBOX_AT_TOP,
		offset:new BMap.Size(0, 19) // 数值越大，信息窗口越往上
	});
	// 在marker上打开窗口
	this.currentInfoBoxForMouseOver.open(marker || this.searchMarker(data.lng, data.lat));
	
	var _this = this;
	_this.timer && clearTimeout(_this.timer);
	// 鼠标经过infobox，取消用来关闭infobox的定时器（达到不关闭infoBox的效果）
	$(".myInfoBox").bind("mouseover", function(e) {
		_this.timer && clearTimeout(_this.timer);
	});
	// 鼠标离开infoBox，定时100ms后关闭infoBox
	$(".myInfoBox").bind("mouseout", function(e) {
		_this.timer = setTimeout(function() {
			_this.closeInfoBox();
		}, 100);
	});
};


/**
 * 关闭自定义信息窗口
 */
BaiduMap.prototype.closeInfoBox = function(infoBox){
	if(this.status == 0) return;
	if(infoBox) {
		infoBox.close();
	} else {
		this.currentInfoBoxForMouseOver && this.currentInfoBoxForMouseOver.close();
	}
};

/**
 * 显示信息窗口
 */ 
BaiduMap.prototype.showInfoWindow = function(content, e){
	if(this.status == 0) return;
	var infoWindow = new BMap.InfoWindow(content, {
		width : 200,     // 信息窗口宽度
		height: 100,     // 信息窗口高度
		title :  "信息窗口" , // 信息窗口标题
		enableMessage: false // 设置允许信息窗发送短息
	});  // 创建信息窗口对象 
	var point = new BMap.Point(e.target.getPosition().lng, e.target.getPosition().lat);
	this.map.openInfoWindow(infoWindow, point); //开启信息窗口    
};

/**
 * 重置地图
 */   
BaiduMap.prototype.repeatMap = function() {
	if(this.status == 0) return;
	var point = new BMap.Point(CityClass.cityCenter[CityClass.getCurrentCityCode()].lng, CityClass.cityCenter[CityClass.getCurrentCityCode()].lat);
	this.map.centerAndZoom(point, 12);
};

/**
 * 自定义覆盖物
 * @param point
 * @param text
 * @param mouseoverText
 * @param fClick
 * @returns
 */
BaiduMap.prototype.CustomOverlay = function(point, text, mouseoverText, clickCallback){
	  this._point = point;
	  this._text = text;
	  this._overText = mouseoverText;
	  this._fClick = clickCallback;
};

/**
 * 初始化默认的自定义覆盖物
 */
BaiduMap.prototype.initCustomOverlay = function(){
	if(this.status == 0) return;
	this.CustomOverlay.prototype = new BMap.Overlay();
	this.CustomOverlay.prototype.initialize = function(map){
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
	    div.style.cursor = "pointer";
	    var span = this._span = document.createElement("span");
	    div.appendChild(span);
	    span.appendChild(document.createTextNode(this._text));      
	    var that = this;
	
	//    var arrow = this._arrow = document.createElement("div");
	//    arrow.style.background = "url(/images/public/sprite.png) no-repeat";
	//    arrow.style.position = "absolute";
	//    arrow.style.width = "11px";
	//    arrow.style.height = "10px";
	//    arrow.style.top = "22px";
	//    arrow.style.left = "10px";
	//    arrow.style.backgroundPosition = "-193px -13px";
	//    arrow.style.overflow = "hidden";
	//    div.appendChild(arrow);
	   
	    div.onmouseover = function(){
	      this.style.backgroundColor = "#f0ad4e";
	      this.style.borderColor = "f0ad4e";
	      this.style.color = "#fff";
	      this.style.zIndex = 10000;
	      this.getElementsByTagName("span")[0].innerHTML = that._overText;
	//      arrow.style.backgroundPosition = "-221px -13px";
	    };
	
	    div.onmouseout = function(){
	      this.style.backgroundColor = "#FEFAF5";
	      this.style.borderColor = "#f0ad4e";
	      this.style.color = "#222";
	      this.style.zIndex = 1000;
	      this.getElementsByTagName("span")[0].innerHTML = that._text;
	//      arrow.style.backgroundPosition = "-193px -13px";
	    };
	    
	    if(this._fClick != undefined)
	  	  div.onclick = this._fClick;
	
	    map.getPanes().labelPane.appendChild(div);
	    
	    return div;
	};
	this.CustomOverlay.prototype.draw = function(){
	    var map = this._map;
	    var pixel = map.pointToOverlayPixel(this._point);
	//    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
	    this._div.style.left = pixel.x + "px";
	    this._div.style.top  = pixel.y - 30 + "px";
	};
	this.CustomOverlay.prototype.show = function () {
	    if (this._div) {
	        this._div.style.display = "";
	    }
	};
	this.CustomOverlay.prototype.hide = function () {
	    if (this._div) {
	        this._div.style.display = "none";
	    }
	};
	this.CustomOverlay.prototype.changehtml = function (html) {
	    if (this._div) {
	        this._div.innerHTML = html;
	    }
	};
	// mouseover mouseout click
	this.CustomOverlay.prototype.addEventListener = function (event, fun) {
	    this._div['on' + event] = fun;
	};
};

/**
 * 添加地图覆盖物
 */
BaiduMap.prototype.addOverlay = function(point, text, mouseoverText, clickCallback) {
	if(this.status == 0) return;
	this.map.addOverlay(new this.CustomOverlay(point, text, mouseoverText, clickCallback));
};

//// 放大镜搜索
//BaiduMap.prototype.showInfo = function(e) {
//	if (nearby == 1) {
//		var point = new BMap.Point(e.point.lng, e.point.lat);
//		map.centerAndZoom(point, 16);
//		map.setDefaultCursor('pointer');
//		map.enableDragging();
//		nearby = 0;
//		isClickSearch = 0; // 范围搜索
//		search();
//	}
//};