$(function(){
	if(getUrlInfo("type")=="1"){
		$("#buyLayout").click();
		$("#buyPange").click();
		changeType(1);
	}else if(getUrlInfo("type")=="2"){
		$("#rentLayout").click();
		$("#rentPange").click();
		changeType(2);
	}
	$('table tr:even').css('background','#f3f3f3');
	$("#saleOrRentPage").val(getUrlInfo("type"));
	$("#saleOrRentPage").selectmenu("refresh");
	if(sale_rooms.length > 0||rent_rooms.length > 0){
		if(sale_rooms.length==0){
			$("#buyPange").remove();
		}
		if(rent_rooms.length==0){
			$("#rentPange").remove();
		}
		initRoomPic();
	}else{
		$("#rs").remove();
	}
	
	if(getCookieValue("Prole")==6||getCookieValue("Prole")==7){
		$("#askLink").attr("href","/mobileZ/mobileAsk/professionIndex.html");
	}else{
		$("#askLink").attr("href","/mobileZ/mobileAsk/answerAndQuestion.html?keyword=?&role=?");
	}
	
	$("#surround li").first().addClass("on").siblings().removeClass("on");
	$("ul.item").hide().first().show();
	$("#surround li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		$(".roomList a").hide();
		$("ul.item").css("height","auto").hide()
			.eq($(this).index()).show();
		});
});

function getCookieValue(name){   
	var name = escape(name);   
	//读cookie属性，这将返回文档的所有cookie   
	var allcookies = document.cookie;          
	//查找名为name的cookie的开始位置   
	name += "=";   
	var pos = allcookies.indexOf(name);       
	//如果找到了具有该名字的cookie，那么提取并使用它的值   
	if (pos != -1){                                     //如果pos值为-1则说明搜索"version="失败   
		var start = pos + name.length;                  //cookie值开始的位置   
		var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置   
		if (end == -1) end = allcookies.length;         //如果end值为-1说明cookie列表里只有一个cookie   
			var value = allcookies.substring(start,end);  	//提取cookie的值   
		    return unescape(value);                         //对它解码         
		}      
	else return "";                                     //搜索失败，返回空字符串   
}

//新的分布图入口
function initRoomPic(){
	if(getUrlInfo("type")=="1"){
		if(rent_rooms.length > 0){
			addSaleRooms();
		}		
	}else if(getUrlInfo("type")=="2"){
		if(rent_rooms.length > 0){
			addRentRooms();
		}
	}
}

function changeTypePage(){
	if($("#changeTypePages").val()=="1"){
		addSaleRooms();
	}else if($("#changeTypePages").val()=="2"){
		addRentRooms();
	}
}

function changeType(types){
	$("#lays").remove();
	$("#layoutMonth").remove();
	$.ajax({
		url:"/MobileResidencePage.action?getResidenceLayout",
		async:false,
		type:"POST",
		data:{
			residenceId:residenceId,
			type:types,
			isNew:isNew
		}, 		
		dataType: "json",
		success:function(data) {
			var layouts = "<table id='lays'>";
			if(isNew==1){
				$("#layoutTable").append("<p id='layoutMonth'>常见户型(本月)<p>");
			}else{
				$("#layoutTable").append("<p id='layoutMonth'>常见户型("+data.layoutData[0].time+")<p>");
			}
			if(types=="1"){
				layouts += "<tr><td>户型</td><td>面积</td><td class='priceTd'>均价(元/平)</td><td>中位价(万)</td></tr>";

				var bedRooms = "";
				var floorAreas = "";
				var unitPrices = "";
				var totalPriceMedians = "";
				var rentalPriceMedians = "";
				$.each(data.layoutData,function(index, item){
					
					if(item.bedRoom==undefined||item.bedRoom==0){
						bedRooms = "-";
					}else{
						bedRooms = item.bedRoom+"居";
					}
					if(item.floorArea==undefined||item.floorArea==0){
						floorAreas = "-";
					}else{
						floorAreas = item.floorArea;
					}
					if(item.unitPrice==undefined||item.unitPrice==0){
						unitPrices = "-";
					}else{
						unitPrices = item.unitPrice;
					}
					if(item.totalPriceMedian==undefined||item.totalPriceMedian==0){
						totalPriceMedians = "-";
					}else{
						totalPriceMedians = item.totalPriceMedian;
					}
					layouts +="<tr><td>"+bedRooms+"</td><td>"+floorAreas+"</td><td class='priceTd'>"+unitPrices+"</td><td>"+totalPriceMedians+"</td></tr>";
				});
				layouts +="</table>";
			}else if(types=="2"){
				layouts += "<tr><td>户型</td><td>面积</td><td>中位价(元/月)</td></tr>";
				$.each(data.layoutData,function(index, item){
					if(item.bedRoom==undefined||item.bedRoom==0){
						bedRooms = "-";
					}else{
						bedRooms = item.bedRoom+"居";
					}
					if(item.floorArea==undefined||item.floorArea==0){
						floorAreas = "-";
					}else{
						floorAreas = item.floorArea;
					}
					if(item.rentalPriceMedian==undefined||item.rentalPriceMedian==0){
						rentalPriceMedians = "-";
					}else{
						rentalPriceMedians = item.rentalPriceMedian;
					}
					layouts +="<tr><td>"+bedRooms+"</td><td>"+floorAreas+"</td><td class='priceTd'>"+rentalPriceMedians+"</td></tr>";
				});
				layouts +="</table>";
			}
			$("#layoutTable").append(layouts);
			$('table tr:even').css('background','#f3f3f3');
		},error: function (){
		
		} 
	});
}


