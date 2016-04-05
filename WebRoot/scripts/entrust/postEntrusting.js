var changeResidenceFlag = 0; //是否进行门店修改的标志 0 代表不修改 1 代表可以修改
var entrustFlag = "false";
var add;
var bidListTrue = "";
var selectedResidenceName = "";
var cityName = "";
var changeCityFlag2 = 0;
function postTrueEntrusting(bidList) {
	bidListTrue = bidList;
	$.ajax({
		url:"/EntrustingOperator.action?postEnturstTrue",
		dataType:"json",
		type:"post",
		data:{trueBid:bidListTrue}
	});
}
//************************************玲姐部分  开始****************************************************************
function moveUl(_wrap,_moving){
	 //_wrap = ulID;
	 var _interval=2000;//定义滚动间隙时间
	 //var _moving;//需要清除的动画
	 _wrap.hover(function(){
		 clearInterval(_moving);//当鼠标在滚动区域中时,停止滚动
	 },function(){
	  _moving=setInterval(function(){
	   var _field=_wrap.find('li:first');//此变量不可放置于函数起始处,li:first取值是变化的
	   var _h=_field.height();//取得每次滚动高度(多行滚动情况下,此变量不可置于开始处,否则会有间隔时长延时)
	   _field.animate({marginTop:-_h+'px'},600,function(){//通过取负margin值,隐藏第一行
	_field.css('marginTop',0).appendTo(_wrap);//隐藏后,将该行的margin值置零,并插入到最后,实现无缝滚动
	   })
	  },_interval)//滚动间隔时间取决于_interval
	 }).trigger('mouseleave');//函数载入时,模拟执行mouseleave,即自动滚动
}
//****************************************玲姐部分  结束************************************************************

