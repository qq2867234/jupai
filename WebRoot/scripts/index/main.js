/* main.js by linlin */
//var serviceUrl = "http://127.0.0.1:8099/duanzu/wap";
//var	localHost = "http://127.0.0.1:8099/duanzu/wap";
//var localHost = "http://wap.corp.mayi.com";
//var serviceUrl = "http://wap.corp.mayi.com";
//var localHost = "http://prewap.mayi.com";
//var serviceUrl = "http://prewap.mayi.com";
var localHost = "http://m.mayi.com";
var serviceUrl = "http://m.mayi.com";
//var localHost = "http://kgj.m.mayi.com";
//var serviceUrl = "http://kgj.m.mayi.com";
//var localHost = "http://192.168.41.41:8099";
//var serviceUrl = "http://192.168.41.41:8099";


var Urls = {
	map:"http://api.map.baidu.com/api?v=1.4&callback=?"
	,index:{
		getcitys:serviceUrl+"/api/v2/cities"
    ,getcity:serviceUrl+"/api/v2/location"
	}
	,list:{more:serviceUrl+"/api/v2/wap/"
		,map:serviceUrl	+"/lodegeunitmap"
		}
	,detail:{roomId:''
		,checkstock: serviceUrl+ "/api/v2/room/checkstock"
		,prices: serviceUrl+"/api/v2/room/"
		,comments: serviceUrl + "/api/v2/room/"
		,lordcomments:serviceUrl+ "/api/v2/lord/"
		}
	,order:{submit:serviceUrl+'/api/v2/orders/doBookOrderWap'
		,orders:serviceUrl+'/api/v2/orders/'
		,bookprice:	serviceUrl+'/api/v2/room/'
	}
	,orderManage:{orders: serviceUrl+'/api/v2/user/'}
	,orderDetail:{detail:serviceUrl+"/api/v2/order/"
		,payForzfb:serviceUrl+"/api/v2/order/"
		,cancel:serviceUrl+"/api/v3/order/"
	}
	,login:{log:serviceUrl+"/api/v2/wap/user/login"
		,imgcode: serviceUrl+'/api/v2/wap/user/authimage?clientInfo={"model":"html5"}'
		,sendPhoneCode:serviceUrl+"/api/v2/wap/user/mobile/"
		,loginout:serviceUrl+'/api/v2/wap/user/logout'
		,checkPhone:serviceUrl+"/api/v2/wap/user/check/phone"
	}
	,suggest:{submit:serviceUrl+"/api/v2/feedback"	}
	,evaluate:{submit:serviceUrl+"/api/v2/order/"	}
};

$.fn.toPage = function(options){
  var d = {page:'',
          title:'',
          header:'<header class="logined"><nav><div class="title"></div><a href="#"rel="nofollow" class="back left"></a></nav></header>',
          defFun:function(){}
      };
  var opts = $.extend(d,options); 
  return this.each(function(){
    var f = $(this);
    var p = $(opts.page);
    var h=opts.header?opts.header:'';
    !p.find("header").length>0 && p.prepend(opts.header) && f.find("header .right").each(function(){ p.find("header nav").append(this.outerHTML); });
    f.find("header").hasClass("logined")? p.find("header").addClass("logined"):p.find("header").removeClass("logined");
    p.find(".title").html(opts.title);
    opts.defFun();

    f.returnPage(p);
    p.find(".back").on("click",function(){
      p.returnPage(f);
    });
  });
}

$.fn.toPage2 = function(options){
	  var d = {page:'',
	          title:'',
	          header:'<header class="logined"><nav><div class="title"></div><a href="#"rel="nofollow" onclick="hiddenMap();" class="back left"></a></nav></header>',
	          defFun:function(){}
	      };
	  var opts = $.extend(d,options); 
	  return this.each(function(){
	    var f = $(this);
	    var p = $(opts.page);
	    var h=opts.header?opts.header:'';
	    !p.find("header").length>0 && p.prepend(opts.header) && f.find("header .right").each(function(){ p.find("header nav").append(this.outerHTML); });
	    f.find("header").hasClass("logined")? p.find("header").addClass("logined"):p.find("header").removeClass("logined");
	    p.find(".title").html(opts.title);
	    opts.defFun();
	    f.returnPage(p);
	    p.find(".back").on("click",function(){
	      p.returnPage(f);
	    });
	  });
	}

