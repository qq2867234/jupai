
var editor;
//上传图片 上传图片按钮的id  img的jquery对象  隐藏域对象
function uploadPicFinal(uploadId, picObject, hiddenFileOject) {
	$('#'+uploadId).unbind("click"); // 不先取消绑定click事件的话，会触发两次click事件，不知道原因
	$('#'+uploadId).click(function() {
		editor.loadPlugin('image', function() {
			editor.plugin.imageDialog({
				showRemote : false,
				clickFn : function(url, title, width, height, border, align) {
					$(picObject).attr("src", url);
					$(hiddenFileOject).val(url);
					editor.hideDialog();
					if($(".reUpLoadBtn").length > 0) {
						$(".reUpLoadBtn").show();
						$("#headPic").show();
					}
				}
			});
		});
	});
}

function initMyK(uploadPicType) {
	KindEditor.ready(function(K) {
		editor = KindEditor.editor({
			allowFileManager : true,
			pluginsPath:'/scripts/upload/',
			uploadJson:'/UserCenterOperator.action?uploadUsersPic',
			filePostName:'photo',
			extraFileUploadParams : {
				uploadPicType : uploadPicType
			}
		});
	});
}

$(function() {
//	KindEditor.ready(function(K) {
//		editor = K.editor({
//			allowFileManager : true,
//			pluginsPath:'/scripts/upload/',
//			uploadJson:'/UserCenterOperator.action?uploadUsersPic',
//			filePostName:'photo',
//			extraFileUploadParams : {
//				uploadPicType : 1
//			}
//		});
//	});
		/*editor = KindEditor.editor({
			allowFileManager : true,
			pluginsPath:'/scripts/upload/',
			uploadJson:'/UserCenterOperator.action?uploadUsersPic',
			filePostName:'photo',
			extraFileUploadParams : {
				uploadPicType : 1
			}
		});*/
		if($("#chooseUploadPic").length > 0) {
			initMyK(1);
			uploadPicFinal("chooseUploadPic", $("#headPic"), $("#hiddenFileName"));
		}
		
		if($("#chooseUploadPicId").length > 0) {
			initMyK(0);
			uploadPicFinal("chooseUploadPicId", $("#headPic"), $("#hiddenFileName"));
		}
		
		if($("#chooseUploadPic2").length > 0) {
			initMyK(1);
			uploadPicFinal("chooseUploadPic2", $("#headPic2"), $("#hiddenFileName2"));
		}
});





function previewPic(clickButtton, pic) {
	$(clickButtton).bind("click",function() {
		$(clickButtton).siblings(":file").click();
	});
	$(clickButtton).siblings(":file").bind("change",function(e) {
		openFile(e,$(pic), $(this).parent().children(".ieImg"), $(this));
	});
}
//用于IE浏览器预览图片
function getRealPath(uploadInput){
	var file_upl = $(uploadInput);
	file_upl.select();
	return document.selection.createRange().text;
} 
var openFile = function(event, output, showBox, uploadInput) {
	if(browser == "Microsoft Internet Explorer") {
		$(output).attr("src", "");
		var imgpath= getRealPath(uploadInput);
		showBox[0].style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\""+ imgpath + "\")";//使用滤镜效果
		$(showBox).css("display", "block").children().css("display", "block");
	} else {
		var input = event.target;
	    var reader = new FileReader();
	    var newOutput = output;
	    if(!/image/.test(input.files[0].type)) {
	    	$("#picError").removeClass("Validform_right").addClass("Validform_wrong").text("文件格式不正确");
	    	return false;
	    }
	    reader.onload = function(){
	      var dataURL = reader.result;      
	      newOutput.attr("src", dataURL);
	      newOutput.parent().show();
	    };
	    reader.readAsDataURL(input.files[0]);
	}
}