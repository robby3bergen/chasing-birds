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

  this.intervalId = window.setInterval(function() {
    if (this.state === 'flying') {
      this.setDestination(0, 0, 300, 100);
    } else if (this.state === 'feeding') {
      this.setDestination(112, 105, 75, 35);
    } else if (this.state === 'dead') {
      this.setDestination(0, 100, 300, 50);
      clearInterval(this.intervalId);
    }
  }.bind(this), 1000);
}

Bird.prototype.fly = function(area) {
  // set state to 'flying'
  this.state = 'flying';

  // make the bird move randomly in the flying area
  this.setDestination(0, 0, 300, 100)
}

Bird.prototype.feed = function(area) {
  // set status to 'feeding'
  this.state = 'feeding';

  // move the bird to a random position in the feeding area
  this.setDestination(112, 105, 75, 35);
}

Bird.prototype.setDestination = function(xBoundery, yBoundery, areaWidth, areaHeight) {
  // set destination according to bounderies
  this.destination.x = Math.floor(Math.random() * (areaWidth - this.size)) + xBoundery; // create value for x between x and width
  this.destination.y = Math.floor(Math.random() * (areaHeight - this.size)) + yBoundery; // create value for y between y and height

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