function addSaleRooms(){
	if (sale_rooms.length > 0){
		var content="";
		$("#numAndmeters").empty();
		for(var i=0;i<sale_rooms.length;i++){
			var simpleArea;
			eval("simpleArea="+"s"+sale_rooms[i]+"Areas");	
			if(simpleArea.length>0){		
				content+="<optgroup label="+sale_rooms[i]+"居>";
				for(var j=0;j<simpleArea.length;j++){
					content += "<option value="+sale_rooms[i]+";"+j+">"+simpleArea[j]+"平米</option>";
				}
				content +="</optgroup>";
			}	
		}
		$("#numAndmeters").append(content);
		$("#numAndmeters").selectmenu("refresh");
		/*var areaArray ;
		eval("areaArray="+"s"+$('#roomSelect').val()+"Areas");
		
		var areAs ="";
		$("#AreaSelect").empty();
		for(var i=0;i<areaArray.length;i++){
			areAs += "<option value="+i+">"+areaArray[i]+"平米</option>";
		}
		$("#AreaSelect").append(areAs);
		$("#AreaSelect").selectmenu("refresh");*/
		//getPictrue(Number($("#roomSelect").val()),1,Number($("#AreaSelect").val()));
		getPictrue(Number($("#numAndmeters").val().split(";")[0]),1,Number($("#numAndmeters").val().split(";")[1]));
		
		$("#numAndmeters").bind("change", function(){
			//getPictrue(Number($("#roomSelect").val()),1,Number($("#AreaSelect").val()));
			getPictrue(Number($("#numAndmeters").val().split(";")[0]),1,Number($("#numAndmeters").val().split(";")[1]));
		});
		/*$("#roomSelect").bind("change", function(){
			var areaArrays ;
			eval("areaArrays="+"s"+$('#roomSelect').val()+"Areas");
			var areAss ="";
			$("#AreaSelect").empty();
			for(var i=0;i<areaArrays.length;i++){
				areAss += "<option value="+i+">"+areaArrays[i]+"平米</option>";
			}
			$("#AreaSelect").append(areAss);
			$("#AreaSelect").selectmenu("refresh");
			getPictrue(Number($("#roomSelect").val()),1,Number($("#AreaSelect").val()));
		});*/
	}
}

function addRentRooms(){
	if (rent_rooms.length > 0){
		var content="";
		$("#numAndmeters").empty();
		for(var i=0;i<rent_rooms.length;i++){
			var simpleArea;
			eval("simpleArea="+"r"+rent_rooms[i]+"Areas");
			if(simpleArea.length>0){
				content += "<optgroup label="+rent_rooms[i]+"居>";
				for(var j=0;j<simpleArea.length;j++){
					content += "<option onchange='' value="+rent_rooms[i]+";"+j+">"+simpleArea[j]+"平米</option>";
				}
				content += "</optgroup>";
			}
		}
		$("#numAndmeters").append(content);
		$("#numAndmeters").selectmenu("refresh");
		getPictrue(Number($("#numAndmeters").val().split(";")[0]),2,Number($("#numAndmeters").val().split(";")[1]));
		
		$("#numAndmeters").bind("change", function(){
			getPictrue(Number($("#numAndmeters").val().split(";")[0]),2,Number($("#numAndmeters").val().split(";")[1]));
		});
		/*$("#roomSelect").bind("change", function(){
			var areaArrays;
			eval("areaArrays="+"r"+$('#roomSelect').val()+"Areas");
			var areAss ="";
			$("#AreaSelect").empty();
			for(var i=0;i<areaArrays.length;i++){
				areAss += "<option value="+i+">"+areaArrays[i]+"平米</option>";
			}
			$("#AreaSelect").append(areAss);
			$("#AreaSelect").selectmenu("refresh");
			getPictrue(Number($("#roomSelect").val()),1,Number($("#AreaSelect").val()));
		});*/
	}
}

