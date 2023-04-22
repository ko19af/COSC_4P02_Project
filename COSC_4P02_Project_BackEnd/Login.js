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


import {
    initializeApp
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

// reference database

const loginForm = document.getElementsByClassName("login");
const registerButton = document.getElementById("registerButton");
registerButton.addEventListener("click", (e)=>{
    e.preventDefault();
    alert("registered button");

    const userName = document.getElementById("uname").value;
    const pass = document.getElementById('pass').value;
    register(userName,pass);

})

function register(userName,pass){
    const auth = getAuth(firebaseApp);

    var database = firebase.database();
    if (ValidateName(userName) === false || validate_pass(pass) === false){

    }
    auth.createUserWithEmailAndPassword(userName,pass)
        .then(function(){
            var user = auth.currentUser;
            var database_ref = database.ref();

            var user_data = {
                userName : email,
                pass : password,
                last_login : database.now()
            }

            database_ref.child('users/' +user.uid).set(user_data);

        }).catch(function(error){
            alert("error");
    })

}

function validate(email){
  let expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
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

const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, user => {
    if (user != null){
        console.log('Logged in');
    
    }else{
        console.log('no user');
    }
});




