//组织回车键提交表单
document.onkeydown = function(event) {  
    var target, code, tag;  
    if (!event) {  
        event = window.event; //针对ie浏览器  
        target = event.srcElement;  
        code = event.keyCode;  
        if (code == 13) {  
            tag = target.tagName;  
            if (tag == "TEXTAREA") { return true; }  
            else { return false; }  
        }  
    }  
    else {  
        target = event.target; //针对遵循w3c标准的浏览器，如Firefox  
        code = event.keyCode;  
        if (code == 13) {  
            tag = target.tagName;  
            if (tag == "INPUT") { return false; }  
            else { return true; }   
        }  
    }  
};  

$(function(){
	//$(".account").find("tr").eq(3).prevAll().show();
	if($("#buildingType").val()== 1 || $("#buildingType").val()==2)
	{
	$(".floorTyTr").show();
	}
	else
	{
	$(".floorTyTr").hide();
	}
	$("#mBtn").click(function(){
		$(".moreInfo").show();
		$(this).parents(".divLine").hide();
		$("#lBtn").parents(".divLine").show();
		Init();
	});
	$("#lBtn").click(function(){
		$(".moreInfo").hide();
		$(this).parents(".divLine").hide();
		$("#mBtn").parents(".divLine").show();
		Init();
	});
	$(".itemInput input").focus(function(){
		$(this).addClass("onFocus");
		});
	$(".itemInput input").blur(function(){
		$(this).removeClass("onFocus");
		});
	$(".itemInput input.community").focus(function(){
		$(this).next().fadeIn(200);
		});
	$(".itemInput input.community").blur(function(){
		$(this).next().fadeOut(200);
		});
	$(".popCom li").click(function(){
		$(this).parent().prevAll('#residenceId').val($(this).attr("residenceId"));
		//$(this).parent().prev().val($(this).text()).blur();
		$(this).parent().prev().blur();
//		alert($('#residenceId').val());
		});
	
	$("#buildingType").change(function(){
		if($(this).val()=="1"||$(this).val()=="2")
		{
			$(".floorhide").hide();
			$("#floor").hide();
			$("#basement").show();
			$("#Park").show();
			$("#garden").show();
		}
		else
		{
			$(".floorhide").show();
			$("#floor").show();
			$("#basement").hide();
			$("#Park").hide();
			$("#garden").hide();
		}
	});	
	$(".hMenu li").click(function(){
		$(this).siblings().removeClass("on")
			.end().addClass("on");	
		$(this).parent().next().val($(this).index());
		//alert($(this).parent().next().val());
		});
	$(".upload").eq(0).show().children().show();
	$("#picUpload li").click(function(){
		$(this).siblings("li").removeClass("on")
			.end().addClass("on");
		var clickIndex = $(this).index();
		$(".upload").hide();
		$(".upload").eq(clickIndex).show();

		});
	$(".delPic").click(function(){
		$(this).parent().remove();		
		});
	
	$("#listPage dl").click(function(e) {
		e = window.event || e;
		$this = $(e.srcElement || e.target);
		if($this.is(".operate, .operate *"))
		{
			return;
		}
		else
		{	
			//var homeId = $(".un input[type=hidden]").val();
			var homeId = $(this).children("input[type=hidden]").val();
			window.location.href = "/RentalHomeController.action?goToEditRentalHomeInput&homeId=" + homeId;
		}
	});
	
	
	tagChoser({
		tagChosenUl: $("#tagChosen"),
		tagListUl: $("#tagList"),
		tagListUlBox: $("#tagSpread"),
		warnSpan:$("#overstep"),
		tagInput:$("#tagInput"),
		tagCount:5,
		tagValInput:$("#favorTag")
		}); 
	
	fnTextVerify($(".contrive"),$(".contrive").next(),20);
	fnTextVerify($("#commuName"),$("#commuName").next(),32);
	fnTextVerify($("#introduction"),$("#introduction").next(),200);
/*	$(".picbox").each(function(){
		fnTextVerify($(this).children("textarea"),$(this).children(".remainder"),16);
		});*/

})