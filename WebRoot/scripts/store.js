$("#restore").click(function(){
//获得户型条件
var beds=new Array();
var i=0;
$("[name='Beds']:checked").each(function(){ 
beds[i]=$(this).val(); 
i++;
}) ;
for(var index=0;index<beds.length;index++){
var para=document.createElement("label");
switch(beds[index]){
case "1":
var node=document.createTextNode("-一室-");
para.appendChild(node);
break;
case "2":
var node=document.createTextNode("-二室-");
para.appendChild(node);
break;
case "3":
var node=document.createTextNode("-三室-");
para.appendChild(node);
break;
case "4":
var node=document.createTextNode("-四室-");
para.appendChild(node);
break;
case "5":
var node=document.createTextNode("-四室+-");
para.appendChild(node);
break;
}
var element=document.getElementById("clearOptions");
element.appendChild(para);
}
//获得价格范围
var lowPrice= $("#lowPrice").val();
var highPrice= $("#highPrice").val();
if(lowPrice!=""&highPrice!=""){
var para=document.createElement("label");
var node=document.createTextNode("-价格范围为："+lowPrice+"元到"+highPrice+"元-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
}
//获得输入关键字
var keyWords= $("#keyWords").val();
if(keyWords!=""){
var para=document.createElement("label");
var node=document.createTextNode("-查询关键字为："+keyWords+"-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
}
//楼型选择
  var Floor= $('input:radio[name="Floor"]:checked').val();
  switch(Floor)
  {
  case "1":
var para=document.createElement("label");
var node=document.createTextNode("-高层-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
break;
  case "2":
  var para=document.createElement("label");
var node=document.createTextNode("-多层-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
  break;
  case "3":
  var para=document.createElement("label");
var node=document.createTextNode("-联排独栋-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
  break;
  }
  
  //房龄选择
  var ages= $('input:radio[name="Ages"]:checked').val();
  switch(ages){
  case "5":
var para=document.createElement("label");
var node=document.createTextNode("-5年房龄-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
break;
  case "15":
  var para=document.createElement("label");
var node=document.createTextNode("-15年房龄-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
  break;
  case "25":
  var para=document.createElement("label");
var node=document.createTextNode("-25年房龄-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
  break;
  }
  //判断是否是学区
  var schoolNrBy=$("input:checkbox[name='schoolNrBy']:checked").val();
  if(schoolNrBy=="1"){
 var para=document.createElement("label");
var node=document.createTextNode("-属于学区-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
}
 //判断是否是邻近地铁
  var subwayNrBy=$("input:checkbox[name='subwayNrBy']:checked").val();
  if(subwayNrBy=="1"){
    var para=document.createElement("label");
var node=document.createTextNode("-邻近地铁-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
}

//判断是否是一手
  var New=$("input:checkbox[name='New']:checked").val();
  if(New=="1"){
    var para=document.createElement("label");
var node=document.createTextNode("-一手-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
}
//判断是否是金装
  var Hardcover=$("input:checkbox[name='Hardcover']:checked").val();
  if(Hardcover=="1"){
    var para=document.createElement("label");
var node=document.createTextNode("-精装-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
}
	});
	$("#clear").click(function(){
	$( "#clearOptions" ).empty(); 
    $(':input','#myForm')  
 .not(':button, :submit, :reset, :hidden')  
 .val('')  
 .removeAttr('checked')  
 .removeAttr('selected');  
	});