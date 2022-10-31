const firebaseConfig = {
      apiKey: "AIzaSyA5dfq0FuHmzcXCeW2YN9qMg4rvg-92rtY",
      authDomain: "kwitter-ac391.firebaseapp.com",
      databaseURL: "https://kwitter-ac391-default-rtdb.firebaseio.com",
      projectId: "kwitter-ac391",
      storageBucket: "kwitter-ac391.appspot.com",
      messagingSenderId: "737253430428",
      appId: "1:737253430428:web:04de0b8c65ffd8ead2c959"
    };
    
    firebase.initializeApp(firebaseConfig);
    var user_name =localStorage.getItem("user_name");
    var room_name =localStorage.getItem("room_name");
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

      console.log(firebase_message_id);
      console.log(message_data);
      name = message_data['name'];
      message = message_data['message'];
            like = message_data['Like'];
      name_with_tag="<h4>" + name +"<img class='user_tick src='tick.png'></h4>";
      message_with_tag="<h4 class='message_h4'>"+ message + "</h4>";
      like_button="<button class='btn btn-primary' id=" + firebase_message_id+" value="+like+" onclick= 'updateLike(this.id)'>";
      span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like +"</span></button><hr>";

      row = name_with_tag + message_with_tag + like_button + span_with_tag;
      document.getElementById("output").innerHTML += row;
      } });  }); }
getData();

function logout() 
{
      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")
      window.location="index.html";
}
function send()   
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            Like:0
      });

      document.getElementById("msg").value = "";

}
function updateLike(message_id) 
{
      console.log("clicked on like button-" + message_id );
       button_id=message_id;
       likes = document.getElementById(button_id).value;    
       updated_likes=Number(likes) +1;
       console.log(updated_likes);
       firebase.database().ref(room_name).child(message_id).update({
            Like:updated_likes
       });     
      }