<%@ page pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
	<title>订单详情 - 居派</title>
	<!-- meta 以及 公用的css -->
	<%@ include file="/WEB-INF/include/public.jsp" %>
	<link href="/css/order/orderDetial.css" rel="stylesheet" type="text/css">
</head>

<body>
<article>
<div id="indexPage">

	<!--共公共头部-->
	 <header class="mayi-top head ellipsis">
	       <a class="back left" rel="nofollow" href="javascript:backleft();"></a>订单详情
	   </header>
	<!--共公头部结束-->
	
	<article class="order-vc">
		<aside class="list title"><b class="vc-b ">鸟语花香</b></aside>
	    <aside class="list room map" id="reportrange" >
	    	<div class="btn" style="display: inline-block; cursor: pointer; width:100%; padding:0px; text-align:left;">
	            <span>
	                <b>
	                    <font>入住日期：</font>
	                    <em id="startdate">2016-04-11</em>
	                </b>
	                <b>
	                    <font>离开日期：</font>
	                    <em id="enddate">2016-04-15</em>
	                </b>
	            </span>
	        </div>
	        <div class="show-w">共<em id="totalDays"> 4 </em>晚</div>
	    </aside>
	    
	    <aside class="room money">
	    	<p>房间总价：<font>￥<span class="totalMoney">738</span></font></p>
	    	<p>预付订金：<font>￥<span class="totalMoney">738</span></font></p>
	    	<input type="hidden" id="totalPrice" value="73800">
	    </aside>
	    <aside class="room pdltrb10 pdtb0">
	    	<aside class="adultsName borbott">
	    		<b>联系人：<input name="name" id="orderName" type="text" value="" class="text-xm" placeholder="请输入姓名" style="background:none; border:none;"></b>
	    	</aside>
	    	<aside class="adultsName borbott">
	  			<b>手机号：<input name="mobile" id="orderName" type="text" value="" class="text-xm" placeholder="请输入手机号" style="background:none; border:none;"></b>
	      	</aside>
	    </aside>
	    <aside class="tuikuan room">
	    		<i>入住日前1天取消，可全额退款</i>
	    </aside>
	    
	    <aside class="room">
	    	<div>
	    		<span style="display: inline-block; vertical-align: center; top: -35px; padding-left: 10px; position: relative; font-size: 14px;">支付方式：</span>
	    		<div style="display: inline-block;">
					<div class="radio">
					  <label>
					    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" style="-webkit-appearance: radio; margin: 13px 10px 13px -5px;">
					   	<img src="/images/public/weixin.png" width="100"/>
					  </label>
					</div>
					<div class="radio">
					  <label>
					    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" style="-webkit-appearance: radio; margin: 13px 10px 13px -5px;">
					    <img src="/images/public/zfb.png" width="100"/>
					  </label>
					</div>
	    		</div>
	    	</div>
	    </aside>
	    
	    <%@ include file="/WEB-INF/include/footer.jsp"%>
	    <style>
		.index-footer {
		    padding-top: 1px;
		    padding-bottom: 65px;
		}
		</style>
		<aside class="footer">
			<b>
				<font id="onlinePayBottom" style="font-size: 24px !important; font-weight: normal;" >
					￥ <span class="totalMoney">738</span> 元
				</font>
			</b>
		    <mark class="or-btn">支付</mark>       
		</aside>
	</article>
	
</div>
<div class="surTanc" id="surTanc">
	<div class="surveYY"></div> 	
	<div class="offmax" id="offmax">
		<div class="dp_header">提示</div>
		<div class="dp_daypicker">
			<p id="coupon_tips"></p>			
		</div> 
		<a class="makeSure" href="javascript:closeDiv();">我知道了</a>     
	</div>
</div>
</article>

<script src="/scripts/index/jquery-1.9.1.min.js"></script>
<script src="/scripts/order/bootstrap.min.js"></script>
<script src="/scripts/index/c.js"></script>
<script src="/scripts/index/moment.js"></script> 
<script src="/scripts/index/daterangepicker.js"></script> 
<script src="/scripts/index/backleft.js"></script>
<script src="/scripts/index/main.js"></script>
<script src="/scripts/detail/jsutil.js"></script>
<script src="/scripts/detail/roomStateCalendar.js"></script>

