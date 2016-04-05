var promotionId;
var PromotionTitle;
var attendeeIds=[];
//删除活动
    function delPromotion(promotionId){
    	if(confirm("真的要删除这项活动吗?")){
    		window.location.href="/Promotion.action?delPromotion&promotionId="+promotionId+"&residenceId="+$("#residenceId").val()+"&residenceName="+$("#residenceName").val();
    	}
    }
    
//添加审核事件
   function passClick(){
	   $(".checkIt").click(function(){
           //单个通过审核操作
       	 $.ajax({
       			url: '/Promotion.action?passOneUser',
       			data: {
       				attendeeId:this.id
       			},
       			dataType:"json",
       			async:false,
       			type: "post",
       			cache : false,
       			success: function(data)
       		 		{
       				switch (data.status) {
       				case 0:
       					window.location.href="/"
       					break;
       				case 1:
       					alert("成功!")
       					break;
       				default:
       					break;
       				}		
       		 		}
       		});
       	 refleshList();
       });
	   
		 $("#checkAll").click(function(){
	       	
	       		if($(".check:checked").length>0)
	       			{
	       				$(".check:checked").each(function(e){
		       			attendeeIds.push(this.id);
	       				});
	       				
	       			 $.ajax({
	            			url: '/Promotion.action?passUsers',
	            			data: {
	            				attendeeIds:attendeeIds
	            			},
	            			dataType:"json",
	            			async:false,
	            			type: "post",
	            			cache : false,
	            			success: function(data)
	            		 		{
	            				switch (data.status) {
	            				case 0:
	            					window.location.href="/"
	            					break;
	            				case 1:
	            					alert("成功!")
	            					break;
	            				default:
	            					break;
	            				}		
	            		 		}
	            		});       			
	       				refleshList();
	       				attendeeIds=[];
	       			}
	       	
	       		 
	       	 });
    }
    
  //刷新审核列表
    function refleshList(){
    	 var oCheckPromo='';
         $.ajax({
   			url: '/Promotion.action?showPromotionAttendee',
   			data: {
   				promotionId:promotionId
   			},
   			dataType:"json",
   			async:false,
   			type: "post",
   			cache : false,
   			success: function(data)
   		 		{
   				$.each(data.beans, function(i,bean){
   					if(bean.status==1){
   						//没有通过审核
   						oCheckPromo=oCheckPromo
   						+"<label><input type='checkbox' class='check' id='"+bean.attendeeId+"'/>"+bean.name+","+bean.mobile+"</label>"
   			        	+"<a href='#' class='cancelBtn checkIt' id='"+bean.attendeeId+"'>通过审核</a>"
   					}else
   					if(bean.status==2){
   						//已经通过了审核
   						oCheckPromo=oCheckPromo
   						+"<label><input type='checkbox' class='check' disabled='true'/>"+bean.name+","+bean.mobile+"</label>"
   			        	+"<a href='#' class='cancelBtn checked'>已通过</a>"
   						}
   				});				
   		 		}
   		});
         
         
         		
         $(".checkDiv").html(oCheckPromo);	
         	
         passClick();
    	
    	
    }
