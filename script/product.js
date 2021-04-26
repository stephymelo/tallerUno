const params = new URLSearchParams(location.search);
const id = params.get('id');

if(!id) {
  location.href = './404.html';
}

const productImg = document.querySelector('.productsingle__img');
const productName = document.querySelector('.productsingle__name');
const productPrice = document.querySelector('.productsingle__price');
const productFormat = document.querySelector('.productsingle__format');
const productGenre = document.querySelector('.productsingle__genre');
const productArtist = document.querySelector('.productsingle__artist');
const productDescription = document.querySelector('.productsingle__description');



function getTypeLabel (format) {
  switch(format) {
    case 'vinyl': return 'Vinyl';
    case 'cd': return 'CD';
    case 'digital': return 'Digital';
  }
  
}

productsCol
  .doc(id)
  .get()
  .then(function (doc) {
    const data = doc.data();
    // if(!data) {
    //   location.href = './404.html';
    // }

    productImg.setAttribute('src', data.images[0].url);
    productName.innerText = data.name;
    productPrice.innerText = `$ ${data.price}.00`;
    productDescription.innterText = data.description;
    productArtist.innerText = data.artist;
    productGenre.innerText = data.genre;
    productFormat.innerHTML = `Format: <strong>${getTypeLabel(data.format)}</strong>`;
    console.log(data.format);
  });