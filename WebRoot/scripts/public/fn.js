var commuResidenceIds = [];

$(function() {
    Init();
    fnCreateRadiobox({
        ul: $(".rankOpt .radioBox"),
        boxUseType: 1
    });
    var oTime;
    $("#user,#userMenuList").mouseenter(function(event) {
        if (oTime) {
            clearTimeout(oTime);
        }
        $("#userMenuList").show();
    });
    $("#user,#userMenuList").mouseleave(function(event) {
        clearTimeout(oTime);
        oTime = setTimeout(function() {
            $("#userMenuList").hide();
        },
        200);

    });

    fnLogForm($(".loginBtn"), $("#logLi"), $("#logForm"), $("#loginId"), 1);
    fnLogForm($("#registerBtn"), $("#registerLi"), $("#regForm"), $("#regId"), 1);
    fnLogForm($("#logLi"), $("#logLi"), $("#logForm"), $("#loginId"));
    fnLogForm($("#registerLi"), $("#registerLi"), $("#regForm"), $("#regId"));

    $("#login_close").click(function() {
        showObj({
            para: 0,
            obj: $("#login")
        });
    });

    // 每个页面的标志位cookie都为两个，在下次迭代时去除上一次的，检查这一次的如：index 和 indexNew
    if (window.location.pathname == "/") {
        delCookie("indexNew", "", "/");
        if (getCookieValue("index") == "") {}
    }

    $('input,textarea').each(function() {
        $(this).placeholder();
    });

    if ($("#whichPage").val() == "search") {
        $(".menu li").siblings().children().removeClass("on");
        $("#issearch").addClass("on");
    } else if ($("#whichPage").val() == "search2") {
        $(".menu li").siblings().children().removeClass("on");
        $("#issearch2").addClass("on");
    } else if ($("#whichPage").val() == "searchResidence") {
        $(".menu li").siblings().children().removeClass("on");
        $("#issearchResidence").addClass("on");
    } else if ($("#whichPage").val() == "channel") {
        $(".menu li").siblings().children().removeClass("on");
        $("#ischannel").addClass("on");
    } else if ($("#whichPage").val() == "postEntrusting") {
        $(".menu li").siblings().children().removeClass("on");
        $("#isentrust").addClass("on");
    }

    // $(window).scroll(function(){
    // //$(document).scrollTop();
    // var scrollY = $(document).scrollTop() || document.body.scrollTop;
    // $("#header").css({"left":0,"top":0,"z-index":1100});
    // //InitFriend();
    // // if($(".browser").length>0){
    // // $(".browser").css({'top':$(window).height()-50+scrollY+'px'});
    // // }
    // });
    $(window).resize(function() {
        Init();
        // InitFriend();
    });

    $("#linlClause").click(function() {
        fnCreatePopBox({
            title: '使用条款',
            coverlayer: false,
            className: 'divPop-max clause',
            divContent: "<div class='divText'><p>本网站由北京真格在线科技有限公司（以下简称“真格”）拥有、管理和维护。</p><p>请本网站使用者（以下称“您”或者“用户”）在使用本网站之前仔细阅读以下条款，如果您使用本网站、或与本网站链接即表明您承认您已阅读、理解并同意受这些条款的约束，并遵守所有适用的法律和法规；如果您不同意这些条款，请不要使用本网站或链接至本网站。</p><p>真格可随时更新本使用条款以及本网站中包含的任何其他信息，而无需通知您；真格还可以随时对本网站中描述的服务及内容进行改进或更改，而无需另行通知。</p><h4>一、网站使用</h4><p>未经真格事先的书面同意，不得复印、复制、再次公布、上载、张贴、传播、分发或使用本网站及其中的任何内容创作演绎作品。您使用本网站的条件是：您不修改本网站上显示的内容，完整地保留所有的版权、商标和其他专有权声明并且您接受该内容随附的任何条款、条件和声明，及本网站中的所有其他规定。尽管有上述规定，可从本网站下载、访问或进行其他使用的任何内容须受各自的许可条款、条件和声明的约束。</p><p>如果您未遵守本网站上的条款、条件和声明，则您使用本网站的权利将自动终止，而无需事先通知，并且您必须立即销毁您所拥有或掌握的所有已下载资料副本。真格不授予您关于任何商标、版权或其他专有权或知识产权的任何明示的或暗含的权利或许可。</p><h4>二、网站信息</h4><p>1、本网站上的信息不附带任何有关正确性、最新性及完整性的承诺和保证，并且本网站可能包含有不够准确的地方或输入排版错误。真格不承担以下责任（且明确声明免除以下责任）：更新本网站使信息保持最新、或者确保任何已发布信息的准确性或完整性。因此，基于本网站的信息作出任何决策之前，您应该确认所有信息的准确性和完整性。</p><p>2、本网站所转载的内容并不代表本网站的意见或观点，也不意味着本网站赞同其观点或证实其内容的真实性。</p><p>3、对于本网站用户发布的所有信息，其真实性、准确性、合法性由发布者负责，本网站不提供任何保证、也不承担任何法律责任；这些信息如果侵犯了第三方的知识产权或其它权利，全部责任由发布者本人承担，本网站对此不承担任何责任。</p><h4>三、第三方网站链接</h4><p>本网站提供对第三方网站的链接，这些链接仅作为一种方便提供给您。真格对于任何非真格的网站不作任何声明、保证或其他承诺，即使这些第三方网站可能引用了任何真格的网站。到某个非真格网站点的链接并不意味着真格认可此类网站点的内容、使用或其所有者。此外，真格不是您可能与任何第三方签署协议的任何交易的一方、也不对任何交易负责，即使您从真格的网站了解到此类第三方（或使用到此类第三方的链接）的情况下也是如此。因此，您承认并同意，真格不对任何非真格的网站的可用性负责，也不对可从那些网站或资源上获得的任何内容、服务、产品或其他资料承担任何责任或义务。</p><p>当您访问某个非真格的网站点（即使该站点可能包含真格的徽标），请理解该网站与真格无关并且真格不控制该网站上的内容。您须谨慎从事，避免遭受病毒和其他可能的破坏性程序入侵并采取您认为适当的方式保护您的信息；如果您决定访问任何与本网站链接的第三方网站，其可能带来的结果和风险全部由您自己承担。</p><h4>四、到本网站的链接</h4><p>到本网站的所有链接必须经过真格书面同意。除非真格同意该链接以及由该链接激活的页面并不：<p>（1）围绕本网站上的任何页面创建框架或使用其他以任何方式改变本网站内任何内容及其视觉效果或外观；</p><p>（2）歪曲或不正确地描述您与真格之间的关系；</p><p>（3）暗示真格同意或认可您、您的网站、您提供的服务或产品；并且</p><p>（4）提供任何有关真格的错误的或令人误解的印象、或者以其他方式损害与真格名称或商标相关的商誉。要获得链接到本网站的许可权，您还须同意，真格可以随时自主决定终止链接到本网站的许可权；在这种情况下，您同意立即除去到本网站的所有链接并停止使用任何真格徽标。</p><h4>五、隐私保护</h4><p>1、本网站可能会接收到这些信息：</p><p>（1）访问者信息</p><p>我们将通过您的IP地址、或者在您的浏览器设置Cookie来记录您作为访问者的一些信息，例如您的浏览器类别、操作系统版本、网络服务提供商、访问时间、页面等，以优化对您呈现的页面和内容、改进对您的服务。</p><p>（2）个人资料</p><p>当您在本网站注册、或获取某些服务时，经您同意，本网站将要求您提供一些个人资料，例如：</p><p>识别资料，如：姓名、性别、年龄、出生日期、身份证号码（或护照号码）、电话、通信地址、住址、电子邮件地址等。</p><p>背景资料，如：工作单位、职业、职务、教育程度、收入水平、婚姻、家庭状况等。</p><p>（3）机构资料</p><p>当您所代表的机构在本网站注册、或获取某些服务时，经您所代表机构同意，本网站将要求您提供该机构资料。例如：机构名称、地址、电话、电子邮件地址、法人代表人姓名、营业执照号码、组织机构代码等。</p><p>2、真格并不想通过本网站接收您的保密信息或专有信息。将任何信息或资料发送至真格，您即授予真格无限制的、不可撤销的使用权，允许真格按自己的方式使用这些资料或信息。</p><p>您同意真格可以通过您提供的电话、电子邮件、地址，采用通话、邮寄、发送电子邮件、发送手机短信等方式与您联系。</p><p>3、真格不会将上述资料用于本网站提供服务之外的其它目的，不会泄露您的个人、机构资料或以其他方式公布您向真格提交资料或其它信息这一事实，除非：</p><p>（1）得到您的同意；或者</p><p>（2）真格事先通知您提交至本网站某特定部分的资料或其他信息将被发布；或者</p><p>（3）法律法规要求。</p><p>4、下列情况导致上述资料泄露、丢失、被盗用或被篡改时，本网站不承担任何责任：</p><p>（1）您将网站账号密码告知他人、或与他人共享网站账号、或者您用于身份认证的电邮或手机为他人所用。</p><p>（2）系统软硬件Bug、网络故障、电力故障、黑客政击、计算机病毒等。</p><h4>六、不保证声明</h4><p>使用本网站所带来的风险由您自行承担。本网站的所有资料、信息、服务均“按现状”提供，不附有任何形式的保证或担保。在法律许可的最大范围内，真格明确声明免除所有明示的、暗含的、法定的和其他保证、担保、声明或承诺，包括但不限于有关适销、适用于某种特定用途以及有关所有权和知识产权的非侵权的保证。真格不保证此网站会中断、及时、安全或无错误。</p><p>您理解并同意，如果您从本网站以任何方式获得资料、信息，则您自行决定执行上述操作，且风险由您自行承担，并且您须自行负责可能产生的任何损害或赔偿。</p><h4>七、免责声明</h4><p>任何情况下，对于本网站导致的、或由于使用本网站、或由于使用链接到、引用本网站、或通过本网站访问的任何网站或资源，或者由于使用、下载或访问任何资料、信息或服务而导致的、或与之相关的任何直接的、间接的、附带的、特别的、惩戒性的或任何种类的后果性的损害赔偿，包括但不限于任何利润的损失、商业中断、可节省金额的损失或其他数据的丢失，真格均不对任何一方负责，即使真格已被明确告知可能有此类损害赔偿时，也是如此。由用户自行承担使用本网站的风险。</p><p>本网站提供的特定资料、信息和服务可能附加不同的条款、条件或声明。如有任何冲突，此类附加的或不同的条款、条件和声明将优先适用于本使用条款。</p><h4>八、法律法规</h4><p>您在使用本网站的过程中必须遵守国家法律和法规、对自己的言论和行为承担责任。如果您的言论或行为违反国家的法律或法规，本网站可随时不经事先通知终止向您提供服务。</p><h4>九、解释权</h4><p>真格拥有对本网站及本使用条款的最终解释权。</p></div>",
            confirmBtn: '我已了解'
        })
    });

    // fnSecUi.js begin ===========
    if ($(".menu").length > 0) {
        $(".menu li").click(function() {
            $(this).addClass('on').siblings().removeClass('on');
            $(this).parents('.menuDiv').find('.menuContent').eq($(this).index()).show().siblings('.menuContent').hide();
        });
        $(".menu").each(function() {
            $(this).children('li').first().click();
        });
    }
    $(".optInput").click(function() {
        $(this).children(".fillSec").focus();
    });

    $(".fillSec").focus(function() {

        $("ul.selectList").parent().css('position', 'relative').end().hide();
        if ($("#houseTypeInput").length > 0 && $("#houseTypeInput").val() == '租房' && $(this).parents("li").hasClass("price")) {
            $(this).next().next().next().fadeIn(200);
        } else {
            $(this).next().next().fadeIn(200);
        }
        if ($(this).hasClass("optInput")) {
            $(this).next().fadeIn(200);
        }
    });

    $(".fillSec").blur(function() {
        $(this).nextAll("ul.selectList").fadeOut("200");
    });

    $("ul.selectList li").mouseenter(function() {
        $(this).addClass("over").siblings().removeClass("over");
    });
    $("ul.selectList li").mouseout(function() {
        $(this).removeClass("over");
    });

    $("ul.selectList li").click(function(e) {
        $(this).parent().prevAll(".fillSec").first().val($(this).text()).change();
        stopProp(e);
        $(this).parent().fadeOut(200);
    });
    // fnSecUi.js end
});

