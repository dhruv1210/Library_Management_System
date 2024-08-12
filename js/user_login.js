$(document).ready(function() {
    // Web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBin1evT-H6jfR49WIhtVPsGMLzbEklIQY",
        authDomain: "library-management-syste-f2a85.firebaseapp.com",
        databaseURL: "https://library-management-syste-f2a85.firebaseio.com",
        projectId: "library-management-syste-f2a85",
        storageBucket: "library-management-syste-f2a85.appspot.com",
        messagingSenderId: "914416876417",
        appId: "1:914416876417:web:bf9e7762c1c283ba"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    // Initialize Firestore
    var db = firebase.firestore(); // Declare db here for global access

    // Prevent default refresh of form 
    $("#login-form").submit(function(e) {
        e.preventDefault();
    });

    $("#register-form").submit(function(e) {
        e.preventDefault();
    });

    // Check if user is logged in
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            window.location = 'user_portal.html';
        }
    });
    
    $('#log_me_in').click(function() {
        login();
    });

    $('#register_new').click(function() {
        register_me();
    });

    $('#log_button').click(function() {
        logout();
    });
});

// Logout function
function logout() {
    firebase.auth().signOut().then(function() {
        console.log("Logout done");
        window.location = 'usr_login.html';
    }).catch(function(error) {
        console.log("Error during logout:", error);
    });
}

// Registration function
function register_me() {
    // Get input data
    var name = document.getElementById("usr_name").value;
    var password = document.getElementById("usr_pass").value;
    var email = document.getElementById("usr_email").value;
    var rollNumber = document.getElementById("usr_roll").value;
    var dateOfBirth = document.getElementById("usr_dob").value;
    var books = [];

    // Firebase register
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User registered successfully
            var user = userCredential.user;

            // Store additional user data in Firestore
            return db.collection("users").doc(rollNumber).set({
                name: name,
                email: email,
                roll_number: rollNumber,
                dob: dateOfBirth,
                books: books
            });     
        })
        .then(() => {
            console.log("User document successfully written!");
            // Optionally redirect to login or user portal
            alert("Registration successful! You can now log in.");
            window.location = 'usr_login.html'; // Redirect to login page
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error: " + errorMessage);
        });
}

// Login function
function login() {
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(email === "admin@gmail.com") {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage);
        });
    }    
}