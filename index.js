var firebaseConfig = {
    apiKey: "AIzaSyAXi4uch-kOe9w4BSN1eGfX7JGWSTgQxxo",
    authDomain: "babu-c8a09.firebaseapp.com",
    databaseURL: "https://babu-c8a09-default-rtdb.firebaseio.com",
    projectId: "babu-c8a09",
    storageBucket: "babu-c8a09.appspot.com",
    messagingSenderId: "622896532946",
    appId: "1:622896532946:web:46f4e8f5afd2e539170c0b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const db = firebase.database();

  const username = prompt("Enter your name ");

  document.getElementById("message-form").addEventListener("submit", sendMessage);

  function sendMessage(e) {
    e.preventDefault();
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }

  const fetchChat = db.ref("messages/");

  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  });