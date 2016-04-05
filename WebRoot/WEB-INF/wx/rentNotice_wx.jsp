<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
<link rel="stylesheet" type="text/css" href="/css/css/weixin/vRentNotice.css">
</head>
<body>
  <!-- 已提交房屋检查单 -->
  <c:if test="${contractStatus == -1 }">
  	<div class="main">
        <h2>房屋检查</h2>
        <div class="weui_msg">
            <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
            <div class="weui_text_area">
                <h3 class="weui_msg_title">房屋检查单已提交</h3>
                <p class="weui_msg_desc">等待房东确认房屋检查单。</p>
            </div>
             <div class="weui_opr_area">
	            <p class="weui_btn_area">
	                <a href="/Sign.action?goToSignListPage" class="weui_btn weui_btn_primary">知道了</a>
	            </p>
	        </div>
        </div>

	</div>
  </c:if>	
  <!-- 房东已同意房屋检查单 -->
  <c:if test="${contractStatus == -5 }">
  	<div class="main">
        <h2>房屋检查</h2>
        <div class="weui_msg">
            <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
            <div class="weui_text_area">
                <h3 class="weui_msg_title">房东已同意房屋检查单</h3>
                <p class="weui_msg_desc">等待房东生成合同。</p>
            </div>
            <div class="weui_opr_area">
	            <p class="weui_btn_area">
	                <a href="/Sign.action?goToSignListPage" class="weui_btn weui_btn_primary">知道了</a>
	            </p>
	        </div>
        </div>
	</div>
  </c:if>
  <!-- 等待租客确认合同 -->
  <c:if test="${contractStatus == -2 }">
  	<div class="main">
        <h2>确认合同</h2>
        <div class="weui_msg">
            <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
            <div class="weui_text_area">
                <h3 class="weui_msg_title">房东已提交合同</h3>
                <p class="weui_msg_desc">等待您确认合同内容。</p>
            </div>
            <div class="weui_opr_area">
	            <p class="weui_btn_area">
	                <a href="/Sign.action?goToSignListPage" class="weui_btn weui_btn_primary">知道了</a>
	            </p>
	        </div>
        </div>
	</div>
  </c:if>
  <!-- 租客提出修改合同 -->
  <c:if test="${contractStatus == -3 }">
  	<div class="main">
	    <h2>修改合同</h2>
        <div class="weui_msg">
            <div class="weui_icon_area"><i class="zgIcon zgIcon-check"></i></div>
            <div class="weui_text_area">
                <h3 class="weui_msg_title">要求房东修改合同</h3>
                <p class="weui_msg_desc">等待房东修改合同内容。</p>
            </div>
            <div class="weui_opr_area">
	            <p class="weui_btn_area">
	                <a href="/Sign.action?goToSignListPage" class="weui_btn weui_btn_primary">知道了</a>
	            </p>
	        </div>
        </div>
	</div>
  </c:if>
  <!-- 状态为空 或者 房东不同意房屋检查单 -->
  <c:if test="${empty contractStatus || contractStatus == -4 }">
	  <div class="main">
	      <h2>房屋检查小贴士</h2>
	      <div class="info">
	          <h5 class="warn">重要</h5>
	          <p class="warn">1.看房之时无需缴纳任何押金或意向金</p>
	          <p class="warn">2.查看房东身份证、房产证（或有权出租此房的证明）</p>
	          <h5>了解：安全和公共设施</h5>
	          <p>1、道路是否有路灯</p>
	          <p>2、道路、楼房前后、楼道，是否有隐蔽角落</p>
	          <p>3、楼道、照明、电梯否正常</p>
	           
	          <h5>了解：外部环境</h5>
	          <p>1、临近马路、铁路（噪音、灰尘）</p>
	          <p>2、电梯附近房间（噪音）</p>
	          <p>3、楼间距离过小，附近有遮挡物（采光）</p>
	          <p>4、附近有垃圾转运站（异味）</p>
	           
	          <h5>了解：其余租户的情况（合租）</h5>
	          
	          <h5>检查：房屋及设施</h5>
	          <p>1、窗户无破损，正常开闭</p>
	          <p>2、暖气冬季温度</p>
	          <p>3、空调是否工作</p>
	          <p>4、厨柜、衣柜、地板、墙角是否有蟑螂、虫蚁</p>
	          <p>5、详细请按验房步骤进行</p>
	           
	       </div>
	       <div class="weui_btn_area">
	        <a href="/ProgressOperation.action?goToCheckListPage&pid=${pid }" onclick="$.redirectLoading();" class="weui_btn weui_btn_primary">开始检查</a>
	      </div>
	  </div>
  </c:if>
</body>
<script type="text/javascript" src="/scripts/weixin/vCheckList.js"></script>
</html>