$.fn.returnPage = function(p){
  return this.each(function(){
    $(this).hide();
    p.show();
  });
}

$.fn.showHead=function(options){
  opts = $.extend({}, options);
  return this.each(function(){  
    var f = $(this),
    userID = getCookie("MAYIUID");
		userID?opts.afterinit(f,opts):opts.beforeLogin(f,opts); 
  });    
}

var platformClass = function() {
    var b = navigator.userAgent;
    var a = function(c) {
        return b.toLowerCase().indexOf(c.toLowerCase()) != -1;
    };
    this.userAgent = b;
    this.isAndroid = a("android");
    this.isIphoneOS = a("iphone os");
    this.isIOS4 = a("os 4_") || a("os 3_");
    this.isIOS6 = a("os 6_");
    this.isQQ = a("qqbrowser");
    this.isSafari = a("mac os") && a("safari") && !a("crios") && !a("qqbrowser");
    this.isUC = a("uc");
    this.isChrome = a("crios") || a("chrome");
    this.isBaidu = a("baidubrowser");
    this.isBaiduApp = a("baiduboxapp");
};
//根据不同的系统，显示不同的下载链接    
var browser = {
  versions: function() {
    var u = navigator.userAgent,
    app = navigator.appVersion;
    return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1,
        //IE内核
        presto: u.indexOf('Presto') > -1,
        //opera内核
        webKit: u.indexOf('AppleWebKit') > -1,
        //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
        //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1,
        //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1,
        //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
  } (),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()     
};

var ajaxFun = function(d){
  $.ajax({
    type:d.type || 'post',
    url:d.url|| '',
    data:d.data || {},
    async:d.async || true,
    dataType: d.dataType || 'json',
    success:d.success,
    error:d.error || function(d){alert('访问失败了，请刷新重试');}
  });
};

var ajaxMess = {
	fail:function(f){
		f = f?f:$(".content");
		f.html('<p class="noData">访问失败了，请刷新重试</p>');
	}
};
var getCookie = function(objName) {
     var arrStr = document.cookie.split("; ");
     for(var i = 0;i < arrStr.length;i ++){
            var temp = arrStr[i].split("=");
            if(temp[0] == objName) return decodeURI(temp[1]);
     }
};

var GetRequest = function(url) {
   var url = url?url:location.search; //获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
   }
   return theRequest;
};


var locHref=function(url){
	window.location.href=url;
	};

