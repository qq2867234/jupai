var listIds=[];
var listZids=[];
var listPics=[];
var listSlogan=[];
var bedRooms=[];
var bathRooms=[];
var floorAreas=[];
var prices=[];
var listUrls=[];

var price_categorys=[];
var price_vaules=[];
var min_price;
var max_price;
var median_price;
//价格分类


var chart_price;

$("#AreaSelect").empty();


function clearListData() {
	 listIds=[];
	 listZids=[];
	 listPics=[];
	 listSlogan=[];
	 bedRooms=[];
	 bathRooms=[];
	 floorAreas=[];
	 prices=[];
	 listUrls=[];
}
function readyListData(listType, price, bedRoom, residenceId)
{	clearListData();
	$.ajaxSettings.async = false;  
	$.getJSON("/Project.action?getResidenceListInfo",{listType:listType, price:price, bedRoom:bedRoom, residenceId:residenceId},function(e){
		if(listType == 1) {
			if(e.sales.length <= 0) {
				$("#fillData").remove();
				return false;
			}
		} else if(listType == 2) {
			if(e.rentals.length <= 0) {
				$("#fillData").remove();
				return false;
			}
		}
		if(listType == 1) {
			$.each(e.sales, function(i,item) {
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
		} else if(listType == 2) {
			$.each(e.rentals, function(i,item) {
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
function clearDiv() {
	$("#a1").empty();
	$("#a2").empty();
	$("#a3").empty();
	$("#a4").empty();
}
$(function(){
	$("#basicInfor .bids").text("我要询价");
	$("#oneRoom").click(function() {
		clearDiv();
		getPictrueData(1);
		$("#roomChart").children().hide();
		$("#a1").show();
		$("#a1").children().show();
		$("#a2").show();
		$("#a2").children().show();
		$("#a3").show();
		$("#a3").children().show();
		$("#a4").show();
		$("#a4").children().show();
	});
	$("#twoRoom").click(function() {
		clearDiv();
		getPictrueData(2);
		$("#a1").show();
		$("#a1").children().show();
		$("#a2").show();
		$("#a2").children().show();
		$("#a3").show();
		$("#a3").children().show();
		$("#a4").show();
		$("#a4").children().show();
	});
	$("#threeRoom").click(function() {
		clearDiv();
		getPictrueData(3);
		$("#a1").show();
		$("#a1").children().show();
		$("#a2").show();
		$("#a2").children().show();
		$("#a3").show();
		$("#a3").children().show();
		$("#a4").show();
		$("#a4").children().show();
	});
	$("#fourRoom").click(function() {
		clearDiv();
		getPictrueData(4);
		$("#a1").show();
		$("#a1").children().show();
		$("#a2").show();
		$("#a2").children().show();
		$("#a3").show();
		$("#a3").children().show();
		$("#a4").show();
		$("#a4").children().show();
	});
	$("#fiveRoom").click(function() {
		clearDiv();
		getPictrueData(5);
		$("#a1").show();
		$("#a1").children().show();
		$("#a2").show();
		$("#a2").children().show();
		$("#a3").show();
		$("#a3").children().show();
		$("#a4").show();
		$("#a4").children().show();
	});
	$("#oneRoom").click();
	var querys=[];
	var Details=[];
	querys = $.cookie("listInfo");
	if(querys != null) {
		Details=querys.split("_");
		var listType = Details[0];
		var price = Details[1];
		var bedRoom = Details[2];
		var residenceId = Details[3];
		if(price == "") {
			price = 99999;
		}
		if(bedRoom == "") {
			bedRoom = 0;
		}
		var table=new Array("零","一","二","三","四","五","六","七","八","九");
		readyListData(listType, price, bedRoom, residenceId);
		for(var i=0;i<listIds.length;i++) {
			if(listType == 1) {
				$("#fillData").append("<dl id=\""+listIds[i]+"\" class=\"house margin10 ssss0\"><dt><a class=\"rentalPic0\"><img src=\""+listPics[i]+"\" width=\"600\" height=\"450\"  alt=\"\"/></a></dt>" +
						"<dd title=\""+listSlogan[i]+"\">"+listSlogan[i]+"</dd>" +
						"<dd>"+table[bedRooms[i]]+"室"+table[bathRooms[i]]+"卫,"+floorAreas[i]+"平米</dd><dd>"+prices[i]+"万元</dd></dl>");
			} else if(listType == 2) {
				$("#fillData").append("<dl id=\""+listIds[i]+"\" class=\"house margin10 ssss0\"><dt><a class=\"rentalPic0\"><img src=\""+listPics[i]+"\" width=\"600\" height=\"450\"  alt=\"\"/></a></dt>" +
						"<dd title=\""+listSlogan[i]+"\">"+listSlogan[i]+"</dd>" +
						"<dd>"+table[bedRooms[i]]+"室"+table[bathRooms[i]]+"卫,"+floorAreas[i]+"平米</dd><dd>"+prices[i]+"元/月</dd></dl>");
			}
			 $("#" + listIds[i]).bind("click",function(){
				 if(listUrls[this.id]!=null&&listUrls[this.id]!=undefined)
					window.location.href=listUrls[this.id];
			 });
			
		}
//		$.getJSON("/Project.action?getResidenceListInfo",{listType:listType, price:price, bedRoom:bedRoom, residenceId:residenceId},function(e){
//			if(listType == 1) {
//				if(e.sales.length <= 0) {
//					$("#fillData").remove();
//					return false;
//				}
//			} else if(listType == 2) {
//				if(e.rentals.length <= 0) {
//					$("#fillData").remove();
//					return false;
//				}
//			}
//			$("#fillData").append("<h4>根据搜索条件得到的结果</h4>");
//			if(listType == 1) {
//				$.each(e.sales, function(i,item) {
//					$("#fillData").append("<dl class=\"house margin10 ssss0\"><dt><a class=\"rentalPic0\"><img src=\""+item.defaultPic+"\" width=\"600\" height=\"450\"  alt=\"\"/></a></dt>" +
//							"<dd title=\""+item.slogan+"\">"+item.slogan+"</dd>" +
//									"<dd>"+table[item.bedRoom]+"室"+table[item.bathRoom]+"卫,"+item.floorArea+"平米</dd><dd>"+item.totalPrice+"万元</dd></dl>");
//				});
//			} else if(listType == 2) {
//				$.each(e.rentals, function(i,item) {
//					$("#fillData").append("<dl class=\"house margin10 ssss0\"><dt><a class=\"rentalPic0\"><img src=\""+item.defaultPic+"\" width=\"600\" height=\"450\"  alt=\"\"/></a></dt>" +
//							"<dd title=\""+item.slogan+"\">"+item.slogan+"</dd>" +
//									"<dd>"+table[item.bedRoom]+"室"+table[item.bathRoom]+"卫,"+item.floorArea+"平米</dd><dd>"+item.rentalPrice+"元/月</dd></dl>");
//				});
//			}
//		  });
		
	} else {
		$("#fillData").remove();
	}
	$("#agentSearch").click(function() {
		alert("已通知专业人士协助您找房");
	});
	$(".titleBtn").click(function(){
		$(".searchCondition").toggle();
		if($(".searchCondition").is(":visible")&&$("#buyOrRent").val()==0)
		{
			$(".buyCondition").show();
			$(".rentCondition").hide();
		}
		else if($(".searchCondition").is(":visible")&&$("#buyOrRent").val()==1)
		{
			$(".rentCondition").show();
			$(".buyCondition").hide();
		}
		else{
			return;
		}
	});
	$("#rooms li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		switch($(this).index()){
		case 0:
			$("#roomChart").children().hide();
			$("#a1").show();
			$("#a1").children().show();
			$("#a2").show();
			$("#a2").children().show();
			$("#a3").show();
			$("#a3").children().show();
			$("#a4").show();
			$("#a4").children().show();
			break;
		case 1:
			$("#roomChart").children().hide();
			$("#a1").show();
			$("#a1").children().show();
			$("#a2").show();
			$("#a2").children().show();
			$("#a3").show();
			$("#a3").children().show();
			$("#a4").show();
			$("#a4").children().show();
			break;
		case 2:
			$("#roomChart").children().hide();
			$("#a1").show();
			$("#a1").children().show();
			$("#a2").show();
			$("#a2").children().show();
			$("#a3").show();
			$("#a3").children().show();
			$("#a4").show();
			$("#a4").children().show();
			break;
		case 3:
			$("#roomChart").children().hide();
			$("#a1").show();
			$("#a1").children().show();
			$("#a2").show();
			$("#a2").children().show();
			$("#a3").show();
			$("#a3").children().show();
			$("#a4").show();
			$("#a4").children().show();
			break;
		case 4:
			$("#roomChart").children().hide();
			$("#a1").show();
			$("#a1").children().show();
			$("#a2").show();
			$("#a2").children().show();
			$("#a3").show();
			$("#a3").children().show();
			$("#a4").show();
			$("#a4").children().show();
			break;
		}
		
	});
	$("button.msg").mouseenter(function(){
		$(this).removeClass("msg").addClass("msg2");		
		});
	$("button.msg").mouseleave(function(){
		$(this).removeClass("msg2").addClass("msg");	
		});
	$("button.msg").click(function(){
		var oChat = "<span id='sendMsg' class='round shadow'><span id='num'>还能输入40字</span><a class='closeBtn' id='sendClose'></a><textarea id='sendText' rows='1'></textarea><button type='button' class='confirmBtn round' id='sendOut'>发送</button></span>";
		$(oChat).appendTo($(this).parent());
		fnTextVerify($("#sendText"),$("#num"),40);
		$(".msg").bind("click",function(){
			$(this).parent().find("#sendMsg").toggle();
			$("#sendText").val("");
			});
		$("#sendOut").bind("click",function(){
			$(this).parent().remove();
			});
		$("#sendClose").bind("click",function(){
			$(this).parent().remove();
			});
	});
	
	$("#packUp").click(function(){
		$(".searchCondition").hide();
	});
	$(".searchCondition dd").click(function(){
		if($(this).parent().hasClass("bor"))
		{
			$(this).addClass("on")
				.siblings("input").val($(this).index())
				.end()
				.siblings("dd").removeClass("on");
			//alert($("#buyOrRent").val());
			if($("#buyOrRent").val()==1)
			{
				$(".buyCondition").show();
				$(".rentCondition").hide();
			}
			else
			{
				$(".rentCondition").show();
				$(".buyCondition").hide();
			}		
			$(this).parent().siblings().children("input").val("0")
				.siblings("dd").removeClass("on").eq(0).addClass("on");			
		}
		else
		{
			$(this).addClass("on")
				.siblings("input").val($(this).index()-1)
				.end()
				.siblings("dd").removeClass("on");
			//alert($(this).siblings("input").val());s
		}
		
	});
	
	$(".ulbox").mCustomScrollbar({
		mouseWheel:true,
		mouseWheelPixels:400,
		scrollButtons:{
			enable:true,
			scrollType:"pixels",
			scrollSpeed:20,
			scrollAmount:300,
		}
	});
//	$("ul.item").mCustomScrollbar({
//			mouseWheel:true,
//			mouseWheelPixels:200,
//			scrollButtons:{
//				enable:true,
//				scrollType:"pixels",
//				scrollSpeed:20,
//				scrollAmount:200,
//			}
//	})
//	$(".cIntro").mCustomScrollbar({
//			mouseWheel:true,
//			mouseWheelPixels:100,
//			scrollButtons:{
//				enable:true,
//				scrollType:"pixels",
//				scrollSpeed:20,
//				scrollAmount:100,
//			}
//	});
	

	showAllText($(".content.cIntro").next(),$(".content.cIntro").next().next(),$(".content.cIntro"),310);
	//showAllText($spreadBtn,$shrinkBtn,$textDiv,nHeights){
	
	
	
	var $container = $('#masonry');
	$container.imagesLoaded( function(){
	  $container.masonry({
		itemSelector : 'li',
		gutterWidth : 10,
		columnWidth: 140
	  });
	});
	
	var freq = 5000;
//	var oTime = setInterval(function(){
//		fnPicMove($("#picFlash .picsBox"),1);
//		},freq);
	$("#surround li").first().addClass("on").siblings().removeClass("on")
	$("ul.item").hide().first().show();
	showAllText($(".roomList a.spreadDiv"),$(".roomList a.shrinkDiv"),$(".roomList ul.item:visible"),300);
	$("#surround li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		$(".roomList a").hide();
		$("ul.item").css("height","auto").hide()
			.eq($(this).index()).show();
		showAllText($(".roomList a.spreadDiv"),$(".roomList a.shrinkDiv"),$(".roomList ul.item:visible"),300);
		});
	$("#picFlash .leftArr").click(function(){
		clearInterval(oTime);
		
		fnPicMove($("#picFlash .picsBox"),-1);
		
		oTime = setInterval(function(){
			fnPicMove($("#picFlash .picsBox"),1);
			},freq);
		});
		
	$("#picFlash .rightArr").click(function(){
		clearInterval(oTime);
		fnPicMove($("#picFlash .picsBox"),1);
		oTime = setInterval(function(){
			fnPicMove($("#picFlash .picsBox"),1);
			},freq);
		});
	
//	var ImgsTObj = $('.EnlargePhoto');//class=EnlargePhoto的都是需要放大的图像
//	if(ImgsTObj){
//	  $.each(ImgsTObj,function(){
//		  $(this).click(function(){
//			  var currImg = $(this);
//			  CoverLayer(1);
//			  var TempContainer = $('<div class=TempContainer></div>');
//			  with(TempContainer){
//				  appendTo("body");
//				  css('top',currImg.offset().top);
//				  html('<img border=0 src=' + currImg.attr('src') + '>');
//			  }
//			  TempContainer.click(function(){
//				  $(this).remove();
//				  CoverLayer(0);
//			  });
//		  });
//	  });
//	}
//	else{
//		return false;
//	}
	
//	$("div.holder").jPages({
//        containerID : "itemContainer",
//    });
	
	
	$("#pics").width($("#pics").children("li").length*87);
	
	$(".picflash .leftArr").click(function(){
		if($("#pics").position().left==0)
		{
			return;
		}
		else
		{
			$("#pics").css("left",$('#pics').position().left+87+"px");
			$(".picflash .leftArr").css("opacity","1");
			if($("#pics").position().left==0)
			{
				$(".picflash .leftArr").css("opacity","0.3");
			}
			if(!($("#pics").position().left==$("#pics").parent().width()-$("#pics").width()))
			{
				$(".picflash .rightArr").css("opacity","1");
			}
		}
		})
	$(".picflash .rightArr").click(function(){
		if($("#pics").position().left==$("#pics").parent().width()-$("#pics").width())
		{
			return;
		}
		else
		{
			$("#pics").css("left",$('#pics').position().left-87+"px");
			$(".picflash .rightArr").css("opacity","1");
			if($("#pics").position().left==$("#pics").parent().width()-$("#pics").width())
			{
				$(".picflash .rightArr").css("opacity","0.3");
			}
			if(!$("#pics").position().left==0)
			{
				$(".picflash .leftArr").css("opacity","1");
			}
		}
		})

	var oTime = setInterval(TimeMove,3000);
	var oTimeLi=1;
	var oLiC = $("#news li").length;
	$("#news").mouseenter(function(){
		clearInterval(oTime);		
		});
	$("#news").mouseleave(function(){
		oTime = setInterval(TimeMove,3000);
		});
		
	function TimeMove(){
		if(oTimeLi==0)
		{
			$("#news li").eq(oLiC-1).slideUp(1000);
		}
		else
		{
			$("#news li").eq(oTimeLi-1).slideUp(1000);
		}
		$("#news li").eq(oTimeLi).slideDown(1000);	
		oTimeLi++;	
		oTimeLi%=$("#news li").length;
	}
})

	
	
	function fnPicMove(showBox,picStep){
		var myIndex;
		for(var i=0; i<$(showBox).length;i++)
		{
			if($(showBox).eq(i).is(":visible"))
			{
				myIndex = i;
				break;
			}
		}
		if(myIndex+picStep>$(showBox).length-1)
		{
			 $(showBox).eq(0).fadeIn(1400);
			 $(showBox).eq(myIndex).fadeOut(700);
		}
		else
		{
			$(showBox).eq(myIndex+picStep).fadeIn(1400);
			$(showBox).eq(myIndex).fadeOut(700);	
		}
	}

		function getPictrueData(bed_room){
			if(bed_room == 1) {
				for(var i=1;i<=4;i++){
					price_categorys =[]; 
					price_vaules =[];
					if(i==1){
						price_categorys = z1Ac 
						price_vaules = z1Ap;
						min_price=z1Ae[0];
						max_price=z1Ae[1];
						median_price=z1Ae[2];
						drawPictrue(price_categorys,price_vaules,i)
						//
					}
	/*				else if(i==2){
						price_categorys = z1Bc 
						price_vaules = z1Bp;
						min_price=z1Be[0];
						max_price=z1Be[1];
						median_price=z1Be[2];
						drawPictrue(price_categorys,price_vaules,i)
					}
					else if(i==3){
						price_categorys = z1Cc 
						price_vaules = z1Cp;
						min_price=z1Ce[0];
						max_price=z1Ce[1];
						median_price=z1Ce[2];
						drawPictrue(price_categorys,price_vaules,i)
					}
					else if(i==4){
						price_categorys = z1Dc 
						price_vaules = z1Dp;
						min_price=z1De[0];
						max_price=z1De[1];
						median_price=z1De[2];
						drawPictrue(price_categorys,price_vaules,i)
					}*/
				}
			} else if(bed_room == 2) {
				for(var i=1;i<=4;i++){
					price_categorys =[]; 
					price_vaules =[];
					if(i==1){
						price_categorys = z2Ac 
						price_vaules = z2Ap;
						min_price=z2Ae[0];
						max_price=z2Ae[1];
						median_price=z2Ae[2];
						drawPictrue(price_categorys,price_vaules,i)
						//
					}
					/*else if(i==2){
						price_categorys = z2Bc 
						price_vaules = z2Bp;
						min_price=z2Be[0];
						max_price=z2Be[1];
						median_price=z2Be[2];
						drawPictrue(price_categorys,price_vaules,i)
					}
					else if(i==3){
						price_categorys = z2Cc 
						price_vaules = z2Cp;
						min_price=z2Ce[0];
						max_price=z2Ce[1];
						median_price=z2Ce[2];
						drawPictrue(price_categorys,price_vaules,i)
					}
					else if(i==4){
						price_categorys = z2Dc 
						price_vaules = z2Dp;
						min_price=z2De[0];
						max_price=z2De[1];
						median_price=z2De[2];
						drawPictrue(price_categorys,price_vaules,i)
					}*/
				}
			} else if(bed_room == 3) {
				for(var i=1;i<=4;i++){
					price_categorys =[]; 
					price_vaules =[];
					if(i==1){
						price_categorys = z3Ac 
						price_vaules = z3Ap;
						min_price=z3Ae[0];
						max_price=z3Ae[1];
						median_price=z3Ae[2];
						drawPictrue(price_categorys,price_vaules,i)
						//
					}
/*					else if(i==2){
						price_categorys = z3Bc 
						price_vaules = z3Bp;
						min_price=z3Be[0];
						max_price=z3Be[1];
						median_price=z3Be[2];
						drawPictrue(price_categorys,price_vaules,i)
					}
					else if(i==3){
						price_categorys = z3Cc 
						price_vaules = z3Cp;
						min_price=z3Ce[0];
						max_price=z3Ce[1];
						median_price=z3Ce[2];
						drawPictrue(price_categorys,price_vaules,i)
					}
					else if(i==4){
						price_categorys = z3Dc 
						price_vaules = z3Dp;
						min_price=z3De[0];
						max_price=z3De[1];
						median_price=z3De[2];
						drawPictrue(price_categorys,price_vaules,i)
					}*/
				}
			} else if(bed_room == 4) {
				for(var i=1;i<=4;i++){
					price_categorys =[]; 
					price_vaules =[];
					if(i==1){
						price_categorys = z4Ac 
						price_vaules = z4Ap;
						min_price=z4Ae[0];
						max_price=z4Ae[1];
						median_price=z4Ae[2];
						drawPictrue(price_categorys,price_vaules,i)
						//
					}
					/*else if(i==2){
						price_categorys = z4Bc 
						price_vaules = z4Bp;
						min_price=z4Be[0];
						max_price=z4Be[1];
						median_price=z4Be[2];
						drawPictrue(price_categorys,price_vaules,i)
					}
					else if(i==3){
						price_categorys = z4Cc 
						price_vaules = z4Cp;
						min_price=z4Ce[0];
						max_price=z4Ce[1];
						median_price=z4Ce[2];
						drawPictrue(price_categorys,price_vaules,i)
					}
					else if(i==4){
						price_categorys = z4Dc 
						price_vaules = z4Dp;
						min_price=z4De[0];
						max_price=z4De[1];
						median_price=z4De[2];
						drawPictrue(price_categorys,price_vaules,i)
					}*/
				}
			} else if(bed_room == 5) {
				for(var i=1;i<=4;i++){
					price_categorys =[]; 
					price_vaules =[];
					if(i==1){
						price_categorys = z5Ac 
						price_vaules = z5Ap;
						min_price=z5Ae[0];
						max_price=z5Ae[1];
						median_price=z5Ae[2];
						drawPictrue(price_categorys,price_vaules,i)
						//
					}
	/*				else if(i==2){
						price_categorys = z5Bc 
						price_vaules = z5Bp;
						min_price=z5Be[0];
						max_price=z5Be[1];
						median_price=z5Be[2];
						drawPictrue(price_categorys,price_vaules,i)
					}
					else if(i==3){
						price_categorys = z5Cc 
						price_vaules = z5Cp;
						min_price=z5Ce[0];
						max_price=z5Ce[1];
						median_price=z5Ce[2];
						drawPictrue(price_categorys,price_vaules,i)
					}
					else if(i==4){
						price_categorys = z5Dc 
						price_vaules = z5Dp;
						min_price=z5De[0];
						max_price=z5De[1];
						median_price=z5De[2];
						drawPictrue(price_categorys,price_vaules,i)
					}*/
				}
			}
		}
		
		
		function drawPictrue(price_categorys,price_vaules,order)
		{
			if(price_categorys.length>0&&price_vaules.length>0){
			chart_price ={
					chart:{                                                       
		            type: 'column',
		            width: 450,
		            height: 250
		        },                                                                 
		        title: {                                                           
		            text: null                    
		        },                                                                 
		        subtitle: {                                                        
		            text: null                                  
		        },                                                                 
		        xAxis: {                                                           
		        	 categories: price_vaules,		        	 
		            title: {                                                       
		                text: '价格(万元)',                                               
		            } ,  
		            showEmpty: false,
		            tickmarkPlacement: 'on',
		            tickLength: 0,
		          
		            labels:{
		            	rotation:-90,
		            	formatter: function() {
		            		if(String(this.value).replace(/\D/g,"")==min_price||String(this.value).replace(/\D/g,"")== max_price||String(this.value).replace(/\D/g,"")==median_price)return this.value;
		                	else return;		                
		                    },
		                    style: {
			                      fontSize: '9px',
			                      fontFamily: 'Verdana, sans-serif',			                      
			                  },
		            },      
		        },                                                                 
		        yAxis: {                                                           
		          
		            title: {                                                       
		                text: '比例(%)',                                                                      
		            },                                                             
		            labels: {                                                      
		                overflow: 'justify' ,
		                formatter: function() {
		                    return this.value +'%';}
		                	
		            }                                                              
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
		        			/* if(this.y==0)return
		        			 else return this.y+'%';*/
		        			 return;
		        			 },
		        	 },
		            	        pointPadding: 0.5,
		            	        borderWidth: 0,
		            	        pointWidth: 3,
		            	       
		                      
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
		            data: price_categorys ,
		          
		 
		        }]  
		        
		    };//chart_price

			
			if(order==1){
				$("#a1").highcharts(chart_price);
			}
	/*		if(order==2){
				$("#a2").highcharts(chart_price);
			}
			if(order==3){
				$("#a3").highcharts(chart_price);
			}
			if(order==4){
				$("#a4").highcharts(chart_price);
			}*/
		}
		}
			
		


