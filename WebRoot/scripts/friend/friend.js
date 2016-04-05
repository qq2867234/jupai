var isOpen = false; // 判断联系人列表是否展开

var socket; // 每个用户登录后的唯一通话通道

// 用户当前停留的界面
var AT_INIT = 1; 			// 初始状态，还未打开过消息界面
var AT_TALKLIST = 2;		// 消息列表界面
var AT_CONTACT = 3;			// 联系人列表界面
var AT_TALK_GROUP = 4;		// 讨论组对话界面
var AT_TALK_CONTACT = 5;	// 联系人对话界面
var AT_TALK_SERVICE = 6;	// 客服交谈界面
var where = AT_INIT;

// talklist type
var contactMsg = 1;   // 联系人发送的消息
var groupMsg = 2;     // 组内发送的消息
var broadcastMsg = 3; // 广播消息
var systemMsg = 9;    // 系统信息
var marketingMsg = 8; // 营销消息

// msg type
var MSG_TEXT = 1;              // 文本消息
var MSG_PIC = 2;               // 图片消息
var MSG_AUDIO = 3;             // 语音消息

var MSG_CONTACT_VALIDATE = 10; // 验证消息
var MSG_CONTACT_AGGREE = 11;   // 通过验证
var MSG_CONTACT_REFUSE = 12;   // 拒绝验证
var MSG_CONTACT_DELETE = 13;   // 删除好友

var MSG_GROUP_CREATE = 14;       // 发起讨论
var MSG_GROUP_INVITE_ME = 15;    // 邀请我
var MSG_GROUP_INVITE_OTHER = 16; // 邀请其它成员
var MSG_GROUP_DELETE_ME = 17;    // 我被踢出讨论组
var MSG_GROUP_DELETE_OTHER = 18; // 其他人被踢出讨论组
var MSG_GROUP_DISMISS = 19;      // 解散讨论组
var MSG_GROUP_QUIT = 20;         // 退出讨论组(同MSG_GROUP_DELETE_OTHER)

// event
var CHAT_EVENT = "chatEvent";     // 聊天事件
var NOTICE_EVENT = "noticeEvent"; // 通知事件
var msgObject; // 要发送的消息对象
var msg;       // 消息内容
var fromZid;   // 消息发送方zid
var talkId;    // 对话id
var msgType;   // 消息类型

var currentTalkId;    // 记录当前正在进行对话的talkId
var currentTalkerZid; // 记录当前正在进行对话的所有用户zid

var MSG_ME = 0;      // 自己发送的消息
var MSG_OTHER = 1;   // 别人发送的消息
var MSG_NEW = 1; // 新的消息
var MSG_DB = 0;  // 数据库中取出来旧的消息

var talkListName; // 对话列表名称

var addZid;  // 要添加的联系人zid

var sendUrl; // 发送图片的url(date/xxx.jpg)

var isCreateOrAdd = 1; // 1表示创建组,2表示向已有的组中增加成员

var pageNow = 1; // 当前页

var timeFlag = true;
var nextTime = 0;
var matchingTime = 0;

var flag = true;

var friendEditor; // 用来发送图片的

/////////////////【备忘】//////////////////////////////////////////////////////////////////////////////////
// 1、用户刚登录的时候，由于页面并不会刷新，所以有些数据(zid,photo等)拿不到，解决办法是：在/WebRoot/public/script/public.js中的方法afterLogin内，准备需要的数据
// 2、用户登录后，刷新页面后，在afterLogin内准备的数据将被清除，这时候解决办法是：在/WebRoot/WEB-INF/include/public.jsp中，准备需要的数据
///////////////////////////////////////////////////////////////////////////////////////////////////////////

$(function(){
	
	// 判断是否登录，若已登录，则连接服务器
    if(checkLogin()){
    	$('#toFriend').css('display','block');
    	// 连接并注册 CHAT_EVENT事件和NOTICE_EVENT事件
    	ioConnect();
    }else{
    	$('#toFriend').hide();
    }
    
	// 联系客服
//	$("#customService").click(function() {
//        $.ajax({
//        	type: "post",
//    		dataType: "json",
//    		url:"/ChatSystem.action?service"
//        }).done(
//        function(rtnData) {
//        	if(rtnData.status == 'n'){
//        		$("#loginBtn").click();
//        	}else{
//        		// 如果之前是在线但未进入列表状态
//            	if (where == AT_INIT) {
//                    isOpen = true;
//	                InitFriend();
//            		$("#friend").show();
//            		fnShowClass(".chatList");
//            		$('#friendHead .chatList .title').text(rtnData.name);
//            		currentTalkId = rtnData.talkId;
//            		currentTalkerZid = rtnData.zid;
//            		getAllTalk(currentTalkId);
//            		where = AT_TALK_SERVICE;
//            	}else if(where == AT_TALK_SERVICE){
//            		if (isOpen) {
//                    	isOpen = false;
//                    } else {
//                    	isOpen = true;
//                    }
//            		$("#friend").toggle();
//            	}else{
//            		isOpen = true;
//            		$("#friend").show();
//            		fnShowClass(".chatList");
//            		$('#friendHead .chatList .title').text(rtnData.name);
//            		currentTalkId = rtnData.talkId;
//            		currentTalkerZid = rtnData.zid;
//            		getAllTalk(currentTalkId);
//            		where = AT_TALK_SERVICE;
//            	}
//        	}
//        });
//	});
    
	// 回车发送消息
    $("#inputMsg").keydown(function(e){ 
        if(e.which == 13){ 
        	// ?兼容性
            $("#sendTextMsg").submit(); 
            return false; 
        } 
    });
    
	// 回车查找联系人
    $("#searchName").keydown(function(e){ 
        if(e.which == 13){ 
            $("#searchBtn").click(); 
            $("#searchName").blur();
            return false; 
        } 
    });
    
    // 字数统计
    fnTextVerify($("#inputMsg"),$("#num"),200);
    fnTextVerify($("#verifyMsg"),$("#verifyNum"),20);
    
    // 绑定【消息】点击事件（不管有无新消息，都直接显示之前的停留页）
    $("#toFriend").click(function(){
    	
    	// 如果之前是在线但未进入列表状态
    	if (where == AT_INIT) {
    		where = AT_TALKLIST;
    		isOpen = true;
    		newMsgHide();
    		InitFriend();
    		$("#friend").show();
			fnShowClass(".msgRecord");
			getAllTalkList();
			return ;
    	}
    	
    	// 如果有新消息
    	if (!$("#toFriend .newMSG").is(":hidden")) {
    		where = AT_TALKLIST;
    		isOpen = true;
    		newMsgHide();
    		$("#friend").show();
    		fnShowClass(".msgRecord");
    		return;
    	}
    	
    	// 其它情况切换消息框显示状态
		if (isOpen) {
        	isOpen = false;
        } else {
        	isOpen = true;
        }
		$("#friend").toggle();
	});
    
    /**
     * 消息
     */
	// 消息列表界面
	fnClickBtn(".liRecord",".msgRecord",getAllTalkList);
	
	/**
	 * 联系人
	 */
	// 联系人界面
	fnClickBtn(".liFriend",".friendList",getAllContact,1);
	// 添加联系人界面
	fnOprFD("#searchFriendBtn",".searchFriend",function(){$("#searchName").focus();});
	// 绑定【添加联系人】事件（需要前置判断时候，fnClickBtn不适用）
	$("#searchBtn").click(function(){
		if($.trim($('#searchName').val())=='') return;
		searchContact();
	});	
	// 取消添加联系人
	fnClickBtn("#searchCancelBtn","#friendFooter .friendList");
	// 绑定【发送验证】事件
	fnClickBtn(".verifyConfirmBtn",".msgRecord",addContact);
	// 取消发送验证,回到联系人列表
	fnClickBtn(".verifyCancelBtn",".friendList",getAllContact,1);
	// 返回(发送验证界面)
	fnClickBtn(".FDVerify .returnBtn",".msgRecord");
	
	/**
	 * 聊天
	 */
	// 返回(普通对话框界面)
	fnClickBtn("#friendHead .chatList .returnBtn",".msgRecord",getAllTalkList);
	// 绑定【发送消息】事件
    $("#sendTextMsg").submit(function(){
    	return sendMsg(1);
    });
    // 绑定【选择图片】事件
	$("#picIcon").click(choosePic);
    // 绑定【发送图片】事件
	$("#sendPicMsg").click(function(){
		return sendMsg(2);
    });
	
	/**
	 * 讨论组
	 */
	// 开始发起讨论
	fnClickBtn("#toGroupChatBtn",".groupChat",getAllContact,2);
	// 确认发起讨论
	fnOprFD(".groupChatBtn","",createGroup);
	// 取消发起讨论
	fnOprFD(".groupChatCancelBtn",".friendList",fnGroupChatQuit);
	// 返回(讨论组对话框界面)
	fnClickBtn("#friendHead .groupChatList .returnBtn",".msgRecord",getAllTalkList);
	// 编辑讨论组
	fnClickBtn(".groupTitle",".groupEdit",groupEdit);
	// 重命名讨论组
	fnClickBtn(".reNameBtn","",groupReName);
	// 取消编辑讨论组页面
	fnClickBtn(".groupEditCancelBtn",".groupChatList",getAllTalk,currentTalkId);
	// 退出讨论组
	fnClickBtn(".groupQuitBtn","",groupQuit);
	// 邀请加入讨论组
	fnClickBtn(".groupAddBtn","",addGroupMember);
	// 取消邀请讨论组成员
	fnClickBtn(".groupAddCancelBtn",".groupEdit",groupEdit);
	
	
	// 发送文本消息和图片消息的切换
	$("#textIcon").click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		$(this).parents('.chatList').children('form').show().end().children('.uploadPic').hide();
		$("#inputMsg").focus();
	});
	$("#picIcon").click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		$(this).parents('.chatList').children('.uploadPic').show().end().children('form').hide();
		$("#inputMsg").blur();
	});
	// 删除联系人界面
	// fnClickBtn("#delFDCancelBtn",".friendList",fnReturnFDList,0);
	// fnClickBtn("#delFDConfirmBtn",".friendList",fnReturnFDList,1);
	// 联系人详情 searchContact
	// fnOprFD("#searchBtn",".searchFDInfor",searchContact);
	// fnOprFD("#searchBtn",".searchFDInfor",function(obj){
	// //opr为对应参数,可以为json,赋值可以参见函数fnOprFD
	// //alert(opr);
	// });
});

