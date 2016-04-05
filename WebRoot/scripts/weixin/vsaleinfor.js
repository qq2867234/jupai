$(function() {
	
	$("#salePics").swipe({
	      swipeLeft: function() { $(this).carousel('next'); },
	      swipeRight: function() { $(this).carousel('prev'); },
    });
	
	// 画出同户型价格分布图（饼图）
	$.ajax({
        type: "post",
        data: {
	        rid: residenceId, 
	        bedRoom: bedRoom, 
	        floorArea: floorArea, 
	        type: listType
        },
        url: "/GraphPrice.action?getGraphPriceForPieChart"
    }).done(
    function(data) {
    	if(data != undefined && data.priceGraphData != undefined && data.priceGraphData.length > 0)
    		drawPieChart(listType, data);
    	else{
    		$("#sameLayoutPrice").hide();
    		$("#sameLayoutPrice").prev().hide();
    	}
    });
});


var colors = [
  	'#C6E2FF',
  	'#9AFF9A',
  	'#F0E68C',
  	'#EEEE00',
  	'#EEAD0E',
  	'#EE7600',
  	'#EE30A7',
  	'#EE0000',
  	'#CD0000',
  	'#A52A2A'
  ];
  var color1 = [
    	colors[9]
  ];
  var color2 = [
  	colors[5],
  	colors[9]
  ];
  var color3 = [
    	colors[3],
    	colors[5],
  	colors[9]
  ];
  var color4 = [
  	colors[3],
  	colors[5],
  	colors[8],
  	colors[9]
  ];
  var color5 = [
  	colors[0],
    	colors[3],
    	colors[5],
    	colors[8],
    	colors[9]
  ];
  var color6 = [
    	colors[0],
  	colors[3],
  	colors[5],
  	colors[7],
  	colors[8],
  	colors[9]
            ];
  var color7 = [
    	colors[0],
  	colors[3],
  	colors[5],
  	colors[6],
  	colors[7],
  	colors[8],
  	colors[9]
    ];
  var color8 = [
    	colors[0],
  	colors[3],
  	colors[4],
  	colors[5],
  	colors[6],
  	colors[7],
  	colors[8],
  	colors[9]
    ];
  var color9 = [
  	colors[0],
  	colors[1],
  	colors[3],
  	colors[4],
  	colors[5],
  	colors[6],
  	colors[7],
  	colors[8],
  	colors[9]
    ];
  var color10 = colors;
  // 绘制饼图
  function drawPieChart(houseType, data){
	  $("#sameLayoutPrice").highcharts({
          chart: {
              type: 'pie',
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false
          },
          title:{
              text: '注：以上为'+data.area+'户型的报价分布',
              verticalAlign: 'bottom'
          },
          tooltip: {
              valueSuffix:' %',
          	formatter: function () {
//                  		var data = b.point.series.userOptions.data;
          		return "百分比："+this.y+"%";
          	}
          },
  		colors: eval('color'+data.priceGraphData.length),
          plotOptions: {
              pie: {
                  allowPointSelect: false,
                  cursor: 'pointer',
                  depth: 35,
                  dataLabels: {
                      enabled: true,
//                              color: '#444444',
//                              connectorColor: '#000000',
                      format: '{point.name}'
                  }
              }
          },
          series: [{
              type: 'pie',
              name: '百分比',
              data: data.priceGraphData

          }],
  		credits: {
  			enabled: false,
  			text: 'www.zhengor.com',
  			href: 'http://www.zhengor.com'
  		},
          exporting:{
          	enabled: false
          }
      });
  }

