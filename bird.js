'use strict';

function Bird(canvas) {
  this.canvasContext = canvas.getContext('2d');
  this.backgroundColor = 'black';
  this.size = 10.00;
  this.position = {x: 50, y: 0};
  this.destination = {x: 55, y: 15}
  this.distance = {x: 0, y: 0};
  this.step = {x: 1, y: 1}          // x + 1 to move right, x -1 to move left, y + 1 to move down, y - 1 to move up
  this.speed = 0.5;
  this.state = 'flying';            // status of the bird can be: flying, hungry, feeding or dead
}

Bird.prototype.fly = function(area) {
  // make the bird move randomly in the flying area
  this.setDestination(55, 15);
  
  // set state to 'flying'
  this.state = 'flying';

}

Bird.prototype.feed = function(area) {
  // move the bird to a random position in the feeding area
  this.setDestination(135, 115);
  
  // set status to 'feeding'
  this.state = 'feeding';
}

Bird.prototype.setDestination = function(x, y) {
  // set distination
  this.destination.x = x;
  this.destination.y = y;
}

Bird.prototype.updatePosition = function() {
  // calculate relative step
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

Bird.prototype.draw = function(canvas) {
  // draw the bird on the canvas
  this.canvasContext.fillStyle = this.backgroundColor;
  this.canvasContext.fillRect(this.position.x, this.position.y, this.size, this.size);
}

Bird.prototype.onCollision = function() {
  // set status to 'dead'
}

Bird.prototype.clicked = function(mousePosition) {
  return mousePosition.x >= this.position.x &&
        mousePosition.x <= this.position.x + this.size &&
        mousePosition.y >= this.position.y &&
        mousePosition.y <= this.position.y + this.size
}