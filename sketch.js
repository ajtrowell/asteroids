var ship;

function setup() {
  createCanvas(windowWidth,windowHeight);
  collideDebug(true);
  ship = new Ship();
}

function draw() {
  background(0);
  ship.update();
  ship.render();
}

// Ship class constructor
function Ship() {
  // State
  this.pos = createVector(width/2,height/2); // Start at screen center.  
  this.r = 20;
  this.heading = 0; // degrees CW from vertical.

  // accelerationRate, rotationRate, friction, 
  this.accelerationRate = 1;
  this.rotationRate = 6;
  this.frictionRatio = 0.99;

  // Command signals
  this.rotate = 0;
  this.thrust = 0;
}
Ship.prototype.render = function() {
  push();
  noFill();
  stroke(255);
  translate(this.pos.x,this.pos.y);
  rotate(this.heading * PI / 180);
  triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
  //rect(0,0,50,50);
  pop();
}
Ship.prototype.turn = function(angle) {
  this.heading += angle;
}
Ship.prototype.update = function() {
  if(this.rotate !=0) {
    this.turn(this.rotate * this.rotationRate);
  }
}




// Keyboard Inputs
function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    ship.rotate = -1;
  } 
  if(keyCode === RIGHT_ARROW) {
    ship.rotate = 1;
  }
  if(keyCode === UP_ARROW) {
    ship.thrust = 1;
  }
  if(keyCode === DOWN_ARROW) {
    ship.thrust = -1;
  }
}
function keyReleased() {
  if(keyCode === LEFT_ARROW) {
    ship.rotate = 0;
  } 
  if(keyCode === RIGHT_ARROW) {
    ship.rotate = 0;
  }
  if(keyCode === UP_ARROW) {
    ship.thrust = 0;
  }
  if(keyCode === DOWN_ARROW) {
    ship.thrust = 0;
  }
}