$(function(){
	
    $(".checkPromo").click(function() {
        $(".divPopup").remove();
        var xCor = $(this).parents(".promoPiece").position().left +620;
        var yCor = $(this).position().top + 30;
        promotionId=Number(this.id.split("-")[0]);
        PromotionTitle=this.id.split("-")[1];
        
        //添加参与列表  
        var oCheckPromo=
          	 "<div class='divPopup'> <h5> <span>"+PromotionTitle+"</span><a class='closeBtn actionBtn'>关闭</a></h5>"
          	  +"<p><a href='#' class='actionBtn' id='choseAll'>全选</a> <a href='#' class='actionBtn' id='choseNot'>反选</a><a href='#' class='confirmBtn' id='checkAll'>批量审核</a></p>"
          	  +"<div class='promoCheck'><div class='checkDiv'>";
            $.ajax({
      			url: '/Promotion.action?showPromotionAttendee',
      			data: {
      				promotionId:promotionId
      			},
      			dataType:"json",
      			async:false,
      			type: "post",
      			cache : false,
      			success: function(data)
      		 		{
      				$.each(data.beans, function(i,bean){
      					if(bean.status==1){
      						//没有通过审核
      						oCheckPromo=oCheckPromo
      						+"<label><input type='checkbox' class='check' id='"+bean.attendeeId+"'/>"+bean.name+","+bean.mobile+"</label>"
      			        	+"<a href='#' class='cancelBtn checkIt' id='"+bean.attendeeId+"'>通过审核</a>"
      					}else
      					if(bean.status==2){
      						//已经通过了审核
      						oCheckPromo=oCheckPromo
      						+"<label><input type='checkbox' class='check' disabled='true'/>"+bean.name+","+bean.mobile+"</label>"
      			        	+"<a href='#' class='cancelBtn checked'>已通过</a>"
      						}
      				});				
      		 		}
      		});
            		oCheckPromo=oCheckPromo
            			+"</div></div> </div>";
            		
        $(oCheckPromo).appendTo("body").css({'left':xCor+'px','top':yCor+'px'});
        passClick();
        $("#choseAll").click(function() {
            $(".divPopup").find("input.check").not(":disabled").prop('checked',true);
        });
        $("#choseNot").click(function() {
            $(".divPopup").find("input.check").not(':disabled').each(function(){
                if($(this).is(":checked"))
                {
                     $(this).prop('checked',false);
                }
                else{
                    $(this).prop('checked',true);
                }
            })
        });
        $(".closeBtn").click(function() {
            $(this).parents(".divPopup").remove();
        });
    });
    $(".stopPromo").click(function() {
        //停止活动


        $(this).removeClass('stopPromo').addClass("forbidden");
    });
  /*  $(".delPromo").click(function() {
        //删除活动
    });*/
    


    
    $("#createPromo").click(function() {
        $(".divPopup").remove();
        var xCor = $(this).parent().position().left +300;
        var yCor = $(this).position().top + 80;
        
        var oCreatPromo = "<form class='divPopup' id='submitPromotion' name='submitPromotion' >"
        +"<h5> <span>发布新活动</span><a class='closeBtn actionBtn'>关闭</a></h5>"
        +"<div class='divLine'>"
        +"<div class='item'> 小区 </div>"
        +"<div class='itemInput'>"
        +"<input name='residences' id='residences' type='text' value='"+$("#residenceName").val()+"' readonly=''>"  //小区名
        +"<span class='Validform_checktip Validform_wrong idInfo'></span>" //小区错误信息
        +"</div> </div>"
        +"<div class='divLine'>"
        +"<div class='item'> 标题 </div>"
        +"<div class='itemInput'>"
        +"<input name='title' id='title' type='text'  maxlength='20'> <span class='warning'>还能输入20字</span>" //标题
        +"<span class='Validform_checktip Validform_wrong titleInfo '></span>"  //标题错误信息
        +"</div></div>"
        +"<div class='divLine'>"
        +"<div class='item'> 描述 </div>"
        +"<div class='itemInput'>"
        +"<textarea id='description' class='valid'></textarea> <span class='warning textarea'>还能输入200字</span>" //描述
        +"<span class='Validform_checktip textarea Validform_wrong descriptionInfo'></span>"//描述错误信息
        +"</div> </div>"
        +"<div class='divLine last'>"
        +"<button type='button' id='submitBut' class='cancelBtn onlyBtn'>发布活动</button>" //提交按钮
        +"<span class='Validform_checktip Validform_wrong totalInfo'>"
        +"</span> </div> </form>";
        $(oCreatPromo).appendTo("body").css({'left':xCor+'px','top':yCor+'px'});
        
        addValidate();
        addClick();   
        
        fnTextVerify($("#title"),$("#title").next('.warning'),20);
        fnTextVerify($("#description"),$("#description").next('.warning'),200);
        $(".closeBtn").click(function() {
            $(this).parents(".divPopup").remove();
        });
       /* $("#submitBut").click(function() {
        	
        	
        });*/
    });



/*clearInputs();
addValidate();*/
//添加提交事件 
function addClick()
{
$('#submitBut').click(function() {
	
	
	if(isValidate())
		{
	
   $.ajax({
			url: '/Promotion.action?createPromotion',
			data: {
				residenceId:$("#residenceId").val(),
				title:$("#title").val(),
				description:$("#description").val()	
			},
			dataType:"json",
			async:false,
			type: "post",
			cache : false,
			success: function(data)
		 		{
				switch (data.status) {
				case 0:
					window.location.href="/"
					break;
				case 1:
					$(".totalInfo").html("提交的参数不合法！");
					break;
				case 2:
					alert("成功添加一条活动!");
					window.location.href="/Promotion.action?getPromotions&residenceName="+$("#residenceName").val()+"&residenceId="+$("#residenceId").val();
					break;
				default:
					break;
				}
					
		 		}
		});
	}
	else
		{
		if($("#residenceId").val().length==0){
			$(".idInfo").html("请选择小区")
			$("#residenceId").addClass("Validform_error");
		}
		else if($("#title").val().length==0){
			$(".titleInfo").html("请输入活动标题")
			$("#title").addClass("Validform_error")
		}
		else if($("#description").val().length==0){
			$(".descriptionInfo").html("请输入活动介绍");
			$("#description").addClass("Validform_error")
		}
		$(".totalInfo").html("您的输入不符合要求，请仔细检查！");
		}

}); 

}

//清空表单数据
function clearInputs(){
	$("#residences").val("");
	$("#residenceId").val("");
	$("#title").val("");
	$("#description").val("");
}
//对表单条件验证事件
function addValidate(){
	$("#residences").blur(validateId);
	$("#title").blur(validateTitle);
	$("#description").blur(validateDescription);
	
}
//判断参数的合法性
function isValidate(){
	
	if($(".idInfo").text().length==0
	   &&$(".titleInfo").text().length==0
	   &&$(".descriptionInfo").text().length==0
	   &&$("#residenceId").val().length>0
	   &&$("#title").val().length>0
	   &&$("#description").val().length>0)
		{
			return true;
		}
		else
		{
			return false;
		}
}
//参数没有错误提示时清楚提交按钮按的错误信息
function emptyErrorInfo(){
	if(isValidate()&&$(".totalInfo").html().length>0){
		$(".totalInfo").html("");
	}	
	
}
//对residenceId进行验证
function validateId(){
	
	if(/^\d{1,9}$/.test($("#residenceId").val())){
		$(".idInfo").html("");
		if($("#residences").hasClass("Validform_error"))
			{
			$("#residences").removeClass("Validform_error");
			}
		emptyErrorInfo();
	}
	else
		{
		$(".idInfo").html("请选择一个我们提供的小区");
		$("#residences").addClass("Validform_error");
		}
}
//对title进行验证
function validateTitle(){
	if(/^.{1,20}$/.test($("#title").val())){
		$(".titleInfo").html("");
		if($("#title").hasClass("Validform_error"))
		{
		$("#title").removeClass("Validform_error");
		}
		emptyErrorInfo();
	}
	else
		{
		$(".titleInfo").html("请输入活动标题,最多输入20个字符");
		$("#title").addClass("Validform_error");
		}
	
	
}
//对description进行验证
function validateDescription(){
	if(/^.{1,200}$/.test($("#description").val())){
		$(".descriptionInfo").html("");
		if($("#description").hasClass("Validform_error"))
		{
		$("#description").removeClass("Validform_error");
		}
		emptyErrorInfo();
	}
	else
		{
		$(".descriptionInfo").html("请输入活动介绍,最多输入200个字符");
		$("#description").addClass("Validform_error");
		}
	
	
}

//手动输入小区时触发
$("#residences").bind("change",function(){
	$("#residenceId").val("");
})




/*
var cacheResidence = {};	//小区缓存
var chosenResidencePool = {}; //保存已选择的小区
$("#residences").autocomplete({
	minLength: 0,
	width: 318,
	autoFocus: true,
	source: function( request, response ) {
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
      url: '/EditBrokerInfo.action?getResidenceListByCityCode',
      data: {cName: encodeURIComponent('北京'),keyword:encodeURIComponent(request.term)},
      type: 'post',
      dataType: "json",
      success: function(data, status, xhr) {
    	  cacheResidence[term] = data;
    	  chosenResidencePool = data;
		response($.map(data, function(item, index) {
			
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
		alert(ui.item.value);
		$("#residenceId").val(ui.item.value);
		this.value = String(ui.item.label).substring(0, String(ui.item.label).indexOf("("));
		orderFlag= "true";
		$("#residenceId").blur();
	}
}).focus(function() {
	orderFlag = "false";
    $(this).autocomplete("search", "");
});*/
});


