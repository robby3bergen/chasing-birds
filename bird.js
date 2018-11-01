'use strict';

function Bird(canvas) {
  this.canvasContext = canvas.getContext('2d');
  this.position.x = null;
  this.position.y = null;
  this.direction.x = null;
  this.direction.y = null;
  this.speed = 1;
  this.status = 'flying';   // status of the bird can be: flying, hungry, feeding or dead
}

Bird.prototype.fly = function(area) {
  // make the bird move randomly in the flying area

  // set status to 'flying'

}

Bird.prototype.feed = function(area) {
  // move the bird to a random position in the feeding area

  // set status to 'feeding'

}

Bird.prototype.updatePosition = function() {
  // change the position of the bird

}

Bird.prototype.draw = function() {
  // draw the bird on the canvas

}

Bird.prototype.onCollision = function() {
  // set status to 'dead'
}

Bird.prototype.onClick = function() {
  // check if bird was clicked

  // if bird was clicked, move it to another area

  // set status

}