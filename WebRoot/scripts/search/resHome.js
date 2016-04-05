var HouseType ;
var bedroom;
var list_url;
var resid;
var currentPages=1;
var size;
var totalPage;
var $container ;


$(function(){
	// 初始化瀑布流
	$container= $('#roomBox');
	 $container.imagesLoaded(function() {
		$container.masonry({
			itemSelector : '.rental',
			columnWidth : 240,
			gutterWidth : 19
		});
	 });
	initInfo();
/*	$("#comMenu li").eq(bedroom).addClass("on").siblings().removeClass("on");	*/
	$("#"+bedroom).addClass("on").siblings().removeClass("on");
});

function initInfo(){
	HouseType=$("#houseTypeInput").val();
	bedroom=$("#BedRoomInput").val();
	resid=$("#ResId").val();
	size=$("#RoomSize").val();
	if(size > 0) {
		$("#main").removeClass("shortPage");
		Init();
	}
	totalPage = Math.ceil(size / 10);
	adjustLoad();
	adjustGoTop();
	if (HouseType == 1)
		list_url = "/HomeList.action?getsalelist";
	else if (HouseType == 2)
		list_url = "/HomeList.action?getrentlist";
	else if (HouseType == 3)
		list_url = "/HomeList.action?getrentlistForBird";
		
	adjustGoTop();	
	// 点击加载更多时，翻页，触发getlist()函数向瀑布流中添加元素
	$("#loadMore").click(function() {

		if (currentPages < totalPage) {
			currentPages = currentPages + 1;
			adjustLoad();
			getlist();
		}

	});
	
}


// 取得瀑布流的信息,operType==1时初始化瀑布流，operType==2向瀑布流中追加元素。
function getlist() {
	$.ajax({
		dataType : "json",
		url : list_url,
		async : false,
		data : {
			residence_id : resid,
			currentPage : currentPages,
			bedRoom : bedroom,
			flag : $("#flag").val()
		},
		success : function(e) { // 统计居室个数
									
			var content = "";
			if (size > 0) {
				$.each(e.beans,
					function(i, bean) {
						
						//用户跟踪的路径
//						var  userTrackPath="window.location.href='"+bean.url+"';bindforward('home','"+bean.url+"');";
//						var price = "";
//					 	var area = "";
//					 	if(HouseType == 1) {
//					 		price = bean.total_price + "万";
//					 		area = bean.floor_area;
//					 		
//					 	} else if(HouseType > 1) {
//					 		price = bean.rental_price + "元/月";
//					 		area = bean.rental_area;
//					 	}
//						content += "<a class='onsale' href='"+bean.url+"'>";
//					 	content += "<img src='"+bean.default_pic+"' alt='房产图片' onerror=\"showImgDelay(this,\'/images/public/defaultHome.jpg\',2)\" />";
////					 	content += "<strong>"+bean.residence_name+"</strong>";
//					 	content += "<span class='left price'>"+price+"  "+area+"平米</span>";
//				 		content += "<span class='left'>"+bean.bed_room+"室";
//				 		if(bean.bath_room != undefined && bean.bath_room!=0)
//				 			content += bean.bath_room+"卫</span>";
//				 		else
//			 			content += "</span>";
					 	bean.price = bean.rental_price;
					 	bean.area = bean.rental_area;
					 	bean.beds = bean.bed_room;
					 	bean.baths = bean.bath_room;
					 	content += getHouseHtml(bean);
					}// function(i,bean)
				);// each
			}
			if (content.length > 0)
				reloadmasonry(content);
		}// success
	});// ajax()
}// getlist()

// default_pic url price beds baths area
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


// 重置瀑布流
function reloadmasonry(content) {
	var $boxes = $(content);
	$boxes.imagesLoaded(function() {
		$container.append($boxes).masonry('appended', $boxes);
	});
}

// 最后一页的时候隐藏继续加载的按钮，否则如果按钮被隐藏则使它显示出来
function adjustLoad() {
	if (currentPages == totalPage)
		$("#loadMore").hide();
	else if (currentPages < totalPage)
		$("#loadMore").show();

}
// 如果记录数小于4则隐藏'到顶部'按钮
function adjustGoTop() {
	if (size <= 10)
		$("#goTop").hide();
	else if (size > 10 && $("#goTop").is(":hidden"))
		$("#goTop").show();

}
