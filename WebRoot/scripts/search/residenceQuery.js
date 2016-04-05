/**
 * 
 * 变量，查询条件，翻页按钮处理
 * 
 */
var searchTag = 0;
var cityCode = 110000;// 地图定位到的城市代码
var cityName = "北京";
// 分页相关的参数
var currentPages = 1;
var totalPage;
var pagesize = 20;
// 功能相关参数
var dealType = 0;
// 查询条件相关的参数
var keywords;
var houseType = 1;
var rent;
var bedroom;
var bathRoom;
var orientation;
var listType;
var buildingType;
var buildingAge;
var readyHome;
// 地图相关的参数
var lowLatitude;
var lowLongitude;
var highLongitude;
var highLatitude;
var centerLatitude;
var centerLongitude;
var mapZoom = 11;
// 保存条件搜索到的结果集
/*var residenceIds = [];
var clusterIds = [];
var bedRooms = [];
var maxPrices = [];
var minPrices = [];
var houseCounts = [];
var maxAreas = [];
var minAreas = [];
var residenceNames = [];
var districtCodes = [];
var districtAddress = [];
var brokers = [];*/
// 保存地图和条件结合搜索到的结果集
/*var clusterLocations = [];
var hashTable;
var markerHashTable;*/
// 是否选择新盘的标志,1表示用户选择了新盘，0表示用户没用选择新盘
var newTag = 0;
// 是否筛选地铁,1表示选择地铁房
var metroTag = 0
// 是否选择有经纪人的标志,1表示用户选择了，0表示用户没用选择
var brokerTag = 0;
// 是否选择有房产的标志,1表示用户选择了，0表示用户没用选择
var homeTag = 0;
// listspan孩子节点的索引
var result_index = 0;
// 当前页小区的对象集合
var current_obj = [];
// 被选中的标注
var current_marker;
//被选中的对象
var current_residence;
// 标注的类型
var current_type;
//当前信息框
var current_infobox;
// 统计请求的次数
var request_count = 1;
// 最大可能的页数
var max_page;
// 当输入关键字而且没有拖拽地图是specialSearch为1
var specialSearch = 0;
//保存搜索条件的对象，当拖拽地图，点击搜索，点击checkBox时会更新该对象的属性值，点击下一页不会改变该对象的值。向后台取数据时以该对象的属性值为搜索条件。
var queryObj={};

var RandomInfo = [ '拖动、缩放地图范围，可以发现其它小区或房产信息。', '先找合适的小区，就更容易找到合适的房产。',
		'指定出发地点、路途时间，可找出在<a href="/timesearch">指定时间可达</a>的小区有哪些。' ];
var ResultInfo = [
		'目前地图中没有合适的小区或房产，可调整地图范围或条件，或让专业经纪人<a href="/bid">为您找房</a>。你也可以<a onclick="repeatMap()">重置地图范围。</a>',
		'以下这些小区接近您的要求。', '以下小区接近您的要求，还有多位经纪人可帮您寻找需要的房产。',
		'目前结果比较多，可缩小地图范围或条件，让结果更集中。' ];
function setSearchOptions() {
	keywords = $("#keywords").val();
	keywords = keywords == '区县/商圈/街道/小区/开发商' ? "" : keywords;

	//houseType = $("#indexRoomtype").val();
	houseType = "租房";
	/* selectBySelcet=0; */

	if (houseType.replace(/[ ]/g, "") == "买房") {
		dealType = 1;
		houseType = 1;
		bathRoom = $("#buy_bathRoom").val();
		orientation = $("#buy_orientation").val();
		listType = $("#buy_listType").val();
		buildingType = $("#buy_buildingType").val();
		buildingAge = $("#buy_buildingAge").val();
	} else if (houseType.replace(/[ ]/g, "") == "租房") {
		dealType = 2;
		houseType = 2;
		readyHome = $("#rent_readyHome").val();
		bathRoom = $("#rent_bathRoom").val();
		orientation = $("#rent_orientation").val();
		buildingType = $("#rent_buildingType").val();
	}
	rent = $("#price").val();
	bedroom = $("#bedroom").val();
	//20141106
	if (bedroom === undefined)
		bedroom = 1;
	else {
		bedroom = bedroom.replace(/\D/g, "");
	}
	keywords = formatKeyword(keywords);
	$("#keywords").val(keywords);
	rent = formatRent(rent);
	
	
}

//设置搜索条件
function setQuery(){
	
	setSearchOptions();
	if (request_count == 1&&maptag == 1)
		 {
			bounds = map.getBounds();
		}
	
	queryObj={};
	queryObj.budget=rent;
	queryObj.keywords=encodeURIComponent(keywords);
	queryObj.bedRoom=bedroom;
	queryObj.lowLatitude=bounds == undefined ? 0 : bounds.getSouthWest().lat;
	queryObj.lowLongitude=bounds == undefined ? 0 : bounds.getSouthWest().lng;
	queryObj.highLongitude=bounds == undefined ? 0 : bounds.getNorthEast().lng;
	queryObj.highLatitude=bounds == undefined ? 0 : bounds.getNorthEast().lat;	
	queryObj.isNew=newTag;
	queryObj.isMetro=metroTag;
	queryObj.isBroker=brokerTag;
	queryObj.isHome=homeTag;
	queryObj.houseType=houseType;
	queryObj.dragFlag=specialSearch;
	queryObj.mapTag=maptag;
	queryObj.cityCode = cityCode;
	
	
}


