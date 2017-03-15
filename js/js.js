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
				location.href = "http://localhost/breaktalk/homepagecity.html";
			}else{
				return false;
			}
	   })
	   
	  //点击登录框删除cookie
	   $(".exit").click(function(){
	   		localStorage.removeItem("userName",$("#userName").val());
			localStorage.removeItem("userWord",$("#userWord").val());
	   })
	    
	})
		

