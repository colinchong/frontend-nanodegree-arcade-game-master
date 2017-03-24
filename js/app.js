// Possible enemy start rows
var startLocations = [54, 136, 218];

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //Creation of initial object properties and sets speed
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 400 + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 500) {
        this.x += this.speed * dt;
        //Moves enemy back to start position, adjusts speed, re-randomizes location
    } else {
        this.x = -100;
        this.speed = Math.random() * 400 + 100;
        this.y = startLocations[Math.floor(Math.random() * startLocations.length)];
    }
    //Collision check
    if (player.x >= this.x - 50 && player.x <= this.x + 50 && player.y >= this.y - 50 && player.y <= this.y + 50) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    //Setting start position
    this.x = 200;
    this.y = 380;
};

//Input handler
Player.prototype.handleInput = function(e) {
    this.keyPress = e;
};

//Player movement
Player.prototype.update = function() {

    //Increment player movement on key press
    var horiztonalMove = 100;
    var verticalMove = 81;
    switch (this.keyPress) {
        case 'left':
            if (this.x > 0) {
                this.x -= horiztonalMove;
            } else {
                this.keyPress = 0;
            }
            break;
        case 'right':
            if (this.x < 380) {
                this.x += horiztonalMove;
            } else {
                this.keyPress = 0;
            }
            break;
        case 'up':
            this.y -= verticalMove;
            break;
        case 'down':
            if (this.y < 380) {
                this.y += verticalMove;
            } else {
                this.keyPress = 0;
            }
            break;
    }
    this.keyPress = 0;

    //Win Condition
    if (this.y <= 50) {
        this.reset();
    }
};


//Draw sprite
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Reset function for player on collision or win
Player.prototype.reset = function() {
    player.x = 200;
    player.y = 380;
};

// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

function addEnemies() {
    allEnemies.push(new Enemy(-100, startLocations[Math.floor(Math.random() * startLocations.length)]));
}

//Sets bug difficulty
var numberEnemies = prompt("How many bugs do you want to dodge?", "3");

for (var i = 0; i < numberEnemies; i++) {
    addEnemies();
}

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
