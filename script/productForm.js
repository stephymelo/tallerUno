
  
const productForm = document.querySelector('.productForm');
const firstTrack = document.querySelector('.productForm__track');
const tracklistContainer = document.querySelector('.productForm__tracklist');
const addTrackBtn = document.querySelector('.productForm__addtrack');
const productFormLoader = document.querySelector('.productForm__loader');
const productFormSuccess = document.querySelector('.productForm__success');
const productFormError = document.querySelector('.productForm__error');
const productFormImages = document.querySelector('.productForm__images');
const imageFiles = [];
const tracklistArray = [];
tracklistArray.push(firstTrack);


// tracklist
addTrackBtn.addEventListener('click',function(event){
    event.preventDefault();
    console.log("alo");
    const newTrack = document.createElement("input");
    newTrack.name = "track";
    newTrack.classList.add('productForm__track');
    tracklistContainer.appendChild(newTrack);
    

    tracklistArray.push(newTrack);
    console.log(productForm.track.value);

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
    reader.readAsDataURL(file); // 
    imageFiles.push(file);
  });







///SUBIR A FIREBASE INFO

productForm.addEventListener('submit',function(event){
    event.preventDefault();
    console.log('name: ',productForm.name);
    // console.log('price: ',productForm.price.value);
    // console.log('vinyl: ',productForm.format_vinyl.checked);
    // console.log('cd: ',productForm.format_cd.checked);
    // console.log('digital: ',productForm.format_digital.checked);
    tempTracklist = [];
     tracklistArray.forEach((element)=>{
       if(element.value!=null){
         tempTracklist.push(element.value);
         console.log("ele"+element.value);
         
       }
     });

    
    const product = {
        name:productForm.name.value,
        price:parseInt(productForm.price.value),
        genre:productForm.genre.value,
        description:productForm.description.value,
        date:productForm.date.value,
        format: [],
        tracklist: tempTracklist,
        artist:productForm.artist.value,
        color:productForm.color.value,
    };
    
    if(productForm.format_vinyl.checked) product.format.push('vinyl');
    if(productForm.format_cd.checked) product.format.push('cd');
    if(productForm.format_digital.checked) product.format.push('digital');

    ///ERROR EN PARAMETROS Y SUBIDA
    let error = '';
    if(!product.name) {
        error += 'Album name is required. <br/>';
    }
    if(!product.price) {
        error += 'Product price is required. <br/>';
    }
    if(product.price < 1) {
        error += 'Product price can\'t be less than 1. <br/>';
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
        productFormError.innerHTML = 'There was an error in the upload.';
        console.log("error"+error);
    }




     // info a firebase
    productsCol.add(product).then(function(docRef){
    const uploadPromises = [];
    const downloadUrlPromises = [];

    imageFiles.forEach(function (file) {
      var storageRef = firebase.storage().ref();
      var fileRef = storageRef.child(`products/${docRef.id}/${file.name}`);
      // 
      uploadPromises.push(fileRef.put(file));
    });

    Promise.all(uploadPromises).then(function (snapshots) {
      snapshots.forEach(function (snapshot) {
        // 
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

        productsCol.doc(docRef.id).update({
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


    





