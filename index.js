import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvlSSduzGaNjaaYkSHTOdcVnlRBd39j5U",
  authDomain: "dimension01-7a7b4.firebaseapp.com",
  databaseURL:
    "https://dimension01-7a7b4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dimension01-7a7b4",
  storageBucket: "dimension01-7a7b4.appspot.com",
  messagingSenderId: "628507138263",
  appId: "1:628507138263:web:ac1eec54ae6207685d7892",
  measurementId: "G-LCQ4KW3JKY",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

let button = document.getElementById("button");
let a = 2;
//eventlistener
button.addEventListener("click", function getDataFromUser() {
  // console.log("load");
  let userMail = document.getElementById("email");
  let userMailValue = userMail.value; //email
  let userPassword = document.getElementById("password");
  let userPasswordValue = userPassword.value; //pass
  console.log(userPasswordValue);
  signInWithEmailAndPassword(auth, userMailValue, userPasswordValue)
    .then((userCredential) => {
      // Signed in
      console.log(userMailValue, userPasswordValue);
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});
