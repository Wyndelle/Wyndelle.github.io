/* global $, sessionStorage */

$(document).ready(runProgram) // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
                             // I want the game to also start when the space bar is pressed
function runProgram(){

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

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
var ball =        gameItem( 300, 290, "#ball", 5, 5);
var leftPaddle =  gameItem(340,  30, "#leftPaddle", 0, 0,);
var rightPaddle = gameItem(930,  30, "#rightPaddle", 0, 0);


//score tracker for both players
var player1 = score("#player1");
var player2 = score("#player2");

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  function changePlayer1Text(newText) {
			player1.text(newText);
			}

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



 function gameItem(X, Y, id, speedY, speedX) {
  var gameItem = {};
  gameItem.X = X;
  gameItem.Y = Y;
  gameItem.id = id;
  gameItem.speedY = speedY;
  gameItem.speedX = speedX;
  

  return gameItem;
}

function score(id) {

  var score = {};
  score.id = id;
  score.points = 0;

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
      if (leftPaddle.Y > BOARD_HEIGHT - leftPaddle.Y) {
          leftPaddle.Y = BOARD_HEIGHT - leftPaddle.Y
      }

      else if (leftPaddle.Y < 20 ){
           leftPaddle.Y = 20;
      }

        //right paddle
         if (rightPaddle.Y > BOARD_HEIGHT -  30) {
             rightPaddle.Y = BOARD_HEIGHT -  30
      }

      else if (rightPaddle.Y < 20 ){
               rightPaddle.Y = 20;
      }
      
      //ball (non scoring walls)
       if (ball.Y > BOARD_HEIGHT || ball.Y < 20) {
            ball.speedY = -ball.speedY;  
      }

        if (ball.X > 990|| ball.X < 300) {
            ball.speedX = -ball.speedX;  
             $("#player1").text("player two score:"  + player1.points + 1);
      }

      
  }

//   function checkPointCollision() {
    
//     if (pointCollision("#rightPaddle", "#leftPaddle", ball)) {
//         showResult(true);
//     } else {
//         showResult(false);
//     }
// }

//   function pointCollision(playerTwo, playerOne, bouncyBall) {
   
//    playerTwo.leftX = playerTwo.x;
//    playerTwo.topY = playerTwo.y;
//    playerTwo.rightX = playerTwo.x + 30;
//    playerTwo.bottomY = playerTwo.y + 30;
    
//     playerOne.leftX = playerOne.x;
//     playerOne.topY = playerOne.y;
//     playerOne.rightX = playerOne.x + 30;
//     playerOne.bottomY = playerOne.y + 30;

//     bouncyBall.leftX = bouncyBall.x;
//     bouncyBall.topY = bouncyBall.y;
//     bouncyBall.rightX = bouncyBall.x + 30 ;
//     bouncyBall.bottomY = bouncyBall.y + 30 ;
    
// 	if (bouncyBall.rightX > playerOne.leftX &&
//        bouncyBall.leftX < playerOne.rightX  &&

//        bouncyBall.bottomY > playerOne.topY &&
//        bouncyBall.topY < playerOne.bottomY) {
//       console.log("true");
//     }
// 		else {
//          console.log( "false");
//         }
// }

// function showResult(result) {
//    
// }




  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
