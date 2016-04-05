//客厅图片最大值
var maxLiving = 6;
//卧室图片最大值
var maxBed = 6;
//浴室图片最大值
var maxBath = 3;
//厨房图片最大值
var maxKitchen = 2;
//公共区域图片最大值
var maxPublicArea = 2;
//户型图图片最大值
var maxFloorPrint = 1;

//交通图最大值
var maxTraffic = 10;
//规划图最大值
var maxPlanning = 10;
//配套图最大值
var maxComplete = 10;
//景观图片最大值
var maxLandscape = 10;
//外观图最大值
var maxbuilding = 10;
//楼书最大值
var maxBrochure = 1;
//室内图最大值
var maxIndoor = 10;
//初始化图片插件计数器
var picStartCount = 0;

var livingCount = 0;
var bedCount = 0;
var bathCount = 0;
var publicCount = 0;
var floorPrintCount = 0;
var kitchenCount = 0;
var brochureCount = 0;
var livingPicIndex = [0,0,0,0,0,0];
var bedPicIndex = [0,0,0,0,0,0];
var bathPicIndex = [0,0,0];
var publicPicIndex = [0,0];
var floorPrintIndex = [0];
var kitchenPicIndex = [0,0];


var trafficCount = 0;
var planningCount = 0;
var completeCount = 0;
var landscapeCount = 0;
var buildingCount = 0;
var indoorCount = 0;

var trafficPicIndex = [0,0,0,0,0,0,0,0,0,0];
var planningPicIndex = [0,0,0,0,0,0,0,0,0,0];
var completePicIndex = [0,0,0,0,0,0,0,0,0,0];
var landscapePicIndex = [0,0,0,0,0,0,0,0,0,0];
var buildingIndex = [0,0,0,0,0,0,0,0,0,0];
var indoorIndex = [0,0,0,0,0,0,0,0,0,0];

var brochureIndex = [0];
var editor;
//卖单上传图片操作
function beforSLUploadPic() {
	initPicCount($("#uploadLiving"), $("#livingLen"), livingCount, livingPicIndex, maxLiving, $("#livingPics"),  $("#livingHiddenFileName"), 2, $("#InputId"));
	initPicCount($("#uploadBed"), $("#bedLen"), bedCount, bedPicIndex, maxBed, $("#bedPics"),  $("#bedHiddenFileName"), 2, $("#InputId"));
	initPicCount($("#uploadKitchen"), $("#kitchenLen"), kitchenCount, kitchenPicIndex, maxKitchen, $("#kitchenPics"),  $("#kitchenHiddenFileName"), 2, $("#InputId"));
	initPicCount($("#uploadBath"), $("#bathLen"), bathCount, bathPicIndex, maxBath, $("#bathPics"),  $("#bathHiddenFileName"), 2, $("#InputId"));
	initPicCount($("#uploadPublic"), $("#publicAreaLen"), publicCount, publicPicIndex, maxPublicArea, $("#publicPics"),  $("#publicHiddenFileName"), 2, $("#InputId"));
	initPicCount($("#uploadFloorPrint"), $("#floorPrintList"), floorPrintCount, floorPrintIndex, maxFloorPrint, $("#floorPrintPics"),  $("#floorPrintHiddenFileName"), 2, $("#InputId"));
	picStartCount = 0;
}

//租单上传图片操作
function beforRLUploadPic() {
	initPicCount($("#uploadLiving"), $("#livingLen"), livingCount, livingPicIndex, maxLiving, $("#livingPics"),  $("#livingHiddenFileName"), 3, $("#InputId"));
	initPicCount($("#uploadBed"), $("#bedLen"), bedCount, bedPicIndex, maxBed, $("#bedPics"),  $("#bedHiddenFileName"), 3, $("#InputId"));
	initPicCount($("#uploadKitchen"), $("#kitchenLen"), kitchenCount, kitchenPicIndex, maxKitchen, $("#kitchenPics"),  $("#kitchenHiddenFileName"), 3, $("#InputId"));
	initPicCount($("#uploadBath"), $("#bathLen"), bathCount, bathPicIndex, maxBath, $("#bathPics"),  $("#bathHiddenFileName"), 3, $("#InputId"));
	initPicCount($("#uploadPublic"), $("#publicAreaLen"), publicCount, publicPicIndex, maxPublicArea, $("#publicPics"),  $("#publicHiddenFileName"), 3, $("#InputId"));
	initPicCount($("#uploadFloorPrint"), $("#floorPrintList"), floorPrintCount, floorPrintIndex, maxFloorPrint, $("#floorPrintPics"),  $("#floorPrintHiddenFileName"), 3, $("#InputId"));
	picStartCount = 0;
}

