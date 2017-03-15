$(function(){
	console.log(localStorage.getItem("userName"));
	if(localStorage.getItem("userName")){
		$(".into").html(localStorage.getItem("userName").substring(0,5)+"...");
		$(".exit").html("");
	}
})
	