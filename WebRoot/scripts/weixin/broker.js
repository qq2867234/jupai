// 经历当前页
var currentPageFootprint = 1;
// 知道当前页
var currentPageKnowledge = 1;
// 评论当前页
var currentPageReview = 1;
// 当前页
var currentPageHome = 1;

// 时间线每次加载数
var pageSizeTimeLine = 2;
// 评论每次加载数
var pageSizeReview = 5;
// 房产每次加载数
var pageSizeHome = 3;


var zwx = {
	location: null,
		//获取js配置
	initConfig : function() {
		zwx.location = window.location.href;
		$.ajax({
			url:"/WeiXinComment.action?getJSConfig",
			dataType:"json",
			async: false,
			data:{location: zwx.location },
			success:function(data, status) {
				wx.config({
				    debug: false,
				    appId: data.sp.appId,
				    timestamp: data.sp.timestamp,
				    nonceStr: data.sp.nonceStr,
				    signature: data.sp.signature,
				    jsApiList: [
				        // 所有要调用的 API 都要加到这个列表中
				        'onMenuShareTimeline',
				        'onMenuShareAppMessage'
				      ]
				});
			}
		});
	},
	setShareView: function (zTitle, zPic, zDesc, zLink) {
		wx.onMenuShareAppMessage({
		      title: zTitle,
		      desc: zDesc,
		      link: zLink,
		      imgUrl: zPic,
		      trigger: function (res) {
		      },
		      success: function (res) {
		        
		      },
		      cancel: function (res) {
		      },
		      fail: function (res) {
		        // alert(JSON.stringify(res));
		      }
		 });
		
		wx.onMenuShareTimeline({
		    title: zTitle, // 分享标题
		    link: zLink, // 分享链接
		    imgUrl: zPic, // 分享图标
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
	}
}


$(function(){
	zwx.initConfig();
	wx.ready(function () {
		var pic = "http://www.zhengor.com" + $(".media-right").children().attr("src");
		var desc = $.trim($(".zIntro").text());
		if(desc == "") {
//			desc = $.trim($("#zMobile").text());
			desc = "专业人士为您找到好房";
		}
		zwx.setShareView(document.title, pic, desc, zwx.location);
	});  
	// 加载评论
	loadBrokerReview();
	// 加载房产
	loadHomeListData();
	
	// 加载更多点击事件
	$("#footprint .loadMore").click(function() {
		loadTimeLineData(1, ++currentPageFootprint);
	});
	$("#knowledge .loadMore").click(function() {
		loadTimeLineData(2, ++currentPageKnowledge);
	});
	$("#brokerReview .loadMore").click(function() {
		loadBrokerReview();
	});
	$("#homeList .loadMore").click(function() {
		loadHomeListData();
	});
	var type = 22;
	// 已收藏则禁用收藏按钮 
	Favorite.hasFav(zid, type, $("#cityCode").val() || 110000);
	// 绑定收藏小区点击事件
	Favorite.bindFavEvent(zid, $(".fav").parent().prev().text(), type, $("#cityCode").val() || 110000);
});

// 加载时间线
function loadTimeLineData(typeId, currentPage){
	$.ajax({
		url:"/UserCenterController.action?getTimeLineData",
		dataType:"json",
		data:{brokerNo:zid, typeId:typeId, currentPage: currentPage, type: 2},
		success:function(data, status) {
			// 显示时间线
			showTimeLine(data, typeId);
			// 总页数
			if(typeId == 1) {
				if(data === undefined || data.total == 0) $("#footprint").remove();
				var max_pagef = Math.ceil(data.total / pageSizeTimeLine) == 0 ? 1 : Math.ceil(data.total / pageSizeTimeLine);
				// 最后一页隐藏更多按钮
				if(max_pagef == currentPage) $("#footprint .loadMore").remove();
			} else {
				if(data === undefined || data.total == 0) $("#knowledge").remove();
				var max_pagek = Math.ceil(data.total / pageSizeTimeLine) == 0 ? 1 : Math.ceil(data.total / pageSizeTimeLine);
				if(max_pagek == currentPage) $("#knowledge .loadMore").remove();
			}
		}
	});
}

// 显示时间线
function showTimeLine(data, typeId) {
	if(data === undefined || data.timeLine.length == 0) return ;
	var part = "";
	$.each(data.timeLine, function(index, item) {
		part += "<div class='timeBlock'><span class='zgIcon zgIcon-circle'></span><p>" + item.moment + "<strong>" + item.comment + "</strong><b>" + item.fulldate + "</b></p></div>";
	});
	if(typeId == 1) {
		$("#footprint .loadMore").before(part);
	} else if(typeId == 2) {
		$("#knowledge .loadMore").before(part);
	}
}

// 加载评论
function loadBrokerReview(){
	$.ajax({
		url:"/BrokerWeiXin.action?getBrokerReview",
		dataType:"json",
		data:{brokerNo: zid, currentPage: currentPageReview},
		success:function(data, status) {
			if(reviews == 0) {
				$("#brokerReview .loadMore").remove();
				$("#brokerReview").append("<div><p>暂无评价</p></div>");
			}
			// 显示评价
			showBrokerReview(data);
			// 最后一页隐藏更多按钮
			var max_pagef = Math.ceil(reviews / pageSizeReview) == 0 ? 1 : Math.ceil(reviews / pageSizeReview);
			if(max_pagef == currentPageReview) $("#brokerReview .loadMore").remove();
			currentPageReview ++;
		}
	});
}

// 显示评论
function showBrokerReview(data){
	if(data === undefined || data.length == 0) return ;
	var part = "";
	$.each(data, function(index, item) {
		part += "<div class='appraise'><div class='media'>";
		part += "<div class='media-left'><img src='/images/defaultPic/head.png'/></div>";
		part += "<div class='media-body'><h5 class='media-heading'>"+item.id+"<span>"+item.createdtime+"</span></h5>"+BrokerReview.getStarIconContent(item.score)+"</div></div>";
		part += "<p>"+item.comment+"</p></div>";
	});
	$("#brokerReview .loadMore").before(part);
}
/**
 * 经纪人评分
 */
var BrokerReview = {
	// 获取 星星代码
	getStarIconContent : function(score){
		return '<span class="pingfen"><q class="'+BrokerReview.getStarClass(1, score)+'"></q><q class="'+BrokerReview.getStarClass(2, score)+'"></q><q class="'+BrokerReview.getStarClass(3, score)+'"></q><q class="'+BrokerReview.getStarClass(4, score)+'"></q><q class="'+BrokerReview.getStarClass(5, score)+'"></q></span>';
	},
	// 获取 获取星星的class
	getStarClass: function (startNumber, score){
		var i = score - (startNumber-1)*10;
		if(i < 3) return "zgIcon zgIcon-star-o";
		else if(i >= 3 && i <= 8) return "zgIcon zgIcon-star-half-o";
		else return "zgIcon zgIcon-star";
	}
};

//加载房产信息
function loadHomeListData(){
	$.ajax({
		url:"/BrokerWeiXin.action?getBrokerHomeList",
		dataType:"json",
		data:{brokerNo: zid, listType: 2, currentPage: currentPageHome},
		success:function(data, status) {
			// $("#homeList .houses").remove();
			if(data.total == 0) {
				$("#homeList .loadMore").remove();
				$("#homeList").append("<div><p>暂无房产</p></div>");
			}else{
				if(currentPageHome == 1){
					$("#homeList h4").empty().append("在租房产("+data.total+")");
				}
			}
			// 显示
			showHomeList(data);
			var max_pagef = Math.ceil(data.total / pageSizeHome) == 0 ? 1 : Math.ceil(data.total / pageSizeHome);
			// 只有一页的话，隐藏按钮
			if(currentPageHome == 1 && max_pagef == currentPageHome)
				$("#homeList .loadMore").remove();
			// 最后一页隐藏更多按钮
			else if(max_pagef == currentPageHome) 
				$("#homeList .loadMore").remove();
//				currentPageHome = 1;
			else
				currentPageHome ++;
		}
	});
}

// 显示房产
function showHomeList(data){
	if(data === undefined || data.homeList.length == 0) return ;
	var part = "";
	$.each(data.homeList, function(index, item) {
		var p = item.url.split('/');
		var url = '/110000/m/listpage/'+p[3]+'/'+p[4]+'/M'+p[5];
		part += "<a href='"+url+"' target='_blank' class='col-xs-4 houses'>";
		part += "<img src='"+item.default_pic+"' alt='房产图片' onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2);\"/>";
		part += "<b>"+item.residence_name+"</b>";
		part += "<span>"+item.price+"元" + item.area+"平 "+item.bed_room+"室";
		if(item.bath_room > 0) part += item.bath_room+"卫";
		part += "</span></a>";
	});
	$("#homeList .loadMore").before(part);
}


/**
 * 收藏类
 * type 1-小区 2-经纪人(21:买房经纪人 22:租房经纪人) 3-卖单 4-租单
 */
var Favorite = {
	// 判断是否已收藏，如果已收藏则禁用收藏按钮
	hasFav : function(id, type, cityCode) {
		$.ajax({
			url: "/BrokerWeiXin.action?hasFav",
			dataType: "json",
			async: false,
			data:{
				cityCode: cityCode,
				favId: parseInt(id),
				saveType: type
			},
			success:function(data, status) {
				if(data.status == 'y') $(".fav").removeClass("zgIcon-heart-o").addClass("zgIcon-heart");
			}	
		});
	},
	// 添加到收藏  
	addFav : function(id, content, type, cityCode) {
		$.ajax({
			url: "/BrokerWeiXin.action?addToFav",
			dataType: "json",
			async: false,
			data:{
				cityCode: cityCode,
				sid: parseInt(id),
				saveType: type,
				name: encodeURI(content)
			},
			success:function(data, status) {
			}
		});
		$(".fav").removeClass("zgIcon-heart-o").addClass("zgIcon-heart");
	},
	// 绑定收藏小区点击事件
	bindFavEvent : function(id, content, type) {
		$(".fav").click(function() {
			if($(this).hasClass("zgIcon-heart")) return;
			Favorite.addFav(id, content, type);
		});
	}
};