<%@ page pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta name="description" content="真格租房，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！北京房屋出租，北京房屋租赁"/>
	<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
	
	<title>居派</title>
	
	<link href="/css/index/tip.css" rel="stylesheet">
	<link href="/css/index/bootstrap.min.css" rel="stylesheet"> 
	<link href="/css/index/font-awesome.min.css" rel="stylesheet">
	<link href="/css/index/daterangepicker-bs3.css" rel="stylesheet">
	<link href="/css/index/commom.css" rel="stylesheet" >
	<link href="/css/search/search_list.css" rel="stylesheet" >
	
	<script src="/scripts/index/jquery-1.9.1.min.js"></script>
	<script src="/scripts/index/main.js"></script>
	<script src="/scripts/index/c.js"></script>

	<script src="/scripts/index/moment.js"></script> 
	<script src="/scripts/index/daterangepicker.js"></script> 
	<script src="/scripts/index/backleft.js"></script>
	
	<script src="/scripts/search/sou.list.js"></script>
	<!-- <script src="/scripts/search/sou.more.js"></script> -->
	
	<script type="text/javascript">	
		$(document).ready(function(){
			
			if($('.fc2015').css('display')=='block'){
				$('.head-fixed').addClass('mt50');
				$('.section').addClass('mt148');
			}
			$('.f-i02').click(function(){
				$('.head-fixed').removeClass('mt50');
				$('.section').removeClass('mt148');
			})
		});
	</script>
	<style>
		.yxfy-img{top:8px;left:8px;}
		.yxfy-img img{display:inline-block;vertical-align:top !important;}
		.yxfy-img img.yx_icon{width:35px !important;}
		.yxfy-img img.myj_icon{width:54px !important;position:relative;top:10px;}
		.fc_myj_s {position: fixed;bottom: 60px;right: 10px;z-index: 999;width: 44px;}
		
		.mt50{margin-top:50px;}
		.mt148{margin-top:148px !important;}
		header{position:relative;left:0;top:0;}
	</style>
</head>

<body>
<div id="indexPage">
<!-- 搜索隐藏域开始-->
<input type="hidden" name="search_price" id="search_price" value="">
<input type="hidden" name="search_sort" id="search_sort" value="">
<input type="hidden" name="search_startdate" id="search_startdate" value="">
<input type="hidden" name="search_enddate" id="search_enddate" value="">
<input type="hidden" name="nearby" id="nearby" value="0">
<input type="hidden" name="search_skeyword" id="search_skeyword" value="">
<!--默认排序-->
<div class="rm-type" id="mr" style="display: none;">
	<div class="rm-top"></div>
    <div class="mr-show">
        <ul class="price u_sort"> 
            <li value="" data="0" class="uLi_on">默认排序</li>
            <li value="zuigui" data="1">价格最高</li>
            <li value="zuipianyi" data="2">价格最低</li>
        </ul>            
    </div>   