/*
function setMapOptions() {
	hashTable = new Hashtable();
	markerHashTable = new Hashtable();
	var bounds = map.getBounds();
	lowLatitude = bounds.getSouthWest().lat;
	lowLongitude = bounds.getSouthWest().lng;
	highLongitude = bounds.getNorthEast().lng;
	highLatitude = bounds.getNorthEast().lat;
	var centerPoint = map.getCenter();
	centerLatitude = centerPoint.lat;
	centerLongitude = centerPoint.lng;
}

function searchByMapOptions() {
	var bounds = map.getBounds();
	$("#listPan").empty();
	$("#listPan").append("<div class=\"wait\"></div>");
	setSearchOptions();
	if (bedroom === undefined)
		bedroom = "";
	else {
		bedroom = bedroom.replace(/\D/g, "");
	}
	keywords = formatKeyword(keywords);
	$("#keywords").val(keywords);
	rent = formatRent(rent);
	$("#price").val(rent);
	if (houseType == 1)
		var url = "/ResidenceSaleSearch.action?getResidenceSaleSearch";
	else if (houseType == 2)
		var url = "/ResidenceSaleSearch.action?getResidenceRentSearch";
	$.ajaxSettings.async = false;
	$.getJSON(url, {
		budget : rent,
		keywords : encodeURIComponent(keywords),
		bedRoom : bedroom,
		lowLatitude : bounds.getSouthWest().lat,
		lowLongitude : bounds.getSouthWest().lng,
		highLongitude : bounds.getNorthEast().lng,
		highLatitude : bounds.getNorthEast().lat,
		currentPage : currentPages,
		isNew : newTag,
		isBroker : brokerTag,
		isHome : homeTag
	}, function(e) {
		// 进行了第二次搜索的时候地图重置
		if (e.flag == 1) {
			var point = new BMap.Point(116.404, 39.915);
			map.centerAndZoom(point, 10);
		}
		totalPage = Math.ceil(e.rows / pagesize);
		$("#listPan").empty();
		readyMapData(e.ResidenceSaleSearch);
		addCustomLayer();
		 showResidences(); 
		var residence = "";
		$.each(e.ResidenceSaleSearch, function(i, item) {

			// var builtYear;
			// if(item.builtYear=== undefined)
			// builtYear="";
			// else
			// builtYear=item.builtYear+'年建 ';
			if (houseType == 1) {
				var unitPriceall;
				if (item.unitPriceall == 0)
					unitPriceall = "<span>";
				else
					unitPriceall = "<span>均价:" + item.unitPriceall + "元/平";
			} else
				unitPriceall = "<span>";
			residence = residence + "<dl class='clearfix'>" + "<dt><img src='"
					+ item.defaultPic + "' /></dt>"
					+ "<dd class='community clearfix'>" + "<a href='"
					+ item.url + "'>" + item.residenceName + "</a>"
					+ unitPriceall + "</span><a href='/residencebroker/"
					+ item.residenceId + houseType
					+ "' class='broker round' ></a>" + "</dd>"
					+ "<dd class='household clearfix'>";
			if (houseType == 1) {
				$.each(item.saleSearchList, function(j, item) {
					if (!(item.totalPricelow === undefined))
						residence = residence + "<a href='/home/"
								+ item.residenceId + houseType + item.bedRoom
								+ "'><span class='h" + item.bedRoom
								+ "' title='总价约" + item.totalPricelow + "-"
								+ item.totalPricehigh + "万,中间价"
								+ item.totalPrice50 + "万'>"
								+ item.totalPricelow + "万</span></a>";
				});
			}// if(houseType==1)
			else {
				$.each(item.rentSearchList, function(j, item) {
					if (!(item.totalPricelow === undefined))
						residence = residence + "<a href='/home/"
								+ item.residenceId + houseType + item.bedRoom
								+ "'><span class='h" + item.bedRoom
								+ "' title='总价约" + item.totalPricelow + "-"
								+ item.totalPricehigh + "元,中间价"
								+ item.totalPrice50 + "元'>"
								+ item.totalPricelow + "元</span></a>";
				});
			}// else{}
			if (residence.length > 0)
				residence += "</dd></dl>";
			if (residence.length > 0)
				$("#listPan").append(residence);
			// 鼠标进去
			$("#listPan").children().eq(result_index).bind(
					"mouseenter",
					function() {

						
						 * current_index = $("#listPan dl").index(this);
						 * openWindow(); if (current_marker != undefined)
						 * restoreIcon(current_marker,current_type); var markobj =
						 * searchMarker( current_obj[current_index].longitude,
						 * current_obj[current_index].latitude); current_marker =
						 * markobj;
						 * current_type=current_obj[current_index].priceRank>=10000?1:2;
						 * changIcon(markobj,current_type);
						 

						current_index = $("#listPan dl").index(this);
						var markobj = searchMarker(
								current_obj[current_index].longitude,
								current_obj[current_index].latitude);
						BMapLib.EventWrapper.trigger(markobj, 'click', {
							'obj' : markobj
						});

					});
			// 鼠标离开
			
			 * $("#listPan").children().eq(result_index).bind("mouseleave"
			 * ,function(){ current_index=$("#listPan dl").index(this); var
			 * markobj=searchMarker(current_longitude[current_index],current_latitude[index]);
			 * restoreIcon(markobj);
			 * 
			 * });
			 

			result_index = result_index + 1;
			residence = "";
		});// $.each(e.ResidenceSaleSearch, function(i,item)
		result_index = 0;
		if ($("#listPan").width() > 600) {
			$("#listPan").find("dl").width(650).find(".household").addClass(
					"household2");
		}
	});

	// Init();
}

// 在地图上显示所有的图片标识
function showResidences() {

	for ( var i = 0; i < residenceIds.length; i++) {
		var myIcon = new BMap.Icon("/images/public/map/bizcircle.png",
				new BMap.Size(28, 31), {
				 anchor: new BMap.Size(-30, 40) 
				});
		var point = new BMap.Point(clusterLocations[i].lng,
				clusterLocations[i].lat);
		var marker = new BMap.Marker(point, {
			icon : myIcon
		});
		map.addOverlay(marker);
		
		 * marker.addEventListener("mouseover", function ()
		 * {changIcon(this);;}); marker.addEventListener("mouseout", function ()
		 * {restoreIcon(this);;});
		 
	}
}

function readyMapData(data) {
	residenceIds = [];
	residenceNames = [];
	clusterLocations = [];
	current_longitude = [];
	current_latitude = [];
	current_address = [];
	current_price = [];
	$.each(data, function(i, item) {
		current_longitude.push(item.longitude);
		current_latitude.push(item.latitude);
		residenceIds.push(item.residenceId);
		var point = new BMap.Point(item.longitude, item.latitude);
		clusterLocations.push(point);
		residenceNames.push(item.residenceName);
		current_address.push(item.address);
		current_price.push(item.unitPriceall);
	});
}
*/
/*
// 添加标注
function addMarker(point, index) {
	var myIcon = new BMap.Icon("/images/public/map/house.png", new BMap.Size(
			22, 21), {
	 anchor: new BMap.Size(-30, 32) 
	});
	var marker = new BMap.Marker(point, {
		icon : myIcon
	});
	map.addOverlay(marker);

	return marker;
}
function addInfoWindow(marker, index, infoWindowHtml) {
	var infoWindow = new BMap.InfoWindow(infoWindowHtml);
	infoWindow.addEventListener("clickclose", function() {
		total = residenceIds.length;
		totalPage = Math.ceil(total / 10);
		$("#search_total").text(total);
		$("#search_pages").text(totalPage);
		$("#totalPages").text(totalPage);
		// $("#currentPage").text(1);
		if (dealType == 1)
			showClusterDatas();
		else
			showRentalClusterDatas();
	});
	var openInfoWinFun = function() {
		marker.openInfoWindow(infoWindow);
	};
	marker.addEventListener("click", openInfoWinFun);
}
*/

// 首页
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
		showcurContent(currentPages);

	} else if (currentPages == totalPage && currentPages < max_page) {
		request_count = request_count + 1;
		getResidenceDate();
		currentPages = currentPages + 1;
		$("#residenceCurrPage").text(currentPages);
		showcurContent(currentPages);
	}
	invalidateNex();
	invalidatePre();
}
// 上一页
function prevPage() {

	if (currentPages != 1) {
		currentPages -= 1;
		$("#residenceCurrPage").text(currentPages);
		/* show(); */
		showcurContent(currentPages);

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
			if (dealType == 1)
				showMapClusterDatas((currentPage - 1) * 10, total);
			else
				showMapRentalClusterDatas((currentPage - 1) * 10, total);
		} else
			searchByOptions();
	}
}

// 在第一页的时候使后退按钮失效
function invalidatePre() {

	if (currentPages == 1) {
		$("#pre_rpage").addClass("unAvailable");
	} else if ($("#pre_rpage").hasClass("unAvailable"))
		$("#pre_rpage").removeClass("unAvailable").addClass('prevPage');

}

// 在最后一页的时候使前进按钮失效
function invalidateNex() {

	if (currentPages == max_page) {
		$("#next_rpage").addClass("unAvailable");
	} else if ($("#next_rpage").hasClass("unAvailable"))
		$("#next_rpage").removeClass("unAvailable").addClass('nextPage');

}

// 筛选函数，如果选择非新房则返回true,如果选择新房，且对象却是是新房数据，则返回true，否则返回false
function isavailableElment(item) {
	if (newTag == 0)
		return 1;
	else if (newTag == 1 && item.isNew == 1)
		return 1;
	else
		return 0;

}

/**
 * 
 * 地图状态
 */

