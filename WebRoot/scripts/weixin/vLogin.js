function refresh() {
	$('#codeArea').load("/Login.action?refresh&time=" + new Date().getTime());
}

function setCss(cssObj, status) {
	switch(status){
		case 1:
			cssObj.removeClass("weui_cell_warn").addClass("Validform_loading");//checking;
			break;
		case 2:
			cssObj.removeClass("weui_cell_warn Validform_loading");//passed;
			break;
		case 4:
			cssObj.removeClass("weui_cell_warn Validform_loading");//for ignore;
			break;
		default:
			cssObj.removeClass("Validform_loading").addClass("weui_cell_warn");//wrong;
	}
}

/**
 * 用户行为记录
 */
var UserTrack = {
	/** 点击登录 */
	TRACK_TYPE_GOTO_LOGIN_PAGE 		: 1,
	/** 登录成功 */
	TRACK_TYPE_LOGIN 				: 2,
	/** 退出 */
	TRACK_TYPE_LOGOUT 				: 3,
	/** 进入搜索页面 */
	TRACK_TYPE_GOTO_SEACH_PAGE 		: 4,
	/** 点击搜索 */
	TRACK_TYPE_SEARCH 				: 5,
	/** 进入租单页面 */
	TRACK_TYPE_GOTO_RENT_PAGE 		: 6,
	/** 进入小区页面 */
	TRACK_TYPE_GOTO_RESI_PAGE 		: 7,
	/** 进入发布租单页面 */
	TRACK_TYPE_GOTO_ADD_RENT_PAGE 	: 8,
	/** 进入经验页面 */
	TRACK_TYPE_GOTO_EXP_PAGE 		: 9,
	/** 联系 */
	TRACK_TYPE_CONTACT 				: 10,
	/** 手机端登录 */
	TRACK_TYPE_LOGIN_MOBILE 		: 11,
	/** 手机端注册 */
	TRACK_TYPE_REG_MOBILE 			: 12,
	/** 开启租房过程 */
	TRACK_START_PROCESS 			: 13,

	/**
	 * 记录行为
	 * @param uType 类型
	 * @param uData 数据（编号、搜索条件等）
	 */
	log : function(uType, uData) {
		$.post("/UserTrack.action?log", { type : uType, data : uData });
	}
};

//检查账号是否存在 type=1用于一般请求 type=2用户找回密码 返回 0 表示不通过 1表示通过
function checkLoginIdExist(loginId, type, inputObj, spanObj) {
	var input = $.trim(loginId);
	if (input == "" || input == undefined || input == null) {
		return -1;
	}
	var url = "/Register.action?checkloginId&type=" + type; 
	var result = 0;
	$.ajax({
		type : "post",
		url : url,
		dataType : "json",
		data : {
			param : loginId
		},
		async : false,
		success : function(data, status) {
			if (data.status == "n") {
				setErrorStatus(inputObj, spanObj, data.info);
			} else {
				result = 1;
			}
		}
	});
	return result;
}


function afterLogin(data, type) {
	var redirectUrl = $("#redirectUrl").val();
	if(redirectUrl == "") {
		window.location.href="/";
	} else {
		window.location.href = redirectUrl;
	}
	
//	$("#loginId").val("");
//	$("#password").val("");
//	$("#regId").val("");
//	$("#password2").val("");
//	$.cookie("errorCount", 2);
//	$("#checkCodeStr").val("");
//	$(".loginBtn").hide();
//	$("#registerBtn").hide();

//	// 刚登陆的时候准备沟通用的数据，不这么做的话，不刷新页面的情况下，这些数据都是null
//	$("#isUnread").val(data.isUnread);
//	// 用户首次登录生成头像路径
//	photoPath = photoPath + Math.floor(data.cjZid / 10000) + '/';
//	// 保存当前用户zid
//	zid = data.cjZid;
//	// 保存当前用户的名称
//	name = data.cjName;
//	// 保存当前用户的头像
//	photo = data.cjPhoto;
}

