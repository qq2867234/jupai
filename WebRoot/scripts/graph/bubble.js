/*var bubble_data=[{name:'关键字1',data:[150,150,10]},{name:'关键字2',data:[190,190,5]},{name:'关键字3',data:[110,190,5]},{name:'关键字4',data:[110,110,5]},{name:'关键字5',data:[190,110,5]}];
 */
var url_words = '/GraphShow.action?gethotwords';
var url_up = '/GraphShow.action?updatelikes'
var bubble_data = [];
var chart;
var repeat_flag;
var count=0;
// 指定位于中心的球
var center_index;
$(function() {

	$("#key_button").bind('click', insertWords);
	refreshData();
	var max_obj = {
		index : 0,
		size : bubble_data[0].data.y
	};
	function getData(bubble_data) {

		var chart_source = {
			chart : {
				type : 'bubble'
			/* backgroundColor : '#FCFFC5', */
			},
			xAxis : {
				lineWidth : 0,
				tickLength : 0,
				min : 0,
				max : 585,
				labels : {
				 formatter : function() { return; }
				 
				}
			},
			yAxis : {
				title : null,
				gridLineWidth : 0,
				min : 0,
				max : 300,
				labels : {
				 formatter : function() { return; }
				}
			},
			title : {
				text : null
			},
			plotOptions : {
				bubble : {
					cursor : 'pointer',
					minSize : '10%',
					maxSize : '50%',
					sizeBy : 'width',
					events : {
						legendItemClick : function(event) {
							/* var visibility = this.chart; */
							return false;
						},
						click : function(event) {
							updatall(event);
						}
					}
				}
			},
			tooltip : {
				formatter : function() {
					return '<b>' + this.series.name + '</b>:  投票数='
							+ this.point.z;
				}
			},
			legend : {
			/*
			 * align: 'right', verticalAlign: 'top', floating: true, x: -70, y:
			 * 20,
			 */
			},
			credits : {
				text : '真格在线房产',
				enabled : false,
				href : 'http://t.BBBBigPig.com'

			},
			series : [ {
				name : bubble_data[0].name,
				data : [ bubble_data[0].data ]
			}, {
				name : bubble_data[1].name,
				data : [ bubble_data[1].data ]
			}, {
				name : bubble_data[2].name,
				data : [ bubble_data[2].data ]
			}, {
				name : bubble_data[3].name,
				data : [ bubble_data[3].data ]
			}, {
				name : bubble_data[4].name,
				data : [ bubble_data[4].data ]
			} ]

		};
		return chart_source;

	}// getData

	// 重新更新图片
	function updatall(event) {
		var index = event.point.series._i;
		count++;
		if(count>2){
			alert("不能频繁的投票！");
			count=0;
		}
		$.ajax({
			dataType : "json",
			url : url_up,
			data : {
				kw : encodeURIComponent(bubble_data[index].name)
			},
			success:function(e){
				if(e.flag==1){
					var x = event.point.x;
					var y = event.point.y
					var z = event.point.z;
					bubble_data[index].data.y = z + 1;
					chart.series[index].data[0].update([ x, y, z + 1 ], true, false);
					for ( var i = 0; i < chart.series.length; i++) {
						if (i != index) {
							var x = bubble_data[i].data.x;
							var y = bubble_data[i].data.y;
							var z = bubble_data[i].data.z;
							chart.series[i].data[0].update([ x, y, z ], true, false);
						}// if(i!=index)
					}
				}
			}
		});

		/*
		 * if(z+1>max_obj.size){ changplace(index); max_obj.size=z+1;
		 * max_obj.index=index; }
		 */

	

	}// updatall

	// 重新设置最大的点(该方法暂时没有使用)
	function changplace(index) {
		var x = bubble_data[index].data[0];
		var y = bubble_data[index].data[1];
		var z = bubble_data[index].data[2];
		var max_x = bubble_data[max_obj.index].data[0];
		var max_y = bubble_data[max_obj.index].data[1];
		var max_z = bubble_data[max_obj.index].data[2];
		bubble_data[index].data[0] = max_x;
		bubble_data[index].data[1] = max_y;
		bubble_data[max_obj.index].data[0] = x;
		bubble_data[max_obj.index].data[1] = y;
		chart.series[index].data[0].update([ max_x, max_y, z ], true, false);
		chart.series[max_obj.index].data[0]
				.update([ x, y, max_z ], true, false);

	}// changplace

	function randomplace() {
		for ( var i = 0; i < bubble_data.length; i++) {
			var x = parseInt(300 * Math.random());
			var y = parseInt(300 * Math.random());
			if (x < 100 || x > 200) {
				if (x < 100) {
					if (x > 30)
						x = x + 50;
					else
						x = x + 100;
				} else if (x > 200) {
					if (x > 250)
						x = x - 70;
					else
						x = x - 100;
				}

			}
			if (y < 100 || y > 200) {

				if (y < 100) {
					if (y > 30)
						y = y + 70;
					else
						y = y + 100;
				} else if (y > 200) {
					if (y > 250)
						y = y - 100;
					else
						y = y - 100;
				}

			}
			bubble_data[i].data.x = x;
			bubble_data[i].data.y = y;

		}
	}// randomplace()

	function refreshData() {
		bubble_data = [];
		$.ajax({
			dataType : "json",
			url : url_words,
			async : false,
			success : function(e) {
				$.each(e.beans, function(i, bean) {
					var tempt = {};
					tempt.name = bean.kw;
					if (i == 0)
						tempt.data = {
							x : 292.5,
							y : 150,
							z : bean.likes,
							color : ''
						};
					else if (i == 1)
						tempt.data = {
							x : 292.5,
							y : 150,
							z : bean.likes,
							color : ''
						};
					else if (i == 2)
						tempt.data = {
							x : 292.5,
							y : 150,
							z : bean.likes,
							color : ''
						};
					else if (i == 3)
						tempt.data = {
							x : 292.5,
							y : 150,
							z : bean.likes,
							color : ''
						};
					else if (i == 4)
						tempt.data = {
							x : 292.5,
							y : 150,
							z : bean.likes,
							color : ''
						};
					bubble_data.push(tempt);
				})
				/* randomplace(); */
				repeat_flag=virtualRandomPlace();
				/*while(!repeat_flag){					
					repeat_flag=virtualRandomPlace();
				};
*/
				$('#hot').highcharts(getData(bubble_data));
				chart = $('#hot').highcharts();
			}
		});
	}

	function insertWords() {
		var content = $("#key_input").val();
		$("#key_input").val("");
		if (content.length > 0) {
			$.ajax({
				dataType : "json",
				async : false,
				url : '/GraphShow.action?insertWord',
				data : {
					kw : encodeURIComponent(content)
				},
				success : function(bean) {
					if (bean.exist == 1 && bean.error == 0)
						alert("你为关键词：" + content + " 投入了一票！");
					else if (bean.exist == 0 && bean.error == 0)
						alert("你添加了一个新的关键词 ：" + content)
					else if (bean.exist == 0 && bean.error == 1)
						alert("你输入了敏感词，请重新输入！")
						else if (bean.exist == -1 && bean.error == 2)
							alert("不可以频繁投票哦！");
				}

			});
			refreshData();
			$("#key_input").val("");
		}
	}

	function virtualRandomPlace() {

		var center_info = selectCenter();
		var center_x = center_info.split('_')[0];
		var center_r = center_info.split('_')[1];
		var orders=getOrderArray(center_index);

		if (bubble_data.length == 2) {
			//放在左下角
			selcetPlace(1, center_x-center_r, 1, 150+Number(center_r), orders[0]);
		} else if (bubble_data.length == 3) {
			//放在左下角
			selcetPlace(1, center_x-center_r, 1, 150+Number(center_r), orders[0]);
			//放在右下角
			selcetPlace(Number(center_x)+Number(center_r), 584, 0, 150+Number(center_r), orders[1]);

		} else if (bubble_data.length == 4) {
			//放在左下角
			selcetPlace(1, center_x-center_r, 1, 150+Number(center_r), orders[0]);
			//放在右下角
			selcetPlace(Number(center_x)+Number(center_r), 584, 0, 150+Number(center_r), orders[1]);
			//放在左上角
			selcetPlace(1, Number(center_x)+Number(center_r), 150+Number(center_r), 299, orders[2]);
			

		} else if (bubble_data.length == 5) {
			//放在左下角
			selcetPlace(1, center_x-center_r, 1, 150+Number(center_r), orders[0]);
			//放在右下角
			selcetPlace(Number(center_x)+Number(center_r), 584, 0, 150+Number(center_r), orders[1]);
			//放在左上角
			selcetPlace(1, Number(center_x)+Number(center_r), 150+Number(center_r), 299, orders[2]);
			//放在右上角
			selcetPlace(Number(center_x)+Number(center_r), 584, 150+Number(center_r), 299, orders[3]);
		}

	}

	/*
	 * 选择一个圆位于中心点，并允许其左右移动100个像素,并返回该球的半径和x点的坐标 data_size：球的个数。
	 */
	function selectCenter() {

		var data_size = bubble_data.length;
		// 随机获取到一个球的序号
		var index = parseInt(data_size * Math.random());
		center_index = index;
		// 获取200像素以内的偏移，从292.5-100向右随机
		var Mayoffset = parseInt(200 * Math.random());
		bubble_data[index].data.x = 192.5 + Mayoffset;
	/*	bubble_data[index].data.y=150;*/
		return bubble_data[index].data.x + "_" + getRadius(index);
	}

	/*
	 * 给定了一个坐标区域，以及球的索引，在该区域里的随机位置放下该球
	 * 
	 */
	function selcetPlace(min_x, max_x, min_y, max_y, index) {
		var r = getRadius(index);
		var begin_x = min_x + r;
		var begin_y = min_y + r;
		var len_x = (max_x - r) - begin_x;
		var len_y = (max_y - r) - begin_y;
		var x = (Math.random() * len_x+ Number(begin_x));
		var y = (Math.random() * len_y + Number(begin_y));
		bubble_data[index].data.x = x;
		bubble_data[index].data.y = y;
		if(len_x<0||len_y<0)return false
		else return true;
	}

	/*
	 * 取得指定球的半径
	 */
	function getRadius(index) {
		// 如果球的尺寸都是一样的 那么球的半径均为最大半径的60%
		if (isSame())
			return 300 * 0.5 * 0.6*0.5;
		else {
			// 最大的球
			if (index == 0)
				return 300 * 0.5 * 0.5;
			// 最小的球
			else if (index == bubble_data.length - 1)
				return 300 * 0.5 * 0.1;
			// 基于最小球来求得当前球半径
			else {
				var current_size = bubble_data[index].data.z;
				var min_size = bubble_data[bubble_data.length - 1].data.z;
				var max_size=bubble_data[0].data.z
				
				result=((300 * 0.5 * 0.5-300 * 0.5 * 0.1)/(max_size-min_size))*(current_size-min_size)+300 * 0.5 * 0.1;
				return result;
			}
		}
	}

	/*
	 * 判断是不是只有一种尺寸的球，
	 * 
	 */
	function isSame() {
		if (bubble_data.length == 1)
			return true;
		else {
			for ( var i = 0; i < bubble_data.length - 1; i++) {
				if (bubble_data[i].data.z != bubble_data[i + 1].data.z)
					return false
			}
			return true;
		}
	}
	/*
	 * 去掉中心点的索引后，返回剩余球的索引
	 * */
	function getOrderArray(index){
		var result=[];
		for(var i=0;i< bubble_data.length;i++){
			if(i!=index)result.push(i);
		}
		return result;
		
		
		
	}
});