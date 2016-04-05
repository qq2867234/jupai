var InterValObjForM; //timer变量，控制时间
var countForM = 120; //间隔函数，1秒,可再次获取验证码执行
var curCountForM;//当前再过秒,可再次获取验证码数

var InterValObjForE; //timer变量，控制时间
var countForE = 120; //间隔函数，1秒,可再次获取验证码执行
var curCountForE;//当前再过秒,可再次获取验证码数

var changeSalesOfficeFlag = 0; //是否进行门店修改的标志 0 代表不修改 1 代表可以修改
var changeBrokerageFlag = 0; //是否进行门店修改的标志 0 代表不修改 1 代表可以修改
var changeCityFlag = 0; //是否进行城市修改的标志 0 代表不修改 1 代表可以修改
var changeCityFlag2 = 0;
var cityName = "";
var brokerageName = "";
var salesofficeName = "";
$(function() {
	//************************************玲姐部分  开始****************************************************************
	$(".hMenu li").click(function(){
		$("#agentType").val($(this).index()+1);
		$("#agentBroker").val($("#agentType").val());
		$("#independentBroker").val($("#agentType").val());
		$(this).addClass("on").siblings().removeClass("on");
		//alert($("#agentType").val());
		if($(this).index()==0) {
			$("#agency").show();
			$("#independent").hide();
		}
		else {
			$("#independent").show();
			$("#agency").hide();
		}
		});
	//****************************************玲姐部分  结束************************************************************
	var cookiecurCountForM = $.cookie("curCountForM");
	if(cookiecurCountForM != undefined && cookiecurCountForM != "" && cookiecurCountForM != null && cookiecurCountForM != 0) {
		curCountForM = cookiecurCountForM;
		var mobile = $.trim($("#mobileNumber").val());
		$("#sendMobileActiveCode").attr("disabled", "true").removeClass("btn-primary").addClass('btn-disabled');
		$("#mobileNumber").attr("disabled", "true").removeClass("btn-primary").addClass('btn-disabled');
		$("#hiddenMobile").val(mobile);
		$.cookie("curCountForM", curCountForM);
		$("#sendMobileActiveCode").text("再过"+curCountForM +"秒,可再次获取验证码");
		 InterValObjForM = window.setInterval(function() {
        	 if (curCountForM == 0) {                
        	        window.clearInterval(InterValObjForM);//停止计时器
        	        $("#sendMobileActiveCode").removeAttr("disabled").removeClass("btn-disabled").addClass('btn-primary');//启用按钮
        	        $("#mobileNumber").removeAttr("disabled").removeClass("btn-disabled").addClass('btn-primary');//可以重新输入手机
        	        $("#sendMobileActiveCode").text("重新获取验证码");
        	        $.cookie("curCountForM", 0);
        	    } else {
        	        curCountForM--;
        	        $("#sendMobileActiveCode").text("再过"+curCountForM +"秒,可再次获取验证码");
        	        $.cookie("curCountForM", curCountForM);
        	    }
        }, 1000); //启动计时器，1秒执行一次
	}
	var cookiecurCountForE = $.cookie("curCountForE");
	if(cookiecurCountForE != undefined && cookiecurCountForE != "" && cookiecurCountForE != null && cookiecurCountForE != 0) {
		curCountForE = cookiecurCountForE;
		var email = $.trim($("#emailAddress").val());
		$("#hiddenEmail").val(email);
		$("#sendEmailActiveCode").attr("disabled", "true").removeClass("btn-primary").addClass('btn-disabled');;
		//curCountForE = countForE;
		$.cookie("curCountForE", curCountForE);
		$("#emailAddress").attr("disabled", "true").removeClass("btn-primary").addClass('btn-disabled');;
		$("#sendEmailActiveCode").text("再过"+curCountForE+"秒,可再次获取验证码");
		InterValObjForE = window.setInterval(function() {
        	 if (curCountForE == 0) {                
        	        window.clearInterval(InterValObjForE);//停止计时器
        	        $("#sendEmailActiveCode").removeAttr("disabled").removeClass("btn-disabled").addClass('btn-primary');//启用按钮
        	        $("#emailAddress").removeAttr("disabled").removeClass("btn-disabled").addClass('btn-primary');//可以重新输入手机
        	        $("#sendEmailActiveCode").text("重新获取验证码");
        	        $.cookie("curCountForE", 0);
        	    }
        	    else {
        	    	curCountForE--;
        	        $("#sendEmailActiveCode").text("再过"+curCountForE +"秒,可再次获取验证码");
        	        $.cookie("curCountForE", curCountForE);
        	    }
        }, 1000); //启动计时器，1秒执行一次
	}
	$("#cred").change(function() {
		var certName = $("#cred  option:selected").text();
		$("#choseCert").val(certName);
	});
	
	$("#nextStep").click(function() {
		var pwd = $("#paramPWD").val();
		if(pwd == "") {
			$("#paramPWD").removeClass("Validform_right").addClass("Validform_error").next().removeClass("Validform_right").addClass("Validform_wrong").text("请输入密码");;
			return false;
		}
		$.ajax({
	          url: '/EditUserInfo.action?chackOldPassWord',
	          type: 'post',
	          dataType: "json",
	          data: {param:pwd},
	          success: function(data) {
	        	if(data.status == "n") {
	        		$("#paramPWD").removeClass("Validform_right").addClass("Validform_error").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
	        		return false;
	        	} else {
	        		checkPassword.submitForm(false);
	        	}											
	          }
	    });
	});
	
	//对修改密码的表单进行验证
	var checkPassword = $("#checkPassword").Validform({
		tiptype:4,
		postonce:true,
		datatype:{
			"password":function(gets,obj,curform,regxp) {
				var passone = gets;
				var reg1=/^[A-Za-z0-9]{4,16}$/;
				if(reg1.test(gets)){
					return true;
				}
				return false;
			}
		}
	});
	
	//向手机发送验证码
	$("#sendMobileActiveCode").click(function() {
		var mobile = $.trim($("#mobileNumber").val());
		var mobileReg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/;
		if(!mobileReg.test(mobile)) {
			$("#sendMobileActiveCode").next().removeClass("Validform_right").addClass("Validform_wrong").text("手机号码格式不正确");
			return false;
		}
		var vmResult = validateInput(mobile);
		if(vmResult == 1) {
			var result = checkLoginIdExist(mobile, 1, $("#emailAddress"), $("#emailAddress").siblings("span"));
			if(result == 0) {
				return false;
			} 
		}
		var errorType = $(this).next().hasClass("Validform_wrong");
		if(errorType) {
			$("#sendMobileActiveCode").attr("disabled", "true").removeClass("btn-primary").addClass('btn-disabled');;
			return false;
		} else {
			$("#sendMobileActiveCode").removeAttr("disabled").removeClass("btn-disabled").addClass('btn-primary');
		}
		$.ajax({
			type:"POST",
			url:"/UserCenterOperator.action?sendMobileCheckCode",
			dataType:"json",
			data:{mobile:mobile},
			success:function(data) {
				//alert(data.status);
				if($.trim(data.status)==="y") {
					$("#sendMobileActiveCode").attr("disabled", "true").removeClass("btn-primary").addClass('btn-disabled');;
					$("#mobileNumber").attr("disabled", "true").removeClass("btn-primary").addClass('btn-disabled');;
					$("#hiddenMobile").val(mobile);
					curCountForM = countForM;
					$.cookie("curCountForM", curCountForM);
					$("#sendMobileActiveCode").text("再过"+curCountForM +"秒,可再次获取验证码");
					 InterValObjForM = window.setInterval(function() {
	                	 if (curCountForM == 0) {                
	                	        window.clearInterval(InterValObjForM);//停止计时器
	                	        $("#sendMobileActiveCode").removeAttr("disabled").removeClass("btn-disabled").addClass('btn-primary');//启用按钮
	                	        $("#mobileNumber").removeAttr("disabled").removeClass("btn-disabled").addClass('btn-primary');//可以重新输入手机
	                	        $("#sendMobileActiveCode").text("重新获取验证码");
	                	        $.cookie("curCountForM", 0);
	                	    } else {
	                	        curCountForM--;
	                	        $("#sendMobileActiveCode").text("再过"+curCountForM +"秒,可再次获取验证码");
	                	        $.cookie("curCountForM", curCountForM);
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
			},error:function(){
			
			}
		});
	});
	
	$("#mobileNumber").blur(function() {
		var errorType = $(this).next().hasClass("Validform_wrong");
		if(errorType) {
			$("#sendMobileActiveCode").attr("disabled", "true").removeClass("btn-primary").addClass('btn-disabled');
			return false;
		} else {
			$("#sendMobileActiveCode").removeAttr("disabled").removeClass("btn-disabled").addClass('btn-primary');
		}
	});
	
	$("#emailAddress").blur(function() {
		//alert($(this)[0].validform_valid);
		var errorType = $(this).next().hasClass("Validform_wrong");
		if(errorType) {
			$("#sendEmailActiveCode").attr("disabled", "true").removeClass("btn-primary").addClass('btn-disabled');;
			return false;
		} else {
			$("#sendEmailActiveCode").removeAttr("disabled").removeClass("btn-disabled").addClass('btn-primary');
		}
	});
	
	//向邮箱发送验证码
	$("#sendEmailActiveCode").click(function() {
		var email = $.trim($("#emailAddress").val());
		var emailReg = /^([A-Za-z\d]+)([\._A-Za-z\d-]+)?@([A-Za-z\d])(([_A-Za-z\d-])+)?(\.[_A-Za-z\d-]+)*\.([A-Za-z]{2,4})$/;
		if(!emailReg.test(email)) {
			$("#sendEmailActiveCode").next().removeClass("Validform_right").addClass("Validform_wrong").text("邮箱格式不正确");
			return false;
		}
		var veResult = validateInput(email);
		if(veResult == 1) {
			var result = checkLoginIdExist(email, 1, $("#emailAddress"), $("#emailAddress").siblings("span"));
			if(result == 0) {
				return false;
			} 
		}
		var errorType = $(this).next().hasClass("Validform_wrong");
		if(errorType) {
			$("#sendEmailActiveCode").attr("disabled", "true").removeClass("btn-primary").addClass('btn-disabled');;
			return false;
		} else {
			$("#sendEmailActiveCode").removeAttr("disabled").removeClass("btn-disabled").addClass('btn-primary');
		}
		$.ajax({
			type:"POST",
			url:"/UserCenterOperator.action?sendEmailCheckCode",
			dataType:"json",
			data:{email:email},
			success:function(data) {
				if($.trim(data.status)==="y") {
					$("#hiddenEmail").val(email);
					$("#sendEmailActiveCode").attr("disabled", "true").removeClass("btn-primary").addClass('btn-disabled');;
					curCountForE = countForE;
					$.cookie("curCountForE", curCountForE);
					$("#emailAddress").attr("disabled", "true").removeClass("btn-primary").addClass('btn-disabled');;
					$("#sendEmailActiveCode").text("再过"+curCountForE+"秒,可再次获取验证码");
					InterValObjForE = window.setInterval(function() {
	                	 if (curCountForE == 0) {                
	                	        window.clearInterval(InterValObjForE);//停止计时器
	                	        $("#sendEmailActiveCode").removeAttr("disabled").removeClass("btn-disabled").addClass('btn-primary');//启用按钮
	                	        $("#emailAddress").removeAttr("disabled").removeClass("btn-disabled").addClass('btn-primary');//可以重新输入手机
	                	        $("#sendEmailActiveCode").text("重新获取验证码");
	                	        $.cookie("curCountForE", 0);
	                	    }
	                	    else {
	                	    	curCountForE--;
	                	        $("#sendEmailActiveCode").text("再过"+curCountForE +"秒,可再次获取验证码");
	                	        $.cookie("curCountForE", curCountForE);
	                	    }
	                }, 1000); //启动计时器，1秒执行一次
					return true;	
				} else if($.trim(data.status)==="n") {
					$("#sendEmailActiveCode").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
					return false;
				} else if($.trim(data.status)==="e") {
					alert(data.info);
					window.location.href = "/";
				} 
				return false;
			}
		});
		
	});
	
//	//选择图片
//	$(".btn-primary").click(function() {
////		$(this).next().click();
//		$(this).children().change(function(e){
//			if($(this).hasClass("IBV")) {
//				openFile(e, $("#headPic2"));
//				return false;
//			}
//			openFile(e, $("#headPic"));
//		});
//	});
//	
//	$(".IBV").click(function() {
//		$(this).next().click();
//		$(this).next().change(function(e){
//			openFile(e, $("#headPic2"));
//		});
//	});
	//显示图片
//	var openFile = function(event, output) {
//		if(browser == "Microsoft Internet Explorer") {
//			
//		} else {
//			var input = event.target;
//		    var reader = new FileReader();
//		    var newOutput = output;
//		    if(!/image/.test(input.files[0].type)) {
//		    	$("#picError").removeClass("Validform_right").addClass("Validform_wrong").text("文件格式不正确");
//		    	return false;
//		    }
//		    reader.onload = function(){
//		      var dataURL = reader.result;      
//		      newOutput.attr("src", dataURL);
//		      newOutput.parent().show();
//		    };
//		    reader.readAsDataURL(input.files[0]);
//		}
//	};
	
	
	//验证个人信息
	var pIdVerify = $("#pIdVerify").Validform({
		tiptype:4,
		ajaxPost:true,
		postonce:true,
		datatype:{
			"displayNameP":function(gets,obj,curform,regxp) {
				var nameReg = /^[\u4E00-\u9FA5]+$/;
				var name = gets;
				var flag = 1;
				if(!nameReg.test(name)) {
					flag = 0;
					return "请输入和身份证一致的姓名";
				}
				if(name.length > 8) {
					flag = 0;
					return "请输入和身份证一致的姓名";
				} 
				if(flag == 1) {
					return true;
				}
			},
			"virIdNumber":function (gets,obj,curform,regxp) {
				var idcard = gets; var city = {11 : "北京", 12 : "天津", 13 : "河北", 14 : "山西", 15 : "内蒙古", 21 : "辽宁", 22 : "吉林", 23 : "黑龙江 ", 31 : "上海", 32 : "江苏", 33 : "浙江", 34 : "安徽", 35 : "福建", 36 : "江西", 37 : "山东", 41 : "河南", 42 : "湖北 ", 43 : "湖南", 44 : "广东", 45 : "广西", 46 : "海南", 50 : "重庆", 51 : "四川", 52 : "贵州", 53 : "云南", 54 : "西藏 ", 61 : "陕西", 62 : "甘肃", 63 : "青海", 64 : "宁夏", 65 : "新疆", 71 : "台湾", 81 : "香港", 82 : "澳门", 91 : "国外 "}; var pass = true; if (idcard.length != 15 && idcard.length != 18) {pass = false; return pass; } var Ai = ""; if (idcard.length == 18) {Ai = idcard.substring(0, 17); } else if (idcard.length == 15) {Ai = idcard.substring(0, 6) + "19" + idcard.substring(6, 15); } var numValid = /^\d+$/; if (numValid.test(Ai) == false) {pass = false; return pass; } if (parseInt(Ai.substr(6, 4)) % 4 == 0 || (parseInt(Ai.substr(6, 4)) % 100 == 0 && parseInt(Ai.substr(6, 4)) % 4 == 0)) {ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; } else {ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; } if (ereg.test(idcard) == false) {pass = false; return pass; } if (!city[idcard.substr(0, 2)]) {pass = false; return pass; } else {if (idcard.length == 18) {idcard = idcard.split(''); var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]; var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]; var sum = 0; var ai = 0; var wi = 0; for ( var i = 0; i < 17; i++) {ai = idcard[i]; wi = factor[i]; sum += ai * wi; } var last = parity[sum % 11]; if (last != idcard[17]) {pass = false; return pass; } } } return pass;
			}
		},
		beforeCheck:function(curform){
			$("#verifyError").removeClass("Validform_wrong").text("");
		},
		beforeSubmit:function(curform){
            $("#nextStepPID").text("提交中...");
            $("#nextStepPID").attr("disabled", "true");
            $("#nextStepPID").addClass("forbidden");
            $("#verifyError").removeClass("Validform_wrong").text("");
        },
		callback:function(data){
			$("#nextStepPID").text("提交实名认证");
			$("#nextStepPID").removeAttr("disabled");
			$("#nextStepPID").removeClass("forbidden");
			if($.trim(data.status)==="y") {
				window.location.href = "/UserCenterController.action?goToSuccessPageForVPID";
			} else if($.trim(data.status)==="n") {
				$("#verifyError").removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
			}
		}
	});
	$("#nextStepEID").click(function() {
		if($("#pidpic").val().length == 0) {
			$("#pidpic").next().removeClass("Validform_right").addClass("Validform_wrong").text("请选择要上传的身份证图片");
			return false;
		} else {
			$("#pidpic").next().text("");
		}
	});
	
	$("#nextStepPID").click(function() {
//		if($("#headPic").attr("src").substring($("#headPic").attr("src").lastIndexOf('/')+1) == "head.png") {
//			$("#picError").removeClass("Validform_right").addClass("Validform_wrong").text("请选择要上传的图片");
//			return false;
//		} else {
//			$("#picError").text("");
//		}
		
		//  "Netscape" 
		if(browser == "Microsoft Internet Explorer") {
			if(pIdVerify.check()) {
				$("#pIdVerify").submit();
			}
		} else {
			pIdVerify.submitForm(false);
		}
	});
//	$("#netStepPID").click(function() {
//		pIdVerify.submitForm(false);
//	});
	var EBroVerify = $("#EBroVerify").Validform({
		tiptype:4,
		datatype:{
			"displayName":function(gets,obj,curform,regxp) {
				var nameReg = /^[a-zA-Z0-9_\\-\\.@\u4E00-\u9FA5]+$/;
				var name = gets;
				if(!nameReg.test(name)) {
					return "请输入8个字符以内的公司名";
				}
				if(name.length > 8) {
					return "请输入8个字符以内的公司名";
				} 
				return true;
			}
		}
	});
	
	//验证开发商认证信息
	var cIdVerify = $("#cIdVerify").Validform({
		tiptype:4,
		ajaxPost:true,
		postonce:true,
		datatype:{
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
			"displayNameC":function(gets,obj,curform,regxp) {
				var nameReg = /^[a-zA-Z0-9_\\.\u4e00-\u9fa5·•]+$/;
				var name = gets;
				if(!nameReg.test(name)) {
					return "请输入8个字以内的公司简称";
				}
				if(name.length > 8) {
					return "请输入8个字符以内的用户名"
				} 
				return true;
			}
		}, 
		callback:function(data){
			if($.trim(data.status)==="y") {
				window.location.href = "/UserCenterController.action?goToSuccessPageForVCID";
			} else if($.trim(data.status)==="n") {
				$("#picError").removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
			}
		}
	});
	var nextCid = 0;
	$("#netStepCID").click(function() {
//		if($("#cIdPic").val().length == 0) {
//			$("#cIdPic").next().removeClass("Validform_right").addClass("Validform_wrong").text("请选择要上传营业执照图片");
//			return false;
//		}
		if(changeCityFlag2 == 0) {
			nextCid = 0;
			$("#choseCity2").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的城市中进行选择");
			return false;
		} else if(changeCityFlag2 == 1) {
			$("#choseCity2").next().removeClass("Validform_wrong").addClass("Validform_right").text("");
			nextCid = 1;
		}
		if(nextCid == 1) {
			if(browser == "Microsoft Internet Explorer") {
				if(cIdVerify.check()) {
					$("#cIdVerify").submit();
				}
			} else {
				cIdVerify.submitForm(false);
			}
		}
		
	});
	
	//认证手机
	var verifyMobile = $("#verifyMobile").Validform({
		tiptype:4,
		ajaxPost:true,
		postonce:true,
		btnSubmit:"#okVMobile",
		callback:function(data){
			if($.trim(data.status)==="y") {
				 $.cookie("curCountForM", 0);
				window.location.href = "/UserCenterController.action?goToSuccessPageForVMobie";
			} else if($.trim(data.status)==="n") {
				$("#sendMobileActiveCode").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
			} else if($.trim(data.status)==="e") {
				window.location.href = "/";
			}
		}
	});
	
	//认证邮箱
	var verifyEmail = $("#verifyEmail").Validform({
		tiptype:4,
		ajaxPost:true,
		postonce:true,
		btnSubmit:"#okVEmail",
		callback:function(data){
			if($.trim(data.status)==="y") {
				$.cookie("curCountForE", 0);
				window.location.href = "/UserCenterController.action?goToSuccessPageForVEmail";
			} else if($.trim(data.status)==="n") {
				$("#sendEmailActiveCode").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
			} else if($.trim(data.status)==="e") {
				window.location.href = "/";
			}
		}
	});
	
	//验证资质认证的资料
	var certVF = $("#certVF").Validform({
		tiptype:4,
		ajaxPost:true,
		postonce:true,
		callback:function(data){
			if($.trim(data.status)==="y") {
				window.location.href = "/UserCenterController.action?goToSuccessPageForVCert";
			} else if($.trim(data.status)==="n") {
				$("#picError").removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
			}
		}
	});
	$("#nextCert").click(function() {
		if($("#headPic").attr("src").substring($("#headPic").attr("src").lastIndexOf('/')+1) == "head.png") {
			$("#picError").removeClass("Validform_right").addClass("Validform_wrong").text("请选择要上传资质图片");
			return false;
		} else {
			$("#picError").text("请选择要上传资质图片");
		}
		if(browser == "Microsoft Internet Explorer") {
			if(certVF.check()) {
				$("#certVF").submit();
			}
		} else {
			certVF.submitForm(false);
		}
	});
	//验证在职认证信息
	var agency = $("#agency").Validform({
		tiptype:4,
		ajaxPost:true,
		postonce:true,
		callback:function(data){
			if($.trim(data.status)==="y") {
				window.location.href = "/UserCenterController.action?goToSuccessPageForVBro";
			} else if($.trim(data.status)==="n") {
				$("#picError").removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
			}
		}
	});
	
	var nextFlag = 0;
	$("#nextStepBV").click(function() {
		if(!$("#promise").is(":checked")) {
    		$(this).removeClass("confirmBtn").addClass("btn-disabled");
    		$(this).attr("disabled", "disabled");
    		return false;
    	} else {
    		$(this).removeClass("btn-disabled").addClass("confirmBtn");
    		$(this).removeAttr("disabled");
    	}
		if(changeCityFlag == 0) {
			nextFlag = 0;
			$("#brokerageInput").attr("readonly", "readonly");
			$("#salesofficeInput").attr("readonly", "readonly");
			$("#choseCity1").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的城市中进行选择");
			return false;
		} else if(changeCityFlag == 1) {
			$("#brokerageInput").removeAttr("readonly");
			$("#salesofficeInput").removeAttr("readonly");
			$("#choseCity1").next().removeClass("Validform_wrong").addClass("Validform_right").text("");
			nextFlag = 1;
		}
		if(changeBrokerageFlag == 0) {
			$("#brokerageInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的公司中进行选择");
			nextFlag = 0;
			return false;
		} else if(changeBrokerageFlag == 1) {
			$("#brokerageInput").next().removeClass("Validform_wrong").addClass("Validform_right").text("");
			nextFlag = 1;
		}
//		if(changeSalesOfficeFlag == 0) {
//			nextFlag = 0;
//			$("#salesofficeInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的门店中进行选择");
//			return false;
//		} else if(changeSalesOfficeFlag == 1) {
//			nextFlag = 1;
//			$("#salesofficeInput").next().removeClass("Validform_wrong").addClass("Validform_right").text("");
//		}
		if($("#headPic").attr("src").substring($("#headPic").attr("src").lastIndexOf('/')+1) == "head.png") {
			$("#picError").removeClass("Validform_right").addClass("Validform_wrong").text("请选择要上传的图片");
			return false;
		} else {
			$("#picError").text("");
		}
		if(nextFlag == 1) {
			if(browser == "Microsoft Internet Explorer") {
				if(agency.check()) {
					$("#agency").submit();
				}
			} else {
				agency.submitForm(false);
			}
		}
	});
	
	var independent = $("#independent").Validform({
		tiptype:4,
		ajaxPost:true,
		postonce:true,
		callback:function(data){
			if($.trim(data.status)==="y") {
				window.location.href = "/UserCenterController.action?goToSuccessPageForVBro";
			} else if($.trim(data.status)==="n") {
				$("#picError2").removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
			}
		}
	});
	var nextFlagf = 0;
	$("#nextStepIBV").click(function() {
		if(!$("#promiseB").is(":checked")) {
    		$(this).removeClass("confirmBtn").addClass("btn-disabled");
    		$(this).attr("disabled", "disabled");
    		return false;
    	} else {
    		$(this).removeClass("btn-disabled").addClass("confirmBtn");
    		$(this).removeAttr("disabled");
    	}
		if(changeCityFlag2 == 0) {
			$("#choseCity2").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的城市中进行选择");
			return false;
		} else if(changeCityFlag2 == 1) {
			$("#choseCity2").next().removeClass("Validform_wrong").addClass("Validform_right").text("");
			nextFlagf = 1;
		}
		if($("#headPic2").attr("src").substring($("#headPic2").attr("src").lastIndexOf('/')+1) == "head.png") {
			$("#picError2").removeClass("Validform_right").addClass("Validform_wrong").text("请选择要上传的图片");
			return false;
		} else {
			$("#picError2").text("");
		}
		if(nextFlagf == 1) {
			if(browser == "Microsoft Internet Explorer") {
				if(independent.check()) {
					independent.submitForm(false);
					//$("#independent").submit();
				}
			} else {
				independent.submitForm(false);
			}
		}
	});
	if($("#choseCity2").length > 0) {
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
				$("#cityCode2").val(ui.item.value).change();
				this.value = ui.item.label;
				$("#choseCity2").blur();
			}
		}).change(function() {
			if($(this).val() != cityName) {
				changeCityFlag2 = 0;
//				$("#cityCode").val("").change();
			}
		});
//		$("#cityCode").change(function() {
////			cacheCity2 = {};
//		});
		
		$("#choseCity2").blur(function() {
			var goTo = 0;
			$.each(cacheCity2, function(index, item) {
				goTo = 1;
				changeCityFlag2 = 0;
				if(item != undefined && item.length > 0) {
					$.each(item, function(i, it) {
						if(it.cityName == $.trim($("#choseCity2").val())) {
							$("#cityCode2").val(it.cityCode);
							changeCityFlag2 = 1;
							return false;
						} else {
							changeCityFlag2 = 0;
						}
					});
				}
				if(changeCityFlag2 == 1) {
					return false;
				}
			});
			if(goTo == 0) {
				changeCityFlag2 = 0;
				return false;
			}
		});
	}
	
	if($("#choseCity1").length > 0) {
		//选择城市1
		var cacheCity = {};
		var chosenCityPool = {};
		$("#choseCity1").autocomplete({
			minLength: 0,
			width: 318,
			autoFocus: true,
			source: function( request, response ) {
				changeCityFlag = 0;
				var term = request.term;
				if(term in cacheCity) {
					response($.map(cacheCity[term], function(item, index) {
						chosenCityPool = cacheCity[term];
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
	        	  cacheCity[term] = data.data;
	        	  chosenCityPool = data.data;
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
				changeCityFlag = 1;
				cityName = ui.item.label;
				$("#cityCode").val(ui.item.value).change();
				this.value = ui.item.label;
				$("#choseCity1").blur();
			}
		}).change(function() {
			if($(this).val() != cityName) {
				changeCityFlag = 0;
				//$("#cityCode").val("").change();
			}
		});
		
		$("#choseCity1").blur(function() {
			var goTo = 0;
			$.each(cacheCity, function(index, item) {
				goTo = 1;
				changeCityFlag = 0;
				$.each(item, function(i, it) {
					if(it.cityName == $.trim($("#choseCity1").val())) {
						changeCityFlag = 1;
						$("#cityCode").val(it.cityCode);
						return false;
					} else {
						changeCityFlag = 0;
					}
				});
				if(changeCityFlag == 1) {
					return false;
				}
			});
			if(goTo == 0) {
				changeCityFlag = 0;
			}
			if(changeCityFlag == 0) {
				$("#brokerageInput").attr("readonly", "readonly");
				$("#salesofficeInput").attr("readonly", "readonly");
				$("#choseCity1").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的城市中进行选择");
				return false;
			} else if(changeCityFlag == 1) {
				$("#brokerageInput").removeAttr("readonly");
				$("#salesofficeInput").removeAttr("readonly");
				$("#choseCity1").next().removeClass("Validform_wrong").addClass("Validform_right").text("");
			}
		});
//		$("#cityCode").change(function() {
////			cacheCity = {};
//		});
	}

	if($("#brokerageInput").length > 0) {
		//选择公司   scripts/city.json
		var cacheBrokerage = {};
		var chosenBrokeragePool = {}; //保存已选择的公司
		$("#brokerageInput").autocomplete({
			minLength: 0,
			width: 318,
			autoFocus: true,
			source: function( request, response ) {
				changeBrokerageFlag = 0;
				var cityCode = $("#cityCode").val();
				if(cityCode == null || cityCode == "") {
//					alert("请先选择城市");
					$("#brokerageInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请先选择城市");
					return false;
				}
				var term = request.term;
				if(term in cacheBrokerage) {
					response($.map(cacheBrokerage[term], function(item, index) {
						chosenBrokeragePool = cacheBrokerage[term];
						//alert(JSON.stringify(item));
						return {
							label: item.name,
							value: item.id
		              }
		            }));	
					return;
				}
				
	      $.ajax({
	          url: '/EditBrokerInfo.action?getBrokerageListByCityCode',
	          data: {cityCode: cityCode,keyword:encodeURIComponent(request.term)},
	          type: 'post',
	          dataType: "json",
	          success: function(data, status, xhr) {
	        	  cacheBrokerage[term] = data;
	        	  chosenBrokeragePool = data;
				response($.map(data, function(item, index) {
					return {
						label: item.name,
						value: item.id
	              }
	            }));												
	          },
	          error: function(data) {
	          }
	      });
			},
			select: function( event, ui ) {
				event.preventDefault();
				changeBrokerageFlag = 1;
				$("#brokerageId").val(ui.item.value);
				this.value = ui.item.label;
				brokerageName = this.value;
				$("#brokerageInput").blur();
			}
		}).change(function() {
			if($(this).val() != brokerageName) {
				changeBrokerageFlag = 0;
			}
		});
//		
//		.focus(function() {
//		    $(this).autocomplete("search", "");
//		})
		$("#brokerageInput").blur(function() {
			var goTo = 0;
			$.each(cacheBrokerage, function(index, item) {
				goTo = 1;
				changeBrokerageFlag = 0;
				$.each(item, function(i, it) {
					if(it.name == $.trim($("#brokerageInput").val())) {
						changeBrokerageFlag = 1;
						return false;
					} else {
						changeBrokerageFlag = 0;
					}
				});
				if(changeBrokerageFlag == 1) {
					return false;
				}
			});
			if(goTo == 0) {
				changeBrokerageFlag = 0;
				return false;
			}
		});
	}
	
	if($("#salesofficeInput").length > 0 ) {
		//选择门店
		var cacheSalesoffice = {};
		var chosenSalesOfficePool = {}; //保存已选择的门店
		$("#salesofficeInput").autocomplete({
			minLength: 0,
			width: 318,
			autoFocus: true,
			source: function( request, response ) {
				changeSalesOfficeFlag = 0;
				var brokerateName = $.trim($("#brokerageInput").val());
				if(brokerateName == null || brokerateName == "") {
					$("#salesofficeInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请先选择公司");
					return false;
				}
				var term = request.term;
				if(term in cacheSalesoffice) {
					response($.map(cacheSalesoffice[term], function(item, index) {
						chosenSalesOfficePool = cacheSalesoffice[term];
						return {
							label: item.name,
							value: item.id
		              }
		            }));	
					return;
				}
				var cityCode = $("#cityCode").val();
				var brokerageId = $("#brokerageId").val();
	      $.ajax({
	          url: '/EditBrokerInfo.action?getSalesOfficeListByCityCode',
	          data: {cityCode: cityCode,keyword:encodeURIComponent(request.term), brokerageId:brokerageId},
	          type: 'post',
	          dataType: "json",
	          success: function(data, status, xhr) {
	        	  cacheSalesoffice[term] = data;
	        	  chosenSalesOfficePool = data;
				response($.map(data, function(item, index) {
					return {
						label: item.name,
						value: item.id
	              }
	            }));												
	          },
	          error: function(data) {
	          }
	      });
			},
			select: function( event, ui ) {
				event.preventDefault();
				this.value = ui.item.label;
				changeSalesOfficeFlag = 1;
				$("#salesofficeId").val(ui.item.value);
				salesofficeName = this.value;
				$("#salesofficeInput").blur();
			}
		}).change(function() {
			if($(this).val() != salesofficeName) {
				changeSalesOfficeFlag = 0;
			}
		});
		$("#salesofficeInput").blur(function() {
			var goTo = 0;
			$.each(cacheSalesoffice, function(index, item) {
				goTo = 1;
				changeSalesOfficeFlag = 0;
				$.each(item, function(i, it) {
					if(it.name == $.trim($("#salesofficeInput").val())) {
						changeSalesOfficeFlag = 1;
						return false; 
					} else {
						changeSalesOfficeFlag = 0;
					}
				});
				if(changeSalesOfficeFlag == 1) {
					return false;
				}
			});
			if(goTo == 0) {
				changeSalesOfficeFlag = 0;
				return false;
			}
		});
	}
	//处理承诺的选中状态
	$("#promise").click(function() {
		if(!$(this).is(":checked")) {
    		$("#nextStepBV").removeClass("confirmBtn").addClass("btn-disabled");
    		$("#nextStepBV").attr("disabled", "disabled");
    		
    	} else {
    		$("#nextStepBV").removeClass("btn-disabled").addClass("confirmBtn");
    		$("#nextStepBV").removeAttr("disabled");
    	}
	});
	//处理承诺的选中状态
	$("#promiseB").click(function() {
		if(!$(this).is(":checked")) {
    		$("#nextStepIBV").removeClass("confirmBtn").addClass("btn-disabled");
    		$("#nextStepIBV").attr("disabled", "disabled");
    		
    	} else {
    		$("#nextStepIBV").removeClass("btn-disabled").addClass("confirmBtn");
    		$("#nextStepIBV").removeAttr("disabled");
    	}
	});
	//申请公司
	// $("#applyBrokerage").click(function() {
	// 	//待改0930
	// 	var popDIV = "<div class='divPopup' style='width:600px;'> " +
	// 	"<h5>提交新经纪公司</h5>" +
	// 	"<div class='divLine'>" +
	// 		"<div class='item'>城市 </div>" +
	// 		"<div class='itemInput'>" +
	// 			"<input class='unit15' type='text' maxlength='16' id='newBrokerageCity' placeholder='请选择城市'/><span>（必填）</span><span class='Validform_checktip'></span>" +
	// 		"</div>" +
	// 	"</div>"+
	// 	"<div class='divLine'>" +
	// 		"<div class='item'>公司简称 </div>" +
	// 		"<div class='itemInput'>" +
	// 			"<input class='unit5' type='text' maxlength='8' id='newBrokerageName' placeholder='请输入公司简称'/><span>（必填）</span><span class='Validform_checktip'><stripes:errors field='brokerageName'><stripes:errors/></span>" +
	// 		"</div>"+
	// 	"</div>"+
	// 	"<div class='divLine'>" +
	// 		"<div class='item'>公司全称 </div>" +
	// 		"<div class='itemInput'>" +
	// 			"<input class='unit15' type='text' maxlength='20' id='newBrokerageFullName' placeholder='请输入公司全称'/><span>（选填）</span><span class='Validform_checktip'><stripes:errors field='brokerageFullName'><stripes:errors/></span>" +
	// 		"</div>"+
	// 	"</div>"+
	// 	"<div class='divLine'>" +
	// 		"<div class='item'>公司地址 </div>" +
	// 		"<div class='itemInput'>" +
	// 			"<input type='text' class='unit25' maxlength='40' id='newBrokerageAdress' placeholder='请输入公司地址'/><span>（选填）</span><span class='Validform_checktip'><stripes:errors field='brokerageAddress'><stripes:errors/></span>" +
	// 		"</div>"+
	// 	"</div>"+
	// 	"<div class='divLine'>" +
	// 		"<div class='item'>公司电话 </div>" +
	// 		"<div class='itemInput'>" +
	// 			"<input type='text' class='unit25' maxlength='40' id='newBrokeragePhone' placeholder='请输入公司电话'/><span>（选填）</span><span class='Validform_checktip'><stripes:errors field='brokeragePhone'><stripes:errors/></span>" +
	// 		"</div>"+
	// 	"</div>"+
	// 		"<input type='hidden' maxlength='6' id='brokerageCityCode' />" +
	// 	"<div class='textBox' id='errorMessage'></div><div class='btnBox'><button id='closeApply' type='button' class='cancelBtn btn btn-danger'>取消</button><button id='applyBro' type='button' class='confirmBtn btn btn-success'>确定</button>" +
	// 	"</div></div>"
	// 	popBox($(popDIV), ".cancelBtn");
	// 	autoCompleteCity($("#newBrokerageCity"), $("#brokerageCityCode"));
	// 	$("#applyBro").bind('click', function() {
	// 		if(changeCityFlag == 0) {
	// 			$("#newBrokerageCity").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的城市中进行选择");
	// 			return false;
	// 		} else {
	// 			$("#newBrokerageCity").next().removeClass("Validform_wrong").addClass("Validform_right").text("");
	// 		}
	// 		var brokerageName = $.trim($("#newBrokerageName").val());
	// 		if(brokerageName == "") {
	// 			$("#newBrokerageName").next().removeClass("Validform_right").addClass("Validform_wrong").text("请输入公司名称");
	// 			return false;
	// 		}
	// 		var brokerageFullName = $("#newBrokerageFullName").val();
	// 		var newBrokerageAdress = $("#newBrokerageAdress").val();
	// 		var brokerageAddress = $("#newBrokerageAdress").val();
	// 		var brokeragePhone = $("#newBrokeragePhone").val();
	// 		var brokerageCityCode = $("#brokerageCityCode").val();
	// 		$("#closeApply").click();
	// 		$.ajax({
	// 			url:"/UserCenterOperator.action?applyNewBrokerage",
	// 			type:"POST",
	// 			data:{brokerageName:brokerageName, 
	// 				brokerageFullName:brokerageFullName, 
	// 				newBrokerageAdress:newBrokerageAdress,
	// 				brokerageAddress:brokerageAddress,
	// 				brokeragePhone:brokeragePhone,
	// 				brokerageCityCode:brokerageCityCode
	// 			},
	// 			dadaType:"json",
	// 			success:function(data, textStatus) {
	// 				var Qs="<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>" + data.info + "</p></div><div class='popLine clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
	// 				popBox($(Qs),".confirmBtn");
	// 			}
	// 		});
	// 	});
	// });
	$("#applyBrokerage").click(function() {
		fnCreatePopBox({
			title: '提交新经纪公司',
			confirmBtn: '提交',
			className:'divPop-lg brokerage',
			removeThis: false,
			divContent: '<form class="form-inline"> <div class="form-control"> <label for="newBrokerageCity">所在城市(必填):</label> <input type="text"  class="input-units-6" maxlength="16" id="newBrokerageCity" placeholder="请选择城市"/> <span class="Validform_checktip"></span> </div> <div class="form-control"> <label for="newBrokerageName">公司简称(必填):</label> <input type="text"  class="input-units-15" maxlength="8" id="newBrokerageName" placeholder="请输入公司简称"/> <span class="Validform_checktip"></span> </div> <div class="form-control"> <label for="newBrokerageFullName">公司全称(选填):</label> <input type="text"  class="input-units-15" maxlength="20" id="newBrokerageFullName" placeholder="请输入公司全称"/> <span class="Validform_checktip"></span> </div> <div class="form-control"> <label for="newBrokerageAdress">公司地址(选填):</label> <input type="text"  class="input-units-19" maxlength="40" id="newBrokerageAdress" placeholder="请输入公司地址"/> <span class="Validform_checktip"></span> </div> <div class="form-control"> <label for="newBrokeragePhone">公司电话(选填):</label> <input type="text"  class="input-units-15" maxlength="40" id="newBrokeragePhone" placeholder="请输入公司电话"/> <span class="Validform_checktip"></span> </div><input type="hidden" maxlength="6" id="brokerageCityCode" /> </form>',
			fn: function() {
				if(changeCityFlag == 0) {
		 			$("#newBrokerageCity").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的城市中进行选择");
		 			return false;
		 		} else {
		 			$("#newBrokerageCity").next().removeClass("Validform_wrong").addClass("Validform_right").text("");
		 		}
		 		var brokerageName = $.trim($("#newBrokerageName").val());
		 		if(brokerageName == "") {
		 			$("#newBrokerageName").next().removeClass("Validform_right").addClass("Validform_wrong").text("请输入公司名称");
		 			return false;
		 		}
		 		var brokerageFullName = $("#newBrokerageFullName").val();
		 		var newBrokerageAdress = $("#newBrokerageAdress").val();
		 		var brokerageAddress = $("#newBrokerageAdress").val();
		 		var brokeragePhone = $("#newBrokeragePhone").val();
		 		var brokerageCityCode = $("#brokerageCityCode").val();
		 		$.ajax({
		 			url:"/UserCenterOperator.action?applyNewBrokerage",
		 			type:"POST",
		 			data:{brokerageName:brokerageName, 
		 				brokerageFullName:brokerageFullName, 
		 				newBrokerageAdress:newBrokerageAdress,
		 				brokerageAddress:brokerageAddress,
		 				brokeragePhone:brokeragePhone,
		 				brokerageCityCode:brokerageCityCode
		 			},
		 			dadaType:"json",
		 			success:function(data, textStatus) {
		 				alertSetTime(data.info);
		 				$(".brokerage").remove();
		 				CoverLayer(0);
		 			}
		 		});
			}
		});
		autoCompleteCity($("#newBrokerageCity"), $("#brokerageCityCode"));
	})
});

//选择城市
function autoCompleteCity(chosseCity, cityCodeObj) {
	var result = 0;
	var cacheCity = {};
	var chosenCityPool = {};
	chosseCity.autocomplete({
		minLength: 0,
		width: 318,
		autoFocus: true,
		source: function( request, response ) {
			changeCityFlag = 0;
			var term = request.term;
			if(term in cacheCity) {
				response($.map(cacheCity[term], function(item, index) {
					chosenCityPool = cacheCity[term];
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
        	  cacheCity[term] = data.data;
        	  chosenCityPool = data.data;
			response($.map(data.data, function(item, index) {
				return {
					label: item.cityName,
                    value: item.cityName,
                    cityCode: item.cityCode
              }
            }));												
          },
          error: function(data) {
          }
      });
		},
		select: function( event, ui ) {
			event.preventDefault();
			changeCityFlag = 1;
			cityName = ui.item.label;
			cityCodeObj.val(ui.item.cityCode);
			this.value = ui.item.label;
			chosseCity.blur();
		}
	}).change(function() {
		if($(this).val() != cityName) {
			changeCityFlag = 0;
		}
	});
	
	chosseCity.blur(function() {
		var goTo = 0;
		$.each(cacheCity, function(index, item) {
			goTo = 1;
			changeCityFlag = 0;
			result = changeCityFlag;
			$.each(item, function(i, it) {
				if(it.cityName == $.trim(chosseCity.val())) {
					changeCityFlag = 1;
					result = changeCityFlag;
					return result;
				} else {
					changeCityFlag = 0;
				}
			});
			if(changeCityFlag == 1) {
				return result;
			}
		});
		if(goTo == 0) {
			changeCityFlag = 0;
			result = changeCityFlag;
		}
		if(changeCityFlag == 0) {
			result = changeCityFlag;
			//chosseCity.next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的城市中进行选择");
			return result;
		} else if(changeCityFlag == 1) {
			return result;
			//chosseCity.next().removeClass("Validform_wrong").addClass("Validform_right").text("");
		}
	});
}