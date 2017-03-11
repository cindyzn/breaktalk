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