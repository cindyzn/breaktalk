$(function(){
		/*。。。。。。。。。。。。。本页面地址。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。*/  
		console.log(location.href)
	    
	//显示验证码
	$("#get").click(function(){
		$("#pass").css({"display":"block"});
	})
	//切换验证码
	$("#show").click(function(){
		$(".pass").val("");
		$("#show").html("");
		var arr = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","g","k"];
		var str = "";
		for(var i = 0;i<4;i++){
			var n = parseInt(Math.random()*arr.length);
			str += arr[n];
		}
		$("#show").html(str);
	})
		
	//验证码是否正确
	$("#sure").click(function(){
		if($(".pass").val()){
			if($(".pass").val()==$("#show").html()){
				$("#pass").css({"display":"none"});
			}else{
				alert("验证码错误");
			}
		}else{
				alert("验证码不能为空");
		}
	})
		
	//密码6-12位数字字母或者下划线
	$('#userWord').blur(function(){
		var fistPass = $('#userWord').val();
		var reg = /^[\w]{6,12}$/;
		if(!reg.test(fistPass)){
			$("#userWord + .erro").html("错误");
			$("#userWord + .erro").css({"color":"#bc002d","font-size":"10px","font-weight":"bold"});
		}else{
			$("#userWord + .erro").html("正确");
			$("#userWord + .erro").css({"color":"green","font-size":"10px","font-weight":"bold"});
		}
	})
	//确认密码
	$('#sureWord').blur(function(){
		if($('#sureWord').val() != $('#userWord').val()){
				$("#sureWord + .erro").html("错误");
			$("#sureWord + .erro").css({"color":"#bc002d","font-size":"10px","font-weight":"bold"});
		}else{
			$("#sureWord + .erro").html("正确");
			$("#sureWord + .erro").css({"color":"green","font-size":"10px","font-weight":"bold"});
		}
	
	})
	
	
	
	//验证手机号码
	$('#userName').blur(function(){
		var fistPass = $('#userName').val();
		var reg = /^1\d{10}$/; 
		if(!reg.test(fistPass)){
			$("#userName + .erro").html("错误");
			$("#userName + .erro").css({"color":"#bc002d","font-size":"10px","font-weight":"bold"});
		}else{
			$("#userName + .erro").html("");
			//$("#userName + .erro").css({"color":"green","font-size":"10px","font-weight":"bold"});
		}
	})
		
	//短信验证码
	$('#telWord').blur(function(){
		var fistPass = $('#telWord').val();
		var reg = /\d{6}$/; 
		if(!reg.test(fistPass)){
			$("#telWord + .erro").html("错误");
			$("#telWord + .erro").css({"color":"#bc002d","font-size":"10px","font-weight":"bold"});
		}else{
			$("#telWord + .erro").html("正确");
			$("#telWord + .erro").css({"color":"green","font-size":"10px","font-weight":"bold"});
		}
	})
	//数据库注册
	//检查是否重名
	$("#userName").blur(function(){
		$.get("php/checkUser.php",
			{
				"telNumber":$("#userName").val(),
				
			},
			function(data){
				console.log(data);
				if(data.trim() == 1){
					alert("亲，该用户名已经存在");
					return ;
				}else{
					//在不重名的情况下注册
					$("#btn").click(function(){
						$.post("php/reg.php",
							{
								"telNumber":$("#userName").val(),
								"userWord":$("#userWord").val(),
								"telWord":$("#telWord").val()
							},
							function(data){
								if($("#telWord + .erro").html() == "正确" && ($("#userName + .erro").html() == "")&&
									($("#sureWord + .erro").html() == "正确")&&($("#userWord + .erro").html() == "正确")){
									alert("注册成功！");	
									localStorage.setItem("userName",$("#userName").val());
									location = "http://localhost/breaktalk/homepage.html";
								}
								
							}
						)
					});
				}
			}
		)
	});
	
	
})