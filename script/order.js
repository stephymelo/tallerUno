const orders = document.querySelector('.orders');
db.collection('orders')
.get()
.then((querySnapshot)=>{
  querySnapshot.forEach(doc => {
    const currentOrder = doc.data(); 
    console.log(currentOrder);
    const orderElem = document.createElement('div'); 
    orderElem.classList.add('order'); 
    orderElem.innerHTML = `<div class="order__main-info">
    <h1 class="order__name">${currentOrder.date}</h1>
   
  </div>
  <h3 class="order__items"><span class="order__number">${currentOrder.producIds.length}</span> products</h3>`; 
  orders.appendChild(orderElem); 
  });
})