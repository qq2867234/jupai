$(function() {
	// 事件绑定
	eventBind();
	// 显示统计数据
	MobileSearch.showStatisticInfo();
});

// 搜索条件
var queryObj = {
	searchType : 2,
	pageSize : 10,
	mapTag : 0,
	mobileSearch : 1
};

// 输入域
var InputField = {
	price : $("#price"),
	beds : $("#beds"),
	keyword : $("#keyword"),
	lngLat : $("#lngLat")
};

// 事件绑定
function eventBind() {

	// 绑定搜索点击事件
	$("#search").click(function() {
		 $(".msg").remove();
		 $(".residence").remove();
		 MobileSearch.search();
	});
	
	// 点击居室
	$("#secBedBtn").click(function() {
		$("#secModal").modal();
		$("#secBed").click();
	});
	// 点击价格
	$("#secPriceBtn").click(function() {
		$("#secModal").modal();
		$("#secPrice").click();
	});
	// 点击时间
	$("#secFilterBtn").click(function() {
		$("#secModal").modal();
		$("#secFilter").click();
	});
	// 输入租金 focus事件
    $("#inputPrice").focus(function(){
		var box=document.getElementById('inputPrice'); 
		$(window).scrollTop(box.getBoundingClientRect().top);
    }).blur(function(){
       $(window).scrollTop(0);
    });
    
	// 选择租金事件
	$("#priceTab ul li:not('.inputPrice')").click(function(){
        $("#secModal").modal("hide");
        if($(this).text() == $(this).parent().attr("none")){
        	InputField.price.val("");
			$("#secPriceBtn b").text($(this).parent().attr("default"));
   		}else{
   			InputField.price.val($(this).text());
			$("#secPriceBtn b").text($(this).text());
   		}
      	MobileSearch.search();
	});
	
	// 选择居室事件
	$("#bedsTab ul li").click(function(){
        $("#secModal").modal("hide");
        if($(this).text() == $(this).parent().attr("none")){
        	InputField.beds.val("");
			$("#secBedBtn b").text($(this).parent().attr("default"));
   		}else{
   			InputField.beds.val($(this).text());
			$("#secBedBtn b").text($(this).text());
   		}
      	MobileSearch.search();
	});
	
	// 选择时间时间
	$("#filterTab ul li").click(function(){
        $("#secModal").modal("hide");
        if($(this).text() == $(this).parent().attr("none")){
        	queryObj.filter = null;
			$("#secFilterBtn b").text($(this).parent().attr("default"));
   		}else{
   			queryObj.filter = $(this).attr("filter");
   			// InputField.filter.val($(this).text());
			$("#secFilterBtn b").text($(this).text());
   		}
      	MobileSearch.search();
	});
	
	// 手动输入租金后，确定按钮点击事件
	$("#inputPrice").next().click(function(){
		$("#secModal").modal("hide");
		var price = $("#inputPrice").val().replace(/\D/g, "");
		if(price != "" && parseInt(price) > 0){
			InputField.price.val(price);
			$("#secPriceBtn").val(price+"元");
			MobileSearch.search();
		}
	});
	
	// 绑定回车事件
	addEnterKeyClick();
  
	$("#myFavList").click(function(){
		if(checkLoginStatus()){
			window.location.href=$(this).attr("url");
		}
	});
	
	// 智能提示
	keywordSuggestion();
}

