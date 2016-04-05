$(function(){
	$(document).click(function(e){
		e = window.event || e;
  		$this = $(e.srcElement || e.target);
		if(!$this.is("#county,#county *")&&!$this.is("#countyInput,#countyInput *")&&!$this.is("#circle,#circle *")&&!$this.is("#circleInput,#circleInput *"))
		{
			$("#county").hide();
			$("#circle").hide();
		}

		});
/*	$(".residenceManage td.infor").mouseenter(function(){
		$(this).addClass("inforBg");
		
		});
	$("tr.normal .confirm").click(function(){
		$(this).prev("input")
	   .removeClass("change")
	   .prev(".zone")
	   .removeClass("change")
	   .end().end()
	   .hide();
	});*/
/*	$("#mBtn").click(function(){
		$(".moreInfo").show();
		$(this).parents(".divLine").hide();
		$("#lBtn").parents(".divLine").show();
		Init();
		
	});
	$("#lBtn").click(function(){
		$(".moreInfo").hide();
		Init();
		$(this).parents(".divLine").hide();
		$("#mBtn").parents(".divLine").show();
	});*/
	$("#relaBox li").mouseenter(function(){
		$(this).addClass("hover");
		});
	$("#relaBox li").mouseleave(function(){
		$(this).removeClass("hover");
		});
	$("#countyInput").focus(function(){
		$("#circleInput").removeClass("inputOn");
		$(this).addClass("inputOn");
		$("#county").show();
		$("#circle").hide();
		});
	$("#circleInput").focus(function(){
		if($("#countyInput").val()=="")
		{
			$("#countyInput").focus();
			$(this).blur();
		}
		else
		{
			$("#countyInput").removeClass("inputOn");
//			$(this).addClass("inputOn");
//			$("#circle").show();
			$("#county").hide();
			var districtName = $.trim($("#countyInput").val());
			var cityCode = $("#cityCode").val();
			$("#countyInput").removeClass("inputOn");
			$("#circleInput").addClass("inputOn");
			$.ajax({
				url:"/SaleHomeController.action?showBizcircleList",
				data:{districtName:encodeURIComponent(districtName),cityCode:cityCode},
				dataType:"json",
				async:false,
				success:function(data, textStatus) {
					if($.trim(data.status) == "y") {
						$("#circle").children().remove();
						$.each(data.BL, function(index, item) {
							$("#circle").append("<li>"+item+"</li>");
						});
						$("#circle li").not(".charater").bind('click',function(e){
							stopProp(e);
							$("#circleInput").val($(this).text());
							$("#circleInput").change();
							//alert($("#circleInput").val());
							$(this).siblings().removeClass("on")
								.end().addClass("on")
								.parent().hide();
							$("#circleInput").removeClass("inputOn").blur();
							});
						$("#circle").show();
						return true;
					} else if($.trim(data.status) == "n") {
						$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
						return false;
					} else if($.trim(data.status) == "e") {
						$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
						window.location.href = "/UserSearch.action?toHome";
						return false;
					}
				} 
			});
		}
		});
	$("#county li").click(function(e){
		stopProp(e);
		$("#countyInput").val($(this).text());
		$("#circleInput").val("");
		if($("#circleInput").val().length>0){
			$("#circleInput").val("");
		}
		$("#countyInput").change();
		$("#countyInput").blur();
		$("#circleInput").val("");
		var districtName = $.trim($("#countyInput").val());
		var cityCode = $("#cityCode").val();
		$(this).siblings().removeClass("on")
			.end().addClass("on")
			.parent().hide();
		$("#countyInput").removeClass("inputOn");
		$("#circleInput").addClass("inputOn");
		$.ajax({
			url:"/SaleHomeController.action?showBizcircleList",
			data:{districtName:encodeURIComponent(districtName),cityCode:cityCode},
			dataType:"json",
			async:false,
			success:function(data, textStatus) {
				if($.trim(data.status) == "y") {
					$("#circle").children().remove();
					$.each(data.BL, function(index, item) {
						$("#circle").append("<li>"+item+"</li>");
					});
					$("#circle li").not(".charater").bind('click',function(e){
						stopProp(e);
						$("#circleInput").val($(this).text());
						$("#circleInput").change();
						//alert($("#circleInput").val());
						$(this).siblings().removeClass("on")
							.end().addClass("on")
							.parent().hide();
						$("#circleInput").removeClass("inputOn").blur();
						});
					$("#circle").show();
					return true;
				} else if($.trim(data.status) == "n") {
					$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
					return false;
				} else if($.trim(data.status) == "e") {
					$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
					window.location.href = "/UserSearch.action?toHome";
					return false;
				}
			} 
		});
		
		});
	$("#circle li").not(".charater").click(function(e){
		stopProp(e);
		$("#circleInput").val($(this).text());
		$("#circleInput").change();
		$(this).siblings().removeClass("on")
			.end().addClass("on")
			.parent().hide();
		$("#circleInput").removeClass("inputOn");
		});
	fnTextVerify($("#address"),$("#address").next("span"),40);	
	fnTextVerify($("#alias"),$("#alias").next("span"),32);	
	fnTextVerify($("#intro"),$("#intro").next("span"),200);
	//fnTextVerify($("#intro textarea"),$("#intro textarea").next("span"),200);
	fnTextVerify($("#shopTextarea"),$("#shopTextarea").next("span"),600);
	
	//fnTextVerify($("#support textarea"),$("#support textarea").next("span"),200);
	$(".upload").eq(0).show().children().show();
	$("#picUpload li").click(function(){
		$(this).siblings("li").removeClass("on")
			.end().addClass("on");
		var clickIndex = $(this).index();
		$(".upload").hide();
		$(".upload").eq(clickIndex).show();

		});
/*	$(".delPic").click(function(){
		$(this).parent().remove();		
		});*/
	$(".uploadBtn").click(function(){
		$(this).next().click();
		});
/*	$(".picbox").each(function(){
		fnTextVerify($(this).children("textarea"),$(this).children(".remainder"),16);
		});*/

}); 
