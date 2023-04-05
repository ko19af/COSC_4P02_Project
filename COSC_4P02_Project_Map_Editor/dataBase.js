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
  var contactFormDB = firebase.database().ref("Map");
  
  if(document.getElementById("finish")){
  	document.getElementById("finish").addEventListener("click", submitMap);
  }else {
  	document.getElementById("searchForm").addEventListener("submit", loadMaps);
  }
  
  
  function submitMap(e) {
  	e.preventDefault();
  	var name = JSON.parse(sessionStorage.getItem("mInfo")).mName;
  	var map = JSON.parse(sessionStorage.getItem(name));
  	
  	saveMap(name, map);
  	window.close();
  }
  
  function loadMaps(e){// NEEDS WORK!!!!!!
  	contactFormDB = firebase.database().ref("Map/");
  let list = document.getElementById("buttons")// get html element for holding buttons
  
  	contactFormDB.on("child_added", function(data) {
  		data.forEach(function(data){
  		if(data.key != "name"){
  			map = (data.val());
  		}else{
  				var name = data.val();
  				const newDiv = document.createElement("div");
  				var x = document.createElement("BUTTON");// create button object
				var t = document.createTextNode("View: " + name);// attach button specefic text
				x.appendChild(t);// attach text to button
				x.addEventListener("click", function(){sessionStorage.setItem(name, JSON.stringify(map));
								       sessionStorage.setItem("mInfo", JSON.stringify({mName: name})); 
								       window.open("Viewer.html"); 
								       window.close();});// on click load map info
				newDiv.appendChild(x);
				list.appendChild(newDiv);//append button to list of buttons
  			} 
  		});	
	});
  }
  
  const saveMap = (name, map) => {
  	var newContactForm = contactFormDB.push();
  	newContactForm.set({
  	      name : name,
  	      map : map,
  	});
  }
