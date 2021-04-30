const params = new URLSearchParams(location.search);
const id = params.get('id');

if(!id) {
  location.href = './404.html';
}

const productBody = document.querySelector('.productbody');
const productImg = document.querySelector('.productsingle__img');
const productName = document.querySelector('.productsingle__name');
const productPrice = document.querySelector('.actions__price');
const productFormat = document.querySelector('.productsingle__format');
const productGenre = document.querySelector('.productsingle__genre');
const productArtist = document.querySelector('.productsingle__artist');
const productDescription = document.querySelector('.productsingle__description');
const productTracks = document.querySelector('.productsingle__tracks');
const prooductYear = document.querySelector('.productsingle__year');
let years= [];
let tracklist = [];


const cartBtn = document.querySelector('.actions__add');
    cartBtn.addEventListener('click', function () {
      cart.push(data);
      localStorage.setItem('store__cart', JSON.stringify(cart));
      cartBtnNumber.innerText = cart.length;
    });


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

    let yea = data.date;
    years=yea.split("-");
    tracklist = data.tracklist;





    productBody.style.setProperty("--productgradientcolor", data.color);
    productImg.setAttribute('src', data.images[0].url);
    productName.innerText = data.name;
    prooductYear.innerHTML = years[0];
    productPrice.innerText = `Price: $ ${data.price}.00`;
    productDescription.innterText = `descrip ${data.description}`;
    productArtist.innerText = data.artist;
    productGenre.innerText = `Genre: ${data.genre}`;
    productFormat.innerHTML = `Format: <strong>${(data.format)}</strong>`;

    // tracklist
    for (i = 0; i < tracklist.length; i++) {
      console.log(tracklist[1]);
       productTracks.innerHTML += "<li>" + tracklist[i] + "</li>";
      
    }
    console.log(data.format);
  });