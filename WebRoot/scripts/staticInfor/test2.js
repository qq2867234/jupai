
$(function(){

	if($("#ISL_Cont1").children('li').length<=7)
	{
		$("#leftArr1,#rightArr1").hide();
		$("#ISL_Cont1").css({"width": '96%' , 'margin-left': '1.5%'});
	}
	else{
	var scrollPic_01 = new ScrollPic();
	scrollPic_01.scrollContId   = "ISL_Cont1"; //内容容器ID
	scrollPic_01.arrLeftId      = "leftArr1";//左箭头ID
	scrollPic_01.arrRightId     = "rightArr1"; //右箭头ID

	scrollPic_01.frameWidth     = 890;//显示框宽度
	scrollPic_01.pageWidth      = 152; //翻页宽度

	scrollPic_01.speed          = 10; //移动速度(单位毫秒，越小越快)
	scrollPic_01.space          = 10; //每次移动像素(单位px，越大越快)
	scrollPic_01.autoPlay       = false; //自动播放
	scrollPic_01.autoPlayTime   = 3; //自动播放间隔时间(秒)

	scrollPic_01.initialize(); //初始化
	}
if($("#ISL_Cont2").length>0)
{
	
	
	var oPromotion = "<div class='bAddress' id='promotion'><span class='tags tag1' title='活动1'>活动1</span><span class='tags tag1' title='活动2'>活动2</span><span class='tags tag1' title='活动3'>活动3</span></div>";
	$(".bMarket").before($(oPromotion));
	$(".tags").click(function() {
		$(".divPopup").remove();
		var xCor = $(this).position().left + $(this).width();
		var yCor = $(this).parents('.bAddress').position().top + 20;
		var popPromo = "<div class='divPopup'><h5>活动1</h5><div class='textBox'>活动1介绍</div><div class='btnBox'><a class='cancelBtn'>取消</a><a href='###' class='confirmBtn'>报名活动</a></div></div>";
		$(popPromo).appendTo('body').css({'left':xCor+'px','top':yCor+'px'});
		$(".divPopup .cancelBtn").bind('click',function(){
			$(".divPopup").remove();
		});
		$(".confirmBtn").bind('click',function(){
			var oAttend = "<form class='divPopup attendDiv'><h5>活动1</h5><div class='divLine'> <div class='item'> 姓名 </div> <div class='itemInput'> <input id='name' class='unit5 valid'  type='text' maxlength='16'> <span class='warning'>请输入真实姓名</span> <span class='Validform_checktip'></span> </div> </div> <div class='divLine'> <div class='item'> 手机号码 </div> <div class='itemInput'> <input id='mobile' type='text' class='unit8 valid' maxlength='11'><button type='button' class='actionBtn'>发送验证码</button><span class='Validform_checktip'></span> </div> </div><div class='divLine'><div class='item'> 验证码</div> <div class='itemInput'> <input id='mobile' type='text' class='unit5 valid' maxlength='4'><span class='Validform_checktip'>输入错误</span> </div> </div><div class='divLine last'><a class='cancelBtn'>取消</a><button type='button' id='submitBut' class='confirmBtn'>报名活动</button></div></form>"; 
			$(".divPopup").remove();
			$(oAttend).appendTo('body').css({'left':xCor+'px','top':yCor+'px'});
			fnTextVerify($("#mobile"),$("#mobile").next('.warning'),11);
			$(".divPopup .cancelBtn").bind('click',function(){
				$(".attendDiv").remove();
			});
			$(".divPopup .confirmBtn").bind('click',function(){
				//提交表单事件写在这里
				$(".attendDiv").remove();
			});
		});
	});

	if($("#ISL_Cont2").children('li').length<=7)	{
		$("#leftArr2,#rightArr2").hide();
		$("#ISL_Cont2").css({"width": '96%' , 'margin-left': '1.5%'});
	}
	else{
		var scrollPic_02 = new ScrollPic();
		scrollPic_02.scrollContId   = "ISL_Cont2"; //内容容器ID
		scrollPic_02.arrLeftId      = "leftArr2";//左箭头ID
		scrollPic_02.arrRightId     = "rightArr2"; //右箭头ID
	
		scrollPic_02.frameWidth     = 890;//显示框宽度
		scrollPic_02.pageWidth      = 152; //翻页宽度
	
		scrollPic_02.speed          = 10; //移动速度(单位毫秒，越小越快)
		scrollPic_02.space          = 10; //每次移动像素(单位px，越大越快)
		scrollPic_02.autoPlay       = false; //自动播放
		scrollPic_02.autoPlayTime   = 3; //自动播放间隔时间(秒)
	
		scrollPic_02.initialize(); //初始化
	}

}

$(".ulBox").each(function(){
	var n = $(this).children('ul').length||$(this).children('div').length;
	var px = $(this).children().first().outerWidth();
	$(this).css("width",n*px);
	});
$(".showBox").each(function(){
	$(this).children().first().show().siblings().hide();
	});
$(".secBox").children().click(function(){
	
	if($(this).attr('id')=='saleShow')
	{
		$('#priceChartRent').hide();
		$('#priceChartBuy').show();	
		$("#saleRooms li:first").click();
		return false;
	}
	else if($(this).attr('id')=='rentShow')
	{
		$('#priceChartRent').show();
		$("#rentRooms li:first").click();
		$('#priceChartBuy').hide();	
		return false;
	}
	$(this).addClass("on").siblings().removeClass("on");
	$(this).parents(".w-33").find(".showBox").children('')
		.eq($(this).index())
		.show().siblings().hide();
});

$("#mapLi").click(function(){
	$(this).parents(".w-33").find(".showBox").hide();
	$("#container").show();
	$(this).addClass('on').siblings().removeClass('on');
	addMap();
});
$("#listLi").click(function(){
	$(this).parents(".w-33").find(".showBox").show();
	$("#container").hide();
	$(this).addClass('on').siblings().removeClass('on');
});
$(".priceChart").find(".secBox").each(function(){
	if($(this).hasClass("saleOrRent"))
	{
		$(this).children()
		.first().removeClass("borderLeft").addClass('first')
		.end()
		.last().addClass('last');
	}
	else
	{
		$(this).children()
		.first().removeClass("borderLeft").addClass('first').addClass('on')
		.end()
		.last().addClass('last');
	}
});

$(".textOverClick").each(function(){
	var $text = $(this);
	var $textBox = $text.parent();
	$text.height($textBox.height()-14);
	$textBox.css('position','relative');
	$text.parents('.w-33').css({'overflow':'visible'});
	//临时修改, 下次生成页面时限制高度
	fnShowM($text,$textBox);
	$(this).bind('mouseleave',function(){
		$text.height($textBox.height()-14);
		fnShowM($text,$textBox);
	})
	
});
});

