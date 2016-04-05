//检查是否超过编辑项（未发布）数目上限
function checkUnPublishedProductLimit(residenceId) {
	$.ajax({
		url:"/SaleHomeController.action?checkUnPublishedProductLimit",
		type:"POST",
		data:{residenceId:residenceId},
		dadaType:"json",
		success:function(data, textStatus) {
			if(data.status == "y") {
				window.location.href = "/SaleHomeController.action?goToAddProductView&residenceId=" + residenceId;
			} else if (data.status == "n") {
				alert(data.info);
			} else if (data.status == "e") {
				window.location.href = "/UserSearch.action?toHome";
			}
		}
	});
}
$(function(){
	
	//进入户型管理
	$(".tomore").click(function() {
		var residenceId = $(this).attr("v");
		window.location.href = "/SaleHomeController.action?goToPublishedProductListManager&residenceId=" + residenceId;
	});
	
	//调价
	$(".revisePrice").click(function() {
		var residenceId = $(this).attr("v");
		$.ajax({
			url:"/SaleHomeController.action?showResidenceOldPrice",
			type:"POST",
			data:{residenceId:residenceId},
			dadaType:"json",
			success:function(data, textStatus) {
				//var data = eval("("+data+")");
				if(data.status == "y") {
					var popDIV = "<div class='divPopup'>" +
							"<h5>修改价格</h5>" +
							"<div class='textBox'>原价格:&nbsp; "+ data.price +"元/平米</div>" +
							"<div class='divLine'>" +
							"<span>新价格:&nbsp; </span><input type='text' id='newPrice' placeholder='请输入新的价格' maxlength='6' onkeyup=" + " value=value.replace(/[^0-9]+/g,'')" + " class='unit10'/><span>元/平米</span>" +
							"</div>" +
							"<div class='textBox' id='errorMessage'></div><div class='btnBox'><button  type='button' id='closeRevise' class='cancelBtn'>取消</button><button id='revisePrice' type='button' class='confirmBtn'>确定</button>" +
							"</div></div>"
						popBox($(popDIV), ".cancelBtn");
					$("#revisePrice").bind('click', function() {
						var price = $.trim($("#newPrice").val());
						if(isNaN(price)) {
							setErrorStatus($("#newPrice"), $("#errorMessage"),"请输入1-999999之间的数字");
							return false;
						}
						$("#closeRevise").click();
						$.ajax({
							url:"/Project.action?revisePrice",
							type:"POST",
							data:{residenceId:residenceId, price:price},
							dadaType:"json",
							success:function(data, textStatus) {
								var Qs="<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>" + data.info + "</p></div><div class='popLine clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
								popBox($(Qs),".confirmBtn");
							}
						});
					});
				} else if (data.status == "n") {
					var Qs="<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>" + data.info + "</p></div><div class='popLine clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
					popBox($(Qs),".confirmBtn");
				} else if (data.status == "e") {
					window.location.href = "/UserSearch.action?toHome";
				}
			}
		});
	});
	
	$(".publish").click(function() {
		var residenceId = $(this).attr("v");
		$.ajax({
			url:"/Project.action?publishProject",
			type:"POST",
			data:{residenceId:residenceId,publishType:2},
			dadaType:"json",
			success:function(data, textStatus) {
				//var data = eval("("+data+")");
				if(data.status == "y") {
					window.location.href = "/SaleHomeController.action?goToUnpublishedProjectListManager";
				} else if (data.status == "n") {
					alert(data.info);
				} else if (data.status == "e") {
					window.location.href = "/UserSearch.action?toHome";
				}
			},
			error:function(request, status, error) {
				alert(error);
			}
		});
	});
	$(".residenceManage td.intro").mouseenter(function(){
		$(this).children(".introEdit").show();
		});
	$(".residenceManage td.intro").mouseleave(function(){
		$(this).children(".introEdit").hide();
		});

	$("#published").click(function() {
		window.location.href = "/SaleHomeController.action?goToPublishedProjectListManager";
	});
	
	$("#unPublished").click(function() {
		window.location.href = "/SaleHomeController.action?goToUnpublishedProjectListManager";
	});
	//创建新楼盘
	$("#createProject").click(function() {
		$.ajax({
			url:"/SaleHomeController.action?checkUnPublishedProjectLimit",
			type:"POST",
			data:{},
			dadaType:"json",
			success:function(data, textStatus) {
				if(data.status == "y") {
					window.location.href = "/SaleHomeController.action?goToAddProjectView"
				} else if (data.status == "n") {
					alert(data.info);
				} else if (data.status == "e") {
					window.location.href = "/UserSearch.action?toHome";
				}
			}
		});
	});
}); 

