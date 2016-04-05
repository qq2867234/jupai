var images = {
    localId: [],
    serverId: []
};

wx.error(function (res) {
  alert(res.errMsg);
});

var chooseResidenceFlag = false;
var publishRentForm;
$(function() {
	
	if(rid) {
		chooseResidenceFlag = true;
	}

	$.Tipmsg.r = "";
	
	$(".checkbox li").each(function(){
        fnCheckBox($(this));
    });
    $(".checkbox li").click(function(){
        $(this).toggleClass('on');
        fnCheckBox($(this));
    });
    
    $(".form-control-static").click(function() {
		$("#"+$(this).attr("for")).focus();
	});
    $(".radiobox").each(function() {
        fnCreateRadiobox({
            ul : $(this),
            boxUseType : 1
        });

    });
    publishRentForm = $("#publishRentForm").Validform({
		ignoreHidden : true,
		ajaxPost : true,
		postonce : true,
		btnSubmit : $("#publish"),
		datatype : myDataType,
		tiptype:function(msg, o, cssctl){
			//msg：提示信息;
		    //o:{obj:*,type:*,curform:*},
		    //obj指向的是当前验证的表单元素（或表单对象，验证全部验证通过，提交表单时o.obj为该表单对象），
		    //type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, 
		    //cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;
			var cssObj=o.obj.parent(".form-control");
			switch(o.type){
				case 1: // checking
					break;
				case 2: // passed
				case 4: // for ignore
					cssObj.removeClass("warning");
					break;
				case 3: // wrong
					cssObj.addClass("warning");
					if($(".weui_dialog").length == 0) {
						fnCreateDialog({
							content : msg
						});
//						$.toast.prototype.defaults.duration = 3000;
//						$.toast(msg, "forbidden");
					}
					break;
			}
		},
		beforeSubmit : function(curform) {
			saving();
			if (!chooseResidenceFlag) {
				completed();
				fnCreateDialog({
					content : "请选择提示列表中的小区"
				});
				return false;
			}
			
			if (images.localId.length == 0) {
				completed();
				fnCreateDialog({
					content : "请上传照片"
				});
				return false;
		    }
			if(images.serverId.length != images.localId.length) {
				uploadImage();
				return false;
			}
			return true;
        },
        callback:function(data){
        	completed();
			if ($.trim(data.status) == "1") {
				publishRentForm.resetForm();
				$("#rentUrl").attr("href",data.url);
				$("#publishRentForm").hide();
				$("#pubResult").show();
			} else if ($.trim(data.status) == "2") {
				publishRentForm.resetForm();
//				$("#publishRentForm").hide();
//				$("#pubResult").show();
//				fnCreateDialog({
//					content : "房源发布成功。为了靠谱，本平台每个人均需一次性验证真实身份。",
//					confirmFn : function() {
//						$.showLoading("页面跳转中");
//						window.location.href = "/Rent.action?goToIdVerify";
//					}
//				});
				$.showLoading("页面跳转中");
				window.location.href = "/Rent.action?goToIdVerify&listId="+data.listId;
			} else {
				fnCreateDialog({
					content : data.info
				});
			}
		}
	});
	
	// 拍照、本地选图
	$("#chooseImage").click(chooseImage);
	
	var cacheResidence = {};
	$("#commuInput").autocomplete({
		minLength : 0,
		width : 318,
		autoFocus : true,
		source : function(request, response) {
			var cityCode = $("#cityCode").val();
			var term = request.term;
			if (term in cacheResidence) {
				response($.map(cacheResidence[term], function(item, index) {
					return {
						label : item.residenceName,
						value : item.residenceName,
						rid : item.residenceId,
						lng : item.lng,
						lat : item.lat
					};
				}));
				return;
			}
			$.ajax({
//				url : '/EditBrokerInfo.action?getResidenceListByCityCode',
				url : '/Search.action?searchResidenceByCityCode',
				data : {
					cityCode : cityCode,
					keyword : encodeURIComponent(request.term)
				},
				type : 'post',
				dataType : "json",
				success : function(data, status, xhr) {
					cacheResidence[term] = data;
					response($.map(data, function(item, index) {
						return {
							label : item.residenceName,
							value : item.residenceName,
							rid : item.residenceId,
							lng : item.lng,
							lat : item.lat
						};
					}));
				},
				error : function(data) {
				}
			});
		},
		select : function(event, ui) {
			event.preventDefault();
			chooseResidenceFlag = true;
			$("#residenceId").val(ui.item.rid);
			$("#lat").val(ui.item.lat);
			$("#lng").val(ui.item.lng);
			this.value = String(ui.item.label).substring(0, String(ui.item.label).indexOf("("));
			$("#commuInput").blur();
		}
	}).focus(function() {
		$(this).autocomplete("search", "");
	});
//	.change(function() {
//		if ($(this).val() != selectedResidenceName) {
//			chooseResidenceFlag = false;
//		}
//	});

});

