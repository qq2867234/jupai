//************************************玲姐部分  开始****************************************************************
$(function(){
	if($("#listType").val()==1)
	{
		$(".sShow").show();	
		$(".rShow").hide();	
	}
	else if($("#listType").val()==2)
	{
		$(".rShow").show();	
		$(".sShow").hide();	
	}

	$("#buildingType").change(function(){
		if($(this).val()=="1"||$(this).val()=="2")
		{
			$(".floorhide").hide();
			$("#floor").hide();
			$("#basement").show();
			$("#Park").show();
			$("#garden").show();
		}
		else
		{
			$(".floorhide").show();
			$("#floor").show();
			$("#basement").hide();
			$("#Park").hide();
			$("#garden").hide();
		}
	});	
//	$("input.select").click(function(){
//		$(this).next(".selectList").show();
//		});
//	$(".selectList li").mouseenter(function(){
//		$(this).addClass("over")
//			.siblings().removeClass("over");		
//		});
//	$(".selectList li").mouseleave(function(){
//		$(this).removeClass("over");
//		});
//	$(".selectList li").click(function(){
//		$(this).parent().prev(".select").val($(this).text())
//			.prev("input:hidden").val($(this).index())
//			.end().end().hide();
//		$("#residenceName").blur();
//		if($(this).parent().hasClass("lb"))
//		{
//			$("#lb").val($("#lb").val()-1);
//		}
//		if($(this).parent().hasClass("age"))
//		{
//			$("#age").val($("#age").val()*5);
//		}
//		
//		//alert($(this).parent().prev().prev().val());
//		});
//	
//	$(".uploadPicBtn button").click(function(){
//		$(this).addClass("on").siblings().removeClass("on");
//		$(".picsArea").hide()
//			.eq($(this).index()).show();
//		$(this).parent().next("input").click();
//		});
	$(".fillSec").change(function(){
		$(this).prev('input:hidden').val($(this).index());
		if($(this).hasClass("lb"))
		{
			$("#lb").val($("#lb").val()-1);
		}
		if($(this).hasClass("age"))
		{
			$("#age").val($("#age").val()*5);
		}
		//alert($(this).prev('input:hidden').val());
	});
	$(".hMenu li").click(function(){
		$(this).siblings().removeClass("on")
			.end().addClass("on");	
		$(this).parent().next().val($(this).index());
		});
	$(".upload").eq(0).show().children().show();
	$("#picUpload li").click(function(){
		$(this).siblings("li").removeClass("on")
			.end().addClass("on");
		var clickIndex = $(this).index();
		$(".upload").hide();
		$(".upload").eq(clickIndex).show();
		});

	fnTextVerify($("#bidContent"),$("#bidContent").next(),200);
	
});
//****************************************玲姐部分  结束************************************************************



var bidName;
var remainDay;
var brokerCount;
var homeCount;
var budget;
var bedRoom;
var residencelist;
var content;
var sortType = 1;
var listType;
var toppage = 0;
var intPage = 1;
var pages = 1;
var currPage = 1;
var cityCode;
//客厅图片最大值
var maxLiving = 6;
//卧室图片最大值
var maxBed = 6;
//浴室图片最大值
var maxBath = 3;
//厨房图片最大值
var maxKitchen = 2;
//公共区域图片最大值
var maxPublicArea = 2;
//户型图图片最大值
var maxFloorPrint = 1;

var livingCount = 0;
var bedCount = 0;
var bathCount = 0;
var publicCount = 0;
var floorPrintCount = 0;
var kitchenCount = 0;

var listType = 1;

var repResidenceNames = [];
var repBudgets = [];
var repBedRooms = [];
var repLivingRooms = [];
var repFloorAreas = [];
var repOrientations = [];
var repBuildingAges = [];
var repBuildingTypes = [];
var repDecorations = [];
var repReadyHomes = [];
var repImage = [];
var repCityCodes = [];
var repSerialNos = [];
var repUrls = [];
var repBathRooms = [];
var repContents = [];
var add;
var bizcircleName;


