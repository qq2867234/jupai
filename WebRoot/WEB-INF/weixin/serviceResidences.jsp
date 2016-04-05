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
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<link href="/css/css/weixin/base.css" rel="stylesheet" type="text/css">
<link href="/css/css/weixin/serviceResidences.css" rel="stylesheet" type="text/css">
</head>
<body>

<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <a class="navbar-left" href="/mobile/home">
            <span class='glyphicon glyphicon-list'></span>
        </a>
        <div class="input-group searchDiv navbar-right" id="searchResidence">
          <input type="text" class="form-control" placeholder="请输入小区名" id="searcInput">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" id="searc">
                <span class="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div><!-- /input-group -->
    </div>
</nav>
<div role="tabpanel" class="container">

  <!-- Nav tabs -->
  <ul class="nav nav-pills row" role="tablist">
    <li role="presentation" class="col-xs-4 active"><a id="vCommunity" href="#community" aria-controls="community" role="tab" data-toggle="tab">小区</a></li>
    <li role="presentation" class="col-xs-4"><a id="vSale" href="#onSale" aria-controls="onSale" role="tab" data-toggle="tab">卖单</a></li>
    <li role="presentation" class="col-xs-4"><a id="vRent" href="#onRent" aria-controls="onSale" role="tab" data-toggle="tab">租单</a></li>
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="community">
    </div>
    <div role="tabpanel" class="tab-pane" id="onSale">
    </div>
    <div role="tabpanel" class="tab-pane" id="onRent">
        
    </div>
  </div>
    <div class="footer row">
        ©2015 真格在线&nbsp;&nbsp;&nbsp;&nbsp;400-115-6080
    </div>
</div>

