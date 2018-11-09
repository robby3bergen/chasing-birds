'use strict';

/* ============ Dog Constructor ============ */

function Dog(canvas) {
  // canvas
  this.canvas = canvas;
  this.canvasContext = canvas.getContext('2d');

  // areas (to use for destination coordinates)
  this.ground = new Ground(this.canvas);
  this.feedingZone = new FeedingZone(this.canvas);

  // the dog
  this.backgroundColor = 'brown';
  this.spriteCount = 0;
  this.spriteFrameRate = 6;
  this.size = 50;
  this.position = {x: this.ground.x, y: this.ground.y};
  this.destination = {x: 245, y: 215}
  this.distance = {x: 0, y: 0};
  this.step = {x: 1, y: 1}          // x + 1 to move right, x -1 to move left, y + 1 to move down, y - 1 to move up
  this.speed = 0.5;
  this.state = 'playing';

  this.intervalId;
  this.barkIntervalId;

  // start moving
  this.moveRandomly();
  //this.barking();
}


/* ============ Dog Actions ============ */

Dog.prototype.play = function() {
  // make the dog move randomly on the ground (area)
  
  // set state to 'flying'
  this.state = 'playing';
  this.speed = 0.5;

  // make the dog move randomly in the ground area
  this.setDestination(this.ground.x + 20, this.ground.y + 10, this.ground.width - 20, this.ground.height - 10);
}

Dog.prototype.checkForBirds = function(bird) {
  console.log(bird.state)
  if (bird.state === 'feeding' && this.state !== 'chasing') {
    this.speed = 2;
    this.chaseBirds(bird);
  } else if (bird.state !== 'feeding' && bird.state !== 'dead' && this.state === 'chasing') {
    console.log('hey')
    this.moveRandomly();
  }
}

Dog.prototype.chaseBirds = function(bird) {
  // make the dog chase the birds in the feeding area
  window.clearInterval(this.intervalId);

  var barkSound = new Audio('sounds/dog_barking.wav');
  barkSound.play();
  //barkSound.play(); 
  
  // set status to 'feeding'
  this.state = 'chasing';

  // move the bird to a random position in the feeding area
  //this.setDestination(bird.destination.x, bird.destination.y, bird.destination.x + bird.size, bird.destination.y + bird.size);
  this.setDestination(bird.destination.x, bird.destination.y, bird.size, bird.size);
}

// Dog.prototype.barking = function() {
//   window.clearInterval(this.barkIntervalId);

//   var bark = new Audio('sounds/dog_barking.wav');
//   var dl = Math.floor(Math.random() * 3000);
//   this.barkIntervalId = window.setInterval(function() {
//     //if (dog.state === 'chasing') {
//       bark.play();
//     //}
//   }, dl);
// }


/* ============ Moving the dog ============ */

Dog.prototype.setDestination = function(areaX, areaY, areaWidth, areaHeight) {
  // set destination according to bounderies
  this.destination.x = Math.floor(Math.random() * (areaWidth - this.size)) + areaX; // create value for x between x and width
  this.destination.y = Math.floor(Math.random() * (areaHeight - this.size)) + areaY; // create value for y between y and height
}


Dog.prototype.updatePosition = function() {
    // calculate relative step
  //debugger;
    this.distance.x = this.destination.x - this.position.x;
    this.distance.y = this.destination.y - this.position.y;
    this.step.x = this.distance.x / Math.max(Math.abs(this.distance.x), Math.abs(this.distance.y), 1);
    this.step.y = this.distance.y / Math.max(Math.abs(this.distance.x), Math.abs(this.distance.y), 1);
    
    //this.size += this.step.x * this.step.y;
  
    // update position
    if (this.position.x !==  this.destination.x || this.position.y !== this.destination.y ) {
      this.position.x += this.step.x * this.speed;
      this.position.y += this.step.y * this.speed;
    }

}

Dog.prototype.moveRandomly = function() {
  this.play();
  this.intervalId = window.setInterval(function() {
    if (this.state === 'playing') {
      this.setDestination(this.ground.x, this.ground.y, this.ground.width, this.ground.height);
    }
  }.bind(this), 1500);
}


Dog.prototype.draw = function() {
  // draw the dog on the canvas
  var sprite = new Image(20, 20); // image size = 52 x 340
  if (this.destination.x < this.position.x) {
    sprite.src = 'images/dog_walking_left.png';
    this.spriteFrameRate++;
  } else if (this.destination.x > this.position.x) {
    sprite.src = 'images/dog_walking_right.png';
    this.spriteFrameRate++;
  } else {
    sprite.src = 'images/dog_walking_left.png';
  }

  // replace imgage on every 4th draw
  if (this.spriteFrameRate % 6 === 0) {
    this.spriteCount++;
  }
  
  // dertime which frame to use
  var currentFrame = this.spriteCount % 10;             // there are 10 sprites in dog.png
  var frameWidth = 52;
  var frameHeight = 340 / 10;
  this.canvasContext.drawImage(sprite, 0, currentFrame * frameHeight, frameWidth, frameHeight, this.position.x, this.position.y, this.size, this.size)
}


/* ============ Events ============ */

Dog.prototype.onCollission = function() {
  // repeat playing
  this.moveRandomly();

}