$(function() {
	
	if(navigator.userAgent.indexOf("iPhone") == -1) {
		$("#idName").focus(function() {
			$(window).scrollTop($(this).offset().top - 40);
		});
	}
	$("#shareCode").bind("click", function() {
		var content = "<p>美好的事情要分享</p><p>幸运的事情正发生</p>";
		if(wxReadyStatus == false) {
			if(retry) {
				retry = false;
				content = "请点击“分享此页面”重试";
			} else {
				content = "微信分享出问题了，请回到公众号，点击邀请发房进入此页面再次分享";
			}
		}
       fnCreateDialog({
           content : content,
           title: "感谢您的参与",
           confirmBtn:"我知道了",
           id: "shareDialog",
           cancelFn : function() {
               return false;
           }
       });
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
});

function beforeInfoFormSubmit(curform) {
	$("#postInfoForm input").attr("ignore", "");
    $("#cfmPost").text('领取中...');
    $("#cfmPost").attr("disabled", "true");
    $("#cfmPost").addClass("forbidden");
}

function infoFormSubmitCallback(data) {
	$("#cfmPost").text('领取邀请码');
    $("#cfmPost").removeAttr("disabled");
    $("#cfmPost").removeClass("forbidden");
	if ($.trim(data.status) == "y") {
		$.toast("领取成功");
		$("#postInfoForm").hide();
		$("#rCodeDiv").show();
		$("#rCode").text(data.rCode);
		rCode = data.rCode;
		// 领取成功后设置分享信息
		setShareView();
	}
	else {
		showWarnInfo(data.info);
	}
}

