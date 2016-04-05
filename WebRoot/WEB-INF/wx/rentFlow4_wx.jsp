<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
       合同商务内容摘要
    </h2>
    <form>
    	<c:choose>
    		<c:when test="${empty pInfo.contract }">
    			<c:choose>
    				<c:when test="${status == -2 }">
    					<div class="weui_msg">
					        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
					        <div class="weui_text_area">
					            <h3 class="weui_msg_title">状态通知</h3>
					            <p class="weui_msg_desc">房东对房屋检查单有不同意见，请您与房东进行协商统一。</p>
					        </div>
					       <div class="weui_opr_area">
					            <p class="weui_btn_area">
					                <a href="/Sign.action?goToSignListPage" class="weui_btn weui_btn_primary">知道了</a>
					            </p>
					        </div>
					    </div>
    				</c:when>
    				<c:otherwise>
    					<div class="weui_msg">
					        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
					        <div class="weui_text_area">
					            <h3 class="weui_msg_title">状态通知</h3>
					            <p class="weui_msg_desc">报告，房东还没有提交合同。</p>
					        </div>
					        <div class="weui_opr_area">
					            <p class="weui_btn_area">
					                <a href="/Sign.action?goToSignListPage" class="weui_btn weui_btn_primary">知道了</a>
					            </p>
					        </div>
					    </div>
    				</c:otherwise>
    			</c:choose>
    		</c:when>
    		
    		<c:when test="${pInfo.contractStatus == -3 }">
    			<div class="weui_msg">
			        <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
			        <div class="weui_text_area">
			            <h3 class="weui_msg_title">状态通知</h3>
			            <p class="weui_msg_desc">已向房东提出修改合同，请等待房东修改。</p>
			        </div>
			        <div class="weui_opr_area">
			            <p class="weui_btn_area">
			                <a href="/Sign.action?goToSignListPage" class="weui_btn weui_btn_primary">知道了</a>
			            </p>
			        </div>
			    </div>
    		</c:when>
    		<c:otherwise>
		        <div class="weui_cell_group">
		            <div class="weui_cells_title label">出租人（甲方）: </div>
		            <div class="weui_cell">
		                <div class="weui_cell_bd weui_cell_primary">${pInfo.contract.aName }</div>
		             </div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">身份证号: </div>
		            <div class="weui_cell">
		                <div class="weui_cell_bd weui_cell_primary">${pInfo.contract.aIdnum }</div>
		             </div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">承租人（乙方）: </div>
		            <div class="weui_cell">
		                <div class="weui_cell_bd weui_cell_primary">${pInfo.contract.bName }</div>
		             </div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">身份证号: </div>
		            <div class="weui_cell">
		                <div class="weui_cell_bd weui_cell_primary">${pInfo.contract.bIdnum }</div>
		             </div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">见证人（丙方）: </div>
		            <div class="weui_cell">
		                <div class="weui_cell_bd weui_cell_primary">北京真格在线科技有限公司</div>
		             </div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">地址: </div>
		            <div class="weui_cell">
		                <div class="weui_cell_bd weui_cell_primary">${pInfo.contract.address }</div>
		             </div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">出租面积: </div>
		            <div class="weui_cell">
		                <div class="weui_cell_bd weui_cell_primary">${pInfo.contract.area }平方米</div>
		             </div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">${pInfo.contract.deedType }编号: </div>
		            <div class="weui_cell">
		                <div class="weui_cell_bd weui_cell_primary">${pInfo.contract.deedId }</div>
		             </div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">房屋租赁期: </div>
		            <div class="weui_cell">
		                <div class="weui_cell_bd weui_cell_primary"><fmt:formatDate value="${pInfo.contract.startDate }" pattern="yyyy-MM-dd"/> 至 <fmt:formatDate value="${pInfo.contract.toDate }" pattern="yyyy-MM-dd"/></div>
		             </div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">甲方交房时间: </div>
		            <div class="weui_cell">
		                <div class="weui_cell_bd weui_cell_primary"><fmt:formatDate value="${pInfo.contract.useDate }" pattern="yyyy-MM-dd"/></div>
		             </div>
		         </div>
		       <c:if test="${not empty pInfo.stuff.key && pInfo.stuff.key != -1}">
		           <div class="weui_cell_group">
		            <div class="weui_cells_title label">房门钥匙: <b>${pInfo.stuff.key } 把</b></div>
		         </div>
		       </c:if>
		       <c:if test="${not empty pInfo.stuff.doorCard && pInfo.stuff.doorCard != -1 }">
		           <div class="weui_cell_group">
		            <div class="weui_cells_title label">门卡:<b>${pInfo.stuff.key } 张</b> </div>
		         </div>
		       </c:if>
		       <c:if test="${not empty pInfo.stuff.waterCard && pInfo.stuff.waterCard != -1}">
		           <div class="weui_cell_group">
		            <div class="weui_cells_title label">水表卡:<b>${pInfo.stuff.waterCard } 张</b></div>
		         </div>
		       </c:if>
		       <c:if test="${not empty pInfo.stuff.powerCard && pInfo.stuff.powerCard != -1 }">
		           <div class="weui_cell_group">
		            <div class="weui_cells_title label">购电卡:<b>${pInfo.stuff.powerCard } 张</b> </div>
		         </div>
		       </c:if>
		       <c:if test="${not empty pInfo.stuff.gasCard && pInfo.stuff.gasCard != -1  }">
		           <div class="weui_cell_group">
		            <div class="weui_cells_title label">燃气卡:<b>${pInfo.stuff.gasCard } 张</b> </div>
		         </div>
		       </c:if>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">租金: <b>${pInfo.contract.price }元/月</b></div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">付款方式: <b>${pInfo.contract.payType }</b></div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">押金: <b>${pInfo.contract.deposit }元</b></div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">开户行: </div>
		            <div class="weui_cell">
		                <div class="weui_cell_bd weui_cell_primary">${pInfo.contract.bank }</div>
		             </div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">账号: </div>
		            <div class="weui_cell">
		                <div class="weui_cell_bd weui_cell_primary">${pInfo.contract.bankAccount }</div>
		             </div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">户名: </div>
		            <div class="weui_cell">
		                <div class="weui_cell_bd weui_cell_primary">${pInfo.contract.aName }</div>
		             </div>
		         </div>
		       
		       <%-- <c:choose><c:when test="${fn:contains(pInfo.contract.pmFee,'房东') }">租客承担，${pInfo.contract.pm_fee }元/每年</c:when><c:otherwise>${pInfo.contract.pmFee }承担</c:otherwise> </c:choose>  --%>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">物业费: <b>${pInfo.contract.pmFee }承担</b></div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">取暖费: <b>${pInfo.contract.heat }承担</b></div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">水费: <b>${pInfo.contract.water }</b></div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">电费: <b>${pInfo.contract.power }</b></div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">网费: <b>${pInfo.contract.net }</b></div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">有线电视费: <b>${pInfo.contract.tv }</b></div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">停车费: <b>${pInfo.contract.parking }</b></div>
		         </div>
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">卫生费: <b><c:choose><c:when test="${fn:contains(pInfo.contract.clean,'房东') }">房东承担</c:when><c:otherwise>${pInfo.contract.clean }</c:otherwise> </c:choose></b></div>
		         </div>
		       <c:if test="${not empty pInfo.contract.otherFee }">
		       <div class="weui_cell_group">
		            <div class="weui_cells_title label">其他费用: <b>${pInfo.contract.otherFee }</b></div>
		         </div>
		         </c:if>
		       <c:if test="${not empty pInfo.contract.remark }">
		           <div class="weui_cell_group">
		            <div class="weui_cells_title label">其他约定: </div>
		            <div class="weui_cell">
		                <div class="weui_cell_bd weui_cell_primary">${pInfo.contract.remark }</div>
		             </div>
		         </div>
		       </c:if>
		       
			  <div class="validform hide"><span class='zgIcon zgIcon-info-circle'></span><b class='Validform_checktip'></b></div>
		      <div class="weui_btn_area">
		        <a  class="preview" href='/ProgressOperation.action?goToPreviewContractPage&pid=${pInfo.contract.pid }' onclick="$.redirectLoading();">预览合同全文</a>
		      </div>
		      <div class="weui_btn_area btn_block">
		        <button id="agree" type="button" class="weui_btn weui_btn_primary">同意并在线签署合同</button>
		        <button id="applayEdit" type="button" class="weui_btn weui_btn_default">要求修改合同</button>
		      </div>
    		</c:otherwise>
    	</c:choose>
    </form>