function setCookie(name, value, hours, path) {
    var name = escape(name);
    var value = escape(value);
    var expires = new Date();
    expires.setTime(expires.getTime() + hours * 86400000);
    path = path == "" ? "": ";path=" + path;
    expires = (typeof hours) == "string" ? "": ";expires=" + expires.toUTCString();
    document.cookie = name + "=" + value + expires + path;
}

function getCookieValue(name) {
    var name = escape(name);
    // 读cookie属性，这将返回文档的所有cookie
    var allcookies = document.cookie;
    // 查找名为name的cookie的开始位置
    name += "=";
    var pos = allcookies.indexOf(name);
    // 如果找到了具有该名字的cookie，那么提取并使用它的值
    if (pos != -1) { // 如果pos值为-1则说明搜索"version="失败
        var start = pos + name.length; // cookie值开始的位置
        var end = allcookies.indexOf(";", start); // 从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
        if (end == -1) end = allcookies.length; // 如果end值为-1说明cookie列表里只有一个cookie
        var value = allcookies.substring(start, end); // 提取cookie的值
        return unescape(value); // 对它解码
    } else return ""; // 搜索失败，返回空字符串
}

// 为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
function delCookie(name, value, path) {
    var name = escape(name);
    var value = escape(value);
    var expires = new Date();
    expires.setTime(expires.getTime() - 1);
    path = path == "" ? "": ";path=" + path;
    expires = (typeof hours) == "string" ? "": ";expires=" + expires.toUTCString();
    document.cookie = name + "=" + value + expires + path;
}