/**
 * 事件绑定类
 * @param btn 触发事件的类
 * @param div 显示的类
 * @param fn  调用的函数
 * @param opr 传入的参数
 */
function fnClickBtn(btn,div,fn,opr){
	//opr为外部参数
	$(btn).click(function(){
		if(div!='')
			fnShowClass(div);
		if(fn)
			fn(opr);
	});	
}

/**
 * 显示指定的class
 * @param div
 */
function fnShowClass(div){
	$(div).each(function(){
		$(this).show().siblings().hide();		
	});		
}

function fnGroupChatQuit(opr){
	//从删除联系人, 返回联系人列表操作
	//opr=1时执行删除操作,opr=0时不执行
	$('.content.groupChat').children('.fds').each(function(){
		$(this).find('b,.chatFDCheck').remove();
		$(this).unbind('click').removeClass('checked');
		fnOprFD(".fds",".searchFDInfor",function(opr){});
	});
}

function fnGroupChat(){
	getAllContact();
	//进入删除联系人界面
	$('.content.groupChat').children('.fds').each(function(){
		var oCheck = "<b class='del'></b><input type='checkbox' class='chatFDCheck'/>";
		$(this).append($(oCheck)).unbind('click').bind('click',function(){
			if ($(this).find('.chatFDCheck').attr('checked')) {
				$(this).removeClass('checked').find('.chatFDCheck').removeAttr('checked');
			}
			else{
				$(this).addClass('checked').find('.chatFDCheck').attr('checked','checked');
			}
		});
	});
}

function fnOprFD(btn,div,fn){
	//对每个联系人的操作,联系人类名btn
	$(btn).click(function(){
		// if(fnPrev){
		// 	fnPrev();
		// }
		//opr 可以自行定义为页面需要的和btn对应的任何参数,这里只是举例,没有实际意义
		fnShowClass(div);
		if(fn){
			fn($(this));
		}
	});
}

/**
 * 提示弹出层
 * @param warnText  提示内容
 * @param confirmfn 点击确定调用的函数
 */
function fnWarnPop(warnText,confirmfn,param){
    var oCover = "<div class='oCover'></div>";
    var oPop = "<div class='oPop'><div class='text'>"+warnText+"</div><a class='cancelBtn'>取消</a><a class='confirmBtn'>确定</a></div>";
    $("#friendBody").css('overflow','visible');
    $(oCover).appendTo($("#friendBody")).css('height', $("#friend").height());
    $(oPop).appendTo($("#friendBody")).children(".confirmBtn,.cancelBtn")
        .bind("click",function(){
        	//stopProp(e);
            if($(this).hasClass('confirmBtn')&&confirmfn)
                confirmfn(param);
            $(".oCover").remove();
            $(this).parents(".oPop").remove();
            $("#friendBody").css('overflow','hidden');
            return false;
        });
}

/**
 * 提示弹出层（只有确定，不带取消按钮）
 * @param warnText  提示内容
 * @param confirmfn 点击确定调用的函数
 */
function fnWarnPopNoCancel(warnText,confirmfn,param){
    var oCover = "<div class='oCover'></div>";
    var oPop = "<div class='oPop'><div class='text'>"+warnText+"</div><a class='confirmBtn'>确定</a></div>";
    $("#friendBody").css('overflow','visible');
    $(oCover).appendTo($("#friendBody")).css('height', $("#friend").height());
    $(oPop).appendTo($("#friendBody")).children(".confirmBtn")
        .bind("click",function(){
        	//stopProp(e);
            if($(this).hasClass('confirmBtn')&&confirmfn)
                confirmfn(param);
            $(".oCover").remove();
            $(this).parents(".oPop").remove();
            $("#friendBody").css('overflow','hidden');
            return false;
        });
}

/**
 * 向后台服务器发起连接请求，同时注册CHAT_EVENT事件和NOTICE_EVENT事件
 */
function ioConnect() {
//	alert($('#isUnread').val()+"--"+where+"---"+zid+"---"+photoPath+"--"+photo+"--"+name);
	
	// 如果该用户有未处理的信息
    if ($('#isUnread').val() > 0)
        newMsgShow();
    else
    	newMsgHide();
    
    socket = io.connect(chatServerAddr);
    
	socket.on('connect', function() {
//		alert("connect");
	});

	socket.on('disconnect', function() {
//		alert("disconnect event active");
	});
	
	/** 
     * 注册CHAT_EVENT事件（接收聊天消息）
     * @param data {
     * 			message  消息内容
     * 			fromUser 消息发送方zid
     * 			talkId   对话id
     * 			msgType  消息类型 1-文本消息 2-图片 3-语音
     * 		  }
     */
	socket.on(CHAT_EVENT, function(data) {
		msg = decodeURIComponent(data.message);
		msg = removeHTMLTag(msg);
		fromZid = data.fromUser;
		talkId = data.talkId;
		msgType = data.msgType;
    
//    	alert('处理message事件：msg='+msg+' id='+id+' talkId='+talkId+' msgType='+msgType+' where='+where+" isOpen="+isOpen);
        // 如果未点过消息
        if (where == AT_INIT) {
        	newMsgShow();
            // 更新谈话列表中的信息
            $.ajax({
                type: "post",
                data: "talkId=" + talkId,
                url: "/ChatSystem.action?addAnUnreadMsg"
            });
        }
        // 如果当前在聊天记录列表中
        else if (where == AT_TALKLIST) {
        	if(isOpen){
        		newMsgHide();
            }else{
            	newMsgShow();
            }
        	addunReadNumInTalkList(talkId, fromZid, msg, msgType);
        }
        // 如果当前用户在联系人列表下
        else if (where == AT_CONTACT) {
        	newMsgShow();
        	addunReadNumInTalkList(talkId, fromZid, msg, msgType);
        }
        // 如果当前用户在多人对话列表下
        else if (where == AT_TALK_GROUP) {
        	if (currentTalkId == talkId) {
            	if(isOpen){
            		newMsgHide();
                }else{
                	newMsgShow();
                }
            	addNewTalk(fromZid, msg, msgType);
            } else {
            	newMsgShow();
            	addunReadNumInTalkList(talkId, fromZid, msg, msgType);
            }
        }
        // 如果当前用户已经进入了聊天界面
        else if (where == AT_TALK_CONTACT || where == AT_TALK_SERVICE) {
            // 如果该用户正在相同主题下（即具有相同的talkId）的对话框
            if (currentTalkId == talkId) {
            	if(isOpen){
            		newMsgHide();
                }else{
                	newMsgShow();
                }
            	addNewTalk(fromZid, msg, msgType);
            } else {
            	newMsgShow();
            	addunReadNumInTalkList(talkId, fromZid, msg, msgType);
            }
        };
    });
	
	/** 
     * 注册NOTICE_EVENT事件（接收通知消息）
     * @param data {
     * 			message  消息内容
     * 			fromUser 消息发送方zid
     * 			talkId   对话id
     * 			msgType  消息类型 1-文本消息 2-图片 3-语音 0-系统消息 9-验证消息  8-通过验证 7-邀请讨论
     * 		  }
     */
	socket.on(NOTICE_EVENT, function(data) {
		msg = removeHTMLTag(data.message);
		fromZid = data.fromUser;
		talkId = data.talkId;
		msgType = data.msgType;
		
		// 拒绝添加
		if(msgType == MSG_CONTACT_REFUSE){
			$(".msg_"+talkId).remove();
		}
		// 其他人被移除讨论组/退出讨论组，更新talkerIds
		else if(msgType == MSG_GROUP_DELETE_OTHER){
			if(where == AT_TALKLIST || where == AT_TALK_GROUP || where == AT_TALK_CONTACT || where == AT_TALK_SERVICE){
				// 取消原来绑定的事件
				$(".msg_"+data.talkId).unbind();
				var param = {
						talkId : data.talkId,
						talkListName : $(".msg_"+data.talkId+" .dlName .friendName").text(),
						talkerIds : msg.replace("_"+zid ,"")
				};
				// 重新绑定新事件
				fnClickBtn(".msg_"+data.talkId,".groupChatList",startGroupChat,param);
				if(where == AT_TALK_GROUP || where == AT_TALK_CONTACT){
					if(currentTalkId == data.talkId){
						currentTalkerZid = param.talkerIds;
					}
				}
			}
		}
		// 当前用户被移出讨论组
		else if(msgType == MSG_GROUP_DELETE_ME){
			if(where == AT_TALKLIST || where == AT_TALK_GROUP || where == AT_TALK_CONTACT || where == AT_TALK_SERVICE){
				$(".msg_"+data.talkId).remove();
				if(where == AT_TALK_GROUP || where == AT_TALK_CONTACT){
					if(currentTalkId == data.talkId){
						// 跳转回消息列表
						fnWarnPopNoCancel("你已被移出该讨论组", fnShowClass, ".msgRecord");
					}
				}
			}
		}
		// 解散讨论组
		else if(msgType == MSG_GROUP_DISMISS){
			if(where == AT_TALKLIST || where == AT_TALK_GROUP || where == AT_TALK_CONTACT || where == AT_TALK_SERVICE){
				$(".msg_"+data.talkId).remove();
				if(where == AT_TALK_GROUP || where == AT_TALK_CONTACT){
					if(currentTalkId == data.talkId){
						// 跳转回消息列表
						fnWarnPopNoCancel("讨论组已解散", fnShowClass, ".msgRecord");
					}
				}
			}
		}
		// 邀请新成员加入，更新talkerIds
		else if(msgType == MSG_GROUP_INVITE_OTHER){
			if(where == AT_TALKLIST || where == AT_TALK_GROUP || where == AT_TALK_CONTACT || where == AT_TALK_SERVICE){
				// 取消原来绑定的事件
				$(".msg_"+data.talkId).unbind();
				var param = {
						talkId : data.talkId,
						talkListName : $(".msg_"+data.talkId+" .dlName .friendName").text(),
						talkerIds : msg.replace("_"+zid ,"")
				};
				// 重新绑定新事件
				fnClickBtn(".msg_"+data.talkId,".groupChatList",startGroupChat,param);
				if(where == AT_TALK_GROUP || where == AT_TALK_CONTACT){
					if(currentTalkId == data.talkId){
						currentTalkerZid = param.talkerIds;
					}
				}
			}
		}
		// 我被对方从联系人列表删除了
		else if(msgType == MSG_CONTACT_DELETE){
			if(where == AT_TALKLIST){
				$(".msg_"+data.talkId).remove();
			} else if(where == AT_CONTACT){
				$(".fds_"+data.toUser).remove()	;
			} else if(where == AT_TALK_CONTACT){
				if(currentTalkId == data.talkId){
					$(".msg_"+data.talkId).remove();
					// 跳转回消息列表
					fnWarnPopNoCancel("你已被对对方删除", fnShowClass, ".msgRecord");
				}
			}
		}
	});
}

