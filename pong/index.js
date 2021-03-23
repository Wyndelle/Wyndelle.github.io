/* global $, sessionStorage */

$(document).ready(runProgram) // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
                             
function runProgram(){

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

//welcoming function, to let my players know the rules of this game 
  function welcomePlayers(){
    alert("welcome to my pong game!");
   player1name = prompt("whats your name player one?");
   player2name = prompt("whats your name player two?")
    alert("nice to meet you " + player1name + " and " + player2name)
    alert("my name is wyndelle, but you can call me anytime")
    alert("that was pretty bad, forget I said that. nice to meet you " + player1name + " and " + player2name)
    alert("this is a fun multiplayer game of pong. the rules of this game are pretty simple") 
    alert("player one uses the w and s keys to move up and down and hit the ball")
    alert("player two uses the up and down arrow keys to move and hit the ball")
    alert("don't let your opponent knock the ball behind you, or else they win a point!")
    alert("first person to 5 points, wins the game and is titled, ping pong ding dong")
    var answer = prompt("do you think you'll win " + player1name + " or " + player2name)
    alert("im actually rooting for the other player, sorry bud. I just like his vibe better.")
    prompt("need anything else before going on?")
    alert("great, didn't think so, have fun!")
}
welcomePlayers(); 

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  //removing magic numbers for readability
  var KEY = {
      "UP": 38,        //player two controls
      "DOWN": 40,     //player two controls 
      "W": 87,       //player one controls 
      "S": 83,      //player one controls 
  }

  var BOARD_WIDTH = $("#board").width();  //board width, needed for collsion detection 
  var BOARD_HEIGHT = $("#board").height(); //board height, needed for collision detection


  // Game Item Objects
var ball =        gameItem( 300, 290, "#ball", 5, 5, 30, 30,);
var leftPaddle =  gameItem(340,  30, "#leftPaddle", 0, 0, 200, 50);
var rightPaddle = gameItem(930,  30, "#rightPaddle", 0, 0, 200, 50);


//score tracker for both players
var player1 = score("#player1");
var player2 = score("#player2");

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);



  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
      
    //update position
    repositionLeftPaddle();
    repositionRightPaddle();
     repositionBall();
     //check for collisions
     checkForBorderCollision();
     doCollide(leftPaddle, ball);
     doCollide(rightPaddle, ball);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
 changeSpeedY1(-5, event.which, KEY.W); // press the keyW ---> left paddle moves up
 changeSpeedY1(5, event.which, KEY.S); // press the keyS ---> left paddle moves 

 changeSpeedY2(-5, event.which, KEY.UP); // press the keyUp ---> right paddle moves up
 changeSpeedY2(5, event.which, KEY.DOWN);// press the keyDown ---> right paddle moves up

  }

   function handleKeyUp(event) {
changeSpeedY2(0, event.which, KEY.UP);   //lift the key up ---> speed stops for right paddle
changeSpeedY2(0, event.which, KEY.DOWN); //lift the key up ---> speed stops for right paddle

changeSpeedY1(0, event.which, KEY.W);  //lift the key up ---> speed stops for left paddle
changeSpeedY1(0, event.which, KEY.S); //lift the key up ---> speed stops for left paddle 

  }
  
   ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////



 function gameItem(X, Y, id, speedY, speedX, height, width) {
  var gameItem = {};
  gameItem.X = X;
  gameItem.Y = Y;
  gameItem.id = id;
  gameItem.speedY = speedY;
  gameItem.speedX = speedX;
  gameItem.height = height;
  gameItem.Width = width;
  

  return gameItem;
}

function score(id) {

  var score = {};
  score.id = id;
  score.points = 1;

  return score;
}
    
 function repositionLeftPaddle(){
      //move the left paddle to a new Y position

      leftPaddle.Y += leftPaddle.speedY;      //update the y position
           $("#leftPaddle").css("top", leftPaddle.Y); //redraws according to y coordinate
  }

   function repositionRightPaddle(){
      //move the right paddle to a new Y position
      
      rightPaddle.Y += rightPaddle.speedY;      //update the y position
           $("#rightPaddle").css("top", rightPaddle.Y); //redraws according to y coordinate
  }

   function repositionBall(){
      //move the right paddle to a new Y position
      ball.X += ball.speedX;      //update the y position
           $("#ball").css("left", ball.X); //redraws according to y coordinate
  
      ball.Y += ball.speedY;      //update the y position
           $("#ball").css("top", ball.Y); //redraws according to y coordinate
  }

    function changeSpeedY1(newSpeed, keycode, arrowkey){
        if (keycode === arrowkey) {
            leftPaddle.speedY = newSpeed;
            }
  } 
    function changeSpeedY2(newSpeed, keycode, arrowkey){
        if (keycode === arrowkey) {
            rightPaddle.speedY = newSpeed;
            }
  } 
  
  function checkForBorderCollision(){
      //left paddle
      if (leftPaddle.Y > BOARD_HEIGHT - leftPaddle.height + 20) {
          leftPaddle.Y = BOARD_HEIGHT - leftPaddle.height + 20;
      }

      else if (leftPaddle.Y < 20 ){
           leftPaddle.Y = 20;
      }

        //right paddle
         if (rightPaddle.Y > BOARD_HEIGHT -  rightPaddle.height + 20) {
             rightPaddle.Y = BOARD_HEIGHT -  rightPaddle.height + 20
      }

      else if (rightPaddle.Y < 20 ){
               rightPaddle.Y = 20;
      }
      
      //ball (non scoring walls)
       if (ball.Y > BOARD_HEIGHT || ball.Y < 10) {
            ball.speedY = -ball.speedY;  
      }
        //if ball hits the right wall, award a point
        if (ball.X > 990) {
          ball.X = 500 ;  
             $("#player1").text("player one score:"  + player1.points ++);
             
      }
        //if ball hits left wall, award a point
      if (ball.X < 300) {
           ball.X = 500 
             $("#player2").text("player two score:"  + player2.points ++);
      }
gameWinner()
  }

//checks for ball paddle colliions

function doCollide(obj1, obj2) {
   
    obj1.leftX = obj1.X;
    obj1.topY = obj1.Y;
    obj1.rightX = obj1.X + 50;
    obj1.bottomY = obj1.Y + 200;
    
  obj2.leftX = obj2.X;
    obj2.topY = obj2.Y;
  obj2.rightX = obj2.X + 30;
    obj2.bottomY = obj2.Y + 30;
    
	if (obj1.rightX > obj2.leftX &&
       obj1.leftX < obj2.rightX &&
       obj1.bottomY > obj2.topY &&
       obj1.topY < obj2.bottomY) {
    
        obj2.speedX = -obj2.speedX;
        
    }
		
}

function gameWinner(){
    if (player1.points === 6){
        alert("congrats " + player1name + "i always liked you better. you are the official ping pong ding dong.");
            endGame();
    }

    if (player2.points === 6){
        alert("wohoo! I always knew you could do it. You were always my favorite " + player2name)
        endGame();
    }
}



  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }


}
