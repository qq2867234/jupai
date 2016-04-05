/**
 * 分页类
 */
var Pager = {
	url: '',		// 请求url
	currPage: 1,	// 当前页码
	pageSize: 10,	// 每页显示条数
	rows: 0,		// 总条数
	pages: 0,		// 总页数
	mode: 1,		// 模式：1-加载更多 2-上一页下一页 （默认为模式1）
	nextBtn: null,	// 下一页JQuery对象
	prevBtn: null,	// 上一页JQuery对象
	cache: false, 	// 是否开启缓存
	fillData: null, // 填充数据方法
	data: {}, 		// 提交到后台的参数
	waitingCotent: null, //放菊花的位置
	btnLoadingText: "加载中...",
	btnLoadedText: "加载更多",
	useMasonry: false,
	
	// 还原页码、页数
	clean : function() {
		Pager.currPage = 1;
		Pager.rows = 0;
		Pager.pages = 0;
	},
	// 初始化
	init : function(param) {
		Pager.url = param.url;
		Pager.mode = param.mode || 1;
		Pager.nextBtn = param.nextBtn || $("#nextPage");
		if(Pager.mode == 2)
			Pager.prevBtn = param.prevBtn || $("#prevPage");
		Pager.pageSize = param.pageSize || 10;
		Pager.cache = param.cache || false;
		Pager.data = param.data || {};
		Pager.fillData = param.fillData;
		Pager.waitingCotent = param.waitingCotent || $("#nextPage");
		Pager.useMasonry = param.useMasonry || false;
		
		Pager.clean();
		Pager.addWaiting();
		
		// 先获取第一页数据
		Pager.getDataAndShow();
		
		Pager.invalidateNext();
		if(Pager.prevBtn != null) Pager.invalidatePrev();
		Pager.nextBtn.unbind('click');
		// 绑定下一页点击事件
		Pager.nextBtn.click(Pager.nextPage);
		
		// 如果需要上一页
		if(Pager.prevBtn != null){
			Pager.prevBtn.unbind('click');
			// 绑定上一页点击事件
			Pager.prevBtn.click(Pager.prevPage);
			
		}
	},
	
	//禁用下一页按钮
	disableNextPage: function() {
		Pager.nextBtn.addClass("forbidden");
		Pager.nextBtn.text(Pager.btnLoadingText);
	},
	//使用下一页按钮
	enableNextPage: function() {
		Pager.nextBtn.removeClass("forbidden");
		Pager.nextBtn.text(Pager.btnLoadedText);
	},
	// 下一页
    nextPage : function() {
    	Pager.addWaiting();
    	if(Pager.useMasonry) {
    		Pager.disableNextPage();
    	}
    	// 页码+1
    	Pager.currPage ++;
    	if (Pager.currPage <= Pager.pages) {
	    	// 开启缓存
			if(Pager.cache){
				// 从缓存获取数据
				var cache = Pager.fetchData(Pager.currPage);
				// 已缓存过，向页面填充数据
				if(cache != []) {
					var data = {};
					data.pageModel = cache;
					Pager.fillData(data);
				}
				// 未缓存过，到后台获取数据
				else Pager.getDataAndShow();
			}else{
				Pager.getDataAndShow();
				if(Pager.useMasonry) {
					Pager.enableNextPage();	
				}
			}
    	}
    	Pager.invalidateNext();
		if(Pager.prevBtn != null) Pager.invalidatePrev();
	},
	// 上一页
	prevPage : function() {
    	// 页码-1
    	Pager.currPage --;
    	if (Pager.currPage > 0) {
	    	// 开启缓存
			if(Pager.cache){
				// 从缓存获取数据
				var cache = Pager.fetchData(Pager.currPage);
				// 已缓存过，向页面填充数据
				if(cache != []) {
					var data = {};
					data.pageModel = cache;
					Pager.fillData(data);
				}
				// 未缓存过，到后台获取数据
				else Pager.getDataAndShow();
			}else{
				Pager.getDataAndShow();
			}
    	}
    	Pager.invalidateNext();
		if(Pager.prevBtn != null) Pager.invalidatePrev();
	},

	//添加等待标签
	addWaiting: function() {
		var oWait = "<div id='waiting' class='waiting'></div>";
		Pager.waitingCotent.before(oWait);
	},
	
	//删除等待标签
	removeWaiting: function(obj) {
		obj.remove();
	},
	
	// 从后台获取数据并显示
	getDataAndShow : function() {
		// 设置请求页码
		Pager.data.currPage = Pager.currPage;
		$.ajax({
			url: Pager.url, 
			data: Pager.data, 
			type: "post", 
			async: false,
			timeout: 3000,
			success: function(data) {
				// 有分页数据
				if(data.pageModel != undefined && data.pageModel.result.length > 0){
					// 只有第一页才有总行数和总页数
					if(Pager.currPage == 1){
						Pager.rows = data.pageModel.rows;
						Pager.pages = data.pageModel.pages;
						if(Pager.rows > 0) Pager.nextBtn.show();
					}
					// 如果需要缓存
					if(Pager.cache){
						// 缓存数据
						Pager.cacheData(data.pageModel);
					}
				}
				// 向页面填充数据
				Pager.fillData(data);
			},
			error:function(error){
				// alertDialog("系统异常，请稍后再试");
			}
		});
	},
	// 缓存数据
	cacheData : function(pageModel) {
		$("body").data(String("P" + Pager.currPage), pageModel);
	},
    // 从缓存中取数据
    fetchData : function(pageModel) {
		if($("body").data(String("P" + Pager.currPage)) === undefined) {
			return [];
		} else {
			return $("body").data(String("P" + Pager.currPage));
		}
    },
    // 最后一页隐藏下一页按钮
	invalidateNext : function() {
//		if(Pager.pages <= 1) return;
		if(Pager.pages <= 1) {
			Pager.nextBtn.hide();
		} else if (Pager.currPage == Pager.pages) {
			Pager.nextBtn.hide();
        } else if(Pager.currPage < Pager.pages){
        	Pager.nextBtn.show();
        }
	},
	// 第一页隐藏上一页按钮
    invalidatePrev : function() {
//    	if(Pager.pages == 0) return;
    	if (Pager.currPage <= 1) {
    		Pager.prevBtn.hide();
        } else if (Pager.currPage > 1) {
        	Pager.prevBtn.show();
        }
    }
};
