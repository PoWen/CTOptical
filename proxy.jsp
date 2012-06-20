<%@ page language="java" contentType="text/html" %>
<%@ page import="com.ragic.s3.nui.User"%>
<%@ page import="com.ragic.s3.nui.RagicConfig"%>
<%@ page import="java.util.*"%>
<%@ page import="java.net.*"%>
<%@ page import="java.io.*"%>
<%
try {
	String reqUrl = "";
	String reqStr = "";
	Enumeration pNames = request.getParameterNames();
	while(pNames.hasMoreElements()){
	    String name = (String)pNames.nextElement();
	    String value = request.getParameter(name);

	    if(name.equals("sendurl")) {
		reqUrl = value;
	    } else {
		if(reqStr.equals("")) {
		    reqStr = reqStr + name + "=" + value;
		} else {
		    reqStr = reqStr + "&" + name + "=" + value;
		}
	    }
	}
 
	URL  url = new URL (reqUrl);
	HttpURLConnection  con = (HttpURLConnection )url.openConnection();

	String cookie = "JSESSIONID=" + session.getId();
	con.setRequestProperty("Cookie", cookie);
	con.setDoOutput(true);
	con.setRequestMethod(request.getMethod());
	int clength = request.getContentLength();

	//out.println(request.getContentEncoding());
	//String reqStr = "1000473=" + request.getParameter("1000473");
	//reqStr = reqStr + "&1000228=" + request.getParameter("1000228");
	//reqStr = reqStr + "&1000230=" + request.getParameter("1000230");
	//out.println(reqStr); 
	
	if(clength > 0) {
		con.setDoInput(true);
		byte[] idata = new byte[clength];
		//request.getInputStream().read(idata, 0, clength);
		//con.getOutputStream().write(idata, 0, clength);
		con.getOutputStream().write(reqStr.getBytes());
	}
	//response.setContentType(con.getContentType());
	response.setContentType("text/html; charset=UTF-8");
 
	BufferedReader  rd = new BufferedReader (new InputStreamReader (con.getInputStream()));
	String  line;
	while ((line = rd.readLine()) != null) {
		out.println(line); 
		//System.out.println(line); 
	}
	rd.close();
} catch(Exception  e) {
	response.setStatus(500);
}
%>
