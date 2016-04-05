// 分页相关的参数
var currPage = 1; // 当前页
var pages;	// 总页数
var loadedPage = 0; // 已加载页数

// 地图边界
var bounds;

// 租单分布的商圈列表
var listDist;

//// 定义地图上出现的所有覆盖物
//var MapOverlay = {"residence":1, "bizcircle":2, "mosaic":3};
//// 当前地图上显示的覆盖物(默认显示商圈)
//var currentOverlay = MapOverlay.bizcircle;

var tagClass = ["primary", "info", "success", "warning", "danger", "primary", "info", "success", "warning", "danger"];
var roleMap = {1:"租客", 2:"经纪人", 3:"房东"};
var trafficModeMap = {1:"步行", 2:"公交"};
var filterMap = {1:"步行15分钟内", 2:"步行30分钟内", 3:"公交30分钟内", 4:"公交60分钟内"};

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
		return "<div class='myInfoBox'><h5 style='text-align:center;'><a href='"+(data.url_residence ? data.url_residence+"' target='_blank'" : "###'") + ">"+data.residence_name+"</a></h5><p class='arr'></p></div>";
	};
	// 重写标注点点击事件
	BaiduMapSubClass.prototype.markerClick = function(data, marker) {
		Map.highlightMarker(marker);
	};
	
	// 实例化地图子类
	Map = new BaiduMapSubClass();
	if(Map.status != 1) return;
	Map.map.addEventListener('dragend', HouseSearch.dragSearch);
	Map.map.addEventListener('zoomend', HouseSearch.zoomSearch);
//	Map.map.setMinZoom(11); 
	Map.map.setMaxZoom(16);
}


// 从数据库中取出数据
function loadHouseData() {
	HouseSearch.atSearchStatus = true;
	loading();
	$.ajax({
      url: '/HouseSearch.action?searchRentList',
      data: HouseSearch.queryObj,
      dataType: "json",
      async: false,
      cache: false,
      success: function(json, status, xhr) {
    	  loaded();
    	  if(json.status != "1") {
    		  pages = 0;
    	  }
    	  // 根据返回的状态，进行不同的处理
    	  switch (json.status) {
    	  	case "0": // 没有符合条件的房源
    	  		// 用于查询参考价格
    	  		if(json.mosaicId)
    	  			HouseSearch.queryObj.mosaicId = json.mosaicId;
//    	  		showResultRows(0);
    	  		emptyResultRows();
    	  		noResultWarn();
    	  		if(HouseSearch.queryObj.order) showOrderCondition();
    	  		break;
			case "1": // 成功
				if(json.lngLat != undefined && json.lngLat != "") HouseSearch.queryObj.lngLat = json.lngLat; // 用于显示工作地点
				// 用于查询地图上的更多小区
    	  		if(json.mosaicId) HouseSearch.queryObj.mosaicId = json.mosaicId;
    	  		
				listHouseData(json.pageModel);
				break;
			case "2": // 模糊结果
//				showResultRows(0);
				emptyResultRows();
				$("#keyword").autocomplete("search");
				break;
			case "3": // 空搜索
				showStatisticInfo(json);
				break;
			case "-1": // 未找到相关地点
//				showResultRows(0);
				emptyResultRows();
				showWarnInfo("未找到相关地点，建议你输入其它地点试试");
				break;
			default: // 其它情况
//				showResultRows(0);
				emptyResultRows();
				noResultWarn();
				break;
			}
//		  HouseSearch.queryObj.lowLat = Map.map.getBounds() == undefined ? 0 : Map.map.getBounds().getSouthWest().lat;
		  invalidatePagination();
		  adjustFooter();
      },
      error: function(json) {
    	  loaded();
//    	  showResultRows(0);
    	  emptyResultRows();
    	  showWarnInfo("服务器繁忙，请稍后再试。");
    	  invalidatePagination();
    	  adjustFooter();
      }
   });
}

// 加载中
function loading() {
	// 通勤找房
	if(HouseSearch.searchType == HouseSearch.TYPE.TIME_SEARCH || HouseSearch.atSearchStatus)
		HouseSearch.houseContainer.empty().append("<div id='waiting'></div>");
	// 智能规划
	else 
		HouseSearch.houseContainer.empty().append("<div id='loading' style='width: 240px;height: 80px;margin: 40px auto 20px;background: transparent url(\"/images/loading.gif\") no-repeat scroll 0px 0px;'></div>");
	$(".searchResult").children().hide();
//	emptyResultRows();
	$(".pagination").removeClass("show").addClass('hide');
	$("#prevPage, #nextPage").addClass("unAvailable");
	$("#footer").hide();
}

