//定义变量接收地图对象
var map;
//地图定位到的城市代码
var cityCode = 110000;
//保存搜索条件的对象，当拖拽地图，点击搜索，点击checkBox时会更新该对象的属性值，点击下一页不会改变该对象的值。向后台取数据时以该对象的属性值为搜索条件。
var queryObj={};
//查询条件相关的参数
var keywords;
var houseType = 1;
var rent;
var bedroom;
var bathRoom;
var mode;
var time;
var lngLat;
var filterKeyword;
var orientation;
var listType;
var buildingType;
var buildingAge;
var readyHome;
//分页相关的参数
var currentPages = 1;
var currentBrokerPage = 1; // 经纪人当前页
var currentResidenceId;
var totalPage;
var pagesize = 20;
//功能相关参数
var dealType = 0;
//关键字搜索
var specialSearch = 0;
//被选中的标注
var current_marker;
//当前信息框集合
var current_infoboxs = [];
//当前信息框
var current_infobox;
//被选中的对象
var current_residence;
//统计请求的次数
var request_count = 1;
//是否选择新盘的标志,1表示用户选择了新盘，0表示用户没用选择新盘
var newTag = 0;
// 是否筛选地铁,1表示选择地铁房
var metroTag = 0;
// 是否选择有经纪人的标志,1表示用户选择了，0表示用户没用选择
var brokerTag = 0;
// 是否选择有房产的标志,1表示用户选择了，0表示用户没用选择
var homeTag = 0;
//1表示map加载成功，0表示加载失败
var maptag = 1;
var nearby = 0;
var loadmap = 0;

//从库中已取出的记录条数
var real_number;
//取出的数据
var resObgs = [];
//第一次请求的地图边界
var bounds;
//listspan孩子节点的索引
var result_index = 0;
//当前页小区的对象集合
var current_obj = [];
//符合需求的大部分小区集合
var matchResidence_obj = [];
//最大可能的页数
var max_page;
//经纪人信息索引
var searchIndex = [];
//小区信息索引
var searchResidenceIndex = [];
//经纪人列表当前经纪人索引
var current_index = 0;
//当前选中点
var current_point;
//在符合需求小区列表中的下标
var current_obj_index = 0;
//存放海量点
var pointCollection;
//经纪人服务小区的海量点
var pointCollectionForBM;
//是否是点击回车或者按搜索按钮 1是 0不是
var isClickSearch = 1;

//回显的经纪人下标
var reviewBrokerIndexs = [];
//地图上的小点
var smallPoint = "/images/map/marker_red_sprite.png";
//地图上的大点
var bigPoint = "/images/map/marker_blue_sprit.png";
//上一个经济人的下标
var lastIndex;
//经纪人第一个小区
var brokerFirstMark;

var tagClass = ["tag-primary", "tag-info", "tag-success", "tag-warning", "tag-danger", "tag-primary", "tag-info", "tag-success", "tag-warning", "tag-danger", "tag-primary", "tag-info", "tag-success", "tag-warning", "tag-danger"];
	
//定义一个控件类,即function
function ZoomControl() {
	// 默认停靠位置和偏移量
	this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
	this.defaultOffset = new BMap.Size(12, 16);
}
// 通过JavaScript的prototype属性继承于BMap.Control
ZoomControl.prototype = new BMap.Control();
// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
ZoomControl.prototype.initialize = function(map) {
	var mapTool = document.createElement('div');
	mapTool.id = 'mapTool';
	mapTool.className = 'mapTool';

	var enlargeA = document.createElement('A');
	enlargeA.id = 'enlargeA';
	enlargeA.className = 'enlarge zgIcon zgIcon-plus';
	enlargeA.title = '放大';
	mapTool.appendChild(enlargeA);
	enlargeA.onclick = function(e) {
		map.zoomTo(map.getZoom() + 1);
	};
	var reduceA = document.createElement('A');
	reduceA.id = 'reduceA';
	reduceA.className = 'reduce zgIcon zgIcon-minus';
	reduceA.title = '缩小';
	mapTool.appendChild(reduceA);
	reduceA.onclick = function(e) {
		map.zoomTo(map.getZoom() - 1);
	};

	var flashLightA = document.createElement('A');
	flashLightA.id = 'flashLightA';
	flashLightA.className = 'flashLight zgIcon zgIcon-thumb-tack';
	flashLightA.title = '指定区域';
	mapTool.appendChild(flashLightA);
	flashLightA.onclick = function(e) {
		if (nearby == 1) {
			map.setDefaultCursor();
			nearby = 0;
			map.enableDragging();
		} else {
			map.setDefaultCursor("crosshair");
			nearby = 1;
			map.disableDragging();
		}

	};
	map.getContainer().appendChild(mapTool);
	// 将DOM元素返回
	return mapTool;
};

//初始化地图
function initBMap() {
	//判断地图是否加载成功
	if (typeof BMap === 'undefined') {
		BMap = '';
		map = '';
		maptag = 0;
		//searchBrokerInfo();
		$("#map").html("<center><h1>网络问题，无法加载地图！</h1></center>");
		alert("地图加载失败");
	} else {
		map = new BMap.Map("map", {
			enableMapClick : false
		});  // 创建Map实例 并设置MapOptions
		// 中心点坐标
		var lng = CityClass.cityCenter['北京'].lng;
		var lat = CityClass.cityCenter['北京'].lat;
		// 级数
		var level = 12;
		if($("#areaLng").val() != undefined && $("#areaLng").val() != ''){
			lng = $("#areaLng").val();
			lat = $("#areaLat").val();
			level = 14;
		}
		var point = new BMap.Point(lng, lat); //设置中心点坐标
		map.centerAndZoom(point, level); // 初始化地图,设置中心点坐标和地图级别
		// 创建控件
		var myZoomCtrl = new ZoomControl();
		// 添加到地图当中
		map.addControl(myZoomCtrl);
		map.enableScrollWheelZoom(true); //启用滚轮放大缩小
		map.addEventListener("click", showInfo);
		map.addEventListener('dragend', dragSearch);
		map.addEventListener('zoomend', dragSearch);
		map.addEventListener('tilesloaded', function() {
			if (nearby == 0) {
				if (loadmap == 0) {
					initSearch();
					//searchBrokerInfo();
					loadmap = 1;
				}
			}
		});
//		map.setDefaultCursor("default");
		map.setMapStyle({
			features : [ "road", "building", "water", "land" ],// 隐藏地图上的poi
	 		styleJson :[
	           {
                 "featureType": "highway",
                 "elementType": "geometry.fill",
                 "stylers": {
                           "color": "#ffffff"
                 }
	           }, {
                 "featureType": "arterial",
                 "elementType": "geometry.fill",
                 "stylers": {
                           "color": "#ffffff"
                 }
	           }, {
                 "featureType": "local",
                 "elementType": "geometry.fill",
                 "stylers": {
                           "color": "#ffffff"
                 }
	           }, {
                 "featureType": "highway",
                 "elementType": "geometry.stroke",
                 "stylers": {
                           "color": "#cccccc"
                 }
	           }, {
                 "featureType": "arterial",
                 "elementType": "geometry.stroke",
                 "stylers": {
                           "color": "#cccccc"
                 }
	           }, {
                 "featureType": "local",
                 "elementType": "geometry.stroke",
                 "stylers": {
                           "color": "#cccccc"
                 }
	           }, {
                 "featureType": "road",
                 "elementType": "labels.text.fill",
                 "stylers": {
                           "color": "#666666"
                 }
	           }, {
                 "featureType": "poi",
                 "elementType": "labels.text.fill",
                 "stylers": {
                           "color": "#666666"
                 }
	           }, {
                 "featureType": "label",
                 "elementType": "all",
                 "stylers": {
                           "color": "#ffffff"
                 }
	           }, {
                 "featureType": "label",
                 "elementType": "labels.text.fill",
                 "stylers": {
                           "color": "#444444"
                 }
	           }, {
                 "featureType": "highway",
                 "elementType": "labels.text.fill",
                 "stylers": {
                           "color": "#444444"
                 }
	           }, {
                 "featureType": "highway",
                 "elementType": "labels.text.stroke",
                 "stylers": {
                           "color": "#ffffff"
                 }
	           }, {
                 "featureType": "highway",
                 "elementType": "labels.icon",
                 "stylers": {
                           "visibility": "off"
                 }
	           }, {
                 "featureType": "local",
                 "elementType": "labels.text.fill",
                 "stylers": {
                           "color": "#666666"
                 }
	           }, {
                 "featureType": "arterial",
                 "elementType": "labels.text.stroke",
                 "stylers": {
                           "color": "#ffffff"
                 }
	           }, {
                 "featureType": "arterial",
                 "elementType": "labels.text.fill",
                 "stylers": {
                           "color": "#444444"
                 }
	           }, {
                 "featureType": "subway",
                 "elementType": "geometry.fill",
                 "stylers": {
                           "color": "#ff8585"
                 }
	           }, {
                 "featureType": "manmade",
                 "elementType": "geometry.fill",
                 "stylers": {
                           "color": "#eeeeee"
                 }
	           }, {
                 "featureType": "land",
                 "elementType": "all",
                 "stylers": {
                           "color": "#F0EDE5"
                 }
	           }, {
                "featureType": "green",
                "elementType": "all",
                "stylers": {
                          "color": "#c5f4b7"
                }
	          }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                          "color": "#B3D1FF"
                }
	          }
	        ]
		});
		
	}
}


//信息窗口基本属性
var opts = {
		width : 200,     // 信息窗口宽度
		height: 100,     // 信息窗口高度
		title :  "信息窗口" , // 信息窗口标题
		enableMessage:false//设置允许信息窗发送短息WW      



};

//打开信息窗口
function openInfo(content,e){
	var p = e.target;
	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
	var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
	map.openInfoWindow(infoWindow,point); //开启信息窗口    
}

//搜索函数入口
function searchBrokerInfo(drag) {
	
	queryObj.keywords = encodeURIComponent(keywords);
	queryObj.bedRoom = bedroom;
	initSearchOption();
	setQuery();
//	LBS.addCustomLayer($("#keywords").val());
	getResidenceDate();
	showcurContent(1, 0, drag);
	invalidatePre();
	invalidateNex();
//	$("#layout").hide();
}

