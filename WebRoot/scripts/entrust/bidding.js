var serviceArea = "";
var entrustBids = [];
var entrustBudgets = [];
var entrustBedRooms = [];
var entrustContents = [];
var entrustRemainDays = [];
var entrustResidenceLists = [];
var entrustResidenceNames = [];
var entrustBizcircleName = [];
var entrustOwnerZids = [];
var toppage = 0;
var intPage = 1;
var pages = 1;
var listType = 1;
var currPage = 1;

var residenceId;

var bedRoom = 0;
var entrustType = 0;//0表示为可申请，1表示申请中，2表示已过期
//准备服务小区数据
function readyServiceAreaData() {
	$.ajaxSettings.async = false;  
	$.getJSON("/EntrustingOperator.action?getServiceArea",function(data){
		if(data.status == "e") {
			window.location.href = "/";
		} else if(data.status == "y") {
			serviceArea = data.dada;
		}
	});
}
function generateServiceArea() {
	readyServiceAreaData();
	var area = serviceArea;
	for(var k = 0; k < area.length; k++) {
		$("#toBid").append("<li param='"+area[k].residence_id+"'>"+area[k].residence_name+"</li>");
		$("#biding").append("<li param='"+area[k].residence_id+"' class='eachC'>"+area[k].residence_name+"</li>");
		$("#bided").append("<li param='"+area[k].residence_id+"' class='eachC'>"+area[k].residence_name+"</li>");
	}
	$("#toBid").children().click(function() {
		if($(this).text() == '待处理') {
			residenceId = "";
		} else {
			residenceId = $.trim($(this).attr("param"));
		}
		entrustType = 0;
		generateData();
	});
	
	$("#biding").children().click(function() {
		if($(this).text() == '处理中') {
			residenceId = "";
		} else {
			residenceId = $.trim($(this).attr("param"));
		}
		entrustType = 1;
		generateData();
	});
	
	$("#bided").children().click(function() {
		if($(this).text() == '已处理') {
			residenceId = "";
		} else {
			residenceId = $.trim($(this).attr("param"));
		}
		entrustType = 2;
		generateData();
	});
	$("#bizCircle").children().click(function() {
		residenceId = 0;
		entrustType = 0;
		generateData();
	});
	
	
	$(".entrustType").children('li').click(function(){
		$(this).addClass('on').siblings().show().removeClass('on');
		$(this).parent().siblings().find('li').removeClass('on').not('.title').hide();
	});
}
//准备竞标数据
function readyData() {
	clearData();
	$.getJSON("/EntrustingController.action?getEntrustListByType",{currPage:currPage,listType:listType,bedRoom:bedRoom,entrustType:entrustType,residenceId:residenceId},function(data){
		if(data.status == "e") {
			window.location.href = "/";
		} else if(data.status == "y") {
			$.each(data.data, function(i,item) {
				entrustBids.push(item.bid_id);
				entrustBudgets.push(item.budget);
				entrustBedRooms.push(item.bed_room);
				entrustContents.push(item.content);
				entrustRemainDays.push(item.DiffDate);
				entrustResidenceLists.push(item.residenceId);
				entrustOwnerZids.push(item.owner_zid);
				entrustBizcircleName.push(item.bizcircle_name);
				entrustResidenceNames.push(item.residence_name);
			});
			pages = data.pages;
			toppage = data.toppage;
			intPage = data.intPage;
		} else if(data.status == "n") {
			var Qs="<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'>" + data.info + "</div><div class='popLine clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success round' style=' margin-left:200px;'>确认</button></div></div>";
			popBox($(Qs),".confirmBtn");
		}
	});
}

