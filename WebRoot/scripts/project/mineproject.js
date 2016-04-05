//区县编码
var districtCode;
//商圈编码
var bizcircleCode;
//************************************玲姐部分  开始****************************************************************
$(function(){
	$(document).click(function(e){
		e = window.event || e;
  		$this = $(e.srcElement || e.target);
		if(!$this.is("#county,#county *")&&!$this.is("#countyInput,#countyInput *")&&!$this.is("#circle,#circle *")&&!$this.is("#circleInput,#circleInput *"))
		{
			$("#county").hide();
			$("#circle").hide();
		}

		});
/*	$(".residenceManage td.infor").mouseenter(function(){
		$(this).addClass("inforBg");
		
		});
	$("tr.normal .confirm").click(function(){
		$(this).prev("input")
	   .removeClass("change")
	   .prev(".zone")
	   .removeClass("change")
	   .end().end()
	   .hide();
	});*/
/*	$("#mBtn").click(function(){
		$(".moreInfo").show();
		$(this).parents(".divLine").hide();
		$("#lBtn").parents(".divLine").show();
		Init();
		
	});
	$("#lBtn").click(function(){
		$(".moreInfo").hide();
		Init();
		$(this).parents(".divLine").hide();
		$("#mBtn").parents(".divLine").show();
	});*/
	$("#relaBox li").mouseenter(function(){
		$(this).addClass("hover");
		});
	$("#relaBox li").mouseleave(function(){
		$(this).removeClass("hover");
		});
	$("#countyInput").focus(function(){
		$("#circleInput").removeClass("inputOn");
		$(this).addClass("inputOn");
		$("#county").show();
		$("#circle").hide();
		});
	$("#circleInput").focus(function(){
		if($("#countyInput").val()=="")
		{
			$("#countyInput").focus();
			$(this).blur();
		}
		else
		{
			$("#countyInput").removeClass("inputOn");
//			$(this).addClass("inputOn");
//			$("#circle").show();
			$("#county").hide();
			var cityCode = $("#cityCode").val();
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
							$("#circle").append("<li param='"+item.bizcircle_code+"'>"+item.bizcircle_name+"</li>");
						});
						$("#circle li").not(".charater").bind('click',function(e){
							stopProp(e);
							$("#circleInput").val($(this).text());
							$("#districtCode").val($(this).attr("param"));
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
		districtCode = $.trim($(this).attr("param"));
		$("#districtCode").val(districtCode);
		$("#bizcircleCode").val("");
		$("#countyInput").val($(this).text());
		$("#circleInput").val("");
		if($("#circleInput").val().length>0){
			$("#circleInput").val("");
		}
		$("#countyInput").change();
		$("#countyInput").blur();
		$("#circleInput").val("");
		
		var cityCode = $("#cityCode").val();
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
						$("#circle").append("<li param='"+item.bizcircle_code+"'>"+item.bizcircle_name+"</li>");
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
		$("#bizcircleCode").val($(this).attr("param"));
		$("#circleInput").val($(this).text());
		$("#circleInput").change();
		$(this).siblings().removeClass("on")
			.end().addClass("on")
			.parent().hide();
		$("#circleInput").removeClass("inputOn");
		});
		fnTextVerify($("#parkingMode"),$("#parkingMode").next("span"),48);
		fnTextVerify($("#salesAddress"),$("#salesAddress").next("span"),40);
		fnTextVerify($("#pmCompany"),$("#pmCompany").next("span"),32);
	fnTextVerify($("#residenceName"),$("#residenceName").next("span"),16);
	fnTextVerify($("#address"),$("#address").next("span"),40);	
	fnTextVerify($("#alias"),$("#alias").next("span"),32);	
	fnTextVerify($("#intro"),$("#intro").next("span"),200);
	//fnTextVerify($("#intro textarea"),$("#intro textarea").next("span"),200);
	fnTextVerify($("#shopTextarea"),$("#shopTextarea").next("span"),600);
	
	//fnTextVerify($("#support textarea"),$("#support textarea").next("span"),200);
	$(".upload").eq(0).show().children().show();
	$("#picUpload li").click(function(){
		$(this).siblings("li").removeClass("on")
			.end().addClass("on");
		var clickIndex = $(this).index();
		$(".upload").hide();
		$(".upload").eq(clickIndex).show();

		});
/*	$(".delPic").click(function(){
		$(this).parent().remove();		
		});*/
	$(".uploadBtn").click(function(){
		$(this).next().click();
		});
/*	$(".picbox").each(function(){
		fnTextVerify($(this).children("textarea"),$(this).children(".remainder"),16);
		});*/

}); 
//****************************************玲姐部分  结束************************************************************

/*var maxLiving = 6;
var maxBed = 6;
var maxBath = 3;
var maxKitchen = 2;
var maxPublicArea = 2;
var maxFloorPrint = 1;
var l = 0;
var bed = 0;
var bath = 0;
var kitchen = 0;
var publicArea = 0;
var floorPrint = 0;*/
var picType = 0;
var map;
var add;
var saveStatus = 0;// 保存操作的状态 0表示失败 1表示成功
var isconfirm = 0;// 是否确认所选点
var mapstate=0;

// 生成地图
function generateMap(longitude, latitude) {
	var marker1;
	var cityName = $("#cityName").val();
	// 百度地图API功能
	map = new BMap.Map("projectLocation"); // 创建Map实例
	map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
	map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
	// map.setMaxZoom(zoom:Number);//设置地图允许的最大级别。取值不得大于地图类型所允许的最大级别。
	map.setDefaultCursor("pointer");
	var point;
	
	
	if (longitude == null || latitude == null) {
		map.centerAndZoom(cityName); // 初始化地图,设置中心点坐标和地图级别。
	} else {
		isconfirm=1;
		$("#confirmP").text("重新选择位置");
		point = new BMap.Point(longitude, latitude);
		map.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别。
	
	}
	map.enableScrollWheelZoom(); // 启用滚轮放大缩小
	map.addEventListener("click", showInfo);
	function showInfo(e) {
		/*
		 * map.setCenter(new BMap.Point(e.point.lng, e.point.lat));
		 * map.setZoom(15);
		 */

		/*
		 * if (longitude == null || latitude == null) { var gc = new
		 * BMap.Geocoder(); var pt = e.point;
		 * 
		 * gc.getLocation(pt, function(rs) { var addComp = rs.addressComponents;
		 * if (addComp.city != cityName + "市") { alert("只能在服务城市进行标注");
		 * map.setCenter(cityName); return false; } else { marker1 = new
		 * BMap.Marker(new BMap.Point(e.point.lng, e.point.lat)); // 创建标注
		 * $("#longitude").val(e.point.lng); $("#latitude").val(e.point.lat);
		 * map.addOverlay(marker1); // 将标注添加到地图中 } }); } else { marker1 = new
		 * BMap.Marker(new BMap.Point(e.point.lng, e.point.lat)); // 创建标注
		 * $("#longitude").val(e.point.lng); $("#latitude").val(e.point.lat);
		 * map.addOverlay(marker1); // 将标注添加到地图中 }
		 */
		if (isconfirm == 0) {
			map.clearOverlays();
			marker1 = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat)); // 创建标注
			$("#longitude").val(e.point.lng);
			$("#latitude").val(e.point.lat);
			map.addOverlay(marker1);
		} /*else {
			var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>你已经确定了楼盘的位置，如想重新定位，请再次点击“选择商圈”按钮</p></div><div class='popLine clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success' style='margin-left:200px;'>确认</button></div></div>";
			popBox($(Qs), ".confirmBtn");

		}*/

	}
	return map;
};

