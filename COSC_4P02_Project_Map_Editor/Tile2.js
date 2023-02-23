(function() {

  var buffer, context, controller, drawMap, loop, map, output, size, tile_x, tile_y, value;
  const info = new Map();
  
  buffer = document.createElement("canvas").getContext("2d");
  context = document.querySelector("canvas").getContext("2d");
  output = document.querySelector("p");

  size = 32;

  buffer.canvas.width = 16 * size;
  buffer.canvas.height = 9 * size;

  map = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
         1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
         1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,
         1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,
         1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,
         1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,
         1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
         1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,
         1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

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
  
  function groupTiles() {// this function lets a user select the tiles they will add info to
  var position = tile_x;// store tiles x-position
  for (var i = 0; i < tile_y; i++) {// for every row
   position += 16;//add 16 tiles to adjust position in array
  }
  
  if(map[position] == 1){// if select wall
  	alert("invlaid position to add info");// tell user cant add info
  }
  
  else {// if select are that is not wall
  	info.set(position, position);// let user add info to area
  	alert(info.get(position));
  }
  };

  window.addEventListener("resize", resize, {passive:true});
  context.canvas.addEventListener("mousemove", controller.move);
  context.canvas.addEventListener("touchmove", controller.move, {passive:true});
  context.canvas.addEventListener("touchstart", controller.move, {passive:true});
  context.canvas.addEventListener("click", groupTiles);
  resize();

  window.requestAnimationFrame(loop);

})();