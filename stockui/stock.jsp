<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
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
	if (userGroups.size() > 2)
		userGroup = userGroups.get(2);
	String apiURL = RagicConfig.getInstance().getProperty("API_URL");
	String noNodeId = request.getParameter("no"); //單號
	String receiptMach = "test001";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	
%>
<html>
<style type="text/css">
@import "stock.css";
</style>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=BIG5">
<title>中天盤點系統</title>
<script src="general_func.js"></script>
<script src="general_const.js"></script>
<script src="index_func.js"></script>
</head>
<body onload=onload()>
	<div id="top">
		<a id="topRagic" href="/ctoptical" target="_blank"><img
			src="logoRed.png" alt="Ragic標誌" /></a> <a id="topCT"
			href="http://www.ct-optical.url.tw/" target="_blank"><img
			src="ct_logo.png" alt="中天眼鏡標誌" /></a> <b id="topInfo"> <b><font
				color="gray">門市名稱:</font></b> <%=" " + userGroup%> <b><font
				color="gray">發票機台:</font></b> <%=receiptMach%> <b><font color="gray">登入帳號:</font></b>
			<%=user.getUserId()%> <a id="topLogin" href="/">登入</a>
		</b>
	</div>

	<div>
		<a id="place">地點</a> <select id="placeSelector">
		</select> <a id="date">盤點日期</a><input type="text"></input> <a id="stockSN">盤點單號</a><input
			type="text"></input>

	</div>
	<div>
		<textarea id="infoText" rows="3" cols="50" tabindex="83"></textarea>
		<input id="startStock" type="button" value="  開始盤點  "></input> <input
			id="queryStock" type="button" value="查詢盤點現況"></input>
	</div>
	<div>
		<a>條碼</a><a><input id="serialInput" type="text" size=30></input></a> <a>數量</a><a><input
			id="numInput" type="text" size=18></input></a> <a><input
			id="updateStock" type="button" value="  更新庫存  "></input></a> <a><input
			id="queryItem" type="button" value="  查詢商品  "></input></a>
	</div>
	<br>

	<table id="queryResult" class="tableArea">
		<tr class=blockHead>
			<td>查詢結果<input id="queryInfo" type="text"></input><input
				id="addToStock" type="button" value="加入盤點列表"></input></td>
		</tr>
		<tr class=blockContent>
			<td><table>
					<tr class=listHead>
						<td><div class=listHead>
								<table class=listContent>
									<tr>
										<td class=c1>商品條碼</td>
										<td class=c2>名稱</td>
										<td class=c3>單價</td>
										<td class=c4>庫存</td>
										<td class=c5>已盤</td>
										<td class=c6></td>
									</tr>
								</table>
							</div></td>
					</tr>
					<tr class=listContent>
						<td colspan=6><div class=listContent>
								<table id=queryList class=listContent>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5>e</td>
										<td class=c6><input id="addQueryToStock" type="button"
											class="listInput" value="加入"></input></td>
									</tr>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5>e</td>
										<td class=c6><input id="addQueryToStock" type="button"
											class="listInput" value="加入"></input></td>
									</tr>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5>e</td>
										<td class=c6>f</td>
									</tr>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5>e</td>
										<td class=c6>f</td>
									</tr>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5>e</td>
										<td class=c6>f</td>
									</tr>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5>e</td>
										<td class=c6>f</td>
									</tr>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5>e</td>
										<td class=c6>f</td>
									</tr>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5>e</td>
										<td class=c6>f</td>
									</tr>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5>e</td>
										<td class=c6>f</td>
									</tr>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5>e</td>
										<td class=c6>f</td>
									</tr>
								</table>
							</div></td>
					</tr>
				</table></td>
		</tr>
	</table>
	<br>

	<table id=progressingStock class="tableArea">
		<tr class=blockHead>
			<td>盤點中<input id="stockInfo" type="text"></input><input
				id=stockCheckInfo type="text"></input><input id="sendChecked"
				type="button" value="正確項目完成"></input><input id="allChecked"
				type="button" value="全部正確"></input><input id="sendAll" type="button"
				value="全部完成"></input></td>
		</tr>
		<tr class=blockContent>
			<td><table>
					<tr class=listHead>
						<td><div class=listHead>
								<table class=listContent>
									<tr>
										<td class=c1>商品條碼</td>
										<td class=c2>名稱</td>
										<td class=c3>單價</td>
										<td class=c4>庫存</td>
										<td class=c5>已盤</td>
										<td class=c6></td>
									</tr>
								</table>
							</div></td>
					</tr>
					<tr class=listContent>
						<td colspan=6><div class=listContent>
								<table id=stockList class=listContent>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5><input id="stockNum1" type="text"
											class="listInput"></input></td>
										<td class=c6><input id="correctStock" type="button"
											class="listInput" value="正確"></input><input id="addOne"
											type="button" class="listInput" value="+1"></input><input
											id="minusOne" type="button" class="listInput" value="-1"></input><input
											id="addToStockResult" type="button" class="listInput"
											value="完成"></input><a class="positive">o</a></td>
									</tr>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5><input id="stockNum1" type="text"
											class="listInput"></input></td>
										<td class=c6><input id="correctStock" type="button"
											class="listInput" value="正確"></input><input id="addOne"
											type="button" class="listInput" value="+1"></input><input
											id="minusOne" type="button" class="listInput" value="-1"></input><input
											id="addToStockResult" type="button" class="listInput"
											value="完成"></input><a class="negative">x</a></td>
									</tr>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5><input id="stockNum1" type="text"
											class="listInput"></input></td>
										<td class=c6><input id="correctStock" type="button"
											class="listInput" value="正確"></input><input id="addOne"
											type="button" class="listInput" value="+1"></input><input
											id="minusOne" type="button" class="listInput" value="-1"></input><input
											id="addToStockResult" type="button" class="listInput"
											value="完成"></input></td>
									</tr>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5><input id="stockNum1" type="text"
											class="listInput"></input></td>
										<td class=c6><input id="correctStock" type="button"
											class="listInput" value="正確"></input><input id="addOne"
											type="button" class="listInput" value="+1"></input><input
											id="minusOne" type="button" class="listInput" value="-1"></input><input
											id="addToStockResult" type="button" class="listInput"
											value="完成"></input></td>
									</tr>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5><input id="stockNum1" type="text"
											class="listInput"></input></td>
										<td class=c6><input id="correctStock" type="button"
											class="listInput" value="正確"></input><input id="addOne"
											type="button" class="listInput" value="+1"></input><input
											id="minusOne" type="button" class="listInput" value="-1"></input><input
											id="addToStockResult" type="button" class="listInput"
											value="完成"></input><a></a></td>
									</tr>
									<tr>
										<td class=c1>a</td>
										<td class=c2>b</td>
										<td class=c3>c</td>
										<td class=c4>d</td>
										<td class=c5><input id="stockNum1" type="text"
											class="listInput"></input></td>
										<td class=c6><input id="correctStock" type="button"
											class="listInput" value="正確"></input><input id="addOne"
											type="button" class="listInput" value="+1"></input><input
											id="minusOne" type="button" class="listInput" value="-1"></input><input
											id="addToStockResult" type="button" class="listInput"
											value="完成"></input></td>
									</tr>
								</table>
							</div></td>
					</tr>
				</table></td>
		</tr>
	</table>
	<br>

	<table id=endStock class="tableArea">
		<tr class=blockHead>
			<td>盤點完成<input id="endStockInfo" type="text"></input><input
				id="saveCorrectPart" type="button" value="儲存無盤差資料"></input><input
				id="saveAll" type="button" value="儲存"></input>
			</td>
		</tr>
		<tr class=blockContent>
			<td><table>
					<tr class=endListHead>
						<td><div class=listHead>
								<table class=listContent>
									<tr>
										<td class=ec1>商品條碼</td>
										<td class=ec2>名稱</td>
										<td class=ec3>單價</td>
										<td class=ec4>庫存</td>
										<td class=ec5>盤點</td>
										<td class=ec6>盤差</td>
										<td class=ec7>佔比</td>
										<td class=ec8>單位</td>
										<td class=ec9></td>
									</tr>
								</table>
							</div></td>
					</tr>
					<tr class=listContent>
						<td colspan=9><div class=listContent>
								<table id=endStockList class=listContent>
									<tr>
										<td class=ec1>a</td>
										<td class=ec2>b</td>
										<td class=ec3>c</td>
										<td class=ec4>d</td>
										<td class=ec5>e</td>
										<td class=ec6>f</td>
										<td class=ec7>g</td>
										<td class=ec8>h</td>
										<td class=ec9><input id="moveResultToStock" type="button"
											value="盤點"></input></td>
									</tr>
									<tr>
										<td class=ec1>a</td>
										<td class=ec2>b</td>
										<td class=ec3>c</td>
										<td class=ec4>d</td>
										<td class=ec5>e</td>
										<td class=ec6>f</td>
										<td class=ec7>g</td>
										<td class=ec8>h</td>
										<td class=ec9>i</td>
									</tr>
									<tr>
										<td class=ec1>a</td>
										<td class=ec2>b</td>
										<td class=ec3>c</td>
										<td class=ec4>d</td>
										<td class=ec5>e</td>
										<td class=ec6>f</td>
										<td class=ec7>g</td>
										<td class=ec8>h</td>
										<td class=ec9>i</td>
									</tr>
									<tr>
										<td class=ec1>a</td>
										<td class=ec2>b</td>
										<td class=ec3>c</td>
										<td class=ec4>d</td>
										<td class=ec5>e</td>
										<td class=ec6>f</td>
										<td class=ec7>g</td>
										<td class=ec8>h</td>
										<td class=ec9>i</td>
									</tr>
									<tr>
										<td class=ec1>a</td>
										<td class=ec2>b</td>
										<td class=ec3>c</td>
										<td class=ec4>d</td>
										<td class=ec5>e</td>
										<td class=ec6>f</td>
										<td class=ec7>g</td>
										<td class=ec8>h</td>
										<td class=ec9>i</td>
									</tr>
									<tr>
										<td class=ec1>a</td>
										<td class=ec2>b</td>
										<td class=ec3>c</td>
										<td class=ec4>d</td>
										<td class=ec5>e</td>
										<td class=ec6>f</td>
										<td class=ec7>g</td>
										<td class=ec8>h</td>
										<td class=ec9>i</td>
									</tr>
									<tr>
										<td class=ec1>a</td>
										<td class=ec2>b</td>
										<td class=ec3>c</td>
										<td class=ec4>d</td>
										<td class=ec5>e</td>
										<td class=ec6>f</td>
										<td class=ec7>g</td>
										<td class=ec8>h</td>
										<td class=ec9>i</td>
									</tr>
									<tr>
										<td class=ec1>a</td>
										<td class=ec2>b</td>
										<td class=ec3>c</td>
										<td class=ec4>d</td>
										<td class=ec5>e</td>
										<td class=ec6>f</td>
										<td class=ec7>g</td>
										<td class=ec8>h</td>
										<td class=ec9>i</td>
									</tr>
									<tr>
										<td class=ec1>a</td>
										<td class=ec2>b</td>
										<td class=ec3>c</td>
										<td class=ec4>d</td>
										<td class=ec5>e</td>
										<td class=ec6>f</td>
										<td class=ec7>g</td>
										<td class=ec8>h</td>
										<td class=ec9>i</td>
									</tr>
								</table>
							</div></td>
					</tr>
				</table></td>
		</tr>
	</table>
	<a><input id="todayStockQuery" type="button" value="今日所有盤點記錄"></input><input
		id="todayStockResult" type="text"></input></a>
</body>
</html>