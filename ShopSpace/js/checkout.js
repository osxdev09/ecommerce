document.addEventListener("DOMContentLoaded", function () {
    const checkoutPage = document.querySelector(".checkout-page");
    if (!checkoutPage) return;

    displayOrderSummary();

    const checkoutForm = document.querySelector("#checkout-form");
    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();
        placeOrder();
    });
});

function displayOrderSummary() {
    const orderItems = document.querySelector(".order-items");
    if (!orderItems) return;

    const cartItems = getCart();

    if (cartItems.length === 0) {
        orderItems.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="shop.html">Continue shopping</a></p>';
        document.querySelector("#place-order-btn").style.display = "none";
        return;
    }

    let html = "";
    cartItems.forEach(function (item) {
        html += '<div class="order-item">';
        html += '<img src="' + item.image + '" alt="' + item.name + '">';
        html += '<div class="order-item-details">';
        html += '<h4>' + item.name + '</h4>';
        if (item.size) html += '<p>Size: ' + item.size + '</p>';
        if (item.color) html += '<p>Colour: ' + item.color + '</p>';
        html += '<p>Qty: ' + item.qty + '</p>';
        html += '</div>';
        html += '<p class="order-item-price">' + formatPrice(item.price * item.qty) + '</p>';
        html += '</div>';
    });

    orderItems.innerHTML = html;

    const total = getCartTotal();
    document.querySelector(".checkout-subtotal").textContent = formatPrice(total);
    document.querySelector(".checkout-total").textContent = formatPrice(total);
}

function placeOrder() {
    const name = document.querySelector("#customer-name").value.trim();
    const email = document.querySelector("#customer-email").value.trim();
    const phone = document.querySelector("#customer-phone").value.trim();
    const address = document.querySelector("#customer-address").value.trim();

    if (name === "" || email === "" || phone === "" || address === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address.");
        return;
    }

    if (phone.length < 7) {
        alert("Please enter a valid phone number.");
        return;
    }

    const orderNumber = "SS-" + Math.floor(100000 + Math.random() * 900000);

    document.querySelector(".checkout-page").innerHTML =
        '<div class="order-confirmation">' +
        '<h1>Thank you for your order!</h1>' +
        '<p>Your order <strong>' + orderNumber + '</strong> has been placed successfully.</p>' +
        '<p>A confirmation email has been sent to <strong>' + email + '</strong>.</p>' +
        '<p>We will contact you on <strong>' + phone + '</strong> if anything comes up with your delivery.</p>' +
        '<a href="shop.html" class="add-btn large">Continue Shopping</a>' +
        '</div>';

    localStorage.removeItem("shopspace_cart");
    updateCartCount();
}
