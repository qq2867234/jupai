$(function() {
	$("#resetTranPwdForm").Validform({
		tiptype:4,
		ajaxPost:true,
		postonce:true,
		beforeSubmit:function(curform){
			$(":submit").text('提交中...');
			$(":submit").attr("disabled", "true");
			$(":submit").addClass("forbidden");
		},
		callback:function(data){
			if(data.respstat === undefined || data.respstat != '0000'){
				$(":submit").text('确定');
				$(":submit").removeAttr("disabled");
				$(":submit").removeClass("forbidden");
			}
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
				case 'U0015': // 验证码有误
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
		},
		datatype:{
			"virIdNumber":function (gets,obj,curform,regxp) {
				var idcard = gets; var city = {11 : "北京", 12 : "天津", 13 : "河北", 14 : "山西", 15 : "内蒙古", 21 : "辽宁", 22 : "吉林", 23 : "黑龙江 ", 31 : "上海", 32 : "江苏", 33 : "浙江", 34 : "安徽", 35 : "福建", 36 : "江西", 37 : "山东", 41 : "河南", 42 : "湖北 ", 43 : "湖南", 44 : "广东", 45 : "广西", 46 : "海南", 50 : "重庆", 51 : "四川", 52 : "贵州", 53 : "云南", 54 : "西藏 ", 61 : "陕西", 62 : "甘肃", 63 : "青海", 64 : "宁夏", 65 : "新疆", 71 : "台湾", 81 : "香港", 82 : "澳门", 91 : "国外 "}; var pass = true; if (idcard.length != 15 && idcard.length != 18) {pass = false; return pass; } var Ai = ""; if (idcard.length == 18) {Ai = idcard.substring(0, 17); } else if (idcard.length == 15) {Ai = idcard.substring(0, 6) + "19" + idcard.substring(6, 15); } var numValid = /^\d+$/; if (numValid.test(Ai) == false) {pass = false; return pass; } if (parseInt(Ai.substr(6, 4)) % 4 == 0 || (parseInt(Ai.substr(6, 4)) % 100 == 0 && parseInt(Ai.substr(6, 4)) % 4 == 0)) {ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; } else {ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; } if (ereg.test(idcard) == false) {pass = false; return pass; } if (!city[idcard.substr(0, 2)]) {pass = false; return pass; } else {if (idcard.length == 18) {idcard = idcard.split(''); var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]; var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]; var sum = 0; var ai = 0; var wi = 0; for ( var i = 0; i < 17; i++) {ai = idcard[i]; wi = factor[i]; sum += ai * wi; } var last = parity[sum % 11]; if (last != idcard[17]) {pass = false; return pass; } } } return pass;
			}
		}
	});
	
	/**
	 * 手机验证码工具类
	 */
	var MobileValidCode = {
		t : null,
		// 验证手机
		validateMobile : function() {
			if($("#mobile2").val()==''){
				$("#mobile2").siblings(".Validform_checktip").html("请输入手机号").addClass("Validform_wrong");
				return false;
			}
			if (/^1(3|5|8|4|7)\d{9}$/.test($("#mobile2").val())) {
				$("#mobile2").siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
			} else if (/^1(3[4-9]|4[7]|5[0-2|7-9]|8[7-9])[0-9]{8}$/.test($("#mobile2").val())) {
				$("#mobile2").siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
			} else {
				$("#mobile2").siblings(".Validform_checktip").html("请输入正确的手机号").addClass("Validform_wrong");
				return false;
			}
			return true;
		},
		// 绑定发送短信事件
		bindSendMessageEvent : function() {
			var sendBtn = $("#sendMobileValidCode2");
			sendBtn.click(function() {
				// 验证手机
				if(MobileValidCode.validateMobile()){
					sendBtn.text("发送中...");
					sendBtn.attr("disabled", "true");
					sendBtn.addClass("forbidden");
					var second = 60;
					$.ajax({
						url: "/UHomeUser.action?findTranPwdSendVailCode",
						data: {
							mobile: $("#mobile2").val()
						},
						dataType: "json",
						async: false,
						type: "post",
						cache: false,
						success: function(data) {
							// 未登录
							if(data.logined != undefined && data.logined == 'n'){
								$("#loginBtn").click();
								sendBtn.text("发送验证码");
								sendBtn.removeAttr("disabled");
								sendBtn.removeClass("forbidden");
								return ;
							}
							switch (data.status) {
								case '0': // 失败
								case 'failed':
									alertDialog(data.message);
									break;
								case '2':
									alertDialog(data.message);
									break;
								case 1:
									$("#validCode2").siblings(".Validform_checktip").html("验证码已发送").addClass("Validform_wrong");
									sendBtn.text("重新发送("+second+")");
									MobileValidCode.t = window.setInterval(function() {
										if (second == 0) {
											window.clearInterval(MobileValidCode.t); //停止计时器
											sendBtn.removeAttr("disabled"); //启用按钮
											sendBtn.removeClass("forbidden");
											sendBtn.text("重新发送");
										} else {
											second--;
											sendBtn.text("重新发送("+second+")");
										}
									}, 1000); //启动计时器，1秒执行一次
									return;
								case '-1': // 系统异常
									alertDialog("服务器异常，请稍后再试");
									break;
								default:
									alertDialog("服务器异常，请稍后再试");
									break;
							}
							sendBtn.text("发送验证码");
							sendBtn.removeAttr("disabled");
							sendBtn.removeClass("forbidden");
						},
						error:function(error){
							sendBtn.text("发送验证码");
							sendBtn.removeAttr("disabled");
							sendBtn.removeClass("forbidden");
							alertDialog("服务器异常，请稍后再试");
						}
					});
				}
			});
		}
	};

	MobileValidCode.bindSendMessageEvent();
});