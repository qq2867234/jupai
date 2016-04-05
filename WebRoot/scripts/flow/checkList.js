$(function(){
    fnCreateTabContent(".tab-index",".tab-detail");
    $("input:radio").click(function() {
        if($(this).hasClass("noRadio")){
            $(this).siblings("input.inputVal").val("").attr('status','0').attr('disabled','disabled');
            
        }
        else if($(this).hasClass("regularRadio")){
            $(this).siblings("input.inputVal").val("").attr('status','1').attr('disabled','disabled');
        }
        else if($(this).hasClass("abnormalRadio")){
            $(this).parents(".tab-detail").find(".allRegular").removeAttr('checked');
            $(this).siblings("input.inputVal").removeAttr('disabled').attr('status','2');
        }
    });
    $(".allRegular").click(function(){
        if($(this).is(":checked")){
            $(this).siblings(".allClear").removeAttr('checked');
            $(this).parents(".tab-detail").find(".regularRadio").click();
        } else {
        	$(this).siblings(".allRegular").removeAttr('checked');
            $(this).parents(".tab-detail")
               .find("input:radio").removeAttr('checked')
               .end().find(".inputVal").removeAttr('status');
        }
    })
//    $(".allClear").click(function(){
//        if($(this).is(":checked")){
//             $(this).siblings(".allRegular").removeAttr('checked');
//             $(this).parents(".tab-detail")
//                .find("input:radio").removeAttr('checked')
//                .end().find(".inputVal").removeAttr('status');
//            }
//    })
    $(".delThis").click(function(){
        var liClass = $(this).parents('li').attr('class').replace('on','').replace(' ','');
        $('.'+liClass).remove();
    })
    
    var add = $("#step1").Validform({
    	tiptype:4, 
		ignoreHidden:true,
		ajaxPost:true,
		btnSubmit:$("#btnStep1"),
		datatype:myDataType,
		beforeCheck:function(curform){
			//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话将不会继续执行验证操作;
		},
		beforeSubmit:function(curform){
			//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话表单将不会提交;	 
			if(rent.orderFlag == "false") {
				$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请选择提示列表中的小区。");
				rent.completed($("#btnStep1"));
				return false;
			}
			return true;
		},
		callback:function(data){
			
		}
    });
})