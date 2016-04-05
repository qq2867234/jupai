
var canvas=$('#myCanvas')[0];
var canvas2=$('#myCanvas2')[0];

var r=30
var click_obj;
drawImg(canvas,60,60);
drawImg(canvas2,60,60);
canvas.addEventListener('click' ,function(){changsize(this);});
canvas2.addEventListener('click' ,function(){changsize(this);});

function drawImg(target,x,y)
{
	if (target.getContext) {
		  var ctx = target.getContext('2d');
		  ctx.beginPath();
		  ctx.fillStyle = "#CC0000"; 
		  ctx.arc(x, y, r, 0, Math.PI*2, true);
		  ctx.fill();  
		  
	}
}

function changsize(target){
	if(click_obj==null)click_obj=target;
	var ctx = target.getContext('2d');
	if(ctx!=null){
		 ctx.clearRect(0, 0, target.width, target.height);
		 ctx.beginPath();
		 if(click_obj.id==target.id)
			 {
		 if(r<60)r=r+5;
			 }
		 else{
			 click_obj=target;
			 r=30;
		 }
		 ctx.arc(60, 60, r, 0, Math.PI*2, true);
		 ctx.fill();
	}

}
