<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head><title>攻略-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>


<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>

<script type="text/javascript" src="/scripts/plugIn/bootstrap.min.js"></script>
<link href="/css/css/weixin/base.css" rel="stylesheet" type="text/css">
<link href="/css/css/weixin/guideResidence.css" rel="stylesheet" type="text/css">
<script type="text/javascript">
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
</head>
<body>
<!-- <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <a class="navbar-left" href="/mobile/home">
            <span class="glyphicon glyphicon-home"></span>
        </a>
        <a class="navbar-right" href="#">${area.areaName}攻略</a>
    </div>
</nav> -->
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
       <a id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="navbar-left menu">
            <span class='glyphicon glyphicon-list'></span>
        </a>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
            <li><a href="/mobile/home">主页</a></li>
            <li><a href="###">我的收藏</a></li>
        </ul>
        <div class="navbar-brand">${area.areaName}攻略</div>
    </div>
</nav>

<div class="container guideTab">
<ul class="nav nav-pills" role="tablist">
  <li role="presentation" class="active" style="width:30%; margin-right:2%"><a href="#map" aria-controls="map" role="tab" data-toggle="tab">地图</a></li>
  <li role="presentation" style="width:30%; margin-right:2%"><a href="#reviews" aria-controls="reviews" role="tab" data-toggle="tab">印象</a></li>
  <li role="presentation" style="width:30%; margin-right:2%"><a href="#community" aria-controls="community" role="tab" data-toggle="tab">小区</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="map">
    <c:forEach items="${areaMapPicList}" var="areaMapPic">
		<img src="${areaMapPic.map_pic}" alt="版块地图图片">
   	</c:forEach>
  </div>
  <div role="tabpanel" class="tab-pane" id="reviews">
  	<c:forEach items="${areaPicList}" var="areaPic">
   		 <div class="imgs">
            <img src="${areaPic.pic}" style="opacity: 1; " alt="版块图片">
            <b>${areaPic.comment}</b>
        </div>
   	</c:forEach>
   	
    <!-- <div class="imgs">
      <img src="/images/focus1.jpg" alt="" />
      <b>北大百年大讲堂，比尔盖茨、英国前首相布莱尔等多个名人来此演讲。万柳因毗邻北大、清华、人大等学校亦散发出些许人文气质</b>
    </div>
     <div class="imgs">
      <img src="/images/focus1.jpg" alt="" />
      <b>北大百年大讲堂，比尔盖茨、英国前首相布莱尔等多个名人来此演讲。万柳因毗邻北大、清华、人大等学校亦散发出些许人文气质</b>
    </div> -->

  </div>
  <div role="tabpanel" class="tab-pane" id="community">
     <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
     <c:forEach items="${areaGuideMap}" var="entry" varStatus="status">
   		<c:choose>
   			<c:when test="${status.index == 0 }">
   				<div class="panel panel-default">
			        <div class="panel-heading" role="tab" id="headingOne">
			          <h4 class="panel-title">
			            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
			               ${entry.key}
			            </a>
			          </h4>
			        </div>
			        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
			          <div class="panel-body">
			               <c:choose>
			                	<c:when test="${fn:length(entry.value)>10}">
			                		<c:forEach begin="0" end="9" step="1" items="${entry.value}" var="residence" >
					                	<a href="${residence.url}" target="_blank">${residence.residenceName}</a>
					                </c:forEach>
			                	</c:when>
			                	<c:otherwise>
			                		<c:forEach items="${entry.value}" var="residence" >
					                	<a href="${residence.url}" target="_blank">${residence.residenceName}</a>
					                </c:forEach>
			                	</c:otherwise>
			               </c:choose>
			          </div>
			        </div>
			    </div>
   			</c:when>
   			<c:when test="${status.index == 1 }">
   				<div class="panel panel-default">
			        <div class="panel-heading" role="tab" id="headingTwo">
			          <h4 class="panel-title">
			            <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
			              	 ${entry.key}
			            </a>
			          </h4>
			        </div>
			        <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
			          <div class="panel-body">
			               <c:choose>
			                	<c:when test="${fn:length(entry.value)>10}">
			                		<c:forEach begin="0" end="9" step="1" items="${entry.value}" var="residence" >
					                	<a href="${residence.url}" target="_blank">${residence.residenceName}</a>
					                </c:forEach>
			                	</c:when>
			                	<c:otherwise>
			                		<c:forEach items="${entry.value}" var="residence" >
					                	<a href="${residence.url}" target="_blank">${residence.residenceName}</a>
					                </c:forEach>
			                	</c:otherwise>
			               </c:choose>
			          </div>
			        </div>
			    </div>
   			</c:when>
   			<c:when test="${status.index == 2 }">
   				<div class="panel panel-default">
			        <div class="panel-heading" role="tab" id="headingThree">
			          <h4 class="panel-title">
			            <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
			              	 ${entry.key}
			            </a>
			          </h4>
			        </div>
			        <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseThree">
			          <div class="panel-body">
			               <c:choose>
			                	<c:when test="${fn:length(entry.value)>10}">
			                		<c:forEach begin="0" end="9" step="1" items="${entry.value}" var="residence" >
					                	<a href="${residence.url}" target="_blank">${residence.residenceName}</a>
					                </c:forEach>
			                	</c:when>
			                	<c:otherwise>
			                		<c:forEach items="${entry.value}" var="residence" >
					                	<a href="${residence.url}" target="_blank">${residence.residenceName}</a>
					                </c:forEach>
			                	</c:otherwise>
			               </c:choose>
			          </div>
			        </div>
			    </div>
   			</c:when>
   			<c:when test="${status.index == 3 }">
   				<div class="panel panel-default">
			        <div class="panel-heading" role="tab" id="headingFour">
			          <h4 class="panel-title">
			            <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
			              	 ${entry.key}
			            </a>
			          </h4>
			        </div>
			        <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseFour">
			          <div class="panel-body">
			               <c:choose>
			                	<c:when test="${fn:length(entry.value)>10}">
			                		<c:forEach begin="0" end="9" step="1" items="${entry.value}" var="residence" >
					                	<a href="${residence.url}" target="_blank">${residence.residenceName}</a>
					                </c:forEach>
			                	</c:when>
			                	<c:otherwise>
			                		<c:forEach items="${entry.value}" var="residence" >
					                	<a href="${residence.url}" target="_blank">${residence.residenceName}</a>
					                </c:forEach>
			                	</c:otherwise>
			               </c:choose>
			          </div>
			        </div>
			    </div>
   			</c:when>
   			<c:when test="${status.index == 4 }">
   				<div class="panel panel-default">
			        <div class="panel-heading" role="tab" id="headingFive">
			          <h4 class="panel-title">
			            <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
			              	 ${entry.key}
			            </a>
			          </h4>
			        </div>
			        <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseFive">
			          <div class="panel-body">
			               <c:choose>
			                	<c:when test="${fn:length(entry.value)>10}">
			                		<c:forEach begin="0" end="9" step="1" items="${entry.value}" var="residence" >
					                	<a href="${residence.url}" target="_blank">${residence.residenceName}</a>
					                </c:forEach>
			                	</c:when>
			                	<c:otherwise>
			                		<c:forEach items="${entry.value}" var="residence" >
					                	<a href="${residence.url}" target="_blank">${residence.residenceName}</a>
					                </c:forEach>
			                	</c:otherwise>
			               </c:choose>
			          </div>
			        </div>
			    </div>
   			</c:when>
   		</c:choose>
      </c:forEach>
    </div>
  </div>
