

$(document).ready(function(){
    $("#checkMenu a").click(function(){
        var checkRoom = $(this).attr('id');
        $(".mainMenu").hide();
        $("."+checkRoom).show().siblings().hide();
        $(this).parent().removeClass("uncheck");
        $(this).children("span:first").remove();
    })

    $(".checkBtn:not('.forbidden')").click(function(){
        $(this).toggleClass('off');
        $(this).parents(".form-control").toggleClass('disabled');
        if($(this).hasClass('off')){
            $(this).parents('.form-control').addClass('disabled')
                .find('input[type=hidden]').val('无')
                .end().find('input[type=text],input[type=number],select').attr('disabled','disabled').val("");
            // getRemark($(this),0);
        }
        else{
            $(this).parents('.form-control').find('input[type=text],input[type=number],select').removeAttr('disabled');
            $(this).parents('.form-control').find('select').children().first().attr("selected", true);
            $(this).parents('.form-control').find('select').val("1");
            $(this).parents('.form-control').find('select').next().val("1");
            getToggleStatus($(this).siblings('.toggleBtn'));
        }
    })
    $(".toggleBtn").click(function(){
        if($(this).parents(".form-control").hasClass("disabled")){
            return;
        }
        else{
            $(this).toggleClass('off');
            getToggleStatus($(this));
        }
        
    })
    $(".remarkBtn").click(function(){
        $(this).fadeOut(100)
            .siblings(".edit-group").animate({'height':"11em",'width':'99%'});
    })
    $("select.maybeSelect").change(function(){
        $(this).parents(".form-control").find(".maybeValue").val($(this).val());
    })
    // $(".uploadBtn,.form-control").click(function(){
    //     $(this).parents(".edit-group").animate({'height':"0",'width':'0'})
    //         .siblings(".remarkBtn").fadeIn(300);
    // })

});

function getRemark($this,status){
    var $thisAbnormalText = $this.siblings('b').text();
    var $thisRemark = $this.parents(".tab-detail").find('textarea.remarks');
    if(status==0||status==1){
        // '无'状态
        removeRemark();
    }
    else{
        // 异常状态
        addRemark()
    }
    function addRemark(){
        if($thisRemark.text().indexOf($thisAbnormalText)<0){
            // 没有异常备注则添加
            $thisRemark.text($thisRemark.text()+$thisAbnormalText+'异常:  ');
        }
        else{
            return;
        }
    }
    function removeRemark(){
        if($thisRemark.text().indexOf($thisAbnormalText)>=0){
            // 有异常备注则删除
            $thisAbnormalText = $thisAbnormalText + '异常:';
            $thisRemark.text($thisRemark.text().replace($thisAbnormalText,''));
        }
    }
}
function getToggleStatus($this){
    var fa = $this.parents(".form-control");
    if(fa.find('.toggleBtn').hasClass('off')){
        fa.find('input:hidden').val('异常').siblings('span').text('异常');
    }
    else if(fa.find("select").length > 0){
        fa.find('input:hidden').val(fa.find("select").val());
    }
    else{
        fa.find('input:hidden').val('正常').siblings('span').text('正常');
    }
    //alert(fa.find('input:hidden').val());
}

var checklist = {
	//检验是否每一项都已经检查过
	isAllChecked: function() {
		var item;
		var isUnChecked = 0;//默认是0
		$("#checkMenu li").each(function() {
			item = $(this);
			if(item.hasClass("uncheck")) {
				isUnChecked = 1;
			} 
		})
		if(isUnChecked == 0) {
			return true;
		} else {
			return false;
		}
	},
	//设置真正的值
	setRealValue: function() {
		var v = "";
		var item;
		$(".maybeValue").each(function() {
			item = $(this);
			v = item.val();
			if((v == "无" || v == "-1") && item.prev().val() == "") {
				item.val("-1");
				item.prev().attr("ignore", "ignore");
			}  else {
				item.prev().attr("ignore", "");
				item.val(item.prev().val());
			}
		});
	},
	
	//初始化列表
	initCheckList: function() {
		$(".checkBtn").each(function() {
			var item = $(this);
			var length = 0;
			if(item.hasClass("off")) {
				item.parents().addClass("disabled");
				length = item.siblings("input").length;
				if(length == 2) {
					item.siblings("input:first").attr("disabled", true);
				}
				item.siblings("select").attr('disabled','disabled').val("");
			}
		});
	},
	
	//展示提交后显示的页面
	showSuccessView: function() {
		$(".main").hide();
		$(".info").show();
	},
	
	//显示主页
	showMainBlock: function() {
		$(".tab-detail").hide();
		$(".mainMenu").show();
	}
}

$(function() {
	
	$.Tipmsg.r = "";
	checklist.initCheckList();
	 var add = $("#checklist").Validform({
    	tiptype:4, 
		ignoreHidden:true,
		ajaxPost:true,
		btnSubmit:$(".checkOff"),
		data: {pid: $("#checkPid").val()},
		datatype:{
			"checkTiny":function(gets,obj,curform,regxp) {
				var newBedRoom = parseInt(gets);
				if(isNaN(newBedRoom)) {
					return "请输入1-127之间的数字";
				}
				if(newBedRoom > 0 && newBedRoom <= 127) {
					return true;
				} else {
					return "请输入1-127之间的数字";
				}
			},
		},
		beforeSubmit:function(curform){
			//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话表单将不会提交;	 
			
			checklist.setRealValue();
			$(".checkOff").text('提交中...');
			$(".checkOff").attr("disabled", "true");
			$(".checkOff").addClass("forbidden");
			$.showLoading("数据提交中...");
			return true;
		},
		callback:function(data){
			$.hideLoading();
			$(".checkOff").text('检查完毕');
	        $(".checkOff").removeAttr("disabled");
	        $(".checkOff").removeClass("forbidden");
			if(data.status == "n") {
				dialog.type = "alert";
				dialog.content = data.info;
				fnCreateDialog(dialog);
			} else {
				if(data.flag != undefined && data.flag == "isCfm") {
					checklist.showSuccessView();
					 
				} else {
					checklist.showMainBlock();
				}
			}
		}
    });
	 
	$("#submitBtn").click(function() {
		if(checklist.isAllChecked()) {
			var pid = $("#checkPid").val();
			add.submitForm(false, "/ProgressOperation.action?confirmCheckList&pid=" + pid);
		} else {
			dialog.type = "alert";
			dialog.content = "存在未检查的项目，请重新检查。";
			fnCreateDialog(dialog);
		}
	});
	
});