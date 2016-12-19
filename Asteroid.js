// Asteroid class constructor
function Asteroid() {
  // State
  // Random starting position
  this.pos = createVector(random(width),random(height));
  // Random velocity heading (0,360)
  this.vel = p5.Vector.fromAngle(radians(random(360)));
  // Random velocity magnitude
  this.vel.mult(random(1,4))

  this.heading = random(360); // degrees CW from vertical.
  // spin rate
  this.rotationRate = random(-3,3);
  // Size
  this.r = random(20,50); // nominal radius
  // number of points in asteroid perimeter.
  this.numVertices = round(random(8, 15)); 
  this.radiusVar = 0.4 * this.r; // Radius +/- this value.
  this.perimeter = []; // Shape of asteroid, array of vectors.
  this.generate(); // Generate procedural asteroid shape array.
}
Asteroid.prototype.render = function() {
  push();
  noFill();
  stroke(255);
  translate(this.pos.x,this.pos.y);
  rotate(this.heading * PI / 180);
  //ellipse(0,0, this.r*2, this.r*2.5);
  // Fancy asteroid drawing method
  beginShape();
  for(let point of this.perimeter) {
    vertex(point.x,point.y);
  }
  endShape(CLOSE);
  pop();
}
Asteroid.prototype.generate = function() {
  // Procedurally generate a new asteroid.
  for(var i = 0; i < this.numVertices; i++) {
    let radiusRand = this.r + random(-this.radiusVar,this.radiusVar);
    let angle = map(i, 0, this.numVertices, 0, TWO_PI);
    let x = radiusRand*cos(angle);
    let y = radiusRand*sin(angle);
    this.perimeter[i]=createVector(x,y);
  }
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
  // Render after updating state.
  this.render();
}
Asteroid.prototype.edgeWrap = function() {
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