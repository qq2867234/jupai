$(function(){
    fnTextVerify($("#remarks"),$("#remarks").next(),200);
    
//    // 初始化日期控件
//    $(".datepicker").datepicker({
//    	changeMonth: true,
//    	changeYear: true,
//   		dateFormat: "yy-mm-dd",
//   		minDate: 0, // 最小日期与今天差0天，也就是今天以后
//   		onSelect: function(selectedDate){
//   			$("#datepicker").siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
//   		}
//    });

    $(".radiobox").each(function(){
        fnCreateRadiobox({
            ul: $(this),
            haveOtherOption: true
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
			$.hideLoading();
			if(json.status == "y") {
				$.toast(json.info);
				window.location.href = "/ProgressOperation.action?goToEditContractPage&pid=" + $("#ppid").val();
			}
			else
				$.toast(json.info);
		}
	});
    
	// 不同意（要求房屋检查单）
	$("#applyEdit").click(function() {
		dialog.content = "确定不同意该房屋检查单？";
		dialog.confirmFn = function() {
			$.showLoading("数据提交中...");
			editchecklist.submitForm(true, "/ProgressOperation.action?dealCheckListApply&pid=" + $("#ppid").val() + "&dealType=2");
		}
		fnCreateDialog(dialog);
    });
	
	// 同意房屋检查单
    $("#passChecklist").click(function() {
    	dialog.content = "确定同意该房屋检查单？";
		dialog.confirmFn = function() {
			$.showLoading("数据提交中...");
    		editchecklist.submitForm(true, "/ProgressOperation.action?dealCheckListApply&pid=" + $("#ppid").val() + "&dealType=1");
		}
		fnCreateDialog(dialog);
    });
    
    // 表单提交
	var editContract = $("#editContractForm").Validform({
		tiptype:4, 
		ignoreHidden:true,
		ajaxPost:true,
		datatype:{
			"virLocation":/^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-]+$/
		},
		beforeSubmit:function(curform){
			// 水费
			var waterWhoPay = $("#feeCheckbox .water_fee").hasClass("on")?"租客":"房东";
			$("#waterInput").val(waterWhoPay+","+$(".form-control.water_fee").find(".on").text());
			// 电费
			var powerWhoPay = $("#feeCheckbox .power_fee").hasClass("on")?"租客":"房东";
			$("#powerInput").val(powerWhoPay+","+$(".form-control.power_fee").find(".on").text());
			// 卫生费
			var cleanWhoPay = $("#feeCheckbox .clean_fee").hasClass("on")?"租客":"房东";
			// 其他费用
			$("#otherFee").val($(".form-control.other_fee").find("input").val());
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
			$.showLoading("数据提交中...");
			return true;
		},
		callback:function(json){
			$.hideLoading();
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
				$.toast(json.info);
			}
			// 生成成功
			else if (json.status == "2") {
				// 使用reload微信上显示有问题：页面变空白，触摸后才显示
//				window.location.reload(false);
				window.location.href="/ProgressOperation.action?goToEditContractPage&pid="+$("#ppid").val();
			}
			//需要支付
			else if(json.status == "needPay") {
				window.location.href = "/Pay.action?goToPayPage";
			}
			else {
				$.toast(json.info);
			}
		}
	});
	
	// 点击 保存合同 或 生成合同
	$(".editContract").click(function() {
		$("#editType").val($(this).attr("editType"));
		if($(this).attr("editType") == 2) {
			dialog.content = "确定提交本合同？";
			dialog.confirmFn = function() {
				$(".pubneed").removeAttr("ignore");
				var browser=navigator.appName;
				if(browser == "Microsoft Internet Explorer"){
					$("#editContractForm").submit();
				}else{
					editContract.submitForm();
				}
				$(".pubneed").attr("ignore", "ignore");
			}
			fnCreateDialog(dialog);
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
			$.toast("请先保存合同再预览");
		}else{
			window.location.href=$(this).attr("url");
		}
	});
	
	// select 回显函数（手机端无法回显，改用jsp业内判断）
//	$('.form-control select').each(function () {
//		var value = $(this).attr("option");
//		$(this).children().filter(function () {
//	        return $(this).attr("value") == value;
//	    }).attr("selected", "selected");
//    });
	
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
				// 已输入租金
				if($("#price").val() != "") {
					if(monthArr[i]*parseInt($("#price").val()) == deposit) {
						$("#deposit").append("<option value='"+monthArr[i]*parseInt($("#price").val())+"' selected>"+monthArr[i]+"个月</option>");
					} else {
						$("#deposit").append("<option value='"+monthArr[i]*parseInt($("#price").val())+"'>"+monthArr[i]+"个月</option>");
					}
				} 
				// 未输入租金
				else {
					if(monthArr[i] == deposit) {
						$("#deposit").append("<option value='"+monthArr[i]+"' selected>"+monthArr[i]+"个月</option>");
					} else {
						$("#deposit").append("<option value='"+monthArr[i]+"'>"+monthArr[i]+"个月</option>");
					}
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
					$("#payMonth").append("<option value='"+monthArr[i]+"' selected>"+monthArr[i]+"个月</option>");
				} else {
					$("#payMonth").append("<option value='"+monthArr[i]+"'>"+monthArr[i]+"个月</option>");
				}
			}
		}
		$("#payMonth").blur();
	});
	
	// 租金输入检测
	$('#price').bind('input propertychange', function() {
		var price = $(this).val();
		$("#deposit").children().each(function() {
			$(this).attr("value", parseInt($(this).text())*parseInt(price));
		});
	}); 
	
	// 只有当选择其他证明文件的时候，才显示输入文件名称输入域（手机端特有）
	$("#deedType").change(function() {
        if($(this).val() == "房产证" || $(this).val() == "房屋买卖合同"){
        	$("#deedTypeInput").parent().hide();
        	// 将值付给input
        	$("#deedTypeInput").val($(this).val());
        }else{
        	$("#deedTypeInput").val("").parent().show();
        }
        
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