<%@ page pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>小区-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>


<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>

<script type="text/javascript" src="/scripts/plugIn/bootstrap.min.js"></script>
<!-- <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script> -->
<link href="/css/css/weixin/base.css" rel="stylesheet" type="text/css">
<link href="/css/css/weixin/searchResidences.css" rel="stylesheet" type="text/css">
</head>
<body>

<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">

        <a id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="navbar-left menu">
            <span class='glyphicon glyphicon-list'></span>
        </a>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
            <li><a href="/mobile/home">主页</a></li>
            <li><a href="/mobile/fav">我的收藏</a></li>
        </ul>
        <div class="input-group searchDiv navbar-right" id="searchResidence">
          <input name="cityCode" id="cityCode" type="hidden" value='${cityCode }'/>
          <input name="residenceId" id="residenceId" type="hidden"/>
          <input type="text" class="form-control" id="searcInput" placeholder="输入小区名">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" id="searc">
                <span class="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div><!-- /input-group -->
    </div>
</nav>
<div class="container">
    <div class="row" id='orderMenu'>
    	<div class="col-xs-6">
            <button id="mul" type="button" class="btn btn-default">综合</button>
        </div>
       <!--  <div class="col-xs-4">
            <button id="distance" type="button" class="btn btn-default">距离<span class='zgIcon zgIcon-long-arrow-down fa-long-arrow-up'></span></button>
        </div> -->
        <div class="col-xs-6">
            <button id="unitPrice" type="button"  class="btn btn-default">单价<span class='zgIcon zgIcon-long-arrow-down fa-long-arrow-up'></span></button>
        </div>
       <!--  <div class="col-xs-4">
            <button id="totalPrice" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-default">总价<span class='zgIcon zgIcon-long-arrow-down'></span></button>
        </div> -->
<!--         <div class="col-xs-3">
            <button id="filter" type="button" class="btn btn-default" data-toggle="modal" data-target="#filterModal">
            筛选
            <span class='zgIcon zgIcon-caret-down'></span>
          </button>
        </div>  -->
    </div>
    <div id="community" class="row">
      <!-- <a class="media" href='###'>
            <span class="media-left">
                <img src='http://www.zhengor.com/110000/residence/image/18/1164846.jpg'/>
                <b class="years">2007年</b>
            </span>
            <span class="media-body">
                <strong class="media-heading">刘家窑东里小区<q class="zgIcon zgIcon-heart-o fav"></q></strong>
                <b>30800元/平</b>
                <b>二居,三居</b>
                <span class='tag'>
                    <button class="hollowTag hollowTag-primary">大户型</button>
                    <button class="hollowTag hollowTag-info">大户型</button>
                    <button class="hollowTag hollowTag-warning">大户型</button>
                    标签总字数不超过17,总个数不超过5
                </span>
            </span>
        </a> -->
    </div>

    <div class="footer row">
        ©2015 真格在线&nbsp;&nbsp;&nbsp;&nbsp;400-115-6080
    </div>
</div>

