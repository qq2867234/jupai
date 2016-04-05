$(document).ready(function(){
	
	if($(".similarHouse ul li").length == 0) {
		$(".similarHouse").hide();
	}
	
	$(".houseInfo_surround_circle").not(":first").mouseenter(function() {
    	$(this).parents(".houseInfo_surround")
    		.find(".houseInfo_surround_info").hide()
    		.end().end()
    		.find(".houseInfo_surround_info").fadeIn(200);
    });
	
	$(".houseInfo_surround_circle").not(":first").mouseleave(function() {
    	$(this).parents(".houseInfo_surround").find(".houseInfo_surround_info").hide();
    });

	window.onscroll = function(){
	    var ht=document.documentElement.scrollTop || document.body.scrollTop; 

	    if(ht>432){
	    	$(".flexslider_title").addClass('top');
	    	$(".flexslider_title_host").addClass('top');
	    }
	    else{
	    	$(".flexslider_title").removeClass('top');
	    	$(".flexslider_title_host").removeClass('top');
	    }
    }
    var flexSpeed = 400;
   if($(".flexslider_img").width()<=1023){
   		$("#slideLeftBtn,#slideRightBtn").hide();
   		$(".flexslider_img").css({left:(1023-$(".flexslider_img").width())/2+'px'})
   }
    $("#slideLeftBtn").click(function() {
    	sliderPageUp($(".flexslider_img"),0-flexSpeed);
    });
    $("#slideRightBtn").click(function() {
    	sliderPageUp($(".flexslider_img"));
    });
    showBtn($(".flexslider_img"));

    function sliderPageUp($flexImg,flexStep){
    	var curStep = flexStep || flexSpeed;
    	var curLeft  = $flexImg.position().left;
    	var curPos;
    	$("#slideLeftBtn,#slideRightBtn").show();
    	// 图片较多时会有1px宽度误差,暂时无解
  		if(curLeft>=$flexImg.parent().width()-$flexImg.width()||curLeft<=0)
  		{
  			curPos = curStep>0? 
			Math.max(curLeft-curStep, $flexImg.parent().width()-$flexImg.width()):
			Math.min(curLeft-curStep,0);
  			$flexImg.animate({
	    		left: curPos},
	    		200);
  		}
  		var a = setTimeout(function(){
  			clearTimeout(a);
  			showBtn($flexImg);
  		},200);
  		
    }
    function showBtn($flexImg){
		if($flexImg.position().left<=$flexImg.parent().width()-$flexImg.width()+5){
  			$("#slideRightBtn").hide();
  		}
  		if($flexImg.position().left>=-5){
  			$("#slideLeftBtn").hide();
  		}
	}

    $("#contactAnalysis").click(function() {
    	//记录点击查看联系方式的次数
    	UserAnalysis.eventAnalysis("用户操作", "点击查看联系方式");
    	UserTrack.log(UserTrack.TRACK_TYPE_CONTACT, $("#listId").val());
//    	if(checkLoginStatus()){
//    		if(!$("#contacter").length) {
//    			demandMatching();
//    		}
//    	}
    });
    $("#processAnalysis").click(function() {
    	//记录点击查看联系方式的次数
    	UserAnalysis.eventAnalysis("用户操作", "开启租房过程");
    	UserTrack.log(UserTrack.TRACK_START_PROCESS, $("#listId").val());
    	if(checkLoginStatus(1)){
    		startOneProgress();
    	}
    });
    var imgNum = $(".slides").children('li').length;
    $(".slides span").each(function(){
        var cur = $(this).parent('li').index() + 1; 
        $(this).text(cur+'/'+imgNum);
    });
    // $('.flexslider').flexslider({
    //     animation: "fade"
    // });
    
    // 投诉房源点击事件
//    FeedBack.bindClickEvent();
//    
//	// 获取评价数量
//    if(ownerZid !== undefined) {
//    	var num = Review.getReviewNumByZid(ownerZid);
//    	if(num > 0) {
//    		// 添加标签
//    		$(".btnTags").append("<a href='###' class='tag tag-danger reviewDetail' zid='"+ownerZid+"'>"+num+"人评价</a>");
//    		// 绑定事件
//    		Review.reviewDetailPopBox();
//    	}
//    }
});

/**
 * 反馈类（投诉 举报）
 */
