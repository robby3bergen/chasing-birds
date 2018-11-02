'use strict';

function Dog(canvas) {
  this.canvasContext = canvas.getContext('2d');
  this.position.x = null;
  this.position.y = null;
  this.direction.x = null;
  this.direction.y = null;
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

}