</body>
  <script type="text/javascript">
    var currentpage = 1;
    var max_page;
    var brokerno = '${brokerNo}';
    var citycode = '${cityCode}';
    var mresidencepage = "/m/residence/page";
    var mlist = "/m/listpage";
    var keywords;
    var curType = 0;//当前操作状态 0 服务小区 1卖单 2租单 3小区搜索
    var selectedResidenceName = "";
	var uOder = 0; //按单价排序
    var tOder = 0; //按总价排序
    var dOder = 0; //按距离排序
    $(function() {
        /* jsConfig();
        getLocation(); */
        getBrokerServiceResidences();
        showBrokerServiceResidences();
        $("#vSale").click(function() {
        	curType = 1;
            var data = fetchData(curType, 1);
            if(data.length == 0) {
                getShareLists(1);
                showShareLists(1);
            } else {
                currentpage = 1
                showShareLists(1);
            }
            
            cleanData(0);
            cleanData(2);
            $("#searchResidence").hide();
        });
        
        $("#vRent").click(function() {
        	curType = 2;
            var data = fetchData(curType, 1);
            if(data.length == 0) {
                getShareLists(2);
                showShareLists(2);
            } else {
                currentpage = 1
                showShareLists(2);
            }
            cleanData(0);
            cleanData(1);
            $("#searchResidence").hide();
        });
        
        $("#vCommunity").click(function() {
        	curType = 0;
            var data = fetchData(curType, 1);
            if(data.length == 0) {
                getBrokerServiceResidences();
                showBrokerServiceResidences();
            } else {
                currentpage = 1
                showBrokerServiceResidences();
            }
            $("#searchResidence").show();
        });
        
        $("#searc").click(function() {
        	curType = 3;
            keywords = $("#searcInput").val()===undefined?'':clearIgnalCh($("#searcInput").val());
            keywords = keywords == $("#searcInput").attr('placeholder') ? "" : keywords;
            if (keywords.length > 0) {
                keywords = formatKeyword(keywords);
                searchResidenceByKeyword();
                showSearchResidenceByKeyword();
            }
        });
        //选择小区  有策略 还没实现，把数据放缓存里 http://www.iteye.com/topic/1117898 scripts/residence.json
	var cacheResidence = {};	//小区缓存
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
			$("#residenceId").val(ui.item.value);
			this.value = String(ui.item.label).substring(0, String(ui.item.label).indexOf("("));
			selectedResidenceName = this.value;
			$("#searcInput").blur();
			$("#searc").click();
		}
	}).change(function() {
		if($(this).val() != selectedResidenceName) {
			orderFlag = "false";
		}
	});
	
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
        if(type == 0) {
            $("body").data(String("R" + currentpage), afterData);
        } else if(type == 1) {
            $("body").data(String("SL" + currentpage), afterData);
        } else if(type == 2) {
            $("body").data(String("RL" + currentpage), afterData);
        } else if(type == 3) {
            $("body").data(String("SR" + currentpage), afterData);
        }
    }
    
    //从缓存中取数据
    function fetchData(type, page) {
        if(type == 0) {
            if($("body").data(String("R" + page)) == undefined) {
                return [];
            } else {
                return $("body").data(String("R" + page));
            }
        } else if(type == 1) {
            if($("body").data(String("SL" + page)) == undefined) {
                return [];
            } else {
                return $("body").data(String("SL" + page));
            }
        } else if(type == 2) {
            if($("body").data(String("RL" + page)) == undefined) {
                return [];
            } else {
                return $("body").data(String("RL" + page));
            }
        } else if(type == 3) {
            if($("body").data(String("SR" + page)) == undefined) {
                return [];
            } else {
                return $("body").data(String("SR" + page));
            }
        }
    }
    
    //填充数据
    function fillData(type, data) {
        var cnBedRoom = new Array("","一","二","三","四","五");//直接定义并初始化
        var bedAndPrice;
        if(type == 0) {
            var content = "";
            $.each(data, function(index, item) {
                var url = '/' + citycode + mresidencepage + '/' + Math.floor(item.residenceId / 100) + '/M' +item.residenceId + '.html';
                /* content += "<a class='media' href='"+url+"'>"+
                    "<span class='media-left'><img class='media-object' src='" + item.defaultPic + "' alt='小区图片' onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2);\"></span>" +
                    "<span class='media-body'><b class='media-heading'>" + item.residenceName + "</b><em>" + item.bizcircleName + "</em></span></a>"; */
                     content += "<a href='" + url + "' target='_blank' class='col-xs-6'>" +
                    "<img src='" + item.defaultPic + "' alt='小区图片' onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2)\">" + 
					"<b>" + item.residenceName + "</b>" +
                    "</a>";
            });
            if(max_page > 1) {
                content += "<div class='page'><button type='button' class='btn btn-default col-xs-3 col-xs-offset-2' id='nextPage' onclick='nextPage(0);'>下页</button><button type='button' class='btn btn-default col-xs-3 col-xs-offset-2' id='prePage' onclick='prevPage(0);'>上页</button></div>";
            }
            $("#community").append(content);
        } else if(type == 1) {
            var content = "";
            $.each(data, function(index, item) {
                if(item.bedRoom != undefined) {
                    bedAndPrice = cnBedRoom[item.bedRoom] + "居," + item.price + "万元";
                } else {
                    bedAndPrice = item.price + "万元";
                }
                var url = '/' + citycode + mlist + '/' +item.createdtime + '/'  + Math.ceil(item.id / 1000) + '/MS' +item.id + '.html';
                content += "<a class='media' href='"+url+"'>"+
                    "<span class='media-left'><img class='media-object' src='" + item.defaultPic + "' alt='房产图片' onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2);\"></span>" +
                    "<span class='media-body'><b class='media-heading'>" + item.residenceName + "</b><em>" + item.slogan + "</em><em>" + bedAndPrice + "</em></span></a>";
            });
            if(max_page > 1) {
                content += "<button type='button' class='btn btn-default' id='nextPage' onclick='nextPage(1);'>下页</button><button type='button' class='btn btn-default' id='prePage' onclick='prevPage(1);'>上页</button> ";
            }
            $("#onSale").append(content);
        } else if(type == 2) {
            var content = "";
            $.each(data, function(index, item) {
                if(item.bedRoom != undefined) {
                    bedAndPrice = cnBedRoom[item.bedRoom] + "居," + item.price + "元/月";
                } else {
                    bedAndPrice = item.price + "元/月";
                }
                var url = '/' + citycode + mlist + '/' +item.createdtime + '/'  + item.id / 1000 + '/MR' +item.id + '.html';
                content += "<a class='media' href='"+url+"'>"+
                    "<span class='media-left'><img class='media-object' src='" + item.defaultPic + "' alt='房产图片' onerror=\"showImgDelay(this,'/images/public/defaultHome.jpg',2);\"></span>" +
                    "<span class='media-body'><b class='media-heading'>" + item.residenceName + "</b><em>" + item.slogan + "</em><em>" + bedAndPrice + "元/月</em></span></a>";
            });
            if(max_page > 1) {
                content += "<button type='button' class='btn btn-default' id='prePage' onclick='prevPage(2);'>上页</button><button type='button' class='btn btn-default' id='nextPage' onclick='nextPage(2);'>下页</button> ";
            }
            $("#onRent").append(content);
        }
        invalidateNex();
        invalidatePre();
    }
    
    function cleanData(type) {
        if(type == 0) {
            $("#community").empty();
        } else if(type == 1) {
            $("#onSale").empty();
        } else if(type == 2) {
            $("#onRent").empty();
        }
    }
    
    //显示经纪人服务小区
    function showBrokerServiceResidences() {
        cleanData(0);
        var serviceResidences = fetchData(curType, currentpage);
        if(serviceResidences.length <= 0) {
            showErrMsg($("#community"), "您还没有设定服务小区，请在电脑端设置服务小区后使用。");
        } else {
            fillData(0, serviceResidences);
        }
    }
    
    //显示经纪人单子
    function showShareLists(listType) {
        cleanData(listType);
        var shareLists;
        shareLists = fetchData(listType, currentpage);
        if(shareLists.length <= 0) {
            if(listType == 1) {
                showErrMsg($("#onSale"), "您还没有发布卖单");
            } else if(listType == 2) {
                showErrMsg($("#onRent"), "您还没有发布租单");
            }
        } else {
            fillData(listType, shareLists);
        }
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
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度
                alert(latitude + ":" + longitude + ";" + speed + ";" + accuracy)
            }
        });
    }
    
    
    //获得经纪人服务小区
    function getBrokerServiceResidences() {
    $.ajaxSettings.async = false;
        $.getJSON(
            '/BrokerWeiXin.action?getBrokerServiceResidences', 
            {
                brokerNo: brokerno,
                currentPage: currentpage,
                unitPriceO: uOder,
                totalPriceO: tOder,
               	distanceO: dOder
            }, 
            function(data) {
                if(data.status == 'y') {
                    if(data.info.length == 0) {
                        showErrMsg($("#community"), "您还没有设定服务小区，请在电脑端设置服务小区后使用。");
                    } else {
                        max_page = Math.ceil(data.total / 40) == 0 ? 1 : Math.ceil(data.total / 40);
                        catchData(0, data.info);
                    }
                } else {
                    showErrMsg($("#community"), "系统异常，请稍后重新进行绑定。");
                }
            }
        );
    }
    
    //根据关键词搜索小区
    function searchResidenceByKeyword() {
    $.ajaxSettings.async = false;
        $.getJSON(
            '/BrokerWeiXin.action?searchResidenceByKeyWord', 
            {
                brokerNo: brokerno,
                currentPage: currentpage,
                keyword: encodeURI(keywords),
                unitPriceO: uOder,
                totalPriceO: tOder,
               	distanceO: dOder
            }, 
            function(data) {
                if(data.status == 'y') {
                    if(data.info.length == 0) {
                        showErrMsg($("#community"), "没有搜索到您查询的小区");
                    } else {
                        max_page = Math.ceil(data.total / 40) == 0 ? 1 : Math.ceil(data.total / 40);
                        catchData(curType, data.info);
                    }
                } else {
                    showErrMsg($("#community"), "系统异常，请稍后重新进行绑定。");
                }
            }
        );
    }
    
    //显示搜索小区
    function showSearchResidenceByKeyword() {
        cleanData(0);
        var searchResidences = fetchData(curType, currentpage);
        if(searchResidences.length <= 0) {
            showErrMsg($("#community"), "没找到该小区，请换个关键词试试:)");
        } else {
            fillData(0, searchResidences);
        }
    }
    
    //获得经纪人单子
    function getShareLists(listType) {
    $.ajaxSettings.async = false;
        $.getJSON(
            '/BrokerWeiXin.action?getShareLists', 
            {
                brokerNo: brokerno,
                currentPage: currentpage,
                listType: listType
            },
            function(data) {
                if(data.status == 'y') {
                    if(data.info.length == 0) {
                        //您还没有发布单子
                        if(listType == 1) {
                            showErrMsg($("#onSale"), "您还没有发布卖单");
                        } else if(listType == 2) {
                            showErrMsg($("#onRent"), "您还没有发布租单");
                        }
                    } else {
                        max_page = Math.ceil(data.total / 40) == 0 ? 1 : Math.ceil(data.total / 40);
                        catchData(listType, data.info);
                    }
                } else {
                    if(listType == 1) {
                        showErrMsg($("#onSale"), "系统异常，请稍后重新进行绑定。");
                    } else if(listType == 2) {
                        showErrMsg($("#onRent"), "系统异常，请稍后重新进行绑定。");
                    }
                }
            }
        );
    }
        
    function initParams() {
        currentpage = 1;
        max_page = 0;
    }
    
    // 下一页
    function nextPage(type) {
        if (currentpage < max_page) {
            currentpage = currentpage + 1;
            $("#residenceCurrPage").text(currentpage);
            if(type == 0) {
                var serviceResidences = fetchData(0, currentpage);
                if(serviceResidences.length <= 0) {
                    getBrokerServiceResidences();               
                }
                showBrokerServiceResidences();
            } else if(type == 1 || type == 2) {
                var shareLists; 
                shareLists = fetchData(type, currentpage);
                if(shareLists.length <=0 ) {
                    getShareLists(type);
                }
                showShareLists(type);
            } else if(type == 3) {
                var serviceResidences = fetchData(3, currentpage);
                if(serviceResidences.length <= 0) {
                    searchResidenceByKeyword();             
                }
                showSearchResidenceByKeyword();
            }
        }
        invalidateNex();
        invalidatePre();
    }
    // 上一页
    function prevPage(type) {
        if (currentpage != 1) {
            currentpage -= 1;
            $("#residenceCurrPage").text(currentpage);
            if(type == 0) {
                showBrokerServiceResidences();
            } else if(type == 1 || type == 2) {
                showShareLists(type);
            }
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
  </script>
  <script type="text/javascript" src="/scripts/search/formatJS.js"></script> 
  <script type="text/javascript" src="/scripts/public/jquery-ui-1.10.4.custom.min.js"></script>
</html>
