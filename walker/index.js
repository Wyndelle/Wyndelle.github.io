/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
      LEFT : 37,
      RIGHT : 39,
      UP : 38,
      DOWN: 40,
  }
  // Game Item Objects
  var positionX = 0; //location for x coordinate of box
  var speedX = 0;    //speed for box along x axis
  var positionY = 0; //location for y coordinate of box
  var speedY = 0;   //speed for box along y axis

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
    //update position of game item for animation 
repositionGameItem();
//check for collision 
  
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
// press the up key --> moves the box in the negative Y direction 
// press the down key --> moves the box in the positive Y direction 
// ect. for left (-X) and right (+X)
changeSpeedX(-5, event.which, KEY.LEFT);
changeSpeedX(5, event.which, KEY.RIGHT);
changeSpeedY(-5, event.which, KEY.UP);
changeSpeedY(5, event.which, KEY.DOWN);


  }

  function handleKeyUp(event) {
changeSpeedX(0, event.which, KEY.LEFT);
changeSpeedX(0, event.which, KEY.RIGHT);
changeSpeedY(0, event.which, KEY.UP);
changeSpeedY(0, event.which, KEY.DOWN);

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //this is where my will to code left my body
  function repositionGameItem(){
      //move the box to a new X position 
      positionX += speedX;      //update the x position 
$("#gameItem").css("left", positionX); //redraws according to y coordinategit push

      //move the box to a new Y position
      positionY += speedY;      //update the y position
           $("#gameItem").css("top", positionY); //redraws according to y coordinate
  }
  function changeSpeedX(newSpeed, keycode, arrowkey){
if (keycode === arrowkey) {
  speedX = newSpeed;
  }
}
  function changeSpeedY(newSpeed, keycode, arrowkey){
if (keycode === arrowkey) {
  speedY = newSpeed;
  }
}


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
