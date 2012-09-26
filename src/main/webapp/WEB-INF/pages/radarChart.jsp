<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src='../../js/jquery/jquery.min.js' type="text/javascript"></script>
<script type="text/javascript" src="../../js/jquery/radarChart.js"></script>
<link href="../../css/common.css" type="text/css" rel="stylesheet">
<style type="text/css">
#loader {
/*   border: 1px solid #ccc; */
/*   width: 500px; */
/*   height: 500px; */
}

/** 
 * While we're having the loading class set.
 * Removig it, will remove the loading message
 */
#loader.loading {
  background: url(../../images/image-loader.gif) no-repeat center center;
}
</style>
</head>

<body>
	<%@include file="/WEB-INF/pages/mainHeader.jsp"%>
	<div class="background container">
	<%@include file="/WEB-INF/pages/header.jsp"%>
	<div align="center" style="font-size:18px;padding:43px"><label><strong id="headingMsg">Domain Assessment in form of Radar Chart</strong></label></div>
		<div align="center" id="loader" class="loading" >
			
		</div>
	</div>
	<%@include file="/WEB-INF/pages/footer.jsp"%>
</body>
</html>