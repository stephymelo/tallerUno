const list = document.querySelector('.cart__section--1');
const sub = document.querySelector('.subtotal');
const totalSpan = document.querySelector('.checkout__total span');
const checkoutForm = document.querySelector('.checkout__form');
var numeroitems;
var subtotal;
let total = 0;
let now;

renderCart = () => {
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
        
     </div>
    </div>
   
   </div>
   <div>
   
  </div>  
  <button class="productcheckout__delete">Delete</button>
  <hr>
  `;

    list.appendChild(product);
    total += data.price;
   
  const deletebtn = product.querySelector('.productcheckout__delete');

  const padre = product.querySelector('.productcheckout');
  console.log(cart.length);
 
  deletebtn.addEventListener('click', function (event) {
        const index = cart.indexOf(data);

        
        this.parentNode.remove(event.target.closest(padre));
        console.log(cart.length);
        cart.splice(index,1);
        cartCol.doc(loggedUser.uid).set({
          cart: cart,
        });
    });
  });


 
  totalSpan.innerText = total +".00";
  
  checkoutForm.addEventListener('submit', function (event) {
  
    var d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    
    now=months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
  
    event.preventDefault();
  
    const producIds = [];
    cart.forEach(function (data) {
      producIds.push(data.id);
    });
  
    const order = {
      ccNumber: checkoutForm.ccnumber.value,
      address: checkoutForm.address.value,
      date: now,
      producIds: producIds,
      total: total,
      uid: loggedUser.uid,
    };
  
    ordersCol.add(order)
      .then(function (docRef) {
        console.log(docRef.id);
  
        cartCol.doc(loggedUser.uid).set({
          cart: [],
        });
  
        location.href = '/store.html';
      });
  
    console.log(order)
  });
  
}








