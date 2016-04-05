//校验规则
var myDataType = {
	"virLocation" : /^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-]+$/,
	"bedRoom" : function(gets, obj, curform, regxp) {
		var newBedRoom = parseInt(gets);
		if (isNaN(newBedRoom)) {
			return "请输入1-9之间的数字";
		}
		if (newBedRoom > 0 && newBedRoom <= 9) {
			return true;
		} else {
			return "请输入1-9之间的数字";
		}
	},
	"bathRoom" : function(gets, obj, curform, regxp) {
		var bathRoom = parseInt(gets);
		if (isNaN(bathRoom)) {
			return "请输入0-9之间的数字";
		}
		if (bathRoom >= 0 && bathRoom <= 9) {
			return true;
		} else {
			return "请输入0-9之间的数字";
		}
	},
	"price" : function(gets, obj, curform, regxp) {
		var price = parseInt(gets);
		var budget = $("#budget").val();
		if (isNaN(price)) {
			return "请输入1-999999之间的数字";
		}
		if (price < 1 || price >= 1000000) {
			return "请输入1-999999之间的数字";
		} else {
			return true;
		}
	},
	"floorArea" : function(gets, obj, curform, regxp) {
		var floorArea = parseInt(gets);
		if (isNaN(floorArea)) {
			return "请输入1-32767之间的数字";
		}
		if (floorArea > 0 && floorArea < 32767) {
			return true;
		} else {
			return "请输入1-32767之间的数字";
		}
	},
	"carPark" : function(gets, obj, curform, regxp) {
		var carPark = parseInt(gets);
		if (isNaN(carPark)) {
			return "请输入0-9之间的数字";
		}
		if (carPark >= 0 && carPark <= 9) {
			return true;
		} else {
			return "请输入0-9之间的数字";
		}
	},
	"age" : function(gets, obj, curform, regxp) {
		var age = parseInt(gets);
		if (isNaN(age)) {
			return "请输入1-127之间的数字";
		}
		if (age > 0 && age <= 127) {
			return true;
		} else {
			return "请输入1-127之间的数字";
		}
	},
	"fee" : function(gets, obj, curform, regxp) {
		if ($.trim(gets) == "") {
			return false;
		}
		var reg = /^(\d{1,2}[.]\d{1,2}||\d{1,2})$/;
		if (!reg.test(gets)) {
			return false;
		} else {

		}
	}
}

