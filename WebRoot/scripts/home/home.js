$(function(){

    $("#showFlowTips,.flowTips").mouseenter(function(){
        $(".flowTips").fadeIn(200);
    })
    $("#showFlowTips,.flowTips").mouseleave(function(){
        $(".flowTips").fadeOut(200);
    })
  var tv = fnBrowser();
  if(tv&&tv <=8){
    var oBrowser = "<div class='browser'>亲，你OUT啦，微软亲妈都抛弃IE啦，你可以<a href='http://download.firefox.com.cn/releases/stub/official/zh-CN/Firefox-latest.exe'>下载火狐浏览器</a>,或者<a href='http://58.30.31.197:9999/dlsw.baidu.com/sw-search-sp/soft/9d/14744/ChromeStandalone_47.0.2526.73_Setup.1449470176.exe'>下载谷歌浏览器</a>。</div>";
    $(oBrowser).prependTo($('body'));
    // $(".browser span.fa").bind('click',function(){
    //     $(this).parents(".browser").remove();
    // })
  }

    fnCreatePopBox({
        divContent: "<a href='/lucky'><img src='/images/home/activity_pc.jpg' alt='万元寻赏'/><button type='button'>查看详情</button></a><span class='zgIcon zgIcon-remove' id='closeActivityBtn'></span>",
        className: 'activity',
        confirmBtn: false,
        cancelBtn: false,
        width: '800px',
        height: '330px',
        fn: function(){
        }
    });
    
    $("#closeActivityBtn").bind('click',function(){
    	$(this).parents(".activity").remove();
    	CoverLayer(0);
    });

    $('.flexslider').flexslider({
            animation: "fade"
    });

    $(".quotList").find("a").each(function() {
        $(this).mouseenter(function(){
            $(this).children("span").toggleClass("over")
                .siblings('strong').toggleClass("over");
        });
        $(this).mouseleave(function(){
            $(this).children("span").toggleClass("over")
                .siblings('strong').toggleClass("over");
        });
    });

	
	
    $(".tabIndex li").mouseenter(function() {
        $(this).addClass("on").siblings().removeClass('on');
        $(this).parents("#footer")
            .find(".footer_content")
            .find('.tabContent')
            .eq($(this).index())
            .show().siblings().hide();
    });
    // 搜索提示
    keywordSuggestion();
    
    // 找房 点击事件
    $("#beginRent").click(function() {
    	if($("#keyword").val() !="" || $("#lngLat").val() !=""){
    		// TODO 这里获取用户输入的关键词，然后编码，传到后台，后台跳转到找房页面，并直接将关键词传回前台，在显示在输入框中，【显示乱码】，你看看是什么问题吧。
    		var kw = encodeURI(encodeURI($("#keyword").val()));
    		window.location.href="/HouseSearch.action?goToSearcIndex&searchType=2&keyword="+kw+"&lngLat="+$("#lngLat").val();
    	}else{
    		window.location.href="/HouseSearch.action";
    	}
	});
});

//搜索提示
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
