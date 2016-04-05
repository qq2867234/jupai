
$(function() {
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
});