<script type="text/javascript">
  
var roomid = '850253366';

function insureCheck(event){
	if(event.target.tagName.toLowerCase() != "input"){
		$("#buyInsure").click();
	}
}

var cityId='12';
var coupontype='0';
var couponIds='';

//防止重复提交订单
var  submitFlag ="1";

$(function(){

	//提交订单
	$(".footer .or-btn").click(function(){
		if(!checkinNumCheck())      //入住人数验证
			return;
			
		if(cityId !=null && cityId != 13 && cityId != 15 && cityId != 45 && cityId != 56 && cityId != 114 && cityId != 144 && cityId != 176){
			if(!checkInsurance(true)){
				return;
			}
		}else{
			if(isInsureChecked()){
				if(!checkInsurance(false))      //保险验证
				return;
			}
		}
		
		//if(!nameCheck())
		//	return;					//下单人姓名验证
		if(!phoneCheck())
			return;					//手机验证
		if(!rulsCheck())
			return;        			//交易规则
		orderSubmit();				//订单提交
	});
	
	/*hover*/
	$(".number .trad-text p,.order-vc .list").hover();//房间数量
	
	$(".roomNum").click(function(){
		var num=$(this).find("input").val();
		$("#roomNum").text(num);
	    $("#tr-rules").hide();
	    
	    var currentUrl = window.location.href;
	    
	    if(currentUrl.indexOf("roomNum") > 0){
	    	currentUrl = removeParam(currentUrl, "roomNum");
	    }
	    
	    if (currentUrl.indexOf("checkinNum") > 0) {
			currentUrl = removeParam(currentUrl, "checkinNum");
		}
	
		var checkinNum = $("#checkinNum").val();
		if(checkinNum != null && checkinNum.length > 0){
			currentUrl += "&checkinNum=" + checkinNum;
		}
		
		if (currentUrl.indexOf("adultsname") > 0) {
			currentUrl = removeParam(currentUrl, "adultsname");
		}
		
		var adultsname = $("#orderName").val();
		if(adultsname != null && adultsname.length > 0){
			currentUrl += "&adultsname="+ adultsname;
		}
		
		if (currentUrl.indexOf("inCheck") > 0) {
			currentUrl = removeParam(currentUrl, "inCheck");
		}
		
		var inCheck = isInsureChecked();
		if(inCheck){
			currentUrl += "&inCheck="+ inCheck;
		}
		
	    currentUrl += "&roomNum=" + $("#roomNum").html();
	    locHref(currentUrl);
	    
	   // jump();
	});
	
	$(".title").click(function(){
		if(roomid!=''){
			 var checkinday=$("#startdate").text();
			 var checkoutday=$("#enddate").text();
			 var roomNum=$("#roomNum").text()
			 var phone=$("#phoneNum").val();
			var url = localHost+"/room/"+roomid+'?checkinday='+checkinday+'&checkoutday='+checkoutday+'&roomNum='+roomNum+'&phone='+phone;
	        locHref(url);
		}
	});
	
	$("#payOrConfirm").click(function(){
		$(".dowm-tc").hide();
		return false;
	});
	
});

function phoneCheck(){
	var phone=$("#orderPhone").text();
	if (!phone_number_regex.test(phone.replace(/\s+/g,""))) {
		$(".code .orderCheck").show().html('请输入有效的手机号进行验证！');
		$(".sign").show();
		return false;
    }else{
    	return true;
    }
}

function nameCheck(){
	var phone=$("#orderName").val();
	if (null!=phone&&phone!='') {
		return true;
    }else{
    	showTip("请填写联系人！");
		return false;
    }
}


function subSuccStatis(url){
	var para = {
		type:"get"
		,url:url	
		,success:function(d){
			d.data && $(".wapstatispremes").attr("src",d.data);
		}
	}
	ajaxFun(para);	
}