function fnBrowser() {
    var browser = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    if (!version[1]) {
        return false;
    }
    var trim_Version = version[1].replace(/[ ]/g, "");
    if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
        return 6;
    } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
        return 7;
    } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
        return 8;
    } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
        return 9;
    } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE10.0") {
        return 10;
    }
}

function stopProp(event) {
    if (event.stopPropagation) {
        // this code is for Mozilla and Opera
        event.stopPropagation();
    } else if (window.event) {
        // this code is for IE
        window.event.cancelBubble = true;
    }
}

// function InitFriend(){
// if($("#toFriend").length>0)
// {
// CoorLeft = $("#toFriend").parent().offset().left-250;
// CoorTop = $("#toFriend").parent().offset().top + 65;
// //alert(CoorLeft+','+CoorTop);
// $("#friend").css({"left":CoorLeft+'px',"top":CoorTop+'px'});
// }
// }
function fnTextVerify(oInput, span, count) {
    var curLength;

    curLength = oInput.val() ? oInput.val().length: 0;
    span.text('还能输入' + (count - curLength) + '字');
    oInput.on('input propertychange',
    function() {
        if ($.syncProcessSign) return;
        $.syncProcessSign = true;
        if (count - $(this).val().length >= 0) {
            span.text('还能输入' + (count - $(this).val().length) + '字');
            span.removeClass('warningNum');
            oInput.removeClass('warningInput');
            $.syncProcessSign = false;
        } else {
            span.text('超出' + ($(this).val().length - count) + '字').addClass('warningNum');
            oInput.addClass('warningInput');
            $.syncProcessSign = false;
        }
    });
}