$(function() {
	// 日期控件中文配置
	$("#btnStep4").click(function() {
		// confirmDialog({
		// content: '<img onload="qrcodeLoaded()" style="" alt="微信绑定二维码"
		// src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQHr7zoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0FrZ055SDNtWmdRZmVQRnBOMmFCAAIEGDXdVgMEWAIAAA=="
		// id="qrcodeImg">',
		// callback: function(){
		// alert(1);
		// };
		// });
	})
	$.datepicker.setDefaults({
		monthNamesShort : [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月",
				"9月", "10月", "11月", "12月" ],
		dayNamesMin : [ "日", "一", "二", "三", "四", "五", "六" ],
		dateFormat : "yy-mm-dd",
		firstDay : 1,
		showMonthAfterYear : true
	});
	$('.checkImg').parents('.itemInput').click(function() {
		if ($(this).find('.checkInput').is(':checked')) {
			$('.checkInput').prop('checked', false).attr('value', '0');
			$('.checkImg').removeClass('checked');
			// alert('no');
			return;
		} else {
			$('.checkInput').prop('checked', true).attr('value', '1');
			;
			$('.checkImg').addClass('checked');
			// alert('yes');
			return;
		}
	});
	$("#useDateInput").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "yy-mm-dd",
		minDate : 0
	// 最小日期与今天差0天，也就是今天以后
	});
	fnCreateSelectUl($(".popCom"));
	fnCreateSelectUl($(".payment"));
	$(".popCom li").click(function() {
		$('#residenceId').val($(this).attr("residenceId"));
		$('#lng').val($(this).attr("lng"));
		$('#lat').val($(this).attr("lat"));
		// $(this).parent().prev().val($(this).text()).blur();
		$(this).parent().prev().blur();
		// alert($('#residenceId').val());
	});

	function fnClassification(showclass, unifyClass) {
		$("#" + showclass).click(function() {
			$("." + unifyClass).hide();
			$("." + showclass).show();
		});
	}
	// $(".upload").eq(0).show();
	// $("#picUpload li").click(function(){
	// $(this).siblings("li").removeClass("on")
	// .end().addClass("on");
	// var clickIndex = $(this).index();
	// $(".upload").hide();
	// $(".upload").eq(clickIndex).show();
	// });
	fnTextVerify($("#introduction"), $("#introduction").next(), 200);
	fnTextVerify($("#remarks"), $("#remarks").next(), 50);
	fnTextVerify($("#otherFee"), $("#otherFee").next(), 50);

	$(".radiobox").each(function() {
		fnCreateRadiobox({
			ul : $(this),
			boxUseType : 1
		});

	});
	$(".checkbox").each(function() {
		fncreateCheckbox({
			ul : $(this)
		});
	});
	$(".optSec").each(function() {
		var $this = $(this);
		if ($this.hasClass('on')) {
			$this.parents('ul').siblings(".secInput").show();
		}
		$this.click(function() {
			$this.parents('ul').siblings(".secInput").show().focus();
		})
		$this.siblings().not('.optSec').click(function() {
			$this.parents('ul').siblings(".secInput").hide().val('');
			rent.setValidformRight($this);
		})
	});
	$("#listPage .un")
			.click(
					function(e) {
						e = window.event || e;
						$this = $(e.srcElement || e.target);
						if ($this.is(".operate, .operate *")) {
							return;
						} else {
							// var homeId = $(".un input[type=hidden]").val();
							var homeId = $(this).children("input[type=hidden]")
									.val();
							// alert(homeId);
							window.location.href = "/RentalHomeController.action?goToEditRentalHomeInput&homeId="
									+ homeId;
						}
					});

	$(".prevStep").click(function() {
		rent.showPrePage($(this));
	});
	// 初始化出租操作处理函数
	rent.init();

	// initMyK1(8);
	// uploadPicFinal("uploadHome", $("#homeImg"), $("#cert"));

});

var editor1;
// 上传图片 上传图片按钮的id img的jquery对象 隐藏域对象
function uploadPicFinal(uploadId, picObject, hiddenFileOject) {
	$('#' + uploadId).unbind("click"); // 不先取消绑定click事件的话，会触发两次click事件，不知道原因
	$('#' + uploadId).click(function() {
		editor1.loadPlugin('image', function() {
			editor1.plugin.imageDialog({
				showRemote : false,
				clickFn : function(url, title, width, height, border, align) {
					$(picObject).attr("src", url);
					$(hiddenFileOject).val(url);
					editor1.hideDialog();
					if ($(".reUpLoadBtn").length > 0) {
						$(".reUpLoadBtn").show();
						$("#headPic").show();
					}
				}
			});
		});
	});
}

function initMyK1(uploadPicType) {
	KindEditor.ready(function(K) {
		editor1 = KindEditor.editor({
			allowFileManager : true,
			pluginsPath : '/scripts/upload/',
			uploadJson : '/UserCenterOperator.action?uploadUsersPic',
			filePostName : 'photo',
			extraFileUploadParams : {
				uploadPicType : uploadPicType
			}
		});
	});
}