function clearData() {
	 listType = 1;
	 bidName = "";
	 remainDay = "";
	 brokerCount = "";
	 homeCount = "";
	 budget = "";
	 bedRoom = "";
	 residencelist = "";
	 content = "";
	 repResidenceNames = [];
	 repBudgets = [];
	 repBedRooms = [];
	 repLivingRooms = [];
	 repFloorAreas = [];
	 repOrientations = [];
	 repBuildingAges = [];
	 repBuildingTypes = [];
	 repDecorations = [];
	 repReadyHomes = [];
	 repImage = [];
	 repCityCodes = [];
	 repSerialNos = [];
	 repUrls = [];
	 repBathRooms = [];
	 repContents = [];
	 bizcircleName = "";
}

/*var openFile = function(event, output) {
	if(browser == "Microsoft Internet Explorer") {
		
	} else {
		var input = event.target;
	    var reader = new FileReader();
	    var newOutput = output;
	    if(!/image/.test(input.files[0].type)) {
	    	$("#picError").removeClass("Validform_right").addClass("Validform_wrong").text("文件格式不正确");
	    	return false;
	    }
	    reader.onload = function(){
	    
	      //alert(input.files[0].type + " " + input.files[0].size);
	      var dataURL = reader.result;      
	      newOutput.attr("src", dataURL);
	      newOutput.parent().show();
	    };
	    reader.readAsDataURL(input.files[0]);
	}
};*/

