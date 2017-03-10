
		var arr = [158,228,308,409];
	$(function(){
		
		$(".price_right li").mouseover(function(){
			$(".price_right li").css("cursor","pointer");
			//商品价格
			$(".price_cen p .em2").html($(this).html());
			$(".price_cen p .em1").html(arr[$(this).index()]);
			var l = $(".price_cen p .em1").html();
			$(".price_right li").eq($(this).index()).addClass("color").siblings().removeClass("color");
			
		})
	//加法
		var price = $(".price_cen p .em1").html();
		//nav购物车与按钮同步
		var c = $("#topRight #count").html();
		$("#max").click(function(){
				var n = parseInt($("#opera").val());
				c++;
				$("#topRight #count").html(c+1);
				$(".price_cen p .em1").html(price*(n+1))
				if(n<199&&n>=0){
					$("#opera").val(n+1);
					$('#min').attr("disabled",false);//能点击,减号可以点击
					$("#min").css({"cursor":"pointer"})
					if($("#opera").val()==199){
						$("#max").css({"cursor":"not-allowed"});
						$('#max').attr("disabled",true);//加号不能点击
						$('#disallow_max').css({"display":"block"});
					}
				}else{
					$('#min').attr("disabled",false);
					$("#min").css({"cursor":"pointer"});
					$('#disallow_max').css({"display":"block"});
					$('#max').attr("disabled",true);//加号不能点击
					$("#max").css({"cursor":"not-allowed"});
					
				}
			})
		
		//减法
		$('#min').click(function(){
			var n = parseInt($("#opera").val());
			c--;
			$("#topRight #count").html(c+1);
			$(".price_cen p .em1").html(price*(n-1))
			if(n>0){
				$("#opera").val(n-1);
				$('#max').attr("disabled",false);
				$("#max").css({"cursor":"pointer"})
				$('#min').attr("disabled",false);
				$("#min").css({"cursor":"pointer"});
				if($("#opera").val()==1){
					$('#disallow_min').css({"display":"block"});
					$('#min').attr("disabled",true);
					$("#min").css({"cursor":"not-allowed"});
				}
			}else{
				$('#disallow_min').css({"display":"block"});
				$('#min').attr("disabled",true);
				$("#opera").val(1);
				$("#min").css({"cursor":"not-allowed"});
				
			}
		})
		//输入框失去光标对所输入的数字判断
		$("#opera").blur(function(){
			if($("#opera").val()>=199){
				$('#disallow_max').css({"display":"block"});
			}
		})
		//增加和减少遇到界限时，点击确定弹出框消失
		$(".sure").click(function(){
			$('#disallow_min').css({"display":"none"});
			$('#disallow_max').css({"display":"none"});
		})
	})
			
		
		
			
			
	
		
			
		
			
			
			
			