import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

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
//var database = firebase.database();

const registerButton = document.getElementById("registerButton");
registerButton.addEventListener("click", (e)=>{
    e.preventDefault();
    firebase.initializeApp(firebaseConfig);


    const email = document.getElementById("uname").value;
    const password = document.getElementById('pass').value;
    login(email,password);

});

function login(email,password){
    alert("in the login function");
    const auth = firebase.getAuth;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert("you have logged in!");
            alert("userName = " + userCredential.user.name);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("error code : " + errorCode + "error msg : "+ errorMessage);
        });
}

function register(email,password){
   // const auth = getAuth(app);

    if (ValidateName(email) === false || validate_pass(password) === false){

    }

    const auth = firebase.getAuth;
firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(function(){
            var user = auth.currentUser;
            var database_ref = database.ref();

            var user_data = {
                email : email,
                password : password,
                last_login : database.now()

            };
            alert("created user?");

            database_ref.child('users/' +user.uid).set(user_data);

        }).catch(function(error){
            alert(error);
    })

}

function ValidateName(email){
  let expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) === true) {
        return true;
    }else{
        alert("email not okay")
        return false;

    }
}

/**
 * this function is used to check if the password entered is longer than 6 characters or not
 * used in the Register function
 * @param pass
 * @returns {boolean}
 */
function validate_pass(pass){
    return pass >= 6;
}





