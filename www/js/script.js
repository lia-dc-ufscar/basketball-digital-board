//  Basketball Digital Board script.js file
//  A project by LIA - Advanced Interaction Laboratory
//  Authors:    Yago Arroyo Gonçalves
//              George Pagliuso

// Function:    init
// Objective:   Initialize SVG Canvas with court's div
// Parameters:  none
// Return:      none
function init() {
    //  The piece of code below will get touches to behave like
    //  mouse clicks.
    //  Code originally from:
    //  http://stackoverflow.com/questions/8058699/drag-drop-on-mobile-devices-using-some-code-that-translates-event-code-included

    $("#court").children().bind('touchstart touchmove touchend touchcancel', function(){
        var touches = event.changedTouches,    first = touches[0],    type = ""; 
        switch(event.type){    
          case "touchstart": type = "mousedown"; 
        break;    
          case "touchmove":  type="mousemove"; 
        break;            
          case "touchend":   type="mouseup"; 
        break;    
          default: return;
        }

        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent(type, true, true, window, 1,
                          first.screenX, first.screenY,
                          first.clientX, first.clientY, false,
                          false, false, false, 0/*left*/, null);
        first.target.dispatchEvent(simulatedEvent);
        event.preventDefault();
    });
}

// Function:    set_color
// Objective:   Change line type from solid to dashed
//              and vice-versa
// Parameters:  obj: object containing the selected color's button
// Return:      none

function set_color(obj) {
    // Reset classes to simple button
    if ($("#blue").hasClass("active"))
        $("#blue").removeClass("active");
    else if ($("#red").hasClass("active"))
        $("#red").removeClass("active");
    else if ($("#green").hasClass("active"))
        $("#green").removeClass("active");
    else if ($("#eraser").hasClass("active")) {
        $("#eraser").removeClass("active");
        ctx.lineWidth = 3;
        ctx.globalCompositeOperation = 'source-over';
    }

    // Make clicked active
    $("#"+obj.id).addClass("active");

    // Select line color
    if (obj.id == 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 30;
    } else
        ctx.strokeStyle = obj.id;
}

// Function:    line_type
// Objective:   Change line type from solid to dashed
//              and vice-versa
// Parameters:  obj: object containing the line type's button
// Return:      none

function line_type(obj) {
    // Reset classes to simple button
    if ($("#solid").hasClass("active"))
        $("#solid").removeClass("active");
    else if ($("#dashed").hasClass("active"))
        $("#dashed").removeClass("active");

    // Make clicked active
    $("#"+obj.id).addClass("active");

    // Select line type
    switch (obj.id) {
        case "solid":
            ctx.setLineDash([0]);
            break;
        case "dashed":
            ctx.setLineDash([25,15]);
            break;
    }
}

// Function:    clear
// Objective:   Clear current content from court
// Parameters:  none
// Return:      none

function erase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function:    save
// Objective:   save canvas to file (?)
// Parameters:  none
// Return:      none

function save() {
    svgCanvas.save();
}

// Function:    show_info
// Objective:   toggle info balloons on/off
// Parameters:  btn: object containing info button
// Return:      none

function show_info(btn) {
    // Toggle button on/off
    if ($("#"+btn.id).hasClass("active")) {
        $("#"+btn.id).attr("class", "button");
        $("#info-balloons").hide();
    } else {
        $("#"+btn.id).attr("class", "button active");
        $("#info-balloons").show();
    }
}