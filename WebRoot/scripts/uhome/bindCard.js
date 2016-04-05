$(function() {
	$("#provinceCode").change(function() {
		$.ajax({
			url: "/UHomeUser.action?cityListByProvince",
			data: {
				provinceCode: $("#provinceCode").val()
			},
			dataType: "json",
			async: false,
			type: "post",
			cache: true,
			success: function(data) {
				$("#cityCode").empty();
				$.each(data.citylist, function(i, item) {
					$("#cityCode").append("<option value='"+item.areacode+"'>"+item.areaname+"</option>");
				});
				$("#provinceCode").blur();
			}
		});
	});

	// ===========================================
	// 验证码绑卡
	// ===========================================
	
	$("#quickPayForm").Validform({
		tiptype:4,
		ajaxPost:true,
		postonce:true,
		datatype:{
			"virIdNumber":function (gets,obj,curform,regxp) {
				return true;
			}
		},
		beforeSubmit:function(curform){
			$(":submit").text('提交中...');
			$(":submit").attr("disabled", "true");
			$(":submit").addClass("forbidden");
			$(".form-warn").hide().children().html("");
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
			switch (data.status) {
			case 'success': // 成功
				window.location.href = "/UHomeController.action?gotoOpenSuccessPage";
				break;
			case 'failed': // 失败
				$(".form-warn").show().children().html(data.respmsg);
				break;
			default:
				alertDialog(data.respmsg);
				break;
			}
		}
	});
	
	var mobileValidCode = {};
	mobileValidCode = new MobileValidCode({
		// 发送短信接口
		sendUrl : "/UHomeUser.action?quickPaySendCode",
		sendBtn : $("#sendMobileValidCode2"),
		mobileInput : $("#mobile2"),
		validCodeInput : $("#validCode2"),
		// 额外参数（银行卡信息）[不使用函数的话，值是null]
		extraOptions : function() {
			return {
				bankNo: $("#bankNo").val(),
				cardNo: $("#cardNo").val(),
			};
		},
		// 发送之前验证银行卡
		beforeSend : function() {
			if($("#cardNo").val()==''){
				$("#cardNo").siblings(".Validform_checktip").html("请输入卡号").addClass("Validform_wrong");
				return false;
			}
			if($("#cardNo").val().length < 16 || $("#cardNo").val().length > 19){
				$("#cardNo").siblings(".Validform_checktip").html("请输入正确的卡号").addClass("Validform_wrong");
				return false;
			}
			$("#cardNo").siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
			$(".form-warn").hide().children().html("");
			return true;
		},
		callback : function(data) {
			// 未登录
			if(data.logined != undefined && data.logined == 'n'){
				sendBtn.text('发送验证码');
				sendBtn.removeAttr("disabled");
				sendBtn.removeClass("forbidden");
				alertDialog("登录超时，请重新登录");
				return ;
			}
			switch (String(data.status)) {
				case '0': // 失败
				case 'failed':
					$(".form-warn").show().children().html(data.respmsg+"<p>注：如果确认您填写的信息是正确的，请使用 <a href='/UHomeController.action?gotoBindCardPage' style='color:#D9534F;'>小额扣款</a> 的方式绑定银行卡<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;扣除金额0到1元不等，10个工作日内退还</p>");
					break;
				case 'success': // 发送成功
					mobileValidCode.success();
					return ;
				case '2': // 银行卡无效
					$("#cardNo").siblings(".Validform_checktip").html(data.respmsg).addClass("Validform_wrong");
					break;
				case '3': // 手机号有误
					$("#mobile2").siblings(".Validform_checktip").html(data.respmsg).addClass("Validform_wrong");
					break;
				case '-1': // 系统异常
				default:
					mobileValidCode.exception();
					break;
			}
			mobileValidCode.resetButton();
		}
	});

//	/**
//	 * 手机验证码工具类
//	 */
//	var MobileValidCode = {
//		t : null,
//		// 验证手机
//		validateMobile : function() {
//			if($("#mobile2").val()==''){
//				$("#mobile2").siblings(".Validform_checktip").html("请输入手机号").addClass("Validform_wrong");
//				return false;
//			}
//			if (/^1(3|5|8|4|7)\d{9}$/.test($("#mobile2").val())) {
//				$("#mobile2").siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
//			} else if (/^1(3[4-9]|4[7]|5[0-2|7-9]|8[7-9])[0-9]{8}$/.test($("#mobile2").val())) {
//				$("#mobile2").siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
//			} else {
//				$("#mobile2").siblings(".Validform_checktip").html("请输入正确的手机号").addClass("Validform_wrong");
//				return false;
//			}
//			return true;
//		},
//		validateCard : function() {
//			if($("#cardNo").val()==''){
//				$("#cardNo").siblings(".Validform_checktip").html("请输入卡号").addClass("Validform_wrong");
//				return false;
//			}
//			if($("#cardNo").val().length < 16 || $("#cardNo").val().length > 19){
//				$("#cardNo").siblings(".Validform_checktip").html("请输入正确的卡号").addClass("Validform_wrong");
//				return false;
//			}
//			$("#cardNo").siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
//			return true;
//		},
//		// 绑定发送短信事件
//		bindSendMessageEvent : function() {
//			var sendBtn = $("#sendMobileValidCode2");
//			sendBtn.click(function() {
//				// 验证手机
//				if(MobileValidCode.validateCard() && MobileValidCode.validateMobile()){
//					sendBtn.text('发送中...');
//					sendBtn.attr("disabled", "true");
//					sendBtn.addClass("forbidden");
//					$(".form-warn").hide().children().html("");
//					var second = 60;
//					$.ajax({
//						url: "/UHomeUser.action?quickPaySendCode",
//						data: {
//							bankNo: $("#bankNo").val(),
//							cardNo: $("#cardNo").val(),
//							mobile: $("#mobile2").val()
//						},
//						dataType: "json",
//						async: false,
//						type: "post",
//						cache: false,
//						success: function(data) {
//							// 未登录
//							if(data.logined != undefined && data.logined == 'n'){
//								sendBtn.text('发送验证码');
//								sendBtn.removeAttr("disabled");
//								sendBtn.removeClass("forbidden");
//								return ;
//							}
//							switch (String(data.status)) {
//								case '0': // 失败
//								case 'failed':
//									$(".form-warn").show().children().html(data.respmsg+"<p>注：如果确认您填写的信息是正确的，请使用 <a href='/UHomeController.action?gotoBindCardPage' style='color:#D9534F;'>小额扣款</a> 的方式绑定银行卡<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;扣除金额0到1元不等，10个工作日内退还</p>");
//									break;
//								case 'success': // 发送成功
//									$("#validCode2").siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
//									if ($("#validCode2").siblings(".Validform_checktip").hasClass("Validform_wrong")) {
//										$("#validCode2").siblings(".Validform_checktip").removeClass("Validform_wrong");
//									}
//									sendBtn.text("重新发送("+second+")");
//									MobileValidCode.t = window.setInterval(function() {
//										if (second == 0) {
//											window.clearInterval(MobileValidCode.t); //停止计时器
//											sendBtn.text("重新发送");
//											sendBtn.removeAttr("disabled"); //启用按钮
//											sendBtn.removeClass("forbidden");
//										} else {
//											second--;
//											sendBtn.text("重新发送("+second+")");
//										}
//									}, 1000); //启动计时器，1秒执行一次
//									return;
//								case '2': // 银行卡无效
//									$("#cardNo").siblings(".Validform_checktip").html(data.respmsg).addClass("Validform_wrong");
//									break;
//								case '3': // 手机号有误
//									$("#mobile2").siblings(".Validform_checktip").html(data.respmsg).addClass("Validform_wrong");
//									break;
//								case '-1': // 系统异常
//									alertDialog("服务器异常，请稍后再试");
//									break;
//								default:
//									alertDialog("服务器异常，请稍后再试");
//									break;
//							}
//							sendBtn.text('发送验证码');
//							sendBtn.removeAttr("disabled");
//							sendBtn.removeClass("forbidden");
//						},
//						error:function(error){
//							sendBtn.text('发送验证码');
//							sendBtn.removeAttr("disabled");
//							sendBtn.removeClass("forbidden");
//							alertDialog("服务器异常，请稍后再试");
//						}
//					});
//				}
//			});
//		}
//	};
//
//	MobileValidCode.bindSendMessageEvent();
	
	// ===========================================
	// 小额扣款绑卡
	// ===========================================
	// 确认小额扣款
	$(".bindCardXin").click(function() {
		$(".form-warn").hide().children().html("");
		if($.trim($("#cardNo").val())==''){
			$("#cardNo").siblings(".Validform_checktip").html("请输入银行卡号").addClass("Validform_wrong");
			return ;
		}else if($.trim($("#cardNo").val()).length < 16 || $.trim($("#cardNo").val()).length > 19){
			$("#cardNo").siblings(".Validform_checktip").html("请输入正确的银行卡号").addClass("Validform_wrong");
			return ;
		}
		else{
			$("#cardNo").siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
		}
		$(".bindCardXin").text('提交中...');
		$(".bindCardXin").attr("disabled", "true");
		$(".bindCardXin").addClass("forbidden");
		$.ajax({
			url: "/UHomeUser.action?bindCardXin",
			data: {
				bankNo: $("#bankNo").val(),
				cardNo: $("#cardNo").val(),
				provinceCode: $("#provinceCode").val(),
				cityCode: $("#cityCode").val()
			},
			dataType: "json",
			async: false,
			type: "post",
			cache: false,
			success: function(data) {
				$(".bindCardXin").text('确定小额扣款');
				$(".bindCardXin").removeAttr("disabled");
				$(".bindCardXin").removeClass("forbidden");
				// 未登录
				if(data.logined != undefined && data.logined == 'n'){
					alertDialog("登录超时，请重新登录");
					return ;
				}
				switch (String(data.stat)) {
					case '0': // 失败
						$(".form-warn").show().children().html(data.msg);
						break;
					case '1': // 成功
						$(".form-warn").show().children().html("扣款成功！请输入您收到的扣款短信通知金额。<br/>注：如果未收到短信，请登录网上银行查看交易记录。");
						$("#bankNo,#cardNo,#provinceCode,.bindCardXin").parents(".form-control").hide();
						$("#amount,:submit").parents(".form-control").show();
						break;
					case '2': // 银行卡无效
						$("#cardNo").siblings(".Validform_checktip").html(data.msg).addClass("Validform_wrong");
						break;
					case '-1': // 系统异常
						alertDialog("服务器异常，请稍后再试");
						break;
					default:
						alertDialog("服务器异常，请稍后再试");
						break;
				}
			},
			error:function(error){
				$(".bindCardXin").text('确定小额扣款');
				$(".bindCardXin").removeAttr("disabled");
				$(".bindCardXin").removeClass("forbidden");
				alertDialog("服务器异常，请稍后再试");
			}
		});
	});
	
	// 验证扣款金额
	$("#bindCardForm").Validform({
		tiptype:4,
		ajaxPost:true,
		postonce:true,
		datatype:{
			"virAmount":function (gets,obj,curform,regxp) {
				if (/^\d{0,1}.?\d{0,2}$/.test(gets) && parseFloat(gets) >= 0.01 && parseFloat(gets) <= 1) return true;
				return false;
			}
		},
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
			switch (String(data.status)) {
			case '1': // 成功
				window.location.href = "/UHomeController.action?gotoOpenSuccessPage";
				break;
			case '0': // 失败
				$("#amount").siblings(".Validform_checktip").text(data.message).addClass("Validform_wrong");
				break;
			default:
				alertDialog(data.message);
				break;
			}
		}
	});
	
});