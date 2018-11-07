'use strict';

/* ============ Dog Constructor ============ */

function Dog(canvas) {
  // canvas
  this.canvas = canvas;
  this.canvasContext = canvas.getContext('2d');

  // areas (to use for destination coordinates)
  this.ground = new Ground(this.canvas);
  this.feedingZone = new FeedingZone(this.canvas);

  // the dog
  this.backgroundColor = 'brown';
  this.size = 20;
  this.position = {x: 240, y: 120};
  this.destination = {x: 245, y: 115}
  this.distance = {x: 0, y: 0};
  this.step = {x: 1, y: 1}          // x + 1 to move right, x -1 to move left, y + 1 to move down, y - 1 to move up
  this.speed = 0.5;
  this.state = 'playing';

  this.intervalId;

  // start moving
  this.moveRandomly();
}


/* ============ Dog Actions ============ */

Dog.prototype.play = function() {
  // make the dog move randomly on the ground (area)
  
  // set state to 'flying'
  this.state = 'playing';

  // make the dog move randomly in the ground area
  this.setDestination(this.ground.x + 20, this.ground.y + 10, this.ground.width - 20, this.ground.height - 10);
}

Dog.prototype.chaseBirds = function(bird) {
  // make the dog chase the birds in the feeding area
  
  // set status to 'feeding'
  this.state = 'chasing';

  // move the bird to a random position in the feeding area
  this.setDestination(112, 105, 75, 35);
  //this.setDestination(bird.destination.x, bird.destination.y, bird.size, bird.size);
}


/* ============ Moving the dog ============ */

Dog.prototype.setDestination = function(areaX, areaY, areaWidth, areaHeight) {
  // set destination according to bounderies
  this.destination.x = Math.floor(Math.random() * (areaWidth - this.size)) + areaX; // create value for x between x and width
  this.destination.y = Math.floor(Math.random() * (areaHeight - this.size)) + areaY; // create value for y between y and height

}


Dog.prototype.updatePosition = function() {
    // calculate relative step
  //debugger;
    this.distance.x = this.destination.x - this.position.x;
    this.distance.y = this.destination.y - this.position.y;
    this.step.x = this.distance.x / Math.max(Math.abs(this.distance.x), Math.abs(this.distance.y), 1);
    this.step.y = this.distance.y / Math.max(Math.abs(this.distance.x), Math.abs(this.distance.y), 1);
    
    //this.size += this.step.x * this.step.y;
  
    // update position
    if (this.position.x !==  this.destination.x || this.position.y !== this.destination.y ) {
      this.position.x += this.step.x * this.speed;
      this.position.y += this.step.y * this.speed;
    }
}

Dog.prototype.moveRandomly = function() {
  this.intervalId = window.setInterval(function() {
    if (this.state === 'playing') {
      this.setDestination(0, 100, 300, 50);
    } else if (this.state === 'chasing') {
      this.setDestination(112, 105, 75, 35);
    }
  }.bind(this), 3000);
}


Dog.prototype.draw = function() {
  // draw the dog on the canvas
  this.canvasContext.fillStyle = this.backgroundColor;
  this.canvasContext.fillRect(this.position.x, this.position.y, this.size, this.size);
}


/* ============ Events ============ */

Dog.prototype.onCollission = function() {
  // repeat playing

}