function getMapState() {
	// 获取中心点的经纬度
	if (maptag == 1) {
		var centerPoint = map.getCenter();
		centerLatitude = centerPoint.lat;
		/* alert(centerLatitude); */
		centerLongitude = centerPoint.lng;
		// 获取地图层级
		var zoom = map.getZoom();
	}
	// 获取新盘的参数
	var chosenew = newTag;
	// 获取关键字
	var key_words = $("#keywords").val();
	key_words = formatKeyword(key_words);
	if (key_words.length == 0)
		key_words = '';

	// 获取预算
	/* var budg=$("#price").val().replace(/\D/g,""); */
	var budg = $("#price").val();
	if (budg.length == 0)
		budg = '';
	/* else buge=budg.replace(/\D/g,""); */
	// 获取居室数
	/* var rooms=$("#bedroom").val().replace(/\D/g,""); */
	var rooms = $("#bedroom").val();
	if (rooms.length == 0)
		rooms = '';
	// 租或买
	var roomty = $("#indexRoomtype").val();
	/*
	 * if(roomty=='租房')roomty=0; else if(roomty=='买房')roomty=1;
	 */
	var url_tail = '/' + centerLatitude + '_' + centerLongitude + '_' + zoom
			+ '_' + chosenew + '_' + key_words + '_' + budg + '_' + rooms + '_'
			+ roomty;
	// var pre_url=location.href;
	// var new_url=pre_url.split('?')[0]+url_tail;

	var url = "/search" + url_tail;

	window.history.pushState({}, 0, url);

}

function fillurl() {
	var pre_url = location.href;

	if (!(pre_url.split('search/')[1] === undefined)) {

		/* alert(pre_url.split('&')[1].split('_')[6]); */
		$("#keywords").val(
				decodeURIComponent(pre_url.split('search/')[1].split('_')[4]));
		$("#price").val(
				decodeURIComponent(pre_url.split('search/')[1].split('_')[5]));
		$("#bedroom").val(
				decodeURIComponent(pre_url.split('search/')[1].split('_')[6]));
		$("#indexRoomtype").val(
				decodeURIComponent(pre_url.split('search/')[1].split('_')[7]));
		if (maptag == 1) {
			var point = new BMap.Point(Number(pre_url.split('search/')[1]
					.split('_')[1]), Number(pre_url.split('search/')[1]
					.split('_')[0]));
			map.centerAndZoom(point, Number(pre_url.split('search/')[1]
					.split('_')[2]));
		}

	}

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
}// function searchMarker(pointer)

// 设置指定覆盖物被选中的颜色
function changIcon(markerObj, type) {

	var myIcon;
	
	
	/*if (type == 2) {
		myIcon = new BMap.Icon("/images/public/map/locationSec.png",
				new BMap.Size(30, 40), {
				 anchor: new BMap.Size(-30, 40) 
				});

	} else if (type == 1) {
		myIcon = new BMap.Icon("/images/public/map/promoteSec.png",
				new BMap.Size(30, 40), {
				 anchor: new BMap.Size(-30, 40) 
				});
	}*/
	
	myIcon=selectIcon(type,2);

	markerObj.setIcon(myIcon);

}
// 设置指定覆盖物取消选择
function restoreIcon(markerObj, type) {
	var myIcon;
	
/*	if (type == 1) {
		myIcon = new BMap.Icon("/images/public/map/promote.png", new BMap.Size(
				30, 40), {
		 anchor: new BMap.Size(-30, 40) 
		});

	} else if (type == 2) {
		myIcon = new BMap.Icon("/images/public/map/location.png",
				new BMap.Size(30, 40), {
				 anchor: new BMap.Size(-30, 40) 
				});
	}*/
	
	
	myIcon=selectIcon(type,1);

	markerObj.setIcon(myIcon);
	/*
	 * alert("1：mark:"+markerObj.getPosition().lat+" type:"+type+"\nIcon
	 * :"+myIcon.imageUrl);
	 */
}

// 为标注添加点击事件,弹出对应的窗口(老版本)
function addclickListener(markerObj) {

	markerObj.addEventListener("click", function() {

		var type;
		var current_lat = this.getPosition().lat;
		var current_lng = this.getPosition().lng;
		// TODO
		for ( var i = 0; i < current_obj.length; i++) {
			if (current_obj[i].latitude == current_lat
					&& current_obj[i].longitude == current_lng) {

			/*	type = current_obj[i].priceRank >= 10000 ? 1 : 2;*/
				if (current_marker !== undefined) {
					restoreIcon(current_marker, current_type);
				}
				/*current_marker = this;
				current_type = type;
				changIcon(this, type);*/
				current_index = i;
				/*openWindow();*/
				openInfoBox();  
				return;
			}
		}

	});

}
// TODO
// 标注的点击事件（新版本）
function markerClick(e) {

	var type;
	// e.obj存在表示鼠标悬浮到小区列表触发，e.obj不存在表示点击标注(e.obj即为被点击的标注对象)
	var current_lat = e.obj ? e.obj.getPosition().lat : e.target.point.lat;
	var current_lng = e.obj ? e.obj.getPosition().lng : e.target.point.lng;
	for ( var i = 0; i < current_obj.length; i++) {
		if (current_obj[i].latitude == current_lat
				&& current_obj[i].longitude == current_lng) {
			if (current_marker !== undefined) {
				// 非首次触发

				if (current_marker.getPosition().lat != current_lat
						|| current_marker.getPosition().lng != current_lng) {// 没有重复点击标注
					
					var resetIcon= new BMap.Icon(current_residence.iconBas, new BMap.Size(
							30, 40), {
						 anchor: new BMap.Size(10, 10) 
						});
					//关闭信息框
					closeInfoBox();
					current_marker.setIcon(resetIcon);										
					current_marker = !e.obj ? searchMarker(current_lng,
							current_lat) : e.obj;
					current_residence=current_obj[i];
					var myIcon=myIcon = new BMap.Icon(current_obj[i].iconSec, new BMap.Size(
							30, 40), {
						 anchor: new BMap.Size(10, 10) 
						});
					current_marker.setIcon(myIcon);					
					current_index = i;
					openInfoBox();
					//openWindow();
				}
				else
					{
					//重复点击，若信息窗口已关闭则开启之
					if(current_infobox["_isOpen"]==false){
						openInfoBox();
					}
					
					}
			} else {
				// 首次触发
				current_marker = !e.obj ? searchMarker(current_lng, current_lat)
						: e.obj;
				var myIcon=myIcon = new BMap.Icon(current_obj[i].iconSec, new BMap.Size(
						30, 40), {
					 anchor: new BMap.Size(10, 10) 
					});
				current_marker.setIcon(myIcon);
				current_residence=current_obj[i];
				current_index = i;
				 openInfoBox();
				/*openWindow();*/
			}
			return;
		}
	}

	
}

/**
 * 百度云，地图弹出层
 */

var customLayer;
var searchInfoWindow;
function addCustomLayer() {
	if (customLayer) {
		map.removeTileLayer(customLayer);
	}
	var filter = concatfilter();
	customLayer = new BMap.CustomLayer({
		geotableId : 69989,
		q : '', // 检索关键字
		tags : '', // 空格分隔的多字符串
		filter : 'residence_id:' + filter// 过滤条件,参考http://developer.baidu.com/map/lbs-geosearch.htm#.search.nearby
	});

	map.addTileLayer(customLayer);
	customLayer.addEventListener('hotspotclick', callback);
}

