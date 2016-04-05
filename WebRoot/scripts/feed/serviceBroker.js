
var url='/BrokerList.action?getLists';
var id_index=0;
var number=0;
var currentPages=1;
var operType=1;
var list_urls=[];
var totalPage;
var roomcount;

	
$(function(){
	//初始化瀑布流
	var $container = $('#roomBox');
	$container.imagesLoaded( function(){
		  $container.masonry({
			itemSelector : 'dl',
			gutterWidth : 9,
			columnWidth: 243
		  });
		});
	getlistData();

	//点击加载更多时，翻页，触发getlist()函数向瀑布流中添加元素
	$("#loadMore").click(function(){
		if(currentPages<totalPage)
			{
			currentPages=currentPages+1;
			/*adjustLoad();*/
			operType=2;
			getlistData();		
			}		
	});//click
	function getlistData()
	{		
		$.ajax(
				{dataType:"json",
				url:url,
				async:false,
				data:{
					currentPage:currentPages,
					 },
				success:function(e){
					if(operType==1){totalPage=Math.ceil(e.size/10);roomcount=e.size;adjustGoTop();}
					adjustLoad();
					var content="";
					$.each(e.BrokerLists,function(i,bean){
						var salesoffice_name='';
						if(bean.salesoffice_name!=undefined)
						salesoffice_name=salesoffice_name+bean.salesoffice_name;
						content=content+"<dl class='clearfix' id='"+id_index+"'>"+
				    	"<dt><img src='"+bean.pic+"' width='600' height='450'  alt=''/>"+
				    	"<a>评价:"+bean.likes+"</a></dt>"+
				    	"<dd class='name'><span>"+bean.name+"</span><button class='msg' title='发消息' type='button'></button></dd>"+
				    	"<dd class='qua'>"+bean.brokerage_name+"</dd>"+
				    	"<dd class='tel'>"+bean.mobile+"</dd>"+
				    	"<dd class='store'>"+salesoffice_name+"</dd>"+
				    	"</dl>";
						id_index=id_index+1;
						 list_urls.push(bean.url);
						number=number+1;
					}		
					);//each
					 reloadmasonry(content,number);
				}//success()
				}		
		);		
	}//function
	
	function  reloadmasonry(content,count){
		var $boxes=$(content);
		if(operType==2) {
			$boxes.imagesLoaded(function(){
			$container.append( $boxes ).masonry('appended',$boxes,addclick(count));
			
			});	
		}
		if(operType==1) {
		$boxes.imagesLoaded(function(){
		$container.prepend( $boxes ).masonry('reload' ,addclick(count));
		});
		}
			 number=0;
	}//function  reloadmasonry	
	
	function addclick(count)
	{	
		 for(var i=0;i<count;i++)
		 {
		if(list_urls[id_index-count+i]===undefined)continue;
		else 
		{ $("#"+(id_index-count+i)+"").bind('click',function(){
			 var id=$(this).attr('id');
				window.location.href=list_urls[id];					 
		 });}//else
		 }//for	
	}
	//如果记录数小于4则隐藏'到顶部'按钮
	function adjustGoTop()
	{
		if(roomcount<4)$("#goTop").hide();
		else if(roomcount>=4&&$("#goTop").is(":hidden")) $("#goTop").show();

	}
	//最后一页的时候隐藏继续加载的按钮，否则如果按钮被隐藏则使它显示出来
	function adjustLoad()
	{
		if(currentPages==totalPage)$("#loadMore").hide();
		else if(currentPages<totalPage&&$("#loadMore").is(":hidden"))$("#loadMore").show();
			
	}
	
});


