// Data Management
const DataManager = {
    // Initialize default data if localStorage is empty
    init() {
        if (!localStorage.getItem('services')) {
            const defaultServices = [
                {
                    id: 1,
                    name: 'Oil Change',
                    description: 'Complete oil change service with premium oil and filter replacement.',
                    price: 49.99,
                    category: 'Maintenance',
                    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop'
                },
                {
                    id: 2,
                    name: 'Brake Service',
                    description: 'Professional brake inspection and repair service.',
                    price: 149.99,
                    category: 'Brakes',
                    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop'
                },
                {
                    id: 3,
                    name: 'Tire Replacement',
                    description: 'Tire installation and balancing service.',
                    price: 199.99,
                    category: 'Tires',
                    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
                },
                {
                    id: 4,
                    name: 'Engine Repair',
                    description: 'Complete engine diagnostics and repair services.',
                    price: 299.99,
                    category: 'Engine',
                    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop'
                },
                {
                    id: 5,
                    name: 'AC Service',
                    description: 'Air conditioning system repair and recharge.',
                    price: 129.99,
                    category: 'HVAC',
                    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop'
                },
                {
                    id: 6,
                    name: 'Body Work',
                    description: 'Professional auto body repair and paint services.',
                    price: 399.99,
                    category: 'Body',
                    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop'
                }
            ];
            localStorage.setItem('services', JSON.stringify(defaultServices));
        }

        if (!localStorage.getItem('products')) {
            const defaultProducts = [
                {
                    id: 1,
                    name: 'Engine Oil - Premium',
                    description: 'High-quality synthetic engine oil for optimal performance.',
                    price: 29.99,
                    stock: 50,
                    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop'
                },
                {
                    id: 2,
                    name: 'Brake Pads Set',
                    description: 'Premium brake pads for reliable stopping power.',
                    price: 79.99,
                    stock: 30,
                    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop'
                },
                {
                    id: 3,
                    name: 'Air Filter',
                    description: 'High-performance air filter for better engine efficiency.',
                    price: 24.99,
                    stock: 40,
                    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop'
                },
                {
                    id: 4,
                    name: 'Car Battery',
                    description: 'Long-lasting automotive battery with warranty.',
                    price: 149.99,
                    stock: 25,
                    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop'
                },
                {
                    id: 5,
                    name: 'Spark Plugs Set',
                    description: 'Premium spark plugs for improved engine performance.',
                    price: 39.99,
                    stock: 60,
                    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop'
                },
                {
                    id: 6,
                    name: 'Windshield Wipers',
                    description: 'High-quality windshield wiper blades for clear visibility.',
                    price: 34.99,
                    stock: 45,
                    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop'
                }
            ];
            localStorage.setItem('products', JSON.stringify(defaultProducts));
        }

        if (!localStorage.getItem('gallery')) {
            const defaultGallery = [
                {
                    id: 1,
                    title: 'Engine Repair',
                    description: 'Complete engine overhaul service',
                    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop'
                },
                {
                    id: 2,
                    title: 'Brake Installation',
                    description: 'Professional brake system installation',
                    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop'
                },
                {
                    id: 3,
                    title: 'Tire Service',
                    description: 'Tire replacement and balancing',
                    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop'
                },
                {
                    id: 4,
                    title: 'Auto Body Work',
                    description: 'Professional body repair and painting',
                    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop'
                },
                {
                    id: 5,
                    title: 'Car Maintenance',
                    description: 'Regular maintenance and inspection',
                    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop'
                },
                {
                    id: 6,
                    title: 'Diagnostic Service',
                    description: 'Advanced vehicle diagnostics',
                    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop'
                },
                {
                    id: 7,
                    title: 'Transmission Repair',
                    description: 'Expert transmission service',
                    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop'
                },
                {
                    id: 8,
                    title: 'Custom Modifications',
                    description: 'Custom auto modifications and upgrades',
                    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop'
                }
            ];
            localStorage.setItem('gallery', JSON.stringify(defaultGallery));
        }
    },

    // Get all services
    getServices() {
        const services = localStorage.getItem('services');
        return services ? JSON.parse(services) : [];
    },

    // Get all products
    getProducts() {
        const products = localStorage.getItem('products');
        return products ? JSON.parse(products) : [];
    },

    // Get all gallery items
    getGallery() {
        const gallery = localStorage.getItem('gallery');
        return gallery ? JSON.parse(gallery) : [];
    }
};

// Navigation
const Navigation = {
    init() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });
        }
    }
};

