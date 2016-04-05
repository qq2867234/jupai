

$(function() {
	$('.flexslider_img').flexslider({
        animation: "fade"
    });
//	$("#getContact").click(function() {
//		if(checkLoginStatus()){
//			contactMe();
//    	} else {
//    		$('#login').modal();
//    	}
//	});
	
	if($(".similarHouse ul li").length == 0) {
		$(".similarHouse").remove();
	}
	
	$("#processAnalysis").click(function() {
    	//记录点击查看联系方式的次数
//    	UserAnalysis.eventAnalysis("用户操作", "开启租房过程");
//    	UserTrack.log(UserTrack.TRACK_START_PROCESS, $("#listId").val());
    	if(checkLoginStatus()){
    		startOneProgress();
    	} else {
    		window.location.href="/Login.action?goToLoginPage&redirectUrl="+encodeURIComponent(document.location.pathname);
    	}
    });
	
	$("#surMore").bind("tap", function() {
		$(".houseInfo_surround_circle.hide").show();
		$(this).hide();
	});

    createKnob();

//    drawLayoutChart();

});

function checkLoginStatus() {
	var isLogin = false;
	$.ajax({
		type: "post",
		url:"/UserCenterController.action?checkLoginStatus",
		dataType:"json",
		async: false,
		success:function(data, status) {
			if(data.status == "y") isLogin = true;
			else isLogin = false;
		}
	});
	return isLogin;
}

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
function contactMe() {
	$.ajax({
		type: "post",
		url:"/RentListOperator.action?contactMe",
		data:{listId:$("#listId").val()},
		dataType:"json",
		success:function(data, status) {
			if(data.status == "y") {
				alert("我们将您的信息记录下来，稍后会有专人联系您");
			} 
		}
	});
}

