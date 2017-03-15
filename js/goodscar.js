
window.onload = function () {

    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var ret = [];                                           //数组放入包含该样式属于的所有元素
            var els = document.getElementsByTagName('*');         //获取文本的所有元素
            for (var i = 0, len = els.length; i < len; i++) {    //遍历所有标签
                if (els[i].className.indexOf(cls + ' ') >=0 ||
                    els[i].className.indexOf(' ' + cls + ' ') >=0 ||
                    els[i].className.indexOf(' ' + cls) >=0) {
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }

    var table = document.getElementById('cartTable'); // 购物车表格
    var selectInputs = document.getElementsByClassName('check'); // 所有勾选框
    var checkAllInputs = document.getElementsByClassName('check-all') // 全选框
    var tr = table.children[1].rows; //行
    var selectedTotal = document.getElementById('selectedTotal'); //已选商品数目容器
    var priceTotal = document.getElementById('priceTotal'); //总计
    var deleteAll = document.getElementById('deleteAll'); // 删除全部按钮
    var selectedViewList = document.getElementById('selectedViewList'); //浮层已选商品列表容器
    var selected = document.getElementById('selected'); //已选商品
    var foot = document.getElementById('foot');

    // 更新总数和总价格，已选浮层
    function getTotal() {
		var seleted = 0;//初始化选择数量
		var price = 0;  //初始化价钱
		var HTMLstr = ''; //将要显示的内容
		for (var i = 0, len = tr.length; i < len; i++) {
			if (tr[i].getElementsByTagName('input')[0].checked) {  //判断每一行的checkbox是否选中
				tr[i].className = 'on';
				seleted += parseInt(tr[i].getElementsByTagName('input')[1].value); //选中的商品数量加1
				price += parseFloat(tr[i].cells[4].innerHTML);   //价格总数加上 商品价格
				HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>' ;//浮动层放入商品的图标
			}
			else {
				tr[i].className = '';//没有选中清空样式
			}
		}	
		selectedTotal.innerHTML = seleted; //显示选中的内容
		priceTotal.innerHTML = price.toFixed(2); //格式化价格
		
		selectedViewList.innerHTML = HTMLstr; //循环完后 放入内容
	
		if (seleted == 0) {
			foot.className = 'foot';  //清空的样式
		}
		//弹出框数量
		document.getElementsByClassName("balance_count")[0].innerHTML = selectedTotal.innerHTML;
		//弹出框的价格
		document.getElementsByClassName("balance_money")[0].innerHTML = priceTotal.innerHTML; //显示选中的内容);
		//nav购物车与按钮同步
		
		document.getElementById("count").innerHTML = selectedTotal.innerHTML;
    }
    
    // 计算单行价格
    function getSubtotal(tr) {
        var cells = tr.cells; //获取行的单元格
        var price = cells[2]; //单价
        var subtotal = cells[4]; //小计td
        var countInput = tr.getElementsByTagName('input')[1]; //数目input
        var span = tr.getElementsByTagName('span')[1]; //数量前面的-号操作
        //写入HTML
        subtotal.innerHTML = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2); //数量*金钱求和，取值两位小数
	/*
        if (countInput.value == 1) {     //如果数目只有一个，把-号去掉
            span.innerHTML = '';         //清空
        }else{
            span.innerHTML = '-';        //提供-号
        }*/
    }

    // 点击选择框
    for(var i = 0; i < selectInputs.length; i++ ){ //选择事件
        selectInputs[i].onclick = function () { //判断每一行第一个checkbox按钮是否选中
            if (this.className.indexOf('check-all') >= 0) { //如果是全选，则吧所有的选择框选中
                for (var j = 0; j < selectInputs.length; j++) {
                    selectInputs[j].checked = this.checked;   //全选
                }
            }
            if (!this.checked) { //只要有一个未勾选，则取消全选框的选中状态
                for (var i = 0; i < checkAllInputs.length; i++) {
                    checkAllInputs[i].checked = false;  //取消全选按钮
                }
            }
            getTotal();//选完更新总计
        }
    }

    // 显示已选商品弹层
    selected.onclick = function () {
        if (selectedTotal.innerHTML != 0) {
            foot.className = (foot.className == 'foot' ? 'foot show' : 'foot'); //加载样式让弹出层显示或者取消
        }
    }

    //已选商品弹层中的取消选择按钮
    selectedViewList.onclick = function (e) {
        var e = e || window.event;
        var el = e.srcElement;  //图片属性
        if (el.className=='del') { //点击取消该商品
            var input =  tr[el.getAttribute('index')].getElementsByTagName('input')[0] //获取图片的index属性找到指定的checkbox 然后让该checkbox不选中
            input.checked = false;
            input.onclick(); //调用点击事件
        }
    }

    //为每行元素添加事件
    for (var i = 0; i < tr.length; i++) {
        //将点击事件绑定到tr元素
        tr[i].onclick = function (e) {
            var e = e || window.event;
            var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素
            var cls = el.className; //触发元素的class
            var countInout = this.getElementsByTagName('input')[1]; // 数目input
            var value = parseInt(countInout.value); //数目
            //通过判断触发元素的class确定用户点击了哪个元素
            switch (cls) {
                case 'add': //点击了加号
                    countInout.value = value + 1; //数量加+1
                    getSubtotal(this); //计算值
                    break;
                case 'reduce': //点击了减号
                    if (value > 1) {
                        countInout.value = value - 1;
                        getSubtotal(this);
                    }
                    break;
                case 'delete': //点击了删除
                    var conf = confirm('确定删除此商品吗？');
                    if (conf) {
                        this.parentNode.removeChild(this);
                    }
                    break;
            }
            getTotal();
        }
        // 给数目输入框绑定keyup事件
        tr[i].getElementsByTagName('input')[1].onkeyup = function () { //手动输入数字后的改变事件
            var val = parseInt(this.value); //文本框的值取整 操作
            if (isNaN(val) || val <= 0) { //设置出现不符合条件的数，设置默认值
                val = 1;
            }
            if (this.value != val) {
                this.value = val;
            }
            getSubtotal(this.parentNode.parentNode); //更新小计
            getTotal(); //更新总数
        }
    }
    // 点击全部删除
    deleteAll.onclick = function () { //删除事件
        if (selectedTotal.innerHTML != 0) {
            var con = confirm('确定删除所选商品吗？'); //弹出确认框
            if (con) {
                for (var i = 0; i < tr.length; i++) {
                    // 如果被选中，就删除相应的行
                    if (tr[i].getElementsByTagName('input')[0].checked) {
                        tr[i].parentNode.removeChild(tr[i]); // 删除相应节点
                        i--; //回退下标位置
                    }
                }
            }
        } else {
            alert('请选择商品！');
        }
        getTotal(); //更新总数
    }
	console.log("");
    // 默认全选
    checkAllInputs[0].checked = true; //设置默认状态
    checkAllInputs[0].onclick(); //触发点击事件
}



