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
  this.heigth = 100;
}

Sky.prototype.draw = function() {
  this.canvasContext.fillStyle = this.backgroundColor;
  this.canvasContext.fillRect(this.x, this.y, this.width, this.heigth);
}

// ========================================================================

function Ground(canvas) {
  this.canvas = canvas;
  this.canvasContext = canvas.getContext('2d');
  this.backgroundColor = '#419935';
  this.backgroundImageUrl = '';
  this.x = 0;
  this.y = 100;
  this.width = this.canvas.width;
  this.heigth = this.canvas.height - this.y;
}

Ground.prototype.draw = function() {
  this.canvasContext.fillStyle = this.backgroundColor;
  this.canvasContext.fillRect(this.x, this.y, this.width, this.heigth);
}

// ========================================================================

function FeedingZone(canvas) {
  this.canvas = canvas;
  this.canvasContext = canvas.getContext('2d');
  this.backgroundColor = '#C6CAED';
  this.backgroundImageUrl = '';
  this.x = this.canvas.width / 2 - (this.canvas.width / 8);
  this.y = 105;
  this.width = this.canvas.width / 4;
  this.heigth = 35;
}

FeedingZone.prototype.draw = function() {
  this.canvasContext.fillStyle = this.backgroundColor;
  this.canvasContext.fillRect(this.x, this.y, this.width, this.heigth);
}

// ========================================================================