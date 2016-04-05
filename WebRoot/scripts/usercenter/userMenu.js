function brokerVerify() {
	$.getJSON('/UserCenterOperator.action?checkIdV', {random:Math.random()},function(data){
		if(data.status == "n") {
			// var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>" + data.info + "</div><div class='btnBox clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
			// popBox($(Qs),".confirmBtn");
			confirmDialog(data.info);
		} else if(data.status == "y") {
			window.location.href = "/UserCenterController.action?goToCheckVerifyAuthority&dest=4";
		}
	});
}

var userMenu = {
		//获得需要的用户信息
		getUserInfo: function() {
			$.getJSON('/UserCenterOperator.action?getUserMenuInfo',function(data){
				var mobileAuth = 0;
				var iDAuth = 0;
				var brokerAuth = 0;
				if(data.status == "n") {
					window.location.href = "/";
				} else if(data.status == "y") {
					var content = "<h3>"+data.data.name+"</h3>";
					if(data.data.role == 2) {
						brokerAuth = data.auth.broker_verified;
						content += "<span>" + data.data.brokerage_name + "</span>" +
								"<a href='/RentListController.action?goToAddRentPage' class='links-primary'><i class='zgIcon zgIcon-house'></i>我要发房</a>";
						$("#verifyItems").append("<li><a id='brokerAuth' href='###' onclick='brokerVerify();'><i class='zgIcon zgIcon-card'></i>名片认证</a></li>");
						if(brokerAuth > 0 ) {
							$("#brokerAuth").html("<i class='zgIcon zgIcon-card'></i>名片认证（已认证）");
						} else if(brokerAuth == 0) {
							$("#brokerAuth").html("<i class='zgIcon zgIcon-card'></i>名片认证（未认证）");
						} else if(brokerAuth == -1) {
							$("#brokerAuth").html("<i class='zgIcon zgIcon-card'></i>名片认证（认证中）");
						} else {
							$("#brokerAuth").html("<i class='zgIcon zgIcon-card'></i>名片认证（未通过）");
						}
						var nowLocation = window.location.pathname.split("/")[1];
						var param = window.location.search;
						if(nowLocation + param == "UserCenterController.action?goToCheckVerifyAuthority&dest=4") {
							$(".zgIcon").parent().removeClass("on");
							$(".zgIcon-card").parent().addClass("on");
						}
					}
					if(data.data.pic != undefined && data.data.pic != "") {
						$(".headPic").prepend("<img src='" + brokerListPhtoto + "/"+data.data.pic+"' alt='头像' />");
					} else {
						$(".headPic").prepend("<img src='/images/defaultPic/head.png' alt='头像' />");
					}
					$(".userName").append(content);
					$(".lastLog").append(data.data.lastlogintime);
					mobileAuth = data.auth.mobile_verified;
					iDAuth = data.auth.id_verified;
					if(mobileAuth > 0 ) {
						$("#mobileAuth").html("<i class='zgIcon zgIcon-phone'></i>手机认证（已认证）");
					} else if(mobileAuth == 0) {
						$("#mobileAuth").html("<i class='zgIcon zgIcon-phone'></i>手机认证（未认证）");
					} else {
						$("#mobileAuth").html("<i class='zgIcon zgIcon-phone'></i>手机认证（认证中）");
					}
					if(iDAuth > 0) {
						$("#iDAuth").html("<i class='zgIcon zgIcon-realName'></i>实名认证（已认证）");
					} else if(iDAuth == 0) {
						$("#iDAuth").html("<i class='zgIcon zgIcon-realName'></i>实名认证（未认证）");
					} else if(iDAuth == -1) {
						$("#iDAuth").html("<i class='zgIcon zgIcon-realName'></i>实名认证（认证中）");
					} else {
						$("#iDAuth").html("<i class='zgIcon zgIcon-realName'></i>实名认证（未通过）");
					}
				}
			});
		}
}

function retry(obj) {
	$(obj).parent().remove();
	$(".intro,.step,#checkPassword").removeClass("hide");
}

$(function() {
	userMenu.getUserInfo();
	
});