function readyEntrustInfo() {
	var bidId = $.trim($("#bidId").val());
	var ownerZid = $.trim($("#ownerZid").val());
	clearData();
	$.ajaxSettings.async = false;  
	$.getJSON("/EntrustingController.action?showOneEntrustInfoFroResponse",{bidId:bidId, ownerZid:ownerZid},function(data){
		bidName = data.ET.bid_name;
		remainDay = data.ET.DiffDate;
		brokerCount = data.RC.brokerCount;
		homeCount = data.RC.homeCount
		budget = data.ET.budget;
		bedRoom = data.ET.bed_room;
		residencelist = data.ET.residence_name;
		content = data.ET.content;
		listType = data.ET.list_type;
		cityCode = data.ET.city_code;
		bizcircleName = data.ET.bizcircle_name; 
		$("#bedRoom").val(bedRoom);
		$("#budget").val(budget);
	});
}
//生成用户帮我找需求数据
function generateEntrustInfo() {
	readyEntrustInfo();
	$("#entrustContent").children().not(':input').remove();
	var part1 = "<h2>"+bidName+"<a class=\"actionBtn\" href=\"/EntrustingController.action?goToBidListView\">返回列表</a></h2>";
	var part2 = "";
	var part7 = "";
	if(remainDay <= 0) {
		part2 = "<dl><dt>已停止</dt><dd><span></span></dd>";
		$("#entrustForm form").children().filter(":not('.notDel')").remove();
		$("#entrustForm").children("h2").remove();
	} else {
		part2 = "<dl><dt>剩余时间:</dt><dd><span>"+remainDay+"天</span></dd>";
		part7 = "</dl><a class=\"closeEntrust confirmBtn\" href=\"#entrust\">提供房源</a>";
	}
	
	var part3 = "<dd class=\"reply\">已有"+brokerCount+"位经纪人提供了房源,共"+homeCount+"套</dd>";
	var budgetStr = "";
	if(listType == 1) {
		budgetStr = "万以内,"
	} else {
		budgetStr = "元以内,";
	}
	var part4 = "<dt>基本条件:</dt><dd>"+budget + budgetStr + bedRoom+"室 </dd>";
	var part5 = "";
	if(residencelist != "0") {
		part5 = "<dt>小区范围:</dt><dd>"+residencelist+"</dd>";
	} else {
		part5 = "<dt>商圈:</dt><dd>"+bizcircleName+"</dd>";
	}
	var part6 = " <dt>补充说明:</dt><dd>"+content+"</dd>";
	$("#entrustContent").append(part1 + part2 + part3 + part4 + part5 + part6 + part7);
	$("#cityCode").val(cityCode);
//	for(var a = 0; a < maxLiving; a++) {
//		$("#livingPics").append("<input type=\"file\" name=\"livingFiles["+a+"]\" style=\"display:none\"/>");
//		var part1 = "<div class=\"picBox\"><img src=\"\" width=\"200\" height=\"200\" /> <button class=\"del\" type='button'>删除</button></div>";
//		$("#livingPics").append(part1);
//	}
//	$("#livingPics").find(":file").change(function(e) {
//		openFile(e,$(this).next().children("img"));
//		if(parseInt(livingCount) < parseInt(maxLiving)) {
//			livingCount++;
//		}
//	});
//	for(var a = 0; a < maxBed; a++) {
//		$("#bedPics").append("<input type=\"file\" name=\"bedFiles["+a+"]\" style=\"display:none\"/>");
//		var part1 = "<div class=\"picBox\"><img src=\"\" width=\"200\" height=\"200\" /> <button class=\"del\" type='button'>删除</button></div>";
//		$("#bedPics").append(part1);
//	}
//	$("#bedPics").find(":file").change(function(e) {
//		openFile(e,$(this).next().children("img"));
//		if(parseInt(bedCount) < parseInt(maxBed)) {
//	 		bedCount++;
//		}
//	});
//	for(var a = 0; a < maxBath; a++) {
//		$("#bathPics").append("<input type=\"file\" name=\"bathFiles["+a+"]\" style=\"display:none\"/>");
//		var part1 = "<div class=\"picBox\"><img src=\"\" width=\"200\" height=\"200\" /> <button class=\"del\" type='button'>删除</button></div>";
//		$("#bathPics").append(part1);
//	}
//	$("#bathPics").find(":file").change(function(e) {
//		openFile(e,$(this).next().children("img"));
//		if(parseInt(bathCount) < parseInt(maxBath)) {
//			bathCount++;
//		}
//	});
//	for(var a = 0; a < maxPublicArea; a++) {
//		$("#publicPics").append("<input type=\"file\" name=\"publicFiles["+a+"]\" style=\"display:none\"/>");
//		var part1 = "<div class=\"picBox\"><img src=\"\" width=\"200\" height=\"200\" /> <button class=\"del\" type='button'>删除</button></div>";
//		$("#publicPics").append(part1);
//	}
//	$("#publicPics").find(":file").change(function(e) {
//		openFile(e,$(this).next().children("img"));
//		if(parseInt(publicCount) < parseInt(maxPublicArea)) {
//			publicCount++;
//		}
//	});
//	for(var a = 0; a < maxFloorPrint; a++) {
//		$("#floorPrintPics").append("<input type=\"file\" name=\"floorPrintFiles["+a+"]\" style=\"display:none\"/>");
//		var part1 = "<div class=\"picBox\"><img src=\"\" width=\"200\" height=\"200\" /> <button class=\"del\" type='button'>删除</button></div>";
//		$("#floorPrintPics").append(part1);
//	}
//	$("#floorPrintPics").find(":file").change(function(e) {
//		openFile(e,$(this).next().children("img"));
//		if(parseInt(floorPrintCount) < parseInt(maxFloorPrint)) {
//			floorPrintCount++;
//		}
//	});
//	for(var a = 0; a < maxKitchen; a++) {
//		$("#kitchenPics").append("<input type=\"file\" name=\"kitchenFiles["+a+"]\" style=\"display:none\"/>");
//		var part1 = "<div class=\"picBox\"><img src=\"\" width=\"200\" height=\"200\" /> <button class=\"del\" type='button'>删除</button></div>";
//		$("#kitchenPics").append(part1);
//	}
//	$("#kitchenPics").find(":file").change(function(e) {
//		openFile(e,$(this).next().children("img"));
//		if(parseInt(kitchenCount) < parseInt(maxKitchen)) {
//			kitchenCount++;
//		}
//	});
//	$(".picBox .del").bind('click',function(){
//		var wichPic = $(this).parent().parent().attr("id");
//		if(wichPic == "publicPics") {
//			publicCount--;
//		} else if(wichPic == "floorPrintPics") {
//			floorPrintCount--;
//		} else if(wichPic == "bathPics") {
//			bathCount--;
//		} else if(wichPic == "kitchenPics") {
//			kitchenCount--;
//		} else if(wichPic == "bedPics") {
//			bedCount--;
//		} else if(wichPic == "livingPics") {
//			livingCount--;
//		}
//		$(this).parent().hide();
//		});
}
var entrustType;
//获得用户帮我找需求数据
function readyReplyData() {
	clearData();
	var bidId = $.trim($("#bidId").val());
	var ownerZid = $.trim($("#ownerZid").val());
	listType = $.trim($("#listType").val());
	
	$.ajaxSettings.async = false;  
	$.getJSON("/EntrustingController.action?showResponseInfoForEntrust",{currPage:currPage, bidId:bidId, ownerZid:ownerZid, sortType:sortType, listType:listType, entrustType:entrustType},function(data){
		if(data.status == "e") {
			window.location.href = "/";
		} else if(data.status == "y") {
			$.each(data.BL, function(i,item) {
				repBedRooms.push(item.bed_room);
				repSerialNos.push(item.serial_no);
				repUrls.push(item.url);
				repResidenceNames.push(item.residence_name);
				repBudgets.push(item.budget);
				repLivingRooms.push(item.living_room);
				repBathRooms.push(item.bath_room);
				repFloorAreas.push(item.floor_area);
				repOrientations.push(item.orientation);
				repBuildingTypes.push(item.building_type);
				repDecorations.push(item.decoration);
				repReadyHomes.push(item.ready_home);
				repContents.push(item.content);
				repCityCodes.push(item.city_code);
				repBuildingAges.push(item.building_age);
				$.each(data.BIS, function(i1,item1) {
					repImage.push(item1);
				});
			});
			pages = data.pages;
			toppage = data.toppage;
			intPage = data.intPage;
		} else if(data.status == "n") {
			alert(data.info);
		}
	});
}

