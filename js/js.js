/*。。。。。。。。。。。。。 切换城市。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。*/  
		$(function(){
		     $("#city").mouseenter(function(){
		    	$("#area").css({"display":"block"});
		    })
		     $("#area").mouseleave(function(){
		    	$("#area").css({"display":"none"});
		    })
		    $("#changeCity").click(function(){
		    	var com = confirm('切换城市您的购物车将被清空!');
				if(com){
					location.href = "http://127.0.0.1:8020/breaktalk/homepagecity.html";
				}else{
					return false;
				}
		    })
		    
		    /*。。。。。。。。。。。。。 	container蒙层。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。*/   
	    	$('.container #pop div').mouseenter(function(){ 
		    	$("#pop div").eq(($(this).index())%4).addClass("none").siblings().removeClass('none');
		    })
		    
		    
		    /*。。。。。。。。。。。。。 切换登录界面。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。*/  
			$("#type li").click(function(){
				$("#type li").css("cursor","pointer");
				$("#hide li").eq($(this).index()).css({"display":"block"}).siblings().css({"display":"none"});
			})
			
			
		    
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
					alert("密码由6-12位数字字母或者下划线");
				}
			})
			//确认密码
			$('#sureWord').blur(function(){
				var fistPass = $('#userWord').val();
				var secondPass = $('#sureWord').val();
				if(fistPass != secondPass){
				alert("确认密码错误");
				}
			})
			
			/*---------------蛋糕放大------------------------------------------------------*/
			$(".goods_img img").mouseenter(function(){
				$(this).animate({"width":"220px","height":"220px"},500);
				
			}).mouseleave(function(){
				$(this).animate({"width":"200px","height":"200px"},500);
		
			})
			
		})
		

		/*-------------------返回顶部------------------------------------------------*/
		window.onscroll = function(){
			var scrollTop = document.body.scrollTop ||document.documentElementscrollTop;
			if(scrollTop>300){
				document.getElementById("back").style.display = "block";
				document.getElementById("back").onclick = function(){
					var timer = setInterval(function(){
						scrollTop-=50;
					 	document.body.scrollTop = document.documentElementscrollTop = scrollTop ;
						if(scrollTop<=0){
							clearInterval(timer);
						}
			
					},30)
				}
			}else{
				document.getElementById("back").style.display = "none";
			}
		}