const firebaseConfig = {
  apiKey: "AIzaSyBgeF_BrTBqeSOLHlAtxNd_aDxW9wHDkps",
  authDomain: "web2021-68d94.firebaseapp.com",
  projectId: "web2021-68d94",
  storageBucket: "web2021-68d94.appspot.com",
  messagingSenderId: "434084723620",
  appId: "1:434084723620:web:c624db7e0da45d130e9f31"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const productsCol = db.collection('products');

let loggedUser = null;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection('users').doc(user.uid).get().then(function (doc) {
      loggedUser = doc.data();
      loggedUser.uid = user.uid;
      userAuthChanged(true);
    });
  } else {
    loggedUser = null;
    userAuthChanged(false);
  }
});

let cart = [];
const cartBtnNumber = document.querySelector('.cartBtn span');

const cartFromLS = localStorage.getItem('store__cart');
if(cartFromLS) {
  cart = JSON.parse(cartFromLS);
  if(cartBtnNumber) {
    cartBtnNumber.innerText = cart.length;
  }
}





const burgerMenu = document.querySelector('.burgerMenu');
const navegacion = document.querySelector('.navegacion');


function burgerDesplegar() {
    if (navegacion.style.display === "none") {
        navegacion.style.display = "block";
    } else {
        navegacion.style.display = "none";
    }

}

burgerMenu.addEventListener('click', burgerDesplegar);