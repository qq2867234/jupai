require.config({
//	baseUrl: 'lib',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: '../../jquery-1.10.2.min',
        public: '../../scripts/public/public',
        'jquery.cookie': '../jquery.cookie',
    },
	shim: {
		'upload/kindeditor-min': {
			exports: 'KindEditor'
		},
		'zh_CN': {
			exports: 'zh_CN'
		},
		'jquery.cookie': {
			deps: ['jquery'],
			exports: 'jquery.cookie'
		}
　　}
});

require(['jquery', 'jquery.cookie', 'public'], function($,x,public) {
	var name = $.cookie("displayName"); 
	public.showMenu(1);
});
