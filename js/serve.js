	window.onload = function(){
		
	
			var oPro = document.getElementById("pro");
			var oCity = document.getElementById("cit");
			var oArea = document.getElementById("district");
			
			ajax("json/city.json",function(china){
					var oLen = china.length;
					//取省份
					for(var i=0;i<oLen;i++){
						var pOption = document.createElement("option");
						pOption.value = i;//option如有value，则取value值，没有则显示option中间的值
						//console.log(china[i].name);
						pOption.innerHTML  = china[i].name;
						oPro.appendChild(pOption);
						//console.log(pOption.value);
					}
					
					//取城市
					oPro.onchange = function(){
					//省变动清空市和县；
						oCity.innerHTML  = "<option>请选择城市</option>";
						oArea.innerHTML  = "<option>请选择区县</option>";
						var x = oPro.value;
						//选中省份后，默认显示相对应的第一个省市和区县
						//oCity.innerHTML  = "<option>"+china[x].city[0].name+"</option>";
						//oArea.innerHTML  = "<option>"+china[x].city[0].area[0];"</option>";
						for(var i = 0;i<china[x].city.length;i++){
							var cOption = document.createElement("option");
							cOption.value = i;//取value 值
							//console.log(china[i].name);
							cOption.innerHTML  = china[x].city[i].name;
							oCity.appendChild(cOption);
						}	
					}
					
					
					//取区县
					
					oCity.onchange = function(){
					//城市变动清空县；
						oArea.innerHTML  = "<option>请选择区县</option>";
						var x = oPro.value;
						var y = oCity.value;
						//选中省份和城市后，默认显示相对应的第一个区县
						//oArea.innerHTML  = "<option>"+china[x].city[y].area[0];"</option>";
						for(var i = 0;i<china[x].city[y].area.length;i++){
							var aOption = document.createElement("option");
							aOption.innerHTML  = china[x].city[y].area[i];
							oArea.appendChild(aOption);
						}
					}
				
			})
	}
	
//切换企业服务项目栏
$(function(){
		console.log(location.href)
		$(".left li").click(function(){
			$(".right div").eq($(this).index()-1).addClass("active").siblings().removeClass("active");
			$(".left li").eq($(this).index()-1).addClass("color").siblings().removeClass("color");
			
		})
   	})