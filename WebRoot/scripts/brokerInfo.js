var oldCover = "";
var add;
var typeId = null;

var timelineContainer = $("#timelineContainer");
var houseContainer = $("#houseContainer");

var timeLine = {
	//时间线数据
	timeLineData: null,
	pages: null,
	currentPage: 1,
	chosenYear:null,
	typeMap:{1:"系统确认", 11:"小区介绍", 12:"房源推荐", 13:"个人感悟"},
	//获取时间线数据
	getTimelineData: function(timeLineZid, curTypeId, curType) {
		$.ajax({
			url:"/UserCenterController.action?getTimeLineData",
			async : false,
			dataType:"json",
			data:{brokerNo:timeLineZid, typeId:curTypeId, year:timeLine.chosenYear, timeLineType: curType, currentPage: timeLine.currentPage},
			success:function(data, status) {
				if(data.status == "n"){
					
				} else if(data.status == "y"){
					if(data.timeLine.length > 0 ) {
						timeLine.timeLineData = data;
						timeLine.pages = Math.ceil(data.total / 20) == 0 ? 1 : Math.ceil(data.total / 20);
					} else {
						timeLine.timeLineData = null;
						timeLine.pages = 0;
					}
				}
			}
		});
	},
	//显示时间线数据
	showTimeLineData: function() {
		if(timeLine.timeLineData != null) {
			$.each(timeLine.timeLineData.timeLine, function(index, item) {
				timelineContainer.append(timeLine.getTimelineHtml(item));
			});
		}
	},
	getTimelineHtml : function(data) {
		var html = "<div class='timeBlock contentBlock'>";
		html += "<div class='text'>" + data.comment.replace(/\n/g,"<br>");
        if(data.pic != undefined) {
        	html += "<img src='"+data.pic+"' alt='事件配图' onerror=\"showImgDelay(this,\'/images/public/home.jpg\',2)\"/>";
        }
        var typeStr = "";
        if(timeLine.typeMap[data.type_id] != undefined) {
        	typeStr = "［"+(timeLine.typeMap[data.type_id])+"］";
        }
        if(timeLine.typeMap[data.typeId] != undefined) {
        	typeStr = "［"+(timeLine.typeMap[data.typeId])+"］";
        }
        html += "</div>" +
                "<div class='opr'><div class='classify'>"+typeStr+"</div><div class='date'>"+(data.createdtime||data.fulldate)+"</div>" +
                "<a href='###' class='favourite' timeLineId='" + data.id + "'><span class='zgIcon zgIcon-thumbs-up-o'></span>赞(<b>"+(data.likes||0)+"</b>)</a>";
//                "<a href='###' class='share'><span class='zgIcon zgIcon-share-square '></span>转发(<b>0</b>)</a>";
        if(ME && ME == "y")
        	html += "<a href='###' class='closeThis' timeLineId='" + data.id + "'><span class='zgIcon zgIcon-remove'></span>删除</a>";
        html += "</div></div>";
        return html;
	},
	// 更新右侧悬浮日期(时间树)
	updateTimelineTree: function (typeId) {
		$.ajax({
	        url:"/UserCenterController.action?getTimeTree",
	        dataType:"json",
	        async:false,
	        data:{brokerNo:timeLineZid},
	        success:function(data, status) {
	            timeControl1 = data.timeControl1;
	            timeControl2 = data.timeControl2;
	        }
	    });
		var timetreelist;
		if(typeId == 1)
			timetreelist = timeControl1;
		else{
			if(timeControl2 === undefined) return;
			timetreelist = timeControl2;
		}
		$("#timeControlor").empty();
		var t = "";
		$.each(timetreelist, function(index, yearmonths){
			if(index == 0){
				t += '<li class="on">';
			}else{
				t += '<li>';
			}
			var year = yearmonths;
			t += '<a href="###" year="'+year+'">'+year+'</a>';
			t += '</li>';
		});
		$("#timeControlor").append(t);
		bindClickForTree();
	},
	// 清空时间线
	clearTimeline: function () {
		$(".contentBlock").remove();
	},
	// 时间线相关的事件绑定
	timelineEventBind: function () {
	    //删除事件
        $(".closeThis").bind('click', function() {
            var timeLineId = $(this).attr("timeLineId");
            delTimeLine(timeLineId, $(this));
        });
        
        //点赞
        $(".favourite").unbind('click').bind('click', function() {
            var timeLineId = $(this).attr("timeLineId");
            likeMoment(timeLineId, $(this));
        });
        
        //分享
        $(".share").unbind('click').bind('click', function() {
//          var timeLineId = $(this).attr("timeLineId");
            //delTimeLine(timeLineId, $(this));
        });
    },
    //初始化新增时间线
    initAddTimeLine: function() {
        fnTextVerify($("#tlComment"),$("#tlCommentSpan"),400);
        // $("#datepicker").datepicker({
        //     changeMonth: true,
        //     changeYear: true
        // });
        uploadPicFinal("chooseUploadPic", $("#headPic"), $("#hiddenFileName"));
        uploadPicFinal("chooseUploadPic2", $("#headPic"), $("#hiddenFileName"));
        // $("#datepicker").bind('click', function() {
        //     $(this).datepicker({
        //         changeMonth: true,
        //         changeYear: true
        //     });
        // });
      //事件切换时调用
        $("#tlmoment").change(function() {
            $("#momentTitle").val($(this).find("option:selected").text());
        });
        $(".classDiv").mouseenter(function() {
            $('.selectUl').fadeIn(200);
        });
         $(".classDiv").mouseleave(function() {
            $('.selectUl').fadeOut(200);
        });
         $("#tlCommentClasses~.selectUl li").click(function() {
        	 $(".selectUl").hide();
             $("#tlCommentClasses b").text($(this).text());
             $("#typeIdInput").val($(this).attr("typeId"));
             $("#typeInput").val($(this).text());
         });
        //标签切换时调用
        $("#tlTag").change(function() {
            var tagId = $("#tlTag").val();
            $("#tagTitle").val($(this).find("option:selected").text());
            $.ajax({
                url:"/UserCenterController.action?getTimeLineMoments",
                dataType:"json",
                data:{tagId:tagId},
                success:function(data, status) {
                    if(data.status == "y") {
                        $("#tlmoment").children().remove();
                        $.each(data.moments, function(index, item) {
                            $("#tlmoment").append("<option value='"+item.id+"'>"+item.moment+"</option>");
                        });
                        $("#momentTitle").val($("#tlmoment").find("option:selected").text());
                    } else if(data.status == "n") {
                        // var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>" + data.info + "</p></div><div class='popLine clearfix'></div></div>";
                        // popBox($(Qs));
                        confirmDialog(data.info);
                    }
                }
            });
        });
        add = $("#addTimePop").Validform({
            tiptype:4, 
            ignoreHidden:true,
            ajaxPost:true,
            callback:function(data){
                if($.trim(data.status) == "y"){
                	$("#hiddenFileName").val("");
                	$("#tlComment").val("");
                	$("#typeIdInput").val("");
                    $("#typeInput").val("");
                    $("#headPic").attr('src', '/images/public/defaultHome.jpg');
                    
                    $(".contentBlock").first().before(timeLine.getTimelineHtml(data.data));
                    
//                    timeLine.raisePoints();
//                	if(data.isShow == "y") {
//                		var points = $("#points").text();
//                		points = parseInt(points) + 1;
//                		$("#points").text(points);
//                	}
                    timeLine.removeBlank();
                    timeLine.updateTimelineTree(typeId);
                    timeLine.timelineEventBind();
                } else if($.trim(data.status) == "n") {
                    $("#saveType").val("0");
                    // var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>" + data.info + "</div><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div>";
                    // popBox($(Qs),".confirmBtn");
                    confirmDialog(data.info);

                } 
            }
        });
    },
    //添加等待图标
    addWaitingFlower: function() {
    	 var oWait = "<div id='waiting'><span></span></div>";
         $(oWait).appendTo(timelineContainer);
    },
    //删除等待图标
    removeWaitingFlower: function() {
    	$("#waiting").remove();
    },
    //下一页
    nextPage: function() {
    	if(timeLine.pages == null || timeLine.pages <= 1) return;
    	timeLine.currentPage ++;
    	if (timeLine.currentPage <= timeLine.pages) {
    		timeLine.addWaitingFlower();
    		timeLine.getTimelineData(timeLineZid, typeId);
    		timeLine.showTimeLineData();
    		timeLine.removeWaitingFlower();
    	} else {
    		 if($("#msg").length==0) {
    			 timelineContainer.append("<div id='msg' style='margin: 15px auto; width: 100px;'>没有更新的内容了</div>");
    		 }
    	}
    },
    //无数据时的提示信息
    showBlank: function() {
    	var content = "<div class='noContent contentBlock' style='text-align:center;'>TA暂时还没有发布动态哦!</div>";
    	timelineContainer.append(content);
    },
    //删除提示信息
    removeBlank: function() {
    	$(".noContent").remove();
    },
    //获得时间线类型数据
    getAddTimeLineData: function(typeid) {
    	 $.ajax({
             url:"/UserCenterController.action?getTimeLineTags",
             dataType:"json",
             data:{typeId:typeid},
             success:function(data, status) {
            	 $("#tlTag").children().remove();
            	 $.each(data.tags, function(index, item) {
                     $("#tlTag").append("<option value='"+item.tag_id+"'>"+item.tag+"</option>");
                 });
            	 $("#tlmoment").children().remove();
                 $.each(data.moments, function(index, item) {
                     $("#tlmoment").append("<option value='"+item.id+"'>"+item.moment+"</option>");
                 });
                 $("#momentTitle").val($("#tlmoment").find("option:selected").text());
             }
         });
    },
    //显示积分增加的动画
    raisePoints: function() {
    	var addPoints = {
			coverlayer: false,
			divContent: "<p><span class='zgIcon zgIcon-check-square-o'></span>已成功领取今日积分</p>",
			setTime: 1500,
			confirmBtn:false,
			className:'divPop-sm points',
			parentDiv:".timeline",
			left:"100px",
			top:"200px"
		};
    	fnCreatePopBox(addPoints);
    }
};