// 为新楼盘标注位置
function pointProject(longitude, latitude, type) {
	var marker1;
	if (type == 1) {
		marker1 = new BMap.Marker(new BMap.Point(longitude, latitude)); // 创建标注
	} else if (type == 2) {
		var myIcon = new BMap.Icon("/images/public/map/location.png",
				new BMap.Size(28, 31), {

				});
		var point = new BMap.Point(longitude, latitude)
		var marker1 = new BMap.Marker(point, {
			icon : myIcon,
			offset : new BMap.Size(0, -10)
		});

	}
	$("#longitude").val(longitude);
	$("#latitude").val(latitude);
	map.addOverlay(marker1);

}
/*
 * if($.trim($("#livingLen").val()) != "" && $.trim($("#livingLen").val()) !=
 * null ) { l = $("#livingLen").val(); } if($.trim($("#bedLen").val()) != "" &&
 * $.trim($("#bedLen").val()) != null ) { bed = $("#bedLen").val(); }
 * if($.trim($("#bathLen").val()) != "" && $.trim($("#bathLen").val()) != null ) {
 * bath = $("#bathLen").val(); } if($.trim($("#kitchenLen").val()) != "" &&
 * $.trim($("#kitchenLen").val()) != null ) { kitchen = $("#kitchenLen").val(); }
 * if($.trim($("#publicAreaLen").val()) != "" &&
 * $.trim($("#publicAreaLen").val()) != null ) { publicArea =
 * $("#publicAreaLen").val(); } if($.trim($("#floorPrintList").val()) != "" &&
 * $.trim($("#floorPrintList").val()) != null ) { floorPrint =
 * $("#floorPrintList").val(); }
 */

// 修改图片评论
function editPicComment(imageId, obj) {
	$obj = $(obj);
	$.ajax({
		type : "POST",
		url : "/SaleHomeInput.action?editCommentByImageId",
		data : {
			imageId : imageId,
			imageCommet : obj.value
		},
		dataType : "json",
		success : function(data) {
			if (data.status == "y") {
				// alert("评论修改成功");
			} else if (data.status == "n") {
				alert(data.info);
			} else if (data.status == "e") {
				alert(data.info);
				window.location.href = "/UserSearch.action?toHome";
			}
		}
	});
}

// 检查发布权限
function checkAuth() {
	var result = 0;
	$.ajaxSettings.async = false;
	$.getJSON("/Project.action?checkAddListAuthority",{random:Math.random()},
					function(data) {
						if (data.status == "n") {
							var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>"
								+ data.info
								+ "</p></div><div class='popLine clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success' style='margin-left:200px;'>确认</button></div></div>";
								popBox($(Qs), ".confirmBtn");
							result = 0;
						} else {
							result = 1;
						}
					});
	return result;
}

