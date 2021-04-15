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
const productFormLoader = document.querySelector('.productForm__loader');
const productFormSuccess = document.querySelector('.productForm__success');
const productFormError = document.querySelector('.productForm__error');
const productFormImages = document.querySelector('.productForm__images');
const db = firebase.firestore();  
const imageFiles = [];
const tracklist = [];


// tracklist
productForm.addEventListener('button',function(event){
    event.preventDefault();
    console.log("alo");
    const newTrack = document.createElement("input");
    newTrack.name = "strack";
    newTrack.classList.add('productForm__tracklist');
   
    // track.push(productForm.track.value);

});


productForm.image.addEventListener('change', function () {
    const file = productForm.image.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
      const productFormImg = document.createElement('img');
      productFormImg.classList.add('productForm__img');
      productFormImg.setAttribute('src', event.target.result);
      productFormImages.appendChild(productFormImg);
    }
    reader.readAsDataURL(file); // convert to base64 string
    imageFiles.push(file);
  });







///SUBIR A FIREBASE INFO

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

    ///ERROR EN PARAMETROS Y SUBIDA
    let error = '';
    if(!product.name) {
        error += 'The album name is required. <br/>';
    }
    if(!product.price) {
        error += 'The product price is required. <br/>';
    }
    if(product.price < 1) {
        error += 'The product price can\'t be less than 1. <br/>';
    }
    
    if(error) {
        productFormError.innerHTML = error;
        productFormError.classList.remove('hidden');
        return;
    } else {
        productFormError.classList.add('hidden');
    }

    productFormLoader.classList.remove('hidden');
    productFormError.classList.add('hidden');

    const genericCatch = function (error) {
        productFormLoader.classList.add('hidden');
        productFormError.classList.remove('hidden');
        productFormError.innerHTML = 'There was an error in the product upload.';
    }




     // espera a subir la información al firestore
    db.collection('productos').add(product).then(function(docRef){
    const uploadPromises = [];
    const downloadUrlPromises = [];

    imageFiles.forEach(function (file) {
      var storageRef = firebase.storage().ref();
      var fileRef = storageRef.child(`products/${docRef.id}/${file.name}`);
      // espera a subir la imagen
      uploadPromises.push(fileRef.put(file));
    });

    Promise.all(uploadPromises).then(function (snapshots) {
      snapshots.forEach(function (snapshot) {
        // espera a obtener la url de descarga de la imagen
        downloadUrlPromises.push(snapshot.ref.getDownloadURL());
      });

      Promise.all(downloadUrlPromises).then(function (downloadURLs) {

        const images = [];
        downloadURLs.forEach(function (url, index) {
          images.push({
            url: url,
            ref: snapshots[index].ref.fullPath
          });
        });

        db.collection('products').doc(docRef.id).update({
          images: images
        }).then(function () {
          productFormLoader.classList.add('hidden');
          productFormSuccess.classList.remove('hidden');
        })
        .catch(genericCatch);
      })
      .catch(genericCatch);
    })
    .catch(genericCatch);
  })
  .catch(genericCatch);

});


    





