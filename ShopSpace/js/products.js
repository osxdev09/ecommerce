const products = [
    {
        id: 1,
        name: "Classic Cotton T-Shirt",
        price: 24.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        description: "A soft, breathable 100% cotton t-shirt with a regular fit. A everyday essential that pairs well with anything.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Black", "Grey"],
        featured: true
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        price: 59.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
        description: "Stretch denim jeans with a modern slim fit. Comfortable enough for all-day wear, sharp enough for a night out.",
        sizes: ["30", "32", "34", "36"],
        colors: ["Blue", "Black"],
        featured: true
    },
    {
        id: 3,
        name: "Linen Summer Shirt",
        price: 44.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
        description: "A lightweight linen shirt that keeps you cool in warm weather. Features a relaxed fit and button-down collar.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Beige", "White", "Olive"],
        featured: false
    },
    {
        id: 4,
        name: "Wool Knit Sweater",
        price: 69.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80",
        description: "A warm, chunky knit sweater made from a soft wool blend. Perfect for layering in colder months.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Brown", "Grey", "Navy"],
        featured: false
    },
    {
        id: 5,
        name: "Leather Bifold Wallet",
        price: 34.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
        description: "A handcrafted genuine leather wallet with multiple card slots and a full-length cash compartment.",
        sizes: [],
        colors: ["Brown", "Black"],
        featured: true
    },
    {
        id: 6,
        name: "Canvas Tote Bag",
        price: 29.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        description: "A durable heavy-duty canvas tote with reinforced handles. Great for groceries, books or daily carry.",
        sizes: [],
        colors: ["Natural", "Black"],
        featured: false
    },
    {
        id: 7,
        name: "Everyday Running Sneakers",
        price: 89.99,
        category: "footwear",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        description: "Lightweight sneakers with cushioned soles and breathable mesh uppers. Built for comfort on the move.",
        sizes: ["40", "41", "42", "43", "44", "45"],
        colors: ["Red", "White", "Black"],
        featured: true
    },
    {
        id: 8,
        name: "Genuine Leather Belt",
        price: 27.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80",
        description: "A classic leather belt with a brushed metal buckle. A timeless accessory that finishes any outfit.",
        sizes: ["S", "M", "L"],
        colors: ["Brown", "Black"],
        featured: false
    },
    {
        id: 9,
        name: "Denim Trucker Jacket",
        price: 79.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=800&q=80",
        description: "A classic trucker jacket in durable stonewashed denim. Works year-round over tees, shirts or hoodies.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blue", "Black"],
        featured: false
    },
    {
        id: 10,
        name: "Polarized Sunglasses",
        price: 39.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
        description: "Polarized lenses with 100% UV protection in a lightweight acetate frame. Includes a hard carry case.",
        sizes: [],
        colors: ["Black", "Tortoise"],
        featured: false
    },
    {
        id: 11,
        name: "Classic Baseball Cap",
        price: 19.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
        description: "A six-panel cotton cap with an adjustable strap. A simple staple for sunny days.",
        sizes: [],
        colors: ["Black", "Navy", "Beige"],
        featured: false
    },
    {
        id: 12,
        name: "Essential Fleece Hoodie",
        price: 54.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
        description: "A mid-weight fleece hoodie with a kangaroo pocket and adjustable drawstring hood. Warm without the bulk.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Grey", "Black", "Olive"],
        featured: true
    }
];

function getProductById(id) {
    return products.find(function (product) {
        return product.id === id;
    });
}

function formatPrice(price) {
    return "$" + price.toFixed(2);
}
