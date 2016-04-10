<%@ page language="java"  pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<!DOCTYPE html>
<html>
<head>

<title>真格租房</title> 
<meta charset="utf-8">
<meta name="keywords" content="北京房屋出租，北京房屋租赁，真格租房，房地产，房产网，租房，出租，整租，合租，别墅，住宅，租金，房东，经纪人，中介"/>
<link href="/css/error/error.css" rel="stylesheet" type="text/css">

</head>

<body>
<!--#include virtual="/zinclude/header.html"-->
<div id="main" class="shortPage">
	<div class="container">
		<div class='pic'>
		</div>
		<div class='warning'>
			<h3>提示：${message }</h3>
			<ul>
				<li><a href='${url }'>点击此处，继续操作</a></li>
			</ul>
		</div>
	</div>
</div>
<!--#include virtual="/zinclude/bottom.html"-->
</body>
</html>

