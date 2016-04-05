var browser=navigator.appName;
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

//检查登录状态，type=1表示开启一个租房进程
function checkLoginStatus(type) {
	var isLogin = false;
	$.ajax({
		type: "post",
		url:"/UserCenterController.action?checkLoginStatus",
		dataType:"json",
		async: false,
		success:function(data, status) {
			if(data.status == "y") isLogin = true;
			else {
				if(type == 1) {
					redirectType = 1;
				}
				$(".loginBtn").first().click();
			}
		}
	});
	return isLogin;
}

//处理回调type=1表示开启一个租房进程，type=2表示点击发布房源
function dealRedirecturl(type, url) {
	if(type == 1) {
		startOneProgress();
	} else if(type == 2) {
		if(url != undefined && url != "") {
			window.location.href = url;
		}
	}
}


//点击联系人的校验
function goToContactPage() {
	if(checkLoginStatus()){
		window.location.href="/RentListController.action?goToContactPage";
	}
}

var role;
// 用来保存未登录的跳转路径
var zilensRedirecturl;
var redirectType = 2;
function checkUserLogin(url1, url2, url3) {
	$.ajax({
		url : "/UserCenterController.action?checkLoginStatus",
		async : false,
		dataType : "json",
		success : function(data, status) {
			if (data.status == "e") {
				if (url3 != undefined) {
					zilensRedirecturl = url3;
				}
				$(".loginBtn").first().click();
			} else if (data.status == "y") {
				if (data.role == 1) {
					if (url3 != undefined) {
						window.location.href = url3;
						return false;
					}
					window.location.href = url1;
				} else if (data.role == 2) {
					if (url3 != undefined) {
						window.location.href = url3;
						return false;
					}
					$("#mineBid").text("上门客户");
					window.location.href = url2;
				}
			}
		}
	});
}
function showMenu(role) {
	var li1 = "<li><a href='/UserCenterController.action?goToUserCenter' target='_self'>用户设置</a></li>";
	var li2 = "<li><a href='/SaleHomeController.action?goToUnPublishedSaleHomeInputList' target='_self'>租售管理</a></li>";
	var li3 = "<li><a href='javascript:void(0)' id='publish' onclick='checkUnPublishedSaleHomeInputLimit();' target='_self'>我的出租</a></li>";// '
	var li4 = "<li><a href='javascript:void(0)' id='logOut' target='_self'>退出</a></li>";
	var li5 = "<li><a href='/UserCenterController.action?goToUserCenter' target='_self'>公司设置</a></li>";
	var li6 = "<li><a href='/SaleHomeController.action?goToPublishedProjectListManager' target='_self'>楼盘管理</a></li>";
	var li7 = "<li><a href='javascript:void(0)' onclick='checkUnPublishedRentalHomeInputLimit(); target='_self'>发布项目</a></li>";
	var li8 = "<li><a href='javascript:void(0)' onclick='checkUnPublishedRentalHomeInputLimit();' target='_self'>发布租单</a></li>";
	var li9 = "<li><a href='/RentalHomeController.action?goToUnPublishedRentalHomeInputList' target='_self'>出租管理</a></li>";
	var li10 = "<li><a href='/EntrustingController.action?goToBidListView' target='_self'>上门客户</a></li>";
	var li11 = "<li><a href='/EntrustingController.action?goToEntrustingListView' target='_self'>我的需求</a></li>";
	var li12 = "<li><a href='/Expert.action?goToExpertPage' target='_self'>专家主页</a></li>";
	var li13 = "<li><a href='/broker/showBroker/" + zid + "' target='_self'>个人主页</a></li>";
//	var li14 = "<li><a href='/UHomeController.action?gotoMyUHomePage' target='_self'>U房理财</a></li>";
//	var li15 = "<li><a href='/UHomeController.action?gotoMyUHomePage' target='_self'>U房收租</a></li>";
	var li16 = "<li><a href='/Sign.action?goToSignListPage&type=1' target='_self'>看房签约</a></li>";
	var li17 = "<li><a href='/Sign.action?goToSignListPage&type=1' target='_self'>看房签约</a></li>";
	var li14 = "";
	var li15 = "";
	$("#userMenuList").empty();
	if (role == 1) {
		$("#userMenuList").append(li1 + li16 + li14 + li4).parent().css('left', $("#user").position().left + 'px');
	} else if (role == 2) {
		$("#userMenuList").append(li3 + li13 + li1 + li4).parent().css('left', $("#user").position().left + 'px');
	} else if (role == 3) {
		$("#userMenuList").append(li3 + li1 + li17 + li15 + li4).parent().css('left', $("#user").position().left + 'px');
	} else if (role == 4) {
		$("#userMenuList").append(li1 + li2 + li3 + li14 + li4).parent().css('left', $("#user").position().left + 'px');
	} else if (role == 5) {
		$("#userMenuList").append(li5 + li6 + li4).parent().css('left', $("#user").position().left + 'px');
	} else if (role == 6) {
		$("#userMenuList").append(li1 + li4).parent().css('left', $("#user").position().left + 'px');
	} else if (role == 7) {
		$("#userMenuList").append(li1 + li4).parent().css('left', $("#user").position().left + 'px');
	} else if (role == 8) {
		$("#userMenuList").append(li1 + li4).parent().css('left', $("#user").position().left + 'px');
	}
	// 退出
	$("#logOut").bind("click", function() {
		$.removeCookie('displayName');
		$.removeCookie('role');
		$.removeCookie('firstRental');
		$.removeCookie('firstSale');
		$.removeCookie('zilens');
		checkStatus = false;
		// 记录用户退出的行为
		UserTrack.log(UserTrack.TRACK_TYPE_LOGOUT, null);
		zilensRedirecturl = "";
		window.location.href = "/UserCenterController.action?logout";
	});
}
function afterLogin(data, type) {
	$("#loginId").val("");
	$("#password").val("");
	$("#regId").val("");
	$("#password2").val("");
	$.cookie("errorCount", 2);
	$(".loginBtn").hide();
	$("#registerBtn").hide();
	role = $.cookie("role");
//	$("#user").show().children('b').text(data.displayName);
	$("#user").show();
	if (role == 5) {
		// $("#issaleRental").parent().remove();
		$(".noBrokerage").remove();
	} else if (role == 1 || role == 6 || role == 7) {
		$(".noPerson").remove();
	} else if (role == 2) {
		$(".noBroker").remove();
	}

	$("#login_close").click();

	showMenu(role);

	bindAddRentOrSearchRent();
	
	//登陆后的跳转
	dealRedirecturl(redirectType, zilensRedirecturl);
	

	// function initFrindK() {
	// KindEditor.ready(function(K) {
	// editor = K.editor({
	// allowFileManager : true,
	// pluginsPath:'/scripts/upload/',
	// uploadJson:'/UserCenterOperator.action?uploadUsersPic',
	// filePostName:'photo',
	// extraFileUploadParams : {
	// uploadPicType : uploadPicType,
	// listId : listId
	// }
	// });
	// });
	// }
}