(function($, undefined) {
    $.fn.placeholder = function(options) {
        var defaults = {
            labelMode: false,
            labelStyle: {},
            labelAlpha: false,
            labelAcross: false
        };
        var params = $.extend({},
        defaults, options || {});

        // 方法
        var funLabelAlpha = function(elementEditable, elementCreateLabel) {
            if (elementEditable.val() === "") {
                elementCreateLabel.css("opacity", 0.4).html(elementEditable.data("placeholder"));
            } else {
                elementCreateLabel.html("");
            }
        },
        funPlaceholder = function(ele) {
            // 为了向下兼容jQuery 1.4
            if (document.querySelector) {
                return $(ele).attr("placeholder");
            } else {
                // IE6, 7
                var ret;
                ret = ele.getAttributeNode("placeholder");
                // Return undefined if nodeValue is empty string
                return ret && ret.nodeValue !== "" ? ret.nodeValue: undefined;
            }
        };

        $(this).each(function() {
            var element = $(this),
            isPlaceholder = "placeholder" in document.createElement("input"),
            placeholder = funPlaceholder(this);

            // 三种情况打酱油
            // ① 没有placeholder属性值
            // ② value模拟，同时是支持placeholder属性的浏览器
            // ③ label模拟，但是无需跨浏览器兼容，同时是支持placeholder属性的浏览器
            if (!placeholder || (!params.labelMode && isPlaceholder) || (params.labelMode && !params.labelAcross && isPlaceholder)) {
                return;
            }

            // 存储，因为有时会清除placeholder属性
            element.data("placeholder", placeholder);

            // label模拟
            if (params.labelMode) {
                var idElement = element.attr("id"),
                elementLabel = null;
                if (!idElement) {
                    idElement = "placeholder" + Math.random();
                    element.attr("id", idElement);
                }

                // 状态初始化
                elementLabel = $('<label for="' + idElement + '"></label>').css($.extend({
                    lineHeight: "1.3",
                    position: "absolute",
                    color: "#999",
                    cursor: "text",
                    marginLeft: element.css("marginLeft"),
                    marginTop: element.css("marginTop"),
                    paddingLeft: element.css("paddingLeft"),
                    paddingTop: element.css("paddingTop")
                },
                params.labelStyle)).insertBefore(element);

                // 事件绑定
                if (params.labelAlpha) {
                    // 如果是为空focus透明度改变交互
                    element.bind({
                        "focus": function() {
                            funLabelAlpha($(this), elementLabel);
                        },
                        "input": function() {
                            funLabelAlpha($(this), elementLabel);
                        },
                        "blur": function() {
                            if (this.value === "") {
                                elementLabel.css("opacity", 1).html(placeholder);
                            }
                        }
                    });

                    // IE6~8不支持oninput事件，需要另行绑定
                    if (!window.screenX) {
                        element.get(0).onpropertychange = function(event) {
                            event = event || window.event;
                            if (event.propertyName == "value") {
                                funLabelAlpha(element, elementLabel);
                            };
                        };
                    }

                    // 右键事件
                    elementLabel.get(0).oncontextmenu = function() {
                        element.trigger("focus");
                        return false;
                    };
                } else {
                    // 如果是单纯的value交互
                    element.bind({
                        "focus": function() {
                            elementLabel.html("");
                        },
                        "blur": function() {
                            if ($(this).val() === "") {
                                elementLabel.html(placeholder);
                            }
                        }
                    });
                }

                // 内容初始化
                if (params.labelAcross) {
                    element.removeAttr("placeholder");
                }

                if (element.val() === "") {
                    elementLabel.html(placeholder);
                }
            } else {
                // value模拟
                element.bind({
                    "focus": function() {
                        if ($(this).val() === placeholder) {
                            $(this).val("");
                        }
                        $(this).css("color", "");
                    },
                    "blur": function() {
                        if ($(this).val() === "") {
                            $(this).val(placeholder).css("color", "#999");
                        }
                    }
                });

                // 初始化
                if (element.val() === "") {
                    element.val(placeholder).css("color", "#999");
                }
            }
        });
        return $(this);
    };
})(jQuery);