var MobileSearch = {
	roleMap : {1:"租客", 2:"经纪人", 3:"房东"},
	trafficModeMap : {1:"步行", 2:"公交"},
	// 空搜索
	isEmptySearch : function() {
		if(InputField.price.val() == "" && InputField.beds.val() == "" && $.trim(InputField.keyword.val()) == ""){
			MobileSearch.showStatisticInfo();
			// 手机端自动focus后会弹出输入法
//			InputField.keyword.focus();
			return true;
		}
		return false;
	},
	// 设置搜索条件
	setQuery : function () {
		queryObj.keyword = InputField.keyword.val() == InputField.keyword.attr('placeholder') ? '' : encodeURIComponent(InputField.keyword.val());
   		queryObj.beds = InputField.beds.val().replace(/\D/g, "");
		queryObj.price = InputField.price.val().replace(/\D/g, "");
		queryObj.lngLat = InputField.lngLat.val();
	},
	// 搜索
	search : function() {
		$("#nextPage").hide();
		$(".moreRents").children(".rental").remove();
		// 是空搜索
		if(MobileSearch.isEmptySearch()) return false;
		// 设置搜索条件
		MobileSearch.setQuery();
		//分页初始化
   		Pager.init({
			url: "/HouseSearch.action?searchRentList",
			data: queryObj,
			fillData: MobileSearch.fillData
		});
	},
	// 填充租单信息
	fillData : function (data) {
		MobileSearch.clearWarnInfo();
    	switch (data.status) {
    	  	case "0":
    	  		MobileSearch.showWarnInfo("暂无符合条件的房屋");
    	  		break;
			case "1": // 成功
				MobileSearch.showHouseList(data.pageModel.result);
				break;
			case "2": // 模糊结果
				InputField.keyword.autocomplete("search");
	    		alert("无法成功定位到工作地点，请换一个关键词。");
				break;
			case "-1": // 异常
				MobileSearch.showWarnInfo(data.info);
				break;
			default:
				MobileSearch.showWarnInfo("暂无符合条件的房屋");
				break;
		}
    },
    // 显示房源列表
    showHouseList : function (data) {
		var sidList = [];
		var house;
		var content;
		for(var i = 0; i < data.length; i++) {
			house = data[i];
			if(house.url == undefined) continue;
			// 生成房源代码
			content = MobileSearch.getHouseHtml(house);
			$("#nextPage").before(content);
			$("span.picContainer,span.picContainer img").css('height',document.documentElement.clientWidth * 0.7 + 'px');
			sidList.push(house.id);
		}
		// 判断是否收藏房源
		Favorite.hasFavForList(sidList, Favorite.TYPE.RENT);
		// 绑定收藏事件
		Favorite.bindFavEvent(Favorite.MOBILE);
	},
	// 根据房源数据，生成房源html代码
	getHouseHtml : function (house){
		// 房源默认图片
		var defaultPic;
		if(house.default_pic !== undefined && house.default_pic != ""){
			// 末尾加下划线(压缩过的，宽度450)
			defaultPic = house.default_pic.replace(house.default_pic.substring(house.default_pic.indexOf('.')), '_'+house.default_pic.substring(house.default_pic.indexOf('.')));
		}else{
			defaultPic = "/images/public/defaultHome.jpg";
		}
		// 发房人头像
		var headPic;
		if(house.head_pic != undefined)
			headPic = '/account/photo/' + Math.floor(house.zid / 10000) + '/'+ house.head_pic;
		else
			headPic = "/images/defaultPic/head.png";
		// 手机端房源路径
		var arr = house.url.split("/");
		house.url = "/"+arr[1]+"/m/"+arr[2]+"/"+arr[3]+"/"+arr[4]+"/M"+arr[5];
		
		var content = '<div class="rental"><a class="item" href="'+house.url+'" target="_blank">';
	    // 房源图片
	    content += '<span class="picContainer"><img src="'+defaultPic+'" alt="房源图片" onerror=\"imageOnError(this, \''+house.default_pic+'\', \'/images/public/defaultHome.jpg\', 2)\" /></span>';
	    // 经纪人/房东头像
	    var role = "";
	    if(house.role == 3) role = "房东";
	    else role = house.brokerage || "经纪人";
	    
	    // 价格
	    content += '<span class="price">'+house.price+' <q>元/月</q></span>';	
	    // 小区名、室厅卫、面积
	    content += '<span class="info">';
	    content += '<strong class="title">'+house.residence_name+','+house.beds+'室'+house.baths+'卫,'+house.area+'平米</strong>';
	    content += '</span>';
	    // 标签
	   	content += "<span class='info'>";
		var t = house.tag != "" ? house.tag.split(/;|；|,|，/) : "";
		for (var i = 0, len = t.length; i < len; i++) 
			content += '<button class="hollowTag hollowTag-primary xs-tag">'+t[i]+'</button>';
		// 距离
		if(house.duration != undefined){
			if(house.distance>0 && house.duration>0){
				content += '<button class="hollowTag hollowTag-primary xs-tag">'+ MobileSearch.trafficModeMap[house.traffic_mode]+'约'+house.duration+'分钟</button>';
			}else{
				content += '<button class="hollowTag hollowTag-primary xs-tag">步行约5分钟</button>';
			}
		}
		content += "</span></a>";
		// 头像、角色或公司名
	    content += '<a class="agent" href="###"><img src="'+headPic+'" alt="头像" onerror=\"showImgDelay(this,\'/images/defaultPic/head.png\',2)\" /><b>'+role+'</b></a>';
	    // 收藏按钮
	    content += '<i class="fav fav_'+house.id+' zgIcon zgIcon-heart zgIcon-heart-o" stype="3" sid="'+house.id+'" sname="" title="收藏"></i></div>';
	    return content;
	},
	listDist : null,
	// 显示统计信息
	showStatisticInfo : function (json) {
		json = MobileSearch.listDist || json || ajaxPost("/HouseSearch.action?getStatisticInfo", {});
		if(!MobileSearch.listDist) MobileSearch.listDist = json;
        var content = "<b>目前有<i>"+json.rentCnt+"</i>小区的<i>"+json.residenceCnt+"</i>套房源待租</b>";
        content += "<strong>在你不知道的地方</strong>";
        content += "<strong>可能有更好的选择</strong>";
        content += "<b>根据工作/学习地点，找出合适房源</b>";
		MobileSearch.showWarnInfo(content);
	},
	// 显示提示信息
	showWarnInfo : function (info) {
    	if($(".moreRents .msg").length > 0) $(".moreRents .msg").remove();
        $(".moreRents").append("<div class='msg'>" + info + "</div>");
        MobileSearch.adjustFooter();
    },
    // 清除提示信息
    clearWarnInfo : function () {
    	$(".moreRents .msg").remove();
    },
    adjustFooter : function() {
    	$(".footer").show();
    	$(".msg").css({'height':document.documentElement.clientHeight-264+'px'});
	}
};


// 添加回车事件
function addEnterKeyClick() {
	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if (e && e.keyCode == 13) {
			MobileSearch.search();
		}
	};
}

// 搜索提示
function keywordSuggestion($input, $output) {
	$input = $input || $("#keyword");
	$output = $output || $("#lngLat");
	var cacheResidence = {}; //小区缓存
	$input.autocomplete({
		minLength: 0,
		width: 318,
		autoFocus: true,
		source: function(request, response) {
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
        error : function (XMLHttpRequest, textStatus, errorThrown){ }
    });
    return returnData;
}

// 当图片加载失败是指定默认图片
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