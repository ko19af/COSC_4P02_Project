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
  }
  
  
  function submitMap(e) {
  	e.preventDefault();
  	var name = JSON.parse(sessionStorage.getItem("mInfo")).mName;
  	var map = JSON.parse(sessionStorage.getItem(name));
  	
  	saveMap(name, map);
  	window.open("Search.html");
  	window.close();
  }
  
  function loadMaps(e){
  	sessionStorage.clear();
  	contactFormDB = firebase.database().ref("Map/");
   let list = document.getElementById("buttons")// get html element for holding buttons
  
  	contactFormDB.on("child_added", function(data) {
  		data.forEach(function(data){
  		if(data.key != "name"){
  			map = (data.val());
  		}else{
  			var name = data.val();
  			const newDiv = document.createElement("div");
  			var p = document.createElement("p");
  			var x = document.createElement("BUTTON");// create button object
			var t = document.createTextNode("View: " + name);// attach button specefic text
			x.appendChild(t);// attach text to button
			x.addEventListener("click", function(){sessionStorage.setItem(name, JSON.stringify(map));
							        sessionStorage.setItem("mInfo", JSON.stringify({mName: name})); 
								window.open("Viewer.html"); 
								window.close();});// on click load map info
				p.appendChild(x);
  				
  				if (true) {// CHANGE TO CHECK FOR ADMIN LOGGED IN
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
					var admin2 = document.createElement("li");
					admin2.classList.add("dropdown");
					var a2 = document.createElement("a");
					a2.classList.add("dropdown");
					a2.appendChild(document.createTextNode("Admin"));
					a2.href = "javascript:void(0)";
					var ab2 = document.createElement("div");
					ab2.classList.add("dropdown-content")
					var b2 = document.createElement("BUTTON");
					b2.addEventListener("click", function() { sessionStorage.setItem("mInfo", JSON.stringify({mName:name,})); 
										sessionStorage.setItem(name, JSON.stringify(map)); 
										window.open("floorPreview.html"); 
										window.close();});
					b2.appendChild(document.createTextNode("Edit Map"));
					ab2.appendChild(b2);
					var b3 = document.createElement("BUTTON");
					b3.addEventListener("click", function() {deleteMuse(name);});
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
  
  const saveMap = (name, map) => {// NEED TO FIX DUPLICATION ISSUE!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  	var newContactForm = contactFormDB.push();
  	newContactForm.set({
  	      name : name,
  	      map : map,
  	});
  }