var chartWidth=60;
var color = ['#444','#4ba5fb','#4EFB4B','#FB4B4E','#FFCC33'];
function createKnob(){
    $(".index").knob({
        max: 100,
        min: 0,
        thickness: .12,
        fgColor: color[0],
        bgColor: '#eee',
        width: chartWidth
    });
    $(".traffic,.hospital").knob({
        max: 100,
        min: 0,
        thickness: .12,
        fgColor: color[1],
        bgColor: '#eee',
        width: chartWidth
    });
    $(".edu").knob({
        max: 100,
        min: 0,
        thickness: .12,
        fgColor: color[2],
        bgColor: '#eee',
        width: chartWidth
    });
    $(".fitness").knob({
        max: 100,
        min: 0,
        thickness: .12,
        fgColor: color[3],
        bgColor: '#eee',
        width: chartWidth
    });
    $(".living,.funny").knob({
        max: 100,
        min: 0,
        thickness: .12,
        fgColor: color[4],
        bgColor: '#eee',
        width: chartWidth
    });
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
            width: 480,
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


(function(a){a.flexslider=function(f,q){var c=a(f);c.vars=a.extend({},a.flexslider.defaults,q);var j=c.vars.namespace,e=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,k=(("ontouchstart" in window)||e||window.DocumentTouch&&document instanceof DocumentTouch)&&c.vars.touch,d="click touchend MSPointerUp keyup",b="",p,i=c.vars.direction==="vertical",l=c.vars.reverse,o=(c.vars.itemWidth>0),h=c.vars.animation==="fade",m=c.vars.asNavFor!=="",g={},n=true;a.data(f,"flexslider",c);g={init:function(){c.animating=false;c.currentSlide=parseInt((c.vars.startAt?c.vars.startAt:0),10);if(isNaN(c.currentSlide)){c.currentSlide=0}c.animatingTo=c.currentSlide;c.atEnd=(c.currentSlide===0||c.currentSlide===c.last);c.containerSelector=c.vars.selector.substr(0,c.vars.selector.search(" "));c.slides=a(c.vars.selector,c);c.container=a(c.containerSelector,c);c.count=c.slides.length;c.syncExists=a(c.vars.sync).length>0;if(c.vars.animation==="slide"){c.vars.animation="swing"}c.prop=(i)?"top":"marginLeft";c.args={};c.manualPause=false;c.stopped=false;c.started=false;c.startTimeout=null;c.transitions=!c.vars.video&&!h&&c.vars.useCSS&&(function(){var t=document.createElement("div"),s=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var r in s){if(t.style[s[r]]!==undefined){c.pfx=s[r].replace("Perspective","").toLowerCase();c.prop="-"+c.pfx+"-transform";return true}}return false}());c.ensureAnimationEnd="";if(c.vars.controlsContainer!==""){c.controlsContainer=a(c.vars.controlsContainer).length>0&&a(c.vars.controlsContainer)}if(c.vars.manualControls!==""){c.manualControls=a(c.vars.manualControls).length>0&&a(c.vars.manualControls)}if(c.vars.randomize){c.slides.sort(function(){return(Math.round(Math.random())-0.5)});c.container.empty().append(c.slides)}c.doMath();c.setup("init");if(c.vars.controlNav){g.controlNav.setup()}if(c.vars.directionNav){g.directionNav.setup()}if(c.vars.keyboard&&(a(c.containerSelector).length===1||c.vars.multipleKeyboard)){a(document).bind("keyup",function(s){var r=s.keyCode;if(!c.animating&&(r===39||r===37)){var t=(r===39)?c.getTarget("next"):(r===37)?c.getTarget("prev"):false;c.flexAnimate(t,c.vars.pauseOnAction)}})}if(c.vars.mousewheel){c.bind("mousewheel",function(t,v,s,r){t.preventDefault();var u=(v<0)?c.getTarget("next"):c.getTarget("prev");c.flexAnimate(u,c.vars.pauseOnAction)})}if(c.vars.pausePlay){g.pausePlay.setup()}if(c.vars.slideshow&&c.vars.pauseInvisible){g.pauseInvisible.init()}if(c.vars.slideshow){if(c.vars.pauseOnHover){c.hover(function(){if(!c.manualPlay&&!c.manualPause){c.pause()}},function(){if(!c.manualPause&&!c.manualPlay&&!c.stopped){c.play()}})}if(!c.vars.pauseInvisible||!g.pauseInvisible.isHidden()){(c.vars.initDelay>0)?c.startTimeout=setTimeout(c.play,c.vars.initDelay):c.play()}}if(m){g.asNav.setup()}if(k&&c.vars.touch){g.touch()}if(!h||(h&&c.vars.smoothHeight)){a(window).bind("resize orientationchange focus",g.resize)}c.find("img").attr("draggable","false");setTimeout(function(){c.vars.start(c)},200)},asNav:{setup:function(){c.asNav=true;c.animatingTo=Math.floor(c.currentSlide/c.move);c.currentItem=c.currentSlide;c.slides.removeClass(j+"active-slide").eq(c.currentItem).addClass(j+"active-slide");if(!e){c.slides.on(d,function(t){t.preventDefault();var s=a(this),r=s.index();var u=s.offset().left-a(c).scrollLeft();if(u<=0&&s.hasClass(j+"active-slide")){c.flexAnimate(c.getTarget("prev"),true)}else{if(!a(c.vars.asNavFor).data("flexslider").animating&&!s.hasClass(j+"active-slide")){c.direction=(c.currentItem<r)?"next":"prev";c.flexAnimate(r,c.vars.pauseOnAction,false,true,true)}}})}else{f._slider=c;c.slides.each(function(){var r=this;r._gesture=new MSGesture();r._gesture.target=r;r.addEventListener("MSPointerDown",function(s){s.preventDefault();if(s.currentTarget._gesture){s.currentTarget._gesture.addPointer(s.pointerId)}},false);r.addEventListener("MSGestureTap",function(u){u.preventDefault();var t=a(this),s=t.index();if(!a(c.vars.asNavFor).data("flexslider").animating&&!t.hasClass("active")){c.direction=(c.currentItem<s)?"next":"prev";c.flexAnimate(s,c.vars.pauseOnAction,false,true,true)}})})}}},controlNav:{setup:function(){if(!c.manualControls){g.controlNav.setupPaging()}else{g.controlNav.setupManual()}},setupPaging:function(){var u=(c.vars.controlNav==="thumbnails")?"control-thumbs":"control-paging",s=1,v,r;c.controlNavScaffold=a('<ol class="'+j+"control-nav "+j+u+'"></ol>');if(c.pagingCount>1){for(var t=0;t<c.pagingCount;t++){r=c.slides.eq(t);v=(c.vars.controlNav==="thumbnails")?'<img src="'+r.attr("data-thumb")+'"/>':"<a>"+s+"</a>";if("thumbnails"===c.vars.controlNav&&true===c.vars.thumbCaptions){var w=r.attr("data-thumbcaption");if(""!=w&&undefined!=w){v+='<span class="'+j+'caption">'+w+"</span>"}}c.controlNavScaffold.append("<li>"+v+"</li>");s++}}(c.controlsContainer)?a(c.controlsContainer).append(c.controlNavScaffold):c.append(c.controlNavScaffold);g.controlNav.set();g.controlNav.active();c.controlNavScaffold.delegate("a, img",d,function(x){x.preventDefault();if(b===""||b===x.type){var z=a(this),y=c.controlNav.index(z);if(!z.hasClass(j+"active")){c.direction=(y>c.currentSlide)?"next":"prev";c.flexAnimate(y,c.vars.pauseOnAction)}}if(b===""){b=x.type}g.setToClearWatchedEvent()})},setupManual:function(){c.controlNav=c.manualControls;g.controlNav.active();c.controlNav.bind(d,function(r){r.preventDefault();if(b===""||b===r.type){var t=a(this),s=c.controlNav.index(t);if(!t.hasClass(j+"active")){(s>c.currentSlide)?c.direction="next":c.direction="prev";c.flexAnimate(s,c.vars.pauseOnAction)}}if(b===""){b=r.type}g.setToClearWatchedEvent()})},set:function(){var r=(c.vars.controlNav==="thumbnails")?"img":"a";c.controlNav=a("."+j+"control-nav li "+r,(c.controlsContainer)?c.controlsContainer:c)},active:function(){c.controlNav.removeClass(j+"active").eq(c.animatingTo).addClass(j+"active")},update:function(r,s){if(c.pagingCount>1&&r==="add"){c.controlNavScaffold.append(a("<li><a>"+c.count+"</a></li>"))}else{if(c.pagingCount===1){c.controlNavScaffold.find("li").remove()}else{c.controlNav.eq(s).closest("li").remove()}}g.controlNav.set();(c.pagingCount>1&&c.pagingCount!==c.controlNav.length)?c.update(s,r):g.controlNav.active()}},directionNav:{setup:function(){var r=a('<ul class="'+j+'direction-nav"><li><a class="'+j+'prev" href="#">'+c.vars.prevText+'</a></li><li><a class="'+j+'next" href="#">'+c.vars.nextText+"</a></li></ul>");if(c.controlsContainer){a(c.controlsContainer).append(r);c.directionNav=a("."+j+"direction-nav li a",c.controlsContainer)}else{c.append(r);c.directionNav=a("."+j+"direction-nav li a",c)}g.directionNav.update();c.directionNav.bind(d,function(s){s.preventDefault();var t;if(b===""||b===s.type){t=(a(this).hasClass(j+"next"))?c.getTarget("next"):c.getTarget("prev");c.flexAnimate(t,c.vars.pauseOnAction)}if(b===""){b=s.type}g.setToClearWatchedEvent()})},update:function(){var r=j+"disabled";if(c.pagingCount===1){c.directionNav.addClass(r).attr("tabindex","-1")}else{if(!c.vars.animationLoop){if(c.animatingTo===0){c.directionNav.removeClass(r).filter("."+j+"prev").addClass(r).attr("tabindex","-1")}else{if(c.animatingTo===c.last){c.directionNav.removeClass(r).filter("."+j+"next").addClass(r).attr("tabindex","-1")}else{c.directionNav.removeClass(r).removeAttr("tabindex")}}}else{c.directionNav.removeClass(r).removeAttr("tabindex")}}}},pausePlay:{setup:function(){var r=a('<div class="'+j+'pauseplay"><a></a></div>');if(c.controlsContainer){c.controlsContainer.append(r);c.pausePlay=a("."+j+"pauseplay a",c.controlsContainer)}else{c.append(r);c.pausePlay=a("."+j+"pauseplay a",c)}g.pausePlay.update((c.vars.slideshow)?j+"pause":j+"play");c.pausePlay.bind(d,function(s){s.preventDefault();if(b===""||b===s.type){if(a(this).hasClass(j+"pause")){c.manualPause=true;c.manualPlay=false;c.pause()}else{c.manualPause=false;c.manualPlay=true;c.play()}}if(b===""){b=s.type}g.setToClearWatchedEvent()})},update:function(r){(r==="play")?c.pausePlay.removeClass(j+"pause").addClass(j+"play").html(c.vars.playText):c.pausePlay.removeClass(j+"play").addClass(j+"pause").html(c.vars.pauseText)}},touch:function(){var C,z,x,D,G,E,B=false,u=0,t=0,w=0;if(!e){f.addEventListener("touchstart",y,false);function y(H){if(c.animating){H.preventDefault()}else{if((window.navigator.msPointerEnabled)||H.touches.length===1){c.pause();D=(i)?c.h:c.w;E=Number(new Date());u=H.touches[0].pageX;t=H.touches[0].pageY;x=(o&&l&&c.animatingTo===c.last)?0:(o&&l)?c.limit-(((c.itemW+c.vars.itemMargin)*c.move)*c.animatingTo):(o&&c.currentSlide===c.last)?c.limit:(o)?((c.itemW+c.vars.itemMargin)*c.move)*c.currentSlide:(l)?(c.last-c.currentSlide+c.cloneOffset)*D:(c.currentSlide+c.cloneOffset)*D;C=(i)?t:u;z=(i)?u:t;f.addEventListener("touchmove",s,false);f.addEventListener("touchend",F,false)}}}function s(H){u=H.touches[0].pageX;t=H.touches[0].pageY;G=(i)?C-t:C-u;B=(i)?(Math.abs(G)<Math.abs(u-z)):(Math.abs(G)<Math.abs(t-z));var I=500;if(!B||Number(new Date())-E>I){H.preventDefault();if(!h&&c.transitions){if(!c.vars.animationLoop){G=G/((c.currentSlide===0&&G<0||c.currentSlide===c.last&&G>0)?(Math.abs(G)/D+2):1)}c.setProps(x+G,"setTouch")}}}function F(J){f.removeEventListener("touchmove",s,false);if(c.animatingTo===c.currentSlide&&!B&&!(G===null)){var I=(l)?-G:G,H=(I>0)?c.getTarget("next"):c.getTarget("prev");if(c.canAdvance(H)&&(Number(new Date())-E<550&&Math.abs(I)>50||Math.abs(I)>D/2)){c.flexAnimate(H,c.vars.pauseOnAction)}else{if(!h){c.flexAnimate(c.currentSlide,c.vars.pauseOnAction,true)}}}f.removeEventListener("touchend",F,false);C=null;z=null;G=null;x=null}}else{f.style.msTouchAction="none";f._gesture=new MSGesture();f._gesture.target=f;f.addEventListener("MSPointerDown",r,false);f._slider=c;f.addEventListener("MSGestureChange",A,false);f.addEventListener("MSGestureEnd",v,false);function r(H){H.stopPropagation();if(c.animating){H.preventDefault()}else{c.pause();f._gesture.addPointer(H.pointerId);w=0;D=(i)?c.h:c.w;E=Number(new Date());x=(o&&l&&c.animatingTo===c.last)?0:(o&&l)?c.limit-(((c.itemW+c.vars.itemMargin)*c.move)*c.animatingTo):(o&&c.currentSlide===c.last)?c.limit:(o)?((c.itemW+c.vars.itemMargin)*c.move)*c.currentSlide:(l)?(c.last-c.currentSlide+c.cloneOffset)*D:(c.currentSlide+c.cloneOffset)*D}}function A(K){K.stopPropagation();var J=K.target._slider;if(!J){return}var I=-K.translationX,H=-K.translationY;w=w+((i)?H:I);G=w;B=(i)?(Math.abs(w)<Math.abs(-I)):(Math.abs(w)<Math.abs(-H));if(K.detail===K.MSGESTURE_FLAG_INERTIA){setImmediate(function(){f._gesture.stop()});return}if(!B||Number(new Date())-E>500){K.preventDefault();if(!h&&J.transitions){if(!J.vars.animationLoop){G=w/((J.currentSlide===0&&w<0||J.currentSlide===J.last&&w>0)?(Math.abs(w)/D+2):1)}J.setProps(x+G,"setTouch")}}}function v(K){K.stopPropagation();var H=K.target._slider;if(!H){return}if(H.animatingTo===H.currentSlide&&!B&&!(G===null)){var J=(l)?-G:G,I=(J>0)?H.getTarget("next"):H.getTarget("prev");if(H.canAdvance(I)&&(Number(new Date())-E<550&&Math.abs(J)>50||Math.abs(J)>D/2)){H.flexAnimate(I,H.vars.pauseOnAction)}else{if(!h){H.flexAnimate(H.currentSlide,H.vars.pauseOnAction,true)}}}C=null;z=null;G=null;x=null;w=0}}},resize:function(){if(!c.animating&&c.is(":visible")){if(!o){c.doMath()}if(h){g.smoothHeight()}else{if(o){c.slides.width(c.computedW);c.update(c.pagingCount);c.setProps()}else{if(i){c.viewport.height(c.h);c.setProps(c.h,"setTotal")}else{if(c.vars.smoothHeight){g.smoothHeight()}c.newSlides.width(c.computedW);c.setProps(c.computedW,"setTotal")}}}}},smoothHeight:function(r){if(!i||h){var s=(h)?c:c.viewport;(r)?s.animate({"height":c.slides.eq(c.animatingTo).height()},r):s.height(c.slides.eq(c.animatingTo).height())}},sync:function(r){var t=a(c.vars.sync).data("flexslider"),s=c.animatingTo;switch(r){case"animate":t.flexAnimate(s,c.vars.pauseOnAction,false,true);break;case"play":if(!t.playing&&!t.asNav){t.play()}break;case"pause":t.pause();break}},uniqueID:function(r){r.filter("[id]").add(r.find("[id]")).each(function(){var s=a(this);s.attr("id",s.attr("id")+"_clone")});return r},pauseInvisible:{visProp:null,init:function(){var t=["webkit","moz","ms","o"];if("hidden" in document){return"hidden"}for(var s=0;s<t.length;s++){if((t[s]+"Hidden") in document){g.pauseInvisible.visProp=t[s]+"Hidden"}}if(g.pauseInvisible.visProp){var r=g.pauseInvisible.visProp.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(r,function(){if(g.pauseInvisible.isHidden()){if(c.startTimeout){clearTimeout(c.startTimeout)}else{c.pause()}}else{if(c.started){c.play()}else{(c.vars.initDelay>0)?setTimeout(c.play,c.vars.initDelay):c.play()}}})}},isHidden:function(){return document[g.pauseInvisible.visProp]||false}},setToClearWatchedEvent:function(){clearTimeout(p);p=setTimeout(function(){b=""},3000)}};c.flexAnimate=function(z,A,t,v,w){if(!c.vars.animationLoop&&z!==c.currentSlide){c.direction=(z>c.currentSlide)?"next":"prev"}if(m&&c.pagingCount===1){c.direction=(c.currentItem<z)?"next":"prev"}if(!c.animating&&(c.canAdvance(z,w)||t)&&c.is(":visible")){if(m&&v){var s=a(c.vars.asNavFor).data("flexslider");c.atEnd=z===0||z===c.count-1;s.flexAnimate(z,true,false,true,w);c.direction=(c.currentItem<z)?"next":"prev";s.direction=c.direction;if(Math.ceil((z+1)/c.visible)-1!==c.currentSlide&&z!==0){c.currentItem=z;c.slides.removeClass(j+"active-slide").eq(z).addClass(j+"active-slide");z=Math.floor(z/c.visible)}else{c.currentItem=z;c.slides.removeClass(j+"active-slide").eq(z).addClass(j+"active-slide");return false}}c.animating=true;c.animatingTo=z;if(A){c.pause()}c.vars.before(c);if(c.syncExists&&!w){g.sync("animate")}if(c.vars.controlNav){g.controlNav.active()}if(!o){c.slides.removeClass(j+"active-slide").eq(z).addClass(j+"active-slide")}c.atEnd=z===0||z===c.last;if(c.vars.directionNav){g.directionNav.update()}if(z===c.last){c.vars.end(c);if(!c.vars.animationLoop){c.pause()}}if(!h){var y=(i)?c.slides.filter(":first").height():c.computedW,x,u,r;if(o){x=c.vars.itemMargin;r=((c.itemW+x)*c.move)*c.animatingTo;u=(r>c.limit&&c.visible!==1)?c.limit:r}else{if(c.currentSlide===0&&z===c.count-1&&c.vars.animationLoop&&c.direction!=="next"){u=(l)?(c.count+c.cloneOffset)*y:0}else{if(c.currentSlide===c.last&&z===0&&c.vars.animationLoop&&c.direction!=="prev"){u=(l)?0:(c.count+1)*y}else{u=(l)?((c.count-1)-z+c.cloneOffset)*y:(z+c.cloneOffset)*y}}}c.setProps(u,"",c.vars.animationSpeed);if(c.transitions){if(!c.vars.animationLoop||!c.atEnd){c.animating=false;c.currentSlide=c.animatingTo}c.container.unbind("webkitTransitionEnd transitionend");c.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(c.ensureAnimationEnd);c.wrapup(y)});clearTimeout(c.ensureAnimationEnd);c.ensureAnimationEnd=setTimeout(function(){c.wrapup(y)},c.vars.animationSpeed+100)}else{c.container.animate(c.args,c.vars.animationSpeed,c.vars.easing,function(){c.wrapup(y)})}}else{if(!k){c.slides.eq(c.currentSlide).css({"zIndex":1}).animate({"opacity":0},c.vars.animationSpeed,c.vars.easing);c.slides.eq(z).css({"zIndex":2}).animate({"opacity":1},c.vars.animationSpeed,c.vars.easing,c.wrapup)}else{c.slides.eq(c.currentSlide).css({"opacity":0,"zIndex":1});c.slides.eq(z).css({"opacity":1,"zIndex":2});c.wrapup(y)}}if(c.vars.smoothHeight){g.smoothHeight(c.vars.animationSpeed)}}};c.wrapup=function(r){if(!h&&!o){if(c.currentSlide===0&&c.animatingTo===c.last&&c.vars.animationLoop){c.setProps(r,"jumpEnd")}else{if(c.currentSlide===c.last&&c.animatingTo===0&&c.vars.animationLoop){c.setProps(r,"jumpStart")}}}c.animating=false;c.currentSlide=c.animatingTo;c.vars.after(c)};c.animateSlides=function(){if(!c.animating&&n){c.flexAnimate(c.getTarget("next"))}};c.pause=function(){clearInterval(c.animatedSlides);c.animatedSlides=null;c.playing=false;if(c.vars.pausePlay){g.pausePlay.update("play")}if(c.syncExists){g.sync("pause")}};c.play=function(){if(c.playing){clearInterval(c.animatedSlides)}c.animatedSlides=c.animatedSlides||setInterval(c.animateSlides,c.vars.slideshowSpeed);c.started=c.playing=true;if(c.vars.pausePlay){g.pausePlay.update("pause")}if(c.syncExists){g.sync("play")}};c.stop=function(){c.pause();c.stopped=true};c.canAdvance=function(t,r){var s=(m)?c.pagingCount-1:c.last;return(r)?true:(m&&c.currentItem===c.count-1&&t===0&&c.direction==="prev")?true:(m&&c.currentItem===0&&t===c.pagingCount-1&&c.direction!=="next")?false:(t===c.currentSlide&&!m)?false:(c.vars.animationLoop)?true:(c.atEnd&&c.currentSlide===0&&t===s&&c.direction!=="next")?false:(c.atEnd&&c.currentSlide===s&&t===0&&c.direction==="next")?false:true};c.getTarget=function(r){c.direction=r;if(r==="next"){return(c.currentSlide===c.last)?0:c.currentSlide+1}else{return(c.currentSlide===0)?c.last:c.currentSlide-1}};c.setProps=function(u,r,s){var t=(function(){var v=(u)?u:((c.itemW+c.vars.itemMargin)*c.move)*c.animatingTo,w=(function(){if(o){return(r==="setTouch")?u:(l&&c.animatingTo===c.last)?0:(l)?c.limit-(((c.itemW+c.vars.itemMargin)*c.move)*c.animatingTo):(c.animatingTo===c.last)?c.limit:v}else{switch(r){case"setTotal":return(l)?((c.count-1)-c.currentSlide+c.cloneOffset)*u:(c.currentSlide+c.cloneOffset)*u;case"setTouch":return(l)?u:u;case"jumpEnd":return(l)?u:c.count*u;case"jumpStart":return(l)?c.count*u:u;default:return u}}}());return(w*-1)+"px"}());if(c.transitions){t=(i)?"translate3d(0,"+t+",0)":"translate3d("+t+",0,0)";s=(s!==undefined)?(s/1000)+"s":"0s";c.container.css("-"+c.pfx+"-transition-duration",s);c.container.css("transition-duration",s)}c.args[c.prop]=t;if(c.transitions||s===undefined){c.container.css(c.args)}c.container.css("transform",t)};c.setup=function(s){if(!h){var t,r;if(s==="init"){c.viewport=a('<div class="'+j+'viewport"></div>').css({"overflow":"hidden","position":"relative"}).appendTo(c).append(c.container);c.cloneCount=0;c.cloneOffset=0;if(l){r=a.makeArray(c.slides).reverse();c.slides=a(r);c.container.empty().append(c.slides)}}if(c.vars.animationLoop&&!o){c.cloneCount=2;c.cloneOffset=1;if(s!=="init"){c.container.find(".clone").remove()}c.container.append(g.uniqueID(c.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(g.uniqueID(c.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))}c.newSlides=a(c.vars.selector,c);t=(l)?c.count-1-c.currentSlide+c.cloneOffset:c.currentSlide+c.cloneOffset;if(i&&!o){c.container.height((c.count+c.cloneCount)*200+"%").css("position","absolute").width("100%");setTimeout(function(){c.newSlides.css({"display":"block"});c.doMath();c.viewport.height(c.h);c.setProps(t*c.h,"init")},(s==="init")?100:0)}else{c.container.width((c.count+c.cloneCount)*200+"%");c.setProps(t*c.computedW,"init");setTimeout(function(){c.doMath();c.newSlides.css({"width":c.computedW,"float":"left","display":"block"});if(c.vars.smoothHeight){g.smoothHeight()}},(s==="init")?100:0)}}else{c.slides.css({"width":"100%","float":"left","marginRight":"-100%","position":"relative"});if(s==="init"){if(!k){if(c.vars.fadeFirstSlide==false){c.slides.css({"opacity":0,"display":"block","zIndex":1}).eq(c.currentSlide).css({"zIndex":2}).css({"opacity":1})}else{c.slides.css({"opacity":0,"display":"block","zIndex":1}).eq(c.currentSlide).css({"zIndex":2}).animate({"opacity":1},c.vars.animationSpeed,c.vars.easing)}}else{c.slides.css({"opacity":0,"display":"block","webkitTransition":"opacity "+c.vars.animationSpeed/1000+"s ease","zIndex":1}).eq(c.currentSlide).css({"opacity":1,"zIndex":2})}}if(c.vars.smoothHeight){g.smoothHeight()}}if(!o){c.slides.removeClass(j+"active-slide").eq(c.currentSlide).addClass(j+"active-slide")}c.vars.init(c)};c.doMath=function(){var r=c.slides.first(),u=c.vars.itemMargin,s=c.vars.minItems,t=c.vars.maxItems;c.w=(c.viewport===undefined)?c.width():c.viewport.width();c.h=r.height();c.boxPadding=r.outerWidth()-r.width();if(o){c.itemT=c.vars.itemWidth+u;c.minW=(s)?s*c.itemT:c.w;c.maxW=(t)?(t*c.itemT)-u:c.w;c.itemW=(c.minW>c.w)?(c.w-(u*(s-1)))/s:(c.maxW<c.w)?(c.w-(u*(t-1)))/t:(c.vars.itemWidth>c.w)?c.w:c.vars.itemWidth;c.visible=Math.floor(c.w/(c.itemW));c.move=(c.vars.move>0&&c.vars.move<c.visible)?c.vars.move:c.visible;c.pagingCount=Math.ceil(((c.count-c.visible)/c.move)+1);c.last=c.pagingCount-1;c.limit=(c.pagingCount===1)?0:(c.vars.itemWidth>c.w)?(c.itemW*(c.count-1))+(u*(c.count-1)):((c.itemW+u)*c.count)-c.w-u}else{c.itemW=c.w;c.pagingCount=c.count;c.last=c.count-1}c.computedW=c.itemW-c.boxPadding};c.update=function(s,r){c.doMath();if(!o){if(s<c.currentSlide){c.currentSlide+=1}else{if(s<=c.currentSlide&&s!==0){c.currentSlide-=1}}c.animatingTo=c.currentSlide}if(c.vars.controlNav&&!c.manualControls){if((r==="add"&&!o)||c.pagingCount>c.controlNav.length){g.controlNav.update("add")}else{if((r==="remove"&&!o)||c.pagingCount<c.controlNav.length){if(o&&c.currentSlide>c.last){c.currentSlide-=1;c.animatingTo-=1}g.controlNav.update("remove",c.last)}}}if(c.vars.directionNav){g.directionNav.update()}};c.addSlide=function(r,t){var s=a(r);c.count+=1;c.last=c.count-1;if(i&&l){(t!==undefined)?c.slides.eq(c.count-t).after(s):c.container.prepend(s)}else{(t!==undefined)?c.slides.eq(t).before(s):c.container.append(s)}c.update(t,"add");c.slides=a(c.vars.selector+":not(.clone)",c);c.setup();c.vars.added(c)};c.removeSlide=function(r){var s=(isNaN(r))?c.slides.index(a(r)):r;c.count-=1;c.last=c.count-1;if(isNaN(r)){a(r,c.slides).remove()}else{(i&&l)?c.slides.eq(c.last).remove():c.slides.eq(r).remove()}c.doMath();c.update(s,"remove");c.slides=a(c.vars.selector+":not(.clone)",c);c.setup();c.vars.removed(c)};g.init()};a(window).blur(function(b){focused=false}).focus(function(b){focused=true});a.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:false,animationLoop:true,smoothHeight:false,startAt:0,slideshow:true,slideshowSpeed:7000,animationSpeed:600,initDelay:0,randomize:false,fadeFirstSlide:true,thumbCaptions:false,pauseOnAction:true,pauseOnHover:false,pauseInvisible:true,useCSS:true,touch:true,video:false,controlNav:true,directionNav:true,prevText:"Previous",nextText:"Next",keyboard:true,multipleKeyboard:false,mousewheel:false,pausePlay:false,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:true,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}};a.fn.flexslider=function(b){if(b===undefined){b={}}if(typeof b==="object"){return this.each(function(){var f=a(this),d=(b.selector)?b.selector:".slides > li",e=f.find(d);if((e.length===1&&b.allowOneSlide===true)||e.length===0){e.fadeIn(400);if(b.start){b.start(f)}}else{if(f.data("flexslider")===undefined){new a.flexslider(this,b)}}})}else{var c=a(this).data("flexslider");switch(b){case"play":c.play();break;case"pause":c.pause();break;case"stop":c.stop();break;case"next":c.flexAnimate(c.getTarget("next"),true);break;case"prev":case"previous":c.flexAnimate(c.getTarget("prev"),true);break;default:if(typeof b==="number"){c.flexAnimate(b,true)}}}}})(jQuery);

