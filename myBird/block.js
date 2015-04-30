function blocks(cxt){
	this.middle = 200;
	this.speed = 2;
	this.height1 = Math.floor(Math.random()*300);
	this.height2 = 500 - this.middle - this.height1;
	this.passed= false,
	this.block1 = new block(cxt, 0, this.height1);
	this.block2 = new block(cxt, 1, this.height2);
}
function block(cxt, type, height){
	this.cxt = cxt;
	this.width = 50;
	this.height = height;
	this.left = 500;
	this.top = 0;//0:上 ，1：下
	this.type = type;
	if(type){
		this.top = 500 - this.height;
	}	
}
block.prototype = {
	draw: function(){
		this.cxt.fillStyle = '#60B622';
		this.cxt.fillRect(this.left,this.top,this.width,this.height);
	}
}
function drawBlock(){
	for(var i = 0;i< Game.blockList.length;i++){		
		Game.blockList[i].block1.draw();
		Game.blockList[i].block2.draw();
	}	
}
function updateBlock(){
	if(Game.blockList.length > 3){
   		Game.blockList.splice(0 ,1); 		
    }
	for(var i = 0;i< Game.blockList.length;i++){
		var blocks = Game.blockList[i];
		blocks.block1.left -= blocks.speed;
		blocks.block2.left -= blocks.speed;
	}
}