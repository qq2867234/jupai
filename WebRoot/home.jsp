<%@ page pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>居派</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	
	<meta name="description" content="真格租房，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！北京房屋出租，北京房屋租赁"/>
	<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
	
	<%-- <%@ include file="/zinclude/public.jsp"%> --%>
	<link rel="stylesheet" href="/css/index/commom.css">
	<link rel="stylesheet" href="/css/index/index.css">
	<link rel="stylesheet" href="/css/index/index160229.css">
	<link rel="stylesheet" type="text/css" href="/css/index/citySuggest.css">
	<link href="/css/index/bootstrap.min.css" rel="stylesheet"> 
	<link href="/css/index/font-awesome.min.css" rel="stylesheet">
	<link href="/css/index/daterangepicker-bs3.css" rel="stylesheet">
	<link href="/css/index/tip.css" rel="stylesheet" type="text/css">

	<script src="/scripts/index/jquery-1.9.1.min.js"></script>
	<script src="/scripts/index/main.js"></script>

	<script type="text/javascript" src="/scripts/index/moment.js"></script> 
	<script type="text/javascript" src="/scripts/index/c.js"></script>
	<script type="text/javascript" src="/scripts/index/daterangepicker.js"></script> 
	
	<script type="text/javascript" src="/scripts/index/backleft.js"></script>

	<style>
		p,ul{margin:0;}
	</style>
</head>

<body class=" hPC">

	<input type="hidden" name="cityurl" id="cityurl" value=""/>
    <input type="hidden" name="cityname" id="cityname" value=""/>
	<input  type="hidden" name="search_startdate" id="search_startdate" value="" />
	<input  type="hidden" name="search_enddate" id="search_enddate" value="" />

    <div id="indexPage">
		<header class="mayi-top-search head">
	    	<img class="head_left" src="/images/index/mayi_slogon.png">
	    	<!-- <img class="head_left" src="/images/index/images/jupai.png"> -->
	        <a href="tel:400-069-6060" class="cancel_search" id="tel_server"><img src="/images/index/tel_icon.png"></a>		
		</header>    
	    <div class="index_floor section">
	    	<div class="search_calendar">
		        <div class="search-form-box border-bottom">
		           <a href="javascript:;"> 
		                <div class="choice_city">
		                    <span class="cityname">选择目的地<span>
		                </span></span></div>
		           </a>
		        </div>
		        <div class="search-form-box">
	                <div class="date" id="reportrange">
	                    <span class="checkinoutdate">入住离开日期</span>
	                </div>
		        </div>
			</div>
			<div class="subparent" onclick="search();"><p>搜索</p></div>
	    	<nav class="quick-entry-nav clearfix">
	    		<a class="quick-entry-link" href="http://m.mayi.com/nearby"><img width="50" height="50" src="/images/index/near_house.png"><span>附近房源</span></a>
	        	<a class="quick-entry-link" href="http://m.mayi.com/login?returnurl=/order/list/"><img width="50" height="50" src="/images/index/my_order.png"><span>我的订单</span></a>
	        	<a class="quick-entry-link" href="http://m.mayi.com/login?returnurl=/user/mycollection/"><img width="50" height="50" src="/images/index/my_collet.png"><span>订房指导</span></a>
	        	<a class="quick-entry-link" href="http://m.mayi.com/landlord/recruit?ch=wap"><img width="50" height="50" src="/images/index/fd_rect.png"><span>关于我们</span></a>
	    	</nav>
	    </div>
    
    	<aside class="i-aside">	
        	<ul>
       			<li>
       					<a href="http://m.mayi.com/tp_findspring2016?s=wap">
       							<img src="/images/index/u38.jpg">
       					</a>
       			</li>	
       			<li>
       					<a href="http://m.mayi.com/tp_womenday2016?s=wap">
       							<img src="/images/index/u40.jpg">
       					</a>
       			</li>	
       			<li>
       					<a href="http://m.mayi.com/goodlodgeunit?s=wap">
       							<img src="/images/index/u42.jpg">
       					</a>
       			</li>	
       			<li>
       					<a href="http://m.mayi.com/tp_qingmingjie?s=wap">
       							<img src="/images/index/u36.jpg">
       					</a>
       			</li>	
            </ul>
        </aside>
	   
    

	<footer id="common_footer" class="index-footer">
		<div class="ft_wz">客服电话<a href="tel:400-069-6060"> 4000696060</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="tel:010-60642468">010-60642468</a></div>
		<div class="ft-b">©2016蚂蚁短租 京ICP证130021号</div>
	</footer> 

    </div>

	<!--搜索弹层-->
	<div class="search_tan">
			<header class="mayi-top-search head" style="height:45px;">
			 	<a class="back left" rel="nofollow"></a>
			    <!-- <div class="mayi-search-tb">		    		
			        <div class="search-form-box">
			    						<span class="search-form-icon"></span>
			    				   		<input class="search-form-input" placeholder="名称、学校等" style="font-size:14px;" id="search-form-input">	
			                <span class="clear_input_content" style="cursor:pointer;"></span>	                	
			            </div>
			        <div class="cancel_search">取消</div>
			    </div> -->
			</header>
			<section class="section" id="suggest_city">
				<!--热门目的地-->
				<div class="hot_place">
					<h3>学校</h3>
					<ul class="clearfloat destination hotdesti">
						<li onclick="setInfo('aaa','beijing')"><a cityurl="/beijing/">传媒二外北门</a></li>
						<li onclick="setInfo('bbb','chengdu')"><a cityurl="/chengdu/">传媒二外南门</a></li>
						<li onclick="setInfo('ccc','shanghai')"><a cityurl="/shanghai/">传媒西门</a></li>
					</ul>
				</div>
			</section>
	</div>


