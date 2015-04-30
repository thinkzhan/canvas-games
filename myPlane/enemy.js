var EnemyPlane = function(cxt, img, type, x){
	this.cxt = cxt;
	this.img = img;
	this.type = type;
	this.x = x;
	this.y = 0;
	this.speed = 1.5;//移动速度
	this.planeMap = [
		{x: 170 , y: 335, width: 195, height: 140, realWidth: 100, realheight: 80, blood: 3},//在大图中位置
		{x: 265, y: 478, width: 100, height: 70, realWidth: 50, realheight: 40, blood: 1}
	];
	this.width =  this.planeMap[this.type].realWidth;
	this.height = this.planeMap[this.type].realheight;
	this.blood = this.planeMap[this.type].blood;
	this.isLive = true;
}

EnemyPlane.prototype = {
	draw: function(){
		
		Canvas.drawImg(this.cxt, this.img, this.planeMap[this.type].x, this.planeMap[this.type].y,
		 this.planeMap[this.type].width, this.planeMap[this.type].height, this.x , this.y, 
		 this.planeMap[this.type].realWidth,this.planeMap[this.type].realheight);			
	},
	// clear: function(){
	// 	Canvas.clearRect(this.cxt, this.x , this.y, this.width, this.height)
	// },
	update:function(){
		//this.clear();
		this.validate();
		if(!this.isLive){
			return;
		}
		this.draw();
	},
	validate: function(){
		
		if(this.isLive){
			if(this.y >= 750 - this.planeMap[this.type].realheight){//出下界
				this.isLive = false;
			}
		}
	}
};

EnemyPlaneFactory = {
	cxt: document.getElementById("main").getContext("2d"),
	img_plane_enemy: document.getElementById("img_plane_enemy") ,
	type : 0,//敌机类型
	num:0,//敌机数量
	x: 0,//敌机x位置
	enemyPlaneList :[],
	getType:  function(){
		this.type= Math.floor(Math.random()*2);//可均衡获取0到1的随机整数。
	},
	getNum:  function(){
		this.num= Math.floor(Math.random()*3 +1);//可均衡获取1到3的随机整数。
	},
	getX:  function(){
		this.x= Math.floor(Math.random()*300+100);//可均衡获取100到400的随机整数。
	},
	createEnemyPlanes: function(){
		this.getNum();
		for(var i = 0; i < this.num ;i++){
			this.getType();
			this.getX();
			var enemyPlane = new EnemyPlane(this.cxt, this.img_plane_enemy, this.type, this.x-i*100);
			enemyPlane.draw();
			this.enemyPlaneList.push(enemyPlane);
		}
		return this.enemyPlaneList;
	}
}
