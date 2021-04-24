const list = document.querySelector('.list');

const handleCollectionResult = (querySnapshot) => {
  list.innerHTML = '';
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const product = document.createElement('a');
    let img = data.images[0]?.url;

    //   if(!img) {
    //     img = './images/placeholder-image.png';
    //   }
    product.innerHTML = `
        <img class="product__img" src="${img}" alt="">
        <div class="product__info">
          <h1 class="product__title">
            ${data.name} <br> ${data.artist}
          </h1>
          <h3 class="product__price">$ ${data.price}.00 USD </h3>
        </div>
      `;
    product.classList.add('product');
    product.setAttribute('href', `./product.html?id=${doc.id}&name=${data.name}`);

    list.appendChild(product);
  });
}

const filters = document.querySelector('.filters');

filters.addEventListener('change', function () {
  let productsCollection = db.collection('products');

  const types = [];
  //checkboxitos
  filters.test.forEach(function (checkbox) {
    if (checkbox.checked) {
      types.push(checkbox.getAttribute('data-type'));
      console.log(types[0]);
      // console.log(checkbox.getAttribute('data-type')+"check");
    }
  });
  if(types.length >0){
    productsCollection = productsCollection.where('format', 'in', types);
    
    }
    if(filters.test.value) {
    productsCollection = productsCollection.where('format', '==', filters.test.value);
    }

  //price cambiar a checkbox

  if (filters.price.value) {
    switch (filters.price.value) {
      case '0':
        productsCollection = productsCollection.where('price', '<', 10);
        break;
      case '1':
        productsCollection = productsCollection.where('price', '>=', 10).where('price', '<', 30);
        break;
      case '2':
        productsCollection = productsCollection.where('price', '>=', 30);
        break;
    }
  }


  ///ordernar selectors

  if (filters.order.value) {
    switch (filters.order.value) {
      case 'price_asc':
        productsCollection = productsCollection.orderBy('price', 'asc');
        break;
      case 'price_desc':
        productsCollection = productsCollection.orderBy('price', 'desc');
        break;
      case 'alpha':
        if (filters.price.value) {
          productsCollection = productsCollection.orderBy('price', 'asc');
        }
        productsCollection = productsCollection.orderBy('name', 'asc');
        break;
      case 'createdAt':
        if (filters.price.value) {
          productsCollection = productsCollection.orderBy('price', 'asc');
        }
        productsCollection = productsCollection.orderBy('createdAt', 'desc');
        break;
    }
  }

  productsCollection.get().then(handleCollectionResult);
});

let productsCollection = db.collection('products');

const params = new URLSearchParams(location.search);
if (params.get('type')) {
  productsCollection = productsCollection.where('type', '==', params.get('type'));
}

productsCollection.get().then(handleCollectionResult);