//设置时间线
function setTimeLine() {
	 // 清空时间线
    timeLine.clearTimeline();
    // 获取时间线数据
    timeLine.getTimelineData(timeLineZid, typeId);
    
	if(timeLine.timeLineData == null) {
		timeLine.showBlank();
		 // 更新右侧时间树
//	    timeLine.updateTimelineTree(typeId);
	} else {
		timeLine.removeBlank();
		// 显示时间线数据
	    timeLine.showTimeLineData();
	    // 更新右侧时间树
//	    timeLine.updateTimelineTree(typeId);
	    // 重新绑定时间线相关事件
	    timeLine.timelineEventBind();
	}
}

var House = {
	currentPage: 1,
	pages: null,
	/**
	 * 获取租单列表
	 */
	loadHouseList : function() {
		$.ajax({
		    type: "post", 
		    url: "/RentalHomeOperator.action?showRentalList", 
		    dataType: "json",
		    data: {
		    	currentPage: House.currentPage,
		    	brokerNo: timeLineZid,
		    	bedRoom: $("#beds").val(),
		    	budget: $("#price").val()
		    },
		    async: false,
		    cache: false,
		    success: function(data) {
		    	if(data.status == "n") {
					alertDialog(data.info);
					return false;
				}
		    	
				House.pages = Math.ceil(data.total / 10) == 0 ? 1 : Math.ceil(data.total / 10);
				$.each(data.list, function(i, house) {
				 	houseContainer.append(getHouseHtml(house));
				});
		    }
		});
	},
	//添加等待图标
	addWaitingFlower: function() {
	    $("<div id='waiting'><span></span></div>").appendTo(houseContainer);
	},
	//删除等待图标
	removeWaitingFlower: function() {
		$("#waiting").remove();
	},
	//下一页
	nextPage: function() {
		if(House.pages == null || House.pages <= 1) return;
		House.currentPage ++;
		if (House.currentPage <= House.pages) {
			House.addWaitingFlower();
			House.loadHouseList();
			House.removeWaitingFlower();
		} else {
			 if($("#msg").length==0) {
				 houseContainer.append("<div id='msg' style='margin: 15px auto; width: 100px;'>没有更多房源了</div>");
			 }
		}
	},
};

