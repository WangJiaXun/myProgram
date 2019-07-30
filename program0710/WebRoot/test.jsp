<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'test.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
	<script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
	<script type="text/javascript">
		function changeEmp(){
			var deptId=$("#dept").val();
			$.post("EmpServlet",{op:"getAllEmp",id:deptId},function(date){
				var list=new Array();
				var list=date.split("|");
				var item=new Array();
				$("#emp").empty();
				$("#Job").empty();
				for(var i=0;i<list.length;i++){
					item=list[i].split(".");
					var op=$("<option>").val(item[0]).text(item[1]);
					op.appendTo($("#emp"));
				}
			});
		}
		function changeJOb(){
			var empId=$("#emp").val();
			$("#Job").empty();
			$.post("EmpServlet",{op:"getJobById",id:empId},function(date){
				var op=$("<option>").val(0).text(date);
				op.appendTo($("#Job"));
			});
		}
	</script>
</head>

<body>
	部门<select id="dept" onchange="changeEmp()" >
		<option>请选择部门</option>
		<c:forEach items="${allDept}" var="item">
			<option value="${item.deptNo}">${item.dName}</option>
		</c:forEach>
	</select>
	员工<select id="emp" onchange="changeJOb()">
		<option>请选择员工</option>
	</select>
	工作<select id="Job" >
		
	</select>
</body>