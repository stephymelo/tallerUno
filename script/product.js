const params = new URLSearchParams(location.search);
const id = params.get('id');

if (!id) {
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
const productimgdiv = document.querySelector('.productsingle__imgdiv');
const productcheckboxes = document.querySelector('.productsingle__checkboxes');
const productDivnew = document.querySelector('.productsingle__imgnew');

let years = [];
let tracklist = [];
let arrayimg = [];
let checkboxes = [];


const cartBtn = document.querySelector('.actions__add');

// cartBtn.addEventListener('click', function () {
//   cart.push(data);
//   localStorage.setItem('store__cart', JSON.stringify(cart));
//   cartBtnNumber.innerText = cart.length;
// });

const handleCollectionResult = (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    addToMyCart({
      ...data,
      id: doc.id,
    });

});

}

cartBtn.addEventListener('click', function () {
  productsCol.get().then(handleCollectionResult);
  console.log(addToMyCart());
  //localStorage.setItem('store__cart', JSON.stringify(cart));
});




function getTypeLabel(format) {
  switch (format) {
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
    years = yea.split("-");
    tracklist = data.tracklist;





    productBody.style.setProperty("--productgradientcolor", data.color);
    // productImg.setAttribute('src', data.images[0].url);
    // array img

    data.images.forEach((element, index) => {
      arrayimg.push(`<img class="productsingle__img--${index}" src="${element.url}" />`);

    });
    console.log(arrayimg[0]);
    productimgdiv.innerHTML = arrayimg;
    // if(clientWidth<=100){
    //   productDivnew.innerHTML = arrayimg;

    // }else{
    //   productimgdiv.innerHTML = arrayimg;

    // }



    for (let index = 0; index < arrayimg.length; index++) {
      checkboxes.push(`<input data-type="image" class="productsingle__checkbox" type="radio" name="image"> </input>`);

    }

    productcheckboxes.addEventListener('change', () => {
      let productcheck = document.querySelectorAll('.productsingle__checkbox')

      for (let index = 0; index < productcheck.length; index++) {

        if (productcheck[index].checked) {
          const widthNew = productimgdiv.clientWidth;
          productimgdiv.style.transform = 'translate(-' + (widthNew*index)+ 'px,0px)';
          // productimgdiv.style.left = `${index * 400}px`
          
          console.log(widthNew+"width");
        } 

      }

    });

    //
    if (checkboxes.length == 1) {
      productcheckboxes.style.display = 'none';
    } else {
      productcheckboxes.innerHTML = checkboxes;
    }









    productName.innerText = data.name;
    prooductYear.innerHTML = years[0];
    productPrice.innerText = `Price: $ ${data.price}.00`;
    productDescription.innerText = data.description;
    productArtist.innerText = data.artist;
    productGenre.innerText = `Genre: ${data.genre}`;
    productFormat.innerHTML = `Format: ${(data.format)}`;

    // tracklist
    for (i = 0; i < tracklist.length; i++) {
      console.log(tracklist[1]);
      productTracks.innerHTML += `<li class="productsingle__trackslist"> ${(tracklist[i])} </li>`;

    }

  });