function getUlBoxWidth(obj){
	var boxWidth = 0;
	$(obj).each(function(){
		boxWidth+=$(this).outerWidth();		
	});
	return boxWidth;	
}
function fnShowM($text,$textBox){
	$textBox.find(".more").remove();
	if($text[0].scrollHeight>$text[0].clientHeight)
	{
		$text.css({
			'position':'absolute',
			'top':0,
			'left':0,
			'width':$textBox.width(),
			'padding-top':$textBox.css('padding-top'),
			'padding-left':$textBox.css('padding-left'),
			'padding-right':$textBox.css('padding-left'),
			'padding-bottom':0,
			'z-index':10
		});
		var aMore = "<a href='#' class='more'>全部</a>";
			$(aMore).appendTo($textBox).bind('mouseenter',function(){
				$text.css({"height":"auto","background":$textBox.css('backgroundColor'),'padding-bottom':'10px'});
				
				$(this).remove(); 				
			});
	}
}

//##############################################################以下是功能代码########################################################################################
var listIds = [];
var listZids = [];
var listPics = [];
var listSlogan = [];
var bedRooms = [];
// var bathRooms = [];
var floorAreas = [];
var prices = [];
var listUrls = [];
var listType = 0;

var bcurrPage = 1;
var scurrPage = 1;
var rcurrPage = 1;

var btotal = 1;
var stotal = 1;
var rtotal = 1;

