//  Basketball Digital Board script.js file
//  A project by LIA - Advanced Interaction Laboratory
//  Authors:    Yago Arroyo Gonçalves
//              George Pagliuso

// Function:    init
// Objective:   Initialize SVG Canvas with court's div
// Parameters:  none
// Return:      none
function init() {
    svgCanvas = new SvgCanvas(document.getElementById("court"));
}

// Function:    set_color
// Objective:   Change line type from solid to dashed
//              and vice-versa
// Parameters:  obj: object containing the selected color's button
// Return:      none

function set_color(obj) {
    // Reset classes to simple button
    if ($("#black").hasClass("active"))
        $("#black").removeClass("active");
    else if ($("#blue").hasClass("active"))
        $("#blue").removeClass("active");
    else if ($("#red").hasClass("active"))
        $("#red").removeClass("active");

    // Make clicked active
    $("#"+obj.id).addClass("active");

    // Select line color
    svgCanvas.setStrokeColor(obj.id);
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
            svgCanvas.setStrokeStyle('0');
            break;
        case "dashed":
            svgCanvas.setStrokeStyle('25,15');
            break;
    }
}

// Function:    clear
// Objective:   Clear current content from court
// Parameters:  none
// Return:      none

function erase() {
    svgCanvas.clear();
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