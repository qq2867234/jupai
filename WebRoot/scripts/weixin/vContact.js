
var brokerListPhtoto = "/account/photo"; 

//当图片加载失败是指定默认图片
function showImgDelay(imgObj, imgSrc, maxErrorNum) {
	if (maxErrorNum > 0) {
		imgObj.onerror = function() {
			showImgDelay(imgObj, imgSrc, maxErrorNum - 1);
		};
		setTimeout(function() {
			imgObj.src = imgSrc;
		}, 500);
	} else {
		imgObj.onerror = null;
		imgObj.src = imgSrc;
	}
}


var contactOpr = {
	role : null,
	// 展示数据的位置 1 表示获取我联系过的，2表示获取联系过我的，3我联系的待确认，4联系我的待确认
	choseType : 1,
	waitingH : null,
	init : function() {
		contactOpr.role = $("#role").val();
		if (contactOpr.role == 1) {
			contactOpr.choseType = 1;
		} else if (contactOpr.role == 3) {
			if($("#choseType").val() != "" && parseInt($("#choseType").val()) <=3) {
				contactOpr.choseType = parseInt($("#choseType").val());
			}else{
				contactOpr.choseType = 4;
			}
		}
		// 生成标签栏
//		contactOpr.generateTab();
		// 设置显示句话的容器
		contactOpr.waitingH = $("#utcH");
		// 获得联系信息
		contactOpr.getContactInfo();
	},
//	// 根据身份生成标签栏
//	generateTab : function() {
//		var content = "";
//		if (contactOpr.role == 1) {
//			$("#currentMenu").text("已通过审核联系人");
//			content = "<div class='weui_actionsheet_cell'>待通过审核</div>" +
//					"<div class='weui_actionsheet_cell'>已通过审核联系人</div>";
//		} else if (contactOpr.role == 3) {
//			content = "<div class='weui_actionsheet_cell'>待审核联系人</div>" +
//					"<div class='weui_actionsheet_cell'>已审核联系人</div>" +
//					"<div class='weui_actionsheet_cell'>联系过我的人</div>";
//		}
//		$("#menu").append(content);
//	},
	// 清理区域
	cleanArea : function() {
		$("#contactList").empty();
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
		obj.append("<div class='weui_msg'> <div class='weui_icon_area'><i class='zgIcon zgIcon-info-circle'></i></div> <div class='weui_text_area'> <h3 class='weui_msg_title'>" + info + "</h3> </div> </div>");
	},
	// 刷新数据
	refresh : function() {
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
				$.hideLoading();
				if (data.status == "y") {
					$.toast("已添加");
					obj.parent().remove();
					contactOpr.refresh();
				} else {
					$.toast("操作失败，请稍后重试");
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
				$.hideLoading();
				if (data.status == "y") {
					$.toast("已拒绝");
					obj.parent().remove();
					contactOpr.refresh();
				} else {
					$.toast("操作失败，请稍后重试");
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
		obj = $("#contactList");
		if (contactOpr.choseType == 1) {
			info = "暂时还没有联系过其他人";
		} else if (contactOpr.choseType == 2) {
			info = "暂时还没有人联系过你";
		} else if (contactOpr.choseType == 3) {
			info = "暂时没有需要确认的联系人";
		} else if(contactOpr.choseType == 4) {
			info = "暂时没有需要确认的联系人";
		}
		contactOpr.cleanArea();
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
					
					content += "<div class='renterList'>" +
							"<div class='renter'>" +
								"<span class='img'><img src='" + contactHeadPic + "' alt='头像' onerror=\"showImgDelay(this,\'/images/defaultPic/head.png\',2)\" /></span>" +
								"<strong>" + item.name + "(" + roleStr + ")</strong>" +
								"<a class='renterInfo' href='tel:"+item.mobile+"'><i class='zgIcon zgIcon-phone'></i>" +  item.mobile + 
								"</a>" +
								"<span class='time'>" + (item.createdtime == "0天前" ? "今天" : item.createdtime) + " </span>" +
							"</div>";
					// 通过/拒绝
					if (contactOpr.role == 3 && contactOpr.choseType == 4) {
						content += "<a href='###' class='btn refuse' opId='" + item.zid + "'>不通过</a>" +
								"<a href='###' class='btn btn-primary pass' opId='" + item.zid + "'>通过</a>";
					}
					content += "</div>";
			});
			obj.append(content);
			contactOpr.fillPages();
			if (contactOpr.role == 3 && contactOpr.choseType == 4) {
				$(".pass").click(function() {
					var pass = $(this);
					var id = $(this).attr("opid");
					dialog.content = "确定要添加他为联系人吗？";
					dialog.confirmFn = function() {
						$.showLoading("操作中...");
						contactOpr.bindPass(pass, id);
					}
					fnCreateDialog(dialog);
				});
				$(".refuse").click(function() {
					var refuse = $(this);
					var id = $(this).attr("opid");
					dialog.content = "确定要拒绝他吗？";
					dialog.confirmFn = function() {
						$.showLoading("操作中...");
						contactOpr.bindRefuse(refuse, id);
					}
					fnCreateDialog(dialog);
				});
			}
		} else {
			contactOpr.showMassage(obj, info);
		}
//		Init();
	},
	fillPages: function() {
		if(Pager.pages > 1){
			$(".pages").remove();
			var content = "<div class='pages'><span>第</span><span id='currPage'>" + Pager.currPage + "</span><span>/</span><span id='totalPage'>" + Pager.pages + "</span><span>页</span></div>";
			$(".pagination").prepend(content);
		}
	}
};
var role = $("#role").val();
var index = 0;
$(function() {
	contactOpr.init();
	$("#menu").children().click(function() {
		index = $(this).index();
		if(role == 1) {
			if(index == 0) {
				contactOpr.choseType = 3;
			} else {
				contactOpr.choseType = 1;
			}
		} else {
			if(index == 0) {
				contactOpr.choseType = 4;
			} else {
				contactOpr.choseType = 2;
			}
		}
		$("#currentMenu").text($(this).text());
		contactOpr.refresh();
		hideActionSheet($("#weui_actionsheet"), $("#mask.trans")); 
		
	});
});

