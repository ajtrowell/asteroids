// Ship class constructor
function Ship() {
  // State
  this.pos = createVector(width/2,height/2); // Start at screen center.  
  this.r = 20; // Notional 'radius'
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

  // Ship model
  this.perimeter = [];
  this.perimeter.push(createVector(-this.r, this.r));
  this.perimeter.push(createVector(this.r, this.r));
  this.perimeter.push(createVector(0, -this.r));

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
  // Check for collisions with asteroids.
  this.collisionDetection();
  // Render after updating state.
  this.render();
}
Ship.prototype.updateBullets = function() {
  // Update, delete, and collision detection for all bullets in this.bullets
  // Update and delete:
  for(let i=this.bullets.length-1; i>=0; i--) {
    this.bullets[i].update();
    if(this.bullets[i].isPastMaxRange()) {
      this.bullets.splice(i,1); // Delete ith entry in bullets
    } else { // Don't check Bullet.hit() if object was just deleted.
      // Check for collisions between bullet i and all asteroids:
      for(let j=asteroids.length-1; j>=0; j--) {
        if(this.bullets[i].hit(asteroids[j])) {
          this.bullets.splice(i,1); // Delete bullet
          let childAsteroids = asteroids[j].breakUp();
          asteroids.splice(j,1); // Delete asteroid
          asteroids = asteroids.concat(childAsteroids);
          break; // Don't check same bullet again after deletion.
        }
      }//for j
    }//else
  }//for i
}//updateBullets()
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
Ship.prototype.hit = function(asteroid) {
  // Return true if given asteroid has hit ship.

  // Generate absolute position poly arrays.
  let shipPoly = this.perimeter.vectorClone(); // must be copied
  for(let vertexPoint of shipPoly) {
    vertexPoint.add(this.pos); // Add (x,y) displacement.
  }
  
  let asteroidPoly = asteroid.perimeter.vectorClone();
  for(let vertexPoint of asteroidPoly) {
    vertexPoint.add(asteroid.pos); // Add (x,y) displacement.
  }

  let hit = collidePolyPoly(asteroidPoly, shipPoly, false);
  return hit;
}
Ship.prototype.collisionDetection = function() {


  for(let i=0; i<asteroids.length; i++) {
    if (this.hit(asteroids[i])) {
      console.log("You Died!");
      push();
      noFill();
      stroke(200,50,50);
      strokeWeight(12);
      ellipse(this.pos.x,this.pos.y,this.r*4,this.r*4);
      pop();
    }
  }
}


Array.prototype.vectorClone = function() {
  // return a deep clone. Used for Array of Vectors.
  let cloneArray = [];
  for(let vector of this) {
    cloneArray.push(vector.copy()); // Make deep p5.Vector copy.
  }
  return cloneArray;
}

