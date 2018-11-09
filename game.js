'use strict';

/* ============ Game Constructor ============ */

function Game(canvas) {
  this.canvas = canvas;
  this.canvasContext = canvas.getContext('2d');
  this.animation = null; // use this number to cancel the animation refresh
  this.gameOver = false;

  this.clicks = 0;
  this.missedClicks = 0;
  this.birdsAlive = 0;

  // areas
  this.sky = new Sky(this.canvas);
  this.ground = new Ground(this.canvas);
  this.feedingZone = new FeedingZone(this.canvas);

  // characters
  this.bird = new Bird(this.canvas);
  this.dog = new Dog(this.canvas);
}


/* ============ Game Rendering ============ */

Game.prototype.start = function(callback) {
  // start screen rendering loop
  var main = function() {
    this.animation = window.requestAnimationFrame(main);
    this.update();
    this.draw();
    this.checkCollissions();
    this.checkGameOverConditions(callback);
  }.bind(this)

  main();

  // add event listener to check for clicks
  var onClick = this.onClick.bind(this);
  this.canvas.addEventListener('mousedown', onClick);

  // display remaining play time
  var timeLeft = document.querySelector('h2');

}


Game.prototype.update = function() {
  // update the position of the birds and the dog
  this.bird.updatePosition();
  this.bird.updateState();
  this.dog.updatePosition();
}


Game.prototype.draw = function() {
  // clear the canvas
  this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
  // draw areas
  this.sky.draw();
  this.ground.draw();
  this.feedingZone.draw();

  // draw characters
  this.bird.draw();
  this.dog.draw();
}


Game.prototype.checkGameOverConditions = function(callback) {
  // use this callback function to end the game when the birds are dead or the player stops the game
  if (this.checkAllBirdsDead(this.bird)) {
    // cancel animations screen refreshing
    window.cancelAnimationFrame(this.animation);

    // remove eventListener
    this.canvas.removeEventListener('click', this.onClick);
    
    // call the main.destroyGameScreen method
    callback();
  }  
}


Game.prototype.checkAllBirdsDead = function(bird) {
  if (bird.state === 'dead') {
    return true;
  } else {
    return false;
  }
}


/* ============ Events ============ */

Game.prototype.checkCollissions = function() {
  // check if the dog has caught a bird
  if (this.bird.isColliding(this.dog)) {
    // continue playing
    this.dog.play();
  }
}


Game.prototype.onClick = function(event) {
  // get mouse position
  var mousePosition = this.getMousePosition(event);
  console.log('x = ' + mousePosition.x + 'y = ' + mousePosition.y);

  // compare mouse position with bird position to check if the bird was clicked
  var birdClicked = 
  mousePosition.x >= this.bird.position.x &&
  mousePosition.x <= this.bird.position.x + this.bird.size &&
  mousePosition.y >= this.bird.position.y &&
  mousePosition.y <= this.bird.position.y + this.bird.size;

  // keep scores
  if (birdClicked) {
    console.log('you clicked a ' + this.bird.state + ' bird!');
    this.clicks++;
    this.bird.onClick();
    //this.dog.chaseBirds(this.bird);
  } else {
    this.missedClicks++;
  }
}


/* ============ Helper Functions ============ */

Game.prototype.getMousePosition = function(event) {
  var rect = this.canvas.getBoundingClientRect();
  var scaleX = this.canvas.width / rect.width;
  var scaleY = this.canvas.height / rect.height;
  var mouseX = (event.x - rect.left) * scaleX;
  var mouseY = (event.y - rect.top) * scaleY;

  return {x: mouseX, y: mouseY};
}