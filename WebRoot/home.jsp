<%@ page pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>真格租房，你的专属电子经纪人</title>
        <meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
		<meta name="description" content="真格租房，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！北京房屋出租，北京房屋租赁"/>
        <%@ include file="/zinclude/public.jsp"%>
        <link rel="stylesheet" type="text/css" href="/css/css/func/home.css">
        <script type="text/javascript" src="/scripts/home/home.js"></script>
    </head>
    <body>
        <div id="main">
            <div class="slider">
                <div class="flexslider">
                    <div class="text">
                        <!-- <h2>选对回家的路</h2> -->
                        <div class="searchPan">
                            <input type="text" id="keyword" placeholder='你的工作、学习地点'/>
                            <input type="hidden" id="lngLat"/>
                            <button type='button' class="btn btn-danger lg-btn" id="beginRent">找房</button>
                        </div>
                    </div>
                    <ul class="slides">
                        <li class="a1">
                            <!-- <img src="/images/home/a1.jpg" />
                            <strong>一站式在线直租
                            </strong>
                            <span><i class="zgIcon zgIcon-addtop"></i>实名验证<i class="zgIcon zgIcon-addtop"></i>快速租房<i class="zgIcon zgIcon-addtop"></i>安全轻松有保障</span>
                            <span>实名验证<b class='plus'>＋</b>快速租房<b class='plus'>＋</b>安全轻松有保障</span> -->
                        </li>
                        <li class="a2">
                            <!-- <img src="/images/home/a2.jpg" />
                            <strong>选对回家的路</strong>
                            <span>你再不陪我，我就长大了</span> -->
                        </li>
                        <li class="a3">
                            <!-- <img src="/images/home/a4.jpg" />
                            <strong>省钱&nbsp;+&nbsp;更省心</strong>
                            <span class='sm'>房东直租<b class='lg'>299</b><b class='sm'>元起</b>/租客<b class='lg'>0</b>费用</span> -->
                        </li>
                    </ul>
                </div>
            </div>
            <!--#include virtual="/zinclude/header.html"-->
            <%-- <%@ include file="/WEB-INF/include/header.jsp" %> --%>
<!--            <div class="trait" style='display:none'>
                <ul class="container">
                    <li><a href="###">
                        <span class='zgIcon zgIcon-transparent'></span>
                        <strong>透明</strong>
                        <b>租客房东 直接联系</b>
                    </a>
                </li>
                <li class="line"></li>
                <li>
                    <a href="###">
                        <span class='zgIcon zgIcon-substantial'></span>
                        <strong>实惠</strong>
                        <b>租客免费租房</b>
                    </a>
                </li>
                <li class="line"></li>
                <li>
                    <a href="###">
                        <span class='zgIcon zgIcon-relieved'></span>
                        <strong>安心</strong>
                        <b>全程助理 百万保单</b>
                    </a>
                </li>
                <li class="line"></li>
                <li>
                    <a href="###">
                        <span class='zgIcon zgIcon-convenient'></span>
                        <strong>省事</strong>
                        <b>随时随地 线上交易</b>
                    </a>
                </li>
            </ul>
        </div> -->
        <div class="flow">
            <div class="flowBg"></div>
            <div class="flowPic">
                <img src="/images/home/flow.png" alt="租房流程" class="flow" />
                <span class="zgIcon zgIcon-info-circle" id="showFlowTips"></span>
                <div class="flowTips">
                    <p>1，实名参与：参与者身份均通过全国公民身份信息系统认证</p>
                    <p>2，身份保护：实名身份信息均进行专项加密，严防泄露</p>
                    <p>3，职业证明：租客需提交单位工牌/名片/学生证</p>
                    <p>4，按需匹配：只有符合房东的要求，租客才可以申请联系房东</p>
                    <p>5，联系许可：房东、租客必须双方同意，才能得到对方的联系方式</p>
                    <p>6，行为预判：系统会根据用户的行为分析判断，拉黑假冒房东和租客</p>
                    <p>7，反向举报：能坚持到这一步的“小强”，理论上是不应该存在的。如果居然发生了，真格租房经核实后将为举报者减免50元服务费。</p>
                </div>
            </div>
        </div>
        
        
        <div id="footer">
            <div class="container">
                <div class="wechat">
                    <div class="tel">
                        <span class='zgIcon zgIcon-tel zgIcon-xxl'></span>
                        400-115-6080
                    </div>
                    <div class="wxCode"></div>
                    
                </div>
                <ul class="footer_links tabIndex">
                    <li class="on"><a href="/aboutus.jsp">关于我们</a></li>
                    <li><a href="/guide">租房经验</a></li>
                    <li><a href="###">所有社区</a></li>
<!--                <li><a href="###">媒体报道</a></li>
 -->                <li><a href="/links">合作链接</a></li>
<!--                <li><a href="###">联系我们</a></li>
 -->                    
                </ul>
                <div class="footer_content">
                    <div class="tabContent" style="display:block">
                        <div class="footer_company">
                            <span>你的专属电子经纪人,，帮租客与房东在此直接交易。</span>
                            <a class="mail" target="_blank" href="http://weibo.com/zhengor">
                            微博：weibo.com/zhengor</a>
                            <a class="mail" href="mailto:fuwu@zhengor.com?subject=服务请求" title="服务请求">服务：fuwu@zhengor.com</a>
                            <a class="mail" href="mailto:co@zhengor.com?subject=企业合作" title="企业合作">企业合作：co@zhengor.com</a>
                            <a class="mail" href="mailto:pr@zhengor.com?subject=媒体联系" title="媒体联系">媒体联系：pr@zhengor.com</a>
                        </div>
                    </div>
                    <div class="tabContent">
                        <div class="footer_help">
                            <a href="/topic/detail/31" target="_blank">小白租房三大纪律八项注意</a>
                            <a href="/topic/detail/30" target="_blank">租房秘籍</a>
                            <a href="/topic/detail/26" target="_blank">租房也要好好过 低成本装扮幸福</a>
                            <a href="/topic/detail/29" target="_blank">只有28㎡的公寓也可以住的很舒</a>
                            <a href="/topic/detail/33" target="_blank">七种方式打造睡眠圣境</a>
                            <a href="/topic/detail/32" target="_blank">7条建议帮小空间瘦身</a>
                            
                        </div>
                    </div>
                    <!--#include virtual="/recommend/recommend.html"-->
                    <div class="tabContent">
                        <ul class="footer_borough">
                            <li><a class="UsefulLinks" target="_blank" href="http://www.shejiben.com">北京装修设计</a></li>
                            <li><a class="UsefulLinks" target="_blank" href="http://lf.to8to.com">廊坊装修网</a></li>
                        </ul>
                    </div>
                </div>
                
                <ul class="footer_aboutUs">
                    <li><a href="###">©2015 真格在线</a></li>
                    <li>|</li>
                    <li><a href="/zinclude/terms.jsp" target="_blank">使用条款</a></li>
                    <li>|</li>
                    <li><a href="http://www.miibeian.gov.cn">京ICP备15018423号</a></li>
                    <li>|</li>
                    <li><a href="###">京公网安备11010802017931</a></li>
                </ul>
            </div>
        </div>
        </div> <!-- main end -->
        <script type="text/javascript" src="/scripts/public/jquery-ui-1.10.4.custom.min.js"></script>
    </body>
    <script>
    //统计代码
    $(document).delegate('a', 'click', function(ev) {
	    var $target = $(ev.target);
	    info = encodeURIComponent($target.attr('title'));
	    url = encodeURIComponent($target.attr('href'));
    });
    </script>
</html>