/**
 * 显示新消息提示
 */
function newMsgShow(){
	$('#toFriend .newMSG').show();
}

/**
 * 隐藏新消息提示
 */
function newMsgHide(){
	$('#toFriend .newMSG').hide();
}

/**
 * 显示留言小窗口
 * @param box 触发事件的标签(this)
 */
function showMsgBox(box, snum){
	$("#sendMsgBroker").remove();
	var mDiv = "<span id='sendMsgBroker' class='sendMsg'><q><span id='num'>还能输入40字</span>" +
    "<button type='button' id='sendClose' onclick='sendClose(this);'><span class='zgIcon zgIcon-remove'></span></button>"+
	"<textarea id='sendText' rows='2'></textarea>" +
	"<button type='button' class='btn btn-primary sm-btn' id='sendOut' onclick='sendOut(this);'>发送</button></q></span>";
	
    if($(box).is("#timeLineMessage")){
        $(mDiv).insertAfter($(box)).show().css({left:$(box).position().left-200+'px',top:'50px'});
    }
    else{
        $(mDiv).insertAfter($(box)).show();
    }
	if(snum){
		$("#sendMsgBroker,#sendMsgBroker *").bind('click', function(e) {
            e.preventDefault();
	 		stopProp(e);

	 	});
	}
	fnTextVerify($("#sendText"),$("span#num"),40);
}
function sendClose(box){
	$(box).parents('#sendMsgBroker').hide();
}
function sendOut(box) {
	var zid = $(box).parents('#sendMsgBroker').prev().attr("zid");
//	var message = $("#sendText").val();
	var message = $(box).prev().val();
	if($.trim(message).length == 0){
		$("span#num").text("请输入信息");
		return;
	}
	if(zid != "" && zid != null && zid != undefined) {
		// 给经纪人留言
		leaveMessage(zid,message);	
	}
}

/**
 * 留言(给经纪人和业主留言)
 * @param id      对方zid
 * @param message 留言内容
 */
function leaveMessage(id, message){
	$.ajax({
        type: "post",
        data: {
        	zid: id,
        	message: message
        },
        url: "/ChatSystem.action?leaveMessage"
    }).done(
    function(rtnData) {
    	if(rtnData.status == 1){
    		var msgBox = $("#sendMsgBroker");
    		// 正常
			msgBox.children().remove();
			msgBox.append("消息已发送.");
			setTimeout(function(){
				msgBox.remove();
			},1000);
    	}else if(rtnData.status == 2){
    		// 未登录
    		$("#loginBtn").click();
    	}
    });
} 

/**
 * 发消息接口(一对一)
 * @param ownerZid   发送方zid  
 * @param memberZid  接收方zid 
 * @param message    消息内容
 */ 
function sendMessage(ownerZid,memberZid,message){
	$.ajax({
        type: "post",
        data: {
        	fromZid: ownerZid,
        	toZid: memberZid,
        	message: message,
        	talkType: 1
        },
        url: "/ChatSystem.action?sendMessage"
    }).done(
    function(rtnData) {
    	// 发送成功提示
    	// ...
    });
}

// 发消息接口(多对多)，参数 发送方zid_接收方zid1_zid2...
// ...


/**
 * 追加一条别人发来的新消息
 * @param id      发送方zid
 * @param msg     消息内容
 * @param msgType 消息类型
 */
function addNewTalk(id, msg, msgType){
	$.ajax({
        type: "post",
        data: "contactId=" + id,
        url: "/ChatSystem.action?getContactInfo"
    }).done(
    function(rtnData) {
    	generateATalk(msgType, id, rtnData.displayName, rtnData.photo, formatTime(), msg, MSG_OTHER, MSG_NEW);
    	scrollToButtom();
    });
}


/**
 * 判断用户登录状态
 */
function checkLogin() {
	var status=false;
	$.ajax({
		dataType: "json",
		url:"/UserCenterController.action?checkLoginStatus",
		async:false,
		success:function(e){
			if(e.status=="y"){
				status=true;
			}else{
				status=false;
			}
		}
	});
	return status;
}

/**
 * 异步得到所有的聊天记录
 */ 