//设置搜索条件
function setQuery(){
	setSearchOptions();
	queryObj = {};
	//resObgs = [];
	if (request_count == 1 && maptag == 1) {
		bounds = map.getBounds();
		searchIndex[0] = 0;
//		searchResidenceIndex[0] = 0;
		queryObj.index = 0;
		queryObj.residenceIndex = 0;
	} else {
		queryObj.index = searchIndex[currentPages - 1];
//		queryObj.residenceIndex = searchResidenceIndex[currentPages - 1];
	}
	
	if(isClickSearch){
		if($.trim(bedroom) == '' && $.trim(rent) == '' && $.trim(keywords) == ''){
			var point = new BMap.Point(CityClass.cityCenter["北京"].lng, CityClass.cityCenter["北京"].lat);
			map.centerAndZoom(point, 12);
		}
	}
	
	queryObj.budget = rent;
	queryObj.keywords = encodeURIComponent(keywords);
	queryObj.bedRoom = bedroom;
	queryObj.lowLatitude = bounds == undefined ? 0 : bounds.getSouthWest().lat;
	queryObj.lowLongitude = bounds == undefined ? 0 : bounds.getSouthWest().lng;
	queryObj.highLongitude = bounds == undefined ? 0 : bounds.getNorthEast().lng;
	queryObj.highLatitude = bounds == undefined ? 0 : bounds.getNorthEast().lat;	
	queryObj.houseType = houseType;
	queryObj.specialSearch = specialSearch;
	queryObj.isClickSearch = isClickSearch;
	queryObj.mapTag = maptag;
	queryObj.cityCode = CityClass.getCurrentCityCode();
	queryObj.filterKeyword = encodeURIComponent(filterKeyword);
	
	
}
var fromHomePage = 1;
function setSearchOptions() {
	keywords = $("#keywords").val();
//	houseType = $("#houseTypeInput").val();
	houseType = $("#rent").val();
	if (houseType.replace(/[ ]/g, "") == "买房") {
		dealType = 1;
		houseType = 1;
		listType = $("#buy_listType").val();
	} else if (houseType.replace(/[ ]/g, "") == "租房") {
		dealType = 2;
		houseType = 2;
		// 路途时间
		time = $("#time").val();
		mode = time.split(',')[0];
		time = time.split(',')[1].substring(0,2);
		if(mode == '步行') mode = 1;
		else mode = 2;
	}
	// 价格
	rent = $("#price").val();
	// 居室
	bedroom = $("#bedroom").val();
	if (bedroom === undefined)
		bedroom = '';
	else {
		bedroom = bedroom.replace(/\D/g, "");
	}
	
	// 说明是第一次跳转到找房页，并且带有关键词
	if(($("#budgetInput").val() != '' || $("#keywordsInput").val() != '') && fromHomePage == 1){
		rent = $("#budgetInput").val();
		keywords = $("#keywordsInput").val();
		fromHomePage = 0;
	}
	keywords = keywords == $("#keywords").attr('placeholder') ? "" : keywords;
	if (keywords.length > 0) {
		specialSearch = 1;
		// 显示清空条件按钮
		$(".clearBtn").show();
	}else{
		$(".clearBtn").hide();
	}
	keywords = formatKeyword(keywords);
	$("#keywords").val(keywords);
	rent = formatRent(rent);
	
	filterKeyword = $("#filterInput").val();
	filterKeyword = filterKeyword == $("#filterInput").attr('placeholder') ? "" : filterKeyword;
}

var timesearchNoResult = false;

//从数据库中取出数据
function getResidenceDate() {
	$("#loadMore").hide();
	$("#listPan").empty();
	$("#listPan").append("<div class=\"wait\"></div>");
	var url;
	if (houseType == 1) {
		url = "/BrokerSearch.action?saleSearch";
	}
	else{
		url = "/BrokerSearch.action?rentSearch";
		timesearchNoResult = false;
	}
	$.ajaxSettings.async = false;
	$.getJSON(url, {budget : queryObj.budget,
					keywords : queryObj.keywords,
					bedRoom : queryObj.bedRoom,
					lowLatitude : queryObj.lowLatitude,
					lowLongitude :queryObj.lowLongitude,
					highLongitude : queryObj.highLongitude,
					highLatitude :queryObj.highLatitude,
					houseType : queryObj.houseType,
					specialSearch : queryObj.specialSearch,
					isClickSearch : queryObj.isClickSearch,
					mapTag : queryObj.mapTag,
					cityCode : queryObj.cityCode,
					index: queryObj.index,
//					residenceIndex: queryObj.residenceIndex,
					filterKeyword: queryObj.filterKeyword,
					mode: mode,
					time: time,
					lngLat: lngLat || null
				},
				function(e) {
					if(houseType == 2 && e.type != undefined && e.type != 1) {
						timesearchNoResult = true;
						return;
					}
					// 提示信息
//					PromptInfo.showPromptInfo(e.promptInfo);
//					
					if(e.pageModel.rows>0)
						showResultInfo(e.pageModel.rows, e.pageModel.result[0].residenceName, e.pageModel.result[0].brokerCount);
					else
						$(".searchResult .info").text("地图范围内暂无小区");
					
					searchIndex[currentPages] = currentPages;
//					searchResidenceIndex[currentPages] = e.residenceIndex;
					if (request_count == 1) {
						// 第一次请求的时候计算出最大的可能页数
						max_page = e.pageModel.pages;
						$("#residenceCurrPage").text(1);
						$("#ressidenceTotalPage").text(max_page);
						// 如果第一次请求的库中的记录数要比请求的数量大
						if (e.pageModel.rows > parseInt(rowLimit)) {
							totalPage = Math.ceil(parseInt(rowLimit) / 40);
							real_number = parseInt(rowLimit);
						} else {
							totalPage = Math.ceil(e.pageModel.rows / 40);
							real_number = e.pageModel.rows;
						}
					} else if (request_count != 1) {
						// 接下来一次请求后，如果库中还有数据未取出来
						if (e.pageModel.rows > (parseInt(rowLimit) + parseInt(real_number))) {
							// 累计取出的数量
							real_number = parseInt(real_number) + parseInt(rowLimit);
							// 累计已经取到的页数
							totalPage = parseInt(totalPage) + Math.ceil(parseInt(rowLimit) / 40);
						} else { // 下一次请求会取出最后的数据
							// 累计已经取到的页数
							totalPage = parseInt(totalPage) + Math.ceil((e.pageModel.rows - parseInt(real_number)) / 40);
							// 累计取出的数量
							real_number = e.pageModel.rows;
						}
					}
					$("#listPan").empty();
					readyObj(e.pageModel.result);
//					readyMatchResidenceObj(e.moreMatchResidenceList);
				}
			);
}

//取出当前页所需要的数据，显示数据，并添加相应的事件
function showcurContent(current_page, index, drag) {
	$("#loadMore").hide();
	$("#listPan").empty();
	current_marker = undefined;
	
	if (resObgs.length == 0 || timesearchNoResult) {
		var warnInfo = "该区域暂没有合适经纪人<br>建议您联系周边小区的经纪人试试 :)";
		$("#listPan").append("<div style='width:300px; margin:20px auto; line-height:25px; font-size:14px; color:#666;'>"+warnInfo+"</div>");
		$("#waiting").remove();
		map.clearOverlays();
		if(pointCollection) {
			pointCollection.clear();	
		}
		// 即使搜索不到经纪人，也显示无经纪人的小区(针对买房搜索)
		if(houseType == 1)
			showMoreMatchResidenceList();
		// 输入关键词+点击搜索时，调整地图
		if (specialSearch == 1 && isClickSearch == 1) {
			adjustMapView();
			specialSearch = 0;
			isClickSearch = 0;
		}
		return;
	}
	
	// 显示小区信息
	showResidenceInfo(current_page, index);
	
	// 经纪人列表初始化为第一页
	currentBrokerPage = 1;
	if(current_residence && Math.ceil(current_residence.brokerCount / 10) > currentBrokerPage) $("#loadMore").show();
	
	
	// 当前小区没有经纪人
	if (resObgs[index].residenceBrokerList.length == 0) {
	
		var warnInfo = "";
//		if(houseType == 1){
//			if(specialSearch == 1 && isClickSearch == 1)
//				warnInfo = "该小区暂没有合适经纪人<br>建议您联系周边小区的经纪人试试 :)";
//			else
				warnInfo = "该小区暂没有合适经纪人<br>建议您联系周边小区的经纪人试试 :)";
//		} else {
//			if(timesearchNoResult) warnInfo = "暂时没有合适经纪人<br>建议您联系周边小区的经纪人试试 :)";
//		}
		$("#listPan").append("<div style='width:300px; margin:20px auto; line-height:25px; font-size:14px; color:#666;'>"+warnInfo+"</div>");
		$("#waiting").remove();
//		map.clearOverlays();
//		if(pointCollection) {
//			pointCollection.clear();	
//		}
		// 即使搜索不到经纪人，也显示无经纪人的小区(针对买房搜索)
//		if(houseType == 1)
			showMoreMatchResidenceList();
		// 输入关键词+点击搜索时，调整地图
		if (specialSearch == 1 && isClickSearch == 1) {
			adjustMapView();
			specialSearch = 0;
			isClickSearch = 0;
		}
		
		var markobj = searchMarker(resObgs[index].longitude, resObgs[index].latitude);
		brokerFirstMark = markobj;
		showBrokerResidenceMark(markobj);
		
	} else {
		current_obj = [];
		var curObgs = $("body").data(String(currentPages));
		current_obj.push(curObgs[index]);
		
		// 显示经纪人列表
		showBrokerList(curObgs[index].residenceBrokerList);
		
		// 判断是否要隐藏加载更多经纪人按钮
		if(curObgs[index].brokerCount > 10){
			$("#loadMore").show();
		}
		
		// 添加经纪人评分点击事件
		BrokerReview.init();
		
		result_index = 0;
		if (specialSearch == 1 && isClickSearch == 1) {
			adjustMapView();
			specialSearch = 0;
			isClickSearch = 0;
		}
		if (maptag == 1) {
//			showmarkets();
			showMoreMatchResidenceList();
			$("#listPan").children().first("div").mouseenter();
			if(brokerFirstMark != undefined && drag != 1) {
				markerClick(brokerFirstMark);
			}
		}
//		if ($("#listPan").width() > 600) {
//			$("#listPan").find("div").width(650).find(".household").addClass(
//					"household2");
//		}
		// 跟踪用户的行为
		bindforward('residence');
		if (maptag == 1) {
			initMap();
		}
	}
}