(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){"use strict";var t={},n=Math.max,r=Math.min;t.c={};t.c.d=e(document);t.c.t=function(e){return e.originalEvent.touches.length-1};t.o=function(){var n=this;this.o=null;this.$=null;this.i=null;this.g=null;this.v=null;this.cv=null;this.x=0;this.y=0;this.w=0;this.h=0;this.$c=null;this.c=null;this.t=0;this.isInit=false;this.fgColor=null;this.pColor=null;this.dH=null;this.cH=null;this.eH=null;this.rH=null;this.scale=1;this.relative=false;this.relativeWidth=false;this.relativeHeight=false;this.$div=null;this.run=function(){var t=function(e,t){var r;for(r in t){n.o[r]=t[r]}n._carve().init();n._configure()._draw()};if(this.$.data("kontroled"))return;this.$.data("kontroled",true);this.extend();this.o=e.extend({min:this.$.data("min")!==undefined?this.$.data("min"):0,max:this.$.data("max")!==undefined?this.$.data("max"):100,stopper:true,readOnly:this.$.data("readonly")||this.$.attr("readonly")==="readonly",cursor:this.$.data("cursor")===true&&30||this.$.data("cursor")||0,thickness:this.$.data("thickness")&&Math.max(Math.min(this.$.data("thickness"),1),.01)||.35,lineCap:this.$.data("linecap")||"butt",width:this.$.data("width")||200,height:this.$.data("height")||200,displayInput:this.$.data("displayinput")==null||this.$.data("displayinput"),displayPrevious:this.$.data("displayprevious"),fgColor:this.$.data("fgcolor")||"#87CEEB",inputColor:this.$.data("inputcolor"),font:this.$.data("font")||"Arial",fontWeight:this.$.data("font-weight")||"bold",inline:false,step:this.$.data("step")||1,rotation:this.$.data("rotation"),draw:null,change:null,cancel:null,release:null,format:function(e){return e},parse:function(e){return parseFloat(e)}},this.o);this.o.flip=this.o.rotation==="anticlockwise"||this.o.rotation==="acw";if(!this.o.inputColor){this.o.inputColor=this.o.fgColor}if(this.$.is("fieldset")){this.v={};this.i=this.$.find("input");this.i.each(function(t){var r=e(this);n.i[t]=r;n.v[t]=n.o.parse(r.val());r.bind("change blur",function(){var e={};e[t]=r.val();n.val(n._validate(e))})});this.$.find("legend").remove()}else{this.i=this.$;this.v=this.o.parse(this.$.val());this.v===""&&(this.v=this.o.min);this.$.bind("change blur",function(){n.val(n._validate(n.o.parse(n.$.val())))})}!this.o.displayInput&&this.$.hide();this.$c=e(document.createElement("canvas")).attr({width:this.o.width,height:this.o.height});this.$div=e('<div style="'+(this.o.inline?"display:inline;":"")+"width:"+this.o.width+"px;height:"+this.o.height+"px;"+'"></div>');this.$.wrap(this.$div).before(this.$c);this.$div=this.$.parent();if(typeof G_vmlCanvasManager!=="undefined"){G_vmlCanvasManager.initElement(this.$c[0])}this.c=this.$c[0].getContext?this.$c[0].getContext("2d"):null;if(!this.c){throw{name:"CanvasNotSupportedException",message:"Canvas not supported. Please use excanvas on IE8.0.",toString:function(){return this.name+": "+this.message}}}this.scale=(window.devicePixelRatio||1)/(this.c.webkitBackingStorePixelRatio||this.c.mozBackingStorePixelRatio||this.c.msBackingStorePixelRatio||this.c.oBackingStorePixelRatio||this.c.backingStorePixelRatio||1);this.relativeWidth=this.o.width%1!==0&&this.o.width.indexOf("%");this.relativeHeight=this.o.height%1!==0&&this.o.height.indexOf("%");this.relative=this.relativeWidth||this.relativeHeight;this._carve();if(this.v instanceof Object){this.cv={};this.copy(this.v,this.cv)}else{this.cv=this.v}this.$.bind("configure",t).parent().bind("configure",t);this._listen()._configure()._xy().init();this.isInit=true;this.$.val(this.o.format(this.v));this._draw();return this};this._carve=function(){if(this.relative){var e=this.relativeWidth?this.$div.parent().width()*parseInt(this.o.width)/100:this.$div.parent().width(),t=this.relativeHeight?this.$div.parent().height()*parseInt(this.o.height)/100:this.$div.parent().height();this.w=this.h=Math.min(e,t)}else{this.w=this.o.width;this.h=this.o.height}this.$div.css({width:this.w+"px",height:this.h+"px"});this.$c.attr({width:this.w,height:this.h});if(this.scale!==1){this.$c[0].width=this.$c[0].width*this.scale;this.$c[0].height=this.$c[0].height*this.scale;this.$c.width(this.w);this.$c.height(this.h)}return this};this._draw=function(){var e=true;n.g=n.c;n.clear();n.dH&&(e=n.dH());e!==false&&n.draw()};this._touch=function(e){var r=function(e){var t=n.xy2val(e.originalEvent.touches[n.t].pageX,e.originalEvent.touches[n.t].pageY);if(t==n.cv)return;if(n.cH&&n.cH(t)===false)return;n.change(n._validate(t));n._draw()};this.t=t.c.t(e);r(e);t.c.d.bind("touchmove.k",r).bind("touchend.k",function(){t.c.d.unbind("touchmove.k touchend.k");n.val(n.cv)});return this};this._mouse=function(e){var r=function(e){var t=n.xy2val(e.pageX,e.pageY);if(t==n.cv)return;if(n.cH&&n.cH(t)===false)return;n.change(n._validate(t));n._draw()};r(e);t.c.d.bind("mousemove.k",r).bind("keyup.k",function(e){if(e.keyCode===27){t.c.d.unbind("mouseup.k mousemove.k keyup.k");if(n.eH&&n.eH()===false)return;n.cancel()}}).bind("mouseup.k",function(e){t.c.d.unbind("mousemove.k mouseup.k keyup.k");n.val(n.cv)});return this};this._xy=function(){var e=this.$c.offset();this.x=e.left;this.y=e.top;return this};this._listen=function(){if(!this.o.readOnly){this.$c.bind("mousedown",function(e){e.preventDefault();n._xy()._mouse(e)}).bind("touchstart",function(e){e.preventDefault();n._xy()._touch(e)});this.listen()}else{this.$.attr("readonly","readonly")}if(this.relative){e(window).resize(function(){n._carve().init();n._draw()})}return this};this._configure=function(){if(this.o.draw)this.dH=this.o.draw;if(this.o.change)this.cH=this.o.change;if(this.o.cancel)this.eH=this.o.cancel;if(this.o.release)this.rH=this.o.release;if(this.o.displayPrevious){this.pColor=this.h2rgba(this.o.fgColor,"0.4");this.fgColor=this.h2rgba(this.o.fgColor,"0.6")}else{this.fgColor=this.o.fgColor}return this};this._clear=function(){this.$c[0].width=this.$c[0].width};this._validate=function(e){var t=~~((e<0?-.5:.5)+e/this.o.step)*this.o.step;return Math.round(t*100)/100};this.listen=function(){};this.extend=function(){};this.init=function(){};this.change=function(e){};this.val=function(e){};this.xy2val=function(e,t){};this.draw=function(){};this.clear=function(){this._clear()};this.h2rgba=function(e,t){var n;e=e.substring(1,7);n=[parseInt(e.substring(0,2),16),parseInt(e.substring(2,4),16),parseInt(e.substring(4,6),16)];return"rgba("+n[0]+","+n[1]+","+n[2]+","+t+")"};this.copy=function(e,t){for(var n in e){t[n]=e[n]}}};t.Dial=function(){t.o.call(this);this.startAngle=null;this.xy=null;this.radius=null;this.lineWidth=null;this.cursorExt=null;this.w2=null;this.PI2=2*Math.PI;this.extend=function(){this.o=e.extend({bgColor:this.$.data("bgcolor")||"#EEEEEE",angleOffset:this.$.data("angleoffset")||0,angleArc:this.$.data("anglearc")||360,inline:true},this.o)};this.val=function(e,t){if(null!=e){e=this.o.parse(e);if(t!==false&&e!=this.v&&this.rH&&this.rH(e)===false){return}this.cv=this.o.stopper?n(r(e,this.o.max),this.o.min):e;this.v=this.cv;this.$.val(this.o.format(this.v));this._draw()}else{return this.v}};this.xy2val=function(e,t){var i,s;i=Math.atan2(e-(this.x+this.w2),-(t-this.y-this.w2))-this.angleOffset;if(this.o.flip){i=this.angleArc-i-this.PI2}if(this.angleArc!=this.PI2&&i<0&&i>-.5){i=0}else if(i<0){i+=this.PI2}s=i*(this.o.max-this.o.min)/this.angleArc+this.o.min;this.o.stopper&&(s=n(r(s,this.o.max),this.o.min));return s};this.listen=function(){var t=this,i,s,o=function(e){e.preventDefault();var o=e.originalEvent,u=o.detail||o.wheelDeltaX,a=o.detail||o.wheelDeltaY,f=t._validate(t.o.parse(t.$.val()))+(u>0||a>0?t.o.step:u<0||a<0?-t.o.step:0);f=n(r(f,t.o.max),t.o.min);t.val(f,false);if(t.rH){clearTimeout(i);i=setTimeout(function(){t.rH(f);i=null},100);if(!s){s=setTimeout(function(){if(i)t.rH(f);s=null},200)}}},u,a,f=1,l={37:-t.o.step,38:t.o.step,39:t.o.step,40:-t.o.step};this.$.bind("keydown",function(i){var s=i.keyCode;if(s>=96&&s<=105){s=i.keyCode=s-48}u=parseInt(String.fromCharCode(s));if(isNaN(u)){s!==13&&s!==8&&s!==9&&s!==189&&(s!==190||t.$.val().match(/\./))&&i.preventDefault();if(e.inArray(s,[37,38,39,40])>-1){i.preventDefault();var o=t.o.parse(t.$.val())+l[s]*f;t.o.stopper&&(o=n(r(o,t.o.max),t.o.min));t.change(t._validate(o));t._draw();a=window.setTimeout(function(){f*=2},30)}}}).bind("keyup",function(e){if(isNaN(u)){if(a){window.clearTimeout(a);a=null;f=1;t.val(t.$.val())}}else{t.$.val()>t.o.max&&t.$.val(t.o.max)||t.$.val()<t.o.min&&t.$.val(t.o.min)}});this.$c.bind("mousewheel DOMMouseScroll",o);this.$.bind("mousewheel DOMMouseScroll",o)};this.init=function(){if(this.v<this.o.min||this.v>this.o.max){this.v=this.o.min}this.$.val(this.v);this.w2=this.w/2;this.cursorExt=this.o.cursor/100;this.xy=this.w2*this.scale;this.lineWidth=this.xy*this.o.thickness;this.lineCap=this.o.lineCap;this.radius=this.xy-this.lineWidth/2;this.o.angleOffset&&(this.o.angleOffset=isNaN(this.o.angleOffset)?0:this.o.angleOffset);this.o.angleArc&&(this.o.angleArc=isNaN(this.o.angleArc)?this.PI2:this.o.angleArc);this.angleOffset=this.o.angleOffset*Math.PI/180;this.angleArc=this.o.angleArc*Math.PI/180;this.startAngle=1.5*Math.PI+this.angleOffset;this.endAngle=1.5*Math.PI+this.angleOffset+this.angleArc;var e=n(String(Math.abs(this.o.max)).length,String(Math.abs(this.o.min)).length,2)+2;this.o.displayInput&&this.i.css({width:(this.w/2+4>>0)+"px",height:(this.w/3>>0)+"px",position:"absolute","vertical-align":"middle","margin-top":(this.w/3>>0)+"px","margin-left":"-"+(this.w*3/4+2>>0)+"px",border:0,background:"none",font:this.o.fontWeight+" "+(this.w/e>>0)+"px "+this.o.font,"text-align":"center",color:this.o.inputColor||this.o.fgColor,padding:"0px","-webkit-appearance":"none"})||this.i.css({width:"0px",visibility:"hidden"})};this.change=function(e){this.cv=e;this.$.val(this.o.format(e))};this.angle=function(e){return(e-this.o.min)*this.angleArc/(this.o.max-this.o.min)};this.arc=function(e){var t,n;e=this.angle(e);if(this.o.flip){t=this.endAngle+1e-5;n=t-e-1e-5}else{t=this.startAngle-1e-5;n=t+e+1e-5}this.o.cursor&&(t=n-this.cursorExt)&&(n=n+this.cursorExt);return{s:t,e:n,d:this.o.flip&&!this.o.cursor}};this.draw=function(){var e=this.g,t=this.arc(this.cv),n,r=1;e.lineWidth=this.lineWidth;e.lineCap=this.lineCap;if(this.o.bgColor!=="none"){e.beginPath();e.strokeStyle=this.o.bgColor;e.arc(this.xy,this.xy,this.radius,this.endAngle-1e-5,this.startAngle+1e-5,true);e.stroke()}if(this.o.displayPrevious){n=this.arc(this.v);e.beginPath();e.strokeStyle=this.pColor;e.arc(this.xy,this.xy,this.radius,n.s,n.e,n.d);e.stroke();r=this.cv==this.v}e.beginPath();e.strokeStyle=r?this.o.fgColor:this.fgColor;e.arc(this.xy,this.xy,this.radius,t.s,t.e,t.d);e.stroke()};this.cancel=function(){this.val(this.v)}};e.fn.dial=e.fn.knob=function(n){return this.each(function(){var r=new t.Dial;r.o=n;r.$=e(this);r.run()}).parent()}})