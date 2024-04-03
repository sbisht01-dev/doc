const firebaseConfig = {
  apiKey: "AIzaSyDvlSSduzGaNjaaYkSHTOdcVnlRBd39j5U",
  authDomain: "dimension01-7a7b4.firebaseapp.com",
  projectId: "dimension01-7a7b4",
  storageBucket: "dimension01-7a7b4.appspot.com",
  messagingSenderId: "628507138263",
  appId: "1:628507138263:web:ac1eec54ae6207685d7892",
  measurementId: "G-LCQ4KW3JKY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = firebase.auth();
const database = firebase.database();

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (emailPattern.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function register() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  if (validateEmail(email) == false) {
    alert("Email format is wrong");
    return;
  }

  if (validateEmail(email) == true) {
    alert("Email format is wrong");
    return;
  }
}

//login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            console.log('User logged in:', user);
            // Redirect to another page or perform further actions here
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in:', errorMessage);
        });
}