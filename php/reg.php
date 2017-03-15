<?php
	

	header("content-type","text/html;charset=utf-8");
	$telNumber = $_POST['telNumber'];
	$userWord = $_POST['userWord'];
	$telWord = $_POST['telWord'];
	//建立连接
	$conn = mysql_connect("localhost","root","cindy");
	
	if($conn){
		//echo("连接成功");
	}else{
		echo("连接失败");
	}
	//2、选择数据库
	mysql_select_db("cindy",$conn);
	
	//3、执行语句（插入数据）
	$sqlStr = "insert into regTable(telNumber,userPass,telPass)
    values('".$telNumber."','".$userWord."','".$telWord."')";
 	//获取数据到表格
	mysql_query($sqlStr,$conn);
	//4、关闭数据库
	mysql_close($conn);
	


?>