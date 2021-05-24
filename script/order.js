
  
const orders = document.querySelector('.orders');
ordersCol.get().then((querySnapshot)=>{
  querySnapshot.forEach(doc => {
    const myOrder = doc.data(); 
    console.log(myOrder);
    const orderIndiv = document.createElement('div'); 
    orderIndiv.classList.add('order'); 
    orderIndiv.innerHTML = `<section class="orders__section">
    <p class="orders__name">${myOrder.date}</p>
    <h1 class="orders__name">${myOrder.address}</h1>
   
  </section>
  <p class="orders__numitem"><span class="order__number">${myOrder.producIds.length}</span> products</p>
  <hr>
  `; 
  orders.appendChild(orderIndiv); 
  });
})