var w=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
var h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
var curStatus, totalMoneyTextCount = 1, percentCount = 1, borrowyearsCount = 1, interestCount = 1;
var curInput,inputVal;
$(document).ready(function(){
    // var oDiv="<div></div>";
    // $(oDiv).css({'width':w+'px','height':h+'px','background':'#777'})
    //     .appendTo('body');
    var resultH = h*0.50;
    var keyH = h*0.50;
    var warnH = 0;

    var resultHeight = resultH * 0.45;
    var resultFontSize = resultHeight/4 - 4;
    var resultLineHeight = resultFontSize*1.3;
    var resultPad = (resultHeight - resultLineHeight)/3;
    var formHeight = resultH * 0.618;
    var inputGroupHeight = formHeight/3;
    var inputGroupMargin = (formHeight - inputGroupHeight*2)/5;
    var inputBoxHeight = textLineHeight = inputGroupHeight*2/3;
    var inputLineHeight = inputBoxHeight/2;
    var inputFontSize = inputLineHeight;
    var inputBoxPad = (inputBoxHeight - inputLineHeight)/2;
    var inputBoxMargin = (inputGroupHeight - inputBoxHeight)/2;

    var keyFontSize = keyH/12;
    $("#calculatorResult").css('height',resultH+'px');
    $("#calculatorKeyBoard").css('height',keyH+'px');

    $("#calculatorKeyBoard button").css('height',keyH/4+'px');
    $("#calculatorKeyBoard button.db").css('height',keyH/2+'px');

    $("#calculatorResult h4").css({'height':resultHeight-4+'px','line-height':resultLineHeight-6+'px','font-size':resultFontSize+'px','padding-top':resultPad+'px'});
    $("#calculatorResult .payment").css({'line-height':resultLineHeight+4+'px','font-size':resultFontSize+4+'px'});
    $("#calculatorResult form").css('height',formHeight+'px');
    $("#calculatorResult .input-group").css({'height':inputGroupHeight+'px','margin-top':inputGroupMargin+'px'});
    $("#calculatorResult .inputBox,#calculatorResult label,#calculatorResult .input-group span").css({'height':inputBoxHeight+'px','line-height':inputLineHeight+'px','margin-top':inputBoxMargin-2+'px','font-size':inputFontSize+'px'});
    $("#calculatorResult label,#calculatorResult .input-group span").css({'font-size':inputFontSize-4+'px'});
    $("#calculatorResult .inputBox").css({'padding-top':inputBoxPad+'px'});
    $("#calculatorResult label,#calculatorResult span").css('line-height',textLineHeight+'px');

    $("#calculatorKeyBoard button").css('font-size', keyFontSize+'px');
    $("#calculatorKeyBoard button.fund,#calculatorKeyBoard button.loan").css('font-size', keyFontSize - 4 +'px');
    $("#calculatorKeyBoard button.equal").css('font-size', keyFontSize + 20 +'px');
    $("#calculatorKeyBoard button.point").css('font-size', keyFontSize + 10 +'px');

    //当前选中的状态 1 总价  2首付比例 3贷款年限 4 利率
 
    // curInput = $('.inputBox').first().find(".input");
    $('.inputBox').each(function(){
        $(this).bind('tap',function(){
        	if($(this).find("#totalMoneyText").length > 0) {
        		curStatus = 1;
        		totalMoneyTextCount++;
        	} else if($(this).find("#percent").length > 0) {
        		curStatus = 2;
        		percentCount++;
        	} else if($(this).find("#borrowyears").length > 0) {
        		curStatus = 3;
        		borrowyearsCount++;
        	} else if($(this).find("#interest").length > 0) {
        		curStatus = 4;
        		interestCount++;
        	}
            inputVal=$(this).text();
            curInput = $(this).find(".input");
            $('.inputBox').removeClass('focus');
            $(this).addClass('focus');           
            //buttonOn($(this));
        })
    });
    $("button").tap(function() {

        if($(this).hasClass('num')){
        	virInput($(this));
        	//alert(curInput);
//            if(!curInput) {
//                curInput = $('.inputBox').first().find(".input");
//                inputVal=curInput.text();
//            }
//            if($(this).text() == '.' && $.trim(curInput.text()).length == 0) {
//            	inputVal = '0.';
//            } else {
//            	if(curStatus == 2) {
//            		if($(curInput).text().replace(/\s+/g,"").length >= 6) {
//                		return ;
//                	}
//            	} else if(curStatus == 3){
//            		if($(curInput).text().replace(/\s+/g,"").length >= 3 || $(this).text() == '.') {
//                		return ;
//                	}
//            	} else if(curStatus == 4){
//            		if(inputVal.indexOf(".") != -1) {
//            			if($(curInput).text().replace(/\s+/g,"").length >= 4) {
//                    		return ;
//                    	}
//            		} else {
//            			if($(curInput).text().replace(/\s+/g,"").length >= 3) {
//                    		return ;
//                    	}
//            		}
//            		
//            	} else {
//            		if($(curInput).text().replace(/\s+/g,"").length >= 6) {
//                		return ;
//                	}
//            	}
//            	if($(this).text() == '.') {
//                	if(inputVal.indexOf(".") != -1) {
//                		return;
//                	}
//                }
//                if(inputVal.indexOf(".") != -1) {
//                	if(inputVal.split(".")[1].length >= 2) {
//                		return;
//                	}
//                }
//                inputVal += $(this).text().toString();
//            }
//            $(curInput).text(inputVal.replace(/\s+/g,"")).parent().addClass('focus');
        }
        if($(this).hasClass('del')){
            if(!curInput) return;
            inputVal = '';
            $(curInput).text(inputVal).parent().addClass('focus');
        }
        if($(this).hasClass('fund')){
            $("#interest").text('3.25');
            //修改利率默认值
            $(this).addClass('on');
            $(".loan").removeClass('on');
        }
        if($(this).hasClass('loan')){
            $("#interest").text('5.15');
            //修改利率默认值
            $(this).addClass('on');
            $(".fund").removeClass('on');
        }
        if($(this).hasClass('equal')){
            inputVal = '';
//            $("#totalMoneyText").text('100');
//            $("#percent").text('100');
//            $("#borrowyears").text('100');
//            $("#interest").text('100');touchstart
            //计算结果
            calculate($("#percent").text(), $( "#borrowyears" ).text(), $("#interest").text(), $("#totalMoneyText").text());
        }
    });

    $("#totalMoneyText").parent().addClass('focus');
});

