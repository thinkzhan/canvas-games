var Game = {
	canvas: null,
	cxt: null,
	timer: null,	
	bird: null,
	blockList: [],
	blockSize: 3,
    ready : false,
    score: 0,
    blocksLazy : 1000,
	blocksTime : 1000,
	isLive: true,
	init: function(){
		this.initCanvas();		
		this.initBind();
	},
	initCanvas: function(){
		this.canvas = document.getElementById('myCanvas');
		this.cxt = this.canvas.getContext("2d");
	},
	initBind : function(){
		  this.canvas.onmousedown = function() {  
	        Game.touch = true;       
	   	 } ,
	     this.canvas.onmouseup = function(){  
	        Game.touch = false;  
	   	 }
	},
	initBlocks: function(){
		if(Game.blocksLazy > 0){	
			Game.blocksLazy -= 10;	
			return false;
		}
		else{	
			Game.blocksLazy = Game.blocksTime;
		}
		this.blockList.push(new blocks(this.cxt));
	},
    colission: function(){
    	for(var i=0; i < this.blockList.length;i++){
    		this.isLive = !(this.rectInRect(this.bird, this.blockList[i].block1) || 
    			this.rectInRect(this.bird, this.blockList[i].block2));
    		break;
    	}
    	if(!this.isLive){
    		this.over();
    	}
    },
    rectInRect : function(rect1,rect2){
		var x11 = rect1.left,
			y11 = rect1.top,
			x12 = rect1.left+rect1.size,
			y12 = rect1.top+rect1.size,
			x21 = rect2.left,
			y21 = rect2.top,
			x22 = rect2.left+rect2.width,
			y22 = rect2.top+rect2.height;
		if(Math.abs((x11+x12)/2-(x21+x22)/2)<((x12+x22-x11-x21)/2) 
			&& Math.abs((y11+y12)/2-(y21+y22)/2)<((y12+y22-y11-y21)/2)){
			return true;		
		}		
		if(x11 > x22 && !rect2.passed) {
			this.score += 0.5;	
			rect2.passed = true;
		};
		return false;	
	}, 
    updateScore: function(){
    	document.getElementById("score").innerHTML = Game.score;
    },
	over: function(){
		alert("over");
		clearInterval(this.timer);
	},
	start: function(){	
		if(this.ready){
			this.restart();
			return;
		}
		this.bird = new bird(this.cxt);	
		this.blockList.push(new blocks(this.cxt));
		this.timer = setInterval(Game.loop,20);
		this.ready = true;
		document.getElementById("start").innerHTML = "重新开始";
	},
	restart: function(){
		Game.cxt.clearRect(0,0,500,500);
		clearInterval(this.timer);
		this.bird =  null;
		this.blockList = [];	
	    this.ready = false;
	    this.blocksLazy =1000;
	    this.score=0;
		this.isLive= true;
		this.timer = null;
		this.start();
	},
	stop: function(){
		clearInterval(this.timer);
		document.getElementById("start").innerHTML = "开始";
	},
	loop: function(){
		Game.cxt.clearRect(0,0,500,500);
		Game.initBlocks();
		drawBird();
		drawBlock();
		updateBird();
		updateBlock();		
		Game.updateScore();			
	}
}
Game.init();