// 加载完成
function loaded() {
	$("#waiting, #loading").remove();
}

// 清空地图标注
function clearMapMarker() {
	Map.clearMapMarker();
//	if(HouseSearch.queryObj.searchType != 3)
//		Map.clearMapMarker();
//	else
//		Map.clearMapMarker(false);
}

// 显示房源数据
function listHouseData(pageModel) {
	loaded();
	// 取出缓存中的数据
	if(typeof pageModel == "number") pageModel = $("body").data(String(pageModel));
	if (currPage == 1) {
		// 第一次请求保存总页数
		pages = pageModel.pages;
		$("#currPage").text(currPage);
		$("#totalPage").text(pages);
	} 
	// 显示结果数量
	showResultRows(pageModel.rows, pageModel.extraRows);
	// 显示排序条件
	showOrderCondition();
	// 显示房源列表
	HouseSearch.showHouseList(pageModel);
	// 缓存数据
	readyObj(pageModel);
	// 无结果
	if(pageModel.rows == 0){
//		showResultRows(0);
		emptyResultRows();
	}
	adjustFooter();
}

// 跳转到经纪人页面
function goToBrokerPage(zid) {
	window.open("/broker/showBroker/"+zid+"?bedRoom="+$("#beds").val()+"&budget="+$("#price").val(), "_blank");
}

// 将取出的数据放在对象数组中
function readyObj(data) {
	if (currPage > loadedPage) {
		loadedPage = currPage;
		//缓存检索数据
		$("body").data(String(currPage), data);
	}
}

// 上一页
function prevPage() {
	// 已在第一页
	if(currPage == 1) return;
	if (currPage > 1) {
		currPage --;
		loading();
		listHouseData(currPage);
	}
	$("#currPage").text(currPage);
	invalidatePagination();
	$(".sidebar").animate({scrollTop:0}, 0);
}

// 下一页
function nextPage() {
	// 已在最后一页
	if(currPage == pages) return;
	// 有缓存
	if (currPage < loadedPage) {
		currPage ++;
		loading();
		listHouseData(currPage);
		invalidatePagination();
	} 
	// 无缓存
	else if (currPage == loadedPage && currPage < pages) {
		currPage ++;
		HouseSearch.queryObj.currPage = currPage;
		loadHouseData();
	}
	$("#currPage").text(currPage);
	$(".sidebar").animate({scrollTop:0}, 0);
}

function invalidatePagination() {
	if(pages <= 1) {
		$(".pagination").removeClass("show").addClass('hide');
		return;
	}
	$(".pagination").removeClass("hide").addClass('show');
	if (currPage != 1) {
		$("#prevPage").removeClass("unAvailable");
	} else {
		$("#prevPage").addClass("unAvailable");
	}
	if(currPage != pages) {
		$("#nextPage").removeClass("unAvailable");
	} else {
		$("#nextPage").addClass("unAvailable");
	}
	
}

