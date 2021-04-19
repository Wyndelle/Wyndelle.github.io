
/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  //removing magic numbers for readability
  //snake controls
  var KEY = {
      "UP": 38,        
      "DOWN": 40,    
      "LEFT": 37,
      "RIGHT":39,
  }
  
 var BOARD_WIDTH = $("#board").width();  //board width, needed for collsion detection 
 var BOARD_HEIGHT = $("#board").height(); //board height, needed for collision detection
  
  
  // objects
  var snakeHead = gameItem(190, 100, "#head", 0, 0, 22, 22);
  var apple     = gameItem(100, 100, "#apple", 0, 0, 20, 20);
  var score     = points("#score");
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
    moveSnake();
      checkForBorderCollision()  
      doCollide(apple, snakeHead);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    changeSpeedY(-5, event.which, KEY.UP);
    changeSpeedY(5, event.which, KEY.DOWN);
    changeSpeedX(-5, event.which, KEY.LEFT);
    changeSpeedX(5, event.which, KEY.RIGHT);
  }

  function handleKeyUp(event){
      changeSpeedY(0, event.which, KEY.UP);
    changeSpeedY(0, event.which, KEY.DOWN);
    changeSpeedX(0, event.which, KEY.LEFT);
    changeSpeedX(0, event.which, KEY.RIGHT);
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

function points(id) {

  var points = {};
  points.id = id;
  points.points = 1;

  return points;
}

    function moveSnake(){
        snakeHead.X += snakeHead.speedX;      //update the y position
           $("#head").css("left", snakeHead.X); //redraws according to y coordinate
  
      snakeHead.Y += snakeHead.speedY;      //update the y position
           $("#head").css("top", snakeHead.Y); //redraws according to y coordinate
    };

    function changeSpeedY(newSpeed, keycode, key){
        if (keycode === key) {
            snakeHead.speedY = newSpeed ;
        }
        
    }

    function changeSpeedX(newSpeed, keycode, key){
    
        if (keycode === key){
            snakeHead.speedX = newSpeed;
        }
        
    }
    
    function checkForBorderCollision(){
        //snake colliion 
      
       if (snakeHead.Y > BOARD_HEIGHT - 22 || snakeHead.Y < 5 ) {
            endGame();  
    }
    if(snakeHead.X > BOARD_WIDTH - 20 || snakeHead.X < -4 ){
            endGame();
    } 


    }

        function doCollide(obj1, obj2) {
   
    obj1.leftX = obj1.X;
    obj1.topY = obj1.Y;
    obj1.rightX = obj1.X + 20;
    obj1.bottomY = obj1.Y + 20;
    
  obj2.leftX = obj2.X;
    obj2.topY = obj2.Y;
  obj2.rightX = obj2.X + 20;
    obj2.bottomY = obj2.Y + 20;
    
	if (obj1.rightX > obj2.leftX &&
       obj1.leftX < obj2.rightX &&
       obj1.bottomY > obj2.topY &&
       obj1.topY < obj2.bottomY) {
        
        $("#score").text("score: " + score.points ++);
        
        
       }
		
}

$('#apple').collision(("#snakeHead")(function() {
    var docHeight = $(board).height(),
        docWidth = $(board).width(),
        $div = $('#apple'),
        divWidth = $div.width(),
        divHeight = $div.height(),
        heightMax = docHeight - divHeight,
        widthMax = docWidth - divWidth;
    
    $div.css({
        left: Math.floor( Math.random() * widthMax ),
        top: Math.floor( Math.random() * heightMax )
    });
}));
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

