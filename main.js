'use strict';

function main() {
  console.log('test if eventListener is working');
  buildSplashScreen();

  function buildSplashScreen() {
    // build page
    var html = `
      <div class="transparency">
        <div class="container background">
          <nav>
            <h1>Shove a Dove</h1>
          </nav>
          <section class="transparent-box">
            <article>
              The birds will have to eat every now and then. When a bird is hungry, it turns red and will die if it doesn't eath within 10 seconds. 
              There is food on the ground. But, there is also a dog, and the dogs likes to chase birds. TRY to save the bird's life!!
            </article>
            <h3>INSTRUCTIONS</h3>
            <article>
              <ul>
                <li>Try to keep the birds alive!</li>
                <li>The bird turns red when it becomes hungry. Click it to 'shove' it to the ground to find food.</li>
                <li>The bird will turn yellow when it's fed. Click it again to save it from the dog.</li>
              </ul>
            </article>
            <button id="btn-start">START</button>
          </section>
        </div>
      </div>
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
    <div class="transparency">
      <div class="container">
        <h2 class="timer">03:00</h2>
        <section class="game">
          <canvas width="730px" height="365px"></canvas>
        </section>
      </div>
    </div>
    `;
    buildDOM(html);

    // add eventListener
    // var button = document.querySelector('button');
    // button.addEventListener('click', destroyGameScreen);

    // start the game
    var canvas = document.querySelector('canvas');
    var game = new Game(canvas);
    game.start(destroyGameScreen);
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
    <div class="transparency">
        <div class="container background">
          <h1>Shove a Dove</h1>
          <section class="transparent-box game-over">
            <article>
              The birds are dead. Try harder!!
            </article>
            <h3>GAME OVER</h3>
            <button id="btn-start">PLAY AGAIN</button>
          </section>
        </div>
      </div>
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