function saving() {
	$(":submit").text('发布中...');
    $(":submit").attr("disabled", "true");
    $(":submit").addClass("forbidden");
}

function completed() {
	$(":submit").text('发布房源');
    $(":submit").removeAttr("disabled");
    $(":submit").removeClass("forbidden");
}

function fnCheckBox($this) {
    var className = $this.attr('class').replace(" on",'');
    if($this.hasClass('on')) {
    	if(className == "age") {
    		$("#wantTenant").children('.'+className).val('60');
    	}
    	else if(className == "family") {
    		$("#wantTenant").children('.'+className).val('家庭居住优先');
    	}
    	else {
    		$("#wantTenant").children('.'+className).val('1');
    	}
    }
    else {
        $("#wantTenant").children('.'+className).val('');
    }
}

// 选择图片
function chooseImage() {
	wx.chooseImage({
	    count: 9, // 默认9
	    sizeType: ['original', 'compressed'], 	// 可以指定是原图还是压缩图，默认二者都有
	    sourceType: ['album', 'camera'], 		// 可以指定来源是相册还是相机，默认二者都有
	    success: function (res) {
	    	for ( var i = 0, len = res.localIds.length; i < len; i++) {
				$("#chooseImage").before('<li class="weui_uploader_file" style="background-image:url('+res.localIds[i]+')"></li>');
//				$("#uploadFiles").append('<li class="weui_uploader_file weui_uploader_status" style="background-image:url('+res.localIds[i]+')"><div class="weui_uploader_status_content">等待上传</div></li>');
				images.localId.push(res.localIds[i]);
			}
	    	$(".weui_uploader_file").unbind('click').click(function(){
	    		var index = $(this).index();
	    		wx.previewImage({
	    		    current: images.localId[index], // 当前显示图片的http链接
	    		    urls: images.localId // 需要预览的图片http链接列表
	    		});
	    	});
	    }
	});
}

// 上传图片
function uploadImage() {
	if (images.localId.length == 0) {
      alert('请选择房源图片');
      return;
    }
	$.showLoading("图片上传中");
    var i = 0, length = images.localId.length;
    images.serverId = [];
    function upload() {
      wx.uploadImage({
        localId: images.localId[i],
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function (res) {
          // 上传成功
//          $(".weui_uploader_file").eq(i).removeClass("weui_uploader_status").children().remove();
          if($("#homeImages").val() == "") {
        	  $("#homeImages").val(res.serverId);
          } else {
        	  $("#homeImages").val($("#homeImages").val()+","+res.serverId);
          }
          images.serverId.push(res.serverId);
          if (++i < length) {
        	  upload();
          } 
          // 上传完毕，提交表单
          else {
        	  $.hideLoading();
        	  publishRentForm.submitForm();
          }
        },
        fail: function (res) {
          alert(JSON.stringify(res));
        }
      });
    }
    upload();
}


//校验规则
var myDataType = {
	"virLocation" : /^(?!-)(?!.*?-$)[a-zA-Z\u4e00-\u9fa50-9\\-]+$/,
	"bedRoom" : function(gets, obj, curform, regxp) {
		var newBedRoom = parseInt(gets);
		if (isNaN(newBedRoom)) {
			return "请输入1-9之间的居室数";
		}
		if (newBedRoom > 0 && newBedRoom <= 9) {
			return true;
		} else {
			return "请输入1-9之间的居室数";
		}
	},
	"bathRoom" : function(gets, obj, curform, regxp) {
		var bathRoom = parseInt(gets);
		if (isNaN(bathRoom)) {
			return "请输入0-9之间的卫生间数";
		}
		if (bathRoom >= 0 && bathRoom <= 9) {
			return true;
		} else {
			return "请输入0-9之间的卫生间数";
		}
	},
	"price" : function(gets, obj, curform, regxp) {
		var price = parseInt(gets);
		if (isNaN(price)) {
			return "请输入1-999999之间的月租金";
		}
		if (price < 1 || price >= 1000000) {
			return "请输入1-999999之间的月租金";
		} else {
			return true;
		}
	},
	"floorArea" : function(gets, obj, curform, regxp) {
		var floorArea = parseInt(gets);
		if (isNaN(floorArea)) {
			return "请输入1-999之间的面积";
		}
		if (floorArea > 0 && floorArea < 1000) {
			return true;
		} else {
			return "请输入1-999之间的面积";
		}
	}
};