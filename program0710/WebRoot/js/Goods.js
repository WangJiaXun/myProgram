
var flag=true;
var count=1;

function  deleteAll1(page,sum,showNumber,state) {
	var judge=window.confirm("你确定批量删除吗");
	if(judge==true){
		$("input[name='checkOne']").each(function(){
			if($(this).is(":checked"))  
			{  
				deleteOneTrTwo(this,$(this).val(),page,sum,showNumber,state);
			}  
		});  		
	}
}



function previewImage(imgFile,pre){//第一个input的file，一个想要展示的div的id
 		//取出文件的后缀名
	// alert("hello");	
		onblurgoodsPhoto();
		var filextension=imgFile.value.substring(imgFile.value.lastIndexOf("."),imgFile.value.length);
 	    filextension=filextension.toLowerCase();
 	    //判断必须是图片文件
 	    if ((filextension!='.jpg')&&(filextension!='.gif')&&(filextension!='.jpeg')&&(filextension!='.png')&&(filextension!='.bmp')){
 	//        alert("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
 	        imgFile.focus();
 	      document.getElementById(pre).innerHTML = "<img id='img' width='120px' height='100px'/>";
 	    }else{
 	        var path;
 	        if(document.all){ //IE
 	            imgFile.select();
 	            path = document.selection.createRange().text;
 	            //selection 代表了当前激活选中区，即高亮文本块，和/或文档中用户可执行某些操作的其它元素。
 	            //createRange().text 运用IE滤镜获取数据
 	   //         alert(path);
 	            document.getElementById(pre).innerHTML="";
 	            document.getElementById(pre).style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")";
 	            //使用IE滤镜效果    
 	        }else{//非IE
 	            path=window.URL.createObjectURL(imgFile.files[0]);
 	            //得到文件资源的URL
	          //  alert(path);
 	            document.getElementById(pre).innerHTML = "<img id='img' width='120px' height='100px' src='"+path+"'/>";
 	            //将path指向的文件资源显示为图片
 	        }
 	    }   
 	}




function judgeName(nameControl,promptControl){//一个传控件，一个传要显示地方的标签
	var  name=nameControl.attr("value");
	var storeId= $("#store").val();
	if(name==""){
		promptControl.text("填写在15个字符内，并且商店要选择");
		return;
	}else{
		if($("#store").val()==-1){
			promptControl.text("请填写店铺");
		}else{
			$.post("goodsAjaxServlet",{op:"judgeName",name:name,storeId:storeId},function(date){
				var judge=parseInt(date);
				if(judge>0){
					promptControl.text("商品名字重复");
				}else{
					promptControl.text("名字可用");
				}
			
			});
		}
	}
}





function deleteOneTrTwo(doDelte,id,currentPage,sumPage,showNumber,state){//控件，商品id，当前页，总页面，一页展示数量，状态//删除销售或仓库的
	var judge=true;
	sumPage=$("#sumPage").val();
	if(judge==true){
		deleteOutGoods(id,currentPage,sumPage,showNumber,state);
		$(doDelte).parent().parent().remove();
	}else{
		return;
	}
}



