$(function(){
	$.Tipmsg.r = "";
	
	$("#mobile, #validCode, #idName, #idNumber").bind('input propertychange', hideWarnInfo);
	
	$("#postInfoForm").Validform({
		ajaxPost : true,
		ignoreHidden : true,
		btnSubmit : "#cfmPost",
		postonce : true,
		datatype : {
			"displayNameP":function(gets,obj,curform,regxp) {
				var nameReg = /^[\u4E00-\u9FA5]+$/;
				var name = gets;
				var flag = 1;
				if(!nameReg.test(name)) {
					flag = 0;
					return "请输入和身份证一致的姓名";
				}
				if(name.length > 15) {
					flag = 0;
					return "请输入和身份证一致的姓名";
				} 
				if(flag == 1) {
					return true;
				}
			},
			"virIdNumber":function (gets,obj,curform,regxp) {
				var idcard = gets; var city = {11 : "北京", 12 : "天津", 13 : "河北", 14 : "山西", 15 : "内蒙古", 21 : "辽宁", 22 : "吉林", 23 : "黑龙江 ", 31 : "上海", 32 : "江苏", 33 : "浙江", 34 : "安徽", 35 : "福建", 36 : "江西", 37 : "山东", 41 : "河南", 42 : "湖北 ", 43 : "湖南", 44 : "广东", 45 : "广西", 46 : "海南", 50 : "重庆", 51 : "四川", 52 : "贵州", 53 : "云南", 54 : "西藏 ", 61 : "陕西", 62 : "甘肃", 63 : "青海", 64 : "宁夏", 65 : "新疆", 71 : "台湾", 81 : "香港", 82 : "澳门", 91 : "国外 "}; var pass = true; if (idcard.length != 15 && idcard.length != 18) {pass = false; return pass; } var Ai = ""; if (idcard.length == 18) {Ai = idcard.substring(0, 17); } else if (idcard.length == 15) {Ai = idcard.substring(0, 6) + "19" + idcard.substring(6, 15); } var numValid = /^\d+$/; if (numValid.test(Ai) == false) {pass = false; return pass; } if (parseInt(Ai.substr(6, 4)) % 4 == 0 || (parseInt(Ai.substr(6, 4)) % 100 == 0 && parseInt(Ai.substr(6, 4)) % 4 == 0)) {ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; } else {ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; } if (ereg.test(idcard) == false) {pass = false; return pass; } if (!city[idcard.substr(0, 2)]) {pass = false; return pass; } else {if (idcard.length == 18) {idcard = idcard.split(''); var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]; var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]; var sum = 0; var ai = 0; var wi = 0; for ( var i = 0; i < 17; i++) {ai = idcard[i]; wi = factor[i]; sum += ai * wi; } var last = parity[sum % 11]; if (last != idcard[17]) {pass = false; return pass; } } } return pass;
			}
		},
		tiptype:function(msg,o,cssctl){
			if(msg == "") {
				hideWarnInfo();
			} else {
				showWarnInfo(msg);
			}
		},
		async : false,
		beforeSubmit : beforeInfoFormSubmit,
        callback : infoFormSubmitCallback
	});
	
	MobileValidCode.prototype.showMobileWarn = showWarnInfo;
	MobileValidCode.prototype.hideMobileWarn = hideWarnInfo;
	MobileValidCode.prototype.showValidCodeWarn = showWarnInfo;
	MobileValidCode.prototype.hideValidCodeWarn = hideWarnInfo;
	new MobileValidCode();
	
});

function showWarnInfo(msg) {
	$(".warnInfo").text(msg).parent().removeClass("hide");
}
function hideWarnInfo() {
	$(".warnInfo").text("").parent().addClass("hide");
}