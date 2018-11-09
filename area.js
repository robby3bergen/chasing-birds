'use strict';

// refactor code using inheritence

function Sky(canvas) {
  this.canvas = canvas;
  this.canvasContext = canvas.getContext('2d');
  this.backgroundColor = '#91D3FF';
  this.backgroundImageUrl = '';
  this.x = 0;
  this.y = 0;
  this.width = this.canvas.width;
  this.height = this.canvas.height / 3 * 2;
}

Sky.prototype.draw = function() {
  this.canvasContext.fillStyle = this.backgroundColor;
  this.canvasContext.fillRect(this.x, this.y, this.width, this.height);

  // var treebranche = new Image();
  // treebranche.src = 'images/treebranche.png';

  // var frameWidth = 1957;
  // var frameHeight = 1229;


  var background = new Image();
  background.src = 'images/park.png';

  var frameWidth = 900;
  var frameHeight = 506;

  // this.canvasContext.drawImage(treebranche, 0, 0, frameWidth, frameHeight, 0, 25, frameWidth / 7, frameHeight / 7);
  this.canvasContext.drawImage(background, 0, 0, frameWidth, frameHeight, 0, 0, this.width, this.canvas.height);
}

// ========================================================================

function Ground(canvas) {
  this.canvas = canvas;
  this.canvasContext = canvas.getContext('2d');
  this.backgroundColor = '#419935';
  this.backgroundImageUrl = '';
  this.x = 0;
  this.y = (this.canvas.height / 3) * 2;
  this.width = this.canvas.width;
  this.height = this.canvas.height / 3
}

Ground.prototype.draw = function() {
  //this.canvasContext.fillStyle = this.backgroundColor;
  //this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
}

// ========================================================================

function FeedingZone(canvas) {
  this.canvas = canvas;
  this.canvasContext = canvas.getContext('2d');
  this.backgroundColor = '#C6CAED';
  this.backgroundImageUrl = '';
  this.x = this.canvas.width / 2 - (this.canvas.width / 8);
  this.y = (this.canvas.height / 3) * 2 + 5;
  this.width = this.canvas.width / 4;
  this.height = 60;
}

FeedingZone.prototype.draw = function() {
  this.canvasContext.fillStyle = this.backgroundColor;
  this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
}

// ========================================================================