function CoverLayer(para) {
    if (para) {
        var cover = $('<div id=coverLayer></div>');
        cover.appendTo($("body"));
        // if (document.documentElement && document.documentElement.scrollTop) {
        // scroll_top = document.documentElement.scrollTop;
        // }
        // else if (document.body) {
        // scroll_top = document.body.scrollTop;
        // }
        cover.css({
            "width": $(document.body).width() + 16 + 'px',
            "height": $(document.body).height(),
            "top": 0
        });
        $("body").css({
            "overflow": "hidden"
        });
    } else {
        $("#coverLayer").remove();
        $("body").css({
            'overflow-y': 'auto',
            'height': 'auto'
        });
    }
}

function showObj(myObj) {
    // para,obj,left,top
    if (myObj.para == 1) {
        var objWH = getObjWh(myObj.obj);
        CoverLayer(1);
        var tbT = myObj.top || (parseInt(objWH.split("|")[0]) - 50) + "px";
        var tbL = myObj.left || objWH.split("|")[1] + "px";
        myObj.obj.css({
            top: tbT,
            left: tbL,
            display: "block"
        });
        $(window).scroll(function() {
            resetBg(myObj.obj);
        });
        $(window).resize(function() {
            resetBg(myObj.obj);
        });
    } else if (myObj.para == 0) {
        CoverLayer(0);
        // Init();
        // $("body").css({'overflow':'auto','height':'auto'});
        myObj.obj.hide();
    }

}

function fnLogForm(btn, menuLi, form, input, show) {
    $(btn).click(function() {
        if (show) {
            var topCoor = 100 + $(window).scrollTop() + 'px';
            showObj({
                para: 1,
                obj: $("#login"),
                top: topCoor
            });
        }
        $(menuLi).addClass('on').siblings().removeClass('on');
        $(".normalLogin form").eq($(menuLi).index()).show().siblings('form').hide();
        $(input).focus();
    })
}

function getObjWh(obj) {
    if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
    } else if (document.body) {
        scroll_top = document.body.scrollTop;
    }
    scroll_top = scroll_top > 0 ? (scroll_top - 50) : 0;
    var st = scroll_top; // 滚动条距顶部的距离
    var sl = document.documentElement.scrollLeft; // 滚动条距左边的距离
    var ch = window.screen.availHeight; // 屏幕的高度
    var cw = window.screen.availWidth; // 屏幕的宽度
    var objH = $(obj).height(); // 浮动对象的高度
    var objW = $(obj).width(); // 浮动对象的宽度
    var objT = Number(st) + (Number(ch) - Number(objH)) / 2;
    var objL = Number(sl) + (Number(cw) - Number(objW)) / 2;
    // alert(Number(st)+","+Number(ch)+","+Number(objH));
    // alert(st+','+ch);
    // alert('objH'+objH+'objW'+objW);
    return objT + "|" + objL;
}
function resetBg(obj) {
    if ($("#coverLayer").length > 0) {
        var bH2 = $(document).height();
        var bW2 = $("#main").width() + 16;
        $("#coverLayer").css({
            width: bW2,
            height: bH2
        });
        var objV = getObjWh(obj);
        var tbT = objV.split("|")[0] + "px";
        var tbL = objV.split("|")[1] + "px";
        obj.css({
            top: tbT,
            left: tbL
        });
    }
}
// fnPopup.js end============
function Init() {
    $("#main,.main").css({
        'min-height': '',
        'height': ''
    });
    var bodyHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;

    if (($(".shortPage").length <= 0) || ($("#main").height() >= bodyHeight - 134) || ($(".main").height() >= bodyHeight - 134)) {
        return false;
    } else {
        $("#main,.main").css('height', bodyHeight - 132 + 'px');
        var tv = fnBrowser();
        if (tv && tv <= 8) {
            $("#main,.main").css('height', bodyHeight - 50 + 'px');
        }
    }

}

