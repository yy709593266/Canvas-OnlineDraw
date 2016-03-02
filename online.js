var Brush=document.getElementById('means_brush');
var Eraser=document.getElementById('means_eraser');
var Paint=document.getElementById('means_paint');
var Straw=document.getElementById('means_straw');
var Text=document.getElementById('means_text');
var Magnifier=document.getElementById('means_magnifier');

var Line=document.getElementById('shape_line');
var Arc=document.getElementById('shape_arc');
var Rect=document.getElementById('shape_rect');
var Poly=document.getElementById('shape_poly');
var Arcfill=document.getElementById('shape_arcfill');
var Rectfill=document.getElementById('shape_rectfill');

var actions=[Brush,Eraser,Paint,Straw,Text,Magnifier,Line,Arc,Rect,Poly,Arcfill,Rectfill];

var Line_1=document.getElementById('size_line1px');
var Line_3=document.getElementById('size_line3px');
var Line_5=document.getElementById('size_line5px');
var Line_8=document.getElementById('size_line8px');

var Line=[Line_1,Line_3,Line_5,Line_8];

var Red=document.getElementById('red');
var Green=document.getElementById('green');
var Blue=document.getElementById('blue');
var Yellow=document.getElementById('yellow');
var White=document.getElementById('white');
var Black=document.getElementById('black');
var Pink=document.getElementById('pink');
var Purple=document.getElementById('purple');
var Cyan=document.getElementById('cyan');
var Orange=document.getElementById('orange');

var Colors=[Red,Green,Blue,Yellow,White,Black,Pink,Purple,Cyan,Orange];

var canvas=document.getElementById('canvas');
var cxt=canvas.getContext('2d');
// 设置初始值
	// 默认选中画笔工具
	drawBrush(0);
	//默认设置颜色
	setColor(Red,0);
	// 默认设置线宽
	setSize(0);


// 状态设置函数
function setStatus(Arr,num,type){
	for(var i=0;i<Arr.length;i++){
		if(i==num){
			if(type==1){
				Arr[i].style.background="#f9f900";
			}else{
				Arr[i].style.border="1px solid #fff";
			}
		}else{
			if(type==1){
				Arr[i].style.background="#ccc";
			}else{
				Arr[i].style.border="1px solid #000";
			}	
		}
	}
}


// 设置图像功能函数，保存图片
function saveimg(){
	var imgdata=canvas.toDataURL();
	var b64=imgdata.substring(22);//截取22位后面所有
	// alert(b64);
	// 将form表单中的隐藏表单赋值，即赋我们获取的b64
	var data=document.getElementById('data');
	data.value=b64;
	// 将表单提交到后面去//http://localhost/down.php
	var form=document.getElementById('myform');
	form.submit();
}


// 清除画布
function clearimg(){
	cxt.clearRect(0,0,880,400);
}


// 列出所有的按钮对应的函数
function drawBrush(num){
	setStatus(actions,num,1);
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
};


var eraserFlag=0;
function drawEraser(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function (evt){
		evt=window.event||evt;
		var eraserX=evt.pageX-this.offsetLeft;
		var eraserY=evt.pageY-this.offsetTop;
		// canvas擦除方法用clearrect方法
		cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);
		eraserFlag=1;
	}
	canvas.onmousemove=function (evt){
		evt=window.event||evt;
		var eraserX=evt.pageX-this.offsetLeft;
		var eraserY=evt.pageY-this.offsetTop;
		if(eraserFlag==1){
			cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);
		}
	}
	canvas.onmouseup=function (){
		eraserFlag=0;
	}
	canvas.onmouseout=function (){
		eraserFlag=0;
	}
};


function drawPaint(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function (){
		// 画一个填充颜色的矩形
		cxt.fillRect(0,0,880,400);
		cxt.fill();
	}
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
};


function drawStraw(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function (evt){
		evt=window.event||evt;
		var strawX=evt.pageX-this.offsetLeft;
		var strawY=evt.pageY-this.offsetTop;
		// 获取图像信息的方法getImageData(开始点坐标x，y，宽度，高度)
		//obj=cxt.getImageData(strawX,strawY,1,1);ImageData对象
		// obj.data[]中放的数据为[r,g,b,opacity]
		// obj.data[0]就是r代表的颜色代码
		var obj=cxt.getImageData(strawX,strawY,1,1);
		var color='rgb('+obj.data[0]+','+obj.data[1]+','+obj.data[2]+')';
		// 将吸管吸出的颜色设定到应用中
		cxt.strokeStyle=color;
		cxt.fillStyle=color;
		// 颜色吸取之后自动选中画笔工具到默认状态
		drawBrush(0);
	}
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
};