function callback(e)// 单击热点图层
{
	var customPoi = e.customPoi;// poi的默认字段
	var contentPoi = e.content;// poi的自定义字段
	/*
	 * var content = '<p style="width:280px;margin:0;line-height:20px;">地址：' +
	 * customPoi.address + '<br/>价格:'+contentPoi.dayprice+'元'+'</p>';
	 */
	var content = '<p style="width:280px;margin:0;line-height:20px;">地址：'
			+ customPoi.address + '<br/>';
	searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
		title : customPoi.title, // 标题
		width : 290, // 宽度
		height : 40, // 高度
		panel : "panel", // 检索结果面板
		enableAutoPan : true, // 自动平移
		enableSendToPhone : false, // 是否显示发送到手机按钮
		searchTypes : [
		/*
		 * BMAPLIB_TAB_SEARCH, //周边检索 BMAPLIB_TAB_TO_HERE, //到这里去
		 * BMAPLIB_TAB_FROM_HERE //从这里出发
		 */]
	});
	var point = new BMap.Point(customPoi.point.lng, customPoi.point.lat);
	searchInfoWindow.open(point);

}

// 拼凑filter字段
function concatfilter() {
	var result = '[';
	for ( var i = 0; i < current_obj.length; i++) {
		if (i == current_obj.length - 1)
			result = result + current_obj[i].residenceId;
		else
			result = result + current_obj[i].residenceId + ',';
	}
	result = result + ']';
	return result;
}

//老版本的信息框
function openWindow() {
	
	
	var res_age;
	var res_subway;
	var res_bus;
	var res_school;
	var res_shop;
	var res_market;
	var res_hospital;
	var residence_name = current_obj[current_index].residenceName;
	var res_address = current_obj[current_index].address;
	if (current_obj[current_index].builtYear == undefined)
		res_age = "";
	else
		res_age = "建于" + current_obj[current_index].builtYear + "年,";
	if (current_obj[current_index].metro == 0)
		res_subway = "";
	else
		res_subway = "<li class='subway' title='地铁'><span></span>"
				+ current_obj[current_index].metro + "</li>";
	if (current_obj[current_index].bus == 0)
		res_bus = "";
	else
		res_bus = "<li class='bus' title='公交'><span></span>"
				+ current_obj[current_index].bus + "</li>";
	if (current_obj[current_index].school == 0)
		res_school = "";
	else
		res_school = "<li class='school' title='学校'><span></span>"
				+ current_obj[current_index].school + "</li>";
	if (current_obj[current_index].shop == 0)
		res_shop = "";
	else
		res_shop = "<li class='shop' title='商场'><span></span>"
				+ current_obj[current_index].shop + "</li>";
	if (current_obj[current_index].market == 0)
		res_market = "";
	else
		res_market = "<li class='market' title='农贸'><span></span>"
				+ current_obj[current_index].market + "</li>";
	if (current_obj[current_index].hospital == 0)
		res_hospital = "";
	else
		res_hospital = "<li class='hospital' title='医院'><span></span>"
				+ current_obj[current_index].hospital + "</li>";
	var content = "<div class='communistyDiv'>" 
			+ "<div class='comAddress'>"
			+ res_age + res_address 
			+ "</div>"
			+ "<ul class='comIcon clearfix'>" + res_subway + res_bus
			+ res_school + res_shop + res_market + res_hospital + "</ul>"
			+ "</div>";
	var infoWindow = new BMap.InfoWindow(content, {
		enableMessage : false,
		width : 210,
		height : 125
	});
	infoWindow.setTitle("<h5><a href='" + current_obj[current_index].url
			+ "' target='_blank'>" + residence_name + "</a></h5>");
	var point = new BMap.Point(current_obj[current_index].longitude,
			current_obj[current_index].latitude);
	map.openInfoWindow(infoWindow, point);
	// searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
	// title: residence_name, //标题
	// width: 290, //宽度
	// height: 40, //高度
	// panel : "panel", //检索结果面板
	// enableAutoPan : true, //自动平移
	// enableSendToPhone: false, //是否显示发送到手机按钮
	// searchTypes :[
	// /* BMAPLIB_TAB_SEARCH, //周边检索
	// BMAPLIB_TAB_TO_HERE, //到这里去
	// BMAPLIB_TAB_FROM_HERE //从这里出发
	// */ ]
	// });
	// var point = new BMap.Point(current_longitude[current_index],
	// current_latitude[current_index]);
	// searchInfoWindow.open(point);

}// openWindow()

/*
 * //自定义的覆盖物 function openCustomInfo() { var div =
 * document.createElement("div"); div.style.position = "absolute"; //
 * 可以根据参数设置元素外观 div.style.width = 100 + "px"; div.style.height = 100 + "px";
 * div.style.background = "red"; var mySquare = new
 * RsidenceInfo(map.getCenter(), div); map.addOverlay(mySquare);
 * 
 * }//openCustomInfo()
 */

//打开自定义信息框
function openInfoBox(){
	
	var res_age=current_obj[current_index].builtYear == undefined?"":"建于" + current_obj[current_index].builtYear + "年";
	var res_subway=current_obj[current_index].metro == 0?"":"<li class='subway' title='地铁("+current_obj[current_index].metro+")'><span></span></li>";
	var res_bus=current_obj[current_index].bus == 0?"":"<li class='bus' title='公交("+current_obj[current_index].bus+")'><span></span></li>"
	var res_school=current_obj[current_index].school == 0?"":"<li class='school' title='学校("+current_obj[current_index].school+")'><span></span></li>"
	var res_shop=current_obj[current_index].shop == 0?"":"<li class='shop' title='商场("+current_obj[current_index].shop+")'><span></span></li>";
	var res_market=current_obj[current_index].market == 0?"":"<li class='market' title='农贸("+current_obj[current_index].market+")'><span></span></li>"
	var res_hospital=current_obj[current_index].hospital == 0?"":"<li class='hospital' title='医院("+current_obj[current_index].hospital+")'><span></span></li>"
	var residence_name = current_obj[current_index].residenceName;
	var res_address = current_obj[current_index].address;
	var res_price=String(current_obj[current_index].showPrice).length>0?","+String(current_obj[current_index].showPrice):"";
	
	/*//TODO
	if(houseType==1)
		{
			res_price=current_obj[current_index].unitPriceall==0?"":"<div class='comAddress'>"+current_obj[current_index].unitPriceall+ "元/平米</div>";
		}
	else if(houseType==2)
		{
		
		if(Number(current_obj[current_index].two.split(",")[2])>0){
			res_price="2居："+current_obj[current_index].two.split(",")[2]+"元"
			
		}
		else if(Number(current_obj[current_index].three.split(",")[2])>0){
		
		res_price="3居："+current_obj[current_index].three.split(",")[2]+"元"
		}
		else if(Number(current_obj[current_index].one.split(",")[2])>0){
			res_price="1居："+current_obj[current_index].one.split(",")[2]+"元"
		}
		else if(Number(current_obj[current_index].four.split(",")[2])>0){
			res_price="4居："+current_obj[current_index].four.split(",")[2]+"元"
		}
		else if(Number(current_obj[current_index].five.split(",")[2])>0){
			res_price="5居："+current_obj[current_index].five.split(",")[2]+"元"
		}
		else
			res_price="";
		
		}*/
	var content = 
		"<h5><a href='" + current_obj[current_index].url+ "' target='_blank'>" 
		+ residence_name + "</a></h5>"
		+ "<div class='comAddress'>"
		+ res_age+res_price
		+ "</div>"
		+ "<div class='comAddress'>"
		+res_address 
		+ "</div>"
		+ "<ul class='comIcon clearfix'>" + res_subway + res_bus
		+ res_school + res_shop + res_market + res_hospital + "</ul>"
		+ "<div class='inforArr'></div>";
	
	var infoBox = new BMapLib.InfoBox(map,content,{
		boxStyle:{
			width: "210px"
		}
		,closeIconMargin: "-5px 5px 0 0"
		,closeIconUrl : "/images/public/close.png"
		,enableAutoPan: true
		,align: INFOBOX_AT_TOP
		,offset:new BMap.Size(0, 18)
	});
	
	infoBox.open(current_marker);
	
	current_infobox=infoBox;
}
//关闭自定义信息款
function closeInfoBox(){
	
	current_infobox.close();
	
}


