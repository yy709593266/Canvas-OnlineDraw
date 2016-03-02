var canvas=document.getElementById('canvas');
var cxt=canvas.getContext('2d');

var flag=0;

// 鼠标按下的时候,设置开始点
canvas.onmousedown=function(evt){
// 获取鼠标相对于canvas起始点00的坐标
	evt=window.event||evt;
	var startX=evt.pageX-this.offsetLeft;
	var startY=evt.pageY-this.offsetTop;
	cxt.beginPath();
	cxt.moveTo(startX,startY);
	flag=1;
}

// 鼠标移动的时候，一直在绘图
canvas.onmousemove=function(evt){
	evt=window.event||evt;
	var endX=evt.pageX-this.offsetLeft;
	var endY=evt.pageY-this.offsetTop;
	// 判断鼠标是否down
	if(flag){
		cxt.lineTo(endX,endY);
		cxt.stroke();
	}	
}

//鼠标抬起的时候，停止绘图
canvas.onmouseup=function (){
	flag=0;
}

// 鼠标移除canvas时取消画图操作
canvas.onmouseout=function (){
	flag=0;
}