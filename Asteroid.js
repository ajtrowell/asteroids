// Ship class constructor
function Asteroid() {
  // State
  // Random starting position
  this.pos = createVector(random(width),random(height));
  // Random velocity heading (0,360)
  this.vel = p5.Vector.fromAngle(radians(random(360)));
  // Random velocity magnitude
  this.vel.mult(random(1,4  ))

  this.scale = 40;
  this.heading = 0; // degrees CW from vertical.

  // spin rate
  this.rotationRate = random(-3,3);
}
Asteroid.prototype.render = function() {
  push();
  noFill();
  stroke(255);
  translate(this.pos.x,this.pos.y);
  rotate(this.heading * PI / 180);
  // Nead a fancy asteroid drawing method
  ellipse(0,0, this.scale, this.scale);
  pop();
}
Asteroid.prototype.turn = function(angle) {
  this.heading += angle;
}
Asteroid.prototype.update = function() {
  // Update rotation.
  this.turn(this.rotationRate);
  //Update position
  this.pos.add(this.vel);
  // Wrap at edge of screen
  this.edgeWrap();
}
Asteroid.prototype.edgeWrap = function() {
  // Position wrapping
  if(this.pos.x > width + this.scale) {
    this.pos.x = -this.scale;
  } else if(this.pos.x < 0 - this.scale) {
    this.pos.x = width + this.scale;
  }
  if(this.pos.y > height + this.scale) {
    this.pos.y = -this.scale;
  } else if(this.pos.y < 0 - this.scale) {
    this.pos.y = height + this.scale;
  }
}