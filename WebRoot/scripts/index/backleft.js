function backleft() 
{
	var host = "http://localhost:8080/";
	if(document.referrer.indexOf(host)!=-1) 
	{
		window.history.back();
	}
	else
	{  
		window.location.href = host;
	}
}