// 显示经纪人列表
function showBrokerList(brokerList) {
	for(var key = 0; key < brokerList.length; key++) {
		var broker = brokerList[key];
		
		var headPic = "/images/public/head.png";
		if(broker.pic != undefined) {
			headPic = brokerListPhtoto + '/' + Math.floor(broker.zid / 10000) + '/'+ broker.pic;
		}
		var bid = "bIndex" + key;
		var brokerContent = '<div class="agentInfor" id='+bid+'>';
		// 特殊标签
		if(broker.tagSpecial != '')
			brokerContent += '<div class="authenty">'+broker.tagSpecial+'</div>';
		// 经纪人基本信息(姓名、头像、公司)
		brokerContent += '<a href="'+broker.url+'" class="headpic" target="_blank"><img src="'+headPic+'" alt="经纪人头像" onerror=\"showImgDelay(this,\'/images/defaultPic/head.png\',2)\" /></a>'
			+ '<div class="personalInfor"><h4><a href="'+broker.url+'" target="_blank">'+broker.name+'</a></h4><div class="company">'+broker.brokerageName;
		// 门店
//			if(broker.salesofficeName!=''){
//				brokerContent += '，'+ broker.salesofficeName;
//			}
		// 在售
		if(houseType == 1 && broker.sales!=0){
			if(broker.brokerageName) {
				brokerContent += '，';
			}
			brokerContent += '<a class="links-primary" target="_blank" href="/SaleHomeController.action?goToShowSaleListView&brokerNo='+broker.zid+'&houseType=1&bedRoom='+queryObj.bedRoom+'&budget='+queryObj.budget+'">'+broker.sales+'套</a>在售房产';
		}
		// 在租
		else if(houseType == 2 && broker.rentals!=0){
			if(broker.brokerageName) {
				brokerContent += '，';
			}
			brokerContent += '<a class="links-primary" target="_blank" href="/SaleHomeController.action?goToShowSaleListView&brokerNo='+broker.zid+'&houseType=2&bedRoom='+queryObj.bedRoom+'&budget='+queryObj.budget+'">'+broker.rentals+'套</a>在租房产';
		}
		brokerContent += '</div>';
		// 标签
		if(broker.tag!=';' || broker.tag!='；'){
			var t = broker.tag.split(/[;；，,]/);
			if(t.length>0){
				brokerContent += '<div class="tags">';
				var j = 0;
				for(var i=0; i<t.length; i++){
					if(t[i]!='' && t[i]!=';' && t[i]!='；' && t[i]!=',' && t[i]!='，'){
						brokerContent += '<a href="'+broker.url+'" target="_blank" class="tag-ls '+tagClass[j++]+'">'+t[i]+'</a>';
					}
				}
				brokerContent += '</div>';
			}
		}
		brokerContent += '</div>';
		// 最新动态
		if(broker.news!='' && broker.news.length==26)
			brokerContent += '<div class="trends">'+broker.news+'...</div>';
		else
			brokerContent += '<div class="trends">'+broker.news+'</div>';
		// 评论
		brokerContent += '<ul class="comments" id="'+broker.zid+'"><li class="thumbs"><span class="zgIcon zgIcon-thumbs-o-up"></span><em>'+broker.likes+'</em></li><li class="thumbs"><span class="zgIcon zgIcon-thumbs-o-down"></span><em>'+broker.steps+'</em></li><li class="last evaluation">查看评论</li></ul>';
		
        brokerContent += '</div>';
		$("#listPan").append($(brokerContent));
		$("#waiting").remove();
		if (maptag == 1) {
			// 鼠标进去
			$("#listPan").children().first("div").addClass("on");
			$("#listPan").children().eq(result_index).bind(
					"mouseenter",
					function() {
//						if(current_infobox != undefined) {
//							closeInfoBox(current_infobox);
//							$("#layout").hide();
//						}
//							PromptInfo.showPromptInfo(3, 300);
						current_index = $("#listPan div").index(this);
//							if(lastIndex != undefined && lastIndex != $("#listPan dl").index(this)) {
//								if(changedMark.length != 0) {
//									backMark();
//									changedMark = [];
//								}
//							}
//							lastIndex = current_index;
						if(changedMark.length != 0) {
							backMark();
							changedMark = [];
						}
						$(this).addClass("on").siblings("div").removeClass("on");
						var markobj = searchMarker(current_obj[0].longitude, current_obj[0].latitude);
						brokerFirstMark = markobj;
						showBrokerResidenceMark(markobj);
//								BMapLib.EventWrapper.trigger(markobj, 'click', {
//									'obj' : markobj, 
//									'source':1
//								});
					});
			// 鼠标离开
//			$("#listPan").children().eq(result_index).bind(
//					"mouseleave",
//					function(){ 
//							PromptInfo.showPromptInfo(2, 1000);
//							 current_index=$("#listPan dl").index(this); 
//							 var markobj=searchMarker(current_obj[current_index].longitude,current_obj[current_index].latitude);
//							 restoreIcon(markobj); 
//					});
			
		}
		result_index = result_index + 1;
	}
}

//显示小区信息
function showResidenceInfo(current_page, index) {
	$(".communityInfor").empty();
	var curObgs = $("body").data(String(currentPages));
	var residence = curObgs[index];
	current_residence = residence;
	updateResultInfo(residence.residenceName, residence.brokerCount);
	var pic = "/images/defaultPic/residence.jpg";
	if(residence.smallPic != '') pic = residence.smallPic;
	var resiContent = '<a href="'+residence.url+'" target="_blank"><img src="'+pic+'" alt="小区图片" onerror=\"showImgDelay(this,\'/images/defaultPic/residence.jpg\',2)\"/></a>'
		+ '<div class="residenceInfor"><h5><a href="'+residence.url+'" target="_blank">'+residence.residenceName+'</a>'
		+ '<a href="/ResidenceSaleSearch.action?JspSaleHome&residenceId='+residence.residenceId+'&houseType='+houseType+'&bedRoom='+bedroom+'&budget='+rent+'" target="_blank" style="float:right;">房源</a></h5>';
//		+ '<div class="residenceInfor"><h5><a href="'+residence.url+'" target="_blank">'+residence.residenceName+'</a><a href="###" class="unlike">不喜欢</a></h5>';

	// 地址
	resiContent += '<div class="houseType">地址：'+residence.address+'</div>';
	
	// 标签
	if(residence.tag!=''){
		var t = residence.tag.split(/[;；，,]/);
		if(t.length>0){
			resiContent += '<div class="tags">';
			var j = 0;
			for(var i=0; i<t.length; i++){
				if(t[i]!='' && t[i]!=',' && t[i]!='，'){
					resiContent += '<a href="'+residence.url+'" taget="_blank" class="tag-ls '+tagClass[j++]+'">'+t[i]+'</a>';
				}
			}
			resiContent += '</div>';
		}
	}
	
	// 价格
	var priceName = "均价：";
	var unitPrice = "";
	if(houseType == 2) {
		priceName = "租金：";
		if(bedroom === undefined || "" == $.trim(bedroom)) {
			var low1 = residence.rentalPriceLow;
			var high1 = residence.rentalPriceHigh;
			var low2 = residence.rentalPriceLow2;
			var high2 = residence.rentalPriceHigh2;
			if(low1 > 0 && high1 > 0) {
				unitPrice += "一居" + low1;
				if(low1 != high1)
					unitPrice += "-" + high1 + "";
			}
			if(low2 > 0 && high2 > 0) {
				if(low1 > 0 && high1 > 0) {
					unitPrice += "，";
				}
				unitPrice += "二居" + low2;
				if(low2 != high2)
					unitPrice += "-" + high2 + "";
			}
			if(low1 == 0 && high1 == 0 && low2 == 0 && high2 == 0) {
				unitPrice = "暂无报价";
			}
		} else {
			var low1 = residence.rentalPriceLow;
			var high1 = residence.rentalPriceHigh;
			if(low1 > 0 && high1 > 0) {
				unitPrice += bedroom + "居:" + low1 + "-" + high1;
			} else {
				unitPrice = "暂无报价";
			}
		}
		if(unitPrice == "") {
			priceName = "";
		}
	} else {
		if(residence.unitPrice > 0) {
			unitPrice = residence.unitPrice;
		} else {
			unitPrice = "暂无报价";
		}
		
	}
//	resiContent += '<div class="prices">价格区间: '+RentalPriceLow+'-'+RentalPriceHigh+'元/月<br />参考价: 1200/月</div>';
	resiContent += '<div class="prices">'+priceName+unitPrice+'</div>';
	
	// 户型
	var layout = "";
	if(residence.layout != ''){
		var layouts = residence.layout.split(/,/);
		$.each(layouts, function(i, item) {
			layout += "<em>";
			layout += item.substring(0, 2);
			layout += "</em>";
			layout += item.substring(2)+"，";
		});
		layout = layout.substring(0, layout.length-1);
	}else{
		layout = "暂无资料";
	}
	resiContent += '<div class="houseType">户型：'+layout+'</div>';
	
	resiContent += '</div>';
	$(".communityInfor").append($(resiContent));
}

//初始化搜索参数
function initSearchOption() {
	currentPages = 1;
	request_count = 1;
}

//将取出的数据放在对象数组中
function readyObj(data) {
	if (request_count == 1) {
		resObgs = [];
	}
	$.each(data, function(i, item) {
		resObgs.push(item);
	});
	//缓存检索数据
	$("body").data(String(currentPages), data);
}

//将取出的数据放在对象数组中
function readyMatchResidenceObj(data) {
	if (request_count == 1) {
		matchResidence_obj = [];
	}
	$.each(data, function(i, item) {
			matchResidence_obj.push(item);
		}
	);
	//缓存检索数据
	$("body").data(String( currentPages), data);
}

//首页
function firstPage() {
	if (currentPages > 1) {
		currentPages = 1;
		$("#currentPage").text(1);
		if (map.getZoom() > 16) {
			if (daelTye == 1)
				showMapClusterDatas((currentPages - 1) * 10, 10);
			else
				showMapRentalClusterDatas((currentPages - 1) * 10, 10);
		} else
			searchByOptions();
	}
}
// 下一页
function nextPage() {
	/*
	 * alert("currentPages :"+currentPages+"totalPage :"+totalPage+"max_page
	 * :"+max_page);
	 */
	if (currentPages < totalPage) {
		currentPages = currentPages + 1;
		$("#residenceCurrPage").text(currentPages);
		/* show(); */
//		setQuery();
//		getResidenceDate();
		showcurContent(currentPages, 0);

	} else if (currentPages == totalPage && currentPages < max_page) {
		request_count = request_count + 1;
		currentPages = currentPages + 1;
		setQuery();
		getResidenceDate();
		$("#residenceCurrPage").text(currentPages);
		showcurContent(currentPages, 0);
	}
	invalidateNex();
	invalidatePre();
}
// 上一页
function prevPage() {

	if (currentPages != 1) {
		currentPages -= 1;
		$("#residenceCurrPage").text(currentPages);
		//setQuery();
		//getResidenceDate();
		showcurContent(currentPages, 0);
	}
	invalidatePre();
	invalidateNex();
}
// 尾页
function lastPage() {
	if (currentPage < totalPage) {
		currentPage = totalPage;
		$("#currentPage").text(currentPage);
		if (map.getZoom() > 16) {
			if (dealType == 1) {
				showMapClusterDatas((currentPage - 1) * 10, total);
			} else {
				showMapRentalClusterDatas((currentPage - 1) * 10, total);
			}
		} else {
			searchByOptions();
		}
	}
}
//在第一页的时候使后退按钮失效
function invalidatePre() {
	if (currentPages == 1) {
		$("#prePage").addClass("unAvailable");
	} else if ($("#prePage").hasClass("unAvailable")) {
		$("#prePage").removeClass("unAvailable").addClass('prevPage');
	}
}

// 在最后一页的时候使前进按钮失效
function invalidateNex() {
	if (currentPages == max_page) {
		$("#nextPage").addClass("unAvailable");
	} else if ($("#nextPage").hasClass("unAvailable")) {
		$("#nextPage").removeClass("unAvailable").addClass('nextPage');
	}
}


