
$(function() {
	
	$('.flexslider').flexslider({
        animation: "fade"
    });
	
	$("#communityPics").swipe({
		swipeLeft: function() { $(this).carousel('next'); },
		swipeRight: function() { $(this).carousel('prev'); },
	});
	showLayoutData();
});

function showImgDelay(imgObj, imgSrc, maxErrorNum) {
	if (maxErrorNum > 0) {
		imgObj.onerror = function() {
			showImgDelay(imgObj, imgSrc, maxErrorNum - 1);
		};
		setTimeout(function() {
			imgObj.src = imgSrc;
		}, 500);
	} else {
		imgObj.onerror = null;
		imgObj.src = imgSrc;
	}
}

// 显示户型报价
function showLayoutData() {
	$.getJSON("/GraphPrice.action?getLayoutDataForWeixin",{cityCode:110000, rid:parseInt(residenceId)}, function(data) {
		if(data.rent){
			$(".rentChart").append(getTableContent(data.rent, 2));
		}else{
			$(".rentChart").hide();
		}
		
	});
}

// 生成报价表格内容
function getTableContent(data, type) {
	var prefix = type == 1?"total" : "rental";
	var medianField = prefix + "_price_median";
	var minField = prefix + "_price_min";
	var maxField = prefix + "_price_max";
	var content = "<table class='table table-condensed table-striped prices'>";
	content += "<tr class='success'> <td>户型</td> <td>面积</td> <td>区间</td> <td>参考价</td> </tr>";
	$.each(data, function(i,bean) {
		content += "<tr><td>"+bean.bed_room+"居</td><td>"+bean.floor_area+"平</td><td>";
		if(bean[minField] == bean[maxField])
			content += bean[minField];
		else
			content += bean[minField] + "-" + bean[maxField];
		content += "</td><td>"+bean[medianField]+"</td></tr>";
	});
	content += "</table>";
	return content;
}
