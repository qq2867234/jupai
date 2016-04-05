<%@ page pageEncoding="UTF-8"%>
<div class="searchForm">
    <h2>搜索
        <a href='###' class="zgIcon zgIcon-remove" onclick="$('.searchForm').hide();return;"></a>
    </h2>
    <ul class="filter">
        <li class="bedroomLi">
            <select id="beds">
                <option selected>不限居室</option>
                <option value="0">合租</option>
                <option value="1">1居</option>
                <option value="2">2居</option>
                <option value="3">3居</option>
                <option value="4">4居及以上</option>
            </select>
        </li>
        <li class="priceLi">
            <input id="price" type="text" name="price" maxlength="6" class="fillSec"  onKeyUp="value=this.value.replace(/\D+/g,'')"  placeholder='不限租金'/>
        </li>
        <li class="locationLi">
            <input id="keyword" type="text" name="keyword" maxlength="16" placeholder="你的工作、学习地点" />
            <input id="lngLat" type="hidden">
            <button class="clearBtn" id="clearBtn" type="button" style="display: none;cursor:pointer">
                <span class="zgIcon zgIcon-remove"></span>
            </button>
        </li>
        <li class="locationLi">
           <input id="keyword2" type="text" name="keyword2" maxlength="16" placeholder="TA的工作、学习地点(可不填)" />
           <input id="lngLat2" type="hidden">
           <button class="clearBtn" id="clearBtn2" type="button" style="display: none;cursor:pointer">
                <span class="zgIcon zgIcon-remove"></span>
            </button>
        </li>
        <!-- <li class="showBrokersLi">
            <label for="showBrokersCheck">显示经纪人房源</label>
            <input type="checkbox" id="showBrokersCheck" />
        </li> -->
        <button type="button" class="searchBtn" id="innerSearchAnalysis">
            <span class="zgIcon zgIcon-search"></span>搜索
        </button>
    </ul>
</div>

<div class="header">
    <h1>真格在线</h1>
    <a href="###" class="header_search" onclick="$('.searchForm').show();return;">
        <span class="header_search_input">你的工作、学习地点</span>
        <span class="header_search_btn">
            <i class="zgIcon zgIcon-search"></i>
        </span>
    </a>
</div>

<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/plugIn/jquery.touchSwipe.min.js"></script>
<script type="text/javascript" src="/scripts/public/jquery-ui-1.10.4.custom.min.js"></script>

<script type="text/javascript">
$(function(){
	// 有定义HouseSearch，说明是在搜索页
	if(typeof HouseSearch != "undefined") {
		HouseSearch.eventBind();
	} else {
		// 点击搜索按钮触发   
	    $(".searchBtn").bind("click", search);
	    
	    keywordSuggestion($("#keyword"), $("#lngLat"));
	    keywordSuggestion($("#keyword2"), $("#lngLat2"));
	    addEnterKeyClick();
	    
	    // 关键词输入监听
	    $("#keyword").bind("input propertychange", function() {
	    	$("#lngLat").val("");
	    	if($("#keyword").val() != ""){
	    		$("#clearBtn").show();
	    		$(this).parent().removeClass("danger");
	    	}else{
	    		$("#clearBtn").hide();
	    	}
		}).bind("blur", function() {
			if($(this).val()!="")
				$(this).parent().removeClass("danger");
			else
				$(this).parent().addClass("danger");
		});
	    $("#keyword2").bind("input propertychange", function() {
	    	$("#lngLat2").val("");
	    	if($("#keyword2").val() != ""){
	    		$("#clearBtn2").show();
	    		$(this).parent().removeClass("danger");
	    	}else{
	    		$("#clearBtn2").hide();
	    	}
		}).bind("blur", function() {
			if($(this).val()!="")
				$(this).parent().removeClass("danger");
			else
				$(this).parent().addClass("danger");
		});
	    // 清空搜索条件 点击事件
	    $("#clearBtn").click(function() {
	    	if($("#keyword").val() != "") {
	    		$("#keyword").val("");
	    		$("#lngLat").val("");
	    	}
	    	$("#clearBtn").hide();
			$("#keyword").focus();
		});
	    $("#clearBtn2").click(function() {
	    	if($("#keyword2").val() != "") {
	    		$("#keyword2").val("");
	    		$("#lngLat2").val("");
	    	}
	    	$("#clearBtn2").hide();
			$("#keyword2").focus();
		});
	}
});

function search() {
	// 判断搜索类型
	var searchType = 2;
	if($("#keyword2").val() !="") {
		searchType = 3;
	}
	var beds = "";
	if($("#beds").val() == "合租") {
		beds = "0";
	} else {
		beds = $("#beds").val().replace(/\D/g, "");
	}
	var listRole;
	if($("#showBrokersCheck").is(":checked")) {
		listRole = 2;
   	} else {
   		listRole = 3;
   	}
	var lngLat
	window.location.href="/HouseSearch.action?goToSearcIndex&searchType="+searchType+"&keyword="+encodeURI(encodeURI($("#keyword").val()))+"&lngLat="+$("#lngLat").val()
			+"&keyword2="+encodeURI(encodeURI($("#keyword2").val()))+"&lngLat2="+$("#lngLat2").val()+"&beds="+beds+"&price="+$("#price").val().replace(/\D/g, "")+"&listRole="+listRole;
}

function keywordSuggestion($input, $output) {
	$input = $input || $("#keyword");
	$output = $output || $("#lngLat");
	var cacheResidence = {}; //小区缓存
	$input.autocomplete({
		minLength: 0,
		width: 318,
		autoFocus: true,
		source: function(request, response) {
			$output.val("");
			var term = request.term;
			if (term in cacheResidence) {
				response($.map(cacheResidence[term], function(item, index) {
					return {
						label: item.name,
						value: item.name,
						lngLat: item.lngLat
					};
				}));
				return;
			}
			$.ajax({
				url: '/TimeSearch.action?suggestion',
				data: {
					destination: encodeURIComponent(request.term)
				},
				type: 'post',
				dataType: "json",
				success: function(data, status, xhr) {
					if (data.status == 1) {
						cacheResidence[term] = data.list;
						response($.map(data.list, function(item, index) {
							return {
								label: item.name,
								value: item.name,
								lngLat: item.lngLat
							};
						}));
					}
				},
				error: function(data) {}
			});
		},
		select: function(event, ui) {
			event.preventDefault();
			$output.val(ui.item.lngLat);
			this.value = ui.item.value;
			$input.blur();
		}
	});
}

//添加回车事件
function addEnterKeyClick() {
	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if (e && e.keyCode == 13) {
			search();
		}
	};
}
</script>