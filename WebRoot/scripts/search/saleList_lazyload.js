var currentPages;
var totalPage;
//统计小区的户型信息，用以生成顶部户型的统计菜单
var roomtype=[];
//经纪人编号
var brokerNo;
//1,买   2,租
var HouseType;
//户型信息 ,全，空表示所有户型
var bedRoom;
var budget;
//访问租/卖URL
var list_url;
//卖单个数
var saleListCount;
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
	$brokerContainer = $('#saleListBox');
	$brokerContainer.imagesLoaded( function(){
		$brokerContainer.masonry({
		itemSelector : 'a',
		columnWidth: 186,
		gutterWidth: 7,
	  });
	});
	initSaleListdata();
	getBrokerInfo();
	//topSaleList();
	getSaleList();
	adjustLoad();
	adjustGoTop();
	
	// 添加评分事件
//	BrokerReview.init();
	
	//点击加载更多时，翻页，触发getlist()函数向瀑布流中添加元素
	$("#loadMore").click(function() {
		if(currentPages < totalPage) {
			$("#waitingPic").show().css('top',$("#waitingPic").parent().height()-300+'px');
			currentPages = currentPages+1;
			adjustLoad();
			operType=2;
			getSaleList();
			
		}
	});
});


/**
 * 信息的初始化
 */
