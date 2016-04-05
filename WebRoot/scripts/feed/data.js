var  newsIds=[];
var newsZids=[];
var newsChannels=[];
var newsTypes=[];
var newsPics=[];
var  newsTitles=[];
var  newsBodys=[];
var  newsUrls=[]; 
function readyNewsData()
{
	$.ajax(
			{ dataType: "json",
				url:"/IndexFeed.action?getNews",
				async:false,
				 success:function(e)
			{
				$.each(e.FeedNews,function(i,item){
					newsIds.push(i);
					newsZids.push(item.zid);
					newsChannels.push(item.channel);
					newsTypes.push(item.type);
					newsPics.push(item.pic);
					newsTitles.push(item.title);
					newsBodys.push(item.body);
					newsUrls.push(item.url);
				});
			}
			}
			);
}

var adIds=[];
var adZids=[];
var adChannels=[];
var adTypes=[];
var adPics=[];
var adTitles=[];
var adBodys=[];
var adUrls=[];
function readyAdData()
{
	$.ajax(
			{ dataType: "json",
				url:"/IndexFeed.action?getAds",
				async:false,
				 success:function(e)
			{
				$.each(e.FeedAds,function(i,item){
					adIds.push(i);
					adZids.push(item.zid);
					adChannels.push(item.channel);
					adTypes.push(item.type);
					adPics.push(item.pic);
					adTitles.push(item.title);
					adBodys.push(item.body);
					adUrls.push(item.url);
				});
			}
			}
			);
}
var brokerIds=[];
var brokerZids=[];
var  brokerChannels=[];
var brokerRanks=[];
var brokerPics=[];
var brokerNames=[];
var brokerCompanys=[];
var  brokerCredits=[];
var  brokerLikes=[];
var  brokerUrls=[];
function readyBrokerData()
{
	$.ajax(
			{ dataType: "json",
				url:"/IndexFeed.action?getBrokers",
				async:false,
				 success:function(e)
			{
				$.each(e.FeedBrokers,function(i,item){
					brokerIds.push(i);
					brokerZids.push(item.zid);
					brokerChannels.push(item.channel);
					 brokerRanks.push(item.rank);
					 brokerPics.push(item.pic);
					brokerNames.push(item.name);
					brokerCompanys.push(item.brokerage_name);
					brokerCredits.push(item.credit);
					brokerLikes.push(item.likes);
					brokerUrls.push(item.url);
				});
			}
			}
			);
}

var  eventIds=[];
var eventZids=[];
var eventChannels=[];
var eventRanks=[];
var eventTypes=[];
var eventPics=[];
var eventTitles=[];
var eventBodys=[];
var eventUrls=[];
function readyEventData()
{
	$.ajax(
			{ dataType: "json",
				url:"/IndexFeed.action?getEvents",
				async:false,
				 success:function(e)
			{
				$.each(e.FeedEvents,function(i,item){
					eventIds.push(i);
					eventZids.push(item.zid);
					eventChannels.push(item.channel);
					eventTypes.push(item.type);
					eventPics.push(item.pic);
					eventTitles.push(item.title);
					eventBodys.push(item.body);
					eventUrls.push(item.url);
				});
			}
			}
			);
}

var listIds=[];
var  listZids=[];
var  listChannels=[];
var  listRanks=[];
var  listPics=[];
var  listPrices=[];
var  listRooms=[];
var listLocations=[];
var  listUrls=[];
function readyListData()
{
	$.ajax(
			{ dataType: "json",
				url:"/IndexFeed.action?getLists",
				async:false,
				 success:function(e)
			{
				$.each(e.FeedLists,function(i,item){
					listIds.push(i);
					listZids.push(item.zid);
					listChannels.push(item.channel);
					listRanks.push(item.rank);
					listPics.push(item.pic);
					listPrices.push(item.price);
					listRooms.push(item.room);
					listLocations.push(item.location);
					listUrls.push(item.url);
				});
			}
			}
			);
}
var resIds=[];
var resZids=[];
var resChannels=[];
var resRanks=[];
var resTitles=[];
var resPics=[];
var resBodys=[];
var resUrls=[];
function readyResidenceData()
{
	$.ajax(
			{ dataType: "json",
				url:"/IndexFeed.action?getResidences",
				async:false,
				 success:function(e)
			{
					 
				$.each(e.FeedResidences,function(i,item){
					resIds.push(i);
					resZids.push(item.zid);
					resChannels.push(item.channel);
					resRanks.push(item.rank);
					resTitles.push(item.title);
					resPics.push(item.pic);
					resBodys.push(item.body);
					resUrls.push(item.url);
				});
			}
			}
			);
}
