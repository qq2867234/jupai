<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<%@ taglib prefix="stripes" uri="http://stripes.sourceforge.net/stripes.tld"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>万元发房-提交其他信息</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/css/weixin/vRentFlow.css">
</head>
<body>
<div class="main">

<stripes:form action="/Spread.action?fillOtherInfo" id="otherInfor" method="post">
	
	<c:choose>
		<c:when test="${error == '1' }">
			<div class="weui_msg">
		        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
		        <div class="weui_text_area">
		            <h3 class="weui_msg_title"><b id="inforP">提示</b></h3>
		            <p class="weui_msg_desc"><b id="inforPP">${info }<a href="${url }">万元发房</a></b></p>
		        </div>
		    </div>
		</c:when>
		<c:when test="${error == '0'}">
			<div class="weui_msg">
		        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
		        <div class="weui_text_area">
		            <h3 class="weui_msg_title"><b id="inforP">信息已提交</b></h3>
		            <p class="weui_msg_desc"><b id="inforPP">您的房产证明信息已提交，我们会尽快审核，审核通过后真格会通过微信、短信的方式将活动抽奖码发送给你。</b></p>
		        </div>
		    </div>
		</c:when>
		<c:when test="${not empty error  }">
			<div class="weui_msg">
		        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
		        <div class="weui_text_area">
		            <h3 class="weui_msg_title"><b id="inforP">提示</b></h3>
		            <p class="weui_msg_desc"><b id="inforPP">${error }</b></p>
		        </div>
		    </div>
		</c:when>
		<c:otherwise>
			<!-- <div class="weui_cell_group">
				<div class="weui_cells_title label">请上传房产证或购房合同房屋状况页，真格会对您的房产信息严格保密</div>
				<div class="weui_cell">
				   	<div class="weui_cell_bd weui_cell_primary">
				       <stripes:file name="photo"/>
				       <input type="submit" value="提交"/>
				    </div>
				</div>
			</div> -->
			<div class="weui_cell_group" style="border:none">
				<div class="weui_cell">
			        <div class="weui_cell_bd weui_cell_primary">
			            <div class="weui_uploader">
			                <div class="weui_uploader_hd">
			                    <div class="weui_cell_bd weui_cell_primary">上传房产证</div>
			                    <div class="weui_cell_bd weui_cell_primary" style='font-size:14px; color:#999; line-height:1.6; margin:12px 0; '>请上传房产证或购房合同房屋状况页，真格会对您的房产信息严格保密</div>
			                </div>
			                <!-- <div class="weui_uploader_bd">
			                    <ul class="weui_uploader_files">
			                        <li style="background-image:url(/images/public/default.png)" class="weui_uploader_file weui_uploader_status">
			                        </li>
			                        <stripes:file name="photo" class="weui_uploader_input"/><!-- <input type="file" accept="image/jpg,image/jpeg,image/png,image/gif" class="weui_uploader_input" id="uploadPic"> 
			                    </ul>
			                </div> -->
			                <stripes:file name="photo" class="weui_uploader_input"/>
			            </div>
			        </div>
			    </div>
			</div>
			<div class="weui_btn_area">
			    <button type="submit" class="weui_btn weui_btn_primary">提交</button>
			  </div>
		</c:otherwise>
	</c:choose>
</stripes:form>

   
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
$(function() {
	
	$(".weui_cell_group").show();
	
	//提交其他信息
	$("#otherInfor").Validform({
		ignoreHidden:true,
		beforeSubmit:function(curform){
			$.showLoading("数据提交中...");
			return true;
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
		}
		/* ,callback : function(data) {
			if(data.status == "n") {
				$.hideLoading();
				$(".validform").removeClass("hide");
				$(".Validform_checktip").text(data.info);
			} else if(data.status == "y") {
				$.hideLoading();
				$(".weui_cell_group").hide();
				$(".weui_msg").show();
			} else if(data.status == 'no') {
				$.hideLoading();
				$(".weui_cell_group").hide();
				$(".weui_msg").show();
				$("#inforP").html("尚未发布信息");
				$("#inforP").html(data.info+"<a href='"+ data.url +"'>万元发房</a>");
			}
		 }*/
	});
	$(".radioBox").each(function(){
		fnCreateRadiobox({
        	ul: $(this),
        	boxUseType: 1
        });
	});
});
</script>
</body>
</html>