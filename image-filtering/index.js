// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
     applyFilterNoBackground(reddify);
  //  applyFilter(reddify);
    



    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1 & 3: Create the applyFilter function here
function applyFilter(filterFunction){
    for (var a = 0; a < image.length; a++){
        for (var f = 0; f < image[a].length; f++){
            var rgbString = image[a][f];
            var rgbNumbers = rgbStringToArray(rgbString);
           filterFunction(rgbNumbers);
            rgbString = rgbArrayToString(rgbNumbers);
             image[a][f] = rgbString;
            
           
        }
    } 
};
// TODO 5: Create the applyFilterNoBackground function 
    var backValue = image[0][0];
function applyFilterNoBackground(insertFilter){
    for (var n = 0; n < image.length; n++){
        for (var r = 0; r < image[n].length; r++){
            var mario = image[n][r];
            if (mario === backValue){
                image[n][r] = mario;
            }
            else if (mario !== backValue){
             var rgbNumbers = rgbStringToArray(mario);
           insertFilter(rgbNumbers);
            mario = rgbArrayToString(rgbNumbers);
             image[n][r] = mario;
            }
            
        }
    }

};

// TODO 2 & 4: Create filter functions
function reddify(array){
    array[RED] = 255;
};

function decreaseBlue(blueArr){
    blueArr[BLUE] = Math.max(blueArr[BLUE] - 30, 0);
};

function increaseGreenByBlue(greenArr){
    greenArr[GREEN] = Math.min(greenArr[BLUE] + greenArr[GREEN], 255);
};
// CHALLENGE code goes below here
