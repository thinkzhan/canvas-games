var Plane = function(cxt, img, type){
	this.cxt = cxt;
	this.type = type;
	this.img = img;
	this.bulletList = [];
	this.blood = 100;
	this.planeMap = [
		{x: 0 , y: 100, width: 125, height: 70},//在大图中位置
		{x:224, y: 256, width: 112, height: 70}
	];
	this.x = 200;
	this.y = 680;
	this.speed = 1.8;//移动速度
	this.width = 80;
	this.height = 60;
}

Plane.prototype = {
	draw: function(){
		Canvas.drawImg(this.cxt, this.img, this.planeMap[this.type].x, this.planeMap[this.type].y,
		 this.planeMap[this.type].width, this.planeMap[this.type].height, this.x , this.y, this.width,this.height);	
	},
	// clear: function(){
	// 	Canvas.clearRect(this.cxt, this.x , this.y, this.width, this.height)
	// },
	update:function(){
		//this.clear();
		this.draw();
	}
}

