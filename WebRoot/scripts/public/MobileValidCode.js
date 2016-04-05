/**
 * 手机验证码工具类
 */
var MobileValidCode = {
	t : null,
	mobileInput : $("#mobile"), // 手机输入框
	captchaInput : $("#captcha"), // 图形验证码输入框
	validCodeInput : $("#validCode"), // 短信验证码输入框
	sendBtn : null, // 发送验证码按钮
	sendUrl : null, // 发送验证码接口
	needCaptcha : true, // 默认需要图形验证码
	beforeSend : null,
	// 验证手机
	validateMobile : function() {
		if(MobileValidCode.mobileInput.val()==''){
			MobileValidCode.mobileInput.siblings(".Validform_checktip").html("请输入手机号").addClass("Validform_wrong");
			return false;
		}
		if (/^1(3|5|8|4|7)\d{9}$/.test(MobileValidCode.mobileInput.val())) {
			MobileValidCode.mobileInput.siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
		} else if (/^1(3[4-9]|4[7]|5[0-2|7-9]|8[7-9])[0-9]{8}$/.test(MobileValidCode.mobileInput.val())) {
			MobileValidCode.mobileInput.siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
		} else {
			MobileValidCode.mobileInput.siblings(".Validform_checktip").html("请输入正确的手机号").addClass("Validform_wrong");
			return false;
		}
		return true;
	},
	// 验证图形验证码
	validateCaptcha : function() {
		if(MobileValidCode.needCaptcha) return true;
		if(MobileValidCode.captchaInput.val()==''){
			MobileValidCode.captchaInput.siblings(".Validform_checktip").html("请输入验证码").addClass("Validform_wrong");
			return false;
		}
		if(MobileValidCode.captchaInput.val().length != 4){
			MobileValidCode.captchaInput.siblings(".Validform_checktip").html("请输入正确的验证码").addClass("Validform_wrong");
			return false;
		}
		return true;
	},
	// 绑定发送短信事件
	bindSendMessageEvent : function(param) {
		if(param === undefined) param = {};
		MobileValidCode.mobileInput = param.mobileInput || $("#mobile"); // 手机输入框
		MobileValidCode.captchaInput = param.captchaInput || $("#captcha"); // 图形验证码输入框
		MobileValidCode.validCodeInput = param.validCodeInput || $("#validCode"); // 短信验证码输入框
		MobileValidCode.sendBtn = param.sendBtn || $("#sendMobileValidCode"); // 发送验证码按钮
		MobileValidCode.needCaptcha = param.needCaptcha == false ? false : true; // 默认需要图形验证码
		
		if(param.beforeSend != undefined){
			MobileValidCode.beforeSend = param.beforeSend;
		}
		
		if(MobileValidCode.needCaptcha){
			MobileValidCode.sendUrl = param.sendUrl || "/SMS.action?sendMobileValidCode"; // 发送验证码接口(需要图形验证码)
			postData.captcha = MobileValidCode.captchaInput.val();
		}
		else{
			MobileValidCode.sendUrl = param.sendUrl || "/SMS.action?sendValidCode"; // 发送验证码接口(不需要图形验证码)
		}
		
		MobileValidCode.sendBtn.click(function() {
			
			var postData = {mobile : MobileValidCode.mobileInput.val()};
			
			// 发送验证码之前的验证
			if(MobileValidCode.beforeSend != null){
				// 验证不通过
				if(!MobileValidCode.beforeSend()){
					return;
				}
			}
			
			// 需要验证图形验证码
			if(MobileValidCode.needCaptcha){
				postData.captcha = MobileValidCode.captchaInput.val();
			}
			// 手机有误
			if(!MobileValidCode.validateMobile()) return;
			// 需要图形验证码，并且格式有误
			if(MobileValidCode.needCaptcha && !MobileValidCode.validateCaptcha()) return;
			MobileValidCode.sendBtn.text("发送中...");
			MobileValidCode.sendBtn.attr("disabled", "true");
			var second = 60;
			$.ajax({
				url: MobileValidCode.sendUrl,
				data: postData,
				dataType: "json",
				async: false,
				type: "post",
				cache: false,
				success: function(data) {
					// 未登录
					if(data.logined != undefined && data.logined == 'n'){
						$("#loginBtn").click();
						MobileValidCode.sendBtn.text("发送验证码");
						MobileValidCode.sendBtn.removeAttr("disabled");
						return ;
					}
					switch (data.status) {
						case 0: // 手机号有误
							MobileValidCode.mobileInput.siblings(".Validform_checktip").html("请输入正确的手机号").addClass("Validform_wrong");
							MobileValidCode.sendBtn.text("发送验证码");
							break;
						case 1: // 发送成功
							MobileValidCode.validCodeInput.siblings(".Validform_checktip").html("");
							if (MobileValidCode.validCodeInput.siblings(".Validform_checktip").hasClass("Validform_wrong")) {
								MobileValidCode.validCodeInput.siblings(".Validform_checktip").removeClass("Validform_wrong");
							}
							MobileValidCode.sendBtn.text("重新发送("+second+")");
							MobileValidCode.t = window.setInterval(function() {
								if (second == 0) {
									window.clearInterval(MobileValidCode.t); //停止计时器
									MobileValidCode.sendBtn.removeAttr("disabled"); //启用按钮
									MobileValidCode.sendBtn.text("重新发送");
								} else {
									second--;
									MobileValidCode.sendBtn.text("重新发送("+second+")");
								}
							}, 1000); //启动计时器，1秒执行一次
							return;
						case 2: // 发送过于频繁
							MobileValidCode.validCodeInput.siblings(".Validform_checktip").html("发送过于频繁，您可以使用最新的验证码进行验证").addClass("Validform_wrong");
							MobileValidCode.sendBtn.text("发送验证码");
							break;
						case 3: // 图形验证码错误
							MobileValidCode.captchaInput.siblings(".Validform_checktip").html("请输入正确的验证码").addClass("Validform_wrong");
							MobileValidCode.sendBtn.text("发送验证码");
							break;
						case -1: // 系统异常
							MobileValidCode.sendBtn.text("发送验证码");
							alertDialog("服务器异常，请稍后再试");
							break;
						default:
							MobileValidCode.sendBtn.text("发送验证码");
							alertDialog("服务器异常，请稍后再试");
							break;
					}
					MobileValidCode.sendBtn.removeAttr("disabled");
				},
				error:function(error){
					MobileValidCode.sendBtn.text("发送验证码");
					MobileValidCode.sendBtn.removeAttr("disabled");
					alertDialog("服务器异常，请稍后再试");
				}
			});
		});
	}
};