function findshowPrice(obj){
	var res_price;
	
	if(houseType==1)
	{
		res_price=obj.unitPriceall==0?"":obj.unitPriceall+ "<q>元/平</q>";
	}
else if(houseType==2)
	{
	
	if(obj.two&&obj.two.length>6){
		res_price=obj.two.split(",")[2]+"<q>元,2居</q>"
		
	}
	else if(obj.three&&obj.three.length>6){
	
	res_price= obj.three.split(",")[2]+"<q>元,3居</q>"
	}
	else if(obj.one&&obj.one.length>6){
		res_price= obj.one.split(",")[2]+"<q>元,1居</q>"
	}
	else if(obj.four&&obj.four.length>6){
		res_price= obj.four.split(",")[2]+"<q>元,4居</q>"
	}
	else if(obj.five&&obj.five.length>6){
		res_price= obj.five.split(",")[2]+"<q>元,5居</q>"
	}
	else
		res_price="";
	
	}
	
	return res_price;
	
}



// 显示时刻搜的详情div
function openTimeSearchWindow() {
	var data = current_obj[current_index];
	var content = '<p style="width:200px;margin:0;line-height:20px;">地址：'
			+ current_obj[current_index].address + '<br/>' + price;
	var infoWindow = new BMap.InfoWindow(content, {
		enableMessage : false
	});
	var point = new BMap.Point(
			residenceLocations[timeSearchResidenceIndex].lng,
			residenceLocations[timeSearchResidenceIndex].lat);
	// map.panTo(point);
	map.openInfoWindow(infoWindow, point);
}
/**
 * 取得查询数据
 */
// 从库中已取出的记录条数
var real_number;
// 取出的数据
var resObgs = [];
// 第一次请求的地图边界
var bounds;
// 从数据库中取出get_number条数据
function getResidenceDate() {
	
	$("#listPan").empty();
	$("#listPan").append("<div class=\"wait\"></div>");
	
/*	
	if (request_count == 1)
		if (maptag == 1) {
			bounds = map.getBounds();
		}
	setSearchOptions();
	if (bedroom === undefined)
		bedroom = 1;
	else {
		bedroom = bedroom.replace(/\D/g, "");
	}
	keywords = formatKeyword(keywords);
	$("#keywords").val(keywords);
	rent = formatRent(rent);*/
	
	
	if (houseType == 1)
		var url = "/ResidenceSaleSearch.action?SimpleSaleSearch";
	else if (houseType == 2)
		var url = "/ResidenceSaleSearch.action?SimpleRentSearch";
	$.ajaxSettings.async = false;
	$
			.getJSON(
					url,
					{
						budget : queryObj.budget,
						keywords : queryObj.keywords,
						bedRoom : queryObj.bedRoom,
						lowLatitude : queryObj.lowLatitude,
						lowLongitude :queryObj.lowLongitude,
						highLongitude : queryObj.highLongitude,
						highLatitude :queryObj.highLatitude,
						currentCount : request_count,
						isNew : queryObj.isNew,
						isMetro : queryObj.isMetro,
						isBroker : queryObj.isBroker,
						isHome : queryObj.isHome,
						houseType : queryObj.houseType,
						dragFlag : queryObj.dragFlag,
						mapTag : queryObj.mapTag,
						cityCode : queryObj.cityCode
					},
					function(e) {
						// 提示信息
						var prompt_index = keywords.length == 0
								&& rent.length == 0 && bedroom.length == 0 ? 1
								: 2;
						$('#searchTopInfo').html(
								showResultInfo(e.result)
										+ showPromptInfo(prompt_index));

						if (request_count == 1) {

							// 第一次请求的时候计算出最大的可能页数
							max_page = Math.ceil(e.rows / 40) == 0 ? 1 : Math
									.ceil(e.rows / 40);
							$("#residenceCurrPage").text(1);
							$("#ressidenceTotalPage").text(max_page);
							// 如果第一次请求的库中的记录数要比请求的数量大
							if (e.rows > parseInt(rowLimit)) {
								totalPage = Math.ceil(parseInt(rowLimit) / 40);
								real_number = parseInt(rowLimit);
							}// if(e.rows>rowLimit)
							else {
								totalPage = Math.ceil(e.rows / 40);
								real_number = e.rows;
							}// else
						}// if(request_count==0)
						else if (request_count != 1) {
							// 接下来一次请求后，如果库中还有数据未取出来
							if (e.rows > (parseInt(rowLimit) + parseInt(real_number))) {
								// 累计取出的数量
								real_number = parseInt(real_number)
										+ parseInt(rowLimit);
								// 累计已经取到的页数
								totalPage = parseInt(totalPage)
										+ Math.ceil(parseInt(rowLimit) / 40);

							}// if(e.rows>rowLimit+real_number)
							// 下一次请求会取出最后的数据
							else {

								// 累计已经取到的页数
								totalPage = parseInt(totalPage)
										+ Math
												.ceil((e.rows - parseInt(real_number)) / 40);
								// 累计取出的数量
								real_number = e.rows;
							}// else

						}// else if(request_count!=1)

						$("#listPan").empty();
						readyObj(e.ResidenceSaleSearch);
					}// function(e)

			);

}// getResidenceDate()

// 将取出的数据放在对象数组中
function readyObj(data) {
	if (request_count == 1)
		resObgs = [];
	$.each(data, function(i, item) {
		var showPrice=findshowPrice(item);
		item.showPrice=showPrice;
		resObgs.push(item);

	}// funtion(i,item)
	);// each()
}// readyObj()



