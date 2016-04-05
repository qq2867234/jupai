// 问题id
var questionId;	


$(function(){
	
	// 专家显示”专家功能“按钮
	if($.cookie("role")==6||$.cookie("role")==7) 
		$(".expert").show();
	else 
		$(".expert").hide();
	
	// 默认所有问题折叠
	$(".QsBox").each( function(){
		if($("#readOrNot").val() == 'read'){
			$(".QsBox").children("dl").show();
		}
		else{
			$(this).children("dl").hide();
		}
	});
	
	// 点击问题展开答案
	$(".question").click(expandAnswerSimple);
	
	// 提问
	$(".QsBtn").click(showQBox);
	
	// 点赞
	$(".like").click(like);
	
	// 搜索自动提示
	var keyword = "";
	$("#askKeyword").autocomplete({
		minLength : 1,
		width : 318,
		autoFocus : true,
		delay : 10,
		source: function( request, response ) {
			keyword = request.term;
			$.ajax({
	          url: '/Search.action?autoCompleteForAsk',
	          data: {keyword:keyword},
	          type: 'post',
	          dataType: "json",
	          success: function(data, status, xhr) {
				response($.map(data.qbList, function(item, index) {
					return {
						id: item.id,
	                    value: item.content
					};
	            }));												
	          },
	          error: function(data) {
	          }
			});
		},
		select: function( event, ui ) {
			event.preventDefault();
//			this.value = String(ui.item.value);
//			window.location.href="/Ask.action?readQuestion&questionId="+String(ui.item.id)+"&keyword="+keyword;
			window.location.href="/ask/question/"+String(ui.item.id);
		}				
	});
	
	$(".QsBox dd").on("mouseover", function(){
		$(this).find(".share").css("display", "inline-block");
		$(this).find(".like").css("display", "inline-block");
	});
	
	$(".QsBox dd").on("mouseout", function(){
		$(this).find(".share").css("display", "none");
		$(this).find(".like").css("display", "none");
	});
	
	// 专家功能
	$(".expert").click(function(){
		$.ajax({
	        type: "post",
	        url: "/Expert.action?getStatusByZid"
	    }).done(
		function(rtnData) {
			// 已完善，进入专家主页
			if(rtnData.status == 'y'){
				window.location.href="/Expert.action?goToExpertPage";
			}
			// 已激活但是信息未完善
			else if(rtnData.status == 'e'){
				// 弹出层完善专家信息
				improveExpertInfo();
			}
			// 未登录
			else if(rtnData.status == 'n'){
				// 弹出登录窗口
				alert("请以专家身份登录.");
			}
		});
	});
	
	// 分享
//	$(".QsBox").each(function() {
//    	var n = $("title").text();
//        var t = $(this).find(".panel_weibo"), e = $(this).find(".panel_qzone"), i = $(this).find(".content_text p").text();
//        i = i.substring(0, 120);
//        var a = n + i, s = a.substring(0, 120), o = $(this).find("img").attr("src") ? $(this).find("img").attr("src") : "", r = document.URL, c = "", d = "5218817669", m = "zh_cn", l = 400, u = 600, h = ($(window).height() - l) / 2, p = ($(window).width() - u) / 2;
//        t.on("click", function() {
//            return window.open("http://service.weibo.com/share/share.php?url=" + r + "&appkey=" + c + "&title=" + s + "&pic=" + o + "&ralateUid=" + d + "&language=" + m, "_blank", "width=" + u + ", height=" + l + ", top=" + h + ",left=" + p), !1
//        }), e.on("click", function() {
//            return window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + r + "&summary=" + i + "&title=" + n + "&pics=" + o, "_blank", "width=" + u + ", height=" + l + ", top=" + h + ",left=" + p), !1
//        })
//    })
});

//-----------------------------------------------------------------------------------------------------


//完善信息
function improveExpertInfo(){
	var Inv="<div id='expertForm' class='divPopup'><h5>完善专家信息</h5>";
	Inv+="<div class='divLine'><div class='item'>姓名</div><div class='itemInput'><input id='name' class='unit10' type='text' value='"+$.cookie('displayName')+"' autocomplete='off' /></div></div>";
	Inv+="<div class='divLine'><div class='item'>感兴趣话题</div><div class='itemInput'><input id='keyword' class='unit20' type='text' autocomplete='off' placeholder='以空格分隔多个关键词，不填表示\"可回答各方面问题\"' /></div></div>";
	Inv+="<div class='divLine'><div class='item'>机构/职务</div><div class='itemInput'><input id='title' class='unit10' type='text' autocomplete='off' /><span class='Validform_checktip' style='display:inline-block; float:left; width:120px;'></span></div></div>";
	Inv+="<button id='saveExpertInfo' class='confirmBtn btn btn-success' style='margin-left:29%;'>保存</button></div>";
	popBox($(Inv),".cancelBtn");
	$("#saveExpertInfo").bind('click',saveExpertInfo);
}

