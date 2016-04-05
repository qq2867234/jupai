var percents=[];
var prices=[];
var xArray=[];
var price_percent=[];
var price_categorys=[];
var x_data=[10,12,13];
var picData=[];
var z4Adata = [{ name:'中位价1300万元',y:58,color:'red'},{ name:'1300万元.',y:40,color:'red'},{ name:'1300万元',y:58,color:'red'}];


var url_list='/GraphPrice.action?getlist';



$(function(){
	$(".graphprice").eq(0).highcharts(getdate(picData));
	/*	$.ajax({
		dataType:"json",
		url:url_list,
		async:false,
		data:{
			residence_id:3358,
			bed_room:3
		},
			success:function(e){
		
			$.each(e.beans,function(j,bean){
				$(".area_type").eq(i).text(bean.floor_area);
			for(var i=0;i<bean.percents.length;i++)
				{
				var tempt={};
			if(bean.prices[i]==bean.median_price){
				tempt.x=bean.xarrays[i];
				tempt.y=bean.percents[i];
				tempt.color='red';
				tempt.name='中位价 '+bean.prices[i]+'万元';
			}
			else if(i==0){
				tempt.x=bean.xarrays[i];
				tempt.y=bean.percents[i];
				tempt.name='最低价 '+bean.prices[i]+'万元';
			}
			else if(i==bean.percents.length-1)
				{
				tempt.x=bean.xarrays[i];
				tempt.y=bean.percents[i];
				tempt.name='最高价  '+bean.prices[i]+'万元';
				}
			else {
				tempt.x=bean.xarrays[i];
				tempt.y=bean.percents[i];
				tempt.name=bean.prices[i]+'万元';
				
			}
			picData.push(tempt);
			}//for
			$(".graphprice").eq(j).highcharts(getdate(picData));
			picData=[];
			});	
			
		}
		
	});
	
	*/
	
	function getdate(picData){
		/*-------------------------小区面积分布图的配置变量---------------------------------------*/			
		var chart_area={                                           
		        chart: {                                                           
		           type: 'column', 
		        /*	type: 'areaspline',*/
		            width: 400,
		            height: 250,
		            animation:false
		        },                                                                 
		        title: {                                                           
		            text: '测试图列'                   
		        },                                                                 
		        subtitle: {                                                        
		            text: null                                 
		        },                                                                 
		        xAxis: {                                                           	   
		        	categories: [],
		            title: {                                                       
		                text: '价格(万元)',                                               
		            } ,  
		            /*minPadding:0.25,*/
		            showEmpty: false,
		          /*  min:-2,
		            max:102,*/
		            tickmarkPlacement: 'on',
		            tickLength: 0,
		          
		            labels:{
		            	rotation:-70,
		            	formatter: function() {
		            		if(String(this.value).substring(0,1)=='最'||String(this.value).substring(0,1)=='中')return String(this.value).substring(3).replace('万元','');
		            		else  if(this.value.indexOf('.')>0) return
		            		else  return this.value.replace('万元','');
		            		/*return this.value;*/
		                    },
		                    style: {
			                     fontSize: '10px',
			                     fontWeight: 'bold',
			                      fontFamily: 'Verdana, sans-serif',			                      
			                  },
		            },  
		        
				/*  plotBands: [{ // visualize the weekend from: 4.5, to: 4.5,
				  color: 'rgba(68, 170, 213, .2)' }]*/
				 
		            
		        },                                                                 
		        yAxis: {                                                           
		          
		            title: {                                                       
		                text: '比例(%)',                                                                      
		            },                                                             
		            labels: {                                                      
		                overflow: 'justify' ,
		                formatter: function() {
		                    return this.value +'%';
		                    
		                }
		                	
		            } ,
		            max:100
		        },                                                                 
		        tooltip: {                                                         
		            valueSuffix: '%' ,	
		        },                                                                 
		        plotOptions: {                                                     
		            bar: {                                                         
		                dataLabels: {                                              
		                  enabled:false,
		                  formatter:function(){return this.y+'%';},
		                }
		            }  ,
		         column: {
		        	 dataLabels:{
		        		 enabled:true,
		        		 
		        		  style: {
		                      fontSize: '12px',
		                      fontFamily: 'Verdana, sans-serif',
		                      
		                  },
		        		 formatter:function(){
		        			if(this.key.indexOf('.')>0)return
		        			else return this.y+'%'
		        			 },
		        	 }/*,
		            	        pointPadding: 0.5,
		            	        borderWidth: 0,
		            	        pointWidth: 5,*/
		            	    },
		            areaspline: {
		                fillOpacity: 0.3,
		                /*color:'red',*/
		                lineWidth:1,
		                marker:{
		                	 enabled: true,
		                	 radius:2,
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
		            href:'http://www.zilens.com',
		        },                                                                 
		        series: [{                                                         
		            name: '比例',                                             
		            data: z4Adata, 	          
		 
		        }]  
		        
		    };// chart_price
		/*-------------------------小区面积分布图的配置变量---------------------------------------*/	
		return chart_area;
		
	}
	
	
});