function deleteOutGoods(id,currentPage,sumPage,showNumber,state){
	sumPage=$("#sumPage").val();
	$.post("goodsAjaxServlet",{op:"deleteOne",currentPage:currentPage,showPage:sumPage,showNumber:showNumber,id:id,state:state},function(date){
		var dates=new Array();
		dates=date.split("|");
		var judge=dates[0];
		if(judge=="Y"){
			var id=dates[1];
			var image=dates[2];
			var name=dates[3];
			var salePrice=dates[4];
			var marketPrice=dates[5];
			var typeid=dates[6];
			var type=dates[7];
			var state=dates[8];
			var number=dates[9];
			var createtime=dates[10];
			var alterTime=dates[11];
			var storeName=dates[12];
			var tr="<tr>"
				+"<td align='center' style='width:5%;'><input type='checkbox'	style='transform:scale(1);' name='checkOne'	value='760393|0|online' onclick='isCheck()' />"
				+"</td>"
				+"<td align='center' style='width:8%;'>"
				+"<span	id='proLst_gvProduct_lblProductName_1'>"+storeName+"</span></td>"
				+"<td align='center' style='width:10%;'>"
				+"<span	id='proLst_gvProduct_lblProductName_1'>"+name+"</span></td>"
				+"<td align='center' style='width:7%;'>"
				+"<span	id='proLst_gvProduct_lblSalePrice_1'>"+salePrice+"</span></td>"
				+"<td align='center' style='width:5%;'>"
				+"<span	id='proLst_gvProduct_lblPrice_1'>"+marketPrice+"</span></td>"
				+"<td align='center' style='width:7%;'>"
				+"<span	id='proLst_gvProduct_lblProductFormStr_1'>"+type+"</span></td>"
				+"<td align='center' style='width:7%;'>"
				+"<span	id='proLst_gvProduct_lblStatus_1'>"+state+"</span></td>"
				+"<td align='center' style='width:7%;'>"
				+"<span	id='proLst_gvProduct_lblProductDetail_1'>"+number+"</span></td>"
				+"<td align='center' style='width:5%;'>"
				+"<span	id='proLst_gvProduct_lblcreatetime_1'>"+createtime+"</span>"
				+"</td>"
				+"<td align='center' style='width:8%;'><span"
				+"	id='proLst_gvProduct_lblEditTime_1'>"+alterTime+"</span></td>"
				+"<td><a id='proLst_gvProduct_A1_1' href='GoodsSeverlet?op=transitGoods&op1=edit&id="+id+"' > 编辑</a> <a"
				+"	onclick='deleteOneTr(this,"+id+","+currentPage+","+sumPage+","+showNumber+",\"仓库\");' id='proLst_gvProduct_btnUpdate_1'>删除</a></td>"
				+"</tr>";	
				$("#myTable").append(tr);
				var j=dates[13];
				if(dates[13]=="1"){
					var aId="a"+(sumPage);
					//	alert("改变前"+sumPage);
						$("#nextPage").
						$("#"+aId+"").remove();
						$("#sumPage").val(parseInt($("#sumPage").val())-1);
					//	alert("改变后"+$("#sumPage").val());

				}			
		}				
	});
	
}







function deleteOneTr(doDelte,id,currentPage,sumPage,showNumber,state,op){//控件，商品id，当前页，总页面，一页展示数量，状态
	var judge=window.confirm("确认删除");
	sumPage=$("#sumPage").val();
	if(judge==true){
		$.post("goodsAjaxServlet",{op:op,currentPage:currentPage,showPage:sumPage,showNumber:showNumber,id:id,state:state},function(date){
			var dates=new Array();
			dates=date.split("|");
			var judge=dates[0];
			if(judge=="Y"){
				var id=dates[1];
				var image=dates[2];
				var name=dates[3];
				var salePrice=dates[4];
				var marketPrice=dates[5];
				var typeid=dates[6];
				var type=dates[7];
				var state=dates[8];
				var number=dates[9];
				var createtime=dates[10];
				var alterTime=dates[11];
				var storeName=dates[12];
				var tr="<tr>"
					+"<td align='center' style='width:5%;'><input type='checkbox'	style='transform:scale(1);' name='checkOne'	value='760393|0|online' onclick='isCheck()' />"
					+"</td>"
					+"<td align='center' style='width:8%;'>"
					+"<span	id='proLst_gvProduct_lblProductName_1'>"+storeName+"</span></td>"
					+"<td align='center' style='width:10%;'>"
					+"<span	id='proLst_gvProduct_lblProductName_1'>"+name+"</span></td>"
					+"<td align='center' style='width:7%;'>"
					+"<span	id='proLst_gvProduct_lblSalePrice_1'>"+salePrice+"</span></td>"
					+"<td align='center' style='width:5%;'>"
					+"<span	id='proLst_gvProduct_lblPrice_1'>"+marketPrice+"</span></td>"
					+"<td align='center' style='width:7%;'>"
					+"<span	id='proLst_gvProduct_lblProductFormStr_1'>"+type+"</span></td>"
					+"<td align='center' style='width:7%;'>"
					+"<span	id='proLst_gvProduct_lblStatus_1'>"+state+"</span></td>"
					+"<td align='center' style='width:7%;'>"
					+"<span	id='proLst_gvProduct_lblProductDetail_1'>"+number+"</span></td>"
					+"<td align='center' style='width:5%;'>"
					+"<span	id='proLst_gvProduct_lblcreatetime_1'>"+createtime+"</span>"
					+"</td>"
					+"<td align='center' style='width:8%;'><span"
					+"	id='proLst_gvProduct_lblEditTime_1'>"+alterTime+"</span></td>"
					+"<td><a id='proLst_gvProduct_A1_1' href='GoodsSeverlet?op=transitGoods&op1=edit&id="+id+"' > 编辑</a> <a"
					+"	onclick='deleteOneTr(this,"+id+","+currentPage+","+sumPage+","+showNumber+",\"仓库\");' id='proLst_gvProduct_btnUpdate_1'>删除</a></td>"
					+"</tr>";	
					$("#myTable").append(tr);
					var j=dates[13];
					if(dates[13]=="1"){
						var aId="a"+(sumPage);
					//	alert("改变前"+sumPage);
						$("#"+aId+"").remove();
						$("#sumPage").val(parseInt($("#sumPage").val())-1);
					//	alert("改变后"+$("#sumPage").val());
					}
					
			}
				
		});
		$(doDelte).parent().parent().remove();
	}else{
		return;
	}
}


