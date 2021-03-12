function init() 
{
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const config = {
    apiKey: "AIzaSyBihDOYXAqvOayAPXCbqIudZZCogzikx08",
    authDomain: "g-notepad.firebaseapp.com",
    databaseURL: "https://g-notepad-default-rtdb.firebaseio.com",
    projectId: "g-notepad",
    storageBucket: "g-notepad.appspot.com",
    messagingSenderId: "451807484392",
    appId: "1:451807484392:web:a273a3ea52f013f2ad6c5d"
  };

  // Initialize Firebase
  firebase.initializeApp(config);

  //// Get Firebase Database reference.
  var firepadRef = getRef();

  //// Create CodeMirror (with lineWrapping on).
  var codeMirror = CodeMirror(document.getElementById('firepad-container'), { lineWrapping: true });

  // Create a random ID to use as our user ID (we must give this to firepad and FirepadUserList).
  var userId = Math.floor(Math.random() * 9999999999).toString();

  //// Create Firepad (with rich text toolbar and shortcuts enabled).
  var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, { 
      richTextToolbar: true, 
      richTextShortcuts: true,
      userId: userId  
    });

  //// Create FirepadUserList (with our desired userId).
  var firepadUserList = FirepadUserList.fromDiv(
    firepadRef.child('users'),
    document.getElementById('userlist'), userId
  );   


  //// Initialize contents.
  firepad.on('ready', function() 
  { 
    if (firepad.isHistoryEmpty()) 
    {
      firepad.setHtml('<span style="font-size: 20px;">Hello World!');
    }
  });
}

// Helper to get hash from end of URL or generate a random one.
function getRef() 
{
  var ref = firebase.database().ref() ; 
  var hash = window.location.hash.replace(/#/g,''); //returns the anchor part (#) of a URL remove all after # in url
  
  if(hash) 
  {
    ref = ref.child(hash);
  } 
  else 
  {
    ref = ref.push(); // generate unique location.
    window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
  }
    
  return ref;

}

/*function auth()
{

  var email = "gg@gg.in";
  var password = "123456";

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
     console.log(error.code);
     console.log(error.message);
  });
  
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    cur_user = user;
    init_firepad()
    // ...
  } else {
    // User is signed out
    // ...
    console.log("log out");
  }
});

};*/