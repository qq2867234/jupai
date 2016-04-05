var price_vaules=[];
var price_categorys=[];
$(

		function()
		{
			var residence_id=$("#residence_id").val();
			var bed_room=$("#bed_room").val();
			
			$.ajax(
					{ dataType: "json",
						url:"/GraphShow.action?getPriceGraph&residence_id="+residence_id+"&bed_room="+bed_room,
						async:false,
						 success:function(e)
					{
						$.each(e,function(i,item){
							price_vaules=e.values;
							price_categorys=e.categorys;
							
						});
					}
					}
					);
/*-------------------------小区价格分布表的配置变量---------------------------------------*/			
			var chart_price={                                           
			        chart: {                                                           
			            type: 'bar',
			            width: 400,
			            height: 250,
			            
			        },                                                                 
			        title: {                                                           
			            text: null                    
			        },                                                                 
			        subtitle: {                                                        
			            text: null                                  
			        },                                                                 
			        xAxis: {                                                           
			            categories: price_categorys,
			            title: {                                                       
			                text: '价格(万元)',                                               
			            } ,         
			        },                                                                 
			        yAxis: {                                                           
			            min: 0,                                                        
			            title: {                                                       
			                text: '比例(%)',                             
			            /*    align: 'high' */                                             
			            },                                                             
			            labels: {                                                      
			                overflow: 'justify' ,
			                formatter: function() {
		                        return this.value +'%';}
			                	
			            }                                                              
			        },                                                                 
			        tooltip: {                                                         
			            valueSuffix: '%' ,	
			        },                                                                 
			        plotOptions: {                                                     
			            bar: {                                                         
			                dataLabels: {                                              
			                  enabled:true,
			                  formatter:function(){return this.y+'%';}
			                }
			            }  ,
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
			            data: price_vaules                                   
			        }]                                                                 
			    };//chart_price
/*-------------------------小区价格分布表的配置变量---------------------------------------*/	
			$("#graph_price").highcharts(chart_price);
			
		});//$(function90{})