//新盘图片上传
function beforResidenceUploadPic() {
	initPicCount($("#uploadTraffic"), $("#trafficLen"), trafficCount , trafficPicIndex , maxTraffic, $("#trafficPics"),  $("#trafficHiddenFileName"), 4, $("#residenceId"));
	initPicCount($("#uploadPlanning"), $("#planningLen"), planningCount, planningPicIndex, maxPlanning, $("#planningPics"),  $("#planningHiddenFileName"), 4, $("#residenceId"));
	initPicCount($("#uploadComplete"), $("#completeLen"), completeCount , completePicIndex, maxComplete, $("#completePics"),  $("#completeHiddenFileName"), 4, $("#residenceId"));
	initPicCount($("#uploadLandscape"), $("#landscapeLen"), landscapeCount, landscapePicIndex, maxLandscape, $("#landscapePics"),  $("#landscapeHiddenFileName"), 4, $("#residenceId"));
	initPicCount($("#uploadBuilding"), $("#buildingLen"), buildingCount, buildingIndex, maxbuilding, $("#buildingPics"),  $("#buildingHiddenFileName"), 4, $("#residenceId"));
	initPicCount($("#uploadFloorPrint"), $("#floorPrintList"), indoorCount, indoorIndex, maxIndoor, $("#floorPrintPic"),  $("#floorPrintHiddenFileName"), 4, $("#residenceId"));
	picStartCount = 0;
	initPicCount($("#uploadBrochure"), $("#brochureLen"), brochureCount, brochureIndex, maxBrochure, $("#brochurePics"),  $("#brochureHiddenFileName"), 5, $("#residenceId"));
}

//初始化图片下标数组
function initPicIndex(picIndexArr, currCount, maxCount) {
	var toFillCount = maxCount - currCount;
	if(toFillCount == maxCount) {
		return false;
	}
	for(var i = 0; i < picIndexArr.length; i++) {
		if(currCount > 0) {
			picIndexArr[i] = 1;
			currCount--;
		} else {
			return false;
		}
	}
}
//设置图片张数
function setDisplayNumber(obj, numa, numb) {
	$(obj).next().children(".loadN").text(numb);//已上传
	$(obj).next().children(".canA").text(numa);//还可上传
}

