$(document).ready(function(){
    $(".traffic .bus").click(function() {
        $(this).parents(".communityInfor").find("ul.bus").toggle()
            .siblings("ul.detail").hide();
    });
    $(".traffic .shop").click(function() {
        $(this).parents(".communityInfor").find("ul.shop").toggle()
            .siblings("ul.detail").hide();
    });
});