function brokerVerify() {
	$.getJSON('/UserCenterOperator.action?checkIdV', {random:Math.random()},function(data){
		if(data.status == "n") {
			// var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>" + data.info + "</div><div class='btnBox clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
			// popBox($(Qs),".confirmBtn");
			confirmDialog(data.info);
		} else if(data.status == "y") {
			window.location.href = "/UserCenterController.action?goToCheckVerifyAuthority&dest=4";
		}
	});
}
//检查是否经过在职认证
function checkBrokerV() {
	$.ajax({
		type:"POST",
		url:"/UserCenterOperator.action?checkBrokerV",
		dataType:"json",
		success:function(data) {
			if(data.status == "y") {
				window.location.href = "/UserCenterController.action?goToServiceAreaSetting";
			} else if(data.status == "n") {
				window.location.href = "/UserCenterController.action?goToServiceAreaSetting";
			} else if(data.status == "e") {
				window.location.href = "/";
			} else {
				window.location.href = "/";
			}
		}
	});
}
//function getRealPath(fileId){
//
//	var file_upl = document.getElementById(fileId);
//
//	file_upl.select();
//
//	return document.selection.createRange().text;
//	} 
////显示图片
//var openFile = function(event, output, showBoxId, uploadInputId) {
//	if(browser == "Microsoft Internet Explorer") {
//		var imgpath= getRealPath(uploadInput);
//		document.getElementById(showBox).style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\""+ imgpath + "\")";//使用滤镜效果
//		$("#"+showBox).css("display", "block").children().css("display", "block") ;
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
function showConfirmInfoView() {
	var timer = 2;
	alertSetTime('修改成功',1500);
//	var InterValObjForM = window.setInterval(function() {
//	   	if (timer == 0) {
//	   		$(".cancelBtn").click();
//	   		window.clearInterval(InterValObjForM);//停止计时器
//	   	} else {
//			popBox($(Qs),".confirmBtn");
//	    	timer--;
//	   	}
//   }, 1000); //启动计时器，1秒执行一次
}
$(function() {
	
	
//	//上传图片 $("#someID").length > 0
//	if($("#hiddenFileName").length > 0) {
//		uploadPicFinal("chooseUploadPic", $("#headPic"), $("#hiddenFileName"));
//	}
	

	// var tag = {
	// 	tagChosenUl: $("#tagChosen"),
	// 	tagListUl: $("#tagList"),
	// 	tagListUlBox: $("#tagSpread"),
	// 	warnSpan:$("#overstep"),
	// 	tagInput:$("#tagInput"),
	// 	tagCount:5,
	// 	tagValInput:$("#favorTag"),
	// 	tagMaxLength:30,
	// 	fn:function(){
	// 		if((tag.tagInput.val().replace(',','').length+tag.tagValInput.length)>30){
	// 			return -1;
	// 		}
	// 		else{
	// 			return 1;
	// 		}
	// 	}
	// 	}
	//对修改密码的表单进行验证
	// tagChoser(tag); 
	$(".radioBox").each(function(){
		fnCreateRadiobox({
        	ul: $(this),
        	boxUseType: 1
        });
		
	});
	var editPassForm = $("#editPassForm").Validform({
		tiptype:4,
		ajaxPost:true,
		btnSubmit:"#editPass",
		datatype:{
			"password" : function(gets,obj,curform,regxp) {
				var oldPass = $("#oldPass").val();
				var passone = $("#passone").val();
				var passtwo = $("#passone").val();
				if(oldPass != "" && passone != "" && passtwo != "") {
					if(oldPass == passone && passone == passtwo) {
						return "新旧密码不能一致";
					}
				}
				var reg1=/^[A-Za-z0-9]{4,16}$/;
				if(reg1.test(gets)){
					return true;
				}
				return false;
			}
		},
		callback:function(data){
			if(data.status == "y") {
				$(":input").val("");
//				$("#msg").removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
				alertSetTime("密码修改成功", 2500);
			} else if(data.status == "n") {
				$("#msg").removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
			} else if(data.status == "e") {
				window.location.href = "/";
			}
		}
	});
	
	//对修改用户基本信息的表单进行验证
	var userCenterForm = $("#userCenterForm").Validform({
		tiptype:4,
		ignoreHidden:true,
		datatype:{
			"displayName":function(gets,obj,curform,regxp) {
				var nameReg = /^[a-zA-Z0-9_\\.\u4e00-\u9fa5·•]+$/;
				var name = gets;
				if(!nameReg.test(name)) {
					return "请输入8个字符以内的用户名";
				}
				if(name.length > 8) {
					return "请输入8个字符以内的用户名"
				} 
				return true;
			},
			"shortName":function(gets,obj,curform,regxp) {
				var nameReg = /^[a-zA-Z0-9_\\.\u4e00-\u9fa5·•]+$/;
				var name = gets;
				if(!nameReg.test(name)) {
					return "请输入8个字符以内的公司简称";
				}
				if(name.length > 8) {
					return "请输入8个字符以内的公司简称"
				} 
				return true;
			},
			"devCName":function(gets,obj,curform,regxp) {
				var nameReg = /^[a-zA-Z0-9_\\.\u4e00-\u9fa5·•]+$/;
				var name = gets;
				if(!nameReg.test(name)) {
					return "请输入16个字以内的公司名";
				}
				if(name.length > 16) {
					return "请输入16个字以内的公司名"
				} 
				return true;
			},
			"devName":function(gets,obj,curform,regxp) {
				var nameReg = /^[\u4E00-\u9FA5]+$/;
				var name = gets;
				if(!nameReg.test(name)) {
					return "请输入16个汉字以内的联系人姓名";
				}
				if(name.length > 16) {
					return "请输入16个字符以内的联系人姓名"
				} 
				return true;
			},
			"areaCode":function(gets,obj,curform,regxp) {
				var areaCode = gets;
				//var reg = new RegExp("^[0-9]{3,4}$");
				var reg = /^[0-9]{3,4}$/;
				var warningMsg = "请输入3位区号";
				if(reg.test(areaCode)) {
					return true;
				} else {
					if($.trim($("#centralCode").val()).length == 7) {
						warningMsg = "请输入4位区号";
					} else if($.trim($("#centralCode").val()).length == 8){
						warningMsg = "请输入3位区号";
					} else {
						warningMsg = "请输入3或4位区号";
					}
					return warningMsg;
				}
			},
			"centralCode":function(gets,obj,curform,regxp) {
				var centralCode = gets;
				var centralReg = /^[0-9]{7,8}$/;
				var warningMsg = "请输入7位电话号码";
				
				if(centralReg.test(centralCode)) {
					return true;
				} else {
					if($.trim($("#areaCode").val()).length == 4) {
						warningMsg = "请输入7位电话号码";
					} else if($.trim($("#areaCode").val()).length == 3){
						warningMsg = "请输入8位电话号码";
					} else {
						warningMsg = "请输入7或8位电话号码";
					}
					return warningMsg;
				}
			},
			"web":function(gets,obj,curform,regxp) {
				var webReg = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]':+!]*([^<>\"\"])*$/;
				var webDomain = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
				if(webReg.test(gets) || webDomain.test(gets)) {
					return true;
				} else {
					return "请输入正确的网址";
				}
			},
			"keyword":function(gets,obj,curform,regxp) {
				var nameReg = /^[a-zA-Z0-9_\\-\\.@\u4E00-\u9FA5,，\s]+$/;
				var name = gets;
				if(!nameReg.test(name)) {
					return "请输入32个以内的字符";
				}
				if(name.length > 32) {
					return "请输入32个以内的字符";
				} 
				return true;
			}
		}
	});
	$("#saveBasicInfo").click(function() {
		var email = $("#basicEmail").val();
		var mobile = $("#basicMobile").val();
		var veResult = validateInput(email);
		var vmResult = validateInput(mobile);
		if(veResult == 1) {
			var resultE = checkLoginIdExist(email, 1, $("#basicEmail"), $("#basicEmail").siblings("span"));	
			if(resultE == 0) {
				return false;
			}
		}
		if(vmResult == 1) {
			var resultM = checkLoginIdExist(mobile, 1, $("#basicMobile"), $("#basicMobile").siblings("span"));	
			if(resultM == 0) {
				return false;
			}
		}
		if(userCenterForm.check(false)) {
			alertSetTime("修改成功");
			if(browser == "Microsoft Internet Explorer") {
				if(userCenterForm.check()) {
//						$("#saleForm").attr('action', "/SaleHomeOperator.action?addSaleHomeInput");
//						$("#saleForm").submit();
					userCenterForm.submitForm(false);
				}
			} else {
				userCenterForm.submitForm(false);
			}
		} else {
			locateErrorPosition();
		}
	});
//	//选择图片
//	$(".uploadBtn").click(function() {
//		//$(this).next().click();
//		$(this).children().change(function(e){
//			openFile(e, $("#headPic"), "showHeadPic", photo);
//		});
//	});
	
	//重置数据
	$("#cancelBasicInfo").click(function() {
		userCenterForm.resetForm();
		$(":input").blur();
	});
	
	$("#cancelEditPass").click(function() {
		editPassForm.resetForm();
		$(":input").blur();
	});
});

