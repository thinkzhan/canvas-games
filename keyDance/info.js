function Info(cxt){
	this.cxt = cxt;
	this.count = 0;//连击数
	this.time = 100;//剩余时间
	this.maxTime = 100;
	this.timeSpeed = 1;
}
Info.prototype = {
	init: function(cxt){
		this.update();
	},
	update: function(){
		Canvas.drawText (this.cxt,"当前连击:", 100 , 30,"white");
		Canvas.drawText (this.cxt, this.count, 180 , 30,"red");
		Canvas.drawText (this.cxt,"剩余时间:", 350 , 30,"white");
		Canvas.fillRect (this.cxt, 420,15, 200/100 * this.time ,20,"red");	
	}
};