//TODO
// 取出当前页所需要的数据，显示数据，并添加相应的事件
function showcurContent(current_page) {
	$("#listPan").empty();
	var oWait = "<div id='waiting'></div>";
	$("#listPan").append(oWait);
	current_marker = undefined;
	if (resObgs.length == 0) {
		$("#listPan")
				.append(
						"<div style='width:200px; margin:20px auto; line-height:25px; font-size:14px; color:#666;'>对不起,没找到您要的信息</div>");
		$("#waiting").remove();
		map.clearOverlays();
	} else {
		current_obj = [];
		// 当前页中起始数组的索引
		var start_index = (current_page - 1) * 40;
		var end_index;
		if (current_page < max_page)
			end_index = start_index + 40;
		else if (current_page == max_page)
			end_index = start_index + (parseInt(real_number) - start_index);

		for ( var i = start_index; i < end_index; i++) {

			current_obj.push(resObgs[i]);
			residence = "";
			var builtYear = resObgs[i].builtYear === undefined ? "" : '建于'
					+ resObgs[i].builtYear + '年 ';
			/*var unitPriceall = resObgs[i].unitPriceall !== undefined
					&& resObgs[i].unitPriceall > 0 ? "<p><b>"
					+ resObgs[i].unitPriceall + "</b>元/平</p>" : "";*/
			var unitPriceall=resObgs[i].showPrice;
			var school_tag = resObgs[i].school_tag !== undefined ? "<a href='###' class='schoolIcon' title='"+resObgs[i].school_tag+"'></a>"
					: '';
			var metro = resObgs[i].metro > 0 ? "<a href='###' class='subway' title='地铁'></a>"
					: '';
			/* var homePath="/home/"+resObgs[i].residenceId+houseType+0; */
			var homeCount = bedroom.length > 0 ? bedroom : 0;
			var homePath = "/ResidenceSaleSearch.action?JspSaleHome&residenceId="
					+ resObgs[i].residenceId
					+ "&houseType="
					+ houseType
					+ "&bedRoom=" + homeCount;
			var brokerPath = "/residencebroker/" + resObgs[i].residenceId
					+ houseType;
			/* var roominfo=resObgs[i].roomString.length>0?"<span>"+resObgs[i].roomString+"居房产符合条件,</span>":''; */
			/*
			 * var commonRoomCount = resObgs[i].layoutCount == 0 ? '' : "<span><a
			 * href='/layout/" + resObgs[i].residenceId + "' target='_blank'>" +
			 * resObgs[i].layoutCount + "个常见户型</a></span>";
			 */
			var isNew = resObgs[i].isNew === undefined ? 2 : resObgs[i].isNew;
//			var commonRoomCount = resObgs[i].layoutCount == 0 ? ''
//					: "<span><a href='/ResidenceSaleSearch.action?getLayOut&residenceId="
//							+ resObgs[i].residenceId
//							+ "&houseType="
//							+ houseType
//							+ "&isNew="
//							+ isNew
//							+ "' target='_blank'>"
//							+ resObgs[i].layoutCount
//							+ "个常见户型</a></span>";
			var commonRoomCount = " <a href='/ResidenceSaleSearch.action?getLayOut&residenceId="
							+ resObgs[i].residenceId
							+ "&houseType="
							+ houseType
							+ "&isNew="
							+ isNew
							+ "' target='_blank' class='marketQuot' title='市场行情'></a>"
			var serviceInfo;
			var housety = houseType == 1 ? '在售' : '出租';
			if (resObgs[i].listNum == 0 && resObgs[i].brokerNum == 0) {
				/* serviceInfo = "<span>本小区暂无房产信息</span>"; */
				serviceInfo = "";

			} else if (resObgs[i].listNum != 0 && resObgs[i].brokerNum != 0) {
//				serviceInfo = "<span><a href='" + homePath
//						+ "' target='_blank'>" + resObgs[i].listNum + "套房产"
//						+ housety + "</a></span><span><a href='" + brokerPath
//						+ "' target='_blank'>" + resObgs[i].brokerNum
//						+ "位经纪人为您服务</a></span>"
				serviceInfo = " <dd class='broker'><a href='"+brokerPath+"' class='btn' target='_blank'><span></span>经纪人("+resObgs[i].brokerNum+")</a></dd>"+
                "<dd class='onsale'><a href='"+homePath+"' target='_blank'>"+resObgs[i].listNum+"套房产"+housety+"</a></dd>";
				
				
			} else if (resObgs[i].listNum == 0 && resObgs[i].brokerNum != 0) {
//				serviceInfo = "<span><a href='"
//						+ brokerPath
//						+ "' target='_blank'>"
//						+ resObgs[i].brokerNum
//						+ "位经纪人为您服务</a></span><span><a href='/bid'>可让专业人士为您找房</a></span>";
				serviceInfo = "<dd class='broker'><a href='"+brokerPath+"' class='btn' target='_blank'><span></span>经纪人("+resObgs[i].brokerNum+")</a></dd>";

			} else if (resObgs[i].listNum != 0 && resObgs[i].brokerNum == 0) {
//				serviceInfo = "<span><a href='" + homePath
//						+ "' target='_blank'>" + resObgs[i].listNum + "套房产"
//						+ housety + "</a></span>";
				serviceInfo = "<dd class='onsale'><a href='"+homePath+"' target='_blank'>"+resObgs[i].listNum+"套房产"+housety+"</a></dd>";
			}
			
			residence = residence + "<dl><a class='img' target='_blank' href='"+resObgs[i].url+"'><img src='"+resObgs[i].smallPic+"' alt='"+resObgs[i].residenceName+"'/></a>" 
			+ "<dt><a target='_blank' href='"+resObgs[i].url+"'>"+resObgs[i].residenceName+"</a></dt><dd class='year'>"+builtYear+"</dd>" +
			  "<dd class='icon'>" +
			  school_tag +
			  metro + 
			  commonRoomCount +
			  "</dd>" +
			  "<dd class='price'>"+unitPriceall+"</dd>" +
			  serviceInfo + "</dl>";

				
			
			
//			residence = residence + "<dl>" + "<dt>" + "<img src='"
//					+ resObgs[i].smallPic
//					+ "' width='323' height='220'  alt=''/>" + unitPriceall
//					+ "</dt>" + "<dd class='dlName'><a href='" + resObgs[i].url
//					+ "' target='_blank' class='ForwardMark'>"
//					+ resObgs[i].residenceName + "</a></dd>" + "<dd>"
//					/* +"<p>"+resObgs[i].address+builtYear+"</p>" */
//					+ "<p>" + builtYear + "</p>" + school_tag + metro + "</dd>"
//					+ "<dd class='dlText'>"
//					/* +roominfo */
//					+ commonRoomCount + serviceInfo + "</dd>" + " </dl>";

			if (residence.length > 0) {
				$("#listPan").append(residence);
				$("#waiting").remove();
			}
				

			if (maptag == 1) {
				// 鼠标进去
				$("#listPan").children().eq(result_index).bind(
						"mouseenter",
						function() {
							current_index = $("#listPan dl").index(this);
							var markobj = searchMarker(
									current_obj[current_index].longitude,
									current_obj[current_index].latitude);
							BMapLib.EventWrapper.trigger(markobj, 'click', {
								'obj' : markobj
							});
						});
				// 鼠标离开
				/*
				 * $("#listPan").children().eq(result_index).bind("mouseleave"
				 * ,function(){ current_index=$("#listPan dl").index(this); var
				 * markobj=searchMarker(current_obj[current_index].longitude,current_obj[current_index].latitude);
				 * restoreIcon(markobj); });
				 */
			}

			result_index = result_index + 1;

		}// for(var i=start_index;i<start_index+20;i++)
		result_index = 0;
		/* addCustomLayer(); */
		if (specialSearch == 1) {
			adjustMapView();
			specialSearch = 0;
		}
		if (maptag == 1) {
			showmarkets();
		}
		if ($("#listPan").width() > 600) {
			$("#listPan").find("dl").width(650).find(".household").addClass(
					"household2");
		}
		// 跟踪用户的行为
		bindforward('residence');
		if (maptag == 1) {
			initMap();
		}
	}// else
}

// 在地图上显示当前页的图片标识
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

