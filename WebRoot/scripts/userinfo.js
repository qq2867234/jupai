
function bindforward(type,parameter){
	
	var url;
	/*if(type=='residence')url='/PathForward.action?toResidence'*/
		switch(type){
		case 'residence':
			url='/PathForward.action?toResidence';
			addClick_inAelemt(url);
			break;
		case 'mobile_residence':
		url='/PathForward.action?toMobileRes';
		toBackground(url,parameter);
		break;
		case 'home':
			url='/PathForward.action?toHome';
			toBackground(url,parameter);
			break;
		case 'mobile_salehome':
			url='/PathForward.action?toMobileSaleHome';
			addClick_inAelemt(url);
			break;
		case 'mobile_renthome':
			url='/PathForward.action?toMobileRentHome';
			addClick_inAelemt(url);
			break;
		case 'broker':
			url='/PathForward.action?toBroker';
			toBackground(url,parameter);
			break;
		case 'mobile_broker':
			url='/PathForward.action?toMobileBroker';
			addClick_inAelemt(url);
			break;
		case 'mobile_timesearch':
			url='/PathForward.action?toMobileTimeSearch';
			toBackground(url,parameter);
		};

	
	
}//bindforward
function addClick_inAelemt(url){
	$(".ForwardMark").bind('click',function(){
		var path=this.href;
		
		$.ajax({
			url:url,
			async:false,
			dataType:'json',
			data:{
				path:path
			}
		});
		
	});
	
}//addClick_inAelemt
function toBackground(url,parameter){
	$.ajax({
		url:url,	
		dataType:'json',
		data:{
			path:parameter
		}
	});
	
}