var useTypeMap = {1:"整租", 2:"合租"};
//根据房源数据，生成房源Html代码
function getHouseHtml(house){
	var defaultPic;
	// 房源默认图片
	if(house.default_pic !== undefined && house.default_pic != ""){
		// 末尾加下划线(压缩过的，宽度450)
		defaultPic = house.default_pic.replace(house.default_pic.substring(house.default_pic.indexOf('.')), '_'+house.default_pic.substring(house.default_pic.indexOf('.')));
	}else{
		defaultPic = "/images/public/defaultHome.jpg";
	}
	// 发房人头像
	var headPic;
	if(house.head_pic != undefined)
		headPic = '/account/photo/' + Math.floor(house.zid / 10000) + '/'+ house.head_pic;
	else
		headPic = "/images/defaultPic/head.png";
	var content = '<div class="rental" style="margin-left: 2%;"><a class="item" href="'+house.url+'" target="_blank">';
    // 房源图片
    content += '<span class="picContainer"><img src="'+defaultPic+'" alt="房源图片" onerror=\"imageOnError(this, \''+house.default_pic+'\', \'/images/public/defaultHome.jpg\',2)\" /></span>';
    // 价格
    content += '<span class="price">'+house.price+' <q>元/月</q></span>';	
    // 室厅、面积、整租/合租
    content += '<span class="info"><strong class="title">'+house.beds+'室'+house.baths+'卫，'+house.area+'平米，' + useTypeMap[house.use_type] + '</strong></span>';
    content += '</a>';
    content += '<a href="'+house.url_residence+'" class="community" target="_blank">'+house.residence_name+'</a>';
    content += '</div>';
    // content += '<i class="fav fav_'+house.id+' zgIcon zgIcon-heart zgIcon-heart-o" stype="3" sid="'+house.id+'" sname="" title="收藏"></i></div>';
    return content;
}