function score(id) {
    var oPf = document.getElementById(id);
    var aStar = oPf.getElementsByClassName('star');
    var oText = oPf.getElementsByTagName('span')[0];
    var description = ['不推荐', '较差', '一般', '推荐', '力荐'];
    var i = 0;

    for (i = 0; i < aStar.length; i++) {
        aStar[i].index = i;
        aStar[i].onmouseover = function() {
            for (i = 0; i < aStar.length; i++) {
                if (i <= this.index) {
                    // console.log(i,this.index);
                    aStar[i].className += 'on';
                    oText.innerText = (this.index + 1) + '分 ' + description[i];
                } else {
                    aStar[i].className = 'star';
                }
                // if()
            }
        };

        aStar[i].onmouseout = function() {
            oText.innerText = '';
        };
        aStar[i].onmousedown = function() {
            // alert('提交成功:'+(this.index+1)+'分');
            oText.innerText = (this.index + 1) + '分 ' + description[this.index];
        };
    }
}

function changeGroups(div, btn, count) {
    // count 每组显示数量
    // groupCount 总组数,showCount当前显示组数
    var groupCount = Math.ceil($(div).children().length / count);
    $(div).children().hide().slice(0, count).show();
    var showCount = 0;
    $(btn).click(function() {
        showCount++;
        showCount %= groupCount;
        $(div).children().hide().slice(showCount * count, (showCount + 1) * count).show();
    });
}

/**
 * 城市类
 */
var CityClass = {
    // 城市代码表
    cityCodeTable: {
        '北京': 110000
    },
    // 城市中心坐标
    cityCenter: {
        '110000': {
            lng: 116.404,
            lat: 39.915
        }
    },
    // 获取用户当前所在城市的代码
    getCurrentCityCode: function() {
        if ($("#cityCode").val()) return $("#cityCode").val();
        return '110000';
    }
};

function alertDialog(content) {
    fnCreatePopBox({
        className: "alertBoxWithBtn",
        title: "提示",
        divContent: "<div class='divText' style='text-align:center;font-size:14px;'>" + content + "</div>",
        width: '350px',
    });
};

// function alertSetTime(content) {
// fnCreatePopBox({
// className: "alertBox",
// divContent: "<div class='divText'
// style='text-align:center;font-size:14px;'>"+content+"</div>",
// noBtn: true,
// width: '200px',
// coverlayer: false
// });
// };
function confirmDialog(content, callback) {
    fnCreatePopBox({
        className: "confirmBox",
        title: "确认",
        divContent: "<div class='divText' style='text-align:center;font-size:14px;'>" + content + "</div>",
        fn: callback,
        width: '350px'
    });
};

function alertSetTime(content, time, left, top) {
    fnCreatePopBox({
        className: "alertBox",
        divContent: "<div class='divText' style='text-align:center;font-size:14px;'>" + content + "</div>",
        noBtn: true,
        width: '250px',
        coverlayer: false,
        setTime: time,
        left: left,
        top: top
    });
}

