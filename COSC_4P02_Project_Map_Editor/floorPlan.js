var map;

if(sessionStorage.getItem("modify")) {// if modifying map
	let mFloor = JSON.parse(sessionStorage.getItem("modify"));// get floor being modified
	let museName = JSON.parse(sessionStorage.getItem("mInfo")).mName;// get museum name
	map = JSON.parse(sessionStorage.getItem(museName))[mFloor].layout;// set map to layout being edited;// get museum info
}else {
	map= [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
         1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
         1,0,1,1,0,1,1,0,1,1,1,0,1,1,1,1,
         1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,
         1,0,1,0,0,0,1,0,1,1,1,0,1,1,1,1,
         1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,1,
         1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,1,
         1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
         1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];//make generic map
} 
         
document.getElementById("floorPrompt").innerHTML = "Input Layout For Floor: " + JSON.parse(sessionStorage.getItem("rFloors"));

(function() {

  var buffer, context, controller, drawMap, loop, output, size, tile_x, tile_y, value;

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

      buffer.fillStyle = (map[index] == 0)?"#FFFFFF":"#000000";
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
  
  function changeColor() {
  	var position = tile_x;
  	for (var i = 0; i < tile_y; i++) {
  		position += 16;
  	}
  	if(map[position] == 1) {
  		map[position] = 0;
  	}else map[position] = 1;
  	drawMap();
  };

  window.addEventListener("resize", resize, {passive:true});
  context.canvas.addEventListener("mousemove", controller.move);
  context.canvas.addEventListener("touchmove", controller.move, {passive:true});
  context.canvas.addEventListener("touchstart", controller.move, {passive:true});
  context.canvas.addEventListener("click", changeColor);
  resize();

  window.requestAnimationFrame(loop);

})();

function submitFloor(){// submit floor plan to next stage of process
	var fNum;

	if(sessionStorage.getItem("modify")) fNum = JSON.parse(sessionStorage.getItem("modify"));
	else fNum = JSON.parse(sessionStorage.getItem("rFloors"));// get floor number
	
	
	let museName = JSON.parse(sessionStorage.getItem("mInfo")).mName;// get museum name
	let museumMap = JSON.parse(sessionStorage.getItem(museName));// get museum map
	
	museumMap[fNum] = {layout: map, fInfo: [{eName:" ", location:" ",eEd: " ", floorNum: " ", tile: 0},],};// store floor info into museum map
	sessionStorage.setItem(museName, JSON.stringify(museumMap));// set museum map into storage

	sessionStorage.setItem("floorLayout", JSON.stringify(map));// store floor layout info
	window.open('floorInfo.html');// open floor information loader page
	window.close();// close current page
}
