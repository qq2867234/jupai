var cityName = "";
var changeCityFlag2 = 0;
//************************************玲姐部分  开始****************************************************************
$(function(){
	if($("#cityCode").val() != "") {
		changeCityFlag2 = 1;
	}
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
		//alert($(this).parent().next().val());
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
	$(".upload").eq(0).show().children().show();
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
	
	$("#listPage dl").click(function(e) {
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
			window.location.href = "/RentalHomeController.action?goToEditRentalHomeInput&homeId=" + homeId;
		}
	});
	
	
	tagChoser({
		tagChosenUl: $("#tagChosen"),
		tagListUl: $("#tagList"),
		tagListUlBox: $("#tagSpread"),
		warnSpan:$("#overstep"),
		tagInput:$("#tagInput"),
		tagCount:5,
		tagValInput:$("#favorTag")
		}); 
	
	fnTextVerify($(".contrive"),$(".contrive").next(),20);
	fnTextVerify($("#commuName"),$("#commuName").next(),32);
	fnTextVerify($("#introduction"),$("#introduction").next(),200);
/*	$(".picbox").each(function(){
		fnTextVerify($(this).children("textarea"),$(this).children(".remainder"),16);
		});*/

});
//****************************************玲姐部分  结束************************************************************

var InterValObjForM; //timer变量，控制时间
var countForM = 60; //间隔函数，1秒执行
var curCountForM;//当前剩余秒数
//保存选择的小区
var selectedResidenceName = "";
var orderFlag = "false";
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
var add;
var saveStatus = 0;//保存操作的状态 0表示失败 1表示成功
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
	var wichPic = $(obj).parent().parent().attr("id");
	$th.parent().remove();
	if(wichPic == "publicPics") {
		publicCount--;
	} else if(wichPic == "floorPrintPics") {
		floorPrintCount--;
	} else if(wichPic == "bathPics") {
		bathCount--;
	} else if(wichPic == "kitchenPics") {
		kitchenCount--;
	} else if(wichPic == "bedPics") {
		bedCount--;
	} else if(wichPic == "livingPics") {
		livingCount--;
	}
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



//function getRealPath(fileId){
//
//var file_upl = document.getElementById(fileId);
//
//file_upl.select();
//
//return document.selection.createRange().text;
//} 
////显示图片
//var openFile = function(event, output, showBoxId, uploadInputId) {
//	if(browser == "Microsoft Internet Explorer") {
//		var imgpath= getRealPath(uploadInputId);
//		document.getElementById(showBoxId).style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\""+ imgpath + "\")";//使用滤镜效果
//		$("#"+showBoxId).css("display", "block").children().css("display", "block") ;
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

//检查所选小区是否为服务小区
function checkServiceArea(residenceId) {
	var result = 0;
	$.ajax({
       	url:"/UserCenterController.action?checkServiceArea",
   		dataType:"json",
   		async:false,
   		data:{residenceId:residenceId},
   		type:"POST",
   	    async:false,
   		success:function(data, status) {
   			if(data.status == "y") {
   				result = 1;
   			} else if(data.status == "n") {
   				result = 0;
				$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
			}
   		}
       });
	return result;
}