//在地图上显示当前页的图片标识   
function showmarkets() {
	map.clearOverlays();
	for ( var i = 0; i < current_obj.length; i++) {
		var myIcon;
		/*myIcon=selectIcon(selectRank(current_obj[i]),1);*/
		myIcon = new BMap.Icon(current_obj[i].iconBas, new BMap.Size(
				30, 40), {
		 anchor: new BMap.Size(10, 10) 
		});
		var point = new BMap.Point(current_obj[i].longitude,
				current_obj[i].latitude);
		var marker = new BMap.Marker(point, {
			icon : myIcon
		});
			BMapLib.EventWrapper.addListener(marker, 'click', function(e) {
			markerClick(e);
		});
		// addclickListener(marker);
		map.addOverlay(marker);
	}
}

//保存改变的点   
var changedMark = [];
function backMark() {
	var resetIcon= new BMap.Icon(smallPoint, new BMap.Size(30, 40), {
		 anchor: new BMap.Size(10, 10) 
	});
	$.each(changedMark, function(i, item) {
		item.setIcon(resetIcon);
	});
}

//改变当前小区的图标
function showBrokerResidenceMark(e) {
	var current_lat = e.getPosition().lat;
	var current_lng = e.getPosition().lng;
	var matchResidence = $("body").data(String(currentPages));
	current_marker = e;
	var resetIcon= new BMap.Icon(bigPoint, new BMap.Size(30, 40), {
		 anchor: new BMap.Size(10, 10) 
	});
	current_marker.setIcon(resetIcon);										
//	current_residence=matchResidence[0];
	changedMark.push(current_marker);
//	$.each(matchResidence, function(i, item) {
//		if (item.latitude == current_lat && item.longitude == current_lng) {
//			var resetIcon= new BMap.Icon(bigPoint, new BMap.Size(30, 40), {
//				 anchor: new BMap.Size(10, 10) 
//			});
//			current_marker.setIcon(resetIcon);										
//			current_residence=item;
//			changedMark.push(current_marker);
//		}
//	});
}

//标注的点击事件（新版本）source 1 = 需要弹框  0 不需要   
function markerClick(e, index) {
	// e.obj存在表示鼠标悬浮到小区列表触发，e.obj不存在表示点击标注(e.obj即为被点击的标注对象)
	var current_lat;
	var current_lng;
	if(e.obj) {
		current_lat = e.obj.getPosition().lat;
		current_lng = e.obj.getPosition().lng;
	} else if(e.target) {
		current_lat = e.target.point.lat;
		current_lng = e.target.point.lng;
	} else {
		current_lat = e.point.lat;
		current_lng = e.point.lng;
	}
//	var current_lat = e.obj ? e.obj.getPosition().lat : e.target.point.lat;
//	var current_lng = e.obj ? e.obj.getPosition().lng : e.target.point.lng;
	var matchResidence = $("body").data(String(currentPages));
		$.each(matchResidence, function(i, item) {
			if (item.latitude == current_lat && item.longitude == current_lng) {
				if (current_marker !== undefined) {
					//关闭信息框
//					closeInfoBox(current_infobox);
					// 非首次触发
					if (current_marker.getPosition().lat != current_lat || current_marker.getPosition().lng != current_lng || e.source == undefined) {// 没有重复点击标注
						var resetIcon= new BMap.Icon(bigPoint, new BMap.Size(30, 40), {
							 anchor: new BMap.Size(10, 10) 
						});
						current_marker = !e.obj ? searchMarker(current_lng, current_lat) : e.obj;
						current_obj_index = i;
						if(e.source == undefined) {
							if(brokerFirstMark != undefined && brokerFirstMark.point.lat == current_lat && brokerFirstMark.point.lng == current_lng) {
//								openInfoBox(1, 1);
							} else {
//								openInfoBox(1);
								if(index != undefined) {
									showcurContent(currentPages, index);
								}
							}
//							PromptInfo.showPromptInfo(5);
						} else {
							current_marker.setIcon(resetIcon);										
							current_residence=item;
							changedMark.push(current_marker);
						}
//						var myIcon=myIcon = new BMap.Icon(bigPoint, new BMap.Size(30, 40), {
//							 anchor: new BMap.Size(10, 10) 
//						});
//						current_marker.setIcon(myIcon);	
					} 
				} else {
					// 首次触发
					current_marker = !e.obj ? searchMarker(current_lng, current_lat): e.obj;
					current_obj_index = i;
					if(e.source == undefined) {
//						openInfoBox(1);
						if(index != undefined) {
							showcurContent(currentPages, index);
						}
//						PromptInfo.showPromptInfo(5);
					} else {
						var myIcon=myIcon = new BMap.Icon(bigPoint, new BMap.Size(30, 40), {
							 anchor: new BMap.Size(10, 10) 
						});
						current_marker.setIcon(myIcon);
						changedMark.push(current_marker);
						current_residence=item;
					}
					/*openWindow();*/
				}
				return;
			}
		});
//		$.each(matchResidence, function(i, item) {
//			if(e.source == undefined) {
//				$.each(current_obj, function(j, br) {
//					$.each(br, function(k, cbr) {
//						if (item.latitude == cbr.latitude && item.longitude == cbr.longitude) {
//							reviewBrokerIndexs.push(j);
//						}
//					});
//					
//				});
//				
//			} else {
//				return ;
//			}
//			
//		});
//		if(reviewBrokerIndexs.length != 0) {
//			//showReviewBrokers();
//		}
	
}

//回显经纪人
function showReviewBrokers() {
	$("#listPan").find("div").removeClass("on");
	var firstBroker = 0;
	$.each(reviewBrokerIndexs, function(k, b){
		if(k == 0) {
			firstBroker = b;
		}
		$("#listPan").find("div").eq(b).addClass("on");
	});
	var bIndex = "#bIndex" + firstBroker;
	$("#listPan").scrollTop($(bIndex).offset().top + $("#listPan").height());
	reviewBrokerIndexs = [];
}

//海量点点击事件
function pointColeectionClick(e) {
	if(current_infobox) {
		closeInfoBox(current_infobox);
	}
	current_point = new BMap.Point(e.point.lng, e.point.lat);
	var matchResidence = $("body").data(String( currentPages));
	$.each(matchResidence, function(q, item) {
		if (item.latitude == e.point.lat && item.longitude == e.point.lng) {
//			alert(e.point.lat + " ; " + e.point.lng);
			current_obj_index = q;
//			openInfoBox(1);
			return;
		}
	});
}
var mouseInfoBox; 
//显示鼠标所指的小区名称
function showCurResidenceName(e, residence) {
	if(current_infobox != undefined && current_infobox._point.lat == residence.latitude && current_infobox._point.lng == residence.longitude && current_infobox._isOpen) {
		return ;
	}
	var content = "<div class='myInfoBox'><h5 style='background:#fff;'>"+residence.residenceName+"</h5></div>";
	mouseInfoBox = new BMapLib.InfoBox(map,content,{
		boxStyle:{
			width: "150px",
            opacity:"0.8"
		},
        //closeIconMargin: "55px 5px 0 0",
        //closeIconUrl : "/images/public/close.png",
        enableAutoPan: true,
//        align: INFOBOX_AT_TOP,
        offset:new BMap.Size(0, 8)
	});
	var markobj = searchMarker(residence.longitude, residence.latitude);
	mouseInfoBox.open(markobj);
}

//隐藏鼠标所指的小区名
function disCurResidenceName() {
	if(mouseInfoBox != undefined) {
		closeInfoBox(mouseInfoBox);
	}
}

//显示更多小区
function showMoreMatchResidenceList() {
	map.clearOverlays();
	var matchResidence = $("body").data(String(currentPages));
		$.each(matchResidence, function(j, item) {
				var point = new BMap.Point(item.longitude, item.latitude);
				var resetIcon= new BMap.Icon(smallPoint, new BMap.Size(30, 40), {
					 anchor: new BMap.Size(10, 10) 
				});
				var marker = new BMap.Marker(point, {icon:resetIcon});
//				var icon = marker.getIcon();
				BMapLib.EventWrapper.addListener(marker, 'click', function(e) {
					markerClick(e, j);
				});
				BMapLib.EventWrapper.addListener(marker, 'mouseover', function(e) {
					showCurResidenceName(e, item);
				});
				BMapLib.EventWrapper.addListener(marker, 'mouseout', function(e) {
					disCurResidenceName(e);
				});
				map.addOverlay(marker);
			}
		);
	
//	var points = [];  // 添加海量点数据 
//	var matchResidence = $("body").data(String("m" + currentPages));
//	for (var i = 0; i < matchResidence.length; i++) {
//		points.push(new BMap.Point(matchResidence[i].longitude,matchResidence[i].latitude));
//	}
//	var options = {
//        size: BMAP_POINT_SIZE_NORMAL,
//        shape: BMAP_POINT_SHAPE_WATERDROP,
//        color: '#3399FF'
//    };
//	pointCollection = new BMap.PointCollection(points, options);
//    pointCollection.addEventListener('click', function (e) {
////    	alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
//    	pointColeectionClick(e);
//    });
//    pointCollection.addEventListener('mouseout', function (e) {
//    	if(nearby == 0) {
//    		map.setDefaultCursor('default');
//    	}
//    });
//    pointCollection.addEventListener('mouseover', function (e) {
//    	if(nearby == 0) {
//    		map.setDefaultCursor('pointer');
//    	}
//    });
//	map.addOverlay(pointCollection);  // 添加Overlay

	
}

