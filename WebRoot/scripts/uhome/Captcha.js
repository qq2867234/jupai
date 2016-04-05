define(['jquery'], function($) {
	/**
	 * 图形验证码
	 */
	var Captcha = {
		codeArea : null,
		// 初始化
		init : function(codeArea) {
			Captcha.codeArea = codeArea || $("#captchaBtn");
			// 初始加载图形验证码
			Captcha.codeArea.load("/Login.action?refresh&time=" + new Date().getTime());
			// 绑定切换验证码事件
			Captcha.codeArea.click(function() {
				Captcha.load();
			});
		},
		// 加载图形验证码
		load : function() {
			Captcha.codeArea.load("/Login.action?refresh&time=" + new Date().getTime());
		}
	};
	
	return {
		init: Captcha.init
	};
});