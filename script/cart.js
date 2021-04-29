const list = document.querySelector('.cart__section--1');
const sub = document.querySelector('.subtotal');

var numeroitems;
var subtotal;
let total = 0;

cart.forEach((data) => {
  const product = document.createElement('div');
  let img = data.images[0]?.url;
//   if(!img) {
//     img = './images/placeholder-image.png';
//   }
  product.classList.add('productcheckout');
  product.innerHTML = `
 
  <div class="productcheckout__div">
    <img class="productcheckout__img" src="${img}" alt="">
    <div class="productcheckout__info">
     <div class="productcheckout__info productcheckout__info--1">
      <p class="productcheckout__title">
        <strong>${data.name}</strong> ${data.artist}
      </p>

      <div class="productcheckout__pricediv">
        <p>Price</p>
        <p class="productcheckout__price">$ ${data.price}.00</p>
      </div>
     </div>

     <div class="productcheckout__info productcheckout__info--2">
        <p class="productcheckout__description">${data.description}</p>
        <button class="productcheckout__delete">Delete</button>
     </div>
    </div>
   
   </div>
   <div>
   
  </div>  
  <hr>e
  `;

  list.appendChild(product);
  total += data.price;
  numeroitems += data.length;
  let num = parseInt(numeroitems);
  console.log(num);
   
});


const deletebtn = document.querySelector('.productcheckout__delete');

deletebtn.addEventListener('click',function(event){
    event.preventDefault();
    console.log("alo");

    // productsCol.doc("").delete().then(() => {
    //     console.log("Document successfully deleted!");
    // }).catch((error) => {
    //     console.error("Error removing document: ", error);
    // });

});


/// suma de los precios

subtotal= total.toString();

sub.innerHTML=`Total: $`+subtotal+`.00`;



