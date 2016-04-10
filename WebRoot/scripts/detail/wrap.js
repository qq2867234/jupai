
$.fn.showWrap = function() {
//    var f = this;
//    
//    var wrap = $(".wrap");
//    var shadow = $(".fullshadow");
//    0 >= wrap.length && (wrap = $('<div class="wrap"><span class="close"></span></div>'), wrap.appendTo($("body")));
//    wrap.show().append(f);
//    f.show();
//    var b = 0,
//    b = window.innerHeight? window.innerHeight: $(window).height(),
//    c = f.height()+30;//30为close按钮的高度
//    shadow = $('<div class="fullshadow"></div>')
//    .css({
//        width:"100%",
//        height: b,
//        top: 0,
//        left: 0,
//        position: "fixed"
//    }).appendTo($("body"))
//    .on("touchmove",
//    function(a) {
//        a.preventDefault()
//    });
//    $("#main").css({
//        overflow: "hidden"
//    }).on("touchmove click",
//    function(a) {
//        a.preventDefault()
//    });
//    width = $(window).width();
//    wrap.css({
//        top: b > c ? (b - c) / 2 : 0,
//        width: "100%",
//        height: c,
//        position: "absolute",
//        "z-index": "1000"
//    });
//    if (c > b) this.on("touchmove",
//    function(a) {
//        a.stopPropagation()
//    });
//    
//    $(document).on("touchmove",
//    function(a) {
//        b > c && a.preventDefault()
//    });
//    var t = this;
//    wrap.find(".close").hover().on("click",
//        function() {
//            $(this).removeClass("active");
//            t.hideWrap();
//        }
//    );      
//    return this
};

$.fn.showWrap2 = function() {
    var f = this;
    
    var wrap = $(".wrap");
    var shadow = $(".fullshadow");
    0 >= wrap.length && (wrap = $('<div class="wrap"><span class="close"></span></div>'), wrap.appendTo($("body")));
    wrap.show().append(f);
    f.show();
    var b = 0,
    b = window.innerHeight? window.innerHeight: $(window).height(),
    c = f.height()+30;//30为close按钮的高度
    shadow = $('<div class="fullshadow"></div>')
    .css({
        width:"100%",
        height: b,
        top: 0,
        left: 0,
        position: "fixed"
    }).appendTo($("body"))
    .on("touchmove",
    function(a) {
        a.preventDefault()
    });
    $("#main").css({
        overflow: "hidden"
    }).on("touchmove click",
    function(a) {
        a.preventDefault()
    });
    width = $(window).width();
    wrap.css({
        top: b > c ? (b - c) / 2 : 0,
        width: "100%",
        height: c,
        position: "absolute",
        "z-index": "1000"
    });
    if (c > b) this.on("touchmove",
    function(a) {
        a.stopPropagation()
    });
    
    $(document).on("touchmove",
    function(a) {
        b > c && a.preventDefault()
    });
    var t = this;
    wrap.find(".close").hover().on("click",
        function() {
            $(this).removeClass("active");
            t.hideWrap();
        }
    );      
    return this
};

$.fn.hideWrap = function() {
    this.hide().appendTo($("body"));
    var a = $(".wrap"); 
    a.hide();
    $(".fullshadow").off("touchmove").remove();
    $("#main").off("touchmove click");
    $(document).off("touchmove")
};


