<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%> 

<html>


<%
	String nodeId = request.getParameter("no"); //單號
	String TABLE_TYPE="銷貨退回";
	String ACCOUNT_ACTION="退";
	String PRICE_ACTION_NAME="回收";
	String ITEM_ACTION_NAME="發";
	String UNIT_NAME_COL="退貨單位";
	String UNIT_PHONE_COL="電話";
	String TABLE_CLASS="A"; //銷貨、銷退為class A，進貨、進退為class B。兩類不同處為發貨、送貨相反  (銷貨<->供貨)
	request.setCharacterEncoding("UTF-8");
	
%>
	<jsp:include page="statement.jsp" >

		<jsp:param name="no" value="<%=nodeId %>" /> 
		<jsp:param name="TABLE_TYPE" value="<%=TABLE_TYPE %>"  /> 
		<jsp:param name="ACCOUNT_ACTION" value="<%=ACCOUNT_ACTION %>" /> 
		<jsp:param name="PRICE_ACTION_NAME" value="<%=PRICE_ACTION_NAME %>" /> 
		<jsp:param name="ITEM_ACTION_NAME" value="<%=ITEM_ACTION_NAME %>" /> 
		<jsp:param name="UNIT_NAME_COL" value="<%=UNIT_NAME_COL %>" /> 
		<jsp:param name="UNIT_PHONE_COL" value="<%=UNIT_PHONE_COL %>" /> 
		<jsp:param name="TABLE_CLASS" value="<%=TABLE_CLASS %>" /> 
				    
	</jsp:include>
 

</body>
</html>
