let cart = JSON.parse(localStorage.getItem("cart")) || [];
function showToast(message){
    let toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(function(){
        toast.classList.remove("show") ;
    },2000)
}

fetch("http://localhost:3000/products")
.then(response => response.json())
.then(data => {

    let container = document.getElementById("products-container");

    data.forEach(function(product){

        container.innerHTML += `
        <div class="product-card" data-product='${JSON.stringify(product)}'>
        <img src ="images/${product.image}" alt = "${product.name}">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <button class="add-cart" data-price="${product.price}">
                Add to Cart
            </button>
        </div>
        `;

    });

    let buttons = document.querySelectorAll(".add-cart");

    buttons.forEach(function(button){

        button.addEventListener("click",function(){

            let productCard = button.parentElement;
            let productName = productCard.querySelector("h3").textContent;
            let productPrice = Number(button.dataset.price);
            let existingProduct = cart.find(function(item){
                return item.name === productName;
            });
            if(existingProduct){
                existingProduct.quantity++;
            }
            else{
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            showToast(productName+" added to cart");

        });
    });
    let cards = document.querySelectorAll(".product-card");
    cards.forEach(function(card){
        card.addEventListener("click",function(e){
            if(e.target.classList.contains("add-cart")){
                return;
            }
            let selectedProduct=JSON.parse(card.dataset.product);
            localStorage.setItem("selectedProduct",JSON.stringify(selectedProduct));
            window.location.href = "product-details.html";
        });
    });
let searchBox = document.getElementById("search");

searchBox.addEventListener("keyup",function(){

    let searchText = searchBox.value.toLowerCase();

    let products = document.querySelectorAll(".product-card");

    products.forEach(function(product){

        let productName = product.querySelector("h3").textContent.toLowerCase();

        if(productName.includes(searchText)){
            product.style.display = "block";
        }
        else{
            product.style.display = "none";
        }

    });

});
});