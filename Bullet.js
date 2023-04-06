// Bullet class constructor
function Bullet(pos,heading) {
  // Input Parameters
  this.heading = heading;
  this.initialPos = pos;

  // Constants
  this.r = 5;
  this.speed = 20;
   // set max range to length of window diagonal.
  this.maxRange = sqrt(pow(width,2) + pow(height,2));

  // State
  this.pos = this.initialPos; // Vector
  this.vel = p5.Vector.fromAngle(radians(this.heading-90));
  this.vel.mult(this.speed);
  this.distanceTraveled = 0;
}
Bullet.prototype.render = function() {
  push();
  noFill();
  stroke(255);
  strokeWeight(this.r);
  translate(this.pos.x,this.pos.y);
  rotate(this.heading * PI / 180);
  point(0,0);
  pop();
}
Bullet.prototype.update = function() {
  //Update position
  this.pos.add(this.vel);
  this.distanceTraveled += this.speed;
  // Wrap at edge of screen
  this.edgeWrap();
  // Render after updating state.
  this.render();
}
Bullet.prototype.edgeWrap = function() {
  // Position wrapping
  if(this.pos.x > width + this.r) {
    this.pos.x = -this.r;
  } else if(this.pos.x < 0 - this.r) {
    this.pos.x = width + this.r;
  }
  if(this.pos.y > height + this.r) {
    this.pos.y = -this.r;
  } else if(this.pos.y < 0 - this.r) {
    this.pos.y = height + this.r;
  }
}
Bullet.prototype.isPastMaxRange = function() {
  return (this.distanceTraveled > this.maxRange);
}
Bullet.prototype.hit = function(asteroid) {
  // Return true if bullet hit asteroid.
  // Could use collision library and asteroid.perimeter[] for more accuracy.
  // Current implementation uses asteroid.r + Bullet.r for radius.
  return (this.pos.dist(asteroid.pos) < (asteroid.r + this.r));
}