</div>
<!--默认排序结束--> 
<article>
	<!--共公共头部-->
	<div class="head-fixed" style="height:44px;">
		<header class="mayi-top-search head" >
	    	<a class="back left" rel="nofollow" href="javascript:backleft();"></a>
			<div style="margin-right:62px;height:36px;"></div>
		</header>
		<nav class="sort">
		    <ul style="border-bottom: 1px solid #c9cbce;">
		     	<li id="reportrange" style="cursor:pointer"><span>日期</span></li>
		     	<li class="js-filter" style="cursor:pointer"><span>附近</span></li>
		        <li class="js-search" style="cursor:pointer"><span>位置区域</span></li>
	            <li class="js-sort" style="cursor:pointer"><span>默认排序</span></li>
		    </ul>
		</nav>
		<style>
			.head-fixed{position:fixed;z-index:999;width:100%;top:0;}
			.section{margin-top:98px;}
			.sort{background:#fff;}
			.rm-type .mr-show{position:fixed;top:97px;}
			.search-form-input{width:99%;}
		</style>	
	</div>
	<!--共公头部结束-->
	
    <!--内容-->
    <section class="section">    	
        <aside class="index list-mian">          
         	<div class="cont">
	            <a href="###">
	                <mark class="n-img"><img src="/images/search/u13.jpg"  alt="房间图片"></mark>
	                <dl>
	                    <dt>
	                    	<b class="dx-b01 fl">房间名：《夜色斑斓》</b>
	                        <b class="dx-b01 fr price">¥ 218.00</b>
			            </dt>
	                    <!-- <dd>
	                    	<nav class="d-nr">
	                        <b>9条评论</b>&nbsp;·&nbsp;
	                        <b>二居</b>&nbsp;·&nbsp;
	                        <b>可住6人</b>&nbsp;·&nbsp;
	                        <b class="b-wz">朝阳三里屯</b>
	                       </nav>
	                    </dd> -->
	                </dl>	               
	               </a> 
              </div>
         	<div class="cont">
	            <a href="###">
	                <mark class="n-img"><img src="/images/search/u23.jpg" alt="房间图片"></mark>
	                <dl>
	                    <dt>
	                    	<b class="dx-b01 fl">房间名：《漫步云中》</b>
	                        <b class="dx-b01 fr price">¥ 218.00</b>
			            </dt>
	                    <!-- <dd>
	                    	<nav class="d-nr">
	                        <b>9条评论</b>&nbsp;·&nbsp;
	                        <b>二居</b>&nbsp;·&nbsp;
	                        <b>可住6人</b>&nbsp;·&nbsp;
	                        <b class="b-wz">朝阳三里屯</b>
	                       </nav>
	                    </dd> -->
	                </dl>	               
	               </a> 
              </div>
        </aside>
            <div class="more" style="line-height: 24px;height: 24px;">
                 <a class="btn-more" href="javascript:soumore();">点击加载更多</a>
                 <span class="loading" style="display:none;height: 24px;"></span>
            </div>
    </section>
    <!--内容结束-->   

	<footer id="common_footer" class="index-footer">
		<div class="ft_wz">客服电话<a href="tel:400-069-6060"> 4000696060</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="tel:010-60642468">010-60642468</a></div>
		<div class="ft-b">©2016蚂蚁短租 京ICP证130021号</div>
	</footer>  

</article>
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
		<section class="suggest_city" id="suggest_city">
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
<style>
.search_tan{
	position:absolute;
	left:0;
	top:0;
	width:100%;
	min-height:1042px;
	background:#fff;
	display:none;
	z-index:1001;
	padding-bottom:20px;
}
h2,h3,h4,h5{
	margin:0;
	padding:0;
	font-family: "microsoft yahei";
}
.search_tan .search-form-input{
	width:99%;
}

suggest_city{padding-bottom: 20px;}
suggest_city h2{padding:10px 12px;font-size:15px;line-height: 26px;color:#333;border-bottom:1px solid #e6e6e6;margin-top: 0;margin-bottom: 0;}
suggest_city h2 a{width:19px;height:16px;margin-top:5px;background:url(../images/bj.png) no-repeat;background-position:0 0;background-size:15px 33px ;}
.hot_place h3,.all_city h3{padding-left:10px;color:#999;font-size:14px;line-height:24px;background:#f2f2f2;margin-top: 10px;}
.hot_place h3{background:none;line-height: 34px;}
.destination{margin:0 10px 0;text-align: center;}
.destination li{float:left;background:#f2f2f2;line-height:34px;font-size:14px;margin: 5px 2%;}
.destination li:nth-child(4n){margin-right:0px;}
.destination li:nth-child(4n-3){margin-left:0px;}
.on_li{background:#22bb62 !important;color:#fff !important;}

</style>
<script src="/scripts/index/mayi.js" type="text/javascript"></script>

</body></html>