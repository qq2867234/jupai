$(function() {
	
	//对注册表单进行验证
	var regForm = $("#askReg").Validform({
		tiptype:4,
		postonce:true,
		btnSubmit:"#regBtn",
		datatype:{
			"password" : function(gets,obj,curform,regxp) {
				var reg1=/^[A-Za-z0-9]{4,16}$/;
				if(reg1.test(gets)){
					return true;
				}
				return "请输入4-16位字母或数字";
			 },
			"displayName":function(gets,obj,curform,regxp) {
				var nameReg = /^[a-zA-Z0-9_\\-\\.@\u4E00-\u9FA5]+$/;
				var name = gets;
				if(!nameReg.test(name)) {
					return "请输入合法的中文字符";
				}
				if(name.length > 8) {
					return "请输入8个字符以内的用户名";
				} 
				return true;
			},
			"title":function(gets,obj,curform,regxp) {
				var nameReg = /^[a-zA-Z0-9_\\-\\.@\u4E00-\u9FA5]+$/;
				var name = gets;
				if(!nameReg.test(name)) {
					return "请输入合法的中文字符";
				}
				if(name.length > 16) {
					return "请输入16个以内的字符";
				} 
				return true;
			},
			"keyword":function(gets,obj,curform,regxp) {
				var nameReg = /^[a-zA-Z0-9_\\-\\.@\u4E00-\u9FA5,，\s]+$/;
				var name = gets;
				if(!nameReg.test(name)) {
					return "请输入合法的中文字符";
				}
				if(name.length > 32) {
					return "请输入32个以内的字符";
				} 
				return true;
			}
		},
		callback:function(data){
			var msg = $("span.Validform_checktip").first();
			if(data.status == "y") {
				$("#msg").text(data.info);
				$(":input").val("");
			} else if(data.status == "n") {
				$(msg).text(data.info);
			} else if(data.status == "e") {
				window.location.href = "/";
			}
		}
	});
	
	$("#username").blur();

	$(".actionBtn").click(function() {
		$(this).next().click();
		$(this).next().change(function(e){
			openFile(e, $("#headPic"));
		});
	});
	
//	// 注册
//	$("#regBtn").click(function() {
//		
////		alert($("#zid").val()+' '+$("#ic").val()+' '+$("#username").val()+' '+$("#password").val()+' '+$("#name").val()
////				+' '+$("#title").val()+' '+$("#photo").val()+' '+$("#keyword").val());
//		
//		$.ajax({
//            type: "post",
//            async:false,
//            data: {
//            	zid: $("#zid").val(),
//            	ic: $("#ic").val(),
//            	loginId: $("#username").val(),
//            	password: $("#pass").val(),
//            	name: $("#name").val(),
//            	title: $("#title").val(),
//            	photo: $("#photo").val(),
//            	keyword: $("#keyword").val()
//        	},
//            url: "/Invite.action?reg",
//        }).done(
//    	function(rtnData) {
//    		// alert(rtnData.status+" "+rtnData.info);
//    		if(rtnData.status == 'y'){
//    			data = rtnData;
//    			$("#loginBtn").hide();
//				$("#user").children("span").text(data.displayName);
//				role = $.cookie("role");
////				alert(role);
//				showMenu(role);
//				//reflashSavedSearch();
//				checkStatus=true;
//				//addChannels();
//				// chenjs add
//				// 用户首次登录生成头像路径
//				photoPath = photoPath + Math.floor(data.cjZid/10000)+'/';
//				// 保存当前用户zid
//				zid = data.cjZid; 
//				// 保存当前用户的名称
//				name = data.cjName; 
//				// 保存当前用户的头像
//				photo = data.cjPhoto;
//				
//				// 向后台Netty服务器发起连接请求
//				ioConnect();
//				
//				$.cookie("displayName",data.displayName); //存储一个带1小时期限的cookie  
//    			
//    			window.location.href="/Ask.action?ask";
//    		}else if(rtnData.status == 'u'){
//    			$("#uMsg").removeClass("Validform_right").addClass("Validform_wrong").text(rtnData.info);
//    		}else if(rtnData.status == 'p'){
//    			$("#pMsg").removeClass("Validform_right").addClass("Validform_wrong").text(rtnData.info);
//    		}else if(rtnData.status == 'up'){
//    			$("#uMsg").removeClass("Validform_right").addClass("Validform_wrong").text(rtnData.info1);
//    			//$("#pMsg").removeClass("Validform_right").addClass("Validform_wrong").text(rtnData.info2);
//    		}else if(rtnData.status == 'n'){
//    			alert("抱歉，邀请链接已失效");
//    		}
//        });
//	
//	});

});


	//显示图片
var openFile = function(event, output) {
    var input = event.target;
    var reader = new FileReader();
    var newOutput = output;
    reader.onload = function(){
      var dataURL = reader.result;      
      newOutput.attr("src", dataURL);
      newOutput.parent().show();
    };
    reader.readAsDataURL(input.files[0]);
};


function checkloginId(){
	$.ajax({
        type: "post",
        data: {
        	loginId: $("#loginId").val()
    	},
        url: "/Invite.action?checkloginId"
    }).done(
	function(rtnData) {
		$("#loginIdMsg").empty();
    	$("#loginIdMsg").append(rtnData.info);
    });
}
		
function checkPassword(){
	var passTag = $("#pass");
	var loginTag = passTag.parent().parent().prev().find("input");
	var errMsg = passTag.parent().parent().find("span");
	$.ajax({
        type: "post",
        data: {
	    	loginId: loginTag.val(),
	    	password: passTag.val()
    	},
        url: "/Invite.action?checkPassword"
    }).done(
	function(rtnData) {
		//alert(rtnData.info);
    	errMsg.empty();
		errMsg.append(rtnData.info);
		errMsg.removeAttr("style").removeClass("Validform_right");;
    });
}
	