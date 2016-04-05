var myDataType = {
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
		"price":function(gets,obj,curform,regxp) {
			var price = parseInt(gets);
			var budget = $("#budget").val();
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
		}
	}

var cityName = "";
var changeCityFlag2 = 0;
//************************************玲姐部分  开始****************************************************************
$(function(){
	// $("#mBtn").click(function(){
	// 	$(".moreInfo").show();
	// 	$(this).parents(".divLine").hide();
	// 	$("#lBtn").parents(".divLine").show();
	// 	Init();
	// });
	// $("#lBtn").click(function(){
	// 	$(".moreInfo").hide();
	// 	$(this).parents(".divLine").hide();
	// 	$("#mBtn").parents(".divLine").show();
	// 	Init();
	// });
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
	
	tagChoser({
		tagChosenUl: $("#tagChosen"),
		tagListUl: $("#tagList"),
		tagListUlBox: $("#tagSpread"),
		warnSpan:$("#tagChosen").nextAll(".overstep"),
		tagInput:$("#tagInput"),
		tagCount:5,
		tagValInput:$("#chosenvalueTags")
	});
	tagChoser({
		tagChosenUl: $("#elecChosen"),
		tagListUl: $("#elecList"),
		tagListUlBox: $("#elecSpread"),    
		warnSpan:$("#elecChosen").nextAll(".overstep"),
		tagValInput:$("#elecTag")        
	});
	
	// $(".itemInput input").focus(function(){
	// 	$(this).addClass("onFocus");
	// 	});
	// $(".itemInput input").click(function(){
	// 	$(this).select();
	// 	});
	// $("textarea").click(function() {
	// 	$(this).select();
	// });
	// $(".itemInput input").blur(function(){
	// 	$(this).removeClass("onFocus");
	// 	});
	fnCreateSelectUl(".popCom",null,null,null);
	fnCreateSelectUl(".payment",null,null,null);

	$(".popCom li").click(function(){
		$('#residenceId').val($(this).attr("residenceId"));
		//$(this).parent().prev().val($(this).text()).blur();
		$(this).parent().prev().blur();
		//alert($('#residenceId').val());
		});
	fnClassification("villado","buildingTypeClass");
	fnClassification("wholly","rentModeClsss");
	fnClassification("joint","rentModeClsss");

	function fnClassification(showclass,unifyClass){
		$("#"+showclass).click(function() {
			$("."+unifyClass).hide();
			$("."+showclass).show();
		});
	}
		
	// $(".hMenu li").click(function(){
	// 	$(this).siblings().removeClass("on")
	// 		.end().addClass("on");	
	// 	if($(this).parent().next().attr("id")=="rentMode")
	// 	{
	// 		$(this).parent().next().val($(this).index() + 1);
	// 	}
	// 	else
	// 	{
	// 		$(this).parent().next().val($(this).index());
	// 	}

	// 	if($("#buildingType").val()== 1 || $("#buildingType").val()==2)
	// 	{
	// 		$(".floorTyTr").show();
	// 	}
	// 	else
	// 	{
	// 		$(".floorTyTr").hide();
	// 	}
	// 	if($("#rentMode").val()== 2)
	// 	{
	// 		$(".rentModeTr").show();
	// 	}
	// 	else
	// 	{
	// 		$(".rentModeTr").hide();
	// 	}
	// 	if($("#household").val()== 1)
	// 	{
	// 		$(".householdTr").show();
	// 	}
	// 	else
	// 	{
	// 		$(".householdTr").hide();
	// 		$("#elecChosen").children().not(":last").click();
	// 		$("#elecTag").val('');
	// 		$("#elecSpread").hide();
	// 	}
	// 	});
	
	$(".upload").eq(0).show();
	$("#picUpload li").click(function(){
		$(this).siblings("li").removeClass("on")
			.end().addClass("on");
		var clickIndex = $(this).index();
		$(".upload").hide();
		$(".upload").eq(clickIndex).show();
		});
/*	$(".delPP").click(function(){
		$(this).parent().remove();		
		});*/
	fnTextVerify($(".contrive"),$(".contrive").next(),20);
	fnTextVerify($("#commuName"),$("#commuName").next(),16);
	fnTextVerify($("#introduction"),$("#introduction").next(),200);

	$(".radiobox").each(function(){
		fnCreateRadiobox({
        	ul: $(this),
        	boxUseType: 1
        });
		
	});
	$(".checkbox").each(function(){
		fncreateCheckbox({
        	ul: $(this)
        });
	});
	$(".prevStep").click(function(){
		$(this).parents('.steps').hide()
			.prev('.steps').show();
	})
	$(".nextStep").click(function(){
		$(this).parents('.steps').hide()
			.next('.steps').show();
	})
	// $('.optSec').each(function(){
	// 	fnShowOptInput($(this));
	// })
	$(".optSec").each(function(){
		var $this = $(this);
 		$this.click(function(){
			$this.parents('ul')
				.siblings(".secInput").show();
		})
		$this.siblings().not('.optSec').click(function(){
			$this.parents('ul')
				.siblings(".secInput").hide();
		})
	})
	
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
//var firstRental = 0 //0表示目前是第一次点击，第一次点击后自增
//if($.cookie("firstRental") != null && $.cookie("firstRental") != "") {
//	firstRental = $.cookie("firstRental");
//}
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
                 window.location.href = "/UserSearch.action?toHome";
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
                window.location.href = "/UserSearch.action?toHome";
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
	var firstRental  = 0;
	if($("#firstRental").val() !== undefined && $("#firstRental").val() != null && $("#firstRental").val() != "") {
		firstRental = parseInt($("#firstRental").val());
	}
	var role = 2;
	if($("#role").val() !== undefined && $("#role").val() != null && $("#role").val() != "") {
		role = parseInt($("#role").val());
	}
	$(":input").blur();
	if($("#choseCity2").length > 0) {
		if($("#choseCity2").val() != "") {
			changeCityFlag2 = 1;
			cityName = $("#choseCity2").val();
		}
	}
	if($("#residenceId").val() != "") {
		orderFlag = "true";
	}
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
//	$("#kitchenPics").find(":file").bind("change", function(e) {
//		openFile(e,$(this).next().children("img"));
//		if(parseInt(kitchenCount) < parseInt(maxKitchen)) {
//			kitchenCount++;
//		}
//	});
//	$("#uploadBath").click(function() {
//		$("#bathPics").find(":file:eq("+bathCount+")").show().siblings().hide();
//	});
//	$("#bathPics").find(":file").bind("change", function(e) {
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
	
	//选择小区  有策略 还没实现，把数据放缓存里 http://www.iteye.com/topic/1117898 scripts/residence.json
	var cacheResidence = {};	//小区缓存
	var chosenResidencePool = {}; //保存已选择的小区
	$("#commuInput").autocomplete({
		minLength: 0,
		width: 318,
		autoFocus: true,
		source: function( request, response ) {
			var cityCode = $("#cityCode").val();
			if(role == 1) {
				if(cityCode == "") {
					$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请选择城市");
					return false;
				}
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
          data: {cityCode: cityCode, keyword:encodeURIComponent(request.term)},
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
//				if(residenceName == $.trim($("#commuInput").val())) {
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
	
	//点击保存之后要做的动作
	$("#saveRental").click(function() {
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
		if(firstRental == 0 && saveType == 0) {
			if(!add.check(false)) {
				return false;
			} else {
				$("#saveType").val("1");
			}
			//			$(this).attr("disabled", true);
			if(browser == "Microsoft Internet Explorer") {
				add.submitForm(false,"/RentalHomeOperator.action?addRentalHomeInput");
			} else {
				add.submitForm(false,"/RentalHomeOperator.action?addRentalHomeInput");
			}
		} else {
			if(!add.check(false)) {
				return false;
			}
			//			$(this).attr("disabled", true);
			if(browser == "Microsoft Internet Explorer") {
				add.submitForm(false,"/RentalHomeOperator.action?editRentalHomeInput");
			} else {
				add.submitForm(false,"/RentalHomeOperator.action?editRentalHomeInput");
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
	//点击发布之后的操作
	$("#publishRental").click(function() {
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
		if(firstRental == 0 && saveType == 0) {
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
				add.submitForm(false,"/RentalHomeOperator.action?addRentalHomeInput");
			} else {
				add.submitForm(false,"/RentalHomeOperator.action?addRentalHomeInput");
			}
		} 
		else if(firstRental != 0 && saveType == 1) {
			if(!add.check(false)) {
				return false;
			}
			$("#isPublish").val("1");
			//			$(this).attr("disabled", true);
			if(browser == "Microsoft Internet Explorer") {
				add.submitForm(false,"/RentalHomeOperator.action?editRentalHomeInput");
			} else {
				add.submitForm(false,"/RentalHomeOperator.action?editRentalHomeInput");
			}
		} 
//		else {
//			$(".valid").attr("ignore","ignore");
//			$(".must").attr("ignore","");
//			if(!add.check(false)) {
//				return false;
//			}
//			$("#isPublish").val("1");
//			//			$(this).attr("disabled", true);
//			if(browser == "Microsoft Internet Explorer") {
//				$("#rentalForm").attr('action', "/RentalHomeOperator.action?publishRentalHomeInput");
//				$("#rentalForm").submit();
//			} else {
//				add.submitForm(false,"/RentalHomeOperator.action?publishRentalHomeInput");
//			}
//		} 
	});
	//对租单的表单进行校验   "virResidenceName":/^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-\\.]+$/,
	add = $("#rentalForm").Validform({
		tiptype:4, 
		ignoreHidden:true,
		ajaxPost:true,
		datatype:myDataType,
		callback:function(data){
			if($.trim(data.status) == "y"){
				var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>" + data.info + "</p></div><div class='popLine clearfix'></div></div>";
				popBox($(Qs));
				setTimeout(function(){
					$("#idName").remove();
					CoverLayer(0);
				},1500);
			} else if($.trim(data.status) == "r"){
				window.location.href = data.info;
			} else if($.trim(data.status) == "n") {
				$("#saveType").val("0");
				var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>" + data.info + "</div><div class='btnBox clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
				popBox($(Qs),".confirmBtn");
			} else if($.trim(data.status) == "e") {
				window.location.href = "/";
			}
		}
	});
	//在列表页发布租单
//	$(".publishRental").click(function() {
//		var inputId = $(this).attr("v");
//		$.ajax({
//			url:"/RentalHomeOperator.action?publishRentalHomeInput",
//			type:"POST",
//			data:{inputId:inputId,publishType:2},
//			dadaType:"json",
//			async:false,
//			success:function(data, textStatus) {
//				if(data.status == "y") {
//					window.location.href = "/RentalHomeController.action?goToUnPublishedRentalHomeInputList";
//				} else if (data.status == "n") {
//					alert(data.info);
//				} else if (data.status == "e") {
//					window.location.href = "/UserSearch.action?toHome";
//				}
//			}
//		});
//	});
	//下架租单
	$(".pullOff").click(function() {
		var listId = $(this).attr("l");
		$.ajax({
			url:"/RentalHomeOperator.action?pullOffRentalHomeList",
			type:"POST",
			data:{listId:listId},
			dadaType:"json",
			success:function(data, textStatus) {
				if(data.status == "y") {
					window.location.href = "/RentalHomeController.action?goToPublishedRentalHomeInputList";
				} else if (data.status == "n") {
					alert(data.info);
				} else if (data.status == "e") {
					window.location.href = "/UserSearch.action?toHome";
				}
			}
		});
	});
	//跳转到已发布租单列表
	$("#showRentalHomeList").click(function() {
		window.location.href = "/RentalHomeController.action?goToPublishedRentalHomeInputList";
	});
	//跳转到未发布租单列表
	$("#showRentalHomeInput").click(function() {
		window.location.href = "/RentalHomeController.action?goToUnPublishedRentalHomeInputList";
	});
	//创建新租单
	$("#createRentalHomeInput").click(function() {
		checkUnPublishedRentalHomeInputLimit();
		//window.location.href = "/RentalHomeController.action?goToAddRentalHomeInputView";
	});
	
	$("#listPage .un").click(function(e) {
		e = window.event || e;
		$this = $(e.srcElement || e.target);
		if($this.is(".operate, .operate *"))
		{
			return;
		}
		else
		{	
			//var homeId = $(".un input[type=hidden]").val();
			var homeId = $(this).children("input[type=hidden]").val();
			//alert(homeId);
			window.location.href = "/RentalHomeController.action?goToEditRentalHomeInput&homeId=" + homeId;
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