function orderSubmit(){
	var contacterIds = $("#contacterIds").val();
	var policyCard = $("#policyCard").val();
	var policyName = $("#policyName").val();
	if(!isInsureChecked()){
		contacterIds = '';
		policyCard = '';
		policyName = '';
	}
	
	var ua = window.navigator.userAgent.toLowerCase();
    
    var source="";
    
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    	source="public";
    }else{
		source="wap";
    }
	
	var roomId = roomid
    ,checkinDate = $("#startdate").text()
    ,checkoutDate = $("#enddate").text()
    ,totalPrice = $("#totalPrice").val()            
    ,userInfo = returnUserInfo()
    ,tel = $("#orderPhone").text().replace(/\s+/g,"")
    ,adultsName = $("#orderName").val()
    ,bookCount = $("#roomNum").text()
    ,promotiontype = coupontype
    ,couponPrice = $("#couponPrice").val()
    ,couponids = couponIds
    ,checkinNum = $("#checkinNum").val()
    ,contacterIds = contacterIds
    ,policyCard = policyCard
    ,policyName = policyName
    ,para = {
        url:Urls.order.submit
        ,data:{
            "userId":getCookie("MAYIUID")
            ,"roomId":roomId
            ,"checkinDate":checkinDate
            ,"checkoutDate":checkoutDate
            ,"bookCount":bookCount
            ,"promotiontype":promotiontype
    		,"couponPrice":couponPrice
    		,"couponids":couponids
            ,"totalPrice":totalPrice
            ,"isSelf":0
            ,"contactName":adultsName
            ,"contactMobile":tel
            ,"checkinNum":checkinNum
            ,"ticket":getCookie("webticket")
            ,'clientInfo':'{"model":"html5"}'
            ,"contacterIds":contacterIds
            ,"policyCard":policyCard
            ,"policyName":policyName
            ,"source":source
        }
        ,success:function(d){
        if(!d)
        {
        	showTip("请填入正确的联系人");
        	submitFlag="1";
        	return;
        }
            if(d.data){
            	//if(mark == 1){
        		var url = localHost+"/order/detail?orderId="+d.data.id + "&sub=true";
		      	locHref(url);
            }else{
            	submitFlag="1";
            	if(d.error.errorCode==2600){
            		$(".code .orderCheck").show().html("请重新验证手机号码，"+d.error.message);
					$(".sign").show();
            	}else if(d.error.errorCode==3012){
            		$("#coupon_tips").html(d.error.message);
            		showDiv();
            	}else{
            		showTip(d.error.message);
            	}
            } 
        },error:function(){
        	submitFlag="1";
        	showTip("无法连接，请检查网络");
        }
        
    };
    
    if(submitFlag=="1"){
		submitFlag="2";
    	ajaxFun(para);
    }
}


//移除url中的指定参数
function removeParam(url, ref) {
	var str = "";
	if (url.indexOf('?') != -1) {
		str = url.substr(url.indexOf('?') + 1);
	} else {
		return url;
	}
	var arr = "";
	var returnurl = "";
	var setparam = "";
	if (str.indexOf('&') != -1) {
		arr = str.split('&');
		for (i in arr) {
			if (arr[i].split('=')[0] != ref) {
				returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
			}
		}
		return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
	} else {
		arr = str.split('=');
		if (arr[0] == ref) {
			return url.substr(0, url.indexOf('?'));
		} else {
			return url;
		}
	}
}

function showDiv() {
	document.getElementById("surTanc").style.display = "block";
}
function closeDiv() {
	document.getElementById("surTanc").style.display = "none";
	location.reload(); 
}

function checkSuccess(){
	$("#sign").hide();
	jump();
}

function jump(){
	var checkinday=$("#startdate").text();
	var checkoutday=$("#enddate").text();
	var roomNum=$("#roomNum").text();
	var phone=$("#phoneNum").val();
	var checkinNum = $("#checkinNum").val();
	var adultsname = $("#orderName").val();
	var url = localHost+'/order/pre?roomId=' + roomid + '&checkinday=' + checkinday + '&checkoutday=' + checkoutday 
		+ '&roomNum=' + roomNum + '&phone=' + phone + '&checkinNum=' + checkinNum + '&adultsname=' + adultsname;
	locHref(url);
}
</script>
</body>
</html>