var unitPrice = 0;
var rentalCount = 0;
var saleCount = 0;
var brokerCount = 0;

var room_index;

// 价格分类

var chart_price;

// 小区下经纪人信息
var zids = [];
var imageurls = [];
var contacts = [];
var certTiles = [];
var likeses = [];
var urls = [];
var brokerTypes = [];
var salesofficeNames = [];
var brokerageNames = [];
var brokerNames = [];

var listBrokerTypes = [];
function clearListData() {
	listIds = [];
	listZids = [];
	listPics = [];
	listSlogan = [];
	bedRooms = [];
// bathRooms = [];
	floorAreas = [];
	prices = [];
	listUrls = [];
	listBrokerTypes = [];
}

function clearBrokersData() {
	zids = [];
	imageurls = [];
	brokerageNames = [];
	contacts = [];
	certTiles = [];
	likeses = [];
	urls =[];
	brokerTypes = [];
	salesofficeNames = [];
	brokerageNames = [];
	brokerNames = [];
}

function generateRentalSaleInfo() {
//	if(isNew == undefined) {
//		isNew = 2;
//	}
//	$.getJSON("/Project.action?getOnSaleRentalInfo", {
//		residenceId : residenceId,
//		isNew : isNew
//	}, function(data) {
//		if(data.status == "y") {
//			unitPrice = data.price
//			$("#residencePrice").text(unitPrice);
//		}
//	});
}

// 准备该小区下的经纪人数据

function readyBrokersData(residenceId) {
	clearBrokersData();
	$.ajaxSettings.async = false;
	$.getJSON("/SaleHomeInput.action?showBrokers", {
		residenceId : residenceId,
		currPage : bcurrPage
	}, function(data) {
		if(data.status == "y") {
			btotal = data.count;
			$.each(data.brokers, function(index, element) {
				zids.push(element.zid);
				imageurls.push(element.imageurl);
				brokerageNames.push(element.brokerage_name);
				contacts.push(element.name);
				certTiles.push(element.cert);
				likeses.push(element.likes);
				urls.push(element.url);
				brokerTypes.push(element.broker_type);
				salesofficeNames.push(element.salesoffice_name);
			});
		}
	});
}

// 生成小区经纪人数据
function generateBrokersData() {
	readyBrokersData(residenceId);
	if(zids.length > 0) {
		for(var i = 0; i < zids.length; i++) {
			var brokerType = "";
		 	if(brokerTypes[i] == 1) {
		 		brokerType = brokerageNames[i];
		 		if(salesofficeNames[i] != null && salesofficeNames[i] != "" && salesofficeNames[i] != undefined) {
		 			brokerType += "," + salesofficeNames[i];
		 		}
		 	} else if(brokerTypes[i] == 2) {
		 		brokerType = "独立经纪人";
		 	}
			var headPic = "";
			if(imageurls[i] == undefined) {
				headPic = "/images/public/head.png"; 
			} else {
				headPic = brokerListPhtoto + imageurls[i];
			}
			var part = "<dl class='borderLeft'><dt><a href='" + urls[i] + "'><img src='" + headPic + "' width='323' height='220'  alt=''/></a></dt>" +
					"<dd class='dlName'><span><a href='" + urls[i] + "'>"+contacts[i]+"</a></span><a href='###' title='发消息' class='chat' onclick='showMsgBox(this);' zid='" + zids[i] + "'></a></dd>" +
							"<dd class='dlText'><a href='" + urls[i] + "'>评价:"+ likeses[i] +"</a></dd>" +
									"<dd class='dlText'><a href='" + urls[i] + "'>" + brokerType + "</a></dd>";
// var part1 = "<dl class='agent shadowAgent margin10 clearfix'><dt><a
// class='HeadPic' href='" + urls[i] + "'><img class='ident' src='" +
// brokerListPhtoto + imageurls[i] + "' width='40' height='40' alt=''
// /></a></dt>" +
// "<dd class='name' zid='"+zids[i]+"'><span
// class='n'>"+contacts[i]+"</span><button class='smsg sendName brokerListMsg'
// title='发消息' onclick='showMsgArea(this);' type='button'></button>"+
// "<span class='sendMsg round shadow'><span id='num'>还能输入40字</span><a
// class='closeBtn'></a><textarea class='sendText' rows='1'></textarea><button
// class='confirmBtn round' type='button'
// onclick='sendOutBrokerList(this);'>发送</button></span></dd>"+
// "<dd title='" + brokerageNames[i] + "'>"+ brokerageNames[i] +"</dd>" +
// "<dd>评价:"+ likeses[i] +"</dd>";
			$("#brokers").append(part);
			$("#brokers").children("dl").first().removeClass("borderLeft");
// $(".sendMsg").bind('click', function(e) {
// stopProp(e);
// });
// $(".brokerListMsg").bind('click', function(e) {
// stopProp(e);
// });
// $(".closeBtn").bind('click',function(e){
// $(this).parent().hide();
// //stopProp(e);
// });
		}
		
	}
}

