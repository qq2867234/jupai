<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>我要出租-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<link href="/css/css/weixin/vBase.css" rel="stylesheet" type="text/css">
<link href="/css/css/weixin/vRentalHome.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="main">
    <form id="publishRentForm" action="/Rent.action?publishRent">
    	<input type="hidden" class="idValue" name="rentList.id" value="${rentList.id }">
		<input type="hidden" id="role" name="role" value="${role }">
		<input type="hidden" id="cityCode" name="cityCode" value="${cityCode }">
		<input type="hidden" id="homeImages" name="homeImages">
        <div class="form-tips">
            <span class="zgIcon zgIcon-line"></span>
            关于房屋
        </div>
        <div class="form-group">
            <div class="form-control">
                <label for="commuInput">小区</label>
                <input type="hidden" id="residenceId" name="rentList.rid" value="${rentList.rid }">
                <c:if test="${not empty rentList.rid }">
	                <input type="text" id="commuInput" name="rentList.residenceName" value="${rentList.residenceName }" class="fRight" placeholder='小区名' datatype="*1-32" nullmsg="请输入小区名" errormsg="请在提示的小区中进行选择"/>
                </c:if>
                <c:if test="${empty rentList.rid }">
	                <input type="text" id="commuInput" name="rentList.residenceName" class="fRight" placeholder='小区名' datatype="*1-32" nullmsg="请输入小区名" errormsg="请在提示的小区中进行选择"/>
                </c:if>
            </div>
            <div class="form-control">
                <label for="ruseType">出租类型</label>
                <c:choose>
                <c:when test="${rentList.useType == 2 }">
	                <input type="hidden" id="ruseType" name="rentList.useType" value="2" />
	                <ul class="radiobox fRight ruseType">
	                    <li useType="1">整租</li>
	                    <li class="on" useType="2">合租</li>
	                </ul>
                </c:when>
                <c:otherwise>
	                <input type="hidden" id="ruseType" name="rentList.useType" value="1" />
	                <ul class="radiobox fRight ruseType">
	                    <li class="on" useType="1">整租</li>
	                    <li useType="2">合租</li>
	                </ul>
                </c:otherwise>
                </c:choose>
            </div>
            <div class="form-control">
                <label for="bedRoom">户型</label>
                <p class="form-control-static fRight" for="bathRoom">卫</p>
                <select id="bathRoom" class="fRight" name="rentList.baths">
                    <option value="0" <c:if test="${rentList.baths == 0 }">selected</c:if>>0</option>
                    <option value="1" <c:if test="${rentList.baths == 1 }">selected</c:if>>1</option>
                    <option value="2" <c:if test="${rentList.baths == 2 }">selected</c:if>>2</option>
                    <option value="3" <c:if test="${rentList.baths == 3 }">selected</c:if>>3</option>
                    <option value="4" <c:if test="${rentList.baths == 4 }">selected</c:if>>4</option>
                    <option value="5" <c:if test="${rentList.baths == 5 }">selected</c:if>>5</option>
                </select>
                <p class="form-control-static fRight" for="bedRoom">室</p>
                <select id="bedRoom" class="fRight" name="rentList.beds">
                    <option value="1" <c:if test="${rentList.beds == 1 }">selected</c:if>>1</option>
                    <option value="2" <c:if test="${rentList.beds == 2 }">selected</c:if>>2</option>
                    <option value="3" <c:if test="${rentList.beds == 3 }">selected</c:if>>3</option>
                    <option value="4" <c:if test="${rentList.beds == 4 }">selected</c:if>>4</option>
                    <option value="5" <c:if test="${rentList.beds == 5 }">selected</c:if>>5</option>
                    <option value="6" <c:if test="${rentList.beds == 6 }">selected</c:if>>6</option>
                    <option value="7" <c:if test="${rentList.beds == 7 }">selected</c:if>>7</option>
                    <option value="8" <c:if test="${rentList.beds == 8 }">selected</c:if>>8</option>
                    <option value="9" <c:if test="${rentList.beds == 9 }">selected</c:if>>9</option>
                </select> 
            </div>
            <div class="form-control">
                <label for="floorArea">出租面积</label>
                <p class="form-control-static fRight" for="floorArea">平米</p>
                <input type="number" id="floorArea" class="fRight input-unit-50" name="rentList.area" value="${rentList.area }" datatype="floorArea" maxlength="3" nullmsg="请输入出租面积" errormsg="请输入1-999之间的面积" onkeyup="value=value.replace(/[^0-9]+/g,'')"/>
            </div>
        </div>
        <div class="form-tips">
            <span class="zgIcon zgIcon-line"></span>
            租金与入住
        </div>
        <div class="form-group">
            <div class="form-control">
                <label for="rentalPrice">月租金</label>
                <p class="form-control-static fRight" for="rentalPrice">元/月</p>
                <input type="number" id="rentalPrice" class="fRight input-unit-50" name="rentList.price" value="<c:if test='${rentList.price > 0 }'>${rentList.price }</c:if>" datatype="price" nullmsg="请输入月租金" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="6"/>
            </div>
            <div class="form-control">
                <label for="pmtType">付款方式</label>
                <select id="num" class="fRight" name="rentList.num">
                    <option value="1" <c:if test="${rentList.num == 1 }">selected</c:if>>1</option>
                    <option value="2" <c:if test="${rentList.num == 2 }">selected</c:if>>2</option>
                    <option value="3" <c:if test="${rentList.num == 3 }">selected</c:if>>3</option>
                    <option value="4" <c:if test="${rentList.num == 4 }">selected</c:if>>4</option>
                    <option value="5" <c:if test="${rentList.num == 5 }">selected</c:if>>5</option>
                    <option value="6" <c:if test="${rentList.num == 6 }">selected</c:if>>6</option>
                    <option value="7" <c:if test="${rentList.num == 7 }">selected</c:if>>7</option>
                    <option value="8" <c:if test="${rentList.num == 8 }">selected</c:if>>8</option>
                    <option value="9" <c:if test="${rentList.num == 9 }">selected</c:if>>9</option>
                    <option value="10" <c:if test="${rentList.num == 10 }">selected</c:if>>10</option>
                </select>
                <p class="form-control-static fRight" for="num">付</p>
                <select id="bet" class="fRight" name="rentList.bet">
                    <option value="1" <c:if test="${rentList.bet == 1 }">selected</c:if>>1</option>
                    <option value="2" <c:if test="${rentList.bet == 2 }">selected</c:if>>2</option>
                    <option value="3" <c:if test="${rentList.bet == 3 }">selected</c:if>>3</option>
                    <option value="4" <c:if test="${rentList.bet == 4 }">selected</c:if>>4</option>
                    <option value="5" <c:if test="${rentList.bet == 5 }">selected</c:if>>5</option>
                    <option value="6" <c:if test="${rentList.bet == 6 }">selected</c:if>>6</option>
                    <option value="7" <c:if test="${rentList.bet == 7 }">selected</c:if>>7</option>
                    <option value="8" <c:if test="${rentList.bet == 8 }">selected</c:if>>8</option>
                    <option value="9" <c:if test="${rentList.bet == 9 }">selected</c:if>>9</option>
                    <option value="10" <c:if test="${rentList.bet == 10 }">selected</c:if>>10</option>
                    <option value="11" <c:if test="${rentList.bet == 11 }">selected</c:if>>11</option>
                    <option value="12" <c:if test="${rentList.bet == 12 }">selected</c:if>>12</option>
                </select> 
                <p class="form-control-static fRight" for="bet">押</p>
            </div>
            <div class="form-control">
                <label for="useDate">入住日期</label>
                <input type="date" id="useDate" class="fRight input-unit-50" name="rentList.useDate" value='${rentList.useDate }' placeholder='入住日期' datatype="*" nullmsg="请选择入住日期" />
            </div>
        </div>
        <div class="form-tips">
            <span class="zgIcon zgIcon-line"></span>
            希望的租客
        </div>
        <div class="form-group">
        	<div id="wantTenant">
              <input name="rentList.neetJob" type="hidden" class="job" value="${rentList.needJob }"/>
              <input name="rentList.needEdu" type="hidden" class="edu" value="${rentList.needEdu }"/>
              <input id="waterInput" name="rentList.needPet" type="hidden" class="pat" value="${rentList.needPet }"/>
              <input id="powerInput" name="rentList.needAge" type="hidden" class="age" value="${rentList.needAge }"/>
              <input name="rentList.needOther" type="hidden" class="family" value="${rentList.needOther }"/>
            </div>
            <ul class="checkbox">
                <li class="job<c:if test='${rentList.needJob == 1 }'> on</c:if>">需了解职业</li>
                <li class="edu<c:if test='${rentList.needEdu == 1 }'> on</c:if>">需了解教育背景</li>
                <li class="pat<c:if test='${rentList.needPet == 1 }'> on</c:if>">无宠物</li>
                <li class="age<c:if test='${rentList.needAge == 60 }'> on</c:if>">60岁以下</li>
                <li class="family<c:if test='${not empty rentList.needOther }'> on</c:if>">家庭居住优先</li>
            </ul>
        </div>
        <div class="form-tips">
            <span class="zgIcon zgIcon-line"></span>
            上传照片
        </div>
        <div class="form-group" style='padding-top:10px'>
            <ul class="weui_uploader_files" id="uploadFiles">
                <div class="weui_uploader_input_wrp" id="chooseImage"></div>
            </ul>
            
        </div>
        <div class="form-group">
            <div class="form-control btn-control">
                <button type="submit" class="fullBtn" id="publish">发布房源</button>
            </div>
        </div>
    </form>
    
    <div id="pubResult" class="weui_msg" style="display: none;">
        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
        <div class="weui_text_area">
            <h3 class="weui_msg_title">房源发布成功</h3>
        </div>
        <div class="weui_opr_area">
            <p class="weui_btn_area">
                <a href="###" id="rentUrl" class="weui_btn weui_btn_primary">查看房源</a>
            </p>
        </div>
    </div>
</div>
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

<script type="text/javascript">
wx.config({
    debug: false,
    appId: '${sp.appId}',
    timestamp: '${sp.timestamp}',
    nonceStr: '${sp.nonceStr}',
    signature: '${sp.signature}',
    jsApiList: [
        'chooseImage',	// 拍照或从手机相册中选图接口
        'previewImage',	// 预览图片接口
        'uploadImage'	// 上传图片接口
      ]
});
var rid = "${rentList.rid }";
</script>
<script type="text/javascript" src="/scripts/weixin/rent/rent_wx.js"></script>
<script type="text/javascript" src="/scripts/Validform_v5.3.2.js"></script>
<script type="text/javascript" src="/scripts/public/jquery-ui-1.10.4.custom.min.js"></script>

<!--#include virtual="/zinclude/vfooter.html"-->
</body>
</html>