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
  const functions = firebase.functions();
  // reference database
  var database = firebase.database();

  const cookie_Email = getemailFromCookie();
  const curr_adminStatus = checkAdminStatus();
	//logout();

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
				x.addEventListener("click", function(){
													var database = firebase.database();
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
					b2.addEventListener("click", function() {
														var database = firebase.database();
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
					b3.addEventListener("click", function() {
													   sessionStorage.setItem("mName", JSON.stringify(name));
													   deleteMap();});
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
	
	if(form.mName.value=="" || form.floors.value=="") alert("Required field is blank")// if required field is blank
	else if(form.floors.value < 1) alert("Floor limit not meet");// if floor limit is not meet
	else if(form.floors.value < 6) {// if floor limit is not exceeded
		firebase.database().ref("Map/"+form.mName.value).once("value").then(function(snapshot){// check if museum already exisits
   	if(snapshot.exists()) {// if museum exists
    		alert("Museum Already Exists");// alert user of the issue
    		sessionStorage.clear();// clear session storage
  	}else {// if museum does not already exists
  		sessionStorage.clear();
	        const museumMap = [];//create array for holding museumMap
        	museumMap[0] = {layout: [0], fInfo: [{eName:" ", location:" ",eEd: " ", floorNum: " ",eInfo: " ", tile: 0},], images: [""],};// initialize musuem map with info template
         	sessionStorage.setItem("rFloors", JSON.stringify(form.floors.value));// set what floor we are at in the input stage
         	sessionStorage.setItem(form.mName.value, JSON.stringify(museumMap));// initialize hash map to hold map data
         	sessionStorage.setItem("mInfo", JSON.stringify({mName: form.mName.value, numFloors: form.floors.value,}));// set map data in session storage
                window.open('floorPlan.html');// open next page
                window.close();// close window as it is no longer needed
  			}});
   }else {// if floor limit is exceeded
   	alert("Floor limit exceeded");// alert user limit is exceeded
   }
   event.preventDefault();
};


/// ------------------- LOGIN FUNCTIONS -------------------------------------------------------------------

/// -----------------ACTION LISTENERS ---------------------------------------------------------

// ------Register button action listener
const registerButton = document.getElementById("registerButton");
registerButton.addEventListener("click", (e)=>{  // LISTENS TO THE SIGN-UP BUTTON
	e.preventDefault();
	const email = document.getElementById("email").value;
	const password = document.getElementById('pass').value;
	register(email,password);

});

// ------Login button action listener
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", (e)=>{  // LISTENS TO THE SIGN IN BUTTON
	e.preventDefault();
	const email = document.getElementById("email").value;
	const password = document.getElementById('pass').value;
	login(email,password);


});
//--------SIGN OUT BUTTON LISTENER
const signOut = document.getElementById("signOutButton");
signOut.addEventListener("click", (e)=>{  // LISTENS TO THE SIGN IN BUTTON
	e.preventDefault();
	logout();
	location.reload();
	});

const adminForm = document.getElementById("add_admin")
adminForm.addEventListener('submit',(e) =>{
	e.preventDefault();
	const adminEmail = document.getElementById('admin-email').value;
	setAdminStatus(adminEmail)

})
const adminFormREMOVE = document.getElementById("rem_admin")
adminFormREMOVE.addEventListener('submit',(e) =>{
	e.preventDefault();
	const adminEmail = document.getElementById('admin-email').value;
	removeAdminStatus(adminEmail)

})
/// ------------------ACTION LISTENERS END ----------------------------------------

function setAdminStatus(user) {
	firebase.database().ref('users/' + user + "/adminStatus").set('1').catch((error) => {
		console.log(error)
	})
}

function removeAdminStatus(user) {
	firebase.database().ref('users/' + user + "/adminStatus").set('0').catch((error) => {
		console.log(error)
	})
}


function checkAdminStatus(){
	var curr_user = getemailFromCookie()
	var ref = firebase.database().ref('users/'+curr_user);
	ref.once('value').then(function (snapshot) {
		console.log("admin Status " + snapshot.val().adminStatus)
			return snapshot.val().adminStatus;

	});
}
function register(email,password) {

		var ref = firebase.database().ref('users/');
		ref.once('value').then(function (snapshot) {
			if (snapshot.exists()) {
				sessionStorage.setItem("Duplicate", JSON.stringify(true));
			} else {
				sessionStorage.setItem("Duplicate", JSON.stringify(false));
			}
		});

		if (JSON.parse(sessionStorage.getItem("Duplicate"))) {
			alert("Email Already Exists");
			sessionStorage.clear();
		} else {
			sessionStorage.clear();
			console.log("creating user..")
			const user = [];//create array for holding museumMap
			user[0] = {layout: [0], uInfo: [{email: " ", password: " ", adminStatus: "0"}]};// initialize musuem map with info template
			sessionStorage.setItem("email", JSON.stringify(email));// set what floor we are at in the input stage
			sessionStorage.setItem("pass", JSON.stringify(password));// set what floor we are at in the input stage
			sessionStorage.setItem(email, JSON.stringify(user));// initialize hash map to hold map data
			sessionStorage.setItem("uInfo", JSON.stringify({email: email, adminStatus: '0'}));
			document.cookie = "email=" + email;
			console.log("signed in as : ")
			console.log(document.cookie)

			firebase.database().ref('users/'+email).set({
				email: email,
				password: password,
				adminStatus: '0'
			}).catch((error) => {
				console.log(error)
			})


			// window.open('start.html');// open next page
			// window.close();// close window as it is no longer needed
		}

}


function login(email, password) {


			const userRef = firebase.database().ref('users/' + email)
			userRef.once('value').then(function (snapshot) {
				const user = snapshot.val().email;
				const pass = snapshot.val().password;
				const as = snapshot.val().adminStatus;
				//TODO: REMOVE THESE LOGS
				console.log("Email :" + user);
				console.log("Pass : " + pass)
				console.log("adminStatus :" + as)

				if (snapshot.exists()) {
					//TODO: CHECK IF PASSWORD IS MATCHING
					if (compareString(password, pass) === 0) {
						console.log("correct pass")
						//userRef.once('')
						document.cookie = "email=" + email;
						console.log("signed in as : ")
						console.log(document.cookie)

						if(snapshot.val().adminStatus ==='1'){
							console.log("status" +snapshot.val().adminStatus)
							document.getElementById("admin-actions").style.display = 'block'
						}
					} else {
						// password or email incorrect
						console.log("wrong pass")
					}
				} else {
					sessionStorage.setItem("Duplicate", JSON.stringify(false));
					alert("dne");
				}
			}).catch((error) => {
				//alert("2" + error)
			});



}


function compareString(inputPass,StoredPass){
	var result = inputPass.localeCompare(StoredPass)
	console.log(result);
	return result
}
function logout(){

	var x = getemailFromCookie();
	document.cookie = "email="+'';

	var t = getemailFromCookie()
	console.log(t);

}

function getemailFromCookie() {
	var allcookies = document.cookie;
	// Get all the cookies in the array
	cookiearray = allcookies.split(';');
	//take key value pair out of this array
	for(var i=0; i<cookiearray.length; i++) {
		name = cookiearray[i].split('=')[0];
		value = cookiearray[i].split('=')[1];
		return value; // returns email
	}
}
//
//
// /**
//  * Register function is used for creating new users in the database
//  * if the email already exists, the user will not be able to create a new account
//  * but will be logged in instead.
//  * @param email
//  * @param password
//  */
// function register(email,password){
//
// 	var acceptableName = ValidateName(email);
// 	var acceptablePass = validate_pass(password);
//
// 	if(acceptableName){
// 		if(acceptablePass){
// 			const auth = firebase.getAuth;
// 			firebase.auth().createUserWithEmailAndPassword(email,password)  // Creates a new user with given email/pass. checks if it exists or not first
// 				.then(function(){
// 					var user = auth.currentUser;
// 					var database_ref = database.ref();
// 					var user_data = {
// 						email : email,
// 						password : password,
// 						last_login : database.now()
// 					};
// 					alert("created user?");
// 					database_ref.child('users/' +user.uid).set(user_data);
// 				}).catch(function(error){
// 				//alert(error);
// 			})
// 		}else {
// 			alert("Password must be atleast 6 characters..")
// 		}
// 	}else {
// 		alert("Email does not follow format..")
// 	}
//
// } // register function
//
// /**
//  * Login function is used when the user submits their login information and clicks
//  * the "Sign in" button. This function will check the database for the user credentials and
//  * will then sign them in.
//  * Login function will then check the now logged in users permissions and
//  * display the corresponding webpage.
//  * @param email
//  * @param password
//  */
// function login(email,password){
// 	alert("in the login function");
// 	firebase.auth().signInWithEmailAndPassword(email, password)
// 		.then((userCredential) => {
// 			// Signed in
// 			const user = userCredential.user;
// 			alert("user" + user);
// 			alert("you have logged in!");
// 			alert("userName = " + userCredential.user.name);
// 			//TODO: ADD CREDENTIAL CHECKING
// 			getAuthStatus();
// 		})
// 		.catch((error) => {
// 			const errorCode = error.code;
// 			const errorMessage = error.message;
//
// 			alert("error code : " + errorCode + "error msg : "+ errorMessage);
// 		});
// };//login
//
// /**
//  * ValidateName will check if the entered Email is of an acceptable format
//  * ie something@email.com. if follows format, returns TRUE, Else returns FALSE.
//  * This function is used in the Register function.
//  * @param email
//  * @returns {boolean}
//  * @constructor
//  */
// function ValidateName(email){
// 	let expression = /^[^@]+@\w+(\.\w+)+\w$/
// 	if (expression.test(email) === true) {
// 		return true;
// 	}else{
// 		return false;
//
// 	}
// }
//
// /**
//  * this function is used to check if the password entered is longer than 6 characters or not
//  * used in the Register function
//  * @param pass
//  * @returns {boolean}
//  */
// function validate_pass(pass){
// 	return pass >= 6;
// }
//
//
// // listen for auth changes
// firebase.auth().onAuthStateChanged(user =>{
// 	console.log(user);
// })
