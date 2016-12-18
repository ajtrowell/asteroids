// Bullet class constructor
function Bullet(pos,heading) {
  // Input Parameters
  this.heading = heading;
  this.initialPos = pos;

  // Constants
  this.r = 1;
  this.speed = 6;

  // State
  this.pos = this.initialPos; // Vector
  this.vel = p5.Vector.fromAngle(radians(this.heading-90));
  this.vel.mult(this.speed);

}
Bullet.prototype.render = function() {
  push();
  noFill();
  stroke(255);
  strokeWeight(5);
  translate(this.pos.x,this.pos.y);
  rotate(this.heading * PI / 180);
  point(0,0);
  pop();
}
Bullet.prototype.update = function() {
  //Update position
  this.pos.add(this.vel);
  // Wrap at edge of screen
  this.edgeWrap();
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