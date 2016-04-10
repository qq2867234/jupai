var unitIsActive = true;
//Scroll Images Begin
var myScroll;
var lastTouchX = 0;
var lastTouchY = 0;
var outstandingProductId = -1;
var unitDetailPageKind = 0;
function initScrollImages()
{
    if (document.getElementById('wrapper') == undefined || document.getElementById('wrapper') == null)
    {
        return;
    }
    var wrapper = document.getElementById('wrapper');
    var pageWidth = wrapper.clientWidth;
    var pageHeight = pageWidth * 9 / 16;
    var pageNum = $('#scroller li').length;//获得<img>元素个数
   // wrapper.style.width = pageWidth + 'px';
    var liList = wrapper.getElementsByTagName('li');
    for (var i = 0; i < liList.length; ++i)
    {
     liList[i].style.width = pageWidth + 'px';
       liList[i].style.height = pageHeight + 'px';
		 //liList[i].style.width = "100%";
         //liList[i].style.height = "100%";
    }
    var imgWidth = wrapper.offsetWidth;//获得元素宽度

    var textListWidth = pageNum * imgWidth;
    var scroller_imglist = document.getElementById('scroller');
    scroller_imglist.style.width = textListWidth + 'px';//根据页数动态改变宽度

    myScroll = new iScroll('wrapper', {
        snap: true,
        momentum: false,
        hScrollbar: false,
        // 为了解决应用iScroll4组件进行左右滑动图片效果，但是上下滑动却被屏蔽了默认事件的问题，增加了onBeforeScrollStart和onBeforeScrollMove事件进行处理
        onBeforeScrollStart: function (e)
        {	//if(this.currPageX+1==pageNum){iScroll.disable();}
            if ('ontouchstart' in window)
            {
                var touch = e.touches[0]; //获取第一个触点
                lastTouchX = Number(touch.pageX); //页面触点X坐标
                lastTouchY = Number(touch.pageY); //页面触点Y坐标
            }
        },
        onBeforeScrollMove: function (e)
        {
            if ('ontouchstart' in window)
            {
                var touch = e.touches[0]; //获取第一个触点
                var x = Number(touch.pageX); //页面触点X坐标
                var y = Number(touch.pageY); //页面触点Y坐标
                //手指滑过的直线斜率小于2的情况下屏蔽默认事件
                if (Math.abs(y - lastTouchY) / Math.abs(x - lastTouchX) < 2)
                {
                    e.preventDefault();
                }
                lastTouchX = x;
                lastTouchY = y;
            }
        },
        onScrollEnd: function ()
        {
            document.getElementById('spanCur').innerHTML = this.currPageX + 1;
            imgChange(this.currPageX);
            if (this.currPageX - 1 >= 0)
            {
                var t = this.currPageX - 1;
                imgChange(t);
            }
            if (this.currPageX + 1 < pageNum)
            {
                t = this.currPageX + 1;
                imgChange(t);
            }
        }
    });

    // 加载初始图片
    imgChange(0);
    if (1 < pageNum)
    {
    	imgChange(1)
    }
    $('#scrollImages img[imgSrc]').show();
}

function onClickImage()
{
	var event = event || window.event;
    var w = document.documentElement.clientWidth;
    if (event.clientX > w / 2)
    {
        myScroll.scrollToPage('next', 0);
    }
    else
    {
        myScroll.scrollToPage('prev', 0);
    }
}
//Scroll Images End

function imgChange(t){
	var imgt = document.getElementById('img_' + t);
    if (imgt.getAttribute('src') == null || imgt.getAttribute('src') == '')
    {	
    	$(".glow-gif").show();
        imgt.setAttribute('src', imgt.getAttribute('imgSrc'));
        imgt.onload=function(){
        	$(".fut-detail").hide();
        	$(".glow-gif").hide();
		}
    }
}

$(function() {

setTimeout(function()
{
 initScrollImages();
 $('.btn-slider-pages').show();
},500);
 
 
});