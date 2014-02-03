// 	SvgCanvas.js file from svg-edit 2.1
//	For more info on the project, visit:
//	https://code.google.com/p/svg-edit/
//
//	This file have been adapted for matters of size and
//	needs and is part of Basketball Digital Board
//	A project by LIA - Advanced Interaction Laboratory
//	Authors:	Yago Arroyo Gonçalves
//				George Pagliuso

var svgcanvas = null;

function SvgCanvas(c) {

// private members
	var canvas = this;
	var container = c;
	var svgns = "http://www.w3.org/2000/svg";

	var idprefix = "svg_";
	var svgdoc  = c.ownerDocument;
	var svgroot = svgdoc.createElementNS(svgns, "svg");
	svgroot.setAttribute("width", 1086);
	svgroot.setAttribute("height", 618);
	svgroot.setAttribute("id", "svgroot");
	svgroot.setAttribute("xmlns", svgns);
	container.appendChild(svgroot);

	var d_attr = null;
	var started = false;
	var obj_num = 1;
	var start_x = null;
	var start_y = null;
	var current_mode = "path";
	var current_fill = "none";
	var current_stroke = "black";
	var current_stroke_width = 3;
	var current_stroke_style = "none";
	var current_opacity = 1;
	var current_stroke_opacity = 1;
	var current_fill_opacity = 1;
	var freehand_min_x = null;
	var freehand_max_x = null;
	var freehand_min_y = null;
	var freehand_max_y = null;
	var selected = null;
	var selectedOutline = null;
	var events = {};

// private functions
	var getId = function() {
	    if (events["getid"]) return call("getid",obj_num);
		return idprefix+obj_num;
	}

	var call = function(event, arg) {
		if (events[event]) {
			return events[event](this,arg);
		}
	}

	var assignAttributes = function(node, attrs) {
		for (i in attrs) {
			node.setAttributeNS(null, i, attrs[i]);
		}
	}

	// remove unneeded attributes
	// makes resulting SVG smaller
	var cleanupElement = function(element) {
		if (element.getAttribute('fill-opacity') == '1')
			element.removeAttribute('fill-opacity');
		if (element.getAttribute('opacity') == '1')
			element.removeAttribute('opacity');
		if (element.getAttribute('stroke') == 'none')
			element.removeAttribute('stroke');
		if (element.getAttribute('stroke-dasharray') == 'none')
			element.removeAttribute('stroke-dasharray');
		if (element.getAttribute('stroke-opacity') == '1')
			element.removeAttribute('stroke-opacity');
		if (element.getAttribute('stroke-width') == '1')
			element.removeAttribute('stroke-width');
		if (element.getAttribute('rx') == '0')
			element.removeAttribute('rx')
		if (element.getAttribute('ry') == '0')
			element.removeAttribute('ry')
	}

	var addSvgElementFromJson = function(data) {
		return canvas.updateElementFromJson(data)
	}

	var svgToString = function(elem, indent) {
		// TODO: could use the array.join() optimization trick here too
		var out = "";
		if (elem) {
			var attrs = elem.attributes;
			var attr;
			var i;
			var childs = elem.childNodes;
			for (i=0; i<indent; i++) out += "  ";
			out += "<" + elem.nodeName;
			for (i=attrs.length-1; i>=0; i--) {
				attr = attrs.item(i);
				if (attr.nodeValue != "") {
					out += " " + attr.nodeName + "=\"" + attr.nodeValue+ "\"";
				}
			}
			if (elem.hasChildNodes()) {
				out += ">\n";
				indent++;
				for (i=0; i<childs.length; i++)
				{
					if (childs.item(i).nodeType == 1) { // element node
						out = out + svgToString(childs.item(i), indent);
					} else if (childs.item(i).nodeType == 3) { // text node
						for (j=0; j<indent; j++) out += "  ";
						out += childs.item(i).nodeValue + "";
					}
				}
				indent--;
				for (i=0; i<indent; i++) out += "  ";
				out += "</" + elem.nodeName + ">\n";
			} else {
				out += " />\n";
			}
		}
		return out;
	} // end svgToString()

// public events
	var mouseDown = function(evt) {
		var x = evt.pageX - container.offsetLeft;
		var y = evt.pageY - container.offsetTop;
		started = true;
		start_x = x;
		start_y = y;
		d_attr = "M" + x + "," + y + " ";
		addSvgElementFromJson({
			"element": "path",
			"attr": {
				"d": d_attr,
				"id": getId(),
				"fill": "none",
				"stroke": current_stroke,
				"stroke-width": current_stroke_width,
				"stroke-dasharray": current_stroke_style,
				"stroke-opacity": current_stroke_opacity,
				"opacity": current_opacity / 2
			}
		});
		freehand_min_x = x;
		freehand_max_x = x;
		freehand_min_y = y;
		freehand_max_y = y;
	}

	var mouseMove = function(evt) {
		if (!started) return;
		var x = evt.pageX - container.offsetLeft;
		var y = evt.pageY - container.offsetTop;
		var shape = svgdoc.getElementById(getId());
		var dx = x - start_x;
		var dy = y - start_y;
		start_x = x;
		start_y = y;
		d_attr += "l" + dx + "," + dy + " ";
		shape.setAttributeNS(null, "d", d_attr);
	}

	var mouseUp = function(evt)	{
		if (!started) return;

		started = false;
		var element = svgdoc.getElementById(getId());
		d_attr = null;
		obj_num++;
		element.setAttribute("opacity", current_opacity);
		cleanupElement(element);
		call("changed",element);
	}

// public functions

	this.save = function() {
		// remove the selected outline before serializing
		this.selectNone();
		var str = "<?xml version=\"1.0\" standalone=\"no\"?>\n";
		str += "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n";
		str += svgToString(svgroot, 0);
		this.saveHandler(str);
	}

	this.clear = function() {
		var nodes = svgroot.childNodes;
		var len = svgroot.childNodes.length;
		var i = 0;
		for(var rep = 0; rep < len; rep++){
			if (nodes[i].nodeType == 1) { // element node
				nodes[i].parentNode.removeChild(nodes[i]);
			} else {
				i++;
			}
		}
		call("cleared");
	}

	this.getStrokeColor = function() {
		return current_stroke;
	}

	this.setStrokeColor = function(color) {
		current_stroke = color;
		if (selected != null) {
			selected.setAttribute("stroke", color);
			call("changed", selected);
		}
	}

	this.setStrokeStyle = function(val) {
		current_stroke_style = val;
		if (selected != null) {
			selected.setAttribute("stroke-dasharray", val);
			call("changed", selected);
		}
	}

	this.updateElementFromJson = function(data) {
		var shape = svgdoc.getElementById(data.attr.id);
		// if shape is a path but we need to create a rect/ellipse, then remove the path
		if (shape && data.element != shape.tagName) {
			svgroot.removeChild(shape);
			shape = null;
		}
		if (!shape) {
			shape = svgdoc.createElementNS(svgns, data.element);
			svgroot.appendChild(shape);
		}
		assignAttributes(shape, data.attr);
		cleanupElement(shape);
		return shape;
	}
	
	// Event listeners
	$(container).mouseup(mouseUp);
	$(container).mousedown(mouseDown);
	$(container).mousemove(mouseMove);

	this.saveHandler = function(svg) {
		window.open("data:image/svg+xml;base64," + Utils.encode64(svg));
	}
}