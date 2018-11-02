'use strict';

function main() {
  console.log('test if eventListener is working');
  buildSplashScreen();

  function buildSplashScreen() {
    // build page
    var html = `
      <h1>Chasing Birds</h1>
      <button>START</button>
      <h2>INSTRUCTIONS:</h2>
    `;
    buildDOM(html);

    // add eventListener
    var button = document.querySelector('button');
    button.addEventListener('click', destroySplashScreen);
  }

  function destroySplashScreen() {
    // remove eventListener
    document.removeEventListener('click', destroySplashScreen);

    // clear html
    var main = document.querySelector('main');
    main.remove();

    // start game
    buildGameScreen();
  }

  function buildGameScreen() {
    var html = `
      <h1>Chasing Birds</h1>
      <h2>03:00</h2>
      <canvas></canvas>
      <button>STOP</button>
    `
    buildDOM(html);

    // add eventListener
    var button = document.querySelector('button');
    button.addEventListener('click', destroyGameScreen);

    // start the game
    var canvas = document.querySelector('canvas');
    var game = new Game(canvas);
    game.start();
  }

  function destroyGameScreen() {
    // remove eventListener
    document.removeEventListener('click', destroyGameScreen);

    // clear html
    var main = document.querySelector('main');
    main.remove();

    // game over
    buildGameOverScreen();
  }

  function buildGameOverScreen() {
    var html = `
      <h1>Chasing Birds</h1>
      <h2>03:00</h2>
      <h2>GAME OVER</h2>
      <button>PLAY AGAIN</button>
    `
    buildDOM(html);

    // add eventListener
    var button = document.querySelector('button');
    button.addEventListener('click', destroyGameOverScreen);

  }

  function destroyGameOverScreen() {
    // remove eventListener
    document.removeEventListener('click', destroyGameOverScreen);

    // clear html
    var main = document.querySelector('main');
    main.remove();

    // play again
    buildGameScreen();
  }
  
  function buildDOM(html) {
    // create the html to display the game
    var body = document.querySelector('body');
    var main = document.createElement('main');

    body.appendChild(main);
    main.innerHTML = html;
    
  }
}

window.addEventListener('load', main);