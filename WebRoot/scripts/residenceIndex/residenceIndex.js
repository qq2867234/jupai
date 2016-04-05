$(function(){
	initMap(990,1200,10);
	
	$(window).resize(function(){
		Init();
		initMap(990,1200,10);
		//IE6有resizeBUG
	}
	);
	
	$(".typeUl").click(function(){
		$("#price").val("");	
	});
	
	});
	
function initMap(minWidth,centerWidth,margin){
	var browser=navigator.appName;
	var b_version=navigator.appVersion;
	var version=b_version.split(";");
	if(version[1])
	{var trim_Version=version[1].replace(/[ ]/g,"");}

	var bodyWidth = document.body.clientWidth;
	var bodyHeight = document.documentElement.clientHeight;
	var headerHeight = 0||$("#header").height();
	if(!(trim_Version=="MSIE7.0"||trim_Version=="MSIE6.0"))
	{		
	if(bodyWidth<=minWidth){
		$("#main").width(minWidth);
		$(".mapLeft").removeClass("wider").addClass("narer");
		$(".listRight").removeClass("wider").find("dd").removeClass("wider");
		}
	else if(bodyWidth>minWidth&&bodyWidth<=centerWidth){
		$("#main").css("width","100%");
		$(".mapLeft").removeClass("narer").removeClass("wider");
		$(".listRight").removeClass("narer").removeClass("wider").find("dd").removeClass("wider");
		}
	else{
		$("#main").css("width","100%");
		$(".mapLeft").removeClass("narer").addClass("wider");
		$(".listRight").addClass("wider").find("dd").addClass("wider");
		}
	}
	var h=bodyHeight-headerHeight-5;
	//alert(bodyHeight);
	$("#main").height(h);
	$(".mapLeft").height(h);
	$(".mapBox,#map").height(h-52-margin);
	$(".listRight").height(h-margin);
	$(".resultList").height(h-$(".searchTips").height()-$(".listRight .title").height()-margin*2-10);
	//alert(h);
	$('#require').find('input').placeholder();	
	}
	