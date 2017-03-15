<?php
	
	
	header("content-type","text/html;charset=utf-8");
	$telPass = $_POST['telPass'];
	//建立连接
	$conn = mysql_connect("localhost","root","cindy");
	
	if($conn){
		//echo("连接成功");
	}else{
		echo("连接失败");
	}
	
	//2、选择数据库
	mysql_select_db("cindy",$conn);
	//3)、执行SQL语句
	$sqlstr = "select * from regTable where telPass='".$telPass."'";
	$result = mysql_query($sqlstr,$conn);
	$rows = mysql_num_rows($result);
	//4)、拆桥（关闭数据库）
	mysql_close($conn);
	
	//3、根据查询结果返回（1或 0）
	echo($rows);
	


?>