function fnCreatePopBox(popBox) {
    // popBox.coverlayer:默认为true,加载coverlayer
    // popBox.left,popBox.top:默认为屏幕中心显示
    // popBox.parentDiv:默认加入的父级元素
    // popBox.title:标题(文本,也可以是div)
    // popBox.closeBtn:关闭按钮(true,false)
    // popBox.divContent:弹出层中内容部分(div结构)
    // popBox.confirmBtn:确认按钮(弹出层下方),默认为true,若为汉字则显示为按钮文字.
    // popBox.confirmBtnInline: 默认false 按钮是否整行显示,设置true则不整行
    // popBox.cancelBtn:取消按钮(弹出层下方),默认为false,若为汉字则显示为按钮文字.
    // popBox.setTime:自动关闭弹出层时间,与confirmBtn同时存在则忽略
    // popBox.fn 回调函数
    // popBox.removeThis 是否点击确定关闭当前弹出层,默认为true,置为false可手动触发
    // popBox.className: 除divPop外的标志类名
    // popBox.width:popBox.height
    // popBox.clear: false默认不清除其他弹出层
    // var warn = {
    // cancelBtn:'取消',
    // removeThis:false,
    // divContent:"<div class='divText'>调整幅度超过10%,确认调整价格吗?</div>"
    // alert提示框样式.如果没有取消按钮去掉这个参数即可.如果文字内容超过一段,那么每段内容嵌套P标签
    // 其他参数自选
    // }
    // $(".divPop").remove();
    if (popBox.clear) {
        $(".divPop").not("#login").remove();

    }
    if (!popBox.className) {
        popBox.className = '';
        var popClass = '.divPop';
    } else {
        var popClassArr = popBox.className.split(' ');
        var popClass = '.divPop.' + popClassArr.join('.');
    }
    var box = "<div class='divPop " + popBox.className + "'>";

    if (popBox.title) {
        box += "<h5>" + popBox.title;
        if (popBox.closeBtn != false) {
            box += "<span class='zgIcon zgIcon-remove closeBtn'></span></h5>";
        } else {
            box += "</h5>";
        }
    }

    if (popBox.divContent) {
        box += "<div class='divContent'>" + popBox.divContent + "</div>";
    }

    if (popBox.noBtn == undefined) {
        if ((popBox.confirmBtn == undefined || popBox.confirmBtn != false) && (popBox.cancelBtn == undefined || popBox.cancelBtn == false)) {
            var text = popBox.confirmBtn || '确定';
            box += "<div class='divBtn'><button type='button' class='btn btn-primary confirmBtn";
            if (popBox.confirmBtnInline != false) {
                box += " inline";
            }
            box += "'>" + text + "</button></div>";
        } else if ((popBox.confirmBtn == undefined || popBox.confirmBtn != false) && !(popBox.cancelBtn == undefined || popBox.cancelBtn == false)) {
            var confirmText = popBox.confirmBtn || '确定';
            var cancelText = popBox.cancelBtn || '取消';
            box += "<div class='divBtn divBtnHasCancel'><button type='button' class='btn btn-danger cancelBtn'>" + cancelText + "</button><button type='button' class='btn btn-primary confirmBtn'>" + confirmText + "</button></div>";
        }
    }

    box += "</div>";
    // 生成DIV基本内容
    if (popBox.coverlayer != false) {
        CoverLayer(1);
    }
    // 显示黑色背景div
    var parentDiv = popBox.parentDiv ? popBox.parentDiv: 'body';
    $(parentDiv).css('position', 'relative');

    $box = $(box);
    $box.appendTo($(parentDiv)).css({
        display: "block",
        position: 'absolute',
        'z-index': '22000'
    });

    if (popBox.width) {
        $(popClass).css({
            'width': popBox.width,
        });
    }
    if (popBox.height) {
        $(popClass).css({
            'height': popBox.height,
        });
    }
    if (popBox.left == undefined && popBox.top == undefined) {
        var objWH = getObjWh($box);
        var tbT = (parseInt(objWH.split("|")[0])) - 50 + "px";
        var tbL = objWH.split("|")[1] + "px";
        $(popClass).css({
            top: tbT,
            left: tbL
        });
    } else {
        $(popClass).css({
            'top': popBox.top,
            'left': popBox.left
        });
    }
    // 计算弹出层显示位置,若不定义坐标则显示在屏幕中央
    if (popBox.setTime) {
        if (popBox.fn) {
            popBox.fn();
        }
        var time = setTimeout(function() {
            $(".divPop").remove();
        },
        popBox.setTime);
        return;
    }

    if (popBox.confirmBtn != false) {
        $(".divPop").find(".confirmBtn").bind('click',
        function() {
            if (popBox.fn) {
                popBox.fn();
            }
            if (popBox.removeThis != false) {
                removePop($(this));
            }
        });
    }
    if (popBox.cancelBtn != false) {
        $(".divPop").find(".cancelBtn").bind('click',
        function() {
            if (popBox.removeThis != false) {
                removePop($(this));
            }
        });
    }
    if (popBox.closeBtn != false) {
        $(".divPop").find(".closeBtn").bind('click',
        function() {
            removePop($(this));
        });
    }
    function removePop($this) {
        $this.parents(".divPop").remove();
        if (popBox.coverlayer != false && $("#coverLayer").length > 0) {
            CoverLayer(0);
        }
    }
}

