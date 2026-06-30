// ==========================================================================
// Database & Configuration
// ==========================================================================
const products = [
    {
        id: 1,
        title: "Rest & Restore CBD Drops",
        category: "ingestible",
        price: 59.00,
        images: ["assets/product_oil.jpg"],
        description: "Experience premium, broad-spectrum CBD oil. Carefully formulated with organic MCT carrier oil and organic peppermint oil to support daily calmness, restfulness, and overall neurological recovery.",
        specs: [
            "1000mg Broad-Spectrum CBD per bottle",
            "MCT Coconut Carrier Oil for optimal absorption",
            "Refreshing organic peppermint essence",
            "Zero THC, pesticides, or heavy metals"
        ]
    },
    {
        id: 2,
        title: "Mint & Hemp Soothing Lip Balm",
        category: "topical",
        price: 12.00,
        images: [
            "assets/product_balm_1.jpg",
            "assets/product_balm_2.jpg",
            "assets/product_balm_3.jpg"
        ],
        description: "Sooth dry, chapped lips with the natural power of organic hemp oil, raw shea butter, and pure beeswax. Provides a protective cooling layer of mint-infused hydration that lasts all day.",
        specs: [
            "100mg Organic cold-pressed hemp seed oil",
            "Formulated with beeswax, shea butter, & vitamin E",
            "Refreshing, cooling organic peppermint oil",
            "100% natural, cruelty-free, and chemical-free"
        ]
    },
    {
        id: 3,
        title: "Daily Balance CBD Gummies",
        category: "ingestible",
        price: 38.00,
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600"],
        description: "Infused with 25mg of premium CBD isolate, these organic, vegan fruit gummies make taking your daily dosage delicious and effortless. Perfect for stress relief on the go.",
        specs: [
            "25mg CBD isolate per organic gummy",
            "Naturally flavored with delicious organic berries",
            "100% Vegan, gluten-free, and organic ingredients",
            "Individually batch tested for purity"
        ]
    },
    {
        id: 4,
        title: "Hemp Glow Facial Oil",
        category: "topical",
        price: 45.00,
        images: ["https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?auto=format&fit=crop&q=80&w=600"],
        description: "Unlock natural, glowing skin with cold-pressed hemp seed oil enriched with rosehip seed oil and plant-based squalane. Restores elasticity and balances hydration.",
        specs: [
            "Organic cold-pressed hemp seed oil base",
            "Infused with Rosehip seed oil and Squalane",
            "Locks in skin moisture and balances natural oils",
            "Dermatologist tested and hypoallergenic"
        ]
    }
];

// App State
let cart = [];
let cardCarouselIndices = {
    2: 0 // Product ID 2 starts at index 0
};
let modalCarouselIndex = 0;
let quizAnswers = {
    goal: null,
    experience: null,
    method: null
};

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Theme Toggle Handler
    initTheme();

    // Shopping Cart Drawer Handlers
    initCartDrawer();

    // Dosage Calculator Setup
    initDosageCalculator();

    // Wellness Quiz Setup
    initQuiz();

    // Product Filter Tabs Setup
    initProductFilters();
});

// ==========================================================================
// Theme Management (Daylight / Forest Night)
// ==========================================================================
function initTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    
    // Check saved theme or system default
    const savedTheme = localStorage.getItem("theme") || "daylight";
    document.documentElement.setAttribute("data-theme", savedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "daylight" ? "forest-night" : "daylight";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
}

// ==========================================================================
// Card Carousel Logic (For Product Cards on Main Page)
// ==========================================================================
window.navigateCardCarousel = function(productId, direction) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.images || product.images.length <= 1) return;

    let currentIndex = cardCarouselIndices[productId] || 0;
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = product.images.length - 1;
    } else if (currentIndex >= product.images.length) {
        currentIndex = 0;
    }

    setCardCarouselIndex(productId, currentIndex);
};

