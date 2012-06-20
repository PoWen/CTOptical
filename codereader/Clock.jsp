<%@ page language="java" contentType="text/html" %>
<script type="text/javascript">
function tableTest()
{
	var x=document.getElementById("fname");
	var table=document.getElementById("myTable");
	var row=table.insertRow(0);
	var cell1=row.insertCell(0);
	var cell2=row.insertCell(1);
	cell1.innerHTML=x.value;
	cell2.innerHTML="New";
	x.value="";
}
</script>
<html>
  <body bgcolor="white">
 
    <jsp:useBean id="clock" class="java.util.Date" />
 
    The current time at the server is:
    <ul>
      <li>Date: <jsp:getProperty name="clock" property="date" />
      <li>Month: <jsp:getProperty name="clock" property="month" />
      <li>Year: <jsp:getProperty name="clock" property="year" />
      <li>Hours: <jsp:getProperty name="clock" property="hours" />
      <li>Minutes: <jsp:getProperty name="clock" property="minutes" />
      <li>Seconds: <jsp:getProperty name="clock" property="seconds" />
    </ul>
 <P> 
Here is a summary of our four most recent news stories: 
<OL> 
<LI><jsp:include page="news/Item1.html" flush="true"/> 
<LI><jsp:include page="news/Item2.html" flush="true"/> 
</OL> 
<table id="myTable" border="1">
  <tr>
    <td>cell 1</td>
    <td>cell 2</td>
  </tr>
  <tr>
    <td>cell 3</td>
    <td>cell 4</td>
  </tr>
</table>

Enter the serial number: <input type="text" id="fname" onchange="tableTest()" />

  </body>
</html>