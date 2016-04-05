<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>看房签约-真格租房</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>

<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/css/weixin/vCheckList.css">
</head>
<body>
	<c:choose>
		<c:when test="${status == 'y' }">
			<div class="main">
				<h2>房屋检查</h2>
				<div class="weui_msg">
			        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
			        <div class="weui_text_area">
			            <h3 class="weui_msg_title">房屋检查</h3>
			            <p class="weui_msg_desc">房屋检查完毕,请等待房东确认检查单。</p>
			        </div>
			        <div class="weui_opr_area">
			            <p class="weui_btn_area">
			                <a href="/Sign.action?goToSignListPage" onclick="$.redirectLoading();" class="weui_btn weui_btn_primary">知道了</a>
			            </p>
			        </div>
			    </div>
			</div>
		</c:when>
		<c:when test="${status == 'n' }">
			<div class="main info">
				<h2>房屋检查</h2>
				<div class="weui_msg">
			        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
			        <div class="weui_text_area">
			            <h3 class="weui_msg_title">房屋检查</h3>
			            <p class="weui_msg_desc">房屋检查完毕,请等待房东确认检查单。</p>
			        </div>
			        <div class="weui_opr_area">
			            <p class="weui_btn_area">
			                <a href="/Sign.action?goToSignListPage" onclick="$.redirectLoading();" class="weui_btn weui_btn_primary">知道了</a>
			            </p>
			        </div>
			    </div>
			</div>
			  <div class="main">
			    <div class="mainMenu">
			      <h2>房屋检查</h2>
			      <c:if test="${status == 'n' }">
				      <p>房东对房屋检查单有不同意见，请您与房东进行协商统一。房东联系方式：${mobile }</p>
			      </c:if>
			      <ul id="checkMenu">
			      	<c:forEach var="room" items="${checklist.room }" varStatus="status">
						<li class="uncheck"><a href="###" id="room${status.index+1 }">${room.name }<span class="zgIcon zgIcon-pointer"></span><span class="zgIcon zgIcon-angle-right"></span></a></li>
					</c:forEach>
			        <li class="uncheck"><a href="###" id="kitchen">厨房<span class="zgIcon zgIcon-pointer"></span><span class="zgIcon zgIcon-angle-right"></span></a></li>
			        <c:forEach var="bathroom" items="${checklist.bathroom }"  varStatus="status"> 
				        <li class="uncheck"><a href="###" id="bathroom${status.index+1 }">${bathroom.name }<span class="zgIcon zgIcon-pointer"></span><span class="zgIcon zgIcon-angle-right"></span></a></li>
			        </c:forEach>
			        <li class="uncheck"><a href="###" id="stuff">物品<span class="zgIcon zgIcon-pointer"></span><span class="zgIcon zgIcon-angle-right"></span></a></li>
			      </ul>
			      <button class="weui_btn weui_btn_primary checkOff" type='submit' id="submitBtn">检查完毕</button>
			    </div>
			    <form action="/ProgressOperation.action?saveCheckList" method="post" id="checklist">
					    <input type="hidden" id="checkPid" name="pid" value="${pid }">
					<c:forEach var="room" items="${checklist.room }" varStatus="status">
					    <input type="hidden" name="checklist.room[${status.index }].pid" value="${room.pid }">
					    <input type="hidden" name="checklist.room[${status.index }].id" value="${room.id }">
						<div class="tab-detail room${status.index+1 }">
						<h2>${room.name }检查清单</h2>
						<div class="form-control">
							 <button type="button" class="checkBtn forbidden"></button>
							 <b>地面</b>
							 <span>${room.floor}</span>
							 <c:choose>
							 	<c:when test="${room.floor == '正常' }">
							 		<button type="button" class="toggleBtn"></button>
							 	</c:when>
							 	<c:when test="${room.floor == '异常' }">
							 		<button type="button" class="toggleBtn off"></button>
							 	</c:when>
							 </c:choose>
							 <input type="hidden" value='${room.floor }' name="checklist.room[${status.index }].floor"/>
						</div>
						<div class="form-control">
			              <button type="button" class="checkBtn forbidden"></button>
			              <b>墙面</b>
			              <span>${room.wall }</span>
			              <c:choose>
							 	<c:when test="${room.wall == '正常' }">
							 		<button type="button" class="toggleBtn"></button>
							 	</c:when>
							 	<c:when test="${room.wall == '异常' }">
							 		<button type="button" class="toggleBtn off"></button>
							 	</c:when>
					      </c:choose>
			              <input type="hidden" value='${room.wall }' name="checklist.room[${status.index }].wall"/>
			           </div>
			           <div class="form-control">
			              <button type="button" class="checkBtn forbidden"></button>
			              <b>屋顶</b>
			              <span>${room.ceiling }</span>
			              <c:choose>
							 	<c:when test="${room.ceiling == '正常' }">
							 		<button type="button" class="toggleBtn"></button>
							 	</c:when>
							 	<c:when test="${room.ceiling == '异常' }">
							 		<button type="button" class="toggleBtn off"></button>
							 	</c:when>
					      </c:choose>
			              <input type="hidden" value='${room.ceiling }' name="checklist.room[${status.index }].ceiling"/>
			           </div>
			           <div class="form-control">
			             	<c:choose>
								<c:when test="${room.window == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>窗户</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${room.window == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>窗户</b>
									<span>${room.window }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>窗户</b>
									<span>${room.window }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${room.window}' name="checklist.room[${status.index }].window"/>
			          </div>
			          <div class="form-control">
			             	<c:choose>
								<c:when test="${room.door == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>门/锁</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${room.door == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>门/锁</b>
									<span>${room.door }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>门/锁</b>
									<span>${room.door }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${room.door}' name="checklist.room[${status.index }].door"/>
			          </div>
			          <div class="form-control">
			             	<c:choose>
								<c:when test="${room.light == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>灯</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${room.light == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>灯</b>
									<span>${room.light }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>灯</b>
									<span>${room.light }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${room.light}' name="checklist.room[${status.index }].light"/>
			          </div>
			          <div class="form-control">
			             	<c:choose>
								<c:when test="${room.plug == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>插座/开关</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${room.plug == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>插座/开关</b>
									<span>${room.plug }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>插座/开关</b>
									<span>${room.plug }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${room.plug}' name="checklist.room[${status.index }].plug"/>
			          </div>
			          <div class="form-control">
			             	<c:choose>
								<c:when test="${room.aircond == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>空调</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${room.aircond == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>空调</b>
									<span>${room.aircond }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>空调</b>
									<span>${room.aircond }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${room.aircond}' name="checklist.room[${status.index }].aircond"/>
			          </div>
			          <div class="form-control">
			             	<c:choose>
								<c:when test="${room.heat == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>暖气</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${room.heat == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>暖气</b>
									<span>${room.heat }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>暖气</b>
									<span>${room.heat }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${room.heat}' name="checklist.room[${status.index }].heat"/>
			          </div>
			          
			          <button type="button" class="remarkBtn">
			              <b>备注</b>
			              <span class="zgIcon zgIcon-pencil"></span>
			          </button>
			          <div class="edit-group">
			              <textarea class="remarks" datatype="*0-200" name="checklist.room[${status.index }].remark" placeholder='备注'>${room.remark }</textarea>
			          </div>
			          <div class="btn-group">
			              <button class="checkOff weui_btn weui_btn_primary">检查完毕</button>
			          </div>
			          </div>
					</c:forEach>
					<div class="tab-detail kitchen">
						<input type="hidden" name="checklist.kitchen.pid" value="${checklist.kitchen.pid }">
						<input type="hidden" name="checklist.kitchen.id" value="${checklist.kitchen.id }">
						<h2>厨房检查清单</h2>
						<div class="form-control">
							 <button type="button" class="checkBtn forbidden"></button>
							 <b>地面</b>
							 <span>${checklist.kitchen.floor}</span>
							 <c:choose>
							 	<c:when test="${checklist.kitchen.floor == '正常' }">
							 		<button type="button" class="toggleBtn"></button>
							 	</c:when>
							 	<c:when test="${checklist.kitchen.floor == '异常' }">
							 		<button type="button" class="toggleBtn off"></button>
							 	</c:when>
							 </c:choose>
							 <input type="hidden" value='${checklist.kitchen.floor }' name="checklist.kitchen.floor"/>
						</div>
						<div class="form-control">
							 <button type="button" class="checkBtn forbidden"></button>
							 <b>屋顶</b>
							 <span>${checklist.kitchen.ceiling}</span>
							 <c:choose>
							 	<c:when test="${checklist.kitchen.ceiling == '正常' }">
							 		<button type="button" class="toggleBtn"></button>
							 	</c:when>
							 	<c:when test="${checklist.kitchen.ceiling == '异常' }">
							 		<button type="button" class="toggleBtn off"></button>
							 	</c:when>
							 </c:choose>
							 <input type="hidden" value='${checklist.kitchen.ceiling }' name="checklist.kitchen.ceiling"/>
						</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.window == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>窗户</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.window == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>窗户</b>
									<span>${checklist.kitchen.window }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>窗户</b>
									<span>${checklist.kitchen.window }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.window}' name="checklist.kitchen.window"/>
			          	</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.door == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>门/锁</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.door == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>门/锁</b>
									<span>${checklist.kitchen.door }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>门/锁</b>
									<span>${checklist.kitchen.door }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.door}' name="checklist.kitchen.door"/>
			          	</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.light == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>灯</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.light == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>灯</b>
									<span>${checklist.kitchen.light }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>灯</b>
									<span>${checklist.kitchen.light }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.light}' name="checklist.kitchen.light"/>
			          	</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.plug == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>插座/开关</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.plug == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>插座/开关</b>
									<span>${checklist.kitchen.plug }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>插座/开关</b>
									<span>${checklist.kitchen.plug }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.plug}' name="checklist.kitchen.plug"/>
			          	</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.tap == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>水龙头</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.tap == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>水龙头</b>
									<span>${checklist.kitchen.tap }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>水龙头</b>
									<span>${checklist.kitchen.tap }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.tap}' name="checklist.kitchen.tap"/>
			          	</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.drain == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>地漏</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.drain == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>地漏</b>
									<span>${checklist.kitchen.drain }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>地漏</b>
									<span>${checklist.kitchen.drain }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.drain}' name="checklist.kitchen.drain"/>
			          	</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.hood == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>抽油烟机</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.hood == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>抽油烟机</b>
									<span>${checklist.kitchen.hood }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>抽油烟机</b>
									<span>${checklist.kitchen.hood }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.hood}' name="checklist.kitchen.hood"/>
			          	</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.cooker == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>燃气灶</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.cooker == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>燃气灶</b>
									<span>${checklist.kitchen.cooker }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>燃气灶</b>
									<span>${checklist.kitchen.cooker }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.cooker}' name="checklist.kitchen.cooker"/>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.waterheater == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>热水器</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.waterheater == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>热水器</b>
									<span>${checklist.kitchen.waterheater }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>热水器</b>
									<span>${checklist.kitchen.waterheater }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.waterheater}' name="checklist.kitchen.waterheater"/>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.microwave == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>微波炉</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.microwave == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>微波炉</b>
									<span>${checklist.kitchen.microwave }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>微波炉</b>
									<span>${checklist.kitchen.microwave }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.microwave}' name="checklist.kitchen.microwave"/>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.cabinet == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>橱柜</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.cabinet == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>橱柜</b>
									<span>${checklist.kitchen.cabinet }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>橱柜</b>
									<span>${checklist.kitchen.cabinet }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.cabinet}' name="checklist.kitchen.cabinet"/>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.aircond == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>空调</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.aircond == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>空调</b>
									<span>${checklist.kitchen.aircond }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>空调</b>
									<span>${checklist.kitchen.aircond }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.aircond}' name="checklist.kitchen.aircond"/>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.heat == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>暖气</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.heat == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>暖气</b>
									<span>${checklist.kitchen.heat }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>暖气</b>
									<span>${checklist.kitchen.heat }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.heat}' name="checklist.kitchen.heat"/>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.water == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>水表底数</b>
									<input type="number" class="input-units-8" ignore="ignore" datatype="n1-9" nullmsg="请输入水表底数" maxlength="9"/>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>水表底数</b>
									<input type="number" class="input-units-8" ignore="ignore" value="${checklist.kitchen.water }" datatype="n1-9" nullmsg="请输入水表底数" maxlength="9"/>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.kitchen.water}' name="checklist.kitchen.water"/>
				     	   <span class="Validform_checktip"></span>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.power == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>电表底数</b>
									<input type="number" id="maybePower" class="input-units-8" ignore="ignore" datatype="n1-9" nullmsg="请输入电表底数" maxlength="9"/>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>电表底数</b>
									<input type="number" id="maybePower" class="input-units-8" ignore="ignore" value="${checklist.kitchen.power }" datatype="n1-9" nullmsg="请输入电表底数" maxlength="9"/>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.kitchen.power}' name="checklist.kitchen.power"/>
				     	   <span class="Validform_checktip"></span>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.gas == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>燃气底数</b>
									<input type="number" id="maybeGas" class="input-units-8" ignore="ignore" datatype="n1-9" nullmsg="请输入燃气底数" maxlength="9"/>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>燃气底数</b>
									<input type="number" id="maybeGas" class="input-units-8" ignore="ignore" value="${checklist.kitchen.gas }" datatype="n1-9" nullmsg="请输入燃气底数" maxlength="9"/>
								</c:otherwise>
				     	   </c:choose>
				     	    <input type="hidden" class="maybeValue" value='${checklist.kitchen.gas}' name="checklist.kitchen.gas"/>
				     	    <span class="Validform_checktip"></span>
			            </div>
			          	<button type="button" class="remarkBtn">
			              <b>备注</b>
			              <span class="zgIcon zgIcon-pencil"></span>
			          	</button>
			          	<div class="edit-group">
			              <textarea class="remarks" datatype="*0-200" name="checklist.kitchen.remark" placeholder='备注'>${checklist.kitchen.remark }</textarea>
			          	</div>
			          	<div class="btn-group">
			              <button class="checkOff weui_btn weui_btn_primary">检查完毕</button>
			          	</div>
					</div>
					
			        <c:forEach var="bathroom" items="${checklist.bathroom }" varStatus="status">
						<input type="hidden" name="checklist.bathroom[${status.index }].pid" value="${bathroom.pid }">
						<input type="hidden" name="checklist.bathroom[${status.index }].id" value="${bathroom.id }">
			       		<div class="tab-detail bathroom${status.index + 1 }">
							<h2>${bathroom.name }检查清单</h2>
							<div class="form-control">
								<button type="button" class="checkBtn forbidden"></button>
							 	<b>屋顶</b>
							 	<span>${bathroom.ceiling}</span>
							 	<c:choose>
							 		<c:when test="${bathroom.ceiling == '正常' }">
							 			<button type="button" class="toggleBtn"></button>
							 		</c:when>
							 		<c:when test="${bathroom.ceiling == '异常' }">
							 			<button type="button" class="toggleBtn off"></button>
							 		</c:when>
							 	</c:choose>
							 	<input type="hidden" value='${bathroom.ceiling }' name="checklist.bathroom[${status.index }].ceiling"/>
							</div>
							<div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.window == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>窗户</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.window == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>窗户</b>
										<span>${bathroom.window }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>窗户</b>
										<span>${bathroom.window }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.window}' name="checklist.bathroom[${status.index }].window"/>
			          		</div>
							<div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.door == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>门/锁</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.door == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>门/锁</b>
										<span>${bathroom.door }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>门/锁</b>
										<span>${bathroom.door }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.door}' name="checklist.bathroom[${status.index }].door"/>
			          		</div>
							<div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.light == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>灯</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.light == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>灯</b>
										<span>${bathroom.light }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>灯</b>
										<span>${bathroom.light }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.light}' name="checklist.bathroom[${status.index }].light"/>
			          	   </div>
							<div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.plug == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>插座/开关</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.plug == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>插座/开关</b>
										<span>${bathroom.plug }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>插座/开关</b>
										<span>${bathroom.plug }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.plug}' name="checklist.bathroom[${status.index }].plug"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.tap == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>水龙头</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.tap == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>水龙头</b>
										<span>${bathroom.tap }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>水龙头</b>
										<span>${bathroom.tap }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.tap}' name="checklist.bathroom[${status.index }].tap"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.drain == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>下水</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.drain == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>下水</b>
										<span>${bathroom.drain }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>下水</b>
										<span>${bathroom.drain }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.drain}' name="checklist.bathroom[${status.index }].drain"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.shower == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>淋浴</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.shower == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>淋浴</b>
										<span>${bathroom.shower }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>淋浴</b>
										<span>${bathroom.shower }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.shower}' name="checklist.bathroom[${status.index }].shower"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.bathtub == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>浴缸</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.bathtub == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>浴缸</b>
										<span>${bathroom.bathtub }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>浴缸</b>
										<span>${bathroom.bathtub }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.bathtub}' name="checklist.bathroom[${status.index }].bathtub"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.waterheater == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>热水器</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.waterheater == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>热水器</b>
										<span>${bathroom.waterheater }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>热水器</b>
										<span>${bathroom.waterheater }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.waterheater}' name="checklist.bathroom[${status.index }].waterheater"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.vent == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>排风扇</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.vent == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>排风扇</b>
										<span>${bathroom.vent }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>排风扇</b>
										<span>${bathroom.vent }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.vent}' name="checklist.bathroom[${status.index }].vent"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.toilet == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>坐便器</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.toilet == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>坐便器</b>
										<span>${bathroom.toilet }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>坐便器</b>
										<span>${bathroom.toilet }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.toilet}' name="checklist.bathroom[${status.index }].toilet"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.aircond == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>空调</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.aircond == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>空调</b>
										<span>${bathroom.aircond }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>空调</b>
										<span>${bathroom.aircond }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.aircond}' name="checklist.bathroom[${status.index }].aircond"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.heat == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>暖气</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.heat == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>暖气</b>
										<span>${bathroom.heat }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>暖气</b>
										<span>${bathroom.heat }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.heat}' name="checklist.bathroom[${status.index }].heat"/>
			          	   </div>
			          	   
				           <button type="button" class="remarkBtn">
				              <b>备注</b>
				              <span class="zgIcon zgIcon-pencil"></span>
				           </button>
				           <div class="edit-group">
				              <textarea class="remarks" datatype="*0-200" name="checklist.bathroom[${status.index }].remark" placeholder='备注'>${bathroom.remark }</textarea>
				          	</div>
				          	<div class="btn-group">
				              <button class="checkOff weui_btn weui_btn_primary">检查完毕</button>
				           </div>
			       		</div>
			        </c:forEach>
			       
			        <div class="tab-detail stuff">
			           <h2>核对物品检查清单</h2>
			           <div class="form-control">
			           	<input type="hidden" name="checklist.stuff.pid" value="${checklist.stuff.pid }">
			           	<input type="hidden" name="checklist.stuff.id" value="${checklist.stuff.id }">
				           	<c:choose>
								<c:when test="${checklist.stuff.washer == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>洗衣机</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.stuff.washer == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>洗衣机</b>
									<span>${checklist.stuff.washer }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>洗衣机</b>
									<span>${checklist.stuff.washer }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				    	   </c:choose>
				    	   <input type="hidden" value='${checklist.stuff.washer}' name="checklist.stuff.washer"/>
			           </div>
			           <div class="form-control">
				           	<c:choose>
								<c:when test="${checklist.stuff.fridge == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>冰箱</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.stuff.fridge == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>冰箱</b>
									<span>${checklist.stuff.fridge }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>冰箱</b>
									<span>${checklist.stuff.fridge }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				    	   </c:choose>
				    	   <input type="hidden" value='${checklist.stuff.fridge}' name="checklist.stuff.fridge"/>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.bed == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>床</b>
									<!-- <input type="number" id="maybeBed" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入床的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeBed">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
									
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>床</b>
									<!-- <input type="number" id="maybeBed" class="input-units-4" ignore="ignore" value="${checklist.stuff.bed }" datatype="checkTiny" nullmsg="请输入床的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeBed" disabled>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.bed}' name="checklist.stuff.bed"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.closet == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>衣柜</b>
									<!-- <input type="number" id="maybeCloset" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入衣柜的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeCloset">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>衣柜</b>
									<!-- <input type="number" id="maybeCloset" class="input-units-4" ignore="ignore" value="${checklist.stuff.closet }" datatype="checkTiny" nullmsg="请输入衣柜的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeCloset">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.closet}' name="checklist.stuff.closet"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.desk == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>桌子</b>
									<!-- <input type="number" id="maybeDesk" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入桌子的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeDesk">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>桌子</b>
									<!-- <input type="number" id="maybeDesk" class="input-units-4" ignore="ignore" value="${checklist.stuff.desk }" datatype="checkTiny" nullmsg="请输入桌子的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeDesk">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.desk}' name="checklist.stuff.desk"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.chair == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>椅子</b>
									<!-- <input type="number" id="maybeChair" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入椅子的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeChair">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>椅子</b>
									<!-- <input type="number" id="maybeChair" class="input-units-4" ignore="ignore" value="${checklist.stuff.chair }" datatype="checkTiny" nullmsg="请输入椅子的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeChair">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.chair}' name="checklist.stuff.chair"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.sofa == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>沙发</b>
									<!-- <input type="number" id="maybeSofa" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入沙发的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeSofa">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>沙发</b>
									<!-- <input type="number" id="maybeSofa" class="input-units-4" ignore="ignore" value="${checklist.stuff.sofa }" datatype="checkTiny" nullmsg="请输入沙发的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeSofa">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.sofa}' name="checklist.stuff.sofa"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.key == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>钥匙</b>
									<!-- <input type="number" id="maybeKey" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入钥匙的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeKey">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>钥匙</b>
									<!-- <input type="number" id="maybeKey" class="input-units-4" ignore="ignore" value="${checklist.stuff.key }" datatype="checkTiny" nullmsg="请输入钥匙的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeKey">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.key}' name="checklist.stuff.key"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.doorCard == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>门卡</b>
									<!-- <input type="number" id="maybeDoorCard" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入门卡的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeDoorCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>门卡</b>
									<!-- <input type="number" id="maybeDoorCard" class="input-units-4" ignore="ignore" value="${checklist.stuff.doorCard }" datatype="checkTiny" nullmsg="请输入门卡的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeDoorCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.doorCard}' name="checklist.stuff.doorCard"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.waterCard == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>水卡</b>
									<!-- <input type="number" id="maybeWaterCard" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入水卡的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeWaterCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>水卡</b>
									<!-- <input type="number" id="maybeWaterCard" class="input-units-4" ignore="ignore" value="${checklist.stuff.waterCard }" datatype="checkTiny" nullmsg="请输入水卡的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeWaterCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.waterCard}' name="checklist.stuff.waterCard"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.powerCard == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>电卡</b>
									<!-- <input type="number" id="maybePowerCard" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入电卡的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybePowerCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>电卡</b>
									<!-- <input type="number" id="maybePowerCard" class="input-units-4" ignore="ignore" value="${checklist.stuff.powerCard }" datatype="checkTiny" nullmsg="请输入电卡的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybePowerCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.powerCard}' name="checklist.stuff.powerCard"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.gasCard == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>燃气卡</b>
									<!-- <input type="number" id="maybeGasCard" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入燃气卡的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeGasCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>燃气卡</b>
									<!-- <input type="number" id="maybeGasCard" class="input-units-4" ignore="ignore" value="${checklist.stuff.gasCard }" datatype="checkTiny" nullmsg="请输入燃气卡的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeGasCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.gasCard}' name="checklist.stuff.gasCard"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			          
			           <button type="button" class="remarkBtn">
			              <b>备注</b>
			              <span class="zgIcon zgIcon-pencil"></span>
			           </button>
			           <div class="edit-group">
			              <textarea class="remarks" datatype="*0-200" name="checklist.stuff.remark" placeholder='备注'>${bathroom.remark }</textarea>
			          </div>
			          <div class="btn-group">
				              <button class="checkOff weui_btn weui_btn_primary">检查完毕</button>
				           </div>
			        </div>
			    </form>
			  </div>
		
		</c:when>
		<c:when test="${status == 'c' }">
			<div class="main">
				<h2>房屋检查</h2>
				<div class="weui_msg">
			        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
			        <div class="weui_text_area">
			            <h3 class="weui_msg_title">房屋检查单</h3>
			            <p class="weui_msg_desc">房屋检查单双方均已同意，请等待房东生成合同。</p>
			        </div>
			        <div class="weui_opr_area">
			            <p class="weui_btn_area">
			                <a href="/Sign.action?goToSignListPage" class="weui_btn weui_btn_primary">知道了</a>
			            </p>
			        </div>
			    </div>
		  	</div>
		</c:when>
		<c:otherwise>
			<div class="main info">
				<h2>房屋检查</h2>
				<div class="weui_msg">
			        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
			        <div class="weui_text_area">
			            <h3 class="weui_msg_title">检查完毕</h3>
			            <p class="weui_msg_desc">房屋检查完毕,请等待房东确认检查清单。</p>
			        </div>
			        <div class="weui_opr_area">
			            <p class="weui_btn_area">
			                <a href="/Sign.action?goToSignListPage" class="weui_btn weui_btn_primary">知道了</a>
			            </p>
			        </div>
			    </div>
		  	</div>
			  <div class="main">
			    <div class="mainMenu">
			      <h2>房屋检查</h2>
			      <c:if test="${status == 'n' }">
				      <p>房东对房屋检查单有不同意见，请您与房东进行协商统一。</p>
			      </c:if>
			      <ul id="checkMenu">
			      	<c:forEach var="room" items="${checklist.room }" varStatus="status">
						<li class="uncheck"><a href="###" id="room${status.index+1 }">${room.name }<span class="zgIcon zgIcon-pointer"></span><span class="zgIcon zgIcon-angle-right"></span></a></li>
					</c:forEach>
			        <li class="uncheck"><a href="###" id="kitchen">厨房<span class="zgIcon zgIcon-pointer"></span><span class="zgIcon zgIcon-angle-right"></span></a></li>
			        <c:forEach var="bathroom" items="${checklist.bathroom }"  varStatus="status"> 
				        <li class="uncheck"><a href="###" id="bathroom${status.index+1 }">${bathroom.name }<span class="zgIcon zgIcon-pointer"></span><span class="zgIcon zgIcon-angle-right"></span></a></li>
			        </c:forEach>
			        <li class="uncheck"><a href="###" id="stuff">物品<span class="zgIcon zgIcon-pointer"></span><span class="zgIcon zgIcon-angle-right"></span></a></li>
			      </ul>
			      <button class="weui_btn weui_btn_primary checkOff" type='submit' id="submitBtn">检查完毕</button>
			    </div>
			    <form action="/ProgressOperation.action?saveCheckList" method="post" id="checklist">
					    <input type="hidden" id="checkPid" name="pid" value="${pid }">
					<c:forEach var="room" items="${checklist.room }" varStatus="status">
					    <input type="hidden" name="checklist.room[${status.index }].pid" value="${room.pid }">
					    <input type="hidden" name="checklist.room[${status.index }].id" value="${room.id }">
						<div class="tab-detail room${status.index+1 }">
						<h2>${room.name }检查清单</h2>
						<div class="form-control">
							 <button type="button" class="checkBtn forbidden"></button>
							 <b>地面</b>
							 <span>${room.floor}</span>
							 <c:choose>
							 	<c:when test="${room.floor == '正常' }">
							 		<button type="button" class="toggleBtn"></button>
							 	</c:when>
							 	<c:when test="${room.floor == '异常' }">
							 		<button type="button" class="toggleBtn off"></button>
							 	</c:when>
							 </c:choose>
							 <input type="hidden" value='${room.floor }' name="checklist.room[${status.index }].floor"/>
						</div>
						<div class="form-control">
			              <button type="button" class="checkBtn forbidden"></button>
			              <b>墙面</b>
			              <span>${room.wall }</span>
			              <c:choose>
							 	<c:when test="${room.wall == '正常' }">
							 		<button type="button" class="toggleBtn"></button>
							 	</c:when>
							 	<c:when test="${room.wall == '异常' }">
							 		<button type="button" class="toggleBtn off"></button>
							 	</c:when>
					      </c:choose>
			              <input type="hidden" value='${room.wall }' name="checklist.room[${status.index }].wall"/>
			           </div>
			           <div class="form-control">
			              <button type="button" class="checkBtn forbidden"></button>
			              <b>屋顶</b>
			              <span>${room.ceiling }</span>
			              <c:choose>
							 	<c:when test="${room.ceiling == '正常' }">
							 		<button type="button" class="toggleBtn"></button>
							 	</c:when>
							 	<c:when test="${room.ceiling == '异常' }">
							 		<button type="button" class="toggleBtn off"></button>
							 	</c:when>
					      </c:choose>
			              <input type="hidden" value='${room.ceiling }' name="checklist.room[${status.index }].ceiling"/>
			           </div>
			           <div class="form-control">
			             	<c:choose>
								<c:when test="${room.window == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>窗户</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${room.window == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>窗户</b>
									<span>${room.window }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>窗户</b>
									<span>${room.window }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${room.window}' name="checklist.room[${status.index }].window"/>
			          </div>
			          <div class="form-control">
			             	<c:choose>
								<c:when test="${room.door == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>门/锁</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${room.door == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>门/锁</b>
									<span>${room.door }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>门/锁</b>
									<span>${room.door }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${room.door}' name="checklist.room[${status.index }].door"/>
			          </div>
			          <div class="form-control">
			             	<c:choose>
								<c:when test="${room.light == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>灯</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${room.light == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>灯</b>
									<span>${room.light }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>灯</b>
									<span>${room.light }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${room.light}' name="checklist.room[${status.index }].light"/>
			          </div>
			          <div class="form-control">
			             	<c:choose>
								<c:when test="${room.plug == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>插座/开关</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${room.plug == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>插座/开关</b>
									<span>${room.plug }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>插座/开关</b>
									<span>${room.plug }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${room.plug}' name="checklist.room[${status.index }].plug"/>
			          </div>
			          <div class="form-control">
			             	<c:choose>
								<c:when test="${room.aircond == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>空调</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${room.aircond == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>空调</b>
									<span>${room.aircond }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>空调</b>
									<span>${room.aircond }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${room.aircond}' name="checklist.room[${status.index }].aircond"/>
			          </div>
			          <div class="form-control">
			             	<c:choose>
								<c:when test="${room.heat == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>暖气</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${room.heat == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>暖气</b>
									<span>${room.heat }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>暖气</b>
									<span>${room.heat }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${room.heat}' name="checklist.room[${status.index }].heat"/>
			          </div>
			          
			          <button type="button" class="remarkBtn">
			              <b>备注</b>
			              <span class="zgIcon zgIcon-pencil"></span>
			          </button>
			          <div class="edit-group">
			              <textarea class="remarks" datatype="*0-200" name="checklist.room[${status.index }].remark" placeholder='备注'>${room.remark }</textarea>
			          </div>
			          <div class="btn-group">
			              <button class="checkOff weui_btn weui_btn_primary">检查完毕</button>
			          </div>
			          </div>
					</c:forEach>
					<div class="tab-detail kitchen">
						<input type="hidden" name="checklist.kitchen.pid" value="${checklist.kitchen.pid }">
						<input type="hidden" name="checklist.kitchen.id" value="${checklist.kitchen.id }">
						<h2>厨房检查清单</h2>
						<div class="form-control">
							 <button type="button" class="checkBtn forbidden"></button>
							 <b>地面</b>
							 <span>${checklist.kitchen.floor}</span>
							 <c:choose>
							 	<c:when test="${checklist.kitchen.floor == '正常' }">
							 		<button type="button" class="toggleBtn"></button>
							 	</c:when>
							 	<c:when test="${checklist.kitchen.floor == '异常' }">
							 		<button type="button" class="toggleBtn off"></button>
							 	</c:when>
							 </c:choose>
							 <input type="hidden" value='${checklist.kitchen.floor }' name="checklist.kitchen.floor"/>
						</div>
						<div class="form-control">
							 <button type="button" class="checkBtn forbidden"></button>
							 <b>屋顶</b>
							 <span>${checklist.kitchen.ceiling}</span>
							 <c:choose>
							 	<c:when test="${checklist.kitchen.ceiling == '正常' }">
							 		<button type="button" class="toggleBtn"></button>
							 	</c:when>
							 	<c:when test="${checklist.kitchen.ceiling == '异常' }">
							 		<button type="button" class="toggleBtn off"></button>
							 	</c:when>
							 </c:choose>
							 <input type="hidden" value='${checklist.kitchen.ceiling }' name="checklist.kitchen.ceiling"/>
						</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.window == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>窗户</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.window == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>窗户</b>
									<span>${checklist.kitchen.window }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>窗户</b>
									<span>${checklist.kitchen.window }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.window}' name="checklist.kitchen.window"/>
			          	</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.door == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>门/锁</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.door == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>门/锁</b>
									<span>${checklist.kitchen.door }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>门/锁</b>
									<span>${checklist.kitchen.door }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.door}' name="checklist.kitchen.door"/>
			          	</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.light == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>灯</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.light == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>灯</b>
									<span>${checklist.kitchen.light }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>灯</b>
									<span>${checklist.kitchen.light }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.light}' name="checklist.kitchen.light"/>
			          	</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.plug == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>插座/开关</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.plug == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>插座/开关</b>
									<span>${checklist.kitchen.plug }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>插座/开关</b>
									<span>${checklist.kitchen.plug }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.plug}' name="checklist.kitchen.plug"/>
			          	</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.tap == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>水龙头</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.tap == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>水龙头</b>
									<span>${checklist.kitchen.tap }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>水龙头</b>
									<span>${checklist.kitchen.tap }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.tap}' name="checklist.kitchen.tap"/>
			          	</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.drain == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>地漏</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.drain == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>地漏</b>
									<span>${checklist.kitchen.drain }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>地漏</b>
									<span>${checklist.kitchen.drain }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.drain}' name="checklist.kitchen.drain"/>
			          	</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.hood == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>抽油烟机</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.hood == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>抽油烟机</b>
									<span>${checklist.kitchen.hood }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>抽油烟机</b>
									<span>${checklist.kitchen.hood }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.hood}' name="checklist.kitchen.hood"/>
			          	</div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.cooker == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>燃气灶</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.cooker == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>燃气灶</b>
									<span>${checklist.kitchen.cooker }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>燃气灶</b>
									<span>${checklist.kitchen.cooker }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.cooker}' name="checklist.kitchen.cooker"/>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.waterheater == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>热水器</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.waterheater == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>热水器</b>
									<span>${checklist.kitchen.waterheater }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>热水器</b>
									<span>${checklist.kitchen.waterheater }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.waterheater}' name="checklist.kitchen.waterheater"/>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.microwave == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>微波炉</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.microwave == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>微波炉</b>
									<span>${checklist.kitchen.microwave }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>微波炉</b>
									<span>${checklist.kitchen.microwave }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.microwave}' name="checklist.kitchen.microwave"/>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.cabinet == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>橱柜</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.cabinet == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>橱柜</b>
									<span>${checklist.kitchen.cabinet }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>橱柜</b>
									<span>${checklist.kitchen.cabinet }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.cabinet}' name="checklist.kitchen.cabinet"/>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.aircond == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>空调</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.aircond == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>空调</b>
									<span>${checklist.kitchen.aircond }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>空调</b>
									<span>${checklist.kitchen.aircond }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.aircond}' name="checklist.kitchen.aircond"/>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.heat == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>暖气</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.kitchen.heat == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>暖气</b>
									<span>${checklist.kitchen.heat }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>暖气</b>
									<span>${checklist.kitchen.heat }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" value='${checklist.kitchen.heat}' name="checklist.kitchen.heat"/>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.water == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>水表底数</b>
									<input type="number" class="input-units-8" ignore="ignore" datatype="n1-9" nullmsg="请输入水表底数" maxlength="9"/>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>水表底数</b>
									<input type="number" class="input-units-8" ignore="ignore" value="${checklist.kitchen.water }" datatype="n1-9" nullmsg="请输入水表底数" maxlength="9"/>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.kitchen.water}' name="checklist.kitchen.water"/>
				     	   <span class="Validform_checktip"></span>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.power == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>电表底数</b>
									<input type="number" id="maybePower" class="input-units-8" ignore="ignore" datatype="n1-9" nullmsg="请输入电表底数" maxlength="9"/>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>电表底数</b>
									<input type="number" id="maybePower" class="input-units-8" ignore="ignore" value="${checklist.kitchen.power }" datatype="n1-9" nullmsg="请输入电表底数" maxlength="9"/>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.kitchen.power}' name="checklist.kitchen.power"/>
				     	   <span class="Validform_checktip"></span>
			            </div>
						<div class="form-control">
			             	<c:choose>
								<c:when test="${checklist.kitchen.gas == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>燃气底数</b>
									<input type="number" id="maybeGas" class="input-units-8" ignore="ignore" datatype="n1-9" nullmsg="请输入燃气底数" maxlength="9"/>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>燃气底数</b>
									<input type="number" id="maybeGas" class="input-units-8" ignore="ignore" value="${checklist.kitchen.gas }" datatype="n1-9" nullmsg="请输入燃气底数" maxlength="9"/>
								</c:otherwise>
				     	   </c:choose>
				     	    <input type="hidden" class="maybeValue" value='${checklist.kitchen.gas}' name="checklist.kitchen.gas"/>
				     	    <span class="Validform_checktip"></span>
			            </div>
						
			          	<button type="button" class="remarkBtn">
			              <b>备注</b>
			              <span class="zgIcon zgIcon-pencil"></span>
			          	</button>
			          	<div class="edit-group">
			              <textarea class="remarks" datatype="*0-200" name="checklist.kitchen.remark" placeholder='备注'>${checklist.kitchen.remark }</textarea>
			          	</div>
			          	<div class="btn-group">
			              <button class="checkOff weui_btn weui_btn_primary">检查完毕</button>
			          	</div>
					</div>
					
			        <c:forEach var="bathroom" items="${checklist.bathroom }" varStatus="status">
						<input type="hidden" name="checklist.bathroom[${status.index }].pid" value="${bathroom.pid }">
						<input type="hidden" name="checklist.bathroom[${status.index }].id" value="${bathroom.id }">
			       		<div class="tab-detail bathroom${status.index + 1 }">
							<h2>${bathroom.name }检查清单</h2>
							<div class="form-control">
								<button type="button" class="checkBtn forbidden"></button>
							 	<b>屋顶</b>
							 	<span>${bathroom.ceiling}</span>
							 	<c:choose>
							 		<c:when test="${bathroom.ceiling == '正常' }">
							 			<button type="button" class="toggleBtn"></button>
							 		</c:when>
							 		<c:when test="${bathroom.ceiling == '异常' }">
							 			<button type="button" class="toggleBtn off"></button>
							 		</c:when>
							 	</c:choose>
							 	<input type="hidden" value='${bathroom.ceiling }' name="checklist.bathroom[${status.index }].ceiling"/>
							</div>
							<div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.window == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>窗户</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.window == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>窗户</b>
										<span>${bathroom.window }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>窗户</b>
										<span>${bathroom.window }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.window}' name="checklist.bathroom[${status.index }].window"/>
			          		</div>
							<div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.door == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>门/锁</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.door == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>门/锁</b>
										<span>${bathroom.door }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>门/锁</b>
										<span>${bathroom.door }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.door}' name="checklist.bathroom[${status.index }].door"/>
			          		</div>
							<div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.light == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>灯</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.light == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>灯</b>
										<span>${bathroom.light }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>灯</b>
										<span>${bathroom.light }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.light}' name="checklist.bathroom[${status.index }].light"/>
			          	   </div>
							<div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.plug == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>插座/开关</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.plug == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>插座/开关</b>
										<span>${bathroom.plug }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>插座/开关</b>
										<span>${bathroom.plug }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.plug}' name="checklist.bathroom[${status.index }].plug"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.tap == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>水龙头</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.tap == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>水龙头</b>
										<span>${bathroom.tap }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>水龙头</b>
										<span>${bathroom.tap }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.tap}' name="checklist.bathroom[${status.index }].tap"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.drain == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>下水</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.drain == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>下水</b>
										<span>${bathroom.drain }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>下水</b>
										<span>${bathroom.drain }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.drain}' name="checklist.bathroom[${status.index }].drain"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.shower == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>淋浴</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.shower == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>淋浴</b>
										<span>${bathroom.shower }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>淋浴</b>
										<span>${bathroom.shower }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.shower}' name="checklist.bathroom[${status.index }].shower"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.bathtub == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>浴缸</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.bathtub == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>浴缸</b>
										<span>${bathroom.bathtub }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>浴缸</b>
										<span>${bathroom.bathtub }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.bathtub}' name="checklist.bathroom[${status.index }].bathtub"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.waterheater == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>热水器</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.waterheater == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>热水器</b>
										<span>${bathroom.waterheater }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>热水器</b>
										<span>${bathroom.waterheater }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.waterheater}' name="checklist.bathroom[${status.index }].waterheater"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.vent == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>排风扇</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.vent == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>排风扇</b>
										<span>${bathroom.vent }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>排风扇</b>
										<span>${bathroom.vent }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.vent}' name="checklist.bathroom[${status.index }].vent"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.toilet == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>坐便器</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.toilet == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>坐便器</b>
										<span>${bathroom.toilet }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>坐便器</b>
										<span>${bathroom.toilet }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.toilet}' name="checklist.bathroom[${status.index }].toilet"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.aircond == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>空调</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.aircond == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>空调</b>
										<span>${bathroom.aircond }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>空调</b>
										<span>${bathroom.aircond }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.aircond}' name="checklist.bathroom[${status.index }].aircond"/>
			          	   </div>
						   <div class="form-control">
				             	<c:choose>
									<c:when test="${bathroom.heat == '无'}">
										<button type="button" class="checkBtn off"></button>
										<b>暖气</b>
										<span>正常</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:when test="${bathroom.heat == '正常'}">
										<button type="button" class="checkBtn"></button>
										<b>暖气</b>
										<span>${bathroom.heat }</span>
										<button type="button" class="toggleBtn"></button>
									</c:when>
									<c:otherwise>
										<button type="button" class="checkBtn"></button>
										<b>暖气</b>
										<span>${bathroom.heat }</span>
										<button type="button" class="toggleBtn off"></button>
									</c:otherwise>
					     	   </c:choose>
					     	   <input type="hidden" value='${bathroom.heat}' name="checklist.bathroom[${status.index }].heat"/>
			          	   </div>
			          	   
				           <button type="button" class="remarkBtn">
				              <b>备注</b>
				              <span class="zgIcon zgIcon-pencil"></span>
				           </button>
				           <div class="edit-group">
				              <textarea class="remarks" datatype="*0-200" name="checklist.bathroom[${status.index }].remark" placeholder='备注'>${bathroom.remark }</textarea>
				          	</div>
				          	<div class="btn-group">
				              <button class="checkOff weui_btn weui_btn_primary">检查完毕</button>
				           </div>
			       		</div>
			        </c:forEach>
			        
			       	<input type="hidden" name="checklist.stuff.pid" value="${checklist.stuff.pid }">
			        <input type="hidden" name="checklist.stuff.id" value="${checklist.stuff.id }">
			        <div class="tab-detail stuff">
			           <h2>核对物品检查清单</h2>
			           <div class="form-control">
				           	<c:choose>
								<c:when test="${checklist.stuff.washer == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>洗衣机</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.stuff.washer == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>洗衣机</b>
									<span>${checklist.stuff.washer }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>洗衣机</b>
									<span>${checklist.stuff.washer }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				    	   </c:choose>
				    	   <input type="hidden" value='${checklist.stuff.washer}' name="checklist.stuff.washer"/>
			           </div>
			           <div class="form-control">
				           	<c:choose>
								<c:when test="${checklist.stuff.fridge == '无'}">
									<button type="button" class="checkBtn off"></button>
									<b>冰箱</b>
									<span>正常</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:when test="${checklist.stuff.fridge == '正常'}">
									<button type="button" class="checkBtn"></button>
									<b>冰箱</b>
									<span>${checklist.stuff.fridge }</span>
									<button type="button" class="toggleBtn"></button>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>冰箱</b>
									<span>${checklist.stuff.fridge }</span>
									<button type="button" class="toggleBtn off"></button>
								</c:otherwise>
				    	   </c:choose>
				    	   <input type="hidden" value='${checklist.stuff.fridge}' name="checklist.stuff.fridge"/>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.bed == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>床</b>
									<!-- <input type="number" id="maybeBed" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入床的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeBed">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>床</b>
									<!-- <input type="number" id="maybeBed" class="input-units-4" ignore="ignore" value="${checklist.stuff.bed }" datatype="checkTiny" nullmsg="请输入床的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeBed">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.bed}' name="checklist.stuff.bed"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.closet == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>衣柜</b>
									<!-- <input type="number" id="maybeCloset" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入衣柜的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeCloset">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>衣柜</b>
									<!-- <input type="number" id="maybeCloset" class="input-units-4" ignore="ignore" value="${checklist.stuff.closet }" datatype="checkTiny" nullmsg="请输入衣柜的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeCloset">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.closet}' name="checklist.stuff.closet"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.desk == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>桌子</b>
									<!-- <input type="number" id="maybeDesk" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入桌子的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeDesk">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>桌子</b>
									<!-- <input type="number" id="maybeDesk" class="input-units-4" ignore="ignore" value="${checklist.stuff.desk }" datatype="checkTiny" nullmsg="请输入桌子的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeDesk">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.desk}' name="checklist.stuff.desk"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.chair == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>椅子</b>
									<!-- <input type="number" id="maybeChair" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入椅子的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeChair">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>椅子</b>
									<!-- <input type="number" id="maybeChair" class="input-units-4" ignore="ignore" value="${checklist.stuff.chair }" datatype="checkTiny" nullmsg="请输入椅子的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeChair">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.chair}' name="checklist.stuff.chair"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.sofa == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>沙发</b>
									<!-- <input type="number" id="maybeSofa" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入沙发的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeSofa">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>沙发</b>
									<!-- <input type="number" id="maybeSofa" class="input-units-4" ignore="ignore" value="${checklist.stuff.sofa }" datatype="checkTiny" nullmsg="请输入沙发的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeSofa">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.sofa}' name="checklist.stuff.sofa"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.key == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>钥匙</b>
									<!-- <input type="number" id="maybeKey" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入钥匙的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeKey">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>钥匙</b>
									<!-- <input type="number" id="maybeKey" class="input-units-4" ignore="ignore" value="${checklist.stuff.key }" datatype="checkTiny" nullmsg="请输入钥匙的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeKey">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.key}' name="checklist.stuff.key"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.doorCard == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>门卡</b>
									<!-- <input type="number" id="maybeDoorCard" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入门卡的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeDoorCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>门卡</b>
									<!-- <input type="number" id="maybeDoorCard" class="input-units-4" ignore="ignore" value="${checklist.stuff.doorCard }" datatype="checkTiny" nullmsg="请输入门卡的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeDoorCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.doorCard}' name="checklist.stuff.doorCard"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.waterCard == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>水卡</b>
									<!-- <input type="number" id="maybeWaterCard" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入水卡的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeWaterCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>水卡</b>
									<!-- <input type="number" id="maybeWaterCard" class="input-units-4" ignore="ignore" value="${checklist.stuff.waterCard }" datatype="checkTiny" nullmsg="请输入水卡的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeWaterCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.waterCard}' name="checklist.stuff.waterCard"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.powerCard == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>电卡</b>
									<!-- <input type="number" id="maybePowerCard" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入电卡的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybePowerCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>电卡</b>
									<!-- <input type="number" id="maybePowerCard" class="input-units-4" ignore="ignore" value="${checklist.stuff.powerCard }" datatype="checkTiny" nullmsg="请输入电卡的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybePowerCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.powerCard}' name="checklist.stuff.powerCard"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <div class="form-control">
							<c:choose>
								<c:when test="${checklist.stuff.gasCard == -1}">
									<button type="button" class="checkBtn off"></button>
									<b>燃气卡</b>
									<!-- <input type="number" id="maybeGasCard" class="input-units-4" ignore="ignore" datatype="checkTiny" nullmsg="请输入燃气卡的个数。" maxlength="3"/> -->
									<select class='maybeSelect' id="maybeGasCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:when>
								<c:otherwise>
									<button type="button" class="checkBtn"></button>
									<b>燃气卡</b>
									<!-- <input type="number" id="maybeGasCard" class="input-units-4" ignore="ignore" value="${checklist.stuff.gasCard }" datatype="checkTiny" nullmsg="请输入燃气卡的个数。" maxlength="3"/> -->
									<select value='1' class='maybeSelect' id="maybeGasCard">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
								</c:otherwise>
				     	   </c:choose>
				     	   <input type="hidden" class="maybeValue" value='${checklist.stuff.gasCard}' name="checklist.stuff.gasCard"/>
				     	   <span class="Validform_checktip"></span>
			           </div>
			           <button type="button" class="remarkBtn">
			              <b>备注</b>
			              <span class="zgIcon zgIcon-pencil"></span>
			           </button>
			           <div class="edit-group">
			              <textarea class="remarks" datatype="*0-200" name="checklist.stuff.remark" placeholder='备注'>${bathroom.remark }</textarea>
			          </div>
			          <div class="btn-group">
			           		<button class="checkOff weui_btn weui_btn_primary confirmbb">检查完毕</button>
				       </div>
				       
			        </div>
			    </form>
			  </div>
		</c:otherwise>
	</c:choose>
</body>
<script type="text/javascript" src="/scripts/weixin/vCheckList.js"></script>

</html>