//获得联系方式
function getUserMobile() {
 	$.ajax({
 		type: "post",
 		url:"/UserCenterOperator.action?getUserMobile",
 		dataType:"json",
 		data: {zid:timeLineZid, role:2},
 		success:function(data, status) {
 			if(data.status == "y") {
				//记录成功展示出的次数
				UserAnalysis.eventAnalysis("用户操作", "记录联系方式成功展示的次数", $("#listId").val());
//				$("#mMobile").text(data.mobile);
//				$("#contactAnalysis").parents(".basicInfo_detail").animate({'height':'0'});
//				$(".basicInfo_detail.showTel").show().animate({'height':'62px'});
				$("#contactBtn").html("<span id='contacter'>"+data.mobile+"</span>");
 			} else {
                 confirmDialog(data.info);
 			}
 		}
 	});
}


//删除时间线事件
function delTimeLine(timeLineId, timeLineObj) {
    $.ajax({
        url:"/UserCenterOperator.action?delTimeLine",
        dataType:"json",
        data:{timeLineId:timeLineId},
        success:function(data, status) {
            if(data.status == 'n') {
                $("#saveType").val("0");
                var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>" + data.info + "</div><div class='btnBox clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
                popBox($(Qs),".confirmBtn");
            } else if(data.status == 'y') {
                timeLineObj.parent().parent().remove();
            }
        }
    });
}
//点赞
function likeMoment(timeLineId, momentObj) {
    $.ajax({
        url:"/UserCenterOperator.action?likeMoment",
        dataType:"json",
        data:{timeLineId:timeLineId},
        success:function(data, status) {
            if(data.status == 'y') {
                var count = momentObj.find("b").text();
                momentObj.find("b").text(parseInt(count)+1);
            }
        }
    });
}

