var bidIds = [];
var ownerZids = [];
var titles = [];
var contents = [];
var districtNames = [];
var bizcircleNames = [];
var startdates = [];
var diffDates = [];
var ownerNames = [];
var cityCodes = [];
var toppage = 0;
var intPage = 1;
var pages = 1;
var listType = 1;
var currPage = 1;

function clearSearchEData() {
	bidIds = [];
	ownerZids = [];
	titles = [];
	contents = [];
	districtNames = [];
	bizcircleNames = [];
	startdates = [];
	diffDates = [];
	ownerNames = [];
	cityCodes = [];
	toppage = 0;
	intPage = 1;
	pages = 1;
	listType = 1;
	currPage = 1;
}
//日期格式化
function formatDate(dDate) {
	var year = dDate.getFullYear(); //获取完整的年份(4位,1970-????)
	var month = dDate.getMonth(); //获取当前月份(0-11,0代表1月)
	var date = dDate.getDate(); //获取当前日(1-31) 
	var hours = dDate.getHours();
	var minutes = dDate.getMinutes();
	var seconds = dDate.getSeconds();
	return year + "/" + month + "/" + date + " " + hours + ":" + minutes + ":" + seconds;
}

//
function formatOwnerName(ownerName) {
	var sName = new String(ownerName);
	if(sName.length >=1 && sName.length <= 2) {
		return sName;
	}
	sName = sName.substring(0, 2) + "***";
	return sName;
}
function readySearchEData(residenceName) {
	clearSearchEData();
	$.ajaxSettings.async = false;
	$.getJSON("/EntrustingController.action?searchEntrustByResidenceName",{residenceName:residenceName},function(e){
		$.each(e.BD, function(i,item) {
			bidIds.push(item.bid_id);
			ownerZids.push(item.owner_zid);
			titles.push(item.bidTitle);
			contents.push(item.content);
			districtNames.push(item.district_name);
			bizcircleNames.push(item.bizcircle_name);
			cityCodes.push(item.city_code);
			var diffDate = new Date(item.startdate);
			var resultDate = formatDate(diffDate);
			startdates.push(resultDate);
			diffDates.push(item.DiffDate);
			var resultName = formatOwnerName(item.owner_name);
			ownerNames.push(resultName);
		});
		pages = e.pages;
		toppage = e.toppage;
		intPage = e.intPage;
	});
}

function generateSearchEData(residenceName) {
	readySearchEData(residenceName);
	$("#searchEntrusts").children("dl").remove();
	for(var i = 0; i < titles.length; i++) {
		var part2 = "<dl><a href='/EntrustingController.action?showEntrusting&bidId=" + bidIds[i] + "&ownerZid=" + ownerZids[i] + "&cityCode=" + cityCodes[i] + "'></a>";
		part2 += "<dt>" + titles[i] + "</dt>";
		part2 += "<dd class='intro'>" + contents[i] + "</dd>"
		part2 += "<dd class='master'>[" + districtNames[i] + bizcircleNames[i] + "]&nbsp;<span>" + startdates[i] + "发布, &nbsp;剩余" + diffDates[i] + "天,&nbsp;发布人:" + ownerNames[i] + "</span></dd></dl>";
		$("#pageFooter").before(part2);
	}

	$("#pageFooter").empty();
	var part1 = "<a id=\"home\">首页</a>"
	$("#pageFooter").append(part1);
	$("#home").click(function() {
		currPage = 1;
		generateSearchEData();
	});
	
	if(intPage > 1) { 
		part1 = "<a id=\"pre\">上一页</a>"
		$("#pageFooter").append(part1);
		$("#home").click(function() {
			currPage = intPage - 1;
			generateSearchEData();
		});
	}
	
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
		generateSearchEData();
	}); 
	if(intPage < pages) {
		part1 = "<a id=\"next\">下一页</a>";
		$("#pageFooter").append(part1);
	} 
	$("#next").click(function() {
		currPage = intPage + 1;
		generateSearchEData();
	}); 
	part1 = "<a id=\"end\">尾页</a>"
	$("#pageFooter").append(part1);
	$("#end").click(function() {
		currPage = pages;
		generateSearchEData();
	}); 
}

$(function(){
	//************************************玲姐部分  开始****************************************************************
	$(".entrustType li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		});
	//****************************************玲姐部分  结束************************************************************
	
	//跳转到要求中列表
	$("#entrusting").click(function() {
		window.location.href = "/EntrustingController.action?goToEntrustingListView&currPage=1";
	});
	//跳转到已完成要求列表
	$("#finishedEntrust").click(function() {
		window.location.href = "/EntrustingController.action?goToFinishedEntrustingListView&currPage=1";
	});
	$(".delay").click(function() {
		var bidId = $(this).attr("bidId");;
		$.ajax({
        	url:"/EntrustingOperator.action?delayEntrust",
    		data:{bidId:bidId},
    		dataType:"json",
    		type:"POST",
    		success:function(data, status) {
    			if(data.status == "y") {
    				 location.reload();
    			} else if(data.status == "n") {
    				alert(data.info);
    			} else if(data.status == "e") {
    				alert(data.info);
            		window.location.href = "/";
    			}
    		}
	    });
	});
	
	$("#showAll").click(function(){
		$("#district").children("li").show();
		$(this).hide();
		$("#showPart").show();
		});
	$("#showPart").click(function(){
		$("#district").children("li").slice(7).hide();
		$(this).hide();
		$("#showAll").show();
		});
	$("#showAll").hide();
	$("#showPart").hide();
	if($("#district").children("li").length>=8&&$("#district").children("li").index(".on")<7)
	{
		$("#showAll").show();
		$("#district").children("li").slice(7).hide();
	}
	
	$("#entrustSearch").click(function() {
		var residenceName = $.trim($("#searchEntrustName").val());
		if(residenceName != "") {
			generateSearchEData(encodeURIComponent(residenceName));
		}
		
	});
});
	
