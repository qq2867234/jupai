$(function(){
    fnTextVerify($("#remarks"),$("#remarks").next(),200);
    
    
    // 初始化日期控件
    $(".datepicker").datepicker({
    	changeMonth: true,
    	changeYear: true,
   		dateFormat: "yy-mm-dd",
   		minDate: 0, // 最小日期与今天差0天，也就是今天以后
   		onSelect: function(selectedDate){
   			$("#datepicker").siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
   		}
    });

    $(".radiobox").each(function(){
        fnCreateRadiobox({
            ul: $(this),
            haveOtherOption: true,
            boxUseType:1
        });
    });
    $("#feeCheckbox li").each(function(){
        fnFeeCheck($(this));
    });
    $("#feeCheckbox li").click(function(){
        $(this).toggleClass('on');
        fnFeeCheck($(this));
    });
    $(".water_fee.form-control").find('li').click(function(){
        $("#feeVal").children('.water_fee').val('租客,'+$(this).text());
    });
    $(".power_fee.form-control").find('li').click(function(){
        $("#feeVal").children('.power_fee').val('租客,'+$(this).text());
    });
    function fnFeeCheck($this){
        var className = $this.attr('class').replace(" on",'');
        if($this.hasClass('on')){
            $(".form-control"+'.'+className).show();
            $("#feeVal").children('.'+className).val('租客');
        }
        else{
            $("#feeVal").children('.'+className).val('房东');
            $(".form-control"+'.'+className).hide();
        }
    }
    $(".optSec").each(function(){
        var $this = $(this);
        if($this.hasClass('on')) {
            $this.parents('ul').siblings(".secInput").show();
        }
        $this.click(function(){
            $this.parents('ul').siblings(".secInput").show().focus();
        });
        $this.siblings().not('.optSec').click(function(){
        	$this.parents('ul').siblings(".Validform_checktip").html("").removeClass("Validform_wrong").siblings("input").removeClass("Validform_error");
            $this.parents('ul').siblings(".secInput").hide();
        });
    });
    
	// 处理checklist的表单
	var editchecklist = $("#checklist").Validform({
		tiptype:4, 
		ignoreHidden:true,
		ajaxPost:true,
		callback:function(json){
			if(json.status == "y") {
				alertSetTime(json.info, 1000);
				window.location.href = "/ProgressOperation.action?goToEditContractPage&pid=" + $("#ppid").val();
			}
			else
				alertDialog(json.info);
		}
	});
    
	// 不同意（要求修改合同）
	$("#applyEdit").click(function() {
    	editchecklist.submitForm(true, "/ProgressOperation.action?dealCheckListApply&pid=" + $("#ppid").val() + "&dealType=2");
    });
	
	// 同意合同
    $("#passChecklist").click(function() {
    	editchecklist.submitForm(true, "/ProgressOperation.action?dealCheckListApply&pid=" + $("#ppid").val() + "&dealType=1");
    });
	
    // 表单提交
	var editContract = $("#editContractForm").Validform({
		tiptype:4, 
		ignoreHidden:true,
		ajaxPost:true,
		datatype:{
			"virLocation":/^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-]+$/,
		},
		beforeSubmit:function(curform){
			var deedType = $("#deedType").find(".on").text();
			if(deedType == "房产证" || deedType == "房屋买卖合同"){
				$("#deedTypeInput").val(deedType);
			}
			// 水费
			var waterWhoPay = $("#feeCheckbox .water_fee").hasClass("on")?"租客":"房东";
			$("#waterInput").val(waterWhoPay+","+$(".form-control.water_fee").find(".on").text());
			// 电费
			var powerWhoPay = $("#feeCheckbox .power_fee").hasClass("on")?"租客":"房东";
			$("#powerInput").val(powerWhoPay+","+$(".form-control.power_fee").find(".on").text());
			// 其他费用
			$("#otherFee").val($(".form-control.other_fee").find("input").val());
			// 卫生费
			var cleanWhoPay = $("#feeCheckbox .clean_fee").hasClass("on")?"租客":"房东";
			if(cleanWhoPay == "租客"){
//				if($("#clean").val() == "") {
//					alert("请输入卫生费");
//					return false;
//				}
				$("#cleanInput").val(cleanWhoPay+","+$("#clean").val()+"元/月");
			}
			
			if($("#editType").val() == 1) {
				$(".editContract.save").text('保存中...');
				$(".editContract.save").attr("disabled", "true");
				$(".editContract.save").addClass("forbidden");
			} 
			else {
				$(".editContract.pub").text('提交中...');
				$(".editContract.pub").attr("disabled", "true");
				$(".editContract.pub").addClass("forbidden");
			}
			
			return true;
		},
		callback:function(json){
			if($("#editType").val() == 1) {
				$(".editContract.save").text('保存合同');
				$(".editContract.save").removeAttr("disabled", "true");
				$(".editContract.save").removeClass("forbidden");
			}
			else {
				$(".editContract.pub").text('提交合同');
				$(".editContract.pub").removeAttr("disabled", "true");
				$(".editContract.pub").removeClass("forbidden");
			}
			// 保存成功
			if(json.status == "1") {
				$(".editContract.save").addClass("saved");
				alertSetTime(json.info, 1000);
			}
			// 提交成功
			else if (json.status == "2") {
				window.location.reload(false);
			} else if(json.status == "needPay") {
				window.location.href = "/Pay.action?goToPayPage";
			} else {
				alertDialog(json.info);
			}
		}
	});
	
	// 点击 保存合同 或 生成合同
	$(".editContract").click(function() {
		$("#editType").val($(this).attr("editType"));
		if($(this).attr("editType") == 2) {
			confirmDialog("确定提交本合同？", function() {
				$(".pubneed").removeAttr("ignore");
				var browser=navigator.appName;
				if(browser == "Microsoft Internet Explorer"){
				    $("#editContractForm").submit();
				}else{
					editContract.submitForm();
				}
				$(".pubneed").attr("ignore", "ignore");
			});
		} else {
			var browser=navigator.appName;
			if(browser == "Microsoft Internet Explorer"){
			    $("#editContractForm").submit();
			}else{
				editContract.submitForm();
			}
			$(".pubneed").attr("ignore", "ignore");
		}
		
	});
	
	// 预览合同
	$("#previewContract").click(function() {
		if(!$(".editContract.save").hasClass("saved")) {
			alertSetTime("请先保存合同再预览", 1500);
		}else{
			window.open($(this).attr("url"), "_blank");  
		}
	});
	
	// select 回显函数
	$('.form-control select').each(function () {
		var value = $(this).attr("option");
		$(this).children().filter(function () {
	        return $(this).attr("value") == value;
	    }).attr("selected", "selected");
    });
	
	// 选择租期后的联动
	$("#rentMonth").change(function() {
		
		// 选择的租期
		var rentMonth = parseInt($("#rentMonth").val());
		// 可选的压付月份
		var monthArr = [1, 2, 3, 6, 12];
		
		var deposit = parseInt($("#deposit").val());
		
		// 生成押金选项
		$("#deposit").empty();
		for (var i = 0, len=monthArr.length; i < len; i+=1) {
			// 只显示小于租期的月份
			if(monthArr[i] <= rentMonth) {
				if(monthArr[i] == deposit || monthArr[i]*parseInt($("#price").val()) == deposit) {
					$("#deposit").append("<option value='"+deposit+"' selected>"+monthArr[i]+"个月</option>");
				} else {
					$("#deposit").append("<option value='"+($("#price").val()!=''?monthArr[i]*parseInt($("#price").val()):monthArr[i])+"'>"+monthArr[i]+"个月</option>");
				}
			}
		}
		$("#deposit").blur();
		
		var payMonth = parseInt($("#payMonth").val());
		// 生成付款选项
		$("#payMonth").empty();
		for (var i = 0, len=monthArr.length; i < len; i+=1) {
			// 只显示小于租期的月份
			if(monthArr[i] <= rentMonth) {
				if(monthArr[i] == payMonth) {
					$("#payMonth").append("<option value='"+monthArr[i]+"' selected='selected'>"+monthArr[i]+"个月</option>");
				} else {
					$("#payMonth").append("<option value='"+monthArr[i]+"'>"+monthArr[i]+"个月</option>");
				}
			}
		}
		$("#payMonth").blur();
	});
	
	// 租金输入监听
	$('#price').bind('input propertychange', function() {
		var price = $(this).val();
		$("#deposit").children().each(function() {
			$(this).attr("value", parseInt($(this).text())*parseInt(price));
		});
	}); 
	
	// 日期控件中文配置
	$.datepicker.setDefaults({
		monthNamesShort : [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
		dayNamesMin : [ "日", "一", "二", "三", "四", "五", "六" ],
		dateFormat : "yy-mm-dd",
		firstDay : 1,
		showMonthAfterYear : true
	});
});