$(function() {
	//显示已发布产品列表
	$("#showPublishedProductList").click(function() {
		var residenceId = $("#residenceId").val();
		window.location.href = "/SaleHomeController.action?goToPublishedProductListManager&residenceId=" + residenceId;
	});
	//显示未发茶品型列表
	$("#showUnPublishProductList").click(function() {
		var residenceId = $("#residenceId").val();
		window.location.href = "/SaleHomeController.action?goToUnPublishedProductListManager&residenceId=" + residenceId;
	});
	//创建新产品
	$("#createProduct").click(function() {
		var residenceId = $("#residenceId").val();
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
	});
	//调价
	$(".revisePrice").click(function() {
		var preSpan = $(this).parents().find(".priceArea");
		var productId = $(this).attr("productId");
		var oldPrice = $(this).attr("price");
		var popDIV = "<div class='divPopup'>" +
		"<h5>修改价格</h5>" +
		"<div class='textBox'>原价格:&nbsp;"+ oldPrice +"元/平米</div>" +
		"<div class='divLine'>" +
			"<span>新价格:&nbsp; </span><input type='text' maxlength='6' onkeyup=" + " value=value.replace(/[^0-9]+/g,'')" + " id='newPrice' placeholder='请输入新的价格'/>" +
		"</div>" +
		"<div class='textBox' id='errorMessage'></div><div class='btnBox'><button id='closeRevise' type='button' class='cancelBtn'>取消</button><button id='revisePrice' type='button' class='confirmBtn'>确定</button>" +
		"</div></div>"
		popBox($(popDIV), ".cancelBtn");
		$("#revisePrice").bind('click', function() {
			var price = $.trim($("#newPrice").val());
			if(isNaN(price)) {
				setErrorStatus($("#newPrice"), $("#errorMessage"),"请输入1-999999之间的数字");
				return false;
			}
			$(preSpan).text("均价: " + price + "元/平米");
			$("#closeRevise").click();
			$.ajax({
				url:"/Product.action?revisePrice",
				type:"POST",
				data:{productId:productId, price:price},
				dadaType:"json",
				success:function(data, textStatus) {
					var Qs="<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>" + data.info + "</p></div><div class='popLine clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success' style='margin-left:200px;'>确认</button></div></div>";
					popBox($(Qs),".confirmBtn");
				}
			});
		});
	});
	
	//发布产品
	$(".publish").click(function() {
		var hhId = $(this).attr("v");
		var productId = $(this).attr("n");
		$.ajax({
			url:"/HouseType.action?publishHouseType",
			type:"POST",
			data:{hhId:hhId,publishType:2,productId:productId},
			dadaType:"json",
			success:function(data, textStatus) {
				var data = eval("("+data+")");
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