<%@ page pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
	<title>房间名：《鸟语花香》 - 居派</title>
	
	<!-- meta 以及 公用的css -->
	<%@ include file="/WEB-INF/include/public.jsp" %>
	
	<link rel="stylesheet" href="/css/public/weui.css">
	<link rel="stylesheet" href="/css/public/jquery-weui.css">
	<link href="/css/detail/roomDetail.css" rel="stylesheet" >
</head>

<body>

<div style="display:block" id="indexPage">
    <header class="mayi-top">
        <a class="back left" rel="nofollow" href="javascript:backleft();"></a>房间详情
    </header>
    
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="/images/search/1.jpg" /></div>
        <div class="swiper-slide"><img src="/images/search/2.jpg" /></div>
        <div class="swiper-slide"><img src="/images/search/3.jpg" /></div>
        <div class="swiper-slide"><img src="/images/search/4.jpg" /></div>
        <div class="swiper-slide"><img src="/images/search/5.jpg" /></div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    
    <section class="pd10 section room-title">
        <div class="f18">房间名：《鸟语花香》</div>
        <div class="f14" style="color: gray">西王长安睡眼阑珊，秋千小毯看月凭栏，这里夜色斑斓</div>
    </section>
	
	<!-- 日期选择 -->
	<section class="pd10 section" id="reportrange">    	
         <div class="calendar" style="display: inline-block;">
            <span>
                <b style="display: block; line-height: 30px; height: 30px;">
                    <em>入住日期：</em>
                    <em id="startdate" style="color: #22bb26;">选择日期</em>
                </b>
                <b style="display: block; line-height: 30px; height: 30px;">
                    <em>离开日期：</em>
                    <em id="enddate" style="color: #22bb26;">选择日期</em>
                </b>
            </span>
        </div>
        <div style="display: none;position: relative; right: -30px; top: -15px; color: #22bb26;">共<em id="totalDays">  </em>晚</div>
        <div style="background: url('/images/public/right.png'); width: 11px; height:20px; float:right; margin-top: 20px;"></div>
	</section>
    <section class="pd10 section">
        <div>
            <p>
		                【房间介绍】<br>

				房间位于中国传媒大学附近定福庄北街东领鉴筑5号楼5单元1002室南向主卧<br>
				
				地址导航：在居派微信公众号中回复：TY。像玩探宝类闯关游戏一样，轻松找到。<br>
				
				南向大阳台，摇着秋千，看鸟看花看蓝天<br>
				
				米色小毯，舒适松软，放慢两个人的时间<br>
				
				所有房间床品参照4星级配备，卫生整洁超越你所想见<br><br>
				
				【入住小贴士】<br>
				
				预订成功后，请注意查收智能锁密码短信，并妥善保管，不要给怪菽粟看了去；<br>
				
				入睡前关好自己房门，那样睡的更踏（ji）实（qing），外出时，也建议锁上房门；<br>
				
				选择哪天的房间，默认入住时间是当天中午，退宿时间是次日中午。比如选择了“6.25”，就相当于选择了6.25中午至6.26中午的住宿。选择多天的方法是：选择一天放入购物车、再选择另外一天放入购物车，再结算。这商城程序猿脑子进水了吧？！A U  OK？<br>
				
				某套房源某天被别人预定的话，您在下单时那天日期就不会显示出来了。比如7月4日的《我的地盘》被预定了，那么您在预定 《我的地盘》时，只能看到7.3和7.5。7.4这一天就木有了。（别着急，可以看看其他房子嘛，反正都离的不远）<br>
				
				有任何不便和问题，请拨打电话 13810316841。
            </p>
        </div>
    </section> 

	<%@ include file="/WEB-INF/include/footer.jsp"%>
	<style>
	.index-footer {
	    padding-top: 1px;
	    padding-bottom: 60px;
	}
	</style>
    <section>
        <aside class="bom fixed">
            <b><font id="dayprice" class="f-24" >￥788</font>/晚</b>
			<div class="order-fix text"><a class="btn-ok text-center">立即预订</a></div>
        </aside>
    </section>
    <div class="add_tx" style="display:none;">
        <div class="add_y"></div>
        <div class="add_nr">
            <b>请选择入住和退房的日期</b>
            <a onclick="cancelInputDate()">取消</a><a id="confirmDate">确认</a>
        </div>
	</div> 
	
	<input type="hidden" id="roomNum" value="1">
	<input type="hidden" id="phone" value="">
	<input type="hidden" id="mindays" value="1"> 
	<input type="hidden" id="roomId" name="roomId" value="850253366"> 
	<input type="hidden" id="collectionState" value="0">
</div>

<script src="/scripts/index/jquery-1.9.1.min.js"></script>
<script src="/scripts/public/jquery-weui.js"></script>
<script src="/scripts/public/swiper.js"></script>

<script>
  $(".swiper-container").swiper({
    loop: true,
    autoplay: 3000
  });
</script>

<script src="/scripts/index/main.js"></script>
<script src="/scripts/index/c.js"></script>
<script src="/scripts/index/moment.js"></script> 
<script src="/scripts/index/daterangepicker.js"></script> 
<script src="/scripts/index/backleft.js"></script>

<script src="/scripts/detail/roomDetail.js"></script>
<script src="/scripts/detail/roomStateCalendar.js"></script>
</body>
</html>