function getPictrue(bed_room,houseType,index){	
	if(houseType==1){	
		var pic1;
		if(index==0){
			eval("if (s"+bed_room+"Adata!==undefined)pic1=s"+ bed_room + "Adata;");
		}else if(index==1){
			eval("if (s"+bed_room+"Bdata!==undefined)pic1=s"+ bed_room + "Bdata;");
		}else if(index==2){
			eval("if (s"+bed_room+"Cdata!==undefined)pic1=s"+ bed_room + "Cdata;");
		}else if(index==3){
			eval("if (s"+bed_room+"Ddata!==undefined)pic1=s"+ bed_room + "Ddata;");
		}
		if(pic1!=undefined&&pic1.length>0){
			var title=bed_room+"居   "+eval("s"+bed_room+"Areas["+index+"]")+"平米";
			drawPictrue(pic1,1,0,title);	
		}
	}
	if(houseType==2){
		var pic1;
		if(index==0){
			eval("if (r"+bed_room+"Adata!==undefined)pic1=r"+ bed_room + "Adata;");
		}else if(index==1){
			eval("if (r"+bed_room+"Bdata!==undefined)pic1=r"+ bed_room + "Bdata;");
		}else if(index==2){
			eval("if (r"+bed_room+"Cdata!==undefined)pic1=r"+ bed_room + "Cdata;");
		}else if(index==3){
			eval("if (r"+bed_room+"Ddata!==undefined)pic1=r"+ bed_room + "Ddata;");
		}
		if(pic1!=undefined&&pic1.length>0){
			var title=bed_room+"居  "+eval("r"+bed_room+"Areas["+index+"]")+"平米";
			drawPictrue(pic1,2,0,title);	
		}
	}
}

function showAreaInit() {
	var target = $("#roomSelect option:first").text();
	room_index = Number(target.substring(0, 1));
	if (room_index > 0) {
		appendBindArea(room_index);
		SelectPictrue(room_index, 0);
	}
}


function appendBindArea(room) {
	$("#AreaSelect").empty();
	var target_areas;
	eval("target_areas= z" + room + "Areas;");
	$("#AreaSelect").empty();
	var tempt = '';
	for ( var i = 0; i < target_areas.length; i++) {
			tempt += "<option>" + target_areas[i] + "平米</option>";
	}
	$("#AreaSelect").append(tempt);
	$("#AreaSelect option").eq(0).addClass("on");
	$("#AreaSelect").bind("change", function() {	
		$(this).addClass("on").siblings().removeClass("on");
		var index = $("#AreaSelect option").index($("#AreaSelect").find("option:selected"));
		SelectPictrue(room_index, index);
	});
	$("#AreaSelect").selectmenu("refresh");
}

function SelectPictrue(bed_room, index) {
	var zd;
	if (index == 0) {
		eval("zd=z" + bed_room + "Adata;");
		drawPictrue(zd);
	} else if (index == 1) {
		eval("zd=z" + bed_room + "Bdata;");
		drawPictrue(zd);
	} else if (index == 2) {
		eval("zd=z" + bed_room + "Cdata;");
		drawPictrue(zd);
	} else if (index == 3) {
		eval("zd=z" + bed_room + "Ddata;");
		drawPictrue(zd);
	}
}

function fnPicMove(showBox, picStep) {
	var myIndex;
	for ( var i = 0; i < $(showBox).length; i++) {
		if ($(showBox).eq(i).is(":visible")) {
			myIndex = i;
			break;
		}
	}
	if (myIndex + picStep > $(showBox).length - 1) {
		$(showBox).eq(0).fadeIn(1400);
		$(showBox).eq(myIndex).fadeOut(700);
	} else {
		$(showBox).eq(myIndex + picStep).fadeIn(1400);
		$(showBox).eq(myIndex).fadeOut(700);
	}
}

function getPictrueData(bed_room) {
	if (bed_room == 1) {
		for ( var i = 1; i <= 4; i++) {
			price_categorys = [];
			price_vaules = [];
			if (i == 1) {
				price_categorys = z1Ac;
				price_vaules = z1Ap;
				drawPictrue(price_categorys, price_vaules, i);
			} else if (i == 2) {
				price_categorys = z1Bc;
				price_vaules = z1Bp;
				drawPictrue(price_categorys, price_vaules, i);
			} else if (i == 3) {
				price_categorys = z1Cc;
				price_vaules = z1Cp;
				drawPictrue(price_categorys, price_vaules, i);
			} else if (i == 4) {
				price_categorys = z1Dc;
				price_vaules = z1Dp;
				drawPictrue(price_categorys, price_vaules, i);
			}
		}
	}
}