</div>
</body>
<script type="text/javascript">
	var contract = {
			//同意合同条款
			agreeContract : function() {
				$.ajax({
					url:"/ProgressOperation.action?confirmContract",
					dataType:"json",
					async: false,
					data:{pid: "${pInfo.contract.pid}" },
					success:function(data, status) {
						if(data.status == "y") {
							window.location.href="/ProgressOperation.action?goToProgressPageByStep&pid=${pid}&lid=${lid}";
						} else if(data.status == "needPay") {
							window.location.href="/Pay.action?goToPayPage";
						} else {
							$.hideLoading();
							$(".validform").removeClass("hide");
							$(".Validform_checktip").text(data.info);
						}
					}
				});
			},
			//拒绝合同条款
			applayEidtContract: function() {
				$.ajax({
					url:"/ProgressOperation.action?applyEditContract",
					dataType:"json",
					async: false,
					data:{pid: "${pInfo.contract.pid}" },
					success:function(data, status) {
						if(data.status == "y") {
							//alertDialog("修改合同的申请我们已发送给房东，为了您能更加快速的签约，请您及时与房东进行电话沟通。");
							window.location.href="/ProgressOperation.action?goToProgressPageByStep&pid=${pid}&lid=${lid}";
						} else {
							$.hideLoading();
							$(".validform").removeClass("hide");
							$(".Validform_checktip").text(data.info);
						}
					}
				});
			}
	}

	$(function() {
		//申请修改合同
		$("#applayEdit").click(function() {
			dialog.content = "确定要求房东修改合同？";
			dialog.confirmFn = function() {
				$.showLoading("数据提交中...");
				contract.applayEidtContract();
			}
			fnCreateDialog(dialog);
		});
		//同意合同
		$("#agree").click(function() {
			dialog.content = "确定同意并进行在线签署合同？";
			dialog.confirmFn = function() {
				$.showLoading("数据提交中...");
				contract.agreeContract();
			}
			fnCreateDialog(dialog);
		});
	});
</script>
</html>