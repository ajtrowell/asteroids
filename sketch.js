var ship;
var asteroids = [];
var numAsteroids = 5;
var bullets = [];
var bulletsToDelete = [];

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
      bulletsToDelete.push(i);
    }
  }
  for (i=0; i<bulletsToDelete.length; i++) {
    bullets.splice(bulletsToDelete[i],1); // Remove bullets from array
  }
  bulletsToDelete = []; // Clear array after deleting offending bullets

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
