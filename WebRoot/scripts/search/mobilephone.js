//采用数组缓存的方式来进行翻页操作
var res_id=[];
var res_name=[];
var res_unitprice=[];
var res_year=[];
var res_rooms=[];
var res_url=[];
var res_longitude=[];
var res_latitude=[];
var res_address=[];
var res_defaultPic=[];
var res_bus=[];
var res_metro=[];
var res_school=[];
var res_shop=[];
var res_market=[];
var res_hospital=[];
//从库中已取出的记录条数
var real_number;

//取出的
var resObgs=[];
//第一次请求的地图边界
var bounds;


//从数据库中取出get_number条数据
function getResidenceDate()
{	
	//if(request_count==1)bounds=map.getBounds();
	$("#listPan").empty();
	$("#listPan").append("<div class=\"wait\"></div>");
	setSearchOptions();
    if(bedroom === undefined)
    	bedroom="";
    else
    	{
	  bedroom=bedroom.replace(/\D/g,"");
    	}
	keywords=formatKeyword(keywords);
	$("#keywords").val(keywords);
	rent=formatRent(rent);
	 $("#price").val(rent);
	 if(houseType==1)	var url= "/ResidenceSaleSearch.action?getResidenceSaleSearch";
	 else if(houseType==2)var url="/ResidenceSaleSearch.action?getResidenceRentSearch";
	$.ajaxSettings.async = false;
	$.getJSON(url,
			{
		budget:rent,
		keywords:encodeURIComponent(keywords),
		bedRoom:bedroom,
		//lowLatitude:bounds.getSouthWest().lat,
		//lowLongitude:bounds.getSouthWest().lng,
		//highLongitude:bounds.getNorthEast().lng,
		//highLatitude:bounds.getNorthEast().lat,
		currentCount:request_count,
		isNew:newTag
			},
			function(e){
				//进行了第二次搜索的时候地图重置
				if(e.flag==1){
					var point = new BMap.Point(116.404, 39.915); 
					map.centerAndZoom(point,10);
				}
				
				if(request_count==1){
				
					//第一次请求的时候计算出最大的可能页数
					max_page=Math.ceil(e.rows/20);
					$("#residenceCurrPage").text(1);
					$("#ressidenceTotalPage").text(max_page);
					//如果第一次请求的库中的记录数要比每次约定请求的数量大
					if(e.rows>parseInt(rowLimit)){
						totalPage=Math.ceil(parseInt(rowLimit)/20);real_number=parseInt(rowLimit);}//if(e.rows>rowLimit)
					else {
						totalPage=Math.ceil(e.rows/20);real_number=e.rows;}//else 
				}//if(request_count==0)
				else if(request_count!=1){
					//接下来一次请求后，如果库中还有数据未取出来
					if(e.rows>(parseInt(rowLimit)+parseInt(real_number))){
						//累计取出的数量
						real_number=parseInt(real_number)+parseInt(rowLimit);
						//累计已经取到的页数
						totalPage=parseInt(totalPage)+Math.ceil(parseInt(rowLimit)/20);
						
					}//if(e.rows>rowLimit+real_number)
					//下一次请求会取出最后的数据
					else{
						
						//累计已经取到的页数
						totalPage=parseInt(totalPage)+Math.ceil((e.rows-parseInt(real_number))/20);
						//累计取出的数量
						real_number=e.rows;		
					}//else
					
				}//else if(request_count!=1)
				
					
				$("#listPan").empty();
				/*readyArray(e.ResidenceSaleSearch);*/	
				readyObj(e.ResidenceSaleSearch);
			}//function(e)
			
	);
	


}//getResidenceDate()


//将取出的数据放在对象数组中
function readyObj(data)
{
	if(request_count==1)resObgs=[];
	  $.each(data, 
				function(i,item)
				{
		  		resObgs.push(item);
		  
				}//funtion(i,item)
	  );//each()
	
/*alert(resObgs.length);*/

}//readyObj()


//将取出的数据放在数组中保存
function readyArray(data)
{
	 res_id=[];
	 res_name=[];
	 res_unitprice=[];
	 res_year=[];
	 res_rooms=[];
	 res_url=[];
	 res_longitude=[];
	 res_latitude=[];
	 res_address=[];
	 res_defaultPic=[];
	 res_bus=[];
	 res_metro=[];
	 res_school=[];
	 res_shop=[];
	 res_market=[];
	 res_hospital=[];
	   $.each(data, 
		function(i,item)
		{
		   res_id.push(item.residenceId);
		   res_name.push(item.residenceName);
		   res_unitprice.push(item.unitPriceall);
		   res_year.push(item.builtYear);
		   res_url.push(item.url);
		   res_longitude.push(item.longitude);
		   res_latitude.push(item.latitude);
		   res_address.push(item.address);
		   res_defaultPic.push(item.defaultPic);
		   res_bus.push(item.bus);
		   res_metro.push(item.metro);
		   res_school.push(item.school);
		   res_shop.push(item.shop);
		   res_market.push(item.market);
		   res_hospital.push(item.hospital);
		   if(houseType==1)res_rooms.push(item.saleSearchList);
		   else if(houseType==2)res_rooms.push(item.rentSearchList);
		}//function(i,item)
	   
	   );
}//readyArray(data)



