<%@ page pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<title>入住指南 - 居派</title>
	<!-- meta 以及 公用的css -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta name="keywords" content="居派，短租，住宿"/>
	<meta name="description" content="居派青年空间是带有移动互联网属性的短期住宿产品，是可链接各类外部服务的集“自助入住退房、主题化风格、创意家居植入、空间社交”于一身的点式微生活中心。"/>
	<link href="/css/public/commom.css" rel="stylesheet" >
	<style type="text/css">
	.section {
	    margin:10px;
	}
	p {
		padding-bottom: 5px;
		font-size:16px;
		line-height: 24px;
	}
	</style>
</head>

<body>
<div id="indexPage">
    <header class="jupai-top">
        <a class="back left" rel="nofollow" href="javascript:backleft();"></a>入住指南
    </header>
   	<img src="${guide.guide_pic }" style="width: 100%;"/>
    <div class='section'>
		<p>${guide.guide_desc }</p>
	</div>
	
	<%@ include file="/WEB-INF/include/footer.jsp"%>
</div>
<script src="/scripts/public/jquery-1.9.1.min.js"></script>
<script src="/scripts/public/common.js"></script>
</body>
</html>