function getAllTalkList() {
	where = AT_TALKLIST;
	isOpen = true;
	newMsgHide();
	// 移除原来的消息列表(放在这里存在的问题：如果连续点击消息，刷新两次，
	// 由于是异步的，执行两次该方法，它们几乎同时把原来的列表清空，之后陆续获取到数据拼接到消息列表，就重复显示了)
	//	$("#friendBody .msgRecord").children().remove();
	// 移除聊天记录（不然的话每次进入对话界面，都会先显示原来的记录，然后再替换成新的记录）
	$("#friendBody .chatList").children().remove();
    $.ajax({
        type: "post",
        url: "/ChatSystem.action?getAllTalkList"
    }).done(
    function(rtnData) {
    	// 移除原来的消息列表（从上面移到这可以解决）
    	$("#friendBody .msgRecord").children().remove();
        if (rtnData != null && rtnData !="") {
            $.each(
            rtnData,
            function(index, element) {
            	// talklist
            	var oDL="";
            	// 联系人消息 1
            	if (element.talkType == contactMsg){
            		// 如果是验证信息，需要先同意才能进行通话
            		if (element.msgType == MSG_CONTACT_VALIDATE) {
            			// 收到的验证消息
            			if(element.lastMsg.indexOf("向 Ta")==-1){
            				oDL = "<div class='verifyResMsg msg_"+element.talkId+"'>";
            			}
            			// 发出的验证消息
            			else {
            				oDL = "<div class='verifyReqMsg msg_"+element.talkId+"'>";
            			}
            		} else{
            			oDL = "<a class='chatMsg msg_"+element.talkId+"'>";
            		}
            	} 
            	// 讨论组消息 2
            	else if (element.talkType == groupMsg) {
            		oDL = "<a class='groupMsg msg_"+element.talkId+"'>";
            	} 
            	// 系统消息9 、营销消息 8
            	else if (element.talkType == marketingMsg || element.talkType == systemMsg) {
            		oDL = "<a class='sysMsg msg_"+element.talkId+"'>";
            	}
            	// 广播消息 3
                else if (element.talkType == broadcastMsg) {
                	oDL = "<a class='chatMsg msg_"+element.talkId+"'>";
                }
            	oDL += "<img src='" + getPhotoPath(element.ownerZid, element.pic) + "' width='60' height='60' alt='头像' />";
            	if (element.unRead > 0 && element.unRead < 100) {
                    oDL += "<em class='unRead_" + element.talkId + "'>" + element.unRead + "</em>";
                } else if (element.unRead >= 100) {
                	oDL += "<em class='unRead_" + element.talkId + "'>99+</em>";
                } else {
                	oDL += "<em style='display:none;' class='unRead_" + element.talkId + "' ></em>";
                }
            	oDL += "<span class='dlName'><b class='friendName'>" + element.displayName + "</b><b class='mesTime'>" + element.lastTime + "</b></span>";
            	oDL += "<span class='dlText'>" + element.lastMsg + "</span>";
            	// 如果是收到的是验证消息
                if (element.msgType == MSG_CONTACT_VALIDATE ) {
                	// 如果展示信息是以”您向“开头，说明是自己向别人发送的添加请求，不添加operateAgree事件
                	if(element.lastMsg.indexOf("向 Ta")==-1){
                		oDL += "<span class='dlRequest'><b class='agree agree_"+element.talkId+"'>同意</b><b class='confuse confuse_"+element.talkId+"'>拒绝</b></span></div>";
                	}
                }else{
                	oDL += "</a>";
                }
                var param = {
                		talkId : element.talkId,
                		talkListName : element.displayName
                		// talkerIds : element.talkerIDs // 已将talkerIds改为只有接收方的zid
                };
                // 非验证消息
                if (element.msgType != MSG_CONTACT_VALIDATE) {
                	$("#friendBody .msgRecord").append($(oDL));
                }
                
				// 发送的验证消息不绑定事件
				if($(oDL).hasClass("verifyReqMsg")){
					$("#friendBody .msgRecord").append($(oDL));
				}
				// 收到的验证消息绑定事件
				else if($(oDL).hasClass("verifyResMsg")){
					$(oDL).appendTo($("#friendBody .msgRecord")).bind({
	                	"mouseover": function(){
		            		$(this).find(".dlText").hide();
		            		$(this).find(".dlRequest").show();
	                	},
	                	"mouseout":function(){
	                		$(this).find(".dlRequest").hide();
	                		$(this).find(".dlText").show();
	                	}
					});
					$(".agree_"+element.talkId).click(function(){agreeAdd(element.talkId);});
					$(".confuse_"+element.talkId).click(function(){refuseAdd(element.talkId);});
				}
				// 普通消息绑定事件
				else if($(oDL).hasClass("chatMsg")){
					// 绑定【打开聊天记录】事件 
					fnClickBtn(".msg_"+element.talkId,".chatList",startChat,param);
					
				}
				// 讨论组消息绑定事件
				else if($(oDL).hasClass("groupMsg")){
					// 绑定【打开聊天记录】事件 
					fnClickBtn(".msg_"+element.talkId,".groupChatList",startGroupChat,param);
				}
				// 系统消息绑定事件
				else if($(oDL).hasClass("sysMsg")){
					// 绑定【打开聊天记录】事件 
					fnClickBtn(".msg_"+element.talkId,".sysMsgList",startChat,param);
				}
            });
        }
    });
}

/**
 * 同意添加联系人
 * @param talkId 对话id
 */
function agreeAdd(talkId) {
    $.ajax({
        type: "post",
        data: "talkId=" + talkId,
        url: "/ChatSystem.action?agreeAddContact"
    }).done(
    function(rtnData) {
    	// 这里可以通过js来动态生成，不用走后台。
        getAllTalkList();
    });
};

/**
 * 拒绝添加联系人
 * @param talkId 对话id
 */
function refuseAdd(talkId) {
    $.ajax({
        type: "post",
        data: "talkId=" + talkId,
        url: "/ChatSystem.action?refuseAddContact"
    }).done(function(rtnData) {
    	// 这里可以通过js来动态生成，不用走后台。
        $(".msg_"+talkId).remove();
    });
};

/**
 * 开始聊天
 * @param param{talkListName, talkId, talkerIds}
 *                对话名称     对话id   对话者
 */
function startChat(param) {
    where = AT_TALK_CONTACT;
	$("#friendHead .chatList .title").text(param.talkListName);
	currentTalkId = param.talkId;
    talkListName = param.talkListName;
    if(talkListName=="系统消息"){
    	currentTalkerZid = 0;
    }else{
    	getOtherMemberZid(param.talkId);    
    }
    getAllTalk(param.talkId);
};

/**
 * 开始讨论组聊天
 * @param param
 */
function startGroupChat(param) {
    where = AT_TALK_CONTACT;
    $("#friendHead .groupChatList .title").text(param.talkListName);
    currentTalkId = param.talkId;
    talkListName = param.talkListName;
	getOtherMemberZid(param.talkId);    
    getAllTalk(param.talkId);
};

/**
 * 获取对话中其它成员的zid串
 */
function getOtherMemberZid(talkId){
	$.ajax({
        type: "post",
        data: "talkId=" + talkId,
        url: "/ChatSystem.action?getOtherMemberZid"
    }).done(function(rtnData) {
        if(rtnData!=null && rtnData!=""){
        	currentTalkerZid = rtnData;
        }else{
        	alert("无法获取对方 信息");
        }
    });
}

/**
 * 得到所有的对话
 * @param talkId 对话Id
 * @param now    页数
 */
var oldHeight;
function getAllTalk(talkId, now) {
	$("#inputMsg").focus();
	where = AT_TALK_CONTACT;
	timeFlag = true;
	if(now!=undefined && now!=null && now!=''){
		pageNow = now;
	}else{
		pageNow = 1;
	}
    $.ajax({
        type: "post",
        data: {
        	talkId: talkId,
        	pageNow: pageNow
        },
        url: "/ChatSystem.action?getAllTalks",
        dataType:"json"
    }).done(
    function(rtnData,textStatus) {
    	// 非首页要清空聊天窗口
    	if(pageNow == 1){
	    	$(".memberList").children().remove();
	    	$("#friendBody .chatList").children().remove();
	        $("#isUnread").val(rtnData.isUnread);
    	}
    	// 第2+页，要移除原来的“查看更多信息”
    	else{
    		$("#historyTalk").remove();
    	}
        $.each(
        rtnData.message,
        function(index, element) {
        	var msg = removeHTMLTag(element.chatContent);
        	// 自己发送的
            if (element.zid == zid) {
        		generateATalk(element.msgType, element.zid, element.displayName, element.photo, element.time, msg, MSG_ME, MSG_DB);
            }
            // 别人发送的
            else{
        		generateATalk(element.msgType, element.zid, element.displayName, element.photo, element.time, msg, MSG_OTHER, MSG_DB);
            }
        });
        
        if(rtnData.totalPage!=1 && rtnData.totalPage!=0 && rtnData.totalPage!=pageNow){
        	$("#friendBody .chatList").prepend("<div style='text-align: center;' id='historyTalk'>"
        		+"<a href='javascript:void(0);' onclick='getAllTalk("+talkId+","+(pageNow+1)+")' >查看更多消息</a></div>");
        } 
        if(pageNow == 1){
        	scrollToButtom();
        }else{
        	scrollToMiddle();
        }
    }).fail(function (jqXHR, textStatus) {
    });
}

/**
 * 生成一条对话内容
 * @param msgType     消息类型
 * @param name        姓名
 * @param photo       头像
 * @param time        消息时间
 * @param chatContent 消息内容
 * @param who         发送方 0-本人 1-别人 
 * @param newMsg      新消息还是旧消息 1-新(append) 0-旧(prepend)
 */