function deleteOutOneTr(doDelte,id,currentPage,sumPage,showNumber,op){//控件，商品id，当前页，总页面，一页展示数量，状态
	var judge=window.confirm("确认删除");
	sumPage=$("#sumPage").val();
	if(judge==true){
		$.post("goodsAjaxServlet",{op:op,currentPage:currentPage,showPage:sumPage,showNumber:showNumber,id:id},function(date){
			var dates=new Array();
			dates=date.split("|");
			var judge=dates[0];
			if(judge=="Y"){
				var id=dates[1];
				var image=dates[2];
				var name=dates[3];
				var number=dates[4];
				var type=dates[5];
				var safeTime=dates[6];
				var salePrice=dates[7];
				var storeName=dates[8];
				var tr="<tr>"
							+"<td><input type='checkbox' value='"+id+"' id='checkOne' onclick='isCheck()' name='checkOne'></td>"
							+"<td>"+storeName+"</td>"
							+"<td><img src='"+image+"' alt='没有此照片' /></td>"
							+"<td>"+name+"</td>"
							+"<td>"+number+"</td>"
							+"<td>"+type+"</td>"
							+"<td>"+safeTime+"</td>"
							+"<td>"+salePrice+"</td>"
							+"<td> <a style='width: 200px;height: 100px' id='proLst_gvProduct_A1_1"+count+"' href='GoodsSeverlet?op=transitGoods&op1=edit&id="+id+"' > 编辑</a>&nbsp;"
							+"<a  name='Delete'  onclick='deleteOutOneTr(this,"+id+","+currentPage+","+sumPage+","+showNumber+",\"deleteOutTimeOne\")' id='gvTag_Delete_0' class='button-red button' style='width:70px;'>删除</a>"
							+"</td>"	
						+"</tr>";
					$("#myTable").append(tr);
					var myId="proLst_gvProduct_A1_1"+count;
					count++;
					if(dates[9]=="1"){
						var aId="a"+(sumPage);
						$("#"+aId+"").remove();
						$("#sumPage").val(parseInt($("#sumPage").val())-1);
					}			
			}			
		});
		$(doDelte).parent().parent().remove();
	}else{
		return;
	}
}
function  test() {
	alert("hah ");
}

function deleteOutOneTrTwo(doDelte,id,currentPage,sumPage,showNumber,op){//控件，商品id，当前页，总页面，一页展示数量，状态
	var judge=true;
	sumPage=$("#sumPage").val();
	if(judge==true){
		$.post("goodsAjaxServlet",{op:op,currentPage:currentPage,showPage:sumPage,showNumber:showNumber,id:id},function(date){
			var dates=new Array();
			dates=date.split("|");
			var judge=dates[0];
			if(judge=="Y"){
				var id=dates[1];
				var image=dates[2];
				var name=dates[3];
				var number=dates[4];
				var type=dates[5];
				var safeTime=dates[6];
				var salePrice=dates[7];
				var storeName=dates[8];
				var tr="<tr>"
					+"<td><input type='checkbox' value='"+id+"' id='checkOne' onclick='isCheck()' name='checkOne'></td>"
					+"<td>"+storeName+"</td>"
					+"<td><img src='"+image+"' alt='没有此照片' /></td>"
					+"<td>"+name+"</td>"
					+"<td>"+number+"</td>"
					+"<td>"+type+"</td>"
					+"<td>"+safeTime+"</td>"
					+"<td>"+salePrice+"</td>"
					+"<td> <a style='width: 200px;height: 100px' id='proLst_gvProduct_A1_1' href='GoodsSeverlet?op=transitGoods&op1=edit&"+id+"}' > 编辑</a>&nbsp;"
	   			 	+"<a  name='Delete'  onclick='deleteOutOneTr(this,"+id+","+currentPage+","+sumPage+","+showNumber+",\"deleteOutTimeOne\")' id='gvTag_Delete_0' class='button-red button' style='width:70px;'>删除</a>"
					+"</td>"	
				+"</tr>";
					$("#myTable").append(tr);
					if(dates[9]=="1"){
						var aId="a"+(sumPage);
						//	alert("改变前"+sumPage);
							$("#"+aId+"").remove();
							$("#sumPage").val(parseInt($("#sumPage").val())-1);
						
					}			
			}
		});
		$(doDelte).parent().parent().remove();
	}else{
		return;
	}
}


