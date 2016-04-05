var sortType = 1;
var bidUrls = [];
var bidResidenceNames = [];
var bidListTypes = [];
var bidBudgets = [];
var bidLivingRooms = [];
var bidBathRooms = [];
var bidFloorAreas = [];
var bidOrientations = [];
var bidBuildingTypes = [];
var bidDecorations = [];
var bidReadyHomes = [];
var bidContents = [];
var bidImagesRelativePath = [];
var bidImagesImageId = [];
var cityCodes = [];
var bidSerialNo = [];
var bidBedRooms = [];
var bidBuildingAges = [];
var bidImage = [];
//清洗数据
function clearBidListData() {
	 bidSerialNo = [];
	 bidUrls = [];
	 bidResidenceNames = [];
	 bidListTypes = [];
	 bidBudgets = [];
	 bidLivingRooms = [];
	 bidBathRooms = [];
	 bidFloorAreas = [];
	 bidOrientations = [];
	 bidBuildingTypes = [];
	 bidDecorations = [];
	 bidReadyHomes = [];
	 bidContents = [];
	 bidImagesR = [];
	 cityCodes = [];
	 bidBedRooms = [];
	 bidBuildingAges = [];
	 bidImage = [];
}
//准备数据
function readyBidListData(bidId, bidderZid, sortType, ownerZid) {
	clearBidListData();
	$.ajaxSettings.async = false;
	$.getJSON("/EntrustingOperator.action?getRestBidForNoLogin",{bidId:bidId, bidderZid:bidderZid, sortType:sortType, ownerZid:ownerZid},function(e){
		$.each(e.BS, function(i,item) {
			bidBedRooms.push(item.bed_room);
			bidSerialNo.push(item.serial_no);
			bidUrls.push(item.url);
			bidResidenceNames.push(item.residence_name);
			bidListTypes.push(item.list_type);
			bidBudgets.push(item.budget);
			bidLivingRooms.push(item.living_room);
			bidBathRooms.push(item.bath_room);
			bidFloorAreas.push(item.floor_area);
			bidOrientations.push(item.orientation);
			bidBuildingTypes.push(item.building_type);
			bidDecorations.push(item.decoration);
			bidReadyHomes.push(item.ready_home);
			bidContents.push(item.content);
			cityCodes.push(item.city_code);
			bidBuildingAges.push(item.building_age);
			$.each(e.bidImages, function(i1,item1) {
				bidImage.push(item1);
//				$.each(item1, function(i2,item2) {
//					if(item2.serial_no == item.serial_no) {
//						bidImagesRelativePath.push(item2.relative_path);
//						bidImagesImageId.push(item2.image_id);
//						
//					}
//				});
			});
		});
	});
}
$(function() {
	
	//************************************玲姐部分  开始****************************************************************
	$("#entrustType li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		});
	//****************************************玲姐部分  结束************************************************************
	
	var bidId = $("#hiddenBidId").val();
	var parent;
	//按发布顺序降序
	$("#sortBySerNo").click(function() {
		sortType = 1;
		window.location.href = "/EntrustingController.action?goToResponseViewForOneEntrusting&bidId="+bidId+"&sortType="+sortType;
	});
	//按价格升序
	$("#sortByBudget").click(function() {
		sortType = 2;
		window.location.href = "/EntrustingController.action?goToResponseViewForOneEntrusting&bidId="+bidId+"&sortType="+sortType;
	});
	//按居室数目降序
	$("#sortByBed").click(function() {
		sortType = 3;
		window.location.href = "/EntrustingController.action?goToResponseViewForOneEntrusting&bidId="+bidId+"&sortType="+sortType;
	});
	
	$(".more").click(function() {
		var bidId = $(this).attr("bidId");
		var bidderZid = $(this).attr("bidderZid");
		var ownerZid = $(this).attr("ownerZid");
		readyBidListData(bidId, bidderZid, sortType, ownerZid);
		parent = $(this).parent();
		parent.children('dl').remove();
		parent.children('.more').hide();
		parent.children('.pickup').show();
		for(var i = 0; i < bidSerialNo.length; i++) {
			var part1 = "<dl class=\"clearfix\"><dt>小区名称:</dt><dd><a href=\""+bidUrls[i]+"\">"+bidResidenceNames[i]+"</a></dd>";
			var part2 = "<dt>价格:</dt><dd>";
			var part3 = "";
			if(bidListTypes[i] == 1) {
				part3 = bidBudgets[i] + "万元,</dd>";
			} else if(bidListTypes[i] == 2) {
				part3 = bidBudgets[i] + "元/月,</dd>";
			}
			var part4 = "<dt>基本信息:</dt><dd>"+bidBedRooms[i]+"室,"+bidLivingRooms[i]+"厅,"+bidBathRooms[i]+"卫,"+bidFloorAreas[i]+"平米,";
			var part5 = "";
			if(bidOrientations[i] == 1) {
				part5 = "南,"+bidBuildingAges[i]+"年,";
			} else if(bidOrientations[i] == 2) {
				part5 = "北,"+bidBuildingAges[i]+"年,";
			} else if(bidOrientations[i] == 3) {
				part5 = "西,"+bidBuildingAges[i]+"年,";
			} else if(bidOrientations[i] == 4) {
				part5 = "东,"+bidBuildingAges[i]+"年,";
			}
			var part6 = "";
			if(bidBuildingTypes[i] == 1) {
				part6 = "独栋,";
			} else if(bidBuildingTypes[i] == 2) {
				part6 = "联排,";
			} else if(bidBuildingTypes[i] == 3) {
				part6 = "多层(10层及以下),";
			} else if(bidBuildingTypes[i] == 4) {
				part6 = "高层(10层以上),";
			}
			var part7 = "";
			if(bidListTypes[i] == 1) {
				if(bidDecorations[i] == 1) {
					part7 = "毛坯</dd>";
				} else if(bidDecorations[i] == 2) {
					part7 = "精装</dd>";
				}
			} else if(bidListTypes[i] == 2) {
				if(bidReadyHomes[i] == 1) {
					part7 += "非拎包入住</dd>";
				} else if(bidReadyHomes[i] == 0) {
					part7 += "非拎包入住</dd>";
				}
			}
			//alert(bidImage[i]);
			var part8 = "<dt>实拍照片:</dt><dd class=\"pic clearfix\">";
			for(var j = 0; j < bidImage[i].length; j++) {
				part8 += "<img src=\"/"+cityCodes[i]+homePhoto+bidImage[i][j].relativePath + "/" + bidImage[i][j].imageId + "\" width=\"323\" height=\"220\" alt='实拍照片'/>";
			}
			part8 += "</dd> <dt>补充说明:</dt><dd>"+bidContents[i]+"</dd></dl>";
			parent.prepend(part1+part2+part3+part4+part5+part6+part7+part8);
			
		}
	});
	$(".pickup").click(function() {
		$(this).siblings('dl').slice(1).remove();
		parent.children('.more').show()
		$(this).hide();
	});

	
});
