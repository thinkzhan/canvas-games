var Game = {
	imgList: [],
	canvasList: [],
	type: 0,
	myPlane: null,
	enemyPlaneList: [],
	info: null,
	dirKey:-1,//键盘方向
	interval: null,//定时器
	bulletsLazy : -1,
	bulletsTime :200,//子弹发射间隔
	enemysLazy : -1,
	enemysTime :1500,//敌机生成间隔
	init: function(){
		this.initImg();
		this.initCanvas();
		this.initWelcome();
		this.initBind();
	},
	initImg : function(){	
		this.imgList = {	
			img_plane_main : document.getElementById("img_plane_main"),
			ui_new_word: document.getElementById("ui_new_word"),
			img_bullet: document.getElementById("img_bullet"),
			img_plane_enemy: document.getElementById("img_plane_enemy") 
		}
	},
	initCanvas: function(){
		this.canvasList = {		
			main : document.getElementById("main").getContext("2d"),
			welcome : document.getElementById("welcome").getContext("2d"),
			info : document.getElementById("info").getContext("2d")
		}
	},
	initWelcome: function(){
		Canvas.drawImg(this.canvasList.welcome, this.imgList.img_plane_main, 0, 100, 125, 70, 170, 150, 160, 120);
						
		Canvas.drawImg(this.canvasList.welcome, this.imgList.ui_new_word, 885, 240, 105, 40, 190, 450, 100, 50);
		Canvas.drawImg(this.canvasList.welcome, this.imgList.ui_new_word, 345, 410, 195, 50, 190, 550, 122, 50);
	},
	initBind: function(){
		//点击开始事件
		var startContext = document.getElementById("welcome");
		startContext.onclick= function(e){
			//console.log(e.offsetX+" "+ e.offsetY);
			if(e.offsetX > 190 && e.offsetX < 290 && e.offsetY> 450 && e.offsetY< 480 ){	
				if(Game.type >= 1)
					Game.type = -1;
				Game.changePlane(++Game.type);
			}
			if(e.offsetX > 190 && e.offsetX < 310 && e.offsetY> 550 && e.offsetY< 600 ){
				Game.start();
			}
		}
		//键盘事件
		document.onkeydown = function(e){
			if(e.keyCode == 38){
				Game.dirKey = 0;
			}else if(e.keyCode == 40){		
				Game.dirKey = 1;
			}else if(e.keyCode == 37){		
				Game.dirKey = 2;
			}else if(e.keyCode == 39){			
				Game.dirKey = 3;
			}else{
				return;
			}
			//Game.update();
		}
		document.onkeyup = function(e){
			Game.dirKey = -1;
		}
		
	},
	//选择飞机
	changePlane: function(i){

		Canvas.clearRect(this.canvasList.welcome, 170, 150, 160, 120 );
		switch(i)
			{
			case 0:
			  Canvas.drawImg(this.canvasList.welcome, this.imgList.img_plane_main, 0, 100, 125, 70, 170, 150, 160, 120);
			  break;
			case 1:
			  Canvas.drawImg(this.canvasList.welcome, this.imgList.img_plane_main,224, 256, 112, 70, 170, 150, 160, 120);
			  break;
			default:
			 
			}
		
				//Canvas.drawImg(this.canvasList.welcome, this.imgList.img_plane_main,372, 0, 140, 100, 170, 150, 160, 120);
	},
	start: function(){
		console.log("start");
		document.getElementById("welcome").style.display = "none";
		Game.initMyPlane(Game.type);
		//Game.initEnemyPlane();
		this.info = new Info(this.canvasList.info);
		this.info.init();
		Game.interval = window.setInterval(Game.update, 20);
	},
	initMyPlane: function(type){
		console.log("init:"+type);
		var plane = new Plane(Game.canvasList.main, Game.imgList.img_plane_main, Game.type, true);
		plane.draw();
		Game.myPlane = plane;
		this.intBullet();
	},
	initEnemyPlane: function(){
		//var enemyPlane = new EnemyPlane(Game.canvasList.main, Game.imgList.img_plane_enemy, 0);
		//enemyPlane.draw();
		if(Game.enemysLazy > 0){	
			Game.enemysLazy -= 10;	
			return false;
		}
		else{	
			Game.enemysLazy = Game.enemysTime;
			Game.enemyPlaneList = EnemyPlaneFactory.createEnemyPlanes();
		}
	},
	intBullet: function(){
		if(Game.bulletsLazy > 0){	
			Game.bulletsLazy -= 10;	
			return false;
		}
		else{	
			Game.bulletsLazy = Game.bulletsTime;
			var bullet = new Bullet(Game.canvasList.main, Game.imgList.img_bullet, Game.myPlane.x+32,Game.myPlane.y-22, 0);
			bullet.draw();
			Game.myPlane.bulletList.push(bullet);
		}
		
	},
	update:function(){
	
		switch(Game.dirKey){
			case 0://上
				if(Game.myPlane.y > 0)
					Game.myPlane.y -= Game.myPlane.speed;

				break;
			case 1:
				if(Game.myPlane.y < 750 -Game.myPlane.height)
					Game.myPlane.y += Game.myPlane.speed;
				break;
			case 2:
				if(Game.myPlane.x > 0)
					Game.myPlane.x -= Game.myPlane.speed;
				break;
			case 3:
				if(Game.myPlane.x < 500 -Game.myPlane.width)
					Game.myPlane.x += Game.myPlane.speed ;
				break;
		}
		Canvas.clear(Game.canvasList.main, 500, 750);
		Game.intBullet();
		Game.initEnemyPlane();
		Game.myPlane.update();
		Game.updateBullet();
		Game.updateEnemyPlane();
		Game.colission();
		Game.updatInfo();
	},
	updateBullet: function(){
		//console.log("bullets:"+Game.myPlane.bulletList.length);
		for(var i = 0; i <Game.myPlane.bulletList.length;i++){
			var bullet = Game.myPlane.bulletList[i];
			if(!bullet.isLive){
				Game.myPlane.bulletList.splice(0, 1);//移除失效子弹
				continue;
			}else
				bullet.update(bullet.x);
		}
	},
	updateEnemyPlane: function(){
		//console.log("enemyPlaneList:"+Game.enemyPlaneList.length);
		for(var i = 0; i < Game.enemyPlaneList.length ;i++){
			var enemy = Game.enemyPlaneList[i];
			if(!enemy.isLive){
				Game.enemyPlaneList.splice(0, 1);//移除失效子弹
				continue;
			}else{
				enemy.y += enemy.speed;
				enemy.update();
			}
		
		}
	},
	colission: function(){
		//撞到敌机
    	for(var i=0; i < this.enemyPlaneList.length;i++){
   
    		this.isLive = !(T.rectInRect(this.myPlane, this.enemyPlaneList[i]));
    		break;
    	}
    	for(var j=0; j < this.enemyPlaneList.length;j++){
    		var enemyPlane = this.enemyPlaneList[j];
    		//击中敌机
	    	for(var i=0; i < Game.myPlane.bulletList.length;i++){
	    		if(T.rectInRect(enemyPlane, Game.myPlane.bulletList[i])){
		    		Game.myPlane.bulletList.splice(i, 1);
		    		Game.info.score += 1;
		    		console.log("击中。。。");
		    		enemyPlane.blood -= 1;
		    		if(enemyPlane.blood <= 0){
		    			enemyPlane.isLive = false;
		    			this.enemyPlaneList.splice(j, 1);
		    		}
		    		
		    	}

	    	}
    	}
    	
    	if(!this.isLive){
    		
    		this.over();
    	}
    },
	updatInfo: function(){
		
		Canvas.clear(Game.canvasList.info, 500 , 50);
		Game.info.update();
		 if(Game.info.blood <= 0){
		 	window.clearInterval(Game.interval);
			Game.over();
		 }
	},
	over: function(){
		window.clearInterval(Game.interval);
		alert("game over");
    		//window.location.reload(); 

	}
}
Game.init();