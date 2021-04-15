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