//分享
function shareMoment(timeLineId, momentObj) {
    $.ajax({
        url:"/UserCenterOperator.action?shareMoment",
        dataType:"json",
        data:{timeLineId:timeLineId},
        success:function(data, status) {
            if(data.status == 'y') {
                var count = momentObj.find("b").text();
                momentObj.find("b").text(parseInt(count)+1);
            }
        }
    });
}

var changeTag = false;
$(function(){
	timeLine.chosenYear = $("#timeControlor").children(".on").children().attr("year");
	// 初始化总页数
	if($("#type").val() == 1)
		timeLine.pages = timePages;
	if($("#type").val() == 2)
		House.pages = rentPages;
	
    // 已收藏则禁用收藏按钮 
//    Favorite.hasFav(timeLineZid, 21, $("#cityCode").val());
    // 绑定收藏点击事件
//    Favorite.bindFavEvent(timeLineZid, $.trim($(".brokerName").text()), 21, $("#cityCode").val());
	
    // 初始化添加时间线
    timeLine.initAddTimeLine();
    // 时间线相关的事件绑定
    timeLine.timelineEventBind();
    
    // 为时间树绑定点击方法
//    bindClickForTree();
    
    // 点击查看联系人
    $("#contactBtn").click(function() {
     	// 记录点击查看联系方式的次数
     	UserAnalysis.eventAnalysis("用户操作", "点击查看联系方式");
     	if(checkLoginStatus()){
     		if($("#contacter").length==0) {
     			getUserMobile();
     		}
     	}
    });
    
    //点击说说触发
    $("#knowledge").click(function(){
    	if(!$(this).hasClass("on")) {
    		$("#type").val(1);
    		changeTag = true;
    		$(this).addClass("on").siblings().removeClass("on");
    		// 由于滚动加载的问题，先改用清空
    		houseContainer.hide();
    		houseContainer.empty();
//    		if(timeLine.pages == null)
    		timeLine.currentPage = 1;
			setTimeLine();
    		timelineContainer.show();
    	}
    }); 
    //点击我的房源触发
    $("#myRents").click(function(){
    	if(!$(this).hasClass("on")){
    		$("#type").val(2);
    		changeTag = true;
    		$(this).addClass("on").siblings().removeClass("on");
    		timelineContainer.hide();
    		timelineContainer.children(".contentBlock").remove();
    		House.constructor = 1;
    		// 显示房源
//    		if(House.pages == null)
    		House.currentPage = 1;
			House.loadHouseList();
    		houseContainer.show();
    	}
    }); 
    
    // 编辑个人介绍
    $("#editIntroBtn").click(function(){
    	var intro = $.trim($(this).prev().html().replace(/<br>/g,"\n"));
    	if(intro=="暂无个人介绍") intro = "";
	    fnCreatePopBox({
	        title:'编辑个人介绍',
	        divContent:'<form> <div class="form-control"> <textarea id="editIntro" cols="30" rows="4">' + intro + '</textarea> </div> </form>',
	        fn:function(){
	        	$.ajax({
	                url:"/UserCenterOperator.action?editBrokerIntro",
	                data:{intro:$.trim($("#editIntro").val())},
	                async:false,
	                dataType:"json",
	                type:"post",
	                success:function(data, status) {
	                	$("#editIntroBtn").prev().html($("#editIntro").val().replace(/\n/g,"<br>"));
	                }
	            });
	        }
	    });
    });
    // 添加评分事件
    Review.reviewDetailPopBox();
   
    $("#changePic").click(function() {
        oldCover = $("#bgImgId").attr("src");
        var changeCover = "<div id='changeCover'><ul>";
        $.ajax({
            url:"/UserCenterOperator.action?showTimeLineBackground",
            async:false,
            dataType:"json",
            success:function(data, status) {
                $.each(data.pics, function(index, item) {
                    changeCover += "<li><img src='"+ item +"' alt='背景图片' /></li>";
                });
            }
        });
        changeCover += "</ul> <button type='button' class='cancelBtn'>取消</button><button type='button' class='confirmBtn btn btn-primary'>保存</button> </div>";
        $(changeCover).appendTo("#bgImg").show();
        $(".cancelBtn").click(function() {
            $(this).parents("#changeCover").remove();
            $("#bgImgId").attr("src", oldCover);
        });
        $(".confirmBtn").bind('click', function() {
            var backgroundPic = $("#bgImgId").attr("src");
             $.ajax({
                url:"/UserCenterOperator.action?editBrokerPageBackground",
                data:{backgroundPic:backgroundPic},
                async:false,
                dataType:"json",
                success:function(data, status) {
                    $("#changeCover").remove();
                }
            });
        });
        $("#changeCover").find('li').each(function(){
            $(this).click(function(){
                 $("#bgImgId").attr('src',$(this).children('img').attr('src'));
            });
        });
    });
    
    // 滚动加载
    $(window).scroll(function(){
    	if(changeTag) {
    		changeTag = false;
    		return;
    	}
        if($(document).scrollTop() >= $(document).height() - $(window).height() > 0)
        {
        	if($("#type").val() == 1){
        		timeLine.nextPage();
        	} 
        	if($("#type").val() == 2){
        		House.nextPage();
        	}
        }
    });
});