function generateATalk(msgType, zid, name, photo, time, chatContent, who, newMsg){
	var oDL = "";
	// 新消息
	if(newMsg == 1){
		var times = parseInt(time.split(";")[1])-nextTime;
		nextTime = parseInt(time.split(";")[1]);
		if(times==0 || times>=180000){    
			oDL += "<a class='time'>" + time.split(";")[0] + "</a>";
		}
	}
	// 旧消息
	else{
		if(timeFlag){
			matchingTime = parseInt(time.split(";")[1]);
			timeFlag = false;
		}
		var timess = matchingTime - parseInt(time.split(";")[1]);
		if(timess==0 || timess>=180000){
			oDL += "<a class='time'>" + time.split(";")[0] + "</a>";
			matchingTime = parseInt(time.split(";")[1]);
		}
	}
	// 自己发的
	if(who == 0)
		oDL += "<dl class='me'>";
	// 别人发的
	else
		oDL += "<dl class='other'>";
	oDL += "<dt><img src='" + getPhotoPath(photo) + "' width='40' height='40' alt='头像' /></dt><dd class='chatName'>"+name+"</dd>";
	// 文本消息
	if(msgType == 1){
		oDL += "<dd class='chatTxt'>"+chatContent+"</dd>";
	}
	// 图片消息
	else if(msgType == 2){
//		var imageId = chatContent.split("/")[1].split(".")[0];
//		oDL += "<dd class='chatTxt'><img id='" + imageId + "' src='" + sendPhotoPath + chatContent + "' width='100' height='80' alt='头像' /></dd>";
		oDL += "<dd class='chatTxt'><img src='" + sendPhotoPath + chatContent + "' width='100' height='80' alt='头像' /></dd>";
	}
	oDL += "</dl>";
	// 新消息用append
	if(newMsg == 1)
		$("#friendBody .chatList").append(oDL);  
	// 数据库里取出来的时候用prepend
	else
		$("#friendBody .chatList").prepend(oDL);  
}
/**
 * 滚到底部
 */
function scrollToButtom(){
	$("#friendBody .chatList").scrollTop($("#friendBody .chatList")[0].scrollHeight-$("#friendBody .chatList").height());
	oldHeight = $("#friendBody .chatList")[0].scrollHeight-$("#friendBody .chatList").height();
}
/**
 * 翻页的时候滚到原来的位置
 */
function scrollToMiddle(){
	$("#friendBody .chatList").scrollTop($("#friendBody .chatList")[0].scrollHeight-$("#friendBody .chatList").height()-oldHeight);
	oldHeight = $("#friendBody .chatList")[0].scrollHeight-$("#friendBody .chatList").height();
}

/**
 * 获取所有联系人
 * @param sign 标志位：1-点击联系人； 2-创建讨论组；3-编辑讨论组
 * @param bind 是否绑定点击事件，只有在获取联系人时才绑定，其余的比如创建讨论组，批量删除联系人等不需要绑定
 */
function getAllContact(sign) {
	where = AT_CONTACT;
	if(sign == 3) {
		$("#newGroupName").val(talkListName);
	}
    $.ajax({
        type: "post",
        url: "/ChatSystem.action?getContactList"
    }).done(
    function(rtnData) {
        // 如果当前该用户没有联系人,则不允许进行删除
        if (rtnData == null) {
            // $('#delFriend').hide();
        } else {
        	var list;
        	if(sign == 1){
        		list = $(".content.friendList");
        	}else if(sign == 2){
        		list = $(".content.groupChat");
        	}else{
        		list = $(".content.friendList");
        	}
        	list.children().remove();
            $.each(rtnData,
            function(index, element) {
            	var oDL = "<a class='fds fds_"+element.zid+"'><img src='" + getPhotoPath(element.zid, element.photo) + "' width='60' height='60' alt='头像' /><span title='" + element.displayName + "'>" + element.displayName + "</span>";
            	oDL += "<input type='hidden' value='" + element.zid + "'></a>";
                list.append($(oDL)).show();
                
                // 绑定事件
            	if(sign == 1){
            		// 可以考虑在getContactList方法中多返回一个role，这样查看联系人详情的时候就不用再走数据库了
	            	var param = {
	            		contactId : element.zid,
						talkId : element.talkId,
	    				talkListName : element.displayName,
	    				talkerIds : element.zid,
						flag : 1
					};
	            	// 绑定【查看联系人详情】事件
	            	fnClickBtn(".fds_"+element.zid,".searchFDInfor",getContactInfo,param);
            	}else if(sign == 2){
            		// 添加叉图标
            		$('.content.groupChat').children('.fds').each(function(){
            			var oCheck = "<b class='del'></b><input type='checkbox' class='chatFDCheck'/>";
            			$(this).append($(oCheck)).unbind('click').bind('click',function(){
            				if ($(this).find('.chatFDCheck').attr('checked')) {
            					$(this).removeClass('checked').find('.chatFDCheck').removeAttr('checked');
            				}
            				else{
            					$(this).addClass('checked').find('.chatFDCheck').attr('checked','checked');
            				}
            			});
            		});
            	}
            });
        }
    });
}

/**
 * 异步得到联系人详情
 * @param param{contactId,flag,[talkId]}
 */
function getContactInfo(param){
	$("#friendBody .searchFDInfor .liFriend").siblings().remove();
    $.ajax({
        type: "post",
        data: "contactId=" + param.contactId,
        url: "/ChatSystem.action?getContactInfo"
    }).done(function(rtnData) {
    	$("#friendBody .searchFDInfor .liFriend").siblings().remove();
    	var oDL = "";
    	oDL += "<dl><dt><img src='"+getPhotoPath(rtnData.zid, rtnData.photo)+"' width='60' height='60' alt='头像' /></dt>";
    	oDL += "<dd class='fdIdenty'>身份:<span id='contactRole'>"+rtnData.role+"</span></dd>";
    	oDL += "<dd class='fdName'>用户名:<span id='contactName'>"+rtnData.displayName+"</span></dd></dl>";
    	// 非联系人
    	if(param.flag == 0){
	    	oDL += "<div class='oprLine isStranger'>";
//	    	oDL += "<a class='linkBtn actionBtn'>查看资料</a>";
//	    	oDL += "<a class='linkBtn confirmBtn addFDBtn'>加为好友</a></div>";
	    	oDL += "<a class='linkBtn confirmBtn addFDBtn' style='margin-left:63px;'>加为好友</a></div>";
	    	$("#friendBody .searchFDInfor").append(oDL);
	    	// 如果是经纪人、开发商，无需验证，直接可加为好友，然后进入联系人页面
	    	if($('#contactRole').text() == "经纪人" || $('#contactRole').text() == "开发商") {
	    		// 绑定 特殊角色的【加为好友】事件(?会不会多次绑定？)
	    		addZid = rtnData.zid;
	    		fnClickBtn(".addFDBtn",".friendList",addContact);
	    	}else{
	    		// 绑定 普通角色的【加为好友】事件,进入验证页面
	    		fnOprFD(".addFDBtn",".FDVerify",function(obj){
	    			$("#verifyMsg").focus();
	    			$("#friendBody .FDVerify .FDName").text(rtnData.displayName);
	    			addZid = rtnData.zid;
	    			// 绑定【发送验证】事件
//	    			fnClickBtn(".verifyConfirmBtn",".msgRecord",addContact,rtnData.zid);
	    		});
	    	}
    	}
    	// 已是联系人
    	else if(param.flag == 1){
    		currentTalkId = param.talkId;
    		oDL += "<div class='oprLine isFriend'>";
    		oDL += "<a class='linkBtn actionBtn' id='delThisFDBtn'>删除好友</a>";
    		oDL += "<a class='linkBtn confirmBtn toChatBtn'>发起聊天</a></div>";
    		param.talkerIds = rtnData.zid;
    		$("#friendBody .searchFDInfor").append(oDL);
    		// 绑定【发起聊天】事件
    		fnClickBtn(".toChatBtn",".chatList",startChat,param);
    		// 绑定【删除好友】事件
    		fnClickBtn("#delThisFDBtn",".friendList",deleteContact,param.contactId);
    	}
    });
}

/**
 * 删除联系人
 * @param contactId 联系人id
 */
function deleteContact(contactId){
	$.ajax({
        type: "post",
        data: "contactIDs=" + contactId,
        url: "/ChatSystem.action?deleteContact"
    }).done(function() {
    	$(".fds_"+contactId).remove();
//    	getAllContact(1);
    });
}

/**
 * 查找联系人
 * @param contactId 联系人id
 */
function searchContact(){
	// 异步进行对用户的查找
    var contactId = $('#searchName').val();
    $.ajax({
        type: "post",
        data: "loginId=" + contactId,
        url: "/ChatSystem.action?isExistOrIsContact"
    }).done(function(rtnData) {
    	var accountBean = rtnData.accountBean;
        var flag = accountBean.flag;
        // 该用户不存在
        if (flag == 0) {
        	fnWarnPopNoCancel("该用户不存在");
        }
        // 该用户就是本用户
        else if (flag == 1) {
        	fnWarnPopNoCancel("不能添加自己为自己的联系人");
        }
        // 该用户已经是本用户的联系人
        else if (flag == 2) {
        	fnShowClass(".searchFDInfor");
            var param = {
        		contactId : accountBean.zid,
        		talkId : rtnData.talkId,
        		flag : 1
            };
            getContactInfo(param);
        }
        // 可以添加该联系人
        else if (flag == 3) {
        	fnShowClass(".searchFDInfor");
            var param = {
        		contactId : accountBean.zid,
        		flag : 0
            };
            getContactInfo(param);
        }
    });
}

/**
 * 准备添加联系人
 * @param contactId 联系人id
 */
