<%@ page pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<title>居派</title>
	<!-- meta 以及 公用的css -->
	<%@ include file="/WEB-INF/include/public.jsp" %>
	<link href="/css/search/search_list.css" rel="stylesheet" >
</head>

<body>
<div id="indexPage">
<input type="hidden" name="search_location" id="search_location" value="${condition.location }">
<input type="hidden" name="search_startdate" id="search_startdate" value="${condition.startdate }">
<input type="hidden" name="search_enddate" id="search_enddate" value="${condition.enddate }">
<input type="hidden" name="search_sort" id="search_sort" value="">
<input type="hidden" name="nearby" id="nearby" value="0">
<!--排序-->
<div class="rm-type" id="mr" style="display: none;">
	<div class="rm-top"></div>
    <div class="mr-show">
        <ul class="price u_sort"> 
            <li value="" data="0" class="uLi_on">默认排序</li>
            <li value="zuigui" data="1">价格最高</li>
            <li value="zuipianyi" data="2">价格最低</li>
        </ul>            
    </div>   
</div>

<article>
	<!--共公共头部-->
	<div class="head-fixed">
		<header class="mayi-top-search head">
	    	<a class="back left" rel="nofollow" href="javascript:backleft();"></a>
			<a>搜索</a>
		</header>
		<nav class="sort">
		    <ul style="border-bottom: 1px solid #c9cbce;">
		     	<li id="reportrange" style="cursor:pointer"><span>日期</span></li>
		     	<li class="js-filter" style="cursor:pointer"><span>附近</span></li>
		        <li class="js-search" style="cursor:pointer"><span>位置区域</span></li>
	            <li class="js-sort" style="cursor:pointer"><span>默认排序</span></li>
		    </ul>
		</nav>
	</div>
	<!--共公头部结束-->
	
    <!--内容-->
    <section class="section">    	
        <aside class="index list-mian">     
        	<c:forEach items="${pageModel.result }" var="room">
        		<div class="cont">
		            <a href="/Search.action?goToRoomDetailPage">
		                <mark class="n-img"><img src="${room.default_pic }"  alt="房间图片"></mark>
		                <dl>
		                    <dt>
		                    	<b class="dx-b01 fl">房间名：${room.name }</b>
		                        <b class="dx-b01 fr price">¥ ${room.price }</b>
				            </dt>
		                </dl>	               
		             </a> 
	            </div> 
        	</c:forEach>
        	<div class="cont">
		            <a href="/Search.action?goToRoomDetailPage">
		                <mark class="n-img"><img src="/images/search/1.jpg"  alt="房间图片"></mark>
		                <dl>
		                    <dt>
		                    	<b class="dx-b01 fl">房间名：《鸟语花香》</b>
		                        <b class="dx-b01 fr price">¥ 208.00</b>
				            </dt>
		                    <!-- <dd>
		                    	<nav class="d-nr">
		                        <b>9条评论</b>&nbsp;·&nbsp;
		                        <b>二居</b>&nbsp;·&nbsp;
		                        <b>可住6人</b>&nbsp;·&nbsp;
		                        <b class="b-wz">朝阳三里屯</b>
		                       </nav>
		                    </dd> -->
		                </dl>	               
		             </a> 
	            </div> 
         	<div class="cont">
	            <a href="/detail.jsp">
	                <mark class="n-img"><img src="/images/search/u13.jpg"  alt="房间图片"></mark>
	                <dl>
	                    <dt>
	                    	<b class="dx-b01 fl">房间名：《夜色斑斓》</b>
	                        <b class="dx-b01 fr price">¥ 218.00</b>
			            </dt>
	                </dl>	               
	               </a> 
              </div>
         	<div class="cont">
	            <a href="###">
	                <mark class="n-img"><img src="/images/search/u23.jpg" alt="房间图片"></mark>
	                <dl>
	                    <dt>
	                    	<b class="dx-b01 fl">房间名：《漫步云中》</b>
	                        <b class="dx-b01 fr price">¥ 218.00</b>
			            </dt>
	                </dl>	               
	               </a> 
              </div>
        </aside>
            <div class="more" style="line-height: 24px;height: 24px;">
                 <a class="btn-more" href="javascript:soumore();">点击加载更多</a>
                 <span class="loading" style="display:none;height: 24px;"></span>
            </div>
    </section>

	<%@ include file="/WEB-INF/include/footer.jsp"%>
</article>
</div>

<script src="/scripts/index/jquery-1.9.1.min.js"></script>
<script src="/scripts/index/main.js"></script>
<script src="/scripts/index/c.js"></script>

<script src="/scripts/index/moment.js"></script> 
<script src="/scripts/index/daterangepicker.js"></script> 
<script src="/scripts/index/backleft.js"></script>

<script src="/scripts/search/sou.list.js"></script>
<!-- <script src="/scripts/search/sou.more.js"></script> -->

<%@ include file="/WEB-INF/include/location.jsp"%>
</body>
</html>