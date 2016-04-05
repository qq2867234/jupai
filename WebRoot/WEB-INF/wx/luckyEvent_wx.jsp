<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>万元寻赏-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<link href="/css/css/weixin/vLuckyPost.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="main">
<header>
    <img src="/images/weixin/activity_header.png" alt="真格租房" />
</header>
<div class="mainContent">
    <div class="activity">
        <div class="activity_content">
            <h2>活动规则</h2>
            <p><strong>活动时间：</strong>2016.3.26/9:00-2016.4.8/24:00</p>
            <p><strong>活动对象：</strong>①在真格租房成功发布房源的房东。②成功邀请房东发布房源的房东的朋友们。</p>
            <p><strong>三大福利：</strong>①房东成功发房，就有机会得到5000元现金奖励。②如果你邀请的房东获奖，你将同时得到5000元现金奖励。③在线签约出租的房东还可以获赠真格租房提供的价值500元的全年维修卡。</p>
        </div>
        <button id="loadMoreBtn">查看细则</button>
        <div class="activity_content activity_more">
            <p><strong>怎么参与：</strong>①房东通过<a href="###" id="ewm">真格租房微信公众号</a>或<a href="http://www.zhengor.com" target="_blank">官网www.zhengor.com</a>，发布房源。当房源信息通过审核后，该房东即获万元寻赏专属活动抽奖码。②邀请者通过“真格租房微信公众号”的万元寻赏邀请房东，就会获得唯一邀请码。被邀请的房东在发布房源时填写邀请者的唯一邀请码，若最终中奖，邀请者将获得与所邀请房东同等金额的现金奖励。</p>
        </div>
        <div class="activity_content activity_more">
            <p><strong>开奖时间：</strong>
            2016.4.15/16:00<br/>
            这种大日子，你怎么能错过?</p>
        </div>
        <div class="activity_content activity_more">
            <p><strong>抽奖规划：</strong>
            开奖日当天收盘上证指数乘以100之后得到的整数与活动参与人数进行取模后得到的数字加上1，即为最终的获奖编号。 （例如开奖日收盘上证指数为2987.65，最终活动参数人数为500，则最终获奖编码为2987.65 * 100 mod 500 + 1 = 266）</p>
        </div>
        <div class="activity_content activity_more">
            <p><strong>活动启动前提：</strong>
            活动期间累计发布且通过审核的不重复房源数达到100套时活动开启，否则活动自动取消。</p>
        </div>
    </div>
    
    
    <!-- 还未填写信息 -->
	<form id="postInfoForm" action="/Spread.action?dealPostInfo" method="post" style="<c:if test='${empty verify }'>display:none;</c:if>">
		<input type="hidden" id="openid" name="openid" value="${openid }"/>
    	<input type="hidden" name="type" value="2"/>
        <div class="form-control">
            <label for="idName">姓&nbsp;&nbsp;名</label>
            <input type="text" autocomplete="off" name="name" id="idName" maxlength="15" datatype="displayNameP" ignore="ignore" nullmsg="请输入姓名" placeholder='姓名' errormsg="请输入合法的姓名" />
        </div>
        <div class="form-control">
            <label for="idNumber">身份证</label>
            <input type="text" autocomplete="off" name="idNumber" id="idNumber" placeholder='身份证号' maxlength="18" datatype="virIdNumber" ignore="ignore" nullmsg="请输入身份证号" errormsg="请输入有效身份证号" >
        </div>
        <div class="form-control">
            <label for="mobile">手机号</label>
            <input type="tel" autocomplete="off" name="mobile" id="mobile" maxlength="11" datatype="m" placeholder="手机号" ignore="ignore" sucmsg="" nullmsg="请输入手机号" datatype="m" errormsg="请输入正确的手机号" >
        </div>
        <div class="form-control">
            <label for="validCode">验证码</label>
            <input type="text" autocomplete="off" name="mobileCode" id="validCode" ignore="ignore" datatype="s6-6" placeholder="短信验证码" nullmsg="请输入验证码" errormsg="请输入正确的验证码" class="input_code" />
            <button id="sendMobileValidCode" type="button">获取验证码</button>
        </div>
        <div class="validform hide"><span class='zgIcon zgIcon-info-circle'></span><b class='Validform_checktip warnInfo'></b></div>
        <div class="form-control btn-control">
            <button id="cfmPost" type="button">填写房源信息</button>
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
                    <div class="form-control">
                        <label for="commuInput">小区名</label>
                        <input type="text" name="rentList.residenceName" value="${rentList.residenceName }" placeholder="小区名" id="commuInput" nullmsg="请输入小区名" errormsg="请在提示的小区中进行选择" datatype="*1-32"/>
                    </div>
                    <div class="form-control">
                        <label for="bedRoom">居&nbsp;&nbsp;&nbsp;&nbsp;室</label>
                        <input type="text" datatype="bedRoom" id="bedRoom"  placeholder="居室数" name="rentList.beds" value="${rentList.beds }" nullmsg="请输入卧室数" onkeyup="value=value.replace(/[^1-9]+/g,'')" maxlength="1"/>
                    </div>
                    <div class="form-control">
                        <label for="rentalPrice">月租金</label>
                        <input type="text" name="rentList.price" value="${rentList.price }" placeholder="月租金" id="rentalPrice" nullmsg="请输入月租金" ignore="ignore" datatype="price" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="6"/>
                    </div>
                    <div class="form-control">
                        <label for="rCode">邀请码</label>
                        <input type="text" id="rCode" name="rentList.rCode" value="${rentList.rCode }" placeholder="邀请码" nullmsg="请输入邀请码" ignore="ignore" datatype="s4-4" maxlength="4"/>
                    </div>
                    <div class="validform hide"><span class='zgIcon zgIcon-info-circle'></span><b class='Validform_checktip warnInfo1'></b></div>
                    <div class="form-control btn-control">
                        <button id="btnStep1" type="button">发房</button>
                    </div>
                </form>
            </div>
        </c:when>
        <c:otherwise>
            <div id="susInfo" class="activity_content activity_info">
                <p>请去网页完善租单信息。</p>
            </div>
        </c:otherwise>
    </c:choose>
    <div id="susInfo" class="activity_content activity_info" style="display:none">
        <p>请去网页完善租单信息。</p>
    </div>
</div>
<footer>
    <h4><img src="/images/weixin/zgzf_text.png" alt="来真格" /></h4>
    <img src="/images/weixin/zgzf.png" alt="真格租房" />
    <h5>长按识别二维码，关注真格租房</h5>
</footer>
</div>
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
<script type="text/javascript">
    $(function(){
        $("#loadMoreBtn").click(function(){
            $(".activity_more").show();
            $("#loadMoreBtn").hide();
        });
        $("#ewm").click(function(event) {
            fnCreateDialog({
                content : "<img src='/images/weixin/zgzf.png' alt='真格租房'>",
                title: "扫描关注真格租房",
                confirmBtn:"关闭",
                cancelFn : function() {
                    return false;
                }
            });
        });
        
    });
</script>
<script type="text/javascript" src="/scripts/Validform_v5.3.2.js"></script>
<script type="text/javascript" src="/scripts/uhome/MobileValidCode.js"></script>
<script type="text/javascript" src="/scripts/weixin/pubList.js"></script>
<script type="text/javascript" src="/scripts/weixin/activity_common.js"></script>
<script type="text/javascript" src="/scripts/public/jquery-ui-1.10.4.custom.min.js"></script>
</body>
</html>