</body>

 <script type="text/javascript">
    var currentpage = 1;
    var max_page;
    var citycode = '${cityCode}';
    var mresidencepage = "/m/residence/page";
    var mlist = "/m/listpage";
    var selectedResidenceName = "";
    var keywords;
    var uOder = 0; //按单价排序
    var dOder = 0; //按距离排序
    var clickStatus = 0;
    var latitude; // 纬度，浮点数，范围为90 ~ -90
    var longitude; // 经度，浮点数，范围为180 ~ -180。
    //判断是否是微信
    function isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
	}	
    $(function() {
        /* jsConfig();
        getLocation(); */
        /* if(isWeiXin()){
        	jsConfig();
	        	getLocation();
        	$("#distance").click(function() {
	        	dOder = 1;
	        	uOder = 0;
	        	$("#searc").click();
	    	});
        } */
       
	    $("#mul").click(function() {
			uOder = 0;
			dOder = 0;
			$("#searc").click();
		});
         $("#unitPrice").click( function() {
	        	if(clickStatus == 0) {
	        		clickStatus = 1;
	        		uOder = -1;
	        		dOder = 0;
	        		$(this).children().removeClass("fa-long-arrow-up");
	        	} else {
	        		clickStatus = 0;
	        		uOder = 1;
	        		dOder = 0;
					$(this).children().addClass("fa-long-arrow-up");	        	
	        	}
	        	 $("#searc").click();
	        });
        $("#searc").click(function() {
            keywords = $("#searcInput").val()===undefined?'':clearIgnalCh($("#searcInput").val());
            keywords = keywords == $("#searcInput").attr('placeholder') ? "" : keywords;
            if (keywords.length >= 0) {
            	cleanData();	
                keywords = formatKeyword(keywords); 
                searchResidenceByKeyword();
                showSearchResidenceByKeyword();
            }
        });
          $("#searc").click();
        //选择小区  有策略 还没实现，把数据放缓存里 http://www.iteye.com/topic/1117898 scripts/residence.json
	/* var cacheResidence = {};	//小区缓存
	var chosenResidencePool = {}; //保存已选择的小区
	$("#searcInput").autocomplete({
		minLength: 0,
		width: 318,
		autoFocus: true,
		source: function( request, response ) {
			//var cityCode = $("#cityCode").val();
			if(citycode == "") {
				$("#searcInput").next().removeClass("Validform_right").addClass("Validform_wrong").text("请选择城市");
				return false;
			}
			var term = request.term;
			if(term in cacheResidence) {
				response($.map(cacheResidence[term], function(item, index) {
					chosenResidencePool = cacheResidence[term];
					//alert(JSON.stringify(item));
					return {
						label: item.residenceName,
	                    value: item.residenceId
	              }
	            }));	
				return;
			}
	      $.ajax({
	          url: '/EditBrokerInfo.action?getResidenceListByCityCode',
	          data: {cityCode: citycode,keyword:encodeURIComponent(request.term)},
	          type: 'post',
	          dataType: "json",
	          success: function(data, status, xhr) {
	        	  cacheResidence[term] = data;
	        	  chosenResidencePool = data;
				response($.map(data, function(item, index) {
					
					return {
						label: item.residenceName,
	                    value: item.residenceId
	              }
	            }));												
	          },
	          error: function(data) {
	        	//alert(JSON.stringify(data));
	          }
	      });
			},
			select: function( event, ui ) {
				event.preventDefault();
				orderFlag = "true";
				this.value = String(ui.item.label).substring(0, String(ui.item.label).indexOf("("));
				keywords = this.value;
				$("#searcInput").blur();
				$("#searc").click();
			}
		}).change(function() {
			if($(this).val() != selectedResidenceName) {
				orderFlag = "false";
			}
		}); */
    });
    
    //显示错误信息
    function showErrMsg(id, msg) {
        var content = "<div>" + msg + "</div>";
        id.append(content);
    }
    
    //缓存数据
    function catchData(type, data) {
        var afterData = [];
        if(data != undefined) {
            afterData = data;
        }
		$("body").data(String("SR" + currentpage), afterData);
    }
    
    //从缓存中取数据
    function fetchData(page) {
		if($("body").data(String("SR" + page)) == undefined) {
			return [];
		} else {
			return $("body").data(String("SR" + page));
		}
    }
    
    //填充数据
    function fillData(type, data) {
        var cnBedRoom = new Array("","一","二","三","四","五");//直接定义并初始化
        var bedAndPrice;
        var content = "";
        $.each(data, function(index, item) {
        	var price = item.unitPrice == 0 ? '暂无报价' : item.unitPrice + "元/平,";
        	var builtYear = item.builtYear == 0 ? '建筑年代未知' : item.builtYear;
            var favClass = item.name == '' ? "zgIcon zgIcon-heart zgIcon-heart-o fav" : "zgIcon zgIcon-heart fav";
           /*  content += "<a class='media' href='"+url+"'>"+
                "<span class='media-left media-middle'><img class='media-object' src='" + item.defaultPic + "' alt='小区图片' onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2);\"></span>" +
                "<span class='media-body'><strong class='media-heading'>" + item.residenceName + "</strong> <span class='circle'>" + item.bizcircleName + "</span></span></span></a>"; */
                content += "<div class='media'>" +
                "<span class='media-left'>" +
                "<img src='" + item.defaultPic + "' alt='小区图片' onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2)\">" + 
				"<b class='years'>" + builtYear + "</b>" +
                "</span>" +
                "<span class='media-body'>" +
                "<strong class='media-heading'>" + item.residenceName + "<q class='"+favClass+"' residenceId=" + item.residenceId + " residenceName=" + item.residenceName + "></q></strong>" +
                "<b>" + price + "</b>" + 
                "<b>" + item.layout + "</b>" +
                "<span class='tag'>";
                var tags = item.tag.split(/[;；]/);
                content += setTags(tags);
                //for(var i = 1; i < tags.length; i++) {
                	// content += "<button class='hollowTag hollowTag-primary'>" + tags[i] + "</button>"
                //}
                content += "</span></span></div>";
        });
        if(max_page > 1) {
        	//<button type='button' class='btn btn-default col-xs-3 col-xs-offset-2' id='prePage' onclick='prevPage();'>上页</button>
            content += "<div class='page row'><button type='button' class='btn btn-default col-xs-10 col-xs-offset-1' id='nextPage' onclick='nextPage();'>加载更多</button></div>";
        }
        $("#community").append(content);
        bindPage(data);
        $(".fa").each(function() {
        	$(this).click(function(e) {
        		stopProp(e);
        		//var href = $(this).parents("a").attr("href");
        		//$(this).parents("a").attr("href", "###");
        		if($(this).hasClass("zgIcon-heart-o")) {
        			addToFav($(this).attr("residenceId"), $(this).attr("residenceName"), 1);
        			$(this).removeClass("zgIcon-heart-o");
        			//$(this).parents("a").attr("href", href);
        		}
        	});
        });
        
       
        
        invalidateNex();
        invalidatePre();
    }
    
    //绑定跳转页面
    function bindPage(data) {
        
   	 	$(".media:eq(-1),.media:eq(-2),.media:eq(-3),.media:eq(-4),.media:eq(-5)").each(function(index, item) {
       		$(this).click(function(){
       		 	var url = '/' + citycode + mresidencepage + '/' + Math.floor(data[index].residenceId / 100) + '/M' + data[index].residenceId + '.html';
       			window.location.href = url;
       		});
       });
    }
    
    //添加到收藏  type 1 经纪人 2 小区
    function addToFav(id, content, type) {
	   	$.ajax({
			url: "/BrokerWeiXin.action?addToFav",
			dataType: "json",
			async: false,
			data:{
				cityCode: $("#cityCode").val(),
				sid: id,
				saveType: type,
				name: encodeURI(content)
			},
			success:function(data, status) {
				alert("su");
			}	
		});
    }
    
    //设置标签
    function setTags(tags) {
		var content = "";
		var count = 0;
		var size = 0;
		for(var i = 1; i < tags.length; i++) {
			if(count < 5) {
				size += tags[i].length;
				if(size < 17) {
					content += "<button class='hollowTag hollowTag-primary'>" + tags[i] + "</button>";
					count++;
				}
			}
		}
		return content;
    }
    
    function cleanData() {
		$("#community").empty();
    }
    
    
    //获取js配置
	function jsConfig() {
		var location = window.location.href;
	//	alert(location);
		$.ajax({
			url:"/WeiXinComment.action?getJSConfig",
			dataType:"json",
			async: false,
			data:{location:location},
			success:function(data, status) {
				wx.config({
				    debug: false,
				    appId: data.sp.appId,
				    timestamp: data.sp.timestamp,
				    nonceStr: data.sp.nonceStr,
				    signature: data.sp.signature,
				    jsApiList: [
				        // 所有要调用的 API 都要加到这个列表中
				        'getLocation'
				      ]
				});
			}
		});
	}
    
    //获取地址
    function getLocation() {
        wx.getLocation({
            success: function (res) {
                latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                //var speed = res.speed; // 速度，以米/每秒计
                //var accuracy = res.accuracy; // 位置精度
                alert(latitude + ":" + longitude + ";" + speed + ";" + accuracy)
            }
        });
    }
    
    //根据关键词搜索小区
    function searchResidenceByKeyword() {
    $.ajaxSettings.async = false;
        $.getJSON(
            '/BrokerWeiXin.action?searchResidenceByKeyWord', 
            {
                currentPage: currentpage,
                keyword: encodeURI(keywords),
                unitPriceO: uOder,
               	distanceO: dOder
            }, 
            function(data) {
                if(data.status == 'y') {
                    if(data.info.length == 0) {
                        showErrMsg($("#community"), "没有搜索到您查询的小区");
                    } else {
                        max_page = Math.ceil(data.total / 40) == 0 ? 1 : Math.ceil(data.total / 40);
                        catchData(3, data.info);
                    }
                } else {
                    showErrMsg($("#community"), "系统异常，请稍后重新进行绑定。");
                }
            }
        );
    }
    
    //显示搜索小区
    function showSearchResidenceByKeyword() {
        //cleanData();
        $(".page").remove();
        var searchResidences = fetchData(currentpage);
        if(searchResidences.length <= 0) {
            showErrMsg($("#community"), "没找到该小区，请换个关键词试试:)");
        } else {
            fillData(3, searchResidences);
        }
    }

    // 下一页
    function nextPage() {
        if (currentpage < max_page) {
            currentpage = currentpage + 1;
            $("#residenceCurrPage").text(currentpage);
            var serviceResidences = fetchData(currentpage);
            if(serviceResidences.length <= 0) {
                searchResidenceByKeyword();             
            }
            showSearchResidenceByKeyword();
        }
        invalidateNex();
        invalidatePre();
    }
    // 上一页
    function prevPage() {
        if (currentpage != 1) {
            currentpage -= 1;
            $("#residenceCurrPage").text(currentpage);
            showSearchResidenceByKeyword();
        }
        invalidatePre();
        invalidateNex();
    }
    
    //在第一页的时候使后退按钮失效
    function invalidatePre() {
        if (currentpage == 1) {
            $("#prePage").addClass("unAvailable");
        } else if ($("#prePage").hasClass("unAvailable")) {
            $("#prePage").removeClass("unAvailable").addClass('prevPage');
        }
    }
    
    // 在最后一页的时候使前进按钮失效
    function invalidateNex() {
        if (currentpage == max_page) {
            $("#nextPage").addClass("unAvailable");
        } else if ($("#nextPage").hasClass("unAvailable")) {
            $("#nextPage").removeClass("unAvailable").addClass('nextPage');
        }
    }
    
    //当图片加载失败是指定默认图片
    function showImgDelay(imgObj,imgSrc,maxErrorNum){  
            if(maxErrorNum>0){  
                imgObj.onerror=function(){  
                    showImgDelay(imgObj,imgSrc,maxErrorNum-1);  
                };  
                setTimeout(function(){  
                    imgObj.src=imgSrc;  
                },500);  
            }else{  
                imgObj.onerror=null;  
                imgObj.src=imgSrc;  
            }  
        }
        
     function stopProp(event){
		if (event.stopPropagation) {
			// this code is for Mozilla and Opera
			event.stopPropagation();
		}
		else if (window.event) {
			// this code is for IE
			window.event.cancelBubble = true;
		} 
	}
  </script>
    <script type="text/javascript" src="/scripts/search/formatJS.js"></script> 
  <script type="text/javascript" src="/scripts/public/jquery-ui-1.10.4.custom.min.js"></script>
</html>
