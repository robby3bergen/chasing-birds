'use strict';

function Area(canvas, x, y, width, height, backgroundColor) {
  this.canvas = canvas;
  this.canvasContext = canvas.getContext('2d');
  this.backgroundColor = backgroundColor;
  this.backgroundImageUrl = '';
  this.x = x;
  this.y = y;
  this.width = width;
  this.heigth = height;
}

Area.prototype.setBackgroundImage = function(url) {
  this.backgroundImageUrl = url;
}

Area.prototype.draw = function() {
  this.canvasContext.fillStyle = this.backgroundColor;
  this.canvasContext.fillRect(this.x, this.y, this.width, this.heigth);
}