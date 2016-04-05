
////客厅图片最大值
//var maxLiving = 6;
////卧室图片最大值
//var maxBed = 6;
////浴室图片最大值
//var maxBath = 3;
////厨房图片最大值
//var maxKitchen = 2;
////公共区域图片最大值
//var maxPublicArea = 2;
////户型图图片最大值
//var maxFloorPrint = 1;
////每个区域房已预览产图片的张数
//var livingCount = 0;
//var bedCount = 0;
//var bathCount = 0;
//var publicCount = 0;
//var floorPrintCount = 0;
//var kitchenCount = 0;
//var firstProduct = 0 //0表示目前是第一次点击，第一次点击后自增

var add;
var saveStatus = 0;//保存操作的状态 0表示失败 1表示成功


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
function delPic(imageId, obj) {
	var $th = $(obj);
	var wichPic = $(obj).parent().parent().attr("id");
	$th.parent().remove();
	if(wichPic == "publicPics") {
		publicCount--;
	} else if(wichPic == "floorPrintPics") {
		floorPrintCount--;
	} else if(wichPic == "bathPics") {
		bathCount--;
	} else if(wichPic == "kitchenPics") {
		kitchenCount--;
	} else if(wichPic == "bedPics") {
		bedCount--;
	} else if(wichPic == "livingPics") {
		livingCount--;
	}
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
//显示图片
//var openFile = function(event, output) {
//	if(browser == "Microsoft Internet Explorer") {
//		
//	} else {
//		var input = event.target;
//	    var reader = new FileReader();
//	    var newOutput = output;
//	    reader.onload = function(){
//	      var dataURL = reader.result;      
//	      newOutput.attr("src", dataURL);
//	      newOutput.parent().show();
//	    };
//	    reader.readAsDataURL(input.files[0]);
//	}
//};
function checkPicCommentsLength() {
	var lenthFlag = 1;
	$(".picBox").children("textarea").each(function(i,e) {
		if($(e).val().length > 16) {
			lenthFlag = 0;
			return false;
		}
	});
	return lenthFlag;
}

$(function(){
	var firstProduct = 0;
	if($("#firstProduct").val() != undefined && $("#firstProduct").val() != null && $("#firstProduct").val() != "") {
		firstProject = parseInt($("#firstProduct").val());
	}
//	if($.trim($("#livingLen").val()) != "" && $.trim($("#livingLen").val()) != null ) {
//		livingCount = $("#livingLen").val();
//	}
//	if($.trim($("#bedLen").val()) != "" && $.trim($("#bedLen").val()) != null ) {
//		bedCount = $("#bedLen").val();
//	}
//	if($.trim($("#bathLen").val()) != "" && $.trim($("#bathLen").val()) != null ) {
//		bathCount = $("#bathLen").val();
//	}
//	if($.trim($("#kitchenLen").val()) != "" && $.trim($("#kitchenLen").val()) != null ) {
//		kitchenCount = $("#kitchenLen").val();
//	}
//	if($.trim($("#publicAreaLen").val()) != "" && $.trim($("#publicAreaLen").val()) != null ) {
//		publicCount = $("#publicAreaLen").val();
//	}
//	if($.trim($("#floorPrintList").val()) != "" && $.trim($("#floorPrintList").val()) != null ) {
//		floorPrintCount = $("#floorPrintList").val();
//	}
//	$(".picComment").each(function(index, element) {
//		fnTextVerify($(element),$(element).next().next(),16);
//	});
//	$("#uploadLiving").click(function() {
//		$("#livingPics").find(":file:eq("+livingCount+")").click();
//		$("#livingPics").find(":file").change(function(e) {
//			openFile(e,$(this).next().children("img"));
//			if(parseInt(livingCount) < parseInt(maxLiving)) {
//				livingCount++;
//			}
//		});
//	});
//	$("#uploadBed").click(function() {
//	 	$("#bedPics").find(":file:eq("+bedCount+")").click();
//	 	$("#bedPics").find(":file").change(function(e) {
//			openFile(e,$(this).next().children("img"));
//			if(parseInt(bedCount) < parseInt(maxBed)) {
//		 		bedCount++;
//			}
//		});
//	});
//	$("#uploadKitchen").click(function() {
//		$("#kitchenPics").find(":file:eq("+kitchenCount+")").click();
//		$("#kitchenPics").find(":file").change(function(e) {
//			openFile(e,$(this).next().children("img"));
//			if(parseInt(kitchenCount) < parseInt(maxKitchen)) {
//				kitchenCount++;
//			}
//		});
//		
//	});
//	$("#uploadBath").click(function() {
//		$("#bathPics").find(":file:eq("+bathCount+")").click();
//		$("#bathPics").find(":file").change(function(e) {
//			openFile(e,$(this).next().children("img"));
//			if(parseInt(bathCount) < parseInt(maxBath)) {
//				bathCount++;
//			}
//		});
//	});
//	$("#uploadPublic").click(function() {
//		$("#publicPics").find(":file:eq("+publicCount+")").click();
//		$("#publicPics").find(":file").change(function(e) {
//			openFile(e,$(this).next().children("img"));
//			if(parseInt(publicCount) < parseInt(maxPublicArea)) {
//				publicCount++;
//			}
//		});
//	});
//	$("#uploadFloorPrint").click(function() {
//		$("#floorPrintPics").find(":file:eq("+floorPrintCount+")").click();
//		$("#floorPrintPics").find(":file").change(function(e) {
//			openFile(e,$(this).next().children("img"));
//			if(parseInt(floorPrintCount) < parseInt(maxFloorPrint)) {
//				floorPrintCount++;
//			}
//		});
//	});
//	
//	$(".picBox .delpp").bind('click',function(){
//		var wichPic = $(this).parent().parent().attr("id");
//		if(wichPic == "publicPics") {
//			publicCount--;
//		} else if(wichPic == "floorPrintPics") {
//			floorPrintCount--;
//		} else if(wichPic == "bathPics") {
//			bathCount--;
//		} else if(wichPic == "kitchenPics") {
//			kitchenCount--;
//		} else if(wichPic == "bedPics") {
//			bedCount--;
//		} else if(wichPic == "livingPics") {
//			livingCount--;
//		}
//		$(this).parent().hide();
//		});
	
	//点击保存之后要做的动作
	$("#saveProduct").click(function() {
		var lf = checkPicCommentsLength();
		if(lf != 1) {
			return false;
		}
		$(".valid").attr("ignore","ignore");
		var saveType = parseInt($("#saveType").val());
		if(firstProduct == 0 && saveType == 0) {
			if(!add.check(false)) {
				return false;
			} else {
				$("#saveType").val("1");
			}
			//			$(this).attr("disabled", true);
			add.submitForm(false,"/Product.action?addProduct");
		} else {
			if(!add.check(false)) {
				return false;
			}
			//			$(this).attr("disabled", true);
			add.submitForm(false,"/Product.action?editProduct");
		}
	});
	//点击发布之后的操作
	$("#publishProduct").click(function() {
		var lf = checkPicCommentsLength();
		if(lf != 1) {
			return false;
		}
		$(".valid").attr("ignore","ignore");
		$(".must").attr("ignore","");
		if(!add.check(false)) {
			return false;
		}
		var saveType = parseInt($("#saveType").val());
		if(firstProduct == 0 && saveType == 0) {
			$(".valid").attr("ignore","ignore");
			if(!add.check(false)) {
				return false;
			}
			//			$(this).attr("disabled", true);
			$("#isPublish").val("1");
			add.submitForm(false,"/Product.action?addProduct");
		} else {
			$(".valid").attr("ignore","ignore");
			$(".must").attr("ignore","");
			if(!add.check(false)) {
				return false;
			}
			add.submitForm(false,"/Product.action?publishProduct");
		} 
	});

	
	//对卖单的表单进行校验  "virResidenceName":/^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-\\.·•]+$/,
	add = $("#productForm").Validform({
		tiptype:4, 
		ignoreHidden:true,
		ajaxPost:true,
		datatype:{
			"virLocation":/^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-]+$/,
			"bedRoom":function(gets,obj,curform,regxp) {
				var newBedRoom = parseInt(gets);
				var bedRoom = $("#bedRoom").val();
				if(isNaN(newBedRoom)) {
					return "请输入1-9之间的数字";
				}
				if(newBedRoom > 0 && newBedRoom <= 9 && bedRoom <= newBedRoom) {
					return true;
				} else {
					return "请输入1-9之间的数字,并且大于等于要求中的居室数";
				}
			},
			"bathRoom":function(gets,obj,curform,regxp) {
				var bathRoom = parseInt(gets);
				if(isNaN(bathRoom)) {
					return "请输入0-9之间的数字";
				}
				if(bathRoom >= 0 && bathRoom <= 9) {
					return true;
				} else {
					return "请输入0-9之间的数字";
				}
			},
			"livingRoom":function(gets,obj,curform,regxp) {
				var livingRoom = parseInt(gets);
				if(isNaN(livingRoom)) {
					return "请输入0-9之间的数字";
				}
				if(livingRoom >= 0 && livingRoom <= 9) {
					return true;
				} else {
					return "请输入0-9之间的数字";
				}
			},
			"price":function(gets,obj,curform,regxp) {
				var price = parseInt(gets);
				var budget = $("#budget").val();
				if(isNaN(price)) {
					return "请输入1-999999之间的数字";
				}
				if(price < 1 || price >= 1000000 ) {
					return "请输入1-999999之间的数字";
				} else {
					return true;
				}
			},
			"floorArea":function(gets,obj,curform,regxp) {
				var floorArea = parseInt(gets);
				if(isNaN(floorArea)) {
					return "请输入1-65535之间的数字";
				}
				if(floorArea > 0 && floorArea < 65536) {
					return true;
				} else {
					return "请输入1-65535之间的数字";
				}
			},
			"carPark":function(gets,obj,curform,regxp) {
				var carPark = parseInt(gets);
				if(isNaN(carPark)) {
					return "请输入0-9之间的数字";
				}
				if(carPark >= 0 && carPark <= 9) {
					return true;
				} else {
					return "请输入0-9之间的数字";
				}
			},
			"totalFloor":function(gets,obj,curform,regxp) {//参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
				var floor = parseInt($("#floor").val());
				var totalFloor = parseInt($("#totalFloor").val());
				if(totalFloor > 0 && totalFloor < 128) {
					if(!isNaN(floor)) {
						if(totalFloor < floor) {
							//$("#totalFloor").next().next().removeClass("Validform_right").addClass("Validform_wrong").text("所在楼层数应小于总楼层数");
							//return "所在楼层数应小于总楼层数";
							return "所在楼层数应小于总楼层数";
						} else {
							return true;
						}
					} else {
						return"请输入0-9之间的数字";
					}
				} else {
					return "请输入1-127之间的数字";
				}
			},
			"floor":function(gets,obj,curform,regxp) {//参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
				var floor = parseInt($("#floor").val());
				var totalFloor = parseInt($("#totalFloor").val());
				if(floor > 0 && floor < 128) {
					if(!isNaN(totalFloor)) {
						if(floor > totalFloor) {
							return "所在楼层数应小于总楼层数";
						} else {
							return true;
						}
					} else {
						return"请输入0-9之间的数字";
					}
					
				} else {
					return "请输入1-127之间的数字";
				}
				
			},
			"builtYear":function(gets,obj,curform,regxp) {
				var myDate = new Date();
				if(gets > myDate.getFullYear()) {
					return "建筑年代应该在当前时间之前";
				}
			}
		},
		callback:function(data){
			if($.trim(data.status) == "y"){
				var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>" + data.info + "</p></div><div class='popLine clearfix'></div></div>";
				popBox($(Qs));
				setTimeout(function(){
					$("#idName").remove();
					CoverLayer(0);
				},1500);
			} else if($.trim(data.status) == "r"){
				window.location.href = data.info;
			} else if($.trim(data.status) == "n") {
				var Qs="<div id='idName' class='divPopup'><h5>提示</h5><div class='textBox'>" + data.info + "</div><div class='btnBox clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
				popBox($(Qs),".confirmBtn");
			} else if($.trim(data.status) == "e") {
				window.location.href = "/";
			}
		}
	});
/*	$(".itemContent input").focus(function(){
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
		});*/
/*	$(".popup li").click(function(){
		$(this).parent().prev().val($(this).text()).blur();
		});
		
	$(".selectList .click").click(function(){
		$(this).siblings().removeClass("on")
			.end().addClass("on");	
		$(this).parent().next().val($(this).index() + 1).change();
		//alert($(this).parent().next().val());
		});*/
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
	$(".hMenu li").click(function(){
		$(this).siblings().removeClass("on")
			.end().addClass("on");	
		$(this).parent().next().val($(this).index() + 1).change();
		});
	$(".upload").eq(0).show().children().show();
	
	$("#picUpload li").click(function(){
		$(this).siblings("li").removeClass("on")
			.end().addClass("on");
		var clickIndex = $(this).index();
		$(".upload").hide();
		$(".upload").eq(clickIndex).show();
		});
	
/*	$(".delPic").click(function(){
		$(this).parent().remove();		
		});*/
	
	tagChoser({
		tagChosenUl: $("#tagChosen"),
		tagListUl: $("#tagList"),
		tagListUlBox: $("#tagList").parents(".divLine"),
		tagInput:$("#tagInput"),
		tagCount:5,
		warnSpan:$("#overstep"),
		tagValInput:$("#chosenvalueTags")
		}); 
	
	//$(".uploadBtn").next().hide();
//	$(".uploadBtn").click(function(){
//		$(this).next().click();
//		});contrive
	fnTextVerify($("#introduction"),$("#introduction").next(),200);
	fnTextVerify($(".contrive"),$(".contrive").next(),20);
	fnTextVerify($("#slogan"),$("#slogan").next(),20);
	$(".picbox").each(function(){
		fnTextVerify($(this).children("textarea"),$(this).children(".remainder"),16);
		});
});