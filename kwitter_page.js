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
  User = localStorage.getItem("User");
  room_name = localStorage.getItem("Room_name");
  
  document.getElementById("entered_room").innerHTML = "You have entered in : " + room_name;
  
  function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        childData = childSnapshot.val();
        if (childKey != "purpose") {
          firebase_message_id = childKey;
          message_data = childData;
          //Start code
          console.log(firebase_message_id);
          console.log(message_data);
  
         login_name= message_data["User"];
          like= message_data["Like"];
          msg= message_data["Message"];
  
          name_tag = "<h4>" + login_name + "</h4>";
          msg_tag = "<h4>" + msg + "</h4>";
          like_btn = "<button class= 'btn btn-warning' id=" + firebase_message_id + " value= " + like + " onclick='updateLike(this.id)'>";
          span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button><hr>";
  
          row= name_tag + msg_tag + like_btn + span_tag;
          document.getElementById("output").innerHTML += row;
          //End code
        }
      });
    });
  }
  getData();
  
  
  
  function send() {
    Msg = document.getElementById("msg_input").value;
  
    firebase.database().ref(room_name).push({
      User: User,
      Like: 0,
      Message: Msg
    });
    document.getElementById("msg_input").value = "";
  }
  
  function logout() {
    localStorage.removeItem("User");
    localStorage.removeItem("Room_name");
    window.location = "index.html";
  }
  
  function back() {
    localStorage.removeItem("Room_name")
    window.location = "kwitter.html";
  }
  
  function updateLike(clicked_msg){
    console.log("clicked on like button - " + clicked_msg);
    
    likes_value = document.getElementById(clicked_msg).value;
    updated_likes = Number(likes_value) + 1;
    console.log(updated_likes);
  
    firebase.database().ref(room_name).child(clicked_msg).update({
     Like : updated_likes
    });
  }