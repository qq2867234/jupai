var currentPages;
var totalPage;
//统计小区的户型信息，用以生成顶部户型的统计菜单
var roomtype=[];
//小区的ID
var resid;
//1,买   2,租
var HouseType;
//户型信息 ,全，空表示所有户型
var bedroom;
//顶部ACTION的URL
var top_url;
//经纪人个数
var brokerCount;
//操作类型，0表示初始化瀑布流，1表示重置瀑布流，2表示向瀑布流添加元素
var operType;
//经纪人页面的路径
var brokerurls=[];
//记录每次添加或重置时取得的经纪人的个数
var brokerNumber=0;
//经纪人页面路径下标
var broker_index=0;
var $brokerContainer;
$(function() {
	//初始化瀑布流
	$brokerContainer = $('#brokerBox');
	// $brokerContainer.imagesLoaded( function(){
		$brokerContainer.masonry({
		itemSelector : 'a',
			columnWidth: 186,
			gutterWidth: 7
	  });
	// });

	initBrokerListdata();
	topBrokerList();
	getBrokerList();
	adjustLoad();
	adjustGoTop();
	
	// 添加评分事件
//	BrokerReview.init();
	
	//点击加载更多时，翻页，触发getlist()函数向瀑布流中添加元素
	$("#loadMore").click(function() {
		if(currentPages < totalPage) {
			currentPages = currentPages+1;
			adjustLoad();
			operType=2;
			getBrokerList();
		}
		Init();
	});

});

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
	if(operType == 2) {
		$boxes.imagesLoaded(function() {
			$brokerContainer.append( $boxes ).masonry( 'appended', $boxes, urlClick(count));	
        });
        Init();
	}
	if(operType == 0) {
		$boxes.imagesLoaded(function() {
			$brokerContainer.prepend( $boxes ).masonry( 'reload', $boxes, urlClick(count) );
        });
        Init();
	} 		
	 brokerNumber=0;
}
//信息的初始化
function initBrokerListdata() {
	resid=$("#residenceId").val();
	bedroom=$("#bedRoom").val();
	HouseType=$("#houseType").val();
	if(HouseType==1)
		top_url="/HomeList.action?getSaleInfo";
	else if(HouseType==2)
		top_url="/HomeList.action?getRentInfo";
	currentPages=1;
	operType=0;
}
//取得顶部的数据	
function topBrokerList() {
	$.ajax({
		dataType : "json",
		url : top_url,
		async : false,
		data : {
			residence_id : resid,
			currentPage : currentPages,
		},
		success : function(e) {

			// 顶部的公共的信息

			var title = "<div class='communityInfor clearfix' style='display:block;' >"
					+ "<div class='comPic'>"
					+ "<img src='"
					+ e.bean.defaultPic
					+ "' width='600' height='450'  alt='' onerror=\"showImgDelay(this,'/images/defaultPic/residence.jpg',2);\"/>"
					+ "</div>"
					+ "<div class='comInfor'>"
					+ "<h3><a href='"
					+ e.bean.url
					+ "'>"
					+ e.bean.residenceName
					+ "</a></h3>"
					+ "<div class='detail'>地址: "
					+ e.bean.address
					+ "</div>"
				/*	+ "<div class='detail'>主力户型：二居(94㎡) 二居(82㎡) 四居(141㎡) </div>"*/
					+ "</div>" + "<div class='comPrice'>";
			if (HouseType == 1)
				title = title
				+ " <div class='price'>"
				+"<span></span></div>";
			else if (HouseType == 2)
				title = title
						+ "<div class='price'><span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
			title = title
					/*+ "<a class='curve round' href='#'>查看历史价格</a>"*/
					+ "</div> </div>";
			$("#comNames").append(title);

			if ((HouseType == 1&&e.bean.totalPrice1>0)||(HouseType == 2&&e.bean.rentalPrice1>0)) {
				
				
				// 顶部的居室信息
				var content = "<div class='communityInfor clearfix'>"
						+ "<div class='comPic'>" + "<img src='"
						+ e.bean.defaultPic
						+ "' width='600' height='450'  alt='' onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2);\"/>"
						+ "</div>" + "<div class='comInfor'>";
				if (HouseType == 1)
					content = content
							+ " <div class='detail'>价格范围: <span>"
							+ e.bean.totalPricelow1 + "万-"
							+ e.bean.totalPricehigh1 + "万</span></div>"
							+ " <div class='detail'>中位价: <span>"
							+ e.bean.totalPrice1 + "万</span></div>";
				else if (HouseType == 2)
					content = content
							+ " <div class='detail'>价格范围: <span>"
							+ e.bean.rentalPricelow1 + "元-"
							+ e.bean.rentalPricehigh1 + "元</span></div>"
							+ " <div class='detail'>中位价: <span>"
							+ e.bean.rentalPrice1 + "元</span></div>";
				content = content + "</div>" + "<div class='comPrice'>";
				if (HouseType == 1)
					content = content
					+ " <div class='price'>"
					+"<span></span></div>";
				else if (HouseType == 2)
					content = content
							+ " <div class='price'><span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
				content = content
						/*+ "<a class='curve round' href='#'>查看价格曲线</a>"*/
						+ "</div></div>";
				$("#comNames").append(content);
				// 将户型加入到数组中
				roomtype.push(1);
			}
			if ((HouseType == 1&&e.bean.totalPrice2>0)||(HouseType == 2&&e.bean.rentalPrice2>0)) {
				
				
				// 顶部的居室信息
				var content = "<div class='communityInfor clearfix'>"
						+ "<div class='comPic'>" + "<img src='"
						+ e.bean.defaultPic
						+ "' width='600' height='450'  alt='' onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2);\"/>"
						+ "</div>" + "<div class='comInfor'>";
				if (HouseType == 1)
					content = content
							+ " <div class='detail'>价格范围: <span>"
							+ e.bean.totalPricelow2 + "万-"
							+ e.bean.totalPricehigh2 + "万</span></div>"
							+ " <div class='detail'>中位价: <span>"
							+ e.bean.totalPrice2 + "万</span></div>";
				else if (HouseType == 2)
					content = content
							+ " <div class='detail'>价格范围: <span>"
							+ e.bean.rentalPricelow2+ "元-"
							+ e.bean.rentalPricehigh2 + "元</span></div>"
							+ " <div class='detail'>中位价: <span>"
							+ e.bean.rentalPrice2 + "元</span></div>";
				content = content + "</div>" + "<div class='comPrice'>";
				if (HouseType == 1)
					content = content
					+ " <div class='price'>"
					+"<span></span></div>";
				else if (HouseType == 2)
					content = content
							+ " <div class='price'><span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
				content = content
						/*+ "<a class='curve round' href='#'>查看价格曲线</a>"*/
						+ "</div></div>";
				$("#comNames").append(content);
				// 将户型加入到数组中
				roomtype.push(2);

			}
			if ((HouseType == 1&&e.bean.totalPrice3>0)||(HouseType == 2&&e.bean.rentalPrice3>0)) {
				// 顶部的居室信息
				var content = "<div class='communityInfor clearfix'>"
						+ "<div class='comPic'>" + "<img src='"
						+ e.bean.defaultPic
						+ "' width='600' height='450'  alt='' onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2);\"/>"
						+ "</div>" + "<div class='comInfor'>";
				if (HouseType == 1)
					content = content
							+ " <div class='detail'>价格范围: <span>"
							+ e.bean.totalPricelow3 + "万-"
							+ e.bean.totalPricehigh3 + "万</span></div>"
							+ " <div class='detail'>中位价: <span>"
							+ e.bean.totalPrice3 + "万</span></div>";
				else if (HouseType == 2)
					content = content
							+ " <div class='detail'>价格范围: <span>"
							+ e.bean.rentalPricelow3+ "元-"
							+ e.bean.rentalPricehigh3 + "元</span></div>"
							+ " <div class='detail'>中位价: <span>"
							+ e.bean.rentalPrice3 + "元</span></div>";
				content = content + "</div>" + "<div class='comPrice'>";
				if (HouseType == 1)
					content = content
					+ " <div class='price'>"
					+"<span></span></div>";
				else if (HouseType == 2)
					content = content
							+ " <div class='price'><span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
				content = content
					/*	+ "<a class='curve round' href='#'>查看价格曲线</a>"*/
						+ "</div></div>";
				$("#comNames").append(content);
				// 将户型加入到数组中
				roomtype.push(3);

			}
			if ((HouseType == 1&&e.bean.totalPrice4>0)||(HouseType == 2&&e.bean.rentalPrice4>0)) {
				
				// 顶部的居室信息
				var content = "<div class='communityInfor clearfix'>"
						+ "<div class='comPic'>" + "<img src='"
						+ e.bean.defaultPic
						+ "' width='600' height='450'  alt='' onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2);\"/>"
						+ "</div>" + "<div class='comInfor'>";
				if (HouseType == 1)
					content = content
							+ " <div class='detail'>价格范围: <span>"
							+ e.bean.totalPricelow4 + "万-"
							+ e.bean.totalPricehigh4 + "万</span></div>"
							+ " <div class='detail'>中位价: <span>"
							+ e.bean.totalPrice4 + "万</span></div>";
				else if (HouseType == 2)
					content = content
							+ " <div class='detail'>价格范围: <span>"
							+ e.bean.rentalPricelow4+ "元-"
							+ e.bean.rentalPricehigh4 + "元</span></div>"
							+ " <div class='detail'>中位价: <span>"
							+ e.bean.rentalPrice4 + "元</span></div>";
				content = content + "</div>" + "<div class='comPrice'>";
				if (HouseType == 1)
					content = content
					+ " <div class='price'>"
					+"<span></span></div>";
				else if (HouseType == 2)
					content = content
							+ " <div class='price'><span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
				content = content
					/*	+ "<a class='curve round' href='#'>查看价格曲线</a>"*/
						+ "</div></div>";
				$("#comNames").append(content);
				// 将户型加入到数组中
				roomtype.push(4);

			}
			if ((HouseType == 1&&e.bean.totalPrice5>0)||(HouseType == 2&&e.bean.rentalPrice5>0)) {
				
				// 顶部的居室信息
				var content = "<div class='communityInfor clearfix'>"
						+ "<div class='comPic'>" + "<img src='"
						+ e.bean.defaultPic
						+ "' width='600' height='450'  alt='' onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2);\"/>"
						+ "</div>" + "<div class='comInfor'>";
				if (HouseType == 1)
					content = content
							+ " <div class='detail'>价格范围: <span>"
							+ e.bean.totalPricelow5 + "万-"
							+ e.bean.totalPricehigh5 + "万</span></div>"
							+ " <div class='detail'>中位价: <span>"
							+ e.bean.totalPrice5 + "万</span></div>";
				else if (HouseType == 2)
					content = content
							+ " <div class='detail'>价格范围: <span>"
							+ e.bean.rentalPricelow5+ "元-"
							+ e.bean.rentalPricehigh5 + "元</span></div>"
							+ " <div class='detail'>中位价: <span>"
							+ e.bean.rentalPrice5 + "元</span></div>";
				content = content + "</div>" + "<div class='comPrice'>";
				if (HouseType == 1)
					content = content
							+ " <div class='price'>"
							+"<span></span></div>";
				else if (HouseType == 2)
					content = content
							+ " <div class='price'><span></span></div>";
				content = content
						/*+ "<a class='curve round' href='#'>查看价格曲线</a>"*/
						+ "</div></div>";
				$("#comNames").append(content);
				// 将户型加入到数组中
				roomtype.push(5);

			}

		

			// 添加顶部小区居室的统计信息
			var comMenu = " <div class='comMenu clearfix'><ul class='clearfix' id='comMenu'> </ul></div>";
			$("#comNames").append(comMenu);
			
			$("#comMenu li").eq(bedroom).addClass("on").siblings()
					.removeClass("on");
			$(".communityInfor").eq(bedroom).show().siblings(
					".communityInfor").hide();

		}// success
	});
}//tophome

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

