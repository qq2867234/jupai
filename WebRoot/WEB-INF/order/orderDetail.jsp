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

	<input type="hidden" id="csrfToken" value="${sessionScope.csrfToken }">
	<input type="hidden" id="roomId" value="${roomId }"> 
	<input type="hidden" id="openid" value="${openid }"> 
	
	<!--共公共头部-->
	 <header class="mayi-top head ellipsis">
	       <a class="back left" rel="nofollow" href="javascript:backleft();"></a>订单详情
	   </header>
	<!--共公头部结束-->
	
	<article class="order-vc">
		<aside class="list title"><b class="vc-b ">${orderDetail.name }</b></aside>
	    <aside class="list room map" id="reportrange" >
	    	<div class="btn" style="display: inline-block; cursor: pointer; width:100%; padding:0px; text-align:left;">
	            <span>
	                <b>
	                    <font>入住日期：</font>
	                    <em id="checkInDay">${checkInDay }</em>
	                </b>
	                <b>
	                    <font>离开日期：</font>
	                    <em id="checkOutDay">${checkOutDay }</em>
	                </b>
	            </span>
	        </div>
	        <div class="show-w">共<em id="totalDays"> ${orderDetail.days } </em>晚</div>
	    </aside>
	    
	    <aside class="room money">
	    	<p>房间总价：<font>￥<span class="totalMoney">${orderDetail.price }</span></font></p>
	    	<p>预付订金：<font>￥<span class="totalMoney">${orderDetail.price }</span></font></p>
	    	<input type="hidden" id="totalPrice" value="${orderDetail.price * 100 }">
	    </aside>
	    <aside class="room pdltrb10 pdtb0">
	    	<aside class="adultsName borbott">
	    		<b>联系人：<input name="name" id="name" type="text" value="" class="text-xm" placeholder="请输入姓名" style="background:none; border:none;"></b>
	    	</aside>
	    	<aside class="adultsName borbott">
	  			<b>手机号：<input name="mobile" id="mobile" type="text" value="" class="text-xm" placeholder="请输入手机号" style="background:none; border:none;"></b>
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
					    <input type="radio" name="pay" value="wx_pub" class="pay" style="-webkit-appearance: radio; margin: 13px 10px 13px -5px;">
					   	<img src="/images/public/weixin.png" width="100"/>
					  </label>
					</div>
					<div class="radio">
					  <label>
					    <input type="radio" name="pay" value="alipay_wap" class="pay" style="-webkit-appearance: radio; margin: 13px 10px 13px -5px;">
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
					￥ <span class="totalMoney">${orderDetail.price }</span> 元
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
<script src="/scripts/pay/ap.js"></script>
<script src="/scripts/pay/pingpp.js"></script>
<script src="/scripts/detail/orderDetail.js?v=2"></script>
<script src="/scripts/detail/roomStateCalendar.js"></script>

</body>
</html>