function onblurgooddsType() {
	if($("#gooddsType").val()!=0){
		$("#typeSpan").text("");
		$("#typeSpan").css("color","black");
	}	
	
}
function onblurgoodsPhoto() {
	if($("#goodsPhoto").val()!=""){
		$("#imageSpan").text("");
		$("#imageSpan").css("color","black");
	}		
	
}function onblurbuyPrice() {
	if($("#buyPrice").val().trim()!=""){
		$("#buyPriceSpan").text("");
		$("#buyPriceSpan").css("color","black");
	}	
	
}function onblursalePrice() {
	if($("#salePrice").val().trim()!=""){
		$("#salePriceSpan").text("");
		$("#salePriceSpan").css("color","black");
	}	
	
}function onblurMarketprice() {
	if($("#Marketprice").val().trim()!=""){
		$("#MarketpriceSpan").text("");
		$("#MarketpriceSpan").css("color","black");
	}	
	
}function onblurnumber() {
	if($("#number").val().trim()!=""){
		$("#numberSpan").text("当库存为零的时候用户无法购买此商品");
		$("#numberSpan").css("color","black");
	}	
	
}
function onblurChange(){	
	if($("input[name='saveState']:checked").val()!=null){		
		$("#stateSpan").text("");
		$("#stateSpan").css("color","black");	
	}
}


function showErroeMessage(){
	if($("#name").val().trim()==""){
		$("#nameSpan").text("你没有填，请填");
		$("#nameSpan").css("color","red");
	}else{
		$("#nameSpan").text("最多15个字符");
		$("#nameSpan").css("color","black");
	}	
	if($("#gooddsType").val()==0){
		$("#typeSpan").text("你没有填，请填");
		$("#typeSpan").css("color","red");
	}else{
		$("#typeSpan").text("");
		$("#typeSpan").css("color","black");
	}	
	if($("#goodsPhoto").val()==""){
		$("#imageSpan").text("你没有照片");
		$("#imageSpan").css("color","red");
	}else{
		$("#imageSpan").text("");
		$("#imageSpan").css("color","black");
	}		
	if($("#buyPrice").val().trim()==""){
		$("#buyPriceSpan").text("你没有填，请填");
		$("#buyPriceSpan").css("color","red");
	}else{
		$("#buyPriceSpan").text("");
		$("#buyPriceSpan").css("color","black");
	}	
	if($("#salePrice").val().trim()==""){
		$("#salePriceSpan").text("你没有填，请填");
		$("#salePriceSpan").css("color","red");
	}else{
		$("#salePriceSpan").text("");
		$("#salePriceSpan").css("color","black");
	}	
	if($("#Marketprice").val().trim()==""){
		$("#MarketpriceSpan").text("你没有填，请填");
		$("#MarketpriceSpan").css("color","red");
	}else{
		$("#MarketpriceSpan").text("");
		$("#MarketpriceSpan").css("color","black");
	}	
	if($("#number").val().trim()==""){
		$("#numberSpan").text("你没有填，请填");
		$("#numberSpan").css("color","red");
	}else{
		$("#numberSpan").text("当库存为零的时候用户无法购买此商品");
		$("#numberSpan").css("color","black");
	}	

	if($("input[name='saveState']:checked").val()!=null){		
		$("#stateSpan").text("");
	}else{
		$("#stateSpan").text("请选择方式");
		$("#stateSpan").css("color","red");	
	}
	if($("#store").val()!=-1){
		$("#storeSpan").text("");
		}else{
			$("#storeSpan").text("请选择方式");
			$("#storeSpan").css("color","red");			
		}
	
}


