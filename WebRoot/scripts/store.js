$("#restore").click(function(){
//��û�������
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
var node=document.createTextNode("-һ��-");
para.appendChild(node);
break;
case "2":
var node=document.createTextNode("-����-");
para.appendChild(node);
break;
case "3":
var node=document.createTextNode("-����-");
para.appendChild(node);
break;
case "4":
var node=document.createTextNode("-����-");
para.appendChild(node);
break;
case "5":
var node=document.createTextNode("-����+-");
para.appendChild(node);
break;
}
var element=document.getElementById("clearOptions");
element.appendChild(para);
}
//��ü۸�Χ
var lowPrice= $("#lowPrice").val();
var highPrice= $("#highPrice").val();
if(lowPrice!=""&highPrice!=""){
var para=document.createElement("label");
var node=document.createTextNode("-�۸�ΧΪ��"+lowPrice+"Ԫ��"+highPrice+"Ԫ-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
}
//�������ؼ���
var keyWords= $("#keyWords").val();
if(keyWords!=""){
var para=document.createElement("label");
var node=document.createTextNode("-��ѯ�ؼ���Ϊ��"+keyWords+"-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
}
//¥��ѡ��
  var Floor= $('input:radio[name="Floor"]:checked').val();
  switch(Floor)
  {
  case "1":
var para=document.createElement("label");
var node=document.createTextNode("-�߲�-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
break;
  case "2":
  var para=document.createElement("label");
var node=document.createTextNode("-���-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
  break;
  case "3":
  var para=document.createElement("label");
var node=document.createTextNode("-���Ŷ���-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
  break;
  }
  
  //����ѡ��
  var ages= $('input:radio[name="Ages"]:checked').val();
  switch(ages){
  case "5":
var para=document.createElement("label");
var node=document.createTextNode("-5�귿��-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
break;
  case "15":
  var para=document.createElement("label");
var node=document.createTextNode("-15�귿��-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
  break;
  case "25":
  var para=document.createElement("label");
var node=document.createTextNode("-25�귿��-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
  break;
  }
  //�ж��Ƿ���ѧ��
  var schoolNrBy=$("input:checkbox[name='schoolNrBy']:checked").val();
  if(schoolNrBy=="1"){
 var para=document.createElement("label");
var node=document.createTextNode("-����ѧ��-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
}
 //�ж��Ƿ����ڽ�����
  var subwayNrBy=$("input:checkbox[name='subwayNrBy']:checked").val();
  if(subwayNrBy=="1"){
    var para=document.createElement("label");
var node=document.createTextNode("-�ڽ�����-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
}

//�ж��Ƿ���һ��
  var New=$("input:checkbox[name='New']:checked").val();
  if(New=="1"){
    var para=document.createElement("label");
var node=document.createTextNode("-һ��-");
para.appendChild(node);
var element=document.getElementById("clearOptions");
element.appendChild(para);
}
//�ж��Ƿ��ǽ�װ
  var Hardcover=$("input:checkbox[name='Hardcover']:checked").val();
  if(Hardcover=="1"){
    var para=document.createElement("label");
var node=document.createTextNode("-��װ-");
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