function checkUnPublishedSaleHomeInputLimit() {
	$.ajax({
		url : "/SaleHomeController.action?checkUnPublishedSaleHomeInputLimit",
		type : "POST",
		data : {},
		dadaType : "json",
		success : function(data, textStatus) {
			if (data.status == "y") {
				window.location.href = "/RentListController.action?goToAddRentPage";
			} else if (data.status == "n") {
				window.location.href = "/SaleHomeController.action?goToUnPublishedSaleHomeInputList";
				confirmDialog(data.info);
			} else if (data.status == "s") {
				var brokerV = data.authInfo.brokerV;
				var mobileV = data.authInfo.mobileV;
				var idV = data.authInfo.idV;
				fnCreatePopBox({
					title : '服务小区设置以及各项认证情况',
					divContent : "<div class='divText'><p>" + data.info
							+ "</p><p>" + brokerV + "</p><p>" + mobileV
							+ "</p><p>" + idV + "</p></div>"
				});
			} else if (data.status == "e") {
				window.location.href = "/";
			}
		}
	});
}
// 检查是否超过编辑项（未发布）数目上限

function checkUnPublishedRentalHomeInputLimit() {
	$.ajax({
		url : "/RentalHomeController.action?checkUnPublishedRentalHomeInputLimit",
		type : "POST",
		data : {},
		dadaType : "json",
		success : function(data, textStatus) {
			if (data.status == "y") {
				window.location.href = "/RentalHomeController.action?goToAddRentalHomeInputView";
			} else if (data.status == "s") {
				var brokerV = data.authInfo.brokerV;
				var mobileV = data.authInfo.mobileV;
				var idV = data.authInfo.idV;
				// var Qs="<div id='idName' class='divPopup
				// round'><h5>提示</h5><div class='textBox'>" + data.info
				// + "<br/>" + brokerV + "<br/>" + mobileV + "<br/>" +
				// idV + "</div><div class='popLine clearfix'><button
				// id='question' class='confirmBtn btn btn-warning
				// onlyBtn'>确认</button></div></div>";
				// popBox($(Qs),".confirmBtn");
				fnCreatePopBox({
					title : '提示',
					divContent : "<div class='divText'><p>" + data.info
							+ "</p><p>" + brokerV + "</p><p>" + mobileV
							+ "</p><p>" + idV + "</p></div>"
				});
			} else if (data.status == "n") {
				alert(data.info);
			} else if (data.status == "e") {
				window.location.href = "/";
			}
		}
	});
}

