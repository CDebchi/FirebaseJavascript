//Load navbar
var logguedUser = localStorage.getItem('LogguedUser');
if (logguedUser){
    document.getElementById('navbarCharge').innerHTML = `<a class="nav-item nav-link active" href="index.html">Home</a>
                                                        <a class="nav-item nav-link" href="dashbord.html">Dashbord</a>
                                                        <a><button type="button" class="nav-item nav-link btnD" onclick="logout()">Log out</button></a>
                                                        `
}
else {
    document.getElementById('navbarCharge').innerHTML = `<a class="nav-item nav-link active" href="index.html">Home</a>
                                                        <a class="nav-item nav-link" href="Login.html">Login</a>
                                                        <a class="nav-item nav-link" href="register.html">register</a>
                                                        <a class="nav-item nav-link disabled" href="dashbord.html">Dashbord</a>` 
}
//get Moovie detail for OMDB
async function omdb(x){
   return  fetch(`http://omdbapi.com/?apikey=b643c3d7&t=${x}`).then(
        async response => response.json().then(async function (json){
            return json
        }
            
        )
    )
}
//Load Api
fetch(`http://omdbapi.com/?apikey=b643c3d7&t=avatar`).then(
        response => response.json().then(function (json){
        }
            
        )
    )
  
    var tab2 = []; 
async function load_index(){
    
    var doc = '';
    var i = 0;
     var ax = await fetch('https://ghibliapi.herokuapp.com/films').then(
        res => res.json().then( async function (ress){
            ress.forEach(async element=>{
            var el = omdb(element.title)
            el.then(async elem2 => {
                let a=elem2
               var bx = await tab2.push(a); 
                   doc += `   <div class="col-3">
                   <!-- Card Dark -->
                   <div class="card">
           
                           <!-- Card image -->
                           <div class="view overlay">
                           <img class="card-img-top" src="${a.Poster}" alt="Card image cap">
                           <a>
                               <div class="mask rgba-white-slight"></div>
                           </a>
                           </div>
                       
                           <!-- Card content -->
                           <div class="card-body elegant-color white-text rounded-bottom">
                       
                           <!-- Social shares button -->
                           
                           <!-- Title -->
                           <h4 class="card-title">${a.Title}</h4>
                           <hr class="hr-light">
                           <!-- Text -->
                           <p class="card-text white-text mb-4">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                           <!-- Link -->
                           <a href="#!" class="white-text d-flex justify-content-end"><h5>Read more <i class="fas fa-angle-double-right"></i></h5></a>
                       
                           </div>
                       
                   </div>
                   <!-- Card Dark -->
                   </div>
                   `     
                  
               
               document.getElementById('moovie-list').innerHTML = doc; 
            })
            })
            
        })
        
    )
    console.log(tab2)
   
}


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBOMmfsGGW4LcWfRKlspzhc88SCHFeZ0sQ",
    authDomain: "animals-73d13.firebaseapp.com",
    databaseURL: "https://animals-73d13.firebaseio.com",
    projectId: "animals-73d13",
    storageBucket: "animals-73d13.appspot.com",
    messagingSenderId: "559699551312",
    appId: "1:559699551312:web:3e127b8d5dd7c65b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

defaultFirestore = firebase.database();

var user = firebase.auth().currentUser;
// method 1 call information
var refDb = new Firebase("https://animals-73d13.firebaseio.com/users");
var tab = [];
refDb.once("value", function (snapshot){
    snapshot.forEach(element => {
        tab.push(element.val());
    });
})
// End Method 1

//method 2 call information
var query = firebase.database().ref("Animals").orderByKey();
query.once("value")
.then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    var key = childSnapshot.key;
    var childData = childSnapshot.val();
    console.log(childSnapshot)
});
});
//End method 2
//delete item
function deleteItem(DeleteRef){
    var adaRef = firebase.database().ref('Animals/-LfB3_DDgI9RvKNLja_0');
adaRef.remove()
.then(function() {
    console.log("Remove succeeded.")
})
.catch(function(error) {
    console.log("Remove failed: " + error.message)
});
}

//Update Item
function updateItem(UpdateRef){
    var adaRef = firebase.database().ref('Animals/'+UpdateRef);
    adaRef.child('name').set('debchi');
}


function register(){
    var fName = document.getElementById('inputName').value;
    var lName = document.getElementById('inputLname').value;
    var email = document.getElementById('inputEmail').value;
    var pwd = document.getElementById('inputPassword').value;
    firebase.auth().createUserWithEmailAndPassword(email, pwd).then(function(user){
    console.log(user)
    firebase.database().ref("users/").push({
        firstName:fName,
        lastName : lName,
        email : email,
        uid : user.user.uid
        
    })
    })

}


// Login method
function signin(){
    var email = document.getElementById('inputEmail').value;
    var pwd = document.getElementById('inputPassword').value;
    firebase.auth().signInWithEmailAndPassword(email, pwd).then(function (user){
        localStorage.setItem('LogguedUser',JSON.stringify(user.user.uid))
        window.location.href = "dashbord.html";
    }).catch(function (err){
        console.log(err)
    })
}
//Logout method
function logout(){
    firebase.auth().signOut().then(function(){
        localStorage.removeItem('LogguedUser');
    })
}
