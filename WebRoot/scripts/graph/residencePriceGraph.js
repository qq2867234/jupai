$(function() {
	var graphdate = [];
	var url_list = "/ResidencePriceGraph.action?getResidencePrice";
	$.ajax({
		dataType : "json",
		url : url_list,
		async : false,
		success : function(e) {

			$.each(e.beans, function(j, bean) {
				var tempt = {};
				tempt.name = bean.residence_name;
				tempt.x = bean.longitude;
				tempt.y = bean.latitude;
				tempt.color = bean.color;
				
				graphdate.push(tempt);
			});
		}

	});

	$('#container').highcharts({
		chart : {
			type:'scatter',
			zoomType: 'xy'
		},
		title : {
			text : '小区价格分布'
		},
		subtitle : {
			text : ''
		},
		xAxis : {
			min : 115.75,
			max : 117.25,
			title : {
				enabled : true,
				text : '经度'
			}
		/*
		 * , startOnTick : true, endOnTick : true, showLastLabel : true
		 */
		},
		yAxis : {
			min : 39,
			max : 40.5,
			title : {
				text : '纬度'
			}
		},
		legend : {
			enabled : false,
			layout : 'vertical',
			align : 'left',
			verticalAlign : 'top',
			x : 100,
			y : 70,
			floating : true,
			backgroundColor : '#FFFFFF',
			borderWidth : 1
		},
		plotOptions : {
			scatter : {
				marker : {
					radius : 1,
					states : {
						hover : {
							enabled : true,
							lineColor : 'rgb(100,100,100)'
						}
					}
				},
				states : {
					hover : {
						marker : {
							enabled : false
						}
					}
				},
				tooltip : {
					headerFormat : '<b>{series.name}</b><br>',
					pointFormat : '{point.name}'
				}
			},
			series : {
				turboThreshold : 15000
			}
		},
		series : [ {
			name : '价格',
			/* color : 'rgba(223, 83, 83, .5)', */
			data : graphdate
		} ],
		credits : {
			enabled : false,
			text : '北京真格在线科技',
			href : 'http://www.zhengor.com'
		}
	}
	// datavar
	);
});