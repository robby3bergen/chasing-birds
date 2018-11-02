'use strict';

function Dog(canvas) {
  this.canvasContext = canvas.getContext('2d');
  this.backgroundColor = 'brown';
  this.size = 20;
  this.position = {x: 240, y: 120};
  this.direction = {x: 1, y: 1};      // x + 1 to move right, x -1 to move left, y + 1 to move down, y - 1 to move up
  this.speed = 1;
}

Dog.prototype.play = function() {
  // make the dog move randomly on the ground (area)

}

Dog.prototype.chaseBirds = function() {
  // make the dog chase the birds in the feeding area

}

Dog.prototype.onCollission = function() {
  // repeat playing

}

Dog.prototype.updatePosition = function() {
  // update the position of the dog

}

Dog.prototype.draw = function() {
  // draw the dog on the canvas
  this.canvasContext.fillStyle = this.backgroundColor;
  this.canvasContext.fillRect(this.position.x, this.position.y, this.size, this.size);
}