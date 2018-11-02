'use strict';

function Game(canvas) {
  this.canvasContext = canvas.getContext('2d');
  //this.timeRemaining;
}

Game.prototype.start = function() {
  // start the game

  // add eventListener
  document.addEventListener('click', onClick);

}

Game.prototype.onGameOver = function(callback) {
  // use this callback function to end the game when the birds are dead or the player stops the game

  // remove eventListener
  document.removeEventListener('click', onClick);
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

function draw() {
  // draw on the canvas
}

function checkCollission() {
  // check if the dog has caught a bird

}

function onClick(event) {
  // check if one of the birds is clicked and move it accordingly to its flying, hungry, feeding or dead state
}

