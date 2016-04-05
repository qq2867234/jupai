require.config({
	paths: {
		"jquery": "/scripts/public/jquery-1.10.2.min",
		"brokerReview": "/scripts/brokerReview"
	}
});
define(['jquery', 'brokerReview'], function($, br) {
	var residenceCount = 0;
	var brokerCount = 0 
	var cType = 1; //1 获得收藏小区 2为经纪人
	//删除收藏
	var delFav = function (id, curobj) {
		$.ajax({
			url:"/BrokerWeiXin.action?delOneFav",
			dataType:"json",
			data:{favId:id},
			success:function(data, status) {
				curobj.parent().remove();
			}
		});
	}
	
	//获得收藏列表
	var getFavList = function () {
		$.ajax({
			url:"/UserCenterController.action?showFavList",
			dataType:"json",
			data:{type: cType},
			success:function(data, status) {
				var content = "";
				$.each(data.favList, function(index, item) {
					if(cType == 1) {
						residenceCount++;
						content += "<div class='communityOnsale community'>" +
						"<a href='"+item.url+"'><img onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2);\" alt='小区图片' src=\""+item.small_pic+"\"><strong>"+item.residence_name+"</strong><q>地址:"+item.address+"</q><span class='left price'>均价:"+item.unit_price+"元</span></a>"+
						"<button class=\"fav delFav\" favId='" + item.id + "'><span class='fav zgIcon zgIcon-heart zgIcon-heart-o'></span>取消收藏</button>"+
						"</div>";
						$("#favList").append(content);
						content = "";
					} else {
						brokerCount++;
						content += "<div class=\"communityAgent\">"+
						"<a target=\"_blank\" href="+item.url+"><img onerror=\"showImgDelay(this,'/images/defaultPic/head.png',2);\" alt=\"头像\" src='"+item.pic+"'><em><b class=\"person\">"+item.name+"</b><b class=\"pingfen\">" + br.brokerReview.getStarIconContent(item.score) + "</b></em><b class=\"company\">"+item.binfo+"</b></a>"+
						"<button class=\"fav delFav\" favId='" + item.id + "'><span class='fav zgIcon zgIcon-heart zgIcon-heart-o'></span>取消收藏</button>"+
						"<div>";
						$("#favList").append(content);
						content = "";
					}
				});
				$(".delFav").bind("click", function() {
					delFav($(this).attr("favId"), $(this));
				});
				
				if(cType == 1 && residenceCount == 0) {
					content += "<tr><td>没有收藏的小区<td><td class='remove'></td></tr>";
					$("#favList").append(content);
					content = "";
				} else if(cType != 1 && brokerCount == 0) {
					content += "<tr><td>没有收藏的经纪人<td><td class='remove'></td></tr>";
					$("#favList").append(content);
					content = "";
				}
			}
		});
	}
	$(function() {
		 $("#cResidence").click(function() {
		 	$(this).parent().addClass("on");
		 	$(this).parent().siblings().removeClass("on");
		 	$("#favList").empty();
		 	cType = 1;
		 	getFavList();
		 });
		 $("#cBroker").click(function() {
		 	$(this).parent().addClass("on");
		 	$(this).parent().siblings().removeClass("on");
			$("#favList").empty();
		 	cType = 2;
		 	getFavList();
		 });
		 
		});
	
	return {
		getFavList: getFavList,
		delFav: delFav
	}
});
