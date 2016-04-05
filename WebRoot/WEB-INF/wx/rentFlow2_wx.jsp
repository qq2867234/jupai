<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<%@ taglib prefix="stripes" uri="http://stripes.sourceforge.net/stripes.tld"%>
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
<link rel="stylesheet" type="text/css" href="/css/css/weixin/vRentFlow.css">
</head>
<body>
<div class="main">
    <h2>
       联系房东
    </h2>
   <c:choose>
   	<c:when test="${showFlag == 3 }">
	    <stripes:form action="/ProgressOperation.action?fillPersonalInfo" id="personalInfoForm" method="post">
	    	<input type="hidden" name="pid" value="${pid }"/>
		    <input type="hidden" name="lid" value="${lid }"/>
		    <input type="hidden" name="postType" value="5"/>
		    <input type="hidden" name="hiddenFileName" value="yes.jpg"/>
            <h3 class="title">房东有特别要求</h3>
            <c:if test="${pInfo.needsInfo.needAge != 0 }">
	            <div class="weui_cell_group">
	                <div class="weui_cells_title label">年龄要求：</div>
	                <div class="weui_cell">
	                    <div class="weui_cell_bd weui_cell_primary">
	                        	亲，房东希望租客年龄不超过${pInfo.needsInfo.needAge}岁，咱移驾其它房源吧 :)
	                    </div>
	                 </div>
	             </div>
		    </c:if>
		    <c:choose>
		    	<c:when test="${pInfo.needsInfo.needEdu == 1 }">
			        <div class="weui_cell_group">
			            <div class="weui_cells_title label">你的教育背景:</div>
			            <div class="weui_cells weui_cells_radio">
			            <c:choose>
			            	<c:when test="${empty pInfo.needsInfo.edu}">
			            		<input id="edu" type="hidden" name="personBI.edu">
				                <ul class="radioBox">
				                    <li useType="初中及以下">初中及以下</li>
				                    <li useType="高中">高中</li>
				                    <li useType="大学">大学</li>
				                    <li useType="研究生及以上">研究生及以上</li>
				                </ul>
			            	</c:when>
			            	<c:otherwise>
			            		<input id="edu" type="hidden" name="personBI.edu" value="${pInfo.needsInfo.edu}">
			            		 <ul class="radioBox">
			            		 	<c:choose>
	        							<c:when test="${ pInfo.needsInfo.edu == '初中及以下'}">
	        								<li class="on" useType="初中及以下">初中及以下</li>
							                <li useType="高中">高中</li>
							                <li useType="大学">大学</li>
							                <li useType="研究生及以上">研究生及以上</li>
	        							</c:when>
	        							<c:when test="${ pInfo.needsInfo.edu == '高中'}">
	        								<li useType="初中及以下">初中及以下</li>
							                <li class="on" useType="高中">高中</li>
							                <li useType="大学">大学</li>
							                <li useType="研究生及以上">研究生及以上</li>
	        							</c:when>
	        							<c:when test="${ pInfo.needsInfo.edu == '大学'}">
	        								<li useType="初中及以下">初中及以下</li>
							                <li useType="高中">高中</li>
							                <li class="on" useType="大学">大学</li>
							                <li useType="研究生及以上">研究生及以上</li>
	        							</c:when>
	        							<c:when test="${ pInfo.needsInfo.edu == '研究生及以上'}">
	        								<li useType="初中及以下">初中及以下</li>
							                <li useType="高中">高中</li>
							                <li useType="大学">大学</li>
							                <li class="on" useType="研究生及以上">研究生及以上</li>
	        							</c:when>
	        						</c:choose>
					            </ul>
			            	</c:otherwise>
			              </c:choose>
			            </div>
			        </div>
		    	</c:when>
		    </c:choose>
		    
		    <c:if test="${pInfo.needsInfo.needJob == 1 or pInfo.needsInfo.needJob == 2 or pInfo.needsInfo.needJob == 3 or pInfo.needsInfo.needJob == 4 or pInfo.needsInfo.needJob == 5}">
		    	 <div class="weui_cell_group">
			    	<c:choose>
			    		<c:when test="${pInfo.needsInfo.needJob == 1}">
			    			<div class="weui_cell">
				                <div class="weui_cell_bd weui_cell_primary">
				                    <input type="text" class="weui_input" id="job" value="${pInfo.needsInfo.job }" name="personBI.job" maxlength="20" datatype="*1-20" nullmsg="请输入职业" sucmsg=" " placeholder='请输入职业'/>
				                </div>
				            </div>
			    		</c:when>
			    		<c:when test="${pInfo.needsInfo.needJob == 2}">
			    			<div class="weui_cell">
				                <div class="weui_cell_bd weui_cell_primary">
				                    <input type="text" class="weui_input" id="job" value="${pInfo.needsInfo.job }" name="personBI.job" maxlength="20" datatype="*1-20" nullmsg="请输入职业" sucmsg=" " placeholder='请输入职业'/>
				                </div>
				            </div>
			    		</c:when>
			    		<%-- <c:when test="${pInfo.needsInfo.needJob == 3}">
			    			<div class="weui_cell">
				                <div class="weui_cell_bd weui_cell_primary">
				                    <input type="text" class="weui_input" id="job" value="${pInfo.needsInfo.job }" name="personBI.job" maxlength="20" datatype="*1-20" nullmsg="请输入职业" sucmsg=" " placeholder='请输入职业'/>
				                </div>
				            </div>
			    		</c:when> --%>
			    		<c:when test="${pInfo.needsInfo.needJob == 4}">
			    			<div class="weui_cell">
				                <div class="weui_cell_bd weui_cell_primary">
				                    <input type="text" class="weui_input" id="job" value="${pInfo.needsInfo.job }" name="personBI.job" maxlength="20" datatype="*1-20" nullmsg="请输入职业" sucmsg=" " placeholder='请输入职业'/>
				                </div>
				            </div>
			    		</c:when>
			    		<c:when test="${pInfo.needsInfo.needJob == 5}">
			    			<div class="weui_cell">
				                <div class="weui_cell_bd weui_cell_primary">
				                    <input type="text" class="weui_input" id="job" value="${pInfo.needsInfo.job }" disabled name="personBI.job" maxlength="20" datatype="*1-20" nullmsg="请输入职业" sucmsg=" " placeholder='请输入职业'/>
				                </div>
				            </div>
			    		</c:when>
			    		<%-- <c:otherwise>
			    			<div class="weui_cell">
				                <div class="weui_cell_bd weui_cell_primary">
				                    <input type="text" class="weui_input" id="job" name="personBI.job" maxlength="20" datatype="*1-20" value='${info["job"]}' nullmsg="请输入职业" sucmsg=" " placeholder='请输入职业'/>
				                </div>
				            </div>
			    		</c:otherwise> --%>
			    	</c:choose>
			    </div>
			    
			    <div class="weui_cell_group">
			    	<c:choose>
			    		<c:when test="${pInfo.needsInfo.needJob == 2}">
			    			<div class="weui_cell">
					            <div class="weui_cell_bd weui_cell_primary">
					                <div class="weui_uploader">
					                    <div class="weui_uploader_hd">
					                        <div class="weui_cell_bd weui_cell_primary">身份证上传</div>
					                    </div>
					                    <!-- <div class="weui_uploader_bd">
					                        <ul class="weui_uploader_files">
					                            <li style="background-image:url(/images/public/default.png)" class="weui_uploader_file weui_uploader_status">
					                            </li> -->
					                             <stripes:file name="photo" accept="image/jpg,image/jpeg,image/png,image/gif"/>
					                        <!-- </ul>
					                    </div> -->
					                </div>
					            </div>
					        </div>
			    		</c:when>
			    		<c:when test="${pInfo.needsInfo.needJob == 3}">
			    			<div class="weui_cell">
					            <div class="weui_cell_bd weui_cell_primary">
					                <div class="weui_uploader">
					                    <div class="weui_uploader_hd">
					                        <div class="weui_cell_bd weui_cell_primary">身份证上传</div>
					                    </div>
					                    <!-- <div class="weui_uploader_bd">
					                        <ul class="weui_uploader_files">
					                            <li style="background-image:url(/images/public/default.png)" class="weui_uploader_file weui_uploader_status">
					                            </li> -->
					                             <stripes:file name="photo" accept="image/jpg,image/jpeg,image/png,image/gif" />
					                        <!-- </ul>
					                    </div> -->
					                </div>
					            </div>
					        </div>
			    		</c:when>
			    		<c:when test="${pInfo.needsInfo.needJob == 4}">
				            	工作证明已上传，正在审核中...
			    		</c:when>
			    		<c:when test="${pInfo.needsInfo.needJob == 5}">
				            	工作证明已上传，正在审核中...
			    		</c:when>
			    	</c:choose>
		        </div>
			    	
		    </c:if>
		    
		    <c:if test="${pInfo.needsInfo.needPet == 1 }">
		    	<div class="weui_cell_group">
		    		<div class="weui_cells_title label">房东禁止饲养宠物（请设置是否有宠物）：</div>
		    		<div class="weui_cells weui_cells_radio">
		    			<c:choose>
		    				<c:when test="${empty pInfo.needsInfo.pet }">
		    					<input id="pet" type="hidden" name="personBI.pet">
				                <ul id="petBox" class="radioBox">
				                    <li useType="0">无宠物</li>
				                    <li useType="1">有宠物</li>
				                </ul>
		    				</c:when>
		    				<c:otherwise>
		    					<input id="pet" type="hidden" name="personBI.pet" value="${pInfo.needsInfo.pet}">
	        					<ul id="petBox" class="radioBox">
	        						<c:choose>
	        							<c:when test="${pInfo.needsInfo.pet == 0 }">
	        								<li useType="0" class="on">无宠物</li>
			                				<li useType="1" >有宠物</li>
	        							</c:when>
	        							<c:otherwise>
	        								<li useType="0">无宠物</li>
			                				<li useType="1" class="on">有宠物</li>
	        							</c:otherwise>
	        						</c:choose>
			            		</ul>
		    				</c:otherwise>
		    			</c:choose>
		    		</div>
		    	</div>
		    </c:if>
	        <div class="validform hide"><span class='zgIcon zgIcon-info-circle'></span><b class='Validform_checktip'></b></div>
	          <div class="weui_btn_area"> 
	          	<c:if test="${pInfo.needsInfo.needAge != 0 || pInfo.needsInfo.needJob == 2 || pInfo.needsInfo.needJob == 3 || pInfo.needsInfo.needJob == 4}">
	          		<button id="nextStepPID" class="weui_btn weui_btn_primary">提交个人信息</button>
	          	</c:if>
	          <%-- 	<c:if test="${pInfo.needsInfo.needAge != 0  }">
	          		<a href="/mobile/search" class="weui_btn weui_btn_primary">提交个人信息</a>
	          	</c:if> --%>
	            
	          </div>
	    </stripes:form>
    </c:when>
    <c:when test="${showFlag == 4 }">
	    <div class="weui_msg">
	        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
	        <div class="weui_text_area">
	            <h3 class="weui_msg_title">已添加联系人</h3>
	            <p class="weui_msg_desc">添加联系人请求已发送给房东，待TA确认后你们即可直接联系。</p>
	        </div>
	        <!-- <div class="weui_opr_area">
	            <p class="weui_btn_area">
	                <a href="javascript:;" class="weui_btn weui_btn_primary">确定</a>
	            </p>
	        </div> -->
	    </div>
    </c:when>
    <c:when test="${showFlag == 5 }">
    	<div class="weui_msg <c:if test="${pInfo.hasChance == 'y' }">hide</c:if>">
	        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
	        <div class="weui_text_area">
	            <h3 class="weui_msg_title">操作提示</h3>
	            <p class="weui_msg_desc">您查看了数位房东的联系方式，但还没有成交，是遇到什么问题了么？如果遇到问题请拨打我们的客服电话：400-115-6080。</p>
	        </div>
	        <div class="weui_opr_area">
	            <p class="weui_btn_area">
	                <a href="###" class="weui_btn weui_btn_primary" id="continueOpr">继续</a>
	            </p>
	        </div>
	    </div>
	    <div class="weui_msg landlord_msg <c:if test="${pInfo.hasChance == 'n' }">hide</c:if>">
	    	<div class="tips">与房东已获得彼此联系方式，请联系房东安排线下看房。在现场请点击“开始验房”，我们将继续帮助你们完成规范的验房和签约过程。</div>
	        <div class="weui_icon_area">
	            <img src="/images/public/head.png" alt="房东头像" />
	        </div>
	        <div class="weui_text_area">
	           <h3 class="weui_msg_title">${pInfo.landlordInfo.name }</h3>
	           <p class="weui_msg_desc"><i class='zgIcon zgIcon-phone' style='margin-right:5px; color:#4ba5fb;'></i>电话: <a href="tel:${pInfo.landlordInfo.mobile }">${pInfo.landlordInfo.mobile }</a></p>
	           <p class="weui_msg_desc">微信: ${pInfo.landlordInfo.wechat }</p>
	           <p class="weui_msg_desc">身份证: ${pInfo.landlordInfo.id_number }</p>
	<!--            <h3 class="weui_msg_title">苏悦</h3>
	           <p class="weui_msg_desc">电话: 128188811212</p>
	           <p class="weui_msg_desc">微信: iadqeqeqwq</p>
	           <p class="weui_msg_desc">身份证: 18281821212</p> -->
	        </div>
	        <div class="weui_opr_area">
	            <p class="weui_btn_area">
	                <a href="/ProgressOperation.action?goToRentNoticePage&pid=${pid }" onclick="$.redirectLoading();" class="weui_btn weui_btn_primary">开始验房</a>
	            </p>
	        </div>
	    </div>
    </c:when>
    <c:when test="${showFlag == 9 }">
    	<div class="weui_msg">
	        <div class="weui_icon_area"><i class="zgIcon zgIcon-warn-fill"></i></div>
	        <div class="weui_text_area">
	            <h3 class="weui_msg_title">未添加联系人</h3>
	            <p class="weui_msg_desc">抱歉哦，房东可能已心有所属，未同意你的添加联系人请求。</p>
	        </div>
	        <div class="weui_opr_area">
	            <p class="weui_btn_area">
	                <a href="/search" class="weui_btn weui_btn_primary">查看其它房源</a>
	            </p>
	        </div>
	    </div>
    </c:when>
  </c:choose>
