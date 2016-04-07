//列表页查找更多
function soumore()
{	
	 var d = {};
	 var pagesize = 15;
	 var showsize = $('.index').find('mark').length;
	 var offset = parseInt(showsize%pagesize);	
	 if(offset==0)
	 {
		 offset = parseInt(showsize/pagesize);
	 }
	 else
     {
		 offset = parseInt(showsize/pagesize)+1;
     }	 
	 var query_str = $("#query_str").val();
	 var listUrl = Urls.list.more+"searchmore/?offset="+(offset+1);
	 if(query_str!='')
		 listUrl+='&query_str='+query_str;
	 var appendUrl = getAppendUrl();	 
	 if(appendUrl!="")
		 listUrl+= "&"+appendUrl;	
	 para = {
	            type: "get",
	            url: listUrl,
	            data: d,
	            success: function(d) {	            	
	            	if($('#errormsg')!=null)
	            	{
	            		$("#errormsg b").html("");
	            		$('#errormsg').hide();		            	
	            	}
	            	if($('#toploading')!=null)
	            	{
		            	$('#toploading').hide();		            	
	            	}
	            	if(d.count>0){
	            		showmore(d,offset);
	            	}else{
	    		        $('.loading').hide();
	            	}
	            },
	            error: function() {
	            	$('.loading').hide();
	            }
	    };
	 $('.btn-more').hide();
     $('.loading').show();
	 ajaxFun(para);
}
function showmore(d,offset)
{
	var rooms = d.data;
	var numberroom=["零","一","二","三","四"];
	var html = '';
    for (var i = 0; i < rooms.length; i++) {
    	var room=rooms[i];
    	var headimg = $('#ctx1').val()+'/resourcesWeb/images/default_head.png';
    	var topiclodgeunitImg = $('#ctx1').val()+'/resourcesWap/topic/2016/yzfy/images/';
    	if(room.headimageurl!=null)
    		headimg= ''+room.headimageurl;
    	var str = '<div class="cont"><div ';
    	if(room.colleState==1){
    		str+='class="collection ct_on" state="2"';
    	}else{
    		str+='class="collection" state="1"';
    	}
    	str += ' id="c_'+room.id+'" onclick="collclick('+room.id+');"></div>';
    	if(m.sBegin!=''&&m.sEnd!='')
    		str +='<a href="/room/'+room.id+'?checkinday='+m.sBegin+'&checkoutday='+m.sEnd+'">';
    	else
    		 str +='<a href="/room/'+room.id+'">';
    	str += '<mark class="n-img"><img src="'+room.mainimgurl+'"></mark>';
    	str +=  '<p class="asote price">';
    	str += '<span class="fl"><b>￥</b>'+room.dayprice4day+'</span>';    
    	if(room.preferential)
    	{
    	str += '<i class="fl youhui"><em></em>优惠</i>';
    	}
    	str += '</p>';
    	str += '<p class="asote btn-img">';    	
    	str += '<img src="'+headimg+'">';
    	str += '</p>';    	
    	if((room.topiclodgeunitlevel&&room.topiclodgeunitlevel!=0) || (room.zmlodge == 1))
    	{
    		str += '<p class="asote yxfy-img">';  
    		if(room.topiclodgeunitlevel&&room.topiclodgeunitlevel!=0){
    			str += '<img class="yx_icon" src="'+topiclodgeunitImg+'level'+room.topiclodgeunitlevel+'.png">';
    		}
        	if(room.zmlodge == 1){
        		str += '<img class="myj_icon" src="'+$("#ctx1").val()+'/resourcesWeb/images/myj_icon.png">';
        	}
        	str += '</p>';
    	}
    	str += '<dl><dt><b class="dx-b01">'+room.sName+'</b></dt>';
    	str += '<dd><nav class="d-nr">';
    	if(room.goodCommentRate!='0'&&room.goodCommentRate!='0.0' && (room.commentcnt!=null && room.commentcnt>=6))
		{
    		str+='<b class="c22bb62">'+room.goodCommentRate+'分</b>&nbsp;·&nbsp;';
		}
    	if(room.commentcnt!=null&&room.commentcnt!=0)
		{
    		str+='<b>'+room.commentcnt+'条评论</b>&nbsp;·&nbsp;';
		}
    	str += '<b>';
    	if(room.roomsnum!=null&&room.roomsnum>3)
		{
    		str+='四居+';
		}
    	else
    	{
    		str += numberroom[room.roomsnum]+'居';
    	}
    	str +='</b>';
    	str +='&nbsp;·&nbsp;';      	
    	if(room.guestnum != null&&room.guestnum >= 10)
		{
    		str += '<b>可住9人以上</b>';
		}
    	else
    	{
    		str += '<b>可住'+room.guestnum+'人</b>';
    	}
    	
    	if($("#search_landmark").val()!=""||$("#search_skeyword").val()!="")
		{
    		
		}
    	else
		{
    		str += '&nbsp;·&nbsp;';
    		str += '<b class="b-wz">';
			str +=  UI.maxText(room.displayaddr,10)+'</nav>';
			str += '</b>';
		}
    	
    	if(room.distance!=null&&room.distance!=0)
		{
    	    str += '<b class="d-km">';    
    		str += room.distance+'km';
    		str += '</b>';
		}    	
    	str += '</nav></dd></dl></a></div>';    
        html+=str;
    }
    $('.list-mian').append(html);
    var count =  d.count; 
    if($('.index').find('mark').length<count && ((offset+1)*15)<count)
	{
    	$('.more').show();
	 	$('.btn-more').show();    	
	}else
	{
		$('.more').hide();
    	$('.btn-more').hide();
	}
    $('.loading').hide();
}

var ajaxFun = function(d) {
    $.ajax({
        type: d.type || 'post',
        url: d.url || '',
        data: d.data || {},
        async: d.async || true,
        dataType: d.dataType || 'json',
        success: d.success,
        error: d.error ||
        function(d) {
            alert('访问失败了，请刷新重试');
        }
    });
};
