var Block =function(cxt, imgs, count, x, y){
	this.cxt = cxt;
	this.imgs = imgs;
	this.x = x;//数组中索引x //12+0*(12+110)
	this.y = y;
	this.xx = 12+this.x*(12+110);//canvas中坐标x
	this.yy= 12+this.y*(12+110);
	this.size = 110;
	this.count = count;//分数, 2,4,8........
}
Block.prototype = {
	draw: function(){
		if(this.count <= 4096)
			T.drawImg(this.cxt, this.imgs[Math.log(this.count)/Math.log(2)-1], this.xx, this.yy);
		else
			T.drawImg(this.cxt, this.imgs[Math.log(this.count)/Math.log(2)-1], this.xx+4, this.yy+4);
	},
	drawMagic: function(){
		T.drawImgMagic(this.cxt, this.imgs[Math.log(this.count)/Math.log(2)-1], this.xx, this.yy);
	},
	update: function(){
		if(this.count <= 4096)
			T.drawImg(this.cxt, this.imgs[Math.log(this.count)/Math.log(2)-1], 12+this.x*(12+110),12+this.y*(12+110));
		else
			T.drawImg(this.cxt, this.imgs[Math.log(this.count)/Math.log(2)-1], 12+this.x*(12+110)+4,12+this.y*(12+110)+4);
	}
}
BlockFactory = {
	cxt : document.getElementById("main").getContext("2d"),
	x : 0,
	y : 0,
	imgs: [],
	blockMap: [],
	count: 2,
	getXY:  function(){
		this.x= Math.floor(Math.random()*4);//可均衡获取0到3的随机整数。
		this.y= Math.floor(Math.random()*4);//可均衡获取0到3的随机整数。
		if(this.hasOne()){
			this.getXY();
		}
	},
	getCount:  function(){
		//可均衡获取0到10的随机整数。
		//出现4的概率为1/10
		if(  Math.floor(Math.random()*10) == 1){
			this.count = 4;
		}else
			this.count = 2;
	},
	initBlockMap: function(){
		this.blockMap=new Array(); 
		for(var i=0;i<4;i++){ 
			this.blockMap[i]=new Array(); 
			for(var j=0;j<4;j++){ 
				this.blockMap[i][j]=null;
			}
		}
		return this.blockMap;
	},
	//开始时初始化两个2分block
	init2Blocks: function(){
		for(var i=0;i<2;i++){
			this.initBlock();
		}	
	} ,
	//生成1
	initBlock: function(){
		this.getXY();
		this.getCount();
		var block1 = new Block(this.cxt, this.imgs, this.count, this.x, this.y);
		block1.draw();
		this.blockMap[this.x][this.y] = block1;
	} ,
	initBlock4096: function(){
		this.getXY();
		this.count = 131072;
		var block1 = new Block(this.cxt, this.imgs, this.count, this.x, this.y);
		block1.draw();
		this.blockMap[this.x][this.y] = block1;
	},
	//判断重复
	hasOne: function(){
		if(this.blockMap[this.x][this.y] !=null)	
			return true;
		return false;
	},
	newOne:function(count, x, y){
console.log(count);
		return new Block(this.cxt, this.imgs, count, x, y);
	}
}

