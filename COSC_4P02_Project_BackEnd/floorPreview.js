let museName = JSON.parse(sessionStorage.getItem("mInfo")).mName;// get the museum name
let museumMap = JSON.parse(sessionStorage.getItem(museName));// get the museum map
var map = museumMap[1].layout;// set the map data to the data in the first floor
var floor = 1;// initialize floor variable
sessionStorage.setItem("modify", JSON.stringify(1));// initialize modify floor to first floor

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
  
  function displayInfo() {// this function displays the info in a tile on the column
  	var position = tile_x;// x=axis position of tile
  	for (var i = 0; i < tile_y; i++) {// calculate y-position
  		position += 16;// determine which tile is being viewed
  	}
  	info = museumMap[floor].fInfo[position]// get info on tile from museumMap
  	list = document.getElementById("info");// get html element for viewing info
  	list.innerHTML = "";// clear info paragraph
  	
  	for(let x in info) {// load info from array into paragraph
  		if(x != "tile") {
  			var para;// create paragraph object
  			
  			if(x == "eED") {
  				para = document.createElement("p");
  				para.innerText = "Exhibit End Date: \n" + info[x];// fill it with the info
  			} else if (x == "eName"){
  				para = document.createElement("p");
  				para.innerText = "Exhibit Name: \n" + info[x];
  			} else if (x == "floorNum"){
  				para = document.createElement("p");
  				para.innerText = "Floor: " + info[x];
  			} else if (x == "eInfo") {
  				para = document.createElement("div");
  				para.innerText = "Exhibt Info: \n" + info[x];
  				para.classList.add("ex3");
  			} else {
  				para = document.createElement("p");
  				para.innerText = x + ": " + info[x];
  			}
  			
 			list.appendChild(para);// append it to info column
  		}		
  	}
  };

  window.addEventListener("resize", resize, {passive:true});
  context.canvas.addEventListener("mousemove", controller.move);
  context.canvas.addEventListener("touchmove", controller.move, {passive:true});
  context.canvas.addEventListener("touchstart", controller.move, {passive:true});
  context.canvas.addEventListener("click", displayInfo);
  resize();

  window.requestAnimationFrame(loop);

})();

function loadMuseData(){

	let list = document.getElementById("buttons")// get html element for holding buttons
	for (let value = 1; value <= (museumMap.length)-1; value++) {// needs to be altered to add buttons for all floors
		const newDiv = document.createElement("div");
		var x = document.createElement("BUTTON");// create button object
		x.classList.add("buttonC");
		var t = document.createTextNode("View Floor " + (value));// attach button specefic text
		x.appendChild(t);// attach text to button
		x.addEventListener("click", function() {map = museumMap[value].layout; 
															 sessionStorage.setItem("modify", JSON.stringify(value));
															 document.getElementById("hereBeImages").innerHTML = "";
															 floor = value; displayImages();});// set which floor is being modified});// attach function to load map on button click
		newDiv.appendChild(x);
		list.appendChild(newDiv);//append button to list of buttons
	}
	
	displayImages();
}

function displayImages(){
	let name = JSON.parse(sessionStorage.getItem("mInfo")).mName;
  	let museumMap = JSON.parse(sessionStorage.getItem(name));
  	let imgs = museumMap[floor].images;
  			
  	for(let x = 0; x < imgs.length; x++){
  		var modal = document.getElementById("myModal");
  		var modalImg = document.getElementById("img01");
  		let newimg = document.createElement("img");
  			
  		newimg.src = imgs[x];
  		newimg.setAttribute("id", "myImg2")
  		newimg.style = "width:100%;max-width:150px";
  		newimg.onclick = function() {
  			modal.style.display = "block";
  			modalImg.src = imgs[x];
  		}
  				
  		var span = document.getElementsByClassName("close")[0];
  		span.onclick = function(){
  			modal.style.display = "none";
  		}
  		document.getElementById("hereBeImages").appendChild(newimg);
  	}
}

function changeLayout() {
	window.open("floorPlan.html");// open floor editor
	window.close();// close window
}

function changeInfo() {
	window.open("floorInfo.html");// open floor information editor
	window.close();// close window
}

function finished() {// need database interaction code
	sessionStorage.clear();// clear session storage so it does not interfere with anything else
	window.open("Search.html");
	window.close();
}
