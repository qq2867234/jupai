function stringToDate(DateStr)  
{   
  
    var converted = Date.parse(DateStr);  
    var myDate = new Date(converted);  
    if (isNaN(myDate))  
    {   
        //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
        var arys= DateStr.split('-');  
        myDate = new Date(arys[0],--arys[1],arys[2]);  
    }  
    return myDate;  
}  

function addDate(date,days){
	var d=new Date(date.replace(/-/g,"/")); 
    d.setDate(d.getDate()+days); 
    var m=d.getMonth()+1;
    if(m<10){
    	m="0"+m;
    }
    var day=d.getDate();
    if(day<10){
    	day="0"+day;
    }
    return d.getFullYear()+'-'+m+'-'+day; 
}

function minusDate(date1,date2){
	var d1=new Date(date1.replace(/-/g,"/")); 
	var d2=new Date(date2.replace(/-/g,"/")); 
	return (d2.getTime() - d1.getTime())/(24 * 60 * 60 * 1000);
}
