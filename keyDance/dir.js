function Dir(cxt, imgList){
	this.cxt = cxt;
	this.imgList = imgList;
	this.dirMap = [
		this.imgList.up_img ,
		this.imgList.down_img , 
		this.imgList.left_img , 
		this.imgList.right_img ,
		this.imgList.upbingo_img ,
		this.imgList.downbingo_img , 
		this.imgList.leftbingo_img , 
		this.imgList.rightbingo_img ,
	];
	this.dirKey = 0;
	this.dirImg = null;
	this.inter = 20;//间距
	this.left = 50;
	this.top = 400;
	this.size = 80;
}
Dir.prototype = {
	createDir: function(){
		this.dirKey = Math.floor(Math.random()*4);//可均衡获取0到3的随机整数。		
		this.dirImg = this.dirMap[this.dirKey];
		Canvas.drawImg(this.cxt,this.dirImg, this.left, this.top , this.size, this.size);
	},
	updateLoaction: function(i){
		if(i == 0 ) //第一个不用更新位置
			return;
		this.left += (this.size + this.inter) *i;
	},
	reverseDir: function(){//反转某个Dir		
		this.dirImg = this.dirMap[this.dirKey];
		Canvas.drawImg(this.cxt,this.dirImg, this.left, this.top , this.size, this.size);
	}
}
dirFactory = {
	cxt: document.getElementById("main").getContext("2d"),
	imgList: {
			start_img : document.getElementById("start_img"),
			up_img : document.getElementById("up_img"),
			down_img : document.getElementById("down_img"),
			left_img : document.getElementById("left_img"),
			right_img : document.getElementById("right_img"),
			upbingo_img : document.getElementById("upbingo_img"),
			downbingo_img : document.getElementById("downbingo_img"),
			leftbingo_img : document.getElementById("leftbingo_img"),
			rightbingo_img : document.getElementById("rightbingo_img"),
	},
	dirNum : 0,//方向块个数
	dirList :[],
	createDirNum:  function(){
		this.dirNum= Math.floor(Math.random()*4)+ 3;//可均衡获取3到6的随机整数。
	},
	createDirs: function(){
		this.createDirNum();
		for(var i = 0; i < this.dirNum ;i++){
			var dir = new Dir(this.cxt, this.imgList)
			dir.updateLoaction(i)
			dir.createDir();
			this.dirList.push(dir);
		}
		return this.dirList;
	},
}