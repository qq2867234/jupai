<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<%@ taglib prefix="stripes" uri="http://stripes.sourceforge.net/stripes.tld"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>看房签约-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>

<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
        <link rel="stylesheet" type="text/css" href="/css/css/weixin/vRentFlow.css">
    </head>
<body>
<div class="main">
    <h2>
       实名验证
    </h2>
		<c:choose>
			<c:when test="${showFlag == 0 }">
    		  <stripes:form  action="/UserCenterOperator.action?verifyID" method="post" id="pIdVerify" class="form-inline flowSteps">
    		 	 	<input type="hidden" name="pid" value="${pid }"/>
		            <input type="hidden" name="lid" value="${lid }"/>
		            <input type="hidden" name="hiddenFileName" id="hiddenFileName"/>
		        <div class="weui_cells weui_cells_form">
		          <div class="weui_cell">
		            <div class="weui_cell_bd weui_cell_primary">
		                <input type="text" name="id.title" maxlength="15" datatype="displayNameP" nullmsg="请输入姓名" placeholder='姓名' errormsg="请输入合法的姓名" class="weui_input" id="idTitle" />
		            </div>
		          </div>
		          <div class="weui_cell">
		            <div class="weui_cell_bd weui_cell_primary">
		                <input type="text" name="id.idNumber" placeholder='身份证号' maxlength="18" id="idNumber" datatype="virIdNumber" nullmsg="请输入身份证号" errormsg="请输入有效身份证号" class="weui_input"/>
		            </div>
		          </div>
		          <!-- <div class="weui_cell">
		            <div class="weui_cell_bd weui_cell_primary">
		                <div class="weui_uploader">
		                    <div class="weui_uploader_hd">
		                        <div class="weui_cell_bd weui_cell_primary">身份证上传</div>
		                    </div>
		                    <div class="weui_uploader_bd">
		                        <ul class="weui_uploader_files">
		                            <li style="background-image:url(/images/public/default.png)" class="weui_uploader_file weui_uploader_status">
		                            </li>
		                            <input id="uploadPic" type="file" name="photo" multiple="" accept="image/jpg,image/jpeg,image/png,image/gif" class="weui_uploader_input">
		                        </ul>
		                    </div>
		                </div>
		            </div>
		        </div> -->
		          <div class="validform hide"><span class='zgIcon zgIcon-info-circle'></span><b class='Validform_checktip'></b></div>
		          <div class="weui_text_area">
		            <p class="weui_msg_desc" style='text-align:center'>将通过“全国公民身份信息系统”认证你的身份。</p>
		          </div>
		          <div class="weui_btn_area">
		            <button id="nextStepPID" class="weui_btn weui_btn_primary">同意认证</button>
		          </div>
		        </div>
		      </stripes:form>
    		</c:when>
    		<c:when test="${showFlag == 1 }">
	    		<div class="weui_msg">
			        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
			        <div class="weui_text_area">
			            <h3 class="weui_msg_title">已提交身份认证</h3>
			            <p class="weui_msg_desc">您的实名验证信息已提交,我们将在1-3个工作日内进行审核，请耐心等待。</p>
			        </div>
			        <div class="weui_opr_area">
			            <p class="weui_btn_area">
			                <a href="javascript:;" class="weui_btn weui_btn_primary">去找房</a>
			            </p>
			        </div>
			    </div>
    		</c:when>
    		<c:when test="${showFlag == 2 }">
	    		<div class="weui_msg">
			        <div class="weui_icon_area"><i class="zgIcon zgIcon-warn-fill"></i></div>
			        <div class="weui_text_area">
			            <h3 class="weui_msg_title">身份认证未通过</h3>
			            <p class="weui_msg_desc">${pInfo.faileInfo }</p>
			        </div>
			        <div class="weui_opr_area">
			            <p class="weui_btn_area">
			                <a href="javascript:;" class="weui_btn weui_btn_primary" id="retry">重新认证</a>
			            </p>
			        </div>
			    </div>
			    <stripes:form  action="/UserCenterOperator.action?verifyID" method="post" id="pIdVerify" class="form-inline flowSteps hide">
    		 	 	<input type="hidden" name="pid" value="${pid }"/>
		            <input type="hidden" name="lid" value="${lid }"/>
		            <input type="hidden" name="hiddenFileName" id="hiddenFileName"/>
		        <div class="weui_cells weui_cells_form">
		          <div class="weui_cell">
		            <div class="weui_cell_bd weui_cell_primary">
		                <input type="text" name="id.title" maxlength="15" datatype="displayNameP" nullmsg="请输入姓名" placeholder='姓名' errormsg="请输入合法的姓名" class="weui_input" id="idTitle" />
		            </div>
		          </div>
		          <div class="weui_cell">
		            <div class="weui_cell_bd weui_cell_primary">
		                <input type="text" name="id.idNumber" placeholder='身份证号' maxlength="18" id="idNumber" datatype="virIdNumber" nullmsg="请输入身份证号" errormsg="请输入有效身份证号" class="weui_input"/>
		            </div>
		          </div>
		          <!-- <div class="weui_cell">
		            <div class="weui_cell_bd weui_cell_primary">
		                <div class="weui_uploader">
		                    <div class="weui_uploader_hd">
		                        <div class="weui_cell_bd weui_cell_primary">身份证上传</div>
		                    </div>
		                    <div class="weui_uploader_bd">
		                        <ul class="weui_uploader_files">
		                            <li style="background-image:url(/images/public/default.png)" class="weui_uploader_file weui_uploader_status">
		                            </li>
		                            <input id="uploadPic" type="file" name="photo" multiple="" accept="image/jpg,image/jpeg,image/png,image/gif" class="weui_uploader_input">
		                        </ul>
		                    </div>
		                </div>
		            </div>
		        </div> -->
		          <div class="validform hide"><span class='zgIcon zgIcon-info-circle'></span><b class='Validform_checktip'></b></div>
		          <div class="weui_btn_area">
		            <button id="nextStepPID" class="weui_btn weui_btn_primary">提交实名验证</button>
		          </div>
		        </div>
		      </stripes:form>
			</c:when>
			<c:when test="${showFlag == 11 }">
				<input id="ppid" type="hidden" value="${pid }">
		        <input id="qrcodeUrl" type="hidden" value="${qrcodeUrl }">
				<div class="weui_msg" id="qrcodeBox">
			        <div id="waiting" class="waiting"></div>
			        <div class="weui_text_area">
			            <img id="qrcodeImg" src="${qrcodeUrl }" alt="微信绑定二维码" style="display:none;" onload="qrcodeLoaded()"/>
		              	<p class="house" id="tip" >长按二维码识别，关注真格租房服务号，关注后您就能通过微信看房签约，及时得到进度消息。如果取消关注，则过程终止。<br/>（如果看不到二维码请刷新页面）</p>
			        </div>
			    </div>
			    <!-- <div class="weui_msg">
			        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
			        <div class="weui_text_area">
			            <p class="weui_msg_desc">租房助手已就绪，请到微信使用 。</p>
			        </div>
			    </div> -->
			</c:when>
	</c:choose>