function readyListData(listType, residenceId) {
	clearListData();
	$.ajaxSettings.async = false;
	var currPage = 1;
	if(listType == 1) {
		currPage = scurrPage;
	} else if(listType == 2) {
		currPage = rcurrPage;
	}
	$.getJSON("/Project.action?getResidenceListInfo", {
		listType : listType,
		currPage : currPage,
		residenceId : residenceId
	}, function(e) {
		if (listType == 1) {
			if (e.sales.length <= 0) {
				// $("#saleContainer").remove();
				return false;
			}
		} else if (listType == 2) {
			if (e.rentals.length <= 0) {
				// $("#rentalContainer").remove();
				return false;
			}
		}
		if (listType == 1) {
			stotal = e.count;
			$.each(e.sales, function(i, item) {
				listIds.push(item.id);
				listZids.push(item.zid);
				listPics.push(item.defaultPic);
				listSlogan.push(item.slogan);
				bedRooms.push(item.bedRoom);
				// bathRooms.push(item.bathRoom);
				floorAreas.push(item.floorArea);
				prices.push(item.totalPrice);
				listUrls.push(item.url);
				brokerageNames.push(item.brokerageName);
				brokerNames.push(item.brokerName);
				listBrokerTypes.push(item.brokerType);
			});
		} else if (listType == 2) {
			rtotal = e.count;
			$.each(e.rentals, function(i, item) {
				listIds.push(item.id);
				listZids.push(item.zid);
				listPics.push(item.defaultPic);
				listSlogan.push(item.slogan);
				bedRooms.push(item.bedRoom);
				// bathRooms.push(item.bathRoom);
				floorAreas.push(item.area);
				prices.push(item.price);
				listUrls.push(item.url);
				brokerageNames.push(item.brokerageName);
				brokerNames.push(item.brokerName);
				listBrokerTypes.push(item.brokerType);
			});
		}
	});
}

