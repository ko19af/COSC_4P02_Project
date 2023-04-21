import {
    initializeApp
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
const firebaseApp =initializeApp( {
    apiKey: "AIzaSyDXoy8ml8_5D42UunRfP4mGr5Soi5psjlw",
    authDomain: "cosc-4p02-interactive-map.firebaseapp.com",
    databaseURL: "https://cosc-4p02-interactive-map-default-rtdb.firebaseio.com",
    projectId: "cosc-4p02-interactive-map",
    storageBucket: "cosc-4p02-interactive-map.appspot.com",
    messagingSenderId: "1004343153704",
    appId: "1:1004343153704:web:a011fe90aec519845e511d",
    measurementId: "G-P0LB44W86S"
  });

let loginForm = document.getElementsByClassName("login");
const loginButton = document.getElementById("Login_submit");
loginButton.addEventListener("click", (e)=>{
    e.preventDefault();

    let userName = document.getElementById("uname");
    let pass = document.getElementById('pass');
    console.log();
    alert('username : '+ userName.value);
    alert('pass : '+ pass.value);
})

const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, user => {
    if (user != null){
        console.log('Logged in');
    
    }else{
        console.log('no user');
    }
});




