function bird(cxt){
	this.cxt = cxt;
	this.size = 30;
	this.left = 100;
	this.top = 240;
	this.speedY = 5;//下降速度
	this.flyHeight =150;//点击起飞
	this.img = document.getElementById("bird_img");
}
bird.prototype = {
	draw: function(){
		this.cxt.drawImage(this.img,this.left ,this.top,this.size,this.size);
	}
}
function drawBird(){
	Game.bird.draw();
}
function updateBird(){
	Game.colission();
	var bird = Game.bird;
        if(Game.touch) {  
            bird.top -= 20;          
        }  
        else {  
           	bird.top += 5;       
        }  
}