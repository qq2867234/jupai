$(function() {
	//显示已发布户型列表
	$("#showPublishedHouseTypeList").click(function() {
		var residenceId = $("#residenceId").val();
		window.location.href = "/SaleHomeController.action?goToPublishedHouseTypeListManager&residenceId=" + residenceId;
	});
	//显示未发布户型列表
	$("#showUnPublishHouseTypeList").click(function() {
		var residenceId = $("#residenceId").val();
		window.location.href = "/SaleHomeController.action?goToUnPublishedHouseTypeListManager&residenceId=" + residenceId;
	});
	//创建户型
	$("#createHouseType").click(function() {
		var residenceId = $("#residenceId").val();
		$.ajax({
			url:"/SaleHomeController.action?checkUnPublishedHouseTypeLimit",
			type:"POST",
			data:{residenceId:residenceId},
			dadaType:"json",
			success:function(data, textStatus) {
				if(data.status == "y") {
					window.location.href = "/SaleHomeController.action?goToAddHouseTypeView&residenceId=" + residenceId;
				} else if (data.status == "n") {
					alert(data.info);
				} else if (data.status == "e") {
					window.location.href = "/UserSearch.action?toHome";
				}
			}
		});
	});
	$(".publish").click(function() {
		var hhId = $(this).attr("v");
		$.ajax({
			url:"/HouseType.action?publishHouseType",
			type:"POST",
			data:{hhId:hhId,publishType:2},
			dadaType:"json",
			success:function(data, textStatus) {
				if(data.status == "y") {
					window.location.href = "/SaleHomeController.action?goToUnPublishedHouseTypeListManager";
				} else if (data.status == "n") {
					alert(data.info);
				} else if (data.status == "e") {
					window.location.href = "/UserSearch.action?toHome";
				}
			}
		});
	});
});