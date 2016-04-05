<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>万元发房-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>

<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/css/weixin/vLogin.css">
<link href="/css/css/weixin/vPsychtest.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="main">
    <h1>真格租房
        <img src="/images/public/LOGO_20160311_3.png" alt="真格租房" />
    </h1>

	<!-- 还未填写信息 -->
	<form id="postInfoForm" action="/Spread.action?dealPostInfo" method="post" style="<c:if test='${empty verify }'>display:none;</c:if>">
    	<input type="hidden" id="openid" name="openid" value="${openid }"/>
    	<input type="hidden" name="type" value="2"/>
        <div class="weui_cells weui_cells_form">
          <div class="weui_cell">
            <!-- <div class="weui_cell_hd"><label class="weui_label zgIcon zgIcon-user"></label></div> -->
            <div class="weui_cell_bd weui_cell_primary">
                <input type="tel" autocomplete="off" name="mobile" id="mobile" maxlength="11" datatype="m" placeholder="手机号" ignore="ignore" sucmsg="" nullmsg="请输入手机号" datatype="m" errormsg="请输入正确的手机号" class="weui_input"/>
            </div>
          </div>
          <div class="weui_cell weui_vcode">
            <!-- <div class="weui_cell_hd"><label class="weui_label zgIcon zgIcon-shield"></label></div> -->
            <div class="weui_cell_bd weui_cell_primary">
                <input type="text" autocomplete="off" name="mobileCode" id="validCode" class="weui_input" ignore="ignore" datatype="s6-6" placeholder="短信验证码" nullmsg="请输入验证码" errormsg="请输入正确的验证码"/>
            </div>
            <div class="weui_cell_ft weui_cell_btn">
                <button type="button" class="weui_btn weui_btn_default" id="sendMobileValidCode">获取验证码</button>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
                <input type="text" name="name" id="idName" maxlength="15" datatype="displayNameP" ignore="ignore" nullmsg="请输入姓名" placeholder='姓名' errormsg="请输入合法的姓名" class="weui_input" />
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
                <input type="text" name="idNumber" id="idNumber" placeholder='身份证号' maxlength="18" datatype="virIdNumber" ignore="ignore" nullmsg="请输入身份证号" errormsg="请输入有效身份证号" class="weui_input"/>
            </div>
          </div>
          <div class="validform hide"><span class='zgIcon zgIcon-info-circle'></span><b class='Validform_checktip warnInfo'></b></div>
          <div class="weui_btn_area">
            <button id="cfmPost" class="weui_btn weui_btn_primary">填写房源信息</button>
          </div>
        </div>
    </form>
	
	<c:choose>
		<c:when test="${empty hasOneList }">
			<div id="inforP" style="<c:if test='${not empty verify }'>display:none;</c:if>" >
				<form id="pubList" action="/Spread.action?postListInfo" method="post" >
					<input type="hidden" class="idValue" name="id">
		   			<input type="hidden" id="saveType" name="saveType">
		   			<input type="hidden" id="role" name="role">
		   			<input type="hidden" id="cityCode" name="cityCode" value="110000">
		   			<input type="hidden" id="mosaicId" name="rentList.mosaicId" >
		   			<input type="hidden" id="keyword" name="rentList.keyword" >
		        	<input name="rentList.rid" id="residenceId" type="hidden" />
		                      <input name="rentList.lng" id="lng" type="hidden" />
		                      <input name="rentList.lat" id="lat" type="hidden"/>
		        	
			        <div class="weui_cells weui_cells_form">
			          <div class="weui_cell">
			            <!-- <div class="weui_cell_hd"><label class="weui_label zgIcon zgIcon-user"></label></div> -->
			            <div class="weui_cell_bd weui_cell_primary">
			                 <input type="text" name="rentList.residenceName" class="weui_input input-units-16" value="${rentList.residenceName }" placeholder="输入小区名" id="commuInput" nullmsg="请输入小区名" errormsg="请在提示的小区中进行选择" datatype="*1-32"/>
			            </div>
			          </div>
			          <div class="weui_cell weui_vcode">
			            <!-- <div class="weui_cell_hd"><label class="weui_label zgIcon zgIcon-shield"></label></div> -->
			            <div class="weui_cell_bd weui_cell_primary">
			                <input type="text" class="input-units-1 valid must houseType" datatype="bedRoom" id="bedRoom"  placeholder="输入居室数" name="rentList.beds" value="${rentList.beds }" nullmsg="请输入卧室数。" onkeyup="value=value.replace(/[^1-9]+/g,'')" maxlength="1"/>
			            </div>
			          </div>
			          <div class="weui_cell">
			            <div class="weui_cell_bd weui_cell_primary">
			                <input type="text" class="input-units-5 valid must" name="rentList.price" value="${rentList.price }" placeholder="输入月租金" id="rentalPrice" nullmsg="请输入月租金。" ignore="ignore" datatype="price" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="6"/>
			            </div>
			          </div>
			          <div class="weui_cell">
			            <div class="weui_cell_bd weui_cell_primary">
			                <input type="text" class="input-units-5 valid" id="rCode" name="rentList.rCode" value="${rentList.rCode }" placeholder="输入邀请码" nullmsg="请输入邀请码。" ignore="ignore" datatype="s4-4" maxlength="4"/>
			            </div>
			          </div>
			          <div class="validform hide"><span class='zgIcon zgIcon-info-circle'></span><b class='Validform_checktip warnInfo1'></b></div>
			          <div class="weui_btn_area">
			            <button id="btnStep1" class="weui_btn weui_btn_primary">发房</button>
			          </div>
			        </div>
			    </form>
			</div>
		</c:when>
		<c:otherwise>
			<div id="susInfo">
				请去网页完善租单信息。
			
			</div>
		</c:otherwise>
	</c:choose>
	
	<div id="susInfo" style="display:none">
		请去网页完善租单信息。
	</div>
</div>

</body>
<script type="text/javascript" src="/scripts/Validform_v5.3.2.js"></script>
<script type="text/javascript" src="/scripts/uhome/MobileValidCode.js"></script>
<script type="text/javascript" src="/scripts/weixin/pubList.js"></script>
<script type="text/javascript" src="/scripts/weixin/activity_common.js?v=342"></script>
<script type="text/javascript" src="/scripts/public/jquery-ui-1.10.4.custom.min.js"></script>
</html>