/**
 * 获取评分星星的class
 * @param startNumber	第几颗星
 * @param credit		评分值
 * @return
 */
function getStarClass(startNumber, score){
	var i = score - (startNumber-1)*10;
	if(i < 3) return "star";
	else if(i >= 3 && i <= 8) return "star half";
	else return "star on";
}
//获取经纪人列表
function getBrokerList() {
	$.ajaxSettings.async = false;  
	$.getJSON("/ResidenceSaleSearch.action?showBrokerList",{currentPage:currentPages,residenceId:resid},function(data){
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
			 	
			 	content += "<a class='agent' href='"+bean.url+"' target='_blank'>";
				content += "<img src='"+headPicP+"' alt='经纪人头像' onerror=\"showImgDelay(this,'/images/defaultPic/head.png',2);\" />";
				content += "<b class='person'>"+bean.name+"</b>";
				content += "<b class='pingfen'><em>";
		        content += '<q class="'+getStarClass(1, bean.score)+'"></q><q class="'+getStarClass(2, bean.score)+'"></q> <q class="'+getStarClass(3, bean.score)+'"></q> <q class="'+getStarClass(4, bean.score)+'"></q> <q class="'+getStarClass(5, bean.score)+'"></q>';
		        content += "</em></b>";
		        content += "<b class='company'>"+bean.brokerageName;
		        if(bean.salesofficeName != undefined && bean.salesofficeName != ''){
		        	 content += "，"+bean.salesofficeName;
		        }
		        content += "</b></a>";
			 	
//			 	content=content+"<dl class='clearfix' id='"+broker_index+"'>"+
//		    	"<dt><img src='"+headPicP+"' width='600' height='450'  alt='经纪人头像' onerror=\"showImgDelay(this,'/images/defaultPic/head.png',2);\"/><a>评价:"+bean.likes+"</a></dt>"+
//		    	"<dd class='name'><span class='n' >"+bean.name+"</span><button class='smsg sendName brokerListMsg' title='发消息' zid='"+bean.zid+"' onclick='showMsgBox(this, 1);' type='button'></button></dd>"+
//		    	"<dd class='qua'>"+bean.cert+"</dd>"+
//		    	"<dd class='name tel'>"+bean.mobile+"</dd>"+
//		    	"<p class='cl'></p>"+
//		    	"<dd class='store'>"+brokerType+"</dd>"+
//		    	"</dl>";
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