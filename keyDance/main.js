var Game = {
	dirList: [],
	dirListBackup: [],//backup
	canvasList: {},
	imgList: {},
	info: null,
	dirKey: -1,//键盘事件对应方向值
	interval: null,
	okIndex: -1,//Dir i按对
	isStart: false,
	init: function(){
		this.initImg();
		this.initCanvas();
		this.initWelcome();
		this.initBind();
	},
	initImg : function(){	
		this.imgList = {	
			start_img : document.getElementById("start_img"),
			end_img : document.getElementById("end_img"),
			up_img : document.getElementById("up_img"),
			down_img : document.getElementById("down_img"),
			left_img : document.getElementById("left_img"),
			right_img : document.getElementById("right_img"),
			upbingo_img : document.getElementById("upbingo_img"),
			downbingo_img : document.getElementById("downbingo_img"),
			leftbingo_img : document.getElementById("leftbingo_img"),
			rightbingo_img : document.getElementById("rightbingo_img"),
		}
	},
	initCanvas: function(){
		this.canvasList = {		
			main : document.getElementById("main").getContext("2d"),
			info : document.getElementById("info").getContext("2d"),
			welcome : document.getElementById("welcome").getContext("2d")
		}
	},
	initWelcome: function(){
		Canvas.drawImg(this.canvasList.welcome, this.imgList.start_img, 0, 0, 200, 100);
	},
	initBind: function(){
		//点击开始事件
		var startContext = document.getElementById("welcome");
		startContext.onclick= function(e){
			if(!Game.isStart){	
				startContext.style.display ="none";
				Game.isStart = true;
				Game.start();
			}else{
				Game.reset();
			}
		}
		//键盘事件
		document.onkeydown = function(e){
			if(e.keyCode == 13){//enter键开始
				startContext.onclick();
				return;
			}else if(e.keyCode == 38){
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
			Game.validate();
		};
	},
	validate: function(){	
		for (var i = 0; i < Game.dirList.length; i++) {	
			if(Game.dirList[i].dirKey == Game.dirKey){
				this.okIndex += 1;
				Game.dirListBackup[this.okIndex].dirKey += 4;//反转Dir			
				Game.dirList.splice(0, 1);
				Game.info.count += 1;//更新连击数目	
				if(Game.dirList.length <= 0){
					this.okIndex = -1;
					Game.dirList = [];
					this.nextLevel();
				}
				break;
			}else{
				Game.dirList = [];
				window.clearInterval(Game.interval);
				Game.initEnd();
				//this.reset();//重新开始
				break;
			}
		};
	},
	start:function(){
		this.info = new Info(this.canvasList.info);
		this.info.init();
		this.dirList = dirFactory.createDirs();
		this.dirListBackup = this.dirList.concat() ;//备用
		this.interval = window.setInterval(Game.loop, 20);
	},
	reset: function(){
		window.location.reload(); 

	},
	nextLevel: function(){
		Canvas.clear(this.canvasList.main, 700 , 500);
		this.dirList = dirFactory.createDirs();
		this.dirListBackup = this.dirList.concat() ;//备用
		Game.info.time = 100;

	},
	loop: function(){
		Game.updatDir();
		Game.updatInfo();
		
	},
	updatInfo: function(){
		Game.info.time -= Game.info.timeSpeed;
		Canvas.clear(Game.canvasList.info, 700 , 50);
		Game.info.update();
		if(	Game.info.time <= 0){
			window.clearInterval(Game.interval);
			Game.initEnd();
		}
	},
	updatDir: function(){
		
		if(this.okIndex >= 0){
			Game.dirListBackup[this.okIndex].reverseDir();	
		}
		
	},
	initEnd: function(){
		var startContext = document.getElementById("welcome");
		startContext.style.display ="block";
		Canvas.drawImg(this.canvasList.welcome, this.imgList.end_img, 0, 0, 200, 100);
	}
}
Game.init();