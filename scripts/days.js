import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  get,
  set,
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
const calendar = ref(database, "Calendar");

onValue(calendar, function (snapshot) {
  let calendarVal = snapshot.val();
  console.log(calendarVal);
  for (const key in calendarVal) {
    const value = calendar[key];
    console.log(value);
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
