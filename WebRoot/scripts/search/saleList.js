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
		itemSelector : '.rental',
		columnWidth: 240,
		gutterWidth: 19
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
		var content = "<a class='agent rental' href='"+data.url+"' target='_blank'>";
		content += "<img src='/account/photo/"+Math.floor(data.zid/10000)+"/"+data.pic+"' alt='头像' onerror=\"showImgDelay(this,'/images/defaultPic/head.png',2);\" />";
		content += "<em><b class='person'>"+data.name+"</b>";
//		content += '<b class="pingfen"><q class="'+getStarClass(1, data.score)+'"></q><q class="'+getStarClass(2, data.score)+'"></q> <q class="'+getStarClass(3, data.score)+'"></q> <q class="'+getStarClass(4, data.score)+'"></q> <q class="'+getStarClass(5, data.score)+'"></q></b>';
        content += "</em>";
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
//	var cnBedRoom = new Array("","一","二","三","四","五");//直接定义并初始化
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
		 	content += getHouseHtml(bean);
		 	brokerurls.push(bean.url);
		 	brokerNumber += 1;
		 	broker_index += 1;
		 });
		 reloadBrokerListmasonry(content, brokerNumber);
	});
}

//default_pic url price beds baths area
function getHouseHtml(house){
	var defaultPic;
	// 房源默认图片
	if(house.default_pic !== undefined && house.default_pic != ""){
		// 末尾加下划线(压缩过的，宽度450)
		defaultPic = house.default_pic.replace(house.default_pic.substring(house.default_pic.indexOf('.')), '_'+house.default_pic.substring(house.default_pic.indexOf('.')));
	}else{
		defaultPic = "/images/public/defaultHome.jpg";
	}
	var content = '<div class="rental"><a class="item" href="'+house.url+'" target="_blank">';
    // 房源图片
    content += '<span class="picContainer"><img src="'+defaultPic+'" alt="房源图片" onerror=\"showImgDelay(this,\'/images/public/defaultHome.jpg\',2)\" /></span>';
    // 价格
    content += '<span class="price">'+house.price+' <q>元/月</q></span>';	
    // 小区名、室厅卫、面积
    content += '<span class="info"><strong class="title">'+house.beds+'室'+house.baths+'卫　'+house.area+'平米</strong></span>';
    content += '</a>';
    content += '</div>';
    return content;
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
			$("#main").removeClass("shortPage");
			Init();
       });
	}
	if(operType == 0) {
		$boxes.imagesLoaded(function() {
			$brokerContainer.append( $boxes ).masonry(  'reload', urlClick(count));
			$("#main").removeClass("shortPage");
			Init();
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
	if(saleListCount > 0){
		$("#main").removeClass("shortPage");
		Init();
	}
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