</div>

</div>

     <!--  <ul class="nav nav-pills" role="tablist">
      	<c:forEach items="${areaGuideMap}" var="entry" begin="0" end="1" varStatus="status">
      		<c:choose>
      			<c:when test="${status.index == 0 }">
      				<li role="presentation" class="active" style='width:49%; margin-right:2%'><a href="#moreSold" aria-controls="moreSold" role="tab" data-toggle="tab">${entry.key}</a></li>
      			</c:when>
      			<c:otherwise>
      				<li role="presentation" style='width:49%;'><a href="#moreRent" aria-controls="moreRent" role="tab" data-toggle="tab">${entry.key}</a></li>
      			</c:otherwise>
      		</c:choose>
        </c:forEach>
        <c:forEach items="${areaGuideMap}" var="entry" begin="2" end="4" varStatus="status">
          <c:choose>
            <c:when test="${status.index == 2 }">
              <li role="presentation" style='width:32%;margin-right:2%'><a href="#newRes" aria-controls="newRes" role="tab" data-toggle="tab">${entry.key}</a></li>
            </c:when>
            <c:when test="${status.index == 3 }">
              <li role="presentation" style='width:32%;margin-right:2%'><a href="#lowPrice" aria-controls="lowPrice" role="tab" data-toggle="tab">${entry.key}</a></li>
            </c:when>
            <c:otherwise>
              <li role="presentation" style='width:32%;'><a href="#highPrice" aria-controls="highPrice" role="tab" data-toggle="tab">${entry.key}</a></li>
            </c:otherwise>
          </c:choose>
        </c:forEach>
      </ul>
      <div class="tab-content">
            <c:forEach items="${areaGuideMap}" var="entry" begin="0" end="1" varStatus="status">
            	<c:choose>
            		<c:when test="${status.index == 0 }">
            			<div role="tabpanel" class="tab-pane active" id="moreSold">
            				<c:choose>
			                	<c:when test="${fn:length(entry.value)>10}">
			                		
				                		<c:forEach begin="0" end="9" step="1" items="${entry.value}" var="residence" >
                            <a href="${residence.url}" target="_blank" class='col-xs-6'>
                            				<c:choose>
                            				<c:when test="${residence.defaultPic != '' }">
                            					<img src='${residence.defaultPic}' alt='小区图片' onerror="showImgDelay(this,'/images/public/defaultHome.jpg',2)">
                            				</c:when>
                            				<c:otherwise>
					                			<img src='/images/public/defaultHome.jpg' alt='小区图片'>
                            				</c:otherwise>
                            				</c:choose>
						                	<b>${residence.residenceName}</b>
                              </a>
						                </c:forEach>
					                
			                	</c:when>
			                	<c:otherwise>
			                		
				                		<c:forEach items="${entry.value}" var="residence" >
                            <a href="${residence.url}" target="_blank" class='col-xs-6'>
				                			<c:choose>
                            				<c:when test="${residence.defaultPic != '' }">
                            					<img src='${residence.defaultPic}' alt='小区图片' onerror="showImgDelay(this,'/images/public/defaultHome.jpg',2)">
                            				</c:when>
                            				<c:otherwise>
					                			<img src='/images/public/defaultHome.jpg' alt='小区图片'>
                            				</c:otherwise>
                            				</c:choose>
						                	<b>${residence.residenceName}</b>
                              </a>
						                </c:forEach>
					                
			                	</c:otherwise>
			          		 </c:choose>
            			</div>
            		</c:when>
            		<c:otherwise>
            			<div role="tabpanel" class="tab-pane" id="moreRent">
            				<c:choose>
			                	<c:when test="${fn:length(entry.value)>10}">
			                		
				                		<c:forEach begin="0" end="9" step="1" items="${entry.value}" var="residence" >
                            <a href="${residence.url}" target="_blank" class='col-xs-6'>
				                			<c:choose>
                            				<c:when test="${residence.defaultPic != '' }">
                            					<img src='${residence.defaultPic}' alt='小区图片' onerror="showImgDelay(this,'/images/public/defaultHome.jpg',2)">
                            				</c:when>
                            				<c:otherwise>
					                			<img src='/images/public/defaultHome.jpg' alt='小区图片'>
                            				</c:otherwise>
                            				</c:choose>
						                	<b>${residence.residenceName}</b>
                              </a>
						                </c:forEach>
					                
			                	</c:when>
			                	<c:otherwise>
                          
			                		<c:forEach items="${entry.value}" var="residence" >
                          <a href="${residence.url}" target="_blank" class='col-xs-6'>
			                			<c:choose>
                            				<c:when test="${residence.defaultPic != '' }">
                            					<img src='${residence.defaultPic}' alt='小区图片' onerror="showImgDelay(this,'/images/public/defaultHome.jpg',2)">
                            				</c:when>
                            				<c:otherwise>
					                			<img src='/images/public/defaultHome.jpg' alt='小区图片'>
                            				</c:otherwise>
                            				</c:choose>
					                	<b>${residence.residenceName}</b>
                            </a>
					                </c:forEach>
                          
			                	</c:otherwise>
			          		 </c:choose>
            			</div>
            		</c:otherwise>
            	</c:choose>
        	</c:forEach>
          <c:forEach items="${areaGuideMap}" var="entry" begin="2" end="4" varStatus="status">
            <c:choose>
              <c:when test="${status.index == 2 }">
                <div role="tabpanel" class="tab-pane" id="newRes">
                  <c:choose>
                      <c:when test="${fn:length(entry.value)>10}">
                        
                          <c:forEach begin="0" end="9" step="1" items="${entry.value}" var="residence" >
                          <a href="${residence.url}" target="_blank" class='col-xs-6'>
                           			<c:choose>
                     				<c:when test="${residence.defaultPic != '' }">
                     					<img src='${residence.defaultPic}' alt='小区图片' onerror="showImgDelay(this,'/images/public/defaultHome.jpg',2)">
                     				</c:when>
                     				<c:otherwise>
              							<img src='/images/public/defaultHome.jpg' alt='小区图片'>
                     				</c:otherwise>
                     				</c:choose>
                            <b>${residence.residenceName}</b>
                            </a>
                          </c:forEach>
                      
                      </c:when>
                      <c:otherwise>
                        <c:forEach items="${entry.value}" var="residence" >
                          <c:choose>
                     				<c:when test="${residence.defaultPic != '' }">
                     					<img src='${residence.defaultPic}' alt='小区图片' onerror="showImgDelay(this,'/images/public/defaultHome.jpg',2)">
                     				</c:when>
                     				<c:otherwise>
              							<img src='/images/public/defaultHome.jpg' alt='小区图片'>
                     				</c:otherwise>
                     				</c:choose>
                          <b>${residence.residenceName}</b>
                        </c:forEach>
                      </c:otherwise>
                   </c:choose>
                </div>
              </c:when>
              <c:when test="${status.index == 3 }">
                <div role="tabpanel" class="tab-pane" id="lowPrice">
                  <c:choose>
                      <c:when test="${fn:length(entry.value)>10}">
                        
                          <c:forEach begin="0" end="9" step="1" items="${entry.value}" var="residence" >
                          <a href="${residence.url}" target="_blank" class='col-xs-6'>
                            <c:choose>
                     				<c:when test="${residence.defaultPic != '' }">
                     					<img src='${residence.defaultPic}' alt='小区图片' onerror="showImgDelay(this,'/images/public/defaultHome.jpg',2)">
                     				</c:when>
                     				<c:otherwise>
              							<img src='/images/public/defaultHome.jpg' alt='小区图片'>
                     				</c:otherwise>
                     				</c:choose>
                            <b>${residence.residenceName}</b>
                            </a>
                          </c:forEach>
                        
                      </c:when>
                      <c:otherwise>
                        
                          <c:forEach items="${entry.value}" var="residence" >
                          <a href="${residence.url}" target="_blank" class='col-xs-6'>
                            <c:choose>
                     				<c:when test="${residence.defaultPic != '' }">
                     					<img src='${residence.defaultPic}' alt='小区图片' onerror="showImgDelay(this,'/images/public/defaultHome.jpg',2)">
                     				</c:when>
                     				<c:otherwise>
              							<img src='/images/public/defaultHome.jpg' alt='小区图片'>
                     				</c:otherwise>
                     				</c:choose>
                            <b>${residence.residenceName}</b>
                            </a>
                          </c:forEach>
                        
                      </c:otherwise>
                   </c:choose>
                </div>
              </c:when>
              <c:otherwise>
                <div role="tabpanel" class="tab-pane" id="highPrice">
                  <c:choose>
                      <c:when test="${fn:length(entry.value)>10}">
                        
                          <c:forEach begin="0" end="9" step="1" items="${entry.value}" var="residence" >
                          <a href="${residence.url}" target="_blank" class='col-xs-6'>
                            <c:choose>
                     				<c:when test="${residence.defaultPic != '' }">
                     					<img src='${residence.defaultPic}' alt='小区图片' onerror="showImgDelay(this,'/images/public/defaultHome.jpg',2)">
                     				</c:when>
                     				<c:otherwise>
              							<img src='/images/public/defaultHome.jpg' alt='小区图片'>
                     				</c:otherwise>
                     				</c:choose>
                            <b>${residence.residenceName}</b>
                            </a>
                          </c:forEach>
                      
                      </c:when>
                      <c:otherwise>
                        
                          <c:forEach items="${entry.value}" var="residence" >
                          <a href="${residence.url}" target="_blank" class='col-xs-6'>
                            <c:choose>
                     				<c:when test="${residence.defaultPic != '' }">
                     					<img src='${residence.defaultPic}' alt='小区图片' onerror="showImgDelay(this,'/images/public/defaultHome.jpg',2)">
                     				</c:when>
                     				<c:otherwise>
              							<img src='/images/public/defaultHome.jpg' alt='小区图片'>
                     				</c:otherwise>
                     				</c:choose>
                            <b>${residence.residenceName}</b>
                            </a>
                          </c:forEach>
                        
                      </c:otherwise>
                   </c:choose>
                </div>
              </c:otherwise>
            </c:choose>
        </c:forEach>
        </div> -->
    <div class="footer row">
        ©2015 真格在线&nbsp;&nbsp;&nbsp;&nbsp;400-115-6080
    </div>
</div>

</body>

</html>
