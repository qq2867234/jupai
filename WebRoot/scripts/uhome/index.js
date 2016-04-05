$(function() {
	$(".myUHome").click(function() {
		var btn = $(this);
		$.ajax({
			url:"/UserCenterController.action?checkLoginStatus",
			async:false,
			dataType:"json",
			success:function(data, status) {
				if(data.status == "e"){
					zilensRedirecturl = btn.attr("url");
					showObj(0,$("#login"));
					$("#logLi").click();
					// $(".loginBtn").click();
				} else if(data.status == "y"){
					window.location.href = btn.attr("url");
				}
			}
		});	
	});
});