</div>
<script type="text/javascript">
function setCss(cssObj, status) {
	switch(status){
		case 1:
			cssObj.removeClass("weui_cell_warn").addClass("Validform_loading");//checking;
			break;
		case 2:
			cssObj.removeClass("weui_cell_warn Validform_loading");//passed;
			break;
		case 4:
			cssObj.removeClass("weui_cell_warn Validform_loading");//for ignore;
			break;
		default:
			cssObj.removeClass("Validform_loading").addClass("weui_cell_warn");//wrong;
	}
}
$(function() {
	//继续之后的操作
	$("#continueOpr").click(function() {
		$(this).parents(".weui_msg").addClass("hide").next().removeClass("hide");
	});
	//对修改用户基本信息的表单进行验证
	$("#personalInfoForm").Validform({
		ignoreHidden:true,
		beforeSubmit:function(curform){
			var obj = $(".Validform_checktip");
			if($("#edu").val()=="") {
				obj.parent().removeClass("hide");
				obj.text("请选择职业");
				return false;
			}else{
				obj.parent().addClass("hide");
				obj.text("");
			}
			if($("#pet").val()=="") {
				obj.parent().removeClass("hide");
				obj.text("请选择宠物信息");
				return false;
			}else{
				obj.parent().addClass("hide");
				obj.text("");
			}
			$.showLoading("数据提交中...");
			return true;
		},
		tiptype:function(msg,o,cssctl){
			var msgobj=$(".Validform_checktip");
			if(msg == "") {
				msgobj.parent().addClass("hide");
			} else {
				msgobj.parent().removeClass("hide");
			}
			var cssObj=o.obj.parent().parent(".weui_cell");
			setCss(cssObj, o.type);
			msgobj.text(msg);
		},
		callback : function(data) {
			if(data.status == "n") {
				$.hideLoading();
				$(".validform").removeClass("hide");
				$(".Validform_checktip").text(data.info);
			}
		}
	});
	$(".radioBox").each(function(){
		fnCreateRadiobox({
        	ul: $(this),
        	boxUseType: 1
        });
	});
});
</script>
</body>
</html>