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
var database = firebase.database();
const auth = firebase.auth();

const loginForm = document.getElementsByClassName("login");
const registerButton = document.getElementById("registerButton");
registerButton.addEventListener("click", (e)=>{
    e.preventDefault();

    const email = document.getElementById("uname").value;
    const password = document.getElementById('pass').value;
    register(email,password);

})


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
function validate_pass(pass){
    if(pass < 6){
        alert("In validate pass = false");
        return false;

    }else {return true;
    }
}

//const auth = getAuth(firebaseConfig);
// auth.onAuthStateChanged(auth, user => {
//     if (user != null){
//         console.log('Logged in');
//
//     }else{
//         console.log('no user');
//     }
// });




