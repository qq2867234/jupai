$(function() {
	$(".resultMenu li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		if($(this).index()==0)
		{
			$("#communityList").show();
			$("#agentList").hide();
		}
		else{
			$("#agentList").show();
			$("#communityList").hide();
		}
	});
	var queries;
		var oldURL=location.href;
		var querys=[];
		var mapDetails=[];
		querys=oldURL.split("&");
		if(querys[1]!=null)
			{
			mapDetails=querys[1].split("_");
			if(mapDetails.length>10){
			var point = new BMap.Point(Number(mapDetails[17]),Number(mapDetails[16]));    
			map.centerAndZoom(point,Number(mapDetails[9])); 
			queries=querys[1];
	   if(mapDetails[1]==1){
		   $("#type").val("买房");
			$("#buyMoreCondition").find("dl").each(function(){
				$(this).children("dd").removeClass("on");
				$(this).children("dd").first().addClass("on");
				$(this).children("input").val(0);
			});
		   if(mapDetails[4]!=0){
		   $("#buyMoreCondition dl").eq(0).find("dd").eq(0).removeClass("on");
		   $("#buyMoreCondition dl").eq(0).find("dd").eq(mapDetails[4]).addClass("on");
		   $("#buyMoreCondition dl").eq(0).find("input").val(mapDetails[4]);
		   }
		   if(mapDetails[5]!=0)
			{
			   $("#buyMoreCondition dl").eq(1).find("dd").eq(0).removeClass("on");
			   $("#buyMoreCondition dl").eq(1).find("dd").eq(mapDetails[5]).addClass("on");
			   $("#buyMoreCondition dl").eq(1).find("input").val(mapDetails[5]);
			}
	  if(mapDetails[6]!=0)
		{
		   $("#buyMoreCondition dl").eq(2).find("dd").eq(0).removeClass("on");
		   $("#buyMoreCondition dl").eq(2).find("dd").eq(mapDetails[6]).addClass("on");
		   $("#buyMoreCondition dl").eq(2).find("input").val(mapDetails[6]);
		}
	if(mapDetails[7]!=0)
		{
		  $("#buyMoreCondition dl").eq(3).find("dd").eq(0).removeClass("on");
		   $("#buyMoreCondition dl").eq(3).find("dd").eq(mapDetails[7]/5).addClass("on");
		   $("#buyMoreCondition dl").eq(3).find("input").val(mapDetails[7]/5);
		}
	if(mapDetails[8]!=0)
	{
	  $("#buyMoreCondition dl").eq(4).find("dd").eq(0).removeClass("on");
	   $("#buyMoreCondition dl").eq(4).find("dd").eq(mapDetails[8]).addClass("on");
	   $("#buyMoreCondition dl").eq(4).find("input").val(mapDetails[8]);
	}
   }
  else
   {
    $("#type").val("租房");
		$("#rentMoreCondition").find("dl").each(function(){
			$(this).children("dd").removeClass("on");
			$(this).children("dd").first().addClass("on");
			$(this).children("input").val(0);
		});
	  if(mapDetails[4]!=0){
	   $("#rentMoreCondition dl").eq(0).find("dd").eq(0).removeClass("on");
	   $("#rentMoreCondition dl").eq(0).find("dd").eq(mapDetails[4]).addClass("on");
	   $("#rentMoreCondition dl").eq(0).find("input").val(mapDetails[4]);
	   }
	   if(mapDetails[5]!=0)
		{
		   $("#rentMoreCondition dl").eq(1).find("dd").eq(0).removeClass("on");
		   $("#rentMoreCondition dl").eq(1).find("dd").eq(mapDetails[5]).addClass("on");
		   $("#rentMoreCondition dl").eq(1).find("input").val(mapDetails[5]);
		}
    if(mapDetails[6]!=0)
	 {
	   $("#rentMoreCondition dl").eq(2).find("dd").eq(0).removeClass("on");
	   $("#rentMoreCondition dl").eq(2).find("dd").eq(mapDetails[6]).addClass("on");
	   $("#rentMoreCondition dl").eq(2).find("input").val(mapDetails[6]);
	}
if(mapDetails[7]!=0){
  $("#rentMoreCondition dl").eq(3).find("dd").eq(0).removeClass("on");
   $("#rentMoreCondition dl").eq(3).find("dd").eq(mapDetails[7]).addClass("on");
   $("#rentMoreCondition dl").eq(3).find("input").val(mapDetails[7]);
   }
	  }
	  }
			else
				{
				if(mapDetails[0]==0)
					 $("#keywords").val("");
				else
			  $("#keywords").val(decodeURIComponent(mapDetails[0]));
			if(mapDetails[1]==1)
				{
				 $("#type").val("买房");
				 if(mapDetails[2]!=0)
				$("#price").val(mapDetails[2]+"万");
				 else
				$("#price").val("不限预算");
				}
			else
				{
				 $("#type").val("租房");
				 if(mapDetails[2]!=0)
				$("#price").val(mapDetails[2]+"元");
				 else
				$("#price").val("不限预算");
				}
			   if(mapDetails[3]==0)
				$("#bedroom").val("不限居室");
			   else
				 $("#bedroom").val(mapDetails[3]+"+");
		   }
			queries=transURL();
			}
	hideExcept();
	reflashSavedSearch();
	$(document).click(function(e){
		e = window.event || e;
		$this = $(e.srcElement || e.target);	
		//更多搜索条件
		if($this.is("#moreBtn,#moreBtn *"))
		{
			if($this.is(".cancel")||$this.is(".confirm"))
			{
				$("#buyMoreCondition").hide();
				$("#rentMoreCondition").hide();
				return;
			}
			if($("#type").val()=="买房")
			{
				$("#buyMoreCondition").show();
				hideExcept("#buyMoreCondition");				
			}
			else if($("#type").val()=="租房")
			{
				$("#rentMoreCondition").show();
				hideExcept("#rentMoreCondition");				
			}
		}
		//保存搜索条件
		if($this.is("#search .save")||$this.is("#inputSearchName,#inputSearchName *"))
		{
			if($this.is("#saveNameCancel")||$this.is("#saveNameConfirm"))
			{
				$("#inputSearchName").hide();
				return;
			}
			//console.log(checkLogin());
			{
				var seachLeft = ($(window).width()-$("#inputSearchName").width())/2;
				var seachTop = 110;
				$("#inputSearchName").css({"left":seachLeft+'px',"top":seachTop+'px'});
				$("#inputSearchName").show();
				hideExcept("#inputSearchName");	
			}
//			else 
//			{
//				$("#login").show();
//				hideExcept("#login");
//				CoverLayer(1);
//				var loginLeft = ($(document).width()-$("#login").width())/2;
//				var loginTop = 130;
//				$("#login").css({"left":loginLeft+'px',"top":loginTop+'px'});
//			}
		}
		//点击搜索条件数字
		if($this.is(".searchSaveList,.searchSaveList *")||$this.is("#saveSearchList, #saveSearchList *"))
		{
			if($this.is(".searchSaveList,.searchSaveList *")&member>0)
			{
			var loginLeft = ($(window).width()-$("#saveSearchList").width())/2;
			var loginTop = 110;
			$("#saveSearchList").css({"left":loginLeft+'px',"top":loginTop+'px'});
			$("#saveSearchList").show();
			hideExcept("#saveSearchList");
			}

		//搜索条件列表操作
			if($this.is("#listCancel"))
			{
				$("#saveSearchList").hide();
				return;
			}
			if(member>0){
				$("#savedSearchtable").empty();
				$.getJSON("/SaveSearched.action?getSavedSearchs",function(e){
					$.each(e, function(i,item){
						var searchSaveTR="<tr id="+item.zid+"_"+item.searchId+">"
							+
						"<td class=\"listOrder\">"+(i+1)+"</td>"
						+
						"<td class=\"listName\"><a>"+item.searchTag+"</a></td>"
						+
						"<td class=\"listRename\"><a>改名</a></td>"
						+
						"<td class=\"listDel\"><a>删除</a></td>"
						+
					"</tr>";
						$("#savedSearchtable").append(searchSaveTR);
						$("#savedSearchtable tbody tr:even").css("background","#eee");
						$("#savedSearchtable tbody tr").mouseover(function(){
							$(this).parent().children().filter(":odd").css("background","#f4f4f4");
							$(this).parent().children().filter(":even").css("background","#eee");
							$(this).css("background","#edEfFF");
						});
						$("#savedSearchtable tbody tr").mouseout(function(){
							$(this).parent().children().filter(":odd").css("background","#f4f4f4");
							$(this).parent().children().filter(":even").css("background","#eee");
						});
					});
					$("#savedSearchtable .listDel a").click(function(){
						stopProp(e);
						var oPar = $(this).parents("table");
						var id=$(this).parents("tr").attr("id");
						$(this).parents("tr").remove();
						oPar.find("tr").each(function(){
							$(this).children(".listOrder").text($(this).index()+1);			
						});
						deleteByKey(id);
					});
					$("#savedSearchtable .listName").bind("click",function(){
						if(reName==0){
						stopProp(e);
						var id=$(this).parents("tr").attr("id");
						reSearch(id);
						$("#saveSearchList").hide();
						}
					});
					$("#savedSearchtable .listRename a").click(function(e){
						reName=1;
						stopProp(e);
						var sListName = $(this).parent().prev().children("a").text();
						$(this).parent().prev().children("a").remove();
						var oListNameInput = "<input class='rename' maxlength='16' type='text' value='"+sListName+"'/>";
						var id=$(this).parents("tr").attr("id");
						$(this).parent().prev()
							.append(oListNameInput)
							.children("input").focus().select()
							.bind("blur",function(){
								var newListName = $(this).val();
								var oPar = $(this).parent();
								$(this).remove();
								var oListA = "<a>"+newListName +"</a>";
								oPar.append(oListA);
								updateSavedSearch(id,newListName);
								reName=0;
						});
					});
				  });
				}
				else if(member==0)
					{
					alert("您没有任何保存的搜索条件，请您先保存。。。");
					}
				else
					{
					alert("您可能已经断开网络连接，请查看你的网络设置。。。");
					}
			$("#saveSearchList .listDel a").click(function(){
				stopProp(e);
				var oPar = $(this).parents("table");
				$(this).parents("tr").remove();
				oPar.find("tr").each(function(){
					$(this).children(".listOrder").text($(this).index()+1);			
				});
			});	
		};
		});
	$("#type").click(function(){
		if($(this).val()=="买房")
		{
			$(this).val("租房");
			$("#price").val("");
		}
		else if($(this).val()=="租房")
		{
			$(this).val("买房");
			$("#price").val("");
		}
		
	});
	$(".require input").not("#type").focus(function(){
		if($(this).is("#price")&&$("#type").val()=="租房")
		{
			$(this).next("ul").next("ul").fadeIn(200);
			return;
		}
		else
		{
			$(this).next("ul").fadeIn(200);	
		}
		hideExcept();
		});
	$(".require input").blur(function(){
		$(this).next("ul").fadeOut(200);		
	});
	//$(*).placeholder();
	//$(*).placeholder();
	//$(*).placeholder();
	
	$("#buyMoreCondition").hide();
	
	$("#search .select_list li").mouseover(function(){
		$(this).addClass("hover");		
		});
	$("#search .select_list li").mouseout(function(){
		$(this).removeClass("hover");		
		});
	$("#search .select_list li").click(function(){
		var inVal = $(this).text();		
		var outVal = $(this).parent().parent().children("input").val();
		$(this).parent().parent().children("input").val(inVal);
		
		$(".select_list").hide();
	});

	
	$("#buyMoreCondition").find("dd").click(function(){
		$(this).parent().children("dd").removeClass("on");
		$(this).addClass("on");
		if($(this).parent().hasClass("notInOrder"))
		{
			switch($(this).text())
			{
			case "不限":
				$(this).parent().children("input").val(0);
				break;
			case "5年内":
				$(this).parent().children("input").val(5);
				break;
			case "10年内":
				$(this).parent().children("input").val(10);
				break;
			case "15年内":
				$(this).parent().children("input").val(15);
				break;
			}
		}
		else
		{
			$(this).parent().children("input").val($(this).parent().children("dd").index($(this)));
		}
	});
	
	$("#rentMoreCondition").find("dd").click(function(){
		$(this).parent().children("dd").removeClass("on");
		$(this).addClass("on");
		if($(this).parent().hasClass("notInOrder"))
		{
			switch($(this).text())
			{
			case "不限":
				$(this).parent().children("input").val(0);
				break;
			case "5年内":
				$(this).parent().children("input").val(5);
				break;
			case "10年内":
				$(this).parent().children("input").val(10);
				break;
			case "15年内":
				$(this).parent().children("input").val(15);
				break;
			}
		}
		else
		{
			$(this).parent().children("input").val($(this).parent().children("dd").index($(this)));
		}
	}); 
	$("#saveSearchList .listRename a").click(function(){
		var sListName = $(this).parent().prev().children("a").text();
		$(this).parent().prev().children("a").remove();
		var oListNameInput = "<input class='rename' type='text' value='"+sListName+"'/>";
		$(this).parent().prev().append(oListNameInput);
		$(this).parent().prev().children("input").focus().select();
		
		$("#saveSearchList .listName input").bind("blur",function(){
			//alert(1);
			var sListName2 = $(this).val();
			var oPar = $(this).parent();
			$(this).remove();
			var oListA = "<a>"+sListName2+"</a>";
			oPar.append(oListA);
		});
	});
	$("#pages .first").click(function()
			{
		firstPage();
			}
			);
	$("#pages .next").click(function()
			{
		nextPage();
			}
			);
	$("#pages .prev").click(function()
			{
		prevPage();
			}
			);
	$("#pages .last").click(function()
			{
		lastPage();
			}
			);
	$(".broker").bind("click",function()
			{
		var keywords=$("#keywords").val();
		 var houseType=$("#type").val();
		 var budget=$("#price").val();
		 var bedroom=$("#bedroom").val();
		alert(houseType+"_"+keywords+"_预算："+budget+"_居室："+bedroom+"\n提请专业人士为您找房！");
			});
	$(".search").bind("click",function(){
		var keywords=$("#keywords").val();
		 var houseType=$("#type").val();
		 var budget=$("#price").val();
		 budget=budget.replace(/\D/g,"");
		 var bedroom=$("#bedroom").val();
		 if(houseType=="买房")
			 {
			 houseType=1;
			 }
		 else
			 {
			 houseType=2;
			 }
		  bedroom=bedroom.replace(/\D/g,"");
		$.getJSON(
	    		"/Layout.action?search",
	    		{
	    		 bedRoom:bedroom,
	    		 contactType:houseType,
	    		 budget:budget,
	    		 keywords:encodeURI(keywords)
	    		},
	    		function(e)
	    			{
	    			   $("#communityList").empty();
	    				$.each(e.Layouts,function(i,item){
	    					 var  url=""+residenceIds[i];
	    					 var defaultPic = "";
	    					 $.ajax({
	    						 url:'UserSearch.action?getDefaultResidenceImage',
	    						 type:"post",
	    						 data:{residenceId:item.residenceId},
	    						 dataType:"json",
	    						 async:false,
	    						 success:function(data,textstatus) {
	    							 defaultPic = data.pic;
	    						 }
	    					 });
	    			        var sell="<div id='"+item.residenceId+"'><dl class=\"sellDL clearfix\">"
	    						+"<dt>"
	    						+"<img width=\"104\" height=\"78\" src=\""+defaultPic+"\">"
	    						+"</dt>"
	    						+"<dd class=\"name\">"
	    						+"<a href='/110000/residence/page/"+Math.floor(item.residenceId/100)+"/"+item.residenceId+".html''>"+item.residenceName+"</a>"
	    						+"</dd>"
	    						+"<dd class=\"price\">单价："+item.unitPrice+"万元/平米</dd>"
	    						+"<dd class=\"layout\" title=\"1居，2居，3居，4居\">"
	    						+
	    						"1居，2居，3居，4居"
	    						+"</dd>"
	    					    +"</dl></div>";
	    			        $("#communityList").append(sell);
	    			        $("#communityList").find("div").bind("click",function()
	    			        		{
	    			        	  var listInfo=houseType+"_"+budget+"_"+bedroom+"_"+this.id;
	    			    		  $.cookie("listInfo", listInfo, {
	    			                  expire: -1
	    			              });
	    			        	window.location="/110000/residence/page/"+Math.floor(this.id/100)+"/"+this.id+".html";
	    			        		});
	    				});
	    			}
	    			);		
		});
});



	
