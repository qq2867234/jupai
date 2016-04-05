$(function(){
	
	//图片加载失败处理函数
	$("img").error(function(){
		showImgDelay($(this)[0], '/images/public/defaultHome.jpg', 2);
	});
	
	if($("#saleOrder").length>0){
		$("#saleOrder").find("dl").slice(0,4).show().addClass('show');
	}
	if($("#rentalOrder").length>0){
		 $("#rentalOrder").find("dl").lt(4).show().addClass('show');
	}
   
    //$("#agents").find("dl").lt(4).show().addClass('show');
    $imgContainer = $('#itemContainer');
    $imgContainer.imagesLoaded(function(){
    	$imgContainer.masonry({
			itemSelector : 'li',
			columnWidth: 128,
			gutterWidth: 18,
	});
    });
		

    $(".changeBtn").click(function(){
      $(this).parents(".texts").find("dl").each(function(){
          var n = $(this).index();
          var num = $(this).siblings('dl').length+1;
          if($(this).is(":visible")&&$(this).parent().children('dl').eq((n+1)%num).is(":hidden")){
            $(this).hide().siblings("dl").hide();
            $(this).parent().children('dl').eq((n+1)%num).show().addClass('show')
              .end().eq((n+1)%num+1).show().addClass('show')
              .end().eq((n+1)%num+2).show().addClass('show')
              .end().eq((n+1)%num+3).show().addClass('show');
            return false;
          };
          
      });
    });

	$("button.smsg").mouseenter(function(){
		$(this).removeClass("smsg").addClass("smsg2");		
		});
	$("button.smsg").mouseleave(function(){
		$(this).removeClass("smsg2").addClass("smsg");	
		});
	$("#picFlash .picBox").hide();
	$("#picFlash .picBox").first().show();
	
	$("#picFlash .leftArr").mouseenter(function(){
		$(this).children("img").show();
		});
	$("#picFlash .leftArr").mouseleave(function(){
		$(this).children("img").hide();
		});
	$("#picFlash .rightArr").mouseenter(function(){
		$(this).children("img").show();
		});
	$("#picFlash .rightArr").mouseleave(function(){
		$(this).children("img").hide();
		});
	
//	$("#surround li").click(function(){
//		$(this).addClass("on").siblings().removeClass("on");
//		$("ul.item").hide()
//			.eq($(this).index()).show()
//		});
//	$("ul.item").hide().first().show();
	
	showAllText($(".content.hIntro").next(),$(".content.hIntro").next().next(),$(".content.hIntro"),310);
	
	showAllText($(".rBlock a.spreadDiv"),$(".rBlock a.shrinkDiv"),$(".rBlock ul.item:visible"),300);
	$("#surround li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		$(".rBlock a").hide();
		$("ul.item").css("height","auto").hide()
			.eq($(this).index()).show();
		showAllText($(".rBlock a.spreadDiv"),$(".rBlock a.shrinkDiv"),$(".rBlock ul.item:visible"),300);
		});
	
	
	var freq = 5000;
	var oTime;
	
	
	$("#picFlash .leftArr").click(function(){
		clearInterval(oTime);
		
		fnPicMove($("#picFlash .picsBox"),-1);
		
		});
		
	$("#picFlash .rightArr").click(function(){
		clearInterval(oTime);
		fnPicMove($("#picFlash .picsBox"),1);

		});
	
	$("#rightPan dl dt").mouseenter(function(){
		$(this).find(".leftSmArr").show();
		$(this).find(".rightSmArr").show();
		});
	$("#rightPan dl dt").mouseleave(function(){
		$(this).find(".leftSmArr").hide();
		$(this).find(".rightSmArr").hide();
		});
		
	$("#rightPan dl .leftSmArr").click(function(){
		if($(this).parent().children("img").length>1)
		{
			fnPicMove($(this).parent().children("img"),-1);
		}
		else
		{
			return;
		}
		});
	$("#rightPan dl .rightSmArr").click(function(){
		if($(this).parent().children("img").length>1)
		{
		fnPicMove($(this).parent().children("img"),1);
		}
		else
		{
			return;
		}
		});
	fnTextVerify($("#sendText"),$("span#num"),40);

	
		
//	$(".smsg").click(function(){
//		$(this).parent().find("#sendMsg").toggle();
//		});
//	
//	// 发送消息
//	$("#sendOut").click(function(){
//		var zid = 466;
//		// 消息内容
//		var message = $("#sendText").val();
//		if($.trim(message).length == 0){
//			$("span#num").text("请输入信息");
//			return;
//		}
//		// 给经纪人留言
//		leaveMessage(zid, message);
//		$(this).parent().hide();
//		});
//	$("#sendClose").click(function(){
//		$(this).parent().hide();
//		});
//	fnTextVerify($("#sendText"),$("#num"),40);
	function fnPicMove(showBox,picStep){
		var myIndex;
		if($(showBox).length<=1)
		{
			return;
		}
		for(var i=0; i<$(showBox).length;i++)
		{
			if($(showBox).eq(i).is(":visible"))
			{
				myIndex = i;
				break;
			}
		}
		if(myIndex+picStep>$(showBox).length-1)
		{
			 $(showBox).eq(0).fadeIn(200);
			 $(showBox).eq(myIndex).fadeOut(700);
		}
		else
		{
			$(showBox).eq(myIndex+picStep).fadeIn(200);
			$(showBox).eq(myIndex).fadeOut(700);	
		}
		}	

	});

function showAllText(spreadBtn,shrinkBtn,textDiv,nHeights){
	if($(textDiv).height()>nHeights)
	{
		$(textDiv).css({"height":nHeights+'px',"overflow":"hidden"});
		$(spreadBtn).css("display","block");
	}
	else
	{
		$(textDiv).css({"height":"auto"});
		$(spreadBtn).hide();
		$(shrinkBtn).hide();
	}
	$(spreadBtn).click(function(){
		$(textDiv).css("height","auto");
		$(shrinkBtn).css("display","block");
		$(spreadBtn).hide();
	});
	$(shrinkBtn).click(function(){
		$(textDiv).css({"height":nHeights+'px',"overflow":"hidden"});
		$(spreadBtn).css("display","block");
		$(shrinkBtn).hide();
	});
}