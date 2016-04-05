// 问题id
var questionId;	
// 点击标签
var clickTag;

$(function(){
	
	// 默认所有问题折叠
	$(".QsBox").each( function(){
		if($("#readOrNot").val() == 'read'){
			$(".QsBox").children("dl").show();
		}
		else{
			if($(this).index()==0) 
				$(this).children("dl").show();
			else 
				$(this).children("dl").hide();
		}
	});
	
	// 已回答和待回答 切换
	$(".QnaMenu li.menuLi").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		// 待回答
		if($(this).index() == 0){
			window.location.href="Expert.action?goToExpertPage&pageNow=1";
		}
		// 已回答
		else if($(this).index() == 1){
			window.location.href="Expert.action?hasAns&pageNow=1";
		}
	});
	
	// 点击问题展开答案
	$(".question").click(expandAnswerSimple);
	
	// 回答
	$(".AnsBtn").click(showABox);
	
	// 补充答案
	$(".appendAnsBtn").click(showAppendABox);
	
	// 邀请
	$(".invite").click(showInvite);
	
	// 忽略不感兴趣的问题
	$(".ignoreQuestion").click(ignoreQuestion);
	
	// 超级专家删除问题
	$(".deleteQuestion").click(deleteQuestion);
	
});

//-----------------------------------------------------------------------------------------------------

