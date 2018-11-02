'use strict';

function Bird(canvas) {
  this.canvasContext = canvas.getContext('2d');
  this.backgroundColor = 'black';
  this.size = 10;
  this.position = {x: 30, y: 30};
  this.direction = {x: 1, y: 1};     // x + 1 to move right, x -1 to move left, y + 1 to move down, y - 1 to move up
  this.speed = 1;
  this.state = 'flying';             // status of the bird can be: flying, hungry, feeding or dead
}

Bird.prototype.fly = function(area) {
  // make the bird move randomly in the flying area

  // set state to 'flying'

}

Bird.prototype.feed = function(area) {
  // move the bird to a random position in the feeding area

  // set status to 'feeding'

}

Bird.prototype.updatePosition = function() {
  // change the position of the bird

}

Bird.prototype.draw = function(canvas) {
  // draw the bird on the canvas
  this.canvasContext.fillStyle = this.backgroundColor;
  this.canvasContext.fillRect(this.position.x, this.position.y, this.size, this.size);
}

Bird.prototype.onCollision = function() {
  // set status to 'dead'
}

Bird.prototype.onClick = function() {
  // check if bird was clicked

  // if bird was clicked, move it to another area

  // set state

}