// Services Display
const ServicesDisplay = {
    // Render services on home page (featured)
    renderFeatured() {
        const container = document.getElementById('featuredServices');
        if (!container) return;

        const services = DataManager.getServices().slice(0, 3);
        container.innerHTML = services.map(service => this.createServiceCard(service)).join('');
    },

    // Render all services on services page
    renderAll() {
        const container = document.getElementById('servicesGrid');
        if (!container) return;

        const services = DataManager.getServices();
        if (services.length === 0) {
            container.innerHTML = '<p class="text-center">No services available. Add some in the Manage page.</p>';
            return;
        }

        container.innerHTML = services.map(service => this.createServiceCard(service)).join('');
    },

    // Create service card HTML
    createServiceCard(service) {
        return `
            <div class="service-card">
                <img src="${service.image || 'https://via.placeholder.com/400x200?text=Service'}" alt="${service.name}" onerror="this.src='https://via.placeholder.com/400x200?text=Service'">
                <div class="service-card-content">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    ${service.category ? `<p><strong>Category:</strong> ${service.category}</p>` : ''}
                    <div class="service-price">$${parseFloat(service.price).toFixed(2)}</div>
                </div>
            </div>
        `;
    }
};

// Products Display
const ProductsDisplay = {
    // Render all products
    renderAll() {
        const container = document.getElementById('productsGrid');
        if (!container) return;

        const products = DataManager.getProducts();
        if (products.length === 0) {
            container.innerHTML = '<p class="text-center">No products available. Add some in the Manage page.</p>';
            return;
        }

        container.innerHTML = products.map(product => this.createProductCard(product)).join('');
    },

    // Create product card HTML
    createProductCard(product) {
        const stockClass = product.stock > 0 ? 'in-stock' : 'out-of-stock';
        const stockText = product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock';

        return `
            <div class="product-card">
                <img src="${product.image || 'https://via.placeholder.com/400x200?text=Product'}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x200?text=Product'">
                <div class="product-card-content">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">$${parseFloat(product.price).toFixed(2)}</div>
                    <div class="product-stock ${stockClass}">${stockText}</div>
                </div>
            </div>
        `;
    }
};

// Gallery Display
const GalleryDisplay = {
    // Render gallery images
    render() {
        const container = document.getElementById('galleryGrid');
        if (!container) return;

        const gallery = DataManager.getGallery();
        if (gallery.length === 0) {
            container.innerHTML = '<p class="text-center">No gallery images available. Add some in the Manage page.</p>';
            return;
        }

        container.innerHTML = gallery.map(item => this.createGalleryItem(item)).join('');
        this.initLightbox();
    },

    // Create gallery item HTML
    createGalleryItem(item) {
        return `
            <div class="gallery-item" data-id="${item.id}">
                <img src="${item.image || 'https://via.placeholder.com/600x400?text=Gallery'}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/600x400?text=Gallery'">
                <div class="gallery-item-overlay">
                    <h3>${item.title}</h3>
                    ${item.description ? `<p>${item.description}</p>` : ''}
                </div>
            </div>
        `;
    },

    // Initialize lightbox functionality
    initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const closeBtn = document.querySelector('.lightbox-close');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (!lightbox || !lightboxImg) return;

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('h3')?.textContent || '';
                const desc = item.querySelector('p')?.textContent || '';

                lightboxImg.src = img.src;
                lightboxCaption.textContent = title + (desc ? ` - ${desc}` : '');
                lightbox.classList.add('active');
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightbox.classList.remove('active');
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }
};

// Contact Form
const ContactForm = {
    init() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(form);
        });
    },

    handleSubmit(form) {
        const formData = new FormData(form);
        const messageDiv = document.getElementById('formMessage');

        // Simulate form submission
        messageDiv.className = 'form-message success';
        messageDiv.textContent = 'Thank you for your message! We will get back to you soon.';
        form.reset();

        // Clear message after 5 seconds
        setTimeout(() => {
            messageDiv.className = 'form-message';
            messageDiv.textContent = '';
        }, 5000);
    }
};

// Page Initialization
const PageInit = {
    init() {
        // Initialize data
        DataManager.init();

        // Initialize navigation
        Navigation.init();

        // Initialize contact form
        ContactForm.init();

        // Load page-specific content
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        switch (currentPage) {
            case 'index.html':
            case '':
                ServicesDisplay.renderFeatured();
                break;
            case 'services.html':
                ServicesDisplay.renderAll();
                ProductsDisplay.renderAll();
                break;
            case 'gallery.html':
                GalleryDisplay.render();
                break;
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    PageInit.init();
});

// Export for use in manage.js
if (typeof window !== 'undefined') {
    window.DataManager = DataManager;
}

