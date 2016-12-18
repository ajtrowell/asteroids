var ship;

function setup() {
  createCanvas(windowWidth,windowHeight);
  collideDebug(true);
  ship = new Ship();
}

function draw() {
  background(0);
  ship.render();
}

// Ship class constructor
function Ship() {
  this.pos = createVector(width/2,height/2); // Start at screen center.  
  this.r = 20;

  // Command signals
  this.rotate = 0;
  this.thrust = 0;
}
Ship.prototype.render = function() {
  push();
  noFill();
  stroke(255);
  translate(this.pos.x,this.pos.y);
  triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
  //rect(0,0,50,50);
  pop();
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
