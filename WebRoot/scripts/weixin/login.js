var browser = navigator.appName;

function getCookieValue(name) {
	var name = escape(name);
	// 读cookie属性，这将返回文档的所有cookie
	var allcookies = document.cookie;
	// 查找名为name的cookie的开始位置
	name += "=";
	var pos = allcookies.indexOf(name);
	// 如果找到了具有该名字的cookie，那么提取并使用它的值
	if (pos != -1) { // 如果pos值为-1则说明搜索"version="失败
		var start = pos + name.length; // cookie值开始的位置
		var end = allcookies.indexOf(";", start); // 从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
		if (end == -1)
			end = allcookies.length; // 如果end值为-1说明cookie列表里只有一个cookie
		var value = allcookies.substring(start, end); // 提取cookie的值
		return unescape(value); // 对它解码
	} else
		return ""; // 搜索失败，返回空字符串
}

function checkLoginStatus() {
	var isLogin = false;
	$.ajax({
		type: "post",
		url:"/UserCenterController.action?checkLoginStatus",
		dataType:"json",
		async: false,
		success:function(data, status) {
			if(data.status == "y") isLogin = true;
			else $('#login').modal();
		}
	});
	return isLogin;
}

function afterLogin(data, type) {
	$("#loginId").val("");
	$("#password").val("");
	$("#regId").val("");
	$("#password2").val("");
	$.cookie("errorCount", 2);
	role = $.cookie("role");

	$('#login').modal('hide');
	$('#regForm').modal('hide');
	window.location.reload();

//	// 用户首次登录生成头像路径
//	photoPath = photoPath + Math.floor(data.cjZid / 10000) + '/';
//	// 保存当前用户zid
//	zid = data.cjZid;
//	// 保存当前用户的名称
//	name = data.cjName;
//	// 保存当前用户的头像
//	photo = data.cjPhoto;

}

function refresh() {
	$('#codeArea').load("/Login.action?refresh&time=" + new Date().getTime());
}

//当图片加载失败是指定默认图片
function showImgDelay(imgObj, imgSrc, maxErrorNum) {
	if (maxErrorNum > 0) {
		imgObj.onerror = function() {
			showImgDelay(imgObj, imgSrc, maxErrorNum - 1);
		};
		setTimeout(function() {
			imgObj.src = imgSrc;
		}, 500);
	} else {
		imgObj.onerror = null;
		imgObj.src = imgSrc;
	}
}

$(function() {

	$.ajax({
		type : "post",
		url : "/UserCenterController.action?remeberLogin",
		dataType : "json",
		success : function(data, status) {
			role = data.role;
			if ($.trim(data.status) == "y") {
				checkStatus = true;
				afterLogin(data);
			}
		}
	});

	// 处于登录状态，显示菜单等等...
	if ($.cookie("displayName") != null && $.cookie("displayName") != "") {
		role = $.cookie("role");
		checkStatus = true;
	}

	if ($.cookie("errorCount") === undefined) {
		$.cookie("errorCount", 2, {
			expires : 1
		});
	}
	errorCount = $.cookie("errorCount");

	if (errorCount > 0) {
		$(".codeArea").hide();
	} else {
		$(".codeArea").show();
		refresh();
	}

	$("#codeArea").click(function() {
		refresh();
	});
	
	var log = $(".loginForm").Validform({
		tiptype : 4,
		ajaxPost : true,
		ignoreHidden : true,
		btnSubmit : "#logins",
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
		callback : function(data) {
			$(".loginForm input").attr("ignore", "");
			if (!log.check(false)) {
				return false;
			}
			// 登录成功
			if ($.trim(data.status) == "y") {
				// 记录用户登录成功的行为
				UserTrack.log(UserTrack.TRACK_TYPE_LOGIN, null);
				if (data.info == "绑定成功") {
					window.location = data.location;
				} else {
					afterLogin(data);
					return true;
				}
			}
			// 登录失败
			else if ($.trim(data.status) == "n") {
				$("#loginValid").removeClass("Validform_right")
						.addClass("Validform_wrong").text(data.info)
						.show();
				$("#loginValid").focus();
				// alert(data.info);
				$.cookie("errorCount", errorCount);
				if (errorCount == 0) {
					$(".codeArea").show();
					refresh();
				} else {
					errorCount--;
				}
				return false;
			}
			// 验证码错误
			else if ($.trim(data.status) == "0") {
				$("#codeInfo").removeClass("Validform_right").addClass("Validform_wrong").text(data.info).show();
				$(".codeArea").show();
				refresh();
			} else if ($.trim(data.status) == "e") {
				$("#loginValid").removeClass("Validform_right").addClass("Validform_wrong").text(data.info).show();
			}
			return false;
		}
	});

	var reg = $(".registerForm").Validform({
		tiptype : 4,
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
		beforeSubmit : function(curform) {
			$(".registerForm input").attr("ignore", "");
			if (!reg.check(false)) {
				return false;
			}
			if ($.trim($("#ranking").val()) == "") {
				$("#ranking").siblings(".Validform_checktip").html("请选择您的身份").addClass("Validform_wrong");
				return false;
			}else{
				$("#ranking").siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
			}
		},
		callback : function(data) {
			$(".registerForm input").attr("ignore", "");
			if (!reg.check(false)) {
				return false;
			}
			if ($.trim(data.status) === "y") {
				afterLogin(data);
				return true;
			} else if ($.trim(data.status) === "n") {
				$("#regValid").removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
				// alert(data.info);
				return false;
			} else if ($.trim(data.status) === "e") {
				$("#regValid").removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
				// alert(data.info);
				return false;
			} else if($.trim(data.status) === "c") {
				$("#validCode").siblings(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
				return false;
			}
			return false;
		}
	});
	
	// 绑定发送手机验证码事件
	MobileValidCode.bindSendMessageEvent({
		mobileInput : $("#regId"),
		needCaptcha : false,
		beforeSend : function() {
			var result = checkLoginIdExist($("#regId").val(), 3, $("#regId"), $("#regId").siblings(".Validform_checktip"));
			if(result == -1){
				setErrorStatus($("#regId"), $("#regId").siblings(".Validform_checktip"), "请输入手机号");
				return false;
			}
			if(result == 1) return true;
			return false; 
		}
	});

});

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


/**
 * 用户行为
 * 
 * @param uType
 * @param uData
 */
var UserTrack = {

	/** 点击登录 */
	TRACK_TYPE_GOTO_LOGIN_PAGE : 1,
	/** 登录成功 */
	TRACK_TYPE_LOGIN : 2,
	/** 退出 */
	TRACK_TYPE_LOGOUT : 3,
	/** 进入搜索页面 */
	TRACK_TYPE_GOTO_SEACH_PAGE : 4,
	/** 点击搜索 */
	TRACK_TYPE_SEARCH : 5,
	/** 进入租单页面 */
	TRACK_TYPE_GOTO_RENT_PAGE : 6,
	/** 进入小区页面 */
	TRACK_TYPE_GOTO_RESI_PAGE : 7,

	/** 进入发布租单页面 */
	TRACK_TYPE_GOTO_ADD_RENT_PAGE : 8,

	// 记录
	log : function(uType, uData) {
		$.post("/UserTrack.action?log", {
			type : uType,
			data : uData
		});
	}
};