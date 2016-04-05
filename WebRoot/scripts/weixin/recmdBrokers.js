var currentPages;
var totalPage;
//顶部ACTION的URL
var top_url;
//经纪人个数
var brokerCount = 0;
//操作类型，0表示初始化瀑布流，1表示重置瀑布流，2表示向瀑布流添加元素
var operType;
//经纪人页面的路径
var brokerurls=[];
//记录每次添加或重置时取得的经纪人的个数
var brokerNumber=0;
//经纪人页面路径下标
var broker_index=0;
var $brokerContainer;
//公司名
var brokeragename = "";
//小区名
var residenceid;
var orderFlag = "false";
var selectedResidenceName = "";
var sOder = 0; //按评分排序
var dOder = 0; //按距离排序
var keywords;
var clickStatus = 0;
var latitude; // 纬度，浮点数，范围为90 ~ -90
var longitude; // 经度，浮点数，范围为180 ~ -180。
//信息的初始化
function initBrokerListdata() {
	currentPages = 1;
	operType = 0;
}

//判断是否是微信
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}	


//清空经纪人列表
function clearBrokerList() {
	initBrokerListdata();
	brokerNumber=0;
	$("#brokerBox").empty();
}

//获取经纪人列表
function getBrokerList() {
	var type = $("#listType").val(); 
	$.ajax({
        url: '/ResidenceSaleSearch.action?showBrokerList',
        async: false,
        data: {
        	currentPage:currentPages, 
        	searchType : 2, 
        	listType: type,
        	keywords: encodeURI(keywords),
            scoreO: sOder,
           	distanceO: dOder
        },
        type: 'post',
        dataType: "json",
        success: function(data, status, xhr) {
        	brokerCount = data.total;
    		totalPage = Math.ceil(data.total / 5) == 0 ? 1 : Math.ceil(data.total / 5);
    		catchData(data.brokerList);											
        },
        error: function(data) {
      	//alert(JSON.stringify(data));
        }
    });
}

//清空数据
function cleanData() {
	$("#brokers").empty();
	$("#errormsg").text('');
}

//展示经纪人
function showBroker() {
	//cleanData();
	$(".page").remove();
//	alert(currentPages + ";" + totalPage + ";" + brokerCount);
	var brokers = fetchData(currentPages);
	if(brokers.length <= 0) {
		showErrMsg($("#errormsg"), "该小区下暂无经纪人");
	} else {
		fillData(brokers);
	}
}

//缓存数据
function catchData(data) {
	var afterData = [];
	if(data != undefined) {
		afterData = data;
	}
	$("body").data(String("B" + currentPages), afterData);
}

//从缓存中取数据
function fetchData(page) {
	if($("body").data(String("B" + page)) == undefined) {
		return [];
	} else {
		return $("body").data(String("B" + page));
	}
}

//显示错误信息
function showErrMsg(id, msg) {
	id.text(msg);
}


//填充数据
function fillData(filldata) {
	var content="";
	var type = $("#listType").val(); 
	var brokerType = "";
	var typeStr = "";
	var officeName = "";
	var goType = 1;
	$.each(filldata,function(i,bean) {
 		brokerType = bean.brokerage_name;
 		var favClass = bean.sname == '' ? "zgIcon zgIcon-heart zgIcon-heart-o fav" : "zgIcon zgIcon-heart fav";
 		if(bean.salesoffice_name != '') {
 			if(bean.salesoffice_name.length > 4) {
 				officeName = bean.salesoffice_name.substring(0, 4) + "...";
 			} else {
 				officeName = bean.salesoffice_name;
 			}
 			brokerType += "," + officeName;
 		}
 		if(type == 1 && bean.sales > 0) {
 			// typeStr = "我有" + bean.sales + "套在售房源";
            typeStr = "在售(" + bean.sales + ")";
 			goType = 1;
 		} else if(type == 2 && bean.rentals > 0) {
 			// typeStr = "我有" + bean.rentals + "套在租房源";
            typeStr = "在租(" + bean.rentals + ")";
 			goType = 2;
 		}
	 	var headPicP = "/images/public/head.png";
	 	if(bean.photo != undefined) {
	 		headPicP = '/account/photo/' + bean.photo;
	 	}
	 	content += " <div class='media' >" +
	 				"<span class='media-left'><img src="+headPicP+" alt='头像' onerror=\"showImgDelay(this,'/images/defaultPic/head.png',2);\"></span>" +
	 				"<span class='media-body'>" +
	 				"<strong class='media-heading'>" + bean.name + BrokerReview.getStarIconContent(bean.score) + "</strong>" + 
	 				"<span class='tag'>";
	 	var tags = bean.tag.split(/[;；]/);
	 	content += setTags(tags);
	 	content += "<q class='" + favClass + "' brokerNum="+ bean.zid +" brokerName="+ bean.name+"></q></span><span class='intro'>" + brokerType + "<b>"+ typeStr +"</b></span></span></div>"
	});
	if(totalPage > 1) {
		//<button type='button' class='btn btn-default col-xs-3 col-xs-offset-2' id='prePage' onclick='prevPage(1);'>上页</button>
		content += "<div class='page'><button type='button' class='btn btn-default col-xs-10 col-xs-offset-1' id='nextPage' onclick='nextPage(1);'>加载更多</button></div>";
	}
 	$("#brokers").append(content);
 	bindPage(filldata, type);
 	var rType = type == 1 ? 21 : 22
 	$(".fa").each(function() {
    	$(this).click(function(e) {
    		stopProp(e);
    		if($(this).hasClass("zgIcon-heart-o")) {
    			addToFav($(this).attr("brokerNum"), $(this).attr("brokerName"), rType);
    			$(this).removeClass("zgIcon-heart-o");
    			//$(this).parents("a").attr("href", href);
    		}
    	});
    });
 	invalidateNex();
	invalidatePre();
}

