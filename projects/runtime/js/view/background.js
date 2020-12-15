var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var cloudy;

        //var dews = [];

        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();
            
            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'cadetblue');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
             var sun = draw.bitmap('img/light.png');
             sun.x = 500;
             sun.y = -300;
             sun.scaleX = .8;
             sun.scaleY = .8;
             background.addChild(sun);
             
             var cloud = draw.bitmap('img/clouds.png');
             cloud.x = 15;
             cloud.y = -700;
             cloud.scaleX = .8;
             cloud.scaleY = .8;
             background.addChild(cloud);


            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
           // for(var i=0;i<5;++i) {
   // var dewHeight = 300;
   // var dew = draw.rect(75,buildingHeight,'LightGray','Black',1);
   // dew.x = 200*i;
   // dew.y = groundY-buildingHeight;
   // background.addChild(dew);
   // buildings.push(dew)}
            
            // TODO 4: Part 1 - Add a tree
            cloudy = draw.bitmap('img/cloudyy.png');
            cloudy.x = -200;
            cloudy.y = 300;
            background.addChild(cloudy);      } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            cloudy.x = cloudy.x + -2;
            if(cloudy.x < -1600) {
    cloudy.x = canvasWidth;
}

            
            // TODO 5: Part 2 - Parallax
            

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
