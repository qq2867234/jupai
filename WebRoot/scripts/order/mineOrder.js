var cityName = "";
var changeCityFlag2 = 0;
//************************************玲姐部分  开始****************************************************************
$(function(){
	//$(".account").find("tr").eq(3).prevAll().show();
	$('.checkImg').parents('.itemInput').click(function(){
		if($(this).find('.checkInput').is(':checked')){
			$('.checkInput').prop('checked',false).attr('value','0');
			$('.checkImg').removeClass('checked');
			//alert('no');
			return;
		}
		else{
			$('.checkInput').prop('checked',true).attr('value','1');;
			$('.checkImg').addClass('checked');
			//alert('yes');
			return;
		}
	});
	$("#mBtn").click(function(){
		$(".moreInfo").show();
		$(this).parents(".divLine").hide();
		$("#lBtn").parents(".divLine").show();
		Init();
	});
	$("#lBtn").click(function(){
		$(".moreInfo").hide();
		$(this).parents(".divLine").hide();
		$("#mBtn").parents(".divLine").show();
		Init();
	});
	$(".itemInput input").focus(function(){
		$(this).addClass("onFocus");
		});
	$(".itemInput input").blur(function(){
		$(this).removeClass("onFocus");
		});
	$(".itemInput input.community").focus(function(){
		$(this).next().fadeIn(200);
		});
	$(".itemInput input.community").blur(function(){
		$(this).next().fadeOut(200);
		});
	$(".popCom li").click(function(){
		$(this).parent().prevAll('#residenceId').val($(this).attr("residenceId"));
		//$(this).parent().prev().val($(this).text()).blur();
		$(this).parent().prev().blur();
//		alert($('#residenceId').val());
		});

	$(".hMenu li").click(function(){
		$(this).siblings().removeClass("on")
			.end().addClass("on");	
		$(this).parent().next().val($(this).index());
		if($("#buildingType").val()== 1 || $("#buildingType").val()==2)
		{
		$(".floorTyTr").show();
		$(".floorTyTr2").hide();
		}
		else
		{
		$(".floorTyTr").hide();
		$(".floorTyTr2").show();
		}
		});
	$(".upload").eq(0).show().children().show().end().siblings('.upload').hide();
	$("#picUpload li").click(function(){
		$(this).siblings("li").removeClass("on")
			.end().addClass("on");
		var clickIndex = $(this).index();
		$(".upload").hide();
		$(".upload").eq(clickIndex).show();

		});
	$(".delPic").click(function(){
		$(this).parent().remove();		
		});
	
//	$("#listPage dl").click(function(e) {
//		e = window.event || e;
//		$this = $(e.srcElement || e.target);
//		if($this.is(".operate, .operate *"))
//		{
//			return;
//		}
//		else
//		{	
//			//var homeId = $(".un input[type=hidden]").val();
//			var homeId = $(this).children("input[type=hidden]").val();
//			window.location.href = "/RentalHomeController.action?goToEditRentalHomeInput&homeId=" + homeId;
//		}
//	});
	
	
	// tagChoser({
	// 	tagChosenUl: $("#tagChosen"),
	// 	tagListUl: $("#tagList"),
	// 	tagListUlBox: $("#tagSpread"),
	// 	warnSpan:$("#overstep"),
	// 	tagInput:$("#tagInput"),
	// 	tagCount:5,
	// 	tagValInput:$("#favorTag")
	// 	}); 
	
	fnTextVerify($(".contrive"),$(".contrive").next(),20);
	fnTextVerify($("#commuName"),$("#commuName").next(),32);
	fnTextVerify($("#introduction"),$("#introduction").next(),200);
/*	$(".picbox").each(function(){
		fnTextVerify($(this).children("textarea"),$(this).children(".remainder"),16);
		});*/

});
//****************************************玲姐部分  结束************************************************************


