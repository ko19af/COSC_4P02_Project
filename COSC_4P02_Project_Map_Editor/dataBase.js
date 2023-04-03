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
  
  document.getElementById("finish").addEventListener("click", submitMap);
  
  function submitMap(e) {
  	e.preventDefault();
  	var name = JSON.parse(sessionStorage.getItem("mInfo")).mName;
  	var map = JSON.parse(sessionStorage.getItem(name));
  	
  	saveMap(name, map);
  	
  }
  
  const saveMap = (name, map) => {
  	var newContactForm = contactFormDB.push();
  	
  	newContactForm.set({
  	      name : name,
  	      map : map,
  	});
  }
  
  