//绑定跳转页面
function bindPage(data, type) {
    	var goType = 1;
	 	$(".media:eq(-1),.media:eq(-2),.media:eq(-3),.media:eq(-4),.media:eq(-5)").each(function(index, item) {
   		$(this).bind('click', function(){
   			if(type == 1 && data[index].sales > 0) {
   	 			goType = 1;
   	 		} else if(type == 2 && data[index].rentals > 0) {
   	 			goType = 2;
   	 		}
   			window.location.href = "/mobile/broker/" + data[index].zid + "/" + goType;
   		});
   });
}
//添加到收藏  type 1 小区 2 经纪人
function addToFav(id, content, type) {
   	$.ajax({
		url: "/BrokerWeiXin.action?addToFav",
		dataType: "json",
		async: false,
		data:{
			cityCode: $("#cityCode").val(),
			sid: id,
			saveType: type,
			name: encodeURI(content)
		},
		success:function(data, status) {
			alert("su");
		}	
	});
}
//设置标签
function setTags(tags) {
	var tagClass = ["hollowTag-primary", "hollowTag-info", "hollowTag-success", "hollowTag-warning", "hollowTag-danger", "hollowTag-primary", "hollowTag-info", "hollowTag-success", "hollowTag-warning", "hollowTag-danger"];
	var content = "";
	var count = 0;
	var size = 0;
	for(var i = 1; i < tags.length; i++) {
		if(count < 5) {
			size += tags[i].length;
			if(size < 14) {
				if($.trim(tags[i]) != '') {
					content += '<button type="button" class="hollowTag ' + tagClass[i] + '">' + tags[i] + '</button>';
					count++;
				}
			}
		}
	}
	return content;
}

