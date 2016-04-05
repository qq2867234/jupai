//卧室图片最大值
var maxCount = 20;
var currCount = 0;
var picIndexArr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//初始化图片插件计数器
var picStartCount = 0;

var editor;

//租单上传图片操作
function beforRLUploadPic() {
	initPicCount($("#uploadBed"), $("#bedLen"), $("#bedPics"),  $("#bedHiddenFileName"), 3, $("#InputId"));
	picStartCount = 0;
}

//初始化图片个数、数组、显示数目    
//已有张数    默认初始张数   数组     最大张数 装图片的div  隐藏域  上传类型  装id的obj
function initPicCount(clickButtton, exCountObj, picBoxObject, hiddenFileNameOject, uploadPicType, listIdObject) {
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
		currCount = parseInt($(exCountObj).val());
	}
	initPicIndex();
	setDisplayNumber($(clickButtton), (maxCount - currCount), currCount);
	uploadListPic(clickButtton, picBoxObject, hiddenFileNameOject, listIdObject, uploadPicType);
}

function initMyK(uploadPicType, listId) {
	KindEditor.ready(function(K) {
		editor = K.editor({
			bodyClass:'kBody',
			allowFileManager : true,
			pluginsPath:'/scripts/upload/',
			uploadJson:'/UserCenterOperator.action?uploadUsersPic',
			filePostName:'photo',
			imageSizeLimit:'6MB',
			imageUploadLimit:'20',
			buttonImageUrl:"images/bank/card308.png",
			extraFileUploadParams : {
				uploadPicType : uploadPicType,
				listId : listId
			}
		});
	});
}

