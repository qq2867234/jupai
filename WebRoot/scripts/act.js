$(function(){
	$(".actName").each(function() {
		$(this).children(".red").mouseover(function(){
		$(this).children(".result").show();
		});
		$(this).children(".red").mouseleave(function(){
		$(this).children(".result").hide();
		});
	});
	
});