<%@ page pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
	<title>居派</title>
	<!-- meta 以及 公用的css -->
	<%@ include file="/WEB-INF/include/public.jsp" %>
	<link rel="stylesheet" href="/css/index/index.css?v=321">
</head>

<body class="hPC">

	<input type="hidden" name="location" id="location" value=""/>
	<input type="hidden" name="checkInDay" id="checkInDay" value="" />
	<input type="hidden" name="checkOutDay" id="checkOutDay" value="" />

    <div id="indexPage">
		<header class="jupai-top-search head">
	    	<img class="head_left" src="/images/index/logo.png">
	        <a href="tel:13810316841" class="cancel_search" id="tel_server"><img src="/images/index/tel_icon.png"></a>		
		</header>    
	    <div class="index_floor section">
	    	<div class="search_calendar">
		        <div class="search-form-box border-bottom">
	                <div class="choice_location">
	                    <span class="location">选择目的地</span>
	                </div>
		        </div>
		        <div class="search-form-box">
	                <div class="date" id="reportrange">
	                    <span class="checkinoutdate">入住离开日期</span>
	                </div>
		        </div>
			</div>
			<div class="subparent" onclick="search();"><p>搜索</p></div>
	    	<nav class="quick-entry-nav clearfix">
	    		<a class="quick-entry-link" href="/Search.action?searchRooms&nearby=1"><img width="50" height="50" src="/images/index/near_house.png"><span>附近房源</span></a>
	        	<a class="quick-entry-link" href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5608af55575e414b&redirect_uri=http%3A%2F%2Fmountain.ngrok.cc%2FOrder.action%3FgoToOrderListPage&response_type=code&scope=snsapi_base&state=jp#wechat_redirect" onclick="showTip('跳转中...', 10)"><img width="50" height="50" src="/images/index/my_order.png"><span>我的订单</span></a>
	        	<a class="quick-entry-link" href="/guide.jsp"><img width="50" height="50" src="/images/index/my_collet.png"><span>订房指导</span></a>
	        	<a class="quick-entry-link" href="/aboutus.jsp"><img width="50" height="50" src="/images/index/fd_rect.png"><span>关于我们</span></a>
	    	</nav>
	    </div>
    
    	<aside class="i-aside">	
        	<ul>
       			<li>
  					<a href="###">
						<img src="/images/index/u38.jpg">
  					</a>
       			</li>	
       			<li>
  					<a href="###">
						<img src="/images/index/u40.jpg">
  					</a>
       			</li>	
       			<li>
 					<a href="###">
						<img src="/images/index/u42.jpg">
 					</a>
       			</li>	
       			<li>
  					<a href="###">
						<img src="/images/index/u36.jpg">
  					</a>
       			</li>	
            </ul>
        </aside>

		<%@ include file="/WEB-INF/include/footer.jsp"%>
    </div>
    
<script src="/scripts/public/jquery-1.9.1.min.js"></script>
<script src="/scripts/public/moment.js"></script> 
<script src="/scripts/public/common.js?v=1"></script>
<script src="/scripts/public/daterangepicker.js"></script> 

<!--搜索弹层-->
<%@ include file="/WEB-INF/include/location.jsp"%>
	
<script>
$(function() {
    recoverCondition();
    initCalendar();
    $('.choice_location').click(function(){
    	$('.search_tan').show();
    	$('#indexPage').hide();
    });
});

/**
 * 初始化时间选择
 * @param m
 */
function initCalendar() {
	var options = {
		 startDate:'',
		 endDate:'',
		 veiwType:'view',
		 backFun:function(){$(".dropdown-menu").hide();}
	};
	
	$('#reportrange').daterangepicker(options, selectDate); 
}
	  
function selectDate(sBegin, sEnd) {
	$('#list-wap').show();
	$('#checkInDay').val(sBegin)
	$('#checkOutDay').val(sEnd)
	var sdate = sBegin.replace('-','.').replace('-','.');
	var edate = sEnd.replace('-','.').replace('-','.');
	$('.checkinoutdate').text(sdate+'-'+edate);
	$('.checkinoutdate').addClass("c22bb62");
	if($('#location').val().trim().length>0){
		search();
	}
}

function search(){
	var location = $('#location').val();
	var checkInDay = $('#checkInDay').val();
	var checkOutDay = $('#checkOutDay').val();
	var queryString = "";
	if(location.trim().length > 0){
		queryString += "?location="+encodeURIComponent(encodeURIComponent(location));	
	}
	if(checkInDay.trim().length > 0 && checkOutDay.trim().length > 0){
		queryString += (queryString!=""?"&":"?") + "checkInDay=" + checkInDay + "&checkOutDay=" + checkOutDay;
	}
	window.location.href = "/Search.action" + queryString;
}


function recoverCondition(){
	var sname = $('.location').text();
	if(sname.trim()=='选择目的地'){
		var location = $('#location').val();
		if(location.trim().length>0){
			if(location.length>9){
				location = location.substring(0,9)+'...';
			}
			$('.location').text(location);
			$('.location').addClass("c22bb62");
		}
	}
	
	var sdate = $('.checkinoutdate').text();
	if(sdate.trim()=='入住离开日期'){
		var checkindate = $('#checkInDay').val();
		var checkoutdate = $('#checkOutDay').val();
		if(checkindate.trim()!='' && checkoutdate.trim()!=''){
			var newdate = checkindate.replace('-','.').replace('-','.') +'-'+checkoutdate.replace('-','.').replace('-','.');
			$('.checkinoutdate').text(newdate);
			$('.checkinoutdate').addClass("c22bb62");
		}
	}
}

</script>

</body>
</html>