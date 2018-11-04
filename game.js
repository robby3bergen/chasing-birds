'use strict';

function Game(canvas) {
  this.canvas = canvas;
  this.canvasContext = canvas.getContext('2d');
  this.animation = null; // use this number to cancel the animation refresh
  this.gameOver = false;

  this.bird = new Bird(this.canvas);
  this.dog = new Dog(this.canvas);
}

Game.prototype.start = function() {

  // start screen rendering loop
  var main = function() {
    this.animation = window.requestAnimationFrame(main);
    this.update();
    this.draw();
  }.bind(this)

  main();

  // add eventListener
  var onClick = function(event) {
    var mousePosition = this.getMousePosition(event);
    if (this.bird.clicked(mousePosition)) {
      console.log('the bird was clicked');
      if (this.bird.state === 'flying') {
        this.bird.feed();
      } else if (this.bird.state === 'feeding') {
        this.bird.fly()
      }
    }
    console.log('x = ' + mousePosition.x + 'y = ' + mousePosition.y);

  }.bind(this)

  this.canvas.addEventListener('mousedown', onClick);

}

Game.prototype.checkGameConditions = function() {
  
}

Game.prototype.onGameOver = function(callback) {
  // use this callback function to end the game when the birds are dead or the player stops the game

  // cancel animations screen refreshing
  window.cancelAnimationFrame(animation);

  // remove eventListener
  this.canvas.removeEventListener('click', onClick);
}

Game.prototype.update = function() {
  // update the position of the birds and the dog
  this.bird.updatePosition();
  
}

Game.prototype.draw = function() {
  // clear the canvas
  this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
  // draw on the canvas
  var canvasHeigth = this.canvas.height;
  var canvasWidth = this.canvas.width;

  // ---- AREAS ----
  var sky = new Sky(this.canvas);
  sky.draw();

  var ground = new Ground(this.canvas);
  ground.draw();

  var feedingZone = new FeedingZone(this.canvas);
  feedingZone.draw();

  // ---- BIRDS & DOG

  this.bird.draw();
  this.dog.draw();
}

Game.prototype.getMousePosition = function(event) {
  var rect = this.canvas.getBoundingClientRect();
  var scaleX = this.canvas.width / rect.width;
  var scaleY = this.canvas.height / rect.height;
  var mouseX = (event.x - rect.left) * scaleX;
  var mouseY = (event.y - rect.top) * scaleY;

  return {x: mouseX, y: mouseY};
}

function checkCollission() {
  // check if the dog has caught a bird

}

