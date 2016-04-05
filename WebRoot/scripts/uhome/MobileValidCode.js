/** ==================== 发送手机验证码  ==================== 
 *  <p> var codeBtn = new MobileValidCode(options);
 *  <p> options = {
 *  <p> 	sendBtn			// 发送验证码按钮JQuery对象
 *  <p> 	btnText			// 按钮文字
 *	<p> 	sendUrl			// 发送验证码接口
 *	<p> 	mobileInput		// 手机输入框JQuery对象
 *	<p> 	validCodeInput	// 短信验证码输入框JQuery对象
 *	<p> 	extraOptions	// 获取额外参数的函数（不用函数的话，使用$("#tag").val()的方式获取值都是null）
 *	<p> 	beforeSend		// 发送之前要执行的方法，返回false则不发送
 *	<p> 	callback		// 回调函数（需要特殊处理的时候才定义，否者不需要）
 *  <p> }
 */
var MobileValidCode = function(options) {
	// 初始化参数
    options = options || {};
    this.debug = options.debug || false;	// 调试状态
    this.sendBtn = options.sendBtn || $("#sendMobileValidCode");	// 发送按钮
    this.btnText = options.btnText || '发送验证码'; 					// 按钮文字
    this.sendUrl = options.sendUrl || "/SMS.action?sendValidCode"; 	// 发送验证码接口(不需要图形验证码)
    this.mobileInput = options.mobileInput || $("#mobile"); 		// 手机输入框
    this.validCodeInput = options.validCodeInput || $("#validCode");// 验证码输入框
    this.second = options.btnText || 60; 							// 倒计时秒数
    this.extraOptions = options.extraOptions;						// 获取额外参数的函数（不用函数的话，使用$("#tag").val()的方式获取值都是null）
    this.beforeSend = options.beforeSend;							// 发送之前要执行的方法，返回false则不发送				
    this.callback = options.callback;								// 回调函数（需要特殊处理的时候才定义，否者不需要）
    // 绑定事件
    this.bindSendMessageEvent();
    return (this);
};
MobileValidCode.prototype.bindSendMessageEvent = function() {
    var _this = this;
    _this.sendBtn.click(function(){
    	// 手机验证
    	if(!_this.validateMobile()) return;
		// 与业务相关的自定义验证（比如注册的时候，验证码手机是否已被注册）
		if(_this.beforeSend){
			if(!_this.beforeSend()) return;
		}
		// 发送验证码
		_this.send();
    });
};
MobileValidCode.prototype.send = function () {
	// 发送中
	this.setButtonText("发送中...").forbidden();
	// 设置参数
	var postData = {};
	if(this.extraOptions) postData = this.extraOptions();
	postData.mobile = this.mobileInput.val();
	postData.debug = this.debug;
	var _this = this;
    // 调用发送短信接口
	$.ajax({
		type: "post",
		url: _this.sendUrl,
		dataType: "json",
		data: postData,
		async: false,
		cache: false,
		success: function(data) {
			if(_this.callback) _this.callback(data);
			else _this.defaultCallback(data);
		},
		error:function(error){
			_this.exception();
		}
	});
};
MobileValidCode.prototype.validateMobile = function () {
	if(this.mobileInput.val()==''){
		this.showMobileWarn("请输入手机号");
		return false;
	}
	if (/^1(3|5|8|4|7)\d{9}$/.test(this.mobileInput.val())) {
		this.hideMobileWarn();
	} else if (/^1(3[4-9]|4[7]|5[0-2|7-9]|8[7-9])[0-9]{8}$/.test(this.mobileInput.val())) {
		this.hideMobileWarn();
	} else {
		this.showMobileWarn("请输入正确的手机号");
		return false;
	}
	return true;
};
// 发送成功，开始倒计时
MobileValidCode.prototype.success = function () {
	this.hideMobileWarn();
	this.hideValidCodeWarn();
	this.setInterval();
};
// 默认回调函数
MobileValidCode.prototype.defaultCallback = function (json) {
//	// 未登录
//	if(json.logined != undefined && json.logined == 'n'){
//		$("#loginBtn").first().click();
//		this.sendBtn.text("发送验证码");
//		this.sendBtn.removeAttr("disabled");
//		return ;
//	}
	switch (json.status) {
	case 0: // 手机号有误
		this.mobileError();
		break;
	case 1: // 发送成功
		this.success();
		return;
	case 2: // 发送过于频繁
		this.frequent();
		break;
	case -1: // 系统异常
	default:
		this.exception();
		break;
}
};
// 手机错误
MobileValidCode.prototype.mobileError = function (msg) {
	// 直接显示提示信息
	if(msg){
		this.showMobileWarn(msg);
	}else{
		// 验证手机并显示手机问题
		this.validateMobile();
	}
	this.resetButton();
};
MobileValidCode.prototype.frequent = function () {
	this.showValidCodeWarn("发送过于频繁，您可以使用最新的验证码进行验证");
	this.resetButton();
};
MobileValidCode.prototype.exception = function () {
	this.showValidCodeWarn("服务器异常，请稍后再试");
	this.resetButton();
};

MobileValidCode.prototype.showMobileWarn = function (msg) {
	this.mobileInput.siblings(".Validform_checktip").html(msg).addClass("Validform_wrong");
};
MobileValidCode.prototype.hideMobileWarn = function () {
	this.mobileInput.siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
};
MobileValidCode.prototype.showValidCodeWarn = function (msg) {
	this.validCodeInput.siblings(".Validform_checktip").html(msg).addClass("Validform_wrong");
};
MobileValidCode.prototype.hideValidCodeWarn = function () {
	this.validCodeInput.siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
};

MobileValidCode.prototype.setButtonText = function (btnText) {
    this.sendBtn.text(btnText);
    return (this);
};
MobileValidCode.prototype.setInterval = function () {
	var _this = this;
	_this.sec = _this.second;
	_this.setButtonText("重新发送("+_this.sec+")");
	_this.intervalProcess = window.setInterval(function() {
		if (_this.sec < 1) {
			window.clearInterval(_this.intervalProcess);
			_this.setButtonText("重新发送").noForbidden();
		} else {
			_this.sec--;
			_this.setButtonText("重新发送("+_this.sec+")");
		}
	}, 1000);
};
MobileValidCode.prototype.resetButton = function () {
	this.setButtonText("发送验证码").noForbidden();
};
MobileValidCode.prototype.forbidden = function () {
    this.sendBtn.attr('disabled', true);
    if(!this.sendBtn.hasClass('forbidden')){
    	this.sendBtn.addClass('forbidden');
    }
};
MobileValidCode.prototype.noForbidden = function () {
    this.sendBtn.attr('disabled', false);
    if(this.sendBtn.hasClass('forbidden'))
    	this.sendBtn.removeClass('forbidden');
};