// 保存完善的完善专家信息
function saveExpertInfo(){
	if($("#title").val() == ''){
		$("#title").siblings(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong");
		$("#title").siblings(".Validform_checktip").text("请输入机构/职务");
		return ;
	}else{
		$("#title").siblings(".Validform_checktip").removeClass("Validform_wrong").addClass("Validform_right");
		$("#title").siblings(".Validform_checktip").empty();
	}
	$("#saveExpertInfo").addClass("forbidBtn");
	$("#saveExpertInfo").unbind("click",saveExpertInfo);
	$.ajax({
        type: "post",
        data: {
           name: $("#name").val(),
           title: $("#title").val(),
           keyword: $("#keyword").val()
        },
        url: "/Expert.action?saveExpertInfo"
    }).done(
	function(rtnData) {
		if(rtnData.status == 'y'){
			$("#expertForm").remove();
			// 弹出层提示修改成功
			var twBox="<div class='divPopup'><div class='textBox'><center>信息保存成功</center></div></div>";
			popBox($(twBox));
			setTimeout(function(){
				window.location.href="/Expert.action?goToExpertPage";
			},1500);
		}else{
			alert("请先登录.");
		}
	});
}



// 提问
function showQBox(){
	
	var con = $("#askKeyword").val();
	if(con == '输入关键词搜索问题和答案') con = '';
	
	var Qs="<div id='qsForm' class='divPopup'><h5>提问</h5><textarea id='qContent'>"+con+"</textarea><span id='warn'></span><span id='overplus'>还能输入50字</span><div class='divLine'><button class='cancelBtn btn btn-danger'>放弃</button><button id='question' class='confirmBtn btn btn-success'>提问</button></div></div>";
	popBox($(Qs),".cancelBtn");
	fnTextVerify($("#qContent"),$("#overplus"),50);
	
	$("#qContent").bind('click',function(){
		$("#overplus").show();
		$("#warn").hide();
	});

	// 提交问题
	$("#question").bind('click', question);
	
}

// 提问
function question(){
	var content = removeHTMLTag($("#qContent").val());  
	if(content.length < 5){
		$("#overplus").hide();
		$("#warn").empty();
		$("#warn").show();
		$("#warn").append("问题不能少于5个字");
		return;
	}
	if(content.length > 50){
		$("#overplus").hide();
		$("#warn").empty();
		$("#warn").show();
		$("#warn").append("问题不能超过50字");
		return;
	}
	$("#question").addClass("forbidBtn");
	$("#question").unbind("click",question);
	
    $.ajax({
        type: "post",
        data: {
        	content: content
    	},
        url: "/Ask.action?question"
    }).done(
	function(rtnData) {
		
		// 包含敏感词
		if(rtnData.status == 'n'){
			$("#overplus").hide();
			$("#warn").empty();
			$("#warn").show();
			$("#warn").append("您的问题中包含敏感词："+rtnData.info+".请修正后再提交.");
			$("#question").removeClass("forbidBtn");
			$("#question").bind("click",question);
		}else{
			$("#qsForm").remove();
			CoverLayer(0);
			
			var questionId = rtnData.questionId;
			
			// 弹出层提示
			var twBox="<div class='divPopup'><div class='textBox'><center>您的问题已提交.我们将推送给相关专家为您解答.</center></div></div>";
			popBox($(twBox));
			setTimeout(function(){
				$(".divPopup").remove();
				CoverLayer(0);
			},2000);
			
			if($(".QnaMenu").find(".on").text() == '最新'){
				// 将用户刚提的问题，动态添加到第一条，让用户能看到自己的提问。
				var nq = '<div class="QsBox"><div class="QsIcon zgIcon zgIcon-question-circle"></div><div class="QsTitle"><input type="hidden" value="'+questionId+'">';
				nq+='<h5 class="question"><a>'+content+'</a></h5><input type="hidden" value="'+questionId+'">';
				nq+='<p class="annotation"><a class="question">0 条回答</a>&nbsp;&nbsp;0 人浏览</p></div>';
            	$(".QsList").prepend($(nq));
            	$(".noResult").remove();
			}
        	
			// 提问完之后在后台默默推送.
			$.ajax({
	            type: "post",
	            data: {
	            	questionId : questionId,
		        	content : content
		        	//keyword: keyword,
	        	},
	            url: "/Ask.action?distributeQuestion"
	        }).done(
	    	function(rtnData) {
	    	});
			
			// 相似问题（可用，但是相似问题目前无法点击展开答案，所以提供也没用，需要考虑如何查看答案）
//        	$.ajax({
//	            type: "post",
//	            data: {
//	            	questionId : questionId,
//		        	content : content,
//	        	},
//	            url: "/Ask.action?getSimilarQuestion",
//	        }).done(
//	    	function(rtnData) {
//	    		var similarQuestion = rtnData.similarQuestion;
//	    		if(similarQuestion.length > 0){
//	    			$(".columnRight").empty();
//	    			var q = '<div class="similarQs"><h5>相似问题</h5><ul>';
//		    		$.each(rtnData.similarQuestion,function(index,element){
//		    			q+='<li>'+element.content+'<p class="annotation tRight">'+element.answers+'人回答</p></li>';
//		    		});
//		    		q+='</ul></div>';
//		    		$(".columnRight").append($(q));
//	    		}
//	        });
			
//			window.location.href="/Ask.action?ask";
		}
    });
}

//答案展开标志，默认为0：未展开
var expandFlag = 0;
//记录上次点击问题的ID
var lastClickQId = 0;
//展开答案（简单版，只要点一次，就增1）
function expandAnswerSimple(){
	// 获取问题id
	var questionId = $(this).parents(".QsBox").find("input").val();
	// 展开
	if(expandFlag == 0 || lastClickQId != questionId){
		$(".QsBox").children("dl").hide();
		$(this).parents(".QsBox").children("dl").show();
		expandFlag = 1;
	}
	// 折叠
	else if(lastClickQId == questionId){
		$(".QsBox").children("dl").hide();
		expandFlag = 0;
	}
	
	// 添加访问记录
	$.ajax({
        type: "post",
        data: {
        	questionId: questionId
    	},
        url: "/Ask.action?recordReadTrack"
    }).done(
	function(rtnData) {
	});
	
	// 记录所点击的问题ID
	lastClickQId = questionId;
}

// 点赞
function like(){
	// 获取点击标签
	var clickTag = $(this);
	// 获取答案id
	var answerId = $(this).prev().val();  
	// 获取问题id
	var questionId = $(this).prev().prev().val();
	// 获取当前点赞状态
	var isLike = clickTag.hasClass("on");
	$.ajax({
        type: "post",
        data: {
        	isLike: isLike,
        	answerId: answerId,
        	questionId: questionId
        },
        url: "/Ask.action?like"
    }).done(
	function(rtnData) {
		// 暂时还没动态更新点赞数
		if(isLike == true){
			clickTag.text(parseInt(clickTag.text())-1);
			clickTag.removeClass("on");
		}else{
			clickTag.text(parseInt(clickTag.text())+1);
			clickTag.addClass("on");
		}
    });
}


/**
 * 时间对象的格式化;
 */
Date.prototype.format = function(format) {
    /*
     * eg:format="YYYY-MM-dd hh:mm:ss";
     */
    var o = {
        "M+" :this.getMonth() + 1, // month
        "d+" :this.getDate(), // day
        "h+" :this.getHours(), // hour
        "m+" :this.getMinutes(), // minute
        "s+" :this.getSeconds(), // second
        "q+" :Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" :this.getMilliseconds()
    // millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
    }

    for ( var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};


//timestamp为时间戳
//format为时间格式 例： "yyyy/MM/dd hh:mm:ss"
function timestampFormat(timestamp,format){    
	return new Date(timestamp).format(format);      
}

//datetime为时间对象
//format为时间格式 例： "yyyy/MM/dd hh:mm:ss"
function dateFormat(datetime,format){    
	return date.format(format);      
}

var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var halfamonth = day * 15;
var month = day * 30;
function getDateDiff(dateTimeStamp) {
	var now = new Date().getTime();
	var diffValue = now - dateTimeStamp;
	if (diffValue < 0) {
		// 若日期不符则弹出窗口告之
		// alert("结束日期不能小于开始日期！");
	}
	var monthC = diffValue / month;
	var weekC = diffValue / (7 * day);
	var dayC = diffValue / day;
	var hourC = diffValue / hour;
	var minC = diffValue / minute;
	if (monthC >= 1) {
		result = "发表于" + parseInt(monthC) + "个月前";
	} else if (weekC >= 1) {
		result = "发表于" + parseInt(weekC) + "周前";
	} else if (dayC >= 1) {
		result = "发表于" + parseInt(dayC) + "天前";
	} else if (hourC >= 1) {
		result = "发表于" + parseInt(hourC) + "个小时前";
	} else if (minC >= 1) {
		result = "发表于" + parseInt(minC) + "分钟前";
	} else
		result = "刚刚";
	return result;
}

function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
//    str = str.replace(/\n/g,' '); //去除行尾空白
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    return str;
}