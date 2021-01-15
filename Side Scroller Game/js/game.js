/*
Ryan Grady, Sakina Vidyarthi and Shane Snediker
Dr. Jones CS301
Last updated: 1-12-2021

This file includes the JavaScript code that we used to initiate our 
side scroller game play.  We incorporated objects and functions that
use the window and document browser objects to provoke movements from
our game characters and backgrounds.  Our game is unique in that the 
movement of the main character is contrasted by an opposite movement
of the middle layer .png image.  This gives the game play a dynamic
feel.  We had fun learning how JavaScript can be used to enhance
a webpage's HTML elements.  

To help guide us, we leaned upon the JavaScript tutorial found at:

https://www.w3schools.com/graphics/game_canvas.asp

*/

// Declare the core variables that will be used to create game objects
var player;
var goompas = [];   // An array to hold Bob's enemy goompas!
var myScore;
var myBackground;
var midbackground;
var background;

// Define a function that will initialize game play
function startGame() {
    player = new component(50, 50, "./img/rightcharacter.png", 80, 75, "image");
    player.gravity = 0.05;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myBackground = new component(1000, 200, "./img/front_layer.png", 0, 0, "static");
    midbackground = new component(1000, 200, "./img/middle_layer.png", 0, 0, "background");
    background = new component(1000, 200, "./img/background_layer.png", 0, 0, "background"); 
    gameOver = new component("50px", "Consolas", "red", 350, 175, "text");
    myGameArea.start();
}

// Define an object that we will use to give our game canvas character and definition
var myGameArea = {
    canvas : document.createElement("canvas"),
    // Initialize game play and set game window parameters
    start : function() {
    this.canvas.width = 1000;
    this.canvas.height = 200;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) {
        myGameArea.keys = (myGameArea.keys || []);
        myGameArea.keys[e.keyCode] = true;
    })
    window.addEventListener('keyup', function (e) {
        myGameArea.keys[e.keyCode] = false;
    })
    },
    // We have to erase the screen each time we repaint it
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

// Define a function that will give game components movement characteristics
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image"|| type == "background"|| type == "static") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;  
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.bounce = 0;
    // This function will be called repeatedly to update character's positioning
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } 
        if (type == "image"|| type == "background"|| type == "static") {
            if (player.speedX <0){
                player.image.src = "./img/leftcharacter.png";
            } else { 
                player.image.src = "./img/rightcharacter.png"; 
            }
            ctx.drawImage(this.image,
              this.x,
              this.y,
              this.width, this.height);
        }
        if (type == "background") {
            ctx.drawImage(this.image, 
                this.x + this.width, 
                this.y,
                this.width, this.height);
        } //else { 
            //ctx.fillStyle = color;
           // ctx.fillRect(this.x, this.y, this.width, this.height);
       // }
    }
    // A character's new position is a function of their x and y displacements
    this.newPos = function() {
        if (this.type == "background") {
            if (this.x == -(this.width)) {
            this.x = 0;
            }
        }
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        console.log(this.speedY);
        console.log(this.gravitySpeed);
        this.hitBottom();
    }
    // Allowing vertically moving elements to notice when they hit the ground
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height-25;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;//-(this.gravitySpeed) ;//* this.bounce);
        }
    }
    // Collision detection
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        } 
        return crash;
    }
}

// Define a function that will update the game picture
function updateGameArea() {
    // Detect keyboard presses to move Bob across the screen
    if (myGameArea.keys && myGameArea.keys[37]) {player.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {player.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[38]) {
        accelerate(-.2);
        setTimeout(() => { accelerate(0.1) }, 250);}
    if (myGameArea.keys && myGameArea.keys[40]) {accelerate(.2);
        setTimeout(() => { accelerate(0.1) }, 250); }
    if (myGameArea.keys && myGameArea.keys[32]) {myGameArea.stop();}
    var x;
    for (i = 0; i < goompas.length; i += 1) {
        if (player.crashWith(goompas[i])) {
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();

    // Create a dynamic background environment
    midbackground.speedX = -player.speedX/5;
    background.speedX = -player.speedX/2;
    background.update();
    background.newPos();
    midbackground.update();
    midbackground.newPos();
    myBackground.update();
    
    // Generate enemy goompas to intrude upon Bob's world at an increasing rate
    factor = 1;
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo % 250 ==0){
        factor +=0.1;     
    }
    interval = Math.floor(Math.random()*((250/factor)-(150/factor)+1)+(150/factor));
    if (myGameArea.frameNo == 1 || everyinterval(interval)) {
        x = myGameArea.canvas.width;
        goompas.push(new component(30, 30, "./img/goompa.png", x, 175, "image"));   
    }
    for (i = 0; i < goompas.length; i += 1) {
        goompas[i].speedX = -2.5;
        goompas[i].newPos();
        goompas[i].update();
    }
    myScore.text="SCORE: " + parseInt(myGameArea.frameNo/10);
    myScore.update();
   
    // Don't forget to update Bob's position
    player.newPos();    
    player.update();
}

// Game timing functions
function accelerate(n) {
    if (!myGameArea.interval) {myGameArea.interval = setInterval(updateGameArea, 20);}

    player.gravity = n;
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}