//打开自定义信息框
function openInfoBox(boxType, firstGuide){
	
	var matchResidence = $("body").data(String( currentPages));
	
	var address = matchResidence[current_obj_index].address;
	var residenceName = matchResidence[current_obj_index].residenceName;
	
	var unitPrice = "";
	var url = matchResidence[current_obj_index].url;
	var priceName = "均价：";
	if(houseType == 2) {
		priceName = "租金：";
		if(bedroom === undefined || "" == $.trim(bedroom)) {
			var low1 = matchResidence[current_obj_index].rentalPriceLow;
			var high1 = matchResidence[current_obj_index].rentalPriceHigh;
			var low2 = matchResidence[current_obj_index].rentalPriceLow2;
			var high2 = matchResidence[current_obj_index].rentalPriceHigh2;
			if(low1 > 0 && high1 > 0) {
				unitPrice += "一居" + low1;
				if(low1 != high1)
					unitPrice += "-" + high1 + "";
			}
			if(low2 > 0 && high2 > 0) {
				if(low1 > 0 && high1 > 0) {
					unitPrice += "，";
				}
				unitPrice += "二居" + low2;
				if(low2 != high2)
					unitPrice += "-" + high2 + "";
			}
			if(low1 == 0 && high1 == 0 && low2 == 0 && high2 == 0) {
				unitPrice = "暂无报价";
			}
		} else {
			var low1 = matchResidence[current_obj_index].rentalPriceLow;
			var high1 = matchResidence[current_obj_index].rentalPriceHigh;
			if(low1 > 0 && high1 > 0) {
				unitPrice += bedroom + "居:" + low1 + "-" + high1;
			} else {
				unitPrice = "暂无报价";
			}
		}
		if(unitPrice == "") {
			priceName = "";
		}
	} else {
		if(matchResidence[current_obj_index].unitPrice > 0) {
			unitPrice = matchResidence[current_obj_index].unitPrice;
		} else {
			unitPrice = "暂无报价";
		}
		
	}
	var content = "";
	if(firstGuide != undefined) {
		content += "<div style='height:50px;'></div><div id='firstGuide' class='myInfoBox'><h5 style='background:#fff;'><a href='"+url+"' target='_blank'>"+residenceName+"</a></h5>"+ "<div class='comAddress' style='background:#fff'>地址："+ address + "</div>"+ "<div class='comAddress' style='background:#fff'>" + priceName+ " " + unitPrice + "</div><span class='inforArr'></span></div>";
	} else {
		content += "<div style='height:50px;'></div><div class='myInfoBox'><h5 style='background:#fff;'><a href='"+url+"' target='_blank'>"+residenceName+"</a></h5>"+ "<div class='comAddress' style='background:#fff'>地址："+ address + "</div>"+ "<div class='comAddress' style='background:#fff'>" + priceName+ " " + unitPrice + "</div><span class='inforArr'></span></div>";
	}
    var infoBox = new BMapLib.InfoBox(map,content,{
		boxStyle:{
			width: "210px"
		},
        closeIconMargin: "55px 5px 0 0",
        closeIconUrl : "/images/public/close.png",
        enableAutoPan: true,align: INFOBOX_AT_TOP,offset:new BMap.Size(0, 18)
	});
	if(boxType == 1) {
		infoBox.open(current_marker);
		current_infobox = infoBox;
	} else {
		infoBox.open(current_marker);	
		current_infoboxs.push(infoBox);
	}
	
//	$(".infoBox").bind("mouseenter", function() {
//		PromptInfo.showPromptInfo(5);
//	});
//	$(".infoBox").bind("mouseleave", function() {
//		PromptInfo.showPromptInfo(5);
//	});
	
	showLayoutData(matchResidence[current_obj_index].residenceId);
}

//关闭自定义信息框
function closeInfoBox(current_infobox){
	if(current_infobox)
		current_infobox.close();
	LBS.closeInfoBox();
}


/**
 * 标注工具
 */
// 根据经纬度找出对应的覆盖物    
function searchMarker(rlg, rlt) { 
	var marks = map.getOverlays();
	for ( var i = 0; i < marks.length; i++) {
		var eachpoint = marks[i].getPosition();
		if (eachpoint.lng == rlg && eachpoint.lat == rlt) {
			return marks[i];
		}
	}
}
//设置滚动条   
function initMap(){
	var bodyHeight = document.documentElement.clientHeight;
    var headerHeight = $(".header").height();
    var mainHeight = bodyHeight - headerHeight;
    var hHeight = $(".brokers").children("h3").height();
    $("#main,.mapLeft,.brokersRight").css('height',mainHeight - 20 +'px');
    $(".scrollDiv").css('height',mainHeight - 20 - 34 +'px');
    $("#map").css({'height': mainHeight - 240 + 'px'});
    $(".communityInfor").css({'width':$("#map").width() - 22 + 'px'});
    $(".residenceInfor").css({'width':$("#map").width() - 22 - 255 + 'px'});
}

//在时刻搜没有打开的情况下回车触发搜索   
function addEnterKeyClick() {
	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if (e && e.keyCode == 13) {
//			if ($("#timeSearch").is(":hidden")
//					&& ($("#keywords").is(":focus") || $("#price").is(":focus"))) {
//				keywords = $("#keywords").val();
//				if (keywords.length > 0)
//					specialSearch = 1;
//				searchBrokerInfo();
//			}
			if($("#filterInput").is(":focus")){
				fnBrokerFilter();
				return;
			}
			if($("#coverLayer").length == 0) {
				isClickSearch = 1;
				searchBrokerInfo();
			}
		}
	};
}
//重置地图   
function repeatMap(cityName) {
	var point = new BMap.Point(CityClass.cityCenter[cityName].lng, CityClass.cityCenter[cityName].lat);
	map.centerAndZoom(point, 12);
	searchBrokerInfo();
}
//拖动搜索   
function dragSearch() {
	/*
	 * var zo = map.getZoom(); if (zo == 10) { var point = new
	 * BMap.Point(116.404, 39.915); map.centerAndZoom(point, 5); } else if (zo ==
	 * 6) { var point = new BMap.Point(116.404, 39.915);
	 * map.centerAndZoom(point, 11); }
	 */
	if (nearby == 0) {
		isClickSearch = 0;
		var drag = 1;
		searchBrokerInfo(drag);
	}
}
//根据坐标点，调整地图的显示   
function adjustMapView() {
	var matchResidence = $("body").data(String( currentPages));
	var points = [];
	$.each(matchResidence, function(j, item) {
			var point = new BMap.Point(item.longitude, item.latitude);
			points.push(point);
		}
	);
	
	var view = map.getViewport(points);
	map.removeEventListener('zoomend', dragSearch);
	map.centerAndZoom(view.center, view.zoom);
	map.addEventListener('zoomend', dragSearch);
}
function showInfo(e) {
	if (nearby == 1) {
		var point = new BMap.Point(e.point.lng, e.point.lat);
		map.centerAndZoom(point, 16);
		map.setDefaultCursor('pointer');
		map.enableDragging();
		nearby = 0;
		searchBrokerInfo();
		/*
		 * currentPages = 1; if (isTimesearch != 1) { getMapState();
		 * request_count = 1; show(); }
		 */
	}
}

//第一次搜索之前获取request的数据   
function initSearch() {
	var init_bedRoom = $("#bedRoomInput").val();
	var init_budGet = $("#budgetInput").val();
//	var init_houseType = $("#houseTypeInput").val();
	//var init_houseType = "买房";
	var init_keywords = $("#keywordsInput").val();
	if (init_bedRoom == 0)
		init_bedRoom = '';
	$("#keywords").val(init_keywords);
	$("#price").val(init_budGet);
	$("#bedroom").val(init_bedRoom);
//	$("#indexRoomtype").val(init_houseType);
	if (init_keywords.length > 0)
		specialSearch = 1;
}
$(function() {

//    $(".selectUl").each(function(){
//        fnCreateSelectUl($(this));
//    });
    
    $(".bedroomLi,.priceLi,.timesLi").each(function(){
    	createSelectUl($(this));
    });
    createSelectUl($(".rentLi"), function(text) {
		if(text && text == '租房'){
			houseType = 2;
			$(".timesLi").show();
			$("#price").attr("placeholder","租金");
			$("#dw").text("元/月");
			$("#keywords").attr("placeholder", "到达工作地点");
			$(".priceLi .selectUl").empty().html("<li><a href='###' class='option'>不限</a></li><li><a href='###' class='option'>1000</a></li><li><a href='###' class='option'>2000</a></li><li><a href='###' class='option'>3000</a></li><li><a href='###' class='option'>5000</a></li>");
		} else {
			houseType = 1;
			$(".timesLi").hide();
			$("#price").attr("placeholder","总价");
			$("#dw").text("万元");
			$("#keywords").attr("placeholder", "地点,学区,开发商,小区");
			$(".priceLi .selectUl").empty().html("<li><a href='###' class='option'>不限</a></li><li><a href='###' class='option'>300</a></li><li><a href='###' class='option'>500</a></li><li><a href='###' class='option'>800</a></li>");
		}
		$(".priceLi").find(".selectUl").find('.option').click(function() {
			$(".priceLi").find(".fillSec").val($(this).text());
			$(".priceLi").find(".selectUl").hide();
     	});
		$("#price,#bedroom,#keywords").val("");
		$(".clearBtn").hide();
	});
    
    var t = null;
    function createSelectUl(obj, callback) {
    	 obj.mouseenter(function(event) {
     		clearTimeout(t);
     		$(".selectUl").hide();
     		obj.find(".selectUl").show();
     	});
     	obj.mouseleave(function(event) {
     		t = setTimeout(function(){
     			$(".selectUl").hide();
         	},100);
     	});
     	obj.find(".selectUl").find('.option').click(function() {
     		obj.find(".fillSec").val($(this).text());
     		obj.find(".selectUl").hide();
     		if(callback) callback($(this).text());
     	});
	}
    
	initMap();;
	initBMap();
	
	keywordSuggestion();
	
	loadMoreBroker();
	
	searchBrokerInfo();
	$(window).resize(function(){
		Init();
		initMap();
	});
	
//	var begin = 1;
//	$(".mapBox").bind("mouseenter", function() {
//		if(begin == 0)
//			PromptInfo.showPromptInfo(2);
//		else
//			begin = 0;
//	});
	// $(".showTips,.tips .close").click(function(){
	// 	$('.tips').toggle(200,initMap);
	// });
//    var oCity = null;
//    $("#changeCity").mouseenter(function() {
//        clearTimeout(oCity);
//        $(this).find(".selectList").addClass('show');
//    });
//    $("#changeCity").mouseleave(function() {
//        oCity = setTimeout(function(){
//            $("#changeCity .selectList").removeClass('show');   
//        },200);
//          
//    });
//    $("#changeCity .selectList li").click(function() {
//    	// 重置地图
//    	repeatMap($(this).text());
//        $("#cityName").text($(this).text());
//        $("#cityName").next("input").val($(this).text());
//    });
//    $("#changeCity").click(function() {
//    	// 重置地图
//    	repeatMap($("#cityName").text());
//    });
	addEnterKeyClick();
    // if($("#houseTypeInput").val()=='买房')
    // {
    //     $("#price").attr("placeholder","总价(万元)");
    // }
    // else{
    //     $("#price").attr("placeholder","月租(元)");
    // }
    // $("#houseTypeInput").change(function(){
    //     if($("#houseTypeInput").val()=='买房')
    //     {
    //         $("#price").attr("placeholder","总价(万元)");
    //     }
    //     else{
    //         $("#price").attr("placeholder","月租(元)");
    //     }
    // });

	// 关键词输入监听
    $('#keywords').bind('input propertychange', function() {
    	if($("#keywords").val() != ""){
    		$(".clearBtn").show();
    	}else{
    		$(".clearBtn").hide();
    	}
	});
    // 清空搜索条件 点击事件
    $(".clearBtn").click(function() {
    	if($("#keywords").val() != ""){
    		// 清空关键词
    		$("#keywords").val("");
//    		repeatMap($("#cityName").text());
//    		repeatMap('北京');
    	}
    	$(".clearBtn").hide();
		$("#keywords").focus();
	});
    
    
    $(document).click(function(e){
    	e = window.event || e; // 兼容IE7
		obj = $(e.srcElement || e.target);
		if(!obj.is(".filterDiv,.filterDiv *") && !obj.is("#toFilter,#toFilter *"))
		{
			$('#toFilter').show();
			$(".filterDiv").hide();
			return;
		}
    });
    
    // 筛选经纪人 点击事件
    $("#toFilter").click(function() {
        $(this).hide();
        $(".filterDiv").removeClass("hide").fadeIn(200);
        $("#filterInput").focus();
    });
    
    // 监听输入域变化
	$('#filterInput').bind('input propertychange', function() {
        if(($(this).val()!='' && $(this).val()!=$(this).attr('placeholder'))){
            $("#clearInput").show();
        }else{
        	$("#clearInput").hide();
        }
    });
     
    // 清空筛选   
    $("#clearInput").click(function(){
        $("#filterInput").val('');
        $("#clearInput").hide();
        $("#filterInput").focus();
        fnBrokerFilter();
        prevFilterKeyword = '';
    });
    
    // 确认筛选   
    $("#filterBtn").click(function(){
    	fnBrokerFilter();
	});
    
//    if(houseType == 1) {
//    	var firstSaleGuide = $.cookie("firstSaleGuide");
//        if(firstSaleGuide == "true") {
//        	$('body').pagewalkthrough({
//                name: 'introduction',
//                steps: [{
//                    wrapper: '#require',
//                    popup: {
//                        content: '#walkthrough-1',
//                        type: 'tooltip',
//                        position: 'bottom'
//                    }
//                }, {
//                    wrapper: '#firstGuide',
//                    popup: {
//                        content: '#walkthrough-2',
//                        type: 'tooltip',
//                        position: 'right'
//                    }
//                }, {
//                    wrapper: '#bIndex0',
//                    popup: {
//                        content: '#walkthrough-3',
//                        type: 'tooltip',
//                        position: 'left'
//                    }
//                }, {
//                    wrapper: '#bIndex0 .pingfen',
//                    popup: {
//                        content: '#walkthrough-4',
//                        type: 'tooltip',
//                        position: 'left'
//                    }
//                }]
//            });
//
//            // Show the tour
//            $('body').pagewalkthrough('show');
//            $.cookie("firstSaleGuide", "false");
//        }
//    } else {
//    	var firstRentalGuide = $.cookie("firstRentalGuide");
//        if(firstRentalGuide == "true") {
//        	$('body').pagewalkthrough({
//                name: 'introduction',
//                steps: [{
//                    wrapper: '#require',
//                    popup: {
//                        content: '#walkthrough-1',
//                        type: 'tooltip',
//                        position: 'bottom'
//                    }
//                }, {
//                    wrapper: '#firstGuide',
//                    popup: {
//                        content: '#walkthrough-2',
//                        type: 'tooltip',
//                        position: 'right'
//                    }
//                }, {
//                    wrapper: '#bIndex0',
//                    popup: {
//                        content: '#walkthrough-3',
//                        type: 'tooltip',
//                        position: 'left'
//                    }
//                }, {
//                    wrapper: '#bIndex0 .pingfen',
//                    popup: {
//                        content: '#walkthrough-4',
//                        type: 'tooltip',
//                        position: 'left'
//                    }
//                }]
//            });
//
//            // Show the tour
//            $('body').pagewalkthrough('show');
//            $.cookie("firstRentalGuide", "false");
//        }
//    }
    
});

