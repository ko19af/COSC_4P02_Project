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

const grouping = new LinkedList();// create linked list for storing grouped tiles
const info = new Map();// create map to hold data associated with a tile
var map = JSON.parse(sessionStorage.getItem("floorLayout"))// get floor layout from session storage
var tile_x;// make tile_x variables global

(function() {

  var buffer, context, controller, drawMap, loop, output, size, tile_y, value;
  
  buffer = document.createElement("canvas").getContext("2d");
  context = document.querySelector("canvas").getContext("2d");
  output = document.querySelector("p");

  size = 32;

  buffer.canvas.width = 16 * size;
  buffer.canvas.height = 9 * size;

  controller = {

    // mouse or finger position
    pointer_x:0,
    pointer_y:0,
    move:function(event) {
      // This will give us the location of our canvas element on screen
      var rectangle = context.canvas.getBoundingClientRect();
      // store the position of the move event inside the pointer variables
      controller.pointer_x = event.clientX - rectangle.left;
      controller.pointer_y = event.clientY - rectangle.top;
    }
  };

  drawMap = function() {
    for (let index = 0; index < map.length; index ++) {
      let color;
      if(map[index] == 0) color = "#FFFFFF";
      else if(map[index] == 1) color = "#000000";
      
      //gather location information from infoInput
      //test with bathroom icon
      //var data = https://images.freeimages.com/fic/images/icons/2219/dot_pictograms/256/toilets.png
      //var temp = context.canvas.getContext("2d");
      //document.getElementById("icon").src = data;
      //var image = document.getElementById("icon");
      //var fill = context.canvas.createPattern(image,"no-repeat");
      //buffer.fillStyle = fill;
      
      else color = "#0000FF";
      buffer.fillStyle = color;
      buffer.fillRect((index % 16) * size, Math.floor(index/16) * size, size, size);
    }
  };

  loop = function(time_stamp) {
    tile_x = Math.floor(controller.pointer_x / (context.canvas.width/16));
    tile_y = Math.floor(controller.pointer_y / (context.canvas.height/9));
    value = map[tile_y * 16 + tile_x];
    drawMap();
    buffer.fillStyle = "rgba(128, 128, 128, 0.5)";
    buffer.fillRect(tile_x * size, tile_y * size, size, size);
    context.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, context.canvas.width, context.canvas.height);
    output.innerHTML = "tile_x: " + tile_x + "<br>tile_y: " + tile_y + "<br>value: " + value;
    window.requestAnimationFrame(loop);
  };

  // just keeps the canvas element sized appropriately
  resize = function(event) {
    context.canvas.width = Math.floor(document.documentElement.clientWidth - 32);
    if (context.canvas.width > document.documentElement.clientHeight) {
      context.canvas.width = Math.floor(document.documentElement.clientHeight);
    }
    context.canvas.height = Math.floor(context.canvas.width * 0.5625);
    drawMap();
  };
  
  
  function groupTiles() {// allows a user select to tiles to add info to (ADD ability to remove tiles already selected)
  	const eInfo = {eName: " ", location: " ", eED: " ", floorNum: " ", tile: 0,};
  	var position = tile_x;// x-axis position on tile map
  	
  	for(var i = 0; i < tile_y; i++) {// for each row
  	   position += 16;// adjust position of tile
  	}
  	
  	if(map[position] == 1) {// if selected a wall tile
  		alert("invalid position to add info");// tell user can't write there
  	}else if(map[position] == 2) {// if selected an already choosen floor tile
  		grouping.removeAt(position);
  		map[position] = 0;
  	}else {// if selected floor tile
  		eInfo.tile = position;// store tile that is being grouped
  		if(grouping.head == null) {// if grouping is empty
  			grouping.insertFirst(eInfo);
  		}else {// if grouping is not empty
  			grouping.insertAt(eInfo, position);// store tile in appropriate position
  		}
  		grouping.printListData();
  		map[position] = 2;
  	}
  	
  	sessionStorage.setItem("group", JSON.stringify(grouping));// make accessible to other pages
  	drawMap();
  };

  window.addEventListener("resize", resize, {passive:true});
  context.canvas.addEventListener("mousemove", controller.move);
  context.canvas.addEventListener("touchmove", controller.move, {passive:true});
  context.canvas.addEventListener("touchstart", controller.move, {passive:true});
  context.canvas.addEventListener("click", groupTiles);
  resize();

  window.requestAnimationFrame(loop);

})();

function finishFloor() {
	let fNum = JSON.parse(sessionStorage.getItem("rFloors"));// get numner of floors
	fNum = fNum - 1;// decrease count
	
	if(fNum <= 0) {// if nu o more floors to add
		window.open('floorPreview.html');// open prevew page to view built map
		window.close();// close current window
	}else {// if still more floors to add
		sessionStorage.setItem("rFloors",JSON.stringify(fNum));// set new floor count
		window.open('floorPlan.html')// open floor planner page
		window.open("floorPlan.html");
		window.close();// close window
	}
}

function inputInfo(){
	window.open('infoInput.html');
	window.close();
}
