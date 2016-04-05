var listIds = [];
var listZids = [];
var listPics = [];
var listSlogan = [];
var bedRooms = [];
var bathRooms = [];
var floorAreas = [];
var prices = [];
var listUrls = [];


var room_index;

// 价格分类

var chart_price;

//小区下经纪人信息
var zids = [];
var imageurls = [];
var brokerageNames = [];
var contacts = [];
var certTiles = [];
var likeses = [];
var urls = [];

function clearListData() {
	listIds = [];
	listZids = [];
	listPics = [];
	listSlogan = [];
	bedRooms = [];
	bathRooms = [];
	floorAreas = [];
	prices = [];
	listUrls = [];
}

function clearBrokersData() {
	zids = [];
	imageurls = [];
	brokerageNames = [];
	contacts = [];
	certTiles = [];
	likeses = [];
	urls =[];
}

//准备该小区下的经纪人数据

function readyBrokersData(residenceId) {

	clearBrokersData();
	$.ajaxSettings.async = false;
	$.getJSON("/SaleHomeInput.action?showBrokers", {
		residenceId : residenceId
	}, function(data) {
		if(data.status == "y") {
			$.each(data.brokers, function(index, element) {
				zids.push(element.zid);
				imageurls.push(element.imageurl);
				brokerageNames.push(element.brokerage_name);
				contacts.push(element.name);
				certTiles.push(element.cert);
				likeses.push(element.likes);
				urls.push(element.url);
			});
		}
	});

}

//生成小区经纪人数据
function generateBrokersData() {
	readyBrokersData(residenceId);
	if(zids.length > 0) {
		for(var i = 0; i < zids.length; i++) {
			var part1 = "<dl class='agent shadowAgent margin10 clearfix'><dt><a class='HeadPic' href='" + urls[i] + "'><img class='ident' src='" + brokerListPhtoto + imageurls[i] + "' width='40' height='40' alt='' /></a></dt>" +
			"<dd class='ident clearfix'>" + contacts[i] + "</dd>" +
			"<dd title='" + brokerageNames[i] + "'>"+ brokerageNames[i] +"</dd>" +
			"<dd>评价:"+ likeses[i] +"</dd>" +
			"<span class='sendMsg round shadow'> <span id='num'>还能输入40字</span>" +
			"<a id='sendClose' class='closeBtn'></a><textarea id='sendText' rows='1'></textarea>" +
			"<button id='sendOut' class='confirmBtn round' type='button'>发送</button></span></dl>";
			$("#brokers").append(part1);
		}
		
	}
}

