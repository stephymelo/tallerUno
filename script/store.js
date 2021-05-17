const list = document.querySelector('.list');
const productform = document.querySelector('.adminli');
let productslist = [];


const handleCollectionResult = (querySnapshot) => {
  list.innerHTML = '';
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const product = document.createElement('a');
    let img = data.images[0]?.url;
  
    product.innerHTML = `
       <a class="product__ref" href="./product.html?id=${doc.id}&name=${data.name}">
        <img class="product__img" src="${img}" alt="">
        <div class="product__info">
          <div class="product__info product__info--1">
            <h1 class="product__title">
              <strong>${data.name} </strong><br> ${data.artist}
            </h1>
            <a>
          </div>
          
          <div class="product__info product__info--2">
            <h3 class="product__price">$ ${data.price}.00 USD </h3>
            <button class="product__cartBtn">+</button>
          </div>
        </div>
        
      `;
    product.classList.add('product');
    // const productimg = product.querySelector('.product__img');
    // productimg.setAttribute('href', `./product.html?id=${doc.id}&name=${data.name}`);

    list.appendChild(product);

     


    // add a Carrito
    const cartBtn = product.querySelector('.product__cartBtn');
    cartBtn.addEventListener('click', function () {
      addToMyCart({
        ...data,
        id: doc.id,
      });
      
    });
 
   

  });
}



const filters = document.querySelector('.filters');


filters.addEventListener('change', function () {
  let productsCollection = db.collection('products');
  

  const types = [];
  //checkboxitos
  filters.format.forEach(function (checkbox) {
    if (checkbox.checked) {
      types.push(checkbox.getAttribute('data-type'));
      
    }
  });
  if(types.length >0){
    productsCollection = productsCollection.where('format', 'array-contains-any', types);
    //array contains any y contains - exactamente iguales, any que tenga almenos una
    }

    //Genre Checkbox
    let generotypes;
    filters.genero.forEach(function (radio) {
      if (radio.checked) {
        generotypes=radio.getAttribute('data-type');
        
      }
    });

    if(generotypes){
      productsCollection = productsCollection.where('genre', '==', generotypes);
      }
     

   filters.pricevalue.forEach(function(radio){
      if (radio.checked) {
        switch (radio.getAttribute('data-type')) {
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
    });
    
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
        
        productsCollection = productsCollection.orderBy('name', 'asc');
        break;
      case 'createdAt':
       
        productsCollection = productsCollection.orderBy('date', 'desc');
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


//
// if(!loggedUser){
//   authModal.classList.add('modal-active'); 
// }else{
//   if(loggedUser.admin){
//     productform.innerHTML=`<a href="./productForm.html">Product</a>`;
//   }
//   }