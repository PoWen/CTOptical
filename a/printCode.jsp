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
	@import "printCode.css";
    </style>
    <head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>查詢鏡框商品</title>
	<script>
	    var rootNodeId = "<%= rootNodeId %>";
	    var constAPIURL = "<%= apiURL %>";
	    var constUserName = "<%= userName %>";
	</script>
	<script src="/cust/general_func.js"></script>
	<script src="/cust/general_const.js"></script>
	<script src="printCode.js"></script>
    </head>
    <body onload=onload()>
	<div id="top" style="background-color:black;color:white;padding:15px 0 0 0;">
	    <a href="/ctoptical" style="margin:15px 8px 0 15px" target="_blank"><img src="logoRed.png" alt="Ragic標誌" /></a>
	    <a href="http://www.ct-optical.url.tw/" style="margin:15px 8px 0 15px" target="_blank"><img src="ct_logo.png" alt="中天眼鏡標誌" /></a>
	    <p style="margin:15px">
	    <b><font color="gray">門市名稱:</font></b> <%=" " + userName%>
	    <b><font color="gray">登入帳號:</font></b> <%= user.getUserId()%>
	    <a href="/" style="color:gray">登入</a>
	    </p>
	</div>
	<a><table id="queryFilter" class="queryTableArea" align="left">
	    <tr class=blockHead>
		<td><div class=queryBlockHead>查詢條件</div></td>
	    </tr>
	    <tr>
		<td><table class=margin4>
			<tr>
			    <td>目前條件</td>
			</tr>
		</table></td>
	    </tr>
	    <tr>
		<td><div class=margin2>
			<table>
			    <tr>
				<td class=qc1>欄位</td>
				<td class=qc2>條件</td>
				<td class=qc3></td>
			    </tr>
			</table>
		</div></td>
	    </tr>
	    <tr>
		<td><div class=queryListContent>
			<table id=queryFilterList>
			</table>
		</div></td>
	    </tr>
	    <tr>
		<td><div class=margin3>
			<input id="productCatA" name="productCat" type="button" value="品牌列表" onclick="selectCatFunc(this)"></input>
		</div></td>
	    </tr>
	    <tr>
		<td><div class=margin3>
			查詢型號<input id=queryFactor type="text" onchange="filterInputFunc(this)"></input>
		</div></td>
	    </tr>
	    <tr>
		<td><select multiple size="21" name="list1[]" class= "queryResult" id="queryResult" ondblclick="addFilter(this)" onkeydown="addFilter(this)">
		</select></td>
	    </tr>
    </table></a>
	<textarea id="codeRecord" rows="40" cols="20" autocomplete="off"></textarea>
    </body>
</html>
