<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%> 
<%@ page import="com.ragic.s3.sdb.data.bdb.DomainValueKey"%>
<%@ page import="com.ragic.s3.sdb.data.bdb.BDBWorker" %>
<%@ page import="com.ragic.s3.sdb.query.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.io.*" %>
<%@page import="java.text.*"%>

<html><body>
<%
	String TABLE_TYPE =request.getParameter("TABLE_TYPE");//new String(request.getParameter("TABLE_TYPE").getBytes("MS950"),"UTF-8");//request.getParameter("TABLE_TYPE");
	String ACCOUNT_ACTION = request.getParameter("ACCOUNT_ACTION");
	String PRICE_ACTION_NAME=request.getParameter("PRICE_ACTION_NAME");
	String ITEM_ACTION_NAME=request.getParameter("ITEM_ACTION_NAME");
	String UNIT_NAME_COL=request.getParameter("UNIT_NAME_COL");
	String UNIT_PHONE_COL=request.getParameter("UNIT_PHONE_COL");
	String TABLE_CLASS = request.getParameter("TABLE_CLASS");
	request.setCharacterEncoding("UTF-8");

	String fileDownload = "";	

	int F_SALE_NO = 1000066;//銷貨單號
	int F_SALE_DATE = 1000201;//銷貨日期
	int F_SALE_PAY_DATE = 1000299;//結帳日期
	int F_SALE_ITEM_NO = 1000220;//銷貨品項編號
	int F_SALE_ITEM_BARCODE = 1000064;//貨品條碼
	int F_SALE_ITEM_NAME = 1000222;//品名規格
	int F_SALE_ITEM_QTY = 1000223;//數量
	int F_SALE_ITEM_UNIT = 1000224;//單位
	int F_SALE_ITEM_UNIT_PRICE = 1000225;//單價
	int F_SALE_ITEM_REAL_PRICE = 1000266;//售價
	int F_SALE_ITEM_SUBTOTAL = 1000226;//小計
	int F_SALE_ITEM_NOTE = 1000227;//備註
	int F_SALE_BEFORE_TAX = 1000212;//合計金額
	int F_SALE_TAX = 1000214;//營業稅
	int F_SALE_TOTAL = 1000216;//總計金額
	int F_SALE_DISCOUNT = 1000211;//折讓金額
	int F_SALE_RECEIVABLE = 1000215;//應收金額
	int F_SALE_COUNT = 1000423;//項目總計彙整 
	int F_SALE_NOTICE = 1000217; //表單附註

	int F_SALE_FROM = 0;//銷貨單位
	int F_SALE_ADDRESS = 0;//地址
	int F_SALE_FROM_PHONE = 0;//電話
	int F_SALE_FAX = 0;//傳真
	int F_SALE_TO = 0;//收貨單位
	int F_SALE_TO_CID = 0;//統一編號
	int F_SALE_TO_ADDRESS=0; //收貨地址
    	int F_SALE_TO_PHONE = 0;//送貨電話


	if (TABLE_CLASS.equals("A")) {
	F_SALE_FROM = 1000228;
	F_SALE_ADDRESS = 1000202;
	F_SALE_FROM_PHONE = 1000203;
	F_SALE_FAX = 1000204;
	F_SALE_TO = 1000230;
	F_SALE_TO_CID = 1000206;
	F_SALE_TO_ADDRESS = 1000207;
	F_SALE_TO_PHONE = 1000209;
	}
	
	if (TABLE_CLASS.equals("B")) {
	F_SALE_FROM = 1000230;
	F_SALE_ADDRESS = 1000207;
	F_SALE_FROM_PHONE = 1000209;
	F_SALE_FAX = 1000486;
	F_SALE_TO = 1000228;
	F_SALE_TO_CID = 1000485;
	F_SALE_TO_ADDRESS = 1000202;
	F_SALE_TO_PHONE = 1000203;
	}

	NumberFormat formatter = new DecimalFormat("'$'#,###,###");
	
	



	

	//declare variables
	String nodeId = request.getParameter("no"); //單號
	String saleDate = "";
	String payDate = "";
	String buyerPhone = "";
	String buyerCid = "";
	String buyerAddress = "";
	String buyer = "";
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
	String itemNumCount = "";
	String sheetNotice = "";
	
	
	final int LINE_LIMIT = 27;//八號字58行/頁, 放54行, 4行留給總計  

	int currentLineNum = 0;
	int pageNum = 1;
	short itemNum = 0;
	
	String beforeTax="";
	String tax="";
	String totalPrice="";
	String discount="";
	String reveivable="";

	BDBWorker worker = new BDBWorker("ctoptical");
	List<Integer> idList = new ArrayList<Integer>();
	//int list_no = Integer.parseInt(nodeId); 
	idList.add(Integer.parseInt(nodeId));
	try{
		
		SDBQuery q = new SDBQueryFull(worker);
		q.go(F_SALE_NO);
		q.filter(idList);
		SDBNode node = new SDBNodeMemory("");

		if((node=q.next())!=null){
			saleDate = q.dip(F_SALE_DATE);
			payDate = q.dip(F_SALE_PAY_DATE);
			buyerPhone = q.dip(F_SALE_TO_PHONE);
			buyerCid = q.dip(F_SALE_TO_CID); 
			buyerAddress = q.dip(F_SALE_TO_ADDRESS);
			buyer = q.dip(F_SALE_TO);
			beforeTax = q.dip(F_SALE_BEFORE_TAX);
			tax = q.dip(F_SALE_TAX);
			totalPrice = q.dip(F_SALE_TOTAL);
			discount = q.dip(F_SALE_DISCOUNT);
			if (discount.length() == 0)
				discount ="0";
			reveivable = q.dip(F_SALE_RECEIVABLE);
			itemNumCount = q.dip(F_SALE_COUNT);
			sheetNotice = q.dip(F_SALE_NOTICE);
			
		}

		String seller = q.dip(F_SALE_FROM);
		
		titleTable = "<table id=titletable>"
		+"<tr id=titletable>"
		+"<td id=titletable1>中天眼鏡-"+seller.substring(3,seller.length())+"</td>"
		+"<td id=titletable2>"+TABLE_TYPE+"單</td>"
		+"<td id=titletable3>" + node.getValue() + "</td>"
		+"</tr>"
		+"<tr><td class=sellerAddress>" + q.dip(F_SALE_ADDRESS)+ "</td>"
		+"<td id=codebar colspan=2 rowspan=2>*" +node.getValue()+"*</td></tr>"
		+"<td class=sellerPhone>TEL:"+ q.dip(F_SALE_FROM_PHONE)+ "  FAX:"+ q.dip(F_SALE_FAX)+"</td></tr>"
		+"</table>";	

		fileDownload = TABLE_TYPE + node.getValue()+ ".xls";
		
		
		sheetTitle1= "<table id=sheettitle>"
		+"<tr><td>" + UNIT_NAME_COL + ":"+ buyer + "</td>"
    		+"<td>"+TABLE_TYPE+"日期:" + saleDate + "</td></tr>"
		+"<tr><td>" + UNIT_PHONE_COL + ":" + buyerPhone +"</td>"
		+"<td>結帳日期:" + payDate + "</td></tr>"
		+"<tr><td>" + ITEM_ACTION_NAME + "貨地址:"+ buyerAddress+ "</td>"
		+"<td>統一編號:"+ buyerCid + "</td></tr></table>";
		
	
		tableHead1= "<table id=tablehead>"
		    +"<tr><td id=c1>項目</td>"
		    +"<td id=c2>條碼</td>"
		    +"<td id=c3>品名規格</td>"
		    +"<td id=c4>數量</td>"
		    +"<td id=c5>單位</td>"
		    +"<td id=c6>" + PRICE_ACTION_NAME + "價</td>"
		    +"<td id=c7>小計</td>"
		    +"<td id=c8>&nbsp備註</td></tr></table>";

		pageBreak= 	"<table class=content2><tr class=prePageBreak>" 
					+ "<td class=prePageBreak width> 審核:" + "</td>"
					+ "<td class=prePageBreak> 經辦:" + "</td>"
					+ "<td class=prePageBreak> 會計:" + "</td>"
					+ "<td class=prePageBreak> 業務:" + "</td>"
					+ "<td class=prePageBreak> 簽收:" + "</td>"
					+ "</tr></table>"
					+ "<center><div class=page-break></div class=page-break></center>";

		currentLineNum+=11;
		
		q.go(F_SALE_ITEM_NO);
		SDBNode node1;
		while((node1=q.next())!=null){
			int[] c_length={99, 18, 35, 4, 4, 6, 6, 7}; //第一欄不斷行, 第二到第八欄的每欄字元數 (換行判別)

			int[] line_incolu={(-1+(node1.getValue().getBytes().length + node1.getValue().length())/2) / c_length[0],
					(-1+(q.dip(F_SALE_ITEM_BARCODE).getBytes().length + q.dip(F_SALE_ITEM_BARCODE).length())/2) / c_length[1],
					(-1+(q.dip(F_SALE_ITEM_NAME).getBytes().length + q.dip(F_SALE_ITEM_NAME).length())/2) / c_length[2],
					(-1+(q.dip(F_SALE_ITEM_QTY).getBytes().length + q.dip(F_SALE_ITEM_QTY).length())/2)/c_length[3],
					(-1+(q.dip(F_SALE_ITEM_UNIT).getBytes().length + q.dip(F_SALE_ITEM_UNIT).length())/2)/c_length[4],
					(-1+(q.dip(F_SALE_ITEM_REAL_PRICE).getBytes().length + q.dip(F_SALE_ITEM_REAL_PRICE).length())/2)/c_length[5],
					(-1+(q.dip(F_SALE_ITEM_SUBTOTAL).getBytes().length + q.dip(F_SALE_ITEM_SUBTOTAL).length())/2)/c_length[6],
					(-1+1+(q.dip(F_SALE_ITEM_NOTE).getBytes().length + q.dip(F_SALE_ITEM_NOTE).length())/2)/c_length[7]};

			int max_line = line_incolu[0];

			for (int i = 0; i < 8; i++){
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
						
				tableHead= "<table class=in-page-tablehead>"
						+"<tr><td id=c1>項目</td>"
						+"<td id=c2>條碼</td>"
						+"<td id=c3>品名規格</td>"
						+"<td id=c4>數量</td>"
						+"<td id=c5>單位</td>"
						+"<td id=c6>" + PRICE_ACTION_NAME + "價</td>"
						+"<td id=c7>小計</td>"
						+"<td id=c8>&nbsp備註</td></tr></table>";
						
				content=content +"</table>"
						+ pageBreak 
						+ pageTitle 
						+ tableHead + "<table class=content1>";
			}
			
		itemNum++;
		
		content= content + 
				"<tr class=content1>"
				+"<td class=c1>"	+ itemNum	+"</td>"
				+"<td class=c2>"	+q.dip(F_SALE_ITEM_BARCODE)+"</td>"
				+"<td class=c3>" 	+q.dip(F_SALE_ITEM_NAME)+"</td>"
				+"<td class=c4>" 	+q.dip(F_SALE_ITEM_QTY)+"</td>" 
				+"<td class=c5>"	+q.dip(F_SALE_ITEM_UNIT)+"</td>" 
				+"<td class=c6>"	+q.dip(F_SALE_ITEM_REAL_PRICE)+"</td>" 
				+"<td class=c7>"	+q.dip(F_SALE_ITEM_SUBTOTAL)+"</td>"
				+"<td class=c8>&nbsp"	+q.dip(F_SALE_ITEM_NOTE)+"</td></tr>";
				
			
		/*
		 content= content + 
				"<tr class=content1>"
				+"<td class=c1>"	+ "123456789a123456789b123456789c123456789d123456789e123456789f"	+"</td>"
				+"<td class=c2>" 	+"123456789a123456789b123456789c123456789d123456789e123456789f"+"</td>"
				+"<td class=c3>" 	+"123456789a123456789b123456789c123456789d123456789e123456789f"+"</td>" 
				+"<td class=c4>"	+"123456789a123456789b123456789c123456789d123456789e123456789f"+"</td>" 
				+"<td class=c5>"	+"123456789a123456789b123456789c123456789d123456789e123456789f"+"</td>" 
				+"<td class=c6>"	+"123456789a123456789b123456789c123456789d123456789e123456789f"+"</td>"
				+"<td class=c7>"	+"123456789a123456789b123456789c123456789d123456789e123456789f"+"</td>"
				+"<td class=c8>"	+"123456789a123456789b123456789c123456789d123456789e123456789f"+"</td></tr>";
		*/
		
		currentLineNum = currentLineNum + max_line + 1;
		
		}
		
//		pageTitle1= "<table id=pagetitle><tr><td>第"+pageNum+"頁</td></tr></table>";
		pageTitle1= "<table id=pagetitle><tr><td>第"+"1"+"頁</td></tr></table>";

		
		endTable="<table id=endtable>" 
		+"<tr id=endrow>"
		+"<td id=ec1></td><td id=ec2 colspan=2>" + itemNumCount
		+"</td><td id=endc3>"
		+"合計:</td>"
		+"<td id=ec5 colspan=2>"	+ formatter.format(Float.parseFloat(beforeTax))
		+"&nbsp</td><td id=ec7></td></tr>"
		+"<td id=ec1></td>"
		+"<td id=ec2 colspan=2 rowspan=3>附註: " + sheetNotice + "</td>"
		+"<td id=endc3>總計:</td>"
		+"<td id=ec6 colspan=2>"	+ formatter.format(Float.parseFloat(totalPrice))+ "&nbsp</td>"
		+"<td id=ec8></td></tr>"
		+"<td id=ec1></td>"
		+"<td id=endc3>稅額:</td>"
		+"<td id=ec6 colspan=2>"	+ formatter.format(Float.parseFloat(totalPrice) - Float.parseFloat(beforeTax))+ "&nbsp</td>"
		+"<td id=ec8></td></tr>"
		+"<td id=ec1></td>"
		+"<td id=endc3>折扣:</td>"
		+"<td id=ec6 colspan=2>("+ formatter.format(Float.parseFloat(discount))+ ")</td>"
		+"<td id=ec8></td></tr>"
		+"<tr id=subtotal>"
		+"<td id=ec1></td>"
		+"<td id=ec2 colspan=2></td>"
		+"<td id=endc3>應" + ACCOUNT_ACTION + ":</td>"
		+"<td id=ec6 colspan=2>" + formatter.format(Float.parseFloat(reveivable)) +"&nbsp</td>"
		+"<td id=ec8></td></tr></table>"
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
				
		if (LINE_LIMIT<=currentLineNum+5)
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
		//commit ragic BDBworker
		worker.commit();
	}
%>
<%=htmlHeader %>

<p>
<table class=printbotton><tr><td><input type="button" 
  onClick="window.print();" 
  value="列印"/></td></tr></table>
<table class=printbotton style="display:none" ><tr><td><form><input type="button" 
  onClick="location.href='download.jsp?file=<%=fileDownload %>&no=<%=nodeId %>&TABLE_TYPE=<%=TABLE_TYPE %>&ACCOUNT_ACTION=<%=ACCOUNT_ACTION %>&PRICE_ACTION_NAME=<%=PRICE_ACTION_NAME %>&ITEM_ACTION_NAME=<%=ITEM_ACTION_NAME %>&UNIT_NAME_COL=<%=UNIT_NAME_COL %>&UNIT_PHONE_COL=<%=UNIT_PHONE_COL %>'" 
  value="另存成EXCEL" /></form></td></tr></table>


</p>

<div id="content">
	<style type="text/css">
@import "standardTable.css";
</style>

<%=statement %>
		
</div id="content">


</body>
</html>
