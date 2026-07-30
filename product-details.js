let product = JSON.parse(localStorage.getItem("selectedProduct"));
if (!product) {
    alert("No product selected");
    window.location.href = "products.html";
}
document.getElementById("product-name").textContent = product.name;
document.getElementById("product-price").textContent = "Price : ₹" + product.price;
document.getElementById("product-description").textContent ="Description : Premium Quality " + product.name;
document.getElementById("product-stock").textContent ="Stock : Available";
document.getElementById("add-cart").addEventListener("click", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(function (item) {
        return item.name === product.name;
    });
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
});