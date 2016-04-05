$(function() {
	var loginForm = $("#loginForm").Validform({
		tiptype:4,
		ajaxPost:true,
		postonce:true,
		beforeSubmit:function(curform){
			$(":submit").text('提交中...');
			$(":submit").attr("disabled", "true");
			$(":submit").addClass("forbidden");
		},
		callback:function(data){
			$(":submit").text('确定');
			$(":submit").removeAttr("disabled");
			$(":submit").removeClass("forbidden");
			// 未登录
			if(data.logined != undefined && data.logined == 'n'){
				$("#loginBtn").click();
				return ;
			}
			switch (data.respstat) {
				case '0000': // 成功
					window.location.href = "/UHomeController.action?gotoPage";
					break;
				case 'U0001': // 手机号不正确
					$("#mobile2").siblings(".Validform_checktip").text(data.respmsg).addClass("Validform_wrong");
					break;
				case 'U0002': // 手机号已被注册
					$("#mobile2").siblings(".Validform_checktip").html(data.info).addClass("Validform_wrong");
					break;
				case 'U0003': // 验证码错误或已经过期
					$("#validCode2").siblings(".Validform_checktip").text(data.respmsg).addClass("Validform_wrong");
					break;
				case 'U0004': // 该用户已绑定过手机
					alert(data.respmsg);
					break;
				default:
					alert(data.respmsg);
					break;
			}
		}
	});
	
	var mobileValidCode = {};
	mobileValidCode = new MobileValidCode({
		sendBtn : $("#sendMobileValidCode2"),
		mobileInput : $("#mobile2"),
		validCodeInput : $("#validCode2"),
		beforeSend : function() {
			var json = {};
			$.ajax({
				url: "/UHomeUser.action?checkMobileRegOrNot",
				data: {param : $("#mobile2").val()},
				dataType: "json",
				async: false,
				type: "post",
				cache: false,
				success: function(data) {
					json = data;
				}
			});
			if(json.status == 'y')
				return true;
			else{
				mobileValidCode.mobileError(json.info);
				return false;
			}
		}
	});
	
});