//输入域验证
function virInput(buttonObj) {
	if(!curInput) {
       curInput = $('.inputBox').first().find(".input");
       inputVal=curInput.text();
    }
	if(buttonObj.text() == '.' &&  $.trim(curInput.text()).length == 0 && curStatus != 2 && curStatus != 3) {
		inputVal = '0.';
	} else {
		if(curStatus == 2) {
			if(buttonObj.text() == '.'){
				return;
			}
			if(percentCount > 1) {
				inputVal = '';
				percentCount = 1;
			} else {
				if($(curInput).text().replace(/\s+/g,"").length >= 2) {
	    			return ;
	        	}
			}
    	} else if(curStatus == 3) {
    		if(borrowyearsCount > 1) {
				inputVal = '';
				borrowyearsCount = 1;
			} else {
				if($(curInput).text().replace(/\s+/g,"").length >= 2 || buttonObj.text() == '.') {
	    			return ;
	        	}
			}
    	} else if(curStatus == 4) {
    		if(inputVal.indexOf(".") != -1) {
    			if(interestCount > 1) {
					inputVal = '';
					interestCount = 1;
				} else {
					if($(curInput).text().replace(/\s+/g,"").length >= 4) {
	    				return ;
	            	}
				}
    		} else {
    			if(interestCount > 1) {
					inputVal = '';
					interestCount = 1;
				} else {
					if($(curInput).text().replace(/\s+/g,"").length >= 3) {
	    				return ;
	            	}
				}
    		}
    	} else {
    		if(totalMoneyTextCount > 1) {
				inputVal = '';
				totalMoneyTextCount = 1;
			} else {
				if($(curInput).text().replace(/\s+/g,"").length >= 6) {
	    			return ;
	        	}
			}
    	}
		
		if(buttonObj.text() == '.') {
        	if(inputVal.indexOf(".") != -1) {
        		return;
        	}
        }
        if(inputVal.indexOf(".") != -1) {
        	if(inputVal.split(".")[1].length >= 2) {
        		return;
        	}
        }
        inputVal += buttonObj.text().toString();
	}
	$(curInput).text(inputVal.replace(/\s+/g,"")).parent().addClass('focus');
}


$(function() {
	jsConfig();
//	setShareView();
	wx.ready(function () {
		setShareView();
	});  
//	$("onMenuShareAppMessage").tap(function() {
//		 wx.onMenuShareAppMessage({
//		      title: '最顺手的房贷计算器-真格在线1',
//		      desc: '复杂就是耍流氓',
//		      link: 'http://www.zhengor.com/WeiXinComment.action?goToCalculator',
//		      imgUrl: 'http://www.zhengor.com/images/defaultPic/home.jpg',
//		      trigger: function (res) {
//		      },
//		      success: function (res) {
//		        alert('已分享V');
//		      },
//		      cancel: function (res) {
//		      },
//		      fail: function (res) {
//		        alert(JSON.stringify(res));
//		      }
//		 });
//	});
//
//	$("onMenuShareAppMessage").tap(function() {
//		wx.onMenuShareTimeline({
//		      title: '最简单的房贷计算器',
//		      link: 'http://www.zhengor.com/WeiXinComment.action?goToCalculator',
//		      imgUrl: 'http://www.zhengor.com/images/defaultPic/home.jpg',
//		      trigger: function (res) {
//		      },
//		      success: function (res) {
//		        alert('已分享222');
//		      },
//		      cancel: function (res) {
//		      },
//		      fail: function (res) {
//		        alert(JSON.stringify(res));
//		      }
//		});
//	});
});

