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
var brokerageName = "";
//小区名
var residenceId;
var orderFlag = "false";
var selectedResidenceName = "";

//信息的初始化
function initBrokerListdata() {
	currentPages = 1;
	operType = 0;
}
function urlClick(count) {
	 for(var i=0;i<count;i++) {
			$("#"+(broker_index-count+i)+"").bind('click',function(){
				var id=$(this).attr('id');
				window.location.href=brokerurls[id];
				 bindforward('broker',brokerurls[id]);
					 
			});
	 	 }
	 $(".brokerListMsg").bind('click', function(e) {
		 stopProp(e);
	 });
	}
//重置瀑布流
function reloadBrokerListmasonry(content,count) {
	var $boxes= $(content);
	 brokerNumber=0;
	if(operType == 2) {
		$boxes.imagesLoaded(function() {
			$brokerContainer.append( $boxes ).masonry( 'appended', $boxes, urlClick(count));	
        });
	}
	if(operType == 0) {
		$boxes.imagesLoaded(function() {
			$brokerContainer.prepend( $boxes ).masonry( 'reload', urlClick(count) );
        });
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
	$.ajaxSettings.async = false;  
	if(brokerageName != undefined && brokerageName != "") {
		brokerageName = encodeURIComponent(brokerageName);
	}
	$.getJSON("/ResidenceSaleSearch.action?showBrokerList",{currentPage:currentPages, brokerageName:brokerageName, residenceId: residenceId, searchType : 2},function(data){
		brokerCount = data.total;
		totalPage = Math.ceil(data.total / 10);	
		var content="";
		 $.each(data.brokerList,function(i,bean) {
			 	var brokerType = "";
			 	if(bean.broker_type == 1) {
			 		brokerType = bean.brokerage_name;
			 		if(bean.salesoffice_name != null) {
			 			brokerType += "," + bean.salesoffice_name;
			 		}
			 	} else if(bean.broker_type == 2) {
			 		brokerType = "独立经纪人";
			 	}
			 	var headPicP = "/images/public/head.png";
			 	if(bean.photo != undefined) {
			 		headPicP = brokerListPhtoto+'/'+bean.photo;
			 	}
			 	content=content+"<dl class='clearfix' id='"+broker_index+"'>"+
		    	"<dt><img src='"+headPicP+"' width='600' height='450'  alt='经纪人头像' onerror=\"showImgDelay(this,'/images/defaultPic/head.png',2);\"/></dt>"+
		    	"<dd class='name'><span class='n' >"+bean.name+"</span><button class='smsg sendName brokerListMsg' title='发消息' zid='"+bean.zid+"' onclick='showMsgBox(this, 1);' type='button'></button></dd>"+
		    	"<dd class='qua'>"+bean.cert+"</dd>"+
		    	"<dd class='name tel'>"+bean.mobile+"</dd>"+
		    	"<p class='cl'></p>"+
		    	"<dd class='store'>"+brokerType+"</dd>"+
		    	"</dl>";
			 	$(".brokerListMsg").bind('click', function(e) {
			 		stopProp(e);
			 	});
			 	brokerurls.push(bean.url);
			 	brokerNumber += 1;
			 	broker_index += 1;
		 });
		 reloadBrokerListmasonry(content, brokerNumber);
	});
}

//最后一页的时候影藏继续加载的按钮，否则如果按钮被因此则使它显示出来
function adjustLoad() {
	if(currentPages == totalPage) {
		$("#loadMore").hide();
	} else if(currentPages < totalPage && $("#loadMore").is(":hidden")) {
		$("#loadMore").show();
	}
		
}

//如果记录数小于4则隐藏'到顶部'按钮
function adjustGoTop() {
	if(brokerCount <= 0) {
		$("#loadMore").hide();
		$("#goTop").hide();
		$("#brokerBox").text("对不起,没找到您要的信息");
	} else if(brokerCount<=4) {
		$("#goTop").hide();
	} else if(brokerCount>=4&&$("#goTop").is(":hidden")) {
		$("#goTop").show();
	}
}

$(function() {
	//初始化瀑布流
	$brokerContainer = $('#brokerBox');
	$brokerContainer.imagesLoaded( function(){
		$brokerContainer.masonry({
		itemSelector : 'dl',
			columnWidth: 238,
			gutterWidth: 15,
	  });
	});
	
	initBrokerListdata();
	getBrokerList();
	adjustLoad();
	adjustGoTop();
	//点击加载更多时，翻页，触发getlist()函数向瀑布流中添加元素
	$("#loadMore").click(function() {
		if(currentPages < totalPage) {
			currentPages = currentPages + 1;
			adjustLoad();
			operType = 2;
			getBrokerList();
		}
	});
	
	//推荐经纪人
	$("#recommendBroker").click(function() {
		clearBrokerList();
		residenceId = $("#residenceId").val();
		brokerageName = $.trim($("#brokerageName").val());
		var residenceName = $.trim($("#commuInput").val());
		if(residenceName != "") {
			if(orderFlag == "false") {
				$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的小区中进行选择");
				return false;
			}
		} else {
			$("#residenceId").val("");
			residenceId = $("#residenceId").val();
		}
		initBrokerListdata();
		adjustLoad();
		adjustGoTop();
		getBrokerList();
	});
	
	//选择小区  有策略 还没实现，把数据放缓存里 http://www.iteye.com/topic/1117898 scripts/residence.json
	var cacheResidence = {};	//小区缓存
	var chosenResidencePool = {}; //保存已选择的小区
	$("#commuInput").autocomplete({
		minLength: 0,
		width: 318,
		autoFocus: true,
		source: function( request, response ) {
			var cityCode = $("#cityCode").val();
			if(cityCode == "") {
				$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请选择城市");
				return false;
			}
			var term = request.term;
			if(term in cacheResidence) {
				response($.map(cacheResidence[term], function(item, index) {
					chosenResidencePool = cacheResidence[term];
					//alert(JSON.stringify(item));
					return {
						label: item.residenceName,
	                    value: item.residenceId
	              }
	            }));	
				return;
			}
      $.ajax({
          url: '/EditBrokerInfo.action?getResidenceListByCityCode',
          data: {cityCode: cityCode,keyword:encodeURIComponent(request.term)},
          type: 'post',
          dataType: "json",
          success: function(data, status, xhr) {
        	  cacheResidence[term] = data;
        	  chosenResidencePool = data;
			response($.map(data, function(item, index) {
				
				return {
					label: item.residenceName,
                    value: item.residenceId
              }
            }));												
          },
          error: function(data) {
        	//alert(JSON.stringify(data));
          }
      });
		},
		select: function( event, ui ) {
			event.preventDefault();
			orderFlag = "true";
			$("#residenceId").val(ui.item.value);
			this.value = String(ui.item.label).substring(0, String(ui.item.label).indexOf("("));
			selectedResidenceName = this.value;
			$("#commuInput").blur();
		}
	}).focus(function() {
	    $(this).autocomplete("search", "");
	}).change(function() {
		if($(this).val() != selectedResidenceName) {
			orderFlag = "false";
		}
	});
});