window.setCardCarouselIndex = function(productId, index) {
    cardCarouselIndices[productId] = index;
    
    const track = document.getElementById(`card-carousel-track-${productId}`);
    const dotsContainer = document.getElementById(`card-carousel-dots-${productId}`);
    
    if (!track || !dotsContainer) return;

    // Update images
    const images = track.querySelectorAll(".product-img");
    images.forEach((img, i) => {
        if (i === index) {
            img.classList.add("active");
        } else {
            img.classList.remove("active");
        }
    });

    // Update dots
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
};

// ==========================================================================
// Modal Carousel Logic (Inside Product Detail Modal)
// ==========================================================================
window.navigateModalCarousel = function(productId, direction) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.images || product.images.length <= 1) return;

    modalCarouselIndex += direction;

    if (modalCarouselIndex < 0) {
        modalCarouselIndex = product.images.length - 1;
    } else if (modalCarouselIndex >= product.images.length) {
        modalCarouselIndex = 0;
    }

    setModalCarouselIndex(productId, modalCarouselIndex);
};

window.setModalCarouselIndex = function(productId, index) {
    modalCarouselIndex = index;
    
    const track = document.getElementById("modal-carousel-track");
    const dotsContainer = document.getElementById("modal-carousel-dots");
    
    if (!track || !dotsContainer) return;

    // Update image active classes
    const images = track.querySelectorAll("img");
    images.forEach((img, i) => {
        if (i === index) {
            img.classList.add("active");
        } else {
            img.classList.remove("active");
        }
    });

    // Update dot active classes
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
};

// ==========================================================================
// Product Filters
// ==========================================================================
function initProductFilters() {
    const filterTabs = document.querySelectorAll(".filter-tab");
    const productCards = document.querySelectorAll(".product-card");

    filterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            filterTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const filter = tab.getAttribute("data-filter");
            
            productCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

// ==========================================================================
// Shopping Cart Functionality
// ==========================================================================
function initCartDrawer() {
    const cartToggle = document.getElementById("cart-toggle");
    const cartClose = document.getElementById("cart-close");
    const cartOverlay = document.getElementById("cart-drawer-overlay");
    const cartDrawer = document.getElementById("cart-drawer");

    const toggleOpen = () => {
        cartDrawer.classList.toggle("open");
        cartOverlay.classList.toggle("open");
    };

    cartToggle.addEventListener("click", toggleOpen);
    cartClose.addEventListener("click", toggleOpen);
    cartOverlay.addEventListener("click", toggleOpen);
}

window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1
        });
    }

    updateCartBadge();
    renderCart();
    
    // Automatically slide cart open for feedback
    document.getElementById("cart-drawer").classList.add("open");
    document.getElementById("cart-drawer-overlay").classList.add("open");
};

function updateCartBadge() {
    const cartBadge = document.querySelector(".cart-count");
    const totalQty = cart.reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = totalQty;
    
    // Smooth pulse animation
    cartBadge.classList.add("pulse");
    setTimeout(() => cartBadge.classList.remove("pulse"), 300);
}

