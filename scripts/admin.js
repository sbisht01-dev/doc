import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

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
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const storageRef = ref(storage, "gs://dimension01-7a7b4.appspot.com");
const fileNames = [];
const fileURLs = [];

// This function retrieves data from the Firebase Storage and
// populates the webpage with the file names and their corresponding download URLs.
function getFileData() {
  // gets all data of file
  let j = 0;
  listAll(storageRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
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
            window.location.reload();
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
// This function dynamically generates HTML elements for each file name and
// appends them to the DOM. It creates an anchor tag (<a>) with the file name as its ID.
function webpageDOMName(fileNames, j) {
  let fileView = document.getElementById("files");
  fileView.innerHTML += `
    <a id="${fileNames[j]}" target="_blank"
    href=""><div class="header">
        <p class="name"> ${fileNames[j]}  </p>
        <div class="button">Open</div>
</div> </a>`;
}

// Updates the href attribute of anchor tags with download URLs.
function webpageDOM(fileURLs, i) {
  const fileID = document.getElementById(`${fileNames[i]}`);
  const fileNameWithoutExtension = decodeURIComponent(
    fileURLs[i].substring(
      fileURLs[i].lastIndexOf("/") + 1,
      fileURLs[i].indexOf("?")
    )
  ).replace(/\.[^.]+$/, "");

  const filesContainer = document.getElementById("files");

  const anchorTags = filesContainer.querySelectorAll("a");

  // Iterate over each anchor tag and update the href of the matching one
  anchorTags.forEach((anchorTag) => {
    if (anchorTag.id === fileNameWithoutExtension) {
      anchorTag.href = fileURLs[i];
    }
  });
}

//Removes file extensions from filenames.
function removeExtension(filename) {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return filename.substring(0, lastDotIndex);
  } else {
    return filename;
  }
}
// Signs out the current user and redirects to the signin page.
function logoutUser() {
  auth
    .signOut()
    .then(() => {
      // Sign-out successful, redirect to the signin page
      window.location.reload();
      window.location.href = "signin.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
}

let loginBtn = document.getElementById("logout");
loginBtn.addEventListener("click", logoutUser);

// Function to check authentication state
function checkAuthentication() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const currentUser = document.getElementById("user");
      currentUser.innerText = `${user.email}`;
      // User is authenticated, Page data will load in the DOM
      getFileData(); 
    } else {
      // User is not authenticated, redirect to the signin page. No direct admin page load
      window.location.href = "signin.html";
    }
  });
}
checkAuthentication();
