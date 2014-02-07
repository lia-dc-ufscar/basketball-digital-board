//  Basketball Digital Board drawing.js file
//  A project by LIA - Advanced Interaction Laboratory
//  Authors:  Yago Arroyo Gonçalves
//        George Pagliuso
//
//  This file is a modified version of the cod
//  originally on http://jsfiddle.net/ghostoy/wTmFE/1/

$(function(){
canvas = document.getElementById('court'),
ctx = canvas.getContext('2d'); // get 2D context
ctx.lineCap   = 'round'; // Make pen round
ctx.lineJoin = 'round'; // And connect roundly

// Set initial settings
var mousedown = false;
ctx.strokeStyle = defaultColor;
ctx.lineWidth = defaultSize;

/*********** handle mouse events on canvas **************/
canvas.onmousedown = function(e) {
    var pos = fixPosition(e, canvas);
    mousedown = true;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    return false;
};

canvas.onmousemove = function(e) {
    var pos = fixPosition(e, canvas);
    if (mousedown) {
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }
};

canvas.onmouseup = function(e) {
    mousedown = false;
};

/********** utils ******************/
// Thanks to http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/4430498#4430498
function fixPosition(e, gCanvasElement) {
    var x;
    var y;
    if (e.pageX || e.pageY) { 
      x = e.pageX;
      y = e.pageY;
    }
    else { 
      x = e.clientX + document.body.scrollLeft +
          document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop +
          document.documentElement.scrollTop;
    } 
    x -= gCanvasElement.offsetLeft;
    y -= gCanvasElement.offsetTop;
    return {x: x, y: y};
}

});