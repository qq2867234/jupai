<%@ page pageEncoding="UTF-8"%>

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
	
	.suggest_city{padding-bottom: 20px;}
	.suggest_city h2{padding:10px 12px;font-size:15px;line-height: 26px;color:#333;border-bottom:1px solid #e6e6e6;margin-top: 0;margin-bottom: 0;}
	.suggest_city h2 a{width:19px;height:16px;margin-top:5px;background:url(../images/bj.png) no-repeat;background-position:0 0;background-size:15px 33px ;}
	.hot_place h3,.all_city h3{padding-left:10px;color:#999;font-size:14px;line-height:24px;background:#f2f2f2;margin-top: 10px;}
	.hot_place h3{background:none;line-height: 34px;}
	.locationUl{margin:0 10px 0;text-align: center;}
	.locationUl li{float:left;background:#f2f2f2;line-height:34px;font-size:14px;margin: 5px 2%;}
	.locationUl li:nth-child(4n){margin-right:0px;}
	.locationUl li:nth-child(4n-3){margin-left:0px;}
	.on_li{background:#22bb62 !important;color:#fff !important;}
	.choose-location{height: 44px;text-align: center;font-size: 18px;line-height: 35px;}
</style>

<!--搜索弹层-->
<div class="search_tan">
		<header class="mayi-top-search head choose-location">
		 	<a class="back left" rel="nofollow"></a>
		 	<a rel="nofollow">选择位置</a>
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
			<div class="hot_place">
				<h3>学校</h3>
				<ul class="clearfloat locationUl">
					<li>传媒二外北门</li>
					<li>传媒二外南门</li>
					<li>传媒西门</li>
				</ul>
			</div>
		</section>
</div>

<script>
	$(function(){
		// 选择
		$('.locationUl li').on('click', function(){
			$('.search_tan').hide();
			var location = $(this).text();
			$('#location').val(location);
			
			if(location.length>9){
				location = location.substring(0,9)+'...';
			}
			$('.location').text(location);
			$('.location').addClass('c22bb62');
			
			$('.js-search span').text(location).addClass('c22bb62');
		});
		
		// 返回
		$('.search_tan .back').click(function(){
			$('.search_tan').hide();
		});
	});
</script>