var FeedBack = {
	bindClickEvent : function() {
		$(".feed").click(function(){
	    	if(checkLoginStatus()){
	    		fnCreatePopBox({
	                clear:true,
	        		title:'投诉房源',
	        		className:'feedBox divPop-sm',
	        		removeThis:false,
	                coverlayer:false,
	                parentDiv: '.basicInfo',
	                left:'80px',
	                top:'220px',
	                confirmBtn:"投诉",
	                fn: FeedBack.confirmCallback,
	                divContent: "<form class='form'> <div class='form-control'> <label>真格，为你而生，因你而完美！<br />感谢反馈！</label> </div> <div class='form-control feedType'> <input type='hidden'> <ul class='radiobox'> <li id='rented'><a href='###'>房源已租</a></li> <li id='feedElse'><a href='###'>其他问题</a></li> </ul> </div> <div class='form-control feedTextarea'> <textarea id='feed' rows='2' placeholder='请输入您想说的话'></textarea> <span class='Validform_checktip feedWarn'>还能输入200字</span>  </div> </form>"
	        	});
	    		fnCreateRadiobox({ul: $(".feedBox ul")});
	        	// 其它问题
	            $("#feedElse").click(function(){
	            	$(".feedBox .warnInfo").remove();
	            	$(".feedType").hide();
	                $(".feedTextarea").show();
	                fnTextVerify($("#feed"),$(".feedWarn"),200);
	            });
	    	}
	    });
	}, 
	// 确认
	confirmCallback : function() {
		// 房源已租
		if($("#rented") && $("#rented").hasClass("on")){
			FeedBack.commitFeedBack(1, window.location.pathname.split("/")[5].split(".")[0].substring(1), "房源已租");
		}
		// 未选择
		else if(!$("#rented").is(":hidden") && !$("#rented").hasClass("on")){
			FeedBack.warn("请选择");
		}
		// 其它问题
		else if($.trim($("#feed").val())!=""){
			FeedBack.commitFeedBack(1, window.location.pathname.split("/")[5].split(".")[0].substring(1), $.trim($("#feed").val()));
		}
		// 未输入想说的话
		else{
			FeedBack.warn("请输入您想说的话");
		}
	},
	// 提交反馈
	commitFeedBack : function(type, idTo, content) {
		$.post("/UserCenterOperator.action?feedback", { type:type, idTo:idTo, content:content});
		FeedBack.thanks();
	}, 
	// 感谢
	thanks : function() {
		var left = parseInt($(".basicInfo").offset().left+130)+"px";
		var top = parseInt($(".basicInfo").offset().top+360)+"px";
		$(".feedBox").remove();
		alertSetTime("感谢您的反馈！", 1000, left, top);
	},
	warn : function(content) {
		$(".feedBox .divContent").append("<span style='color:red' class='warnInfo'>"+content+"</span>");
	}
	
};

//开启一个租房过程
function startOneProgress() {
	var listId = $("#listId").val();
	$.ajax({
		type: "post",
		url:"/ProgressOperation.action?startOneRentProgress",
		data:{lid:listId},
		dataType:"json",
		success:function(data, status) {
			if(data.status == "y") {
				window.location.href = "/ProgressOperation.action?goToProgressPageByStep&pid=" + data.pid + "&lid=" + listId + "&step=2";
			} else {
				alertDialog(data.info);
			}
		}
	});
}

//获得联系方式
function demandMatching() {
	$.ajax({
		type: "post",
		url:"/RentListOperator.action?demandMatching",
		data:{listId:$("#listId").val()},
		dataType:"json",
		success:function(data, status) {
			if(data.status == "y") {
				if(data.rs.contact != undefined) {
					if(data.rs.contact == "0") {
						//提示获得联系方式的请求已发送，等待通过。
						alertSetTime(data.rs.info);
					} else {
						//记录成功展示出的次数
						UserAnalysis.eventAnalysis("用户操作", "记录联系方式成功展示的次数", $("#listId").val());
//						var content = "";
//						content += "<div id='contacter' class='contact'>" + data.rs.contact.name + "<strong>" + data.rs.contact.mobile + "</strong>";
//						if(data.rs.contact.role == "2") {
//							content += "<a href='" + data.rs.contact.url + "' target='_blank'>查看主页</a>";
//						}
//						content += "</div>";
//						$("#contactAnalysis").parent().append(content);
////						$("#contactAnalysis").remove();
						$("#mMobile").text(data.rs.contact.mobile);
						$("#contactAnalysis").parents(".basicInfo_detail_3").animate({'height':'0'});
						$(".basicInfo_detail_3.showTel").show().animate({'height':'62px'});
					}
				} else {
					var backgroundNeeds = "";
					var needs = "";
					var needStr = "";
					var comm = "对方需要您设置下述信息才可查看其联系方式（请前往用户中心进行设置）：";
					if(data.rs.edu == "1") {
						backgroundNeeds += "教育背景信息";
					}
					if(data.rs.job == "1") {
						if(backgroundNeeds != "") {
							backgroundNeeds += "，";
						}
						backgroundNeeds += "工作信息";
					}
					if(data.rs.pet == "1") {
						if(needs != "") {
							needs += "，";
						}
						needs += "不允许饲养宠物";
					}
					if(data.rs.age != undefined && data.rs.age != 0) {
						if(needs != "") {
							needs += "，";
						}
						needs += "年龄需要在" + data.rs.age + "以下";
					}
					if(data.rs.other != undefined) {
						if(needs != "") {
							needs += "，";
						}
						needs += "其他需求：" + data.rs.other + "。";
					}
					if(backgroundNeeds != "") {
						needStr += backgroundNeeds + "。";
					}
					if(needs != "") {
						needStr += "对方还有以下要求：" + needs;
					}
					needStr = comm + needStr;
					// var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>" + needs + "</div><div class='btnBox clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
					// popBox($(Qs),".confirmBtn");
                    confirmDialog(needStr);
				}
			} else {
				// var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>" + data.rs.info + "</div><div class='btnBox clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
				// popBox($(Qs),".confirmBtn");
                confirmDialog(data.info);
			}
		}
	});
}

