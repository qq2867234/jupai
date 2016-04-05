var changeResidenceFlag = 0; //是否进行门店修改的标志 0 代表不修改 1 代表可以修改

//检查是否经过在职认证
function checkBrokerV() {
	$.ajax({
		type:"POST",
		url:"/UserCenterOperator.action?checkBrokerV",
		dataType:"json",
		success:function(data) {
			if(data.status == "y") {
				window.location.href = "/UserCenterController.action?goToServiceAreaSetting";
			} else if(data.status == "n") {

//				var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>" + data.info + "</div><div class='btnBox clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
//				popBox($(Qs),".confirmBtn");
				window.location.href = "/UserCenterController.action?goToServiceAreaSetting";

			} else if(data.status == "e") {
				window.location.href = "/";
			} else {
				window.location.href = "/";
			}
		}
	});
}

$(function() {
//	//认证手机
//	var serviceResidence = $("#serviceResidence").Validform({
//		tiptype:4,
//		ajaxPost:true,
//		postonce:true,
//		btnSubmit:"#saveSR",
//		callback:function(data){
//			if($.trim(data.status)==="y") {
//				window.location.href = "/UserCenterController.action?goToSuccessPageForVMobie";
//			} else if($.trim(data.status)==="n") {
//				$("#saveServiceArea").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
//			} else if($.trim(data.status)==="e") {
//				window.location.href = "/";
//			}
//		}
//	});
//	//重置数据
//	$("#cancelSR").click(function() {
//		serviceResidence.resetForm();
//		$(":input").blur();
//	});
//	
	//选择小区  有策略 还没实现，把数据放缓存里 http://www.iteye.com/topic/1117898 scripts/residence.json
	var cacheResidence = {};	//小区缓存
	var chosenResidencePool = {}; //保存已选择的小区
	$("#commun").autocomplete({
		minLength: 0,
		width: 318,
		autoFocus: true,
		source: function( request, response ) {
			changeResidenceFlag = 0;
			var term = request.term;
			if(term in cacheResidence) {
				response($.map(cacheResidence[term], function(item, index) {
					chosenResidencePool = cacheResidence[term];
					//alert(JSON.stringify(item));
					return {
						label: item.residenceName,
	                    value: item.residenceId
	              }
	            }));	
				return;
			}
      $.ajax({
          url: '/UserCenterController.action?getServiceArea',
          data: {keyword:encodeURIComponent(request.term)},
          type: 'post',
          dataType: "json",
          success: function(data, status, xhr) {
        	  cacheResidence[term] = data.residence;
        	  chosenResidencePool = data.residence;
			response($.map(data.residence, function(item, index) {
				return {
					label: item.residenceName,
                    value: item.residenceId
              }
            }));												
          },
          error: function(data) {
        	//alert(JSON.stringify(data));
          }
      });
		},
		select: function( event, ui ) {
			event.preventDefault();
			//$("#residenceIds").val(ui.item.value);
			$("#residenceIdFade").val(ui.item.value);
			this.value = String(ui.item.label).substring(0, String(ui.item.label).indexOf("("));
			$("#commun").blur();
		}
	}).focus(function() {
	    $(this).autocomplete("search", "");
	});
	$("#commun").blur(function() {
		var goTo = 0;
		$.each(cacheResidence, function(index, item) {
			goTo = 1;
			$.each(item, function(i, it) {
				var residenceName = String(it.residenceName).substring(0, String(it.residenceName).indexOf("("))
				if(residenceName == $.trim($("#commun").val())) {
					changeResidenceFlag = 1;
					return false;
				} else {
					changeResidenceFlag = 0;
				}
			});
			if(changeResidenceFlag == 1) {
				return false;
			}
		});
		if(goTo == 0) {
			changeResidenceFlag = 0;
			return false;
		}
	});
	//对修改小区进行验证
	var sr = $("#serviceResidence").Validform({
		tiptype:4,
		ajaxPost:true,
		btnSubmit:"#saveSR",
		callback:function(data){
			if(data.status == "y") {
				// var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>" + data.info + "</div><div class='btnBox clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
				// popBox($(Qs),".confirmBtn");
				confirmDialog(data.info);
			} else if(data.status == "n") {
				$("#saveServiceArea").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
			} else if(data.status == "e") {
				window.location.href = "/";
			}
		}
	});
	
	//重置数据
	$("#cancelSR").click(function() {
		 window.location.href = '/UserCenterController.action?goToServiceAreaSetting';
	});
	
	$(".commuC").click(function(){
		$(this).remove();
		initCommu();
		//chosenList.parent().children("span").text("");
		$("#community").val(getCommunityVal($("#commuChosen"))).change();
		$("#residenceIds").val(commuResidenceIds.join(","));
	});
	
	var commuContent;
	$(".commuBtn").click(function(){
		//$("#commuInput").blur();
		commuContent = $(this).prev().val();
		$(this).parent().children("span").text("");
		if(commuContent=="")
		{
			$(this).siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("请输入小区名");
		}
		else
		{
			$(this).prev().val("");
			if(changeResidenceFlag == 1) {
				commuAdd(commuContent,$("#commuChosen"),$(this).prev());
			} else {
				$(this).siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("所选小区不在服务范围");
			}
		}
	});
});
	