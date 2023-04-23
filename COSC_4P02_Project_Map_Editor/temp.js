class Node {
	constructor(data, next = null) {
		this.data = data;
		this.next = next;
	}
};
class LinkedList {
	constructor(){
		this.head = null;
	}
	insertFirst(data){// Insert first Node
		this.head = new Node(data, this.head);
	}
	insertAt(data, tile){// Insert at tile
  if(tile < this.head.data.tile){//insert at first
    this.head = new Node(data, this.head);
    return;
  }
  const node = new Node(data);// create new node to hold info
  let current = this.head;// create poiinter to traverse list
  let previous = current;
  while (current != null && current.data.tile < tile) {
    previous = current;
    current = current.next;
  }
  if(previous.next == null) {
      previous.next = node;
      return;
  }
  node.next = current;
  previous.next = node;
}

	removeAt(tile){// Remove tile
		let current = this.head;
		let previous;
		
		if(this.head.data.tile == tile) {
			this.head = current.next;
		}else {
			while(current.data.tile != tile){
				previous = current;
				current = current.next;
			}
			previous.next = current.next;
		}
	}
	clear() {// Clear list
		this.head = null;
	}
	printListData(){// Print list data
		let current = this.head;
		while(current){
			console.log(current.data.tile);
			current = current.next;
		}
	}
};
const grouping = new LinkedList();// create new linked list
//const info = new Map();// create hash map
if(sessionStorage.getItem("modify")) {// if modifying map
  let mFloor = JSON.parse(sessionStorage.getItem("modify"));// get floor being modified
  let museName = JSON.parse(sessionStorage.getItem("mInfo")).mName;// get museum name
  map = JSON.parse(sessionStorage.getItem(museName))[mFloor].layout;// set map to layout being edited;// get museum info
} else {
  map = JSON.parse(sessionStorage.getItem("floorLayout"))// get floor layout from session storage
}
var map, tile_x, tile_y;// make map and tile_x variables global