var prevFilterKeyword = '';
function fnBrokerFilter(){
	// 不筛选
//    if($("#filterInput").val()==$("#filterInput").attr('placeholder') || ($("#filterInput").val()=='' && prevFilterKeyword == ''))
//    {
//        $(".filterDiv").fadeOut(200).addClass('hide');
//        $("#toFilter").show();
//    }
    // 筛选
//    else{
    	// 不重复上一次的搜索条件
    	if($("#filterInput").val() != prevFilterKeyword){
    		filterBroker();
    		prevFilterKeyword = $("#filterInput").val();
    	}
//    }
}


//点击搜索按钮触发   
$(".searchBtn").bind("click", function() {
	isClickSearch = 1;
	searchBrokerInfo();
});
$(".searchBtn").css("cursor","pointer");

function forwardToBrokerPage(url) {
	var bedRoom = queryObj.bedRoom | 0;
	var budget = queryObj.budget | 0;
	window.open(url+"/"+bedRoom+"/"+budget);
}

/**
 * 提示信息类
 */ 
var PromptInfo = {
	// 根据搜索结果提示的信息   
	resultInfo : [
	    '搜不到啊亲，重置搜索条件 or 调整地图范围吧',
		'结果太多了亲，缩小地图范围 or 加些条件啦'],
	// 随机提示的信息
    randomInfo : [
		'累觉不爱？找房，交给专业人士吧！',
		'无从下手？去看看购房攻略！',
		'丈二和尚？猛戳问答，让专家解惑！',
		'累觉不爱？找房，交给专业人士吧！',
		'无从下手？去看看购房攻略！',
		'丈二和尚？猛戳问答，让专家解惑！',
		'累觉不爱？找房，交给专业人士吧！',
		'无从下手？去看看购房攻略！',
		'累觉不爱？找房，交给专业人士吧！',
		'使用图钉，瞬间放大所钉位置'],
	// 由事件触发的提示信息
	eventInfo : [
         '地图上蓝色标注，为该经纪人服务小区',
         '点击经纪人大名或头像，进一步了解 Ta',
         '点击小区名称，了解周边配套、户型参考价、经纪人'],
    t : null,
    // 设置提示信息
    setPrompInfo : function(prompInfo){
    	$('.tips b').text(prompInfo);
    },
    // 显示提示信息（0:没有搜索结果    1:搜索结果太多   2:随机显示  ）
    showPromptInfo : function(index, delay){
    	// 没有搜索结果 或 结果太多
    	if(index == 0 || index == 1){
    		this.setPrompInfo(this.resultInfo[index]);
    	}
    	// 随机提示
    	else if (index == 2){
    		// 需要延迟显示
    		if(delay != undefined && delay > 0){
    			this.clearTimeout();
    			this.t = setTimeout(function(){
    				PromptInfo.setPrompInfo(PromptInfo.randomInfo[new Date().getMinutes()%10]);
		        }, delay);
    		}else{
    			this.setPrompInfo(this.randomInfo[new Date().getMinutes()%10]);
    		}
    	}else{
    		// 需要延迟显示
    		if(delay != undefined && delay > 0){
    			this.clearTimeout();
    			this.t = setTimeout(function(){
    				PromptInfo.setPrompInfo(PromptInfo.eventInfo[index-3]);
    	        }, delay);
    		}else{
    			this.setPrompInfo(this.eventInfo[index-3]);
    		}
    	}
    },
    clearTimeout : function(){
    	clearTimeout(this.t);
    }
};

/**
 * LBS云相关类
 */   
var LBS = {
	customLayer : null,
	infoBox : null,
	addCustomLayer : function(keyword) {
		if (LBS.customLayer) {
			map.removeTileLayer(LBS.customLayer);
		}
		LBS.customLayer = new BMap.CustomLayer({
			geotableId: 103368, // 小区数据gid
			q: keyword, //检索关键字
			tags: '', //空格分隔的多字符串
			filter: '' //过滤条件,参考http://developer.baidu.com/map/lbs-geosearch.htm#.search.nearby
		});
		map.addTileLayer(LBS.customLayer);
		this.customLayer.addEventListener('hotspotclick',LBS.openInfoBox);
	},   
	// 单击图层回调的事件   
	openInfoBox : function(e){
		closeInfoBox(current_infobox);
		var customPoi = e.customPoi;//poi的默认字段
		var contentPoi = e.content;//poi的自定义字段
		var content = "<div style='height:50px;'></div><div class='myInfoBox'><h5 style='background:#fff'><a href='"+contentPoi.url+"' target='_blank'>"+customPoi.title+"</a></h5>"
			+ "<div class='comAddress' style='background:#fff'>地址：" + customPoi.address + "</div><span class='inforArr'></span></div>";
		LBS.infoBox = new BMapLib.InfoBox(map,content,{
			boxStyle:{
				width: "210px"
			},
            closeIconMargin: "55px 5px 0 0",
            closeIconUrl : "/images/public/close.png",
            enableAutoPan: true,
            align: INFOBOX_AT_TOP,offset:new BMap.Size(0, 15)
		});
		LBS.infoBox.open(new BMap.Point(customPoi.point.lng, customPoi.point.lat));
		showLayoutData(contentPoi.rid);
	},
	closeInfoBox : function() {
		if(LBS.infoBox)
			LBS.infoBox.close();
	}
};

// 显示小区户型数据
function showLayoutData(rid) {
	$.ajax({
	    url: "/BrokerSearch.action?getLayoutData", 
	    data: {
	        residenceId: rid,
	        listType: houseType
	    }, 
	    type: "post", 
	    success: function(data) {
	    	$("#layout").empty();
	    	$("#layout").show();
	    	if(data != undefined && data.length > 0){
	    		var tr1 = '<tr class="odd"><td>户型</td>';
	    		var tr2 = '';
	    		var tr3 = '';
	    		if(houseType == 1){
	    			tr2 = '<tr><td>总价(万)</td>';
	    			tr3 = '<tr class="odd"><td>参考价(万)</td>';
	    		}else{
	    			tr2 = '<tr><td>月租(元)</td>';
	    			tr3 = '<tr class="odd"><td>参考价(元)</td>';
	    		}
	    		$.each(data, function(i, item){
	    			tr1 += '<td>'+item.bed_room+'居'+item.floor_area+'平米</td>';
	    			if(item.price_min != item.price_max)
	    				tr2 += '<td>'+item.price_min+'-'+item.price_max+'</td>';
	    			else
	    				tr2 += '<td>'+item.price_min+'</td>';
	    			tr3 += '<td>'+item.price_median+'</td>';
	    		});
	    		tr1 += '</tr>';
	    		tr2 += '</tr>';
	    		tr3 += '</tr>';
	    		layout = '<table>' + tr1 + tr2 + tr3 + '</table>';
	    		$("#layout").append(layout);
	    	}else{
	    		$("#layout").append("<span style='font-size:20px;'>暂无户型报价</span>");
	    	}
	    },
	    error:function(error){
	    }
	});
	
	$(".infoBox img").click(function() {
		$("#layout").hide();
	});
}