// 删除图片
function delPic(imageId) {
	var $th = $(this);
	$th.parent().remove();
	$.ajax({
		url : "/SaleHomeInput.action?delHomeImageByImageId",
		data : {
			imageId : imageId
		},
		dataType : "json",
		type : "POST",
		success : function(data, status) {
			if (data.status == "y") {
				// alert("图片删除成功");
			} else if (data.status == "n") {
				alert(data.info);
			} else if (data.status == "e") {
				alert(data.info);
				window.location.href = "/UserSearch.action?toHome";
			}
		}
	});
}
function afterloadmap(){
	
	if(mapstate==0)
		{
		var longitude = $("#longitude").val();
		var latitude = $("#latitude").val();
		if(longitude!=null&&latitude!=null&&longitude!=""&&latitude!="")
			{
			
			pointProject(longitude, latitude, 2);
			}
		mapstate=1;
		}
};
$(function() {
	
	map.addEventListener('tilesloaded',afterloadmap);
	var firstProject = 0;
	if($("#firstResidence").val() !== undefined && $("#firstResidence").val()  != null && $("#firstResidence").val()  != "") {
		firstProject = parseInt($("#firstResidence").val());
	}
	$("#phone1").change(function() {
		var phone = $.trim($(this).val());
		if (phone != null || "" != phone) {
			$("#phone2").removeClass("must");
		} else {
			$("#phone2").addClass("must");
		}
	});

	$("#phone2").change(function() {
		var phone = $.trim($(this).val());
		if (phone != null || "" != phone) {
			$("#phone1").removeClass("must");
		} else {
			$("#phone1").addClass("must");
		}
	});

	$("#datepicker").change(function() {
		$(this).blur();
	});

	$("#confirmP").click(function() {
		isconfirm = isconfirm == 0 ? 1 : 0;
		if (isconfirm == 1) {
			$("#confirmP").text("重新选择位置");
			map.clearOverlays();
			var longitude = $("#longitude").val();
			var latitude = $("#latitude").val();
			pointProject(longitude, latitude, 2);

		} else {
			$("#confirmP").text("确定位置");
			map.clearOverlays();
			var longitude = $("#longitude").val();
			var latitude = $("#latitude").val();
			pointProject(longitude, latitude, 1);
		}

	});

	/*
	 * $("#countyInput").change(function(){alert(111);});
	 */$("#countyInput").bind("change", changMap);
	$("#circleInput").bind("change", changMap);

	$("#pointP")
			.click(
					function() {

						isconfirm = 0;
						var cityCode = $("#cityCode").val();
						var districtName = $.trim($("#countyInput").val());
						var districtCode;
						if (districtName == null) {
							$("#circleInput").next().removeClass(
									"Validform_right").addClass(
									"Validform_wrong").text("请选择区县");
							return false;
						} else {
							var longitude = 0;
							var latitude = 0;

							// 根据区县名称获取经纬度
							$
									.ajax({
										url : "/SaleHomeController.action?getDistrictLongitudeAndLatitude",
										data : {
											districtName : encodeURIComponent(districtName),
											cityCode : cityCode
										},
										dataType : "json",
										async : false,
										success : function(data, textStatus) {
											if ($.trim(data.status) == "y") {

												longitude = data.TUDE.longitude;
												latitude = data.TUDE.latitude;
												districtCode = data.TUDE.district_code;
												// map.setZoom(15);

												/*
												 * map.clearOverlays();
												 * map.panTo(new BMap.Point(
												 * longitude, latitude));
												 */

												return true;
											} else if ($.trim(data.status) == "n") {
												$("#circleInput")
														.next()
														.removeClass(
																"Validform_right")
														.addClass(
																"Validform_wrong")
														.text(data.info);
												return false;
											} else if ($.trim(data.status) == "e") {
												$("#circleInput")
														.next()
														.removeClass(
																"Validform_right")
														.addClass(
																"Validform_wrong")
														.text(data.info);
												window.location.href = "/UserSearch.action?toHome";
												return false;
											}
										}
									});
						}

						var bizcircleName = $.trim($("#circleInput").val());
						if (bizcircleName == null) {
							$("#circleInput").next().removeClass(
									"Validform_right").addClass(
									"Validform_wrong");
							return false;
						} else {
							// 根据商圈名称获取经纬度
							$
									.ajax({
										url : "/SaleHomeController.action?getBizcircleLongitudeAndLatitude",
										data : {
											bizcircleName : encodeURIComponent(bizcircleName),
											cityCode : cityCode,
											districtCode : districtCode
										},
										dataType : "json",
										async : false,
										success : function(data, textStatus) {
											if ($.trim(data.status) == "y") {

												longitude = data.TUDE.longitude != 0 ? data.TUDE.longitude
														: longitude;
												latitude = data.TUDE.latitude != 0 ? data.TUDE.latitude
														: latitude;

												/*
												 * map.clearOverlays();
												 * map.panTo(new BMap.Point(
												 * longitude, latitude));
												 */

												return true;
											} else if ($.trim(data.status) == "n") {
												$("#circleInput")
														.next()
														.removeClass(
																"Validform_right")
														.addClass(
																"Validform_wrong")
														.text(data.info);
												return false;
											} else if ($.trim(data.status) == "e") {
												$("#circleInput")
														.next()
														.removeClass(
																"Validform_right")
														.addClass(
																"Validform_wrong")
														.text(data.info);
												window.location.href = "/UserSearch.action?toHome";
												return false;
											}
										}
									});
						}

						if (longitude == 0 || latitude == 0) {

							var oldlong = $("#longitude").val(longitude);
							var oldlat = $("#latitude").val(latitude);
							if (oldlong == 0 || oldlat == 0 || oldlong == ""
									|| oldlat == "" || oldlong == null
									|| oldlat == null) {
								$("#longitude").val("");
								$("#latitude").val("");
							}

							var city = $("#cityName").val();
							map.centerAndZoom(city, 10);

						} else {
							$("#longitude").val(longitude);
							$("#latitude").val(latitude);
							map.clearOverlays();
							map.setZoom(15);
							map.panTo(new BMap.Point(longitude, latitude));
							pointProject(longitude, latitude, 1);
						}

					}// function

			);

	// $("#Brochure").click(function() {
	// $("#uploadBrochure").click();
	// });

	// //添加客厅图片
	// $("#addLivingRoomPic").click(function() {
	// $("#homeTypeName").val("livingRoomPic");
	// if(l > maxLiving - 1) {
	// alert("客厅最多上传"+maxLiving+"张图片");
	// return;
	// } else {
	// $("#homePicFile").click();
	// }
	//		
	// });
	//	
	// //添加卧室图片
	// $("#addBedRoomPic").click(function() {
	// $("#homeTypeName").val("bedRoomPic");
	// if(bed > maxBed - 1) {
	// alert("卧室最多上传"+maxBed+"张图片");
	// } else {
	// $("#homePicFile").click();
	// }
	// });
	//	
	// //添加卫生间图片
	// $("#addBathRoomPic").click(function() {
	// $("#homeTypeName").val("bathRoomPic");
	// if(bath > maxBath - 1) {
	// alert("卫生间最多上传"+maxBath+"张图片");
	// } else {
	// $("#homePicFile").click();
	// }
	// });
	//	
	// //添加厨房图片
	// $("#addKitchenRoomPic").click(function() {
	// $("#homeTypeName").val("kitchenRoomPic");
	// if(kitchen > maxKitchen - 1) {
	// alert("厨房最多上传"+maxKitchen+"张图片");
	// } else {
	// $("#homePicFile").click();
	// }
	// });
	//	
	// //添加公共区域图片
	// $("#addPublicAreaPic").click(function() {
	// $("#homeTypeName").val("publicAreaPic");
	// if(publicArea > maxPublicArea - 1) {
	// alert("公共区域最多上传"+maxPublicArea+"张图片");
	// } else {
	// $("#homePicFile").click();
	// }
	// });
	//	
	// //添加户型图
	// $("#addFloorPrintPic").click(function() {
	// $("#homeTypeName").val("floorPrintPic");
	// if(floorPrint > maxFloorPrint - 1) {
	// alert("公共区域最多上传"+maxFloorPrint+"张图片");
	// } else {
	// $("#homePicFile").click();
	// }
	// });
	//保存销售电话
	var salePhone = "0-0-0";
	var salePhone1 = "0-0-0";
	//验证销售电话
	function checkSalesPhone(salesPhone) {
		salesPhone = String(salesPhone);
		if(salesPhone == "0-0-0,0-0-0") {
			$("#phone1").removeClass("Validform_right").addClass("Validform_error").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("销售电话格式不正确，请输入固话或手机或400电话。");
			return false;
		}
		if(salesPhone.length < 0 || salesPhone > 39) {
			$("#phone1").removeClass("Validform_right").addClass("Validform_error").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("销售电话格式不正确，请输入固话或手机或400电话。");
			return false;
		}
		var areaCode = salesPhone.split(",")[0].split("-")[0];
		var phone = salesPhone.split(",")[0].split("-")[1];
		var extension = salesPhone.split(",")[0].split("-")[2];
		var areaCode1 = salesPhone.split(",")[1].split("-")[0];
		var phone1 = salesPhone.split(",")[1].split("-")[1];
		var extension1 = salesPhone.split(",")[1].split("-")[2];
		if(phone.length == 11) {
			if(areaCode.length > 0 && !areaCode == "0") {
				$("#areaCode1").removeClass("Validform_right").addClass("Validform_error").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("销售电话格式不正确，请输入固话或手机或400电话。");
				return false;
			}
			if(extension.length > 0 && !extension == "0") {
				$("#extension1").removeClass("Validform_right").addClass("Validform_error").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("销售电话格式不正确，请输入固话或手机或400电话。");
				return false;
			}
		} else if(phone.length == 10) {
			if(areaCode.length > 0 && !areaCode == "0") {
				$("#areaCode1").removeClass("Validform_right").addClass("Validform_error").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("销售电话格式不正确，请输入固话或手机或400电话。");
				return false;
			}
			if(extension.length < 0 || extension.length > 5) {
				$("#extension1").removeClass("Validform_right").addClass("Validform_error").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("销售电话格式不正确，请输入固话或手机或400电话。");
				return false;
			}
		} else if(phone.length == 7 || phone.length == 8) {
			if(areaCode.length < 0 || areaCode.length > 4) {
				$("#areaCode1").removeClass("Validform_right").addClass("Validform_error").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("销售电话格式不正确，请输入固话或手机或400电话。");
				return false;
			}
			if(extension.length < 0 || extension.length > 5) {
				$("#extension1").removeClass("Validform_right").addClass("Validform_error").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("销售电话格式不正确，请输入固话或手机或400电话。");
				return false;
			}
		}
		
		if(phone1.length == 11) {
			if(areaCode1.length > 0 && !areaCode1 == "0") {
				$("#areaCode2").removeClass("Validform_right").addClass("Validform_error").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("销售电话格式不正确，请输入固话或手机或400电话。");
				return false;
			}
			if(extension1.length > 0 && !extension1 == "0") {
				$("#extension2").removeClass("Validform_right").addClass("Validform_error").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("销售电话格式不正确，请输入固话或手机或400电话。");
				return false;
			}
		} else if(phone1.length == 10) {
			if(areaCode1.length > 0 && !areaCode1 == "0") {
				$("#areaCode2").removeClass("Validform_right").addClass("Validform_error").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("销售电话格式不正确，请输入固话或手机或400电话。");
				return false;
			}
			if(extension1.length < 0 || extension1.length > 5) {
				$("#extension2").removeClass("Validform_right").addClass("Validform_error").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("销售电话格式不正确，请输入固话或手机或400电话。");
				return false;
			}
		} else if(phone1.length == 7 || phone1.length == 8) {
			if(areaCode1.length < 0 || areaCode1.length > 4) {
				$("#areaCode2").removeClass("Validform_right").addClass("Validform_error").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("销售电话格式不正确，请输入固话或手机或400电话。");
				return false;
			}
			if(extension1.length < 0 || extension1.length > 5) {
				$("#extension2").removeClass("Validform_right").addClass("Validform_error").siblings("span").removeClass("Validform_right").addClass("Validform_wrong").text("销售电话格式不正确，请输入固话或手机或400电话。");
				return false;
			}
		}
		return true;
	}
	//拼装销售电话
	function autoFillSalesPhone(areaCode, phone, extension, areaCode1, phone1, extension1) {
		if(areaCode == "" || areaCode == undefined || areaCode == null) {
			areaCode = "0";
		}
		if(phone == "" || phone == undefined || phone == null) {
			phone = "0";
		}
		if(extension == "" || extension == undefined || extension == null) {
			extension = "0";
		}
		if(areaCode1 == "" || areaCode1 == undefined || areaCode1 == null) {
			areaCode1 = "0";
		}
		if(phone1 == "" || phone1 == undefined || phone1 == null) {
			phone1 = "0";
		}
		if(extension1 == "" || extension1 == undefined || extension1 == null) {
			extension1 = "0";
		}
		salePhone = areaCode + "-" + phone + "-" + extension;
		salePhone1 = areaCode1 + "-" + phone1 + "-" + extension1;
	}
	// 点击保存之后要做的动作
	$("#saveProject")
			.click(
					function() {
//						var areaCode = $.trim($("#areaCode1").val());
//						var phone = $.trim($("#phone1").val());
//						var extension = $.trim($("#extension1").val());
//						var areaCode1 = $.trim($("#areaCode2").val());
//						var phone1 = $.trim($("#phone2").val());
//						var extension1 = $.trim($("#extension2").val());
//						if(areaCode != "" || phone != "" || extension != "" || areaCode1 != "" || phone1 != "" || extension1 != "") {
//							autoFillSalesPhone(areaCode, phone, extension, areaCode1, phone1, extension1);
//							var result = checkSalesPhone(salePhone + "," +salePhone1);
//							if(!result) {
//								var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>销售电话格式不正确，请输入固话或手机或400电话。</p></div><div class='popLine clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success' style='margin-left:200px;'>确认</button></div></div>";
//									popBox($(Qs), ".confirmBtn");
//								return false;
//							}
//						}
//						var longitude = $.trim($("#longitude").val());
//						var latitude = $.trim($("#latitude").val());
//						var districtName = $.trim($("#countyInput").val());
//						if(districtName===undefined||districtName.length==0||districtName=='区县')
//							{
//							var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>请选择区县！</p></div><div class='popLine clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success' style='margin-left:200px;'>确认</button></div></div>";
//							popBox($(Qs), ".confirmBtn");
//							return false;
//							}
//						if (isconfirm == 0 || longitude == 0 || latitude == 0
//								|| latitude == "" || longitude == ""
//								|| latitude == null || longitude == null) {
//							var info = (longitude == 0 || latitude == 0
//									|| latitude == "" || longitude == ""
//									|| latitude == null || longitude == null) ? "请标注您的楼盘位置"
//									: "请确认您的楼盘位置";
//							var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>"
//									+ info
//									+ "</p></div><div class='popLine clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success' style='margin-left:200px;'>确认</button></div></div>";
//							popBox($(Qs), ".confirmBtn");
//							return false;
//						}
						
						
						$(".valid").attr("ignore", "ignore");
						var saveType = parseInt($("#saveType").val());
						if (firstProject == 0 && saveType == 0) {
							if (!add.check(false)) {
								locateErrorPosition();
								return false;
							} else {
								$("#saveType").val("1");
							}
							if (browser == "Microsoft Internet Explorer") {
								if (add.check()) {
									$("#addProject").attr('action',
											"/Project.action?addProject");
									$("#addProject").submit();
								}
							} else {
								add.submitForm(false,
										"/Project.action?addProject");
							}
						} else {
							if (!add.check(false)) {
								locateErrorPosition();
								return false;
							}
							if (browser == "Microsoft Internet Explorer") {
								if (add.check()) {
									$("#addProject").attr('action',
											"/Project.action?editProject");
									$("#addProject").submit();
								}
							} else {
								add.submitForm(false,
										"/Project.action?editProject");
							}
						}

					});
	// 点击发布之后的操作
	$("#publishProject").click(function() {
//						var areaCode = $.trim($("#areaCode1").val());
//						var phone = $.trim($("#phone1").val());
//						var extension = $.trim($("#extension1").val());
//						var areaCode1 = $.trim($("#areaCode2").val());
//						var phone1 = $.trim($("#phone2").val());
//						var extension1 = $.trim($("#extension2").val());
//						autoFillSalesPhone(areaCode, phone, extension, areaCode1, phone1, extension1);
//						var result = checkSalesPhone(salePhone + "," +salePhone1);
//						if(!result) {
//							var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>销售电话格式不正确，请输入固话或手机或400电话。</p></div><div class='popLine clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success' style='margin-left:200px;'>确认</button></div></div>";
//								popBox($(Qs), ".confirmBtn");
//							return false;
//						}
						var longitude = $.trim($("#longitude").val());
						var latitude = $.trim($("#latitude").val());
						var districtName = $.trim($("#countyInput").val());
						if(districtName===undefined||districtName.length==0||districtName=='区县')
							{
							var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>请选择区县！</p></div><div class='popLine clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success' style='margin-left:200px;'>确认</button></div></div>";
							popBox($(Qs), ".confirmBtn");
							return false;
							
							}
						if (isconfirm == 0 || longitude == 0 || latitude == 0
								|| latitude == "" || longitude == ""
								|| latitude == null || longitude == null) {
							var info = (longitude == 0 || latitude == 0
									|| latitude == "" || longitude == ""
									|| latitude == null || longitude == null) ? "请标注您的楼盘位置"
									: "请确认您的楼盘位置";
							var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>"
									+ info
									+ "</p></div><div class='popLine clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success' style='margin-left:200px;'>确认</button></div></div>";
							popBox($(Qs), ".confirmBtn");
							return false;
						}
						
						var cA = checkAuth();
						if (cA == 0) {
							
							return false;
						}
						var saveType = parseInt($("#saveType").val());
						var isTrue = 0;
						$(".valid").attr("ignore", "ignore");
						$(".salePhone").each(function(i, e) {
							if ($.trim($(e).val()) != "") {
								$(".salePhone").removeClass("must");
								isTrue = 1;
							}
						});
						if (isTrue == 0) {
							$(".salePhone").addClass("must");
						}
						$(".must").attr("ignore", "");
						if (!add.check(false)) {
							locateErrorPosition();
							return false;
						}
						if (firstProject == 0 && saveType == 0) {
							$("#isPublish").val("1");
							$(".valid").attr("ignore", "ignore");
							if (browser == "Microsoft Internet Explorer") {
								if (add.check()) {
									$("#addProject").attr('action',
											"/Project.action?addProject");
									$("#addProject").submit();
								}
							} else {
								add.submitForm(false,
										"/Project.action?addProject");
							}

						} else if (firstProject != 0 && saveType == 1) {
							$("#isPublish").val("1");
							if (browser == "Microsoft Internet Explorer") {
								if (add.check()) {
									$("#addProject").attr('action',
											"/Project.action?editProject");
									$("#addProject").submit();
								}
							} else {
								add.submitForm(false,
										"/Project.action?editProject");
							}
						} 
//						else {
//							$(".valid").attr("ignore", "ignore");
//							$(".must").attr("ignore", "");
//							if (!add.check(false)) {
//								return false;
//							}
//							if (browser == "Microsoft Internet Explorer") {
//								if (add.check()) {
//									$("#addProject").attr('action',
//											"/Project.action?publishProject");
//									$("#addProject").submit();
//								}
//							} else {
//								add.submitForm(false,
//										"/Project.action?publishProject");
//							}
//						}

					});

	// 对添加项目的表单进行校验 "virResidenceName" : /^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-\\.·•]+$/,  \\-\\－\\-\\－
	add = $("#addProject")
			.Validform(
					{
						tiptype : 4,
						ignoreHidden : true,
						ajaxPost:true,
						datatype : {
							"salesPhones" : /^(?!-)(?!.*?-$)[\d\s\-（）（）（）(),，，，;；；；]+$/,
							"floorareaRate" : /^(\d{1,2}[.]?\d{1,2}||\d{1,2})$/,
							"floorareaRateExtends" : function(gets, obj,
									curform, regxp) {
								if (isNaN(gets)) {
									return "请输入数字";
								}
								if(gets == null || gets == "" || gets == undefined) {
									return "请输入容积率";
								}
								if (parseFloat(gets) < 0
										|| parseFloat(gets) >= 100) {
									return false;
								}
							},
							"greenRate" : /^([1-9][0-9])|([1-9])$/,
							"pmfee" : /^(\d{1,4}[.]?\d{1,2}||\d{1,4})$/,
							"pmfeeH" : function(gets, obj, curform, regxp) {
								var pmFeel = $("#pmFeeL").val();
								if (isNaN(pmFeel)) {
									return "请输入0-9999.99之间的数字";
								}
								if (parseInt(pmFeel) >= 10000
										|| parseInt(pmFeel) < 0
										|| parseInt(gets) >= 10000
										|| parseInt(gets) < 0) {
									return false;
								}
								if (pmFeel > 0) {
									if (parseInt(gets) < parseInt(pmFeel)) {
										$("#pmFeeH").next().removeClass(
												"Validform_right").addClass(
												"Validform_wrong").text(
												"最低物业费应少于最高物业费");
										// return "所在楼层数应小于总楼层数";
										return "最低物业费应少于最高物业费";
									} else {
										return true;
									}
								}
							},
							"groundArea" : function(gets, obj, curform, regxp) {
								var groundArea = parseInt(gets);
								if (isNaN(groundArea)) {
									return "请输入1-99999999之间的数字";
								}
								if (groundArea > 0 && groundArea <= 99999999) {
									return true;
								} else {
									return "请输入1-99999999之间的数字";
								}
							},
							"households" : function(gets, obj, curform, regxp) {
								var households = parseInt(gets);
								if (isNaN(households)) {
									return "请输入1-999999之间的数字";
								}
								if (households > 0 && households <= 999999) {
									return true;
								} else {
									return "请输入1-999999之间的数字";
								}
							},
							"builtyear" : function(gets, obj, curform, regxp) {
								var builtyear = parseInt(gets);
								if (isNaN(builtyear)) {
									return "请选择1900年之后的日期";
								}
								if (builtyear > 1900) {
									return true;
								} else {
									return "请选择1900年之后的日期";
								}
							},
							"rprice":function(gets,obj,curform,regxp) {
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
						}, callback:function(data){
							if($.trim(data.status) == "y"){
								var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>" + data.info + "</p></div><div class='popLine clearfix'></div></div>";
								popBox($(Qs));
								setTimeout(function(){
									$("#idName").remove();
									CoverLayer(0);
								},1500);
							} else if($.trim(data.status) == "r"){
								window.location.href = data.info;
							} else if($.trim(data.status) == "n") {
								var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>" + data.info + "</div><div class='btnBox clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
								popBox($(Qs),".cancelBtn");
							} else if($.trim(data.status) == "e") {
								window.location.href = "/";
							}
						}
					});
});

// 上传楼书
function uploadBrochureOne() {
	var residenceId = 0;
	residenceId = $("#residenceId").val();
	var saveType = parseInt($("#saveType").val());
	if (firstProject == 0 && saveType == 0) {
		add.config({
			ajaxpost : {
				async : false
			}
		});
		$(".valid").attr("ignore", "ignore");
		add.submitForm(false, "/Project.action?addProject");
		if (!add.check(false)) {
			if (saveStatus == 0) {
				return false;
			}
			return false;
		} else {
			residenceId = $("#residenceId").val();
		}
	}

	var val = $.trim($("#uploadBrochure").val());
	if (val == null || val == "") {
		$("#uploadBrochure").next().removeClass("Validform_right").addClass(
				"Validform_wrong").text("请选择图片");
		return false;
	} else {
		$("#uploadBrochure").next().removeClass("Validform_wrong").addClass(
				"Validform_right").text("");
		;
	}
	$.ajaxFileUpload({
		url : '/Project.action?saveBrochure',// 用于文件上传的服务器端请求地址
		secureuri : false,// 一般设置为false
		fileElementId : 'uploadBrochure',// 文件上传空间的id属性 <input type="file"
		// id="file" name="file" />
		dataType : 'json',// 返回值类型 一般设置为json
		data : {
			residenceId : $("#residenceId").val(),
			cityCode : $("#cityCode").val()
		},
		success : function(data, status) // 服务器成功响应处理函数
		{
			if (data.status == "y") {
				$("#uploadBrochure").next().removeClass("Validform_wrong")
						.addClass("Validform_right").text(data.info);
				;
				// alert(data.info);
				// alert(data.photo);
				// alert(data.photo);
				$("#headPic").show();
				$("#headPic").attr("src", data.photo);
				$("#uploadBrochure").val("");
				// window.location.reload();
			} else if ($.trim(data.status) === "n") {
				$("#uploadBrochure").next().removeClass("Validform_right")
						.addClass("Validform_wrong").text(data.info);
				return false;
			} else if ($.trim(data.status) === "e") {
				alert(data.info);
				window.location.href = "/UserSearch.action?toHome";
				return false;
			}

			if (typeof (data.error) != 'undefined') {
				if (data.error != '') {
					alert(data.info);
				} else {
					alert(data.info);
				}
			}
		},
		error : function(data, status, e)// 服务器响应失败处理函数
		{
			alert("上传失败");
		}
	});
	return false;
}

// 上传房屋图片
function roomPicUpload() {
	// $("#loading")
	// .ajaxStart(function(){
	// $(this).show();
	// })//开始上传文件时显示一个图片
	// .ajaxComplete(function(){
	// $(this).hide();
	// });//文件上传完成将图片隐藏起来
	var homeTypeName = "";
	var residenceId = 0;
	var cityCode = 0;
	var count = 0;

	homeTypeName = $("#homeTypeName").val();
	residenceId = $("#residenceId").val();
	var saveType = parseInt($("#saveType").val());
	if (firstProject == 0 && saveType == 0) {
		add.config({
			ajaxpost : {
				async : false
			}
		});
		$(".valid").attr("ignore", "ignore");
		add.submitForm(false, "/Project.action?addProject");
		if (!add.check(false)) {
			if (saveStatus == 0) {
				return false;
			}
			return false;
		} else {
			residenceId = $("#residenceId").val();
		}
	}
	cityCode = $("#cityCode").val();

	if (homeTypeName == "livingRoomPic") {
		picType = 1;
		count = l;
	} else if (homeTypeName == "bedRoomPic") {
		picType = 2;
		count = bed;
	} else if (homeTypeName == "bathRoomPic") {
		picType = 3;
		count = bath;
	} else if (homeTypeName == "kitchenRoomPic") {
		picType = 4;
		count = kitchen;
	} else if (homeTypeName == "publicAreaPic") {
		picType = 5;
		count = publicArea;
	} else if (homeTypeName == "floorPrintPic") {
		picType = 66;
		count = floorPrint;
	}
	$
			.ajaxFileUpload({
				url : '/Project.action?saveResidencePic',// 用于文件上传的服务器端请求地址
				secureuri : false,// 一般设置为false
				fileElementId : 'homePicFile',// 文件上传空间的id属性 <input
				// type="file" id="file"
				// name="file" />
				dataType : 'json',// 返回值类型 一般设置为json
				data : {
					imageType : picType,
					residenceId : residenceId,
					cityCode : cityCode
				},
				success : function(data, status) // 服务器成功响应处理函数
				{
					if (data.status == "y") {
						// alert(data.info);
						$("#" + homeTypeName)
								.append(
										"<div class='picBox'><img src='' type='text' id='"
												+ homeTypeName
												+ ""
												+ count
												+ "' width='200' height='100'/><textarea rows='2' class='picComment' id='comment"
												+ count
												+ "'></textarea><span class='delPic' ></span><div class='remainder'>还能输入16字</div></div>");
						fnTextVerify($(".picComment"), $(".picComment").next()
								.next(), 16);
						var $this = $("#" + homeTypeName).children("div")
								.children("#comment" + count);
						var $other = $("#" + homeTypeName).children("div")
								.children("span.delPic");
						$other
								.bind(
										'click',
										function() {
											var $seconde = $(this);
											$
													.ajax({
														url : "/Project.action?delResidenceImageByImageId",
														data : {
															imageId : data.imageId
														},
														dataType : "json",
														type : "POST",
														success : function(
																data, status) {
															if (data.status == "y") {
																$seconde
																		.parent()
																		.remove();
																// alert(data.info);
															} else if (data.status == "n") {
																alert(data.info);
															} else if (data.status == "e") {
																alert(data.info);
																window.location.href = "/UserSearch.action?toHome";
															}
														}
													});
										});
						$this
								.bind(
										'change',
										function() {
											$
													.ajax({
														type : "POST",
														url : "/Project.action?editCommentByImageId",
														data : {
															imageId : data.imageId,
															imageCommet : $this
																	.val()
														},
														dataType : "json",
														success : function(data) {
															if (data.status == "y") {
																alert(data.info);
															} else if (data.status == "n") {
																alert(data.info);
															} else if (data.status == "e") {
																alert(data.info);
																window.location.href = "/UserSearch.action?toHome";
															}
														}
													});
										});
						// alert(data.photo);
						$("#" + homeTypeName + "" + count).attr("src",
								data.photo);
						count++;
						if (homeTypeName == "livingRoomPic") {
							l = count;
						} else if (homeTypeName == "bedRoomPic") {
							bed = count;
						} else if (homeTypeName == "bathRoomPic") {
							bath = count;
						} else if (homeTypeName == "kitchenRoomPic") {
							kitchen = count;
						} else if (homeTypeName == "publicAreaPic") {
							publicArea = count;
						} else if (homeTypeName == "floorPrintPic") {
							floorPrint = count;
						}
					} else if (data.status == "n") {
						alert(data.info);
					} else if (data.status == "e") {
						alert(data.info);
						window.location.href = "/UserSearch.action?toHome";
					}

					if (typeof (data.error) != 'undefined') {
						if (data.error != '') {
							alert(data.info);
						} else {
							alert(data.info);
							window.location.href = "/UserSearch.action?toHome";
						}
					}
				},
				error : function(data, status, e)// 服务器响应失败处理函数
				{
					alert(e);
				}
			});
	return false;
}
// 更改地图状态
function changMap() {

	var mapzoom = 10;
	isconfirm = 0;
	if ($("#confirmP").text() == "重新选择位置") {
		$("#confirmP").text("确定位置");
	}
	var cityCode = $("#cityCode").val();
	var districtName = $.trim($("#countyInput").val());
	var districtCode;
	if (districtName == null || districtName == "") {
		$("#circleInput").next().removeClass("Validform_right").addClass(
				"Validform_wrong").text("请选择区县");
		return false;
	} else {
		var longitude = 0;
		var latitude = 0;

		// 根据区县名称获取经纬度
		$.ajax({
			url : "/SaleHomeController.action?getDistrictLongitudeAndLatitude",
			data : {
				districtName : encodeURIComponent(districtName),
				cityCode : cityCode
			},
			dataType : "json",
			async : false,
			success : function(data, textStatus) {
				if ($.trim(data.status) == "y") {

					if (data.TUDE.longitude > 0 && data.TUDE.latitude > 0) {
						mapzoom = 12;
					}
					longitude = data.TUDE.longitude;
					latitude = data.TUDE.latitude;
					districtCode = data.TUDE.district_code;
					// map.setZoom(15);

					/*
					 * map.clearOverlays(); map.panTo(new BMap.Point( longitude,
					 * latitude));
					 */

					return true;
				} else if ($.trim(data.status) == "n") {
					$("#circleInput").next().removeClass("Validform_right")
							.addClass("Validform_wrong").text(data.info);
					return false;
				} else if ($.trim(data.status) == "e") {
					$("#circleInput").next().removeClass("Validform_right")
							.addClass("Validform_wrong").text(data.info);
					window.location.href = "/UserSearch.action?toHome";
					return false;
				}
			}
		});
	}

	var bizcircleName = $.trim($("#circleInput").val());
	if (0) {
		$("#circleInput").next().removeClass("Validform_right").addClass(
				"Validform_wrong");
		return false;
	} else {
		// 根据商圈名称获取经纬度
		$
				.ajax({
					url : "/SaleHomeController.action?getBizcircleLongitudeAndLatitude",
					data : {
						bizcircleName : encodeURIComponent(bizcircleName),
						cityCode : cityCode,
						districtCode : districtCode
					},
					dataType : "json",
					async : false,
					success : function(data, textStatus) {
						if ($.trim(data.status) == "y") {

							if (data.TUDE.longitude > 0
									&& data.TUDE.latitude > 0) {
								mapzoom = 15;
							}
							longitude = data.TUDE.longitude > 0 ? data.TUDE.longitude
									: longitude;
							latitude = data.TUDE.latitude > 0 ? data.TUDE.latitude
									: latitude;

							/*
							 * map.clearOverlays(); map.panTo(new BMap.Point(
							 * longitude, latitude));
							 */

							return true;
						} else if ($.trim(data.status) == "n") {
							$("#circleInput").next().removeClass(
									"Validform_right").addClass(
									"Validform_wrong");
							return false;
						} else if ($.trim(data.status) == "e") {
							$("#circleInput").next().removeClass(
									"Validform_right").addClass(
									"Validform_wrong");
							window.location.href = "/UserSearch.action?toHome";
							return false;
						}
					}
				});
	}

	if (longitude == 0 || latitude == 0) {

		var oldlong = $("#longitude").val(longitude);
		var oldlat = $("#latitude").val(latitude);
		if (oldlong == 0 || oldlat == 0 || oldlong == "" || oldlat == ""
				|| oldlong == null || oldlat == null) {
			$("#longitude").val("");
			$("#latitude").val("");
		}

		var city = $("#cityName").val();
		map.centerAndZoom(city, mapzoom);

	} else {
		$("#longitude").val(longitude);
		$("#latitude").val(latitude);
		map.clearOverlays();
		map.setZoom(mapzoom);
		map.panTo(new BMap.Point(longitude, latitude));
		pointProject(longitude, latitude, 1);
	}

}
