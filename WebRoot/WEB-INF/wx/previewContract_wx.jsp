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
<link rel="stylesheet" type="text/css" href="/css/css/weixin/vHouseAgreement.css">
</head>
<body>
    <div class ="main">
        <h2>房屋租赁合同</h2>
        <article>
            <section class="contracts">
                <p>合同编号：<span class="fillBlank">${contract.contractId}</span></p>
                <p>甲方（出租人）：<span class="fillBlank">${contract.aName}</span></p>
                <p>乙方（承租人）：<span class="fillBlank">${contract.bName}</span></p>
                <p>丙方（第三方）：<span class="fillBlank">北京真格在线科技有限公司</span></p>
            </section>
        </article>
        <article>
            <section>
                <p>甲方（出租人）：<span class="fillBlank">${contract.aName}</span></p>
                <p>身份证号：<span class="fillBlank">${contract.aIdnum}</span></p>
            </section>
            <section>
                <p>乙方（承租人）：<span class="fillBlank">${contract.bName}</span></p>
                <p>身份证号：<span class="fillBlank">${contract.bIdnum}</span></p>
            </section>
            <section><p>丙方（第三方）：北京真格在线科技有限公司</p></section>
            <section><p>声明：</p></section>
            <section>
                <p>本合同文本为甲乙双方自愿选用。甲乙双方是否具备签署及履行房屋租赁合同的资格和能力，拟出租房屋是否存在抵押、查封、共有等权利限制或权利瑕疵，双方具体的权利义务和违约责任等，均由甲乙双方自行确认及履行，并各自承担相应的法律责任，与丙方无关。</p>
                <p>甲乙双方自愿接受丙方的平台支持服务，并保证不会要求丙方承担任何责任。</p>
            </section>
            <section>
                <p>依据《中华人民共和国合同法》及有关法律、法规的规定，甲乙双方本着平等、自愿、诚信的原则，同意以下条款并通过丙方平台（包括：网站www.zhengor.com、或手机网页、或APP）在线签订、执行。</p></section>
            <h4>第一条  房屋基本情况 </h4>
            <section>
                <p>（一）房屋坐落于<span class="fillBlank">${contract.address}</span>，建筑面积<span class="fillBlank">${contract.area}</span>平方米。房屋交付时的装修及配套设施设备、家具、电器、水卡、电卡、燃气卡情况见附件一《房屋交接清单》。</p></section>
            <section>
                <p>（二）房屋权属状况为：<c:choose><c:when test="${contract.deedType == '房产证' or contract.deedType == '房屋买卖合同' }">（1）</c:when><c:otherwise>（2）</c:otherwise> </c:choose></p></section>
            <section>
                <p>(1)甲方对房屋拥有所有权 ，持有编号为 <span class="fillBlank">${contract.deedId}</span>的 <span class="fillBlank">${contract.deedType}</span>。甲方承诺：房屋出租已得到全部共有权人的同意，且在本合同签署之日该房屋之上不存在查封、抵押等权利限制。</p></section>
            <section>
                <p>(2)甲方对房屋拥有转租权 ，甲方向乙方出示甲方转租权来源、转租有效期及房屋所有权人同意甲方转租房屋的证明文件。</p>
            </section>
            <h4>第二条  房屋租赁情况及登记备案  </h4>
            <section>
                <p>（一）租赁用途为乙方个人及家庭成员居住。</p>
            </section>
            <section>
                <p>（二）甲方应自与乙方订立本合同之日起7日内，到房屋所在地的<strong>社区来京人员和出租房屋服务站</strong>办理房屋出租登记手续。对多人居住的出租房屋，乙方应将居住人员情况告知甲方，甲方应当建立居住人员登记簿，并按规定报送服务站。本合同变更或者终止的，甲方应自合同变更或者终止之日起<strong>5日内</strong>，到房屋所在地的服务站办理登记变更、注销手续。在本合同有效期内，居住人员发生变更的，乙方应当自变更之日起<strong>2日</strong>内告知服务站，办理变更登记手续。</p>
            </section>
            <section>
                <p>居住人员中有外地来京人员的，甲方应提供相关证明，督促和协助乙方到当地公安派出所办理暂住证；居住人员中有境外人员的，<strong>乙方</strong>应自订立本合同之时起<strong>24小时内</strong>到当地公安派出所办理住宿登记手续。</p></section>
            <h4>第三条  租赁期限 </h4>
            <section>
                <p>房屋租赁期自<span class="fillBlank"><fmt:formatDate value="${contract.startDate }" pattern="yyyy-MM-dd"/></span>至<span class="fillBlank"><fmt:formatDate value="${contract.toDate }" pattern="yyyy-MM-dd"/></span>，甲方于<span class="fillBlank"><fmt:formatDate value="${contract.useDate }" pattern="yyyy-MM-dd"/></span>前将房屋按约定条件交付给乙方。经甲乙双方按《房屋交接清单》移交
                <span class="fillBlank"><c:choose><c:when test="${stuff.key != -1 && stuff.key != 0}">房门钥匙${stuff.key}把</c:when></c:choose></span><span class="fillBlank"><c:choose><c:when test="${stuff.doorCard != -1 && stuff.doorCard != 0}">、门卡${stuff.doorCard}张</c:when></c:choose></span><span class="fillBlank"><c:choose><c:when test="${stuff.waterCard != -1 && stuff.waterCard != 0}">、水表卡${stuff.waterCard}张</c:when></c:choose></span><span class="fillBlank"><c:choose><c:when test="${stuff.powerCard != -1 && stuff.powerCard != 0}">、购电卡${stuff.powerCard}张</c:when></c:choose></span><span class="fillBlank"><c:choose><c:when test="${stuff.gasCard != -1 && stuff.gasCard != 0}">、燃气卡${stuff.gasCard}张</c:when></c:choose></span>后视为交付完成。</p>
            </section> 
            <h4>第四条  租金及押金</h4>
            <section>
                <p>（一）租金标准及支付方式：人民币<span class="fillBlank">${price}</span> /月（￥${contract.price}.00元整/月）。</p></section>
            <section>
                <p>支付方式:房租按<span class="fillBlank">${contract.payType}</span>方式支付, 各期租金支付日期为：${paymentDate }</p></section>
            <section>
                <p>双方约定，乙方将每期应付租金汇入甲方以下账户，即视为已完成付款义务：</p></section>
            <section>
                <p>户  名：<span class="fillBlank">${contract.aName}</span></p>
            </section>
            <section>
                <p>账  号：<span class="fillBlank">${contract.bankAccount}</span></p></section>
            <section>
            <section>
                <p>开户行：<span class="fillBlank">${contract.bank}</span></p></section>
                <p>（二）押金：人民币<span class="fillBlank">${deposit}</span> （￥${contract.deposit}.00元），租赁期满或合同解除后3日内，房屋租赁押金除抵扣应由乙方承担的租金、费用、租金及违约赔偿责任外，剩余部分无息返还给乙方。</p></section>
            <h4>第五条  其他相关费用的承担方式  </h4>
            <section>
                <p>租赁期内，供暖费、物业管理费由甲方 承担；由乙方使用而产生的水费、电费、燃气费、上网费、电视收视费、停车费、房租发票税费由乙方承担。</p></section>
            <section>
                <p>本合同中未列明的与房屋有关的其他费用均由甲方承担。如乙方垫付了应由甲方支付的费用，甲方应根据乙方出示的相关缴费凭据向乙方返还相应费用。</p></section>
            <h4>第六条  房屋维护及维修  </h4>
            <section>
                <p>（一）甲方应保证出租房屋的建筑结构和设备设施符合建筑、消防、治安、卫生等方面的安全条件，不得危及人身安全；乙方保证遵守国家、北京市的法律法规规定以及房屋所在小区的物业管理规约。</p>
            </section>
            <section>
                <p>（二）租赁期内，甲乙双方应共同保障该房屋及其附属物品、设备设施处于适用和安全状态：</p></section>
            <section>
                <p>1、对于该房屋及其附属物品、设备设施因自然属性或合理使用而导致的损耗，乙方应及时通知甲方修复。甲方应在接到乙方通知后的3日内进行维修。逾期不维修的，乙方可代为维修，费用由甲方承担。因维修房屋影响乙方使用的，应相应减少租金或延长租赁期限。</p></section>
            <section>
                <p>2、因乙方保管不当或不合理使用，致使该房屋及其附属物品、设备设施发生损坏或故障的，乙方应负责维修或承担赔偿责任。</p>
            </section>
            <h4>第七条  续租、转租、甲方处置房屋</h4>
            <section>
                <p>1、租期届满乙方拟继续承租房屋的，应提前<strong>30日</strong>向甲方提出续租申请,与甲方协商一致后通过丙方平台重新签订房屋租赁合同。</p></section>
            <section>
                <p>2、未经甲方正式书面同意，乙方不得将房屋的全部或部分转租或转借给他人，否则视为乙方严重违约，甲方可单方面终止本合同，并追究乙方的违约责任。</p></section>
            <section>
                <p>3、房屋租赁期间，甲方有权将房屋出售或抵押，为此甲方无需征得乙方和丙方同意，但应事先提前<strong>15日</strong>书面通知乙方和丙方，且保证乙方依法享有优先购买权。甲方承诺房屋的出售或抵押，不影响乙方对房屋的使用。</p></section>
            <h4>第八条　丙方服务  </h4>
            <section>
                <p>1、提供出租和承租信息匹配。</p>
            </section>
            <section>
                <p>2、预先核验甲乙方的身份信息。</p></section>
            <section>
                <p>3、记录和保存甲乙双方通过丙方平台进行交易的的电子数据，在必要时可提供证据支持，丙方保存交易记录的时间为三年。</p></section>
            <section>
                <p>4、提供本房屋租赁合同供甲乙双方自愿使用。</p></section>
            <section>
                <p>5、应甲乙双方要求，对甲乙双方的房屋租赁争议提供调解。</p></section>
            <section>
                <p>6、对合同守信者提供第三方信用背书。</p>
            </section>
            <section>
                <p>7、对甲乙方的恶意行为进行监督。</p>
            </section>
            <h4>第九条  合同解除 </h4>
            <section>
                <p>（一）经甲乙双方协商一致，可以解除本合同。</p></section>
            <section>
                <p>（二）因不可抗力导致本合同无法继续履行的，本合同自行解除。</p></section>
            <section>
                <p>（三）甲方有下列情形之一的，乙方有权单方解除合同：</p></section>
            <section>
                <p>1、迟延交付房屋达<strong>【5】日的</strong>。</p></section>
            <section>
                <p>2、交付的房屋严重不符合合同约定或影响乙方安全、健康的。</p>
            </section>
            <section>
                <p>3、不承担约定的维修义务，致使乙方无法正常使用房屋的。</p></section>
            <section>
                <p>（四）乙方有下列情形之一的，甲方有权单方解除合同，收回房屋：</p></section>
            <section>
                <p>1、不按照约定支付租金达<Strong>【5】日的</Strong>。</p>
            </section>
            <section>
                <p>2、欠缴各项费用达人民币<strong>【500】元的</strong>。</p></section>
            <section>
                <p>3、擅自改变房屋用途的。</p>
            </section>
            <section>
                <p>4、擅自拆改变动或损坏房屋主体结构的。</p></section>
            <section>
                <p>5、保管不当或不合理使用导致附属物品、设备设施损坏并拒不赔偿的。</p>
            </section>
            <section>
                <p>6、利用房屋从事违法活动、损害公共利益或者妨碍他人正常工作、生活的。</p></section>
            <section>
                <p>7、擅自将房屋转租给第三人的。</p></section>
            <section>
                <p>（五）其他法定或约定的合同解除情形。</p></section>
            <h4>第十条  房屋交还 </h4>
            <section>
                <p>租赁期满或合同解除后，甲方有权立即收回房屋，乙方应按照原状返还房屋及其附属物品、设备设施。甲乙双方应对房屋和附属物品、设备设施及水电使用等情况进行验收，结清各自应当承担的费用。</p>
            </section>
            <h4>第十一条  违约责任</h4>
            <section>
                <p>（一）甲方有第九条第（三）款约定的情形之一的，应按<strong>月租金的【100%】</strong>向乙方支付违约金；乙方有第九条第（四）款约定的情形之一的，应按月租金的【100%】向甲方支付违约金，甲方并可要求乙方将房屋恢复原状或赔偿相应损失。</p>
            </section>
            <section>
                <p>（二）租赁期内，甲方需提前收回该房屋的，或乙方需提前退租的，应提前30日通知对方，并按<strong>月租金的【100%】</strong>支付违约金，甲方还应退还未使用的相应租金。</p>
            </section>
            <section>
                <p>（三）因甲方未按约定履行维修义务造成乙方人身、财产损失的，甲方应承担赔偿责任。</p></section>
            <section>
                <p>（四）甲方未按约定时间交付该房屋或者乙方不按约定支付租金但未达到解除合同条件的，以及乙方未按约定时间返还房屋的，应按<strong>月租金的【100%】</strong>标准支付违约金。</p></section>
            <section>
                <p>（五）违约方支付违约金不影响守约方依法依约行使单方解除权，行使单方解除权时应向违约方发送解约通知，合同自通知到达对方时解除。</p></section>
            <h4>第十二条  恶意行为</h4>
            <section>
                <p>以下行为视为恶意行为：</p></section>
            <section>
                <p>（一）故意造成对另一方的人身伤害或财产损失超过5000元。</p></section>
            <section>
                <p>（二）未履行第十一条规定的违约责任。</p></section>
            <section>
                <p>（三）甲方未按本合同约定退还乙方押金、应退租金。</p>
            </section>
            <section>
                <p>甲乙方均同意，丙方有权用以下方式对任一方的恶意行为进行监督：</p></section>
            <section>
                <p>1、将恶意行为者的相关信息记入丙方及合作伙伴的黑名单记录，并拒绝为其提供服务。</p></section>
            <section>
                <p>2、将恶意行为者的相关信息作为不良记录提供给中国人民银行个人征信系统和其它征信机构。</p></section>
            <section>
                <p>3、将恶意行为者的相关信息作为不良记录提供给包括但不限于其工作单位、律师事务所、公安机关、检察院、法院、媒体、逾期款项催收机构。</p></section>
            <h4>第十三条 合同争议的解决办法</h4>
            <section>
                <p>甲乙双方在本合同项下发生的争议，由双协商解决；协商不成的，可共同申请通过丙方进行调解，或者依法向丙方所在地人民法院起诉。</p>
            </section>
            <section>
                <p>如甲乙双方通过丙方进行调解，则双方同意将最大限度地尊重丙方的调解意见，且甲乙双方承诺在任何情况下均不会要求丙方承担任何责任。</p></section>
            <h4>第十四条  其他约定事项  </h4>
            <section>
                 <p><span class="fillBlank"><c:if test="${empty contract.remark}">无。</c:if> ${contract.remark}</span></p>
            </section>
            <h4>第十五条  合同生效及备案 </h4>
            <section>
                <p>甲、乙双方一致且不可撤销地同意，通过丙方平台完成各自身份验证并登录后，按提示进入丙方提供的网页，对网页显示的合同内容确认无误后，点击网页上的“签署合同”按钮，即完成合同的电子签名，该等点击确认行为即表示甲、乙双方对相关合同内容的正式确认和签署。合同经甲、乙双方电子签署后，再经丙方审核签署即生效，合同生效时间为丙方签署之时。甲、乙双方登录丙方平台后可自行下载pdf版本的电子合同文本。</p></section>
            <section>
                <p>本合同生效后，各方对合同内容的变更或补充均应采取书面形式，作为本合同的附件。附件与本合同具有同等的法律效力。全部附件应及时上传到丙方平台备案。</p>
                </section>
            <section>
                <p>（以下无正文）</p>
            </section>
        </article>
        <article>
            <section>
                <p>甲方（出租人）：<span class="fillBlank">${contract.aName}</span></p>
                <p>乙方（承租人）：<span class="fillBlank">${contract.bName}</span></p>
            </section>
            <section>
                <p>丙方签章：北京真格在线科技有限公司</p>
            </section>
            
        </article>
        <div class="weui_opr_area" style="padding-bottom:2em;">
            <p class="weui_btn_area">
            	<c:if test="${empty backto || backto == 1 || backto == 0}">
            		<!-- 房东返回编辑合同页面 -->
	            	<c:if test="${role == 3 }">
		                <a href="/ProgressOperation.action?goToEditContractPage&pid=${contract.pid }" class="weui_btn weui_btn_primary">返回</a>
	            	</c:if>
	            	<!-- 租客返回处理合同页面 -->
	            	<c:if test="${role == 1 }">
		                <a href="/ProgressOperation.action?goToProgressPageByStep&pid=${contract.pid }&lid=${contract.lid}" class="weui_btn weui_btn_primary">返回</a>
	            	</c:if>
            	</c:if>
            	<!-- 返回签约列表 -->
            	<c:if test="${backto == 2 }">
	            	<c:if test="${role == 3 }">
		                <a href="/Sign.action?goToLandlordSignListPage" class="weui_btn weui_btn_primary">返回</a>
	            	</c:if>
	            	<!-- 租客返回处理合同页面 -->
	            	<c:if test="${role == 1 }">
		                <a href="/Sign.action?goToTenantSignListPage" class="weui_btn weui_btn_primary">返回</a>
	            	</c:if>
            	</c:if>
            </p>
        </div>
    </div> <!-- main end -->
    </body>
</html>