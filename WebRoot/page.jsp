<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!-- 显示分页（由于右侧浮动，所以位置进行左右对称调换，代码从下往上看才是正常顺序 = =!） -->
<div id="paging">
	<!-- 尾页/下一页 -->
	<c:if test="${pageModel.pageNow!=pageModel.pages}">
		<c:choose>
			<c:when test="${not empty keyword}">
				<%-- <a href="/${actionName}.action?${methodName}&pageNow=${pageModel.pages}&keyword=${keyword}">&nbsp;尾页&nbsp;</a> --%>
				<a href="/${actionName}.action?${methodName}&pageNow=${pageModel.pageNow+1}&keyword=${keyword}">&nbsp;下一页&nbsp;</a>
			</c:when>
			<c:otherwise>
				<%-- <a href="/${actionName}.action?${methodName}&pageNow=${pageModel.pages}">&nbsp;尾页&nbsp;</a> --%>
				<a href="/${actionName}.action?${methodName}&pageNow=${pageModel.pageNow+1}">&nbsp;下一页&nbsp;</a>
			</c:otherwise>
		</c:choose>
	</c:if>

	<!-- 页数 -->
	<c:choose>
		<c:when test="${pageModel.pages<10}">
			<c:forEach begin="1" end="${pageModel.pages}" var="i">
				<c:if test="${pageModel.pageNow==(pageModel.pages-i+1)}">
					<a class='currentPage'>${pageModel.pageNow}</a>
				</c:if>
				<c:if test="${pageModel.pageNow!=(pageModel.pages-i+1)}">
					<c:choose>
						<c:when test="${not empty keyword}">
							<a href="/${actionName}.action?${methodName}&pageNow=${pageModel.pages-i+1}&keyword=${keyword}">${pageModel.pages-i+1}</a>
						</c:when>
						<c:otherwise>
							<a href="/${actionName}.action?${methodName}&pageNow=${pageModel.pages-i+1}">${pageModel.pages-i+1}</a>
						</c:otherwise>
					</c:choose>
				</c:if>
			</c:forEach>
		</c:when>
		<c:when test="${pageModel.pages>=10 && pageModel.pageNow<=5}">
			<c:forEach begin="1" end="9" var="i">
				<c:if test="${pageModel.pageNow==(10-i)}">
					<a class='currentPage'>${pageModel.pageNow}</a>
				</c:if>
				<c:if test="${pageModel.pageNow!=(10-i)}">
					<c:choose>
						<c:when test="${not empty keyword}">
							<a href="/${actionName}.action?${methodName}&pageNow=${10-i}&keyword=${keyword}">${10-i}</a>
						</c:when>
						<c:otherwise>
							<a href="/${actionName}.action?${methodName}&pageNow=${10-i}">${10-i}</a>
						</c:otherwise>
					</c:choose>
				</c:if>
			</c:forEach>
		</c:when>
		<c:when test="${pageModel.pages>=10 && pageModel.pageNow>5 && pageModel.pageNow+4>pageModel.pages}">
			<c:forEach begin="${pageModel.pages-8}" end="${pageModel.pages}" var="i">
				<c:if test="${pageModel.pageNow==(pageModel.pages+pageModel.pages-8-i)}">
					<a class='currentPage'>${pageModel.pageNow}</a>
				</c:if>
				<c:if test="${pageModel.pageNow!=(pageModel.pages+pageModel.pages-8-i)}">
					<c:choose>
						<c:when test="${not empty keyword}">
							<a href="/${actionName}.action?${methodName}&pageNow=${pageModel.pages+pageModel.pages-8-i}&keyword=${keyword}">${pageModel.pages+pageModel.pages-8-i}</a>
						</c:when>
						<c:otherwise>
							<a href="/${actionName}.action?${methodName}&pageNow=${pageModel.pages+pageModel.pages-8-i}">${pageModel.pages+pageModel.pages-8-i}</a>
						</c:otherwise>
					</c:choose>
				</c:if>
			</c:forEach>
		</c:when>
		<c:when test="${pageModel.pages>=10 &&  pageModel.pageNow>5 && pageModel.pageNow+4<=pageModel.pages}">
			<c:forEach begin="${pageModel.pageNow-4}" end="${pageModel.pageNow+4}" var="i">
				<c:if test="${pageModel.pageNow==(pageModel.pageNow+pageModel.pageNow-i)}">
					<a class='currentPage'>${pageModel.pageNow}</a>
				</c:if>
				<c:if test="${pageModel.pageNow!=(pageModel.pageNow+pageModel.pageNow-i)}">
					<c:choose>
						<c:when test="${not empty keyword}">
							<a href="/${actionName}.action?${methodName}&pageNow=${pageModel.pageNow+pageModel.pageNow-i}&keyword=${keyword}">${pageModel.pageNow+pageModel.pageNow-i}</a>
						</c:when>
						<c:otherwise>
							<a href="/${actionName}.action?${methodName}&pageNow=${pageModel.pageNow+pageModel.pageNow-i}">${pageModel.pageNow+pageModel.pageNow-i}</a>
						</c:otherwise>
					</c:choose>
				</c:if>
			</c:forEach>
		</c:when>
	</c:choose>

	<!-- 首页/上一页 -->
	<c:if test="${pageModel.pageNow!=1}">
		<c:choose>
			<c:when test="${not empty keyword}">
				<a href="/${actionName}.action?${methodName}&pageNow=${pageModel.pageNow-1}&keyword=${keyword}">&nbsp;上一页&nbsp;</a>
				<%-- <a href="/${actionName}.action?${methodName}&pageNow=1&keyword=${keyword}">&nbsp;首页&nbsp;</a> --%>
			</c:when>
			<c:otherwise>
				<a href="/${actionName}.action?${methodName}&pageNow=${pageModel.pageNow-1}">&nbsp;上一页&nbsp;</a>
				<%-- <a href="/${actionName}.action?${methodName}&pageNow=1">&nbsp;首页&nbsp;</a> --%>
			</c:otherwise>
		</c:choose>
	</c:if>

</div>