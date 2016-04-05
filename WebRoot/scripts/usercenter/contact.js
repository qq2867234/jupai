var contactOpr = {
	role : null,
	// 展示数据的位置 1 表示获取我联系过的，2表示获取联系过我的，3我联系的待确认，4联系我的待确认
	choseType : 1,
	waitingH : null,
	init : function() {
		contactOpr.role = $("#role").val();
		var cType = parseInt($("#choseType").val());
		if(cType != "") {
			contactOpr.choseType = cType;
		} else {
			if (contactOpr.role == 1) {
				contactOpr.choseType = 1;
			} else if (contactOpr.role == 2 || contactOpr.role == 3) {
				if($("#choseType").val() != "" && parseInt($("#choseType").val()) <=3) {
					contactOpr.choseType = parseInt($("#choseType").val());
				}else{
					contactOpr.choseType = 2;
				}
			}
		}
		// 生成标签栏
		contactOpr.generateTab();
		// 设置显示句话的容器
		if(contactOpr.role == 1 || contactOpr.role == 2) {
			contactOpr.waitingH = $("#utcH");
		} else {
			contactOpr.waitingH = $("#ctuH");
		}
		// 获得联系信息
		contactOpr.getContactInfo();
		contactOpr.bindSwitchFun();
	},
	// 根据身份生成标签栏
	generateTab : function() {
		var content = "";
		if (contactOpr.role == 1) {
			content = "<ul class='tab-index tab2'>";
			if(contactOpr.choseType == 1) {
				content+= "<li class='on'><a href='###'>已建立联系</a></li>"
				+ "<li><a href='###'>等待确认</a></li>";

			} else {
				content += "<li><a href='###'>已建立联系</a></li>"
					+ "<li class='on'><a href='###'>等待确认</a></li>";
			} ;
			content += "</ul><div class='tab-content'>"
					+ "<div class='tab-detail' id='UTC'> <input type='hidden' id='utcH'/></div>"
					+ "<div class='tab-detail' id='waitingC'><input type='hidden' id='waitingCH'/></div>"
					+ "</div>";
		} else if (contactOpr.role == 2) {
			content = "<ul class='tab-index'>";
			if(contactOpr.choseType == 2) {
				content += "<li><a href='###'>我联系过的人</a></li>"
					+ "<li class='on'><a href='###'>联系过我的人</a></li>"
					+ "<li><a href='###'>待确认的联系人</a></li>"
//					+ "<li class='line'></li>"
					+ "</ul>"
					+ "<div class='tab-content'>"
					+ "<div class='tab-detail' id='UTC'><input type='hidden' id='utcH'/></div>"
					+ "<div class='tab-detail' id='CTU'><input type='hidden' id='ctuH'/></div>"
					+ "<div class='tab-detail' id='waitingC'><input type='hidden' id='waitingCH'/></div>"
					+ "</div>";
			} else {
				content += "<li class='on'><a href='###'>我联系过的人</a></li>";
					+ "<li><a href='###'>联系过我的人</a></li>"
					+ "<li><a href='###'>待确认的联系人</a></li>"
//					+ "<li class='line'></li>"
					+ "</ul>"
					+ "<div class='tab-content'>"
					+ "<div class='tab-detail' id='UTC'><input type='hidden' id='utcH'/></div>"
					+ "<div class='tab-detail' id='CTU'><input type='hidden' id='ctuH'/></div>"
					+ "<div class='tab-detail' id='waitingC'><input type='hidden' id='waitingCH'/></div>"
					+ "</div>";
			}
		} else if (contactOpr.role == 3) {
			content = "<ul class='tab-index'>";
			if(contactOpr.choseType == 2) {
				content += "<li class='on'><a href='###'>已建立联系</a></li>"
					+ "<li ><a href='###'>等待确认</a></li>"
					+ "</ul>"
					+ "<div class='tab-content'>"
					+ "<div class='tab-detail' id='CTU'><input type='hidden' id='ctuH'/></div>"
					+ "<div class='tab-detail' id='waitingC'><input type='hidden' id='waitingCH'/></div>"
					+ "</div>";;
			} else {
				content += "<li><a href='###'>已建立联系</a></li>"
					+ "<li class='on'><a href='###'>等待确认</a></li>"
					+ "</ul>"
					+ "<div class='tab-content'>"
					+ "<div class='tab-detail' id='CTU'><input type='hidden' id='ctuH'/></div>"
					+ "<div class='tab-detail' id='waitingC'><input type='hidden' id='waitingCH'/></div>"
					+ "</div>";
			}
		}
		$(".pagination").before(content);
	},
	// 绑定切换方法
	bindSwitchFun : function() {
		fnCreateTabContent($(".tab-index"), $(".tab-detail"), contactOpr.refresh);
	},
	// 清理你联系的区域
	cleanUCTArea : function() {
		$("#UTC").children().not("#utcH").remove();
	},
	// 清理联系你的区域
	cleanCTUArea : function() {
		$("#CTU").children().not("#ctuH").remove();
	},
	// 清理待通过区域
	cleanWaitingArea : function() {
		$("#waitingC").children().not("#waitingCH").remove();
	},
	// 获得联系人信息
	getContactInfo : function() {
		// 分页初始化
		Pager.init({
			url : "/RentListOperator.action?showContactInfo",
			data : {
				contactType : contactOpr.choseType
			},
			fillData : contactOpr.fillContactData,
			mode : 2,
			waitingCotent : contactOpr.waitingH
		});
	},
	// 清楚提示信息
	cleanMassage : function(obj) {
		obj.children("p").remove();
	},

	// 显示提示信息
	showMassage : function(obj, info) {
		obj.append("<p>" + info + "</p>");
	},
	// 选择展示类型
	changeType : function() {
		var index = $(".tab-index li.on").index();
		if (contactOpr.role == 1) {
			if (index == 0) {
				contactOpr.choseType = 1;
				contactOpr.waitingH = $("#utcH");
			} else if (index == 1) {
				contactOpr.choseType = 3;
				contactOpr.waitingH = $("#waitingCH");
			}
		} else if (contactOpr.role == 2) {
			if (index == 0) {
				contactOpr.choseType = 1;
				contactOpr.waitingH = $("#utcH");
			} else if (index == 1) {
				contactOpr.choseType = 2;
				contactOpr.waitingH = $("#ctuH");
			} else if (index == 2) {
				contactOpr.choseType = 3;
				contactOpr.waitingH = $("#waitingCH");
			}
		} else if (contactOpr.role == 3) {
			if (index == 0) {
				contactOpr.choseType = 2;
				contactOpr.waitingH = $("#ctuH");
			} else if (index == 1) {
				contactOpr.choseType = 4;
				contactOpr.waitingH = $("#waitingCH");
			}
		}
	},
	// 刷新数据
	refresh : function() {
		contactOpr.changeType();
		contactOpr.getContactInfo();
	},
	// 绑定通过
	bindPass : function(obj, id) {
		$.ajax({
			type : "post",
			url : "/RentListOperator.action?passApply",
			data : {
				oprId : id
			},
			dataType : "json",
			success : function(data, status) {
				alertSetTime("成功通过该请求", 500);
				if (data.status == "y") {
					obj.parent().parent().remove();
				}
			}
		});
	},
	// 绑定拒绝
	bindRefuse : function(obj, id) {
		$.ajax({
			type : "post",
			url : "/RentListOperator.action?refuseApply",
			data : {
				oprId : id
			},
			dataType : "json",
			success : function(data, status) {
				alertSetTime(data.info, 500);
				if (data.status == "y") {
					obj.parent().parent().remove();
				}
			}
		});
	},
	// 填充联系人数据
	fillContactData : function(data) {
		Pager.removeWaiting($(".waiting"));
		var info = "";
		var obj = null;
		var content = "";
		if (contactOpr.choseType == 1) {
			obj = $("#UTC");
			info = "你暂时还没有联系过其他人哦。";
			contactOpr.cleanUCTArea();
		} else if (contactOpr.choseType == 2) {
			obj = $("#CTU");
			info = "暂时还没有人联系过你哦。";
			contactOpr.cleanCTUArea();
		} else if (contactOpr.choseType == 3 || contactOpr.choseType == 4) {
			obj = $("#waitingC");
			info = "暂时还没有需要等待通过的联系人哦。";
			contactOpr.cleanWaitingArea();
		}
		if (data.pageModel.rows != 0) {
			var contactHeadPic = "/images/defaultPic/head.png";
			var roleStr = "";
			$.each(data.pageModel.result, function(index, item) {
					if (item.pic != "") {
						if (contactOpr.choseType == 1 || contactOpr.choseType == 3) {
							contactHeadPic = brokerListPhtoto + '/' + Math.floor(item.zid_to / 10000) + '/' + item.pic;
						} else if (contactOpr.choseType == 2 || contactOpr.choseType == 4) {
							contactHeadPic = brokerListPhtoto + '/' + Math.floor(item.zid / 10000) + '/' + item.pic;
						} 
					}
					if (item.role == 1) {
						roleStr = "租客";
					} else if (item.role == 2) {
						roleStr = "经纪人";
					} else if (item.role == 3) {
						roleStr = "房东";
					}
					
					content += "<div class='item'>"+ 
							"<div class='contactHeadPic'>" +
							"<a href='"+(item.role==2?(item.url+"' target=\'_blank\'"):"###\'")+"><img src='" + contactHeadPic + "' alt='头像' onerror=\"showImgDelay(this,\'/images/defaultPic/head.png\',2)\" /></a></div>" + 
							"<div class='name'><a href='"+(item.role==2?(item.url+"' target=\'_blank\'"):"###\'")+"><strong>" + item.name + "</strong></a><span>" + roleStr + "</span></div>" + 
							"<div class='time'><b><q class='zgIcon zgIcon-clock-o'></q>" + (item.createdtime == "0天前" ? "今天" : item.createdtime) + 
							"</b></div>" + 
							"<div class='tel'><b><q class='zgIcon zgIcon-phone zgIcon-lg'></q>" + item.mobile + "</b></div>";
					
					// 我联系过谁（房东/经纪人，可以评价）
					if(contactOpr.choseType == 1) {
						if(item.score == undefined){
							content += "<div class='opr'><a href='###' class='btn btn-primary hollowBtn review review"+item.zid_to+"' zid='"+item.zid_to+"'>评价</a></div>";
						}else{
							content += "<div class='opr'><a href='###' class='btn btn-primary hollowBtn' zid='"+item.zid_to+"' style='margin-left: 90px;'>已评价</a></div>";
						}
						
					}
					// 谁联系过我（不可对租客评价，可对房东/经纪人）
					if(contactOpr.choseType == 2 && (item.role == 2 || item.role == 3)) {
						if(item.score == undefined){
							content += "<div class='opr'><a href='###' class='btn btn-primary hollowBtn review review"+item.zid+"' zid='"+item.zid+"'>评价</a></div>";
						}else{
							content += "<div class='opr'><a href='###' class='btn btn-primary hollowBtn' zid='"+item.zid+"' style='margin-left: 90px;'>已评价</a></div>";
						}
					}
					// 通过/拒绝
					if (contactOpr.role == 3 && contactOpr.choseType == 4) {
						content += " <div class='opr'>"
								+ "<a href='###' class='btn btn-primary hollowBtn pass' opId = '" + item.zid + "'>通过</a>"
								+ "<a href='###' class='btn btn-danger hollowBtn refuse'  opId = '" + item.zid + "'>拒绝</a>" 
								+ "</div>";
					}
					if (contactOpr.choseType == 3) {
						content += "<div class='opr'>" + "<p>等待对方确认</p>" + "</div>";
					}
					content += "</div>";
			});
			obj.append(content);
			contactOpr.fillPages();
			Review.reviewPopBox();
			if (contactOpr.role == 3 && contactOpr.choseType == 4) {
				$(".pass").click(function() {
					var id = $(this).attr("opid");
					contactOpr.bindPass(obj, id);
				});
				$(".refuse").click(function() {
					var id = $(this).attr("opid");
					contactOpr.bindRefuse(obj, id);
				});
			}
		} else {
			contactOpr.showMassage(obj, info);
		}
		Init();
	},
	fillPages: function() {
		if(Pager.pages > 1){
			$(".pages").remove();
			var content = "<div class='pages'><span>第</span><span id='currPage'>" + Pager.currPage + "</span><span>/</span><span id='totalPage'>" + Pager.pages + "</span><span>页</span></div>";
			$(".pagination").prepend(content);
		}
	}
};
$(function() {
	contactOpr.init();
});

