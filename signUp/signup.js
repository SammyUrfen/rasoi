// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAodkFYZe0HeRqUJq9CYatff5Ixe9MfJas",
  authDomain: "scaler-canteen-d362b.firebaseapp.com",
  projectId: "scaler-canteen-d362b",
  storageBucket: "scaler-canteen-d362b.appspot.com",
  messagingSenderId: "786619487227",
  appId: "1:786619487227:web:41b0bb07145e889eda715e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const databaseRef = ref(database, "users");

document.getElementById("sign-up-button").addEventListener("click", (e) => {
  e.preventDefault();
  const phoneNum = document.getElementById("PhoneNum").value;
  const password = document.getElementById("Password").value;
  const name = document.getElementById("Name").value;
  if (phoneNum == "" || password == "") {
    alert("Please Enter Phone Number and Password");
  } else {
    get(ref(database, "users/" + phoneNum))
      .then((snapshot) => {
        if (snapshot.exists()) {
          alert("User Exists");
        } else {
          set(ref(database, "users/" + phoneNum), {
            Name: name,
            PhoneNumber: phoneNum,
            Password: password
          })
            .then(() => {
              alert("User Created   " + "  Redirecting...");
              setTimeout(() => {
                window.location.href = "../index.html";
              }, 200);
            })
            .catch((error) => {
              alert(error.message);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  //  document.getElementById('login-form').reset();
});
