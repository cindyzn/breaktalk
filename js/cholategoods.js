$(function(){
	//商品列表动态添加
	$.getJSON("json/cholategoods.json",goodsData);
	function goodsData(data){
		console.log(data[0].goodsImg);
		for(var i = 0;i<data.length;i++){
				var goodsObj = $("<div>");
				$(goodsObj).attr({"id":"goods"});
				$(goodsObj).html('<div class='+'"goods_img"><a href="###" title="" target="_blank"><img src="'+data[i].goodsImg+'"alt="'+data[i].goodsName+'" id="img'+i+'"></a></div><div class="goods_script"><div class="goods_script_text"><h2><a  href="###" target="_blank">'+data[i].goodsName+
				'</a></h2><p>'+data[i].goodsDesc+'</p><span>'+data[i].goodsTip+
				'</span></div><div class="goods_operate"><p><a href="###" class="fa fa-heart"></a><span>1360</span>人喜欢</p><div class="price"><span id="money">'+data[i].goodsPrice+
				'</span><ul><li class="prvprice">'+data[i].goodsPrvPrice+
				'</li><li class="point"><span class="zero">.00</span>/'+data[i].goodsType+'</li></ul><div class="sub"><a href="http://localhost/breaktalk/goodscar.html" class="buy">立即购买</a><a href="'+ data[i].goodsMessage +'" title="" target="_blank" class="check">查看详情</a></div></div></div></div>');
			$("#list").append(goodsObj);
		}
		console.log($(goodsObj));
	}
	//cholatecake信息
	/*---------------蛋糕放大------------------------------------------------------*/
	$("#list .goods_img img").live("mouseenter", function(){
		$(this).animate({"width":"220px","height":"220px"},500);
	});
	$("#list .goods_img img").live("mouseleave",function(){
		$("#list .goods_img img").animate({"width":"200px","height":"200px"},500);

	})
})