// 根据小区的价格判断，级别分为1-12个级别，若返回0表示推广的小区
function selectRank(currentObj) {

	if (currentObj.priceRank >= 10000) {
		// 推广楼盘
		return 0;
	}
	if (houseType == 1) {
		// 普通楼盘 ，卖房
		if (currentObj.unitPriceall <= 10000) {
			return 1;
		} else if (currentObj.unitPriceall > 10000
				&& currentObj.unitPriceall <= 15000) {
			return 2;
		}

		else if (currentObj.unitPriceall > 15000
				&& currentObj.unitPriceall <= 20000) {
			return 3;
		} else if (currentObj.unitPriceall > 20000
				&& currentObj.unitPriceall <= 25000) {
			return 4;
		} else if (currentObj.unitPriceall > 25000
				&& currentObj.unitPriceall <= 30000) {
			return 5;
		} else if (currentObj.unitPriceall > 30000
				&& currentObj.unitPriceall <= 35000) {
			return 6;
		} else if (currentObj.unitPriceall > 35000
				&& currentObj.unitPriceall <= 40000) {
			return 7;
		} else if (currentObj.unitPriceall > 40000
				&& currentObj.unitPriceall <= 45000) {
			return 8;
		} else if (currentObj.unitPriceall > 45000
				&& currentObj.unitPriceall <= 50000) {
			return 9;
		} else if (currentObj.unitPriceall > 50000
				&& currentObj.unitPriceall <= 55000) {
			return 10;
		} else if (currentObj.unitPriceall > 55000
				&& currentObj.unitPriceall <= 60000) {
			return 11;
		} else {
			return 12;
		}
	} else if (houseType == 1) {
		// 普通楼盘 ，租房

		if (currentObj.unitPriceall <= 20) {
			return 1;
		} else if (currentObj.unitPriceall > 20
				&& currentObj.unitPriceall <= 30) {
			return 2;
		}

		else if (currentObj.unitPriceall > 30 && currentObj.unitPriceall <= 40) {
			return 3;
		} else if (currentObj.unitPriceall > 40
				&& currentObj.unitPriceall <= 50) {
			return 4;
		} else if (currentObj.unitPriceall > 50
				&& currentObj.unitPriceall <= 60) {
			return 5;
		} else if (currentObj.unitPriceall > 60
				&& currentObj.unitPriceall <= 70) {
			return 6;
		} else if (currentObj.unitPriceall > 70
				&& currentObj.unitPriceall <= 80) {
			return 7;
		} else if (currentObj.unitPriceall > 80
				&& currentObj.unitPriceall <= 90) {
			return 8;
		} else if (currentObj.unitPriceall > 90
				&& currentObj.unitPriceall <= 100) {
			return 9;
		} else if (currentObj.unitPriceall > 100
				&& currentObj.unitPriceall <= 110) {
			return 10;
		} else if (currentObj.unitPriceall > 110
				&& currentObj.unitPriceall <= 120) {
			return 11;
		} else {
			return 12;
		}
	}
}

// 根据楼盘的级别选择标注图片type为1表示选择小标注，为2表示选择大标注
function selectIcon(rank,type) {
	var myIcon;
                                                                                                                                                                             
	var target=type==1?"s":"b";
	
	switch (rank) {
	case 0:
		if(type==1)
			{
		myIcon = new BMap.Icon("/images/public/map/promote.png", new BMap.Size(
				30, 40), {
		/* anchor: new BMap.Size(10, 10) */
		});
			}
		else
			{
			
			myIcon = new BMap.Icon("/images/public/map/promoteSec.png", new BMap.Size(
					30, 40), {
			/* anchor: new BMap.Size(10, 10) */
			});
			
			
			
			}
		
		break;
	case 1:
		myIcon = new BMap.Icon("/images/public/map/"+target+"1.png", new BMap.Size(
				30, 40), {
		 anchor: new BMap.Size(10, 10) 
		});

		break;
	case 2:
		myIcon = new BMap.Icon("/images/public/map/"+target+"2.png", new BMap.Size(
				30, 40), {
		 anchor: new BMap.Size(10, 10) 
		});

		break;
	case 3:
		myIcon = new BMap.Icon("/images/public/map/"+target+"3.png", new BMap.Size(
				30, 40), {
		 anchor: new BMap.Size(10, 10) 
		});

		break;
	case 4:
		myIcon = new BMap.Icon("/images/public/map/"+target+"4.png", new BMap.Size(
				30, 40), {
		 anchor: new BMap.Size(10, 10) 
		});

		break;
	case 5:
		myIcon = new BMap.Icon("/images/public/map/"+target+"5.png", new BMap.Size(
				30, 40), {
		 anchor: new BMap.Size(10, 10)
		});

		break;
	case 6:
		myIcon = new BMap.Icon("/images/public/map/"+target+"6.png", new BMap.Size(
				30, 40), {
		 anchor: new BMap.Size(10, 10) 
		});

		break;
	case 7:
		myIcon = new BMap.Icon("/images/public/map/"+target+"7.png", new BMap.Size(
				30, 40), {
		 anchor: new BMap.Size(10, 10) 
		});

		break;
	case 8:
		myIcon = new BMap.Icon("/images/public/map/"+target+"8.png", new BMap.Size(
				30, 40), {
		anchor: new BMap.Size(10, 10) 
		});

		break;
	case 9:
		myIcon = new BMap.Icon("/images/public/map/"+target+"9.png", new BMap.Size(
				30, 40), {
		anchor: new BMap.Size(10, 10) 
		});
		break;
	case 10:
		myIcon = new BMap.Icon("/images/public/map/"+target+"10.png", new BMap.Size(
				30, 40), {
		 anchor: new BMap.Size(10, 10)
		});

		break;
	case 11:
		myIcon = new BMap.Icon("/images/public/map/"+target+"11.png", new BMap.Size(
				30, 40), {
		 anchor: new BMap.Size(10, 10) 
		});

		break;

	default:
		myIcon = new BMap.Icon("/images/public/map/"+target+"12.png", new BMap.Size(
				30, 40), {
		 anchor: new BMap.Size(10, 10) 
		});
		break;
	}

	return myIcon;

}

// 提醒的信息
function showPromptInfo(index) {
	if (index == 1)
		return '输入户型、预算，可更准确地找房。';
	if (index == 2)
		return RandomInfo[Math.floor(Math.random() * 3)];

}
// 结果的提示信息
function showResultInfo(index) {

	return ResultInfo[index];

}

// 根据坐标点，调整地图的显示
function adjustMapView() {
	var points = [];
	for ( var i = 0; i < current_obj.length; i++) {
		var point = new BMap.Point(current_obj[i].longitude,
				current_obj[i].latitude);
		points.push(point);
	}
	var view = map.getViewport(points);
	map.removeEventListener('zoomend', dragSearch);
	map.centerAndZoom(view.center, view.zoom);
	map.addEventListener('zoomend', dragSearch);

}

/**
 * 地图初始化
 */

var nearby = 0;
var loadmap = 0;
// 1表示map加载成功，0表示加载失败
var maptag = 1;
// 0表示使用常规搜索，1表示使用时刻搜
var isTimesearch = 0;
var map;

