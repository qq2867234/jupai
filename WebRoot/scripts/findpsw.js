var InterValObjForM; //timer变量，控制时间
var countForM = 60; //间隔函数，1秒执行
var curCountForM;//当前再过秒数
$(function(){
	
	// 1. 验证手机
	$("#checking").Validform({
		tiptype:4, 
		ajaxPost:true,
		ignoreHidden:true,
		beforeSubmit:function(curform){
            $(":submit").text('验证中...');
            $(":submit").attr("disabled", "true");
            $(":submit").addClass("forbidden");
        },
        callback:function(data){
			if($.trim(data.status)==="y") {
				window.location.href = "/UserCenterController.action?goToNextForChangingPWD";
				return true;	
			} else {
				$(":submit").text('验证');
		        $(":submit").removeAttr("disabled");
		        $(":submit").removeClass("forbidden");
				confirmDialog(data.info);
				return false;
			} 
			return false;
		}
	});
	
	// 2. 重置密码
	$("#getBack").Validform({
		tiptype:4, 
		ajaxPost:true,
		ignoreHidden:true,
		datatype:{
			"password" : function(gets,obj,curform,regxp) {
				var reg1=/^[A-Za-z0-9]{6,16}$/;
				if(reg1.test(gets)){return true;}
				return false;
			}
		},
		beforeSubmit:function(curform){
            $(":submit").text('提交中...');
            $(":submit").attr("disabled", "true");
            $(":submit").addClass("forbidden");
        },
		callback:function(data){
			if($.trim(data.status)==="y") {
				$(":submit").text('重置成功');
				alertSetTime("密码重置成功，页面跳转中...", 10000);
				setTimeout(function() {
					window.location.href = "/";
				}, 3000);
			} else {
				$(":submit").text('确定');
		        $(":submit").removeAttr("disabled");
		        $(":submit").removeClass("forbidden");
				confirmDialog(data.info);
			}
		}
	});
	
	new MobileValidCode({
		mobileInput : $("#mobile2"),
		validCodeInput : $("#validCode2"),
		sendBtn : $("#sendMobileValidCode2")
	});

});
