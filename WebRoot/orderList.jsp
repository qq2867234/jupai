<%@ page pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
	<title>我的订单 - 居派</title>
	
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta name="description" content="真格租房，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！北京房屋出租，北京房屋租赁"/>
	<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
	
	<link href="/css/public/new_global.css" rel="stylesheet"> 
	<link href="/css/public/global.css" rel="stylesheet" >
	<link href="/css/public/tip.css" rel="stylesheet" type="text/css">

	<script src="/scripts/index/jquery-1.9.1.min.js"></script>
	<script src="/scripts/index/backleft.js"></script>
	<script src="/scripts/index/main.js"></script>
	  <style type="text/css">
	  .order-list li.overdue{background:#fff;}
	  </style>
</head>

<body>
<article>
    <div class="container b-e9e7e7">
      <header>
        <nav style="background:#2eb657">
           <a class="left z_img" rel="nofollow" href="javascript:backleft();" style="margin:0px;">返回</a>
          <div class="title">我的订单</div>
        </nav>
      </header>
      <div class="content">
        <div class="order-manage">
          <div class="user">用户：<span class="userName">nickname</span></div>
          <div class="order-list">
            <ul>
            <li class="normal">
            	<a href="http://m.mayi.com/order/detail?orderId=850582388">
            		<p class="title">鸟语花香</p> 
            		<div class="address mark">北京市朝阳区三里屯三里屯</div> 
            		<div class="clearfix">
	            		<label class="fl">入住日期：2016-04-10</label>
	            		<label class="fr">退房日期：2016-04-11</label>
            		</div>
            		<div class="total" style="height:auto;overflow:hidden;">
            			<span class="fl" style="height:34px;">订单金额：￥<b class="c-f60 f-14">788</b></span>
            			<span class="fr wait-conf mark">待付款</span>
            		</div>
            	</a>
            </li>
            </ul>
          <a class="btn-more" style="display: none;">点击加载更多</a><span class="loading" style="display: none;"></span></div>
        </div>
      </div>
    </div>
    
    <script>
    	var $more = $('<a class="btn-more"></a>').html('点击加载更多'),
			$loading = $('<span class="loading"></span>'),
			tipnum=''!=''?0:1;
    	$(function(){
    		var userInfo = returnUserInfo();
    		if(userInfo){	
    			//显示用户昵称
    			$(".order-manage .userName").html(userInfo.nick_name);
	    		var offset=5,
	    			f = $(".order-list"),
	    			para = {
	    			type:"get",
	    				data:{
	    				'ticket':getCookie('webticket')
	    				,'offset':f.find("ul li").length
	    				,'clientInfo':'{"model":"html5"}'}
	    			,url:Urls.orderManage.orders+userInfo.user_id+'/orders/wap?length='+offset
	    			,success:function(d){
	    				d.data?showOrders(d.data,d.data.totalCount):ajaxMess.fail($(".order-list ul"));
	    			}
	    			,error:function(){
	    				ajaxMess.fail($(".order-list ul"));
	    			}
	    		}

	    		;f.find(".btn-more").length==0?f.append($more.hide()):$more = (".btn-more")
  				;f.find(".loading").length==0?f.append($loading.hide()):$loading = $(".loading")
	    		;ajaxFun(para);//加载订单
	    		$more.on("click",function(){
	    			$(this).hide();
		      		$loading.show();
		       		para.data.offset = f.find("ul li").length;
		       		ajaxFun(para);
	    		});
    		}else{
    		}
    		
    		function showOrders(d,t){
    			var o = d.orders,
	    				c='',
	    				h='';
	    				$loading.hide();
	    				if(o==undefined){
	    					h='<p class="noData">您暂时还没有订单</p>';
	    				}else{
	    					for(var i=0;i<o.length; i++)
	    					{
		    					o[i].state!=4 && o[i].stateAlias!="房东拒绝（全额退款）" ? c = "normal":c = "overdue";  
		    					h +='<li class="'+c+'">';
		    					if(o[i].tradeprice>0)
		    					{ 
		    						h +='<p class="title">与房客商议<font color="red" style="font-weight:bold;">'+o[i].tradeprice+'元/晚 </font>接单</p>';
		    					}
		    					if(o[i].depositflag == 1){
			    					h +='<span style="display: inline-block;background-color: #3cac7e;color: #fff;padding: 0 5px;border-radius: 5px;line-height: 22px;">免押金</span>';
		    					}
		    					h +='<a href="/order/detail?orderId='+o[i].id+'"><p class="title">'+o[i].room.title+'</p>';
		    					h +=' <div class="address mark">'+o[i].room.displayAddress+'</div>';
		              			h +=' <div class="clearfix"><label class="fl">入住日期：'+o[i].checkinDate+'</label><label class="fr">退房日期：'+o[i].checkoutDate+'</label></div>';
		              			if(o[i].depositflag == 1){
		              				var deposit = o[i].depositflag;
		              				h +='<div class="total" style="height:auto;overflow:hidden;">';
		              				h +='<span class="fl" style="line-height: 20px;"><font>订单金额：￥<b class="c-f60 f-14">'+o[i].totalPrice/100+'</b></font><br><font class="c-f60">芝麻信用免押金：<b class="c-f60" style="text-decoration: line-through;">¥'+(isNaN(o[i].deposit)?0:(o[i].deposit>100000?100000:o[i].deposit))/100+'</b></font></span>';
		              				h +='<span class="fr wait-conf mark" style="line-height: 20px;text-align: center;"><font>待付款</font><br><font>（等待房东确认）</font></span>';
		              				h +='</div>';
		              			}else{
			              			h +='<div class="total" style="height:auto;overflow:hidden;"><span class="fl" style="height:34px;">订单金额：￥<b class="c-f60 f-14">'+o[i].totalPrice/100+'</b></span><span class="fr wait-conf mark">'+o[i].stateAlias+'</span></div>';
		              			}
		              			h +='</a></li>';
		    				}
	    				}
	    				$(".order-list ul").append(h); 
	    				$(".order-list ul li").length < t && $more.show(); 
	    				
	    				$(".order-list li").hover();
	    				if(tipnum==0){
	    					showTip('');tipnum++;
	    				}
    		}
    		
    	});
    </script>



<!--尾部结束-->
      </article>
</body></html>