var rent = {
	// 角色
	role : 2,
	orderFlag : "false",
	// 选择的小区
	selectedResidenceName : "",
	// 小区缓存
	cacheResidence : {},
	// 保存已选择小区
	chosenResidencePool : {},
	// 0 代表小区不在提示列表中，1 代表小区在提示列表中
	changeResidenceFlag : 0,
	// 进行步骤
	step : 1,
	// 保存类型 1创建2保存
	saveType : 1,
	// 初始化出租操作处理函数
	init : function() {
		if ($("#saveType").val() == "") {
			$("#saveType").val("1");
		}
		if ($("#residenceId").val() != "") {
			rent.orderFlag = "true";
		}
		rent.saveType = $("#saveType").val();
		rent.setRole();
		rent.residenceAutocomplete($("#commuInput"));
		// 基础信息表单绑定
		rent.bindRentBasicInfoForm();
		// 配置信息表单绑定
		rent.bindRentApplitureInfoForm();
		// 费用信息表单绑定
		rent.bindRentFeeInfoForm();
		// 要求信息表单绑定
		rent.bindRentDemandInfoForm();
		// 设置合租整租
		rent.setUseType();
	},

	// 设置合租整租
	setUseType : function() {
		$("#entireRent").click(function() {
			$(".houseType").show();
			$("#bedRoom").val("");
			$("#bathRoom").val("");
			$("#houseTypeText").text("户型");
		});
		$("#shareRent").click(function() {
			$(".houseType").hide();
			$("#bedRoom").val(1);
			$("#bathRoom").val(1);
			$("#houseTypeText").text("出租面积");
		});
	},

	// 设置角色
	setRole : function() {
		if ($("#role").val() !== undefined && $("#role").val() != null
				&& $("#role").val() != "") {
			rent.role = parseInt($("#role").val());
		}
	},
	// 自动补齐小区
	residenceAutocomplete : function(obj) {
		obj
				.autocomplete(
						{
							minLength : 0,
							width : 318,
							autoFocus : true,
							source : function(request, response) {
								var cityCode = $("#cityCode").val();
								var term = request.term;
								if (term in rent.cacheResidence) {
									response($
											.map(
													rent.cacheResidence[term],
													function(item, index) {
														rent.chosenResidencePool = rent.cacheResidence[term];
														return {
															label : item.residenceName,
															value : item.residenceName,
															rid : item.residenceId,
															lng : item.lng,
															lat : item.lat,
															mosaicId : item.mosaicId,
															keyword : item.keyword
														}
													}));
									return;
								}
								$
										.ajax({
											url : '/EditBrokerInfo.action?getResidenceListByCityCode',
											data : {
												cityCode : cityCode,
												keyword : encodeURIComponent(request.term)
											},
											type : 'post',
											dataType : "json",
											success : function(data, status,
													xhr) {
												rent.cacheResidence[term] = data;
												rent.chosenResidencePool = data;
												response($
														.map(
																data,
																function(item,
																		index) {

																	return {
																		label : item.residenceName,
																		value : item.residenceName,
																		rid : item.residenceId,
																		lng : item.lng,
																		lat : item.lat,
																		mosaicId : item.mosaicId,
																		keyword : item.keyword
																	}
																}));
											},
											error : function(data) {
												// alert(JSON.stringify(data));
											}
										});
							},
							select : function(event, ui) {
								event.preventDefault();
								rent.orderFlag = "true";
								$("#residenceId").val(ui.item.rid);
								$("#lat").val(ui.item.lat);
								$("#lng").val(ui.item.lng);
								$("#mosaicId").val(ui.item.mosaicId);
								$("#keyword").val(ui.item.keyword);
								this.value = String(ui.item.label).substring(0,
										String(ui.item.label).indexOf("("));
								rent.selectedResidenceName = this.value
								$("#commuInput").blur();
							}
						}).focus(function() {
					$(this).autocomplete("search", "");
				}).change(function() {
					if ($(this).val() != rent.selectedResidenceName) {
						rent.orderFlag = "false";
					}
				});

		// $("#commuInput").blur(function() {
		// var goTo = 0;
		// $.each(rent.cacheResidence, function(index, item) {
		// goTo = 1;
		// $.each(item, function(i, it) {
		// var residenceName = String(it.residenceName).substring(0,
		// String(it.residenceName).indexOf("("))
		// if(residenceName == $.trim($("#commuInput").val())) {
		// rent.changeResidenceFlag = 1;
		// return false;
		// } else {
		// rent.changeResidenceFlag = 0;
		// }
		// });
		// if(rent.changeResidenceFlag == 1) {
		// return false;
		// }
		// });
		// if(goTo == 0) {
		// rent.changeResidenceFlag = 0;
		// return false;
		// }
		// });

		$("#cityCode").change(function() {
			cacheResidence = {};
		});
	},
	// 设置查询状态
	saving : function(obj) {
		obj.text("保存中...");
		obj.attr("disabled", "true");

	},
	// 查询结束
	completed : function(obj) {
		obj.text("下一步");
		obj.removeAttr("disabled");
	},
	// 显示下一页数据
	showNextPage : function(obj) {
		obj.parents('.steps').hide().next('.steps').show();
		Init();
	},
	// 显示上一页数据
	showPrePage : function(obj) {
		obj.parents('.steps').hide().prev('.steps').show();
		Init();
	},
	// 获得是否对经济人公开选项
	getBorkerOpen : function() {
		if ($(".borkerOpen").children("li").hasClass("on")) {
			$("#borkerOpen").val("1");
		} else {
			$("#borkerOpen").val("0");
		}
	},
	// 获得联系时是否需要审核
	getLinkOpen : function() {
		if ($(".linkOpen").children("li").hasClass("on")) {
			$("#linkOpen").val("0");
		} else {
			$("#linkOpen").val("1");
		}
	},
	// 设置租单id和保存状态
	setIdAndSaveType : function(data) {
		if (rent.saveType == 1) {
			$(".idValue").val(data.listId);
			rent.saveType = 2;
			$("#saveType").val("2");
		}
	},
	// 设置房源内部号码
	setXlid : function() {
		var xlid = $("#xlid").val();
		if ($.trim(xlid) != "") {
			$("#xlid").attr("ignore", "");
		} else {
			$("#xlid").attr("ignore", "ignore");
		}
	},
	// 设置入驻日期
	useDate : function() {
		var useDate = parseInt($("#useDate").val());
		if (useDate == 1) {
			$("#useDateInput").attr("ignore", "");
			if ($.trim($("#useDateInput").val()) != "") {
				$("#useDate").val($("#useDateInput").val());
			}
		} else {
			$("#useDate").val("");
			$("#useDateInput").attr("ignore", "ignore");
		}
	},
	// 基础信息表单绑定
	bindRentBasicInfoForm : function() {
		var add = $("#step1")
				.Validform(
						{
							tiptype : 4,
							ignoreHidden : true,
							ajaxPost : true,
							btnSubmit : $("#btnStep1"),
							datatype : myDataType,
							beforeCheck : function(curform) {
								// 在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
								// 这里明确return false的话将不会继续执行验证操作;
								// 设置房源内部号码
								rent.setXlid();
							},
							beforeSubmit : function(curform) {
								// 在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
								// 这里明确return false的话表单将不会提交;
								rent.saving($("#btnStep1"));
								rent.useDate();
								// rent.getBorkerOpen();
								rent.getLinkOpen();
								if (rent.orderFlag == "false") {
									$("#commuInput").next().removeClass(
											"Validform_right").addClass(
											"Validform_wrong").text(
											"请选择提示列表中的小区。");
									rent.completed($("#btnStep1"));
									return false;
								}
								return true;
							},
							callback : function(data) {
								rent.completed($("#btnStep1"));
								if ($.trim(data.status) == "y") {
									rent.setIdAndSaveType(data);
									rent.showNextPage($("#btnStep1"));
									$("#bedHiddenFileName").val("");
									// var Qs = "<div id='idName'
									// class='divPopup round'><h5>提示</h5><div
									// class='textBox'><p>" + data.info +
									// "</p></div><div class='popLine
									// clearfix'></div></div>";
									// popBox($(Qs));
									// setTimeout(function(){
									// $("#idName").remove();
									// CoverLayer(0);
									// },1500);
								} else if ($.trim(data.status) == "n") {
									add.resetForm();
									// var Qs="<div id='idName'
									// class='divPopup'><h5>提示</h5><div
									// class='textBox'>" + data.info +
									// "</div><div class='btnBox
									// clearfix'><button id='question'
									// class='confirmBtn onlyBtn btn
									// btn-success'>确认</button></div></div>";
									// popBox($(Qs),".confirmBtn");
									confirmDialog(data.info);
								} else if ($.trim(data.status) == "e") {
									add.resetForm();
									// window.location.href = "/";
									// var Qs="<div id='idName'
									// class='divPopup'><h5>提示</h5><div
									// class='textBox'>" + data.info +
									// "</div><div class='btnBox
									// clearfix'><button id='question'
									// class='confirmBtn onlyBtn btn
									// btn-success'>确认</button></div></div>";
									// popBox($(Qs),".confirmBtn");
									confirmDialog(data.info);
								} else if ($.trim(data.status) == "needId") {
									confirmDialog(
											"亲，为了靠谱，本平台每个人均需一次性验证真实身份，请验证后继续下一步。",
											function() {
												window.location.href = "/UserCenterController.action?goToVerifyIdPage";
											})
								} else {
									confirmDialog(data.info);
								}
							}
						});
	},
	// 处理配置
	dealAppliture : function() {
		var str = "";
		$(".furniture li.on").each(function() {
			str += $.trim($(this).text()) + ",";
		});
		if (str != "") {
			str = str.substring(0, str.lastIndexOf(","));
			$(".furniture").prev().val(str);
		}
	},
	// 配置信息表单绑定
	bindRentApplitureInfoForm : function() {
		var add = $("#step2").Validform({
			tiptype : 4,
			btnSubmit : $("#btnStep2"),
			ignoreHidden : true,
			ajaxPost : true,
			beforeSubmit : function(curform) {
				// 在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
				// 这里明确return false的话表单将不会提交;
				rent.saving($("#btnStep2"));
				// 处理配置
				rent.dealAppliture();
				return true;
			},
			callback : function(data) {
				rent.completed($("#btnStep2"));
				if ($.trim(data.status) == "y") {
					rent.showNextPage($("#btnStep2"));
					// var Qs = "<div id='idName' class='divPopup
					// round'><h5>提示</h5><div class='textBox'><p>" + data.info +
					// "</p></div><div class='popLine clearfix'></div></div>";
					// popBox($(Qs));
					// setTimeout(function(){
					// $("#idName").remove();
					// CoverLayer(0);
					// },1500);
				} else if ($.trim(data.status) == "n") {
					add.resetForm();
					// var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div
					// class='textBox'>" + data.info + "</div><div class='btnBox
					// clearfix'><button id='question' class='confirmBtn onlyBtn
					// btn btn-success'>确认</button></div></div>";
					// popBox($(Qs),".confirmBtn");
					confirmDialog(data.info);
				} else if ($.trim(data.status) == "e") {
					// window.location.href = "/";
					add.resetForm();
					// var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div
					// class='textBox'>" + data.info + "</div><div class='btnBox
					// clearfix'><button id='question' class='confirmBtn onlyBtn
					// btn btn-success'>确认</button></div></div>";
					// popBox($(Qs),".confirmBtn");
					confirmDialog(data.info);
				}
			}
		});
	},
	// 处理押金方式
	dealPaymentType : function() {
		var paymentType = parseInt($("#rentalPaymentType").val());
		if (paymentType == 1 || paymentType == 2) {
			$("#commision").attr("ignore", "");
		} else {
			$("#commision").attr("ignore", "ignore");
		}
	},
	// 处理水费
	dealWater : function() {
		var water = parseInt($("#water").val());
		if (water != 0) {
			$("#waterInput").attr("ignore", "");
			if ($.trim($("#waterInput").val()) != "") {
				$("#water").val($("#waterInput").val());
			}
		} else if (water == 0) {
			$("#water").val("");
			$("#waterInput").attr("ignore", "ignore");
		}
	},
	// 处理电费
	dealPower : function() {
		var power = parseInt($("#power").val());
		if (power != 0) {
			$("#powerInput").attr("ignore", "");
			if ($.trim($("#powerInput").val()) != "") {
				$("#power").val($("#powerInput").val());
			}
		} else if (power == 0) {
			$("#power").val("");
			$("#powerInput").attr("ignore", "ignore");
		}
	},
	// 处理物业费
	dealPmFee : function() {
		var pmFee = parseInt($("#pmFee").val());
		if (pmFee != 0) {
			$("#pmFeeInput").attr("ignore", "");
			if ($.trim($("#pmFeeInput").val()) != "") {
				$("#pmFee").val($("#pmFeeInput").val());
			}
		} else if (pmFee == 0) {
			$("#pmFee").val("");
			$("#pmFeeInput").attr("ignore", "ignore");
		}
	},
	// 处理取暖费
	dealHeating : function() {
		var heating = parseInt($("#heating").val());
		if (heating != 0) {
			$("#heatingInput").attr("ignore", "");
			if ($.trim($("#heatingInput").val())) {
				$("#heating").val($("#heatingInput").val());
			}
		} else if (heating == 0) {
			$("#heating").val("");
			$("#heatingInput").attr("ignore", "ignore");
		}
	},
	// 去除错误格式
	setValidformRight : function(obj) {
		obj.parent().siblings(".Validform_checktip").removeClass(
				"Validform_wrong").text("");
	},
	// 费用信息表单绑定
	bindRentFeeInfoForm : function() {
		var add = $("#step3").Validform({
			tiptype : 4,
			btnSubmit : $("#btnStep3"),
			ignoreHidden : true,
			datatype : myDataType,
			ajaxPost : true,
			beforeCheck : function(curform) {
				// 在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
				// 这里明确return false的话将不会继续执行验证操作;
				// 处理押金方式
				rent.dealPaymentType();
				// 处理水费
				rent.dealWater();
				// 处理电费
				rent.dealPower();
				// 处理物业费
				rent.dealPmFee();
				// 处理取暖费
				rent.dealHeating();
			},
			beforeSubmit : function(curform) {
				// 在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
				// 这里明确return false的话表单将不会提交;
				rent.saving($("#btnStep3"));
				/*
				 * if(paymentTypeResult == false || waterResult == false ||
				 * powerResult == false || pmFeeResult == false ||
				 * heatingeResult == false) { add.check(false); return false; }
				 */
				return true;
			},
			callback : function(data) {
				rent.completed($("#btnStep3"));
				if ($.trim(data.status) == "y") {
					rent.showNextPage($("#btnStep3"));
					// var Qs = "<div id='idName' class='divPopup
					// round'><h5>提示</h5><div class='textBox'><p>" + data.info +
					// "</p></div><div class='popLine clearfix'></div></div>";
					// popBox($(Qs));
					// setTimeout(function(){
					// $("#idName").remove();
					// CoverLayer(0);
					// },1500);
				} else if ($.trim(data.status) == "n") {
					add.resetForm();
					// var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div
					// class='textBox'>" + data.info + "</div><div class='btnBox
					// clearfix'><button id='question' class='confirmBtn onlyBtn
					// btn btn-success'>确认</button></div></div>";
					// popBox($(Qs),".confirmBtn");
					confirmDialog(data.info);
				} else if ($.trim(data.status) == "e") {
					add.resetForm();
					// window.location.href = "/";
					// var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div
					// class='textBox'>" + data.info + "</div><div class='btnBox
					// clearfix'><button id='question' class='confirmBtn onlyBtn
					// btn btn-success'>确认</button></div></div>";
					// popBox($(Qs),".confirmBtn");
					confirmDialog(data.info);
				}
			}
		});
	},
	// 判断是否关注了官方微信
	isSubscribe : function() {
		var result;
		$.ajax({
			url : "/Weixin.action?isSubscribe",
			type : 'post',
			dataType : "json",
			async : false,
			success : function(json) {
				if (json.status == "n") {
					result = "0";
				} else {
					result = "1";
				}
			}
		});
		return result;
	},

	// 获取二维码
	getQRCode : function() {
		$
				.post(
						"/Weixin.action?getQRCodeForRentNoticeWithWeixinBind",
						{
							pid : $("#ppid").val()
						},
						function(json) {
							// 依然失败
							if (json.status == "n") {
								alertDialog("二维码获取失败，请刷新页面重新获取.");
								return;
							}
							var content = "<div class='weixin' id='qrcodeBox'>"
									+ "<div class='waiting' id='waiting'></div>"
									+ "<img id='qrcodeImg' src='"
									+ json.url
									+ "' alt='微信绑定二维码' style='display:none;'/>"
									+ "<p class='house' id='tip' >扫二维码，关注真格租房服务号，关注后您就可以及时收到并处理租客预约申请。如果取消关注，则过程终止，<br/>（如看不到二维码请关闭弹窗，重新点击发布按钮。）</p>"
									+ "</div>";
							alertDialog(content);
							// 清除等待标志
							$("#waiting").remove();
							// 显示二维码
							$("#qrcodeImg").show();
							rent.isSubscribeOnClock();
						});
	},

	// 开启定时检查
	isSubscribeOnClock : function() {
		var t = setInterval(function() {
			$.post("/Weixin.action?getWeixinBindResult", function(json) {
				switch (json.status) {
				case "0":
					break;
				case "-1": // 未绑定
					break;
				case "1": // 绑定成功
				case "2": // 已绑定过
					$("#qrcodeBox").parents(".inspectHouse").hide().next(
							".flowTips").removeClass("hide");
					t && window.clearInterval(t); // 停止计时器
					$("#btnStep4").click();
					// obj.submitForm(false,"/RentListOperator.action?saveRentDemandInfo");
					break;
				case "3": // 已绑定过其它微信
				default:
					break;
				}
			});
		}, 3000);
	},

	// 处理需求
	dealNeed : function() {
		var str = "";
		$(".edu li.on").each(function() {
			str += $(this).attr("useType") + ",";
		});
		if (str != "") {
			str = str.substring(0, str.lastIndexOf(","));
			$(".edu").prev().val(str);
		}
	},
	// 处理年龄需求
	dealNeedAge : function() {
		var needAge = parseInt($("#needAge").val());
		if (needAge != 0) {
			$("#needAgeInput").attr("ignore", "");
			if ($.trim($("#needAgeInput").val())) {
				$("#needAge").val($("#needAgeInput").val());
			}
		} else {
			$("#needAge").val("");
			$("#needAgeInput").attr("ignore", "ignore");
		}
	},
	// 配置要求表单绑定
	bindRentDemandInfoForm : function() {
		var add = $("#step4")
				.Validform(
						{
							tiptype : 4,
							btnSubmit : $("#btnStep4"),
							ignoreHidden : true,
							datatype : myDataType,
							ajaxPost : true,
							beforeCheck : function(curform) {
								// 处理年龄需求

								rent.dealNeedAge();
							},
							beforeSubmit : function(curform) {
								// 在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
								// 这里明确return false的话表单将不会提交;
								var isFlag = rent.isSubscribe();
								if (isFlag == "0") {
									// 需要绑定微信
									rent.getQRCode(add);
									return false;
								} else {
									rent.saving($("#btnStep4"));
									// 处理需求
									rent.dealNeed();
									return true;
								}
							},
							callback : function(data) {
								rent.completed($("#btnStep4"));
								if ($.trim(data.status) == "y") {
									// var Qs = "<div id='idName'
									// class='divPopup round'><h5>提示</h5><div
									// class='textBox'><p>" + data.info +
									// "</p></div><div class='popLine
									// clearfix'></div></div>";
									// popBox($(Qs));
									// setTimeout(function(){
									// $("#idName").remove();
									// CoverLayer(0);
									// window.location =
									// "/RentListController.action?goToAddRentPage";
									// },1000);
									alertSetTime(data.info + "<br>3秒后自动跳转。",
											3000);
									setTimeout(
											function() {
												window.location = "/RentListController.action?goToPublishedRentList";
											}, 3000);
								} else if ($.trim(data.status) == "n") {
									add.resetForm();
									// var Qs="<div id='idName'
									// class='divPopup'><h5>提示</h5><div
									// class='textBox'>" + data.info +
									// "</div><div class='btnBox
									// clearfix'><button id='question'
									// class='confirmBtn onlyBtn btn
									// btn-success'>确认</button></div></div>";
									// popBox($(Qs),".confirmBtn");
									confirmDialog(data.info);
								} else if ($.trim(data.status) == "e") {
									// window.location.href = "/";
									add.resetForm();
									// var Qs="<div id='idName'
									// class='divPopup'><h5>提示</h5><div
									// class='textBox'>" + data.info +
									// "</div><div class='btnBox
									// clearfix'><button id='question'
									// class='confirmBtn onlyBtn btn
									// btn-success'>确认</button></div></div>";
									// popBox($(Qs),".confirmBtn");
									confirmDialog(data.info);
								} else if ($.trim(data.status) == "needId") {
//									window.location.href = "/UserCenterController.action?goToCheckVerifyAuthority&dest=2";
									confirmDialog(
											"完成发布还需确认您是真实参与，我们承诺：您的姓名仅以“某先生/女士”方式出现2、您的身份证号被专项加密，即使我们的工作人员也无法解读您得到的好处：1、申请与您联系的租客亦经过实名认证，拒绝骚扰2、您与租客可进行有法律效力的电子签约",
											function() {
												window.open("/UserCenterController.action?goToVerifyIdPage");
											})
								}
							}
						});
	}
}
