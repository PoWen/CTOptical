<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="com.ragic.s3.sdb.data.bdb.DomainValueKey"%>
<%@ page import="com.ragic.s3.sdb.data.bdb.BDBWorker" %>
<%@ page import="com.ragic.s3.sdb.query.*" %>
<%@ page import="java.util.*" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<meta http-equiv="Content-Type" content="text/html; charset=BIG5">

<html>


<%
	String TABLE_TYPE="應付對帳";
	String[] BILL_TYPE_ABB = {"SO", "IO", "SR", "IR", "IB", "SB"};
	String[] BILL_TYPE = {"銷" , "進", "銷退", "進退", "折讓", "折讓"};
	
	//應付對帳單
	int F_SB_NO = 1000305;//應收對帳單號
	int F_SB_DATE = 1000306;//產生日期
	int F_SB_START = 1000307;//起始日期
	int F_SB_END = 1000309;//結束日期
	int F_SB_STATUS = 1000308;//對帳單狀態
	int F_SB_SELLER = 1000316;//收帳單位
	int F_SB_BUYER = 1000317;//付帳單位
	int F_SB_BUYER_CID = 1000312;//統一編號
	int F_SB_BUYER_PHONE = 1000313;//電話
	int F_SB_BUYER_ADDRESS = 1000314;//地址
	int F_SB_NOTE = 1000318;//附註
	int F_SB_SYS_NOTE = 1000347;//系統附註
	int F_SB_AMOUNT = 1000319;//應收總計
	int F_SB_RECEIVE = 1000417;//收款金額
	int F_SB_PAY = 1000478;//付款金額
	int F_SB_SUBTOTAL = 1000479;//小計
	int F_SB_DISCOUNT = 1000418;//折讓金額
	int F_SB_USUAL_REMAIN = 1000481;//正常餘額
	int F_ACCOUNT_CLOSE_DATE = 1000458;//結帳日期
	int F_TRADE_DATE = 1000475;//產生日期
	int F_TRADE_CONTENT = 1000444; //帳款內容
	int F_TRADE_AMOUNT = 1000445; //帳款金額
	int F_TRADE_NO = 1000441; //帳款編號

	//old IDs
	int F_SALE_NO = 1000066;//銷貨單號
	int F_SALE_DATE = 1000201;//銷貨日期
	int F_SALE_ITEM_NO = 1000220;//銷貨品項編號
	int F_SALE_ITEM_NAME = 1000222;//品名規格
	int F_SALE_ITEM_QTY = 1000223;//數量
	int F_SALE_ITEM_UNIT = 1000224;//單位
	int F_SALE_ITEM_REAL_PRICE = 1000266;//售價
	int F_SALE_ITEM_SUBTOTAL = 1000226;//小計
	int F_SALE_ITEM_PRODUCT_NO = 1000064;//商品條碼
	int F_SALE_COUNT = 1000423; //項目總計彙整
	int F_SALE_RECEIVABLE = 1000215;//應收金額
	
	int F_SR_NO = 1000269;//銷退單號
	int F_SR_DATE = 1000272;//銷貨日期
	int F_SR_ITEM_NO = 1000291;//銷退品項編號
	int F_SR_ITEM_NAME = 1000292;//品名規格
	int F_SR_ITEM_QTY = 1000293;//數量
	int F_SR_ITEM_UNIT = 1000294;//單位
	int F_SR_ITEM_REAL_PRICE = 1000296;//售價
	int F_SR_ITEM_SUBTOTAL = 1000297;//小計
	int F_SR_COUNT = 1000425;//項目總計彙整 
	int F_SR_RECEIVABLE = 1000289;//應付金額

	String STRING_FORMAT = "$%1$,1d";



	

	//declare variables
	String nodeId = request.getParameter("no"); //單號

	//table content
	String genDate = "";
	String startDate = "";
	String endDate = "";
	String seller = "";
	String buyer = "";
	String buyerCID = "";
	String buyerAddress = "";
	String buyerPhone = "";
	String totalPrice= "";
	String date = "";
	String listNum = "";
	
	//html content
	String titleTable = "";
	String pageTitle = "";
	String pageTitle1 = "";
	String sheetTitle = "";
	String sheetTitle1 = "";
	String tableHead = "";
	String tableHead1 = "";
	String content = "";
	String endTable = "";
	String pageBreak = "";
	String htmlHeader ="";
	String statement = "";
	
	
	final int LINE_LIMIT = 27;//八號字58行/頁, 放54行, 4行留給總計  
	int currentLineNum = 0;
	int pageNum = 1;
	int itemNum = 0;
	
	BDBWorker worker = new BDBWorker("ctoptical");
	List<Integer> idList = new ArrayList<Integer>();
	idList.add(Integer.parseInt(nodeId));
	try{
		SDBQuery q = new SDBQueryFull(worker);
		q.go(F_SB_NO);
		q.filter(idList);
		SDBNode node = new SDBNodeMemory("");

		if((node=q.next()) != null){
			seller = q.dip(F_SB_SELLER);
			genDate = q.dip(F_SB_DATE);
			startDate = q.dip(F_SB_START);
			endDate = q.dip(F_SB_END);
			buyer = q.dip(F_SB_BUYER);
			buyerCID = q.dip(F_SB_BUYER_CID);
			buyerAddress = q.dip(F_SB_BUYER_ADDRESS);
			buyerPhone = q.dip(F_SB_BUYER_PHONE);
			totalPrice = q.dip(F_SB_AMOUNT);
		}
		
		titleTable = "<table id=titletable>"
				+"<tr id=titletable>"
				+"<td id=titletable1>中天眼鏡-"+buyer.substring(3,buyer.length())+"</td>"
				+"<td id=codebar>*" +node.getValue()+"*</td></tr>"
				+"<tr><td id=titletable2>"+TABLE_TYPE+"單" + "</td><td>" + node.getValue() + "</td>"
				+"</tr>"
				+"</table>";

		sheetTitle1= "<table id=sheettitle>"
				+"<tr><td>對帳單位:"+ seller+ "</td>"
	    		+"<td>日期區間:" + startDate + "至" + endDate + "</td></tr>"
				+"<tr><td>電話:"+ buyerPhone+ "</td>"
				+"<td>統一編號:"+ buyerCID+ "</td></tr>"
				+"<tr><td>送貨地址:"+ buyerAddress+ "</td>"
				+"<td></td></tr></table>";

		tableHead1= "<table id=tablehead>"
			    +"<tr>"
				+"<td class=tc1>項目</td>"
			    +"<td class=tc2>貨單日期</td>"
			    +"<td class=tc3>結帳日期</td>"
			    +"<td class=tc5>帳款內容</td>"
			    +"<td class=tc6>金額</td>"
				+"</tr></table>";

		pageBreak = 	"<table class=content2><tr class=prePageBreak>" 
						+ "<td class=prePageBreak width> 審核:" + "</td>"
						+ "<td class=prePageBreak> 經辦:" + "</td>"
						+ "<td class=prePageBreak> 會計:" + "</td>"
						+ "<td class=prePageBreak> 業務:" + "</td>"
						+ "<td class=prePageBreak> 簽收:" + "</td>"
						+ "</tr></table>"
						+ "<center><div class=page-break></div class=page-break></center>";

		currentLineNum+=10;
		
		
		
		for (int tradeLoop=0; tradeLoop<6; tradeLoop++){
			q.go(F_TRADE_NO);
			SDBNode node1;
			while((node1=q.next())!=null){
				if (node1.getValue().substring(0,2).equals(BILL_TYPE_ABB[tradeLoop])){
					int[] c_length={99, 12, 12, 43,13}; //第一欄不斷行, 第二到第八欄的每欄字元數 (換行判別)

					int[] line_incolu={(1/c_length[0]),
							(-1+(q.dip(F_TRADE_DATE).getBytes().length + q.dip(F_TRADE_DATE).length())/2) / c_length[1],
							(-1+(q.dip(F_ACCOUNT_CLOSE_DATE).getBytes().length + q.dip(F_ACCOUNT_CLOSE_DATE).length())/2) / c_length[2],
							//(-1+(node1.getValue().getBytes().length + node1.getValue().length())/2) / c_length[3],
							(-1+(q.dip(F_TRADE_CONTENT).getBytes().length + q.dip(F_TRADE_CONTENT).length())/2)/c_length[3],
							(-1+(q.dip(F_TRADE_AMOUNT).getBytes().length + q.dip(F_TRADE_AMOUNT).length())/2)/c_length[4],
							};

					int max_line = line_incolu[0];

					for (int i = 1; i < 5; i++){
						if (max_line < line_incolu[i])
							max_line = line_incolu[i];
					}

					if (LINE_LIMIT <= currentLineNum + max_line + 1) { //換頁處理
						pageNum = pageNum + 1;
						currentLineNum = 3;
						
						pageTitle= 	"<table class=in-page-pagetitle><tr><td class=serialnum>" 
								+ TABLE_TYPE + "單號:" + node.getValue() + "</td>"
								+"<td class=pagetitle>第" + pageNum+ "頁</td></tr></table>"
								+"<table class=in-page-sheettitle>"
								+"<tr><td>&nbsp</td></tr></table>";

						tableHead= 	"<table class=in-page-tablehead>"
								+"<tr><td class=tc1>項目</td>"
							    +"<td class=tc2>貨單日期</td>"
							    +"<td class=tc3>結帳日期</td>"
							    +"<td class=tc5>帳款內容</td>"
							    +"<td class=tc6>金額</td>"
								+"</tr></table>";
							
						content=content +"</table>"
								+ pageBreak 
								+ pageTitle 
								+ tableHead + "<table class=content1>";
					}
					itemNum++;
					
					
					String tradeContent = "";
					tradeContent = q.dip(F_TRADE_CONTENT);
					content= content  
							+"<tr class=content1>" 
							+"<td class=tc1>" + itemNum +"</td>"
							+"<td class=tc2>"	+ q.dip(F_TRADE_DATE) +"</td>"
							+"<td class=tc3>" 	+ q.dip(F_ACCOUNT_CLOSE_DATE) +"</td>"
							+"<td class=tc5>"	+ tradeContent +"</td>" 
							+"<td class=tc6>"	+ q.dip(F_TRADE_AMOUNT) + "</td>" 
							+"</tr>";

					currentLineNum = currentLineNum + max_line + 1;
					
					
					
				}
				
			}

			q.goback();
		}
		
		pageTitle1= "<table id=pagetitle><tr><td>第"+"1"+"頁</td></tr></table>";

		endTable="<table id=endtable>" 
		+"<tr id=endrow><td class=c1></td><td class=c2></td><td class=c3></td>"
		+"<td class=c4>應付總計:</td>"
		+"<td class=c8 colspan=4>" + String.format(STRING_FORMAT,Integer.parseInt(totalPrice))+ "</td></tr></table>"
		+"<table class=content2><tr class=prePageBreak>" 
		+ "<td class=prePageBreak width> 審核:" + "</td>"
		+ "<td class=prePageBreak> 經辦:" + "</td>"
		+ "<td class=prePageBreak> 會計:" + "</td>"
		+ "<td class=prePageBreak> 業務:" + "</td>"
		+ "<td class=prePageBreak> 簽收:" + "</td>"
		+ "</tr></table>";

		pageNum=pageNum+1;
		pageTitle= 	"<table class=in-page-pagetitle><tr><td class=serialnum>" 
				+ TABLE_TYPE + "單號:" + node.getValue() + "</td>"
				+"<td class=pagetitle>第" + pageNum+ "頁</td></tr></table>"
				+"<table class=in-page-sheettitle>"
				+"<tr><td>&nbsp</td></tr></table>";

		if (LINE_LIMIT<=currentLineNum+4)
			endTable=pageBreak+pageTitle+endTable;
		
				
		statement= 	titleTable
					+pageTitle1
					+sheetTitle1
					+tableHead1
					+"<table class=content1>"
					+content
					+"</table>"
					+endTable;
		htmlHeader="<head><title>中天-"+TABLE_TYPE+"單</title></head>";
	}
		
	finally{
			worker.commit();
		}

		
%>
<%=htmlHeader %>

<p>
<table class=printbotton><tr><td><input type="button" 
  onClick="window.print();window.close();" 
  value="列印"/></td></tr></table>
</p>

<div id="content">
	<style type="text/css">
@import "checkTable.css";
</style>

<%=statement %>
		
</div id="content">


</body>
</html>
