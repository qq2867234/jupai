<%@ page pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<title>关于我们 - 居派</title>
	<!-- meta 以及 公用的css -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta name="keywords" content="居派，短租，住宿"/>
	<meta name="description" content="居派青年空间是带有移动互联网属性的短期住宿产品，是可链接各类外部服务的集“自助入住退房、主题化风格、创意家居植入、空间社交”于一身的点式微生活中心。"/>

	<link href="/css/public/commom.css" rel="stylesheet" >
	<style type="text/css">
	.section {
	    margin:15px;
	}
	p {
		padding-bottom: 5px;
		font-size:16px;
		line-height: 24px;
	}
	#common_footer{
		position: fixed;
    	bottom: 0px;
	}
	</style>
</head>

<body>
<div id="indexPage">

    <header class="jupai-top">
        <a class="back left" rel="nofollow" href="javascript:backleft();"></a>关于我们
    </header>
    <div class='section'>
		<p>“住在外 找居派”！居派青年空间是带有移动互联网属性的短期住宿产品，是可链接各类外部服务的集“自助入住退房、主题化风格、创意家居植入、空间社交”于一身的点式微生活中心。</p>
		<p>追求全新住宿方式的年轻人形成了“居派族群”，创造着不同以往的快乐。</p>
	</div>
	
	<%@ include file="/WEB-INF/include/footer.jsp"%>
</div>
<script src="/scripts/public/jquery-1.9.1.min.js"></script>
<script src="/scripts/public/common.js"></script>
</body>
</html>