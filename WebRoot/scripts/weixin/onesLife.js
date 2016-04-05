$(function() {
	life.init();
//	$("#post").click(function() {
	$("#post").bind("tap", function() {
		if(life.liveLngLat1 == "") {
			alert("请输入居住地点");
		} else if(life.workplaceLngLat1 == "") {
			alert("请输入工作地点");
		} else {
			$("#allResault,#curResault").empty();
			$("#allResault").hide();
			$("#curResault").show();
			life.getOnesLife();
		}
	});
	$("#workplaceLngLat,#liveLngLat").focus(function() {
		$(window).scrollTop($(this).offset().top - 60);
	});
	
	$(".zgIcon-remove").click(function(){
	     $(this).siblings('input').val('');
	     $(this).addClass("hide");
	});
});
var life = {
	//角色
	role: 2,
	workplaceFlag: "false",
	liveFlag: "false",
	//选择的居住地点
	selectedResidenceName: "",
	//选择工作地点
	selectedWorkplace: "",
	//小区缓存
	cacheResidence: {},
	//保存已选择小区
	chosenResidencePool: {},
	// 0 代表小区不在提示列表中，1 代表小区在提示列表中
	changeResidenceFlag: 0,
	// 居住地的经纬度
	liveLngLat1: "",
	// 工作地的经纬度
	workplaceLngLat1: "",
	// 居住小区编号
	rid1: 0,
	//初始化出租操作处理函数
	init: function() {
		life.residenceAutocomplete($("#liveLngLat"));
		life.keywordSuggestion($("#workplaceLngLat"));
	},
	//计算各种配件
	calCupAccount: function(time) {
		//球赛
		var match = time / 110 >= 1 ? Math.ceil(time / 110) : 0;
		//书
		var book = time / (30 * 60) >= 1 ? Math.ceil(time / (30 * 60)) : 0;  
		//电影
		var cinema = time / 90 >= 1 ? Math.ceil(time / 90) : 0;
		var content = "<p>"; 
		if(match != 0) {
			content += "<strong>" + match + "</strong><q>场</q><span class='zgIcon zgIcon-football'></span>";
		}
		if(book != 0) {
			content += "<strong>" + book + "</strong><q>本</q><span class='zgIcon zgIcon-book'></span>";
		}
		if(cinema != 0) {
			content += "<strong>" + cinema + "</strong><q>部</q><span class='zgIcon zgIcon-movie'></span>";
		}
		if(match == 0 && book == 0 && cinema == 0) {
			content = "";
		} else {
			content += "</p>";
		}
		return content;
	},
	//获得等级信息
	getOnesLife: function() {
		if(life.liveFlag == "false") {
			alert("请在下拉列表中选择一个居住地点");
			return false;
		} else if(life.workplaceFlag == "false") {
			alert("请输入工作地");
			return false;
		}
		$.showLoading("处理中...");
		$.ajax({
	          url: "/Spread.action?getMyLife",
	          data:{workplaceLngLat: life.workplaceLngLat1, liveLngLat: life.liveLngLat1, workplace: life.selectedWorkplace, rid: life.rid1},
	          type: 'post',
	          dataType: "json",
	          async: false,
	          success: function(json) {
	        	$.hideLoading();
	        	if(json.status == "n") {
	        		alert(json.info);
	  			} else {
	  				var highDuration = json.highDuration;
	  				var middleDuration = json.middleDuration;
	  				var lowDuration = json.lowDuration;
	  				var curDuration = json.curDuration;
	  				var index = json.index;
	  				var level = json.level;
	  				life.fillCurrContent(curDuration, lowDuration, middleDuration, highDuration, level, index);
	  				life.fillAllContent(curDuration, lowDuration, middleDuration, highDuration, level, index);
	  			}									
	          },
	          error:function(error){
	        	  $.hideLoading();
	          }
	     });
	},
	//填充当前内容
	fillCurrContent: function(curDuration, lowDuration, middleDuration, highDuration, level, index) {
		if(level == 1) {
			$("#curResault").append(life.fillHighContent(lowDuration, curDuration, index, level));
		} else if(level == 2) {
			$("#curResault").append(life.fillMiddleContent(lowDuration, curDuration, index, level));
		} else if(level == 3) {
			$("#curResault").append(life.fillLowContent(curDuration, highDuration, index, level));
		} else {
			$("#curResault").append(life.fillAlienContent());
		}
		$("#curResault").append("<button id='showAllResaultBtn'><span class='zgIcon zgIcon-chevron-circle-down'></span>看看他们怎么活</button>");
//		$("#showAllResaultBtn").click(function(){
		$("#showAllResaultBtn").bind("tap", function() {
		    $("#curResault").hide();
		    $("#allResault").show();
		});
		
	},
	//填充所有内容
	fillAllContent: function(curDuration, lowDuration, middleDuration, highDuration, level, index) {
		if(level == 1) {
			$("#allResault").append(life.fillLowContent(lowDuration, highDuration, -1, level));
			$("#allResault").append(life.fillMiddleContent(lowDuration, middleDuration, -1, level));
			$("#allResault").append(life.fillHighContent(lowDuration, curDuration, index, level));
		} else if(level == 2) {
			$("#allResault").append(life.fillLowContent(lowDuration, highDuration, -1, level));
			$("#allResault").append(life.fillMiddleContent(lowDuration, curDuration, index, level));
			$("#allResault").append(life.fillHighContent(lowDuration, highDuration, -1, level));
		} else if(level == 3) {
			$("#allResault").append(life.fillLowContent(curDuration, highDuration, index, level));
			$("#allResault").append(life.fillMiddleContent(lowDuration, middleDuration, -1, level));
			$("#allResault").append(life.fillHighContent(lowDuration, highDuration, -1, level));
		} else {
			$("#allResault").append(life.fillLowContent(lowDuration, highDuration, -1, level));
			$("#allResault").append(life.fillMiddleContent(lowDuration, middleDuration, -1, level));
			$("#allResault").append(life.fillHighContent(lowDuration, highDuration, -1, level));
			$("#allResault").append(life.fillAlienContent());
		}
		
	},
	
	//填充神人 鸟人时间，神人时间，index评分
	fillHighContent : function(lowDuration, highDuration, index, level) {
		var content = "";
		gaps = lowDuration == 0 ? highDuration : (lowDuration - highDuration) * 2 * 260;
		if(highDuration) {
			var objective = "你";
			if(level != 1) {
				objective = "他";
			}
			var levelStr = "神人";
			var pStr = "<p>哦滴个神来，" + objective + "居然可以活得如此神奇。</p>";
			var pStr1 = "<p>" + objective + "懂得生活且有能力去创造、去享受自己想要的生活。这大概就是传说中很多人想活成的样子。除了" + objective + "，也真是没SEI了！</p>";
			if(level != 1) {
				pStr = "";
			}
			if(index > 0 && index <= 40) {
				levelStr = "自嗨神";
				pStr = "<p>效率不代表品质，生活不需要假嗨。</p><p>追求效率无可厚非，但是我们希望" + objective + "能更疼爱自己一些。住得更好，" + objective + "能的。</p>";
				pStr1 = "";
			} else if(index >= 90) {
				levelStr = "真神";
				pStr = "<p>" + objective + "来了，" + objective + "来过。</p><p>快说说，" + objective + "怎么可以活得这么神~</p>";
				pStr1 = "";
			}
			content = "<div class='testResault_text'>" +
				"<h4><img src='/images/weixin/m3.png' alt='" + levelStr + "' />" + levelStr + "<q>的生活</q></h4>" +
				pStr +
				"<p>如此1年后，" + objective + "比鸟人们多获得<b>" + (lowDuration == 0 ? lowDuration : (lowDuration - highDuration) * 2 * 260) + "</b>mins生命时间。这些时间可以转化为</p>" +
						life.calCupAccount(gaps) + 
				pStr1 +
				"</div>";
		}
		return content;
	},
	//填充达人  鸟人时间，达人时间，综合评分
	fillMiddleContent : function(lowDuration, middleDuration, index, level) {
		var content = "";
		gaps = lowDuration == 0 ? middleDuration : (lowDuration - middleDuration) * 2 * 260;
		if(middleDuration) {
			var objective = "你";
			if(level != 2) {
				objective = "他";
			}
			var levelStr = "达人";
			var pStr = "<p>恭喜" + objective + "，找到了适合自己的土壤。</p>";
			var pStr1 = "<p>" + objective + "是一个追求效率，兼顾生活品质的家伙。</p><p>继续修炼在平凡之路上，这样的生活平淡却很真实，不错哦！VIA~~~VIA</p>";
			if(level != 2) {
				pStr = "";
			}
			if(index > 0 && index <= 40) {
				levelStr = "入门达人";
				pStr = "<p>一入达门，便是同道。</p><p>请阁下务必保持精修之心，不断向着更好的生活挺进。</p>";
			} else if(index >= 90) {
				levelStr = "高级达人";
				pStr = "<p>没错，再进一步，你就是神。</p><p>时间由你掌控，精彩随" + objective + "切换，如同自发光体一样穿梭在工作与生活的舞台上,Blingbling!</p>";
			} 
			content = "<div class='testResault_text'>" +
			"<h4><img src='/images/weixin/m2.png' alt='" + levelStr + "' />" + levelStr + "<q>的生活</q></h4>" +
			pStr +
			"<p>如此1年后，" + objective + "比鸟人们多获得<b>" + (lowDuration == 0 ? lowDuration : (lowDuration - middleDuration) * 2 * 260) + "</b>mins生命时间。这些时间可以转化为</p>" +
					life.calCupAccount(gaps) + 
		    pStr1 +
			"</div>";
		}
		return content;
	},
	//填充鸟人 鸟人时间，神人时间，综合评分
	fillLowContent : function(lowDuration, highDuration, index, level) {
		var content = "";
		gaps = lowDuration == 0 ? highDuration : (lowDuration - highDuration) * 2 * 260;
		if(lowDuration) {
			var objective = "你";
			if(level != 3) {
				objective = "他";
			}
			var levelStr = "鸟人";
			var pStr = "<p>时间就是命啊亲！</p>";
			if(level != 3) {
				pStr = "";
			}
			if(index >= 90) {
				levelStr = "超级鸟人";
				pStr = "<p>长翅膀的不止燕雀，心如鸿鹄的" + objective + "有着自己对生活的坚持：品质高于一切。" + objective + "有着和神人一样的心态，愿" + objective + "不断振翅，早日跨越理想与现实的时差，活得更拉风&更自在。</p>";
			} 
			content = "<div class='testResault_text'>" +
				"<h4><img src='/images/weixin/m1.png' alt='" + levelStr + "' />" + levelStr + "<q>的生活</q></h4>" +
				pStr + 
				"<p>目前" + objective + "每天花<b>" + lowDuration * 2 + "</b>mins在交通上。</p>" +
				"<p>如此1年后，" + objective + "比神人们多耗费<b>" + (lowDuration == 0 ? lowDuration : (lowDuration - highDuration) * 2 * 260) + "</b>mins生命时间。这些时间可以转化为</p>" +
						life.calCupAccount(gaps) + 
				"</div>";
		}
		return content;
	},
	//填充外星人
	fillAlienContent: function() {
		var content = "";
		content = "<div class='testResault_text'>" +
			"<h4><img src='/images/weixin/m4.png' alt='外星人' />外星人<q>的生活</q></h4>" +
			"<p>#￥%……%&……</p>" +
			"<p>哥们，人性繁华的地球已经不适合你了。</p>" +
			"<p>握个手吧。再见。</p>" +
			"</div>";
		return content;
	},
	
	//自动补齐小区
	residenceAutocomplete: function(obj) {
		obj.autocomplete({
			minLength: 0,
			width: 318,
			autoFocus: true,
			source: function( request, response ) {
				var cityCode = $("#cityCode").val();
				var term = request.term;
				if(term in life.cacheResidence) {
					response($.map(life.cacheResidence[term], function(item, index) {
						life.chosenResidencePool = life.cacheResidence[term];
						life.liveLngLat1 = item.lng + "," + item.lat;
						return {
							label: item.residenceName,
		                    value: item.residenceName
						};
		            }));	
					return;
				}
	      $.ajax({
	          url: '/EditBrokerInfo.action?getResidenceListByCityCode',
	          data: {cityCode: cityCode, keyword:encodeURIComponent(request.term)},
	          type: 'post',
	          dataType: "json",
	          success: function(data, status, xhr) {
	        	  life.cacheResidence[term] = data;
	        	  life.chosenResidencePool = data;
				response($.map(data, function(item, index) {
					
					return {
						label: item.residenceName,
	                    value: item.residenceName,
	                    rid: item.residenceId,
	                    lng: item.lng,
	                    lat: item.lat,
	                    mosaicId: item.mosaicId,
	                    keyword: item.keyword
					};
	            }));												
	          },
	          error: function(data) {
	        	//alert(JSON.stringify(data));
	          }
	      });
			},
			select: function( event, ui ) {
				event.preventDefault();
				life.liveFlag = "true";
				life.liveLngLat1 = ui.item.lng + "," + ui.item.lat;
				this.value = String(ui.item.label).substring(0, String(ui.item.label).indexOf("("));
				life.selectedResidenceName = this.value;
				life.rid1 = ui.item.rid;
				$("#liveLngLat").siblings('span').removeClass("hide");
				obj.blur();
			}				
		}).focus(function() {
//		    $(this).autocomplete("search", "");
		}).change(function() {
			if($(this).val() != life.selectedResidenceName) {
				life.liveFlag = "false";
			}
		});
		
		$("#cityCode").change(function() {
			cacheResidence = {};
		});
	},
	// 搜索提示
	keywordSuggestion : function ($input) {
		$input = $input || $("#keyword");
		var cacheResidence = {}; //小区缓存
		$input.autocomplete({
			minLength: 0,
			width: 318,
			autoFocus: true,
			source: function(request, response) {
				life.workplaceLngLat1 = "";
				var term = request.term;
				if (term in cacheResidence) {
					response($.map(cacheResidence[term], function(item, index) {
						life.workplaceLngLat1 = item.lngLat;
						return {
							label: item.name,
							value: item.name,
							lngLat: item.lngLat
						};
					}));
					return;
				}
				$.ajax({
					url: '/TimeSearch.action?suggestion',
					data: {
						destination: encodeURIComponent(request.term)
					},
					type: 'post',
					dataType: "json",
					success: function(data, status, xhr) {
						if (data.status == 1) {
							cacheResidence[term] = data.list;
							response($.map(data.list, function(item, index) {
								return {
									label: item.name,
									value: item.name,
									lngLat: item.lngLat
								};
							}));
						}
					},
					error: function(data) {}
				});
			},
			select: function(event, ui) {
				event.preventDefault();
				life.workplaceFlag = "true";
				life.workplaceLngLat1 = ui.item.lngLat;
				this.value = ui.item.value;
				life.selectedWorkplace = this.value;
				$("#workplaceLngLat").siblings('span').removeClass("hide");
				$input.blur();
			}
		}).change(function() {
			if($(this).val() != life.selectedWorkplace) {
				life.workplaceFlag = "false";
			}
		});
	}
};