function fillData() {
	readyReplyData();
	var house = $("#houseData");
	$("#houseData").children('dl').remove();
 	$("#houseData").prev('.order').remove().end().before("<div class=\"order\"><a id=\"sortBySerNo\" class='on'>最近发布优先</a><a id=\"sortByBudget\">价格低优先</a><a id=\"sortByBed\">居室多优先</a></div>");
	for(var i = 0; i < repSerialNos.length; i++) {
		var part1 = "<dl class=\"clearfix\"><dt>小区名称:</dt><dd><a href=\""+repUrls[i]+"\">"+repResidenceNames[i]+"</a></dd>";
		var part2 = "<dt>价格:</dt><dd>";
		var part3 = "";
		if(listType == 1) {
			part3 = repBudgets[i] + "万元</dd>";
		} else if(listType == 2) {
			part3 = repBudgets[i] + "元/月</dd>";
		}
		var part4 = "<dt>基本信息:</dt><dd>"+repBedRooms[i]+"室,"+repLivingRooms[i]+"厅,"+repBathRooms[i]+"卫,"+repFloorAreas[i]+"平米,";
		var part5 = "";
		if(repOrientations[i] == 1) {
			part5 = "北,"+repBuildingAges[i]+"年,";
		} else if(repOrientations[i] == 2) {
			part5 = "西,"+repBuildingAges[i]+"年,";
		} else if(repOrientations[i] == 3) {
			part5 = "东,"+repBuildingAges[i]+"年,";
		} else if(repOrientations[i] == 4) {
			part5 = "南,"+repBuildingAges[i]+"年,";
		}
		var part6 = "";
		if(repBuildingTypes[i] == 1) {
			part6 = "独栋,";
		} else if(repBuildingTypes[i] == 2) {
			part6 = "联排,";
		} else if(repBuildingTypes[i] == 3) {
			part6 = "多层(10层及以下),";
		} else if(repBuildingTypes[i] == 4) {
			part6 = "高层(10层以上),";
		} else {
			part6 = "";
		}
		var part7 = "";
		if(listType == 1) {
			if(repDecorations[i] == 1) {
				part7 = "毛坯</dd>";
			} else if(repDecorations[i] == 2) {
				part7 = "精装</dd>";
			} else {
				part7 = "</dd>";
			}
		} else if(listType == 2) {
			if(repReadyHomes[i] == 1) {
				part7 += "拎包入住</dd>";
			} else if(repReadyHomes[i] == 0) {
				part7 += "非拎包入住</dd>";
			}
		}
		//alert(bidImage[i]);
		var part8 = "<dt>实拍照片:</dt><dd class=\"pic clearfix\">";
		for(var j = 0; j < repImage[i].length; j++) {
			part8 += "<img src=\"" + repImage[i][j].pic + "\" width=\"323\" height=\"220\" alt='实拍照片'/>";
		}
		part8 += "</dd> <dt>补充说明:</dt><dd>"+repContents[i]+"</dd></dl>";
		$("#houseData").append(part1+part2+part3+part4+part5+part6+part7+part8);
	}
	
	$("#pageFooter").empty();
	var part1 = "<a id=\"home\">首页</a>"
	$("#pageFooter").append(part1);
	$("#home").click(function() {
		currPage = 1;
		fillData();
	});
	
	if(intPage > 1) { 
		part1 = "<a id=\"pre\">上一页</a>"
		$("#pageFooter").append(part1);
		$("#pre").click(function() {
			currPage = intPage - 1;
			fillData();
		});
	}
//	if(pages == 0) {
//		part1 = "  总页数为 1 页,";
//		toppage = 1;
//	} else {
//		part1 = "  总页数为 "+pages+" 页,";
//	}
//	part1 += "当前页是第"+intPage+"页"
	//$("#pageFooter").append(part1);
	for(var j = intPage; j <= toppage; j++) {
		if(j == intPage) {
			part1 = "<a class=\"footer\"> <font color=\"red\">"+j+"</font> </a>&nbsp;";
		} else {
			part1 = "<a class=\"footer\">"+j+"</a>&nbsp;";
		}
		$("#pageFooter").append(part1);
	}
	$(".footer").click(function() {
		currPage = $(this).text();
		fillData();
	}); 
	if(intPage < pages) {
		part1 = "<a id=\"next\">下一页</a>";
		$("#pageFooter").append(part1);
	} 
	$("#next").click(function() {
		currPage = intPage + 1;
		fillData();
	}); 
	part1 = "<a id=\"end\">尾页</a>"
	$("#pageFooter").append(part1);
	$("#end").click(function() {
		currPage = pages;
		fillData();
	}); 
	//按发布顺序降序
	$(".order a").bind('click',function() {
		sortType = $(this).index()+1;
		fillData();
		$(".order a").eq(sortType-1).addClass('on').siblings().removeClass('on');
	});
	//按价格升序
//	$("#sortByBudget").click(function() {
//		sortType = 2;
//		fillData();
//		//$("#sortByBudget").addClass('on').siblings().removeClass('on');
//	});
	//按居室数目降序
//	$("#sortByBed").click(function() {
//		sortType = 3;
//		fillData();
//		$("#sortByBed").addClass('on').siblings().removeClass('on');
//	});
}