function readyListData(listType, price, bedRoom, residenceId) {
	clearListData();
	$.ajaxSettings.async = false;
	$.getJSON("/Project.action?getResidenceListInfo", {
		listType : listType,
		price : price,
		bedRoom : bedRoom,
		residenceId : residenceId
	}, function(e) {
		if (listType == 1) {
			if (e.sales.length <= 0) {
				$("#fillData").remove();
				return false;
			}
		} else if (listType == 2) {
			if (e.rentals.length <= 0) {
				$("#fillData").remove();
				return false;
			}
		}
		if (listType == 1) {
			$.each(e.sales, function(i, item) {
				listIds.push(i);
				listZids.push(item.listerZid);
				listPics.push(item.defaultPic);
				listSlogan.push(item.slogan);
				bedRooms.push(item.bedRoom);
				bathRooms.push(item.bathRoom);
				floorAreas.push(item.floorArea);
				prices.push(item.totalPrice);
				listUrls.push(item.url);
			});
		} else if (listType == 2) {
			$.each(e.rentals, function(i, item) {
				listIds.push(i);
				listZids.push(item.listerZid);
				listPics.push(item.defaultPic);
				listSlogan.push(item.slogan);
				bedRooms.push(item.bedRoom);
				bathRooms.push(item.bathRoom);
				floorAreas.push(item.floorArea);
				prices.push(item.rentalPrice);
				listUrls.push(item.url);
			});
		}
	});
}
$(function() {
	//generateBrokersData();
	//initRoomSelect();

	$("#rooms li").click(function() {
		$(this).addClass("on").siblings().removeClass("on");
	});
	$("#oneRoom").click();
	var querys = [];
	var Details = [];
	querys = $.cookie("listInfo");
	if (querys != null) {
		Details = querys.split("_");
		var listType = Details[0];
		var price = Details[1];
		var bedRoom = Details[2];
		var residenceId = Details[3];
		if (price == "") {
			price = 99999;
		}
		if (bedRoom == "") {
			bedRoom = 0;
		}
		var table = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
		readyListData(listType, price, bedRoom, residenceId);
		for ( var i = 0; i < listIds.length; i++) {
			if (listType == 1) {
				$("#fillData")
						.append(
								"<dl id=\""
										+ listIds[i]
										+ "\" class=\"house margin10 ssss0\"><dt><a class=\"rentalPic0\"><img src=\""
										+ listPics[i]
										+ "\" width=\"600\" height=\"450\"  alt=\"\"/></a></dt>"
										+ "<dd title=\"" + listSlogan[i]
										+ "\">" + listSlogan[i] + "</dd>"
										+ "<dd>" + table[bedRooms[i]] + "室"
										+ table[bathRooms[i]] + "卫,"
										+ floorAreas[i] + "平米</dd><dd>"
										+ prices[i] + "万元</dd></dl>");
			} else if (listType == 2) {
				$("#fillData")
						.append(
								"<dl id=\""
										+ listIds[i]
										+ "\" class=\"house margin10 ssss0\"><dt><a class=\"rentalPic0\"><img src=\""
										+ listPics[i]
										+ "\" width=\"600\" height=\"450\"  alt=\"\"/></a></dt>"
										+ "<dd title=\"" + listSlogan[i]
										+ "\">" + listSlogan[i] + "</dd>"
										+ "<dd>" + table[bedRooms[i]] + "室"
										+ table[bathRooms[i]] + "卫,"
										+ floorAreas[i] + "平米</dd><dd>"
										+ prices[i] + "元/月</dd></dl>");
			}
			$("#" + listIds[i]).bind(
					"click",
					function() {
						if (listUrls[this.id] != null
								&& listUrls[this.id] != undefined)
							window.location.href = listUrls[this.id];
					});

		}
		// $.getJSON("/Project.action?getResidenceListInfo",{listType:listType,
		// price:price, bedRoom:bedRoom, residenceId:residenceId},function(e){
		// if(listType == 1) {
		// if(e.sales.length <= 0) {
		// $("#fillData").remove();
		// return false;
		// }
		// } else if(listType == 2) {
		// if(e.rentals.length <= 0) {
		// $("#fillData").remove();
		// return false;
		// }
		// }
		// $("#fillData").append("<h4>根据搜索条件得到的结果</h4>");
		// if(listType == 1) {
		// $.each(e.sales, function(i,item) {
		// $("#fillData").append("<dl class=\"house margin10 ssss0\"><dt><a
		// class=\"rentalPic0\"><img src=\""+item.defaultPic+"\" width=\"600\"
		// height=\"450\" alt=\"\"/></a></dt>" +
		// "<dd title=\""+item.slogan+"\">"+item.slogan+"</dd>" +
		// "<dd>"+table[item.bedRoom]+"室"+table[item.bathRoom]+"卫,"+item.floorArea+"平米</dd><dd>"+item.totalPrice+"万元</dd></dl>");
		// });
		// } else if(listType == 2) {
		// $.each(e.rentals, function(i,item) {
		// $("#fillData").append("<dl class=\"house margin10 ssss0\"><dt><a
		// class=\"rentalPic0\"><img src=\""+item.defaultPic+"\" width=\"600\"
		// height=\"450\" alt=\"\"/></a></dt>" +
		// "<dd title=\""+item.slogan+"\">"+item.slogan+"</dd>" +
		// "<dd>"+table[item.bedRoom]+"室"+table[item.bathRoom]+"卫,"+item.floorArea+"平米</dd><dd>"+item.rentalPrice+"元/月</dd></dl>");
		// });
		// }
		// });

	} else {
		$("#fillData").remove();
	}
	$("#agentSearch").click(function() {
		alert("已通知专业人士协助您找房");
	});
	$(".titleBtn").click(
			function() {
				$(".searchCondition").toggle();
				if ($(".searchCondition").is(":visible")
						&& $("#buyOrRent").val() == 0) {
					$(".buyCondition").show();
					$(".rentCondition").hide();
				} else if ($(".searchCondition").is(":visible")
						&& $("#buyOrRent").val() == 1) {
					$(".rentCondition").show();
					$(".buyCondition").hide();
				} else {
					return;
				}
			});
	$("#rooms li").click(function() {
		$(this).addClass("on").siblings().removeClass("on");
		switch ($(this).index()) {
		case 0:
			$("#roomChart").children().hide();
			$("#a1").show();
			$("#a1").children().show();
			$("#a2").show();
			$("#a2").children().show();
			break;
		case 1:
			$("#roomChart").children().hide();
			$("#b1").show();
			$("#b2").show();
			$("#b1").children().show();
			$("#b2").children().show();
			break;
		case 2:
			$("#roomChart").children().hide();
			$("#c1").show();
			$("#c2").show();
			$("#c1").children().show();
			$("#c2").children().show();
			break;
		case 3:
			$("#roomChart").children().hide();
			$("#d1").show();
			$("#d2").show();
			$("#d1").children().show();
			$("#d2").children().show();
			break;
		case 4:
			$("#roomChart").children().hide();
			$("#e1").show();
			$("#e2").show();
			$("#e1").children().show();
			$("#e2").children().show();
			break;
		}

	});
	$("button.msg").mouseenter(function() {
		$(this).removeClass("msg").addClass("msg2");
	});
	$("button.msg").mouseleave(function() {
		$(this).removeClass("msg2").addClass("msg");
	});
	$("button.msg")
			.click(
					function() {
						var oChat = "<span id='sendMsg' class='round shadow'><span id='num'>还能输入40字</span><a class='closeBtn' id='sendClose'></a><textarea id='sendText' rows='1'></textarea><button type='button' class='confirmBtn round' id='sendOut'>发送</button></span>";
						$(oChat).appendTo($(this).parent());
						fnTextVerify($("#sendText"), $("#num"), 40);
						$(".msg").bind("click", function() {
							$(this).parent().find("#sendMsg").toggle();
							$("#sendText").val("");
						});
						$("#sendOut").bind("click", function() {
							$(this).parent().remove();
						});
						$("#sendClose").bind("click", function() {
							$(this).parent().remove();
						});
					});

	$("#packUp").click(function() {
		$(".searchCondition").hide();
	});
	$(".searchCondition dd").click(
			function() {
				if ($(this).parent().hasClass("bor")) {
					$(this).addClass("on").siblings("input").val(
							$(this).index()).end().siblings("dd").removeClass(
							"on");
					// alert($("#buyOrRent").val());
					if ($("#buyOrRent").val() == 1) {
						$(".buyCondition").show();
						$(".rentCondition").hide();
					} else {
						$(".rentCondition").show();
						$(".buyCondition").hide();
					}
					$(this).parent().siblings().children("input").val("0")
							.siblings("dd").removeClass("on").eq(0).addClass(
									"on");
				} else {
					$(this).addClass("on").siblings("input").val(
							$(this).index() - 1).end().siblings("dd")
							.removeClass("on");
					// alert($(this).siblings("input").val());s
				}

			});

	$(".ulbox").mCustomScrollbar({
		mouseWheel : true,
		mouseWheelPixels : 400,
		scrollButtons : {
			enable : true,
			scrollType : "pixels",
			scrollSpeed : 20,
			scrollAmount : 300,
		}
	});
	// $("ul.item").mCustomScrollbar({
	// mouseWheel:true,
	// mouseWheelPixels:200,
	// scrollButtons:{
	// enable:true,
	// scrollType:"pixels",
	// scrollSpeed:20,
	// scrollAmount:200,
	// }
	// })
	// $(".cIntro").mCustomScrollbar({
	// mouseWheel:true,
	// mouseWheelPixels:100,
	// scrollButtons:{
	// enable:true,
	// scrollType:"pixels",
	// scrollSpeed:20,
	// scrollAmount:100,
	// }
	// });

	showAllText($(".content.cIntro").next(),
			$(".content.cIntro").next().next(), $(".content.cIntro"), 310);
	// showAllText($spreadBtn,$shrinkBtn,$textDiv,nHeights){


	var freq = 5000;
	// var oTime = setInterval(function(){
	// fnPicMove($("#picFlash .picsBox"),1);
	// },freq);
	$("#surround li").first().addClass("on").siblings().removeClass("on")
	$("ul.item").hide().first().show();
	showAllText($(".roomList a.spreadDiv"), $(".roomList a.shrinkDiv"),
			$(".roomList ul.item:visible"), 300);
	$("#surround li").click(
			function() {
				$(this).addClass("on").siblings().removeClass("on");
				$(".roomList a").hide();
				$("ul.item").css("height", "auto").hide().eq($(this).index())
						.show();
				showAllText($(".roomList a.spreadDiv"),
						$(".roomList a.shrinkDiv"),
						$(".roomList ul.item:visible"), 300);
			});
	$("#picFlash .leftArr").click(function() {
		clearInterval(oTime);

		fnPicMove($("#picFlash .picsBox"), -1);

		oTime = setInterval(function() {
			fnPicMove($("#picFlash .picsBox"), 1);
		}, freq);
	});

	$("#picFlash .rightArr").click(function() {
		clearInterval(oTime);
		fnPicMove($("#picFlash .picsBox"), 1);
		oTime = setInterval(function() {
			fnPicMove($("#picFlash .picsBox"), 1);
		}, freq);
	});

	// var ImgsTObj = $('.EnlargePhoto');//class=EnlargePhoto的都是需要放大的图像
	// if(ImgsTObj){
	// $.each(ImgsTObj,function(){
	// $(this).click(function(){
	// var currImg = $(this);
	// CoverLayer(1);
	// var TempContainer = $('<div class=TempContainer></div>');
	// with(TempContainer){
	// appendTo("body");
	// css('top',currImg.offset().top);
	// html('<img border=0 src=' + currImg.attr('src') + '>');
	// }
	// TempContainer.click(function(){
	// $(this).remove();
	// CoverLayer(0);
	// });
	// });
	// });
	// }
	// else{
	// return false;
	// }

	// $("div.holder").jPages({
	// containerID : "itemContainer",
	// });

	$("#pics").width($("#pics").children("li").length * 87);

	$(".picflash .leftArr").click(
			function() {
				if ($("#pics").position().left == 0) {
					return;
				} else {
					$("#pics").css("left",
							$('#pics').position().left + 87 + "px");
					$(".picflash .leftArr").css("opacity", "1");
					if ($("#pics").position().left == 0) {
						$(".picflash .leftArr").css("opacity", "0.3");
					}
					if (!($("#pics").position().left == $("#pics").parent()
							.width()
							- $("#pics").width())) {
						$(".picflash .rightArr").css("opacity", "1");
					}
				}
			})
	$(".picflash .rightArr").click(
			function() {
				if ($("#pics").position().left == $("#pics").parent().width()
						- $("#pics").width()) {
					return;
				} else {
					$("#pics").css("left",
							$('#pics').position().left - 87 + "px");
					$(".picflash .rightArr").css("opacity", "1");
					if ($("#pics").position().left == $("#pics").parent()
							.width()
							- $("#pics").width()) {
						$(".picflash .rightArr").css("opacity", "0.3");
					}
					if (!$("#pics").position().left == 0) {
						$(".picflash .leftArr").css("opacity", "1");
					}
				}
			})
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

function getPictrueData(bed_room) {
	if (bed_room == 1) {
		for ( var i = 1; i <= 4; i++) {
			price_categorys = [];
			price_vaules = [];
			if (i == 1) {
				price_categorys = z1Ac
				price_vaules = z1Ap;
				drawPictrue(price_categorys, price_vaules, i)
				//
			} else if (i == 2) {
				price_categorys = z1Bc
				price_vaules = z1Bp;
				drawPictrue(price_categorys, price_vaules, i)
			} else if (i == 3) {
				price_categorys = z1Cc
				price_vaules = z1Cp;
				drawPictrue(price_categorys, price_vaules, i)
			} else if (i == 4) {
				price_categorys = z1Dc
				price_vaules = z1Dp;
				drawPictrue(price_categorys, price_vaules, i)
			}
		}
	}
}


function drawPictrue(picData) {
	var chart_area={                                           
	        chart: {                                                           
	        	type: 'areaspline',
	            width: 400,
	            height: 250,
	        },                                                                 
	        title: {                                                           
	            text: null                    
	        },                                                                 
	        subtitle: {                                                        
	            text: null                                  
	        },                                                                 
	        xAxis: {                                                           	   
	        	categories: [],
	            title: {                                                       
	                text: '价格(万元)',                                               
	            } ,  
	            showEmpty: false,
	            tickmarkPlacement: 'on',
	            tickLength: 0,
	          
	            labels:{
	            	rotation:-70,
	            	formatter: function() {
	            		if(String(this.value).substring(0,1)=='最'||String(this.value).substring(0,1)=='中')return String(this.value).substring(3).replace('万元','');
	            		else return
	                    },
	                    style: {
		                     fontSize: '10px',
		                     fontWeight: 'bold',
		                      fontFamily: 'Verdana, sans-serif',			                      
		                  },
	            },  
	        
			/*  plotBands: [{ // visualize the weekend from: 4.5, to: 4.5,
			  color: 'rgba(68, 170, 213, .2)' }]*/
			 
	            
	        },                                                                 
	        yAxis: {                                                           
	          
	            title: {                                                       
	                text: '比例(%)',                                                                      
	            },                                                             
	            labels: {                                                      
	                overflow: 'justify' ,
	                formatter: function() {
	                    return this.value +'%';}
	                	
	            } ,
	            max:100
	        },                                                                 
	        tooltip: {                                                         
	            valueSuffix: '%' ,	
	        },                                                                 
	        plotOptions: {                                                     
	            bar: {                                                         
	                dataLabels: {                                              
	                  enabled:false,
	                  formatter:function(){return this.y+'%';},
	                }
	            }  ,
	         column: {
	        	 dataLabels:{
	        		 enabled:true,
	        		 
	        		  style: {
	                      fontSize: '10px',
	                      fontFamily: 'Verdana, sans-serif',
	                      
	                  },
	        		 formatter:function(){
	        			/*
						 * if(this.y==0)return else return this.y+'%';
						 */
	        			 return;
	        			 },
	        	 },
	            	        pointPadding: 0.5,
	            	        borderWidth: 0,
	            	        pointWidth: 3,
	            	    },
	            areaspline: {
	                fillOpacity: 0.3,
	                /*color:'red',*/
	                lineWidth:1,
	                marker:{
	                	 enabled: true,
	                	 radius:2,
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
	            href:'http://www.zilens.com',
	        },                                                                 
	        series: [{                                                         
	            name: '比例',                                             
	            data: picData, 	          
	 
	        }]  
	        
	    };// chart_price
		$("#roomChart").highcharts(chart_area);
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
