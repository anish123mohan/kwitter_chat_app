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
document.getElementById("user_name").innerHTML="Welcome " + user_name;

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("Room Name -" + Room_names);
      row ="<div class='room' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#   "+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML  +=row;      
      });});}
getData();
function logout() 
{
      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")
      window.location="index.html";      
}
function addRoom()     
{
      room_name=document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose:"add_room"
      });
      localStorage.setItem("room_name",room_name);
      window.location="kwitter_page.html";
}
function redirectToRoomName(name) 
{
      localStorage.setItem("room_name",name);
      window.location="kwitter_page.html";      
}