//wx.checkJsApi({
//    jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
//    success: function(res) {
//        // 以键值对的形式返回，可用的api值true，不可用为false
//        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
//    }
//});
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
			        'onMenuShareTimeline',
			        'onMenuShareAppMessage'
			      ]
			});
		}
	});
}

//document.querySelector('#onMenuShareAppMessage').onclick = function () {
//	alert("sd");
//    wx.onMenuShareAppMessage({
//      title: '最顺手的房贷计算器-真格在线1',
//      desc: '复杂就是耍流氓',
//      link: 'http://www.zhengor.com/WeiXinComment.action?goToCalculator',
//      imgUrl: 'http://www.zhengor.com/images/defaultPic/home.jpg',
//      trigger: function (res) {
//      },
//      success: function (res) {
//        alert('已分享V');
//      },
//      cancel: function (res) {
//      },
//      fail: function (res) {
//        alert(JSON.stringify(res));
//      }
//    });
//  };
//  
//  document.querySelector('#onMenuShareTimeline').onclick = function () {
//	    wx.onMenuShareTimeline({
//	      title: '最简单的房贷计算器',
//	      link: 'http://www.zhengor.com/WeiXinComment.action?goToCalculator',
//	      imgUrl: 'http://www.zhengor.com/images/defaultPic/home.jpg',
//	      trigger: function (res) {
//	      },
//	      success: function (res) {
//	        alert('已分享222');
//	      },
//	      cancel: function (res) {
//	      },
//	      fail: function (res) {
//	        alert(JSON.stringify(res));
//	      }
//	    });
//	  };

function setShareView() {
	wx.onMenuShareAppMessage({
	      title: '最真格的房贷计算器,收藏！',
	      desc: '只要好用,拒绝复杂【真格在线】',
	      link: 'http://www.zhengor.com/calculator',
	      imgUrl: 'http://www.zhengor.com/images/defaultPic/cal.jpg',
	      trigger: function (res) {
	      },
	      success: function (res) {
	        
	      },
	      cancel: function (res) {
	      },
	      fail: function (res) {
//	        alert(JSON.stringify(res));
	      }
	 });
	
	wx.onMenuShareTimeline({
	    title: '最真格的房贷计算器,收藏！', // 分享标题
	    link: 'http://www.zhengor.com/calculator', // 分享链接
	    imgUrl: 'http://www.zhengor.com/images/defaultPic/cal.jpg', // 分享图标
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
}

function calculate(percent, borrowyears, interest, total) {
//	var userreg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
//	!userreg.test(interest)
	if(interest == "") {
		$("#resultH4").hide();
		$("#errorH4").show();
		$("#errorMsg").html("请给利率");
	} else if(percent == "") {
		$("#resultH4").hide();
		$("#errorH4").show();
		$("#errorMsg").html("请给首付比例");
	} else if(borrowyears == "") {
		$("#resultH4").hide();
		$("#errorH4").show();
		$("#errorMsg").html("请给贷款年限");
	} else if(total == "") {
		$("#resultH4").hide();
		$("#errorH4").show();
		$("#errorMsg").html("请给总价");
	} else {
		$("#resultH4").show();
		$("#errorH4").hide();
		//计算出首付
		percent = cutPoint(percent);
		borrowyears = cutPoint(borrowyears);
		interest = cutPoint(interest);
		total = cutPoint(total);
		var downpaymentn = total * percent / 100;
		//计算出贷款金额
		var brrow = total - downpaymentn;
		var average_monthly;
		var pay_int;
		var repay_total;
		var int_expenditure;
		var average_monthly;
		var repay_total_2;
		var d =	parseFloat(borrowyears);		//dai kuan qi xian
		var e =	d*12;				//dai kuan zong yue shu
		var f =	parseFloat(brrow) * 10000;	//dai kuan jin e
		var g = parseFloat(interest) / 100;	//dai kuan li lv
		//yue jun huan kuan g*f/12+g*f/(Math.pow((1+g), e)-1);
		var monthly_repayment = g * f / 12 + (g * f / 12) / (Math.pow((1 + g / 12), e) - 1);
		//zhi fu li xi 
		var pay_int = monthly_repayment * e - f;
		//huan kuan zong e
		var repay_total = monthly_repayment * e;
		$("#downpayment").text(downpaymentn.toFixed(1));
		$("#mortgage").text(parseInt(monthly_repayment));
		$("#totalInterest").text((pay_int / 10000).toFixed(1));
		$("#totalMoneyText").text(total);
		$("#errorMsg").text("");

		if($(".interest").html().replace(/<[^>]+>/g,"").length*parseInt($(".interest").css("font-size"))>2*w){
            $(".interest").css('font-size', w/$(".interest").html().replace(/<[^>]+>/g,"").length*1.6+'px');
        }
	}
	
}

function cutPoint(num) {
	if(num.lastIndexOf(".") == num.length - 1) {
		num = num.substring(0, num.length - 1);
	}
	return num;
}
