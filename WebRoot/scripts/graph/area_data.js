var area_vaules=[];
var area_categorys=[];
$(

		function()
		{
			var residence_id=$("#residence_id").val();
			var bed_room=$("#bed_room").val();
	
			
			$.ajax(
					{ dataType: "json",
						url:"/GraphShow.action?getAreaGraph&residence_id="+residence_id+"&bed_room="+bed_room,
						async:false,
						 success:function(e)
					{
						$.each(e,function(i,item){
							area_vaules=e.values;
							area_categorys=e.categorys;
							
						});
					}
					}
					);
/*-------------------------小区面积分布图的配置变量---------------------------------------*/			
			var chart_area={                                           
			        chart: {                                                           
			            type: 'bar',
			            width: 400,
			            height: 250
			        },                                                                 
			        title: {                                                           
			            text: null                    
			        },                                                                 
			        subtitle: {                                                        
			            text: null                                  
			        },                                                                 
			        xAxis: {                                                           
			            categories: area_categorys,
			            title: {                                                       
			                text: '面积(平米)',                                               
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
			                  formatter:function(){return this.y+'%';},
			                }
			            }  ,
			 /*           column: {
			            	        pointPadding: 0.05,
			            	        borderWidth: 0,
			            	        pointWidth: 10
			            	    }*/

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
			            data: area_vaules                                   
			        }]                                                                 
			    };//chart_price
/*-------------------------小区面积分布图的配置变量---------------------------------------*/	
			$("#graph_area").highcharts(chart_area);
			
		});//$(function90{})