<script src="/scripts/index/mayi.js" type="text/javascript"></script>


<script>
$('.choice_city').click(function(){
	$('.search_tan').show();
})
$('.search_tan .back').click(function(){
	$('.search_tan').hide();
})
 </script>

 <script type="text/javascript"> 
var m = {};
m.sBegin=$('#search_startdate').val();
m.sEnd=$('#search_enddate').val();
var options = {
	 startDate:m.sBegin,
	 endDate:m.sEnd,
	 veiwType:'view',
	 //退出执行函数
	 backFun:function(){$(".dropdown-menu").hide();}
}; 	
		 
$(document).ready(function() {
    initTime(m);   
});
</script>
<script>
/**
 * 排序菜单
 */
var filter = {
	//选择完日期进行处理
	changeDate : function(sBegin, sEnd) {
		m.sBegin = sBegin;
		m.sEnd = sEnd;
		$('#list-wap').show();
		changeUrlParamVlaue("startdate", sBegin);
		changeUrlParamVlaue("enddate", sEnd);
		var sdate = sBegin.replace('-','.').replace('-','.');
		var edate = sEnd.replace('-','.').replace('-','.');
		$('.checkinoutdate').text(sdate+'-'+edate);
		$('.checkinoutdate').addClass("c22bb62");
		datesearch();
		//window.location.href = url;
	}
}
/**
 * 初始化时间选择
 * @param m
 */
function initTime(m)
{
	  $('#reportrange').daterangepicker(options,filter.changeDate); 
	  //if(m.sBegin!=''&&m.sEnd!=''){
	  var start = $('#search_startdate').val();
	  var end = $('#search_enddate').val();
	  if(start.trim()!='' && end.trim()!=''){
		  $('#reportrange span').html('<b>'+(m.sBegin.substring(5,m.sBegin.length)).replace('-','.')+'</b><b>-'+(m.sEnd.substring(5,m.sEnd.length)).replace('-','.')+'</b>');	  
		  $('#reportrange').addClass("avtive");
		  console.log('--->dateClearUp');
		  $('#dateClearUp').show();
	  }else{
		  $('#dateClearUp').hide();
	  }
}

function getUrl(name,url){
	$('#cityurl').val(url);
	$('.search_tan').hide();
}

function search(){
	var url = $('#cityurl').val();
	var d1 = $('#search_startdate').val();
	var d2 = $('#search_enddate').val();
	if(url.trim().length>0){
		var tohref = url;
		if(d1.trim().length>0&&d2.trim().length>0){
			tohref += "?d1=" + d1;
			tohref += "&d2=" + d2;
		}
		window.location.href = tohref;
	}else{
		showTip('请选择城市或目的地',3);
	}
}

function datesearch(){
	var url = $('#cityurl').val();
	if(url.trim().length>0){
		search();
	}
}

function setValue(){
	var sname = $('.cityname').text();
	var sdate = $('.checkinoutdate').text();
	if(sname.trim()=='选择目的地'){
		var cityname = $('#cityname').val();
		if(cityname.trim().length>0){
			setCityname(cityname);
		}
	}
	
	if(sdate.trim()=='入住离开日期'){
		var checkindate = $('#search_startdate').val();
		var checkoutdate = $('#search_enddate').val();
		if(checkindate.trim()!='' && checkoutdate.trim()!=''){
			var newdate = checkindate.replace('-','.').replace('-','.') +'-'+checkoutdate.replace('-','.').replace('-','.');
			$('.checkinoutdate').text(newdate);
			$('.checkinoutdate').addClass("c22bb62");
		}
	}
}

function setCityname(cityname){
	var name = cityname;
	if(name.length>9){
		name = name.substring(0,9)+'...';
	}
	$('.cityname').text(name);
	$('.cityname').addClass("c22bb62");
}

//点击城市绑定的click事件，解决Safari浏览器无法动态绑定live和on时间
function setInfo(cityname,citypinyin){
	// var name = decodeURI(cityname);
	$('#cityname').val(cityname);
	setCityname(cityname);
	$('.search_tan').hide();
}

function closetk(){
	$(".tk").hide();
}

function locat(){
	var url = '/nearby/';
	var d1 = $('#search_startdate').val();
	var d2 = $('#search_enddate').val();
	if(d1.trim()!='' && d2.trim()!=''){
		url+="?d1="+d1+"&d2="+d2;
	}
	window.location.href = url;
}
$(function(){
	//浏览器缓存中的数据恢复值
	setValue();
})

</script>

</body>
</html>