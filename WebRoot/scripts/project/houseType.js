var currPage = 1;
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
var add;
var firstHoseType = 0; //0表示目前是第一次点击，第一次点击后自增
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
	if(firstHoseType == 0 && saveType == 0) {
		add.config({
		    ajaxpost:{
		    	async:false
		    }
		});
		$(".valid").attr("ignore","ignore");
		add.submitForm(false,"/HouseType.action?addHouseType");
		if(!add.check(false)) {
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
               	            		window.location.href = "/UserSearch.action?toHome";
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
									window.location.href = "/UserSearch.action?toHome";
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
            		window.location.href = "/UserSearch.action?toHome";
            	}
                
                if(typeof(data.error) != 'undefined')
                {
                    if(data.error != '')
                    {
                        alert(data.info);
                    }else
                    {
                        alert(data.info);
                        window.location.href = "/UserSearch.action?toHome";
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
                 window.location.href = "/UserSearch.action?toHome";
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
                window.location.href = "/UserSearch.action?toHome";
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
	
	//点击保存之后要做的动作
	$("#saveHouseType").click(function() {
		$(".valid").attr("ignore","ignore");
		var saveType = parseInt($("#saveType").val());
		if(firstHoseType == 0 && saveType == 0) {
			if(add.check(false)) {
				$("#saveType").val("1");
			}
			add.submitForm(false,"/HouseType.action?addHouseType");
		} else {
			add.submitForm(false,"/HouseType.action?editHouseType");
		}
	});
	//点击发布之后的操作
	$("#publishHouseType").click(function() {
		var saveType = parseInt($("#saveType").val());
		if(firstHoseType == 0 && saveType == 0) {
			add.config({
			    ajaxpost:{
			    	async:false
			    }
			});
			$(".valid").attr("ignore","ignore");
			add.submitForm(false,"/HouseType.action?addHouseType");
			if(!add.check(false)) {
				if(saveStatus == 0) {
					return false;
				}
				return false;
			}
		}
		$(".valid").attr("ignore","ignore");
		$(".must").attr("ignore","");
		add.submitForm(false,"/HouseType.action?publishHouseType");
	});
	//对添加项目的表单进行校验
	add = $("#addHouseType").Validform({
		tiptype:4, 
		ignoreHidden:true,
		ajaxPost:true,
		datatype:{"virLocation":/^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-]+$/,
			"virFloorArea":function(gets,obj,curform,regxp) {//参数gets是获取到的表单元素值，obj为当前表单元素，
				if(parseInt(gets) > 65536 || parseInt(gets) < 1) {
					$("#floorArea").next().next().removeClass("Validform_right").addClass("Validform_wrong").text("面积格式不正确");
					//return "所在楼层数应小于总楼层数";
					return false;
				}
				return true;
			},
			"floorArea":function(gets,obj,curform,regxp) {
				var floorArea = parseInt(gets);
				if(floorArea > 0 && floorArea < 65536) {
					return true;
				} else {
					return false;
				}
			},
		},
		callback:function(data) {
			if(data.status == "y") {
				saveStatus = 1;
				firstHoseType+=1;
				$("#saveType").val("1");
				$("#hhId").val(data.homeId);
				if(data.info == "发布成功") {
					window.location.href = "/SaleHomeController.action?goToPublishedProjectListManager";
				} else if(data.info == "保存成功") {
					alert(data.info);
				}
			} else if(data.status == "n") {
				$("#saveType").val("0");
				saveStatus = 0;
				alert(data.info);
			} else if(data.status == "e") {
				window.location.href = "/UserSearch.action?toHome";
			}
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
	
	
	
	
	$(".itemContent input").focus(function(){
		$(this).addClass("onFocus");
		});
	$(".itemContent input").blur(function(){
		$(this).removeClass("onFocus");
		});
	$(".itemContent input.community").focus(function(){
		$(this).next().fadeIn(200);
		});
	$(".itemContent input.community").blur(function(){
		$(this).next().fadeOut(200);
		});
	$(".popup li").click(function(){
		$(this).parent().prev().val($(this).text()).blur();
		});
		
	$(".selectList .click").click(function(){
		$(this).siblings().removeClass("on")
			.end().addClass("on");	
		$(this).parent().next().val($(this).index() + 1).change();
		//alert($(this).parent().next().val());
		});
	$(".upload").eq(0).show().children().show();
	$("#picUpload button").click(function(){
		$(this).siblings("button").removeClass("on")
			.end().addClass("on");
		var clickIndex = $(this).index();
		$(".upload").hide();
		$(".upload").eq(clickIndex).show();

		});
	$(".delPic").click(function(){
		$(this).parent().remove();		
		});
	//$(".uploadBtn").next().hide();
//	$(".uploadBtn").click(function(){
//		$(this).next().click();
//		});
		fnTextVerify($("#commuName"),$("#commuName").next(),16);

	$(".picbox").each(function(){
		fnTextVerify($(this).children("textarea"),$(this).children(".remainder"),16);
		});
});