function renderCart() {
    const container = document.getElementById("cart-items-container");
    const totalVal = document.getElementById("cart-total-val");
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-message">
                <i data-lucide="shopping-cart"></i>
                <p>Your cart is empty. Begin finding your balance today.</p>
            </div>
        `;
        totalVal.textContent = "$0.00";
        lucide.createIcons();
        return;
    }

    let cartHtml = "";
    let subtotal = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;

        subtotal += product.price * item.quantity;
        const itemImage = product.images[0];

        cartHtml += `
            <div class="cart-item">
                <img src="${itemImage}" alt="${product.title}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=200'">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${product.title}</h4>
                    <div class="cart-item-price">$${product.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="changeQuantity(${product.id}, -1)">-</button>
                            <span class="quantity-val">${item.quantity}</span>
                            <button class="quantity-btn" onclick="changeQuantity(${product.id}, 1)">+</button>
                        </div>
                        <button class="btn-remove" onclick="removeCartItem(${product.id})">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = cartHtml;
    totalVal.textContent = `$${subtotal.toFixed(2)}`;
}

window.changeQuantity = function(productId, amount) {
    const item = cart.find(item => item.productId === productId);
    if (!item) return;

    item.quantity += amount;
    if (item.quantity <= 0) {
        removeCartItem(productId);
    } else {
        updateCartBadge();
        renderCart();
    }
};

window.removeCartItem = function(productId) {
    cart = cart.filter(item => item.productId !== productId);
    updateCartBadge();
    renderCart();
};

window.checkoutSimulator = function() {
    if (cart.length === 0) {
        alert("Please add items to your cart before checking out.");
        return;
    }
    alert("Checkout Successful! Thank you for purchasing from Kennebis Hemp. (Simulator)");
    cart = [];
    updateCartBadge();
    renderCart();
    document.getElementById("cart-drawer").classList.remove("open");
    document.getElementById("cart-drawer-overlay").classList.remove("open");
};

// ==========================================================================
// Product Detail Modals (including image carousel inside)
// ==========================================================================
window.openProductDetail = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const target = document.getElementById("modal-content-target");
    
    // Check if the product has multiple images (Lip Balm)
    let imageSectionHtml = "";
    if (product.images.length > 1) {
        modalCarouselIndex = 0; // Reset index
        
        let trackHtml = "";
        let dotsHtml = "";
        
        product.images.forEach((imgSrc, i) => {
            const activeClass = i === 0 ? "active" : "";
            trackHtml += `<img src="${imgSrc}" alt="${product.title} Detail Image ${i+1}" class="${activeClass}" onerror="this.src='https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600'">`;
            dotsHtml += `<span class="dot ${activeClass}" onclick="setModalCarouselIndex(${product.id}, ${i})"></span>`;
        });

        imageSectionHtml = `
            <div class="modal-carousel-container">
                <div class="modal-carousel-track" id="modal-carousel-track">
                    ${trackHtml}
                </div>
                <button class="modal-carousel-nav prev" onclick="navigateModalCarousel(${product.id}, -1)">
                    <i data-lucide="chevron-left"></i>
                </button>
                <button class="modal-carousel-nav next" onclick="navigateModalCarousel(${product.id}, 1)">
                    <i data-lucide="chevron-right"></i>
                </button>
                <div class="modal-carousel-dots" id="modal-carousel-dots">
                    ${dotsHtml}
                </div>
            </div>
        `;
    } else {
        imageSectionHtml = `<img src="${product.images[0]}" alt="${product.title}" class="modal-product-img" onerror="this.src='https://images.unsplash.com/photo-1611079830811-b65d1d644af2?auto=format&fit=crop&q=80&w=600'">`;
    }

    let specsHtml = "";
    product.specs.forEach(spec => {
        specsHtml += `<li><i data-lucide="check-circle-2"></i> <span>${spec}</span></li>`;
    });

    target.innerHTML = `
        <div class="modal-product-layout">
            ${imageSectionHtml}
            <div class="modal-product-details">
                <span class="modal-product-tag">${product.category}</span>
                <h2>${product.title}</h2>
                <div class="modal-product-price">$${product.price.toFixed(2)}</div>
                <p class="modal-product-desc">${product.description}</p>
                <ul class="modal-specs-list">
                    ${specsHtml}
                </ul>
                <button class="btn btn-primary" onclick="addToCart(${product.id}); closeProductDetail();">Add to Cart</button>
            </div>
        </div>
    `;

    const modal = document.getElementById("detail-modal");
    modal.classList.add("open");
    
    // Re-create icons dynamically in the newly rendered HTML
    lucide.createIcons();
};

window.closeProductDetail = function() {
    document.getElementById("detail-modal").classList.remove("open");
};

// Close detail modal when clicking overlay (outside the card)
document.getElementById("detail-modal").addEventListener("click", (e) => {
    if (e.target.id === "detail-modal") {
        closeProductDetail();
    }
});

