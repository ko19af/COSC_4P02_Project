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
var map;// get floor layout from session storage

if(sessionStorage.getItem("modify")) {// if modifying map
	let mFloor = JSON.parse(sessionStorage.getItem("modify"));// get floor being modified
	let museName = JSON.parse(sessionStorage.getItem("mInfo")).mName;// get museum name
	map = JSON.parse(sessionStorage.getItem(museName))[mFloor].layout;// set map to layout being edited;// get museum info
} else {
	map = JSON.parse(sessionStorage.getItem("floorLayout"))// get floor layout from session storage
}


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
    
    	var img = document.createElement('img');
		if(map[index] == 0) {
			buffer.fillStyle = "#FFFFFF";
			buffer.fillRect((index % 16) * size, Math.floor(index/16) * size, size, size);
		} else if(map[index] == 1){
			buffer.fillStyle = "#000000";
			buffer.fillRect((index % 16) * size, Math.floor(index/16) * size, size, size);
		} else if(map[index] == 2){
			img.src = "https://firebasestorage.googleapis.com/v0/b/cosc-4p02-interactive-map.appspot.com/o/Images%2Fwashroom.png?alt=media&amp;token=93f5eefe-f50f-4d00-b61e-35aa1bbd3eb2";
			buffer.drawImage(img,(index % 16) * size, Math.floor(index/16) * size, size, size);
		}else if(map[index] == 3){
			img.src = "https://firebasestorage.googleapis.com/v0/b/cosc-4p02-interactive-map.appspot.com/o/Images%2Felevator.jpg?alt=media&amp;token=7f31bd3b-e822-4b29-8717-03f9ea022d08";
			buffer.drawImage(img,(index % 16) * size, Math.floor(index/16) * size, size, size);
		}else if(map[index] == 4){
			img.src = "https://firebasestorage.googleapis.com/v0/b/cosc-4p02-interactive-map.appspot.com/o/Images%2Fstairs.jpg?alt=media&amp;token=5ccb6d09-8c59-4aea-9d55-ef81b8421535";
			buffer.drawImage(img,(index % 16) * size, Math.floor(index/16) * size, size, size);
		}else if(map[index] == 5){
			img.src = "https://firebasestorage.googleapis.com/v0/b/cosc-4p02-interactive-map.appspot.com/o/Images%2FGiftShop.png?alt=media&amp;token=b81a92d6-0ec3-4ef9-b6cf-24df089a75f5";
			buffer.drawImage(img,(index % 16) * size, Math.floor(index/16) * size, size, size);
		}else if(map[index] == 6){
			img.src = "https://firebasestorage.googleapis.com/v0/b/cosc-4p02-interactive-map.appspot.com/o/Images%2Fcafeteria.png?alt=media&amp;token=13568169-a036-4639-bc9d-0cfde363bb56";
			buffer.drawImage(img,(index % 16) * size, Math.floor(index/16) * size, size, size);
		}else if(map[index] == 7){
			img.src = "https://firebasestorage.googleapis.com/v0/b/cosc-4p02-interactive-map.appspot.com/o/Images%2Faid.png?alt=media&amp;token=fc790edd-19e6-4e56-a1ba-fc7b0f106d26";
			buffer.drawImage(img,(index % 16) * size, Math.floor(index/16) * size, size, size);	
		}else if(map[index] == 8){
			buffer.fillStyle = "#0000FF";
      	buffer.fillRect((index % 16) * size, Math.floor(index/16) * size, size, size);
		}
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
  
  
  function groupTiles() {// allows a user select to tiles to add info to
  	const eInfo = {eName: " ", location: " ", eED: " ", floorNum: " ", eInfo: " ", tile: 0,};
  	var position = tile_x;// x-axis position on tile map
  	
  	for(var i = 0; i < tile_y; i++) {// for each row
  	   position += 16;// adjust position of tile
  	}
  	
  	if(map[position] == 1) {// if selected a wall tile
  		alert("invalid position to add info");// tell user can't write there
  	}else if(map[position] == 8) {// if selected an already choosen floor tile
  		grouping.removeAt(position);
  		restore = JSON.parse(sessionStorage.getItem("floorLayout"))// get floor layout from session storage
  		map[position] = restore[position];// restore original tile
  	}else {// if selected floor tile
  		eInfo.tile = position;// store tile that is being grouped
  		if(grouping.head == null) {// if grouping is empty
  			grouping.insertFirst(eInfo);
  		}else {// if grouping is not empty
  			grouping.insertAt(eInfo, position);// store tile in appropriate position
  		}
  		grouping.printListData();
  		map[position] = 8;
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
	window.location = 'Image.html'; // open Image uploader
	//window.open('Image.html');// open Image uploader
	//window.close();// close editing window
}

function inputInfo(){
	if(grouping.head == null) alert("Please chose tiles to upload information")
	else {
		window.location = 'infoInput.html';
		//window.open('infoInput.html');
		//window.close();
	}
}