////客厅图片最大值
//var maxLiving = 6;
////卧室图片最大值
//var maxBed = 6;
////浴室图片最大值
//var maxBath = 3;
////厨房图片最大值
//var maxKitchen = 2;
////公共区域图片最大值
//var maxPublicArea = 2;
////户型图图片最大值
//var maxFloorPrint = 1;
////每个区域房已预览产图片的张数
//var livingCount = 0;
//var bedCount = 0;
//var bathCount = 0;
//var publicCount = 0;
//var floorPrintCount = 0;
//var kitchenCount = 0;
//var firstSale = 0 //0表示目前是第一次点击，第一次点击后自增
//if($.cookie("firstSale") != null && $.cookie("firstSale") != "") {
//	firstSale = $.cookie("firstSale");
//}
//表示是否是第一次点击

var orderFlag = "false";
var add;
var saveStatus = 0;//保存操作的状态 0表示失败 1表示成功
//保存选择的小区
var selectedResidenceName = "";
//修改图片评论
function editPicComment(imageId,obj) {
	$obj = $(obj);
	$.ajax({
		type:"POST",
		url:"/SaleHomeInput.action?editCommentByImageId",
		data:{imageId:imageId,imageCommet:obj.value},
		dataType:"json",
		success: function(data) {
			if(data.status == "y") {
				 //alert("评论修改成功");
			} else if(data.status == "n") {
				 alert(data.info);
			} else if(data.status == "e") {
				 alert(data.info);
                 window.location.href = "/";
			}
		}
	});
}

//删除图片
function delPic(imageId, obj) {
	var $th = $(obj);
//	var wichPic = $(obj).parent().parent().attr("id");
	$th.parent().remove();
//	if(wichPic == "publicPics") {
//		publicCount--;
//	} else if(wichPic == "floorPrintPics") {
//		floorPrintCount--;
//	} else if(wichPic == "bathPics") {
//		bathCount--;
//	} else if(wichPic == "kitchenPics") {
//		kitchenCount--;
//	} else if(wichPic == "bedPics") {
//		bedCount--;
//	} else if(wichPic == "livingPics") {
//		livingCount--;
//	}
	$.ajax({
       	url:"/SaleHomeInput.action?delHomeImageByImageId",
   		data:{imageId:imageId},
   		dataType:"json",
   		type:"POST",
   		success:function(data, status) {
   			if(data.status == "y") {
//				 alert("图片删除成功");
			} else if(data.status == "n") {
				 alert(data.info);
			} else if(data.status == "e") {
				 alert(data.info);
                window.location.href = "/";
			}
   		}
       });
}
////显示图片
//var openFile = function(event, output) {
//	if(browser == "Microsoft Internet Explorer") {
//		
//	} else {
//		var input = event.target;
//	    var reader = new FileReader();
//	    var newOutput = output;
//	    var newOutput = output;
//	    if(!/image/.test(input.files[0].type)) {
//	    	$("#picError").removeClass("Validform_right").addClass("Validform_wrong").text("文件格式不正确");
//	    	return false;
//	    }
//	    reader.onload = function(){
//	      var dataURL = reader.result;      
//	      newOutput.attr("src", dataURL);
//	      newOutput.parent().show();
//	    };
//	    reader.readAsDataURL(input.files[0]);
//	}
//    
//};
function checkPicCommentsLength() {
	var lenthFlag = 1;
	$(".picBox").children("textarea").each(function(i,e) {
		if($(e).val().length > 16) {
			lenthFlag = 0;
			return false;
		}
	});
	return lenthFlag;
}