// 显示结果提示信息
function showResultInfo(totalResidences, residenceName, totalBrokers) {
	if(queryObj.budget=='' && queryObj.bedRoom == '' && queryObj.keywords == ''){
		$(".searchResult .info").html("地图范围有"+totalResidences+"个小区，当前小区“<span id='curResidence'>"+residenceName+"</span>”");
		if(totalBrokers > 0)
			$(".searchResult .info").append("<span class='bInfo'>有<span id='curBroker'>"+totalBrokers+"</span>名经纪人为你服务。</span>");
		else
			$(".searchResult .info").append("<span class='bInfo'>暂时没有经纪人。</span>");
	} else {
		$(".searchResult .info").html("地图范围有"+totalResidences+"个小区符合条件，当前小区“<span id='curResidence'>"+residenceName+"</span>”");
//			$(".searchResult .info").append("<span class='bInfo'>有<span id='curBroker'>"+totalBrokers+"</span>名经纪人，已为您优选10名最靠谱经纪人！</span>");
		if(totalBrokers > 20)
			$(".searchResult .info").append("<span class='bInfo'>有<span id='curBroker'>"+totalBrokers+"</span>名经纪人为你服务。</span>");
		else if(totalBrokers > 0)
			$(".searchResult .info").append("<span class='bInfo'>有<span id='curBroker'>"+totalBrokers+"</span>名经纪人为你服务。</span>");
		else
			$(".searchResult .info").append("<span class='bInfo'>暂时没有经纪人。</span>");
	}
}
// 更新提示信息中的 小区名称 和 经纪人数量
function updateResultInfo(residenceName, totalBrokers) {
	$("#curResidence").text(residenceName);
	if(queryObj.budget=='' && queryObj.bedRoom == '' && queryObj.keywords == ''){
		if(totalBrokers > 0)
			$(".searchResult .bInfo").empty().html("<span class='bInfo'>有<span id='curBroker'>"+totalBrokers+"</span>名经纪人为你服务。</span>");
		else
			$(".searchResult .bInfo").empty().html("<span class='bInfo'>暂时没有经纪人。</span>");
	} else {
		if(totalBrokers > 0)
			$(".searchResult .bInfo").empty().html("<span class='bInfo'>有<span id='curBroker'>"+totalBrokers+"</span>名经纪人为你服务。</span>");
		else
			$(".searchResult .bInfo").empty().html("<span class='bInfo'>暂时没有经纪人。</span>");
	}
	
}

// 搜索提示
function keywordSuggestion() {
	var cacheResidence = {};	//小区缓存
	var chosenResidencePool = {}; //保存已选择的小区
	$("#keywords").autocomplete({
		minLength: 0,
		width: 318,
		autoFocus: true,
		source: function( request, response ) {
			if(houseType == 1) return;
			lngLat = "";
			var term = request.term;
			if(term in cacheResidence) {
				response($.map(cacheResidence[term], function(item, index) {
					chosenResidencePool = cacheResidence[term];
					return {
						label: item.name,
	                    value: item.name,
	                    lngLat: item.lngLat
	                };
	            }));	
				return;
			}
			$.ajax({
			      url: '/TimeSearch.action?suggestion',
			      data: {destination: encodeURIComponent(request.term)},
			      type: 'post',
			      dataType: "json",
			      success: function(data, status, xhr) {
			      	  if(data.status == 1) {
			      	  	cacheResidence[term] = data.list;
			    	  	chosenResidencePool = data.list;
						response($.map(data.list, function(item, index) {
							return {
								label: item.name,
				                value: item.name,
			                    lngLat: item.lngLat
				          	};
			        	}));	
			      	  }
			    	  											
			      },
			      error: function(data) {
			    	//alert(JSON.stringify(data));
			      }
			  });
		},
		select: function( event, ui ) {
			event.preventDefault();
			lngLat = ui.item.lngLat;
			this.value = ui.item.label;
			$("#keywords").blur();
		}
	});
}

// 加载更多经纪人
function loadMoreBroker(){
	$("#loadMore").click(function() {
		$.ajax({
	      url: '/BrokerSearch.action?getResidenceBroker',
	      data: {residenceId: current_residence.residenceId, houseType: houseType, index: ++currentBrokerPage},
	      type: 'post',
	      dataType: "json",
	      success: function(data, status, xhr) {
	    	  if(data == undefined || data.length == 0) {
	    		  $("#loadMore").hide();
	    		  return ;
	    	  }
	    	  showBrokerList(data);
	    	  if(Math.ceil(current_residence.brokerCount / 10) == currentBrokerPage){
	    		  $("#loadMore").hide();
	    	  }
	      },
	      error: function(data) {
	      }
	  });
	});
}

function filterBroker() {
	currentBrokerPage = 1;
	filterKeyword = $("#filterInput").val() == $("#filterInput").attr('placeholder') ? "" : $("#filterInput").val();
	$.ajax({
	      url: '/BrokerSearch.action?getResidenceBroker',
	      data: {residenceId: current_residence.residenceId, houseType: houseType, filterKeyword: filterKeyword},
	      type: 'post',
	      dataType: "json",
	      success: function(data, status, xhr) {
	    	  $("#listPan").empty();
	    	  showBrokerList(data);
	    	  if(data && data.length >= 10){
	    		  $("#loadMore").show();
	    	  }else{
	    		  $("#loadMore").hide();
	    	  }
	      },
	      error: function(data) {
	      }
	  });
}


// jquery.pagewalkthrough.min.js 页面提示js

