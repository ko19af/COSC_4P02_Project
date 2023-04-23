const firebaseConfig = {
    apiKey: "AIzaSyDXoy8ml8_5D42UunRfP4mGr5Soi5psjlw",
    authDomain: "cosc-4p02-interactive-map.firebaseapp.com",
    databaseURL: "https://cosc-4p02-interactive-map-default-rtdb.firebaseio.com",
    projectId: "cosc-4p02-interactive-map",
    storageBucket: "cosc-4p02-interactive-map.appspot.com",
    messagingSenderId: "1004343153704",
    appId: "1:1004343153704:web:a011fe90aec519845e511d",
    measurementId: "G-P0LB44W86S"
  };
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference database
  var database = firebase.database();
  
  if(document.getElementById("finish")){
  	document.getElementById("finish").addEventListener("click", submitMap);
  }
  
  
  function submitMap(e) {
  	e.preventDefault();
  	var name = JSON.parse(sessionStorage.getItem("mInfo")).mName;// get map name from storage
  	var map = JSON.parse(sessionStorage.getItem(name));// get map info from storage
  	
  	if(JSON.parse(sessionStorage.getItem("update"))) {// if update is true in session storage
  		database.ref("Map/" + name).update({
  			map : map,});
  		alert("map updated");
  		sessionStorage.clear();// clear session storage
  	}else {// if not updating map info
  		database.ref("Map/" + name).set({
  	      name : name,
  	      map : map,
  		});
  		alert("Map saved");
  	}
  	window.open("Search.html");//open search (main) page
  	window.close();// close window
  }
  
  function deleteMap(e) {
  	var name = JSON.parse(sessionStorage.getItem("mName"));
  	database = firebase.database();
  	
  	database.ref("Map/" + name).remove();// reference data being removed and remove it
  	
  	alert("Musueum map " + name + " removed");// alert user museum was removed
  	sessionStorage.clear();
  	location.reload();// reload page so ot reflects change to database
  }
  
  function loadMaps(e){
  	sessionStorage.clear();
  	database = firebase.database().ref("Map/");
   let list = document.getElementById("buttons")// get html element for holding buttons
  
  if(true) {// CHANGE TO CHECK IF ADMIN LOGGED IN
  		var nb = document.getElementById("navbar");
		var admin = document.createElement("li");
		admin.classList.add("dropdown");
		var a = document.createElement("a");
		a.classList.add("dropdown");
		a.appendChild(document.createTextNode("Admin"));
		a.href = "javascript:void(0)";
		var ab = document.createElement("div");
		ab.classList.add("dropdown-content")
		var b1 = document.createElement("a");
		b1.href = "Start.html";
		b1.appendChild(document.createTextNode("Add Map"));
		ab.appendChild(b1);
		admin.append(a);
		admin.append(ab);
		nb.appendChild(admin);
  }

  	database.on("child_added", function(data) {
  		data.forEach(function(data){
  		if(data.key == "name"){
  				var name = data.val();
  				const newDiv = document.createElement("div");
  				var p = document.createElement("p");
  				var x = document.createElement("BUTTON");// create button object
				var t = document.createTextNode("View: " + name);// attach button specefic text
				x.appendChild(t);// attach text to button
				x.classList.add("buttonC");
				x.addEventListener("click", function(){var database = firebase.database();
								        var user_ref = database.ref('Map/' + name);// reference specfic map entry in database
									user_ref.on('value', function(snapshot) {// get snap shot of data from database
									var data = snapshot.val();// get javascript value of snapshot
									sessionStorage.setItem(name, JSON.stringify(data.map));// store map in local storage
									sessionStorage.setItem("mInfo", JSON.stringify({mName: name}));// store map name in loacal storage
									window.open("Viewer.html");// open map viewer
									window.close();// close search window
									});
								})// on click load map info														
				p.appendChild(x);
  
  				if (true) {// CHANGE TO CHECK FOR ADMIN LOGGED IN
					var admin2 = document.createElement("li");
					admin2.classList.add("dropdown");
					var a2 = document.createElement("a");
					a2.classList.add("dropdown");
					a2.appendChild(document.createTextNode("Admin"));
					a2.href = "javascript:void(0)";
					var ab2 = document.createElement("div");
					ab2.classList.add("dropdown-content");
					var b2 = document.createElement("BUTTON");
					b2.classList.add("buttonC");
					b2.classList.add("buttonC");
					b2.addEventListener("click", function() {var database = firebase.database();
										var user_ref = database.ref('Map/' + name);// reference specfic map entry in database
										user_ref.on('value', function(snapshot) {// get snap shot of data from database
											var data = snapshot.val();// get javascript value of snapshot
											sessionStorage.setItem(name, JSON.stringify(data.map));// store map in local storage
											sessionStorage.setItem("mInfo", JSON.stringify({mName:name,})); // store map name in loacal storage
										});
										sessionStorage.setItem("update", JSON.stringify(true));
										window.open("floorPreview.html"); 
										window.close();
										});
					b2.appendChild(document.createTextNode("Edit Map"));
					ab2.appendChild(b2);
					var b3 = document.createElement("BUTTON");
					b3.classList.add("buttonC");
					b3.addEventListener("click", function() {sessionStorage.setItem("mName", JSON.stringify(name));
										 deleteMap();
										 });
					b3.appendChild(document.createTextNode("Delete"));
					ab2.appendChild(b3);
					admin2.appendChild(a2);
					admin2.appendChild(ab2);
					p.appendChild(admin2);
					}
				
				newDiv.appendChild(p);
				list.appendChild(newDiv);//append button to list of buttons
  			}
  		});	
	});
  }
  
function begin(form) {// This function check if a map already exists on the firebase storage

	database = firebase.database().ref("Map/");// create reference to firebase database
	database.on("child_added", function(data) {
  		data.forEach(function(data){// for each piece of data in the database
  		if(data.key == "name" && data.val() == mName){// if looking at the name key and has the same name as museum being added
  				sessionStorage.setItem("noDuplicate", "");// set no duplicate to false
  				return true;// break out of loop
  			}
  		});	
	});
	
	if(!sessionStorage.getItem("noDuplicate")) {
		sessionStorage.clear();
		const museumMap = [];//create array for holding museumMap
		museumMap[0] = {layout: [0], fInfo: [{eName:" ", location:" ",eEd: " ", floorNum: " ",eInfo: " ", tile: 0},], images: [],};// initialize musuem map with info template
		sessionStorage.setItem("rFloors", JSON.stringify(form.floors.value));// set what floor we are at in the input stage
		sessionStorage.setItem(form.mName.value, JSON.stringify(museumMap));// initialize hash map to hold map data
		sessionStorage.setItem("mInfo", JSON.stringify({mName: form.mName.value, numFloors: form.floors.value,}));
		window.open('floorPlan.html');
		window.close();
	} else {
		alert("Museum already Exist");
		sessionStorage.clear();
	}
};
