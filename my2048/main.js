var Game = {
	canvasList: [],
	blocksMap: [],
	imgs: [],
	info: null,
	interval: null,
	winNum: 2048,
	isWin: false,
	isStart: false,
	total: 0,
	isValidated: false,
	init: function() {
		this.initCanvas();
		this.initImgs();
		this.initInfo();
		this.initBg();
		this.initBind();
		BlockFactory.imgs = Game.imgs;
		Game.blocksMap = BlockFactory.initBlockMap();
	},
	initCanvas: function() {
		this.canvasList = {
			main: document.getElementById("main").getContext("2d"),
			info: document.getElementById("info").getContext("2d"),
			bg: document.getElementById("bg").getContext("2d")
		}
	},
	initImgs: function() {
		Game.imgs = T.loadImgs(["img/but2.png", "img/but4.png", "img/but8.png",
			"img/but16.png", "img/but32.png", "img/but64.png",
			"img/but128.png", "img/but256.png", "img/but512.png",
			"img/but1024.png", "img/but2048.png", "img/but4096.png", 'img/but_empty.png'
		], function(imgs) {
		});
	},
	initBg: function() {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				T.drawImg(this.canvasList.bg, document.getElementById("but_empty"), 12 + j * (12 + 110), 12 + i * (12 + 110));
			}
		}
	},
	initInfo: function() {
		Canvas.drawImg(this.canvasList.info, document.getElementById("start_img"), 370, 80);
	},
	initBind: function() {
		var startContext = document.getElementById("info");
		startContext.onclick = function(e) {
			if (e.offsetX > 370 && e.offsetX < 500 && e.offsetY > 80 && e.offsetY < 120) {
				if (!Game.isStart)
					Game.start();
				else
					Game.restart();
			}
		}
		//监听键盘事件
		document.onkeydown = function(e) {
			if (Game.isStart) {
				var map = Game.blocksMap,
					canMove = false,
					i, j;
				if (e.keyCode == 38) {//上
					for (i = 0; i < map.length; i++) {
						for (j = 0; j < map[0].length; j++) {
							if (T.loopKeyUp(map, i, j))
								canMove = true;
						}
					}
					if (canMove)
						BlockFactory.initBlock();
				} else if (e.keyCode == 40) {//下
					for (i = 0; i < map.length; i++) {
						for (j = map[0].length - 1; j >= 0; j--) {
							if (T.loopKeyDown(map, i, j))
								canMove = true;		
						}
					}
					if (canMove)
						BlockFactory.initBlock();
				} else if (e.keyCode == 37) {//左
					for (i = 0; i < map.length; i++) {
						for (j = 0; j < map[0].length; j++) {	
							if (T.loopKeyLeft(map, i, j))
								canMove = true;
						}
					}
					if (canMove)
						BlockFactory.initBlock();
				} else if (e.keyCode == 39) {//右
					for (i = map[0].length - 1; i >= 0; i--) {
						for (j = 0; j < map.length; j++) {
							if (T.loopKeyRight(map, i, j))
								canMove = true;
						}
					}
					if (canMove)
						BlockFactory.initBlock();
				} else {
					return;
				}
			}
			Game.isValidated = false;
		}
		document.onkeyup = function(e) {}
	},
	//检测满格时是否可移动
	hasCanMove: function(total) {
		Game.isValidated = true;
		var map = T.deepcopy(Game.blocksMap); //模拟当前状态
		var i,
			j,
			len = map.length;
		for (i = 0; i < len; i++) {
			for (j = 0; j < len; j++) {
				if (T.loopKeyUp2(map, i, j))
					return true;
			}
		}
		for (i = 0; i < len; i++) {
			for (j = len - 1; j >= 0; j--) {
				if (T.loopKeyDown2(map, i, j))
					return true;
			}
		}
		for (i = 0; i < len; i++) {
			for (j = 0; j < len; j++) {
				if (T.loopKeyLeft2(map, i, j))
					return true;
			}
		}
		for (i = len - 1; i >= 0; i--) {
			for (j = 0; j < len; j++) {
				if (T.loopKeyRight2(map, i, j))
					return true;
			}
		}
		return false;
	},
	//开始
	start: function() {
		this.isStart = true;
		BlockFactory.init2Blocks();
		this.interval = window.setInterval(Game.loop, 20);
	},
	//重新开始
	restart: function() {
		this.isStart = true;
		this.interval = window.clearInterval(Game.interval);
		this.blocksMap = [];
		this.info = null;
		this.isWin = false;
		Game.blocksMap = BlockFactory.initBlockMap();
		this.start();
	},
	//赢
	win: function() {
		this.interval = window.clearInterval(Game.interval);
		var info = confirm("win,继续？");
		if (info) {
			Game.isWin = false;
			Game.winNum = 4096;
			Game.interval = window.setInterval(Game.loop, 20);
		} else {
			Game.restart();
		}
	},
	//输
	loose: function() {
		Game.interval = window.clearInterval(Game.interval);
		var info = confirm("失败。。。,从新开始");
		if (info) {
			Game.restart();
			return true;
		} else {
			Game.interval = window.setInterval(Game.loop, 20);
		}
	},
	//主循环
	loop: function() {
		var total = 0,
			canMove = false,
			map = Game.blocksMap;
		Canvas.clear(Game.canvasList.main, 500, 500);
		for (var i = map[0].length - 1; i >= 0; i--) {
			for (var j = 0; j < map.length; j++) {
				if (map[i][j]) {
					++total;
					map[i][j].update();
					if (map[i][j].count == Game.winNum) {
						Game.isWin = true;
					}
				}
			}
		}
		if (!Game.isValidated && total == 16) { //满格
			if (!Game.hasCanMove(total)) //没有可以移动的
				Game.loose();
		}
		if (Game.isWin)
			Game.win();
	}
}
Game.init();