function generateResidenceList() {
	var table = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
	readyListData(listType, residenceId);
	for ( var i = 0; i < listIds.length; i++) {
		var bTypeStr = ""
		if(listBrokerTypes[i] == 1) {
			bTypeStr =  brokerageNames[i] + "," + brokerNames[i];
		} else {
			bTypeStr = "独立经纪人";
		}
		if (listType == 1) {
			var part1 = "<dl class='house'>" +
					"<dt><a href='"+listUrls[i]+"'><img src='"+listPics[i]+"' width='323' height='220'  alt=''/></a></dt>" +
					"<dd class='dlName'><a href='"+listUrls[i]+"'>" + prices[i] + "万元/" + floorAreas[i] + "平米</a></dd>" +
					"<dd class='dlText'><a href='"+listUrls[i]+"'>" + bTypeStr + "</a></dd>" +
					"<dd class='dlText'><a href='"+listUrls[i]+"'>" + listSlogan[i] + "</a></dd>";
			$("#saleContainer").append(part1);
// $("#fillData")
// .append(
// "<dl id=\""
// + listIds[i]
// + "\" class=\"house margin10 ssss0\"><dt><a class=\"rentalPic0\"><img src=\""
// + listPics[i]
// + "\" width=\"600\" height=\"450\" alt=\"\"/></a></dt>"
// + "<dd title=\"" + listSlogan[i]
// + "\">" + listSlogan[i] + "</dd>"
// + "<dd>" + table[bedRooms[i]] + "室"
// + table[bathRooms[i]] + "卫,"
// + floorAreas[i] + "平米</dd><dd>"
// + prices[i] + "万元</dd></dl>");
		} else if (listType == 2) {
			var part1 = "<dl class='house'>" +
				"<dt><a href='"+listUrls[i]+"'><img src='"+listPics[i]+"' width='323' height='220'  alt=''/></a></dt>" +
				"<dd class='dlName'><a href='"+listUrls[i]+"'>" + prices[i] + "元·月/" + floorAreas[i] + "平米</a></dd>" +
				"<dd class='dlText'><a href='"+listUrls[i]+"'>" + bTypeStr + "</a></dd>" +
				"<dd class='dlText'><a href='"+listUrls[i]+"'>" + listSlogan[i] + "</a></dd>";
			$("#saleContainer").append(part1);
			/*
			 * $("#fillData") .append( "<dl id=\"" + listIds[i] + "\"
			 * class=\"house margin10 ssss0\"><dt><a class=\"rentalPic0\"><img
			 * src=\"" + listPics[i] + "\" width=\"600\" height=\"450\"
			 * alt=\"\"/></a></dt>" + "<dd title=\"" + listSlogan[i] + "\">" +
			 * listSlogan[i] + "</dd>" + "<dd>" + table[bedRooms[i]] + "室" +
			 * table[bathRooms[i]] + "卫," + floorAreas[i] + "平米</dd><dd>" +
			 * prices[i] + "元/月</dd></dl>");
			 */
		}
		/*
		 * $("#" + listIds[i]).bind( "click", function() { if (listUrls[this.id] !=
		 * null && listUrls[this.id] != undefined) window.location.href =
		 * listUrls[this.id]; });
		 */

	}
}
$(function() {
	$("#around").siblings("h3").text("周边小区");
	// generateRentalSaleInfo();
	$("#nextGroup").click(function() {
		if(listType == 0) {
			$("#brokers").empty();
			bcurrPage++;
			if(bcurrPage > btotal){
				bcurrPage = 1;
			}
			generateBrokersData();
		} else if(listType == 1) {
			$("#saleContainer").empty();
			scurrPage++;
			if(scurrPage > stotal){
				scurrPage = 1;
			}
			generateResidenceList();
		} else if(listType == 2) {
			$("#rentalContainer").empty();
			rcurrPage++;
			if(rcurrPage > rtotal){
				rcurrPage = 1;
			}
			generateResidenceList();
		}
	});
	$("#chooseAgent").click(function() {
		$("#brokers").empty();
		listType = 0;
		generateBrokersData();
	});
	
	$("#chooseSale").click(function() {
		listType = 1;
		$("#saleContainer").empty();
		generateResidenceList();
	});
	$("#chooseRental").click(function() {
		listType = 2;
		$("#rentalContainer").empty();
		generateResidenceList();
	});
	generateBrokersData();
	/* initRoomSelect(); */
	initRoomPic();
	
	var oTime = setInterval(TimeMove, 3000);
	var oTimeLi = 1;
	var oLiC = $("#news li").length;
	$("#news").mouseenter(function() {
		clearInterval(oTime);
	});
	$("#news").mouseleave(function() {
		oTime = setInterval(TimeMove, 3000);
	});
	function TimeMove() {
		if (oTimeLi == 0) {
			$("#news li").eq(oLiC - 1).slideUp(1000);
		} else {
			$("#news li").eq(oTimeLi - 1).slideUp(1000);
		}
		$("#news li").eq(oTimeLi).slideDown(1000);
		oTimeLi++;
		oTimeLi %= $("#news li").length;
	}

	// 新的分布图入口
	function initRoomPic(){
		$(".datefresh").each(function(){
			$(this).text(dateTime);
		})
		addSaleRooms();
		addRentRooms();
	}
	
	
	function addSaleRooms(){
		if (sale_rooms.length > 0){
			var content='';
			for(var i=0;i<sale_rooms.length;i++){
				content=content+"<li class='borderLeft'>"+sale_rooms[i]+"居</li>";
			}
			$("#saleRooms").append(content);
		}
		/*else{
			$("#priceChartBuy").addClass("hide");	
		}*/
		$("#saleRooms li:first").addClass("on");
		
		if($("#saleRooms").children().length>0)
			{
			var target = $("#saleRooms li:first").text();
			var RoomCount = Number(target.substring(0, 1));
			getPictrue(RoomCount,1)
			
			$("#saleRooms li").bind("click", function() {
				$("#SaleChart .price").empty();
				$(this).addClass("on").siblings().removeClass("on");
				var target = $(this).text();
				getPictrue( Number(target.substring(0, 1)),1);
				$("#SaleChart").css("width",getUlBoxWidth($("#SaleChart").children(".price")));
			});
			$("#saleRooms li:first").click();
			}
		else
			{
				$("#saleRooms").remove();
			}
	}
	
	function addRentRooms(){
		if (rent_rooms.length > 0){
			var content='';
			for(var i=0;i<rent_rooms.length;i++){
				content=content+"<li class='borderLeft'>"+rent_rooms[i]+"居</li>";
			}
			$("#rentRooms").append(content);
		}
		/*else
			$("#priceChartRent").addClass("hide");	*/
		
		$("#rentRooms li:first").addClass("on");
		
		if($("#rentRooms").children().length>0)
			{
			var target = $("#rentRooms li:first").text();
			var RoomCount = Number(target.substring(0, 1));
			getPictrue(RoomCount,2);
			$("#rentRooms li").bind("click", function() {
				$("#RentalChart .price").empty();
				$(this).addClass("on").siblings().removeClass("on");
				var target = $(this).text();
				getPictrue( Number(target.substring(0, 1)),2);
				$("#RentalChart").css("width",getUlBoxWidth($("#RentalChart").children(".price")));
			});
			
			}
		else
			{
				$("#rentRooms").remove();
			}
	}
	
	
	
	// 旧的分布图入口
	function initRoomSelect() {
		addRooms();
		$("#roomSelect li:first").addClass("on");
		showAreaInit();
		$("#roomSelect li").click(function() {
			$(this).addClass("on").siblings().removeClass("on");
			var order = $(this).text();
			var bed_room = Number(order.substring(0, 1));
			if (bed_room > 0) {
				room_index = bed_room;
				appendBindArea(bed_room);
				SelectPictrue(bed_room, 0);
			}
		});
	}// function

	function addRooms() {
		if (all_rooms.length > 0) {
			var content = '';
			for ( var i = 0; i < all_rooms.length; i++) {
				content += "<li>" + all_rooms[i] + "居</li>";
			}
			$("#roomSelect").append(content);
		} else
			$("#roomChart").parent().addClass("hide");
	}

	function showAreaInit() {
		var target = $("#roomSelect li:first").text();
		room_index = Number(target.substring(0, 1));
		if (room_index > 0) {
			appendBindArea(room_index);
			SelectPictrue(room_index, 0);
		}
	}// function

	function appendBindArea(room) {
		$("#AreaSelect").empty();
		var target_areas;
		eval("target_areas= z" + room + "Areas;");
		$("#AreaSelect").empty();
		var tempt = '';
		for ( var i = 0; i < target_areas.length; i++) {
			tempt += "<li>" + target_areas[i] + "平米</li>";
		}
		$("#AreaSelect").append(tempt);
		$("#AreaSelect li").eq(0).addClass("on");
		$("#AreaSelect li").bind("click", function() {
			$(this).addClass("on").siblings().removeClass("on");
			var index = $("#AreaSelect li").index(this);
			SelectPictrue(room_index, index);
		});
	}// function

	// 取得指定居室和户型的图
	function SelectPictrue(bed_room, index) {
		var zd;
		if (index == 0) {
			eval("zd=z" + bed_room + "Adata;");
			drawPictrue(zd);
		} else if (index == 1) {
			eval("zd=z" + bed_room + "Bdata;");
	
			drawPictrue(zd);
		} else if (index == 2) {
			eval("zd=z" + bed_room + "Cdata;");
			drawPictrue(zd);
		} else if (index == 3) {
			eval("zd=z" + bed_room + "Ddata;");
			drawPictrue(zd);
		}
	}

})// $(function()

