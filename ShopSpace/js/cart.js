function getCart() {
    const cart = localStorage.getItem("shopspace_cart");
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cartItems) {
    localStorage.setItem("shopspace_cart", JSON.stringify(cartItems));
    updateCartCount();
}

function getCartCount() {
    const cartItems = getCart();
    let count = 0;
    cartItems.forEach(function (item) {
        count += item.qty;
    });
    return count;
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll(".cart-count");
    const count = getCartCount();
    cartCountElements.forEach(function (el) {
        el.textContent = count;
    });
}

function addToCart(productId, qty, size, color) {
    const product = getProductById(productId);
    if (!product) return;

    qty = qty || 1;
    size = size || "";
    color = color || "";

    const cartItems = getCart();
    const existingItem = cartItems.find(function (item) {
        return item.id === productId && item.size === size && item.color === color;
    });

    if (existingItem) {
        existingItem.qty += qty;
    } else {
        cartItems.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            color: color,
            qty: qty
        });
    }

    saveCart(cartItems);
    showCartMessage();
}

function removeFromCart(index) {
    const cartItems = getCart();
    cartItems.splice(index, 1);
    saveCart(cartItems);
    displayCart();
}

function changeQty(index, change) {
    const cartItems = getCart();
    cartItems[index].qty += change;
    if (cartItems[index].qty <= 0) {
        cartItems.splice(index, 1);
    }
    saveCart(cartItems);
    displayCart();
}

function getCartTotal() {
    const cartItems = getCart();
    let total = 0;
    cartItems.forEach(function (item) {
        total += item.price * item.qty;
    });
    return total;
}

function showCartMessage() {
    let message = document.querySelector(".cart-message");
    if (!message) {
        message = document.createElement("div");
        message.className = "cart-message";
        document.body.appendChild(message);
    }
    message.textContent = "Added to cart";
    message.classList.add("show");
    setTimeout(function () {
        message.classList.remove("show");
    }, 2000);
}

function displayCart() {
    const cartContainer = document.querySelector(".cart-items");
    if (!cartContainer) return;

    const cartItems = getCart();
    const cartSummary = document.querySelector(".cart-summary");

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="shop.html">Continue shopping</a></p>';
        cartSummary.style.display = "none";
        return;
    }

    cartSummary.style.display = "block";
    let html = "";

    cartItems.forEach(function (item, index) {
        html += '<div class="cart-item">';
        html += '<img src="' + item.image + '" alt="' + item.name + '">';
        html += '<div class="cart-item-details">';
        html += '<h3>' + item.name + '</h3>';
        if (item.size) html += '<p>Size: ' + item.size + '</p>';
        if (item.color) html += '<p>Colour: ' + item.color + '</p>';
        html += '<p class="cart-item-price">' + formatPrice(item.price) + '</p>';
        html += '</div>';
        html += '<div class="cart-item-controls">';
        html += '<button onclick="changeQty(' + index + ', -1)">−</button>';
        html += '<span>' + item.qty + '</span>';
        html += '<button onclick="changeQty(' + index + ', 1)">+</button>';
        html += '</div>';
        html += '<p class="cart-item-total">' + formatPrice(item.price * item.qty) + '</p>';
        html += '<button class="remove-btn" onclick="removeFromCart(' + index + ')">Remove</button>';
        html += '</div>';
    });

    cartContainer.innerHTML = html;

    const subtotal = getCartTotal();
    document.querySelector(".subtotal").textContent = formatPrice(subtotal);
    document.querySelector(".total-price").textContent = formatPrice(subtotal);
}

document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    displayCart();
});