function refresh() {
	$('#codeArea').load("/Login.action?refresh&time=" + new Date().getTime());
}

$(function() {
	// if($.cookie("firstSaleGuide") != "false") {
	// $.cookie("firstSaleGuide","true");
	// }
	// if($.cookie("firstRentalGuide") != "false") {
	// $.cookie("firstRentalGuide","true");
	// }

	$.Tipmsg.r = "";

	$.ajax({
		type : "post",
		url : "/UserCenterController.action?remeberLogin",
		dataType : "json",
		success : function(data, status) {
			role = data.role;
			if ($.trim(data.status) == "y") {
				UserAnalysis.eventAnalysis("LR", "登录", data.cjZid);
				checkStatus = true;
				afterLogin(data);
			}
		}
	});

	// 处于登录状态，显示菜单等等...
	if ($.cookie("displayName") != null && $.cookie("displayName") != "") {
		role = $.cookie("role");
//		$("#user").show().children("b").text($.cookie("displayName"));
		$("#user").show();
		$(".loginBtn").hide();
		$("#registerBtn").hide();
		showMenu(role);
		if (role == 5) {
			$("#issaleRental").parent().remove();
		}
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
	$("#acceptTerms").click(function() {
		if (!$(this).is(":checked")) {
			$("#reg").addClass("btn-disabled");
			$("#reg").attr("disabled", "disabled");
		} else {
			$("#reg").removeClass("btn-disabled");
			$("#reg").removeAttr("disabled");
		}
	});
	$("#reg").click(function() {
		if (!$("#acceptTerms").is(":checked")) {
			$(this).addClass("btn-disabled");
			$(this).attr("disabled", "disabled");
			return false;
		} else {
			$(this).removeClass("btn-disabled");
			$(this).removeAttr("disabled");
			return true;
		}
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
				$("#ranking").siblings(".Validform_checktip").html(
						"请选择您的身份").addClass("Validform_wrong");
				return false;
			}
		},
		callback : function(data) {
			$(".registerForm input").attr("ignore", "");
			if (!reg.check(false)) {
				return false;
			}
			if ($.trim(data.status) === "y") {
				UserAnalysis.eventAnalysis("LR", "注册", data.cjZid);
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
//	MobileValidCode.bindSendMessageEvent({
//		mobileInput : $("#regId"),
//		needCaptcha : false,
//		beforeSend : function() {
//			var result = checkLoginIdExist($("#regId").val(), 3, $("#regId"), $("#regId").siblings(".Validform_checktip"));
//			if(result == -1){
//				setErrorStatus($("#regId"), $("#regId").siblings(".Validform_checktip"), "请输入手机号");
//				return false;
//			}
//			if(result == 1) return true;
//			return false; 
//		}
//	});
	
	new MobileValidCode({
		mobileInput : $("#regId"),
		sendUrl: "/SMS.action?sendRegValidCode",
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

	$(".loginBtn").click(function() {
		//记录登录页面展现
		UserAnalysis.pvAnalysis("/user/login");
		// 记录用户点击登录按钮的行为
		UserTrack.log(UserTrack.TRACK_TYPE_GOTO_LOGIN_PAGE, null);
	});
	
	bindAddRentOrSearchRent();
});

// 检查账号是否存在 type=1用于一般请求 type=2用户找回密码 返回 0 表示不通过 1表示通过
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

// 这是输入域的错误状态。
function setErrorStatus(inputObj, spanObj, message) {
	inputObj.removeClass("Validform_right").addClass("Validform_error");
	spanObj.removeClass("Validform_right").addClass("Validform_wrong").text(message);
}

// 定位出错位置
function locateErrorPosition() {
	$("body").scrollTop($(".Validform_error").first().offset().top - 70);
}

// 对输入域进行验证
function validateInput(item) {
	if (item == "" || item == undefined || item == null) {
		return 0;
	} else {
		return 1;
	}
}

// 当图片加载失败是指定默认图片
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

/**
 * 租客登录后，右上角显示找房
 * 房东和经纪人登录后，右上角显示发布房源
 */
function bindAddRentOrSearchRent(){
	if ($.cookie("displayName") != null && $.cookie("displayName") != "") {
		$("#addRentOrSearchRent").unbind("click");
		// 租客
		if(role == 1){
			$("#searchMenu").hide();
			$("#addRentOrSearchRent").text("找房");
			$("#addRentOrSearchRent").bind("click", function() {
				//记录找房次数
				UserAnalysis.eventAnalysis("用户操作", "登录后去找房", zid);
				window.location.href = "/HouseSearch.action";
			});
		}else if(role == 2 || role == 3){
			$("#addRentOrSearchRent").text("我要出租");
			$("#addRentOrSearchRent").bind("click", function() {
				//记录找房次数
				UserAnalysis.eventAnalysis("用户操作", "发布租单", zid);
				window.location.href = "/RentListController.action?goToAddRentPage";
			});
		}
	}else{
		$("#addRentOrSearchRent").text("我要出租");
		$("#addRentOrSearchRent").bind("click", function() {
			//设置跳转链接
			zilensRedirecturl = "/RentListController.action?goToAddRentPage";
			redirectType = 2;
			$(".loginBtn").first().click();
		});
	}
}

/**
 * 用户行为分析
 * */
var UserAnalysis = {
	//记录某页面 / 弹出层访问次数
	pvAnalysis : function(url) {
		if(typeof _hmt != 'undefined') {
			_hmt.push(['_trackPageview', url]);			
		}
	},
	//记录特定事件次数
	eventAnalysis: function(category, action, optLabel) {
		if(typeof _hmt != 'undefined') {
			_hmt.push(['_trackEvent', category, action, optLabel]);			
		}
	}
};

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
	/** 开启租房过程 */
	TRACK_START_PROCESS 			: 13,
	
	/** 邀请别人 */
	TRACK_TYPE__INVITE_OTHER		: 20,
	/** 被邀请者点击邀请链接 */
	TRACK_TYPE__CLICK_INVITE		: 21,
	
	/**
	 * 记录行为
	 * @param uType 类型
	 * @param uData 数据（编号、搜索条件等）
	 */
	log : function(uType, uData) {
		$.post("/UserTrack.action?log", { type : uType, data : uData });
	}
};