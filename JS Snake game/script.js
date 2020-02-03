function init() {
	canvas = document.getElementById('mycanvas');
	pen = canvas.getContext('2d');
	W = canvas.width;
	H = canvas.height;
	food = getRandomFood();
	score = 5;
	game_over = false;
	snake = {
		init_length:5,
		color:"black",
		cells:[],
		direction:"right",
		
		createSnake:function(){
			for(var i=this.init_length-1;i>=0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){
			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle = this.color;
				pen.strokeStyle = "white";
				pen.lineWidth = 2;
				pen.strokeRect(this.cells[i].x*7,this.cells[i].y*7,7,7);
				pen.fillRect(this.cells[i].x*7,this.cells[i].y*7,7,7);
			}
		},
		updateSnake:function(){
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX ==food.x && headY==food.y){
				food = getRandomFood();
				score++;
			}
			else{
				this.cells.pop();
			}

			if(this.direction == "right"){
				nextX = headX + 1;
				nextY = headY;
			} 
			else if(this.direction == "left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction == "down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x:nextX,y:nextY});

			var last_x = Math.round(W/7);
			var last_y = Math.round(H/7);

			if(this.cells[0].y<-1 || this.cells[0].x <-1|| 
			this.cells[0].x>last_x || this.cells[0].y>last_y){
				alert("GAMEOVER!!!");
				game_over = true;
			}
		}
	};
	snake.createSnake();

	function keyPressed(e){
		if(e.key == "ArrowRight"){
			snake.direction = "right";
		}
		else if (e.key == "ArrowLeft"){
			snake.direction = "left";
		}
		else if(e.key == "ArrowDown"){
			snake.direction = "down";
		}
		else{
			snake.direction = "up";
		}
	}
	document.addEventListener('keydown',keyPressed);
}

function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle = food.color;
	pen.fillRect(food.x*7,food.y*7,7,7);

	pen.fillStyle = "green";
	pen.font = "14px Robot";
	pen.fillText("Score : "+score,10,10);
}

function update(){
	snake.updateSnake();
}

function gameLoop(){
	draw();
	update();
	if(game_over == true){
		clearInterval(interval);
	}
}

function getRandomFood(){
	var foodX = Math.round(Math.random()*(W-10)/10);
	var foodY = Math.round(Math.random()*(H-10)/10);

	var food = {
		x:foodX,
		y:foodY,
		color:"black",
	};
	return food;
}
init();

//call Game Loop 

var interval = setInterval(gameLoop,100);
