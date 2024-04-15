import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import {
  getStorage,
  ref,
  listAll,
  getMetadata,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

localStorage.clear("userID");

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app);
const storageRef = ref(storage, "gs://dimension01-7a7b4.appspot.com");
const fileNames = [];
const fileURLs = [];

getFileData();

function getFileData() {
  // gets all data of file
  let j = 0;
  listAll(storageRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        console.log();
        fileNames.push(removeExtension(itemRef._location.path));

        webpageDOMName(fileNames, j);
        j++;
      });
    })
    .catch((error) => {
      console.log(error);
    });
  let i = 0;
  //gets URL of the file in storage
  listAll(storageRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef)
          .then((url) => {
            fileURLs.push(url);
            webpageDOM(fileURLs, i);
            i++;
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function webpageDOMName(fileNames, j) {
  let fileView = document.getElementById("files");
  fileView.innerHTML += `
    <a id="${fileNames[j]}" target="_blank"
    href=""><div class="header">
        <p class="name"> ${fileNames[j]}  </p>
        <div class="button">Open</div>
</div> </a>`;
}
function webpageDOM(fileURLs, i) {
  const fileID = document.getElementById(`${fileNames[i]}`);
  fileID.href = `${fileURLs[i]}`;
}



//fix file name
function removeExtension(filename) {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return filename.substring(0, lastDotIndex);
  } else {
    return filename;
  }
}