function check(){
	showErroeMessage();
	if(flag==true){
		if($("#name").val().trim()!=""&&$("#gooddsType").val()!=0&&$("#goodsPhoto").val()!=""&&$("#buyPrice").val().trim()!=""&&$("#salePrice").val().trim()!=""&&$("#Marketprice").val().trim()!=""&&$("#number").val().trim()!=""&&$("#store").val()!=-1){		
			return true;
		}else{
			alert("请填写完全");
			return false;
			}		
	}else{
		alert("请填写完全");
		return false;
		}
}

function checkExceptImage(){
	showErroeMessageExceptImage();
	if(flag==true){
		if($("#name").val().trim()!=""&&$("#gooddsType").val()!=0&&$("#buyPrice").val().trim()!=""&&$("#salePrice").val().trim()!=""&&$("#Marketprice").val().trim()!=""&&$("#number").val().trim()!=""&&$("#store").val()!=-1){		
			return true;
		}else{
			alert("请填写完全");
			return false;
			}		
	}else{
		alert("请填写完全");
		return false;
		}
}

function showErroeMessageExceptImage(){
	if($("#name").val().trim()==""){
		$("#nameSpan").text("你没有填，请填");
		$("#nameSpan").css("color","red");
	}else{
		$("#nameSpan").text("最多15个字符");
		$("#nameSpan").css("color","black");
	}	
	if($("#gooddsType").val()==0){
		$("#typeSpan").text("你没有填，请填");
		$("#typeSpan").css("color","red");
	}else{
		$("#typeSpan").text("");
		$("#typeSpan").css("color","black");
	}	
	if($("#goodsPhoto").val()==""){
		$("#imageSpan").text("你没有照片");
		$("#imageSpan").css("color","red");
	}else{
		$("#imageSpan").text("");
		$("#imageSpan").css("color","black");
	}		
	if($("#buyPrice").val().trim()==""){
		$("#buyPriceSpan").text("你没有填，请填");
		$("#buyPriceSpan").css("color","red");
	}else{
		$("#buyPriceSpan").text("");
		$("#buyPriceSpan").css("color","black");
	}	
	if($("#salePrice").val().trim()==""){
		$("#salePriceSpan").text("你没有填，请填");
		$("#salePriceSpan").css("color","red");
	}else{
		$("#salePriceSpan").text("");
		$("#salePriceSpan").css("color","black");
	}	
	if($("#Marketprice").val().trim()==""){
		$("#MarketpriceSpan").text("你没有填，请填");
		$("#MarketpriceSpan").css("color","red");
	}else{
		$("#MarketpriceSpan").text("");
		$("#MarketpriceSpan").css("color","black");
	}	
	if($("#number").val().trim()==""){
		$("#numberSpan").text("你没有填，请填");
		$("#numberSpan").css("color","red");
	}else{
		$("#numberSpan").text("当库存为零的时候用户无法购买此商品");
		$("#numberSpan").css("color","black");
		
	}	

	if($("input[name='saveState']:checked").val()!=null){		
		$("#stateSpan").text("");
	}else{
		$("#stateSpan").text("请选择方式");
		$("#stateSpan").css("color","red");	
	}
	if($("#store").val()!=-1){
		$("#storeSpan").text("");
		}else{
			$("#storeSpan").text("请选择方式");
			$("#storeSpan").css("color","red");			
		}
}



function  deleteOutAll(page,sum,showNumber) {
	var judge=window.confirm("你确定批量删除吗");
	if(judge==true){
		$("input[name='checkOne']").each(function(){  
			if($(this).is(":checked"))  
			{  
				deleteOutOneTrTwo(this,$(this).val(),page,sum,showNumber,"deleteOutTimeOne")
			}  
		});  		
	}
}
function changType(){
	var id=$("#store").val();		
	var op;
	$.post("goodsAjaxServlet",{op:"changeType",storeId:id},function(date){
		var items=new Array();
		var item=new Array();
		items=date.split("-");
		$("#gooddsType").empty();
		op=$("<option>").val(0).text("请选择种类");
		op.appendTo($("#gooddsType"));
		for(var i=0;i<items.length;i++){
			var item=items[i].split(":");
			op=$("<option>").val(item[0]).text(item[1]);
			op.appendTo($("#gooddsType"));
		}
		$("#gooddsType option:last").remove();
		
	})
}


function changeState(state){
	var send="GoodsSeverlet?op=changeSaleState&chanegToState="+state;
	$("#myForm").attr('action',send);
	$("#myForm").removeAttr('onsubmit');
	$("#myForm").submit();
}
