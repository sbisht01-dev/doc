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

function getFileData() {
  // gets all data of file
  listAll(storageRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        console.log();

        fileNames.push(removeExtension(itemRef._location.path));
      });
    })
    .catch((error) => {
      console.log(error);
    });

  //gets URL of the file in storage
  listAll(storageRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef)
          .then((url) => {
            fileURLs.push(url);
            // console.log(fileURLs);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      });
    })
    .then(() => {
      webpageDOM();
      for (const element of fileURLs) {
        console.log(element);
      }
      console.log("DOM");
      // if(){}
    })
    .catch((error) => {
      console.log(error);
    });
}
function webpageDOM() {
  console.log(fileNames);
  let fileView = document.getElementById("files");
  for (let i = 0; i < fileNames.length; i++) {
    fileView.innerHTML += `
    <a target="_blank"
    href="${fileURLs[i]}"><div class="header">
        <p class="name"> ${fileNames[i]}  </p>
        <div class="button">Open</div>
</div> </a>`;
  }
}
function downloadFiles() {
  //puts the file on the DOM and the respective link to download it
}

getFileData();

//fix file name
function removeExtension(filename) {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return filename.substring(0, lastDotIndex);
  } else {
    return filename;
  }
}