function fnPicMove(showBox, picStep) {
	var myIndex;
	for ( var i = 0; i < $(showBox).length; i++) {
		if ($(showBox).eq(i).is(":visible")) {
			myIndex = i;
			break;
		}
	}
	if (myIndex + picStep > $(showBox).length - 1) {
		$(showBox).eq(0).fadeIn(1400);
		$(showBox).eq(myIndex).fadeOut(700);
	} else {
		$(showBox).eq(myIndex + picStep).fadeIn(1400);
		$(showBox).eq(myIndex).fadeOut(700);
	}
}

// 取得指定居室的图 houseType表示卖或租
function getPictrue(bed_room,houseType) {
	
	
if(houseType==1){
	
	var pic1,pic2,pic3,pic4;
	eval("if (s"+bed_room+"Adata!==undefined)pic1=s"+ bed_room + "Adata;");
	eval("if (s"+bed_room+"Bdata!==undefined)pic2=s"+ bed_room + "Bdata;");
	eval("if (s"+bed_room+"Cdata!==undefined)pic3=s"+ bed_room + "Cdata;");
	eval("if (s"+bed_room+"Ddata!==undefined)pic4=s"+ bed_room + "Ddata;");
	if(pic1.length>0)
		{var title=bed_room+"居   "+eval("s"+bed_room+"Areas[0]")+"平米";
			drawPictrue(pic1,1,0,title);	
		}	
	if(pic2.length>0)
	{
		var title=bed_room+"居  "+eval("s"+bed_room+"Areas[1]")+"平米";
		drawPictrue(pic2,1,1,title);	
	}
	if(pic3.length>0)
	{
		var title=bed_room+"居  "+eval("s"+bed_room+"Areas[2]")+"平米";
		drawPictrue(pic3,1,2,title);	
	}
	if(pic4.length>0)
	{
		var title=bed_room+"居  "+eval("s"+bed_room+"Areas[3]")+"平米";
		drawPictrue(pic4,1,3,title);	
	}
}//sale
if(houseType==2){
	
	var pic1,pic2,pic3,pic4;
	eval("if (r"+bed_room+"Adata!==undefined)pic1=r"+ bed_room + "Adata;");
	eval("if (r"+bed_room+"Bdata!==undefined)pic2=r"+ bed_room + "Bdata;");
	eval("if (r"+bed_room+"Cdata!==undefined)pic3=r"+ bed_room + "Cdata;");
	eval("if (r"+bed_room+"Ddata!==undefined)pic4=r"+ bed_room + "Ddata;");
	if(pic1.length>0)
		{var title=bed_room+"居  "+eval("r"+bed_room+"Areas[0]")+"平米";
			drawPictrue(pic1,2,0,title);	
		}	
	if(pic2.length>0)
	{
		var title=bed_room+"居  "+eval("r"+bed_room+"Areas[1]")+"平米";
		drawPictrue(pic2,2,1,title);	
	}
	if(pic3.length>0)
	{
		var title=bed_room+"居  "+eval("r"+bed_room+"Areas[2]")+"平米";
		drawPictrue(pic3,2,2,title);	
	}
	if(pic4.length>0)
	{
		var title=bed_room+"居  "+eval("r"+bed_room+"Areas[3]")+"平米";
		drawPictrue(pic4,2,3,title);	
	}
}//rent




}


