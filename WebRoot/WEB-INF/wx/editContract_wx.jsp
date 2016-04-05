<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>
	看房签约-真格租房
</title>
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<meta name="description" content="全实名租房平台，在租客、房东、经纪人间建立可信连接，提供租房相关服务，让你住得安心！"/>

<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/css/weixin/vEditContract.css">
</head>
<body>
 	<input id="ppid" value="${pid }" type="hidden"/>
  <c:choose>
  	<c:when test="${status == -1 and not empty checklist.room and not empty checklist.bathroom and not empty checklist.kitchen and not empty checklist.stuff}">
	   <div class="main">
          <div class="container">
              <h2>
                <strong>房屋检查</strong>
              </h2>
              <form action="/ProgressOperation.action?dealCheckListApply" method="post" id="checklist">
              <c:forEach var="room" items="${checklist.room }" varStatus="status">
              	<input type="hidden" name="checklist.room[${status.index }].pid" value="${room.pid }">
			    <input type="hidden" name="checklist.room[${status.index }].id" value="${room.id }">
			    <c:choose>
			    	<c:when test="${not (room.floor == '正常' and room.wall == '正常' and room.ceiling == '正常' and room.window == '正常' 
						    	and room.door == '正常' and room.light == '正常' and room.plug == '正常' and room.aircond == '正常' and room.heat == '正常')}">
						<div class="tab-detail room${status.index+1 }">
		                <h4>${room.name }</h4>
		                <div class="detail">
		                  <p>
	                  		<c:if test="${room.floor == '异常' }">地面：${room.floor }；</c:if>
	                  		<c:if test="${room.wall == '异常' }">墙面：${room.floor }；</c:if>
	                  		<c:if test="${room.ceiling == '异常' }">屋顶：${room.ceiling }；</c:if>
	                  		<c:if test="${room.window == '无' or room.window == '异常'}">窗户：${room.window } ；</c:if>
	                  		<c:if test="${room.door == '无' or room.door == '异常'}">门/锁：${room.door } ；</c:if>
	                  		<c:if test="${room.light == '无' or room.light == '异常'}">灯：${room.light } ；</c:if>
	                  		<c:if test="${room.plug == '无' or room.plug == '异常'}">插座/开关：${room.plug } ；</c:if>
	                  		<c:if test="${room.aircond == '无' or room.aircond == '异常'}">空调：${room.aircond } ；</c:if>
	                  		<c:if test="${room.heat == '无' or room.heat == '异常'}">暖气：${room.heat }；</c:if>
		                  </p>
		                  <p class="remark">
		                  		${room.remark }
		                  </p>
		                </div>
		            	</div>
					</c:when>
			    </c:choose>
	            
			  </c:forEach>
			  <c:if test="${not empty checklist.kitchen }">
	              <div class="tab-detail kitchen">
	                <h4>厨房</h4>
	              	<input type="hidden" name="checklist.kitchen.pid" value="${checklist.kitchen.pid }">
					<input type="hidden" name="checklist.kitchen.id" value="${checklist.kitchen.id }">
					 <div class="detail">
					 <p>
						<c:if test="${checklist.kitchen.floor == '异常'}">地面：${ checklist.kitchen.floor} ；</c:if>
						<c:if test="${checklist.kitchen.ceiling == '异常' }">屋顶： ${checklist.kitchen.ceiling } ；</c:if>
						<c:if test="${checklist.kitchen.window == '无' or checklist.kitchen.window == '异常' }">窗户：${checklist.kitchen.window } ；</c:if>
						<c:if test="${checklist.kitchen.door == '无' or checklist.kitchen.door == '异常'}">门/锁：${checklist.kitchen.door } ；</c:if>
						<c:if test="${checklist.kitchen.light == '无' or checklist.kitchen.light == '异常'}">灯：${checklist.kitchen.light } ；</c:if>
						<c:if test="${checklist.kitchen.plug == '无' or checklist.kitchen.plug == '异常'}">插座/开关：${checklist.kitchen.plug } ；</c:if>
						<c:if test="${checklist.kitchen.tap == '无' or checklist.kitchen.tap == '异常'}">水龙头：${checklist.kitchen.tap } ；</c:if>
						<c:if test="${checklist.kitchen.drain == '无' or checklist.kitchen.drain == '异常'}">地漏：${checklist.kitchen.drain } ；</c:if>
						<c:if test="${checklist.kitchen.hood == '无' or checklist.kitchen.hood == '异常'}">抽油烟机：${checklist.kitchen.hood } ；</c:if>
						<c:if test="${checklist.kitchen.cooker == '无' or checklist.kitchen.cooker == '异常'}">燃气灶：${checklist.kitchen.cooker } ；</c:if>
						<c:if test="${checklist.kitchen.waterheater == '无' or checklist.kitchen.waterheater == '异常'}">热水器：${checklist.kitchen.waterheater } ；</c:if>
						<c:if test="${checklist.kitchen.microwave == '无' or checklist.kitchen.microwave == '异常'}">微波炉：${checklist.kitchen.microwave } ；</c:if>
						<c:if test="${checklist.kitchen.cabinet == '无' or checklist.kitchen.cabinet == '异常'}">橱柜：${checklist.kitchen.cabinet } ；</c:if>
						<c:if test="${checklist.kitchen.aircond == '无' or checklist.kitchen.aircond == '异常'}">空调：${checklist.kitchen.aircond } ；</c:if>
						<c:if test="${checklist.kitchen.heat == '无' or checklist.kitchen.heat == '异常'}">暖气：${checklist.kitchen.heat } ；</c:if>
						<c:if test="${checklist.kitchen.water == -1}">水表底数：无 ；</c:if>
						<c:if test="${checklist.kitchen.water != -1}">水表底数：${checklist.kitchen.water} ；</c:if>
						<c:if test="${checklist.kitchen.power == -1}">电表底数：无 ；</c:if>
						<c:if test="${checklist.kitchen.power != -1}">电表底数：${checklist.kitchen.power} ；</c:if>
						<c:if test="${checklist.kitchen.gas == -1}">燃气底数：无 ；</c:if>
						<c:if test="${checklist.kitchen.gas != -1}">燃气底数：${checklist.kitchen.gas} ；</c:if>
					</p>
					<p class="remark">
						${checklist.kitchen.remark}
					</p>
					</div>
	              </div>
			  
			  </c:if>
              <c:forEach var="bathroom" items="${checklist.bathroom }" varStatus="status">
              	<input type="hidden" name="checklist.bathroom[${status.index }].pid" value="${bathroom.pid }">
				<input type="hidden" name="checklist.bathroom[${status.index }].id" value="${bathroom.id }">
				<c:if test="${not (bathroom.ceiling == '正常' and bathroom.window == '正常' and bathroom.door == '正常' and bathroom.light == '正常' 
							 and bathroom.plug == '正常' and bathroom.tap == '正常' and bathroom.drain == '正常' and bathroom.shower == '正常'
							 and bathroom.bathtub == '正常' and bathroom.waterheater == '正常' and bathroom.vent == '正常' and bathroom.toilet == '正常'
							 and bathroom.aircond == '正常' and bathroom.heat == '正常')}">
			       		<div class="tab-detail bathroom${status.index + 1 }">
			       			 <h4>${bathroom.name }</h4>
			       			 <div class="detail">
			                 	<p>
			                 		<c:if test="${bathroom.ceiling == '异常' }">屋顶：${bathroom.ceiling }；</c:if>
			                 		<c:if test="${bathroom.window == '无' or bathroom.window == '异常'}">窗户：${bathroom.window } ；</c:if>
			                 		<c:if test="${bathroom.door == '无' or bathroom.door == '异常'}">门/锁：${bathroom.door } ；</c:if>
			                 		<c:if test="${bathroom.light == '无' or bathroom.light == '异常'}">灯：${bathroom.light } ；</c:if>
			                 		<c:if test="${bathroom.plug == '无' or bathroom.plug == '异常'}">插座/开关：${bathroom.plug } ；</c:if>
			                 		<c:if test="${bathroom.tap == '无' or bathroom.tap == '异常'}">水龙头：${bathroom.tap } ；</c:if>
			                 		<c:if test="${bathroom.drain == '无' or bathroom.drain == '异常'}">下水：${bathroom.drain } ；</c:if>
			                 		<c:if test="${bathroom.shower == '无' or bathroom.shower == '异常'}">淋浴：${bathroom.shower } ；</c:if>
			                 		<c:if test="${bathroom.bathtub == '无' or bathroom.bathtub == '异常'}">浴缸：${bathroom.bathtub } ；</c:if>
			                 		<c:if test="${bathroom.waterheater == '无' or bathroom.waterheater == '异常'}">热水器：${bathroom.waterheater } ；</c:if>
			                 		<c:if test="${bathroom.vent == '无' or bathroom.vent == '异常'}">排风扇：${bathroom.vent } ；</c:if>
			                 		<c:if test="${bathroom.toilet == '无' or bathroom.toilet == '异常'}">坐便器：${bathroom.toilet } ；</c:if>
			                 		<c:if test="${bathroom.aircond == '无' or bathroom.aircond == '异常'}">空调：${bathroom.aircond } ；</c:if>
			                 		<c:if test="${bathroom.heat == '无' or bathroom.heat == '异常'}">暖气：${bathroom.heat } ；</c:if>
			                 	</p>
			                 	<p class="remark">
			                 		${ bathroom.remark}
			                 	</p>
			                 </div>
			       		</div>
				</c:if>
              </c:forEach>
	              <c:if test="${not empty checklist.stuff }">
		              <div class="tab-detail stuff">
		                <h4>其他</h4>
		                <div class="detail">
		                	<p>
	                			<c:if test="${checklist.stuff.washer == '无' or checklist.stuff.washer == '异常'}">洗衣机：${checklist.stuff.washer } ；</c:if>
	                			<c:if test="${checklist.stuff.fridge == '无' or checklist.stuff.fridge == '异常'}">冰箱：${checklist.stuff.fridge } ；</c:if>
	                			<c:if test="${checklist.stuff.bed == -1} ">床：无；</c:if>
	                			<c:if test="${checklist.stuff.bed != -1} ">床：${ checklist.stuff.bed} 个；</c:if>
	                			<c:if test="${checklist.stuff.closet == -1} ">衣柜：无；</c:if>
	                			<c:if test="${checklist.stuff.closet != -1} ">衣柜：${ checklist.stuff.closet} 个；</c:if>
	                			<c:if test="${checklist.stuff.desk == -1} ">桌子：无；</c:if>
	                			<c:if test="${checklist.stuff.desk != -1} ">桌子：${ checklist.stuff.desk} 个；</c:if>
	                			<c:if test="${checklist.stuff.chair == -1} ">椅子：无；</c:if>
	                			<c:if test="${checklist.stuff.chair != -1} ">椅子：${ checklist.stuff.chair} 个；</c:if>
	                			<c:if test="${checklist.stuff.sofa == -1} ">沙发：无；</c:if>
	                			<c:if test="${checklist.stuff.sofa != -1} ">沙发：${ checklist.stuff.sofa} 个；</c:if>
	                			<c:if test="${checklist.stuff.key == -1} ">钥匙：无；</c:if>
	                			<c:if test="${checklist.stuff.key != -1} ">钥匙：${ checklist.stuff.key} 个；</c:if>
	                			<c:if test="${checklist.stuff.doorCard == -1} ">门卡：无；</c:if>
	                			<c:if test="${checklist.stuff.doorCard != -1} ">门卡：${ checklist.stuff.doorCard} 个；</c:if>
	                			<c:if test="${checklist.stuff.waterCard == -1} ">水卡：无；</c:if>
	                			<c:if test="${checklist.stuff.waterCard != -1} ">水卡：${ checklist.stuff.waterCard} 个；</c:if>
	                			<c:if test="${checklist.stuff.powerCard == -1} ">电卡：无；</c:if>
	                			<c:if test="${checklist.stuff.powerCard != -1} ">电卡：${ checklist.stuff.powerCard} 个；</c:if>
	                			<c:if test="${checklist.stuff.gasCard == -1} ">燃气卡：无；</c:if>
	                			<c:if test="${checklist.stuff.gasCard != -1} ">燃气卡：${ checklist.stuff.gasCard} 个；</c:if>
		                	</p>
		                	<p class="remark">
		                		<c:if test="${not empty checklist.stuff.remark  }"></c:if>
		                	</p>
		                </div>
		              </div>
	              
	              </c:if>
	              <c:if test="${not empty checklist.room and not empty checklist.bathroom and not empty checklist.kitchen and not empty checklist.stuff}">
		             <div class="weui_opr_area">
			             <p class="weui_btn_area">
			               <a href="###" class="weui_btn weui_btn_default btns" id="applyEdit">要求修改</a>
			               <a href="###" class="weui_btn weui_btn_primary btns" id="passChecklist">同意</a>
			             </p>
		             </div>
	              </c:if>
              </form>
          </div>
     </div>
  	</c:when>
  	<c:when test="${status == -4}">
		<div class="main">
			<h2>房屋检查</h2>
			<div class="weui_msg">
		        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
		        <div class="weui_text_area">
		            <h3 class="weui_msg_title">修改请求已发送给租客</h3>
		            <p class="weui_msg_desc">等待租客修改房屋检查单。</p>
		        </div>
		    </div>
		    <div class="weui_opr_area">
	            <p class="weui_btn_area">
	                <a href="/Sign.action?goToSignListPage" class="weui_btn weui_btn_primary">知道了</a>
	            </p>
	        </div>
		</div>
  	</c:when>
	<c:when test="${status == -2  }">
		<div class="main">
			<h2>生成合同</h2>
			<div class="weui_msg">
		        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
		        <div class="weui_text_area">
		            <h3 class="weui_msg_title">合同已生成</h3>
		            <p class="weui_msg_desc">等待租客确认合同。</p>
		        </div>
		    </div>
		    <div class="weui_opr_area">
	            <p class="weui_btn_area">
	                <a href="/Sign.action?goToSignListPage" class="weui_btn weui_btn_primary">知道了</a>
	            </p>
	        </div>
		</div>
	</c:when>
	<c:when test="${status == -5 || status == -3 }">
	  <%-- <div class="main"  <c:if test="${status == 'n' }">style="display:none;"</c:if>> --%>
	  <div class="main" >
	    <h2>
	        编辑合同
	    </h2>
	    <form id="editContractForm" action="/ProgressOperation.action?editContract" method="post" >
	          <input type="hidden" name="contract.pid" value="${contract.pid }"/>
	          <input type="hidden" id="editType" name="editType"/>
	          <div class="form-control">
	               <label>详细地址：</label>
	               <input name="contract.address" value="${contract.address }" type="text" class="pubneed" maxlength="40" ignore="ignore" datatype="*5-40" nullmsg="请输入地址" errormsg="请输入合法的地址" sucmsg=" "/>
	               <span class="Validform_checktip"></span>
	          </div>
	          <div class="form-control">
	               <label>证件类型：</label>
	               <select id="deedType">
	                 <option <c:if test="${empty contract.deedType or contract.deedType == '房产证' }">selected</c:if>>房产证</option>
	                 <option <c:if test="${contract.deedType == '房屋买卖合同' }">selected</c:if>>房屋买卖合同</option>
	                 <option <c:if test="${not empty contract.deedType and contract.deedType != '房产证' and contract.deedType != '房屋买卖合同' }">selected</c:if>>其它证明文件</option>
	               </select>
	          </div>
	          <!-- 如果还未选择 证件类型 或选择的不是其它类型，则隐藏该输入域 -->
	          <div class="form-control" <c:if test="${empty contract.deedType or contract.deedType == '房产证' or contract.deedType == '房屋买卖合同' }">style="display: none;"</c:if>>
	               <label>证明文件名：</label>
	                <input id="deedTypeInput" name="contract.deedType" value="<c:if test="${not empty contract.deedType }">${contract.deedType }</c:if><c:if test="${empty contract.deedType }">房产证</c:if>" type="text" maxlength="8" placeholder='证明文件名称' 
	                   class="secInput pubneed" ignore="ignore" datatype="s2-8" nullmsg="请输入证明文件名称" errormsg="请输入合法的名称" sucmsg=" "/>
	                <span class="Validform_checktip"></span>
	          </div>
	          <div class="form-control">
	               <label>证明文件编号：</label>
	                <input name="contract.deedId" id="deedid" value="${contract.deedId }" type="text" class="pubneed" maxlength="32" ignore="ignore" datatype="*1-32" nullmsg="请输入证明文件编号" errormsg="请输入合法的编号" sucmsg=" " placeholder='证明文件编号'/>
	                <span class="Validform_checktip"></span>
	          </div>
	          <div class="form-control">
	               <label>起租日期：</label>
	                <input name="contract.startDate" value="<fmt:formatDate value="${contract.startDate }" pattern="yyyy-MM-dd"/>" type="date" class="datepicker pubneed" maxlength="8" placeholder='起租日' style="margin-right:15px;"  ignore="ignore" datatype="*" nullmsg="请选择起租日期" errormsg="请输入合法的日期" sucmsg=" "/>
	                <span class="Validform_checktip"></span>
	          </div>
	          <div class="form-control">
	               <label>租赁期：</label>
	                <select id="rentMonth" name="contract.rentMonth">
	                  <option value="1" <c:if test="${contract.rentMonth == 1 }">selected</c:if>>1个月</option>
	                  <option value="2" <c:if test="${contract.rentMonth == 2 }">selected</c:if>>2个月</option>
	                  <option value="3" <c:if test="${contract.rentMonth == 3 }">selected</c:if>>3个月</option>
	                  <option value="4" <c:if test="${contract.rentMonth == 4 }">selected</c:if>>4个月</option>
	                  <option value="5" <c:if test="${contract.rentMonth == 5 }">selected</c:if>>5个月</option>
	                  <option value="6" <c:if test="${contract.rentMonth == 6 }">selected</c:if>>6个月</option>
	                  <option value="7" <c:if test="${contract.rentMonth == 7 }">selected</c:if>>7个月</option>
	                  <option value="8" <c:if test="${contract.rentMonth == 8 }">selected</c:if>>8个月</option>
	                  <option value="9" <c:if test="${contract.rentMonth == 9 }">selected</c:if>>9个月</option>
	                  <option value="10" <c:if test="${contract.rentMonth == 10 }">selected</c:if>>10个月</option>
	                  <option value="11" <c:if test="${contract.rentMonth == 11 }">selected</c:if>>11个月</option>
	                  <option value="12" <c:if test="${contract.rentMonth == 12 }">selected</c:if>>12个月</option>
	                  <option value="24" <c:if test="${contract.rentMonth == 24 }">selected</c:if>>24个月</option>
	                  <option value="36" <c:if test="${contract.rentMonth == 36 }">selected</c:if>>36个月</option>
	                </select>
	                <span class="Validform_checktip"></span>
	          </div>
	          <%-- <div class="form-control">
	               <label>到期日期：</label>
	                <input name="contract.toDate" value="<fmt:formatDate value="${contract.toDate }" pattern="yyyy-MM-dd"/>" type="text" class="datepicker pubneed" maxlength="8" placeholder='到期日' readonly="readonly" ignore="ignore" datatype="*" nullmsg="请选择交房日期" errormsg="请输入合法的日期" sucmsg=" "/>
	                <span class="Validform_checktip"></span>
	          </div> --%>
	          <div class="form-control">
	               <label>交房日期：</label>
	                <input name="contract.useDate" value="<fmt:formatDate value="${contract.useDate }" pattern="yyyy-MM-dd"/>" type="date" class="datepicker pubneed" maxlength="8" placeholder='交房日期' style="margin-right:15px;" ignore="ignore" datatype="*" nullmsg="请选择交房日期" errormsg="请输入合法的日期" sucmsg=" "/>
	                <span class="Validform_checktip"></span>
	          </div>
	          <div class="form-control">
	               <label>出租面积：</label>
	                <input name="contract.area" value="${contract.area }" type="number" class="pubneed" maxlength="4" ignore="ignore" datatype="n1-4" nullmsg="请输入出租面积" errormsg="请输入合法的面积" sucmsg=" "/>
	                <p class="form-control-static unit">平米</p>
	                <span class="Validform_checktip"></span>
	          </div>
	          <div class="form-control">
	               <label>月租金：</label>
	                <input id="price" name="contract.price" value="${contract.price }" type="number" class="pubneed" maxlength="6" ignore="ignore" datatype="n1-6" nullmsg="请输入月租金" errormsg="请输入合法的月租金" sucmsg=" "/>
	                <p class="form-control-static unit">元</p>
	                <span class="Validform_checktip"></span>
	          </div>
	          <div class="form-control">
	               <label>租金支付方式：</label>
	               <div class="inputBox">
	                  <p class="form-control-static marginLeft0">押</p>
	                  <select id="deposit" name="contract.deposit" >
	                  	<c:choose>
	                  		<c:when test="${not empty contract.price }">
			                    <option value="${contract.price }" <c:if test="${contract.deposit == contract.price }">selected</c:if>>1个月</option>
			                    <option value="${contract.price * 2 }" <c:if test="${contract.deposit == contract.price * 2 }">selected</c:if>>2个月</option>
			                    <option value="${contract.price * 3 }" <c:if test="${contract.deposit == contract.price * 3 }">selected</c:if>>3个月</option>
			                    <option value="${contract.price * 6 }" <c:if test="${contract.deposit == contract.price * 6 }">selected</c:if>>6个月</option>
			                    <option value="${contract.price * 12 }" <c:if test="${contract.deposit == contract.price * 12 }">selected</c:if>>12个月</option>
	                  		</c:when>
	                  		<c:otherwise>
	                  			<option value="1" <c:if test="${contract.deposit == 1 }">selected</c:if>>1个月</option>
			                    <option value="2" <c:if test="${contract.deposit == 2 }">selected</c:if>>2个月</option>
			                    <option value="3" <c:if test="${contract.deposit == 3 }">selected</c:if>>3个月</option>
			                    <option value="6" <c:if test="${contract.deposit == 6 }">selected</c:if>>6个月</option>
			                    <option value="12" <c:if test="${contract.deposit == 12 }">selected</c:if>>12个月</option>
	                  		</c:otherwise>
	                  	</c:choose>
	                  </select>
	                  <br/>
	                  <p class="form-control-static">付</p>
						<select id="payMonth" name="contract.payMonth">
						  <option value="1" <c:if test="${contract.payMonth == 1 }">selected</c:if>>1个月</option>
						  <option value="2" <c:if test="${contract.payMonth == 2 }">selected</c:if>>2个月</option>
						  <option value="3" <c:if test="${contract.payMonth == 3 }">selected</c:if>>3个月</option>
						  <option value="6" <c:if test="${contract.payMonth == 6 }">selected</c:if>>6个月</option>
						  <option value="12" <c:if test="${contract.payMonth == 12 }">selected</c:if>>12个月</option>
						</select>
	                  <span class="Validform_checktip"></span>
	               </div>
	                
	          </div>
	           <div class="form-control line">
	               <label>是否可转租 ：</label>
	                <%-- <input name="contract.transferable" value="${contract.transferable }" type="hidden" /> --%>
	                <!-- <ul class="radiobox">
	                  <li class="on">是</li>
	                  <li>否</li>
	                </ul> -->
	                <select name="contract.transferable" >
	                  <option value="1" <c:if test="${contract.transferable == 1 }">selected</c:if>>是</option>
	                  <option value="0" <c:if test="${contract.transferable == 0 }">selected</c:if>>否</option>
	                </select>
	          </div>
	           <div class="form-control">
	                <label style="display:block; width:100%">租客承担费用 ：</label>
	                <div id="feeVal">
	                  <input name="contract.pmFee" value="${contract.pmFee }" type="hidden" class="pm_fee" />
	                  <input name="contract.heat" value="${contract.heat }" type="hidden" class="heat_fee" />
	                  <input id="waterInput" name="contract.water" value="${contract.water }" type="hidden" class="water_fee" />
	                  <input id="powerInput" name="contract.power" value="${contract.power }" type="hidden" class="power_fee" />
	                  <input name="contract.net" value="${contract.net }" type="hidden" class="net_fee" />
	                  <input name="contract.tv" value="${contract.tv }" type="hidden" class="tv_fee" />
	                  <input name="contract.parking" value="${contract.parking }" type="hidden" class="parking_fee" />
	                  <input name="contract.tax" value="${contract.tax }" type="hidden" class="tax_fee" />
	                  <input id="cleanInput" name="contract.clean" value="${contract.clean }" type="hidden" class="clean_fee" />
	                  <input id="otherFee" name="contract.otherFee" value="${contract.otherFee }" type="hidden" class="other_fee" />
	                </div>
	                <ul class="checkbox" style="width:100%; margin-top:6px;" id="feeCheckbox">
	                  <li class="pm_fee <c:if test="${contract.pmFee == '租客' }">on</c:if>">物业费</li>
	                  <li class="heat_fee <c:if test="${contract.heat == '租客' }">on</c:if>" value="${contract.heat }">取暖费</li>
	                  <li class="water_fee <c:if test="${fn:indexOf(contract.water, '租客') != -1}">on</c:if>" value="${contract.water }">水费</li>
	                  <li class="power_fee <c:if test="${fn:indexOf(contract.power, '租客') != -1}">on</c:if>" value="${contract.power }">电费</li>
	                  <li class="net_fee <c:if test="${contract.net == '租客' }">on</c:if>" value="${contract.net }">网费</li>
	                  <li class="tv_fee <c:if test="${contract.tv == '租客' }">on</c:if>" value="${contract.tv }">有线电视费</li>
	                  <li class="parking_fee <c:if test="${contract.parking == '租客' }">on</c:if>" value="${contract.parking }">停车费</li>
	                  <li class="tax_fee <c:if test="${contract.tax == '租客' }">on</c:if>" value="${contract.tax }">房租发票税</li>
	                  <li class="clean_fee <c:if test="${fn:indexOf(contract.clean, '租客') != -1}">on</c:if>" value="${contract.clean }">卫生费</li>
	                  <li class="other_fee <c:if test="${not empty contract.otherFee}">on</c:if>" value="${contract.otherFee }">其他费用</li>
	                </ul>
	                <span class="Validform_checktip"></span>
	          </div>
	          <div class="form-control water_fee">
	            <label for="#">水费：</label>
	            <input type="hidden" />
	            <ul class="radiobox">
	                <li class="<c:if test="${fn:indexOf(contract.water, '民用水') != -1}">on</c:if>">民用水</li>
					<li class="<c:if test="${fn:indexOf(contract.water, '商用水') != -1}">on</c:if>">商用水</li>
	            </ul>
	          </div>
	           <div class="form-control power_fee">
	              <label for="#">电费：</label>
	              <input type="hidden" />
	              <ul class="radiobox">
	                <li class="<c:if test="${fn:indexOf(contract.power, '民用电') != -1}">on</c:if>">民用电</li>
					<li class="<c:if test="${fn:indexOf(contract.power, '商用电') != -1}">on</c:if>">商用电</li>
	              </ul>
	              <span class="Validform_checktip"></span>
	            </div>
	            <div class="form-control clean_fee">
	              <label for="clean">卫生费：</label> 
	              <input id="clean" name="contract.clean" value="${fn:substringBefore(fn:substringAfter(contract.clean,','),'元') }" type="number" class="pubneed" maxlength="10" placeholder='卫生费' ignore="ignore" datatype="n1-3" nullmsg="请输入卫生费" errormsg="请输入合法的卫生费" sucmsg=" "/>
	              <p class="form-control-static unit">元/月</p>
	            </div>
	           <div class="form-control other_fee">
	               <label> 其他费用：</label>
	                <input name="contract.otherFee" value="${contract.otherFee }" type="text" class="pubneed" maxlength="30" ignore="ignore" datatype="*1-30" nullmsg="请输入其它费用" errormsg="请输入合法的字符" sucmsg=" "/>
	                <span class="Validform_checktip"></span>
	           </div>
	           <div class="form-control line">
	               <label style="width:100%; margin-bottom:6px;"> 其他约定：</label>
	                <textarea style="width:100%;" name="contract.remark" cols="30" rows="3" id="remarks">${contract.remark }</textarea>
	                <span class="warning">还能输入200字</span>
	                <span class="Validform_checktip"></span>
	          </div>
	           <div class="form-control">
	               <label>甲方(出租人) ：</label>
	               <p class="form-control-static marginLeft0">${contract.aName }，${contract.aIdnum }</p>
	          </div>
	           <div class="form-control">
	               <label>联系电话：</label>
	                <input name="contract.aMobile" value="${contract.aMobile }" type="text" class="pubneed"  maxlength="11" ignore="ignore" datatype="m" nullmsg="请输入手机号" errormsg="请输入合法的手机号" sucmsg=" "/>
	                <span class="Validform_checktip"></span>
	          </div>
	          <div class="form-control">
	               <label>收款方开户行 ：</label>
	                <input name="contract.bank" value="${contract.bank }" type="text" class="pubneed" maxlength="32" ignore="ignore" datatype="s1-32" nullmsg="请输入开户行" errormsg="请输入合法的开户行" sucmsg=" "/>
	                <span class="Validform_checktip"></span>
	          </div>
	           <div class="form-control">
	               <label>收款方账号 ：</label>
	                <input name="contract.bankAccount" value="${contract.bankAccount }" type="text" class="pubneed" maxlength="20" ignore="ignore" datatype="n14-20" nullmsg="请输入收款方账号" errormsg="请输入合法的账号" sucmsg=" "/>
	                <span class="Validform_checktip"></span>
	          </div>
	          <div class="form-control">
	               <label>乙方(承租人) ：</label>
	               <p class="form-control-static marginLeft0">${contract.bName }，${contract.bIdnum }</p>
	          </div>
	          <div class="form-control">
	               <label>联系电话：</label>
	                <input name="contract.bMobile" value="${contract.bMobile }" type="text" class="" maxlength="11" ignore="ignore" datatype="m" nullmsg="请输入手机号" errormsg="请输入合法的手机号" sucmsg=" "/>
	                <span class="Validform_checktip"></span>
	          </div>
	          <div class="weui_btn_area">
   		          <a id="previewContract" url="/ProgressOperation.action?goToPreviewContractPage&pid=${contract.pid }&type=1" target="_blank" class="preview" onclick="$.redirectLoading();">预览合同</a>
	              <button type="button" class="weui_btn btns weui_btn_default editContract save" editType="1">保存合同</button>
	              <button type="button" class="weui_btn btns weui_btn_primary editContract pub" editType="2">提交合同</button>
	          </div>
	      </form>   
	  </div>
  	</c:when>
  </c:choose>
</body>
<script type="text/javascript" src="/scripts/public/jquery-ui-1.10.4.custom.min.js"></script>
<script type="text/javascript" src="/scripts/weixin/vEditContract.js"></script>
</html>






