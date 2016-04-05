// JavaScript Document
var currPage = 1;
var url;
var HOME_PIC = '(Account)<%=session.getAttribute("account"); %>';
var maxLiving = 6;
var maxBed = 6;
var maxBath = 3;
var maxKitchen = 2;
var maxPublicArea = 2;
var maxFloorPrint = 1;
var l = 0;
var bed = 0;
var bath = 0;
var kitchen = 0;
var publicArea = 0;
var floorPrint = 0;
var picType = 0;
var edit;
var firstOrder = 0; //0表示目前是第一次点击，第一次点击后自增
var saveStatus = 0;//保存操作的状态 0表示失败 1表示成功
if($.trim($("#livingLen").val()) != "" && $.trim($("#livingLen").val()) != null ) {
	l = $("#livingLen").val();
}
if($.trim($("#bedLen").val()) != "" && $.trim($("#bedLen").val()) != null ) {
	bed = $("#bedLen").val();
}
if($.trim($("#bathLen").val()) != "" && $.trim($("#bathLen").val()) != null ) {
	bath = $("#bathLen").val();
}
if($.trim($("#kitchenLen").val()) != "" && $.trim($("#kitchenLen").val()) != null ) {
	kitchen = $("#kitchenLen").val();
}
if($.trim($("#publicAreaLen").val()) != "" && $.trim($("#publicAreaLen").val()) != null ) {
	publicArea = $("#publicAreaLen").val();
}
if($.trim($("#floorPrintList").val()) != "" && $.trim($("#floorPrintList").val()) != null ) {
	floorPrint = $("#floorPrintList").val();
}
//上传房屋图片
function roomPicUpload()
{	
//    $("#loading")
//    .ajaxStart(function(){
//        $(this).show();
//    })//开始上传文件时显示一个图片
//    .ajaxComplete(function(){
//        $(this).hide();
//    });//文件上传完成将图片隐藏起来
	var homeTypeName = "";
	var homeId = 0;
	var cityCode = 0;
	var count = 0;
	
	homeTypeName = $("#homeTypeName").val();
	homeId = $("#hhId").val();
	var saveType = parseInt($("#saveType").val());
	if(firstOrder == 0 && saveType == 0) {
		edit.config({
		    ajaxpost:{
		    	async:false
		    }
		});
		$(".valid").attr("ignore","ignore");
		edit.submitForm(false,"/SaleHomeInput.action?saleHomeInputForBroker");
		if(!edit.check(false)) {
			if(saveStatus == 0) {
				return false;
			}
			return false;
		} else {
			homeId = $("#hhId").val();
		}
	}
	cityCode = $("#cityCode").val();
	
    if(homeTypeName == "livingRoomPic") {
    	picType = 61;
    	count = l;
    } else if(homeTypeName == "bedRoomPic") {
    	picType = 62;
    	count = bed;
    } else if(homeTypeName == "bathRoomPic") {
    	picType = 63;
    	count = bath;
    } else if(homeTypeName == "kitchenRoomPic") {
    	picType = 64;
    	count = kitchen;
    } else if(homeTypeName == "publicAreaPic") {
    	picType = 65;
    	count = publicArea;
    } else if(homeTypeName == "floorPrintPic") {
    	picType = 66;
    	count = floorPrint;
    } 
    $.ajaxFileUpload
    (
        {
            url:'/SaleHomeInput.action?saveHomePic',//用于文件上传的服务器端请求地址
            secureuri:false,//一般设置为false
            fileElementId:'homePicFile',//文件上传空间的id属性  <input type="file" id="file" name="file" />
            dataType: 'json',//返回值类型 一般设置为json
            data:{imageType:picType,homeId:homeId,cityCode:cityCode},
            success: function (data, status)  //服务器成功响应处理函数
            {	
            	if(data.status == "y") {
//               		alert(data.info);
               		$("#"+homeTypeName).append("<div class='picBox'><img src='' type='text' id='"+homeTypeName+""+count+"' width='200' height='100'/><textarea rows='2' class='picComment' id='comment"+count+"'></textarea><span class='delPic' ></span><div class='remainder'>还能输入16字</div></div>");
               		fnTextVerify($(".picComment"),$(".picComment").next().next(),16);
               		var $this = $("#"+homeTypeName).children("div").children("#comment"+count);
               		var $other = $("#"+homeTypeName).children("div").children("span.delPic");
               		$other.bind('click',function() {
               			var $seconde = $(this);
               			$.ajax({
               	        	url:"/SaleHomeInput.action?delHomeImageByImageId",
               	    		data:{imageId:data.imageId},
               	    		dataType:"json",
               	    		type:"POST",
               	    		success:function(data, status) {
               	    			if(data.status == "y") {
               	    				$seconde.parent().remove();
               	    				//alert(data.info);
               	    			} else if(data.status == "n") {
               	    				alert(data.info);
               	    			} else if(data.status == "e") {
               	    				alert(data.info);
               	            		window.location.href = "/";
               	    			}
               	    		}
               	        });
               		});
               		$this.bind('change',function() {
               			$.ajax({
							type:"POST",
							url:"/SaleHomeInput.action?editCommentByImageId",
							data:{imageId:data.imageId,imageCommet:$this.val()},
							dataType:"json",
							success: function(data) {
								if(data.status == "y") {
									alert(data.info);
								} else if(data.status == "n") {
									alert(data.info);
								} else if(data.status == "e") {
									alert(data.info);
									window.location.href = "/";
								}
							}
						});
               		});
               		//alert(data.photo);
               		$("#"+homeTypeName+""+count).attr("src", data.photo);
               		count++;
               	 if(homeTypeName == "livingRoomPic") {
                 	l = count;
                 } else if(homeTypeName == "bedRoomPic") {
                 	bed = count;
                 } else if(homeTypeName == "bathRoomPic") {
                	bath = count;
                 } else if(homeTypeName == "kitchenRoomPic") {
                	kitchen = count;
                 } else if(homeTypeName == "publicAreaPic") {
                	publicArea = count;
                 } else if(homeTypeName == "floorPrintPic") {
                	floorPrint = count;
                 } 
            	} else if(data.status == "n") {
            		alert(data.info);
            	} else if(data.status == "e") {
            		alert(data.info);
            		window.location.href = "/";
            	}
                
                if(typeof(data.error) != 'undefined')
                {
                    if(data.error != '')
                    {
                        alert(data.info);
                    }else
                    {
                        alert(data.info);
                        window.location.href = "/";
                    }
                }
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {	
                alert(data.info);
            }
        }
    );
    return false;
}

//修改图片评论
function editPicComment(imageId,obj) {
	$obj = $(obj);
	$.ajax({
		type:"POST",
		url:"/SaleHomeInput.action?editCommentByImageId",
		data:{imageId:imageId,imageCommet:obj.value},
		dataType:"json",
		success: function(data) {
			if(data.status == "y") {
				 //alert("评论修改成功");
			} else if(data.status == "n") {
				 alert(data.info);
			} else if(data.status == "e") {
				 alert(data.info);
                 window.location.href = "/";
			}
		}
	});
}

//删除图片
function delPic(imageId) {
	var $th = $(this);
	$th.parent().remove();
	$.ajax({
       	url:"/SaleHomeInput.action?delHomeImageByImageId",
   		data:{imageId:imageId},
   		dataType:"json",
   		type:"POST",
   		success:function(data, status) {
   			if(data.status == "y") {
//				 alert("图片删除成功");
			} else if(data.status == "n") {
				 alert(data.info);
			} else if(data.status == "e") {
				 alert(data.info);
                window.location.href = "/";
			}
   		}
       });
}

$(function(){
	
	if($("#buildingType").val()=="1"||$("#buildingType").val()=="2")
	{
		$(".floorhide").hide();
		$("#floor").hide();
		$("#basement").show();
		$("#Park").show();
		$("#garden").show();
	}
	else
	{
		$(".floorhide").show();
		$("#floor").show();
		$("#basement").hide();
		$("#Park").hide();
		$("#garden").hide();
	}
	
	/*var log = $("#orderForm").Validform({
		tiptype:4, 
		ignoreHidden:true,
		ajaxPost:true,
		postonce:true,
		datatype:{"virLocation":/^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-]+$/},
		callback:function(data) {
			if(data.status == "y") {
				$("#homeIdForPic").val(data.homeId);
				$("#cityCode").val(data.cityCode);
			} else if(data.status == "n") {
				alert(data.info);
			} else if(data.status == "e") {
				window.location.href = "/";
			}
		}
	});*/
	
	
	
	//$("a[rel*=leantest]").leanModal({ top : 200, overlay : 0.4, closeButton: ".modal_close" });
	
//	//复制空闲房产
//	var showHomeFlag = 0;
//	var cacheCopyHomeInfo = {};	//房产缓存
//	var chosenCopyHomeInfoPool = {}; //保存选择过的房产
//	$("#copyLocation").autocomplete({
//		appendTo:"#bb",
//		minLength: 0,
//		width: 318,
//		autoFocus: true,
//		source: function( request, response ) {
//			var term = request.term;
//			if(term in cacheCopyHomeInfo) {
//				response($.map(cacheCopyHomeInfo[term], function(item, index) {
//					chosenCopyHomeInfoPool = cacheCopyHomeInfo[term];
//					//alert(JSON.stringify(item));
//					return {
//						lable: item.homeId,
//						value: item.location
//	              }
//	            }));	
//				return;
//			}
//      $.ajax({
//          url: '/SaleHomeInput.action?getFreeHomeListByLocation',
//          data: {location: encodeURIComponent($("#copyLocation").val()),keyword:encodeURIComponent(request.term)},
//          type: 'post',
//          dataType: "json",
//          success: function(data, status, xhr) {
//        	  cacheCopyHomeInfo[term] = data.homeList;
//        	  chosenCopyHomeInfoPool = data.homeList;
//			response($.map(data.homeList, function(item, index) {
//				return {
//					lable: item.homeId,
//					value: item.location
//              }
//            }));												
//          },
//          error: function(data) {
//        	//alert(JSON.stringify(data));
//          }
//      });
//		},
//		select: function( event, ui ) {
//			event.preventDefault();
//			this.value = ui.item.value;
//			$("#homeId").val(ui.item.lable);
//			$("#hhId").val(ui.item.lable);
//		}				
//	});
//	$("#copyLocation").blur(function() {
//		
//		$.each(chosenCopyHomeInfoPool, function(index, item) {
//			if(item.location == $.trim($("#copyLocation").val())) {
//				showHomeFlag = 1;
//				return false; 
//			} else {
//				showHomeFlag = 0;
//			}
//		});
//		if(showHomeFlag == 0) {
//			$("#copyLocation").next().removeClass("Validform_right").addClass("Validform_wrong").text("您输入的别名不存在");
//		}
//	});
//	
//	// 复制已有房产
//	var cacheHomeInfo = {};	//房产缓存
//	var chosenHomeInfoPool = {}; //保存选择过的房产
//	$("#selectLocation").autocomplete({
//		appendTo:"#signup",
//		minLength: 0,
//		width: 318,
//		autoFocus: true,
//		source: function( request, response ) {
//			var term = request.term;
//			if(term in cacheHomeInfo) {
//				response($.map(cacheHomeInfo[term], function(item, index) {
//					chosenHomeInfoPool = cacheHomeInfo[term];
//					//alert(JSON.stringify(item));
//					return {
//						lable: item.homeId,
//						value: item.location
//	              }
//	            }));	
//				return;
//			}
//      $.ajax({
//          url: '/SaleHomeInput.action?getUnPublishHomeListByLocation',
//          data: {keyword:encodeURIComponent(request.term)},
//          type: 'post',
//          dataType: "json",
//          success: function(data, status, xhr) {
//        	  cacheHomeInfo[term] = data.homeList;
//        	  chosenHomeInfoPool = data.homeList;
//			response($.map(data.homeList, function(item, index) {
//				return {
//					lable: item.homeId,
//					value: item.location
//              }
//            }));												
//          },
//          error: function(data) {
//        	//alert(JSON.stringify(data));
//          }
//      });
//		},
//		select: function( event, ui ) {
//			event.preventDefault();
//			this.value = ui.item.value;
//			$("#homeId").val(ui.item.lable);
//			$("#hhId").val(ui.item.lable);
//			$("#fackLocation").val(ui.item.value);
//			//alert($("#homeId").val());
//		}				
//	});
//	$("#selectLocation").blur(function() {
//		//var showHomeFlag = 0;
//		$.each(chosenHomeInfoPool, function(index, item) {
//			if(item.location == $.trim($("#selectLocation").val())) {
//				showHomeFlag = 1;
//				return false; 
//			} else {
//				showHomeFlag = 0;
//			}
//		});
//		if(showHomeFlag == 0) {
//			$("#selectLocation").next().removeClass("Validform_right").addClass("Validform_wrong").text("您输入的别名不存在");
//		}
//	});
//	
	$("#okButton").click(function () {
//		if(showHomeFlag == 0) {
//			$("#selectLocation").next().removeClass("Validform_right").addClass("Validform_wrong").text("您输入的别名不存在");
//			return false;
//		}
//		
//		$("#fillType").attr("value",0);
//		var homeId = $("#homeId").val();
//		if(homeId == null || $.trim(homeId) == "") {
//			$("#selectLocation").next().removeClass("Validform_right").addClass("Validform_wrong").text("请选择一个房产");
//			return false;
//		} else {
//			CoverLayer(0);
//			$("#signup").hide();
//		}
		CoverLayer(0);
		$("#signup").hide();
		var homeId = $("#shId option:selected").val();
		$.getJSON(
				"/SaleHomeInput.action?copyTheExistingHomeInfo",
				{homeId:homeId,ra:Math.random()},
				function(data) {
						$("#residenceName").val(data.hv.residenceName);
						//alert(data.hv.location + "location");
						$("#commuName").attr("value", data.hv.location);
						$("#bedRoom").attr("value", data.hv.bedRoom);
						$("#livingRoom").attr("value", data.hv.livingRoom);
						$("#bathRoom").attr("value", data.hv.bathRoom);
						$("#floorArea").attr("value", data.hv.floorArea);
						$("#buildingType").prev().children("li").removeClass("on");
						//alert($("#buildingType").prev().eq(data.hv.buildingType - 1).text());
						$("#buildingType").prev().children("li").eq(data.hv.buildingType - 1).addClass("on");
						
						$("#decoration").prev().children("li").removeClass("on");
						$("#decoration").prev().children("li").eq(data.hv.decoration - 1).addClass("on");
						
						$("#orientation").prev().children("li").removeClass("on");
						$("#orientation").prev().children("li").eq(data.hv.orientation - 1).addClass("on");
						
						$("#floor").attr("value", data.hv.floor);
						$("#totalFloor").attr("value", data.hv.totalFloor);
						$("#builtYear").attr("value", data.hv.builtYear);
						$("#carPark").attr("value", data.hv.carPark);
						$("#basementArea").attr("value", data.hv.basementArea);
						$("#gardenArea").attr("value", data.hv.gardenArea);
						$("#main").show();
						if(parseInt(data.hv.buildingType) == 1 || parseInt(data.hv.buildingType) == 2) {
							$(".floorhide").hide();
							$("#floor").hide();
							$("#basement").show();
							$("#Park").show();
							$("#garden").show();
						}
						edit.check(false);
						$("#homeId").val("");
					
			});
	});
	$("#okEButton").click(function () {
//		if(showHomeFlag == 0) {
//			$("#copyLocation").next().removeClass("Validform_right").addClass("Validform_wrong").text("您输入的别名不存在");
//			return false;
//		} else {
//			$("#copyLocation").next().removeClass("Validform_wrong").addClass("Validform_right").text("");
//		}
//		var homeId = $("#homeId").val();
//		$("#fillType").attr("value",1);
//		if(homeId == null || $.trim(homeId) == "") {
//			$("#copyLocation").next().removeClass("Validform_right").addClass("Validform_wrong").text("请选择一个房产");
//			return false;
//		} else {
//			CoverLayer(0);
//			$("#bb").hide();
//		}
		CoverLayer(0);
		$("#bb").hide();
		var homeId = $("#hId option:selected").val();
		$.getJSON(
				"/SaleHomeInput.action?copyTheExistingHomeInfo",
				{homeId:homeId,ra:Math.random()},
				function(data) {
						//alert(data.hv.residenceName)
						$("#hhId").attr("value", homeId);	
						$("#residenceName").val(data.hv.residenceName);
						$("#hResidenceName").attr("value", $("#residenceName").val());
						$("#residenceName").attr("disabled",true);
						$("#commuName").attr("value", data.hv.location);
						$("#hLocation").attr("value", $("#location").val());
						$("#commuName").attr("disabled",true);
						$("#bedRoom").attr("value", data.hv.bedRoom);
						$("#hBedRoom").attr("value", $("#bedRoom").val());
						$("#bedRoom").attr("disabled",true);
						$("#livingRoom").attr("value", data.hv.livingRoom);
						$("#hLivingRoom").attr("value", $("#livingRoom").val());
						$("#livingRoom").attr("disabled",true);
						$("#bathRoom").attr("value", data.hv.bathRoom);
						$("#hBathRoom").attr("value", $("#bathRoom").val());
						$("#bathRoom").attr("disabled",true);
						$("#floorArea").attr("value", data.hv.floorArea);
						$("#hFloorArea").attr("value", $("#floorArea").val());
						$("#floorArea").attr("disabled",true);
						//aler(data.hv.buildingType);
						$("#buildingType").prev().children("li").removeClass("on").removeClass("click").unbind("click");;
						$("#buildingType").prev().children("li").eq(data.hv.buildingType - 1).addClass("on").addClass("click");
						$("#buildingType").val(data.hv.buildingType);
						
						$("#decoration").prev().children("li").removeClass("on").removeClass("click").unbind("click");;
						$("#decoration").prev().children("li").eq(data.hv.decoration - 1).addClass("on").addClass("click");
						$("#decoration").val(data.hv.decoration);
						
						$("#orientation").prev().children("li").removeClass("on").removeClass("click").unbind("click");;
						$("#orientation").prev().children("li").eq(data.hv.orientation - 1).addClass("on").addClass("click");
						$("#orientation").val(data.hv.orientation);
					
						$("#floor").attr("value", data.hv.floor);
						$("#hFloor").attr("value", $("#floor").val());
						$("#floor").attr("disabled",true);
						$("#totalFloor").attr("value", data.hv.totalFloor);
						$("#hTotalFloor").attr("value", $("#totalFloor").val());
						$("#totalFloor").attr("disabled",true);
						$("#builtYear").attr("value", data.hv.builtYear);
						$("#hBuiltYear").attr("value", $("#builtYear").val());
						$("#builtYear").attr("disabled",true);
						
						$("#carPark").attr("value", data.hv.carPark);
						$("#hCarPark").attr("value", $("#carPark").val());
						$("#carPark").attr("disabled",true);
						
						$("#basementArea").attr("value", data.hv.basementArea);
						$("#hBasementArea").attr("value", $("#basementArea").val());
						$("#basementArea").attr("disabled",true);
						
						
						$("#gardenArea").attr("value", data.hv.gardenArea);
						$("#hGardenArea").attr("value", $("#gardenArea").val());
						$("#gardenArea").attr("disabled",true);
						
						$("#main").show();
						if(parseInt(data.hv.buildingType) == 1 || parseInt(data.hv.buildingType) == 2) {
							$(".floorhide").hide();
							$("#floor").hide();
							$("#basement").show();
							$("#Park").show();
							$("#garden").show();
						}
						edit.check(false);
						$("#homeId").val("");
			});
		$(".pics").children("div").remove();
		var homePicPath = "/salehome/image";
		var cityCode = $("#cityCode").val();
		$.getJSON("/SaleHomeInput.action?getLivingRoomPics",{homeId:homeId,ra:Math.random()}, function(data) {
			$("#livingLen").val(data.length);
			var comment = "";
			$.each(data, function(index, item) {
				if(item.comment != null) {
					comment = item.comment;
				} else {
					comment = "";
				}
				$("#livingRoomPic").append("<div class='picBox'><img src='/"+cityCode+homePicPath+item.relativePath+"/"+item.imageId+"' alt='客厅图片' width='200' height='100'/><textarea  rows='2' class='picComment' onchange='editPicComment(\""+item.imageId +"\",this);'>" + comment + "</textarea><span class='delPic' onclick='delPic(\"" + item.imageId + "\");'></span><div class='remainder'>还能输入16字</div></div>");
			});
			if(data.length > 0) {
				fnTextVerify($("#bedRoomPic").find(".picComment"),$("#floorPrintPic").find(".picComment").next().next(),16);
			}
			
		});
		
		$.getJSON("/SaleHomeInput.action?getBedRoomPics",{homeId:homeId,ra:Math.random()}, function(data) {
			$("#bedLen").val(data.length);
			var comment = "";
			$.each(data, function(index, item) {
				if(item.comment != null) {
					comment = item.comment;
				} else {
					comment = "";
				}
        		$("#bedRoomPic").append("<div class='picBox'><img src='/"+cityCode+homePicPath+item.relativePath+"/"+item.imageId+"' alt='卧室图片' width='200' height='100'/><textarea rows='2' class='picComment' onchange='editPicComment(\""+item.imageId +"\",this);'>" + comment + "</textarea><span class='delPic' onclick='delPic(\"" + item.imageId + "\");'></span><div class='remainder'>还能输入16字</div></div>");
			});
			if(data.length > 0) {
				fnTextVerify($("#bedRoomPic").find(".picComment"),$("#floorPrintPic").find(".picComment").next().next(),16);
			}
			
		});
		
		$.getJSON("/SaleHomeInput.action?getBathRoomPics",{homeId:homeId,ra:Math.random()}, function(data) {
			$("#bathLen").val(data.length);
			var comment = "";
			$.each(data, function(index, item) {
				if(item.comment != null) {
					comment = item.comment;
				} else {
					comment = "";
				}
				$("#bathRoomPic").append("<div class='picBox'><img src='/"+cityCode+homePicPath+item.relativePath+"/"+item.imageId+"' alt='卫生间图片' width='200' height='100'/><textarea rows='2' class='picComment' onchange='editPicComment(\""+item.imageId +"\",this);'>" + comment + "</textarea><span class='delPic' onclick='delPic(\"" + item.imageId + "\");'></span><div class='remainder'>还能输入16字</div></div>");
			});
			if(data.length > 0) {
				fnTextVerify($("#bathRoomPic").find(".picComment"),$("#floorPrintPic").find(".picComment").next().next(),16);
			}
			
		});
		
		$.getJSON("/SaleHomeInput.action?getKitchenRoomPics",{homeId:homeId,ra:Math.random()}, function(data) {
			$("#kitchenLen").val(data.length);
			var comment = "";
			$.each(data, function(index, item) {
				if(item.comment != null) {
					comment = item.comment;
				} else {
					comment = "";
				}
				$("#kitchenRoomPic").append("<div class='picBox'><img src='/"+cityCode+homePicPath+item.relativePath+"/"+item.imageId+"' alt='厨房图片' width='200' height='100'/><textarea rows='2' class='picComment' onchange='editPicComment(\""+item.imageId +"\",this);'>" + comment + "</textarea><span class='delPic' onclick='delPic(\"" + item.imageId + "\");'></span><div class='remainder'>还能输入16字</div></div>");
			});
			if(data.length > 0) {
				fnTextVerify($("#kitchenRoomPic").find(".picComment"),$("#floorPrintPic").find(".picComment").next().next(),16);
			}
			
		});
		
		$.getJSON("/SaleHomeInput.action?getPublicAreaRoomPics",{homeId:homeId,ra:Math.random()}, function(data) {
			$("#publicAreaLen").val(data.length);
			var comment = "";
			$.each(data, function(index, item) {
				if(item.comment != null) {
					comment = item.comment;
				} else {
					comment = "";
				}
				$("#publicAreaPic").append("<div class='picBox'><img src='/"+cityCode+homePicPath+item.relativePath+"/"+item.imageId+"' alt='公共区域图片' width='200' height='100'/><textarea rows='2' class='picComment' onchange='editPicComment(\""+item.imageId +"\",this);'>" + comment + "</textarea><span class='delPic' onclick='delPic(\"" + item.imageId + "\");'></span><div class='remainder'>还能输入16字</div></div>");
			});
			if(data.length > 0) {
				fnTextVerify($("#publicAreaPic").find(".picComment"),$("#floorPrintPic").find(".picComment").next().next(),16);
			}
		});
		
		$.getJSON("/SaleHomeInput.action?getFloorPrintPics",{homeId:homeId,ra:Math.random()}, function(data) {
			$("#floorPrintList").val(data.length);
			var comment = "";
			$.each(data, function(index, item) {
				if(item.comment != null) {
					comment = item.comment;
				} else {
					comment = "";
				}
				$("#floorPrintPic").append("<div class='picBox'><img src='/"+cityCode+homePicPath+item.relativePath+"/"+item.imageId+"' alt='户型图' width='200' height='100'/><textarea rows='2' class='picComment' onchange='editPicComment(\""+item.imageId +"\",this);'>" + comment + "</textarea><span class='delPic' onclick='delPic(\"" + item.imageId + "\");'></span><div class='remainder'>还能输入16字</div></div>");
			});
			if(data.length > 0) {
				fnTextVerify($("#floorPrintPic").find(".picComment"),$("#floorPrintPic").find(".picComment").next().next(),16);
			}
		});
		
	});
	
	$("#buildingType").change(function(){
		if($(this).val()=="1"||$(this).val()=="2")
		{
			$(".floorhide").hide();
			$("#floor").hide();
			$("#basement").show();
			$("#Park").show();
			$("#garden").show();
		}
		else
		{
			$(".floorhide").show();
			$("#floor").show();
			$("#basement").hide();
			$("#Park").hide();
			$("#garden").hide();
		}
	});
	
	
	//添加客厅图片
	$("#addLivingRoomPic").click(function() {
		$("#homeTypeName").val("livingRoomPic");
		if(l > maxLiving - 1) {
			alert("客厅最多上传"+maxLiving+"张图片");
			return;
		} else {
			$("#homePicFile").click();
		}
		
	});
	
	//添加卧室图片
	$("#addBedRoomPic").click(function() {
		$("#homeTypeName").val("bedRoomPic");
		if(bed > maxBed - 1) {
			alert("卧室最多上传"+maxBed+"张图片");
		} else {
			$("#homePicFile").click();
		}
	});
	
	//添加卫生间图片
	$("#addBathRoomPic").click(function() {
		$("#homeTypeName").val("bathRoomPic");
		if(bath > maxBath - 1) {
			alert("卫生间最多上传"+maxBath+"张图片");
		} else {
			$("#homePicFile").click();
		}
	});
	
	//添加厨房图片
	$("#addKitchenRoomPic").click(function() {
		$("#homeTypeName").val("kitchenRoomPic");
		if(kitchen > maxKitchen - 1) {
			alert("厨房最多上传"+maxKitchen+"张图片");
		} else {
			$("#homePicFile").click();
		}
	});
	
	//添加公共区域图片
	$("#addPublicAreaPic").click(function() {
		$("#homeTypeName").val("publicAreaPic");
		if(publicArea > maxPublicArea - 1) {
			alert("公共区域最多上传"+maxPublicArea+"张图片");
		} else {
			$("#homePicFile").click();
		}
	});
	
	//添加户型图
	$("#addFloorPrintPic").click(function() {
		$("#homeTypeName").val("floorPrintPic");
		if(floorPrint > maxFloorPrint - 1) {
			alert("公共区域最多上传"+maxFloorPrint+"张图片");
		} else {
			$("#homePicFile").click();
		}
	});
	
	/*var log = $("#editForm").Validform({
		tiptype:4, 
		ignoreHidden:true,
		ajaxPost:true,
		postonce:true,
		datatype:{
			"virLocation":/^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-]+$/,
			"virResidenceName":/^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-\\.]+$/
		},
		callback:function(data) {
			if(data.status == "y") {
				$("#homeIdForPic").val(data.homeId);
				$("#cityCode").val(data.cityCode);
			} else if(data.status == "n") {
				alert(data.info);
			} else if(data.status == "e") {
				window.location.href = "/";
			}
		}
	});*/
	
	
	//在修改时验证未发布  "virResidenceName":/^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-\\.]+$/,
	edit = $("#editForm").Validform({
		tiptype:4, 
		ignoreHidden:true,
		ajaxPost:true,
		datatype:{
			"virLocation":/^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-]+$/,
			"totalFloor":function(gets,obj,curform,regxp) {//参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
				var floor = parseInt($("#floor").val());
				var totalFloor = parseInt($("#totalFloor").val());
				if(totalFloor > 0 && totalFloor < 128) {
					if(!isNaN(floor)) {
						if(totalFloor < floor) {
							$("#totalFloor").next().next().removeClass("Validform_right").addClass("Validform_wrong").text("所在楼层数应小于总楼层数");
							//return "所在楼层数应小于总楼层数";
							return "所在楼层数应小于总楼层数";
						} else {
							return true;
						}
					} else {
						return true;
					}
				} else {
					return false;
				}
			},
			"floor":function(gets,obj,curform,regxp) {//参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
				var floor = parseInt($("#floor").val());
				var totalFloor = parseInt($("#totalFloor").val());
				if(floor > 0  && floor < 128) {
					if(!isNaN(totalFloor)) {
						if(floor > totalFloor) {
							return "所在楼层数应小于总楼层数";
						} else {
							return true;
						}
					} else {
						return true;
					}
					
				} else {
					return false;
				}
				
			},
			"builtYear":function(gets,obj,curform,regxp) {
				var myDate = new Date();
				if(gets > myDate.getFullYear()) {
					return "建筑年代应该在当前时间之前";
				}
			},
			"floorArea":function(gets,obj,curform,regxp) {
				var floorArea = parseInt(gets);
				if(floorArea > 0 && floorArea < 65536) {
					return true;
				} else {
					return false;
				}
			},
			"price":function(gets,obj,curform,regxp) {
				var price = parseInt(gets);
				if(price < 0 || price >= 1000000) {
					return false;
				} else {
					return true;
				}
			}
		},
		callback:function(data) {
			if(data.status == "y") {
				$("#hhId").val(data.homeId);
				saveStatus = 1;
				firstOrder+=1;
				//$("#saveType").val("1");
				if(data.info == "保存成功") {
					alert(data.info);
				} else if(data.info == "发布成功") {
					alert(data.info);
				} 
			} else if(data.status == "n") {
				saveStatus = 0;
				$("#saveType").val("0");
				alert(data.info);
			} else if(data.status == "e") {
				window.location.href = "/";
			}
	}
	});
	
	
	
	
//	//在卖单修改页发布之前验证未发布  废弃
//	$("#onEditpublish").click(function() {
//		$(".valid").attr("ignore","");
//		edit.unignore();
//		edit.config({
//			showAllError:true,
//		});
//		edit.submitForm(false,"SaleHome.action?publishSaleHomeListOnInputPageForBroker");
//	});
	
	//直接发布  旧版本
//	$("#publish").click(function() {
//		$(".valid").attr("ignore","");
//		log.unignore();
//		log.config({
//			showAllError:true,
//		});
//		log.submitForm(false,"SaleHome.action?publishSaleHomeListStraightForBroker");
//	});
//	$(".valid").attr("ignore","ignore");
	
	//直接发布  新版本
	$("#publishSaleHome").click(function() {
		if(!edit.check(false)) {
			return false;
		}
		var homeId = $("#hhId").val();
		var saveType = parseInt($("#saveType").val());
		if(firstOrder == 0 && saveType == 0) {
			edit.config({
			    ajaxpost:{
			    	async:false
			    }
			});
			$(".valid").attr("ignore","ignore");
			edit.submitForm(false,"/SaleHomeInput.action?saleHomeInputForBroker");
			if(!edit.check(false)) {
				if(saveStatus == 0) {
					return false;
				}
				return false;
			} else {
				homeId = $("#hhId").val();
			}
		}
		$.ajax({
			url:"/SaleHomeInput.action?beforePublishCheck",
			data:{homeId:homeId},
			dataType:"json",
			type:"POST",
			async:false,
			success:function(data, textStatus) {
				if(data.status == "illegal") {
					if(data.illegalSlogan != null) {
						$("#slogan").focus();
						$("#slogan").next().next().removeClass("Validform_right").addClass("Validform_wrong").text("包含非法字符"+data.illegalSlogan);;
					} 
					if(data.illegalComment != null) {
						$("#introduction").focus();
						$("#introduction").next().removeClass("Validform_right").addClass("Validform_wrong").text("包含非法字符"+data.illegalSlogan);;
					}
				} else if(data.status == "y") {
					$.ajax({
						url:"/SaleHomeInput.action?publishSaleHomeListAfterCheck",
						data:{homeId:homeId},
						dataType:"json",
						type:"POST",
						async:false,
						success:function(data, textStatus) {
							if($.trim(data.status) == "y") {
								alert(data.info);
								window.location.href = "/SaleHomeController.action?goToSaleHomeListManager";
							} else if($.trim(data.status) == "n") {
								alert(data.info);
								return false;
							} else if($.trim(data.status) == "e") {
								alert(data.info);
								window.location.href = "/";
								return false;
							}
						}
					});
				} else if($.trim(data.status) == "r") {
					$.ajax({
						url:"/SaleHomeInput.action?editSaleHomeInputForBroker",
						data:$("#editForm").serializeArray(),
						dataType:"json",
						type:"POST",
						async:false,
						success:function(data, textStatus) {
							if($.trim(data.status) == "y") {
								$.ajax({
									url:"/SaleHomeInput.action?beforePublishCheck",
									data:{homeId:homeId},
									dataType:"json",
									type:"POST",
									async:false,
									success:function(data, textStatus) {
										if(data.status == "y") {
											$.ajax({
												url:"/SaleHomeInput.action?publishSaleHomeListAfterCheck",
												data:{homeId:homeId},
												dataType:"json",
												type:"POST",
												async:false,
												success:function(data, textStatus) {
													if($.trim(data.status) == "y") {
														alert(data.info);
														window.location.href = "/SaleHomeController.action?goToSaleHomeListManager";
													} else if($.trim(data.status) == "n") {
														alert(data.info);
														return false;
													} else if($.trim(data.status) == "e") {
														alert(data.info);
														window.location.href = "/";
														return false;
													}
												} 
											});
										} else if(data.status == "n") {
											alert(data.info);
											return false;
										} else if(data.status == "e") {
											alert(data.info);
											return false;
											window.location.href = "/";
										} 
									}
								});
							} else if($.trim(data.status) == "n") {
								alert(data.info);
								return false;
							} else if($.trim(data.status) == "e") {
								alert(data.info);
								window.location.href = "/";
								return false;
							}
						}
					});
				} else if(data.status == "n") {
					alert(data.info);
					return false;
				} else if(data.status == "e") {
					alert(data.info);
					return false;
					window.location.href = "/";
				} 
			}
		});
	});
	
	/*//点击保存之后要做的动作
	$("#save").click(function() {
		window.location.href = "/SaleHomeController.action?goToSaleHomeInputViewForBroker";
	});*/
	
	//点击保存之后要做的动作
	$("#save").click(function() {
		$(".valid").attr("ignore","ignore");
		var saveType = parseInt($("#saveType").val());
		if(firstOrder == 0 && saveType == 0) {
			if(edit.check(false)) {
				$("#saveType").val("1");
			}
			edit.submitForm(false,"/SaleHomeInput.action?saleHomeInputForBroker");
		} else {
			edit.submitForm(false,"/SaleHomeInput.action?editSaleHomeInputForBroker");
		}
	});
	
//	//在修改未发布时点击下一步之后要做的动作
//	$("#nextPageToEdit").click(function() {
//		$(".valid").attr("ignore","ignore");
//		edit.submitForm(false,"/SaleHomeInput.action?editSaleHomeInputForBroker");
//	});
	
	
	
	//在未发布列表进行发布
	$(".test").click(function() {
		var homeId = $(this).attr("v");
		//alert(homeId);
		$.ajax({
			url:"/SaleHomeInput.action?beforePublishCheck",
			data:{homeId:homeId},
			dataType:"json",
			type:"POST",
			async:false,
			success:function(data, textStatus) {
				if(data.status == "illegal") {
					if(data.illegalSlogan != null) {
						alert("推广语包含非法字符");
						var ilegals = {};
						$.each(data.illegalSlogan, function(index, item) {
							ilegals.push(item);
						});
//						$("#slogan").focus();
//						$("#slogan").next().next().removeClass("Validform_right").addClass("Validform_wrong").text("包含非法字符"+data.illegalSlogan);
					} 
					if(data.illegalComment != null) {
						alert("推广语包含非法字符");
						var ilegals = {};
						$.each(data.illegalSlogan, function(index, item) {
							ilegals.push(item);
						});
//						$("#introduction").focus();
//						$("#introduction").next().removeClass("Validform_right").addClass("Validform_wrong").text("包含非法字符"+data.illegalSlogan);
					}
				} else if(data.status == "y") {
					$.ajax({
						url:"/SaleHomeInput.action?publishSaleHomeListAfterCheck",
						data:{homeId:homeId},
						dataType:"json",
						type:"POST",
						async:false,
						success:function(data, textStatus) {
							if($.trim(data.status) == "y") {
								window.location.href = "/SaleHomeController.action?goToSaleHomeListManager";
							} else if($.trim(data.status) == "n") {
								alert(data.info);
								return false;
							} else if($.trim(data.status) == "e") {
								alert(data.info);
								window.location.href = "/";
								return false;
							}
						}
					});
				} else if($.trim(data.status) == "r") {
					alert("请先完善信息");
//					$.ajax({
//						url:"/SaleHomeInput.action?editSaleHomeInputForBroker",
//						//data:$("#editForm").serializeArray(),
//						data:{hhId:homeId},
//						dataType:"json",
//						type:"POST",
//						async:false,
//						success:function(data, textStatus) {
//							var homeId = data.homeId;
//							if($.trim(data.status) == "y") {
//								$.ajax({
//									url:"/SaleHomeInput.action?beforePublishCheck",
//									data:{homeId:homeId},
//									dataType:"json",
//									type:"POST",
//									async:false,
//									success:function(data, textStatus) {
//										if(data.status == "y") {
//											$.ajax({
//												url:"/SaleHomeInput.action?publishSaleHomeListAfterCheck",
//												data:{homeId:homeId},
//												dataType:"json",
//												type:"POST",
//												async:false,
//												success:function(data, textStatus) {
//													if($.trim(data.status) == "y") {
//														alert(data.info);
//														window.location.href = "/SaleHomeController.action?goToSaleHomeListManager";
//													} else if($.trim(data.status) == "n") {
//														alert(data.info);
//														return false;
//													} else if($.trim(data.status) == "e") {
//														alert(data.info);
//														window.location.href = "/";
//														return false;
//													}
//												} 
//											});
//										} else if(data.status == "n") {
//											alert(data.info);
//											return false;
//										} else if(data.status == "e") {
//											alert(data.info);
//											window.location.href = "/";
//											return false;
//										} 
//									}
//								});
//							} else if($.trim(data.status) == "n") {
//								alert(data.info);
//								return false;
//							} else if($.trim(data.status) == "e") {
//								alert(data.info);
//								window.location.href = "/";
//								return false;
//							}
//						}
//					});
				} else if(data.status == "n") {
					alert(data.info);
					return false;
				} else if(data.status == "e") {
					alert(data.info);
					window.location.href = "/";
					return false;
				} 
			}
		});
	});
	
	//创建新卖单
	$("#createSaleHomeInput").click(function() {
		checkUnPublishedSaleHomeInputLimit();
		window.location.href = "/SaleHomeController.action?goToSaleHomeInputViewForBroker";
	});
	
	//显示已发布
	$("#showSaleHomeList").click(function() {
		$("#showSaleHomeInput").removeClass("on");
		$("#showSaleHomeList").addClass("on");
		window.location.href = "/SaleHomeController.action?goToSaleHomeListManagerL";
//		currPage = 1;
//		getSaleHomeList();
	});
	
	//显示未发布
	$("#showSaleHomeInput").click(function() {
		$("#showSaleHomeList").removeClass("on");
		$("#showSaleHomeInput").addClass("on");
		window.location.href = "/SaleHomeController.action?goToSaleHomeListManager";
	});
	
	//
	var windowHeight = window.screen.availHeight;
	$("#copyHome").click(function() {
		$("#signup").css({"left":($(window).width()-$("#signup").width())/2,"top":(windowHeight-$("#signup").height())/2})
			.show();
		CoverLayer(1);
		
	});
	$("#cancelButton").click(function() {
		$("#selectLocation").val("");
		$("#selectLocation").next().removeClass("Validform_wrong").text("");
		CoverLayer(0);
		$("#signup").hide();
		
	});
	
	$("#getExist").click(function() {
		CoverLayer(1);
		$("#bb").css({"left":($(window).width()-$("#bb").width())/2,"top":(windowHeight-$("#bb").height())/2})
		.show();
		
	});
	
	$("#cancelEButton").click(function() {
		$("#copyLocation").val("");
		$("#copyLocation").next().removeClass("Validform_wrong").text("");
		CoverLayer(0);
		$("#bb").hide();
	});
	
	});