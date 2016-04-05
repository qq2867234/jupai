$(function() {
	HouseSearch.PC_OR_MOBILE = 2;
	
	// 来自首页，直接显示搜索弹出层
	if($("#fromHome").val() == 1) {
		$('.searchForm').show();
	}
	
	// 事件绑定
	eventBind();
	
	// 显示统计信息
    if($("#searchType").val() == ""){
    	MobileSearch.showStatisticInfo();
    }
    // 带条件进入页面，触发搜索
    else{
    	if($("#bedsInput").val() != "") {
    		// 回显select
    		$("#beds").empty();
    		$("#beds").append('<option>不限居室</option>');
			$("#beds").append('<option value="0" '+($("#bedsInput").val()=="0"?"selected":"")+'>合租</option>');
			$("#beds").append('<option value="1" '+($("#bedsInput").val()=="1"?"selected":"")+'>1居</option>');
			$("#beds").append('<option value="2" '+($("#bedsInput").val()=="2"?"selected":"")+'>2居</option>');
			$("#beds").append('<option value="3" '+($("#bedsInput").val()=="3"?"selected":"")+'>3居</option>');
			$("#beds").append('<option value="4" '+($("#bedsInput").val()=="4"?"selected":"")+'>4居及以上</option>');
    	}
    	HouseSearch.autoSearch();
    	return ;
    }
    
});

// 事件绑定
function eventBind() {
	
	$("#myFavList").click(function(){
		if(checkLoginStatus()){
			window.location.href=$(this).attr("url");
		}
	});
	
}

// 从数据库中取出数据
function loadHouseData() {
	HouseSearch.atSearchStatus = true;
	
	$(".msg").remove();
	$("#nextPage").hide();
	$(".houseList").children(".rental").remove();
	// 分页初始化
	Pager.init({
		url: "/HouseSearch.action?searchRentList",
		data: HouseSearch.queryObj,
		fillData: fillData
	});
}

// 填充租单信息
function fillData(data) {
	$('.searchForm').hide();
	MobileSearch.clearWarnInfo();
	switch (data.status) {
	  	case "0":
	  		MobileSearch.showWarnInfo("暂无符合条件的房屋");
	  		break;
		case "1": // 成功
			HouseSearch.showHouseList(data.pageModel);
			break;
		case "2": // 模糊结果
			HouseSearch.InputField.keyword.autocomplete("search");
    		alert("无法成功定位到工作地点，请换一个关键词。");
			break;
		case "-1": // 异常
			MobileSearch.showWarnInfo(data.info);
			break;
		default:
			MobileSearch.showWarnInfo("暂无符合条件的房屋");
			break;
	}
};
	
var MobileSearch = {
	listDist : null,
	// 显示统计信息
	showStatisticInfo : function (json) {
		var content = "";
//		json = MobileSearch.listDist || json || ajaxPost("/HouseSearch.action?getStatisticInfo", {});
//		if(!MobileSearch.listDist) MobileSearch.listDist = json;
//        content = "<b>目前有<i>"+json.rentCnt+"</i>小区的<i>"+json.residenceCnt+"</i>套房源待租</b>";
        content += "<strong>在你不知道的地方</strong>";
        content += "<strong>可能有更好的选择</strong>";
        content += "<b>根据工作、学习地点，找出合适房源</b>";
		MobileSearch.showWarnInfo(content);
	},
	// 显示提示信息
	showWarnInfo : function (info) {
    	if($(".houseList .msg").length > 0) $(".houseList .msg").remove();
        $(".houseList").append("<div class='msg'>" + info + "</div>");
        MobileSearch.adjustFooter();
    },
    // 清除提示信息
    clearWarnInfo : function () {
    	$(".houseList .msg").remove();
    },
    adjustFooter : function() {
    	$(".footer").show();
    	$(".msg").css({'height':document.documentElement.clientHeight-264+'px'});
	}
};

/**
 * 城市类
 */ 
var CityClass = {
	// 城市代码表
	cityCodeTable : {
		'北京': 110000
	},
	// 城市中心坐标
	cityCenter : {
		'110000': {
			lng : 116.404, lat : 39.915
		}
	},
	// 获取用户当前所在城市的代码
	getCurrentCityCode : function() {
		if($("#cityCode").val()) return $("#cityCode").val();
		return '110000';
	}
};