//生成数据
function generateData() {
	readyData();
	$("#entrust").children('dl').remove();
	for(var i = 0; i < entrustBids.length; i++) {
		var priceUnit = "万";
		if(listType == 2) {
			priceUnit = "元";
		}
		var part2 = "<dl><dt>"+entrustBedRooms[i]+"居,"+entrustBudgets[i]+priceUnit;
		if(entrustType == 0) {
			part2 += "<a class='cancelBtn' href=\"/EntrustingController.action?goToEntrustResponseView&bidId="+entrustBids[i]+"&entrustType="+entrustType+"&ownerZid="+entrustOwnerZids[i]+"&listType="+listType+"\">提供房源</a>";
		} else if(entrustType == 1) {
			part2 += "<a class='cancelBtn' href=\"/EntrustingController.action?goToEntrustResponseView&bidId="+entrustBids[i]+"&entrustType="+entrustType+"&ownerZid="+entrustOwnerZids[i]+"&listType="+listType+"\">查看</a>";
		} else if(entrustType == 2) {
			part2 += "<a class='cancelBtn' href=\"/EntrustingController.action?goToEntrustResponseView&bidId="+entrustBids[i]+"&entrustType="+entrustType+"&ownerZid="+entrustOwnerZids[i]+"&listType="+listType+"\">查看</a>";
		}
		part2 += "</dt><dd class='condition'><span>附加条件:</span>"+entrustContents[i]+"</dd><dd class='date'>剩余时间:"+entrustRemainDays[i]+"天</dd>";
		
		//$("#entrust").append(part2);
		var rList = entrustResidenceNames[i];
		var part3 = "";
		if(rList == "0") {
			part2 += "<dd class='condition'><span>商圈:</span>"
			part3 += "<span>"+entrustBizcircleName[i]+"</span>";
		} else {
			part2 += "<dd class='condition'><span>小区:</span>"
			part3 += "<span>"+rList+"</span>";
		}
		
		
		
		part3 += "</dd></dl>";
		part2 += part3;
		
		
		$("#pageFooter").before(part2);
		$(".entrustType").children('li').bind('click',function(){
			$(this).addClass('on').siblings().show().removeClass('on');
			$(this).parent().siblings().find('li').removeClass('on').not('.title').hide();
		});
		
	}
	
	
	$("#pageFooter").empty();
	if(entrustBids.length > 0) {
		var part1 = "<a id=\"home\">首页</a>"
			$("#pageFooter").append(part1);
			$("#home").click(function() {
				currPage = 1;
				generateData();
			});
			
			if(intPage > 1) { 
				part1 = "<a id=\"pre\">上一页</a>"
				$("#pageFooter").append(part1);
				$("#home").click(function() {
					currPage = intPage - 1;
					generateData();
				});
			}
//			if(pages == 0) {
//				part1 = "  总页数为 1 页,";
//				toppage = 1;
//			} else {
//				part1 = "  总页数为 "+pages+" 页,";
//			}
//			part1 += "当前页是第"+intPage+"页"
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
				generateData();
			}); 
			if(intPage < pages) {
				part1 = "<a id=\"next\">下一页</a>";
				$("#pageFooter").append(part1);
			} 
			$("#next").click(function() {
				currPage = intPage + 1;
				generateData();
			}); 
			if(pages >0 && intPage != pages) {
				part1 = "<a id=\"end\">尾页</a>"
				$("#pageFooter").append(part1);
			}
			$("#end").click(function() {
				currPage = pages;
				generateData();
			}); 
	}
}

function clearData() {
	serviceArea = "";
	entrustBids = [];
	entrustBudgets = [];
	entrustBedRooms = [];
	entrustContents = [];
	entrustRemainDays = [];
	entrustResidenceLists = [];
	entrustOwnerZids = [];
	entrustBizcircleName = [];
	entrustResidenceNames = [];
	pages = 1;
	toppage = 1;
	intPage = 1;
}

$(function() {
	//************************************玲姐部分  开始****************************************************************
	
	/*		if($(this).hasClass("respond"))
	{
		$(".respond").show();	
		$(".overdue.eachC").hide();	
	}
	else if($(this).hasClass("overdue"))
	{
		$(".overdue").show();	
		$(".respond.eachC").hide();	
	}*/
	
	
	$(".rentOrBuy .rb").click(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
		});
	$(".rentOrBuy a").click(function(){
		$(this).addClass("on").siblings("a").removeClass("on");
		});
//****************************************玲姐部分  结束************************************************************
	
	
	generateServiceArea();
	generateData();
	$("#sales").click(function() {
		listType = 1;
		generateData();
	});
	$("#rental").click(function() {
		listType = 2;
		generateData();
	});
	
	$("#zero").click(function() {
		bedRoom = 0;
		generateData();
	});
	$("#one").click(function() {
		bedRoom = 1;
		generateData();
	});
	$("#tow").click(function() {
		bedRoom = 2;
		generateData();
	});
	$("#three").click(function() {
		bedRoom = 3;
		generateData();
	});
	$("#four").click(function() {
		bedRoom = 4;
		generateData();
	});
	$("#fourPlus").click(function() {
		bedRoom = 5;
		generateData();
	});
});
