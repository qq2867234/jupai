$(function() {
	//验证个人信息
	$("#authIdentityForm").Validform({
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
				case 'U0016': // 身份证已占用
					$("#identityno").siblings(".Validform_checktip").html(data.respmsg).addClass("Validform_wrong");
					break;
				case 'U0017': // 请填写真实用户信息
					alertDialog(data.respmsg);
					break;
				case 'U0020': // 身份证号码已经被其它手机号码占用
					$("#identityno").siblings(".Validform_checktip").html("身份证已占用").addClass("Validform_wrong");
					break;
				case '0': // 不处于未完善信息状态
					alertDialog(data.respmsg);
					break;
				case '2': // 请输入合法的姓名
					$("#realname").siblings(".Validform_checktip").html(data.respmsg).addClass("Validform_wrong");
					break;
				case '3': // 请输入有效的身份证号
					$("#identityno").siblings(".Validform_checktip").html(data.respmsg).addClass("Validform_wrong");
					break;
				default:
					alertDialog(data.respmsg);
					break;
			}
		},
		datatype:{
			"virIdNumber":function (gets,obj,curform,regxp) {
				var idcard = gets; var city = {11 : "北京", 12 : "天津", 13 : "河北", 14 : "山西", 15 : "内蒙古", 21 : "辽宁", 22 : "吉林", 23 : "黑龙江 ", 31 : "上海", 32 : "江苏", 33 : "浙江", 34 : "安徽", 35 : "福建", 36 : "江西", 37 : "山东", 41 : "河南", 42 : "湖北 ", 43 : "湖南", 44 : "广东", 45 : "广西", 46 : "海南", 50 : "重庆", 51 : "四川", 52 : "贵州", 53 : "云南", 54 : "西藏 ", 61 : "陕西", 62 : "甘肃", 63 : "青海", 64 : "宁夏", 65 : "新疆", 71 : "台湾", 81 : "香港", 82 : "澳门", 91 : "国外 "}; var pass = true; if (idcard.length != 15 && idcard.length != 18) {pass = false; return pass; } var Ai = ""; if (idcard.length == 18) {Ai = idcard.substring(0, 17); } else if (idcard.length == 15) {Ai = idcard.substring(0, 6) + "19" + idcard.substring(6, 15); } var numValid = /^\d+$/; if (numValid.test(Ai) == false) {pass = false; return pass; } if (parseInt(Ai.substr(6, 4)) % 4 == 0 || (parseInt(Ai.substr(6, 4)) % 100 == 0 && parseInt(Ai.substr(6, 4)) % 4 == 0)) {ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; } else {ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; } if (ereg.test(idcard) == false) {pass = false; return pass; } if (!city[idcard.substr(0, 2)]) {pass = false; return pass; } else {if (idcard.length == 18) {idcard = idcard.split(''); var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]; var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]; var sum = 0; var ai = 0; var wi = 0; for ( var i = 0; i < 17; i++) {ai = idcard[i]; wi = factor[i]; sum += ai * wi; } var last = parity[sum % 11]; if (last != idcard[17]) {pass = false; return pass; } } } return pass;
			}
		}
	});
});