//显示同一小区下的租单
function showRentList(listData) {
	var content = "";
	$.each(listData, function(index, item) {
		content += getHouseHtml(item);
	});
	$(".houses_detail").append(content);
	$(".onrent").filter(":odd").css({
        'float':'right',
        'margin-right':'0'
    });
}
//显示随机信息
function showRandomMsg(obj, type) {
	var foodRandom = ['偶尔奢侈一下吃点好的，据说可以提高幸福指数。', '对于一个吃货，没有美食怎么行？', '每个月总有那么几天，想吃好吃哒！', '现实太骨感？吃点好的，激发正能量！', '有没有一个特殊的日子，就是想吃点好的？'];
	var storeRandom = ['逛街狂？只看不买就没关系！', '不用剁手，随便逛逛又不要钱！', '工资不多，偶尔也要置办些衣物的。'];
	var hospitalRandom = ['生病的时候不止想家，也会想医院在哪：', '谁没有个头疼脑热的时候？附近有医院，生病再也不用靠“扛”了：'];
	if(type == 1) {
		var index = Math.round(Math.random() * foodRandom.length - 1);
		obj.text(foodRandom[index]);
	} else if(type == 2) {
		var index = Math.round(Math.random() * storeRandom.length - 1);
		obj.text(storeRandom[index]);
	} else if(type == 3) {
		var index = Math.round(Math.random() * hospitalRandom.length - 1);
		obj.text(hospitalRandom[index]);
	}
}
//添加审核状态图标
function addValidTag() {
	var published = 0;
	$.ajax({
		type: "post",
		url:"/RentListOperator.action?getPublished",
		data:{listId:$("#listId").val()},
		dataType:"json",
		async:false,
		success:function(data, status) {
			if(data.status == 'y') {
				published = data.data;
			}
		}
	});
	if(published == 1) {
		$(".basicInfo").append("<span class='verify'></span>");
	} else if(published == 2){
		$(".basicInfo").append("<span class='verify has-verified'></span>");
	}
}

function getHouseHtml(house){
	var defaultPic;
	// 房源默认图片
	if(house.default_pic !== undefined && house.default_pic != ""){
		// 末尾加下划线(压缩过的，宽度450)
		defaultPic = house.default_pic.replace(house.default_pic.substring(house.default_pic.indexOf('.')), '_'+house.default_pic.substring(house.default_pic.indexOf('.')));
	}else{
		defaultPic = "/images/public/defaultHome.jpg";
	}
	var content = '<div class="rental"><a class="item" href="'+house.url+'" target="_blank">';
    // 房源图片
    content += '<span class="picContainer"><img src="'+defaultPic+'" alt="房源图片" onerror=\"showImgDelay(this,\'/images/public/defaultHome.jpg\',2)\" /></span>';
    // 价格
    content += '<span class="price">'+house.price+' <q>元/月</q></span>';	
    // 小区名、室厅卫、面积
    content += '<span class="info"><strong class="title">'+house.beds+'室'+house.baths+'卫　'+house.area+'平米</strong></span>';
    content += '</a>';
    content += '</div>';
    return content;
}

//获得同一小区下的租单
function getRentListForSameResidence() {
	 // var id = window.location.pathname.split("/")[5].split(".")[0].substring(1);
	 // $.ajax({
	 // 	type: "post",
	 // 	url:"/RentListOperator.action?getRentListForSameResidence",
	 // 	data:{rid:$("#rid").val(), listId:id},
	 // 	dataType:"json",
	 // 	success:function(data, status) {
	 // 		if(data.list != undefined && data.list.length > 0) {
	 // 			showRentList(data.list);	
	 // 		}else{
	 // 			$(".houses").hide();
	 // 		}
	 // 	}
	 // });
}