//为时间树绑定点击方法
function bindClickForTree() {
    $("#timeControlor").children('li').click(function() {
    	$(document).scrollTop(0);
    	timeLine.currentPage = 1;
        $(this).parent().find('ul').hide();
        $(this).addClass('on').find('ul').show().end().siblings().removeClass("on");
        timeLine.chosenYear = $(this).children("a").attr("year");
        // 清空时间线
        timeLine.clearTimeline();
        // 获取时间线数据
        timeLine.getTimelineData(timeLineZid, typeId, 2);
        // 显示时间线数据
        timeLine.showTimeLineData();
        // 重新绑定时间线相关事件
        timeLine.timelineEventBind();
    });
}

/**
 * 收藏类
 * type 1-小区 2-经纪人(21:买房经纪人 22:租房经纪人) 3-卖单 4-租单
 */
var Favorite = {
    // 判断是否已收藏，如果已收藏则禁用收藏按钮
    hasFav : function(id, type, cityCode) {
        $.ajax({
            url: "/BrokerWeiXin.action?hasFav",
            dataType: "json",
            async: false,
            data:{
                cityCode: cityCode,
                favId: parseInt(id),
                saveType: type
            },
            success:function(data, status) {
                if(data.status == 'y') $(".fav").removeClass("zgIcon-heart-o").addClass("zgIcon-heart");
            }   
        });
    },
    // 添加到收藏  
    addFav : function(id, content, type, cityCode) {
        $.ajax({
            url: "/BrokerWeiXin.action?addToFav",
            dataType: "json",
            async: false,
            data:{
                cityCode: cityCode,
                sid: parseInt(id),
                saveType: type,
                name: encodeURI(content)
            },
            success:function(data, status) {
            }
        });
        $(".fav").removeClass("zgIcon-heart-o").addClass("zgIcon-heart");
    },
    // 绑定收藏小区点击事件
    bindFavEvent : function(id, content, type, cityCode) {
        $(".fav").click(function() {
            if($(this).hasClass("zgIcon-heart")) return;
            Favorite.addFav(id, content, type, cityCode);
        });
    }
};