function toAddContact(contactId){
	$(".liRecord").click(function(){
		$(".msgRecord").each(function(){
			$(this).show().siblings().hide();		
		});
		getAllTalkList();
	});	
	fnOprFD("#searchBtn",".searchFDInfor",searchContact);
}

/**
 * 确认添加联系人
 * @param contactId 联系人id
 */
function addContact(){
	$("#friendBody .msgRecord").children().remove();
	// 如果是经纪人或开发商则直接添加
	$.ajax({
		type: "post",
		data: {
			tid: addZid,
            message: $("#verifyMsg").val()
        },
		url: "/ChatSystem.action?addContact"
	}).done(function() {
		if($('#contactRole').text() == "经纪人" || $('#contactRole').text() == "开发商") {
			getAllContact(1);
		} else {
			$("#verifyMsg").val('');
			getAllTalkList();
		}
	});
}

/**
 * 发送消息
 * @returns
 */
function sendMsg(msgType){
 
	if(where == AT_TALK_GROUP) {
		if(checkGroupMember() == false){
			fnWarnPopNoCancel("您已不在该讨论组内");
			return false;
		}
	}
	var chatContent = "";
	if(msgType == 1){
		chatContent = $('#inputMsg').val();		
		if ($.trim(chatContent) == "") {
	    	$("#num").text("不能为空").addClass("warningNum");
	    	return false;
	    } else if (chatContent.length > 200) {
	        $("#num").text("不能超过200字").addClass("warningNum");
	        return false;
	    } 
		chatContent = removeHTMLTag(chatContent);
		
		
		if($.trim(chatContent)==""){
			$("#num").text("不能发送非法字符").addClass("warningNum");
	    	return false;
		}
	}
	else if(msgType == 2){
		if($(".uploadPic .inputBox").children("img").length==0){
			$("#num").text("请选择图片").addClass("warningNum");
	    	return false;
		}
		chatContent = sendUrl;
	}
 	
	// 生成新的对话内容
	generateATalk(msgType, zid, name, photo, formatTime(), chatContent, MSG_ME, MSG_NEW);	
	// 滚到底部
	scrollToButtom();
	msgObject = {
		fromUser: zid, 
		message: encodeURIComponent(chatContent), // 对中文进行编码，不编码会乱码，从而导致后台接收到消息后往client端发送的时候会失败
		toUser: currentTalkerZid,
		talkId: currentTalkId,
		msgType: msgType
	};

	socket.emit(CHAT_EVENT, msgObject);
	
    // 清空内容
    if(msgType == 1){
    	$('#inputMsg').val('').focus();
    }else if(msgType == 2){
    	$(".uploadPic .inputBox").empty();
        $("#textIcon").click();
        $('#inputMsg').val('').focus();
    }
    return false;
}

/**
 * 选择要发送的图片
 */
function choosePic(){
	// 初始化KindEditor
	if(friendEditor == undefined) {
		friendEditor = KindEditor.editor({
			allowFileManager : true,
			pluginsPath:'/scripts/upload/',
			uploadJson:'/ChatSystem.action?sendPhoto',
			filePostName:'sendPhoto',
			extraFileUploadParams : {
				talkId : currentTalkId
			}
		});
	}
	friendEditor.loadPlugin('image', function() {
		friendEditor.plugin.imageDialog({
			showRemote : false,
			clickFn : function(url, title, width, height, border, align) {
//				alert("aaaa"+url+" "+title+" "+width+" "+height+" "+border+" "+align);
				if(url.startWith("/")){
					sendUrl = url.substring(1);
				}
				else
					sendUrl = url;
				$(".uploadPic .inputBox").empty().append("<img src='" + sendPhotoPath + sendUrl + "' width='40' height='40' alt='发送的图片' />");
				friendEditor.hideDialog();
			}
		});
	});
	
//	var uploadbutton = KindEditor.uploadbutton({
//		button : KindEditor('#choosePic')[0],
//		fieldName : 'sendPhoto',
//		url : '/ChatSystem.action?sendPhoto&talkId='+currentTalkId,
//		afterUpload : function(data) {
//			if (data.error == 0) {
//				alert(data.url);
//				// 将图片显示到输入框中
//				$(".inputBox").append("<img src='" + data.url + "' width='40' height='40' />");
//			} else {
//				alert(data.url);
//			}
//		},
//		afterError : function(str) {
//			alert('自定义错误信息: ' + str);
//		}
//	});
//	uploadbutton.fileBox.change(function(e) {
//		uploadbutton.submit();
//	});
	
}

/**
 * 检查是否还在讨论组内
 */
function checkGroupMember(){
	$.ajax({
        type: "post",
        async: false,
        data: {
        	"talkId": currentTalkId
        },
        url: "/ChatSystem.action?checkGroupMember"
    }).done(function(rtnData) {
    	if(rtnData != 1) {
    		return false;
    	}else{
    		return true;
    	}
    });
}

////图片发送功能模块
//function ajaxFileUpload() {
//	alert("a");
//    $.ajaxFileUpload({
//    	// 用于文件上传的服务器端请求地址
//        url: '/ChatSystem.action?sendPhoto&talkId=' + currentTalkId,
//        // 一般设置为false
//        secureuri: false,
//        // 文件上传空间的id属性 <input type="file" id="file" name="file" />
//        fileElementId: 'sendPhoto',
//        dataType: 'json',
//        // 返回值类型 一般设置为json
//        success: function(data, status) // 服务器成功响应处理函数
//        {
//        	alert("success:"+data.status);
//            if (data.status == "y") {
//                var picPath = data.photo;
//                alert(picPath);
//                var currentTime = formatTime();
//                if(timeFlag){
//            		matchingTime = parseInt(currentTime.split(";")[1]);
//            		timeFlag = false;
//            	}
//            	var timess = parseInt(currentTime.split(";")[1]) - matchingTime;
//            	var oDL = "";
//            	if(timess==0||timess>=300000){
//            		oDL += "<a class='time'>" + currentTime.split(";")[0] + "</a>";
//            		matchingTime = parseInt(currentTime.split(";")[1]);
//            	}
//                oDL = oDL + "<dl class='me'>";
//            	oDL += "<dt><img src='" + getPhotoPath(rtnData.photo) + "' width='40' height='40' /></dt><dd class='chatName'>"+rtnData.displayName+"</dd>";
//            	imageId = picPath.split("/")[1].split(".")[0];
//            	imagePath = sendPhotoPath + picPath;
//            	oDL += "<dd id='TempContainer' class='chatTxt'><span><img class='EnlargePhoto' src='" + sendPhotoPath + picPath + "' width='100px' height='80px'/></span></dd>";
//                oDL += "</dl>";
//                $("#friendBody .chatList").append(oDL);     
//                $("#friendBody .chatList").scrollTop($("#friendBody .chatList")[0].scrollHeight-$("#friendBody .chatList").height());
//                
//                $("#TempContainer").bind("click",clickPic);
//                // 2表示发送的是图片
//                socket.emit('user message', picPath, currentTalkerZid, currentTalkId, 2);
//                // 清空内容
//                $('#sendPhoto').val('').focus();
//            } else if (data.status == "n") {
//                fnAlert("不支持发送的图片格式");
//            }
//            if (typeof(data.error) != 'undefined') {
//                if (data.error != '') {
////                     alert(data.info);
//                    fnAlert("发送图片失败");
//
//                } else {
////                     alert(data.info);
//                    fnAlert("发送图片失败");
//                }
//            }
//        },
//        error: function(data, status, e) // 服务器响应失败处理函数
//        {
////        	alert("error:"+data.status+" "+status+" "+e);
////             alert(data.info);
//            fnAlert("发送图片失败");
//        }
//    });
//    return false;
//}

/**
 * 得到talkId对应的某个讨论组中的所有成员
 */
var groupMemberNum;
function getGroupMember() {
	// 判断本用户是否是该组创建者
	var isCreator = false;
	$.ajax({
        type: "post",
        data: {
            talkId: currentTalkId,
            contactId: zid
        },
        url: "/ChatSystem.action?isGroupCreator"
    }).done(function(rtnData) {
        // 如果是该组创建者
        if (rtnData == 1) {
        	isCreator = true;
        }
    });
    $.ajax({
        type: "post",
        data: {
            talkId: currentTalkId
        },
        url: "/ChatSystem.action?getGroupMember"
    }).done(
    function(rtnData) {
    	groupMemberNum = rtnData.length;
    	// 如果当前该用户没有联系人,则不允许进行删除
        if (rtnData == null) {
            // $('#delFriend').hide();
        } else {
        	var list = $(".memberList");
        	list.children().remove();
            $.each(rtnData,
            function(index, element) {
            	var oDL = "<a class='fds fds_"+element.zid+"'><img src='" + getPhotoPath(element.zid, element.photo) + "' width='60' height='60' alt='头像' /><span title='" + element.displayName + "'>" + element.displayName + "</span>";
            	if(isCreator)
            		oDL += "<b class='del del_"+element.zid+"'></b></a>";
                list.append(oDL).show();
                if(isCreator){
	                $(".del_"+element.zid).click(function(){
	                	if($(this).prev("span").text().indexOf("(创建者)")>0){
	                		fnWarnPop("如果删除创建者,讨论组将会解散.<br>确认解散讨论组?", groupDismiss);
	                	}else{
	                		// 如果成员为3个以下,删除则解散讨论组
	                		if(groupMemberNum <= 3){
		                		fnWarnPop("由于组人数过少,删除后讨论组将解散.<br>确认解散讨论组?", groupDismiss);
	                		}else{
	                			fnWarnPop("确定删除成员?", groupDeleteMember, element.zid);
	                		}
	                	}
	                });
                }
            });
            if(isCreator){
	            list.append("<a class='fds'><em class='invite'></em></a>");
	            fnClickBtn(".invite", ".groupAdd", groupAdd);
	        }
        }
    });
}

