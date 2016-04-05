//与分页相关的参数，这里的瀑布流要模拟分页
var currentPages;
var totalPage;
// 统计小区的户型信息，用以生成顶部户型的统计菜单
var roomtype = [];
// 1,买 2,租
var HouseType;
// 户型信息 ,全，空表示所有户型
var bedroom;
// 中间变量用于统计各户型的总数量
var roomcount;
// 顶部ACTION的URL
var top_url;
// 瀑布流的URL
// 操作类型，0表示初始化瀑布流，1表示重置瀑布流，2表示向瀑布流添加元素
var operType;
var list_url;
// 小区的ID
var resid;
// 买单/租单列表相关的数组
// 存储添加或重组出来的所有买单或租单id
/* var list_ids=[]; */
// 存储添加或重组出来的所有买单或租单url
var list_urls = [];
/*
 * //给每个买单添加跳转的URL，用该索引从数组中找出对应的URL var index=0;
 */
// 记录每次添加或重置时取得的买单或租单的个数
var number = 0;
var id_index = 0;

$(function() {
	// 初始化瀑布流
	var $container = $('#roomBox');
	$container.imagesLoaded(function() {
		$container.masonry({
			itemSelector : 'dl',
			columnWidth : 192,
			gutterWidth : 10
		});
	});
	initdata();
	tophome();
	getlist();
	var countr = " <div class='detail'>在售房产: <span>" + roomcount
			+ "套</span></div>";
	if ($(".comInfor").eq(bedroom).children().length == 3)
		$(".comInfor").eq(bedroom).append(countr);
	adjustLoad();
	// 信息的初始化
	function initdata() {
		resid = $("#residence_id").val();
		bedroom = $("#bedRoom").val();
		HouseType = $("#HouseType").val();
		if (HouseType == 1)
			top_url = "/HomeList.action?getSaleInfo";
		else if (HouseType == 2)
			top_url = "/HomeList.action?getRentInfo";
		if (HouseType == 1)
			list_url = "/HomeList.action?getsalelist";
		else if (HouseType == 2)
			list_url = "/HomeList.action?getrentlist";
		currentPages = 1;
		operType = 0;
	}

	// 取得顶部的数据
	function tophome() {
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
								+ "' width='600' height='450'  alt=''/>"
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
								+ "<div class='detail'>主力户型：二居(94㎡) 二居(82㎡) 四居(141㎡) </div>"
								+ "</div>" + "<div class='comPrice'>";
						if (HouseType == 1)
							title = title
									+ "<div class='price'>￥"
									+ e.bean.unitPriceall
									+ "/平<span>&nbsp;&nbsp;(均价)&nbsp;&nbsp;</span></div>";
						else if (HouseType == 2)
							title = title
									+ "<div class='price'>---<span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
						title = title
								+ "<a class='curve round' href='#'>查看历史价格</a>"
								+ "</div> </div>";
						$("#comNames").append(title);

						if ((HouseType == 1&&e.bean.totalPrice1>0)||(HouseType == 2&&e.bean.rentalPrice1>0)) {
							
							
							// 顶部的居室信息
							var content = "<div class='communityInfor clearfix'>"
									+ "<div class='comPic'>" + "<img src='"
									+ e.bean.defaultPic
									+ "' width='600' height='450'  alt=''/>"
									+ "</div>" + "<div class='comInfor'>"
									+ " <h3><a href='" + e.bean.defaultPic + "'>"
									+ 1 + "居(" + e.bean.residenceName
									+ ")</a></h3>";
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
										+ " <div class='price'>￥"
										+ e.bean.unitPrice1
										+ "/平<span>&nbsp;&nbsp;(均价)&nbsp;&nbsp;</span></div>";
							else if (HouseType == 2)
								content = content
										+ " <div class='price'>---<span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
							content = content
									+ "<a class='curve round' href='#'>查看价格曲线</a>"
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
									+ "' width='600' height='450'  alt=''/>"
									+ "</div>" + "<div class='comInfor'>"
									+ " <h3><a href='" + e.bean.defaultPic + "'>"
									+ 1 + "居(" + e.bean.residenceName
									+ ")</a></h3>";
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
										+ " <div class='price'>￥"
										+ e.bean.unitPrice2
										+ "/平<span>&nbsp;&nbsp;(均价)&nbsp;&nbsp;</span></div>";
							else if (HouseType == 2)
								content = content
										+ " <div class='price'>---<span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
							content = content
									+ "<a class='curve round' href='#'>查看价格曲线</a>"
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
									+ "' width='600' height='450'  alt=''/>"
									+ "</div>" + "<div class='comInfor'>"
									+ " <h3><a href='" + e.bean.defaultPic + "'>"
									+ 1 + "居(" + e.bean.residenceName
									+ ")</a></h3>";
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
										+ " <div class='price'>￥"
										+ e.bean.unitPrice3
										+ "/平<span>&nbsp;&nbsp;(均价)&nbsp;&nbsp;</span></div>";
							else if (HouseType == 2)
								content = content
										+ " <div class='price'>---<span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
							content = content
									+ "<a class='curve round' href='#'>查看价格曲线</a>"
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
									+ "' width='600' height='450'  alt=''/>"
									+ "</div>" + "<div class='comInfor'>"
									+ " <h3><a href='" + e.bean.defaultPic + "'>"
									+ 1 + "居(" + e.bean.residenceName
									+ ")</a></h3>";
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
										+ " <div class='price'>￥"
										+ e.bean.unitPrice4
										+ "/平<span>&nbsp;&nbsp;(均价)&nbsp;&nbsp;</span></div>";
							else if (HouseType == 2)
								content = content
										+ " <div class='price'>---<span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
							content = content
									+ "<a class='curve round' href='#'>查看价格曲线</a>"
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
									+ "' width='600' height='450'  alt=''/>"
									+ "</div>" + "<div class='comInfor'>"
									+ " <h3><a href='" + e.bean.defaultPic + "'>"
									+ 1 + "居(" + e.bean.residenceName
									+ ")</a></h3>";
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
										+ " <div class='price'>￥"
										+ e.bean.unitPrice5
										+ "/平<span>&nbsp;&nbsp;(均价)&nbsp;&nbsp;</span></div>";
							else if (HouseType == 2)
								content = content
										+ " <div class='price'>---<span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
							content = content
									+ "<a class='curve round' href='#'>查看价格曲线</a>"
									+ "</div></div>";
							$("#comNames").append(content);
							// 将户型加入到数组中
							roomtype.push(5);

						}

					

						// 添加顶部小区居室的统计信息
						var comMenu = " <div class='comMenu clearfix'><ul class='clearfix' id='comMenu'> </ul></div>";
						$("#comNames").append(comMenu);
						$("#comMenu").append('<li class="on">全部</li>');
						for ( var i = 0; i < roomtype.length; i++) {
							if (i == 4) {
								var type = ' <li>' + roomtype[i] + '+居</li>';
								$("#comMenu").append(type);
							} else {
								var type = ' <li>' + roomtype[i] + '居</li>';
								$("#comMenu").append(type);
							}
						}// for
						$("#comMenu li").eq(bedroom).addClass("on").siblings()
								.removeClass("on");
						$(".communityInfor").eq(bedroom).show().siblings(
								".communityInfor").hide();

					}// success

				});// ajax()

	}// tophome

	// 取得瀑布流的信息,operType==1时初始化瀑布流，operType==2向瀑布流中追加元素。
	function getlist() {
		if (bedroom == '全')
			bedroom = 0;
		if (operType == 1)
			$("#roomBox").empty();
		$
				.ajax({
					dataType : "json",
					url : list_url,
					async : false,
					data : {
						residence_id : resid,
						currentPage : currentPages,
						bedRoom : bedroom,
					},
					success : function(e) { // 统计居室个数
						if (operType == 1 || operType == 0) {
							roomcount = e.size;
							adjustGoTop();
						}
						// 统计总页数
						if (operType == 1 || operType == 0)
							totalPage = Math.ceil(e.size / 10);
						var content = "";
						if (roomcount > 0) {
							$
									.each(
											e.beans,
											function(i, bean) {
												if (HouseType == 1) {
													if (bean.title === undefined)
														var title = '';
													else
														title = " ( "
																+ bean.title
																+ " )";

													content = content
															+ "<dl id='"
															+ id_index
															+ "'>"
															+ "<dt><img src='"
															+ bean.default_pic
															+ "' width='600' height='450'  alt=''/></dt>"
															+ "<dd class='price'>"
															+ bean.total_price
															+ "万/"
															+ bean.floor_area
															+ "平</dd>"
															+ "<dd class='floor'>"
															+ bean.slogan
															+ "</dd>"
															+ "<a href='#' class='saler'>"
															+ bean.contact
															+ title + "</a>"
															+ "</dl>";
												}// if(HouseType==1)
												else if (HouseType == 2) {
													content = content
															+ "<dl id='"
															+ id_index
															+ "'>"
															+ "<dt><img src='"
															+ bean.default_pic
															+ "' width='600' height='450'  alt=''/></dt>"
															+ "<dd class='price'>"
															+ bean.rental_price
															+ "元/"
															+ bean.rental_area
															+ "平</dd>"
															+ "<dd class='floor'>"
															+ bean.slogan
															+ "</dd>"
															+ "<a href='#' class='saler'>"
															+ bean.contact
															+ "</a>" + "</dl>";
												}// else if(HouseType==2)
												number = number + 1;
												list_urls.push(bean.url);
												id_index = id_index + 1;
											}// function(i,bean)
									);// each
						}
						if (content.length > 0)
							reloadmasonry(content, number);
						/* appendmasonry(content,number); */
					}// success
				});// ajax()
	}// getlist()

	// 重置瀑布流
	function reloadmasonry(content, count) {
		var $boxes = $(content);
		number = 0;
		if (operType == 2) {
			$boxes.imagesLoaded(function() {
				$container.append($boxes).masonry('appended', $boxes,
						addClick(count));

			});
		}
		if (operType == 0 || operType == 1) {
			$boxes.imagesLoaded(function() {
				$container.prepend($boxes).masonry('reload', addClick(count));

			});
		}

	}

	function addClick(count) {
		for ( var i = 0; i < count; i++) {
			$("#" + (id_index - count + i) + "").bind('click', function() {
				var id = $(this).attr('id');

				window.location.href = list_urls[id];
				bindforward('home', list_urls[id]);

			});
		}
		;

	}

	// 最后一页的时候隐藏继续加载的按钮，否则如果按钮被隐藏则使它显示出来
	function adjustLoad() {
		if (currentPages == totalPage)
			$("#loadMore").hide();
		else if (currentPages < totalPage && $("#loadMore").is(":hidden"))
			$("#loadMore").show();

	}
	// 如果记录数小于4则隐藏'到顶部'按钮
	function adjustGoTop() {
		if (roomcount < 4)
			$("#goTop").hide();
		else if (roomcount >= 4 && $("#goTop").is(":hidden"))
			$("#goTop").show();

	}

	$("#comMenu li").click(
			function() {
				$(this).addClass("on").siblings().removeClass("on");
				$(".communityInfor").eq($(this).index()).show().siblings(
						".communityInfor").hide();
				// 改变户型，用于瀑布流操作
				bedroom = $(this).text().substring(0, 1);
				operType = 1;
				currentPages = 1;
				getlist();
				adjustLoad();
				var countr = " <div class='detail'>在售房产: <span>" + roomcount
						+ "套</span></div>";

				if ($(".comInfor").eq($(this).index()).children().length == 3)
					$(".comInfor").eq($(this).index()).append(countr);

			});

	// 点击加载更多时，翻页，触发getlist()函数向瀑布流中添加元素
	$("#loadMore").click(function() {

		if (currentPages < totalPage) {
			currentPages = currentPages + 1;
			adjustLoad();
			operType = 2;
			getlist();

		}

	});

});