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

<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript">
var rCode = "${sessionScope.rCode }";
var appid = "${appid }";
var domain = "${domain }";
var wxReadyStatus = false;
wx.config({
    debug: false,
    appId: '${sp.appId}',
    timestamp: '${sp.timestamp}',
    nonceStr: '${sp.nonceStr}',
    signature: '${sp.signature}',
    jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
	]
});

wx.ready(function(res){
    wxReadyStatus = true;
    // 已获得邀请码，才设置分享信息
    if(rCode) {
        setShareView();
    }
});  
wx.error(function(res){
    wxReadyStatus = false;
});

function setShareView() {
    var shareLink = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=http%3A%2F%2F"+domain+"%2FSpread.action%3FgoToPubListPage%26rCode="+rCode+"&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect";
    wx.onMenuShareAppMessage({
          title: $("#name").val()+"邀你做北京幸运房东",
          desc: "邀请有房出租的朋友，即有机会和TA一起赢得10000元现金大奖。",
          link: shareLink,
          imgUrl: "http://"+domain+"/images/weixin/xun.png",
          success: function (res) {
        	  $.ajax({
        			url : "/Weixin.action?isSubscribe2",
        			type : "post",
        			dataType : "json",
        			success : function(json) {
        				if (json.status == "n") {
        					fnCreateDialog({
        			            content : "<img src='/images/weixin/zgzf.png' alt='真格租房'>",
        			            title: "长按识别二维码关注真格租房，接收获奖通知",
        			            confirmBtn:"关闭",
        			            cancelFn : function() {
        			                return false;
        			            }
        			        });
        				} 
        			}
        	  });
        	  $.post("/UserTrack.action?log", { type : 20, data : $("#name").val()+"_"+rCode+"_"+1 });
          },
          cancel: function (res) {
          },
          fail: function (res) {
          }
     });
    
    wx.onMenuShareTimeline({
        title: $("#name").val()+"邀你做北京幸运房东", // 分享标题
        desc: "邀请有房出租的朋友，即有机会和TA一起赢得10000元现金大奖。",
        link: shareLink, // 分享链接
        imgUrl: "http://"+domain+"/images/weixin/xun.png", // 分享图标
        success: function () { 
        	$.ajax({
      			url : "/Weixin.action?isSubscribe2",
      			type : "post",
      			dataType : "json",
      			success : function(json) {
      				if (json.status == "n") {
      					fnCreateDialog({
      			            content : "<img src='/images/weixin/zgzf.png' alt='真格租房'>",
      			            title: "长按识别二维码关注真格租房，接收获奖通知",
      			            confirmBtn:"关闭",
      			            cancelFn : function() {
      			                return false;
      			            }
      			        });
      				} 
      			}
			});
        	$.post("/UserTrack.action?log", { type : 20, data : $("#name").val()+"_"+rCode+"_"+2 });
        },
        cancel: function () { 
        },
        fail: function (res) {
        }
    });
}
</script>

</head>
<body>
<div class="main">
<header>
    <img src="/images/weixin/activity_header.png" alt="真格租房" />
</header>
<div class="mainContent">
	<!-- 没有发过房 -->
	<%-- <c:if test="${status != '3' }"> --%>
		<div class="activity">
            <div class="activity_content">
                <h2>活动规则</h2>
                <p><strong>时间：</strong>2016.3.26/9:00-2016.4.8/24:00</p>
                <p><strong>玩法：</strong>邀请朋友发布出租，你们将有机会平分10000元现金奖励。
            </div>
            <a id="loadMoreBtn" href='###'>查看细则<span class="zgIcon zgIcon-chevron-circle-down"></span></a>
            <div class="activity_content activity_more">
                <p><strong>活动对象：</strong>①在真格租房成功发布房源的房东。②成功邀请房东发布房源的房东的朋友们。</p>
                <p><strong>三大福利：</strong>①房东成功发房，就有机会得到5000元现金奖励。②如果你邀请的房东获奖，你将同时得到5000元现金奖励。③在线签约出租的房东还可以获赠真格租房提供的价值500元的全年维修卡。</p>
            </div>
            <div class="activity_content activity_more">
                <p><strong>怎么参与：</strong>①房东通过<a href="###" id="ewm">“真格租房”微信公众号</a>或<a href="http://www.zhengor.com" target="_blank">官网www.zhengor.com</a>，发布房源。当房源信息通过审核后，该房东即获万元寻赏专属活动抽奖码。②邀请者通过“真格租房”微信公众号的“万元寻赏”邀请朋友参与。</p>
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
            <div class="btn-group">
                <button type="button" style='margin-right:4%;' class="shareCode">邀请朋友</button>
                <button type="button" id="toPost">我要出租</button>
            </div>
        </div>
	<%-- </c:if> --%>

    <form id="postInfoForm" action="/Spread.action?dealPostInfo" method="post" style="display:none;">
        <input type="hidden" name="openid" id="openid" value="${sessionScope.openid }"/>
        <input type="hidden" name="name" id="name" value="${sessionScope.name }"/>
        <input type="hidden" name="rentList.rCode" id="rCode"/>
        <input type="hidden" name="type" value="2"/>
        <input type="hidden" id="cityCode" value="110000"/>
       <!--  <div class="form-control">
            <label for="idName">姓&nbsp;&nbsp;&nbsp;&nbsp;名</label>
            <input type="text" autocomplete="off" name="name" id="idName" maxlength="15" datatype="displayNameP" ignore="ignore" nullmsg="请输入姓名" placeholder='姓名' errormsg="请输入合法的姓名" />
        </div>
        <div class="form-control">
            <label for="idNumber">身份证</label>
            <input type="text" autocomplete="off" name="idNumber" id="idNumber" placeholder='身份证号' maxlength="18" datatype="virIdNumber" ignore="ignore" nullmsg="请输入身份证号" errormsg="请输入有效身份证号" >
        </div> -->
        <!-- <div class="form-control">
            <label for="commuInput">小&nbsp;&nbsp;&nbsp;&nbsp;区</label>
            <input type="text" name="rentList.residenceName" placeholder="小区名" id="commuInput" nullmsg="请输入小区名" errormsg="请输入合法的小区名" datatype="*1-24"/>
	    </div> -->
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
            <button id="cfmPost" type="button">我要出租</button>
        </div>
    </form>
	<%-- <div id="susInfo" class="activity_content activity_info" style="<c:if test='${status != 3 }'>display:none;</c:if>">
	    <p>恭喜！您的出租信息已提交。我们的工作人员会尽快与您联系，协助您完善资料，领取活动抽奖码。</p>
        <!-- <p style="padding-bottom:10px;">祝好运。</p> -->
	    <p style="text-align:center">邀请更多朋友参与，您有更多机会获奖！</p> 
	　　<a class="btn fullBtn shareCode" href="###">邀请朋友</a>
	</div> --%>
</div>
<footer>
    <h4><img src="/images/weixin/zgzf_text.png" alt="来真格" /></h4>
    <img src="/images/weixin/zgzf.png" alt="真格租房" />
    <h5>长按识别二维码，关注真格租房</h5>
</footer>
</div>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
<script type="text/javascript" src="/scripts/Validform_v5.3.2.js"></script>
<script type="text/javascript" src="/scripts/uhome/MobileValidCode.js"></script>
<script type="text/javascript" src="/scripts/weixin/pubList.js"></script>
</body>
</html>