$(function() {
	var firstSale = 0; 
	if($("#firstSale").val() !== undefined && $("#firstSale").val() != null && $("#firstSale").val() != "") {
		firstSale = parseInt($("#firstSale").val());
	}
	var role = 2;
	if($("#role").val() !== undefined && $("#role").val() != null && $("#role").val() != "") {
		role = parseInt($("#role").val());
	}
	if($("#choseCity2").length > 0) {
		if($("#choseCity2").val() != "") {
			changeCityFlag2 = 1;
			cityName = $("#choseCity2").val();
		}
	}
	if($("#residenceId").val() != "") {
		orderFlag = "true";
	}
	$(":input").blur();
//	if($.trim($("#livingLen").val()) != "" && $.trim($("#livingLen").val()) != null ) {
//		livingCount = $("#livingLen").val();
//	}
//	if($.trim($("#bedLen").val()) != "" && $.trim($("#bedLen").val()) != null ) {
//		bedCount = $("#bedLen").val();
//	}
//	if($.trim($("#bathLen").val()) != "" && $.trim($("#bathLen").val()) != null ) {
//		bathCount = $("#bathLen").val();
//	}
//	if($.trim($("#kitchenLen").val()) != "" && $.trim($("#kitchenLen").val()) != null ) {
//		kitchenCount = $("#kitchenLen").val();
//	}
//	if($.trim($("#publicAreaLen").val()) != "" && $.trim($("#publicAreaLen").val()) != null ) {
//		publicCount = $("#publicAreaLen").val();
//	}
//	if($.trim($("#floorPrintList").val()) != "" && $.trim($("#floorPrintList").val()) != null ) {
//		floorPrintCount = $("#floorPrintList").val();
//	}
	$(".picComment").each(function(index, element) {
		fnTextVerify($(element),$(element).next().next(),16);
	});
//	$(".uploadBtn").each(function(){
//		$(this).find("input").first().show();
//	});
//	$("#uploadLiving").click(function() {
//		$("#livingPics").find(":file:eq("+livingCount+")").show().siblings().hide();
//	});
//	$("#livingPics").find(":file").bind("change", function(e) {
//		openFile(e,$(this).next().children("img"));
//		if(parseInt(livingCount) < parseInt(maxLiving)) {
//			livingCount++;
//		}
//	});
//	$("#uploadBed").click(function() {
//	 	$("#bedPics").find(":file:eq("+bedCount+")").show().siblings().hide();
//	});
//	$("#bedPics").find(":file").bind("change", function(e) {
//		openFile(e,$(this).next().children("img"));
//		if(parseInt(bedCount) < parseInt(maxBed)) {
//	 		bedCount++;
//		}
//	});
//	$("#uploadKitchen").click(function() {
//		$("#kitchenPics").find(":file:eq("+kitchenCount+")").show().siblings().hide();
//	});
//	$("#kitchenPics").find(":file").bind('change',function(e) {
//		openFile(e,$(this).next().children("img"));
//		if(parseInt(kitchenCount) < parseInt(maxKitchen)) {
//			kitchenCount++;
//		}
//	});
//	$("#uploadBath").click(function() {
//		$("#bathPics").find(":file:eq("+bathCount+")").show().siblings().hide();
//	});
//	$("#bathPics").find(":file").bind('change',function(e) {
//		alert($(this).attr('name') + i++);
//		openFile(e,$(this).next().children("img"));
//		if(parseInt(bathCount) < parseInt(maxBath)) {
//			bathCount++;
//		}
//	});
//	$("#uploadPublic").click(function() {
//		$("#publicPics").find(":file:eq("+publicCount+")").show().siblings().hide();
//	});
//	$("#publicPics").find(":file").bind("change", function(e) {
//		openFile(e,$(this).next().children("img"));
//		if(parseInt(publicCount) < parseInt(maxPublicArea)) {
//			publicCount++;
//		}
//	});
//	$("#uploadFloorPrint").click(function() {
//		$("#floorPrintPics").find(":file:eq("+floorPrintCount+")").show().siblings().hide();
//	});
//	$("#floorPrintPics").find(":file").bind("change", function(e) {
//		openFile(e,$(this).next().children("img"));
//		if(parseInt(floorPrintCount) < parseInt(maxFloorPrint)) {
//			floorPrintCount++;
//		}
//	});
	
//	$(".picBox .delpp").bind('click',function(){
//		var wichPic = $(this).parent().parent().attr("id");
//		if(wichPic == "publicPics") {
//			publicCount--;
//		} else if(wichPic == "floorPrintPics") {
//			floorPrintCount--;
//		} else if(wichPic == "bathPics") {
//			bathCount--;
//		} else if(wichPic == "kitchenPics") {
//			kitchenCount--;
//		} else if(wichPic == "bedPics") {
//			bedCount--;
//		} else if(wichPic == "livingPics") {
//			livingCount--;
//		}
//		$(this).parent().hide();
//		});
//	
	//点击保存之后要做的动作
	$("#saveSale").click(function() {
		if(role == 1) {
			if(changeCityFlag2 == 0) {
				$("#choseCity2").next().removeClass("Validform_right").addClass("Validform_wrong").text("请选择城市");
				return false;
			}
		}
		var lf = checkPicCommentsLength();
		if(lf != 1) {
			return false;
		}
		
		$(".valid").attr("ignore","ignore");
		var saveType = parseInt($("#saveType").val());
		if(firstSale == 0 && saveType == 0) {
			if(!add.check(false)) {
				return false;
			} else {
				$("#saveType").val("1");
			}
//			$(this).attr("disabled", true);
			if(browser == "Microsoft Internet Explorer") {
				if(add.check()) {
//					$("#saleForm").attr('action', "/SaleHomeOperator.action?addSaleHomeInput");
//					$("#saleForm").submit();
					add.submitForm(false,"/SaleHomeOperator.action?addSaleHomeInput");
				}
			} else {
				add.submitForm(false,"/SaleHomeOperator.action?addSaleHomeInput");
			}
		} else {
			if(!add.check(false)) {
				return false;
			}
//			$(this).attr("disabled", true);
			if(browser == "Microsoft Internet Explorer") {
				if(add.check()) {
//					$("#saleForm").attr('action', "/SaleHomeOperator.action?editSaleHomeInput");
//					$("#saleForm").submit();
					add.submitForm(false,"/SaleHomeOperator.action?editSaleHomeInput");
				}
			} else {
				add.submitForm(false,"/SaleHomeOperator.action?editSaleHomeInput");
			}
		}
//		$.ajax({
//			url:"/UserCenterController.action?checkLoginStatus",
//			dataType:"json",
//			success:function(data, status) {
//				if(data.status == "e"){
//					$("#loginBtn").click();
//				} else if(data.status == "y"){
//					
//				}
//			}
//		});
	});
	
//	//选择小区  有策略 还没实现，把数据放缓存里 http://www.iteye.com/topic/1117898 scripts/residence.json
//	var cacheResidence = {};	//小区缓存
//	var chosenResidencePool = {}; //保存已选择的小区
//	$("#commuInput").autocomplete({
//		minLength: 0,
//		width: 318,
//		autoFocus: true,
//		source: function( request, response ) {
//			var cityCode = $("#cityCode").val();
//			if(role == 1) {
//				if(cityCode == "") {
//					$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请选择城市");
//					return false;
//				}
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
//          data: {cityCode: cityCode,keyword:encodeURIComponent(request.term)},
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
//		}
//	}).focus(function() {
//	    $(this).autocomplete("search", "");
//	}).change(function() {
//		if($(this).val() != selectedResidenceName) {
//			orderFlag = "false";
//		}
//	});
	
	$("#cityCode").change(function() {
		cacheResidence = {};
	});
//	$("#commuInput").blur(function() {
//		var goTo = 0;
//		$.each(cacheResidence, function(index, item) {
//			goTo = 1;
//			orderFlag= "false";
//			$.each(item, function(i, it) {
//				var residenceName = String(it.residenceName).substring(0, String(it.residenceName).indexOf("("))
//				if(residenceName == $.trim($("#commuInput").val()) && it.residenceId == $("#residenceId").val()) {
//					orderFlag= "true";
//					return false;
//				} else {
//					orderFlag= "false";
//				}
//			});
//			if(orderFlag == "true") {
//				return false;
//			}
//		});
//		if(goTo == 0) {
//			orderFlag= "false";
//			return false;
//		}
//	});
	
	//点击发布之后的操作
	$("#publishSale").click(function() {
		if(role == 1) {
			if(changeCityFlag2 == 0) {
				$("#choseCity2").next().removeClass("Validform_right").addClass("Validform_wrong").text("请选择城市");
				return false;
			}
			if(orderFlag== "false") {
				$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的小区中进行选择");
				return false;
			}
		}
		var lf = checkPicCommentsLength();
		if(lf != 1) {
			return false;
		}
		$(".valid").attr("ignore","ignore");
		$(".must").attr("ignore","");
		if(!add.check(false)) {
			return false;
		}
		var saveType = parseInt($("#saveType").val());
		if(firstSale == 0 && saveType == 0) {
			add.config({
			    ajaxpost:{
			    	async:false
			    }
			});
			$(".valid").attr("ignore","ignore");
			if(!add.check(false)) {
				return false;
			}
//			$(this).attr("disabled", true);
			$("#isPublish").val("1");
			if(browser == "Microsoft Internet Explorer") {
				if(add.check()) {
//					$("#saleForm").attr('action', "/SaleHomeOperator.action?addSaleHomeInput");
//					$("#saleForm").submit();
					add.submitForm(false,"/SaleHomeOperator.action?addSaleHomeInput");
				}
			} else {
				add.submitForm(false,"/SaleHomeOperator.action?addSaleHomeInput");
			}
		} else if(firstSale != 0 && saveType == 1) {
			if(!add.check(false)) {
				return false;
			}
			$("#isPublish").val("1");
//			$(this).attr("disabled", true);
			if(browser == "Microsoft Internet Explorer") {
				if(add.check()) {
//					$("#saleForm").attr('action', "/SaleHomeOperator.action?editSaleHomeInput");
//					$("#saleForm").submit();
					add.submitForm(false,"/SaleHomeOperator.action?editSaleHomeInput");
				}
			} else {
				add.submitForm(false,"/SaleHomeOperator.action?editSaleHomeInput");
			}
		} 
//		else {
//			$(".valid").attr("ignore","ignore");
//			$(".must").attr("ignore","");
//			if(!add.check(false)) {
//				return false;
//			}
//			if(browser == "Microsoft Internet Explorer") {
//				if(add.check()) {
//					$("#saleForm").attr('action', "/SaleHomeOperator.action?publishSaleHomeInput");
//					$("#saleForm").submit();
//				}
//			} else {
//				add.submitForm(false,"/SaleHomeOperator.action?publishSaleHomeInput");
//			}
//		} 
	});
	//对卖单的表单进行校验 "virResidenceName":/^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-\\.]+$/,
	add = $("#saleForm").Validform({
		tiptype:4, 
		ignoreHidden:true,
		ajaxPost:true,
		datatype:{
			
			"virLocation":/^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-]+$/,
			"bedRoom":function(gets,obj,curform,regxp) {
				var newBedRoom = parseInt(gets);
				if(isNaN(newBedRoom)) {
					return "请输入1-9之间的数字";
				}
				if(newBedRoom > 0 && newBedRoom <= 9) {
					return true;
				} else {
					return "请输入1-9之间的数字";
				}
			},
			"bathRoom":function(gets,obj,curform,regxp) {
				var bathRoom = parseInt(gets);
				if(isNaN(bathRoom)) {
					return "请输入0-9之间的数字";
				}
				if(bathRoom >= 0 && bathRoom <= 9) {
					return true;
				} else {
					return "请输入0-9之间的数字";
				}
			},
			"livingRoom":function(gets,obj,curform,regxp) {
				var livingRoom = parseInt(gets);
				if(isNaN(livingRoom)) {
					return "请输入0-9之间的数字";
				}
				if(livingRoom >= 0 && livingRoom <= 9) {
					return true;
				} else {
					return "请输入0-9之间的数字";
				}
			},
			"price":function(gets,obj,curform,regxp) {
				var price = parseInt(gets);
				if(isNaN(price)) {
					return "请输入1-999999之间的数字";
				}
				if(price < 1 || price >= 1000000) {
					return "请输入1-999999之间的数字";
				} else {
					return true;
				}
			},
			"floorArea":function(gets,obj,curform,regxp) {
				var floorArea = parseInt(gets);
				if(isNaN(floorArea)) {
					return "请输入1-65535之间的数字";
				}
				if(floorArea > 0 && floorArea < 65536) {
					return true;
				} else {
					return "请输入1-65535之间的数字";
				}
			},
			"carPark":function(gets,obj,curform,regxp) {
				var carPark = parseInt(gets);
				if(isNaN(carPark)) {
					return "请输入0-9之间的数字";
				}
				if(carPark >= 0 && carPark <= 9) {
					return true;
				} else {
					return "请输入0-9之间的数字";
				}
			},
			"totalFloor":function(gets,obj,curform,regxp) {//参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
				var floor = parseInt($("#floor").val());
				var totalFloor = parseInt($("#totalFloor").val());
				if(totalFloor > 0 && totalFloor < 128) {
					if(!isNaN(floor)) {
						if(totalFloor < floor) {
							//$("#totalFloor").next().next().removeClass("Validform_right").addClass("Validform_wrong").text("所在楼层数应小于总楼层数");
							//return "所在楼层数应小于总楼层数";
							return "所在楼层数应小于总楼层数";
						} else {
							return true;
						}
					}
					return true;
				} else {
					return "请输入1-127之间的数字";
				}
			},
			"floor":function(gets,obj,curform,regxp) {//参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
				var floor = parseInt($("#floor").val());
				var totalFloor = parseInt($("#totalFloor").val());
				if(floor > 0 && floor < 128) {
					if(!isNaN(totalFloor)) {
						if(floor > totalFloor) {
							return "所在楼层数应小于总楼层数";
						} else {
							return true;
						}
					}
					return true;
				} else {
					return "请输入1-127之间的数字";
				}
				
			},
			"builtYear":function(gets,obj,curform,regxp) {
				var myDate = new Date();
				if(gets > myDate.getFullYear()) {
					return "建筑年代应该在当前时间之前";
				}
			}
		},
		callback:function(data){
			if($.trim(data.status) == "y"){
				// var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>" + data.info + "</p></div><div class='popLine clearfix'></div></div>";
				// popBox($(Qs));
				// setTimeout(function(){
				// 	$("#idName").remove();
				// 	CoverLayer(0);
				// },1500);
				alertSetTime(data.info,1500);
			} else if($.trim(data.status) == "r"){
				window.location.href = data.info;
			} else if($.trim(data.status) == "n") {
				$("#saveType").val("0");
				// var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>" + data.info + "</div><div class='btnBox clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
				// popBox($(Qs),".confirmBtn");
				confirmDialog(data.info);
			} else if($.trim(data.status) == "e") {
				window.location.href = "/";
			}
		}
	});
	
	//选择城市2
	var cacheCity2 = {};
	var chosenCityPool2 = {};
	$("#choseCity2").autocomplete({
		minLength: 0,
		width: 318,
		autoFocus: true,
		source: function( request, response ) {
			changeCityFlag2 = 0;
			var term = request.term;
			if(term in cacheCity2) {
				response($.map(cacheCity2[term], function(item, index) {
					chosenCityPool2 = cacheCity2[term];
					//alert(JSON.stringify(item));
					return {
						label: item.cityName,
	                    value: item.cityCode
	              }
	            }));	
				return;
			}
      $.ajax({
          url: '/UserCenterController.action?getCityList',
          type: 'post',
          dataType: "json",
          data: {keyword:encodeURIComponent(request.term)},
          success: function(data, status, xhr) {
        	  cacheCity2[term] = data.data;
        	  chosenCityPool2 = data.data;
			response($.map(data.data, function(item, index) {
				return {
					label: item.cityName,
                    value: item.cityCode
              }
            }));												
          },
          error: function(data) {
          }
      });
		},
		select: function( event, ui ) {
			event.preventDefault();
			changeCityFlag2 = 1;
			cityName = ui.item.label;
			$("#cityCode").val(ui.item.value).change();
			this.value = ui.item.label;
			$("#residenceId").val("");
			$("#commuInput").val("");
			$("#choseCity2").blur();
		}
	}).focus(function() {
	    $(this).autocomplete("search", "");
	}).change(function() {
		if($(this).val() != cityName) {
			$("#cityCode").val("").change();
			changeCityFlag2 = 0;
			$("#residenceId").val("");
			$("#commuInput").val("");
		}
	});

});