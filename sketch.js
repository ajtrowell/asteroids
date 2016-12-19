var ship;
var asteroids = [];
var numAsteroids = 5;
var bullets = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  collideDebug(true);
  ship = new Ship();
  
  for (i=0; i<numAsteroids; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);
  ship.update();
  ship.render();

  for(let rock of asteroids) {
    rock.update();
    rock.render();
  }

  for(i=0; i<bullets.length; i++) {
    bullets[i].update();
    bullets[i].render();
    if(bullets[i].isPastMaxRange()) {
      bullets.splice(i,1); // Delete ith entry in bullets
    }
  }
}



// Keyboard Inputs
function keyPressed() {
  if(key == ' ') {
    ship.fire = true;
    bullets.push(new Bullet(ship.pos.copy(),ship.heading));
  }
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
  if(key == ' ') {
    ship.fire = false;
  }
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