// 显示地图标注
function showMapMarker(data) {
	if(Map.status == 0) return;
	clearMapMarker();
	
	// 如果是时刻搜，就显示工作地点
	HouseSearch.showWorkLocation();
	
	var lngLat = [];
//	// 修改infoBox显示内容
//	Map.__proto__.getInfoBoxHtml = function(data) {
//		return "<div class='myInfoBox' style='text-align: center;'><h5><a href='"+(data.url_residence ? data.url_residence+"' target='_blank'" : "###'") + ">"+data.residence_name+"</a></h5><p class='arr'></p></div>";
//	};
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

// 显示商圈标注
function showBizcircleMarker(data, needRepeatMap, needAdjustMap) {
	HouseSearch.atSearchStatus = false;
	if(Map.status == 0) return;
	clearMapMarker();
	if(needRepeatMap == undefined || needRepeatMap == true){
		// 这里得先取消绑定事件，不然重置地图的时候回触发一次zoomSearch搜索
		Map.map.removeEventListener('zoomend', HouseSearch.zoomSearch);
		Map.repeatMap();
		Map.map.addEventListener('zoomend', HouseSearch.zoomSearch);
	}
	
	// 初始化自定义覆盖物样式
	Map.initCustomOverlay();
	
	// 显示商圈
	$.each(data, function(j, item) {
		var txt = item.bizcircle_name+"("+item.cnt+"套)";
		// TODO _html = infoBoxContentHtml; // 在这里拼接infobox窗口内的显示内容
		Map.addOverlay(new BMap.Point(item.lng, item.lat), txt, txt, function(){
			// 触发商圈搜索（不是根据商圈关键词搜索，而是bizcircleCode搜索）
			$("#keyword").val(txt.split("(")[0]);
			HouseSearch.search();
		});
	});
	if(needAdjustMap == undefined || needAdjustMap == true){
		Map.adjustMapView(12);
	}
}

// 设置滚动条   
function initMap(){
	var bodyHeight = document.documentElement.clientHeight;
    var headerHeight = $(".header").height()+1;
    var mainHeight = bodyHeight - headerHeight;
    $("#main,.sidebar,#map").css('height',mainHeight+'px');
    $(".houseList").css('height',mainHeight - 118 - 73 +'px');

}

// 重新计算房源列表高度
function initHouseListHeight(){
	$(".houseList").css('height', 'auto');
	var prHeight = document.documentElement.clientHeight-$(".header").height()-$(".filter").outerHeight(true)-40-73;
	if($(".houseList").height() < prHeight){
		$(".houseList").css('height',prHeight+'px');
	}
}

// 调整地图视角  （通过百度api获取地图上的所有点，然后调整到最佳视角）
function adjustMapView(level) {
	if(Map.status == 0) return;
	Map.map.removeEventListener('zoomend', HouseSearch.zoomSearch);
	Map.adjustMapView(level);
	Map.map.addEventListener('zoomend', HouseSearch.zoomSearch);
}

$(function() {
	
	HouseSearch.PC_OR_MOBILE = 1;
	
	initMap();
    
    initBaiduMap();
    
    eventBind();
    
    // 显示统计信息和地图商圈
    if($("#searchType").val() == ""){
    	showStatisticInfo();
    }
    // 带条件进入页面，触发搜索
    else{
    	HouseSearch.autoSearch();
    }
    
    initHouseListHeight();
});

// 进行所有的事件绑定
function eventBind(){
	
	HouseSearch.eventBind();
	
	// 通勤找房排序（HouseSearch.queryObj.order : 1-价格优先 2-距离优先）【只有在既输入了价格，又输入了地点时才需要】
    $(".timeSearchOrder").bind("click", function() {
    	HouseSearch.initSearchOption();
    	HouseSearch.queryObj.order = $(this).attr("order");
    	HouseSearch.queryObj.isClickSearch=1;
    	HouseSearch.queryObj.currPage=1;
    	// 20151229 add. 输入工作地点，点击搜索按钮，然后输入价格，不点击搜索，直接进行筛选，此时不会将价格作为条件进行搜索。 修改为每次都获取新的搜索条件。
    	HouseSearch.queryObj.keyword = encodeURIComponent(HouseSearch.getKeyword());
    	HouseSearch.queryObj.lngLat = HouseSearch.getLngLat();
    	HouseSearch.queryObj.beds = HouseSearch.getBeds();
    	HouseSearch.queryObj.price = HouseSearch.getPrice();
    	loadHouseData();
	});
    // 双地点搜索排序（HouseSearch.queryObj.order : 1-离我近 2-中间 3-离TA近）【只有在输入了地点时才需要】
    $(".doubleLoactionSearchOrder").bind("click", function() {
    	HouseSearch.initSearchOption();
    	HouseSearch.queryObj.order = $(this).attr("order");
    	HouseSearch.queryObj.isClickSearch=1;
    	HouseSearch.queryObj.currPage=1;
    	// 20151229 add. 输入工作地点，点击搜索按钮，然后输入价格，不点击搜索，直接进行筛选，此时不会将价格作为条件进行搜索。 修改为每次都获取新的搜索条件。
    	HouseSearch.queryObj.keyword = encodeURIComponent(HouseSearch.getKeyword());
    	HouseSearch.queryObj.lngLat = HouseSearch.getLngLat();
    	HouseSearch.queryObj.keyword2 = encodeURIComponent(HouseSearch.getKeyword2());
    	HouseSearch.queryObj.lngLat2 = HouseSearch.getLngLat2();
    	HouseSearch.queryObj.beds = HouseSearch.getBeds();
    	HouseSearch.queryObj.price = HouseSearch.getPrice();
    	loadHouseData();
    });
	
	$(".bedroomLi,.priceLi").each(function(){
    	createSelectUl($(this));
    });
    var t = null;
    function createSelectUl(obj, callback) {
    	 obj.mouseenter(function(event) {
     		clearTimeout(t);
     		$(".selectUl").hide();
     		obj.find(".selectUl").show();
     	}).mouseleave(function(event) {
     		t = setTimeout(function(){
     			$(".selectUl").hide();
         	},100);
     	}).find(".selectUl").find('.option').click(function() {
     		obj.find(".fillSec").val($(this).text());
     		obj.find(".selectUl").hide();
     		if(callback) callback($(this).text());
     	});
	}
    
	$(window).resize(function(){
		Init();
		initMap();
	});
}


// 显示统计信息
function showStatisticInfo(json) {
	loading();
	loaded();
	Map.clearMapMarker();
	$(".pagination").removeClass("show").addClass('hide');
	var content = "";
	json = listDist || json || ajaxPost("/HouseSearch.action?getStatisticInfo", {});
	if(!listDist) listDist = json;
//	content = "<i>目前有"+json.rentCnt+"条最新出租房产，分布在"+json.residenceCnt+"个小区。</i>";
	if(HouseSearch.searchType == 1){
//		content += "看看你想居住的地点，有哪些接近需求的选择！";
		content += "<strong>已经想好住在哪里？</strong><i>你来指定地点/小区，可充分了解相关房源、市场行情和生活环境。</i>";
	}else if(HouseSearch.searchType == 2){
//		content += "根据你工作/学习地点或房型、价格需求，我们将为你规划更多可选方案！";
		content += "<strong>在你不知道的地方，可能有更好的选择！</strong><i>根据工作、学习地点，我们将为你找出一小时路程内所有合适的房源。</i>";
	}else if(HouseSearch.searchType == 3){
		content += "<strong>上班各奔东西，却不妨碍我们在一起！</strong><i>在你和TA的工作/学习地点之间，规划更合理的居住地儿。</i>";
	}
	showWarnInfo(content);
	adjustFooter();
	// 显示房源分布商圈
	showBizcircleMarker(json.listDist, true);
	// 缓存活跃商圈
	$("body").data(String("activeBizcircle"), json.listDist);
}

// 显示结果数量
function showResultRows(num, houseNum) {
	if(num == 0){
		$(".searchResult .resultRows").show().text("0 套房源符合条件");
	}else if(houseNum == undefined){
		$(".searchResult .resultRows").show().text(num+" 套房源符合条件");
	}else{
		$(".searchResult .resultRows").show().text(houseNum+" 套房源符合条件，分布在 "+num+" 个小区");
	}
}
function emptyResultRows() {
	$(".searchResult .resultRows").empty();
}
// 没有结果的提示
function noResultWarn() {
	HouseSearch.houseContainer.append("<div class='warnInfo'></div>");
	// 无关键词搜索，统一提示无房源
	if(HouseSearch.queryObj.keyword == ""){
		$(".warnInfo").html("没有找到符合条件的房源<br>建议您调整居室或价格重新搜索");
	}
	// 有关键词搜索
	else{
		var prefix = HouseSearch.queryObj.isClickSearch == 0 ? "地图范围内" : "该区域";
		// 居室、月租均无输入
		if(HouseSearch.queryObj.beds == "" && HouseSearch.queryObj.price == ""){
			$(".warnInfo").html(prefix+"目前无合适房源");
		}
		// 有居室、无租金（说明租金敏感度次要）
		else if(HouseSearch.queryObj.beds != ""  && HouseSearch.queryObj.price == ""){
			$(".warnInfo").html(prefix+"目前无合适房源");
			$(".warnInfo").append("<br>建议你<a onclick='adjustBeds();' style='color:#4BA5FB;'>调整居室数量</a>重新搜索");
		}
		// 有租金（居室敏感度次要）
		else if(HouseSearch.queryObj.price != ""){
			$(".warnInfo").append(prefix+"目前无合适房源");
			// 获取参考价格（layout2nd.rental_price_median）
			var json = ajaxPost("/HouseSearch.action?getReferPriceForRent", HouseSearch.queryObj);
			if(json.status == "1"){
				if(parseInt(HouseSearch.queryObj.price) < parseInt(json.referPrice.split("-")[0]) || parseInt(HouseSearch.queryObj.price) > parseInt(json.referPrice.split("-")[1])){
					$(".warnInfo").append("<br>该区域的参考月租范围是"+json.referPrice+"，建议你<a onclick='adjustPrice();' style='color:#4BA5FB;'>调整价格</a>重新搜索");
				}
			}
		}
	}
}

// 显示提示信息
function showWarnInfo(info) {
	if($(".warnInfo").length > 0) $(".warnInfo").html(info);
	else HouseSearch.houseContainer.append("<div class='warnInfo'>"+info+"</div>");
}

// 显示排序条件
function showOrderCondition() {
	if(HouseSearch.queryObj.searchType == 2 && $.trim(HouseSearch.queryObj.keyword) != "" && HouseSearch.queryObj.price != ""){
		$(".searchResult .filterResult").show().children(".timeSearchOrder").show().siblings(".doubleLoactionSearchOrder").hide();
	} else if (HouseSearch.queryObj.searchType == 3) {
		$(".searchResult .filterResult").show().children(".doubleLoactionSearchOrder").show().siblings(".timeSearchOrder").hide();
	}
}

// 显示时间筛选条件
function showDurationFilter() {
	if(HouseSearch.queryObj.searchType == 2 && $.trim(HouseSearch.queryObj.keyword) != "" && HouseSearch.queryObj.price != ""){
		$(".searchResult .filterResult").show().children(".timeSearchOrder").show().siblings(".doubleLoactionSearchOrder").hide();
	} else if (HouseSearch.queryObj.searchType == 3) {
		$(".searchResult .filterResult").show().children(".doubleLoactionSearchOrder").show().siblings(".timeSearchOrder").hide();
	}
		
		// 按时间筛选
//		var t = null;
//		$("#filterRange,#filterRange+.selectUl").bind('mouseenter',function() {
//			t && clearTimeout(t);
//			$("#filterRange").next('.selectUl').fadeIn(100);
//		});
//		$("#filterRange,#filterRange+.selectUl").bind('mouseleave',function() {
//			t = setTimeout(function(){
//				$("#filterRange").next('.selectUl').fadeOut(100);
//         	},10);
//		});
//		if(!HouseSearch.queryObj.filter){
//			$("#filterRange b").text("全部");
//		}
}
// 需要帮助，提交需求
function needHelp() {
	if(checkLoginStatus()){
		ajaxPost("/HouseSearch.action?saveDemand", HouseSearch.queryObj);
		alertDialog("需求已提交，我们会尽快为你寻找合适的房源。");
	}
}

function adjustBeds() {
	$(".bedroomLi").mouseenter();
}

function adjustPrice() {
	$("#price").focus().select();
	$(".priceLi").mouseenter();
}

function adjustFooter() {
	$("#footer").show();
	initHouseListHeight();
}

Array.prototype.remove=function(value) {
    if(value==undefined && value.length==0)return false;
    if(this.indexOf(value) == -1) return false;
    for(var i=0,n=0;i<this.length;i++)
        if(this[i]!=value) this[n++]=this[i];
    this.length--;
};

// jquery.pagewalkthrough.min.js 页面提示js
(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){"use strict";var t={},n=Math.max,r=Math.min;t.c={};t.c.d=e(document);t.c.t=function(e){return e.originalEvent.touches.length-1};t.o=function(){var n=this;this.o=null;this.$=null;this.i=null;this.g=null;this.v=null;this.cv=null;this.x=0;this.y=0;this.w=0;this.h=0;this.$c=null;this.c=null;this.t=0;this.isInit=false;this.fgColor=null;this.pColor=null;this.dH=null;this.cH=null;this.eH=null;this.rH=null;this.scale=1;this.relative=false;this.relativeWidth=false;this.relativeHeight=false;this.$div=null;this.run=function(){var t=function(e,t){var r;for(r in t){n.o[r]=t[r]}n._carve().init();n._configure()._draw()};if(this.$.data("kontroled"))return;this.$.data("kontroled",true);this.extend();this.o=e.extend({min:this.$.data("min")!==undefined?this.$.data("min"):0,max:this.$.data("max")!==undefined?this.$.data("max"):100,stopper:true,readOnly:this.$.data("readonly")||this.$.attr("readonly")==="readonly",cursor:this.$.data("cursor")===true&&30||this.$.data("cursor")||0,thickness:this.$.data("thickness")&&Math.max(Math.min(this.$.data("thickness"),1),.01)||.35,lineCap:this.$.data("linecap")||"butt",width:this.$.data("width")||200,height:this.$.data("height")||200,displayInput:this.$.data("displayinput")==null||this.$.data("displayinput"),displayPrevious:this.$.data("displayprevious"),fgColor:this.$.data("fgcolor")||"#87CEEB",inputColor:this.$.data("inputcolor"),font:this.$.data("font")||"Arial",fontWeight:this.$.data("font-weight")||"bold",inline:false,step:this.$.data("step")||1,rotation:this.$.data("rotation"),draw:null,change:null,cancel:null,release:null,format:function(e){return e},parse:function(e){return parseFloat(e)}},this.o);this.o.flip=this.o.rotation==="anticlockwise"||this.o.rotation==="acw";if(!this.o.inputColor){this.o.inputColor=this.o.fgColor}if(this.$.is("fieldset")){this.v={};this.i=this.$.find("input");this.i.each(function(t){var r=e(this);n.i[t]=r;n.v[t]=n.o.parse(r.val());r.bind("change blur",function(){var e={};e[t]=r.val();n.val(n._validate(e))})});this.$.find("legend").remove()}else{this.i=this.$;this.v=this.o.parse(this.$.val());this.v===""&&(this.v=this.o.min);this.$.bind("change blur",function(){n.val(n._validate(n.o.parse(n.$.val())))})}!this.o.displayInput&&this.$.hide();this.$c=e(document.createElement("canvas")).attr({width:this.o.width,height:this.o.height});this.$div=e('<div style="'+(this.o.inline?"display:inline;":"")+"width:"+this.o.width+"px;height:"+this.o.height+"px;"+'"></div>');this.$.wrap(this.$div).before(this.$c);this.$div=this.$.parent();if(typeof G_vmlCanvasManager!=="undefined"){G_vmlCanvasManager.initElement(this.$c[0])}this.c=this.$c[0].getContext?this.$c[0].getContext("2d"):null;if(!this.c){throw{name:"CanvasNotSupportedException",message:"Canvas not supported. Please use excanvas on IE8.0.",toString:function(){return this.name+": "+this.message}}}this.scale=(window.devicePixelRatio||1)/(this.c.webkitBackingStorePixelRatio||this.c.mozBackingStorePixelRatio||this.c.msBackingStorePixelRatio||this.c.oBackingStorePixelRatio||this.c.backingStorePixelRatio||1);this.relativeWidth=this.o.width%1!==0&&this.o.width.indexOf("%");this.relativeHeight=this.o.height%1!==0&&this.o.height.indexOf("%");this.relative=this.relativeWidth||this.relativeHeight;this._carve();if(this.v instanceof Object){this.cv={};this.copy(this.v,this.cv)}else{this.cv=this.v}this.$.bind("configure",t).parent().bind("configure",t);this._listen()._configure()._xy().init();this.isInit=true;this.$.val(this.o.format(this.v));this._draw();return this};this._carve=function(){if(this.relative){var e=this.relativeWidth?this.$div.parent().width()*parseInt(this.o.width)/100:this.$div.parent().width(),t=this.relativeHeight?this.$div.parent().height()*parseInt(this.o.height)/100:this.$div.parent().height();this.w=this.h=Math.min(e,t)}else{this.w=this.o.width;this.h=this.o.height}this.$div.css({width:this.w+"px",height:this.h+"px"});this.$c.attr({width:this.w,height:this.h});if(this.scale!==1){this.$c[0].width=this.$c[0].width*this.scale;this.$c[0].height=this.$c[0].height*this.scale;this.$c.width(this.w);this.$c.height(this.h)}return this};this._draw=function(){var e=true;n.g=n.c;n.clear();n.dH&&(e=n.dH());e!==false&&n.draw()};this._touch=function(e){var r=function(e){var t=n.xy2val(e.originalEvent.touches[n.t].pageX,e.originalEvent.touches[n.t].pageY);if(t==n.cv)return;if(n.cH&&n.cH(t)===false)return;n.change(n._validate(t));n._draw()};this.t=t.c.t(e);r(e);t.c.d.bind("touchmove.k",r).bind("touchend.k",function(){t.c.d.unbind("touchmove.k touchend.k");n.val(n.cv)});return this};this._mouse=function(e){var r=function(e){var t=n.xy2val(e.pageX,e.pageY);if(t==n.cv)return;if(n.cH&&n.cH(t)===false)return;n.change(n._validate(t));n._draw()};r(e);t.c.d.bind("mousemove.k",r).bind("keyup.k",function(e){if(e.keyCode===27){t.c.d.unbind("mouseup.k mousemove.k keyup.k");if(n.eH&&n.eH()===false)return;n.cancel()}}).bind("mouseup.k",function(e){t.c.d.unbind("mousemove.k mouseup.k keyup.k");n.val(n.cv)});return this};this._xy=function(){var e=this.$c.offset();this.x=e.left;this.y=e.top;return this};this._listen=function(){if(!this.o.readOnly){this.$c.bind("mousedown",function(e){e.preventDefault();n._xy()._mouse(e)}).bind("touchstart",function(e){e.preventDefault();n._xy()._touch(e)});this.listen()}else{this.$.attr("readonly","readonly")}if(this.relative){e(window).resize(function(){n._carve().init();n._draw()})}return this};this._configure=function(){if(this.o.draw)this.dH=this.o.draw;if(this.o.change)this.cH=this.o.change;if(this.o.cancel)this.eH=this.o.cancel;if(this.o.release)this.rH=this.o.release;if(this.o.displayPrevious){this.pColor=this.h2rgba(this.o.fgColor,"0.4");this.fgColor=this.h2rgba(this.o.fgColor,"0.6")}else{this.fgColor=this.o.fgColor}return this};this._clear=function(){this.$c[0].width=this.$c[0].width};this._validate=function(e){var t=~~((e<0?-.5:.5)+e/this.o.step)*this.o.step;return Math.round(t*100)/100};this.listen=function(){};this.extend=function(){};this.init=function(){};this.change=function(e){};this.val=function(e){};this.xy2val=function(e,t){};this.draw=function(){};this.clear=function(){this._clear()};this.h2rgba=function(e,t){var n;e=e.substring(1,7);n=[parseInt(e.substring(0,2),16),parseInt(e.substring(2,4),16),parseInt(e.substring(4,6),16)];return"rgba("+n[0]+","+n[1]+","+n[2]+","+t+")"};this.copy=function(e,t){for(var n in e){t[n]=e[n]}}};t.Dial=function(){t.o.call(this);this.startAngle=null;this.xy=null;this.radius=null;this.lineWidth=null;this.cursorExt=null;this.w2=null;this.PI2=2*Math.PI;this.extend=function(){this.o=e.extend({bgColor:this.$.data("bgcolor")||"#EEEEEE",angleOffset:this.$.data("angleoffset")||0,angleArc:this.$.data("anglearc")||360,inline:true},this.o)};this.val=function(e,t){if(null!=e){e=this.o.parse(e);if(t!==false&&e!=this.v&&this.rH&&this.rH(e)===false){return}this.cv=this.o.stopper?n(r(e,this.o.max),this.o.min):e;this.v=this.cv;this.$.val(this.o.format(this.v));this._draw()}else{return this.v}};this.xy2val=function(e,t){var i,s;i=Math.atan2(e-(this.x+this.w2),-(t-this.y-this.w2))-this.angleOffset;if(this.o.flip){i=this.angleArc-i-this.PI2}if(this.angleArc!=this.PI2&&i<0&&i>-.5){i=0}else if(i<0){i+=this.PI2}s=i*(this.o.max-this.o.min)/this.angleArc+this.o.min;this.o.stopper&&(s=n(r(s,this.o.max),this.o.min));return s};this.listen=function(){var t=this,i,s,o=function(e){e.preventDefault();var o=e.originalEvent,u=o.detail||o.wheelDeltaX,a=o.detail||o.wheelDeltaY,f=t._validate(t.o.parse(t.$.val()))+(u>0||a>0?t.o.step:u<0||a<0?-t.o.step:0);f=n(r(f,t.o.max),t.o.min);t.val(f,false);if(t.rH){clearTimeout(i);i=setTimeout(function(){t.rH(f);i=null},100);if(!s){s=setTimeout(function(){if(i)t.rH(f);s=null},200)}}},u,a,f=1,l={37:-t.o.step,38:t.o.step,39:t.o.step,40:-t.o.step};this.$.bind("keydown",function(i){var s=i.keyCode;if(s>=96&&s<=105){s=i.keyCode=s-48}u=parseInt(String.fromCharCode(s));if(isNaN(u)){s!==13&&s!==8&&s!==9&&s!==189&&(s!==190||t.$.val().match(/\./))&&i.preventDefault();if(e.inArray(s,[37,38,39,40])>-1){i.preventDefault();var o=t.o.parse(t.$.val())+l[s]*f;t.o.stopper&&(o=n(r(o,t.o.max),t.o.min));t.change(t._validate(o));t._draw();a=window.setTimeout(function(){f*=2},30)}}}).bind("keyup",function(e){if(isNaN(u)){if(a){window.clearTimeout(a);a=null;f=1;t.val(t.$.val())}}else{t.$.val()>t.o.max&&t.$.val(t.o.max)||t.$.val()<t.o.min&&t.$.val(t.o.min)}});this.$c.bind("mousewheel DOMMouseScroll",o);this.$.bind("mousewheel DOMMouseScroll",o)};this.init=function(){if(this.v<this.o.min||this.v>this.o.max){this.v=this.o.min}this.$.val(this.v);this.w2=this.w/2;this.cursorExt=this.o.cursor/100;this.xy=this.w2*this.scale;this.lineWidth=this.xy*this.o.thickness;this.lineCap=this.o.lineCap;this.radius=this.xy-this.lineWidth/2;this.o.angleOffset&&(this.o.angleOffset=isNaN(this.o.angleOffset)?0:this.o.angleOffset);this.o.angleArc&&(this.o.angleArc=isNaN(this.o.angleArc)?this.PI2:this.o.angleArc);this.angleOffset=this.o.angleOffset*Math.PI/180;this.angleArc=this.o.angleArc*Math.PI/180;this.startAngle=1.5*Math.PI+this.angleOffset;this.endAngle=1.5*Math.PI+this.angleOffset+this.angleArc;var e=n(String(Math.abs(this.o.max)).length,String(Math.abs(this.o.min)).length,2)+2;this.o.displayInput&&this.i.css({width:(this.w/2+4>>0)+"px",height:(this.w/3>>0)+"px",position:"absolute","vertical-align":"middle","margin-top":(this.w/3>>0)+"px","margin-left":"-"+(this.w*3/4+2>>0)+"px",border:0,background:"none",font:this.o.fontWeight+" "+(this.w/e>>0)+"px "+this.o.font,"text-align":"center",color:this.o.inputColor||this.o.fgColor,padding:"0px","-webkit-appearance":"none"})||this.i.css({width:"0px",visibility:"hidden"})};this.change=function(e){this.cv=e;this.$.val(this.o.format(e))};this.angle=function(e){return(e-this.o.min)*this.angleArc/(this.o.max-this.o.min)};this.arc=function(e){var t,n;e=this.angle(e);if(this.o.flip){t=this.endAngle+1e-5;n=t-e-1e-5}else{t=this.startAngle-1e-5;n=t+e+1e-5}this.o.cursor&&(t=n-this.cursorExt)&&(n=n+this.cursorExt);return{s:t,e:n,d:this.o.flip&&!this.o.cursor}};this.draw=function(){var e=this.g,t=this.arc(this.cv),n,r=1;e.lineWidth=this.lineWidth;e.lineCap=this.lineCap;if(this.o.bgColor!=="none"){e.beginPath();e.strokeStyle=this.o.bgColor;e.arc(this.xy,this.xy,this.radius,this.endAngle-1e-5,this.startAngle+1e-5,true);e.stroke()}if(this.o.displayPrevious){n=this.arc(this.v);e.beginPath();e.strokeStyle=this.pColor;e.arc(this.xy,this.xy,this.radius,n.s,n.e,n.d);e.stroke();r=this.cv==this.v}e.beginPath();e.strokeStyle=r?this.o.fgColor:this.fgColor;e.arc(this.xy,this.xy,this.radius,t.s,t.e,t.d);e.stroke()};this.cancel=function(){this.val(this.v)}};e.fn.dial=e.fn.knob=function(n){return this.each(function(){var r=new t.Dial;r.o=n;r.$=e(this);r.run()}).parent()}})