// Product data with 8 realistic items
const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 199.99,
        img: "https://picsum.photos/seed/headphones/400/300",
        category: "electronics"
    },
    {
        id: 2,
        name: "Organic Cotton T-Shirt",
        price: 29.99,
        img: "https://picsum.photos/seed/tshirt/400/300",
        category: "clothing"
    },
    {
        id: 3,
        name: "Stainless Steel Water Bottle",
        price: 24.99,
        img: "https://picsum.photos/seed/bottle/400/300",
        category: "accessories"
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 89.99,
        img: "https://picsum.photos/seed/speaker/400/300",
        category: "electronics"
    },
    {
        id: 5,
        name: "Leather Crossbody Bag",
        price: 79.99,
        img: "https://picsum.photos/seed/bag/400/300",
        category: "accessories"
    },
    {
        id: 6,
        name: "Smart Fitness Watch",
        price: 249.99,
        img: "https://picsum.photos/seed/watch/400/300",
        category: "electronics"
    },
    {
        id: 7,
        name: "Cozy Knit Sweater",
        price: 59.99,
        img: "https://picsum.photos/seed/sweater/400/300",
        category: "clothing"
    },
    {
        id: 8,
        name: "Wireless Phone Charger",
        price: 34.99,
        img: "https://picsum.photos/seed/charger/400/300",
        category: "electronics"
    }
];

