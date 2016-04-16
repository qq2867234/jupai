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
	$("header nav .right i").hover();//地图
});
$(document).ready(function() {
    $(".img-nbtn").click(function() {
        $(".p-nbtn").slideToggle("slow");
        if (m.nav_y) {
            $(".nav-y").hide();
            m.nav_y = false;
        } else {
            $(".nav-y").show();
            m.nav_y = true;
        }

    });
    $(".nav-y").click(function() {
        $(".p-nbtn").hide();
        $(".nav-y").hide();
        m.nav_y = false;
    })
});

/*首页全国城市*/
$(document).ready(function() {
    $(".all").click(function() {
    	window.location.href = localHost + "/searchListCity/enddate=" + m.sEnd + "_startdate=" + m.sBegin;
    	/**
        $(".tc").show(); 
		$('.ucity li').remove();
		for(var city in hotcitys){
			var cityinfo = hotcitys[city];
			var a = '<li><a href="javascript:void(0)" onclick=action.onSearch(this,"'+cityinfo[1]+'","'+cityinfo[2]+'") location="'+cityinfo[1]+'" citypinyin="'+cityinfo[2]+'">'+cityinfo[1]+'</a></li>';
			$('.ucity').append(a);
		}   
		*/
    });
    $(".s-btn i").click(function() {
        $(".tc").hide();
    });
    $(".top").click(function() {
        $(".tc").hide();
    });
    $(".fc-text").click(function() { 
    	$(".fc").hide();
        window.open('http://www.jupai.com/app/download');
    });
    
    /*立即下载弹框*/
    $(".f-i02").click(function() {
    	//底部下载弹框关闭时保存Cookie信息、生命周期为24小时
		var date = new Date(); 
		date.setTime(date.getTime() + 24*60*60*1000);//Cookie生存周期为24小时
		document.cookie = "downloadCookie = jupai;expires=" + date.toGMTString();  
        $(".fc").hide();
    });
});

/*列表房型+默认排序*/
$(document).ready(function() {
	$(".js-price").click(function() {
        $("#price").show();
    });
    $(".js-houseType").click(function() {
        $("#rm").show();
    });
    $(".js-sort").click(function() {
        $("#mr").show();
    });
    $(".btn-pb").click(function() {
        $("#rm").hide();
    });
    $(".rm-top").click(function() {
        $("#rm").hide();
    });
    $(".rm-top").click(function() {
        $("#mr").hide();
    });
    
  //底部下载浮层是否显示判断
 	var downloadCookie = getCookie("downloadCookie");
 	if(downloadCookie != null && downloadCookie != ""){
 		$(".fc").hide();
 	}else{
 		$(".fc").show();
 	}
   
});
var getCookie = function(objName) {
	var arrStr = document.cookie.split("; ");
	for(var i = 0;i < arrStr.length;i ++){
	var temp = arrStr[i].split("=");
	if(temp[0] == objName) return decodeURI(temp[1]);
	}
	}; 