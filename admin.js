import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const newKey = "AIzaSyDvlSSduzGaNjaaYkSHTOdcVnlRBd39j5U";
const firebaseConfig = {
  apiKey: `${newKey}`,
  authDomain: "dimension01-7a7b4.firebaseapp.com",
  databaseURL:
    "https://dimension01-7a7b4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dimension01-7a7b4",
  storageBucket: "dimension01-7a7b4.appspot.com",
  messagingSenderId: "628507138263",
  appId: "1:628507138263:web:ac1eec54ae6207685d7892",
  measurementId: "G-LCQ4KW3JKY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const userInformation = ref(database, "UID");
let currentUID = localStorage.getItem("userID");
let verified = false;

onValue(userInformation, function (snapshot) {
  let uidObject = snapshot.val();
  for (const key in uidObject) {
    const value = uidObject[key];
    console.log(value);
    userVerification(currentUID, value);
  }
});

function adminVerify() {
  const queryParams = new URLSearchParams(window.location.search);
  const uid = queryParams.get("query");
}

function userVerification(currentUID, uidValue) {
  if (currentUID == uidValue) {
    verified = true;
  }
}