if (typeof BMap === 'undefined') {
	BMap = '';
	map = '';
	maptag = 0;
	tosearch();
	$("#map").html("<center><h1>网络问题，无法加载地图！</h1></center>")
} else {

	/*----------------------------------------------------地图成功加载时执行----------------------------------------------------------------------*/

	map = new BMap.Map("map", {
		enableMapClick : false
	});
	var point = new BMap.Point(116.404, 39.915);
	map.centerAndZoom(point, 12);
	/*
	 * var mapStyle = { features : [ "road", "building", "water", "land" ],//
	 * 隐藏地图上的poi style : "default" // 设置地图风格为高端黑 }; map.setMapStyle(mapStyle);
	 */

	map.setMapStyle({
		features : [ "road", "building", "water", "land" ],// 隐藏地图上的poi
 		styleJson :
[
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
                               "color": "#ffffff"
                     }
           },
           {
                     "featureType": "local",
                     "elementType": "geometry.fill",
                     "stylers": {
                               "color": "#ffffff"
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
                               "color": "#666666"
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
                               "color": "#444444"
                     }
           },
           {
                     "featureType": "highway",
                     "elementType": "labels.text.fill",
                     "stylers": {
                               "color": "#444444"
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
                               "color": "#666666"
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
                               "color": "#444444"
                     }
           },
           {
                     "featureType": "subway",
                     "elementType": "geometry.fill",
                     "stylers": {
                               "color": "#ff8585"
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
                               "color": "#F0EDE5"
                     }
           },
           {
                    "featureType": "green",
                    "elementType": "all",
                    "stylers": {
                              "color": "#c5f4b7"
                    }
          },
          {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": {
                              "color": "#B3D1FF"
                    }
          }
]
 

	});
	map.enableScrollWheelZoom();
	map.addControl(new BMap.ScaleControl());
	map.addEventListener("click", showInfo);
	// map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT,
	// type: BMAP_NAVIGATION_CONTROL_SMALL}));
	// 初始化区域数据
	var districtNames;
	var districtMemberCount;
	var districtLocations;

	// 定义一个控件类,即function
	function ZoomControl() {
		// 默认停靠位置和偏移量
		this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
		this.defaultOffset = new BMap.Size(9, 15);
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
		enlargeA.className = 'enlarge';
		enlargeA.title = '放大';
		mapTool.appendChild(enlargeA);
		enlargeA.onclick = function(e) {
			map.zoomTo(map.getZoom() + 1);
		};
		var reduceA = document.createElement('A');
		reduceA.id = 'reduceA';
		reduceA.className = 'reduce';
		reduceA.title = '缩小';
		mapTool.appendChild(reduceA);
		reduceA.onclick = function(e) {
			map.zoomTo(map.getZoom() - 1);
		};

		var flashLightA = document.createElement('A');
		flashLightA.id = 'flashLightA';
		flashLightA.className = 'flashLight';
		flashLightA.title = '指定区域';
		mapTool.appendChild(flashLightA);
		flashLightA.onclick = function(e) {
			map.setDefaultCursor('crosshair');
			if (nearby == 1) {
				map.setDefaultCursor('pointer');
				nearby = 0
				map.enableDragging();
			} else {
				nearby = 1;
				map.disableDragging();
			}

		};

		map.getContainer().appendChild(mapTool);
		// 将DOM元素返回
		return mapTool;
	};

	$(function() {

		// $("#city").change(function() {
		// 	map.setCenter($("#city").val()); 
		// 	show();
		// });
		initMap();;
		
		$(window).resize(function(){
			Init();
			initMap();
		}
		);
		
		// $(".typeUl").click(function(){
		// 	$("#price").val("");	
		// });
	
		$(".showTips,.tips .close").click(function(){
			$('.tips').toggle(800,initMap);
		})
		// 创建控件
		var myZoomCtrl = new ZoomControl();
		// 添加到地图当中
		map.addControl(myZoomCtrl);
		map.enableInertialDragging();
		//restoreTimesearchScene();
		/* window.load=show(); */
		addEnterKeyClick();
	});
	map.addEventListener('dragend', function() {
		/*
		 * currentPages = 1; if (isTimesearch != 1) { getMapState();
		 * request_count = 1; show(); }
		 */
		tosearch();

	});
	map.addEventListener('zoomend', dragSearch);

	map.addEventListener('tilesloaded', function() {
		if (nearby == 0) {
			if (loadmap == 0) {
				initSearch();
				tosearch();
				loadmap = 1;
			}
		}
	});
}// 地图成功加载

/*----------------------------------------------------地图成功加载时执行----------------------------------------------------------------------*/

function showInfo(e) {
	if (nearby == 1) {
		var point = new BMap.Point(e.point.lng, e.point.lat);
		map.centerAndZoom(point, 16);
		map.setDefaultCursor('pointer');
		map.enableDragging();
		nearby = 0;
		tosearch();
		/*
		 * currentPages = 1; if (isTimesearch != 1) { getMapState();
		 * request_count = 1; show(); }
		 */

	}
}
function show() {
	if (isTimesearch == 1) {
		if (customLayer) {
			map.removeTileLayer(customLayer);
		}
		map.clearOverlays();
		timesearchPaging();
		fillSearchData();
		if (isNotContain != 1) {
			invalidateTimesearchPre();
			invalidateTimesearchNext();
		}
	} else {
		//fillurl();
		/* searchByMapOptions(); */
		getResidenceDate();
		showcurContent(1);
		invalidatePre();
		invalidateNex();
	}

}

// TODO 这里是否存在问题？
function tosearch() {
	currentPages = 1;
	if (isTimesearch != 1) {
		/* getMapState(); */
		request_count = 1;
		setQuery();
		show();
	} else {
		show();
	}
}
// 第一次搜索之前获取request的数据
function initSearch() {

	var init_bedRoom = $("#bedRoomInput").val();
	var init_budGet = $("#budgetInput").val();
	//var init_houseType = $("#houseTypeInput").val();
	var init_houseType = "买房";
	var init_keywords = $("#keywordsInput").val();
	if (init_bedRoom == 0)
		init_bedRoom = '居室';
	$("#keywords").val(init_keywords);
	$("#price").val(init_budGet);
	$("#bedroom").val(init_bedRoom);
	$("#indexRoomtype").val(init_houseType);
	if (init_keywords.length > 0)
		specialSearch = 1;

}

/*
 * $("#rent .select_list li").click(function() { alert(1111); var tempt =
 * $(this).text(); selectBySelcet = 1; houseType = tempt; tosearch(); })
 */

$("#choseNew_button").bind("click", function() {
	if (newTag == 1)
		newTag = 0;
	else if (newTag == 0)
		newTag = 1;
	request_count = 1;
	$(this).toggleClass("choseAll");
	tosearch();

});
$("#choseMetro_button").bind("click", function() {
	if (metroTag == 1)
		metroTag = 0;
	else if (metroTag == 0)
		metroTag = 1;
	$(this).toggleClass("choseAll");
	tosearch();

});
$("#choseBroker_button").bind("click", function() {
	if (brokerTag == 1)
		brokerTag = 0;
	else if (brokerTag == 0)
		brokerTag = 1;
	$(this).toggleClass("choseAll");
	tosearch();

});
$("#choseHome_button").bind("click", function() {
	if (homeTag == 1)
		homeTag = 0;
	else if (homeTag == 0)
		homeTag = 1;
	$(this).toggleClass("choseAll");
	tosearch();

});

$(".searchBtn").bind("click", function() {
	currentPage = 1;
	currentPages = 1;
	request_count = 1;
	isPlace = 1;
	timesearchCurrentPages = 1;
	timesearchTotalPage = 1;
	keywords = $("#keywords").val()
	if (keywords.length > 0)
		specialSearch = 1;
	tosearch();
});

// $("#indexRoomtype").blur(function(){
// 	if($(this).val()=='买房'){
// 		$("#rentPrice").hide();
// 		$("#salePrice").show();
// 	}
// 	else{
// 		$("#rentPrice").show();
// 		$("#salePrice").hide();
// 	}
// })

// 在时刻搜没有打开的情况下回车触发搜索
function addEnterKeyClick() {
	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if (e && e.keyCode == 13) {
			if ($("#timeSearch").is(":hidden")
					&& ($("#keywords").is(":focus") || $("#price").is(":focus"))) {
				keywords = $("#keywords").val();
				if (keywords.length > 0)
					specialSearch = 1;
				tosearch();
			}

		}
	};

}

function repeatMap() {
	var point = new BMap.Point(116.404, 39.915);

	map.centerAndZoom(point, 12);
	tosearch()

}

function dragSearch() {

	/*
	 * var zo = map.getZoom(); if (zo == 10) { var point = new
	 * BMap.Point(116.404, 39.915); map.centerAndZoom(point, 5); } else if (zo ==
	 * 6) { var point = new BMap.Point(116.404, 39.915);
	 * map.centerAndZoom(point, 11); }
	 */
	if (nearby == 0) {
		tosearch();
	}

}

function initMap(){
	var bodyHeight = document.documentElement.clientHeight;
	var headerHeight = $(".header").height();

	var mainHeight = bodyHeight - headerHeight;
	$("#main,.mapLeft,.mapBox,.brokersRight").css('height',mainHeight+'px');

	$("#map").css({'height':'100%','width':'100%'});

	if($(".brokersRight .tips").length>0)
	{
		var tipsHeight = $(".brokersRight .tips").height();
		$(".brokers").css({'height': mainHeight - tipsHeight + 'px'});
	}
	else{
		$(".brokers").css({'height': mainHeight + 'px'});
	}

	}