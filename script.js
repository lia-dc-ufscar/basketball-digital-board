//  Basketball Digital Board script.js file
//  A project by LIA - Advanced Interaction Laboratory
//  Authors:    Yago Arroyo Gonçalves
//              George Pagliuso

// Variables creation

var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "black", // Line color
    y = 3,       // Brush size
    l = 0;       // Line type

// Function:    set_color
// Objective:   Change line type from solid to dashed
//              and vice-versa
// Parameters:  obj: object containing the selected color's button
// Return:      none

function init() {
    canvas = document.querySelector('#court');
    ctx = canvas.getContext('2d');
    
    sketch_style = getComputedStyle(canvas);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    mouse = {x: 0, y: 0};
    last_mouse = {x: 0, y: 0};
    
    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function(e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
        
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);
    
    
    /* Drawing on Paint App */
    ctx.lineWidth = y;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    canvas.addEventListener('mousedown', function(e) {
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);
    
    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);
    
    var onPaint = function() {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = x; // Set the color of the trace
        ctx.closePath();
        if (l == 0)
            ctx.setLineDash([0]);
        else
            ctx.setLineDash([20]);
        ctx.stroke();
    };
}

// Function:    set_color
// Objective:   Change line type from solid to dashed
//              and vice-versa
// Parameters:  obj: object containing the selected color's button
// Return:      none

function set_color(obj) {
    // Reset classes to simple button
    $("#black").attr("class", "button");
    $("#red").attr("class", "button");
    $("#blue").attr("class", "button");

    // Make clicked active
    $("#"+obj.id).attr("class", "button active");

    // Select line color
    x = obj.id;
}

// Function:    line_type
// Objective:   Change line type from solid to dashed
//              and vice-versa
// Parameters:  obj: object containing the line type's button
// Return:      none

function line_type(obj) {
    // Reset classes to simple button
    $("#solid").attr("class", "button");
    $("#dashed").attr("class", "button");

    // Make clicked active
    $("#"+obj.id).attr("class", "button active");

    // Select line type
    switch (obj.id) {
        case "solid":
            l = 0;
            break;
        case "dashed":
            l = 1;
            break;
    }
}

// Function:    erase
// Objective:   Erase current content from court
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
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

// Function:    save
// Objective:   ?
// Parameters:  res: ?
//              e: ?
// Return:      none

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

// Function:    move
// Objective:   Move court drawing to save/trash bin
// Parameters:  none
// Return:      none

function move() {

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