// ==========================================================================
// CBD Dosage Calculator Guide
// ==========================================================================
function initDosageCalculator() {
    const weightInput = document.getElementById("calc-weight");
    const weightValText = document.getElementById("weight-val");
    const dosageValueText = document.getElementById("dosage-num");
    const strengthRadios = document.querySelectorAll('input[name="strength"]');

    function calculateDosage() {
        const weight = parseInt(weightInput.value);
        weightValText.textContent = `${weight} lbs`;

        let selectedStrength = "mild";
        strengthRadios.forEach(radio => {
            if (radio.checked) {
                selectedStrength = radio.value;
            }
        });

        // Compute dose: mild: 0.1mg/lb, moderate: 0.2mg/lb, intense: 0.3mg/lb
        let multiplier = 0.1;
        if (selectedStrength === "moderate") {
            multiplier = 0.2;
        } else if (selectedStrength === "intense") {
            multiplier = 0.3;
        }

        const rawDosage = weight * multiplier;
        const roundedDosage = Math.round(rawDosage);
        dosageValueText.textContent = roundedDosage;
    }

    weightInput.addEventListener("input", calculateDosage);
    strengthRadios.forEach(radio => {
        radio.addEventListener("change", calculateDosage);
    });

    calculateDosage(); // run initially
}

// ==========================================================================
// Wellness Product Quiz Finder
// ==========================================================================
function initQuiz() {
    const steps = [
        document.getElementById("q-step-1"),
        document.getElementById("q-step-2"),
        document.getElementById("q-step-3"),
        document.getElementById("q-result")
    ];
    
    let currentQuizStep = 0;

    // Quiz options click events
    document.querySelectorAll(".quiz-option").forEach(option => {
        option.addEventListener("click", () => {
            const stepId = option.closest(".quiz-step").id;
            const answer = option.getAttribute("data-answer");

            if (stepId === "q-step-1") {
                quizAnswers.goal = answer;
            } else if (stepId === "q-step-2") {
                quizAnswers.experience = answer;
            } else if (stepId === "q-step-3") {
                quizAnswers.method = answer;
            }

            goToNextQuizStep();
        });
    });

    function goToNextQuizStep() {
        steps[currentQuizStep].classList.remove("active");
        currentQuizStep++;

        if (currentQuizStep === 3) {
            evaluateQuizResults();
        }

        steps[currentQuizStep].classList.add("active");
    }

    function evaluateQuizResults() {
        const target = document.getElementById("quiz-recommendation-target");
        let recommendedProduct = null;

        // Simple rules for recommendation mapping
        if (quizAnswers.method === "topical") {
            if (quizAnswers.goal === "relief") {
                recommendedProduct = products.find(p => p.id === 2); // Lip balm
            } else {
                recommendedProduct = products.find(p => p.id === 4); // Facial Oil
            }
        } else {
            // Ingestible
            if (quizAnswers.experience === "beginner" || quizAnswers.experience === "intermediate") {
                recommendedProduct = products.find(p => p.id === 3); // Gummies
            } else {
                recommendedProduct = products.find(p => p.id === 1); // Drops (for advanced goal)
            }
        }

        if (!recommendedProduct) {
            recommendedProduct = products[0]; // default drops
        }

        target.innerHTML = `
            <div class="recommendation-card">
                <img src="${recommendedProduct.images[0]}" alt="${recommendedProduct.title}" class="rec-img" onerror="this.src='https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=200'">
                <div class="rec-info">
                    <h4>${recommendedProduct.title}</h4>
                    <p>$${recommendedProduct.price.toFixed(2)}</p>
                    <button class="btn btn-secondary" onclick="addToCart(${recommendedProduct.id});">Select Product</button>
                </div>
            </div>
        `;
    }

    // Restart Quiz
    document.getElementById("quiz-restart").addEventListener("click", () => {
        steps[currentQuizStep].classList.remove("active");
        currentQuizStep = 0;
        quizAnswers = { goal: null, experience: null, method: null };
        steps[currentQuizStep].classList.add("active");
    });
}