(function($, window, document, undefined) {"use strict"; var _globalWalkthrough = {}, _elements = [], _activeWalkthrough, _activeId, _hasDefault = true, _counter = 0, _isCookieLoad, _firstTimeLoad = true, _onLoad = true, _index = 0, _isWalkthroughActive = false, $jpwOverlay = $('<div id="jpwOverlay"></div>'), $jpWalkthrough = $('<div id="jpWalkthrough"></div>'), $jpwTooltip = $('<div id="jpwTooltip"></div>'); var methods = {isActive: function() {return !!_isWalkthroughActive }, index: function(value) {if (typeof value !== "undefined") {_index = value } return _index }, init: function(options) {options = $.extend(true, {}, $.fn.pagewalkthrough.defaults, options); var that = this; if (!options.name) {throw new Error("Must provide a unique name for a tour") } this.first().data("jpw", options); options._element = this; return this.each(function(i) {options = options || {}; options.elementID = options.name; _globalWalkthrough[options.name] = options; _elements.push(options.name); if (options.onLoad) {_counter++ } if (_counter === 1 && _onLoad) {_activeId = options.name; _activeWalkthrough = _globalWalkthrough[_activeId]; _onLoad = false } if (i + 1 === that.length && _counter === 0) {_activeId = options.name; _activeWalkthrough = _globalWalkthrough[_elements[0]]; _hasDefault = false } }) }, renderOverlay: function() {if (_counter > 1) {debug("Warning: Only 1st walkthrough will be shown onLoad as default") } _isCookieLoad = getCookie("_walkthrough-" + _activeId); if (typeof _isCookieLoad === "undefined") {_isWalkthroughActive = true; if (!onEnter()) return; showStep(); showButton("jpwClose", ".walkthrough"); setTimeout(function() {if (isFirstStep() && _firstTimeLoad) {if (!onAfterShow()) return } }, 100) } else {onCookieLoad(_globalWalkthrough) } }, restart: function(e) {if (isFirstStep()) return; _index = 0; if (!onRestart(e)) return; if (!onEnter(e)) return; showStep() }, close: function() {var options = _activeWalkthrough; onLeave(); if (typeof options.onClose === "function") {options.onClose.call(this) } _index = 0; _firstTimeLoad = true; _isWalkthroughActive = false; setCookie("_walkthrough-" + _activeId, 0, 365); _isCookieLoad = getCookie("_walkthrough-" + _activeId); $jpwOverlay.fadeOut("slow", function() {$(this).remove() }); $jpWalkthrough.fadeOut("slow", function() {$(this).html("").remove() }); $("#jpwClose").fadeOut("slow", function() {$(this).remove() }) }, show: function(name, e) {e = name == null ? name : e; name = name || this.first().data("jpw").name; _activeWalkthrough = _globalWalkthrough[this.first().data("jpw").name]; if (name === _activeId && _isWalkthroughActive || !onEnter(e)) return; _isWalkthroughActive = true; _firstTimeLoad = true; if (!onBeforeShow()) return; showStep(); showButton("jpwClose", ".walkthrough"); if (isFirstStep() && _firstTimeLoad) {if (!onAfterShow()) return } }, next: function(e) {_firstTimeLoad = false; if (isLastStep()) return; if (!onLeave(e)) return; _index = parseInt(_index, 10) + 1; if (!onEnter(e)) {methods.next() } showStep("next") }, prev: function(e) {if (isFirstStep()) return; if (!onLeave(e)) return; _index = parseInt(_index, 10) - 1; if (!onEnter(e)) {methods.prev() } showStep("prev") }, getOptions: function(activeWalkthrough) {var _wtObj; if (activeWalkthrough) {_wtObj = {}; _wtObj = _activeWalkthrough } else {_wtObj = []; for (var wt in _globalWalkthrough) {_wtObj.push(_globalWalkthrough[wt]) } } return _wtObj }, refresh: function() {showStep("next") } }; function showStep(skipDirection) {var options = _activeWalkthrough, step = options.steps[_index], targetElement = options._element.find(step.wrapper), scrollTarget = getScrollParent(targetElement), maxScroll, scrollTo; if (step.popup.type !== "modal" && !targetElement.length) {if (step.popup.fallback === "skip" || typeof step.popup.fallback === "undefined") {methods[skipDirection](); return } step.popup.type = step.popup.fallback } maxScroll = scrollTarget[0].scrollHeight - scrollTarget.outerHeight(); scrollTo = step.popup.type === "modal" ? 0 : Math.floor(targetElement.offset().top - $(window).height() / 2 + scrollTarget.scrollTop()); if (scrollTarget.scrollTop() !== scrollTo && (scrollTarget.scrollTop() === maxScroll && scrollTo < maxScroll || scrollTo <= 0 && scrollTarget.scrollTop() > 0 || scrollTo > 0)) {$jpWalkthrough.addClass("jpw-scrolling"); $jpwTooltip.fadeOut("fast"); scrollTarget.animate({scrollTop: scrollTo }, options.steps[_index].scrollSpeed, buildWalkthrough) } else {buildWalkthrough() } } function buildWalkthrough() {$jpWalkthrough.removeClass("jpw-scrolling"); var options = _activeWalkthrough, step = options.steps[_index], targetElement, scrollParent, maxHeight; options.steps[_index] = $.extend(true, {}, $.fn.pagewalkthrough.defaults.steps[0], step); targetElement = options._element.find(step.wrapper); scrollParent = getScrollParent(targetElement); $jpwOverlay.show(); if (step.popup.type !== "modal" && step.popup.type !== "nohighlight") {$jpWalkthrough.html(""); if (step.wrapper === "" || typeof step.wrapper === "undefined") {debug('Your walkthrough position is: "' + step.popup.type + '" but wrapper is empty or undefined. Please check your "' + _activeId + '" wrapper parameter.'); return } maxHeight = scrollParent.outerHeight() - targetElement.offset().top + scrollParent.offset().top + scrollParent.scrollTop(); maxHeight = maxHeight <= 0 ? targetElement.outerHeight() : maxHeight; $jpwOverlay.appendTo($jpWalkthrough); $("<div>").addClass("overlay-hole").height(Math.min(maxHeight, targetElement.outerHeight())).width(targetElement.outerWidth()).css({padding: "20px", position: "absolute", top: targetElement.offset().top - 20, left: targetElement.offset().left - 20, "z-index": 999998, "box-shadow": "0 0 1px 10000px rgba(0, 0, 0, 0.6)"}).append($("<div>").css({position: "absolute", top: 0, bottom: 0, left: 0, right: 0 })).appendTo($jpWalkthrough); if ($("#jpWalkthrough").length) {$("#jpWalkthrough").remove() } $jpWalkthrough.appendTo("body").show(); $jpwTooltip.show(); showTooltip() } else if (step.popup.type === "modal") {if ($("#jpWalkthrough").length) {$("#jpWalkthrough").remove() } showModal() } else {if ($("#jpWalkthrough").length) {$("#jpWalkthrough").remove() } } showButton("jpwPrevious"); showButton("jpwNext"); showButton("jpwFinish") } function showModal() {var options = _activeWalkthrough, step = options.steps[_index]; $jpwOverlay.appendTo("body").show().removeClass("transparent"); var textRotation = setRotation(parseInt(step.popup.contentRotation, 10)); $jpwTooltip.css({position: "absolute", left: "50%", top: "25%", "margin-left": -(parseInt(step.popup.width, 10) + 60) / 2 + "px", "z-index": "999999"}); var tooltipSlide = $('<div id="tooltipTop">' + '<div id="topLeft"></div>' + '<div id="topRight"></div>' + "</div>" + '<div id="tooltipInner">' + "</div>" + '<div id="tooltipBottom">' + '<div id="bottomLeft"></div>' + '<div id="bottomRight"></div>' + "</div>"); $jpWalkthrough.html(""); $jpwTooltip.html("").append(tooltipSlide).wrapInner($("<div />", {id: "tooltipWrapper", style: "width:" + cleanValue(parseInt(step.popup.width, 10) + 30) })).append('<div id="bottom-scratch"></div>').appendTo($jpWalkthrough); $jpWalkthrough.appendTo("body"); $jpwTooltip.show(); $("#tooltipWrapper").css(textRotation); $("#tooltipInner").append(getContent(step)).show(); $jpWalkthrough.show() } function showTooltip() {var opt = _activeWalkthrough, step = opt.steps[_index]; var top, left, arrowTop, arrowLeft, overlayHoleWidth = $("#jpWalkthrough .overlay-hole").outerWidth(), overlayHoleHeight = $("#jpWalkthrough .overlay-hole").outerHeight(), overlayHoleTop = $("#jpWalkthrough .overlay-hole").offset().top, overlayHoleLeft = $("#jpWalkthrough .overlay-hole").offset().left, arrow = 30; var textRotation = typeof step.popup.contentRotation === "undefined" || parseInt(step.popup.contentRotation, 10) === 0 ? clearRotation() : setRotation(parseInt(step.popup.contentRotation, 10)); if ($("#jpwOverlay").length) {$("#jpwOverlay").addClass("transparent") } var tooltipSlide = $('<div id="tooltipTop">' + '<div id="topLeft"></div>' + '<div id="topRight"></div>' + "</div>" + '<div id="tooltipInner">' + "</div>" + '<div id="tooltipBottom">' + '<div id="bottomLeft"></div>' + '<div id="bottomRight"></div>' + "</div>"); $jpwTooltip.html("").css({"margin-left": "0", "margin-top": "0", position: "absolute", "z-index": "999999"}).append(tooltipSlide).wrapInner($("<div />", {id: "tooltipWrapper", style: "width:" + cleanValue(parseInt(step.popup.width, 10) + 30) })).appendTo($jpWalkthrough); $jpWalkthrough.appendTo("body").show(); $("#tooltipWrapper").css(textRotation); $("#tooltipInner").append(getContent(step)).show(); $jpwTooltip.append('<span class="' + step.popup.position + '">&nbsp;</span>'); switch (step.popup.position) {case "top": top = overlayHoleTop - ($jpwTooltip.height() + arrow / 2) + parseInt(step.popup.offsetVertical, 10) - 56; left = overlayHoleLeft + overlayHoleWidth / 2 - $jpwTooltip.width() / 2 - 5 + parseInt(step.popup.offsetHorizontal, 10) + 50; arrowLeft = $jpwTooltip.width() / 2 - arrow + parseInt(step.popup.offsetArrowHorizontal, 10); arrowTop = step.popup.offsetArrowVertical ? parseInt(step.popup.offsetArrowVertical, 10) : ""; break; case "right": top = overlayHoleTop - arrow / 2 + parseInt(step.popup.offsetVertical, 10) - 20; left = overlayHoleLeft + overlayHoleWidth + arrow / 2 + parseInt(step.popup.offsetHorizontal, 10) - 40 ; arrowTop = arrow + parseInt(step.popup.offsetArrowVertical, 10); arrowLeft = step.popup.offsetArrowHorizontal ? parseInt(step.popup.offsetArrowHorizontal, 10) : ""; break; case "bottom": top = overlayHoleTop + overlayHoleHeight + parseInt(step.popup.offsetVertical, 10) - 20; left = overlayHoleLeft + overlayHoleWidth / 2 - $jpwTooltip.width() / 2 - 5 + parseInt(step.popup.offsetHorizontal, 10) + 150; arrowLeft = $jpwTooltip.width() / 2 - arrow + parseInt(step.popup.offsetArrowHorizontal, 10); arrowTop = step.popup.offsetArrowVertical ? parseInt(step.popup.offsetArrowVertical, 10) : ""; break; case "left": top = overlayHoleTop - arrow / 2 + parseInt(step.popup.offsetVertical, 10) + 40; left = overlayHoleLeft - $jpwTooltip.width() - arrow + parseInt(step.popup.offsetHorizontal, 10) + 80; arrowTop = arrow + parseInt(step.popup.offsetArrowVertical, 10); arrowLeft = step.popup.offsetArrowVertical ? parseInt(step.popup.offsetArrowHorizontal, 10) : ""; break } $("#jpwTooltip span." + step.popup.position).css({top: cleanValue(arrowTop), left: cleanValue(arrowLeft) }); $jpwTooltip.css({top: cleanValue(top), left: cleanValue(left) }); $jpWalkthrough.show() } function getContent(step) {var option = step.popup.content, content; try {content = $("body").find(option).html() } catch (e) {} return content || option } function showButton(id, appendTo) {if ($("#" + id).length) return; var btn = _activeWalkthrough.buttons[id]; appendTo = appendTo || "#tooltipWrapper"; if (!btn) return; if (typeof btn.show === "function" && !btn.show() || !btn.show) {return } $(appendTo).append($("<a />", {id: id, html: btn.i18n })) } function onCookieLoad(options) {for (var i = 0; i < _elements.length; i++) {if (typeof options[_elements[i]].onCookieLoad === "function") {options[_elements[i]].onCookieLoad.call(this) } } return false } function onLeave(e) {var options = _activeWalkthrough; if (typeof options.steps[_index].onLeave === "function") {if (!options.steps[_index].onLeave.call(this, e, _index)) {return false } } return true } function onEnter(e) {var options = _activeWalkthrough; if (typeof options.steps[_index].onEnter === "function") {return options.steps[_index].onEnter.call(this, e, _index) } return true } function onRestart(e) {var options = _activeWalkthrough; _isWalkthroughActive = true; methods.restart(e); if (typeof options.onRestart === "function") {if (!options.onRestart.call(this)) {return false } } return true } function onBeforeShow() {var options = _activeWalkthrough || {}; _index = 0; if (typeof options.onBeforeShow === "function") {if (!options.onBeforeShow.call(this)) {return false } } return true } function onAfterShow() {var options = _activeWalkthrough; _index = 0; if (typeof options.onAfterShow === "function") {if (!options.onAfterShow.call(this)) {return false } } return true } function debug(message) {if (window.console && window.console.log) window.console.log(message) } function clearRotation() {var rotationStyle = {"-webkit-transform": "none", "-moz-transform": "none", "-o-transform": "none", filter: "none", "-ms-transform": "none"}; return rotationStyle } function setRotation(angle) {var M11, M12, M21, M22, deg2rad, rad; deg2rad = Math.PI * 2 / 360; rad = angle * deg2rad; M11 = Math.cos(rad); M12 = Math.sin(rad); M21 = Math.sin(rad); M22 = Math.cos(rad); var rotationStyle = {"-webkit-transform": "rotate(" + parseInt(angle, 10) + "deg)", "-moz-transform": "rotate(" + parseInt(angle, 10) + "deg)", "-o-transform": "rotate(" + parseInt(angle, 10) + "deg)", "-ms-transform": "rotate(" + parseInt(angle, 10) + "deg)"}; return rotationStyle } function cleanValue(value) {if (typeof value === "string") {if (value.toLowerCase().indexOf("px") === -1) {return value + "px"} else {return value } } else {return value + "px"} } function setCookie(cName, value, exdays) {var exdate = new Date; exdate.setDate(exdate.getDate() + exdays); var cValue = encodeURIComponent(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString()); document.cookie = [cName, "=", cValue].join("") } function getCookie(cName) {var i, x, y, ARRcookies = document.cookie.split(";"); for (i = 0; i < ARRcookies.length; i++) {x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("=")); y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1); x = x.replace(/^\s+|\s+$/g, ""); if (x === cName) {return decodeURIComponent(y) } } } function isLastStep() {return _index === _activeWalkthrough.steps.length - 1 } function isFirstStep() {return _index === 0 } function getScrollParent(element) {if (!(element instanceof $)) {element = $(element) } element = element.first(); var position = element.css("position"), excludeStaticParent = position === "absolute", scrollParent = element.parents().filter(function() {var parent = $(this); if (excludeStaticParent && parent.css("position") === "static") {return false } return /(auto|scroll)/.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x")) }).eq(0); return position === "fixed" ? $() : !scrollParent.length ? $("body") : scrollParent } $(document).on("click", "#jpwClose, #jpwFinish", methods.close); $(document).on("click", "#jpwNext", function() {$.pagewalkthrough("next") }); $(document).on("click", "#jpwPrevious", function() {$.pagewalkthrough("prev") }); $(document).on("click", "#jpwOverlay, #jpwTooltip", function(ev) {ev.stopPropagation(); ev.stopImmediatePropagation() }); $.pagewalkthrough = $.fn.pagewalkthrough = function(method) {if (methods[method]) {return methods[method].apply(this, [].slice.call(arguments, 1)) } else if (typeof method === "object" || !method) {methods.init.apply(this, arguments); if (_hasDefault && _counter < 2) {setTimeout(function() {methods.renderOverlay() }, 500) } } else {$.error("Method " + method + " does not exist on jQuery.pagewalkthrough") } }; $.fn.pagewalkthrough.defaults = {steps: [{wrapper: "", popup: {content: "", type: "modal", position: "top", offsetHorizontal: 0, offsetVertical: 0, offsetArrowHorizontal: 0, offsetArrowVertical: 0, width: "320", contentRotation: 0 }, autoScroll: true, scrollSpeed: 1e3, lockScrolling: false, onEnter: null, onLeave: null }], name: null, onLoad: true, onBeforeShow: null, onAfterShow: null, onRestart: null, onClose: null, onCookieLoad: null, buttons: {jpwClose: {i18n: "&nbsp;", show: true }, jpwNext: {i18n: "&nbsp;", show: function() {return !isLastStep() } }, jpwPrevious: {i18n: "&nbsp;", show: function() {return !isFirstStep() } }, jpwFinish: {i18n: "&nbsp;", show: function() {return isLastStep() } } } } })(jQuery, window, document);