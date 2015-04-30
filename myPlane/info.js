function Info(cxt){
	this.cxt = cxt;
	this.score = 0;//连击数
	this.blood = 100;//剩余血量
	this.maxBlood = 100;
	this.bloodSpeed = 1;
}
Info.prototype = {
	init: function(cxt){
		this.update();
	},
	update: function(){
		Canvas.drawText (this.cxt,"当前分数:", 50 , 30,"white");
		Canvas.drawText (this.cxt, this.score, 130 , 30,"red");
		Canvas.drawText (this.cxt,"剩余血量:", 300 , 30,"white");
		Canvas.fillRect (this.cxt, 370,15, 100/100 * this.blood ,20,"red");	
	}
};
