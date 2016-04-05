		var per = 0.25;
		var emotionalDatas;
		var colors = [];
		var stops = [];
		var plates = [];
		function drawRect(whichCanvas, type) {
	      var canvas = document.getElementById(whichCanvas);
	      var ctx = canvas.getContext("2d");
	      var offset = 10;
	      var size = 50;
	      var count = 7;
	      var rad = 36
	     // ctx.lineWidth = 3;
	      var fillColors = colors;
	      for(var i = 0; i < count; i++) {
	        ctx.fillStyle = fillColors[i];
	        ctx.beginPath();  
	        ctx.arc(i * (2 *rad + offset) + rad, rad, rad, 0, Math.PI*2, true); 
	        //ctx.rect(i * (offset + size) + offset, offset, size, size);
	        ctx.closePath(); 
	        ctx.fill();
	      }
	      canvas.addEventListener('click', function(e){  
	          var p = getEventPosition(e);  
	          reDrawRect(p, ctx, type);
	      }, true);  
	    }
	  	function reDrawRect(p,ctx, type) {
	      var offset = 10;
	      var size = 50;
	      var count = stops.length;
	      ctx.lineWidth = 3;
	      //["#1E1E1E", "#00A2E8", "#FFFF00", "#FFA500", "#FFA200", "#FF0000", "#0000CD"]
	      var fillColors = colors;
	      for(var i = 0; i < count; i++) {
	        ctx.fillStyle = fillColors[i];
	        ctx.beginPath();  
	        ctx.rect(i * (offset + size) + offset, offset, size, size);
	        ctx.fill();
	        if(p && ctx.isPointInPath(p.x, p.y)) {  
	        	for(var kk = 0; kk < count; kk++) {
	        		if(i == kk) {
	        			commitEmotional(type, kk++);
	    	          	return false;
	        		}
	        	}
//	          if (i == 0) {
//	          	commitEmotional(type, 1);
//	          	return false;
//	          } else if(i == 1) {
//	            commitEmotional(type, 2);
//	            return false;
//	          } else if (i == 2) {
//	          	commitEmotional(type, 3);
//	          	return false;
//	          } else if (i == 3) {
//	            commitEmotional(type, 4);
//	            return false;
//	          } else if (i == 4) {
//	            commitEmotional(type, 5);
//	            return false;
//	          } else if (i == 5) {
//	            commitEmotional(type, 6);
//	            return false;
//	          } else if (i == 6) {
//	            commitEmotional(type, 7);
//	            return false;
//	          } 
	        } else {
	        	
	        } 
	      }
    	}
    	
    	function drawChangingColor(whichcanvas) {
			var canvas = document.getElementById(whichcanvas);    //获取canvas元素节点
			var context = canvas.getContext("2d");   //设置canvas元素节点
			var my_gradient = context.createLinearGradient(0,0,500,0);   //创建一个线性渐变
			var stop;					
			var stopL;
			var stopR; 
			for(var i = 0; i < stops.length; i++) {
				if(i == 0) {
					stopL = 0;
					stopR = stops[i] - stops[i] * per;                       
					my_gradient.addColorStop(stopL, plates[i]);
					my_gradient.addColorStop(stopR, plates[i]); 
//					$("#c1").text("c1 :  " + String(stopL).substring(0, 4));
//					$("#c2").text("c2 :  " + String(stopR).substring(0, 4));
					continue;
				}
				if(i == stops.length - 1) {
					stopL = stops[i - 1] + (stops[i] - stops[i - 1]) * per;
					stopR = 1;
					my_gradient.addColorStop(stopL, plates[i]);
					my_gradient.addColorStop(stopR, plates[i]);
//					$("#c13").text("c13 :  " + String(stopL).substring(0, 4));
//					$("#c14").text("c14 :  " + String(stopR).substring(0, 4));
					continue; 
				}
				stopL = stops[i - 1] + (stops[i] -stops[i - 1]) * per;
				stopR = stops[i] - (stops[i] - stops[i - 1]) * per;
//				$("#c" + (2 * i + 1)).text("c" + (2 * i + 1) + ":  " + String(stopL).substring(0, 4));
//				$("#c" + (2 * i + 2)).text("c" + (2 * i + 2) + ":  " + String(stopR).substring(0, 4));
				my_gradient.addColorStop(stopL, plates[i]);
				my_gradient.addColorStop(stopR, plates[i]); 
			}
			/* 
			my_gradient.addColorStop(0.4,"#4B0082"); 
    		my_gradient.addColorStop(0.6,"#87CEEB");
    		my_gradient.addColorStop(0.3,"#3CB371");
    		my_gradient.addColorStop(0.8,"#FFFF00");
    		my_gradient.addColorStop(0.9,"#FFA500");
    		my_gradient.addColorStop(1,"#FF0000"); */ 
    		context.fillStyle = my_gradient;     //设置fillStyle为当前的渐变对象
			context.fillRect(0,0,500,200);         //绘制渐变图形
    	}
    	
    	function computeStop(emotionalDatas) {
    		var stop;
    		var oldstop;
    		stops = [];
    		plates = [];
    		$.each(emotionalDatas, function(i, item) {
    			if(parseInt(item.likes) != 0) {
    				if(typeof(oldstop) != "undefined") {
	    				likes = parseInt(item.likes) / parseInt(item.totalLikes);
						stop = Number(likes) + oldstop;
						oldstop = stop;
						stops.push(stop);
						plates.push(item.plate);
//						$("#s1").text($("#s1").text() + " , " + String(stop).substring(0, 4) + " : " + String(likes).substring(0, 4));
    				} else {
    					likes = parseInt(item.likes) / parseInt(item.totalLikes);
						stop = Number(likes);
						oldstop = stop;
						stops.push(stop);
						plates.push(item.plate);
//						$("#s1").text(String(stop).substring(0, 4) + " : " + String(likes).substring(0, 4));
    				}
    			}
    		});
    	}
    	
		//获得默认情绪数据
    	function getDefaultChangingColorData(type) {
    		emotionalDatas = [];
	        var emotionalData = {};
	        var buyer = {buyerEmotionnal:1};
	        var renter = {renterEmotionnal:1};
	        var seller = {sellerEmotionnal:1};
	        var lessor = {lessorEmotionnal:1};
	        if(type == 1) {
	          emotionalData = buyer;
	        } else if(type == 2) {
	          emotionalData = renter
	        } else if(type == 3) {
	        	emotionalData = seller;
	        } else if(type == 4) {
	        	emotionalData = lessor;
	        }
    		$.ajax({
    	        type:"POST",
    	        async:false,
    	        url:"/EmotionalChart.action?getDefaultEmotionalDatas",
    	        data:emotionalData,
    	        dataType:"json",
    	        success: function(data) {
    	          if(type == 1) {
    	            if(data.EL != "" || data.EL != null) {
    	              $.each(data.EL, function(index, item) {
    	                emotionalDatas.push(item);
    	              });//typeof(eChart) == "undefined"
    	              computeStop(emotionalDatas);
    	              drawChangingColor("canvasChange1");
    	            } else  {
    	              alert("no data");
    	            }
    	          } else if(type == 2) {
    	            if(data.EL != "" || data.EL != null) {
    	               $.each(data.EL, function(index, item) {
    	                  emotionalDatas.push(item);
    	               });
    	               computeStop(emotionalDatas);
    	               drawChangingColor("canvasChange2");
    	            } else  {
    	              alert("no data");
    	            }
    	          } else if(type == 3) {
      	            if(data.EL != "" || data.EL != null) {
     	               $.each(data.EL, function(index, item) {
     	                  emotionalDatas.push(item);
     	               });
     	              computeStop(emotionalDatas);
     	               drawChangingColor("canvasChange3");
     	            } else  {
     	              alert("no data");
     	            }
     	          } else if(type == 4) {
	    	            if(data.EL != "" || data.EL != null) {
	      	               $.each(data.EL, function(index, item) {
	      	                  emotionalDatas.push(item);
	      	               });
	      	              computeStop(emotionalDatas);
	      	               drawChangingColor("canvasChange4");
	      	            } else  {
	      	              alert("no data");
	      	            }
          	        }
    	        }
    	      });
    	}
    	
    	function drawDefaultChangingColor() {
			var canvas = document.getElementById("canvasChange");    //获取canvas元素节点
			var context = canvas.getContext("2d");   //设置canvas元素节点
			var my_gradient = context.createLinearGradient(0,0,500,0);   //创建一个线性渐变
			my_gradient.addColorStop(0.4,"#4B0082"); 
    		my_gradient.addColorStop(0.6,"#87CEEB");
    		my_gradient.addColorStop(0.3,"#3CB371");
    		my_gradient.addColorStop(0.8,"#FFFF00");
    		my_gradient.addColorStop(0.9,"#FFA500");
    		my_gradient.addColorStop(1,"#FF0000"); 
    		context.fillStyle = my_gradient;     //设置fillStyle为当前的渐变对象
			context.fillRect(0,0,500,200);         //绘制渐变图形
    	}
    	
	    function commitEmotional(type, emotional) {
	    	emotionalDatas = [];
	        var emotionalData = {};
	        var buyer = {buyerEmotionnal:emotional};
	        var renter = {renterEmotionnal:emotional};
	        var seller = {sellerEmotionnal:emotional};
	        var lessor = {lessorEmotionnal:emotional};
	        if(type == 1) {
	          emotionalData = buyer;
	        } else if(type == 2) {
	          emotionalData = renter
	        } else if(type == 3) {
	        	emotionalData = seller;
	        } else if(type == 4) {
	        	emotionalData = lessor;
	        }
	      $.ajax({
	        type:"POST",
	        async:false,
	        url:"/EmotionalChart.action?commitEmotional",
	        data:emotionalData,
	        dataType:"json",
	        success: function(data) {
	        	if(type == 1) {
    	            if(data.EL != "" || data.EL != null) {
    	              $.each(data.EL, function(index, item) {
    	                emotionalDatas.push(item);
    	              });//typeof(eChart) == "undefined"
    	              computeStop(emotionalDatas);
    	              drawChangingColor("canvasChange1");
    	            } else  {
    	              alert("no data");
    	            }
    	          } else if(type == 2) {
    	            if(data.EL != "" || data.EL != null) {
    	               $.each(data.EL, function(index, item) {
    	                  emotionalDatas.push(item);
    	               });
    	               computeStop(emotionalDatas);
    	               drawChangingColor("canvasChange2");
    	            } else  {
    	              alert("no data");
    	            }
    	          } else if(type == 3) {
      	            if(data.EL != "" || data.EL != null) {
     	               $.each(data.EL, function(index, item) {
     	                  emotionalDatas.push(item);
     	               });
     	              computeStop(emotionalDatas);
     	               drawChangingColor("canvasChange3");
     	            } else  {
     	              alert("no data");
     	            }
     	          } else if(type == 4) {
	    	            if(data.EL != "" || data.EL != null) {
	      	               $.each(data.EL, function(index, item) {
	      	                  emotionalDatas.push(item);
	      	               });
	      	              computeStop(emotionalDatas);
	      	               drawChangingColor("canvasChange4");
	      	            } else  {
	      	              alert("no data");
	      	            }
          	        }
	        }
	      });
	    }
    	function getEventPosition(ev){  
      		var x, y;  
      		if (ev.layerX || ev.layerX == 0) {  
        		x = ev.layerX;  
        		y = ev.layerY;  
      		} else if (ev.offsetX || ev.offsetX == 0) { // Opera  
        		x = ev.offsetX;  
        		y = ev.offsetY;  
      		}  
     		return {x: x, y: y};  
    	}
    	
    	function getColors() {
    		colors = [];
    		$.ajax({
		        type:"POST",
		        async:false,
		        url:"/EmotionalChart.action?getColors",
		        dataType:"json",
		        success: function(data) {
		          $.each(data.colors, function(i, e) {
		          	colors.push(e);
		          });
		        }
	      });
    	}
    	
    	function setEmotionLimit() {
    		var emotion = $.cookie("emotionSet");
    		if(emotion != "" && emotion != null && emotion != undefined && emotion != 1) {
    			$.cookie("emotionSet", 1);
    			return 0;
    		} else {
    			return 1;
    		}
    	}
    	
    	$(function() {
    		getColors();
    		drawRect("canvasBlock1", 1);
    		getDefaultChangingColorData(1);
    		var limit = 0;
    		$("#proud").click(function() {
    			limit = setEmotionLimit();
    			if(limit == 1) {
    				var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>得意，一次就好</div><div class='btnBox clearfix'><button id='question' type='button' class='cancelBtn round'>确认</button></div></div>";
    				popBox($(Qs),".cancelBtn");
    				return false;
    			}
    			commitEmotional(1, 1);
    		});
    		$("#happy").click(function() {
    			limit = setEmotionLimit();
    			if(limit == 1) {
    				var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>开心，一次就好</div><div class='btnBox clearfix'><button id='question'  type='button' class='cancelBtn round'>确认</button></div></div>";
    				popBox($(Qs),".cancelBtn");
    				return false;
    			}
    			commitEmotional(1, 2);
    		});
    		$("#relaxed").click(function() {
    			limit = setEmotionLimit();
    			if(limit == 1) {
    				var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>轻松，一次就好</div><div class='btnBox clearfix'><button id='question'  type='button' class='cancelBtn round'>确认</button></div></div>";
    				popBox($(Qs),".cancelBtn");
    				return false;
    			}
    			commitEmotional(1, 3);
    		});
    		$("#calm").click(function() {
    			limit = setEmotionLimit();
    			if(limit == 1) {
    				var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>淡定，一次就好</div><div class='btnBox clearfix'><button id='question'  type='button' class='cancelBtn round'>确认</button></div></div>";
    				popBox($(Qs),".cancelBtn");
    				return false;
    			}
    			commitEmotional(1, 4);
    		});
    		$("#entangled").click(function() {
    			limit = setEmotionLimit();
    			if(limit == 1) {
    				var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>纠结，一次就好</div><div class='btnBox clearfix'><button id='question'  type='button' class='cancelBtn round'>确认</button></div></div>";
    				popBox($(Qs),".cancelBtn");
    				return false;
    			}
    			commitEmotional(1, 5);
    		});
    		$("#worry").click(function() {
    			limit = setEmotionLimit();
    			if(limit == 1) {
    				var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>担心，一次就好</div><div class='btnBox clearfix'><button id='question'  type='button' class='cancelBtn round'>确认</button></div></div>";
    				popBox($(Qs),".cancelBtn");
    				return false;
    			}
    			commitEmotional(1, 6);
    		});
    		$("#angry").click(function() {
    			limit = setEmotionLimit();
    			if(limit == 1) {
    				var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>生气，只要一次就好</div><div class='btnBox clearfix'><button id='question'  type='button' class='cancelBtn round'>确认</button></div></div>";
    				popBox($(Qs),".cancelBtn");
    				return false;
    			}
    			commitEmotional(1, 7);
    		});
//			getDefaultChangingColorData(i);
//    		for(var i = 1; i < 5; i++) {
//    			drawRect("canvasBlock" + i, i);
//    			getDefaultChangingColorData(i);
//    		}
    		
    		
    		//drawDefaultChangingColor();
			//drawChangingColor();
			//drawPI();
    	});