// 2015.8.28
function fnCreateRadiobox(radioBox) {
    // radioBox.ul 执行选择的ul 默认为.radioBox
    // radioBox.input 取值的input $("ul.radioBox").prev('input');
    // radioBox.oradioBoxnClass 选中状态li的类 默认为on
    // radioBox.valBox 是否直接取li的值,默认为是(即无定义), 若定义则为取值子类的class
    radioBox.ul = radioBox.ul || $("ul.radioBox");
    if (radioBox.haveOtherOption) {
        radioBox.input = radioBox.input || radioBox.ul.next('input');
        if (radioBox.input.length == 0) radioBox.ul.prev('input');
    } else {
        radioBox.input = radioBox.input || radioBox.ul.prev('input');
    }
    radioBox.onClass = radioBox.onClass || 'on';
    $(radioBox.ul).children().last().css('margin-right', '0');
    $(radioBox.ul).children().click(function() {
        $(this).addClass(radioBox.onClass).siblings().removeClass(radioBox.onClass);
        if (radioBox.input === false) {
            return;
        }
        var $this = $(this);
        if (radioBox.boxUseType) {
            var radioAttr = radioBox.valBox ? $this.find(radioBox.valBox).attr("useType") : $this.attr("useType") || $this.text();
        } else {
            if (radioBox.boxUseType != undefined) {
                var val = $this.attr("useType");
                $(radioBox.input).val($this.attr("useType"));
            } else {
                var radioText = radioBox.valBox ? $this.find(radioBox.valBox).text() : $this.text();
            }
        }
        radioBox.input.val(radioAttr || radioText);
        if (radioBox.haveOtherOption && $(this).hasClass("optSec")) {
            radioBox.input.val("");
        }
        // if(radioBox.valBox){
        // if(radioBox.boxUseType != undefined) {
        // $(radioBox.input).val($this.find(radioBox.valBox).attr("useType"));
        // } else {
        // $(radioBox.input).val($(this).find(radioBox.valBox).text());
        // }
        // }
        // else{
        // $(radioBox.input).val($(this).text());
        // }
    });
}

function fncreateCheckbox(checkbox) {
    // checkbox.ul 执行选择的ul 默认为.checkbox
    // checkbox.input 取值的input $("ul.checkbox").prev('input');
    // checkbox.onClass 选中状态li的类 默认为on
    // checkbox.valBox 是否直接取li的值,默认为是(即无定义), 若定义则为取值子类的class
    checkbox.ul = checkbox.ul || $("ul.checkbox");
    checkbox.input = checkbox.input || $("ul.checkbox").prev('input');
    checkbox.onClass = checkbox.onClass || 'on';

    $(checkbox.ul).children().click(function() {
        $(this).toggleClass(checkbox.onClass);
    });

}

function fnCreateSelectUl(selectUl, input, ac1, ac2, fn) {
    // 默认input类为fillSec
    input = input || $(selectUl).prevAll('.fillSec');
    ac1 = ac1 || 'focus';
    ac2 = ac2 || 'blur';
    // $(input).addClass('selectArrow').css({'background-position-x':
    // $(input).width()-10+'px','background-position-y': '-50px'});
    $(input, selectUl).bind(ac1,
    function(event) {
        $(".selectUl").fadeOut(100);
        $(selectUl).fadeIn(100);
    });
    $(input).bind(ac2,
    function(event) {
        $(".selectUl").fadeOut(100);
    });
    $(selectUl).find('.option').click(function() {
        if ($(input).is(input)) {
            $(input).val($(this).text());
        } else {
            $(input).text($(this).text());
        }
        $(selectUl).fadeOut(100);
        if (fn) {
            fn();
        }
    });
}
function fnCreateTabContent(tabIndex, tabDetail, fn) {
    // $(tabDetail).first().show().siblings().hide();
    $(tabDetail).eq($(tabIndex).children('li.on').index()).show().siblings(tabDetail).hide();
    $(tabIndex).children('li').not('.line').click(function() {
        $(this).addClass('on').siblings().removeClass('on');
        $(tabDetail).eq($(this).index()).show().siblings(tabDetail).hide();
        if (fn) {
            fn($(tabDetail).eq($(this).index()));
        }
    });
}

// 颜色表
var zgColor = {
    "blue": "#4BA5FB",
    "blue2": "#198DFA",
    "red": "#FB4B4E",
    "red2": "#F50509",
    "green": "#4EFB4B",
    "green2": "#09F505",
    "orange": "#FFCC33"
};

// function fnShowOptInput(opt,input,onClass){
// opt = opt || 'optSec';
// onClass = onClass || 'secInput';
// input = $(opt).parents('ul').siblings(onClass) ||
// $(opt).parents('ul').next('input');
// $(opt).click(function(){
// $(input).toggleClass(onClass);
// });
// }