//取出当前页所需要的数据，显示数据，并添加相应的事件
function showcurContent(current_page)
{
	$("#listPan").empty();
	current_obj=[];
	//当前页中起始数组的索引
	var start_index=(current_page-1)*20;
	var end_index;
	if(current_page<max_page)end_index=start_index+20;
	else if(current_page==max_page)end_index=start_index+(parseInt(real_number)-start_index);
	
	for(var i=start_index;i<end_index;i++){
		current_obj.push(resObgs[i]);		
		residence="";
		var builtYear;
		  if(resObgs[i].builtYear=== undefined)
			  builtYear="";
		  else
			  builtYear=resObgs[i].builtYear+'年建 ';
		  if(houseType==1)
			  {
			  var unitPriceall;
			  if(resObgs[i].unitPriceall==0)unitPriceall="<span>";
			  else unitPriceall="<span>均价:"+resObgs[i].unitPriceall+"元/平,";
			  }
		  else  unitPriceall="<span>"; 
		residence=residence+"<dl class='clearfix'>"
   		+"<dt><img src='"+resObgs[i].defaultPic+"' /></dt>"
   		+"<dd class='community clearfix'>"
   		+"<a href='"+resObgs[i].url+"'>"+resObgs[i].residenceName+"</a>"
   		+unitPriceall+"</span><a class='broker' alt='租售服务' href='/residencebroker/"+resObgs[i].residenceId+houseType+"'></a>"
   		+"</dd> " 
		    +"<dd class='household clearfix'>";
		if(houseType==1)	
		{
	  $.each(resObgs[i].saleSearchList, function(j,item)
					  {
if(!(item.totalPricelow=== undefined))
				  residence=residence+
				  "<a href='/home/"+item.residenceId+houseType+item.bedRoom+"'><span class='h"+item.bedRoom+"' title='总价范围"+item.totalPricelow+"-"+item.totalPricehigh+"万,中间价"+item.totalPrice50+"万'>"+item.totalPricelow+"万</span></a>";
		  } );
	  }//if(houseType==1)
		else
		{
		$.each(resObgs[i].rentSearchList, function(j,item)
				  {
if(!(item.totalPricelow=== undefined))
			  residence=residence+
			  "<a href='/home/"+item.residenceId+houseType+item.bedRoom+"'><span class='h"+item.bedRoom+"' title='总价范围"+item.totalPricelow+"-"+item.totalPricehigh+"元,中间价"+item.totalPrice50+"元'>"+item.totalPricelow+"元</span></a>";
	  } );
		}//else{}
		if(residence.length>0)
			  residence+="</dd></dl>";  				
		if(residence.length>0)
	  $("#listPan").append(residence);
  	//鼠标进去
  			$("#listPan").children().eq(result_index).bind("mouseenter" ,function(){
  				current_index=$("#listPan dl").index(this);
  				openWindow();
  				/*var markobj=searchMarker(current_longitude[current_index],current_latitude[index]);
  				changIcon(markobj);*/
  				});
  	//鼠标离开
  		/*	$("#listPan").children().eq(result_index).bind("mouseleave" ,function(){
  				current_index=$("#listPan dl").index(this);
  				var markobj=searchMarker(current_longitude[current_index],current_latitude[index]);
  				restoreIcon(markobj);
  				});*/
  	result_index=result_index+1;
	}//for(var i=start_index;i<start_index+20;i++)
	result_index=0;
	/*addCustomLayer();*/
	showmarkets();
	 if($("#listPan").width()>600)
	  {
		  $("#listPan").find("dl").width(650).find(".household").addClass("household2");
	  }
}
//在地图上显示当前页的图片标识
function showmarkets(){	
	map.clearOverlays(); 
	for(var i=0;i<current_obj.length;i++){
		var myIcon = new BMap.Icon("/images/public/map/bizcircle.png", new BMap.Size(28, 31), {
			  /* anchor: new BMap.Size(-30, 40)*/
		});
		var point=new BMap.Point(current_obj[i].longitude,current_obj[i].latitude);
		var marker = new BMap.Marker(point, {icon: myIcon});
			map.addOverlay(marker);
				}
		}



