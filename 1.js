let products = [];
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

function fetchProducts() {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);
        })
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(productsList) {
    const container = document.getElementById("products-container");
    container.innerHTML = ""; // Clear previous products
    
    productsList.forEach(product => {
        const productCard = `
            <div class="child">
                <img src="${product.image}" alt="${product.title}">
                <p>${product.title}</p>
                <p>Rating: ${product.rating.rate}</p>
                <p>₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to cart</button>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = ""; // Clear previous cart items
    
    cart.forEach(item => {
        const cartItemHTML = `
            <div class="thing">
                <img src="${item.image}" alt="${item.title}">
                <div class="details">
                    <p>${item.title}</p>
                    <p>₹${item.price}</p>
                </div>
                <div class="quantity">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <button class="remove" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `;
        cartContainer.innerHTML += cartItemHTML;
    });

    updatePriceDetails();
}

function increaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    }
    updateCart();
}

function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
    } else {
        removeFromCart(productId);
    }
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updatePriceDetails() {
    const totalMRP = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const platformFee = 10;
    const shippingCharges = 20;
    const totalAmount = totalMRP - 50 + platformFee + shippingCharges;

    document.getElementById("total-mrp").textContent = totalMRP.toFixed(2);
    document.getElementById("total-amount").textContent = totalAmount.toFixed(2);
}

function searchProducts() {
    const query = document.getElementById("searchInput").value.toLowerCase();
        const filteredProducts = products.filter(product)
}