// 完善信息
function improveExpertInfo(){
	var Inv="<div id='expertForm' class='divPopup'><h5>完善专家信息</h5>";
	Inv+="<div class='divLine'><div class='item'>姓名</div><div class='itemInput'><input id='name' class='unit10' type='text' value='"+$.cookie('displayName')+"' autocomplete='off' /></div></div>";
	Inv+="<div class='divLine'><div class='item'>感兴趣话题</div><div class='itemInput'><input id='keyword' class='unit20' type='text' autocomplete='off' placeholder='以空格分隔多个关键词，不填表示\"可回答各方面问题\"' /></div></div>";
	Inv+="<div class='divLine'><div class='item'>机构/职务</div><div class='itemInput'><input id='title' class='unit10' type='text' autocomplete='off' /><span class='Validform_checktip''></span></div></div>";
	Inv+="<button id='saveExpertInfo' class='confirmBtn btn btn-success' style='margin-left:40%;margin-top:5px;'>保存</button></div>";
//	Inv+="<div class='divLine'><button id='saveExpertInfo' class='confirmBtn btn btn-success'>保存</button><button class='cancelBtn btn btn-danger'>放弃</button></div></div>";
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

// 显示回答弹出层
function showABox(){
	// 获取问题内容
	var qContent = $(this).parents(".QsBox").find("h5").text();
	// 弹出回答窗口
	var Ans="<div id='ansForm' class='divPopup'><h5>"+qContent+"</h5><textarea id='inputAns'></textarea><span id='overplus'>还能输入200字</span><div class='divLine'><button id='answer' class='confirmBtn btn btn-success'>回答</button><button class='cancelBtn btn btn-danger'>放弃</button></div></div>";
	popBox($(Ans),".cancelBtn");
	fnTextVerify($("#inputAns"),$("#overplus"),200);
	// 获取点击标签
	clickTag = $(this);
	// 获取问题id
	questionId = $(this).prev().val();
	// 回答问题
	$("#answer").bind('click', answer);
}

// 回答
function answer(){
	// 答案内容
	var aContent = removeHTMLTag($("#inputAns").val());
	if(aContent.length < 5){
		$("#overplus").text("回答不能少于5个字");
		return;
	}
	$("#answer").addClass("forbidBtn");
	$("#answer").unbind("click",answer);
	$.ajax({
        type: "post",
        data: {
           questionId: questionId,
           content: aContent
        },
        url: "/Ask.action?answer"
    }).done(
	function(rtnData) {
		if(rtnData.status == 'y'){
			// 移除答案输入框
			$("#ansForm").remove();
			CoverLayer(0);
			
			// 弹出层提示
			var twBox="<div class='divPopup'><div class='textBox'><center>您的答案已提交.</center></div></div>";
			popBox($(twBox));
			setTimeout(function(){
				$(".divPopup").remove();
				CoverLayer(0);
				// 移除待回答问题
				clickTag.parents(".QsBox").fadeOut(1000, function(){
					clickTag.parents(".QsBox").remove();
				});
			},1500);
		}else{
			alert(rtnData.info);
		}
	});
}

//补充答案弹出层
function showAppendABox(){
	var Ans="<div id='ansForm' class='divPopup'><h5>"+$(this).parents(".QsBox").find("h5").text()+"</h5><textarea id='inputAns'></textarea><span id='overplus'>还能输入200字</span><div class='divLine'><button id='answer' class='confirmBtn btn btn-success'>回答</button><button class='cancelBtn btn btn-danger'>放弃</button></div></div>";
	popBox($(Ans),".cancelBtn");
	fnTextVerify($("#inputAns"),$("#overplus"),200);
	// 获取点击标签
	clickTag = $(this);
	// 获取问题id
	questionId = $(this).prev().val();
	// 回答问题
	$("#answer").bind('click', appendAnswer);
}

// 补充答案
function appendAnswer(){
	var aContent = removeHTMLTag($("#inputAns").val());
	if(aContent.length < 5){
		$("#overplus").text("回答不能少于5个字");
		return;
	}
	$("#answer").addClass("forbidBtn");
	$("#answer").unbind("click",appendAnswer);
//	alert(aContent.replace(/\n/g,"<br>"));
//	aContent = aContent.replace(/\n/g,"<br>");
	$.ajax({
        type: "post",
        data: {
           questionId: questionId,
           content: aContent
        },
        url: "/Ask.action?answer"
    }).done(
	function(rtnData) {
		if(rtnData.status == 'y'){
			answer = rtnData.answer;
			
			var ans = '<dd><div class="name"><a>'+timestampFormat(answer.createdtime,"yyyy/MM/dd hh:mm:ss")+'</a></div><p>'+answer.content.replace(/\n/g,"<br>")+'</p></dd>';
			
			// 补充答案时，追加在最后一行（答案的排序，从上到下，按时间递"增"）
            clickTag.parents(".QsBox").children("dl").append($(ans));
			// 补充答案时，追加在第一行（答案的排序，从上到下，按时间递"减"）
//            clickTag.parents(".QsBox").children("dl").prepend($(ans));
            
            // 移除问题输入框
            $("#ansForm").remove();
            CoverLayer(0);

            // 重新绑定 展开答案点击事件
        	$(".question"+questionId).bind('click',expandAnswerSimple);
            
		}else{
			alert(rtnData.info);
		}
	});
}

//答案展开标志，默认为0：未展开
var expandFlag = 0;
// 记录上次点击问题的ID
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

// 展开答案
function expandAnswer(){
	
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
	
	// 如果前后两次点击的是同一个问题，那么则不记录访问
	if(questionId != lastClickQId){
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
	}
	// 记录所点击的问题ID
	lastClickQId = questionId;
}

// 显示邀请弹出层
function showInvite(){
	var Inv="<div id='inviteForm' class='divPopup'><h5>邀请专家</h5>";
	Inv+="<div class='divLine'><ul class='hMenu' id='call'><li class='on'>先生</li><li>女士</li></ul></div>";
	Inv+="<div class='divLine'><input id='name' type='text' style='width:100px; margin:0 10px 0 0;' autocomplete='off' placeholder='对方的姓名'/>";
	Inv+="<input id='contact' type='text' autocomplete='off' style='width:200px; margin:0;' placeholder='对方的手机/邮箱'/>";
//	Inv+="<span id='nameMsg' style='width:100px; margin:0 0 0 0;'></span><span id='errorMsg' style='width:80px; margin:0 0 0 110px; display:inline'></span></div>";
//	Inv+="<span id='errorMsg' style='width:120px; margin:0 0 0 110px;'></span></div>";
	Inv+="<span id='errorMsg'></span></div>";
	Inv+="<div class='btnBox'><button class='cancelBtn btn btn-danger'>放弃</button><button id='invite' class='confirmBtn btn btn-success'>邀请</button></div></div>";
	popBox($(Inv),".cancelBtn");
	
	$(".hMenu li").bind('click',function(){
		$(this).addClass("on").siblings().removeClass("on");
	});
	
	// 发送邀请
	$("#invite").bind('click',invite);
}

// 发送邀请
function invite(){
	 var contact = $("#contact").val();
	 var name = $("#name").val();
//	 var call = $("#call").val();
	 var call = $(".hMenu").find(".on").text();
	 var mobile = /^0?1[3|4|5|8][0-9]\d{8}$/;
	 var email =  /^([A-Za-z\d]+)([\._A-Za-z\d-]+)?@([A-Za-z\d])(([_A-Za-z\d-])+)?(\.[_A-Za-z\d-]+)*\.([A-Za-z]{2,4})$/;
	 var nameReg = /^[a-zA-Z0-9_\\-\\.@\u4E00-\u9FA5]+$/;
	 if(name.trim() == ""){
		 $("#errorMsg").empty();
		 $("#errorMsg").css("color","red");
		 $("#errorMsg").append("请输入对方的姓名");
	 }
	 else if(!nameReg.test(name)) {
		 $("#errorMsg").empty();
		 $("#errorMsg").css("color","red");
		 $("#errorMsg").append("请输入合法的姓名");
	 }
	 else if(contact.trim() == ""){
		 $("#errorMsg").empty();
		 $("#errorMsg").css("color","red");
		 $("#errorMsg").append("请输入对方手机/邮箱");
	 }
	 else if (!email.test(contact) && !mobile.test(contact)) {
		 $("#errorMsg").empty();
		 $("#errorMsg").css("color","red");
		 $("#errorMsg").append("手机/邮箱格式错误");
	 } else {
		 // disable按钮(IE下无效)
//		 $("#invite").attr("disabled",true);
//		 $("#invite").css("background","gray");
		 $("#invite").addClass("forbidBtn");
		 $("#invite").unbind("click",invite);
		 mobile = removeHTMLTag(contact);
		 $.ajax({
	        type: "post",
	        data: {
	        	contact : contact,
	        	name : name,
	        	call : call
	        },
	        url: "/Invite.action?inviteExpert"
	    }).done(
		function(rtnData) {
			if(rtnData.status == 'y'){
				$("#inviteForm").remove();
				CoverLayer(0);
				if(rtnData.loginType == 1){
					// 弹出层提示
					var twBox="<div class='divPopup'><div class='textBox'><center>邀请函已成功发送至对方邮箱.</center></div></div>";
					popBox($(twBox));
					setTimeout(function(){
						$(".divPopup").remove();
						CoverLayer(0);
					},1500);
				}else if(rtnData.loginType == 2){
					var twBox="<div class='divPopup'><div class='textBox'><center>邀请函已成功发送至对方手机.</center></div></div>";
					popBox($(twBox));
					setTimeout(function(){
						$(".divPopup").remove();
						CoverLayer(0);
					},1500);
				}else{
					alert("手机/邮箱格式不正确");
				}
			}else{
				alert(rtnData.info);
			}
		});
	 }
}

// 忽略不感兴趣的问题
function ignoreQuestion(){
	var clickTag = $(this).parents(".QsBox");
	var questionId = clickTag.find("input").val();
	 $.ajax({
        type: "post",
        data: {
        	questionId : questionId
        },
        url: "/Expert.action?ignoreQuestion"
    }).done(
	function(rtnData) {
		if(rtnData.status == 'y'){
			clickTag.fadeOut(1000, function(){
				clickTag.remove();
			});
		}else{
			alert("系统异常，请稍后再试");
		}
	});
}

// 删除问题
function deleteQuestion(){
	var clickTag = $(this).parents(".QsBox");
	var questionId = clickTag.find("input").val();
	 $.ajax({
        type: "post",
        data: {
        	questionId : questionId
        },
        url: "/Expert.action?deleteQuestion"
    }).done(
	function(rtnData) {
		if(rtnData.status == 'y'){
			clickTag.fadeOut(1000, function(){
				clickTag.remove();
			});
		}else{
			alert("系统异常，请稍后再试");
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