//初始化图片下标数组
function initPicIndex() {
	if(currCount > 0){
		for(var i = 0; i < currCount; i++) {
			picIndexArr[i] = 1;
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
function uploadListPic(clickButtton, picBoxObject, hiddenFileNameOject, listIdObject, picType) {
	if($(listIdObject).length > 0) {
		var listId = $(listIdObject).val();
		if(listId == "" || listId == null || listId == undefined) {
			listId = 0;
		}
	} else {
		listId = 0;
	}
	//绑定删除方法
//	$(picBoxObject) : $("#bedPics")
	bindOprEvent($(picBoxObject).find(".picbox"), clickButtton, picBoxObject, hiddenFileNameOject, listId, picType);
	$(clickButtton).bind('click', function() {
		var existFlag = 0;
		var i = 0;
		for(; i < picIndexArr.length; i++) {
			if(picIndexArr[i] == 0) {
				existFlag = 1;
				break;
			}
		}
		if(existFlag == 1) {
			editor.loadPlugin('multiimage', function() {
				editor.plugin.multiImageDialog({
					showRemote : false,
					clickFn : function(urlList) {
						if(urlList == false) return;
						$.each(urlList, function(i, data) {
							var url = data.url;
							var existFlag = 0;
							for(; i < picIndexArr.length; i++) {
								if(picIndexArr[i] == 0) {
									existFlag = 1;
									break;
								}
							}
							if(existFlag == 0) {
								alertDialog("图片数量已达到上限");
								return;
							}
							picIndexArr[i++] = 1;
							if(parseInt(currCount) < parseInt(maxCount)) {
								currCount++;
							}
							var remainder = maxCount - currCount;
							setDisplayNumber(clickButtton, remainder, currCount);
							var part1 = '<div class="picbox">' +
					                        '<img class="newGPic" src="'+url+'" alt="房产图片" width="200" height="100"/>'+
					                        '<div class="opr" style="display: none;"> <a href="###" class="setCover">设为封面</a><a href="###" class="delpp zgIcon zgIcon-remove"></a> </div>'+
					                    '</div>';
							//将图片放到页面上
							$(picBoxObject).append(part1).children().show();
							if(currCount == 1){
								// 初始第一张作为封面
								$(picBoxObject).children("div").first(".picbox").append("<span class='cover'></span>");
								// 保存封面图片名称
								$("#cover").val($(picBoxObject).children("div").first(".picbox").children("img").attr("src"));
							}
							//绑定删除方法
							bindOprEvent($(picBoxObject).children("div").last(".picbox"), clickButtton, picBoxObject, hiddenFileNameOject, listId, picType);
							//将url添加到hidden中
							var srcFileName = '';
							$(picBoxObject).children("div").children("img.newGPic").each(function() {
								srcFileName += getPicName($(this).attr('src')) + ',';
							});
							if (srcFileName.length > 0) {
								$(hiddenFileNameOject).val(srcFileName.substring(0,srcFileName.length-1));
							} else {
								$(hiddenFileNameOject).val("");
							}
						});
						editor.hideDialog();
					}
				});
			});
		} else {
			alertDialog('图片数量已达到上限');
		}
		
	});
}

function bindOprEvent(picbox, clickButtton, picBoxObject, hiddenFileNameOject, listId, picType) {
	// 删除
	picbox.find(".delpp").bind('click', function() {
		// 没用把
//		if($(this).parent().prev().hasClass("newGPic")) {
//			return false;
//		}
		
		// 删除的是第几张图片（从0开始编号）
		var index = $(this).parents(".picbox").index('.picbox');
		// 删除picIndexArr数组中的标志位，末尾补0
		removeElement(picIndexArr, index, currCount);
		// 更新数量
		currCount--;
		var remainder = maxCount - currCount;
		setDisplayNumber(clickButtton, remainder, currCount);
		
		// 删除的是否是封面
		var isDeleteCover = 0;
		if($(this).parents(".picbox").find(".cover").length > 0) {
			isDeleteCover = 1;
		}
		
		var _this = $(this);
		if(listId != 0) {
			var picId = $(this).parent().prev().attr("src");
			// 删除homeimage表里的图片
			$.ajax({
   	        	url:"/Project.action?delPicByPicId",
   	    		data:{picId:picId, picType:picType},
   	    		dataType:"json",
   	    		async : false,
   	    		type:"POST",
   	    		success:function(data, status) {
   	    			if(data.status == "y") {
   	    				_this.parents(".picbox").remove();
   	    			} else if(data.status == "n") {
   	    				alert(data.info);
   	    			}
   	    		}
   	        });
		} else {
			_this.parents(".picbox").remove();
		}
		
		// 如果删除的是封面，再选第一张作为封面
		if(isDeleteCover && currCount > 0) {
			var firstPicBox = $(picBoxObject).children("div").first(".picbox");
			// 第一张作为封面
			firstPicBox.append("<span class='cover'></span>");
			// 存放封面图路径的隐藏input也被移除，需要再次插入
			if($("#cover").length == 0) {
				firstPicBox.append('<input name="cover" id="cover" type="hidden"/>');
				
			}
			// 保存封面图片名称
			$("#cover").val(firstPicBox.children("img").attr("src"));
		}
		
		var srcFileName = '';
		$(picBoxObject).children("div").children("img.newGPic").each(function() {
			srcFileName += getPicName($(this).attr('src')) + ',';
		});
		if (srcFileName.length > 0) {
			$(hiddenFileNameOject).val(srcFileName.substring(0,srcFileName.length-1));
		} else {
			$(hiddenFileNameOject).val("");
		}
	});
	
	picbox.bind('mouseenter',function(){
	     $(this).find(".opr").show();
	});
	picbox.bind('mouseleave',function(){
	     $(this).find(".opr").hide();
	});
	
	// 设为封面
	picbox.find(".setCover").bind('click', function() {
		$(this).parents(".pics").find('.cover').remove();
		$(this).parents(".picbox").append("<span class='cover'></span>");
		$("#cover").val($(this).parents(".picbox").children("img").attr("src"));
	});
}

/**
 * 删除arr数组中的，下标未index的元素，之后的元素全部前移一位，末尾补0
 * @param arr
 * @param index
 */
function removeElement(arr, i, size) {
	for (; i < size; i++) {
		arr[i] = arr[i+1];
	}
	arr[size] = 0;
}

function getPicName(src) {
	return src.substring(src.lastIndexOf('/')+1);
}


