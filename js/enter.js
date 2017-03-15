$(function() {

	
	//注册和登录
	/*。。。。。。。。。。。。。 切换登录界面。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。*/
	$("#type li").click(function() {
		$("#type li").css("cursor", "pointer");
		$("#hide li").eq($(this).index()).css({
			"display": "block"
		}).siblings().css({
			"display": "none"
		});
	})

	//显示验证码
	$("#get").click(function() {
		$("#pass").css({
			"display": "block"
		});
	})
	//切换验证码
	$("#show").click(function() {
		$(".pass").val("");
		$("#show").html("");
		var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "g", "k"];
		var str = "";
		for (var i = 0; i < 4; i++) {
			var n = parseInt(Math.random() * arr.length);
			str += arr[n];
		}
		$("#show").html(str);
	})

	//验证码是否正确
	$("#sure").click(function() {
		if ($(".pass").val()) {
			if ($(".pass").val() == $("#show").html()) {
				$("#pass").css({
					"display": "none"
				});
			} else {
				alert("验证码错误");
			}
		} else {
			alert("验证码不能为空");
		}
	})
	
	
	//用户名登录核对用户名
	$("#normal #userName").blur(function() {
		if($("#normal #userName").val()){
			$.get("php/checkUser.php", {"telNumber": $("#normal #userName").val()},
				function(data) {
					if (data.trim() == 1) {
						$("#normal #userWord").blur(function() {
							
							$.post("php/checkPassWord.php", {"userPass": $("#normal #userWord").val()},
								
								function(data) {
									if (data.trim() == 1) {
										$("#normal #btn").click(function(){
											localStorage.setItem("userName",$("#normal #userName").val());
											location = "http://localhost/breaktalk/homepage.html";
										
										})
									}else{
										alert("亲，密码错误");
									}
								}
							)
						});
		
					} else {
						alert("亲，用户名错误");
					}
				}
			)
		}
		
	
	});
	
	//用户用手机登录
	$("#tel #userName").blur(function() {
		if($("#tel #userName").val()){
			$.get("php/checkUser.php", {"telNumber": $("#tel #userName").val()},
				function(data) {
					if (data.trim() == 1) {
						$("#tel #userWord").blur(function() {
							$.post("php/checkTelWord.php", {"telPass": $("#tel #userWord").val()},
								function(data) {
									console.log(data);
									if (data.trim() == 1) {
										$("#tel #btn").click(function(){
											localStorage.setItem("userName",$("#tel #userName").val());
											location = "http://localhost/breaktalk/homepage.html";
										})
										
									}else{
										alert("亲，手机验证码错误");
									}
								}
							)
						});
		
					} else {
						alert("亲，用户名错误");
					}
				}
			)
		}
		
	
	});
	
	
	
	

	if(localStorage.getItem("userName")&& (localStorage.getItem("userWord"))){
		$("#userName").val(localStorage.getItem("userName"));
		$("#userWord").val(localStorage.getItem("userWord"));
		chk.checked = true;
		setTimeout(function(){
			location = "http://localhost/breaktalk/homepage.html";
		},2000)
	}
	
	
	
	//保存cookie
	$("#chk").click(function(){
	//选中状态时，记住用户名密码
		if(this.checked){
			localStorage.setItem("userName",$("#userName").val());
			localStorage.setItem("userWord",$("#userWord").val());
			//中状态，清除保存过的用户名密码	
		}else{
			localStorage.removeItem("userName",$("#userName").val());
			localStorage.removeItem("userWord",$("#userWord").val());
			//localStorage.setItem("name",$("#userName").val());
			//localStorage.setItem("word",$("#userWord").val());
		}
	})

})


