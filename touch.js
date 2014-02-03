//  File touch.js available formerly available at:
//  http://ross.posterous.com/2008/08/19/iphone-touch-events-in-javascript/
//
//  From SVG Edit 2.6 (https://code.google.com/p/svg-edit/)
//
//  This file may have been modified from its original source
//  code and is part of Basketball Digital Board
//  A project by LIA - Advanced Interaction Laboratory
//  Authors:  Yago Arroyo Gonçalves
//            George Pagliuso

//  Function:   touchHandler
//  Objective:  Handle touch actions as if they were mouse actions
//  Parameters: event: touch events
//  Return:     none 
function touchHandler(event) {   
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
          switch(event.type) {
              case "touchstart": type="mousedown"; break;
              case "touchmove":  type="mousemove"; break;        
              case "touchend":   type="mouseup"; break;
              default: return;
          }
    
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                              first.screenX, first.screenY, 
                              first.clientX, first.clientY, false, 
                              false, false, false, 0/*left*/, null);
    if(touches.length < 2) {
      first.target.dispatchEvent(simulatedEvent);
      event.preventDefault();
    }
}