//上传单子中的图片  
//上传图片按钮的id  
//div的jquery对象   
//图片名隐藏域对象    
//单子编号
//图片数组
//当前数目
//最大数目
//类型 1用户上传，2卖单上传， 3租单， 4新盘，5楼书
function uploadListPic(clickButtton, picBoxObject, hiddenFileNameOject, listIdObject, picIndexArr, currCount, maxCount, picType) {
	if($(listIdObject).length > 0) {
		var listId = $(listIdObject).val();
		if(listId == "" || listId == null || listId == undefined) {
			listId = 0;
		}
	} else {
		listId = 0;
	}
	
	//绑定删除方法  .children("span.delpp")  children("div").children
//	alert($(picBoxObject).find("img").html());
	$(picBoxObject).find("span.delpp").bind('click', function() {
		if($(this).prev().hasClass("newGPic")) {
			return false;
		}
		var $seconde = $(this);
		var index = $(this).parent().index('.picBox');
		picIndexArr[index] = 0;
		currCount--;
		var remainder = maxCount - currCount;
		setDisplayNumber(clickButtton, remainder, currCount);
		if(listId != 0) {
			var picId = $(this).prev().attr("src");
			$.ajax({
   	        	url:"/Project.action?delPicByPicId",
   	    		data:{picId:picId, picType:picType},
   	    		dataType:"json",
   	    		async : false,
   	    		type:"POST",
   	    		success:function(data, status) {
   	    			if(data.status == "y") {
   	    				$seconde.parent().remove();
   	    			} else if(data.status == "n") {
   	    				alert(data.info);
   	    			}
   	    		}
   	        });
		} else {
			$seconde.parent().remove();
		}
		if(picType != 5) {
			var srcFileName = '';
			$(picBoxObject).children("div").children("img.newGPic").each(function() {
				srcFileName += $(this).attr('src').substring($(this).attr('src').lastIndexOf('/')+1) + ',';
			});
			if (srcFileName.length > 0) {
				$(hiddenFileNameOject).val(srcFileName.substring(0,srcFileName.length-1));
			} else {
				$(hiddenFileNameOject).val("");
			}
		} else {
			$(hiddenFileNameOject).val("");
		}
	});
	$(clickButtton).bind('click', function() {
		var pIndex = 0;
		var existFlag = 0;
		var i = 0;
		for(; i < picIndexArr.length; i++) {
			if(picIndexArr[i] == 0) {
				existFlag = 1;
				break;
			}
		}
		if(existFlag == 1) {
//			editor.loadPlugin('image', function() {
//				editor.plugin.imageDialog({
//					showRemote : false,
//					clickFn : function(url, title, width, height, border, align) {
			editor.loadPlugin('multiimage', function() {
				editor.plugin.multiImageDialog({
					showRemote : false,
					clickFn : function(urlList) {
						K.each(urlList, function(i, data) {
							var url = data.url;
							picIndexArr[i] = 1;
							if(parseInt(currCount) < parseInt(maxCount)) {
								currCount++;
							}
							var remainder = maxCount - currCount;
							setDisplayNumber(clickButtton, remainder, currCount);
							var part1 = "";
							if(picType == 5) {
								part1 = "<a href='/Project.action?downLoadBrochure&filename="+url+"'>楼书已经上传,可进行下载查看</a>";
								var srcFileName = '';
								srcFileName = url.substring(url.lastIndexOf('/')+1);
								$(hiddenFileNameOject).val(srcFileName);
							} else {
								
								part1 = "<div class='picBox defaultPicBox' >" +
											"<img class='newGPic' src='"+url+"' /> " +
											"<span class='delpp zgIcon zgIcon-remove'></span>" +
										"</div>";
							}
							//将图片放到页面上
							$(picBoxObject).append(part1).children().show();
							//绑定删除方法
							$(picBoxObject).children("div").children().last("span.delpp").bind('click', function() {
								var $seconde = $(this);
								var index = $(this).parent().index('.picBox');
								picIndexArr[index] = 0;
								currCount--;
								var remainder = maxCount - currCount;
								setDisplayNumber(clickButtton, remainder, currCount);
								if(listId != 0) {
									var picId = $(this).prev().attr("src");
									$.ajax({
			               	        	url:"/Project.action?delPicByPicId",
			               	    		data:{picId:picId, picType:picType},
			               	    		dataType:"json",
			               	    		async : false,
			               	    		type:"POST",
			               	    		success:function(data, status) {
			               	    			if(data.status == "y") {
			               	    				$seconde.parent().remove();
			               	    			} else if(data.status == "n") {
			               	    				alert(data.info);
			               	    			}
			               	    		}
			               	        });
								} else {
									$seconde.parent().remove();
								}
								if(picType != 5) {
									var srcFileName = '';
		    						$(picBoxObject).children("div").children("img.newGPic").each(function() {
		    							srcFileName += $(this).attr('src').substring($(this).attr('src').lastIndexOf('/')+1) + ',';
		    						});
		    						if (srcFileName.length > 0) {
		    							$(hiddenFileNameOject).val(srcFileName.substring(0,srcFileName.length-1));
		    						} else {
		    							$(hiddenFileNameOject).val("");
		    						}
								} else {
									$(hiddenFileNameOject).val("");
								}
								
							});
							//将url添加到hidden中
							if(picType != 5) {
								var srcFileName = '';
								$(picBoxObject).children("div").children("img.newGPic").each(function() {
									srcFileName += $(this).attr('src').substring($(this).attr('src').lastIndexOf('/')+1) + ',';
								});
								if (srcFileName.length > 0) {
									$(hiddenFileNameOject).val(srcFileName.substring(0,srcFileName.length-1));
								} else {
									$(hiddenFileNameOject).val("");
								}
							}
						});
						editor.hideDialog();
					}
				});
			});
		} else {
			// var Qs = "<div id='idName' class='divPopup round'><h5>提示</h5><div class='textBox'><p>图片数量已达到上限</p></div><div class='popLine clearfix'><button id='question' class='confirmBtn onlyBtn btn btn-success'>确认</button></div></div>";
			// popBox($(Qs), ".confirmBtn");
			confirmDialog('图片数量已达到上限');
		}
		
	});
}
// 初始化图片个数、数组、显示数目    
//已有张数    默认初始张数   数组     最大张数 装图片的div  隐藏域  上传类型  装id的obj
function initPicCount(clickButtton, exCountObj, startCount, picIndexArr, maxCount, picBoxObject, hiddenFileNameOject, uploadPicType, listIdObject) {
	if($(listIdObject).length > 0) {
		var listId = $(listIdObject).val();
		if(listId == "" || listId == null || listId == undefined) {
			listId = 0;
		}
	} else {
		listId = 0;
	}
	
	if(picStartCount == 0) {
		initMyK(uploadPicType, listId);
		picStartCount++;
	}
	if(!$(exCountObj)) {
		return false;
	}
	if($.trim($(exCountObj).val()) != "" && $.trim($(exCountObj).val()) != null && $.trim($(exCountObj).val()) != undefined) {
		startCount = parseInt($(exCountObj).val());
	}
	initPicIndex(picIndexArr, startCount, maxCount);
	setDisplayNumber($(clickButtton), (maxCount - startCount), startCount);
	uploadListPic(clickButtton, picBoxObject, hiddenFileNameOject, listIdObject, picIndexArr, startCount, maxCount, uploadPicType);
}

function initMyK(uploadPicType, listId) {
	KindEditor.ready(function(K) {
		editor = K.editor({
			bodyClass:'kBody',
			allowFileManager : true,
			pluginsPath:'/scripts/upload/',
			uploadJson:'/UserCenterOperator.action?uploadUsersPic',
			filePostName:'photo',
			extraFileUploadParams : {
				uploadPicType : uploadPicType,
				listId : listId
			}
		});
	});
}
