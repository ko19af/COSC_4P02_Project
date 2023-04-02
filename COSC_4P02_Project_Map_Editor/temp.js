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
		while( previous.next != null && current.data.tile < tile) {
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
const info = new Map();// create hash map
var map, tile_x;// make map and tile_x variables global

(function() { 

  
  var display, layout, controller, loop;
  size = 32;
  
  
  display = {

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
        var source_x = (value % this.tile_sheet.columns) * this.tile_sheet.tile_width;
        var source_y = Math.floor(value / this.tile_sheet.columns) * this.tile_sheet.tile_height;
      
        var destination_x = (index % layout.columns) * this.tile_sheet.tile_width;
        var destination_y = Math.floor(index / layout.columns) * this.tile_sheet.tile_height;

        this.buffer.drawImage(this.tile_sheet.image, source_x, source_y, this.tile_sheet.tile_width, this.tile_sheet.tile_height, destination_x, destination_y, this.tile_sheet.tile_width, this.tile_sheet.tile_height);

      }
 
      this.context.drawImage(this.buffer.canvas, 0, 0, layout.width, layout.height, 0, 0, this.context.canvas.width, this.context.canvas.height);

    },

    
    resize:function(event) {

      display.context.canvas.width = document.documentElement.clientWidth - 16;
      if (display.context.canvas.width > document.documentElement.clientHeight - 16) {
        display.context.canvas.width = document.documentElement.clientHeight - 16;
      }
      display.context.canvas.height = display.context.canvas.width * display.height_width_ratio;
      display.buffer.imageSmoothingEnabled = display.context.imageSmoothingEnabled = false;
      display.render();

    }
  };
  controller = {

    // mouse or finger position
    pointer_x:0,
    pointer_y:0,
    move:function(event) {
      // This will give us the location of our canvas element on screen
      var rectangle = display.context.canvas.getBoundingClientRect();
      // store the position of the move event inside the pointer variables
      controller.pointer_x = event.clientX - rectangle.left;
      controller.pointer_y = event.clientY - rectangle.top;
    }
  };
  function groupTiles() {// allows a user select to tiles to add info to (ADD ability to remove tiles already selected)
  	const eInfo = {eName: " ", location: " ", eED: " ", floorNum: " ", tile: 0,};
  	var position = tile_x;// x-axis position on tile map
  	for(var i = 0; i < tile_y; i++) {// for each row
  	   position += 16;// adjust position of tile
  	}
  	if(layout.map[position] == 1) {// if selected a wall tile
  		alert("invalid position to add info");// tell user can't write there
  	}else if(layout.map[position] == 2) {// if selected an already choosen floor tile
  		grouping.removeAt(position);
  		layout.map[position] = 0;
  	}else {// if selected floor tile
  		eInfo.tile = position;// store tile that is being grouped
  		if(grouping.head == null) {// if grouping is empty
  			grouping.insertFirst(eInfo);
  		}else {// if grouping is not empty
  			grouping.insertAt(eInfo, position);// store tile in appropriate position
  		}
  		grouping.printListData();
  		layout.map[position] = 2;
  	}
  	display.render();
  };
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
function submitInfo(form) {//collect information from form and store to associated tiles	
var value= document.getElementsByName('wing');// create array holding radio buttons
var wing;// create varialbe to hold value of selected radio button
for (var radio of value){// go through all of the radio buttons
if (radio.checked) {// if button was checked
wing = radio.value;// collect value
break;// exit search
}
}
if(wing == null) alert("Please sleect wing");
else alert(form.eName.value  + " " + form.endDate.value + " " + form.floor.value + " " + wing);
};