function drawText(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function (evt){
		evt=window.event||evt;
		// 获取鼠标点击位置
		var textX=evt.pageX-this.offsetLeft;
		var textY=evt.pageY-this.offsetTop;
		// 获取用户输入的信息
		// 对象框提示，默认值
		var userVal=window.prompt('请在这里输入文字','');//获得输入的值
		if(userVal!=null){
			cxt.fillText(userVal,textX,textY);
		}
	}
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
};


function drawMagnifier(num){
	setStatus(actions,num,1);
	// 用户输入的放大比例大小
	var scale=window.prompt('请输入缩放比例[只能是整型]','100');
	// 把输入的大小转化成canvas画布的大小
	var scaleW=880*scale/100;
	var scaleH=400*scale/100;
	canvas.style.width=parseInt(scaleW)+'px';
	canvas.style.height=parseInt(scaleH)+'px';
};


function drawLine(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function (evt){
		evt=window.event||evt;
		var startX=evt.pageX-this.offsetLeft;
		var startY=evt.pageY-this.offsetTop;
		cxt.beginPath();
		cxt.moveTo(startX,startY);
	}
	canvas.onmousemove=null;//不用也要写，给写空
	canvas.onmouseout=null;
	canvas.onmouseup=function (evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		cxt.lineTo(endX,endY);
		cxt.closePath();
		cxt.stroke();
	}
};


var arcX;
var arcY;
function drawArc(num){
	setStatus(actions,num,1);
	// 获取圆心的位置
	canvas.onmousedown=function (evt){
		evt=window.event||evt;
		arcX=evt.pageX-this.offsetLeft;
		arcY=evt.pageY-this.offsetTop;
	}
	// 半径
	canvas.onmouseup=function (evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		// 计算半径
		var a=endX-arcX;
		var b=endY-arcY;
		var c=Math.sqrt(a*a+b*b);
		cxt.beginPath();
		cxt.arc(arcX,arcY,c,0,360,false);
		cxt.closePath();
		cxt.stroke();
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
};


var rectX;
var rectY;
function drawRect(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function (evt){
		evt=window.event||evt;
		rectX=evt.pageX-this.offsetLeft;
		rectY=evt.pageY-this.offsetTop;
	}
	canvas.onmouseup=function (evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		// 计算矩形的宽高
		var rectW=endX-rectX;
		var rectH=endY-rectY;
		cxt.beginPath();
		cxt.strokeRect(rectX,rectY,rectW,rectH);
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
};


var polyX=0;
var polyY=0;
//多边形形状函数
function drawPoly(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		polyX=evt.pageX-this.offsetLeft;
		POLyY=evt.pageY-this.offsetTop;
	}
	canvas.onmouseup=function(evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		cxt.beginPath();
		//将画笔移动到右下角的顶点
		cxt.moveTo(endX,endY);
		//计算左下角的顶点坐标
		var lbX=2*polyX-endX;
		var lbY=endY;
		cxt.lineTo(lbX,lbY);
		//设置第三个顶点的坐标
		var tmpC=2*(endX-polyX);
		var tmpA=endX-polyX;
		var tmpB=Math.sqrt(tmpC*tmpC-tmpA*tmpA);
		//计算最上面顶点坐标
		//endY-tmpB 定点的Y坐标 polyX是顶点的X坐标
		//画到顶点
		cxt.lineTo(polyX,endY-tmpB);
		//封闭路径->画出来
		cxt.closePath();
		cxt.stroke();
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}


function drawArcfill(num){
	setStatus(actions,num,1);
	// 获取圆心的位置
	canvas.onmousedown=function (evt){
		evt=window.event||evt;
		arcX=evt.pageX-this.offsetLeft;
		arcY=evt.pageY-this.offsetTop;
	}
	// 半径
	canvas.onmouseup=function (evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		// 计算半径
		var a=endX-arcX;
		var b=endY-arcY;
		var c=Math.sqrt(a*a+b*b);
		cxt.beginPath();
		cxt.arc(arcX,arcY,c,0,360,false);
		cxt.closePath();
		cxt.fill();
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
};


function drawRectfill(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function (evt){
		evt=window.event||evt;
		rectX=evt.pageX-this.offsetLeft;
		rectY=evt.pageY-this.offsetTop;
	}
	canvas.onmouseup=function (evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		// 计算矩形的宽高
		var rectW=endX-rectX;
		var rectH=endY-rectY;
		cxt.beginPath();
		cxt.fillRect(rectX,rectY,rectW,rectH);
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
};


function setSize(num){
	setStatus(Line,num,1);
	switch(num){
		case 0:cxt.lineWidth=1;break;
		case 1:cxt.lineWidth=3;break;
		case 2:cxt.lineWidth=5;break;
		case 3:cxt.lineWidth=8;break;
		default:cxt.lineWidth=1;
	}
};

function setColor(obj,num){
	setStatus(Colors,num,0);
	cxt.strokeStyle=obj.id;
	cxt.fillStyle=obj.id;
}