//绘制户型图
 function drawLayoutChart(){
 		if(layoutData == undefined || layoutData == '' || layoutData.rent == undefined) return;
 		// 单位
 		var suffix;
 		// 户型数据
 		var container;
 		var data = layoutData.rent;
 		suffix = "元/月";
 		container = $(".rentChart");
    	
 		// x轴文字的旋转角度，默认为0，当户型超过15过之后，逆时针旋转15°
 		var rotation = 0;
     	if(data.medianList.length > 14) rotation = -15;
    	
     	container.highcharts({
 			chart: {
 	            width: 753,
 	            height: 400,
 	            style: {
 	                fontFamily: '微软雅黑'
 	            }
 	        },
 			title: {
 				enabled: false,
 				text: ''
 			},
 			xAxis: {
 	            categories: [],
 	            title: {
 	                text: '户型',
 	                style: {
 	                    fontSize: '13pt'
 	                }
 	            },
 	            labels: {
 	           	 	rotation: rotation,
 					style: {
 						fontSize: '12px',
 						fontWeight: 'bold'
 					},
 					formatter: function() {
 						// 在坐标轴上用'平'代替'平米'
 	                    return this.value.substring(0,this.value.length-1);
 	                }
 				}
 			},
			
 			yAxis: {
 				title: {
 	                text: '价格',
 	                style: {
 	                	padding: '10px',
 	                    fontSize: '13pt'
 	                }
 				},
 	            labels: {
 	                overflow: 'justify',
 	                formatter: function() {
 	                    return this.value + suffix;
 	                }
 	            },
 	            // y轴刻度
 	            tickPositions: data.tickPositions
 			},
 			// 数据提示框
 			tooltip: {
 				crosshairs: true, // 显示十字准线
 				shared: true,	// 多个数据列共享一个数据提示框[散点图无法共享]
 				valueSuffix: suffix, 
 	            //headerFormat: '<b>一居42平米</b><br>',
 	            //pointFormat: '价格范围 111-222万<br>中位价150万' 
 	            style: {  // 提示框内容的样式
 		            color: 'black',
 		            padding: '10px',    //内边距
 		            fontSize: '10pt'
 		        },
 		       formatter: function () {
 			    	var minMax = this.points[0].series.userOptions.data;
 			    	var median = this.points[1].series.userOptions.data;
 			    	var index = this.x;
 			    	if(median[index][1]>0){
 	               		return "<b>"+minMax[index][0]+"</b><br>"+
 	               			"报价："+minMax[index][1]+" - "+minMax[index][2]+suffix+"<br>"+
 	               			"参考价："+ median[index][1]+suffix;
 	           		}else{
 	           			return "<b>"+minMax[index][0]+"</b><br>暂无报价";
 	           		}  
            		}
 			},
 			plotOptions: {
 	           series: {
 	               pointPadding: 0, //数据点之间的距离值
 	               groupPadding: 0, //分组之间的距离值
 	               borderWidth: 0,
 	               shadow: false,
 	               pointWidth:5 //柱子宽度
 	           }
 	       },
 	       legend: {
 	            symbolWidth: 5,
 	            floating: true,
 	            align: 'left',
 	            x: 800,
 	            y: -60,
 	            borderWidth: 1,
 	            backgroundColor: '#FFF'
 	        },
 			series: [{
 				name: '报价范围',
 				data: data.minMaxList,
 				type: 'columnrange',
 				color: Highcharts.getOptions().colors[0],
 				zIndex: 0
 			},{
 				name: '参考价',
 				data: data.medianList,
 	            type: 'spline',
 				zIndex: 1,
 				marker: {
 					fillColor: 'white',
 					lineWidth: 2,
 					lineColor: Highcharts.getOptions().colors[0],
 					radius: 5
				
 				}, 
 				lineWidth: 0 // 曲线图线段的粗线，设为0即可隐藏线段，从而只显示点
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

$(function() {
	
	
	
	addValidTag();
	getRentListForSameResidence();
	drawLayoutChart();
	createKnob();
	if(window.location.pathname.split("/").length > 5){
		// 记录用户进入租单页面的行为
		UserTrack.log(UserTrack.TRACK_TYPE_GOTO_RENT_PAGE, window.location.pathname.split("/")[5].split(".")[0].substring(1));
	}
	
	if($("#foodRandom").length) {
		showRandomMsg($("#foodRandom"), 1);
	}
	if($("#storeRandom").length) {
		showRandomMsg($("#storeRandom"), 2);
	}
	if($("#hospitalRandom").length) {
		showRandomMsg($("#hospitalRandom"), 3);
	}
});

var chartWidth=100;
var color = ['#444','#4ba5fb','#4EFB4B','#FB4B4E','#FFCC33'];

function createKnob(){
	$(".index").knob({
	    max: 100,
	    min: 0,
	    thickness: .10,
	    fgColor: color[0],
	    bgColor: '#eee',
	    width: chartWidth
	});
	$(".traffic,.hospital").knob({
	    max: 100,
	    min: 0,
	    thickness: .10,
	    fgColor: color[1],
	    bgColor: '#eee',
	    width: chartWidth
	});
	$(".edu").knob({
	    max: 100,
	    min: 0,
	    thickness: .10,
	    fgColor: color[2],
	    bgColor: '#eee',
	    width: chartWidth
	});
	$(".fitness").knob({
	    max: 100,
	    min: 0,
	    thickness: .10,
	    fgColor: color[3],
	    bgColor: '#eee',
	    width: chartWidth
	});
	$(".living,.funny").knob({
	    max: 100,
	    min: 0,
	    thickness: .10,
	    fgColor: color[4],
	    bgColor: '#eee',
	    width: chartWidth
	});
}

(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){"use strict";var t={},n=Math.max,r=Math.min;t.c={};t.c.d=e(document);t.c.t=function(e){return e.originalEvent.touches.length-1};t.o=function(){var n=this;this.o=null;this.$=null;this.i=null;this.g=null;this.v=null;this.cv=null;this.x=0;this.y=0;this.w=0;this.h=0;this.$c=null;this.c=null;this.t=0;this.isInit=false;this.fgColor=null;this.pColor=null;this.dH=null;this.cH=null;this.eH=null;this.rH=null;this.scale=1;this.relative=false;this.relativeWidth=false;this.relativeHeight=false;this.$div=null;this.run=function(){var t=function(e,t){var r;for(r in t){n.o[r]=t[r]}n._carve().init();n._configure()._draw()};if(this.$.data("kontroled"))return;this.$.data("kontroled",true);this.extend();this.o=e.extend({min:this.$.data("min")!==undefined?this.$.data("min"):0,max:this.$.data("max")!==undefined?this.$.data("max"):100,stopper:true,readOnly:this.$.data("readonly")||this.$.attr("readonly")==="readonly",cursor:this.$.data("cursor")===true&&30||this.$.data("cursor")||0,thickness:this.$.data("thickness")&&Math.max(Math.min(this.$.data("thickness"),1),.01)||.35,lineCap:this.$.data("linecap")||"butt",width:this.$.data("width")||200,height:this.$.data("height")||200,displayInput:this.$.data("displayinput")==null||this.$.data("displayinput"),displayPrevious:this.$.data("displayprevious"),fgColor:this.$.data("fgcolor")||"#87CEEB",inputColor:this.$.data("inputcolor"),font:this.$.data("font")||"Arial",fontWeight:this.$.data("font-weight")||"bold",inline:false,step:this.$.data("step")||1,rotation:this.$.data("rotation"),draw:null,change:null,cancel:null,release:null,format:function(e){return e},parse:function(e){return parseFloat(e)}},this.o);this.o.flip=this.o.rotation==="anticlockwise"||this.o.rotation==="acw";if(!this.o.inputColor){this.o.inputColor=this.o.fgColor}if(this.$.is("fieldset")){this.v={};this.i=this.$.find("input");this.i.each(function(t){var r=e(this);n.i[t]=r;n.v[t]=n.o.parse(r.val());r.bind("change blur",function(){var e={};e[t]=r.val();n.val(n._validate(e))})});this.$.find("legend").remove()}else{this.i=this.$;this.v=this.o.parse(this.$.val());this.v===""&&(this.v=this.o.min);this.$.bind("change blur",function(){n.val(n._validate(n.o.parse(n.$.val())))})}!this.o.displayInput&&this.$.hide();this.$c=e(document.createElement("canvas")).attr({width:this.o.width,height:this.o.height});this.$div=e('<div style="'+(this.o.inline?"display:inline;":"")+"width:"+this.o.width+"px;height:"+this.o.height+"px;"+'"></div>');this.$.wrap(this.$div).before(this.$c);this.$div=this.$.parent();if(typeof G_vmlCanvasManager!=="undefined"){G_vmlCanvasManager.initElement(this.$c[0])}this.c=this.$c[0].getContext?this.$c[0].getContext("2d"):null;if(!this.c){throw{name:"CanvasNotSupportedException",message:"Canvas not supported. Please use excanvas on IE8.0.",toString:function(){return this.name+": "+this.message}}}this.scale=(window.devicePixelRatio||1)/(this.c.webkitBackingStorePixelRatio||this.c.mozBackingStorePixelRatio||this.c.msBackingStorePixelRatio||this.c.oBackingStorePixelRatio||this.c.backingStorePixelRatio||1);this.relativeWidth=this.o.width%1!==0&&this.o.width.indexOf("%");this.relativeHeight=this.o.height%1!==0&&this.o.height.indexOf("%");this.relative=this.relativeWidth||this.relativeHeight;this._carve();if(this.v instanceof Object){this.cv={};this.copy(this.v,this.cv)}else{this.cv=this.v}this.$.bind("configure",t).parent().bind("configure",t);this._listen()._configure()._xy().init();this.isInit=true;this.$.val(this.o.format(this.v));this._draw();return this};this._carve=function(){if(this.relative){var e=this.relativeWidth?this.$div.parent().width()*parseInt(this.o.width)/100:this.$div.parent().width(),t=this.relativeHeight?this.$div.parent().height()*parseInt(this.o.height)/100:this.$div.parent().height();this.w=this.h=Math.min(e,t)}else{this.w=this.o.width;this.h=this.o.height}this.$div.css({width:this.w+"px",height:this.h+"px"});this.$c.attr({width:this.w,height:this.h});if(this.scale!==1){this.$c[0].width=this.$c[0].width*this.scale;this.$c[0].height=this.$c[0].height*this.scale;this.$c.width(this.w);this.$c.height(this.h)}return this};this._draw=function(){var e=true;n.g=n.c;n.clear();n.dH&&(e=n.dH());e!==false&&n.draw()};this._touch=function(e){var r=function(e){var t=n.xy2val(e.originalEvent.touches[n.t].pageX,e.originalEvent.touches[n.t].pageY);if(t==n.cv)return;if(n.cH&&n.cH(t)===false)return;n.change(n._validate(t));n._draw()};this.t=t.c.t(e);r(e);t.c.d.bind("touchmove.k",r).bind("touchend.k",function(){t.c.d.unbind("touchmove.k touchend.k");n.val(n.cv)});return this};this._mouse=function(e){var r=function(e){var t=n.xy2val(e.pageX,e.pageY);if(t==n.cv)return;if(n.cH&&n.cH(t)===false)return;n.change(n._validate(t));n._draw()};r(e);t.c.d.bind("mousemove.k",r).bind("keyup.k",function(e){if(e.keyCode===27){t.c.d.unbind("mouseup.k mousemove.k keyup.k");if(n.eH&&n.eH()===false)return;n.cancel()}}).bind("mouseup.k",function(e){t.c.d.unbind("mousemove.k mouseup.k keyup.k");n.val(n.cv)});return this};this._xy=function(){var e=this.$c.offset();this.x=e.left;this.y=e.top;return this};this._listen=function(){if(!this.o.readOnly){this.$c.bind("mousedown",function(e){e.preventDefault();n._xy()._mouse(e)}).bind("touchstart",function(e){e.preventDefault();n._xy()._touch(e)});this.listen()}else{this.$.attr("readonly","readonly")}if(this.relative){e(window).resize(function(){n._carve().init();n._draw()})}return this};this._configure=function(){if(this.o.draw)this.dH=this.o.draw;if(this.o.change)this.cH=this.o.change;if(this.o.cancel)this.eH=this.o.cancel;if(this.o.release)this.rH=this.o.release;if(this.o.displayPrevious){this.pColor=this.h2rgba(this.o.fgColor,"0.4");this.fgColor=this.h2rgba(this.o.fgColor,"0.6")}else{this.fgColor=this.o.fgColor}return this};this._clear=function(){this.$c[0].width=this.$c[0].width};this._validate=function(e){var t=~~((e<0?-.5:.5)+e/this.o.step)*this.o.step;return Math.round(t*100)/100};this.listen=function(){};this.extend=function(){};this.init=function(){};this.change=function(e){};this.val=function(e){};this.xy2val=function(e,t){};this.draw=function(){};this.clear=function(){this._clear()};this.h2rgba=function(e,t){var n;e=e.substring(1,7);n=[parseInt(e.substring(0,2),16),parseInt(e.substring(2,4),16),parseInt(e.substring(4,6),16)];return"rgba("+n[0]+","+n[1]+","+n[2]+","+t+")"};this.copy=function(e,t){for(var n in e){t[n]=e[n]}}};t.Dial=function(){t.o.call(this);this.startAngle=null;this.xy=null;this.radius=null;this.lineWidth=null;this.cursorExt=null;this.w2=null;this.PI2=2*Math.PI;this.extend=function(){this.o=e.extend({bgColor:this.$.data("bgcolor")||"#EEEEEE",angleOffset:this.$.data("angleoffset")||0,angleArc:this.$.data("anglearc")||360,inline:true},this.o)};this.val=function(e,t){if(null!=e){e=this.o.parse(e);if(t!==false&&e!=this.v&&this.rH&&this.rH(e)===false){return}this.cv=this.o.stopper?n(r(e,this.o.max),this.o.min):e;this.v=this.cv;this.$.val(this.o.format(this.v));this._draw()}else{return this.v}};this.xy2val=function(e,t){var i,s;i=Math.atan2(e-(this.x+this.w2),-(t-this.y-this.w2))-this.angleOffset;if(this.o.flip){i=this.angleArc-i-this.PI2}if(this.angleArc!=this.PI2&&i<0&&i>-.5){i=0}else if(i<0){i+=this.PI2}s=i*(this.o.max-this.o.min)/this.angleArc+this.o.min;this.o.stopper&&(s=n(r(s,this.o.max),this.o.min));return s};this.listen=function(){var t=this,i,s,o=function(e){e.preventDefault();var o=e.originalEvent,u=o.detail||o.wheelDeltaX,a=o.detail||o.wheelDeltaY,f=t._validate(t.o.parse(t.$.val()))+(u>0||a>0?t.o.step:u<0||a<0?-t.o.step:0);f=n(r(f,t.o.max),t.o.min);t.val(f,false);if(t.rH){clearTimeout(i);i=setTimeout(function(){t.rH(f);i=null},100);if(!s){s=setTimeout(function(){if(i)t.rH(f);s=null},200)}}},u,a,f=1,l={37:-t.o.step,38:t.o.step,39:t.o.step,40:-t.o.step};this.$.bind("keydown",function(i){var s=i.keyCode;if(s>=96&&s<=105){s=i.keyCode=s-48}u=parseInt(String.fromCharCode(s));if(isNaN(u)){s!==13&&s!==8&&s!==9&&s!==189&&(s!==190||t.$.val().match(/\./))&&i.preventDefault();if(e.inArray(s,[37,38,39,40])>-1){i.preventDefault();var o=t.o.parse(t.$.val())+l[s]*f;t.o.stopper&&(o=n(r(o,t.o.max),t.o.min));t.change(t._validate(o));t._draw();a=window.setTimeout(function(){f*=2},30)}}}).bind("keyup",function(e){if(isNaN(u)){if(a){window.clearTimeout(a);a=null;f=1;t.val(t.$.val())}}else{t.$.val()>t.o.max&&t.$.val(t.o.max)||t.$.val()<t.o.min&&t.$.val(t.o.min)}});this.$c.bind("mousewheel DOMMouseScroll",o);this.$.bind("mousewheel DOMMouseScroll",o)};this.init=function(){if(this.v<this.o.min||this.v>this.o.max){this.v=this.o.min}this.$.val(this.v);this.w2=this.w/2;this.cursorExt=this.o.cursor/100;this.xy=this.w2*this.scale;this.lineWidth=this.xy*this.o.thickness;this.lineCap=this.o.lineCap;this.radius=this.xy-this.lineWidth/2;this.o.angleOffset&&(this.o.angleOffset=isNaN(this.o.angleOffset)?0:this.o.angleOffset);this.o.angleArc&&(this.o.angleArc=isNaN(this.o.angleArc)?this.PI2:this.o.angleArc);this.angleOffset=this.o.angleOffset*Math.PI/180;this.angleArc=this.o.angleArc*Math.PI/180;this.startAngle=1.5*Math.PI+this.angleOffset;this.endAngle=1.5*Math.PI+this.angleOffset+this.angleArc;var e=n(String(Math.abs(this.o.max)).length,String(Math.abs(this.o.min)).length,2)+2;this.o.displayInput&&this.i.css({width:(this.w/2+4>>0)+"px",height:(this.w/3>>0)+"px",position:"absolute","vertical-align":"middle","margin-top":(this.w/3>>0)+"px","margin-left":"-"+(this.w*3/4+2>>0)+"px",border:0,background:"none",font:this.o.fontWeight+" "+(this.w/e>>0)+"px "+this.o.font,"text-align":"center",color:this.o.inputColor||this.o.fgColor,padding:"0px","-webkit-appearance":"none"})||this.i.css({width:"0px",visibility:"hidden"})};this.change=function(e){this.cv=e;this.$.val(this.o.format(e))};this.angle=function(e){return(e-this.o.min)*this.angleArc/(this.o.max-this.o.min)};this.arc=function(e){var t,n;e=this.angle(e);if(this.o.flip){t=this.endAngle+1e-5;n=t-e-1e-5}else{t=this.startAngle-1e-5;n=t+e+1e-5}this.o.cursor&&(t=n-this.cursorExt)&&(n=n+this.cursorExt);return{s:t,e:n,d:this.o.flip&&!this.o.cursor}};this.draw=function(){var e=this.g,t=this.arc(this.cv),n,r=1;e.lineWidth=this.lineWidth;e.lineCap=this.lineCap;if(this.o.bgColor!=="none"){e.beginPath();e.strokeStyle=this.o.bgColor;e.arc(this.xy,this.xy,this.radius,this.endAngle-1e-5,this.startAngle+1e-5,true);e.stroke()}if(this.o.displayPrevious){n=this.arc(this.v);e.beginPath();e.strokeStyle=this.pColor;e.arc(this.xy,this.xy,this.radius,n.s,n.e,n.d);e.stroke();r=this.cv==this.v}e.beginPath();e.strokeStyle=r?this.o.fgColor:this.fgColor;e.arc(this.xy,this.xy,this.radius,t.s,t.e,t.d);e.stroke()};this.cancel=function(){this.val(this.v)}};e.fn.dial=e.fn.knob=function(n){return this.each(function(){var r=new t.Dial;r.o=n;r.$=e(this);r.run()}).parent()}})



jQuery.extend({
  st: function(s1,s2,op) {
    var sl={};//暴漏给外面的对象
	var set={current:0,//当前显示元素的索引,取值范围0-(len-1)
			 enumber:0,//元素个数
			 time:2.5,//切换时间间隔
			 on:'on',//控制层 css类名
			 auto:1,//是否自动切换
			 mode:'normal',//切换模式 normal:普通;fade:淡入淡出;slide:滑动;
			 switchMode:'mouseover',//鼠标切换方式，mouseover鼠标经过时切换，click单击切换
			 Cmouseover:'none'//当鼠标经过内容区{s2}时，none:无动作，wait：等待
			 
			};
	
	//切换模式 normal:普通;fade:淡入淡出;slide:滑动;
 	sl=$.extend({'last':0},set,op);
	
	var $e1=$(s1);//控制端
	var $e2=$(s2);//内容 在slide模式下 $e2为“内容容器层”

	var len=(sl.mode=='slide')?$e2.find('li').length:$e2.length;//元素个数
	var height=$e2.find('li').height();//展现元素的高度，在切换模式为slide时要用到
 	var timer;
    
    //自动切换
   	var start=function(){
  		timer=setInterval(function(){  toggle();},sl.time*1000);	
	};
    //停止自动切换
    var clear=function(){
        clearInterval(timer);
	};
    //切换到指定位置，可以是 索引、'next'、'prev'
	var toggle=function(to){
                sl.last =sl.current;
				if(to==null||to=='next'){
					sl.current++;
				}
                else if(to=='prev'){
                    sl.current--;
                }
                else{//如果to不为空，则切换到指定位置
					sl.current=to;
				}
                
				if( sl.current>= len){//如果current越界了，则重置为0
					sl.current=0;	
				}
                if( sl.current<0){
                    sl.current=len-1;	
                }
                if(sl.last== sl.current){
                    return ;
                }
				//console.log(sl.current);
				$e1.removeClass(sl.on);
				$e1.eq(sl.current).addClass(sl.on);
				switch(sl.mode){
					case 'fade':
						$e2.hide().stop(false,true);
						$e2.eq(sl.last).show().fadeOut(1500); 
				 		$e2.eq(sl.current).fadeIn(1500);
						break;
					case 'slide':
				  		$e2.stop();
						//在图片未加载之前，chrome浏览器下图片的高宽为0，若img外部的li有又没有设置高度的话，此时li的高也是0。
						height=!height?$e2.find('li').height():height;//若给img外面的li设上了高，则可以删去此行
				  		$e2.animate({ top:-sl.current*(height) }, { 'duration': "slow" }); 
						break;
                    case 'slide2':
                        //$e2.stop();
                        var z_index=1;
                        height=!height?$e2.height():height;//若给img外面的li设上了高，则可以删去此行
                        $e2.css({'z-index':z_index});
                        $e2.eq(sl.last).css({'z-index':z_index+1});
                        $e2.eq(sl.current).css({'top':-height,'z-index':z_index+2}).animate({ top:0 }, { 'duration': "slow" });
                        break;
					default:
						$e2.hide(); 
						$e2.eq(sl.current).show();
				} 
	};
 
    //设置控制层切换控制方式
	$e1.bind(sl.switchMode,function(){
        clear();
        var to=$(this).index();	
        toggle(to);
 	});
	if(sl.auto){//如果自动切换
        $e1.mouseout(function(){ clear(); start()});
        start();
	}
	if(sl.Cmouseover=='wait'){
		$e2.bind({
		'mouseover':function(){clear(); },
		'mouseout':function(){clear(); start();}
		});
	}
    
    sobj={
        'slide_to':function(to){
            clear();
            toggle(to);
            if(sl.auto){
                start();
            }
        },
        'stop':function(){//停止轮播
            clear();
            sl.auto=0;
        },
        'start':function(){
            clear();
            sl.auto=1;
            start();
        }
    }
    return sobj;
  }//function end
		 
}); 
