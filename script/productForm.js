const firebaseConfig = {
    apiKey: "AIzaSyBgeF_BrTBqeSOLHlAtxNd_aDxW9wHDkps",
    authDomain: "web2021-68d94.firebaseapp.com",
    projectId: "web2021-68d94",
    storageBucket: "web2021-68d94.appspot.com",
    messagingSenderId: "434084723620",
    appId: "1:434084723620:web:c624db7e0da45d130e9f31"
  };
  firebase.initializeApp(firebaseConfig);
  
const productForm = document.querySelector('.productForm');
const db = firebase.firestore();  


productForm.addEventListener('submit',function(event){
    event.preventDefault();
    console.log('name: ',productForm.name.value);
    console.log('price: ',productForm.price.value);
    console.log('vinyl: ',productForm.format_vinyl.checked);
    console.log('cd: ',productForm.format_cd.checked);
    console.log('digital: ',productForm.format_digital.checked);

    const product = {
        name:productForm.name.value,
        price:parseInt(productForm.price.value),
        format: [],
    };
    if(productForm.format_vinyl.checked) product.format.push('vinyl');
    if(productForm.format_cd.checked) product.format.push('cd');
    if(productForm.format_digital.checked) product.format.push('digital');

    db.collection('productos').add(product).then(function(docRef){
        console.log(docRef.id);

    });


});
