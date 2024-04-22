import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  push,
  update,
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

function showDatabase() {
  onValue(calendar, function (snapshot) {
    let calendarVal = snapshot.val();
    console.log(calendarVal);
    for (const key in calendarVal) {
      console.log(calendarVal[key]);
    }
  });
}

function setHolidays() {
  console.log("set");
  //set data onto a node named calendar either update or create the node if not already present
  set(ref(database, "Calendar/" + "Ram Navmi"), {
    Date: "12/06/2024",
    Type: "G",
  });
  showDatabase();
}

showDatabase();
