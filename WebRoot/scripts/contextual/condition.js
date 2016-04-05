//定义变量接收地图对象
var map;
var currentPages = 1;
//地图上的小点
var smallPoint = "/images/map/marker_red_sprite.png";
//玲姐部分
$(function() {
	
	//fnCreateSelectUl($(".select"),$(".selectInput"));
    //fnCreateRadiobox($(".types"),1, 1);
    fnCreateRadiobox({
    	ul: $(".types"),
    	valBox:".valBox",
    	boxUseType:1
    });
    $(".traffic .bus").click(function() {
        $(this).parents(".communityInfor").find("ul.bus").toggle()
            .siblings("ul.detail").hide();
    });
    $(".traffic .shop").click(function() {
        $(this).parents(".communityInfor").find("ul.shop").toggle()
            .siblings("ul.detail").hide();
    });
//    Review.init();
    conditionOpr.keywordSuggestion();
    $("#keywords").focus();
    $("#goSearch").click(function() {
    	var keywords = $.trim($("#keywords").val());
    	if(keywords == "") {
    		alertDialog("请输入工作地点");
    		return ;
    	}  
    	conditionOpr.contextSearch();
    	Pager.addWaiting();
    });
    conditionOpr.addEnterKeyClick();
    $("#keywords").focus();
});