// Cart state management
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.filteredProducts = [...products];
        this.init();
    }

    init() {
        this.renderProducts();
        this.renderCart();
        this.bindEvents();
        this.updateCartBadge();
    }

    // Cart data model: [{id, name, price, img, qty}]
    loadCart() {
        try {
            const saved = localStorage.getItem('arcadia-cart');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('arcadia-cart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    addToCart(id) {
        const product = products.find(p => p.id === id);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
                qty: 1
            });
        }

        this.saveCart();
        this.renderCart();
        this.updateCartBadge();
        this.showToast(`${product.name} added to cart!`);
    }

    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
        this.renderCart();
        this.updateCartBadge();
    }

    updateQty(id, delta) {
        const item = this.cart.find(item => item.id === id);
        if (!item) return;

        item.qty += delta;
        if (item.qty <= 0) {
            this.removeFromCart(id);
        } else {
            this.saveCart();
            this.renderCart();
            this.updateCartBadge();
        }
    }

    getSubtotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.qty), 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.renderCart();
        this.updateCartBadge();
    }

    // Product rendering
    renderProducts() {
        const grid = document.getElementById('products-grid');
        if (!grid) return;

        grid.innerHTML = this.filteredProducts.map(product => `
            <div class="product-card" data-id="${product.id}">
                <img 
                    src="${product.img}" 
                    alt="${product.name}"
                    class="product-image"
                    width="400"
                    height="300"
                    loading="lazy"
                    decoding="async"
                >
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button 
                        class="add-to-cart" 
                        data-id="${product.id}"
                        aria-label="Add ${product.name} to cart"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');

        // Bind add to cart events
        grid.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(e.target.dataset.id);
                this.addToCart(id);
            });
        });
    }

    // Cart rendering
    renderCart() {
        const cartItems = document.getElementById('cart-items');
        const subtotalAmount = document.getElementById('subtotal-amount');
        
        if (!cartItems || !subtotalAmount) return;

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <p>Your cart is empty</p>
                    <p>Add some products to get started!</p>
                </div>
            `;
            subtotalAmount.textContent = '$0.00';
            return;
        }

        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img 
                    src="${item.img}" 
                    alt="${item.name}"
                    class="cart-item-image"
                    width="60"
                    height="60"
                    loading="lazy"
                    decoding="async"
                >
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" data-id="${item.id}" data-delta="-1" aria-label="Decrease quantity">-</button>
                        <span class="qty-display">${item.qty}</span>
                        <button class="qty-btn" data-id="${item.id}" data-delta="1" aria-label="Increase quantity">+</button>
                        <button class="remove-btn" data-id="${item.id}" aria-label="Remove item">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');

        subtotalAmount.textContent = `$${this.getSubtotal().toFixed(2)}`;

        // Bind cart item events
        cartItems.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const delta = parseInt(e.target.dataset.delta);
                this.updateQty(id, delta);
            });
        });

        cartItems.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.removeFromCart(id);
            });
        });
    }

    updateCartBadge() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.qty, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    // Search and filter functionality
    filterProducts() {
        const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
        const priceFilter = document.getElementById('price-filter')?.value || '';
        const sortBy = document.getElementById('sort-select')?.value || 'name';

        let filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            const matchesPrice = this.matchesPriceFilter(product.price, priceFilter);
            return matchesSearch && matchesPrice;
        });

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        this.filteredProducts = filtered;
        this.renderProducts();
    }

    matchesPriceFilter(price, filter) {
        if (!filter) return true;
        
        switch (filter) {
            case '0-25':
                return price >= 0 && price <= 25;
            case '25-50':
                return price > 25 && price <= 50;
            case '50-100':
                return price > 50 && price <= 100;
            case '100+':
                return price > 100;
            default:
                return true;
        }
    }

    // Toast notification
    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Event binding
    bindEvents() {
        // Cart toggle
        const cartToggle = document.getElementById('cart-toggle');
        const cartDrawer = document.getElementById('cart-drawer');
        const cartOverlay = document.getElementById('cart-overlay');
        const cartClose = document.getElementById('cart-close');

        if (cartToggle && cartDrawer && cartOverlay && cartClose) {
            cartToggle.addEventListener('click', () => this.toggleCart(true));
            cartClose.addEventListener('click', () => this.toggleCart(false));
            cartOverlay.addEventListener('click', () => this.toggleCart(false));
        }

        // Search and filter
        const searchInput = document.getElementById('search-input');
        const priceFilter = document.getElementById('price-filter');
        const sortSelect = document.getElementById('sort-select');

        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterProducts());
        }
        if (priceFilter) {
            priceFilter.addEventListener('change', () => this.filterProducts());
        }
        if (sortSelect) {
            sortSelect.addEventListener('change', () => this.filterProducts());
        }

        // Checkout modal
        const checkoutBtn = document.getElementById('checkout-btn');
        const checkoutModal = document.getElementById('checkout-modal');
        const modalClose = document.getElementById('modal-close');
        const modalCancel = document.getElementById('modal-cancel');
        const placeOrder = document.getElementById('place-order');

        if (checkoutBtn && checkoutModal) {
            checkoutBtn.addEventListener('click', () => this.openCheckoutModal());
        }
        if (modalClose && modalCancel) {
            modalClose.addEventListener('click', () => this.closeCheckoutModal());
            modalCancel.addEventListener('click', () => this.closeCheckoutModal());
        }
        if (placeOrder) {
            placeOrder.addEventListener('click', () => this.placeOrder());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (checkoutModal?.classList.contains('active')) {
                    this.closeCheckoutModal();
                } else if (cartDrawer?.classList.contains('open')) {
                    this.toggleCart(false);
                }
            }
        });
    }

    // Cart drawer management
    toggleCart(open) {
        const cartDrawer = document.getElementById('cart-drawer');
        const cartOverlay = document.getElementById('cart-overlay');
        const cartToggle = document.getElementById('cart-toggle');

        if (!cartDrawer || !cartOverlay || !cartToggle) return;

        if (open) {
            cartDrawer.classList.add('open');
            cartOverlay.classList.add('active');
            cartToggle.setAttribute('aria-expanded', 'true');
            cartToggle.setAttribute('aria-label', 'Close shopping cart');
            
            // Focus management
            const firstFocusable = cartDrawer.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        } else {
            cartDrawer.classList.remove('open');
            cartOverlay.classList.remove('active');
            cartToggle.setAttribute('aria-expanded', 'false');
            cartToggle.setAttribute('aria-label', 'Open shopping cart');
            cartToggle.focus();
        }
    }

    // Checkout modal management
    openCheckoutModal() {
        const modal = document.getElementById('checkout-modal');
        const orderItems = document.getElementById('order-items');
        const totalAmount = document.getElementById('total-amount');

        if (!modal || !orderItems || !totalAmount) return;

        // Render order items
        orderItems.innerHTML = this.cart.map(item => `
            <div class="order-item">
                <div class="order-item-info">
                    <img 
                        src="${item.img}" 
                        alt="${item.name}"
                        class="order-item-image"
                        width="40"
                        height="40"
                        loading="lazy"
                        decoding="async"
                    >
                    <div class="order-item-details">
                        <div class="order-item-name">${item.name}</div>
                        <div class="order-item-qty">Qty: ${item.qty}</div>
                    </div>
                </div>
                <div class="order-item-price">$${(item.price * item.qty).toFixed(2)}</div>
            </div>
        `).join('');

        totalAmount.textContent = `$${this.getSubtotal().toFixed(2)}`;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus management
        const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        }

        // Trap focus
        this.trapFocus(modal);
    }

    closeCheckoutModal() {
        const modal = document.getElementById('checkout-modal');
        if (!modal) return;

        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Return focus to checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.focus();
        }
    }

    placeOrder() {
        // Mock order placement
        this.showToast('Order placed successfully! Thank you for your purchase.');
        this.clearCart();
        this.closeCheckoutModal();
        this.toggleCart(false);
    }

    // Focus trapping for accessibility
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKey = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        element.addEventListener('keydown', handleTabKey);

        // Clean up event listener when modal closes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (!element.classList.contains('active')) {
                        element.removeEventListener('keydown', handleTabKey);
                        observer.disconnect();
                    }
                }
            });
        });

        observer.observe(element, { attributes: true });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart manager
    window.cartManager = new CartManager();

    // Add loading states and error handling
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.addEventListener('error', () => {
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMWUyYTNiIi8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM5ZmIzZDEiLz4KPHN2Zz4K';
            img.alt = 'Image not available';
        });
    });

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
