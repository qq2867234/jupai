var rentids=[];
var sellids=[];
var agentids=[];
var residenceids=[];
var newsids01=[];
var newsids02=[];
var newsids03=[];
var newsids04=[];
var newsids05=[];
var adids01=[];
var adids02=[];
var developerids=[];
var enventids=[];


$(function(){
	$("dl").each(function(){
		if($(this).hasClass("h4"))
		{
			$(this).children("dt").height(140);
		}
		
	});
	readyAdData();
	for(var i=0;i<adChannels.length;i++)
		{
		if(adChannels[i]==1)
			{
			adids01.push(i);
			if($("#feedAd1").children().length==0)
				{
		 	var ad1="<dt id='"+adIds[i]+"'+><img src='"+adPics[i]+"' alt=\"\"/></dt>";
			 $("#feedAd1").append(ad1);
			 $("#feedAd1").find("dt").bind("click",function(){
				 if(adUrls[this.id]!=null&&adUrls[this.id]!=undefined)
					window.location.href=adUrls[this.id];
			 });
				}
			}
		else if(adChannels[i]==2)
			{
			adids02.push(i);
			if($("#feedAd2").children().length==0){
			var ad2="<dt id='"+adIds[i]+"'><img src='"+adPics[i]+"' alt=\"\"/></dt>";
			 $("#feedAd2").append(ad2);
			 $("#feedAd1").find("dt").bind("click",function(){
				 if(adUrls[this.id]!=null&&adUrls[this.id]!=undefined)
					window.location.href=adUrls[this.id];
			 });
			}
			}else if(adChannels[i]==3)
			{
				developerids.push(i);
				if($("#feedDeveloper").children().length==0){
				var ad2="<dt><img src='"+adPics[i]+"' width=\"1024\" height=\"230\"  alt=\"\"/></dt>";
				 $("#feedDeveloper").append(ad2);
				 $("#feedDeveloper").bind("click",function(){
					 if(adUrls[i]!=null&&adUrls[i]!=undefined)
						window.location.href=adUrls[i];
				 });
			}
			}
		}
	readyNewsData();
	for(var i=0;i<newsChannels.length;i++)
		{
		if(newsChannels[i]==1)
			{
			newsids01.push(i);
			if($("#feedNews1").children().length==0){
			 	var ad1="<div id='"+newsIds[i]+"'><dt>"+newsTitles[i]+"</dt>"+
				"<dd>"+newsBodys[i]+"</dd></div>";
			 $("#feedNews1").append(ad1);
			 $("#feedNews1").find("div").bind("click",function(){
				 if(newsUrls[this.id]!=null&&newsUrls[this.id]!=undefined)
					window.location.href=newsUrls[this.id];
			 });
			}
			}
		else if(newsChannels[i]==2)
			{
			newsids02.push(i);
			if($("#feedNews2").children().length==0){
			 	var ad1="<div id='"+newsIds[i]+"'><dt>"+newsTitles[i]+"</dt>"+
				"<dd>"+newsBodys[i]+"</dd></div>";
				 $("#feedNews2").append(ad1);
				 $("#feedNews2").find("div").bind("click",function(){
					 if(newsUrls[this.id]!=null&&newsUrls[this.id]!=undefined)
						window.location.href=newsUrls[this.id];
				 });
				}
			}
//		else if(newsChannels[i]==3)
//				{
//				newsids03.push(i);
//				if($("#feedNews3").children().length==0){
//				 	var ad1="<div id='"+newsIds[i]+"'><dt>"+newsTitles[i]+"</dt>"+
//					"<dd>"+newsBodys[i]+"</dd></div>";
//					 $("#feedNews3").append(ad1);
//					 $("#feedNews3").find("div").bind("click",function(){
//						 if(newsUrls[this.id]!=null&&newsUrls[this.id]!=undefined)
//							window.location.href=newsUrls[this.id];
//					 });
//					}
//				}
//			else if(newsChannels[i]==4)
//					{
//					newsids04.push(i);
//					if($("#feedNews4").children().length==0){
//					 	var ad1="<div id='"+newsIds[i]+"'><dt>"+newsTitles[i]+"</dt>"+
//						"<dd>"+newsBodys[i]+"</dd></div>";
//						 $("#feedNews4").append(ad1);
//						 $("#feedNews4").find("div").bind("click",function(){
//							 if(newsUrls[this.id]!=null&&newsUrls[this.id]!=undefined)
//								window.location.href=newsUrls[this.id];
//						 });
//						}
//					}
//			else if(newsChannels[i]==5)
//						{
//						newsids05.push(i);
//						if($("#feedNews5").children().length==0){
//						 	var ad1="<div id='"+newsIds[i]+"'><dt>"+newsTitles[i]+"</dt>"+
//							"<dd>"+newsBodys[i]+"</dd></div>";
//							 $("#feedNews5").append(ad1);
//							 $("#feedNews5").find("div").bind("click",function(){
//								 if(newsUrls[this.id]!=null&&newsUrls[this.id]!=undefined)
//									window.location.href=newsUrls[this.id];
//							 });
//							}
//						}
		}
	readyEventData();
	for(var i=0;i<eventChannels.length;i++)
		{
		if(eventChannels[i]==1)
			{
			enventids.push(i);
		   if($("#feedEvent1").children().length==0)
				{
		 	var ad1="<dt><img src='"+eventPics[i]+"' alt=\"\"/></dt>";
			 $("#feedEvent1").append(ad1);
				}
			}
		}
	readyListData();
	for(var i=0;i<listChannels.length;i++)
	{
	if(listChannels[i]==2)
		{
		rentids.push(i);
	   if($("#feedRent1").children().length==0)
			{
	 	var ad1=
	 	 	"<div id='"+listIds[i]+"'><dt><img width='220' height='300' src='"+listPics[i]+"' alt=''/></dt>"
        	+"<dd class=\"price\">"+listPrices[i]+"</dd>"
            +"<dd class=\"square\">"+listRooms[i]+"</dd>"
            +"<dd class=\"square\">"+listLocations[i]+"</dd>";
		 $("#feedRent1").append(ad1);
		 $("#feedRent1").removeClass("starBlue");
		 if(listRanks[i]==100){ $("#feedRent1").addClass("starBlue");}
		
		 $("#feedRent1").find("div").bind("click",function(){
			 if(listUrls[this.id]!=null&&listUrls[this.id]!=undefined)
				window.location=listUrls[this.id];
		 });
//		 $("#feedRent1").find("div").mouseenter(function(){
//				var cover="<dd class='cover'>"+"<a href='"+listUrls[this.id]+"'>"+"房产详情"+"</a>"+"<a href='#'>"+"房产动态"+"</a>"+"</dd>";
//				var $this = $(this);
//				$(cover).appendTo($this)
//					.css("width",$this.width())
//					.animate({height:$this.height()},"fast");
//				});
		 continue;
			}
	   if($("#feedRent2").children().length==0)
		{
			var ad1=
		 	 	"<div id='"+listIds[i]+"'><dt><img  width='220' height='300'  src='"+listPics[i]+" ' alt=''/></dt>"
	        	+"<dd class=\"price\">"+listPrices[i]+"</dd>"
	            +"<dd class=\"square\">"+listRooms[i]+"</dd>"
	            +"<dd class=\"square\">"+listLocations[i]+"</dd>";
	 $("#feedRent2").append(ad1);
	 $("#feedRent2").removeClass("starBlue");
	 if(listRanks[i]==100){ $("#feedRent2").addClass("starBlue");}
	
	 $("#feedRent2").find("div").bind("click",function(){
		 if(listUrls[this.id]!=null&&listUrls[this.id]!=undefined)
			window.location=listUrls[this.id];
	 });
//	 $("#feedRent2").find("div").mouseenter(function(){
//			var cover="<dd class='cover'>"+"<a href='"+listUrls[this.id]+"'>"+"房产详情"+"</a>"+"<a href='#'>"+"房产动态"+"</a>"+"</dd>";
//			var $this = $(this);
//			$(cover).appendTo($this)
//				.css("width",$this.width())
//				.animate({height:$this.height()},"fast");
//			});
	 continue;
		}
	   if($("#feedRent3").children().length==0)
		{
			var ad1=
		 	 	"<div id='"+listIds[i]+"'><dt><img  width='220' height='300' src='"+listPics[i]+" ' alt=''/></dt>"
	        	+"<dd class=\"price\">"+listPrices[i]+"</dd>"
	            +"<dd class=\"square\">"+listRooms[i]+"</dd>"
	            +"<dd class=\"square\">"+listLocations[i]+"</dd>";
	 $("#feedRent3").append(ad1);
	 $("#feedRent3").removeClass("starBlue");
	 if(listRanks[i]==100)
	 { $("#feedRent3").addClass("starBlue");}
	
	 $("#feedRent3").find("div").bind("click",function(){
		 if(listUrls[this.id]!=null&&listUrls[this.id]!=undefined)
			window.location=listUrls[this.id];
	 });
//	 $("#feedRent3").find("div").mouseenter(function(){
//			var cover="<dd class='cover'>"+"<a href='"+listUrls[this.id]+"'>"+"房产详情"+"</a>"+"<a href='#'>"+"房产动态"+"</a>"+"</dd>";
//			var $this = $(this);
//			$(cover).appendTo($this)
//				.css("width",$this.width())
//				.animate({height:$this.height()},"fast");
//			});
	 continue;
		}
		}
	else if(listChannels[i]==1)
			{
			sellids.push(i);
			  if($("#feedSell1").children().length==0)
				{
					var ad1=
				 	 	"<div id='"+listIds[i]+"'><dt><img src='"+listPics[i]+"' alt=''/></dt>"
			        	+"<dd class=\"price\">"+listPrices[i]+" </dd>"
			            +"<dd class=\"square\">"+listRooms[i]+"</dd>"
			            +"<dd class=\"square\">"+listLocations[i]+"</dd>";
			 $("#feedSell1").append(ad1);
			 $("#feedSell1").removeClass("starGreen");
			 if(listRanks[i]==100)
				 {$("#feedSell1").addClass("starGreen");}
			 $("#feedSell1").find("div").bind("click",function(){
				 if(listUrls[this.id]!=null&&listUrls[this.id]!=undefined)
					window.location=listUrls[this.id];
			 });
//			 $("#feedSell1").find("div").mouseenter(function(){
//					var cover="<dd class='cover'>"+"<a href='"+listUrls[this.id]+"'>"+"房产详情"+"</a>"+"<a href='#'>"+"房产动态"+"</a>"+"</dd>";
//					var $this = $(this);
//					$(cover).appendTo($this)
//						.css("width",$this.width())
//						.animate({height:$this.height()},"fast");
//					});
			 continue;
				}
		   if($("#feedSell2").children().length==0)
			{
				var ad1=
			 	 	"<div id='"+listIds[i]+"'><dt><img src='"+listPics[i]+"' alt=''/></dt>"
		        	+"<dd class=\"price\">"+listPrices[i]+"</dd>"
		            +"<dd class=\"square\">"+listRooms[i]+"</dd>"
		            +"<dd class=\"square\">"+listLocations[i]+"</dd>";
		 $("#feedSell2").append(ad1);
		 $("#feedSell2").removeClass("starGreen");
		 if(listRanks[i]==100)
		 { $("#feedSell2").addClass("starGreen");}
		 $("#feedSell2").find("div").bind("click",function(){
			 if(listUrls[this.id]!=null&&listUrls[this.id]!=undefined)
				window.location=listUrls[this.id];
		 });
//		 $("#feedSell2").find("div").mouseenter(function(){
//				var cover="<dd class='cover'>"+"<a href='"+listUrls[this.id]+"'>"+"房产详情"+"</a>"+"<a href='#'>"+"房产动态"+"</a>"+"</dd>";
//				var $this = $(this);
//				$(cover).appendTo($this)
//					.css("width",$this.width())
//					.animate({height:$this.height()},"fast");
//				});
		 continue;
			}
		   if($("#feedSell3").children().length==0)
			{
				var ad1=
			 	 	"<div id='"+listIds[i]+"'><dt><img src='"+listPics[i]+"' alt=''/></dt>"
		        	+"<dd class=\"price\">"+listPrices[i]+"</dd>"
		            +"<dd class=\"square\">"+listRooms[i]+"</dd>"
		            +"<dd class=\"square\">"+listLocations[i]+"</dd>";
		 $("#feedSell3").append(ad1);
		 $("#feedSell3").removeClass("starGreen");
		 if(listRanks[i]==100)
		 { $("#feedSell3").addClass("starGreen");}
		 $("#feedSell3").find("div").bind("click",function(){
			 if(listUrls[this.id]!=null&&listUrls[this.id]!=undefined)
				window.location=listUrls[this.id];
		 });
//		 $("#feedSell3").find("div").mouseenter(function(){
//				var cover="<dd class='cover'>"+"<a href='"+listUrls[this.id]+"'>"+"房产详情"+"</a>"+"<a href='#'>"+"房产动态"+"</a>"+"</dd>";
//				var $this = $(this);
//				$(cover).appendTo($this)
//					.css("width",$this.width())
//					.animate({height:$this.height()},"fast");
//				});
		 continue;
			}
			}
	}
	 readyBrokerData();
	 for(var i=0;i<brokerChannels.length;i++)
		{
		if(brokerChannels[i]==1)
			{
			agentids.push(i);
		   if($("#feedAgent1").children().length==0)
				{
			 	var ad1=
					"<div id='"+brokerIds[i]+"'><dt><img src='"+brokerPics[i]+"'  alt=\"\"/></dt>"
			        +"<dd class=\"name\">"+brokerNames[i]+"</dd>"
			        +"<dd class=\"company\">"+brokerCompanys[i]+"</dd>"
		          +"<dd class=\"company\">"+brokerLikes[i]+"赞</dd></div>";
			 $("#feedAgent1").append(ad1);
			 $("#feedAgent1").removeClass("starBlue");
			 if(brokerRanks[i]==100)
				 {$("#feedAgent1").addClass("starBlue");}
			 $("#feedAgent1").find("div").bind("click",function(){
				 if(brokerUrls[this.id]!=null&&brokerUrls[this.id]!=undefined)
					window.location=brokerUrls[this.id];
			 });
			 continue;
				}
		   if($("#feedAgent2").children().length==0)
			{
			 	var ad1=
					"<div id='"+brokerIds[i]+"'><dt><img src='"+brokerPics[i]+"'  alt=\"\"/></dt>"
			        +"<dd class=\"name\">"+brokerNames[i]+"</dd>"
			        +"<dd class=\"company\">"+brokerCompanys[i]+"</dd>"
		          +"<dd class=\"company\">"+brokerLikes[i]+"赞</dd></div>";
		 $("#feedAgent2").append(ad1);
		 $("#feedAgent2").removeClass("starBlue");
		 if(brokerRanks[i]==100)
		 { $("#feedAgent2").addClass("starBlue");}
		 $("#feedAgent2").find("div").bind("click",function(){
			 if(brokerUrls[this.id]!=null&&brokerUrls[this.id]!=undefined)
				window.location=brokerUrls[this.id];
		 });
		 continue;
			}
		   if($("#feedAgent3").children().length==0)
			{
	 	var ad1=
			"<div id='"+brokerIds[i]+"'><dt><img src='"+brokerPics[i]+"'  alt=\"\"/></dt>"
	        +"<dd class=\"name\">"+brokerNames[i]+"</dd>"
	        +"<dd class=\"company\">"+brokerCompanys[i]+"</dd>"
          +"<dd class=\"company\">"+brokerLikes[i]+"赞</dd></div>";
		 $("#feedAgent3").append(ad1);
		 $("#feedAgent3").removeClass("starBlue");
		 if(brokerRanks[i]==100)
			 {$("#feedAgent3").addClass("starBlue");}
		 $("#feedAgent3").find("div").bind("click",function(){
			 if(brokerUrls[this.id]!=null&&brokerUrls[this.id-1]!=undefined)
				window.location=brokerUrls[this.id];
		 });
		 continue;
			}
			}
		}
	 readyResidenceData();
	 for(var i=0;i<resChannels.length;i++)
		{
		if(resChannels[i]==1)
			{
			residenceids.push(i);
		   if($("#feedResidence").children().length==0)
				{
		 	var ad1=
		 		"<div id='"+resIds[i]+"'><dt><img src='"+resPics[i]+"'  alt=''/></dt>"
	            +"<dd class=\"name\">"+resTitles[i]+"</dd>"
	            +"<dd class=\"news\">"+resBodys[i]+"</dd></div>";
			 $("#feedResidence").append(ad1);
			 $("#feedResidence").removeClass("starBlue");
			 if(resRanks[i]==100){
				 $("#feedResidence").addClass("starBlue");
				 }
			 $("#feedResidence").find("div").bind("click",function(){
				 if(resUrls[this.id]!=null&&resUrls[this.id]!=undefined)
					window.location=resUrls[this.id];
			 });
				}
			}
		}
	$(".pic").find("img").each(function(){
		$(this).css({"width":$(this).parents(".pic").width(),"height":$(this).parents(".pic").height()});
		});
	$(".sell").mouseleave(function(){
		$(".cover").animate({height:0}).remove();
		});
		
	$(".rent").mouseleave(function(){
		$(".cover").animate({height:0}).remove();
		});
	$("dl").each(function(){
		if($(this).children().length>0)
		{
			$(this).css("cursor","pointer");
		}
	});
	
});