var numToDate = function(n){
	return new Date(parseInt(n) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "); 	
};
var returnDate = function(s){
  return new Date(s.split("-")[0], (s.split("-")[1] - 1), s.split("-")[2])
};

var showEndInput = function(start,end,showWeek) {
    var s = start.html().split(" ")[0];
    var sDate = returnDate(s);
    var e = end.html().split(" ")[0];
    var eDate = returnDate(e);
    if(sDate>=eDate){
        var newDate = new Date(sDate.getFullYear(), sDate.getMonth(), (sDate.getDate() + offset));
        var weekDays = ['日', '一', '二', '三', '四', '五', '六'];
        var week = showWeek?' 周' + weekDays[newDate.getDay()]:"";
        end.text(newDate.getFullYear() + '-' + (10 <= newDate.getMonth() + 1 ? newDate.getMonth() + 1 : "0" + (newDate.getMonth() + 1)) + '-' + (10 <= newDate.getDate() ? newDate.getDate() : "0" + newDate.getDate()) + week);
    }
    
};

//日期控件-周 固定位置
var weekTilteFixed = function(){
  $(window).scroll(function() {
        var f = $(".datepicker_title");
        f.each(function(){
          var top = 44,left=0;
          var h = f.height();
            if ($(window).scrollTop() < top) {
                f.css({
                        "position": "relative",
                        "left": "0px"
                })
            } else {
                f.css({
                        "position": "fixed",
                        "left": left + "px"
                });
            }  
        });
    });
};

var returnUserInfo = function(){
    			var UserInfo =getCookie("MayiUserInfo");
    			if(UserInfo){
    				UserInfo = unescape(UserInfo);
    				var pattern = new RegExp(/^\".+\"$/);
	        	if (pattern.exec(UserInfo)) {
	    				UserInfo = UserInfo.substring(1,UserInfo.length-1);
	    			}
    				return eval('(' + UserInfo + ')');	
    			}else{
    				return;
    			}
    			
    		}

var showTip=function(tip,time){
	 if(!time||typeof(time)!='number'){
		 time=2
	 }
	 if(typeof(tip) != "undefined"&&tip!=''){
		 var context=$('body');
		 var tiparticle=$("#article_showTip");
		 if(typeof(tiparticle) != "undefined")
			 tiparticle.remove();
		 var html='<article id="article_showTip" class="tc-ar"><b>'+tip+'</b></article>';
		 context.append(html);
		 tiparticle=$("#article_showTip");
		 /**JQuery与zepto兼容问题，将提示的点击事件更换为JQuery形式   update by xuwei 2015-11-21*/
		 /**tiparticle.live('click',function(){
			 tiparticle.remove();
		 })*/
		 tiparticle.click(function(){
			 tiparticle.remove();
		 })
		 setTimeout(function(){
			 tiparticle.remove();
         },1000*time);
	 }
}

$.extend($.fn, {
  hover: function() {
        $(this).each(function() {
            if (!$(this).hasClass("active")) {
                $(this).on("touchstart mousedown",
                function() {
                    $(this).addClass("active");
                    $(document).on("touchcancel touchmove mousedup",
                    function() {
                        $(this).removeClass("active");
                    });
                }).on("touchcancel touchmove touchend mouseup",
                function() {
                    $(this).removeClass("active");
                });
            }
        });
        return $(this);
  }
  
});

$(function(){
  /**轮换标签**/
    $(".js-slide-tag").find("li").each(function (idx) {
        var f = $(this).closest(".js-slide");
        $(this).click(function () {
            f.find(".js-slide-tag li").removeClass("on").eq(idx).addClass("on");
            $(".js-slide-con").addClass("hide").eq(idx).removeClass("hide");
        });
    });

    $(".back,.login-in,.login-out,.user-cen,footer a").hover();//header，footer的渐变
    $(".list-item,.sort li,.room-list li,.list .elaborate,.list .rule,.select li,.order-list li.normal,.list a").hover();//列表
    $(".btn-ok,.btn-more,.local-search,.login .checkcode,.localCen,.up,.down").hover();//按钮背景颜色变化
    $(".order-fix .start,.order-fix .end").hover();//其它内容的背景颜色变化 


  	 if (browser.versions.ios) {
    } else if (browser.versions.android) {
    } else{
    } 
  	 
  
  /*返回顶部*/
  $("#goTop").on("click",function(){
    window.scrollTo(0,1);
  });
  
  /*鼠标按下去效果*/
  $.extend($.fn, {
    hover: function() {
      $(this).each(function() {
          if (!$(this).hasClass("active")) {
	          $(this).on("touchstart mousedown",
	          function() {
	              $(this).addClass("active");
	              $(document).on("touchcancel touchmove mousedup",
	              function() {
	                  $(this).removeClass("active");
	              });
	          }).on("touchcancel touchmove touchend mouseup",
	          function() {
	              $(this).removeClass("active");
	          });
          }
      });
      return $(this);
    }  
  });
  
  $(function(){
  	/*hover*/
  	$(".tc .show ul li a,.tc .show .s-btn i").hover();//城市弹框
  });

  /*首页顶部文字滑动*/
  $(document).ready(function(){
	  
	  /*2015-12-8*/
	  $(".img-nbtn").click(function(){
			if($(".nav-y").height()==0){
			  $(".nav-y").css("height","100%");
		  	  $(".p-nbtn").css("height",146).css("padding-top",10);
			}else{
				$(".nav-y").css("height",0);
		  	  $(".p-nbtn").css("height",0).css("padding-top",0);
				}
			 });
			 
			 $(".nav-y").click(function(){
				 $(".nav-y").css("height",0);
		  	     $(".p-nbtn").css("height",0).css("padding-top",0);
			 })	
			 
			 
  });
});

//获取url指定参数值
var getUrlParam = function(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	return r != null ? unescape(r[2]) : null;
};

function changeUrlParamVlaue(name, value) {
  $("#search_" + name).val(value);
}