$(function () {
        //加数功能
        $(".count .add").click(function () {
            var num = $(this).prev();//数字部分
            var sub = num.prev();
            num.val(parseInt(num.val()));
            sub.html("-");
            
            singleTotal($(this).parents("tr"), num.val())
        });
        //减法功能
        $(".count .reduce").click(function () {
            var num = $(this).next(); //数字部分
            if (parseInt(num.val()) <= 1) {
                $(this).html("");
                alert("此商品购买数量不能少于1")
                return;
            }
            var add = num.next();
            num.val(parseInt(num.val()));
            singleTotal($(this).parents("tr"), num.val())
        });
        //统计单个商品的总价
        function singleTotal(tr, num) {
            var price = $(tr).find("td:eq(2)").html();//获取单价
            var filter = (parseFloat(price) * num).toFixed(2); //获取总价
            $(tr).find("td:eq(4)").html(filter);
        }

        //给每一个check-one写一个点击事件
        $(".check-one").each(function () {
            $(this).click(function () {
                if ($(this).prop("checked")) {
                      $("#priceTotal")
                }
            });
        });
    
   
		
		//继续购物
		$(".sub_left").click(function(){
			location = "http://localhost/breaktalk/cake.html";
		})
		//结算,弹出对话框
		$(".sub_right").click(function(){
			$("#balance").css({"display":"block"});
		})
		//点击返回回到购物车，点击确定回到首页
		$(".balance_back").click(function(){
				
			location = "http://localhost/breaktalk/goodscar.html";
		})
		$(".balance_sure").click(function(){
			
			location = "http://localhost/breaktalk/homepage.html";
		})
		
		
});
