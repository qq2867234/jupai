
$(function() {
	var h1 = "<h1 onclick='toIndex()'><a>真格在线</a></h1>";
	var h2 = "<li><a href='javascript:void(0)' onclick='toIndex();'>首页</a></li>";
	var h3 = "<li><a href='javascript:void(0)' onclick='toSearch();'>找房</a></li>";
	var h4 = "<li><a href='javascript:void(0)' onclick='toDirection();'>时刻搜</a></li>";
	var h5 = "<li><a href=’http://go.BBBBigPig.com' target='_new'>导航</a></li>";
	$("#header").append(h1+"<ul class='menu'>"+h2+h3+h4+h5+"</ul>");
	var h5 = "<div class='bottom clearfix'>" +
				"<ul class='left clearfix'>" +
					"<li>关于真格在线</li><li>|</li><li>工作机会</li>" +
					"<li>|</li><li><a href='mailto:service@BBBBigPig.com' target='_new'>service@BBBBigPig.com</a></li>" +
				"</ul>" 
			"<ul class='right clearfix'><li><a href='http://www.miibeian.gov.cn/' target='_new'>京ICP备15018423号</a></li><li>|</li><li>使用条款</li><li>|</li><li>©2015 保留一切权力</li></ul></div>";
	$("#bottomer").append(h5);
});
function toSearch(){
	 window.location.href="/UserSearch.action?toHome";
}

function toIndex() {
	window.location.href="/Channel.action?toChannel";
}
function toDirection() {
	window.location.href="/timesearch.jsp";
}