$(function() {
//	setDisplayNumber($("#uploadLiving"), maxLiving, 0);
//	setDisplayNumber($("#uploadBed"), maxBed, 0);
//	setDisplayNumber($("#uploadBath"), maxBath, 0);
//	setDisplayNumber($("#uploadKitchen"), maxKitchen, 0);
//	setDisplayNumber($("#uploadPublic"), maxPublicArea, 0);
//	setDisplayNumber($("#uploadFloorPrint"), maxFloorPrint, 0);
	//设置是否公开手机号码
//	$("#sendNumber").click(function() {
//		if($(this).is(":checked")) {
//    		$("#sendHiddenNumber").val("1");
//    	} else {
//    		$("#sendHiddenNumber").val("0");
//    	}
//	});
	
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
//	$(".picComment").each(function(index, element) {
//		fnTextVerify($(element),$(element).next().next(),16);
//	});
//	$(".uploadBtn").each(function(){
//		$(this).find("input").first().show();
//	});
//	$("#uploadLiving").click(function() {
//		$("#livingPics").find(":file:eq("+livingCount+")").show().siblings().hide();
//		setDisplayNumber($("#uploadLiving"), (maxLiving-livingCount), livingCount);
//	});
//	$("#livingPics").find(":file").bind("change", function(e) {
//		var index = $("#livingPics :file").index(this);
//		openFile(e,$(this).next().children("img"), "livingOne" + index, "livingFiles" + index);
//		if(parseInt(livingCount) < parseInt(maxLiving)) {
//			livingCount++;
//		}
//	});
//	$("#uploadBed").click(function() {
//	 	$("#bedPics").find(":file:eq("+bedCount+")").show().siblings().hide();
//	 	setDisplayNumber($("#bedPics"), (maxBed-bedCount), bedCount);
//	});
//	$("#bedPics").find(":file").bind("change", function(e) {
//		var index = $("#bedPics :file").index(this);
//		openFile(e,$(this).next().children("img"), "bedOne"+index, "bedFiles"+index);
//		if(parseInt(bedCount) < parseInt(maxBed)) {
//	 		bedCount++;
//		}
//	});
//	$("#uploadKitchen").click(function() {
//		$("#kitchenPics").find(":file:eq("+kitchenCount+")").show().siblings().hide();
//	});
//	$("#kitchenPics").find(":file").bind("change", function(e) {
//		var index = $("#kitchenPics :file").index(this);
//		openFile(e,$(this).next().children("img"), "kitchenOne"+index, "kitchenFiles"+index);
//		if(parseInt(kitchenCount) < parseInt(maxKitchen)) {
//			kitchenCount++;
//		}
//	});
//	$("#uploadBath").click(function() {
//		$("#bathPics").find(":file:eq("+bathCount+")").show().siblings().hide();
//	});
//	$("#bathPics").find(":file").bind("change", function(e) {
//		var index = $("#kitchenPics :file").index(this);
//		openFile(e,$(this).next().children("img"), "bathOne"+index, "bathFiles"+index);
//		if(parseInt(bathCount) < parseInt(maxBath)) {
//			bathCount++;
//		}
//	});
//	$("#uploadPublic").click(function() {
//		$("#publicPics").find(":file:eq("+publicCount+")").show().siblings().hide();
//	});
//	$("#publicPics").find(":file").bind("change", function(e) {
//		var index = $("#kitchenPics :file").index(this);
//		openFile(e,$(this).next().children("img"), "publicOne"+index, "publicFiles"+index);
//		if(parseInt(publicCount) < parseInt(maxPublicArea)) {
//			publicCount++;
//		}
//	});
//	$("#uploadFloorPrint").click(function() {
//		$("#floorPrintPics").find(":file:eq("+floorPrintCount+")").show().siblings().hide();
//	});
//	$("#floorPrintPics").find(":file").bind("change", function(e) {
//		var index = $("#kitchenPics :file").index(this);
//		openFile(e,$(this).next().children("img"), "floorPrintOne"+index, "floorPrintFiles"+index);
//		if(parseInt(floorPrintCount) < parseInt(maxFloorPrint)) {
//			floorPrintCount++;
//		}
//	});
//	
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
	
	//点击保存之后要做的动作
	$("#saveSale").click(function() {
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
//				$("#saleForm").attr('action', "/");
//				$("#saleForm").submit();
				add.submitForm(false,"/SaleHomeOperator.action?addSaleHomeInput");
			} else {
				add.submitForm(false,"/SaleHomeOperator.action?addSaleHomeInput");
			}
		} else {
			if(!add.check(false)) {
				return false;
			}
			//			$(this).attr("disabled", true);
			add.submitForm(false,"/SaleHomeOperator.action?editSaleHomeInput");
		}
	});
	
	//检测是否有发单权限  返回0表示普通用户并且未审核、返回-1表示经纪人并且未审核 返回1表示普通用户通过了审核 返回 2表示经纪人通过了审核
	function checkAuthorityForPublish() {
		var result = 0;
		$.ajax({
			url:"/UserCenterController.action?checkAuthority",
			dataType:"json",
			async:false,
			success:function(data, status) {
				if(data.status == "n"){
					if(data.info == "y") {
						result = 0; //普通用户或专家
					} else {
						result = -1; //经纪人
					}
				} else if(data.status == "y"){
					if(data.info == "y") {
						result = 1; //普通用户或专家
					} else {
						result = 2; //经纪人
					}
				}
			}
		});
		return result;
	}
	
	//显示手机认证弹出层
	function showVerifyDiv() {
		var Box="<div class='divPopup' id='verfyPhN'><form action='/UserCenterOperator.action?verifyUserMobile' method='post' id='verifyMobile'><h5>请先验证手机号</h5>" +
				"<div class='divLine'><input type='text' id='mobileNumber' placeholder='输入手机号' name='mobile' maxlength='11' nullmsg='请输入手机号码' maxlength='11' datatype='m' errormsg='请输入正确的手机号码！' ajaxurl='/Register.action?checkloginId&type=1' class='unit8'/>" +
				"<input type='hidden' id='hiddenMobile' name='mobile'/>"+
				"<button type='button' class='actionBtn' id='sendMobileActiveCode'>发送验证码</button>" +
				"<span class='Validform_checktip'></span></div>" +
				"<div class='divLine'><input type='text' id='verfyNum' placeholder='输入验证码' name='checkCode' datatype='s4-4' nullmsg='请输入验证码' errormsg='请输入您收到的验证码！' class='unit8'/>" +
				"<span class='Validform_checktip'></span></div>" +
				"<div class='btnBox clearfix'>" +
				"<button class='cancelBtn fLeft round' type='button' style='margin-left:2%'>放弃</button><button class='confirmBtn fLeft round' id='okVMobile' type='button'>验证</button>" +
				"</div></form></div>";
		popBox($(Box),".cancelBtn");
		//认证手机
		var verifyMobile = $("#verifyMobile").Validform({
			tiptype:4,
			ajaxPost:true,
			postonce:true,
			btnSubmit:"#okVMobile",
			callback:function(data){
				if($.trim(data.status)==="y") {
					$(".cancelBtn").click();
				} else if($.trim(data.status)==="n") {
					$("#sendMobileActiveCode").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
				} else if($.trim(data.status)==="e") {
					window.location.href = "/";
				}
			}
		});
		
		fnTextVerify($("#introduction"),$("#introduction").prev(),200);
		fnTextVerify($("#slogan"),$("#slogan").prev(),200);
		
		//向手机发送验证码
		$("#sendMobileActiveCode").click(function() {
			var mobile = $.trim($("#mobileNumber").val());
			var mobileReg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
			if(!mobileReg.test(mobile)) {
				$("#sendMobileActiveCode").next().removeClass("Validform_right").addClass("Validform_wrong").text("手机号码格式不正确");
				return false;
			}
			$.ajax({
				type:"POST",
				url:"/UserCenterOperator.action?sendMobileCheckCode",
				dataType:"json",
				data:{mobile:mobile},
				success:function(data) {
					if($.trim(data.status)==="y") {
						$("#sendMobileActiveCode").attr("disabled", "true");
						$("#mobileNumber").attr("disabled", "true");
						$("#hiddenMobile").val(mobile);
						curCountForM = countForM;
						$("#sendMobileActiveCode").text("剩余"+curCountForM +"秒");
						 InterValObjForM = window.setInterval(function() {
		                	 if (curCountForM == 0) {                
		                	        window.clearInterval(InterValObjForM);//停止计时器
		                	        $("#sendMobileActiveCode").removeAttr("disabled").removeClass("forbidBtn").addClass('actionBtn');//启用按钮
		                	        $("#mobileNumber").removeAttr("disabled").removeClass("forbidBtn").addClass('actionBtn');//可以重新输入手机
		                	        $("#sendMobileActiveCode").text("重新获取验证码");
		                	    }
		                	    else {
		                	        curCountForM--;
		                	        $("#sendMobileActiveCode").text("再过"+curCountForM +"秒,可再次获取验证码");
		                	    }
		                }, 1000); //启动计时器，1秒执行一次
						return true;	
					}  else if($.trim(data.status)==="n") {
						$("#sendMobileActiveCode").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
						return false;
					} else if($.trim(data.status)==="e") {
						window.location.href = "/";
						return false;
					} 
					return false;
				}
			});
		});
	}
	//选择小区  有策略 还没实现，把数据放缓存里 http://www.iteye.com/topic/1117898 scripts/residence.json
	var cacheResidence = {};	//小区缓存
	var chosenResidencePool = {}; //保存已选择的小区
	$("#commuInput").autocomplete({
		minLength: 0,
		width: 318,
		autoFocus: true,
		source: function( request, response ) {
			var cityCode = $("#cityCode").val();
			if(cityCode == "") {
				$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请选择城市");
				return false;
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
          data: {cityCode: cityCode,keyword:encodeURIComponent(request.term)},
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
			$("#residenceId").val(ui.item.value);
			this.value = String(ui.item.label).substring(0, String(ui.item.label).indexOf("("));
			orderFlag= "true";
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
	//点击发布之后的操作
	$("#publishSale").click(function() {
		$.ajax({
			url:"/UserCenterController.action?checkLoginStatus",
			dataType:"json",
			async:false,
			success:function(data, status) {
				if(data.status == "e"){
					$("#loginBtn").click();
				} else if(data.status == "y"){
					var result = checkAuthorityForPublish();
					if(result == 0) {
						showVerifyDiv();
					} else if(result == -1 || result == 2) {
						var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>本页面只提供给普通用户使用</p></div><div class='popLine clearfix'></div></div>";
						popBox($(Qs));
						setTimeout(function(){
							window.location.href = '/';
						},1500);
						return false;
						var residenceId = $("#residenceId").val();
						if(orderFlag== "false") {
							$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的小区中进行选择");
							return false;
						}
						var result = checkServiceArea(residenceId);
						if(result == 0) {
							$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").html("该小区不在您的服务范围之内,请到用户中心进行设置<a href='/UserCenterController.action?goToUserCenter'>前往用户中心</a>");
							return false;
						} else {
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
								add.submitForm(false,"/SaleHomeOperator.action?addSaleHomeInput");
							} else {
								$(".valid").attr("ignore","ignore");
								$(".must").attr("ignore","");
								if(!add.check(false)) {
									return false;
								}
								add.submitForm(false,"/SaleHomeOperator.action?publishSaleHomeInput");
							}
						}
					} else {
						if(changeCityFlag2 == 0) {
							$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的城市中进行选择");
							return false;
						}
						if(orderFlag== "false") {
							$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的小区中进行选择");
							return false;
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
//								$("#saleForm").attr('action', "/SaleHomeOperator.action?addSaleHomeInput");
//								$("#saleForm").submit();
								add.submitForm(false,"/SaleHomeOperator.action?addSaleHomeInput");
							} else {
								add.submitForm(false,"/SaleHomeOperator.action?addSaleHomeInput");
							}
						} else {
							$(".valid").attr("ignore","ignore");
							$(".must").attr("ignore","");
							if(!add.check(false)) {
								return false;
							}
							if(browser == "Microsoft Internet Explorer") {
//								$("#saleForm").attr('action', "/SaleHomeOperator.action?publishSaleHomeInput");
//								$("#saleForm").submit();
								add.submitForm(false,"/SaleHomeOperator.action?publishSaleHomeInput");
							} else {
								add.submitForm(false,"/SaleHomeOperator.action?publishSaleHomeInput");
							}
						} 
					}
				}
			}
		});
	});
	//对卖单的表单进行校验  "virResidenceName":/^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-\\.]+$/,
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
			if($.trim(data.status) == "r"){
				window.location.href = data.info;
			} else if($.trim(data.status) == "n") {
				var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>" + data.info + "</div><div class='btnBox clearfix'><button id='question' class='confirmBtn btn btn-success onlyBtn'>确认</button></div></div>";
				popBox($(Qs),".confirmBtn");
				$("#saveType").val("0");
			} else if($.trim(data.status) == "e") {
				window.location.href = "/";
			}
		}
	});
	//显示已发布
	$("#showSaleHomeList").click(function() {
		window.location.href = "/SaleHomeController.action?goToPublishedSaleHomeInputList";
	});
	
	//显示未发布
	$("#showSaleHomeInput").click(function() {
		window.location.href = "/SaleHomeController.action?goToUnPublishedSaleHomeInputList";
	});
	//创建新卖单
	$("#createSaleHomeInput").click(function() {
		checkUnPublishedSaleHomeInputLimit();
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
			$("#cityCode").val(ui.item.value);
			this.value = ui.item.label;
			$("#choseCity2").blur();
		}
	}).focus(function() {
	    $(this).autocomplete("search", "");
	}).change(function() {
		if($(this).val() != cityName) {
			$("#cityCode").val("");
			changeCityFlag2 = 0;
		}
	});
	
	
});