
$(function(){
	$(".hMenu li").click(function(){
		$("#agentType").val($(this).index()+1);
		$("#agentBroker").val($("#agentType").val());
		$("#independentBroker").val($("#agentType").val());
		$(this).addClass("on").siblings().removeClass("on");
		//alert($("#agentType").val());
		if($(this).index()==0) {
			$("#agency").show();
			$("#independent").hide();
		}
		else {
			$("#independent").show();
			$("#agency").hide();
		}
		});
});