// 图片轮换参数
cpro_client='lanrennet2010_cpr';
cpro_at='text'; 
cpro_161=4; 
cpro_flush=4; 
cpro_w=960; 
cpro_h=90; 
cpro_template='text_default_960_90'; 
cpro_cbd='#86AC5F'; 
cpro_cbg='#242E37'; 
cpro_ctitle='#6CA7C7'; 
cpro_cdesc='#cfe0ee'; 
cpro_curl='#008000'; 
cpro_cflush='#ff7b0e'; 
cpro_uap=1;
cpro_cad=1;

$(function() {
	// 图片加载失败处理函数
	$("img").error(function() {
		showImgDelay($(this)[0], '/images/public/home.jpg', 2);
	});
	if ($(".filmstrip").children('li').length <= 0) {
	} else {
		$('#pics').galleryView({
			panel_width: 480,
            panel_height: 360,
            frame_width: 92,
            frame_height: 69,
            filmstrip_size: 4
		});
	}

	$(".agent strong").click(function(e) {
		e.preventDefault();
	});
    

    $(".surUlMenu li").click(function(event) {
        $(this).addClass('on').siblings().removeClass("on");
        fnSurroundPages($(".surContent ul").eq($(this).index()));
    });
    $(".surUlMenu li").first().click();

	addMap();
	
	// 相似房产换一批
	changeGroups($("#saleContainer"),$("#saleContainer").next(".btnBox"),4);
	
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
    	if(data != undefined && data.priceGraphData != undefined && data.priceGraphData.length > 0){
    		drawPieChart(listType, data);
    	}
    	// 租单没有同户型报价，隐藏
    	else if(listType != undefined && listType == 2){
    		$(".proSheet").parent().hide();
    	}
    	// 卖单没有同户型报价，提示
    	else if(listType != undefined && listType == 1){
    		$(".proSheet").html("<span style='font-size:20px;'>暂无同户型报价</span>");
    		$(".proSheet").parent().css({"text-align":"center","margin-top":"20px"});
    	}
    });
	
	// 记录用户进入租单页面的行为
    UserTrack.log(UserTrack.TRACK_TYPE_GOTO_RENT_PAGE, window.location.pathname.split("/")[5].split(".")[0].substring(1));
});
/* var colors = [
'#F5F5F5',
'#FFFFE0',
'#FFFACD',
'#EED8AE',
'#EEB4B4',
'#EE9572',
'#EE799F',
'#EE4000',
'#DC143C',
'#B22222'
]; */
var colors = ['#C6E2FF', '#9AFF9A', '#F0E68C', '#EEEE00', '#EEAD0E', '#EE7600', '#EE30A7', '#EE0000', '#CD0000', '#A52A2A'];
var color1 = [colors[9]];
var color2 = [colors[5], colors[9]];
var color3 = [colors[3], colors[5], colors[9]];
var color4 = [colors[3], colors[5], colors[8], colors[9]];
var color5 = [colors[0], colors[3], colors[5], colors[8], colors[9]];
var color6 = [colors[0], colors[3], colors[5], colors[7], colors[8], colors[9]];
var color7 = [colors[0], colors[3], colors[5], colors[6], colors[7], colors[8], colors[9]];
var color8 = [colors[0], colors[3], colors[4], colors[5], colors[6], colors[7], colors[8], colors[9]];
var color9 = [colors[0], colors[1], colors[3], colors[4], colors[5], colors[6], colors[7], colors[8], colors[9]];
var color10 = colors;
// 绘制饼图
function drawPieChart(houseType, data){
	$('.proSheet').highcharts({
        chart: {
            type: 'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
//			,
//            width: 400,
//            height: 250
        },
        title:{
            text: data.area+'报价',
            verticalAlign: 'bottom'
        },
        tooltip: {
            valueSuffix:' %',
        	formatter: function () {
//        		var data = b.point.series.userOptions.data;
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

    function fnSurroundPages(ul){
        var ul = $(ul);
        //每页显示li个数
        var perLi = 6;
        ul.show().siblings("ul").hide();
        var length = ul.children('li').length;
        if(length<=perLi+1){
            return;
        }
        else{
            $(".pages").remove();
            var pages = '<li class="pages"> <a href="###" class="btn btn-default sm-btn" id="nextPage"> <span class="zgIcon zgIcon-chevron-right"></span> </a> <a href="###" class="btn btn-default forbidden sm-btn" id="prevPage"> <span class="zgIcon zgIcon-chevron-left"></span> </a> <b>第<strong id="curPage">1</strong>页,共<strong id="totalPage"></strong>页</b></li>';
            var curPage = 1;
            $(pages).appendTo(ul).show();
            $("#totalPage").text(Math.ceil(length/perLi));
            ul.children('li').not(".pages").hide().slice(0,perLi).show();
            $("#nextPage").bind('click',function(){
                $("#prevPage").removeClass("forbidden");
                fnPageDown($(this),1);              
            });
            $("#prevPage").bind('click',function(){
                $("#nextPage").removeClass("forbidden");
                fnPageDown($(this),-1);
            });

            function fnPageDown(btn,num){
                if((num<=0&&curPage<=1)||(num>0&&curPage>=Math.ceil(length/perLi)))
                {
                    return;
                }
                curPage+=num;
                ul.children('li').not(".pages").hide().slice(perLi*(curPage-1),perLi*curPage).show();
                $("#curPage").text(curPage);
                if(curPage*perLi>=length){
                    $("#nextPage").addClass('forbidden');
                }
                if(curPage<=1){
                    $("#prevPage").addClass('forbidden');
                }
            }
        }

        
    }