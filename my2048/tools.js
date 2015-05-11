 Object.prototype.clone= function(){
 		var objClone ;
 		if( this.constructor == Object)
 			objClone = new this.constructor();
 		else
 			objClone = new this.constructor(this.valueOf());
 		for( var key in this){
 			if(objClone[key] != this[key]){
 				if(typeof(this[key]) == 'object'){
 					objClone[key] = this[key].clone();
 				}else{
 					objClone[key] = this[key];
 				}
 			}
 		}
 		objClone.toString = this.toString;
 		objClone.valueOf = this.valueOf;
 		
 		return objClone;
 	}
 //画布类
 var Canvas = {

 	//清除画布
 	clear: function(cxt, x, y) {
 		cxt.clearRect(0, 0, x, y);
 	},
 	clearRect: function(cxt, x, y, width, height) {
 		cxt.clearRect(x, y, width, height);
 	},
 	//画图
 	drawImg: function(cxt, img, x, y) {

 		cxt.drawImage(img, x, y);
 	},
 	//画文字
 	drawText: function(cxt, string, x, y, color) {

 		cxt.fillStyle = color;
 		cxt.font = 'bold 25px sans-serif';
 		cxt.fillText(string, x, y);
 	},
 	//画填充的方
 	fillRect: function(cxt, x, y, width, height, color) {

 		cxt.fillStyle = color;
 		cxt.fillRect(x, y, width, height);
 	}

 }

 var T = {
 	fillBlock: function(cxt, x, y, color) {
 		Canvas.fillRect(cxt, x, y, 110, 110, color);
 	},
 	drawImg: function(cxt, img, x, y) {
 	
 		cxt.drawImage(img, x, y);

 	},
 	// drawImgMagic: function(cxt, img, x, y) {
		// console.log(loop);
		// if(interval)
		// 	clearInterval(interval);
 	// 	cxt.globalAlpha = 0.1;
 	// 	var revealTimer = self.setInterval(myloop, 100);

 	// 	function myloop() {
 	// 		cxt.save();
 	// 		cxt.drawImage(img, x, y);
 	// 		cxt.globalAlpha += 0.1;
 	// 		console.log(cxt.globalAlpha);
 		
 	// 		if (cxt.globalAlpha + 0.1>= 1.0) {
 	// 			cxt.restore();
 	// 			clearInterval(revealTimer);
 				
 	// 			interval = window.setInterval(loop,100);
 		
 	// 		}
 	// 	}
 		
 	// },
 	drawCount: function(cxt, string, x, y, color) {
 		cxt.fillStyle = color;
 		cxt.textAlign = 'center';
 		cxt.textBaseline = 'middle';
 		cxt.font = 'bold 50px sans-serif';
 		cxt.fillText(string, x, y, 100);
 	},
 	loadImgs: function(arrUrl, cb) {

 		var count = 0;
 		var imgs = [];

 		for (var i = 0; i < arrUrl.length; i++) {

 			var img = new Image();
 			img.onload = function() {

 				this.onload = null;

 				imgs.push(this);
 				count += 1;

 				img = null;

 				if (count >= arrUrl.length) {

 					imgs.sort(function(a, b) {
 						return a.index - b.index;
 					});;

 					cb && cb(imgs);
 				}
 			}
 			img.index = i;
 			img.src = arrUrl[i];
 		}
 		return imgs;
 	},
 	loopKeyUp: function(map, i, j) {
 		var canMove = 0;
 		if (map[i][j]) {

 			if (map[i][j].y > 0 && j - 1 >= 0) {
 				if (map[i][j - 1] == null) {
 					map[i][j].y--;
 					map[i][j - 1] = map[i][j];
 					map[i][j] = null;

 					T.loopKeyUp(map, i, --j);
 					if (!canMove)
 						canMove = 1;

 				} else if (map[i][j].count == map[i][j - 1].count) {
 					var newCount = map[i][j].count + map[i][j - 1].count;

 					var newBlock = new Block(Game.canvasList.main, Game.imgs, newCount, map[i][j - 1].x, map[i][j - 1].y);
 					map[i][j - 1] = newBlock;
 					var k = j - 1;
 					//Game.loopKeyUp(i, k);
 					map[i][j] = null;
 					if (!canMove)
 						canMove = 1;
 				}

 			}
 		}
 		return canMove;
 	},
 	loopKeyDown: function(map, i, j) {

 		var canMove = 0;
 		if (map[i][j]) {
 			console.log("i:" + i + " j:" + j);
 			if (map[i][j].y < 3 && j + 1 <= 3) {
 				if (map[i][j + 1] == null) {
 					map[i][j].y++;
 					map[i][j + 1] = map[i][j];
 					map[i][j] = null;

 					T.loopKeyDown(map, i, ++j);
 					if (!canMove)
 						canMove = 1;
 				} else if (map[i][j].count == map[i][j + 1].count) {
 					var newCount = map[i][j].count + map[i][j + 1].count;

 					var newBlock = new Block(Game.canvasList.main, Game.imgs, newCount, map[i][j + 1].x, map[i][j + 1].y);
 					map[i][j + 1] = newBlock;

 					map[i][j] = null;
 					if (!canMove)
 						canMove = 1;
 				}

 			}
 		}
 		return canMove;

 	},
 	loopKeyLeft: function(map, i, j) {

 		var canMove = 0;
 		if (map[i][j]) {

 			if (map[i][j].x > 0 && i - 1 >= 0) {
 				if (map[i - 1][j] == null) {
 					map[i][j].x--;
 					map[i - 1][j] = map[i][j];
 					map[i][j] = null;

 					T.loopKeyLeft(map, --i, j);
 					if (!canMove)
 						canMove = 1;
 				} else if (map[i][j].count == map[i - 1][j].count) {
 					var newCount = map[i][j].count + map[i - 1][j].count;

 					var newBlock = new Block(Game.canvasList.main, Game.imgs, newCount, map[i - 1][j].x, map[i - 1][j].y);

 					map[i - 1][j] = newBlock;

 					map[i][j] = null;
 					if (!canMove)
 						canMove = 1;
 				}

 			}
 		}
 		return canMove;
 	},
 	loopKeyRight: function(map, i, j) {

 		var canMove = 0;
 		if (map[i][j]) {
 			if (map[i][j].x < 3 && i + 1 <= 3) {
 				if (map[i + 1][j] == null) {
 					map[i][j].x++;
 					map[i + 1][j] = map[i][j];
 					map[i][j] = null;

 					T.loopKeyRight(map, ++i, j);
 					if (!canMove)
 						canMove = 1;
 				} else if (map[i][j].count == map[i + 1][j].count) {
 					var newCount = map[i][j].count + map[i + 1][j].count;

 					var newBlock = new Block(Game.canvasList.main, Game.imgs, newCount, map[i + 1][j].x, map[i + 1][j].y);
 					map[i + 1][j] = newBlock;

 					map[i][j] = null;
 					if (!canMove)
 						canMove = 1;
 				}

 			}
 		}
 		return canMove;
 	},
 	
 	deepcopy2: function(obj) {

 		var out = new Array(),

 			len = obj.length;
 		for (var i = 0; i < len; i++) {
 			out[i] = new Array();
 			for (var j = 0; j < len; j++) {
		 		if (obj[i][j]) {
		 			var objClone ;
		 			var nthis = obj[i][j];
			 		if( nthis.constructor == Object)
			 			objClone = new this.constructor();
			 		else
			 			objClone = new this.constructor(nthis.valueOf());
			 		for( var key in nthis){
			 			if(objClone[key] != nthis[key]){
			 				if(typeof(this[key]) == 'object'){
			 					objClone[key] = nthis[key].clone();
			 				}else{
			 					objClone[key] = nthis[key];
			 				}
			 			}
			 		}
			 		objClone.toString = nthis.toString;
			 		objClone.valueOf = nthis.valueOf;
 					out[i][j] = objClone;
 				} else
 					out[i][j] = null;
 			}

 		}
 		return out;
 	},
 	deepcopy: function(obj) {

 		var out = new Array(),

 			len = obj.length;
 		for (var i = 0; i < len; i++) {
 			out[i] = new Array();
 			for (var j = 0; j < len; j++) {
 				if (obj[i][j]) {
 					out[i][j] = obj[i][j].count;
 					console.log("obj[i][j].count:"+obj[i][j].count);
 				} else
 					out[i][j] = 0;
 			}

 		}
 		return out;
 	},
 	loopKeyUp2: function(map, i, j) {
 		var canMove = 0;
 		if (map[i][j]) {

 			if (j > 0 && j - 1 >= 0) {
 				if (map[i][j - 1] == 0) {

 					map[i][j - 1] = map[i][j];
 					map[i][j] = 0;

 					T.loopKeyUp2(map, i, --j);
 					if (!canMove)
 						canMove = 1;

 				} else if (map[i][j] == map[i][j - 1]) {
 					var newCount = map[i][j] + map[i][j - 1];
 					map[i][j - 1] = newCount;

 					map[i][j] = 0;
 					if (!canMove)
 						canMove = 1;
 				}

 			}
 		}
 		return canMove;
 	},

 	loopKeyDown2: function(map, i, j) {

 		var canMove = 0;
 		if (map[i][j] > 0) {
 			console.log("i:" + i + " j:" + j);
 			if (map[i][j].y < 3 && j + 1 <= 3) {
 				if (map[i][j + 1] == null) {
 					map[i][j].y++;
 					map[i][j + 1] = map[i][j];
 					map[i][j] = null;

 					T.loopKeyDown2(map, i, ++j);
 					if (!canMove)
 						canMove = 1;
 				} else if (map[i][j].count == map[i][j + 1].count) {
 					var newCount = map[i][j] + map[i][j + 1];

 					map[i][j + 1] = newCount;

 					map[i][j] = null;
 					if (!canMove)
 						canMove = 1;
 				}

 			}
 		}
 		return canMove;

 	},
 	loopKeyLeft2: function(map, i, j) {

 		var canMove = 0;
 		if (map[i][j] > 0) {

 			if (i > 0 && i - 1 >= 0) {
 				if (map[i - 1][j] == 0) {

 					map[i - 1][j] = map[i][j];
 					map[i][j] = 0;

 					T.loopKeyLeft2(map, --i, j);
 					if (!canMove)
 						canMove = 1;
 				} else if (map[i][j] == map[i - 1][j]) {
 					var newCount = map[i][j] + map[i - 1][j];


 					map[i - 1][j] = newCount;

 					map[i][j] = 0;
 					if (!canMove)
 						canMove = 1;
 				}

 			}
 		}
 		return canMove;
 	},
 	loopKeyRight2: function(map, i, j) {

 		var canMove = 0;
 		if (map[i][j] > 0) {
 			if (i < 3 && i + 1 <= 3) {
 				if (map[i + 1][j] == 0) {

 					map[i + 1][j] = map[i][j];
 					map[i][j] = 0;

 					T.loopKeyRight2(map, ++i, j);
 					if (!canMove)
 						canMove = 1;
 				} else if (map[i][j] == map[i + 1][j]) {
 					var newCount = map[i][j] + map[i + 1][j];

 					map[i + 1][j] = newCount;

 					map[i][j] = 0;
 					if (!canMove)
 						canMove = 1;
 				}

 			}
 		}
 		return canMove;
 	},
 }