//搜索操作类
var conditionOpr = {
		lngLat: null,
		mosaicId: null,
		rRows: null,
		bRows: null,
		$brokerContainer: $(".communitys"),
		operType: 0,
		isFirst: 0,
		tagClass: ["tag-primary", "tag-info", "tag-success", "tag-warning", "tag-danger", "tag-primary", "tag-info", "tag-success", "tag-warning", "tag-danger", "tag-primary", "tag-info", "tag-success", "tag-warning", "tag-danger"],
		//不喜欢
		dislike: function() {
			
		},
		
		//显示交通信息
		showBusInfo: function() {
			
		},
		
		//显示购物信息
		showMarketInfo: function() {
			
		},
		
		//初始化瀑布流
		initMasonry: function() {
//			conditionOpr.$brokerContainer.imagesLoaded( function(){
				conditionOpr.$brokerContainer.masonry({
					itemSelector : '.communityInfor,.agents',
					columnWidth: 312,
					gutterWidth: 8
				 });
//			 });
		},
		
		//显示公共信息
		showCommonInfo: function() {
			var content = "";
			var description = "";
			if(conditionOpr.rRows == 0 && conditionOpr.bRows == 0 ) {
				description = "该位置附近暂无推荐，请换一个地点或切换房源类型后再试一次。";
				$( "#keywords" ).autocomplete("search");
			} else {
				description = "为你找到" + conditionOpr.rRows + "个合适的小区，" + conditionOpr.bRows + "位经纪人随时为你服务． ";
			}
			content = " <div class='map' id='map'>地图</div>" +
					"<div class='searchResult'>" +
					"<h4>" + description + "</h4>" +
					"<dl> <dt></dt>" +
					"<dd> " +
					"<a href='/strategy/rental' target='_blank'>骚年，我看你骨骼精奇，送你本<b><租房秘籍></b>吧．</a>" +
					"<a href='/strategy/undeceive' target='_blank'>天了噜，有了<b><防坑指南></b>妈妈再也不用担心我租房被坑了惹．</a>" +
					"<a href='/strategy/safety' target='_blank'>还有比杜蕾斯更安全的<b><安全攻略></b>你造吗？</a>" +
					"</dd>" +
					"</dl>" +
					"</div>" +
					"</div>";
			$(".strategy").append(content);
			conditionOpr.initBMap();
		},
		
		//根据坐标点，调整地图的显示   
		adjustMapView: function (matchResidence) {
			var points = [];
			$.each(matchResidence, function(j, item) {
					var point = new BMap.Point(item.longitude, item.latitude);
					points.push(point);
				}
			);
			var view = map.getViewport(points);
			map.centerAndZoom(view.center, view.zoom);
		},
		
		//显示地图数据
		showMapInfo: function(matchResidence) {
			map.clearOverlays();
			$.each(matchResidence, function(j, item) {
					var point = new BMap.Point(item.longitude, item.latitude);
					var resetIcon= new BMap.Icon(smallPoint, new BMap.Size(30, 40), {
						 anchor: new BMap.Size(10, 10) 
					});
					var marker = new BMap.Marker(point, {icon:resetIcon});
					map.addOverlay(marker);
				}
			);	
			conditionOpr.adjustMapView(matchResidence);
		},
		
		//清空公共区域信息
		cleanCommonArea: function(obj) {
			obj.empty();
		},
		
		//清空小区区域信息
		cleanResidenceArea: function(obj) {
			$("#loadMore").hide();
			obj.find(".communityInfor").remove();
		},
		//清空经纪人区域信息
		cleanBrokerArea: function(obj) {
			obj.find(".agentInfor").remove();
		},
		
		//初始化地图
		initBMap: function () {
			//判断地图是否加载成功
			if (typeof BMap === 'undefined') {
				BMap = '';
				map = '';
				maptag = 0;
				//searchBrokerInfo();
				$("#map").html("<center><h1>网络问题，无法加载地图！</h1></center>");
				alert("地图加载失败");
			} else {
				map = new BMap.Map("map", {
					enableMapClick : false
				});  // 创建Map实例 并设置MapOptions
				// 中心点坐标
				var lng = CityClass.cityCenter[CityClass.getCurrentCityCode()].lng;
				var lat = CityClass.cityCenter[CityClass.getCurrentCityCode()].lat;
				// 级数
				var level = 12;
				if($("#areaLng").val() != undefined && $("#areaLng").val() != ''){
					lng = $("#areaLng").val();
					lat = $("#areaLat").val();
					level = 14;
				}
				var point = new BMap.Point(lng, lat); //设置中心点坐标
				map.centerAndZoom(point, level); // 初始化地图,设置中心点坐标和地图级别
				// 添加到地图当中
				map.enableScrollWheelZoom(true); //启用滚轮放大缩小
				map.setMapStyle({
					features : [ "road", "building", "water", "land" ],// 隐藏地图上的poi
			 		styleJson :[
			           {
		                 "featureType": "highway",
		                 "elementType": "geometry.fill",
		                 "stylers": {
		                           "color": "#ffffff"
		                 }
			           }, {
		                 "featureType": "arterial",
		                 "elementType": "geometry.fill",
		                 "stylers": {
		                           "color": "#ffffff"
		                 }
			           }, {
		                 "featureType": "local",
		                 "elementType": "geometry.fill",
		                 "stylers": {
		                           "color": "#ffffff"
		                 }
			           }, {
		                 "featureType": "highway",
		                 "elementType": "geometry.stroke",
		                 "stylers": {
		                           "color": "#cccccc"
		                 }
			           }, {
		                 "featureType": "arterial",
		                 "elementType": "geometry.stroke",
		                 "stylers": {
		                           "color": "#cccccc"
		                 }
			           }, {
		                 "featureType": "local",
		                 "elementType": "geometry.stroke",
		                 "stylers": {
		                           "color": "#cccccc"
		                 }
			           }, {
		                 "featureType": "road",
		                 "elementType": "labels.text.fill",
		                 "stylers": {
		                           "color": "#666666"
		                 }
			           }, {
		                 "featureType": "poi",
		                 "elementType": "labels.text.fill",
		                 "stylers": {
		                           "color": "#666666"
		                 }
			           }, {
		                 "featureType": "label",
		                 "elementType": "all",
		                 "stylers": {
		                           "color": "#ffffff"
		                 }
			           }, {
		                 "featureType": "label",
		                 "elementType": "labels.text.fill",
		                 "stylers": {
		                           "color": "#444444"
		                 }
			           }, {
		                 "featureType": "highway",
		                 "elementType": "labels.text.fill",
		                 "stylers": {
		                           "color": "#444444"
		                 }
			           }, {
		                 "featureType": "highway",
		                 "elementType": "labels.text.stroke",
		                 "stylers": {
		                           "color": "#ffffff"
		                 }
			           }, {
		                 "featureType": "highway",
		                 "elementType": "labels.icon",
		                 "stylers": {
		                           "visibility": "off"
		                 }
			           }, {
		                 "featureType": "local",
		                 "elementType": "labels.text.fill",
		                 "stylers": {
		                           "color": "#666666"
		                 }
			           }, {
		                 "featureType": "arterial",
		                 "elementType": "labels.text.stroke",
		                 "stylers": {
		                           "color": "#ffffff"
		                 }
			           }, {
		                 "featureType": "arterial",
		                 "elementType": "labels.text.fill",
		                 "stylers": {
		                           "color": "#444444"
		                 }
			           }, {
		                 "featureType": "subway",
		                 "elementType": "geometry.fill",
		                 "stylers": {
		                           "color": "#ff8585"
		                 }
			           }, {
		                 "featureType": "manmade",
		                 "elementType": "geometry.fill",
		                 "stylers": {
		                           "color": "#eeeeee"
		                 }
			           }, {
		                 "featureType": "land",
		                 "elementType": "all",
		                 "stylers": {
		                           "color": "#F0EDE5"
		                 }
			           }, {
		                "featureType": "green",
		                "elementType": "all",
		                "stylers": {
		                          "color": "#c5f4b7"
		                }
			          }, {
		                "featureType": "water",
		                "elementType": "all",
		                "stylers": {
		                          "color": "#B3D1FF"
		                }
			          }
			        ]
				});
			}
		},
		
		//查询
		contextSearch: function() {
			conditionOpr.cleanResidenceArea($(".communitys"));	
			conditionOpr.cleanBrokerArea($(".agents"));
			conditionOpr.cleanCommonArea($(".strategy"));
			conditionOpr.searching();
			conditionOpr.isFirst = 0;
			conditionOpr.operType = 0;
			//分页初始化
	   		Pager.init({
				url:"/BrokerSearch.action?rentGetResidenceForBird",
				data:{
					keywords: encodeURIComponent($.trim($("#keywords").val())),
					flag: $.trim($("#flag").val()),
					lngLat: conditionOpr.lngLat
				},
				fillData: conditionOpr.fillResidenceData,
				nextBtn: $("#loadMore"),
				waitingCotent: $("#loadMore"),
				useMasonry: true
			});
		},
		
		//经纪人查询
		brokerSearch: function() {
			var bContent = "";
			$.ajax({
		          url: '/BrokerSearch.action?rentGetBrokerForBird',
		          data: {
		        	  		mosaicId : conditionOpr.mosaicId,
							flag: $.trim($("#flag").val()),
						},
		          type: 'post',
		          dataType: "json",
		          async: false,
		          success: function(data, status, xhr) {
		        	  bContent = conditionOpr.fillBrokerData(data);
		          }
		      });
			return bContent;
		},
		
		//填充小区
		fillResidenceData: function (data) { 
	    	var content = "";
	    	tags = "";
	    	conditionOpr.cleanMassage();
	    	conditionOpr.completed();
	    	if(data.status == 0) {
	    		conditionOpr.isFirst = 0;
	    		conditionOpr.cleanResidenceArea($(".communitys"));	
				conditionOpr.cleanBrokerArea($(".agents"));					
	    		conditionOpr.showMassage("没有符合要求的小区");
	    		return ;
	    	} else if(data.status == 1) {
	    		conditionOpr.mosaicId = data.mosaicId;
	    		conditionOpr.rRows = data.pageModel.rows;
	    		var length = data.pageModel.result.length;
	    		var bContent = "";
	    		if(length > 3) {
	    			$.each(data.pageModel.result, function(index, item) {
	    				if(index == 2 && conditionOpr.operType == 0) {
			    			//查询经纪人
					    	bContent = conditionOpr.brokerSearch();
					    	content += bContent;
			    		}
		    			tags = "";
			    		// 标签
			    		if(item.tag!=''){
			    			var t = item.tag.split(/[;；，,]/);
			    			if(t.length>0){
			    				tags += '<div class="tags">';
			    				var j = 0;
			    				for(var i=0; i<t.length; i++){
			    					if(t[i]!='' && t[i]!=',' && t[i]!='，'){
			    						tags += '<a href="'+item.url+'" target="_blank" class="tag-ls '+conditionOpr.tagClass[j++]+'">'+t[i]+'</a>';
			    					}
			    				}
			    				tags += '</div>';
			    			}
			    		}
			    		var pic = "/images/defaultPic/residence.jpg";
			    		if(item.smallPic != '') pic = item.smallPic;
			    		content += "<div class='communityInfor'>" +
			    				"<a href='"+item.url+"' target='_blank'><img src='" + pic + "' alt='小区图片' onerror=\"showImgDelay(this,\'/images/defaultPic/residence.jpg\',2)\"/></a>" +
			    				"<h5>" +
			    					"<a href='"+item.url+"' target='_blank'>" + item.residenceName + "</a> <a href='/ResidenceSaleSearch.action?JspSaleHome&residenceId="+item.residenceId+"&houseType=3&flag=A' target='_blank' style='float:right;width:auto;'>房源</a>" +
			    				"</h5>" +
			    				tags +
			    				"<div class='prices'>" +
			    				"价格区间: " + item.priceRange +
			    				"</div>" +
			    				"<div class='traffic'>" +
			    				item.duration + "分钟到达 <b>" + $.trim($("#keywords").val()) + "</b> <a href='###' class='bus'></a><a href='###' class='shop'></a>" +
			    				"</div></div>";
		    		});	
	    			conditionOpr.initMasonry();
	    			conditionOpr.reloadBrokerListmasonry(content);
	    		} else {
	    			$.each(data.pageModel.result, function(index, item) {
		    			tags = "";
			    		// 标签
			    		if(item.tag!=''){
			    			var t = item.tag.split(/[;；，,]/);
			    			if(t.length>0){
			    				tags += '<div class="tags">';
			    				var j = 0;
			    				for(var i=0; i<t.length; i++){
			    					if(t[i]!='' && t[i]!=',' && t[i]!='，'){
			    						tags += '<a href="'+item.url+'" target="_blank" class="tag-ls '+conditionOpr.tagClass[j++]+'">'+t[i]+'</a>';
			    					}
			    				}
			    				tags += '</div>';
			    			}
			    		}
			    		var pic = "/images/defaultPic/residence.jpg";
			    		if(item.smallPic != '') pic = item.smallPic;
			    		content += "<div class='communityInfor'>" +
			    				"<a href='"+item.url+"' target='_blank'><img src='" + pic + "' alt='小区图片' onerror=\"showImgDelay(this,\'/images/defaultPic/residence.jpg\',2)\"/></a>" +
			    				"<h5>" +
			    					"<a href='"+item.url+"' target='_blank'>" + item.residenceName + "</a> <a href='/ResidenceSaleSearch.action?JspSaleHome&residenceId="+item.residenceId+"&houseType=3&flag=A' target='_blank' style='float:right;width:auto;'>房源</a>" +
			    				"</h5>" +
			    				tags +
			    				"<div class='prices'>" +
			    				"价格区间: " + item.priceRange +
			    				"</div>" +
			    				"<div class='traffic'>" +
			    				item.duration + "分钟到达 <b>" + $.trim($("#keywords").val()) + "</b> <a href='###' class='bus'></a><a href='###' class='shop'></a>" +
			    				"</div></div>";
		    		});	
	    			//查询经纪人
	    			if(conditionOpr.operType == 0) {
	    				bContent = conditionOpr.brokerSearch();
				    	content += bContent;
	    			}
			    	$(".communitys").append(content);
			    	Pager.useMasonry = false;	
			    	if(conditionOpr.operType == 0) {
			    		Pager.removeWaiting($("#waiting"));
			    		Review.init();	
			    	}
			    	
			    	
	    		}
	    		
//	    		if(data.pageModel.result.length > 0) {
//	    			$("#loadMore").before(content);
//	    			
//	    		}
		    	
		    	if(conditionOpr.isFirst == 0) {
		    		//显示公共信息
			    	conditionOpr.showCommonInfo();	
		    	}
		    	conditionOpr.isFirst = 1;
		    	//在地图上展示小区
		    	conditionOpr.showMapInfo(data.pageModel.result);
	    	} else if(data.status == 2){
	    		$( "#keywords" ).autocomplete("search");
	    		alertDialog("无法成功定位到工作地点，请换一个关键词。");
	    	} else {
	    		conditionOpr.isFirst = 0;
	    		conditionOpr.cleanResidenceArea($(".communitys"));	
				conditionOpr.cleanBrokerArea($(".agents"));
				conditionOpr.cleanCommonArea($(".strategy"));
	    		conditionOpr.showMassage("无法成功定位到工作地点，请换一个关键词。");
	    		return ;
	    	}
	    	conditionOpr.operType = 2;
	    },
	    
	    recallInit: function() {
	    	Pager.removeWaiting($("#waiting"));
	    	Pager.enableNextPage();	
	    	Review.init();
	    },
	    
	    //重置瀑布流
	    reloadBrokerListmasonry: function (content) {
	    	var $boxes= $(content);
	    	if(conditionOpr.operType == 2) {
	    		$boxes.imagesLoaded(function() {
	    			conditionOpr.$brokerContainer.append( $boxes ).masonry( 'appended', $boxes, conditionOpr.recallInit());	
	            });
	    		$("#main").removeClass("shortPage");
	    		Init();
	    	}
	    	if(conditionOpr.operType == 0) {
	    		$boxes.imagesLoaded(function() {
	    			conditionOpr.$brokerContainer.prepend( $boxes ).masonry( 'reload', $boxes, conditionOpr.recallInit());
	            });
	    		$("#main").removeClass("shortPage");
	    		Init();
	    	} 		
	    },
	    
		//填充经纪人信息
		fillBrokerData: function (data) {
	    	var content = "<div class='agents'>";
	    	var tags = "";
	    	var comments = "";
	    	conditionOpr.bRows = data.rows;
    		$.each(data.result, function(index, item) {
    			tags = "";
    			comments = "";
    			// 标签
    			if(item.tag!=';' || item.tag!='；'){
    				var t = item.tag.split(/[;；，,]/);
    				if(t.length>0){
    					tags += '<div class="tags">';
    					var j = 0;
    					for(var i=0; i<t.length; i++){
    						if(t[i]!='' && t[i]!=';' && t[i]!='；' && t[i]!=',' && t[i]!='，'){
    							tags += '<a href="'+item.url+'" target="_blank" class="tag-ls '+conditionOpr.tagClass[j++]+'">'+t[i]+'</a>';
    						}
    					}
    					tags += '</div>';
    				}
    			}
    			// 评论
	    		comments += '<ul class="comments" id="'+item.zid+'"><li class="thumbs"><span class="zgIcon zgIcon-thumbs-o-up"></span><em>'+item.likes+'</em></li><li class="thumbs"><span class="zgIcon zgIcon-thumbs-o-down"></span><em>'+item.steps+'</em></li><li class="last evaluation">查看评论</li></ul>';
	    		//公司及房源
	    		var brokerage = "";
	    		brokerage = item.brokerageName;
	    		if(item.rentals != 0) {
	    			if(brokerage) {
	    				brokerage += '，';
	    			}
	    			brokerage += '<a class="links-primary" target="_blank" href="/UserCenterController.action?showBroker&brokerNo='+item.zid+'&type=2">'+item.rentals+'套</a>在租房产';
	    		}
	    		var headPic = "/images/public/head.png";
	    		if(item.pic != undefined) {
	    			headPic = brokerListPhtoto + '/' + Math.floor(item.zid / 10000) + '/'+ item.pic;
	    		}
	    		content += "<div class='agentInfor condition'>";
	    		if(item.tagSpecial != ''){
	    			content += "<div class='authenty'>" + item.tagSpecial + "</div>";
	    		}
	    		content += 
	    				"<a href='" + item.url + "' target='_blank' class='headpic'>" +
	    				"<img src='" + headPic + "' alt='经纪人头像' onerror=\"showImgDelay(this,\'/images/defaultPic/head.png\',2)\" />" +
	    				"</a>" +
	    				"<div class='personalInfor'>" +
	    				"<h4><a href='" + item.url + "' target='_blank'>" + item.name + "</a></h4>" +
	    				"<div class='company'>" + brokerage + "</div>" +
	    				tags +
	    				"</div>" +
	    				"<div class='trends'></div>" +
	    				comments + "</div>";
    		});
    		content += "</div>";
    		return content;
//    		$(".agents").append(content);
    		// 添加经纪人评分点击事件
//    		Review.init();
	    },
	    
	    //清楚提示信息
	    cleanMassage: function() {
	    	$(".tips").empty();
	    },
		
		//显示提示信息
		showMassage: function(info) {
			$(".tips").text(info);
		},
		
		//设置查询状态
		searching: function() {
			$("#goSearch").text("Searching...");
			$("#goSearch").attr("disabled", "true");
			
		},
		//查询结束
		completed: function() {
			$("#goSearch").text("Go !");
			$("#goSearch").removeAttr("disabled");
		},
		
		// 搜索提示
		keywordSuggestion: function () {
			var cacheResidence = {};	//小区缓存
			var chosenResidencePool = {}; //保存已选择的小区
			$("#keywords").autocomplete({
				minLength: 0,
				width: 318,
				autoFocus: true,
				source: function( request, response ) {
					conditionOpr.lngLat = "";
					var term = request.term;
					if(term in cacheResidence) {
						response($.map(cacheResidence[term], function(item, index) {
							chosenResidencePool = cacheResidence[term];
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
					      data: {destination: encodeURIComponent(request.term)},
					      type: 'post',
					      dataType: "json",
					      success: function(data, status, xhr) {
					      	  if(data.status == 1) {
					      	  	cacheResidence[term] = data.list;
					    	  	chosenResidencePool = data.list;
								response($.map(data.list, function(item, index) {
									return {
										label: item.name,
						                value: item.name,
						                lngLat: item.lngLat
						          	};
					        	}));	
					      	  }
					    	  											
					      },
					      error: function(data) {
					    	//alert(JSON.stringify(data));
					      }
					  });
				},
				select: function( event, ui ) {
					event.preventDefault();
					conditionOpr.lngLat = ui.item.lngLat;
					this.value = ui.item.label;
					$("#keywords").blur();
				}
			});
		},
		//在时刻搜没有打开的情况下回车触发搜索   
		addEnterKeyClick: function () {
			document.onkeydown = function(event) {
				var e = event || window.event || arguments.callee.caller.arguments[0];
				if (e && e.keyCode == 13) {
					$("#goSearch").click();
				}
			};
		}
};
	



//$(document).ready(function(){
//    //fnCreateSelectUl($(".select"),$(".selectInput"));
//    fnCreateRadiobox($(".types"));
//    $(".traffic .bus").click(function() {
//        $(this).parents(".communityInfor").find("ul.bus").toggle()
//            .siblings("ul.detail").hide();
//    });
//    $(".traffic .shop").click(function() {
//        $(this).parents(".communityInfor").find("ul.shop").toggle()
//            .siblings("ul.detail").hide();
//    });
//    Review.init();
//});