$(function(){
	if ($.cookie("errorCount") === undefined) {
		$.cookie("errorCount", 2, {
			expires : 1
		});
	}
	errorCount = $.cookie("errorCount");

	if (errorCount > 0) {
		$("#codeInfo").addClass("hide");
	} else {
		$("#codeInfo").removeClass("hide");
		refresh();
	}
	
	$("#codeArea").click(function() {
		refresh();
	});
	
	$.Tipmsg.r = "";
	$(".signinBtn,.loginBtn").click(function(){
		$(this).parents('form').hide().siblings('form').show();
		$(".Validform_checktip").text("");
	})
	$("#loginForm input").attr("ignore", "");
	$("#regForm input").attr("ignore", "");
	var log = $("#loginForm").Validform({
		ajaxPost : true,
		ignoreHidden : true,
		btnSubmit : "#logins",
		tiptype:function(msg,o,cssctl){
			  //msg：提示信息;
		    //o:{obj:*,type:*,curform:*},
		    //obj指向的是当前验证的表单元素（或表单对象，验证全部验证通过，提交表单时o.obj为该表单对象），
		    //type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, 
		    //curform为当前form对象;
		    //cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;
//			log.check(false);
			var msgobj=$(".logcheck");
			if(msg == "") {
//				msgobj.parent().hide();
				msgobj.parent().addClass("hide");
			} else {
				msgobj.parent().removeClass("hide");
			}
			var cssObj=o.obj.parent().parent(".weui_cell");
			setCss(cssObj, o.type);
			msgobj.text(msg);
		},
		async : false,
		datatype : {
			"password" : function(gets, obj, curform, regxp) {
				var reg1 = /^[A-Za-z0-9.]{6,16}$/;
				if (reg1.test(gets)) {
					return true;
				}
				return "请输入6-16位字母或数字";
			}
		},
//		beforeSubmit : function(curform) {
////			$("#loginForm input").attr("ignore", "");
////			if (!log.check(false)) {
////				return false;
////			}
//		},
		callback : function(data) {
//			$("#loginForm input").attr("ignore", "");
//			if (!log.check(false)) {
//				return false;
//			}
			// 登录成功
			if ($.trim(data.status) == "y") {
				$.toast("登录成功");
				// 记录用户登录成功的行为
				UserTrack.log(UserTrack.TRACK_TYPE_LOGIN_MOBILE, null);
				afterLogin(data);
				return true;
			}
			// 登录失败
			else if ($.trim(data.status) == "n") {
				$(".logcheck").text(data.info).show();
//				$("#loginValid").focus();
				// alert(data.info);
				$.cookie("errorCount", errorCount);
				if (errorCount == 0) {
					$("#codeInfo").removeClass("hide");
					refresh();
				} else {
					errorCount--;
				}
				return false;
			}
			// 验证码错误
			else if ($.trim(data.status) == "0") {
				$("#codeInfo").addClass("weui_cell_warn");
				$(".logcheck").text(data.info).show();
				refresh();
			} else if ($.trim(data.status) == "e") {
				$(".logcheck").text(data.info).show();
			}
			return false;
		}
	});
	
	
	var reg = $("#regForm").Validform({
		ajaxPost : true,
		ignoreHidden : true,
		btnSubmit : "#reg",
		datatype : {
			"password" : function(gets, obj, curform, regxp) {
				var reg1 = /^[A-Za-z0-9.]{6,16}$/;
				if (reg1.test(gets)) {
					return true;
				}
				return "请输入6-16位字母或数字";
			}
		},
		tiptype:function(msg,o,cssctl){
			  //msg：提示信息;
		    //o:{obj:*,type:*,curform:*},
		    //obj指向的是当前验证的表单元素（或表单对象，验证全部验证通过，提交表单时o.obj为该表单对象），
		    //type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, 
		    //curform为当前form对象;
		    //cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;
//			log.check(false);
			var msgobj=$(".regcheck");
			if(msg == "") {
//				msgobj.parent().hide();
				msgobj.parent().addClass("hide");
			} else {
				msgobj.parent().removeClass("hide");
			}
			var cssObj=o.obj.parent().parent(".weui_cell");
			setCss(cssObj, o.type);
			msgobj.text(msg);
		},
		beforeSubmit : function(curform) {
			if ($.trim($("#ranking").val()) == 0) {
				$("#ranking").parent().parent().addClass("weui_cell_warn");
				$(".regcheck").text("请选择您的身份").show();
				return false;
			} else {
				$("#ranking").parent().parent().removeClass("weui_cell_warn");
			}
		},
		callback : function(data) {
			if ($.trim(data.status) === "y") {
				UserTrack.log(UserTrack.TRACK_TYPE_REG_MOBILE, null);
				afterLogin();
				return true;
			} else if ($.trim(data.status) === "n") {
				$(".regcheck").text(data.info);
				return false;
			} else if ($.trim(data.status) === "e") {
				$(".regcheck").text(data.info);
				return false;
			} else if($.trim(data.status) === "c") {
				$(".regcheck").text(data.info);
				return false;
			}
			return false;
		}
	});
	
	MobileValidCode.prototype.frequent = function() {
		$(".regcheck").text("发送过于频繁，您可以使用最新的验证码进行验证。");
		this.resetButton();
	}
	var mobilevalid = new MobileValidCode({
		mobileInput : $("#regId"),
		sendUrl: "/SMS.action?sendRegValidCode",
		beforeSend : function() {
			var result = checkLoginIdExist($("#regId").val(), 3, $("#regId"), $("#regId").siblings(".Validform_checktip"));
			if(result == -1){
				$(".regcheck").text("请输入手机号").show();
				return false;
			}
			if(result == 1) return true;
			return false; 
		}
	});
	
	
})

