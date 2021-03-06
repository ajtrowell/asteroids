var ship;
var asteroids = [];
var numAsteroids = 4;

function setup() {
  createCanvas(windowWidth,windowHeight);
  collideDebug(true);
  ship = new Ship();
  
  for (let i=0; i<numAsteroids; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);
  ship.update();

  for(let rock of asteroids) {
    rock.update();
  }

  // Restart game after clearing level.
  if (asteroids.length == 0) {
    numAsteroids += 1;
    for (let i=0; i<numAsteroids; i++) {
      asteroids.push(new Asteroid());
    }   
  }
  
}



// Keyboard Inputs
function keyPressed() {
  if(key == ' ') {
    ship.shooting = true;
    ship.fire();
  }
  if(keyCode === LEFT_ARROW)  { ship.rotate = -1; } 
  if(keyCode === RIGHT_ARROW) { ship.rotate =  1; }
  if(keyCode === UP_ARROW)    { ship.thrust =  1; }
  if(keyCode === DOWN_ARROW)  { ship.thrust = -1; }
}
function keyReleased() {
  if(key == ' ') {
    ship.shooting = false;
  }
  if(keyCode === LEFT_ARROW)  { ship.rotate =  0; } 
  if(keyCode === RIGHT_ARROW) { ship.rotate =  0; }
  if(keyCode === UP_ARROW)    { ship.thrust =  0; }
  if(keyCode === DOWN_ARROW)  { ship.thrust =  0; }
}