/**
 * 创建讨论组
 */
function createGroup() {
    var talkFD_arr = "";
    var number = 0; // 选择创建多人对话时,组人数不得少于3个人
    var newGroupName;
    $('.content.groupChat').children('.fds').each(
		function() {
	    	if ($(this).children(":checkbox").is(":checked")) {
	            if (number == 0) {
	                talkFD_arr = $(this).next("input").val();
	            } else {
	                talkFD_arr = talkFD_arr + "_" + $(this).next("input").val();
	            }
	            number++;
	        }
    });
    // 如果组人数不低于3个人时
    if (number >= 2) {
    	
    //  输入讨论组名
//        	var oAlertDiv = "<div id='alertGroupName' class='shadow round'><p>"+'群组名'+"</p><input id='newGroupName' type='text' value='群组名' /><button type='button' id='closeAlert' class='confirmBtn round'>确定</button></div>";
//        	
//        	var coverF = "<div id='coverF'></div>";
//        	$("#friend").append(coverF).append(oAlertDiv);
//        	$("#coverF").css({"width":$("#friend").width(),"height":$("#friend").height()});
//        	// 绑定确定事件
//        	$("#newGroupName").focus(function() {
//        		$(this).select();
//        	});
//        	$("#closeAlert").bind("click",function(){
//        		newGroupName = $('#newGroupName').val();
//        		$("#coverF").remove();
//        		$("#alertGroupName").remove();
    	newGroupName = "讨论组";
    	
    	// 显示讨论组
		fnShowClass(".groupChatList");
		$.ajax({
            type: "post",
            data: {
            	newGroupName: newGroupName,
            	talkerIDs: talkFD_arr
            },
            url: "/ChatSystem.action?createGroup"
        }).done(
        function(rtnData) {
            var param = {
				talkId : rtnData.talkId,
				talkListName : rtnData.displayName,
				talkerIds : rtnData.talkerIDs
			};
            startGroupChat(param);
        });
	}
	else {
		fnWarnPopNoCancel("邀请成员不得少的2人");
	}
}

/**
 * 编辑讨论组
 */
function groupEdit(){
	$("#friendHead .groupEdit .title").text(talkListName);
	$("#newGroupName").val(talkListName);
	$("#friendBody .groupAdd").children().remove();
	getGroupMember();
}

/**
 * 讨论组重命名
 */
function groupReName(){
	$.ajax({
        type: "post",
        data: {
        	groupName:$("#newGroupName").val(),
        	talkId:currentTalkId
        },
        url: "/ChatSystem.action?modifyGroupName"
    }).done(
    function(rtnData) {
    	if(rtnData.status == 1){
    		$("#friendHead .groupEdit .title").text($("#newGroupName").val());
    		$(".groupTitle").text($("#newGroupName").val());
    		talkListName = $("#newGroupName").val();
//    		fnWarnPop("修改成功");
    	}else{
    		fnWarnPopNoCancel("修改失败");
    	}
    });
}

/**
 * 得到指定讨论组中未添加的所有联系人
 */ 
function groupAdd(){
    $.ajax({
        type: "post",
        data: {
            talkId: currentTalkId
        },
        url: "/ChatSystem.action?getNoAddContact"
    }).done(
    function(rtnData) {
//         alert(rtnData);
        // 如果当前该用户没有联系人,则不允许进行添加
        if (rtnData == null) {
        	$("#friendBody .groupAdd").children().remove();
        } else {
        	var list = $("#friendBody .groupAdd");
        	list.children().remove();
            $.each(rtnData,
            function(index, element) {
            	var oDL = "<a class='fds fds_"+element.zid+"'><img src='" + getPhotoPath(element.zid, element.photo) + "' width='60' height='60' alt='头像' /><span title='" + element.displayName + "'>" + element.displayName + "</span>";
            	oDL += "<b class='del del_"+element.zid+"'></b></a>";
            	var oInput = "<input type='hidden' value='" + element.zid + "'></a>";
                list.append(oDL).append(oInput).show();
                
        		// 添加叉图标
            	list.children('.fds').each(function(){
        			var oCheck = "<b class='del'></b><input type='checkbox' class='chatFDCheck'/>";
        			$(this).append($(oCheck)).unbind('click').bind('click',function(){
        				if ($(this).find('.chatFDCheck').attr('checked')) {
        					$(this).removeClass('checked').find('.chatFDCheck').removeAttr('checked');
        				}
        				else{
        					$(this).addClass('checked').find('.chatFDCheck').attr('checked','checked');
        				}
        			});
        		});
            });
        }
    });
}

/**
 * 添加讨论组组成员
 */
function addGroupMember(){
	
	var talkFD_arr = "";
    var number = 0;
    $("#friendBody .groupAdd").children('.fds').each(
    function() {
    	if ($(this).children(":checkbox").is(":checked")) {
            if (number == 0) {
                talkFD_arr = $(this).next("input").val();
            } else {
                talkFD_arr = talkFD_arr + "_" + $(this).next("input").val();
            }
            number++;
        }
    });
//    alert(currentTalkId+"  "+talkFD_arr);
    if(number == 0){
    	fnWarnPopNoCancel("请选择讨论组成员");
    	return ;
    }
	$.ajax({
      type: "post",
      data: {
          talkId: currentTalkId,
          talkerIDs: talkFD_arr,
          oldTalkerIDs: currentTalkerZid
      },
      url: "/ChatSystem.action?addGroupNumber"
  }).done(function(rtnData) {
	  if(rtnData.status == 1){
		  currentTalkerZid +="_" + talkFD_arr;
          fnShowClass(".groupChatList");
          getAllTalk(currentTalkId);
      }else{
    	  fnWarnPopNoCancel("邀请失败");
      }
  });
  where = AT_TALK_CONTACT;
}

/**
 * 退出讨论组
 */
function groupQuit(){
	$.ajax({
        type: "post",
        data: {
            talkId: currentTalkId,
            contactId: zid
        },
        url: "/ChatSystem.action?isGroupCreator"
    }).done(function(rtnData) {
        // 如果是该组创建者
        if (rtnData == 1) {
        	fnWarnPop("如果创建者退出,讨论组将会解散.<br>确认解散讨论组?", groupDismiss);
        }else{
        	fnWarnPop("确定退出讨论组?", groupQuitConfirm);
        }
    });
}

/**
 * 解散讨论组
 */
function groupDismiss(){
	$.ajax({
        type: "post",
        data: {
        	contactId: zid,
        	talkId:currentTalkId
        },
        url: "/ChatSystem.action?dismissGroup"
    }).done(
    function(rtnData) {
		fnShowClass(".msgRecord");
		getAllTalkList();
    });
}

/**
 * 确认退出讨论组
 * @param contactId 组员zid
 */
function groupQuitConfirm(){
	$.ajax({
        type: "post",
        data: {
        	talkId:currentTalkId
        },
        url: "/ChatSystem.action?quitGroup"
    }).done(
    function(rtnData) {
		fnShowClass(".msgRecord");
		getAllTalkList();
    });
}

/**
 * 删除讨论组成员
 * @param contactId 组员zid
 */
function groupDeleteMember(contactId){
	groupMemberNum--;
	$.ajax({
        type: "post",
        data: {
        	contactId:contactId,
        	talkId:currentTalkId
        },
        url: "/ChatSystem.action?deleteGroupMember"
    }).done(
    function(rtnData) {
		$(".fds_"+contactId).remove();
		if(currentTalkerZid.indexOf("_"+contactId)>0)
			currentTalkerZid = currentTalkerZid.replace("_"+contactId ,"");
		else
			currentTalkerZid = currentTalkerZid.replace(contactId ,"");
    });
}

/**
 * 在消息列表添加未读消息数量的标志
 * @param talkId 对话di
 * @param zid 消息发送方zid
 * @param msg 消息内容
 * @param msgType 消息类型 
 */
