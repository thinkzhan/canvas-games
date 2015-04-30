var Bullet = function(cxt, img, x, y, type){
	this.cxt = cxt;
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = 15;
	this.height = 30;
	this.type = type;//子弹类型.ToDo
	this.speed = 2;
	this.isLive = true;
}

Bullet.prototype = {
	draw: function(){
		Canvas.drawImg(this.cxt, this.img, 750, 0,
		20, 90, this.x , this.y, this.width, this.height);	
	},
	clear: function(){
		Canvas.clearRect(this.cxt, this.x , this.y, this.width, this.height)
	},
	update: function(x){
		//this.clear();

		this.validate();
		if(!this.isLive){
			return;
		}
		
		this.x = x;
		this.y -= this.speed ;

		this.draw();
	},
	validate: function(){
		if(this.isLive){
			if(this.y <= 0){//出上界
				this.isLive = false;
			}
		}
	}
}