(function() { 

  
  var display, layout, controller, loop;
  size = 32;
  
  
  display = {
    selectedTile: null,

    buffer:document.createElement("canvas").getContext("2d"), 
    context:document.querySelector("canvas").getContext("2d"),
    output:document.querySelector("p"),
    height_width_ratio:undefined,

    tile_sheet: {

      image:new Image(),
      columns:3,
      tile_height:32,
      tile_width:32

    },
    render:function() {
     
      for (let index = layout.map.length - 1; index > -1; -- index) {
  
        var value = layout.map[index];
        //console.log('map value:', value);
        var source_x = (value % this.tile_sheet.columns) * this.tile_sheet.tile_width;
        var source_y = Math.floor(value / this.tile_sheet.columns) * this.tile_sheet.tile_height;
      
        var destination_x = (index % layout.columns) * this.tile_sheet.tile_width;
        var destination_y = Math.floor(index / layout.columns) * this.tile_sheet.tile_height;

        this.buffer.drawImage(this.tile_sheet.image, source_x, source_y, this.tile_sheet.tile_width, this.tile_sheet.tile_height, destination_x, destination_y, this.tile_sheet.tile_width, this.tile_sheet.tile_height);

      }
 
      this.context.drawImage(this.buffer.canvas, 0, 0, layout.width, layout.height, 0, 0, this.context.canvas.width, this.context.canvas.height);

    },

    resize:function(event) {
    display.context.canvas.width = Math.floor(document.documentElement.clientWidth - 32);
    if (display.context.canvas.width > document.documentElement.clientHeight) {
      display.context.canvas.width = Math.floor(document.documentElement.clientHeight);
    }
    display.context.canvas.height = Math.floor(display.context.canvas.width * 0.5625);
    display.render();
  }
    
  };
  controller = {
  pointer_x: 0,
  pointer_y: 0,
  move: function(event) {
    // Get the position of the canvas element on the screen
    var rectangle = display.context.canvas.getBoundingClientRect();

    // Update the position of the pointer based on the mouse/finger position
    controller.pointer_x = event.clientX - rectangle.left;
    controller.pointer_y = event.clientY - rectangle.top;

    // Get the x and y coordinates of the pointer relative to the canvas
    var canvas_x = controller.pointer_x * (display.context.canvas.width / rectangle.width);
    var canvas_y = controller.pointer_y * (display.context.canvas.height / rectangle.height);

    // Update the selected tile based on the pointer position
    var tile_width = display.tile_sheet.tile_width;
    var tile_height = display.tile_sheet.tile_height;
    var row = Math.floor(canvas_y / tile_height);
    var col = Math.floor(canvas_x / tile_width);
    var position = row * layout.columns + col;
    display.selectedTile = position;
  }
};

   function groupTiles() {
  // Calculate the row and column of the clicked tile
  const tile_width = display.tile_sheet.tile_width;
  const tile_height = display.tile_sheet.tile_height;
  const row = Math.floor(controller.pointer_y / tile_height);
  const col = Math.floor(controller.pointer_x / tile_width);
  const tile = row * layout.columns + col;
  
  // Prompt the user to input a new value for the selected tile element
  const value = parseInt(prompt("Enter the amenity you wish to add to this location by inputting the corresponding number: \n     Washroom/Bathroom \t 2 \n     Help Desk/Centre \t 3 \n     Elevator \t 4 \n     Stairwell \t 5 \n     Gift Shop \t 6 \n     Exit/Emergency Exit \t 7"));
  console.log("input:",value);
  console.log("tile: ",layout.map[tile]);
  // Check if the selected tile's current value is set to 0
  if (layout.map[tile] != 0) {
    // Update the map with the new value for the selected tile element
    layout.map[tile] = value;

    // Render the map again with the updated tile
    

    // Update the linked list with the new tile information
    grouping.removeAt(tile);
    grouping.insertAt({tile: tile, value: value}, tile);

  } else {
    alert("The selected tile's current value is 0.");
  }
  display.render();
}


  layout = {
	 map: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	 		0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,
	 		0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,
	 		0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,
	 		0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,
	 		0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,
	 		0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
	 		0,1,1,1,1,2,0,1,1,1,1,0,1,1,2,0,
	 		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    

    columns:16,

    height:9*32,
    width:16*32

  };
  
	loop = function(time_stamp) {
    tile_x = Math.floor(controller.pointer_x / (display.context.canvas.width/16));
    tile_y = Math.floor(controller.pointer_y / (display.context.canvas.height/9));
    value = map[tile_y * 16 + tile_x];
    display.render();
    display.buffer.fillStyle = "rgba(128, 128, 128, 0.5)";
    display.buffer.fillRect(tile_x * size, tile_y * size, size, size);
    display.context.drawImage(display.buffer.canvas, 0, 0, display.buffer.canvas.width, display.buffer.canvas.height, 0, 0, display.context.canvas.width, context.canvas.height);
    display.output.innerHTML = "tile_x: " + tile_x + "<br>tile_y: " + tile_y + "<br>value: " + value;
    window.requestAnimationFrame(loop);
  };
  
  
  
  
  
  
  display.tile_sheet.image.addEventListener("load", function(event) {

    display.buffer.canvas.height = layout.height;
    display.buffer.canvas.width  = layout.width;
    display.height_width_ratio   = layout.height / layout.width;

    display.resize();

  });
  display.tile_sheet.image.src = "tile-graphics2.png";
  window.addEventListener("resize", display.resize, {passive:true});
  display.context.canvas.addEventListener("mousemove", controller.move);
  display.context.canvas.addEventListener("touchmove", controller.move, {passive:true});
  display.context.canvas.addEventListener("touchstart", controller.move, {passive:true});
  display.context.canvas.addEventListener("click", groupTiles);
  display.resize();

  window.requestAnimationFrame(loop);

})();
function finishFloor() {
  window.open('Image.html');// open Image uploader
  window.close();// close editing window
}

function inputInfo(){
  if(grouping.head == null) alert("Please chose tiles to upload information")
  else {
    window.open('infoInput.html');
    window.close();
  }
}