//下列方法动态更新首页内容

$(function()
		{
	var speed=20000;
	var rent_index=1;
	var sell_index=1;
	var agent_index=1;
	var residence_index=1;
	var news01_index=1;
	var news02_index=1;
//	var news03_index=1;
//	var news04_index=1;
//	var news05_index=1;
	var ad01_index=1;
	var ad02_index=1;
	var developer_index=1;
	var envent_index=1;
	var maxRent=rentids.length;
	var maxSell=sellids.length;
	var maxAgent=agentids.length;
	var maxNews01=newsids01.length;
	var maxNews02=newsids02.length;
//	var maxNews03=newsids03.length;
//	var maxNews04=newsids04.length;
//	var maxNews05=newsids05.length;
	var maxResidence=residenceids.length;
	var maxAd01=adids01.length;
	var maxAd02=adids02.length;
	var maxDevelpoer=developerids.length;
	var maxEnvent=enventids.length;
	var intervalRent = setInterval(showfeedRent, speed);
	var intelvalSell=setInterval(showShell, speed);
	var intervalAgent=setInterval(showAgent, speed);
	var intervalResidence=setInterval(showResidence, speed);
	var intervalAD=setInterval(showAd, speed);
	/*var intervalNews;*/
$("#feedRent1").mouseenter(function(){
    	window.clearInterval(intervalRent);
    	window.clearInterval(intelvalSell);})
    	.mouseleave(function(){intervalRent = setInterval(showfeedRent, speed);intelvalSell = setInterval(showShell, speed);});
 $("#feedRent2").mouseenter(function(){
    	window.clearInterval(intervalRent);
    	window.clearInterval(intelvalSell);})
    	.mouseleave(function(){intervalRent = setInterval(showfeedRent, speed);intelvalSell = setInterval(showShell, speed);});
 $("#feedRent3").mouseenter(function(){
    	window.clearInterval(intervalRent);
    	window.clearInterval(intelvalSell);})
    	.mouseleave(function(){intervalRent = setInterval(showfeedRent, speed);intelvalSell = setInterval(showShell, speed);});
 $("#feedSell1").mouseenter(function(){
 	window.clearInterval(intelvalSell);
 	window.clearInterval(intervalRent);})
 	.mouseleave(function(){intelvalSell = setInterval(showShell, speed);intervalRent = setInterval(showfeedRent, speed);});
$("#feedSell2").mouseenter(function(){
 	window.clearInterval(intelvalSell);
 	window.clearInterval(intervalRent);})
 	.mouseleave(function(){intelvalSell = setInterval(showShell, speed);intervalRent = setInterval(showfeedRent, speed);});
$("#feedSell3").mouseenter(function(){
 	window.clearInterval(intelvalSell);
 	window.clearInterval(intervalRent);})
 	.mouseleave(function(){intelvalSell = setInterval(showShell, speed);intervalRent = setInterval(showfeedRent, speed);});
$("#feedAgent1").mouseenter(function(){
 	window.clearInterval(intervalAgent);}).mouseleave(function(){intervalAgent = setInterval(showAgent, speed);});
$("#feedAgent2").mouseenter(function(){
 	window.clearInterval(intervalAgent);}).mouseleave(function(){intervalAgent = setInterval(showAgent, speed);});
$("#feedAgent3").mouseenter(function(){
 	window.clearInterval(intervalAgent);}).mouseleave(function(){intervalAgent = setInterval(showAgent, speed);});
$("#feedResidence").mouseenter(function(){
 	window.clearInterval(intervalResidence);}).mouseleave(function(){intervalResidence = setInterval(showResidence, speed);});
$("#feedAd1").mouseenter(function(){
 	window.clearInterval(intervalAD);}).mouseleave(function(){intervalAD = setInterval(showAd, speed);});
$("#feedAd12").mouseenter(function(){
 	window.clearInterval(intervalAD);}).mouseleave(function(){intervalAD = setInterval(showAd, speed);});
$("#feedDeveloper").mouseenter(function(){
 	window.clearInterval(intervalAD);}).mouseleave(function(){intervalAD = setInterval(showAd, speed);});
/*$("#feedNews1").mouseenter(function(){
 	window.clearInterval(intervalNews);}).mouseleave(function(){intervalNews = setInterval(intervalNews, speed);});
$("#feedNews2").mouseenter(function(){
 	window.clearInterval(intervalNews);}).mouseleave(function(){intervalNews = setInterval(intervalNews, speed);});
$("#feedNews3").mouseenter(function(){
 	window.clearInterval(intervalNews);}).mouseleave(function(){intervalNews = setInterval(intervalNews, speed);});
$("#feedNews4").mouseenter(function(){
 	window.clearInterval(intervalNews);}).mouseleave(function(){intervalNews = setInterval(intervalNews, speed);});
$("#feedNews5").mouseenter(function(){
 	window.clearInterval(intervalNews);}).mouseleave(function(){intervalNews = setInterval(intervalNews, speed);});*/

		function showfeedRent()
		{	
			 
			if(rent_index<maxRent){
				var target1=rentids[rent_index];
				var str1="<div id='"+listIds[target1]+"'><dt><img width='220' height='300' alt='' src='"+listPics[target1]+"'></img></dt>"
				+"<dd class='price'>"+listPrices[target1]+"</dd>"
				+"<dd class='square'>"+listRooms[target1]+"</dd>"
				+"<dd class='square'>"+listLocations[target1]+"</dd></div>";
				$("#feedRent1").html($(str1).css("width",$("#feedRent1").width()).animate({height:$("#feedRent1").height()},"fast"));
				$("#feedRent1").removeClass("starBlue"); 
				if(listRanks[target1]==100)
					 {$("#feedRent1").addClass("starBlue");}
				
				$("#feedRent1").find("div").bind("click",function(){
					 if(listUrls[this.id]!=null&&listUrls[this.id]!=undefined)
						window.location=listUrls[this.id];
			  
				 });
			}
			if(rent_index+1<maxRent)
				{
				var target2=rentids[rent_index+1];
				var str2="<div id='"+listIds[target2]+"'><dt><img width='220' height='300' alt='' src='"+listPics[target2]+"'></img></dt>"
				+"<dd class='price'>"+listPrices[target2]+"</dd>"
				+"<dd class='square'>"+listRooms[target2]+"</dd>"
				+"<dd class='square'>"+listLocations[target2]+"</dd></div>";
				$("#feedRent2").html($(str2).css("width",$("#feedRent2").width()).animate({height:$("#feedRent2").height()},"fast"));
				$("#feedRent2").removeClass("starBlue"); 
				if(listRanks[target2]==100)
				 {$("#feedRent2").addClass("starBlue");}
			
				$("#feedRent2").find("div").bind("click",function(){
					 if(listUrls[this.id]!=null&&listUrls[this.id]!=undefined)
						window.location=listUrls[this.id];
				 });
				}
			if(rent_index+2<maxRent)	
				{var target3=rentids[rent_index+2];
				var str3="<div id='"+listIds[target3]+"'><dt><img width='220' height='300' alt='' src='"+listPics[target3]+"'></img></dt>"
				+"<dd class='price'>"+listPrices[target3]+"</dd>"
				+"<dd class='square'>"+listRooms[target3]+"</dd>"
				+"<dd class='square'>"+listLocations[target3]+"</dd></div>";
				$("#feedRent3").html($(str3).css("width",$("#feedRent3").width()).animate({height:$("#feedRent3").height()},"fast"));
				$("#feedRent3").removeClass("starBlue"); 
				if(listRanks[target3]==100)
				 {$("#feedRent3").addClass("starBlue");}
			
				$("#feedRent3").find("div").bind("click",function(){
					 if(listUrls[this.id]!=null&&listUrls[this.id]!=undefined)
						window.location=listUrls[this.id];
				 });
				}
			rent_index+3<maxRent?rent_index=rent_index+3:rent_index=0;
			 

	
		}//showfeedRent()
		
		
		function showShell()
		{
			
			if(sell_index<maxSell){
				var target1=sellids[sell_index];
				var str1=
					"<div id='"+listIds[target1]+"'><dt><img src='"+listPics[target1]+"' alt=\"\"/></dt>"
		        	+"<dd class=\"price\">"+listPrices[target1]+"</dd>"
		            +"<dd class=\"square\">"+listRooms[target1]+"</dd>"
		            +"<dd class=\"square\">"+listLocations[target1]+"</dd>";
				$("#feedSell1").html($(str1).css("width",$("#feedSell1").width()).animate({height:$("#feedSell1").height()},"fast"));
				$("#feedSell1").removeClass("starGreen");
				 if(listRanks[target1]==100)
				 {$("#feedSell1").addClass("starGreen");}
				$("#feedSell1").find("div").bind("click",function(){
					 if(listUrls[this.id]!=null&&listUrls[this.id]!=undefined)
						window.location=listUrls[this.id];
				 });
			}
			if(sell_index+1<maxSell){
				var target2=sellids[sell_index+1];
				var str1=
					"<div id='"+listIds[target2]+"'><dt><img src='"+listPics[target2]+"' alt=\"\"/></dt>"
		        	+"<dd class=\"price\">"+listPrices[target2]+"</dd>"
		            +"<dd class=\"square\">"+listRooms[target2]+"</dd>"
		            +"<dd class=\"square\">"+listLocations[target2]+"</dd>";
				$("#feedSell2").html($(str1).css("width",$("#feedSell2").width()).animate({height:$("#feedSell2").height()},"fast"));
				$("#feedSell2").removeClass("starGreen");
				if(listRanks[target2]==100)
				 {$("#feedSell2").addClass("starGreen");}
				 $("#feedSell2").find("div").bind("click",function(){
					 if(listUrls[this.id]!=null&&listUrls[this.id]!=undefined)
						window.location=listUrls[this.id];
				 });
			}
			if(sell_index+2<maxSell){
				var target3=sellids[sell_index+2];
				var str1=
					"<div id='"+listIds[target3]+"'><dt><img src='"+listPics[target3]+"' alt=\"\"/></dt>"
		        	+"<dd class=\"price\">"+listPrices[target3]+"</dd>"
		            +"<dd class=\"square\">"+listRooms[target3]+"</dd>"
		            +"<dd class=\"square\">"+listLocations[target3]+"</dd>";
				$("#feedSell3").html($(str1).css("width",$("#feedSell3").width()).animate({height:$("#feedSell3").height()},"fast"));
				$("#feedSell3").removeClass("starGreen"); 
				if(listRanks[target3]==100)
				 {$("#feedSell3").addClass("starGreen");}
				$("#feedSell3").find("div").bind("click",function(){
					 if(listUrls[this.id]!=null&&listUrls[this.id]!=undefined)
						window.location=listUrls[this.id];
				 });
			}
			
			sell_index+3<maxSell?sell_index=sell_index+3:sell_index=0;
		}//showShell()
		
		function showAgent()
		{
			
			if(agent_index<maxAgent){
				var target1=agentids[agent_index];
				var str1=
					"<div id='"+brokerIds[target1]+"'><dt><img src='"+brokerPics[target1]+"' alt=\"\"/></dt>"
			        +"<dd class=\"name\">"+brokerNames[target1]+"</dd>"
			        +"<dd class=\"company\">"+brokerCompanys[target1]+"</dd>"
		          +"<dd class=\"company\">"+brokerLikes[target1]+"赞</dd></div>";
			$("#feedAgent1").html($(str1).css("width",$("#feedAgent1").width()).animate({height:$("#feedAgent1").height()},"fast"));
			$("#feedAgent1").removeClass("starBlue");
			if(brokerRanks[target1]==100)
			{$("#feedAgent1").addClass("starBlue");}
			
			 $("#feedAgent1").find("div").bind("click",function(){
				 if(brokerUrls[this.id]!=null&&brokerUrls[this.id]!=undefined)
					window.location=brokerUrls[this.id];
			 });
			}
			if(agent_index+1<maxAgent){
				var target2=agentids[agent_index+1];
				var str1=
					"<div id='"+brokerIds[target2]+"'><dt><img src='"+brokerPics[target2]+"' alt=\"\"/></dt>"
			        +"<dd class=\"name\">"+brokerNames[target2]+"</dd>"
			        +"<dd class=\"company\">"+brokerCompanys[target2]+"</dd>"
		          +"<dd class=\"company\">"+brokerLikes[target2]+"赞</dd></div>";
			$("#feedAgent2").html($(str1).css("width",$("#feedAgent2").width()).animate({height:$("#feedAgent2").height()},"fast"));
			$("#feedAgent2").removeClass("starBlue");
			if(brokerRanks[target2]==100)
			{$("#feedAgent2").addClass("starBlue");}
			 $("#feedAgent2").find("div").bind("click",function(){
				 if(brokerUrls[this.id]!=null&&brokerUrls[this.id]!=undefined)
					window.location=brokerUrls[this.id];
			 });
			}
			if(agent_index+2<maxAgent){
				var target3=agentids[agent_index+2];
				var str1=
					"<div id='"+brokerIds[target3]+"'><dt><img src='"+brokerPics[target3]+"' alt=\"\"/></dt>"
			        +"<dd class=\"name\">"+brokerNames[target3]+"</dd>"
			        +"<dd class=\"company\">"+brokerCompanys[target3]+"</dd>"
		          +"<dd class=\"company\">"+brokerLikes[target3]+"赞</dd></div>";
			$("#feedAgent3").html($(str1).css("width",$("#feedAgent3").width()).animate({height:$("#feedAgent3").height()},"fast"));
			$("#feedAgent3").removeClass("starBlue");
			if(brokerRanks[target3]==100)
			{$("#feedAgent3").addClass("starBlue");}
			 $("#feedAgent3").find("div").bind("click",function(){
				 if(brokerUrls[this.id]!=null&&brokerUrls[this.id]!=undefined)
					window.location=brokerUrls[this.id];
			 });
			}
			
			agent_index+3<maxAgent?agent_index=agent_index+3:agent_index=0;
		}//showAgent()
		
		function showResidence()
		{

			if(residence_index<maxResidence){
				var target=residenceids[residence_index];
			
				var str1=
					"<div id='"+resIds[target]+"'><dt><img src='"+resPics[target]+"' alt=\"\"/></dt>"
		            +"<dd class=\"name\">"+resTitles[target]+"</dd>"
		            +"<dd class=\"news\">"+resBodys[target]+"</dd></div>";
				$("#feedResidence").html($(str1).css("width",$("#feedResidence").width()).animate({height:$("#feedResidence").height()},"fast"));
				$("#feedResidence").removeClass("starBlue");
				if(resRanks[target]==100){$("#feedResidence").addClass("starBlue");}
				 $("#feedResidence").find("div").bind("click",function(){
					 if(resUrls[this.id]!=null&&resUrls[this.id]!=undefined)
						window.location=resUrls[this.id];
				 });
			}
			
			
			residence_index+1<maxResidence?residence_index=residence_index+1:residence_index=0;
		}//showResidence()
		function showNews()
		{
	     if(news01_index<maxNews01)
	    	 {
	    	 var target=newsids01[news01_index];
	    	 	var str1=
	    	 	"<div id='"+newsIds[target]+"'><dt>"+newsTitles[target]+"</dt>"+
				"<dd>"+newsBodys[target]+"</dd></div>";
			 $("#feedNews1").html($(str1).css("width",$("#feedNews1").width()).animate({height:$("#feedNews1").height()},"fast"));
			 $("#feedNews1").find("div").bind("click",function(){
				 if(newsUrls[this.id]!=null&&newsUrls[this.id]!=undefined)
					window.location.href=newsUrls[this.id];
			 });
	    	 
	    	 }
	     if(news02_index<maxNews02)
    	 {
	    	 var target=newsids02[news02_index];
	    	 	var str1=
	    	 	"<div id='"+newsIds[target]+"'><dt>"+newsTitles[target]+"</dt>"+
				"<dd>"+newsBodys[target]+"</dd></div>";
			 $("#feedNews2").html($(str1).css("width",$("#feedNews2").width()).animate({height:$("#feedNews2").height()},"fast"));
			 $("#feedNews2").find("div").bind("click",function(){
				 if(newsUrls[this.id]!=null&&newsUrls[this.id]!=undefined)
					window.location.href=newsUrls[this.id];
			 });
    	 
    	 
    	 }
//	     if(news03_index<maxNews03)
//    	 {
//	    	 var target=newsids03[news03_index];
//	    	 	var str1=
//	    	 	"<div id='"+newsIds[target]+"'><dt>"+newsTitles[target]+"</dt>"+
//				"<dd>"+newsBodys[target]+"</dd></div>";
//			 $("#feedNews3").html($(str1).css("width",$("#feedNews3").width()).animate({height:$("#feedNews3").height()},"fast"));
//			 $("#feedNews3").find("div").bind("click",function(){
//				 if(newsUrls[this.id]!=null&&newsUrls[this.id]!=undefined)
//					window.location.href=newsUrls[this.id];
//			 });
//    	 
//    	 
//    	 }
//	     if(news04_index<maxNews04)
//    	 {
//    	 
//	    	 var target=newsids04[news04_index];
//	    	 	var str1=
//	    	 	"<div id='"+newsIds[target]+"'><dt>"+newsTitles[target]+"</dt>"+
//				"<dd>"+newsBodys[target]+"</dd></div>";
//			 $("#feedNews4").html($(str1).css("width",$("#feedNews4").width()).animate({height:$("#feedNews4").height()},"fast"));
//			 $("#feedNews4").find("div").bind("click",function(){
//				 if(newsUrls[this.id]!=null&&newsUrls[this.id]!=undefined)
//					window.location.href=newsUrls[this.id];
//			 });
//    	 
//    	 }
//	     if(news05_index<maxNews05)
//    	 {
//	    	 var target=newsids05[news05_index];
//	    	 	var str1=
//	    	 	"<div id='"+newsIds[target]+"'><dt>"+newsTitles[target]+"</dt>"+
//				"<dd>"+newsBodys[target]+"</dd></div>";
//			 $("#feedNews5").html($(str1).css("width",$("#feedNews5").width()).animate({height:$("#feedNews5").height()},"fast"));
//			 $("#feedNews5").find("div").bind("click",function(){
//				 if(newsUrls[this.id]!=null&&newsUrls[this.id]!=undefined)
//					window.location.href=newsUrls[this.id];
//			 });
//    	 
//    	 
//    	 }

	     news01_index+1<maxNews01?news01_index=news01_index+1:news01_index=0;
	     news02_index+1<maxNews01?news02_index=news01_index+1:news02_index=0;
//	     news03_index+1<maxNews01?news03_index=news01_index+1:news03_index=0;
//	     news04_index+1<maxNews01?news04_index=news01_index+1:news04_index=0;
//	     news05_index+1<maxNews01?news05_index=news01_index+1:news05_index=0;
	     
	     


		}//showNews()
		
		
		function showAd()
		{ 
			if(ad01_index>=maxAd01)ad01_index=0;
			
			if(ad02_index>=maxAd02)ad02_index=0;
			if(developer_index>=maxDevelpoer)developer_index=0;
			if(envent_index>=maxEnvent)envent_index=0;
				
				
				
			if(ad01_index<maxAd01)
				{
				var target1=adids01[ad01_index];
				var str1=
					"<dt id='"+adIds[target1]+"'+><img src=\""+adPics[target1]+"\" width=\"396\" height=\"98\"  alt=\"\"/></dt>";
				 $("#feedAd1").html($(str1).css("width",$("#feedAd1").width()).animate({height:$("#feedAd1").height()},"fast"));
				 $("#feedAd1").find("dt").bind("click",function(){
					 if(adUrls[this.id]!=null&&adUrls[this.id]!=undefined)
						window.location.href=adUrls[this.id];
				 });
				
				}
			if(ad02_index<maxAd02)
			{
				var target2=adids02[ad02_index];
				var str2=
					"<dt id='"+adIds[target2]+"'+><img src='"+adPics[target2]+"' alt=\"\" style='width: 246px; height: 200px;' /></dt>";
				 $("#feedAd2").html($(str2).css("width",$("#feedAd2").width()).animate({height:$("#feedAd2").height()},"fast"));
				 $("#feedAd2").find("dt").bind("click",function(){
					 if(adUrls[this.id]!=null&&adUrls[this.id]!=undefined)
						window.location.href=adUrls[this.id];
				 });
			
			
			}
			if(developer_index<maxDevelpoer)
			{
				
			var target3=developerids[developer_index];
			var str3="<dt><img src='"+adPics[target3]+"' width=\"1024\" height=\"230\"  alt=\"\"/></dt>";
			 $("#feedDeveloper").html($(str3).css("width",$("#feedDeveloper").width()).animate({height:$("#feedDeveloper").height()},"fast"));
			 $("#feedDeveloper").bind("click",function(){
				 if(adUrls[i]!=null&&adUrls[i]!=undefined)
					window.location.href=adUrls[i];
			 });
			}
			 if(envent_index<maxEnvent)
				 {
			
				 var target4=enventids[envent_index];
					var str4="<dt><img style='width: 246px; height: 200px;' src='"+eventPics[target4]+"' alt=\"\"/></dt>";
					 $("#feedEvent1").html($(str4).css("width",$("#feedEvent1").width()).animate({height:$("#feedEvent1").height()},"fast"));
				 
				 }
			
			
			 ad01_index+1<maxAd01?ad01_index=ad01_index+1:ad01_index=0;
			
			
			 ad02_index+1<maxAd02?ad02_index=ad02_index+1:ad02_index=0;
			 developer_index+1<maxDevelpoer?developer_index= developer_index+1:developer_index=0;
			 envent_index+1<maxEnvent? envent_index= envent_index+1: envent_index=0;
			
		}//showAd()
		
		
		//以下代码实现手动刷新
		$("#refresh_button").bind("click",function(){
	

			window.clearInterval(intervalRent);
			window.clearInterval(intelvalSell);
			window.clearInterval(intervalAgent);
			window.clearInterval(intervalResidence);
			window.clearInterval(intervalAD);
			/*if(!intervalNews && typeof(intervalNews)!="undefined" && intervalNews!=0)
			{window.clearInterval(intervalNews);}*/
			showAd();
			/*showNews();*/
			showResidence();
			showAgent();
			showShell();
			showfeedRent();
			intervalRent = setInterval(showfeedRent, speed);
			intelvalSell=setInterval(showShell, speed);
			intervalAgent=setInterval(showAgent, speed);
			intervalResidence=setInterval(showResidence, speed);
			intervalAD=setInterval(showAd, speed);
		/*	intervalNews=setInterval(showNews, speed);*/
			
			
		});
	

		
		
		}
		);


	
