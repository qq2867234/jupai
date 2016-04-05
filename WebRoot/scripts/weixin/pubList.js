function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest; 
}

$(function(){
	
	$.Tipmsg.r = "";
	
	$("#mobile, #validCode").bind('input propertychange', hideWarnInfo);
	
	if(navigator.userAgent.indexOf("iPhone") == -1) {
		$("#mobile").focus(function() {
			$(window).scrollTop($(this).offset().top - 60);
		});
	}
	
	var Request = GetRequest();
	var otherReferralCode = Request['rCode']; 
	if(otherReferralCode != undefined && otherReferralCode != '') {
		// 保存他人的邀请码
		$("#rCode").val(otherReferralCode);
		// 通过别人的邀请进入此页面
		$.post("/UserTrack.action?log", { type : 21, data : otherReferralCode });
	}
	
	MobileValidCode.prototype.showMobileWarn = showWarnInfo;
	MobileValidCode.prototype.hideMobileWarn = hideWarnInfo;
	MobileValidCode.prototype.showValidCodeWarn = showWarnInfo;
	MobileValidCode.prototype.hideValidCodeWarn = hideWarnInfo;
	new MobileValidCode();
	
	$(".shareCode").bind("click", function() {
       var content = "<img src='/images/weixin/sharePic.png' alt='分享到朋友圈'/>";
	   fnCreateDialog({
	       content : content,
	       title: "",
	       confirmBtn:"知道了",
	       id: "shareDialog",
	       cancelFn : function() {
	           return false;
	       }
	   });
   });
		
	$("#toPost").click(function(){
		$("#postInfoForm").show();
		$(".activity").hide();
		$(window).scrollTop(0);
	});
	
	$("#loadMoreBtn").click(function(){
        $(".activity_more").show();
        $("#loadMoreBtn").hide();
    });
	
    $("#ewm").click(function(event) {
        fnCreateDialog({
            content : "<img src='/images/weixin/zgzf.png' alt='真格租房'>",
            title: "扫描关注真格租房",
            confirmBtn:"关闭",
            cancelFn : function() {
                return false;
            }
        });
    });
    
    $("#postInfoForm").Validform({
		ajaxPost : true,
		ignoreHidden : true,
		btnSubmit : "#cfmPost",
		postonce : true,
		tiptype:function(msg,o,cssctl){
			if(msg == "") {
				hideWarnInfo();
			} else {
				showWarnInfo(msg);
			}
		},
		async : false,
		beforeSubmit : function(curform) {
			$("#postInfoForm input").attr("ignore", "");
			$("#cfmPost").text('提交中...');
			$("#cfmPost").attr("disabled", "true");
			$("#cfmPost").addClass("forbidden");
			return true;
		},
        callback : function(data) {
        	$("#cfmPost").text('提交');
            $("#cfmPost").removeAttr("disabled");
            $("#cfmPost").removeClass("forbidden");
        	if ($.trim(data.status) == "y") {
//        		$("#postInfoForm").hide();
//        		$("#susInfo").show();
        		// 接受邀请发房成功
        		$.post("/UserTrack.action?log", { type : 22, data : otherReferralCode });
        		window.location.href="/Rent.action?goToPublishRentPage";
        	}
        	else if ($.trim(data.status) == "n") {
        		showWarnInfo(data.info);
        	}
        	else if ($.trim(data.status) == "e") {
        		showWarnInfo(data.info);
        	}
        }
	});
});

function showWarnInfo(msg) {
	$(".warnInfo").text(msg).parent().removeClass("hide");
}
function hideWarnInfo() {
	$(".warnInfo").text("").parent().addClass("hide");
}