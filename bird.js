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
  this.size = 0.8;
  this.position = {x: Math.floor(Math.random() * this.sky.width - this.size - 20) + 10 , y: -15};
  this.destination = {x: 50, y: 0}; // random destination within the destination area
  this.distance = {x: 0, y: 0};
  this.step = {x: 1, y: 1}          // x + 1 to move right, x -1 to move left, y + 1 to move down, y - 1 to move up
  this.speed = 0.4;
  this.state = 'happy';            // status of the bird can be: happy, hungry, feeding or dead
  this.health = 10;
  this.healthTimerId;

  // start moving
  this.fly();
  this.moveRandomly();
  this.getsHungry();
}


/* ============ Bird Actions ============ */

Bird.prototype.fly = function() {
  // set state to 'flying'
  this.state = 'happy';
  // make the bird move randomly in the flying area
  this.setDestination(this.sky.x + 20, this.sky.y + 10, this.sky.width - 20, this.sky.height - 10);
}

Bird.prototype.land = function() {
  // set state to 'landing'
  this.state = 'landing';

  // move the bird to a random position in the feeding area
  this.setDestination(this.feedingZone.x, this.feedingZone.y, this.feedingZone.width, this.feedingZone.height);
}

Bird.prototype.die = function() {
  // set state to 'dead'
  this.backgroundColor = 'gray';

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
    this.size += this.step.y * 0.05;
  }
}

Bird.prototype.updateState = function() {
  if (this.position.x >= this.feedingZone.x &&
  this.position.x + this.size <= this.feedingZone.x + this.feedingZone.width &&
  this.position.y >= this.feedingZone.y &&
  this.position.y + this.size <= this.feedingZone.y + this.feedingZone.height) {
    if (this.state === 'landing') { // we don't want any dead to be flying around
      this.state = 'feeding';
      this.backgroundColor = 'black';
    }
  }
  if (this.state === 'feeding') {
    window.clearInterval(this.healthTimerId);
  }
}


Bird.prototype.moveRandomly = function() {
  if (this.intervalId) {
    clearInterval(this.intervalId)
  }
  this.intervalId = window.setInterval(function() {
    switch (this.state) {
      case 'happy':
      case 'hungry':
        this.fly();
        break;
      case 'landing':
      case 'feeding':
        this.land();
        break;
      case 'dead':
        this.die();
        clearInterval(this.intervalId);
    }
  }.bind(this), 1000);
}

Bird.prototype.getsHungry = function() {
  // randomly emerge to hungry state
  var delay = Math.floor(Math.random() * 10000);
  var timerId = window.setTimeout(function() {
    this.state = 'hungry';
    this.backgroundColor = 'red';
    this.setHealth();
    window.clearTimeout(timerId);
  }.bind(this), delay);
}


Bird.prototype.draw = function(canvas) {
  // draw the bird on the canvas
  this.canvasContext.fillStyle = this.backgroundColor;
  this.canvasContext.fillRect(this.position.x, this.position.y, this.size, this.size);
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
  // change destination
  switch(this.state) {
    case 'happy':
    case 'hungry':
      // send the bird to the feeding area
      this.land();
      this.moveRandomly();
      break;
    case 'landing':
    case 'feeding':
      // send the bird to the sky
      this.fly();
      this.moveRandomly();
      this.getsHungry();
      break;
    case 'dead':
      // lie dead and do nothing
      break;
    default:
      // usually the bird flies in the sky
      this.fly();
      this.moveRandomly();
  }
}


/* ============ Helper Functions ============ */

Bird.prototype.setHealth = function() {
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
