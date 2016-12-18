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

  bullets.push(new Bullet(createVector(width/2,height/2),0));
}

function draw() {
  background(0);
  ship.update();
  ship.render();

  for(let rock of asteroids) {
    rock.update();
    rock.render();
  }

  for(let bullet of bullets) {
    bullet.update();
    bullet.render();
  }

}



// Keyboard Inputs
function keyPressed() {
  if(key == ' ') {
    ship.fire = true;
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
