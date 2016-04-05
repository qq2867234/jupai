// 搜索类
var HouseSearch = {
	// 电脑还是手机 1-电脑 2-手机
	PC_OR_MOBILE : 1,
	// 支持的搜索类型
	TYPE : {
		// 通勤
		TIME_SEARCH : 2,
		// 双地点
		DOUBLE_LOCATION_SEARCH : 3,
	},
	// 当前选择的搜索类型
	searchType : 2,
	// 输入域
	InputField : {
		price : $("#price"),
		beds : $("#beds"),
		keyword : $("#keyword"),
		keyword2 : $("#keyword2"),
		lngLat : $("#lngLat"),
		lngLat2 : $("#lngLat2")
	},
	// 是否点击按钮搜索  1是 0不是
	isClickSearch : 1,
	// 是否处于搜索状态
	atSearchStatus : false,
	
	// 保存搜索条件的对象
	queryObj : {},
	
	// 放置房源的容器
	houseContainer : $(".houseList"),
	
	// 整租还是合租
	useTypeMap : {1:"整租", 2:"合租"},
	
	// 搜索相关的事件绑定
	eventBind : function() {
		// 点击搜索按钮触发   
	    $(".searchBtn").bind("click", HouseSearch.clickSearch);
	    
	    HouseSearch.keywordSuggestion($("#keyword"), $("#lngLat"));
	    HouseSearch.keywordSuggestion($("#keyword2"), $("#lngLat2"));
	    HouseSearch.addEnterKeyClick();
	    
	    // 只显示未出租
	    $("#showNoRentOnly").bind("change", function() {
	    	if(HouseSearch.PC_OR_MOBILE == 1 && HouseSearch.atSearchStatus)
	    		HouseSearch.clickSearch();
	    });
	    
	    // 关键词输入监听
	    $('#keyword').bind('input propertychange', function() {
	    	$("#lngLat").val("");
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
	    $('#keyword2').bind('input propertychange', function() {
	    	$("#lngLat2").val("");
	    	if($("#keyword2").val() != ""){
	    		$("#clearBtn2").show();
	    		$(this).parent().removeClass("danger");
	    	}else{
	    		$("#clearBtn2").hide();
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
	    		$("#lngLat").val("");
	    	}
	    	$("#clearBtn").hide();
			$("#keyword").focus();
		});
	    $("#clearBtn2").click(function() {
	    	if($("#keyword2").val() != "") {
	    		// 清空关键词
	    		$("#keyword2").val("");
	    		$("#lngLat2").val("");
	    	}
	    	$("#clearBtn2").hide();
			$("#keyword2").focus();
		});
	},
	// 获取工作地点
	getKeyword : function () {
		return HouseSearch.InputField.keyword.val() == HouseSearch.InputField.keyword.attr('placeholder') ? "" : $.trim(HouseSearch.InputField.keyword.val());
	},
	// 获取工作地点经纬度
	getLngLat : function() {
		return HouseSearch.InputField.lngLat.val();
	},
	// 获取TA的工作地点
	getKeyword2 : function () {
		return HouseSearch.InputField.keyword2.val() == HouseSearch.InputField.keyword2.attr('placeholder') ? "" : $.trim(HouseSearch.InputField.keyword2.val());
	},
	// 获取TA的工作地点经纬度
	getLngLat2 : function() {
		return HouseSearch.InputField.lngLat2.val();
	},
	// 获取租金
	getPrice : function () {
		return HouseSearch.InputField.price.val().replace(/\D/g, "");
	},
	// 获取居室
	getBeds : function () {
		if(HouseSearch.InputField.beds.val() == "合租") {
			return "0";
		} else {
			return HouseSearch.InputField.beds.val().replace(/\D/g, "");
		}
	},
	// 获取显示未出租房源的选项(1-只显示 0-都显示)
	getShowNoRentOnlyCheck : function() {
		if($("#showNoRentOnly").is(":checked")) {
    		return 1;
    	} else {
    		return 0;
    	}
	},
	// 是否是通勤找房
	isTimesearch : function (){
		if(HouseSearch.queryObj.searchType == HouseSearch.TYPE.TIME_SEARCH && HouseSearch.queryObj.keyword != undefined && HouseSearch.queryObj.keyword != "" 
				&& HouseSearch.queryObj.lngLat != undefined && HouseSearch.queryObj.lngLat != "") 
			return true;
		return false;
	},
	// 是否是智能规划
	isDoubleLocationSearch : function () {
		if(HouseSearch.queryObj.searchType == HouseSearch.TYPE.DOUBLE_LOCATION_SEARCH && HouseSearch.queryObj.keyword2 != undefined && HouseSearch.queryObj.lngLat2 != undefined 
				&& HouseSearch.queryObj.keyword2 != "" && HouseSearch.queryObj.lngLat2 != "") return true;
		return false;
	},
	// 空搜索
	isEmptySearch : function() {
		if(HouseSearch.getKeyword() == "" && HouseSearch.getKeyword2() == "" && HouseSearch.getBeds() == "" && HouseSearch.getPrice() == ""){
			showStatisticInfo();
			HouseSearch.InputField.keyword.focus().parent().addClass("danger");
			HouseSearch.queryObj = {};
			HouseSearch.atSearchStatus = false;
			return true;
		}
		return false;
	},
	// 重复搜索
	isDupSearch : function() {
		if(HouseSearch.queryObj && HouseSearch.queryObj.price == HouseSearch.getPrice() && HouseSearch.queryObj.beds == HouseSearch.getBeds()
			&& HouseSearch.queryObj.keyword == encodeURIComponent(HouseSearch.getKeyword()) && HouseSearch.queryObj.keyword2 == encodeURIComponent(HouseSearch.getKeyword2())
			&& HouseSearch.queryObj.lngLat == HouseSearch.getLngLat() && HouseSearch.queryObj == HouseSearch.getLngLat2() && HouseSearch.queryObj.lowLat == (Map.map.getBounds() == undefined ? 0 : Map.map.getBounds().getSouthWest().lat)
			&& HouseSearch.queryObj.showNoRentOnly == HouseSearch.getShowNoRentOnlyCheck() ){
			return true;
		}
		return false;
	},
	// 初始化搜索选项
	initSearchOption : function() {
		currPage = 1;
		loadedPage = 0;
		if(HouseSearch.searchType == HouseSearch.TYPE.TIME_SEARCH) $(".filterResult .hollowTag").removeClass("on");
		HouseSearch.atSearchStatus = false;
	},
	// 设置搜索条件
	setQuery : function () {
		// 初始化搜索选项
		HouseSearch.initSearchOption();
		
		// 构造搜索条件
		HouseSearch.queryObj = {};
		HouseSearch.queryObj.searchType = HouseSearch.searchType;
		HouseSearch.queryObj.isClickSearch = HouseSearch.isClickSearch;
		// 只要一个输入框有输入地点，就进行通勤搜索
		if(HouseSearch.searchType == HouseSearch.TYPE.TIME_SEARCH) {
			if(HouseSearch.getKeyword() != "") {
				HouseSearch.queryObj.keyword = encodeURIComponent(HouseSearch.getKeyword());
				HouseSearch.queryObj.lngLat = HouseSearch.getLngLat();
			} 
			if(HouseSearch.getKeyword2() != "") {
				HouseSearch.queryObj.keyword = encodeURIComponent(HouseSearch.getKeyword2());
				HouseSearch.queryObj.lngLat = HouseSearch.getLngLat2();
			}
			if(HouseSearch.queryObj.keyword == undefined) {
				HouseSearch.queryObj.keyword = "";
				HouseSearch.queryObj.lngLat = "";
			}
		} else {
			HouseSearch.queryObj.keyword = encodeURIComponent(HouseSearch.getKeyword());
			HouseSearch.queryObj.lngLat = HouseSearch.getLngLat();
			HouseSearch.queryObj.keyword2 = encodeURIComponent(HouseSearch.getKeyword2());
			HouseSearch.queryObj.lngLat2 = HouseSearch.getLngLat2();
		}
		HouseSearch.queryObj.beds = HouseSearch.getBeds();
		HouseSearch.queryObj.price = HouseSearch.getPrice();
		
		if(HouseSearch.PC_OR_MOBILE == 1 && Map.status == 1) {
			bounds = Map.map.getBounds();
			HouseSearch.queryObj.lowLat = bounds == undefined ? 0 : bounds.getSouthWest().lat;
			HouseSearch.queryObj.lowLng = bounds == undefined ? 0 : bounds.getSouthWest().lng;
			HouseSearch.queryObj.highLng = bounds == undefined ? 0 : bounds.getNorthEast().lng;
			HouseSearch.queryObj.highLat = bounds == undefined ? 0 : bounds.getNorthEast().lat;	
			HouseSearch.queryObj.mapStatus = Map.status;
		}
		
		HouseSearch.queryObj.cityCode = CityClass.getCurrentCityCode();
		HouseSearch.queryObj.showNoRentOnly = HouseSearch.getShowNoRentOnlyCheck();
		HouseSearch.queryObj.currPage = 1;
		
		if (HouseSearch.getKeyword().length > 0) 
			$("#clearBtn").show();
		else 
			$("#clearBtn").hide();
	},
	// 搜索
	search : function() {
		// 空搜索
		if(HouseSearch.isEmptySearch()){
			return false;
		}
		// 重复搜索
		if(HouseSearch.isDupSearch()){
			return false;
		}
		// 设置搜索条件
		HouseSearch.setQuery();
		// 获取房源数据
		loadHouseData();
		return true;
	}, 
	loadHouseData : function() {
		
	},
	
	// 显示房源列表
	showHouseList : function (pageModel) {
		if(!pageModel || pageModel.result.length == 0) return;
		var data = pageModel.result;
		var sidList = [];
		$.each(data, function(i, house) {
			// 拼接小区内的房源
			var content = HouseSearch.getHouseHtml(house);
			// 电脑端 并且 地图加载成功
			if(HouseSearch.PC_OR_MOBILE == 1 && Map.status == 1){
				// 显示并绑定鼠标进入/离开事件
				$(content).appendTo(HouseSearch.houseContainer).bind("mouseenter", function() {
					$(this).addClass("on").siblings("div").removeClass("on");
					Map.highlightMarkerAndShowInfoBox(house, Map.searchMarker($(this).attr("lng"), $(this).attr("lat")));
				}).bind("mouseleave", function() {
					$(this).removeClass("on");
					Map.closeInfoBox();
				});
			} 
			// 手机端
			else {
				$(content).appendTo(HouseSearch.houseContainer);
			}
			sidList.push(house.id);
		});
		if(HouseSearch.PC_OR_MOBILE == 1 && Map.status == 1){
			$(".rental:nth-child(2n)").css('margin-left','3%');
			// 显示地图标注
			showMapMarker(pageModel.result);
			// 如果是点击搜索 或者是 翻页搜索 需要调整视角
			if (HouseSearch.queryObj.isClickSearch == 1 || currPage > 1 || (currPage == 1 && loadedPage > 1)) {
				adjustMapView();
			}
			
//			bounds = Map.map.getBounds();
//			HouseSearch.queryObj.lowLat = bounds == undefined ? 0 : bounds.getSouthWest().lat;
//			HouseSearch.queryObj.lowLng = bounds == undefined ? 0 : bounds.getSouthWest().lng;
//			HouseSearch.queryObj.highLng = bounds == undefined ? 0 : bounds.getNorthEast().lng;
//			HouseSearch.queryObj.highLat = bounds == undefined ? 0 : bounds.getNorthEast().lat;	
//			HouseSearch.queryObj.showNoRentOnly = showNoRentOnly;
//			if(HouseSearch.queryObj.searchType != 3){
//				// 异步显示地图范围内更多小区
//				ajaxAsyncPost("/HouseSearch.action?getMoreResidence", HouseSearch.queryObj, function(json) {
//					$.each(json, function(i, item) {
//						Map.addMarker(item, Map.iconDefault);
//					});
//				});
//			}
		}
		// 是否收藏过小区
		Favorite.hasFavForList(sidList, Favorite.TYPE.RENT);
		// 绑定收藏事件
		Favorite.bindFavEvent(Favorite.PC);
	},
	// 获取房源html代码
	getHouseHtml : function (house){
		// 手机端房源路径特殊处理
		var url = house.url;
		if(HouseSearch.PC_OR_MOBILE == 2 && house.url) {
			var arr = house.url.split("/");
			url = "/"+arr[1]+"/m/"+arr[2]+"/"+arr[3]+"/"+arr[4]+"/M"+arr[5];
		}
		var content = '<div class="rental" rid="'+house.rid+'" lng="'+house.lng+'" lat="'+house.lat+'"><a class="item" href="'+url+'" target="_blank">';
		// 房源图片
		var defaultPic;
		// 房源默认图片
		if(house.default_pic !== undefined && house.default_pic != ""){
			// 末尾加下划线(压缩过的，宽度450)
			defaultPic = house.default_pic.replace(house.default_pic.substring(house.default_pic.indexOf('.')), '_'+house.default_pic.substring(house.default_pic.indexOf('.')));
		}else{
			defaultPic = "/images/public/defaultHome.jpg";
		}
		 content += '<span class="picContainer"><img src="'+defaultPic+'" alt="房源图片" onerror=\"imageOnError(this, \''+house.default_pic+'\', \'/images/public/defaultHome.jpg\',2)\" /></span>';
		 // 价格
		 content += '<span class="price">'+house.price+' <q>元/月</q></span>';	
		 // 室厅、面积、整租/合租
		 content += '<span class="info"><strong class="title">'+house.residence_name+"，"+house.beds+'室'+house.baths+'卫，'+house.area+'平米，' + HouseSearch.useTypeMap[house.use_type] + '</strong><q>';
		 // 标签
		 var t = house.tag != "" ? house.tag.split(/;|；|,|，/) : "";
		 var metro = "";
		 for (var i = 0, len = t.length; i < len; i++) {
			 if(t[i].indexOf("号线") != -1) {
				 metro += parseInt(t[i]) + ",";
			 }else if(t[i].charAt(t[i].length-1) == "线"){
				 if(metro != ""){
					 metro = metro.substring(0, metro.length-1);
					 content += '<i>'+metro+'号线,'+t[i]+'</i>';
					 metro = "";
				 }else{
					 content += '<i>'+t[i]+'</i>';
				 }
			 }else if(t[i].indexOf("公交") != -1){
				 if(metro != ""){
					 metro = metro.substring(0, metro.length-1);
					 content += '<i>'+metro+'号线</i>';
					 metro = "";
				 }
				 content += '<i>'+t[i]+'</i>';
			 }
		 }
		 if(metro!="") {
			 metro = metro.substring(0, metro.length-1);
			 content += '<i>'+metro+'号线</i>';
		 }
		 // 时间 
		 if(house.duration != undefined){
				content += '上班约</b>'+(house.duration>0 ? house.duration : 5)+'分钟</b>';
			}
		 if(house.duration_A != undefined){
		 	content += '你上班约</b>'+(house.duration_A>0 ? house.duration_A : 5)+'分钟</b>，TA上班约</b>'+(house.duration_B>0 ? house.duration_B : 5)+'分钟</b>';
		 }
		 content += '</q></span></a>';
		 // 发房人头像
		 var headPic;
		 if(house.head_pic != undefined)
			headPic = '/account/photo/' + Math.floor(house.zid / 10000) + '/'+ house.head_pic;
		 else
			headPic = "/images/defaultPic/head.png";
		 content += '<a class="agent" href="'+url+'" target="_blank"><img src="'+headPic+'" alt="头像" onerror=\"showImgDelay(this,\'/images/defaultPic/head.png\',2)\" /><b></b></a>';
		 // 收藏
//		 content += '<i class="fav fav_'+house.id+' zgIcon zgIcon-heart zgIcon-heart-o" stype="3" sid="'+house.id+'" sname="" title="收藏"></i>';
		 content += '</div>';
		 return content;
	},
	// 显示工作地点
	showWorkLocation : function () {
		if(HouseSearch.isTimesearch()){
			var item = {};
			item.lng = HouseSearch.queryObj.lngLat.split(",")[0];
			item.lat = HouseSearch.queryObj.lngLat.split(",")[1];
			item.residence_name = "目标地点："+HouseSearch.getKeyword();
			// 只有点击搜索的时候，才自动显示目标地点的信息窗口
			Map.addMarker(item, Map.iconBeat, HouseSearch.queryObj.isClickSearch == 1 ? true : false);
		}else if(HouseSearch.isDoubleLocationSearch()){
			var item = {};
			item.lng = HouseSearch.queryObj.lngLat.split(",")[0];
			item.lat = HouseSearch.queryObj.lngLat.split(",")[1];
			item.residence_name = HouseSearch.getKeyword();
			Map.addMarker(item, Map.iconBeat);
			item = {};
			item.lng = HouseSearch.queryObj.lngLat2.split(",")[0];
			item.lat = HouseSearch.queryObj.lngLat2.split(",")[1];
			item.residence_name = HouseSearch.getKeyword2();
			Map.addMarker(item, Map.iconBeat);
		}
	},
	// 带条件的自动搜索
	autoSearch : function() {
		HouseSearch.searchType = parseInt($("#searchType").val());
		if(HouseSearch.PC_OR_MOBILE == 1) {
			if($("#bedsInput").val() == "0") {
				$("#beds").val("合租");
			} else if($("#bedsInput").val() != "") {
				$("#beds").val($("#bedsInput").val() + "居");
			}
		}
    	$("#price").val($("#priceInput").val());
    	$("#keyword").val(decodeURIComponent($("#keywordInput").val()));
    	$("#lngLat").val($("#lngLatInput").val());
    	if(HouseSearch.searchType == 3){
    		$("#keyword2").val(decodeURIComponent($("#keywordInput2").val()));
    		$("#lngLat2").val($("#lngLat2Input").val());
    	}
    	if($("#showNoRentOnlyInput").val() == "1") {
    		$("#showNoRentOnly").attr("checked", "checked");
    	}
    	// 搜索
    	HouseSearch.search();
    	// 搜索完后清空条件
    	$("#searchType").val("");
    	$("#keywordInput").val("");
    	$("#bedsInput").val("");
    	$("#priceInput").val("");
    	$("#filterInput").val("");
    	$("#showNoRentOnlyInput").val("");
    	$("#lngLatInput").val("");
    	$("#lngLat2Input").val("");
	},
	// 点击搜索
	clickSearch : function () {
		HouseSearch.isClickSearch = 1;
		
		// 判断搜索类型
		HouseSearch.searchType = HouseSearch.TYPE.TIME_SEARCH;
		// 只有当输入两个地点的时候，才触发双地点搜索
		if(HouseSearch.getKeyword() != "" && HouseSearch.getKeyword2() != "") {
			HouseSearch.searchType = HouseSearch.TYPE.DOUBLE_LOCATION_SEARCH;
		}
		
		// 搜索
		if(HouseSearch.search()){
			var data = "";
	    	// 数据
			if(HouseSearch.searchType != HouseSearch.TYPE.DOUBLE_LOCATION_SEARCH) {
				data = HouseSearch.searchType+"#"+HouseSearch.queryObj.beds+"_"+HouseSearch.queryObj.price+"_"+decodeURIComponent(HouseSearch.queryObj.keyword);
				if(HouseSearch.queryObj.lowLng!=undefined){
					data+="_"+HouseSearch.queryObj.lowLng+"_"+HouseSearch.queryObj.lowLat+"_"+HouseSearch.queryObj.highLng+"_"+HouseSearch.queryObj.highLat;
				}
				if(HouseSearch.queryObj.lngLat != undefined){
					data+="_"+HouseSearch.queryObj.lngLat;
				}
			}else{
				data = HouseSearch.searchType+"#"+HouseSearch.queryObj.beds+"_"+HouseSearch.queryObj.price+"_"+decodeURIComponent(HouseSearch.queryObj.keyword)+"_"+decodeURIComponent(HouseSearch.queryObj.keyword2);
				if(HouseSearch.queryObj.lngLat != undefined && HouseSearch.queryObj.lngLat2 != undefined){
					data+="_"+HouseSearch.queryObj.lngLat+"_"+HouseSearch.queryObj.lngLat2;
				}
			}
			// 记录搜索行为
			if(typeof UserAnalysis != 'undefined') {
				UserAnalysis.eventAnalysis("用户操作", "进行找房", data);
			}
			if(typeof UserTrack != 'undefined') {
				// 记录用户行为
				UserTrack.log(UserTrack.TRACK_TYPE_SEARCH, data);
			}
		}
	},
	// 拖动搜索   
	dragSearch : function () {
		HouseSearch.mapSearch(1);
	},
	// 缩放搜索
	zoomSearch : function () {
		HouseSearch.mapSearch(2);
	},
	// 地图范围内搜索
	// flag: 1-拖动 2-缩放
	mapSearch : function (flag) {
		if(Map.status != 1) return;
		
		// 处于搜索状态时，进行地图搜索
		if (HouseSearch.atSearchStatus) {
			HouseSearch.initSearchOption();
			bounds = Map.map.getBounds();
			HouseSearch.queryObj.mapStatus = 1;
			HouseSearch.queryObj.isClickSearch = 0;
			HouseSearch.queryObj.currPage = 1;
			HouseSearch.queryObj.lowLat = bounds == undefined ? 0 : bounds.getSouthWest().lat;
			HouseSearch.queryObj.lowLng = bounds == undefined ? 0 : bounds.getSouthWest().lng;
			HouseSearch.queryObj.highLng = bounds == undefined ? 0 : bounds.getNorthEast().lng;
			HouseSearch.queryObj.highLat = bounds == undefined ? 0 : bounds.getNorthEast().lat;	
			loadHouseData();
		}
		
		// 不处于搜索状态，并且是在缩放地图时，加载商圈
		if(!HouseSearch.atSearchStatus && flag == 2){
			// 加载全部商圈
			if(Map.map.getZoom() >= 14){
				var allBizcircle = $("body").data(String("allBizcircle"));
//				if(allBizcircle == undefined){
//					allBizcircle = ajaxPost("/HouseSearch.action?getBizcircleInfo", {});
//					$("body").data(String("allBizcircle"), allBizcircle);
//				}
				showBizcircleMarker(allBizcircle, false, false);
			}
			// 加载部分活跃商圈
			else{
				showBizcircleMarker($("body").data(String("activeBizcircle")), false, false);
			}
		}
	},
	// 添加回车事件
	addEnterKeyClick : function () {
		document.onkeydown = function(event) {
			var e = event || window.event || arguments.callee.caller.arguments[0];
			if (e && e.keyCode == 13) {
				HouseSearch.clickSearch();
			}
		};
	},
	// 搜索提示
	keywordSuggestion : function ($input, $output) {
		$input = $input || $("#keyword");
		$output = $output || $("#lngLat");
		var cacheResidence = {}; //小区缓存
		$input.autocomplete({
			minLength: 0,
			width: 318,
			autoFocus: true,
			source: function(request, response) {
				if (HouseSearch.searchType == 1) return;
				$output.val("");
				var term = request.term;
				if (term in cacheResidence) {
					response($.map(cacheResidence[term], function(item, index) {
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
					data: {
						destination: encodeURIComponent(request.term)
					},
					type: 'post',
					dataType: "json",
					success: function(data, status, xhr) {
						if (data.status == 1) {
							cacheResidence[term] = data.list;
							response($.map(data.list, function(item, index) {
								return {
									label: item.name,
									value: item.name,
									lngLat: item.lngLat
								};
							}));
						}
					},
					error: function(data) {}
				});
			},
			select: function(event, ui) {
				event.preventDefault();
				$output.val(ui.item.lngLat);
				this.value = ui.item.value;
				$input.blur();
			}
		});
	}
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

/**
 * ajax异步请求
 * @param url
 * @param requestParam
 * @param success
 */
function ajaxAsyncPost(url, requestParam, success) {
    $.ajax({
        type     : "POST",
        dataType : 'json',
        url      : url,
        data     : requestParam || {},
        async    : true,
        success  : success,
        error : function (XMLHttpRequest, textStatus, errorThrown){
            // alertDialog('网络错误,请刷新页面重试');
        }
    });
}
/**
 * ajax异步请求
 * @param url
 * @param requestParam
 * @param success
 */
function ajaxAsyncGet(url, requestParam, success) {
    $.ajax({
        type     : "GET",
        dataType : 'json',
        url      : url,
        data     : requestParam || {},
        async    : true,
        cache    : false,
        success  : success,
        error : function (XMLHttpRequest, textStatus, errorThrown){
            // alertDialog('网络错误,请刷新页面重试');
        }
    });
}

function imageOnError(imgObj, imgSrc, defaultPic, maxErrorNum) {
	if (maxErrorNum > 0) {
		imgObj.src = imgSrc;
		imgObj.onerror = function() {
			imageOnError(imgObj, imgSrc, defaultPic, maxErrorNum - 1);
		};
	} else {
		imgObj.onerror = null;
		imgObj.src = defaultPic;
	}
}

//当图片加载失败是指定默认图片
function showImgDelay(imgObj, imgSrc, maxErrorNum) {
	if (maxErrorNum > 0) {
		imgObj.onerror = function() {
			showImgDelay(imgObj, imgSrc, maxErrorNum - 1);
		};
		setTimeout(function() {
			imgObj.src = imgSrc;
		}, 500);
	} else {
		imgObj.onerror = null;
		imgObj.src = imgSrc;
	}
}