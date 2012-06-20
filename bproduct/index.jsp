<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<html>
<style type="text/css">
@import "glass.css";
@import "jquery-ui-1.8.20.custom.css";
</style>

<body>


	<script src=jquery-1.7.2.min.js></script>
	<script src=jquery-ui-1.8.20.custom.min.js></script>
	<script src=glassPreview.js></script>

	<% 
	int columnListingDiv = 25;//Integer.parseInt(request.getParameter("columnListingDiv"));
	int columnListingMax = 600;//Integer.parseInt(request.getParameter("columnListingMax"));
	int rowListingDiv = 25;//Integer.parseInt(request.getParameter("rowListingDiv"));	
	int rowListingMax = 1000;//Integer.parseInt(request.getParameter("rowListingMax"));	
	request.setCharacterEncoding("UTF-8");
	int columnListingNum = columnListingMax/columnListingDiv;
	int rowListingNum = rowListingMax/rowListingDiv;
	
	%>
	<br>
	<br>
	<input type="text" id=debugBox />
	<input type="button" onclick="stringGenerator()" value="生成字串" />
	<br>
	<input type="text" id=importBox />
	<input type="button" onclick="stringImporter()" value="匯入字串"/>
	<br>
	<br>
	查詢價格(請先將字串貼到"匯入字串"格子中)
	<br>
	度數:<input type="text" id=degreeBox /><br> 
	散光:<input type="text" id=spreadBox /><br>
	<input type="button" onclick="queryPrice()" value="查詢"/>
	
	
	<br>
		<form style="margin-top: 1em;">
			<div id="radioset">
				<input type="radio" id="radio1" name="radio" checked="checked" onclick="myopiaFunc()"/><label for="radio1">近視</label>
				<input type="radio" id="radio2" name="radio" onclick="highMyopiaFunc()"/><label for="radio2">高度近視</label>
				<input type="radio" id="radio3" name="radio" onclick="hyperopiaFunc()"/><label for="radio3">遠視</label>
			</div>
		</form>
		
		<form style="margin-top: 1em;">
			<div id="radioset2">
				<input type="radio" id="radio4" name="radio" checked="checked" /><label for="radio4">方形圈選</label>
				<input type="radio" id="radio5" name="radio" /><label for="radio5">左下全選</label>
				<input type="radio" id="radio6" name="radio" /><label for="radio6">右上全選</label>
				<input type="radio" id="radio7" name="radio" /><label for="radio7">下方全選</label>
				<input type="radio" id="radio8" name="radio" /><label for="radio8">右方全選</label>
				<input type="radio" id="radio9" name="radio" /><label for="radio9">左上方形</label>
			</div>
		</form>
		
	<table>
		<tr>
			<td id="C0R0" class="sideCellOri" style="width: 16px"></td>
			<td><div class=listHead>
					<table style="width: <%=42*(1+columnListingNum) %>px;">
						<tr>
							<td class=sideCell><input class=sideCell type=text
								id=sideCellColumn0 value='0' /></td>

							<%
						String columnListing = "";
						//int columnListingNum = 9;
						for (int i = 1; i <= columnListingNum; i++) {
							columnListing = columnListing + "<td class=sideCell><input class=sideCell type=text id=sideCellColumn" + i + " value=" + columnListingDiv*i + " /></td>";
						}
						%>
							<%=columnListing %>

						</tr>
					</table>
		</div>
		</td>

		</tr>
		<tr>
			<td><table>
					<%
				String rowListing = "";
				//int rowListingNum = 7;
				for (int i = 1; i <= rowListingNum; i++) {
					rowListing = rowListing + "<tr><td class=sideCell>" + "<input class=sideCell type=text id=sideCellRow" + i + " value=" + rowListingDiv*i*(-1) + " /></td></tr>";
				}
				%>

					<tr>
					<tr>
						<td class=sideCell><input class=sideCell type=text
							id=sideCellRow0 value='0' /></td>
					</tr>
					<%=rowListing %>

				</table></td>
			<td rowspan=<%=columnListingNum %>><table>
					<tr>
						<td class="listingTable"
							style="width: <%=42*(1+columnListingNum) %>px;">
							<div class="demo">

								<ol id="selectable">
									<%
										String listing = "";
										int liNum = (1+rowListingNum)*(1+columnListingNum);
										for (int i = 1; i <= liNum; i++) {
											listing = listing + "<li id=testing" + i + "><div id=selection" + i + ">X</div></li>";
										}
									%>
									<%=listing%>
								</ol>

							</div>
						</td>
					</tr>
				</table></td>
		</tr>
	</table>
	


	<br>

	<div style="height: 200px; min-height: 109px; width: auto;"
		class="ui-dialog-content ui-widget-content" id="dialog" title="請輸入價格">
		<p>
			<input type=text id="price" onchange="enterPrice()" />
		</p>
	</div>
	


</body>
</html>
