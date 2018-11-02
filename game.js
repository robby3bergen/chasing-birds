'use strict';

function Game(canvas) {
  this.canvas = canvas;
  this.canvasContext = canvas.getContext('2d');
  //this.timeRemaining;
}

Game.prototype.start = function() {
  // start the game
  this.draw();

  // add eventListener
  this.canvas.addEventListener('click', onClick);

}

Game.prototype.onGameOver = function(callback) {
  // use this callback function to end the game when the birds are dead or the player stops the game

  // remove eventListener
  this.canvas.removeEventListener('click', onClick);
}

function getCanvasContext() {
  // use the context to draw the game
}

function renderGame() {
  // create a loop to clear, update the position of objects and refresh the screen

}

function clear() {
  // clear the canvas
}

function update() {
  // update the position of the elements
}

Game.prototype.draw = function() {
  // draw on the canvas
  var canvasHeigth = this.canvas.height;
  var canvasWidth = this.canvas.width;

  // ---- AREAS ----
  var sky = new Area(this.canvas, 0, 0, canvasWidth, 100, '#91D3FF');
  sky.draw();

  var ground = new Area(this.canvas, 0, sky.heigth, canvasWidth, canvasHeigth - sky.heigth, '#419935');
  ground.draw();

  var feedingZone = new Area(this.canvas, canvasWidth / 2 - (canvasWidth / 4 / 2), sky.heigth + 5, canvasWidth / 4, 35, '#C6CAED');
  feedingZone.draw();

  // ---- BIRDS & DOG

  var bird = new Bird(this.canvas);
  bird.draw();
//debugger;
  var dog = new Dog(this.canvas);
  dog.draw();
}

function checkCollission() {
  // check if the dog has caught a bird

}

function onClick(event) {
  // check if one of the birds is clicked and move it accordingly to its flying, hungry, feeding or dead state
  console.log('you clicked the canvas');
}

