<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="com.ragic.s3.nui.User"%>
<%@ page import="com.ragic.s3.nui.RagicConfig"%>
<%@ page import="java.util.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
    User user = null;
    if ((user = (User) session.getAttribute("USER")) == null) {
	//send to login page
	response.sendRedirect(request.getContextPath() + "/index.jsp");
	return;
    }

    List<String> userGroups = user.getGroups("ctoptical");
    String userGroup = "";
    if(userGroups.size() > 2)
    userGroup = userGroups.get(2);
    String userName = user.getUserIdText("ctoptical");
    String apiURL = RagicConfig.getInstance().getProperty("API_URL");
    String rootNodeId = request.getParameter("no");
    if(rootNodeId == null) rootNodeId = "-1";
%>

<html>
    <style type="text/css">
	@import "query.css";
    </style>
    <head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>查詢商品</title>
	<script>
	    var rootNodeId = "<%= rootNodeId %>";
	    var constAPIURL = "<%= apiURL %>";
	    var constUserName = "<%= userName %>";
	</script>
	<script src="/cust/general_func.js"></script>
	<script src="/cust/general_const.js"></script>
	<script src="query_func.js"></script>
    </head>
    <body onload="onload()">
	<div id="top" style="background-color:black;color:white;padding:15px 0 0 0;">
	    <a href="/ctoptical" style="margin:15px 8px 0 15px" target="_blank"><img src="logoRed.png" alt="Ragic標誌" /></a>
	    <a href="http://www.ct-optical.url.tw/" style="margin:15px 8px 0 15px" target="_blank"><img src="ct_logo.png" alt="中天眼鏡標誌" /></a>
	    <p style="margin:15px">
	    <b><font color="gray">門市名稱:</font></b> <%=" " + userName%>
	    <b><font color="gray">登入帳號:</font></b> <%= user.getUserId()%>
	    <a href="/" style="color:gray">登入</a>
	    </p>
	</div>
	<table id="queryFilter" class="queryTableArea">
	    <tr class=blockHead>
		<td><div class=queryBlockHead>商品查詢</div></td>
	    </tr>
	    <tr>
		<td><div class=margin>目前查詢條件</div></td>
	    </tr>
	    <tr>
		<td><div class=queryListContent>
		    <table class=test>
			<thead>
			    <th class=qc1>欄位</td>
			    <th class=qc2>條件</td>
			    <th class=qc3></td>
			</thead>
			<tbody id=queryFilterList>
			</tbody>
		    </table>
		</div></td>
	    </tr>
	    <tr>
		<td><div class=margin>
		    <input id="productCatA" name="productCat" type="radio" value="A" onclick="selectCatFunc.call(this)">A-鏡框</input>
		    <input id="productCatB" name="productCat" type="radio" value="B" onclick="selectCatFunc.call(this)">B-鏡片</input>
		    <input id="productCatC" name="productCat" type="radio" value="C" onclick="selectCatFunc.call(this)">C-隱形</input>
		    <input id="productCatD" name="productCat" type="radio" value="D" onclick="selectCatFunc.call(this)">D-藥水</input>
		    <input id="productCatE" name="productCat" type="radio" value="E" onclick="selectCatFunc.call(this)">E-其他</input>
		</div></td>
	    </tr>
	    <tr>
		<td><div class=margin>
		    <input id=querySN name="conditionField" type="button" value="條碼"></input>
		    <input id=queryBrand name="conditionField" type="button" value="品牌"></input>
		    <input id=queryPrice name="conditionField" type="button" value="價錢"></input>
		    <input id=queryName name="conditionField" type="button" value="名稱"></input>
		    </br>
		    <input id=queryModel name="conditionField" type="button" value="型號"></input>
		    <input id=querySize name="conditionField" type="button" value="尺寸"></input>
		</div></td>
	    </tr>
	    <tr>
		<td><div class=margin>
		    查詢方式
		    <input id="queryType_eq" name="queryType" type="radio" value="eq">等於</input>
		    <input id="queryType_like" name="queryType" type="radio" value="like">包含</input>
		    <input id="queryType_between" name="queryType" type="radio" value="between">區間</input>
		</div></td>
	    </tr>
	    <tr>
		<td><div class=margin>
		    查詢條件<input id=queryFactor type="text" onchange="filterInputFunc.call(this)"></input>
		    <a><input id="query" type="button" value="查詢商品" onclick=""></input></a>
		</div></td>
	    </tr>
	    <tr>
		<td><select multiple size="15" name="list1[]" class= "queryResult" id="queryResult" ondblclick="selectOptionFunc.call(this)" onkeydown="selectOptionFunc.call(this)">
		</select></td>
	    </tr>
	    <tr>
		<td><div class=margin>
		    <input id=addToCheckListButton type="button" value="加入盤點清單"></input>
		    <input id="queryEnd" type="button" value="結束查詢"></input>
		    <input id="queryUnstock" type="button" value="所有未盤項目"></input>
		</div></td>
	    </tr>
	</table>
    </body>
</html>
