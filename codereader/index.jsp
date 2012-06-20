<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="com.ragic.s3.nui.User"%>
<%@ page import="com.ragic.s3.nui.RagicConfig"%>
<%@ page import="java.util.*"%>

<%
    User user = null;
    if ((user = (User) session.getAttribute("USER")) == null) {
	//send to login page
	response.sendRedirect(request.getContextPath() + "/index.jsp");
	return;
    }

    //user.getGroup("ctoptical") return an array -> [EVERYONE, REGISTERED, 21-永安店] 
    List<String> userGroups = user.getGroups("ctoptical");
    String userGroup = "";
    if(userGroups.size() > 2)
    userGroup = userGroups.get(2);
    String userName = user.getUserIdText("ctoptical");
    //String userName = user.getUserId();
    String apiURL = RagicConfig.getInstance().getProperty("API_URL");
    String rootNodeId = request.getParameter("no");
    if(rootNodeId == null) rootNodeId = "-1";
%>

<html>
    <style type="text/css">
	@import "serialInput.css";
    </style>

    <head>
	<title>中天-刷條碼</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script>
	    var rootNodeId = "<%= rootNodeId %>";
	    var constAPIURL = "<%= apiURL %>";
	    var constUserName = "<%= userName %>";
	</script>
	<script src="/cust/general_func.js"></script>
	<script src="/cust/general_const.js"></script>
	<script src="index_func.js"></script>
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
	<div>
	    <select id="formNameOption" onchange="setFormNameFunc()">
		<option value="銷貨單">銷貨單</option>
		<option value="進貨單">進貨單</option>
		<option value="銷貨退回單">銷貨退回單</option>
		<option value="進貨退回單">進貨退回單</option>
	    </select><a id="tradeFormNo">自動產生</a>
	    稅率: <select id="taxRate" onchange="setTaxRageFunc()">
		<option value="1.00">1.00</option>
		<option value="1.05">1.05</option>
	    </select><br />
	    <a id="creator"></a><select id="creatorSelector" onchange="setCreatorFunc()"></select><br />
	    <a id="target"></a><select id="targetSelector" onchange="setTargetFunc()"></select>
	</div>
	<div>
	    請輸入條碼: <input type=text disabled=true id="serialInput" />
	    數量:<input type=text id="itemNum" disabled=true value=1 />
	    <p><input type="button" id="saveForm" disabled=true value="儲存!" onclick="saveFormFunc()">
	    <input type="button" id="copyForm" value="複製此單!" onclick="copyFormFunc()">
	    <input type="button" id="newForm" value="新增一張單!" onclick="newFormFunc()">
	    <input type="button" id="print" value="列印!" onclick="printFunc()">
	    <input type="button" id="renewPrice" value="更新價格!" onclick="renewPriceFunc()">
	    <p>總計金額: <input type="text" size=5 id="total" value="0" disabled=true />
	    商品總數: <input type="text" size=30 id="totalNums" value="0" disabled=true />
	</div>
	<textarea id="actionRecord" rows="5" cols="100" readonly="readonly"></textarea>
	<table id="myTable" >
	    <tr id="itemTableTitle" class=myTable>
		<td class=serial>條碼</td>
		<td class=productName>商品名稱</td>
		<td class=unitPrice>單價</td>
		<td class=price>計價</td>
		<td class=amount>數量</td>
		<td class=unit>單位</td>
		<td class=subtotal>小計</td>
		<td class=delete></td>
		<td class=delete></td>
	    </tr>
	</table>
    </body>
</html>