function initSaleListdata() {
	brokerNo=$("#zid").val();
	bedRoom=$("#bedRoom").val();
	HouseType=$("#houseType").val();
	budget=$("#budget").val();
	
	if(HouseType==1)
		list_url="/SaleHomeList.action?showSaleList";
	else if(HouseType==2)
		list_url="/RentalHomeOperator.action?showRentalList";
	currentPages=1;
	operType=0;
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
/**
 * 获取经纪人信息
 */
function getBrokerInfo(){
	$.ajaxSettings.async = false;  
	$.getJSON("/SaleHomeList.action?getBrokerInfo&brokerNo="+brokerNo, function(data){
		var content = "<a class='agent' href='"+data.url+"' target='_blank'>";
		content += "<img src='/account/photo/"+Math.floor(data.zid/10000)+"/"+data.pic+"' alt='头像' onerror=\"showImgDelay(this,'/images/defaultPic/head.png',2);\" />";
		content += "<em><b class='person'>"+data.name+"</b>";
		content += "<b class='pingfen'>";
        content += '<q class="'+getStarClass(1, data.score)+'"></q><q class="'+getStarClass(2, data.score)+'"></q> <q class="'+getStarClass(3, data.score)+'"></q> <q class="'+getStarClass(4, data.score)+'"></q> <q class="'+getStarClass(5, data.score)+'"></q>';
        content += "</b></em>";
        content += "<b class='company'>"+data.brokerageName;
        if(data.salesofficeName != undefined && data.salesofficeName != ''){
        	 content += "，"+data.salesofficeName;
        }
        content += "</b>";
        if(data.comment != undefined && data.comment != '')
        	content += "<span class='intro'>"+data.comment+"</span>";
        else
        	content += "<span class='intro' style='text-align:center;padding-top:10px;'>暂无动态</span>";
        content += "</a>";
        $brokerContainer.prepend(content);
	});
}

/**
 * 获取卖单/租单列表
 */
function getSaleList() {
	var cnBedRoom = new Array("","一","二","三","四","五");//直接定义并初始化
	$.ajaxSettings.async = false;  
//	$()
	$("#saleListBox").next().append("<div class=''></div>");
	$.getJSON(list_url,{currentPage:currentPages,brokerNo:brokerNo,bedRoom:bedRoom,budget:budget},function(data) {
		if(data.status == "n") {
			alert(data.info);
			return false;
		}
		saleListCount = data.total;
		totalPage = Math.ceil(data.total / 10);	
		var content="";
		$.each(data.list,function(i,bean) {
		 	var price = "";
		 	var area = "";
		 	var bed = cnBedRoom[bean.bed_room];
		 	if(HouseType == 1) {
		 		price = bean.total_price + "万";
		 		area = bean.floor_area;
		 		
		 	} else if(HouseType == 2) {
		 		price = bean.price + "元/月";
		 		area = bean.area;
		 	}
		 	
//		 	content=content+"<dl id='"+broker_index+"'>"+
//	    	"<dt><img src='"+bean.default_pic+"' width='600' height='450'  alt='房产图片' onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2);\"/></dt>"+
//	    	"<dd class='price'>"+price+"/"+area+"平<span>"+bed+"室</span></dd>"+
//	    	"<dd class='floor'>"+bean.slogan+"</dd>"+
//	    	"<dd class='saler'>"+bean.residence_name+"</dd>"+
//	    	"</dl>";
		 	
		 	content += "<a class='onsale' href='"+bean.url+"'>";
		 	content += "<img src='/images/public/defaultHome.jpg' data-src='"+bean.default_pic+"' class='lazy' alt='房产图片' onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2);\"/>";
		 	content += "<strong>"+bean.residence_name+"</strong>";
		 	content += "<q>"+bean.slogan+"</q>";
		 	content += "<span class='left price'>"+price+"  "+area+"平米</span>";
	 		content += "<span class='left'>"+bean.bed_room+"室";
	 		if(bean.bath_room != undefined && bean.bath_room!=0)
	 			content += bean.bath_room+"卫</span>";
	 		else
	 			content += "</span>";
	 		var floorStr = "";
	 		var totalStr = "";
	 		var floatFloor = bean.floor / (bean.total_floor == 0 ? 18 : bean.total_floor);
	 		if(floatFloor == 0) {
	 			floorStr = "楼层未知";
	 		} else if(floatFloor > 0 && floatFloor < 0.35) {
	 			floorStr = "低楼层";
	 		} else if(floatFloor > 0.35 && floatFloor <= 0.7) {
	 			floorStr = "中楼层";
	 		} else {
	 			floorStr = "高楼层";
	 		}
	 		if(bean.floor == undefined) {
	 			floorStr = "";
	 		}
	 		if(bean.floor == 1) {
	 			floorStr = "1层";
	 		}
	 		if(bean.total_floor != 0 && bean.total_floor != undefined) {
	 			totalStr = "/" +bean.total_floor + "层";
	 		}
	 		content += "<span class='right'>" + floorStr + totalStr+"</span></a>";
		 	brokerurls.push(bean.url);
		 	brokerNumber += 1;
		 	broker_index += 1;
		 });
		 reloadBrokerListmasonry(content, brokerNumber);
	});
}

function urlClick(count) {
	 for(var i=0;i<count;i++) {
		$("#"+(broker_index-count+i)+"").bind('click',function(){
			var id=$(this).attr('id');
			window.location.href=brokerurls[id];
				 
		});
	 }
	 $("#waitingPic").hide();
		$(".toMore").show();
}

//重置瀑布流
function reloadBrokerListmasonry(content,count) {
	var $boxes= $(content);
//	if(operType == 2) {
//		$('#saleListBox').append( $boxes ).masonry( 'appended', $boxes );	
//		$brokerContainer.imagesLoaded(function() {
//			$brokerContainer.masonry();
//           });
//	}
//	if(operType == 0) {
//		$brokerContainer.prepend( $boxes ).masonry( 'reload' );
//	} 		
	if(operType == 2) {
		$boxes.imagesLoaded(function() {
			$brokerContainer.append( $boxes ).masonry( 'appended', $boxes ,urlClick(count));
			Init();
			ImgLazyLoad.lazyLoad();
       });
	}
	if(operType == 0) {
		$boxes.imagesLoaded(function() {
			$brokerContainer.append( $boxes ).masonry(  'reload', urlClick(count));
			Init();
			ImgLazyLoad.lazyLoad();
			
       });
		//$brokerContainer.prepend( $boxes ).masonry( 'reload' );
	} 	
	
	 brokerNumber=0;
}

//控制加载更多按钮的显示与隐藏
function adjustLoad() {
	if(currentPages == totalPage) {
		$("#loadMore").hide();
	} else if(currentPages < totalPage && $("#loadMore").is(":hidden")) {
		$("#loadMore").show();
	}
		
}

//如果记录数小于4则隐藏'到顶部'按钮
function adjustGoTop() {
	if(saleListCount <= 0) {
		$("#loadMore").hide();
		$("#goTop").hide();
		$("#saleListBox").text("对不起,没找到您要的信息");
	} else if(saleListCount<4) {
		$("#goTop").hide();
	} else if(saleListCount>=4&&$("#goTop").is(":hidden")) {
		$("#goTop").show();
	}
}

/**
 * 图片延迟加载
 */
var ImgLazyLoad = {
	lazyLoad : function() {
		$.each($("img.lazy"), function(){
	        $(this).attr("src", $(this).attr("data-src"));
	        $(this).removeClass("lazy");
	    });
	}	
};

//取得顶部的数据(废弃)
//function topSaleList() {
//	$.ajax({
//		dataType:"json",
//		url:list_url,
//		async:false,
//		data:{
//			residence_id:brokerNo,
//			currentPage:currentPages
//		 },
//		success:function(e){
//			$.each(e.beans, function(i,bean){
//				//顶部的公共的信息
//				if(i==0)
//					{
//					var title=	"<div class='communityInfor clearfix' style='display:block;' >"+
//		            "<div class='comPic'>"+
//	                "<img src='"+bean.defaultPic+"' width='600' height='450'  alt=''/>"+ 
//	                "</div>"+
//	                "<div class='comInfor'>"+
//	                "<h3><a href='#'>"+bean.residencename+"</a></h3>"+
//	                "<div class='detail'>地址: "+bean.address+"</div>"+
//	                "<div class='detail'>主力户型：二居(94㎡) 二居(82㎡) 四居(141㎡) </div>"+
//	                "</div>"+
//	                "<div class='comPrice'>";
//					if(HouseType==1)
//					title=title+"<div class='price'>￥"+bean.unitPriceall+"/平<span>&nbsp;&nbsp;(均价)&nbsp;&nbsp;</span></div>";
//					else if(HouseType==2)
//						title=title+"<div class='price'>---/平<span>&nbsp;&nbsp;(均价)&nbsp;&nbsp;</span></div>";
//	                title=title+"<a class='curve round' href='#'>查看历史价格</a>"+
//	                "</div> </div>";	
//					$("#comNames").append(title);						
//					}//if(i==0)
//					
//					//顶部的居室信息
//					var content= "<div class='communityInfor clearfix'>"+
//		           "<div class='comPic'>"+
//	               "<img src='"+bean.defaultPic+"' width='600' height='450'  alt=''/>"+ 
//	            "</div>"+
//	            "<div class='comInfor'>"+
//	               " <h3><a href='#'>"+bean.bedRoom+"居("+bean.residencename+")</a></h3>";
//					if(HouseType==1)
//						content=content+" <div class='detail'>价格范围: <span>"+bean.totalPricelow+"万-"+bean.totalPricehigh+"万</span></div>"+
//	               " <div class='detail'>中位价: <span>"+bean.totalPrice50+"万</span></div>";
//					else if(HouseType==2)
//						content=content+" <div class='detail'>价格范围: <span>"+bean.totalPricelow+"元-"+bean.totalPricehigh+"元</span></div>"+
//			               " <div class='detail'>中位价: <span>"+bean.totalPrice50+"元</span></div>";
//	             /*  " <div class='detail'>在售房产: <span>123套</span></div>"+*/
//					content=content+"</div>"+
//	            "<div class='comPrice'>";
//					if(HouseType==1)
//						content=content+" <div class='price'>￥"+bean.unitPrice+"/平<span>&nbsp;&nbsp;(均价)&nbsp;&nbsp;</span></div>";
//					else if(HouseType==2)
//						content=content+" <div class='price'>---/平<span>&nbsp;&nbsp;(均价)&nbsp;&nbsp;</span></div>";
//					content=content+"<a class='curve round' href='#'>查看价格曲线</a>"+
//	            "</div></div>";
//					$("#comNames").append(content);
//					//将户型加入到数组中
//					roomtype.push(bean.bedRoom);
//				});//each				
////				//添加顶部小区居室的统计信息
////				var comMenu=" <div class='comMenu clearfix'><ul class='clearfix' id='comMenu'> </ul></div>";
////				$("#comNames").append(comMenu);
////				$("#comMenu").append('<li class="on">全部</li>');
////				for(var i=0;i<roomtype.length;i++){
////					if(i==4){var type=' <li>'+roomtype[i]+'+居</li>';$("#comMenu").append(type);}
////					else
////						{var type=' <li>'+roomtype[i]+'居</li>';$("#comMenu").append(type);}
////				}//for
////				$("#comMenu li").eq(bedRoom).addClass("on").siblings().removeClass("on");
////				$(".communityInfor").eq(bedRoom).show().siblings(".communityInfor").hide();
//				
//			}//success
//				 
//		}
//	);//ajax()
//	
//}//tophome

