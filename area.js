'use strict';

function Area(x, y, width, heigth) {
  this.backgroundImageUrl = '';
  this.x = x;
  this.y = y;
  this.width = width;
  this.heigth = heigth;
}

Area.prototype.setBackgroundImage = function(url) {
  this.backgroundImageUrl = url;
}
