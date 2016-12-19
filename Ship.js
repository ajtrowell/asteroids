// Ship class constructor
function Ship() {
  // State
  this.pos = createVector(width/2,height/2); // Start at screen center.  
  this.r = 20;
  this.heading = 0; // degrees CW from vertical.
  this.vel = createVector(0,0);

  // accelerationRate, rotationRate, friction, 
  this.accelerationRate = 0.3;
  this.rotationRate = 6;
  this.frictionRatio = 0.99;

  // Command signals
  this.rotate = 0;
  this.thrust = 0;
  this.shooting = false;

  // Bullet object Array
  this.bullets = [];
}
Ship.prototype.render = function() {
  push();
  noFill();
  stroke(255);
  translate(this.pos.x,this.pos.y);
  rotate(this.heading * PI / 180);
  triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
  pop();
}
Ship.prototype.turn = function(angle) {
  this.heading += angle;
}
Ship.prototype.update = function() {
  // Update rotation.
  if(this.rotate) {
    this.turn(this.rotate * this.rotationRate);
  }
  // Update velocity
  if(this.thrust) {
    let accel = p5.Vector.fromAngle(radians(this.heading-90));
    accel.mult(this.thrust * this.accelerationRate); // Sign and magnitude.
    this.vel.add(accel);
  }
  // Add friction
  this.vel.mult(this.frictionRatio);
  //Update position
  this.pos.add(this.vel);
  // Wrap at edge of screen
  this.edgeWrap();
  // Update Bullets
  this.updateBullets();
  // Render after updating state.
  this.render();
}
Ship.prototype.updateBullets = function() {
  // Update, delete, and collision detection for all bullets in this.bullets
  // Update and delete:
  for(i=this.bullets.length-1; i>=0; i--) {
    this.bullets[i].update();
    if(this.bullets[i].isPastMaxRange()) {
      this.bullets.splice(i,1); // Delete ith entry in bullets
    }
  }
}
Ship.prototype.fire = function() {
  // Fire one bullet. Adds bullet object to this.bullets array.
  // Calculate offset of ship nose:
  let posFire = p5.Vector.fromAngle(radians(this.heading-90));
  posFire.mult(this.r);
  posFire.add(this.pos.x, this.pos.y); 
  this.bullets.push(new Bullet(posFire.copy(),this.heading));
}
Ship.prototype.edgeWrap = function() {
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