$(function() {
	if($("#choseCity2").length > 0) {
		if($("#choseCity2").val() != "") {
			changeCityFlag2 = 1;
			cityName = $("#choseCity2").val();
		}
	}
	//************************************玲姐部分  开始****************************************************************
	$(document).click(function(e){
		e = window.event || e;
  		$this = $(e.srcElement || e.target);
		if(!$this.is("#county,#county *")&&!$this.is("#countyInput,#countyInput *")&&!$this.is("#circle,#circle *")&&!$this.is("#circleInput,#circleInput *"))
		{
			$("#county").hide();
			$("#circle").hide();
		}

		});
	$("#relaBox li").mouseenter(function(){
		$(this).addClass("hover");
		});
	$("#relaBox li").mouseleave(function(){
		$(this).removeClass("hover");
		});
	$("#countyInput").focus(function(){
		if($("#choseCity2").val() == "") {
			$("#choseCity2").focus();
			$(this).blur();
		} else {
			$("#circleInput").removeClass("inputOn");
			$(this).addClass("inputOn");
			var cityCode = $("#cityCode").val();
			if(changeCityFlag2 == 0) {
				$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的城市中进行选择");
				return false;
			}
			$.ajax({
				url:"/SaleHomeController.action?showDistrictList",
				data:{cityCode:cityCode},
				dataType:"json",
				async:false,
				success:function(data, textStatus) {
					if($.trim(data.status) == "y") {
						$("#county").children().remove();
						$.each(data.BL, function(index, item) {
							$("#county").append("<li param='"+ item.district_code+"'>"+item.district_name+"</li>");
						});
						$("#county").show();
						$("#county li").bind('click',function(e){
							stopProp(e);
							$("#countyInput").val($(this).text());
							$("#districtCode").val($(this).attr("param"));
							$("#circleInput").val("");
							$("#bizcircleCode").val("");
							if($("#circleInput").val().length>0){
								$("#circleInput").val("");
								$("#bizcircleCode").val("");
							}
							$("#countyInput").change();
							$("#countyInput").blur();
							$("#circleInput").val("");
							var districtCode = $.trim($("#districtCode").val());
							var cityCode = $("#cityCode").val();
							if(changeCityFlag2 == 0) {
								$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的城市中进行选择");
								return false;
							}
							$(this).siblings().removeClass("on")
								.end().addClass("on")
								.parent().hide();
							$("#countyInput").removeClass("inputOn");
							$("#circleInput").addClass("inputOn");
							$.ajax({
								url:"/SaleHomeController.action?showBizcircleList",
								data:{districtCode:districtCode,cityCode:cityCode},
								dataType:"json",
								async:false,
								success:function(data, textStatus) {
									if($.trim(data.status) == "y") {
										$("#circle").children().remove();
										$.each(data.BL, function(index, item) {
											$("#circle").append("<li param='"+ item.bizcircle_code+"'>"+item.bizcircle_name+"</li>");
										});
										$("#circle li").not(".charater").bind('click',function(e){
											stopProp(e);
											$("#circleInput").val($(this).text());
											$("#bizcircleCode").val($(this).attr("param"));
											$("#circleInput").change();
											//alert($("#circleInput").val());
											$(this).siblings().removeClass("on")
												.end().addClass("on")
												.parent().hide();
											$("#circleInput").removeClass("inputOn").blur();
											});
										return true;
									} else if($.trim(data.status) == "n") {
										$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
										return false;
									} else if($.trim(data.status) == "e") {
										$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
										window.location.href = "/UserSearch.action?toHome";
										return false;
									}
								} 
							});
							});
						return true;
					} else if($.trim(data.status) == "n") {
						$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
						return false;
					}
				} 
			});
			//$("#county").show();
			$("#circle").hide();
		}
		});
	$("#circleInput").focus(function(){
		if($("#countyInput").val()=="")
		{	$("#county").empty();
			$("#countyInput").focus();
			
			$(this).blur();
		}
		else
		{
			$("#countyInput").removeClass("inputOn");
//			$(this).addClass("inputOn");
//			$("#circle").show();
			$("#county").hide();
			var districtCode = $.trim($("#districtCode").val());
			var cityCode = $("#cityCode").val();
			if(changeCityFlag2 == 0) {
				$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的城市中进行选择");
				return false;
			}
			$("#countyInput").removeClass("inputOn");
			$("#circleInput").addClass("inputOn");
			$.ajax({
				url:"/SaleHomeController.action?showBizcircleList",
				data:{districtCode:districtCode,cityCode:cityCode},
				dataType:"json",
				async:false,
				success:function(data, textStatus) {
					if($.trim(data.status) == "y") {
						$("#circle").children().remove();
						$.each(data.BL, function(index, item) {
							$("#circle").append("<li param='"+ item.bizcircle_code+"'>"+item.bizcircle_name+"</li>");
						});
						$("#circle li").not(".charater").bind('click',function(e){
							stopProp(e);
							$("#circleInput").val($(this).text());
							$("#bizcircleCode").val($(this).attr("param"));
							$("#circleInput").change();
							//alert($("#circleInput").val());
							$(this).siblings().removeClass("on")
								.end().addClass("on")
								.parent().hide();
							$("#circleInput").removeClass("inputOn").blur();
							});
						$("#circle").show();
						return true;
					} else if($.trim(data.status) == "n") {
						$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
						return false;
					} else if($.trim(data.status) == "e") {
						$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
						window.location.href = "/UserSearch.action?toHome";
						return false;
					}
				} 
			});
		}
		});
	$("#county li").click(function(e){
		stopProp(e);
		$("#countyInput").val($(this).text());
		$("#districtCode").val($(this).attr("param"));
		$("#circleInput").val("");
		$("#bizcircleCode").val("");
		if($("#circleInput").val().length>0){
			$("#circleInput").val("");
			$("#bizcircleCode").val("");
		}
		$("#countyInput").change();
		$("#countyInput").blur();
		$("#circleInput").val("");
		$("#bizcircleCode").val("");
		var districtCode = $.trim($("#districtCode").val());
		var cityCode = $("#cityCode").val();
		if(changeCityFlag2 == 0) {
			$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示的城市中进行选择");
			return false;
		}
		$(this).siblings().removeClass("on")
			.end().addClass("on")
			.parent().hide();
		$("#countyInput").removeClass("inputOn");
		$("#circleInput").addClass("inputOn");
		$.ajax({
			url:"/SaleHomeController.action?showBizcircleList",
			data:{districtCode:districtCode,cityCode:cityCode},
			dataType:"json",
			async:false,
			success:function(data, textStatus) {
				if($.trim(data.status) == "y") {
					$("#circle").children().remove();
					$.each(data.BL, function(index, item) {
						$("#circle").append("<li param='"+ item.bizcircle_code+"'>"+item.bizcircle_name+"</li>");
					});
					$("#circle li").not(".charater").bind('click',function(e){
						stopProp(e);
						$("#circleInput").val($(this).text());
						$("#bizcircleCode").val($(this).attr("param"));
						$("#circleInput").change();
						//alert($("#circleInput").val());
						$(this).siblings().removeClass("on")
							.end().addClass("on")
							.parent().hide();
						$("#circleInput").removeClass("inputOn").blur();
						});
					$("#circle").show();
					return true;
				} else if($.trim(data.status) == "n") {
					$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
					return false;
				} else if($.trim(data.status) == "e") {
					$("#circleInput").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
					window.location.href = "/UserSearch.action?toHome";
					return false;
				}
			} 
		});
		
		});
	$("#circle li").not(".charater").click(function(e){
		stopProp(e);
		$("#circleInput").val($(this).text());
		$("#circleInput").change();
		$(this).siblings().removeClass("on")
			.end().addClass("on")
			.parent().hide();
		$("#circleInput").removeClass("inputOn");
		});
	
	$(".secR li").click(function(){
		$(this).addClass("on")
			.siblings().removeClass("on");
		if($(this).parents('.secR').attr("id")=='rentOrBuy'){
			$("#entrustintListType").val($(this).index()+1);
			if($(this).index()=='0')
			{
				$("#budget").text("总价预算:");
				$(".sellSpan").show();
				$(".rentSpan").hide();
			}
			else if($(this).index()=='1')
			{
				$("#budget").text("月租金预算:");
				$(".sellSpan").hide();
				$(".rentSpan").show();
			}
		}
		if($(this).parents('.secR').attr("id")=='range'){
			if($(this).index()=='0'){
				$(".communityDiv").show();
				$(".circleDiv").hide();
				$("#bizcircleCode").val('');
				$('#districtCode').val('');
				$("#countyInput").val('');
				$('#circleInput').val('');
			}
			else{
				$(".circleDiv").show();
				$(".communityDiv").hide();
				$("#commuInput").val('');
				$('#residenceId').val('');
			}
		}
	});
//	$("input.select").click(function(){
//		$(this).next(".selectList").show();
//		});
//	$(".selectList li").mouseenter(function(){
//		$(this).addClass("over")
//			.siblings().removeClass("over");		
//		});
//	$(".selectList li").mouseleave(function(){
//		$(this).removeClass("over");
//		});
	$(".selectList li").click(function(){
		//$(this).parent().prev(".select").val($(this).text());
		var n;
		if($(this).index()==0)
		{
			n=7;
		}
		else if($(this).index()==1)
		{
			n=15;
		}
		else if($(this).index()==2)
		{
			n=30;
		}
		$("#dayTime").val(n);
		//alert($(this).parents(".divLine").children("input:hidden").val());
		//$(this).parent().hide();
		});
	var commuContent;
	$(".commuSubmit").click(function(){
		commuContent = $(this).prev().val();
		$(this).parent().children("span").text("");
		if(commuContent=="")
		{
			$(this).parent().children("span").removeClass("Validform_right").addClass("Validform_wrong").text("不能为空");
		}
		else
		{
			$(this).prev().val("");
			if(entrustFlag == "true") {
				commuAdd(commuContent,$(this).parent().children("ul"),$(this).prev());
				$(this).parent().children("span").removeClass("Validform_wrong").addClass("Validform_right").text("");
			} else {
				$(this).parent().children("span").removeClass("Validform_right").addClass("Validform_wrong").text("所选小区不在服务范围");
			}
		}
	});
	$(".conmunityTags .commuC").click(function(){
		$chosen = $(this).parent();
		$(this).parent()
			.siblings("span").text("")
			.end().end()
			.remove();
		initCommu();
		changeResidenceFlag = 1;
		$("#community").val(getCommunityVal($chosen)).change();
		});
	fnTextVerify($(".divCommunity textarea"),$(".divCommunity .num"),200);
	
	var x,y;
	moveUl($('#firstEntrust'),x);
	moveUl($('#secondEntrust'),y);
	//****************************************玲姐部分  结束************************************************************
	
	
	$("#postEntrust").click(function() {
		var isCircle = $.trim($("#bizcircleCode").val());
		var isResidence = $.trim($("#commuInput").val());
		if(isCircle == "" && isResidence == "") {
			var Qs="<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>请选择商圈或小区</p></div><div class='popLine '><button id='question' class='confirmBtn btn btn-success onlyBtn'>确认</button></div></div>";
			popBox($(Qs),".confirmBtn");
			return false;
		}
//		var isNotNull = $("#community").val();
//		if(isNotNull == "" || isNotNull == null) {
//			$("#community").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("请选择小区");
//		}
		$.ajax({
			url:"/UserCenterController.action?checkLoginStatus",
			dataType:"json",
			async:false,
			success:function(data, status) {
				if(data.status == "e"){
					$("#loginBtn").click();
				} else if(data.status == "y"){
					if($.trim($("#commuInput").val()) != "") {
						if(entrustFlag== "false") {
							$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请在提示列表中选择小区");
							return false;
						} else {
							$("#commuInput").next().removeClass("Validform_wrong").addClass("Validform_right").text("");
							add.submitForm(false,"/EntrustingOperator.action?postEntrusting");
						}
					} else {
						$("#commuInput").attr("ignore","ignore");
						$("#commuInput").next().removeClass("Validform_wrong").addClass("Validform_right").text("");
						add.submitForm(false,"/EntrustingOperator.action?postEntrusting");
					}
				}
			}
		});
	});
	add = $("#addEntrustingForm").Validform({
		tiptype:4, 
		ignoreHidden:true,
		ajaxPost:true,
		datatype:{
			"bedRoom":function(gets,obj,curform,regxp) {
				var bedRoom = parseInt(gets);
				if(isNaN(bedRoom)) {
					return "请输入1-9之间的数字";
				}
				if(bedRoom > 0 && bedRoom <= 9) {
					return true;
				} else {
					return "请输入1-9之间的数字";
				}
			},
			"livingRoom":function(gets,obj,curform,regxp) {
				var livingRoom = parseInt(gets);
				if(isNaN(livingRoom)) {
					return "请输入0-9之间的数字";
				}
				if(livingRoom >= 0 && livingRoom <= 9) {
					return true;
				} else {
					return "请输入0-9之间的数字";
				}
			},
			"bathRoom":function(gets,obj,curform,regxp) {
				var bathRoom = parseInt(gets);
				if(isNaN(bathRoom)) {
					return "请输入0-9之间的数字";
				}
				if(bathRoom >= 0 && bathRoom <= 9) {
					return true;
				} else {
					return "请输入0-9之间的数字";
				}
			},
			"floorArea":function(gets,obj,curform,regxp) {
				var floorArea = parseInt(gets);
				if(isNaN(floorArea)) {
					return "请输入0-65535之间的数字";
				}
				if(floorArea > 0 && floorArea < 65536) {
					return true;
				} else {
					return "请输入0-65535之间的数字";
				}
			},
			"price":function(gets,obj,curform,regxp) {
				var price = parseInt(gets);
				if(isNaN(price)) {
					return "请输入1-999999之间的数字";
				}
				if(price < 1 || price >= 1000000) {
					return "请输入1-999999之间的数字";
				} else {
					return true;
				}
			}
		},
		callback:function(data) {
			if(data.status == "y") {
				postTrueEntrusting(data.bidList);
				$(".resetBid").val("");
				var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>提交成功</p></div><div class='popLine '><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
				popBox($(Qs),".confirmBtn");
				//window.location.href = "/EntrustingController.action?goToEntrustingListView";
			} else if(data.status == "n") {
				$("#commuInput").next().removeClass("Validform_right").addClass("Validform_wrong").text(data.info);
				if(data.budgetStatus == "n") {
					var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>" + data.budgetInfo + "</p></div><div class='popLine '><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
					popBox($(Qs),".confirmBtn");
				} 
				if(data.commentStatus == "n") {
					var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>" + data.commentInfo + "</p></div><div class='popLine '><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
					popBox($(Qs),".confirmBtn');
				} 
				if(data.bedRoomStatus == "n") {
					var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>" + data.bedRoomInfo + "</p></div><div class='popLine '><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
					popBox($(Qs),".confirmBtn');
				}
				if(data.residenceListStatus == "n") {
					var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>" + data.residenceListInfo + "</p></div><div class='popLine '><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
					popBox($(Qs),".confirmBtn');
				}
			} else if(data.status == "e") {
				window.location.href = "/";
			}
	}
	});
	
	$("#cancelEntrust").click(function () {
		add.resetForm();
	});
	if($("#residenceId").val() != "") {
		entrustFlag = "true";
	}
	
	
	//选择小区  有策略 还没实现，把数据放缓存里 http://www.iteye.com/topic/1117898 scripts/residence.json
	var cacheResidence = {};	//小区缓存
	var chosenResidencePool = {}; //保存已选择的小区
	$("#commuInput").autocomplete({
		minLength: 0,
		width: 318,
		autoFocus: true,
		source: function( request, response ) {
			var term = request.term;
			if(term in cacheResidence) {
				response($.map(cacheResidence[term], function(item, index) {
					chosenResidencePool = cacheResidence[term];
					//alert(JSON.stringify(item));
					return {
						label: item.residenceName,
	                    value: item.residenceId
	              }
	            }));	
				return;
			}
      $.ajax({
          url: '/EditBrokerInfo.action?getResidenceListByCityCode',
          data: {cityCode: encodeURIComponent($("#cityCode").val()),keyword:encodeURIComponent(request.term)},
          type: 'post',
          dataType: "json",
          success: function(data, status, xhr) {
        	  cacheResidence[term] = data;
        	  chosenResidencePool = data;
			response($.map(data, function(item, index) {
				
				return {
					label: item.residenceName,
                    value: item.residenceId
              }
            }));												
          },
          error: function(data) {
        	//alert(JSON.stringify(data));
          }
      });
		},
		select: function( event, ui ) {
			event.preventDefault();
			$("#residenceId").val(ui.item.value);
			this.value = String(ui.item.label).substring(0, String(ui.item.label).indexOf("("));
			selectedResidenceName = this.value;
			entrustFlag= "true";
			$("#commuInput").blur();
		}			
	}).focus(function() {
	    $(this).autocomplete("search", "");
	}).change(function() {
		if($(this).val() != selectedResidenceName) {
			entrustFlag = "false";
		}
	});
//	$("#commuInput").blur(function() {
//		var goTo = 0;
//		$.each(cacheResidence, function(index, item) {
//			goTo = 1;
//			entrustFlag= "false";
//			$.each(item, function(i, it) {
//				var residenceName = String(it.residenceName).substring(0, String(it.residenceName).indexOf("("))
//				if(residenceName == $.trim($("#commuInput").val())) {
//					entrustFlag= "true";
//					return false;
//				} else {
//					entrustFlag= "false";
//				}
//			});
//			if(entrustFlag == "true") {
//				return false;
//			}
//		});
//		if(goTo == 0) {
//			entrustFlag= "false";
//			return false;
//		}
//	});
	$("#cityCode").change(function() {
		cacheResidence = {};
		$("#county").empty();
	});
	//选择城市2
	var cacheCity2 = {};
	var chosenCityPool2 = {};
	$("#choseCity2").autocomplete({
		minLength: 0,
		width: 318,
		autoFocus: true,
		source: function( request, response ) {
			changeCityFlag2 = 0;
			var term = request.term;
			if(term in cacheCity2) {
				response($.map(cacheCity2[term], function(item, index) {
					chosenCityPool2 = cacheCity2[term];
					//alert(JSON.stringify(item));
					return {
						label: item.cityName,
	                    value: item.cityCode
	              }
	            }));	
				return;
			}
      $.ajax({
          url: '/UserCenterController.action?getCityList',
          type: 'post',
          dataType: "json",
          data: {keyword:encodeURIComponent(request.term)},
          success: function(data, status, xhr) {
        	  cacheCity2[term] = data.data;
        	  chosenCityPool2 = data.data;
			response($.map(data.data, function(item, index) {
				return {
					label: item.cityName,
                    value: item.cityCode
              }
            }));												
          },
          error: function(data) {
          }
      });
		},
		select: function( event, ui ) {
			event.preventDefault();
			changeCityFlag2 = 1;
			cityName = ui.item.label;
			$("#cityCode").val(ui.item.value).change();
			this.value = ui.item.label;
			$("#choseCity2").blur();
		}
	}).focus(function() {
	    $(this).autocomplete("search", "");
	}).change(function() {
		if($(this).val() != cityName) {
			$("#cityCode").val("");
			$("#cityCode").val("").change();
			$("#bizcircleCode").val("");
			$("#districtCode").val("");
			changeCityFlag2 = 0;
		}
	});		
	
});

