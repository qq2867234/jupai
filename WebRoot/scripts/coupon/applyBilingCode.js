


$(function(){
	
fnTextVerify($("#idNumber"),$("#idNumber").next('.warning'),11);
fnTextVerify($("#attendeeId"),$("#attendeeId").next('.warning'),8);
$('#submitBut').click(function() {
	
	alert(123);
$.ajax({
url: '/Promotion.action?createPromotion',
data: $('#submitPromotion').serialize(),
dataType:"json",
async:false,
type: "post",
cache : false,
success: function(data)
	{
		alert(data.status);
	}
});



}); 



/*var cacheResidence = {};	//小区缓存
var chosenResidencePool = {}; //保存已选择的小区
$("#residenceId").autocomplete({
	minLength: 0,
	width: 318,
	autoFocus: true,
	source: function( request, response ) {
		var term = request.term;
		if(term in cacheResidence) {
			response($.map(cacheResidence[term], function(item, index) {
				chosenResidencePool = cacheResidence[term];
				//alert(JSON.stringify(item));
				return {
					label: item.residenceName,
                    value: item.residenceId
              }
            }));	
			return;
		}
  $.ajax({
      url: '/EditBrokerInfo.action?getResidenceListByCityCode',
      data: {cName: encodeURIComponent('北京'),keyword:encodeURIComponent(request.term)},
      type: 'post',
      dataType: "json",
      success: function(data, status, xhr) {
    	  cacheResidence[term] = data;
    	  chosenResidencePool = data;
		response($.map(data, function(item, index) {
			
			return {
				label: item.residenceName,
                value: item.residenceId
          }
        }));												
      },
      error: function(data) {
    	//alert(JSON.stringify(data));
      }
  });
	},
	select: function( event, ui ) {
		event.preventDefault();
		alert(ui.item.value);
		$("#residenceId").val(ui.item.value);
		this.value = String(ui.item.label).substring(0, String(ui.item.label).indexOf("("));
		orderFlag= "true";
		$("#residenceId").blur();
	}
}).focus(function() {
	orderFlag = "false";
    $(this).autocomplete("search", "");
});*/


});