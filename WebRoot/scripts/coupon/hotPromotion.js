$(function(){
	
	/**
	 * 活动相关
	 */
	//活动数据
	var promotions=[];
	//所点击的活动序号
	var promotion_index;

	//获取该小区下的活动信息
	$.ajax({
		url: '/Promotion.action?getIndexPromotion',
		dataType: "json",
		async: false,
		type: "post",
		cache: false,
		success: function(data) {
			
			var content="";
			$.each(data.beans, function(i, bean) {
				promotions.push(bean);
				
				content=content
				+" <div class='activity' style='opacity:1' >"
				+" <div class='infor'>"
				+"<h4>"+bean.residenceName+"</h4>"
				+"<strong>"+bean.title+"</strong>"
				+"<a href='###' class='joinActivity'>免费报名</a>"
				+"<span><em id='signs'>"+bean.signup+"</em>人已报名，活动还有<em>"+bean.time+"</em>天</span>"
				+"</div>"
				+"<a class='picBox' href='###'>"
				+"<img src='"+bean.pic+"' alt='新盘' />"
				+"</a>"	
				+"</div>"
			});
			$("#promotionInfo").append(content);
			
		}
	});
	
	
	/**
	 * 活动报名
	 */
	//计时器
	var InterValObjForM;
	$(".joinActivity").click(function() {
		$(".divPopup").remove();
		promotion_index = $(".joinActivity").index(this);
		var xCor = $(this).offset().left + $(this).width() + 10;
		var yCor = $(this).offset().top - 20;
			var oAttend = "<form class='divPopup attendDiv'>"
				+"<h5>" + promotions[promotion_index].title + "<button class='cancelBtn' type='button'>×</button></h5>"
				+"<div class='divLine'>"
				+"<div class='item'> 姓名 </div>"
				+"<div class='itemInput'>"
				+"<input id='relname' class='unit5 valid'  type='text' maxlength='16'>"
				+"<span class='Validform_checktip nameInfo '>请输入真实姓名</span>"
				+"<span class='Validform_checktip'>"
				+"</span> </div> </div>"
				+"<div class='divLine'>"
				+"<div class='item'> 手机号码 </div>"
				+"<div class='itemInput'>"
				+"<input id='mobile' type='text' class='unit8 valid' maxlength='11'>"
				+"<button type='button' class='actionBtn' id='sendMobileActiveCode'>发送验证码</button>"
				+"<span class='Validform_checktip mobileInfo '></span></div></div>"
				+"<div class='divLine'>"
				+"<div class='item'> 验证码</div>"
				+"<div class='itemInput'>"
				+"<input id='code' type='text' class='unit5 valid' maxlength='4'>"
				+"<span class='Validform_checktip codeInfo'></span></div></div>"
				+"<div class='divLine last'>"
				+"<a class='cancelBtn'>取消</a>"
				+"<button type='button' id='submitBut' class='confirmBtn promotionBtn'>报名活动</button>"
				+"<span class='Validform_checktip Validform_wrong totalInfo'></span>"
				+"</div></form>"; 
			$(".divPopup").remove();
			//发送验证码按钮恢复正常
			window.clearInterval(InterValObjForM);
			$(oAttend).appendTo('body').css({'left':xCor+'px','top':yCor+'px'});
			//添加事件验证
			addValidate();
			//添加对发送短信的控制
			sendMessage();
			fnTextVerify($("#mobile"),$("#mobile").next('.warning'),11);
			$(".divPopup .cancelBtn").bind('click',function(){
				$(".attendDiv").remove();
			});
			$(".promotionBtn").bind('click',function(){
				//提交表单事件写在这里
				
				if (isValidate()) { //验证通过

					$.ajax({
						url: '/PromotionAttendee.action?createPromotionAtende',
						data: {
							relname: $("#relname").val(),
							mobile: $("#mobile").val(),
							telCodes: $("#code").val(),
							promotionId: promotions[promotion_index].promotionId,
							developerZid: promotions[promotion_index].developerZid,
							residenceId: promotions[promotion_index].residenceId,
							title: promotions[promotion_index].title
						},
						dataType: "json",
						async: false,
						type: "post",
						cache: false,
						success: function(data) {
							switch (data.status) {
								case 0:
									$(".totalInfo").html("提交的参数不合法！");
									break;
								case 2:
									$(".codeInfo").html("验证码错误或已经过期");
									$("#code").addClass("Validform_error");
									break;
								case 3:
									alert("您已经参加过这项活动了,请勿重复参与");
									$(".attendDiv").remove();
									break;
								case 4:
									$(".totalInfo").html("系统繁忙！请稍后再试");
									break;
								case 1:
									alert("你已经成功报名了该项活动");
									$("#signs").text(Number($("#signs").text())+1);
									$(".attendDiv").remove();
									break;
								default:
									$(".totalInfo").html("系统繁忙！请稍后再试");
									break;
							}
						}
					});

				} else {
					if ($("#relname").val().length == 0) {
						$(".nameInfo").html("姓名为空")
					} else if ($("#mobile").val().length == 0) {
						$(".mobileInfo").html("号码为空");
					} else if ($("#code").val().length == 0) {
						$(".codeInfo").html("请输入验证码");
						$(".codeInfo").addClass("Validform_wrong");
					}
					$(".totalInfo").html("您的输入不符合要求，请仔细检查！");
				}

				
				//$(".attendDiv").remove();
			});
	});
	
	
	/**
	 * 活动表单验证
	 */

	//清空表单数据
	function clearInputs() {
		$("#relname").val("");
		$("#mobile").val("");
	}
	//对表单条件验证事件
	function addValidate() {
		$("#relname").blur(validateName);
		$("#mobile").blur(validateMobile);
		$("#code").blur(validateCode);
	}
	//判断参数的合法性
	function isValidate() {

		if ($(".nameInfo").text().length == 0 && $(".mobileInfo").text().length == 0 && !$(".codeInfo").hasClass("Validform_wrong") && $("#relname").val().length > 0 && $("#mobile").val().length > 0 && $("#code").val().length > 0) {
			return true;
		} else {
			return false;
		}
	}
	//参数没有错误提示时清楚提交按钮按的错误信息
	function emptyErrorInfo() {
		if (isValidate() && $(".totalInfo").html().length > 0) {
			$(".totalInfo").html("");
		}

	}
	//对名字进行验证
	function validateName() {

		if (/^(?![，,、])(?!.*?[，,、·•]$)[\u4e00-\u9fa5，,、·•]+$/.test($("#relname").val())) {
			$(".nameInfo").html("");
			if ($("#relname").hasClass("Validform_error")) {
				$("#relname").removeClass("Validform_error");
			}
			emptyErrorInfo();
		} else {
			$(".nameInfo").html("姓名错误");
			$("#relname").addClass("Validform_error");
		}
	}

	function validateMobile() {
		/*if(/^1(3|5|8|4)\d{9}$/.test($("#mobile").val())){*/
		//^1(3[4-9]|4[7]|5[0-2|7-9]|8[7-9])[0-9]{8}$
		if (/^1(3|5|8|4)\d{9}$/.test($("#mobile").val())) {
			$(".mobileInfo").html("");
			if ($("#mobile").hasClass("Validform_error")) {
				$("#mobile").removeClass("Validform_error");
			}
			emptyErrorInfo();
		} else if (/^1(3[4-9]|4[7]|5[0-2|7-9]|8[7-9])[0-9]{8}$/.test($("#mobile").val())) {
			$(".mobileInfo").html("");
			if ($("#mobile").hasClass("Validform_error")) {
				$("#mobile").removeClass("Validform_error");
			}
			emptyErrorInfo();
		} else {
			$(".mobileInfo").html("号码错误");
			$("#mobile").addClass("Validform_error");
		}
	}
	//验证码格式检测
	function validateCode() {
		if ($("#code").val().length == 0) {
			$(".codeInfo").html("请输入正确的验证码");
			$("#code").addClass("Validform_error");
		} else {
			$(".codeInfo").html("");
			if ($("#code").hasClass("Validform_error") || $(".codeInfo").hasClass("Validform_wrong")) {
				$("#code").removeClass("Validform_error");
				$(".codeInfo").removeClass("Validform_wrong");
			}
			emptyErrorInfo();
		}

	}

	//发送短信的控制
	function sendMessage() {

		$("#sendMobileActiveCode").click(function() {

			validateMobile();
			if (!$("#mobile").hasClass("Validform_error")) {
				//已经输入了验证码
				var curCountForM = 60;
				$("#sendMobileActiveCode").attr("disabled", "true").removeClass("actionBtn").addClass('forbidBtn');
				$("#mobile").attr("disabled", "true").removeClass("actionBtn").addClass('forbidBtn');
				$.ajax({
					url: '/PromotionAttendee.action?sendMobileCode',
					data: {
						mobile: $("#mobile").val()
					},
					dataType: "json",
					async: false,
					type: "post",
					cache: false,
					success: function(data) {
						switch (data.status) {
							case 0:
								//参数出错
								break;
							case 1:
								$(".codeInfo").html("验证码已发送");
								if ($("#codeInfo").hasClass("Validform_wrong")) {
									$("#codeInfo").removeClass("Validform_wrong");
								}
								emptyErrorInfo();
								$("#sendMobileActiveCode").text(curCountForM + "秒后可再次发送");
								InterValObjForM = window.setInterval(function() {
									if (curCountForM == 0) {
										window.clearInterval(InterValObjForM); //停止计时器
										$("#sendMobileActiveCode").removeAttr("disabled").removeClass("forbidBtn").addClass('actionBtn'); //启用按钮
										$("#mobile").removeAttr("disabled").removeClass("forbidBtn").addClass('actionBtn'); //可以重新输入手机
										$("#sendMobileActiveCode").text("重新获取验证码");
									} else {
										curCountForM--;
										$("#sendMobileActiveCode").text(curCountForM + "秒后可再次发送");
									}
								}, 1000); //启动计时器，1秒执行一次
								break;
							case 2:
								$(".codeInfo").html("发送过于频繁，您可以使用最新的验证码进行验证");
								$("#sendMobileActiveCode").text("发送验证码")
								$(".codeInfo").addClass("Validform_wrong");
							default:
								break;
						}
					}
				});

			}
		});

	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});