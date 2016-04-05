window._bd_share_config = {
    common : {
        //自定义分享内容
        bdText : $(document).attr('title'),
        // 自定义分享摘要 
        bdDesc : '发现了一个好房子！', 
        // 自定义分享url地址
        bdUrl : window.location.href,   
        bdPic : "http://www.zhengor.com/" + $(".communityPics img:first").attr("src"),
        bdMiniList: ['tsina', 'weixin', 'douban', 'renren', 'sqq', 'ty', 'copy']
    },
    share : [{
        "bdSize" : 16
    }],
    slide : [{     
        bdImg : 0,
        bdPos : "right",
        bdTop : 100
    }]
//    image : [{
//        viewType : 'list',
//        viewPos : 'top',
//        viewColor : 'black',
//        viewSize : '16',
//        viewList : ['tsina', 'weixin', 'douban', 'renren', 'sqq', 'ty']
//    }]
}
with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];