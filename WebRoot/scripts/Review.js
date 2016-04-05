/**
 * 经纪人评分
 */
var Review = {
	t : null,
	zid : null,
	left : null,
	top : null,
	scoreMap : {10:"好评", 4:"中评", 0:"差评"},
	// 初始化
	init : function(left, top) {
		Review.left = left;
		Review.top = top;
		// 绑定评分点击事件
		Review.reviewPopBox();
		// 绑定查询评价详情点击事件
		Review.reviewDetailPopBox();
	},
	// 绑定评分点击事件，显示 评分 弹出层
	reviewPopBox : function() {
		// 绑定评分点击事件
		$(".review").click(function() {
			
			if(!checkLoginStatus()) return;
			$(".reviewPopBox").remove();
			
			// 获取经纪人zid
			Review.zid = $(this).attr("zid");
			
			// 显示 评分 弹出层
			var review = {
				className: 'reviewPopBox',
				coverlayer:false,
				title: "<em>对Ta的评价</em>",
				divContent: "<form class='form'><div class='form-control'><input id='score' type='hidden' /><ul class='radiobox' id='progress'> <li  useType='10'>好评</li> <li useType='4'>中评</li> <li useType='0'>差评</li></ul><span class='Validform_checktip'></span></div><div class='form-control'> <textarea id='comment' rows='2' placeholder='请输入您想说的话'></textarea> <span class='Validform_checktip commentWarn'>还能输入200字</span> </div></form>", 
				confirmBtn: "确定",
				fn: Review.confirmReview,
				removeThis:false
			};
			fnCreatePopBox(review);
			fnCreateRadiobox({
				ul:$("#progress"),
	    		boxUseType:10
			});
			fnTextVerify($("#comment"),$(".commentWarn"),200);

		});
	},
	// 确认评分回调事件
	confirmReview : function(){
		// 提交表单事件
		$.ajax({
			url: '/Review.action?review',
			data: {
				zidTo: Review.zid,
				score: $("#score").val(),
				comment: $("#comment").val()
			},
			dataType: "json",
			async: false,
			type: "post",
			cache: false,
			success: function(data) {
				if(data.logined != undefined && data.logined == 'n'){
					$(".loginBtn").click();
					return;
				}
				$("#score").siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
				$("#comment").siblings(".Validform_checktip").html("").removeClass("Validform_wrong");
				switch (data.status) {
					case "1":
						$(".reviewPopBox").remove();
						$(".review"+Review.zid).unbind("click");
						$(".review"+Review.zid).text("已评价");
//						alertSetTime("评论成功", 1500);
						break;
					case "2":
						$("#score").siblings(".Validform_checktip").html(data.info).addClass("Validform_wrong");
						break;
					case "3":
						$("#comment").siblings(".Validform_checktip").html(data.info).addClass("Validform_wrong");
						break;
					case "4":
					case "5":
						alertSetTime(data.info, 1500);
						break;
					case "6":
						$(".reviewPopBox").remove();
						alertSetTime(data.info, 1500);
						break;
					case "-1":
					default:
						$(".reviewPopBox").remove();
						alertSetTime("系统异常！请稍后再试", 1500);
						break;
				}
			}
		});

	},
	// 绑定 查看评分详情 点击事件，显示 评分详情 弹出层
	reviewDetailPopBox: function(){
		$(".reviewDetail").click(function(){
			
			if(!checkLoginStatus()) return;
			$(".reviewDetailPopBox").remove();
			
			var total = 1;
			if(total == 0) {
				alertSetTime("暂无评论");
				return;
			}
			
			// 获取经纪人zid
			Review.zid = $(this).attr("zid");
			$.ajax({
				url: '/Review.action?getReviewList',
				data: {
					zid: Review.zid
				},
				dataType: "json",
				async: false,
				type: "post",
				cache: false,
				success: function(data) {
					var content = "<div class='divText'>";
					$.each(data.pageModel.result, function(i, item) {
						var comment = item.comment==''?'无':item.comment;
						content += '<div class="detail"><div class="name">'+item.name.substring(0,1)+'**</div> <div class="date">'+item.createdtime+'</div> <div class="status"> <button class="hollowTag hollowTag-primary">'+Review.scoreMap[item.score]+'</button> </div> <div class="reviewContent"> '+comment+' </div></div>';
					});
					content += "</div>";
					var reviewDetail = {
						className: 'reviewDetailPopBox divPop-lg',
						coverlayer:false,
						title: "评论详情",
						divContent: content,
						confirmBtn: false
					};
					fnCreatePopBox(reviewDetail);
				}
			});
			
		});
	},
	getReviewNumByZid : function(zid) {
		var num = 0;
		$.ajax({
			url: '/Review.action?getReviewNumByZid',
			data: {
				zid: zid
			},
			dataType: "json",
			type: "post",
			async: false,
			cache: false,
			success: function(data) {
				num = parseInt(data);
			}
		});
		return num;
	}
};