function drawPictrue(picData,housetype,index,title) {
	if(picData.length>0){
		 var  xTitle=housetype==1?'价格(万元)':'价格(元/月)';
	var chart_area={
	        chart: {
	        	type: 'column',
	            width: $("body").width()-15,
	            height: 250
	        },
	        title: {
	            text: title
	        },
	        subtitle: {
	            text: null
	        },
	        xAxis: {
	        	categories: [],
	            title: {
	                text: xTitle
	            } ,
	            showEmpty: false,
	            tickmarkPlacement: 'on',
	            tickLength: 0,
	            labels:{
	            	rotation:-70,
	            	formatter: function() {
	            		
	            		if(String(this.value).substring(0,1)=='最'||String(this.value).substring(0,1)=='中')return String(this.value).substring(3).replace('万元','').replace('元','');
	            		else  return this.value.replace('万元','').replace('元','');
	                    
	            	},
	                    style: {
		                     fontSize: '10px',
		                     fontWeight: 'bold',
		                      fontFamily: 'Verdana, sans-serif'                     
		                  }
	            }
	        },                                                    
	        yAxis: {
	            title: {                                                  
	                text: '比例(%)'                                                                     
	            },                                                             
	            labels: {                                                      
	                overflow: 'justify' ,
	                formatter: function() {
	                    return this.value +'%';
	                }
	            } 
	        },                                                                 
	        tooltip: {                                                         
	            valueSuffix: '%' 
	        },                                                                 
	        plotOptions: {                                                     
	            bar: {                                                         
	                dataLabels: {                                              
	                  enabled:false,
	                  formatter:function(){return this.y+'%';
	                  }
	                }
	            }  ,
	         column: {
	        	 dataLabels:{
	        		 enabled:true,
	        		  style: {
	                      fontSize: '10px',
	                      fontFamily: 'Verdana, sans-serif'   
	                  },
	        		 formatter:function(){
	        			
		        			return this.y+'%'
	        			 }
	        	 }/*,
	            	 pointPadding: 0.5,
	            	 borderWidth: 0,
	            	 pointWidth: 3*/
	            	    },
	            areaspline: {
	                fillOpacity: 0.3,
	                /* color:'red', */
	                lineWidth:1,
	                marker:{
	                	 enabled: true,
	                	 radius:2
	                }
	            }
	        },                                                                 
	        legend: {                                                          
	            layout: 'vertical',                                            
	            align: 'right',                                                
	            verticalAlign: 'top',                                          
	            x: -40,                                                        
	            y: 100,                                                        
	            floating: true,                                                
	            borderWidth: 1,                                                
	            backgroundColor: '#FFFFFF',                                    
	            shadow: true  ,
	            enabled:false      
	        },                                                                 
	        credits: {                                                         
	            enabled:false,
	            text:'www.zilens.com',
	            href:'http://www.zilens.com'
	        },                                                                 
	        series: [{                                                         
	            name: '比例',                                             
	            data: picData
	        }]    
	    };// chart_price
		if(housetype==1){
			$("#roomChart .show").eq(index).highcharts(chart_area);
		}else if(housetype==2){
			$("#roomChart .show").eq(index).highcharts(chart_area);
		}
	}
}

function changAreasSelct(bed_room) {
	switch (bed_room) {
	case 1:
		var str = getAreaStr(z1Areas);
		$("#AreaSelect").html(str);
		break;
	case 2:
		var str = getAreaStr(z2Areas);
		$("#AreaSelect").html(str);
		break;
	case 3:
		var str = getAreaStr(z3Areas);
		$("#AreaSelect").html(str);
		break;
	case 4:
		var str = getAreaStr(z4Areas);
		$("#AreaSelect").html(str);
		break;
	case 5:
		var str = getAreaStr(z5Areas);
		$("#AreaSelect").html(str);
		break;
	}
}

function getAreaStr(areasArray) {
	var str = '<option >请选择面积</option>';
	for ( var i = 0; i < areasArray.length; i++) {
		str = str + "<option >" + areasArray[i] + "平米</option>"
	}
	return str;
}

function getUrlInfo(name){
	if(window.location.href.split(""+name+"=")!=-1){
		var url = window.location.href.split(""+name+"=")[1];
		if(url.split("&")!=-1){
			url = url.split("&")[0];
		}
		return url;
	}else{
		return null;
	}
}