//下一页
function nextPage(type) {
	if (currentPages < totalPage) {
		currentPages = currentPages + 1;
		var brokers = fetchData(currentPages);
		if(brokers.length <= 0) {
			getBrokerList();				
		}
		showBroker();
	}
	invalidateNex();
	invalidatePre();
}
// 上一页
function prevPage(type) {
	if (currentPages != 1) {
		currentPages -= 1;
		showBroker();
	}
	invalidatePre();
	invalidateNex();
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
	if (currentPages == totalPage) {
		$("#nextPage").addClass("unAvailable");
	} else if ($("#nextPage").hasClass("unAvailable")) {
		$("#nextPage").removeClass("unAvailable").addClass('nextPage');
	}
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
//获取js配置
function jsConfig() {
	var location = window.location.href;
//	alert(location);
	$.ajax({
		url:"/WeiXinComment.action?getJSConfig",
		dataType:"json",
		async: false,
		data:{location:location},
		success:function(data, status) {
			wx.config({
			    debug: false,
			    appId: data.sp.appId,
			    timestamp: data.sp.timestamp,
			    nonceStr: data.sp.nonceStr,
			    signature: data.sp.signature,
			    jsApiList: [
			        // 所有要调用的 API 都要加到这个列表中
			        'getLocation'
			      ]
			});
		}
	});
}

//获取地址
function getLocation() {
    wx.getLocation({
        success: function (res) {
            latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            //var speed = res.speed; // 速度，以米/每秒计
            //var accuracy = res.accuracy; // 位置精度
            alert(latitude + ":" + longitude + ";" + speed + ";" + accuracy)
        }
    });
}
$(function() {
	/*if(isWeiXin()){
    	jsConfig();
        	getLocation();
    	$("#distance").click(function() {
        	dOder = 1;
        	sOder = 0;
        	$("#searc").click();
        });
    }*/
	
	$("#mul").click(function() {
		sOder = 0;
		dOder = 0;
		$("#searc").click();
	});
	/*initBrokerListdata();
	getBrokerList();
	showBroker();*/
	//推荐经纪人
	$("#searc").click(function() {
		keywords = $("#searcInput").val()===undefined?'':clearIgnalCh($("#searcInput").val());
        keywords = keywords == $("#searcInput").attr('placeholder') ? "" : keywords;
        if (keywords.length >= 0) {
            keywords = formatKeyword(keywords);
            clearBrokerList();
            cleanData();
    		initBrokerListdata();
    		getBrokerList();
    		showBroker();
        }
	});
	$("#searc").click();
	$("#score").click( function() {
    	if(clickStatus == 0) {
    		clickStatus = 1;
    		sOder = -1;
    		dOder = 0;
    		$(this).children().removeClass("fa-long-arrow-up");
    	} else {
    		clickStatus = 0;
    		sOder = 1;
    		dOder = 0;
			$(this).children().addClass("fa-long-arrow-up");	        	
    	}
    	 $("#searc").click();
    });
	
//	//选择小区  有策略 还没实现，把数据放缓存里 http://www.iteye.com/topic/1117898 scripts/residence.json
//	var cacheResidence = {};	//小区缓存
//	var chosenResidencePool = {}; //保存已选择的小区
//	$("#commuInput").autocomplete({
//		minLength: 0,
//		width: 318,
//		autoFocus: true,
//		source: function( request, response ) {
//			var citycode = $("#cityCode").val();
//			if(citycode == "") {
//				$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请选择城市");
//				return false;
//			}
//			var term = request.term;
//			if(term in cacheResidence) {
//				response($.map(cacheResidence[term], function(item, index) {
//					chosenResidencePool = cacheResidence[term];
//					//alert(JSON.stringify(item));
//					return {
//						label: item.residenceName,
//	                    value: item.residenceId
//	              }
//	            }));	
//				return;
//			}
//      $.ajax({
//          url: '/EditBrokerInfo.action?getResidenceListByCityCode',
//          data: {cityCode: citycode,keyword:encodeURIComponent(request.term)},
//          type: 'post',
//          dataType: "json",
//          success: function(data, status, xhr) {
//        	  cacheResidence[term] = data;
//        	  chosenResidencePool = data;
//			response($.map(data, function(item, index) {
//				
//				return {
//					label: item.residenceName,
//                    value: item.residenceId
//              }
//            }));												
//          },
//          error: function(data) {
//        	//alert(JSON.stringify(data));
//          }
//      });
//		},
//		select: function( event, ui ) {
//			event.preventDefault();
//			orderFlag = "true";
//			$("#residenceId").val(ui.item.value);
//			this.value = String(ui.item.label).substring(0, String(ui.item.label).indexOf("("));
//			selectedResidenceName = this.value;
//			$("#commuInput").blur();
//			$("#searc").click();
//		}
//	}).change(function() {
//		if($(this).val() != selectedResidenceName) {
//			orderFlag = "false";
//		}
//	});
});
function stopProp(event){
	if (event.stopPropagation) {
		// this code is for Mozilla and Opera
		event.stopPropagation();
	}
	else if (window.event) {
		// this code is for IE
		window.event.cancelBubble = true;
	} 
}

//当图片加载失败是指定默认图片
function showImgDelay(imgObj,imgSrc,maxErrorNum){  
    if(maxErrorNum>0){  
        imgObj.onerror=function(){  
            showImgDelay(imgObj,imgSrc,maxErrorNum-1);  
        };  
        setTimeout(function(){  
            imgObj.src=imgSrc;  
        },500);  
    }else{  
        imgObj.onerror=null;  
        imgObj.src=imgSrc;  
    }  
}