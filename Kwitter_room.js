const firebaseConfig = {
    apiKey: "AIzaSyDuSebvd2XZeiRFVUzoFXXU5eXSlOFZdvo",
    authDomain: "chats-f94ec.firebaseapp.com",
    databaseURL: "https://chats-f94ec-default-rtdb.firebaseio.com",
    projectId: "chats-f94ec",
    storageBucket: "chats-f94ec.appspot.com",
    messagingSenderId: "470720922820",
    appId: "1:470720922820:web:d09eb67873552ba1137591",
    measurementId: "G-JT38NRCZXE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  //ADD YOUR FIREBASE LINKS HERE
  
  UserName = localStorage.getItem("User");
  document.getElementById("welcome_user").innerHTML = "Welcome " + UserName + " !";
  
  function logout() {
    window.location = "index.html";
    localStorage.removeItem("User");
  }
  
  function addRoom() {
    room_name = document.getElementById("RoomName_input").value;
    localStorage.setItem("Room_name", room_name);
    firebase.database().ref("/").child(room_name).update({
      purpose: "adding Room"
    });
    document.getElementById("RoomName_input").value = "";
    window.location = "kwitter_page.html";
  }
  
  function getData() {
  
    firebase.database().ref("/").on('value', function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        Room_names = childKey;
        //Start code
        console.log("Room Name = " + Room_names);
        
        row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
  
        document.getElementById("output").innerHTML += row;
        //End code
      });
    });
  }
  getData();
  
  
  
  function redirectToRoomName(clicked_name) {
    console.log(clicked_name);
    localStorage.setItem("Room_name", clicked_name);
    window.location = "kwitter_page.html";
  
  } 