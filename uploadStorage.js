import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import {
  getStorage,
  ref,
  uploadBytes,
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

function uploadFilesToFirebase() {
  const fileInput = document.getElementById("fileInput").files[0];
  console.log(fileInput);

  const uploadTask = storageRef.child("application/" + fileInput.name).put(file);

  // Monitor upload progress
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Update progress bar
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById("uploadProgress").value = progress;
    },
    (error) => {
      // Handle upload error
      console.error("Upload error:", error);
    },
    () => {
      // Upload completed successfully
      console.log("Upload successful!");
    }
  );
}
// console.log(uid);
let upload = document.getElementById("click");
upload.addEventListener("click", uploadFilesToFirebase);
