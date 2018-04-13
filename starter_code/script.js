window.onload = function() {
  
  var currentGame;
  var canStart = true;


  var Car = function(){
    this.x = 233;     
    this.y = 500;     
    this.width = 50;  
    this.height = 85; 
    this.img = 'images/car.png';  
  }


  Car.prototype.drawCar = function(){ 
    var theImage = new Image();  
    theImage.src = this.img; 
    ctx.drawImage(theImage, this.x, this.y, this.width, this.height)
  }


  Car.prototype.move = function(magicalNumber) {
    ctx.clearRect(this.x, this.y, this.width, this.height)
    switch(magicalNumber) {
      case 37:
        if(this.canMove(this.x-25, this.y)) {
          this.x -= 25;
        }
        break;
      case 38:
        if(this.canMove(this.x, this.y-25)) {
        this.y -= 25;
        }  
        break;
      case 39:
        if(this.canMove(this.x+25, this.y)) {
          this.x += 25;
        }
        break;
      case 40:
        if(this.canMove(this.x, this.y+25)) {
          this.y += 25;
        }
        break;
      default:
        console.log("oops");
    }
      this.drawCar();
  }


  Car.prototype.canMove = function(futureX, futureY) {
    var canIMove = true;
    currentGame.obstacles.forEach(function(theObstacle) {
      // for the car to stop on the right side too, we need to nest more if functions that take the width of the car into account
      if( (futureX >= theObstacle.x && futureX <= theObstacle.x + theObstacle.width) && (futureY >= theObstacle.y && futureY <= theObstacle.y + theObstacle.height) ) {
        canIMove=false;
        console.log("ouch");
      }
    });
      return canIMove;
    }




  var Obstacle = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  Obstacle.prototype.draw = function(){  
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }


  var myCanvas = document.getElementById('theCanvas');
  var ctx = myCanvas.getContext('2d');
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
  

  function startGame() {
    if(canStart) {
      currentGame = new Game();
      var theCar = new Car();
      currentGame.car = theCar;
      currentGame.car.drawCar();
      var leftWall = new Obstacle(0, 0, 30, 700);
      var rightWall = new Obstacle(470, 0, 30, 700);
      // push the walls into the currentGame
      currentGame.obstacles.push(leftWall, rightWall);
      // ability to draw any obstacle we add to obstacles array in the future
      currentGame.obstacles.forEach(function(oneObstacle) {
        oneObstacle.draw()
      });
      canStart = false;
    }
  }


  document.onkeydown = function(event) {
    if (event.which === 37 || event.which === 38 || event.which === 39 || event.which === 40) {
      event.preventDefault();
    }
    var directionCode = event.which;
    currentGame.car.move(directionCode);
  }

}; //close window.onload function