function addunReadNumInTalkList(talkId, id, msg, msgType){
//	alert(zid+"_"+id);
	var unReadTag = $(".unRead_"+talkId);
//	alert(unReadTag.length+"  "+msgType);
	
	// 如果消息记录不存在，构造一条消息记录
	// 【验证信息、发起讨论、刚添加经纪人时且对方未刷新的情况下向他发送消息】
	if(unReadTag.length == 0){
		// 发起讨论
		if(msgType == MSG_GROUP_CREATE || msgType == MSG_GROUP_INVITE_ME){
			$.ajax({
		        type: "post",
		        data: {
		        	zid: zid, // ?可不传
		        	talkId: talkId
		        },
		        url: "/ChatSystem.action?getGroupInfo"
		    }).done(function(rtnData) {
		    	// 生成新的消息记录
				addNewTalkList("groupMsg", talkId, rtnData.photo, rtnData.displayName, rtnData.name + " 邀请了您参与讨论", 1);
				var param = {
                		talkId : talkId,
                		talkListName : rtnData.displayName,
                		talkerIds : rtnData.talkerIds
                };
				// 绑定【打开聊天记录】事件 
				fnClickBtn(".msg_"+talkId,".groupChatList",startGroupChat,param);
		    });
		}
		// 发送验证
		else if(msgType == MSG_CONTACT_VALIDATE){
			$.ajax({
		        type: "post",
		        data: "contactId=" + id,
		        url: "/ChatSystem.action?getContactInfo"
		    }).done(function(rtnData) {
		    	// 生成新的消息记录
				addNewTalkList("verifyResMsg", talkId, rtnData.photo, rtnData.displayName, msg, 1);
		    });
			
		} 
		// 文本消息（一般用来给普通用户刚添加经纪人时，直接给他发送消息时使用）
		else if(msgType == MSG_TEXT){
			$.ajax({
		        type: "post",
		        data: "contactId=" + id,
		        url: "/ChatSystem.action?getContactInfo"
		    }).done(function(rtnData) {
		    	// 生成新的消息记录
				addNewTalkList("chatMsg", talkId, rtnData.photo, rtnData.displayName, rtnData.displayName+": "+msg, 1);
		        // 验证消息拼接方式
				var param = {
                		talkId : talkId,
                		talkListName : rtnData.displayName,
//	                	talkerIds : zid+"_"+id
                		talkerIds : id
                };
				// 绑定【打开聊天记录】事件 
				fnClickBtn(".msg_"+talkId,".chatList",startChat,param);
		    });
		}
		// 更新谈话列表中的信息
		$.ajax({
			type: "post",
			data: "talkId=" + talkId,
			url: "/ChatSystem.action?addAnUnreadMsg"
		}).done(function(){
			//alert('addAnUnreadMsg success');
		});
	}
	// 消息记录已存在，及时更新
	else{
		// 同意添加(将验证消息更新为聊天消息)
		if($(".msg_"+talkId).hasClass("verifyReqMsg") && msgType == MSG_CONTACT_AGGREE){
			$.ajax({
		        type: "post",
		        data: "contactId=" + id,
		        url: "/ChatSystem.action?getContactInfo"
		    }).done(function(rtnData) {
		    	// 删除验证消息
				$(".msg_"+talkId).remove();
				// 生成新的消息记录
				addNewTalkList("chatMsg", talkId, rtnData.photo, rtnData.displayName, rtnData.displayName+": 验证请求已通过！", 1);
				var param = {
	            		talkId : talkId,
	            		talkListName : rtnData.displayName,
//	            		talkerIds : zid+"_"+id
	            		talkerIds : id
	            };
				// 绑定【打开聊天记录】事件 
				fnClickBtn(".msg_"+talkId,".chatList",startChat,param);
		    });
			// 更新谈话列表中的信息
			$.ajax({
				type: "post",
				data: "talkId=" + talkId,
				url: "/ChatSystem.action?addAnUnreadMsg"
			}).done(function(){
				//alert('addAnUnreadMsg success');
			});
		}
		else{
			var unReadNum = unReadTag.text();
			// 如果之前没有未读消息
			if (unReadNum == "" || unReadNum == null) {
				unReadTag.show();
				unReadTag.text(1);
			}
			// 如果之前已经有99条信息
			else if (unReadNum == 99) {
				unReadTag.text('99+');
			}
			// 如果之前已经有不超过99条的信息
			else if (unReadNum < 99) {
				unReadTag.text(parseInt(unReadNum) + 1);
			}
			// 如果之前已经有超过99条信息
			else {
				// 不做任何操作
			}
			// 更新最新消息
			$(".msg_"+talkId+" .dlText").text(getContactNameByZid(id)+": "+msg);
			// 更新最新时间
			$(".msg_"+talkId+" .mesTime").text(currentTime());
			// 对当前用户联系人中的某一个信息加1
			// 更新谈话列表中的信息
			$.ajax({
				type: "post",
				data: "talkId=" + talkId,
				url: "/ChatSystem.action?addAnUnreadMsg"
			}).done(function(){
				//alert('addAnUnreadMsg success');
			});
		}
	}
}

/**
 * 添加一条新的消息记录
 * @param talkType     对话类型
 * @param talkId       对话id
 * @param photo        头像
 * @param displayName  名称
 * @param lastMsg      最后一条消息
 * @param unRead       未读数量
 */
function addNewTalkList(talkType, talkId, photo, displayName, lastMsg, unRead){
	var oDL;
	// 验证消息
	if (talkType == 'verifyResMsg') {
		oDL = "<div class='" + talkType + " msg_" + talkId + "'>";
	} 
	else {
		oDL = "<a class='" + talkType + " msg_" + talkId + "'>";
	} 
	oDL += "<img src='" + getPhotoPath(photo) + "' width='60' height='60' alt='头像' />";
    oDL += "<em class='unRead_" + talkId + "'>" + unRead + "</em>";
	oDL += "<span class='dlName'><b class='friendName'>" + displayName + "</b><b class='mesTime'>" + currentTime() + "</b></span>";
	oDL += "<span class='dlText'>" + lastMsg + "</span>";
	// 如果是收到的是验证消息
    if (talkType == 'verifyResMsg') {
		oDL += "<span class='dlRequest'><b class='agree agree_"+talkId+"'>同意</b><b class='confuse confuse_"+talkId+"'>拒绝</b></span></div>";
    }else{
    	oDL += "</a>";
    }
	// 有系统消息
	if($("#friendBody .msgRecord").find(".sysMsg").length > 0){
		// 验证消息绑定事件
		if(talkType == 'verifyResMsg'){
			$(oDL).insertAfter($("#friendBody .msgRecord").find(".sysMsg")).bind({
	        	"mouseover": function(){
	        		$(this).find(".dlText").hide();
	        		$(this).find(".dlRequest").show();
	        	},
	        	"mouseout":function(){
	        		$(this).find(".dlRequest").hide();
	        		$(this).find(".dlText").show();
	        	}
			});
			$(".agree_"+talkId).click(function(){agreeAdd(talkId);});
			$(".confuse_"+talkId).click(function(){refuseAdd(talkId);});
		}else{
			$("#friendBody .msgRecord").find(".sysMsg").after($(oDL));
		}
	}
	else {
		// 验证消息绑定事件
		if(talkType == 'verifyResMsg'){
			$(oDL).prependTo($("#friendBody .msgRecord")).bind({
	        	"mouseover": function(){
	        		$(this).find(".dlText").hide();
	        		$(this).find(".dlRequest").show();
	        	},
	        	"mouseout":function(){
	        		$(this).find(".dlRequest").hide();
	        		$(this).find(".dlText").show();
	        	}
			});
			$(".agree_"+talkId).click(function(){agreeAdd(talkId);});
			$(".confuse_"+talkId).click(function(){refuseAdd(talkId);});
		}else{
			$("#friendBody .msgRecord").prepend($(oDL));
		}
	}
}

/**
 * 根据zid获取用户的名称
 * @param zid
 * @returns {String}
 */
function getContactNameByZid(zid){
	var name = "";
	$.ajax({
        type: "post",
        async: false,
        data: "contactId=" + zid,
        url: "/ChatSystem.action?getContactNameByZid"
    }).done(
    function(rtnData) {
    	name = rtnData;
    });
	return name;
}

/**
 * 获取一个格式化的时间（格式：今天 小时:分钟;时间戳）
 */
function formatTime() {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    var time = "今天  " + hour + ":" + minute+";"+date.getTime();
    return time;
};
/**
 * 获取当前时间（格式：今天 小时:分钟）
 */
function currentTime(){
	var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    var time = "今天  " + hour + ":" + minute;
    return time;
};

String.prototype.replaceAll = function (s2) {
    return s2.replace(new RegExp("[<%#*>]","gm"),"");
};

String.prototype.startWith=function(str){     
	  var reg=new RegExp("^"+str);     
	  return reg.test(this);        
	};
	
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    return str;
};

/**
 * 获取头像路径
 */
function getPhotoPath(zid, photo){
	if(photo!=undefined && photo!=""){
		return brokerListPhtoto+'/'+Math.floor(zid/10000)+'/'+photo;
	}
	return "/images/defaultPic/head.png";
};