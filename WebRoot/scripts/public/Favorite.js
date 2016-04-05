/**
 * 收藏类
 */
var Favorite = {
	// 收藏类型 1-小区 2-经纪人3-租单
	TYPE : {
		RESIDENCE : 1,
		BROKER : 2,
		RENT : 3
	},
	PC : 1,
	MOBILE : 2,
	// 判断是否已收藏，已收藏加红心
	hasFav : function(sid, type) {
		$.ajax({
			url: "/BrokerWeiXin.action?hasFav",
			type : "POST",
			dataType: "json",
			data:{
				cityCode: $("#cityCode").val() || 110000,
				favId: parseInt(sid),
				saveType: type
			},
			success:function(data, status) {
				if(data.status == 'y') $(".fav_"+sid).toggleClass("zgIcon-heart-o");
			}	
		});
	},
	// 指定编号列表(逗号分隔)，返回已收藏的列表
	hasFavForList : function(sidList, type) {
		if($.cookie("displayName")!==undefined && $.cookie("displayName")!==""){
			$.ajax({
				url: "/BrokerWeiXin.action?hasFavForList",
				type : "POST",
				dataType: "json",
				data:{
					cityCode: $("#cityCode").val() || 110000,
					sidList: sidList.join(","),
					saveType: type
				},
				success:function(data, status) {
					if(data.status == "y"){
						$.each(data.sidList, function(i, sid) {
							$(".fav_"+sid).toggleClass("zgIcon-heart-o");
						});
					}
				}	
			});
		}
	},
	// 添加到收藏  
	favor : function(sid, sname, type) {
		$.ajax({
			url: "/BrokerWeiXin.action?favor",
			type : "POST",
			dataType: "json",
			data:{
				cityCode: $("#cityCode").val() || 110000,
				sid: parseInt(sid),
				saveType: type,
				name: encodeURI(sname || "")
			},
			success:function(data, status) {
	            if(data == 1){
	            	$(".fav_"+sid).toggleClass("zgIcon-heart-o");
	            	$(".fav_"+sid).attr('title','取消收藏');
	            }else if(data == 0){
	            	$(".fav_"+sid).toggleClass("zgIcon-heart-o");
	            	$(".fav_"+sid).attr('title','收藏');
	            }
			}
		});
	},
	// 绑定收藏小区点击事件
	bindFavEvent : function(pcOrMobile) {
		$(".fav").click(function() {
			var sid = $(this).attr("sid");  	// 收藏目标编号
			var sname = $(this).attr("sname");	// 收藏目标名称
			var type = $(this).attr("stype");	// 收藏目标类型
			if($.cookie("displayName")!==undefined && $.cookie("displayName")!==""){
				Favorite.favor(sid, sname, type);
			}else{
				if(pcOrMobile == Favorite.PC)
					$(".loginBtn").first().click();
				else if(pcOrMobile == Favorite.MOBILE)
					$("#login").modal();
				else
					$(".loginBtn").first().click();
			}
		});
	}
};