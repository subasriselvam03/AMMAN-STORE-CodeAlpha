let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartItems = document.getElementById("cart-items");
let total = 0;

cart.forEach(function(item,index) {

    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItems.innerHTML += `
        <div class="product-card">
            <h3>${item.name}</h3>
            <p>Price : ₹${item.price}</p>
            <p>Quantity : ${item.quantity}</p>
            <p>Total : ₹${itemTotal}</p>
            <button class="remove-btn" data-index="${index}"> 🗑️ Remove</button>
        </div>
    `;

});

document.getElementById("total").textContent = "Total : ₹" + total;
let removeButtons = document.querySelectorAll(".remove-btn");
removeButtons.forEach(function(button){
    button.addEventListener("click",function(){
        let index = button.dataset.index;
        cart.splice(index, 1);

        localStorage.setItem("cart",JSON.stringify(cart));
        location.reload();
    });
});

let placeOrderButton = document.getElementById("place-order");

placeOrderButton.addEventListener("click", function () {
    if(cart.length === 0){
        alert("Cart is Empty");
        return;
    }
    let order = {
        username: localStorage.getItem("username"),
        product_name: cart.map(item => item.name).join(", "),
        quantity:cart.reduce((sum,item) => sum+item.quantity,0),
        total_price: total
    };
    fetch("http://localhost:3000/place-order",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:
        JSON.stringify(order)
    })
    .then(response => response.text())
    .then(data => {
        localStorage.removeItem("cart");
        window.location.href = "order.html"
    })
    .catch(err =>{
        console.log(err);
        alert("Order Failed");
    });

});