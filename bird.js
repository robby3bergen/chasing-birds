'use strict';

/* ============ Bird Constructor ============ */

function Bird(canvas) {
  // canvas
  this.canvas = canvas;
  this.canvasContext = this.canvas.getContext('2d');

  // areas (to use for destination coordinates)
  this.sky = new Sky(this.canvas);
  this.ground = new Ground(this.canvas);
  this.feedingZone = new FeedingZone(this.canvas);

  // the bird
  this.backgroundColor = 'black';
  this.size = 40;
  //this.position = {x: Math.floor(Math.random() * this.sky.width - this.size - 20) + 10 , y: -15};
  this.position = {x: 275, y: 100};
  this.destination = {x: 50, y: 0}; // random destination within the destination area
  this.distance = {x: 0, y: 0};
  this.step = {x: 1, y: 1}          // x + 1 to move right, x -1 to move left, y + 1 to move down, y - 1 to move up
  this.speed = 1;
  this.state = 'happy';            // status of the bird can be: happy, hungry, feeding or dead
  this.health = 10;
  this.healthTimerId;
  this.direction = 'up';

  // sprites
  this.sprite = new Image(this.size, this.size);
  this.spriteCount = 0;
  this.spriteFrameRate = 4;

  // start moving
  this.moveRandomly();
  this.getsHungry();
}


/* ============ Bird Actions ============ */

Bird.prototype.fly = function() {
  // make the bird move randomly in the flying area
  this.setDestination(this.sky.x + 300, this.sky.y + 75, this.sky.width - 300, this.sky.height - 75);
}

Bird.prototype.land = function() {
  // move the bird to a random position in the feeding area
  this.setDestination(this.feedingZone.x, this.feedingZone.y, this.feedingZone.width, this.feedingZone.height);
}

Bird.prototype.die = function() {
  // set state to 'dead'
  this.backgroundColor = 'gray';
  this.direction = 'down';

  // move the bird to the ground
  this.destination.x = this.position.x
  this.destination.y = Math.floor(Math.random() * this.ground.height) + this.ground.y - this.size;
}


/* ============ Moving the bird ============ */

Bird.prototype.setDestination = function(areaX, areaY, areaWidth, areaHeight) {
  // set destination according to bounderies
  this.destination.x = Math.floor(Math.random() * (areaWidth - this.size)) + areaX; // create value for x between x and width
  this.destination.y = Math.floor(Math.random() * (areaHeight - this.size)) + areaY; // create value for y between y and height
}


Bird.prototype.updatePosition = function() {
  // calculate relative step
  this.distance.x = this.destination.x - this.position.x;
  this.distance.y = this.destination.y - this.position.y;
  //this.distance = Math.sqrt((this.destination.x - this.position.x)**2 + (this.destination.y - this.position.y) )
  this.step.x = this.distance.x / Math.max(Math.abs(this.distance.x), Math.abs(this.distance.y), 1);
  this.step.y = this.distance.y / Math.max(Math.abs(this.distance.x), Math.abs(this.distance.y), 1);
  
  // update position
  if (this.position.x !==  this.destination.x || this.position.y !== this.destination.y ) {
    this.position.x += this.step.x * this.speed;
    this.position.y += this.step.y * this.speed;
    this.size += this.step.y * 0.06;
  }
}

Bird.prototype.updateState = function() {
  // change state to 'feeding' if the bird enters the feedingzone
  if (this.position.x >= this.feedingZone.x &&
  this.position.x + this.size <= this.feedingZone.x + this.feedingZone.width &&
  this.position.y >= this.feedingZone.y &&
  this.position.y + this.size <= this.feedingZone.y + this.feedingZone.height) {
    if (this.state != 'dead') { // we don't want any dead to be flying around
      this.state = 'feeding';
      this.sprite.src = 'images/bird_moving_left_yellow.png';
      this.getsHungry();
    }
  }
  // clear the timer interval if the bird is feeding
  if (this.state === 'feeding') {
    window.clearInterval(this.healthTimerId);
  }
}


Bird.prototype.moveRandomly = function() {
  // move randomly
  if (this.direction === 'up') {
    this.fly();
  } else {
    this.land();
  }

  // change direction every second
  if (this.intervalId) {
    clearInterval(this.intervalId)
  }
  this.intervalId = window.setInterval(function() {
    if (this.state === 'dead') {
      this.die();
      clearInterval(this.intervalId);
    }

    if (this.direction === 'up') {
      this.fly();
    } else {
      this.land();
    }
  }.bind(this), 1000);
}

Bird.prototype.getsHungry = function() {
  // randomly emerge to hungry state
  var delay = Math.floor(Math.random() * 10000);
  var timerId = window.setTimeout(function() {
    this.state = 'hungry';
    this.sprite.src = 'images/bird_moving_left_red.png';
    this.setHealth();
    window.clearTimeout(timerId);
  }.bind(this), delay);
}


Bird.prototype.draw = function(canvas) {
  // draw the bird on the canvas
  var sourceLeft, sourceRight;
  if (this.state === 'hungry') {
    sourceLeft = 'images/bird_moving_left_red.png';
    sourceRight = 'images/bird_moving_right_red.png';
  } else {
    sourceLeft = 'images/bird_moving_left_yellow.png';
    sourceRight = 'images/bird_moving_right_yellow.png';
  }

  if (this.destination.x < this.position.x) {
    this.sprite.src = sourceLeft;
    this.spriteFrameRate++;
  } else if (this.destination.x > this.position.x) {
    this.sprite.src = sourceRight;
    this.spriteFrameRate++;
  } else {
    this.sprite.src = sourceLeft;
  }

  // replace imgage on every 4th draw
  if (this.state !== 'dead') {
    if (this.spriteFrameRate % 4 === 0) {
      this.spriteCount++;
    }
  }
  
  // dertime which frame to use
  var currentFrameColumn = this.spriteCount % 5;
  var currentFrameRow = Math.floor(this.spriteCount / 5) % 3;             // there are 10 sprites in dog.png
  var frameWidth = 918 / 5;
  var frameHeight = 506 / 3;

  this.canvasContext.drawImage(this.sprite, currentFrameColumn * frameWidth, currentFrameRow * frameHeight, frameWidth, frameHeight, this.position.x, this.position.y, this.size, this.size);
}


/* ============ Events ============ */

Bird.prototype.isColliding = function(object) {
  //windows.clearInterval(this.healthTimerId);
  if (this.state === 'feeding') {
    if (this.position.x + this.size > object.position.x &&
      this.position.x < object.position.x + object.size &&
      this.position.y + this.size > object.position.y &&
      this.position.y < object.position.y + object.size) {
      console.log('bird and dog collide!');
      this.state = 'dead';
      return true;
    }
    return false;
  }
  return false;
}


Bird.prototype.onClick = function() {
  if (this.direction === 'up') {
    this.direction = 'down';
  } else {
    this.direction = 'up';
  }

  this.moveRandomly();
}


/* ============ Helper Functions ============ */

Bird.prototype.setHealth = function() {
  window.clearInterval(this.healthTimerId);
  this.health = 10;
  this.healthTimerId = window.setInterval(function(){
    this.health--;
    console.log('health: ' + this.health);
    if (this.health === 0) {
      this.state = 'dead';
      console.log('the bird is dead');
      this.backgroundColor = 'gray';
      window.clearInterval(this.healthTimerId);
    }
    if (this.state === 'feeding') {
      window.clearInterval(this.healthTimerId);
    }
  }.bind(this), 1000);
  console.log('health: ' + this.health);
}
