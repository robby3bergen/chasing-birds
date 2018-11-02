# Chasing Birds

## Description
The birds will have to eat every now and then. When a bird is hungry, it turns red and will die if it doesn't eath within 10 seconds. The player must click on the bird to send it to the feeding area. But, there is a dog on the ground! As soon as the bird lands on the ground, the dog will chase it. The player must click the bird(s) in the feeding to send them back in the sky. If the dog catches the bird, the bird will die.

GAME Conditions:
- The game is over when all birds are dead.
- There can be more than one hungry bird!
- There can be more than one bird feeding!
- The player must wait for the bird to finish eating!
- If the player clicks a black bird it will land on the ground randomly, which could be very close to the dog!


## MVP (DOM - CANVAS)
MVP definition, deliverables.

CANVAS

## Backlog
- Add bird and dog sprites
- Add bird and dog sounds
- The more birds will die, the easier the game will be to play. So, there needs to be an extra challenge:
  - increment the flying speed of the birds and the running speed of the dog after a period of time
  - add more dogs
- Add score (birds alive)
- transition the birds size to make it look smaller in the air and bigger in the feeding area

## Data structure
Classes and methods definition.

### game.js
-- properties
canvasContext;
timeRemaining;
birdsArray;
rectAir {x: y: width: height:};
rectGround {x: y: width: height:};
rectFeeding {x: y: width: height:};

-- methods
start() {
  buildDOM()
  getCanvasContext()
  startLoop()
}
startLoop()
draw()
update()
clear()
gameOver(callback)
checkCollission()
checkBirdsStatus() {
  Dog.chaseBirds()
}
window.addEventListener('click') {
  // check if bird was clicked > call Bird.onClick()
  
  // change bird's status to flying or feeding
}


### bird.js

-- properties
canvasContext;
position.x;
position.y;
direction.x;
direction.y;
speed;
status; (flying, hungry, feeding, dead)

-- methods
fly() > change canvasContext (sky area or feeding area or ground area) + change status
feed() > change canvasContext + change status
update()
draw()
onClick() > call 'fly()' or 'feed()'
onCollision() > change status to 'dead'

### dog.js

-- properties
canvasContext;
position.x;
position.y;
direction.x;
direction.y;
speed;

-- methods
walk()
chaseBirds()
onCollission() > call Walk
update()
draw()

### area.js (sky, ground and feeding zone) 

-- properties
canvasContext;
background-image;
x;
y;
width;
height;

-- methods
draw();


## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
  - buildSplashScreen()
  - destroySplashScreen()
- gameScreen
  - buildGameScreen()
  - destroyGameScreen()
- gameoverScreen
  - buildGameOverScreen()
  - destroyGameOverScreen()


## Task
Task definition in order of priority

- create files and link them
  - index.html
  - styles.css
  - main.js
  - game.js
  - bird.js
  - dog.js
  - area.js
- create Constructors (main, game, bird, dog, area) with empty properties and functions
- create html for splash, game and gameOver
- create screen transitions (build > game > gameover)
- draw the areas
- draw one bird + dog
- move the bird from the air to the feeding zone
- move the bird randomly in the flying area (fly)
- catch the click event and change the bird's status
- move the dog to the feeding zone
- move the dog randomly in the ground area (walk)
- check for collisions
- check gameover condition (to end the game)
- set timer to show the remaining game time


## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