</div>

<script type="text/javascript">
function setCss(cssObj, status) {
	switch(status){
		case 1:
			cssObj.removeClass("weui_cell_warn").addClass("Validform_loading");//checking;
			break;
		case 2:
			cssObj.removeClass("weui_cell_warn Validform_loading");//passed;
			break;
		case 4:
			cssObj.removeClass("weui_cell_warn Validform_loading");//for ignore;
			break;
		default:
			cssObj.removeClass("Validform_loading").addClass("weui_cell_warn");//wrong;
	}
}
//上传图片
function uploadPic() {
	var data = new FormData();  
	data.append('uploadPicType', "1");  
    data.append('photo', $('#uploadPic')[0].files[0]); 
    $.ajax({  
        url: '/UserCenterOperator.action?uploadUsersPic',  
        type: 'POST',  
        data: data,  
        processData: false,  // 告诉jQuery不要去处理发送的数据  
        contentType: false,  // 告诉jQuery不要去设置Content-Type请求头  
        success : function(data, status) {
        	data = JSON.parse(data);
			if (data.url != undefined) {
				$(".weui_uploader_files li").css("background-image", "url('" + data.url + "')");
				$("#hiddenFileName").val(data.url);
			} else {
				$(".Validform_checktip").text("文件上传失败");
			}
		}
    });
}
$(function() {
	
	$.Tipmsg.r = "";
	$("#retry").click(function() {
		$(".weui_msg").addClass("hide");
		$("#pIdVerify").removeClass("hide");
	});
	
	//验证个人信息
	var pIdVerify = $("#pIdVerify").Validform({
		ajaxPost:true,
		postonce:true,
		datatype:{
			"displayNameP":function(gets,obj,curform,regxp) {
				var nameReg = /^[\u4E00-\u9FA5]+$/;
				var name = gets;
				var flag = 1;
				if(!nameReg.test(name)) {
					flag = 0;
					return "请输入和身份证一致的姓名";
				}
				if(name.length > 15) {
					flag = 0;
					return "请输入和身份证一致的姓名";
				} 
				if(flag == 1) {
					return true;
				}
			},
			"virIdNumber":function (gets,obj,curform,regxp) {
				var idcard = gets; var city = {11 : "北京", 12 : "天津", 13 : "河北", 14 : "山西", 15 : "内蒙古", 21 : "辽宁", 22 : "吉林", 23 : "黑龙江 ", 31 : "上海", 32 : "江苏", 33 : "浙江", 34 : "安徽", 35 : "福建", 36 : "江西", 37 : "山东", 41 : "河南", 42 : "湖北 ", 43 : "湖南", 44 : "广东", 45 : "广西", 46 : "海南", 50 : "重庆", 51 : "四川", 52 : "贵州", 53 : "云南", 54 : "西藏 ", 61 : "陕西", 62 : "甘肃", 63 : "青海", 64 : "宁夏", 65 : "新疆", 71 : "台湾", 81 : "香港", 82 : "澳门", 91 : "国外 "}; var pass = true; if (idcard.length != 15 && idcard.length != 18) {pass = false; return pass; } var Ai = ""; if (idcard.length == 18) {Ai = idcard.substring(0, 17); } else if (idcard.length == 15) {Ai = idcard.substring(0, 6) + "19" + idcard.substring(6, 15); } var numValid = /^\d+$/; if (numValid.test(Ai) == false) {pass = false; return pass; } if (parseInt(Ai.substr(6, 4)) % 4 == 0 || (parseInt(Ai.substr(6, 4)) % 100 == 0 && parseInt(Ai.substr(6, 4)) % 4 == 0)) {ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; } else {ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; } if (ereg.test(idcard) == false) {pass = false; return pass; } if (!city[idcard.substr(0, 2)]) {pass = false; return pass; } else {if (idcard.length == 18) {idcard = idcard.split(''); var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]; var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]; var sum = 0; var ai = 0; var wi = 0; for ( var i = 0; i < 17; i++) {ai = idcard[i]; wi = factor[i]; sum += ai * wi; } var last = parity[sum % 11]; if (last != idcard[17]) {pass = false; return pass; } } } return pass;
			}
		},
		tiptype:function(msg,o,cssctl){
			var msgobj=$(".Validform_checktip");
			if(msg == "") {
				msgobj.parent().addClass("hide");
			} else {
				msgobj.parent().removeClass("hide");
			}
			var cssObj=o.obj.parent().parent(".weui_cell");
			setCss(cssObj, o.type);
			msgobj.text(msg);
		},
		beforeCheck:function(curform){
			$(".Validform_checktip").removeClass("Validform_wrong").text("");
		},
		beforeSubmit:function(curform){
            $("#nextStepPID").attr("disabled", "true");
            $("#nextStepPID").addClass("forbidden");
            $(".Validform_checktip").removeClass("Validform_wrong").text("");
            $.showLoading("认证中...");
        },
		callback:function(data){
			$.hideLoading();
			if($.trim(data.status)==="y") {
				$.showLoading("认证通过<br>页面跳转中...");
				window.location.href = "/ProgressOperation.action?goToProgressPageByStep&lid=${lid}&pid=${pid}";
			} else {
				$("#nextStepPID").removeAttr("disabled");
				$("#nextStepPID").removeClass("forbidden");
				$(".Validform_checktip").text(data.info);
			}
		}
	});

	$("#uploadPic").change(function(){
		uploadPic();
	});
	
	
	$("#nextStepPID").click(function() {
		pIdVerify.submitForm(false);
	});
	
	// 二维码链接获取失败
	if($("#qrcodeUrl").val() == "") {
		// 重新获取
		$.post("/Weixin.action?getQRCodeForRentNoticeWithWeixinBind", {pid: $("#ppid").val()}, function(json){
			// 依然失败
			if(json.status == "n") {
				alertDialog("二维码获取失败，请刷新页面重新获取.");
				return;
			}
			// 成功
			$("#qrcodeImg").attr("src", json.url);
		});
	}
});

//二维码加载成功
function qrcodeLoaded() {
	// 清除等待标志
	$("#waiting").remove();
	// 显示二维码
	$("#qrcodeImg").show();
	// 定时获取扫描结果
	var t = setInterval(function() {
		$.post("/Weixin.action?getWeixinBindResult", function(json){
			switch (json.status) {
			case "0":
				break;
			case "-1": // 未绑定
				break;
			case "1": // 绑定成功
			case "2": // 已绑定过
				$("#qrcodeBox").parents(".inspectHouse").hide().next(".flowTips").removeClass("hide");
				t && window.clearInterval(t); //停止计时器
				window.location.href="/ProgressOperation.action?goToProgressPageByStep&lid=${lid}&pid=${pid}";
				break;
			case "3": // 已绑定过其它微信
			default:
				break;
			}
		});
	}, 3000);
}

</script>

</body>
</html>