function drawPictrue(picData,housetype,index,title) {
	if(picData.length>0){
		 var  xTitle=housetype==1?'价格(万元)':'价格(元/月)';
		
	var chart_area={                                           
	        chart: {                                                           
	        /*	type: 'areaspline',*/
	        	 type: 'column', 
	            width: 400,
	            height: 250
	        },                                                                 
	        title: {                                                           
	            text: title                    
	        },                                                                 
	        subtitle: {                                                        
	            text: null                                  
	        },                                                                 
	        xAxis: {                                                           	   
	        	categories: [],
	            title: {                                                       
	                text: xTitle                                             
	            },/* ,  
	            min:-1,
	            max:101,*/
	            showEmpty: false,
	            tickmarkPlacement: 'on',
	            tickLength: 0,
	            labels:{
	            	rotation:-70,
	            	formatter: function() {
	            		

	            		if(String(this.value).substring(0,1)=='最'||String(this.value).substring(0,1)=='中')return String(this.value).substring(3).replace('万元','').replace('元','');
	            		else  return this.value.replace('万元','').replace('元','');
	                    
	            	},
	                    style: {
		                     fontSize: '10px',
		                     fontWeight: 'bold',
		                      fontFamily: 'Verdana, sans-serif'		                      
		                  }
	            }
	        
			/*
			 * plotBands: [{ // visualize the weekend from: 4.5, to: 4.5, color:
			 * 'rgba(68, 170, 213, .2)' }]
			 */
			 
	            
	        },                                                                 
	        yAxis: {                                                           
	          
	            title: {                                                       
	                text: '比例(%)'                                                                     
	            },                                                             
	            labels: {                                                      
	                overflow: 'justify' ,
	                formatter: function() {
	                    return this.value +'%';
	                    }
	                	
	            } 
	           /* max:100 */
	        },                                                                 
	        tooltip: {                                                         
	            valueSuffix: '%' 
	        },                                                                 
	        plotOptions: {                                                     
	            bar: {                                                         
	                dataLabels: {                                              
	                  enabled:false,
	                  formatter:function(){return this.y+'%';
	                  }
	                }
	            }  ,
	         column: {
	        	 dataLabels:{
	        		 enabled:true,
	        		 
	        		  style: {
	                      fontSize: '10px',
	                      fontFamily: 'Verdana, sans-serif'
	                      
	                  },
	        		 formatter:function(){
	        			 return this.y+'%';
	        			 }
	        	 },
	            	        pointPadding: 0.5,
	            	        borderWidth: 0,
	            	        pointWidth: 10
	            	    },
	            areaspline: {
	                fillOpacity: 0.3,
	                /* color:'red', */
	                lineWidth:1,
	                marker:{
	                	 enabled: true,
	                	 radius:2
	                }
	            }

	        },                                                                 
	        legend: {                                                          
	            layout: 'vertical',                                            
	            align: 'right',                                                
	            verticalAlign: 'top',                                          
	            x: -40,                                                        
	            y: 100,                                                        
	            floating: true,                                                
	            borderWidth: 1,                                                
	            backgroundColor: '#FFFFFF',                                    
	            shadow: true  ,
	            enabled:false      
	        },                                                                 
	        credits: {                                                         
	            enabled:false,
	            text:'www.zilens.com',
	            href:'http://www.zilens.com'
	        },                                                                 
	        series: [{                                                         
	            name: '比例',                                             
	            data: picData          
	 
	        }]  
	        
	    };// chart_price
	
	if(housetype==1)
		{
		$("#SaleChart .price").eq(index).highcharts(chart_area);
		
		}
	
	
	else if(housetype==2)
	{
	$("#RentalChart .price").eq(index).highcharts(chart_area);
	
	}

}
	
}


function changAreasSelct(bed_room) {

	switch (bed_room) {
	case 1:
		var str = getAreaStr(z1Areas);
		$("#AreaSelect").html(str);
		break;
	case 2:
		var str = getAreaStr(z2Areas);
		$("#AreaSelect").html(str);
		break;
	case 3:
		var str = getAreaStr(z3Areas);
		$("#AreaSelect").html(str);
		break;
	case 4:
		var str = getAreaStr(z4Areas);
		$("#AreaSelect").html(str);
		break;
	case 5:
		var str = getAreaStr(z5Areas);
		$("#AreaSelect").html(str);
		break;

	}

}

function getAreaStr(areasArray) {
	var str = '<option >请选择面积</option>';
	for ( var i = 0; i < areasArray.length; i++) {
		str = str + "<option >" + areasArray[i] + "平米</option>"
	}

	return str;

}