$(function() {
	$(".popCom li").click(function(){
		$(this).parent().prevAll('#residenceId').val($(this).attr("residenceId"));
		//$(this).parent().prev().val($(this).text()).blur();
		$(this).parent().prev().blur();
//		alert($('#residenceId').val());
		});
	
	generateEntrustInfo();
	entrustType = $.trim($("#entrustType").val());
	if(entrustType != 0) {
		fillData();
		if(entrustType == 2) {
			$("#entrust").remove();
		}
	}
	
	

	
	$("#postReplay").click(function() {
		var flag = 0;
		$(".upload").each(function(){
			$(this).find("img").each(function(index,element){
				if($(this).attr("src") != "") {
					flag = 1;
				}
			});
		})
		if(flag == 0) {
			alert("请至少上传一张图片");
			return false;
		} else {
			add.submitForm(false);
		}
	});
	
	add = $("#addResponseForm").Validform({
		tiptype:4, 
		ignoreHidden:true,
		ajaxPost:false,
		datatype:{
			"bedRoom":function(gets,obj,curform,regxp) {
				var newBedRoom = parseInt(gets);
				var bedRoom = $("#bedRoom").val();
				if(isNaN(newBedRoom)) {
					return "请输入1-9之间的数字";
				}// && bedRoom <= newBedRoom ,并且大于等于要求中的居室数
				if(newBedRoom > 0 && newBedRoom <= 9) {
					return true;
				} else {
					return "请输入1-9之间的数字";
				}
			},
			"livingRoom":function(gets,obj,curform,regxp) {
				var livingRoom = parseInt(gets);
				if(isNaN(livingRoom)) {
					return "请输入0-9之间的数字";
				}
				if(livingRoom >= 0 && livingRoom <= 9) {
					return true;
				} else {
					return "请输入0-9之间的数字";
				}
			},
			"bathRoom":function(gets,obj,curform,regxp) {
				var bathRoom = parseInt(gets);
				if(isNaN(bathRoom)) {
					return "请输入0-9之间的数字";
				}
				if(bathRoom >= 0 && bathRoom <= 9) {
					return true;
				} else {
					return "请输入0-9之间的数字";
				}
			},
			"floorArea":function(gets,obj,curform,regxp) {
				var floorArea = parseInt(gets);
				if(isNaN(floorArea)) {
					return "请输入0-65535之间的数字";
				}
				if(floorArea > 0 && floorArea < 65536) {
					return true;
				} else {
					return "请输入0-65535之间的数字";
				}
			},
			"price":function(gets,obj,curform,regxp) {
				var price = parseInt(gets);
				var budget = $("#budget").val();
				if(isNaN(price)) {
					return "请输入1-999999之间的数字";
				}// || price > budget ,并且要小于或等于要求中的预算
				if(price < 1 || price >= 1000000) {
					return "请输入1-999999之间的数字";
				} else {
					return true;
				}
			}
		},
		callback:function(data) {
			if(data.status == "y") {
				window.location.href = "/EntrustingController.action?goToEntrustResponseView";
			} else if(data.status == "n") {
				alert("信息有误");
				if(data.budgetStatus == "n") {
					alert(data.budgetInfo);
				} 
				if(data.commentStatus == "n") {
					alert(data.commentInfo);
				} 
				if(data.bedRoomStatus == "n") {
					alert(data.bedRoomInfo);
				}
				if(data.residenceListStatus == "n") {
					alert(data.residenceListInfo);
				}
			} else if(data.status == "e") {
				window.location.href = "/";
			}
	}
	});
//	$("#uploadLiving").click(function() {
//		$("#livingPics").find(":file:eq("+livingCount+")").click();
//	});
//	$("#uploadBed").click(function() {
//	 	$("#bedPics").find(":file:eq("+bedCount+")").click();
//	});
//	$("#uploadKitchen").click(function() {
//		$("#kitchenPics").find(":file:eq("+kitchenCount+")").click();
//	});
//	$("#uploadBath").click(function() {
//		$("#bathPics").find(":file:eq("+bathCount+")").click();
//	});
//	$("#uploadPublic").click(function() {
//		$("#publicPics").find(":file:eq("+publicCount+")").click();
//	});
//	$("#uploadFloorPrint").click(function() {
//		$("#floorPrintPics").find(":file:eq("+floorPrintCount+")").click();
//	});
	
	$("#cancelResponse").click(function () {
		add.resetForm();
	});
	
});