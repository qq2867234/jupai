function backleft() 
{
	var host = "http://mountain.ngrok.cc";
	if(document.referrer.indexOf(host)!=-1) 
	{
		window.history.go(-1);
	}
	else
	{  
		window.location.href = host;
	}
}