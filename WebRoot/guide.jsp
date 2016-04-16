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
	<meta name="description" content="居派"/>
	<link href="/css/public/commom.css" rel="stylesheet" >
	<style type="text/css">
	.section {
	       margin: 15px 10px;
    	padding-left: 15px;
	}
	ul, li {
		padding-bottom: 5px;
		list-style: initial;
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
        <a class="back left" rel="nofollow" href="javascript:backleft();"></a>订房指导
    </header>
    <div class='section'>
    	<ul>
			<li>预订成功后，请注意查收智能锁密码短信，并妥善保管，不要给怪菽粟看了去；</li>
		    <li>入睡前关好自己房门，那样睡的更踏（ji）实（qing），外出时，也建议锁上房门；</li>
		    <li>选择哪天的房间，默认入住时间是当天中午，退宿时间是次日中午。比如选择了“6.25”，就相当于选择了6.25中午至6.26中午的住宿。</li>
		    <li>有任何不便和问题，请拨打电话 13810316841。
    	</ul>
	</div>
	
	<%@ include file="/WEB-INF/include/footer.jsp"%>
</div>
<script src="/scripts/public/jquery-1.9.1.min.js"></script>
<script src="/scripts/public/common.js"></script>
</body>
</html>