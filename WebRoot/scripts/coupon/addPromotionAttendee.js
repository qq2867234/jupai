$(function(){
	
		fnTextVerify($("#mobile"),$("#mobile").next('.warning'),11);
		$("#loginNow").click(function(){
							$("#loginBtn").click();
				});
		clearInputs();
		addValidate();
		
		$('#submitBut').click(function() {
			
			
			if(isValidate())
			{//验证通过

			   $.ajax({
						url: '/PromotionAttendee.action?createPromotionAtende',
						data: {	
							promotionId:$("#promotionId").val(),
			   				name:$("#name").val(),
			   				mobile:$("#mobile").val()
						},
						dataType:"json",
						async:false,
						type: "post",
						cache : false,
						success: function(data)
					 		{
							switch (data.status) {
							case 1:
								$(".totalInfo").html("提交的参数不合法！");
								break;
							default:
								break;
							}	
					 		}
					});
			   
			}
			else
				{
				if($("#name").val().length==0){
					$(".nameInfo").html("请输入真实姓名,报名后将无法更改")
				}
				else if($("#mobile").val().length==0){
					$(".mobileInfo").html("请输入你的电话号码")
				}
				$(".totalInfo").html("您的输入不符合要求，请仔细检查！");
				}
			
			
		});
		
		
		
		
		//清空表单数据
		function clearInputs(){
			$("#name").val("");
			$("#mobile").val("");
		}
		//对表单条件验证事件
		function addValidate(){
			$("#name").blur(validateName);
			$("#mobile").blur(validateMobile);	
		}
		//判断参数的合法性
		function isValidate(){
			
			if($(".nameInfo").text().length==0
			   &&$(".mobileInfo").text().length==0
			   &&$("#name").val().length>0
			   &&$("#mobile").val().length>0)
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
		//对名字进行验证
		function validateName(){
			
			if(/^(?![，,、])(?!.*?[，,、·•]$)[\u4e00-\u9fa5，,、·•]+$/.test($("#name").val())){
				$(".nameInfo").html("");
				if($("#name").hasClass("Validform_error"))
					{
					$("#name").removeClass("Validform_error");
					}
				emptyErrorInfo();
			}
			else
				{
				$(".nameInfo").html("请输入真实姓名,报名后将无法更改");
				$("#name").addClass("Validform_error");
				}
		}
		//对手机号码进行验证
		function validateMobile(){
			/*if(/^1(3|5|8|4)\d{9}$/.test($("#mobile").val())){*/
			//^1(3[4-9]|4[7]|5[0-2|7-9]|8[7-9])[0-9]{8}$
			if(/^1(3|5|8|4)\d{9}$/.test($("#mobile").val())){
				$(".mobileInfo").html("");
				if($("#mobile").hasClass("Validform_error"))
				{
				$("#mobile").removeClass("Validform_error");
				}
				emptyErrorInfo();
			}
			else if(/^1(3[4-9]|4[7]|5[0-2|7-9]|8[7-9])[0-9]{8}$/.test($("#mobile").val()))
				{
				$(".mobileInfo").html("");
				if($("#mobile").hasClass("Validform_error"))
				{
				$("#mobile").removeClass("Validform_error");
				}
				emptyErrorInfo();
				}
				
			else{
				$(".mobileInfo").html("手机号码的格式有错误");
				$("#mobile").addClass("Validform_error");
				}
			
			
		}	

});