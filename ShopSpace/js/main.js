document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (navToggle) {
        navToggle.addEventListener("click", function () {
            navLinks.classList.toggle("open");
        });
    }

    const featuredGrid = document.querySelector(".featured-grid");
    if (featuredGrid) {
        const featuredProducts = products.filter(function (product) {
            return product.featured;
        });
        featuredGrid.innerHTML = featuredProducts.map(createProductCard).join("");
    }

    const shopGrid = document.querySelector(".shop-grid");
    if (shopGrid) {
        displayProducts();
        const searchInput = document.querySelector("#search-input");
        const sortSelect = document.querySelector("#sort-select");
        const filterButtons = document.querySelectorAll(".filter-btn");

        if (searchInput) {
            searchInput.addEventListener("input", displayProducts);
        }
        if (sortSelect) {
            sortSelect.addEventListener("change", displayProducts);
        }
        filterButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                filterButtons.forEach(function (b) {
                    b.classList.remove("active");
                });
                btn.classList.add("active");
                displayProducts();
            });
        });
    }

    const productDetail = document.querySelector(".product-detail");
    if (productDetail) {
        displayProductDetail();
    }
});

function createProductCard(product) {
    return '<div class="product-card">' +
        '<a href="product.html?id=' + product.id + '">' +
        '<img src="' + product.image + '" alt="' + product.name + '">' +
        '<h3>' + product.name + '</h3>' +
        '<p class="product-category">' + product.category + '</p>' +
        '<p class="product-price">' + formatPrice(product.price) + '</p>' +
        '</a>' +
        '<button class="add-btn" onclick="addToCart(' + product.id + ')">Add to Cart</button>' +
        '</div>';
}

function displayProducts() {
    const shopGrid = document.querySelector(".shop-grid");
    if (!shopGrid) return;

    const searchInput = document.querySelector("#search-input");
    const sortSelect = document.querySelector("#sort-select");
    const activeFilter = document.querySelector(".filter-btn.active");

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    const sortValue = sortSelect ? sortSelect.value : "default";
    const category = activeFilter ? activeFilter.dataset.category : "all";

    let filteredProducts = products.filter(function (product) {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = category === "all" || product.category === category;
        return matchesSearch && matchesCategory;
    });

    if (sortValue === "price-low") {
        filteredProducts.sort(function (a, b) {
            return a.price - b.price;
        });
    } else if (sortValue === "price-high") {
        filteredProducts.sort(function (a, b) {
            return b.price - a.price;
        });
    }

    if (filteredProducts.length === 0) {
        shopGrid.innerHTML = '<p class="no-results">No products found.</p>';
        return;
    }

    shopGrid.innerHTML = filteredProducts.map(createProductCard).join("");
}

function displayProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id")) || 1;
    const product = getProductById(productId);

    if (!product) {
        document.querySelector(".product-detail").innerHTML = '<p>Product not found. <a href="shop.html">Back to shop</a></p>';
        return;
    }

    document.title = product.name + " - ShopSpace";

    let sizeHtml = "";
    if (product.sizes.length > 0) {
        sizeHtml = '<div class="option-group"><label>Size</label><div class="option-buttons" id="size-options">';
        product.sizes.forEach(function (size) {
            sizeHtml += '<button type="button" class="option-btn" data-size="' + size + '">' + size + '</button>';
        });
        sizeHtml += '</div></div>';
    }

    let colorHtml = "";
    if (product.colors.length > 0) {
        colorHtml = '<div class="option-group"><label>Colour</label><select id="color-select">';
        product.colors.forEach(function (color) {
            colorHtml += '<option value="' + color + '">' + color + '</option>';
        });
        colorHtml += '</select></div>';
    }

    document.querySelector(".product-detail").innerHTML =
        '<div class="product-image">' +
        '<img src="' + product.image + '" alt="' + product.name + '">' +
        '</div>' +
        '<div class="product-info">' +
        '<p class="product-category">' + product.category + '</p>' +
        '<h1>' + product.name + '</h1>' +
        '<p class="product-price">' + formatPrice(product.price) + '</p>' +
        '<p class="product-description">' + product.description + '</p>' +
        sizeHtml +
        colorHtml +
        '<div class="option-group">' +
        '<label for="qty-input">Quantity</label>' +
        '<div class="qty-selector">' +
        '<button type="button" id="qty-minus">−</button>' +
        '<input type="number" id="qty-input" value="1" min="1">' +
        '<button type="button" id="qty-plus">+</button>' +
        '</div>' +
        '</div>' +
        '<button class="add-btn large" id="detail-add-btn">Add to Cart</button>' +
        '</div>';

    let selectedSize = product.sizes.length > 0 ? "" : "";

    const sizeButtons = document.querySelectorAll("#size-options .option-btn");
    sizeButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            sizeButtons.forEach(function (b) {
                b.classList.remove("selected");
            });
            btn.classList.add("selected");
            selectedSize = btn.dataset.size;
        });
    });

    const qtyInput = document.querySelector("#qty-input");
    document.querySelector("#qty-minus").addEventListener("click", function () {
        if (qtyInput.value > 1) qtyInput.value--;
    });
    document.querySelector("#qty-plus").addEventListener("click", function () {
        qtyInput.value++;
    });

    document.querySelector("#detail-add-btn").addEventListener("click", function () {
        const qty = parseInt(qtyInput.value) || 1;
        const color = document.querySelector("#color-select")
            ? document.querySelector("#color-select").value
            : "";

        if (product.sizes.length > 0 && !selectedSize) {
            alert("Please select a size.");
            return;
        }

        addToCart(product.id, qty, selectedSize, color);
    });

    displayRelatedProducts(product);
}

function displayRelatedProducts(product) {
    const relatedGrid = document.querySelector(".related-grid");
    if (!relatedGrid) return;

    const related = products.filter(function (p) {
        return p.category === product.category && p.id !== product.id;
    }).slice(0, 4);

    if (related.length === 0) {
        relatedGrid.innerHTML = "";
        return;
    }

    relatedGrid.innerHTML = related.map(createProductCard).join("");
}
