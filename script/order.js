
  
const orders = document.querySelector('.orderss__article');
ordersCol.get().then((querySnapshot)=>{
  querySnapshot.forEach(doc => {
    const myOrder = doc.data(); 
    console.log(myOrder);
    const orderIndiv = document.createElement('div'); 
    orderIndiv.classList.add('order'); 
    orderIndiv.innerHTML = `<section class="orders__section">
    <p class="orders__name">Order date: ${myOrder.date}</p>
    <h1 class="orders__name">Delivering to: ${myOrder.address}</h1>
    <p class="orders__total">Total amount: $${myOrder.total}.00</p>
   
  </section>
  <p class="orders__numitem"><span>Number of products: ${myOrder.producIds.length}</span></p>
  <hr>
  `; 
  orders.appendChild(orderIndiv); 
  });
})