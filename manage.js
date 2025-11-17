// Image handling utility
const ImageHandler = {
    // Convert file to base64
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    },

    // Get image from file input or URL
    async getImage(fileInput, urlInput) {
        const file = fileInput.files[0];
        if (file) {
            return await this.fileToBase64(file);
        }
        if (urlInput && urlInput.value.trim()) {
            return urlInput.value.trim();
        }
        return null;
    },

    // Show image preview
    showPreview(fileInput, urlInput, previewContainer) {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewContainer.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        } else if (urlInput && urlInput.value.trim()) {
            previewContainer.innerHTML = `<img src="${urlInput.value.trim()}" alt="Preview" onerror="this.parentElement.innerHTML=''">`;
        } else {
            previewContainer.innerHTML = '';
        }
    }
};

// Services Management
const ServicesManager = {
    init() {
        this.renderServices();
        this.setupEventListeners();
    },

    setupEventListeners() {
        const addBtn = document.getElementById('addServiceBtn');
        const form = document.getElementById('serviceForm');
        const cancelBtn = document.getElementById('cancelServiceBtn');
        const modal = document.getElementById('serviceModal');
        const closeBtn = modal?.querySelector('.close');
        const imageInput = document.getElementById('serviceImage');
        const imageUrlInput = document.getElementById('serviceImageUrl');
        const imagePreview = document.getElementById('serviceImagePreview');

        if (addBtn) {
            addBtn.addEventListener('click', () => this.openModal());
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveService();
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeModal());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (imageInput) {
            imageInput.addEventListener('change', () => {
                ImageHandler.showPreview(imageInput, imageUrlInput, imagePreview);
            });
        }

        if (imageUrlInput) {
            imageUrlInput.addEventListener('input', () => {
                ImageHandler.showPreview(imageInput, imageUrlInput, imagePreview);
            });
        }

        // Close modal when clicking outside
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    },

    renderServices() {
        const container = document.getElementById('servicesList');
        if (!container) return;

        const services = window.DataManager.getServices();
        
        if (services.length === 0) {
            container.innerHTML = '<p class="text-center">No services yet. Click "Add New Service" to get started.</p>';
            return;
        }

        container.innerHTML = services.map(service => `
            <div class="manage-item">
                <img src="${service.image || 'https://via.placeholder.com/150?text=Service'}" alt="${service.name}" onerror="this.src='https://via.placeholder.com/150?text=Service'">
                <div class="manage-item-info">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <p><strong>Price:</strong> $${parseFloat(service.price).toFixed(2)}</p>
                    ${service.category ? `<p><strong>Category:</strong> ${service.category}</p>` : ''}
                </div>
                <div class="manage-item-actions">
                    <button class="btn-edit" onclick="ServicesManager.editService(${service.id})">Edit</button>
                    <button class="btn-delete" onclick="ServicesManager.deleteService(${service.id})">Delete</button>
                </div>
            </div>
        `).join('');
    },

    openModal(serviceId = null) {
        const modal = document.getElementById('serviceModal');
        const form = document.getElementById('serviceForm');
        const title = document.getElementById('serviceModalTitle');

        if (serviceId) {
            const service = window.DataManager.getServices().find(s => s.id === serviceId);
            if (service) {
                document.getElementById('serviceId').value = service.id;
                document.getElementById('serviceName').value = service.name;
                document.getElementById('serviceDescription').value = service.description;
                document.getElementById('servicePrice').value = service.price;
                document.getElementById('serviceCategory').value = service.category || '';
                document.getElementById('serviceImageUrl').value = service.image || '';
                if (service.image) {
                    document.getElementById('serviceImagePreview').innerHTML = `<img src="${service.image}" alt="Preview">`;
                }
                title.textContent = 'Edit Service';
            }
        } else {
            form.reset();
            document.getElementById('serviceId').value = '';
            document.getElementById('serviceImagePreview').innerHTML = '';
            title.textContent = 'Add Service';
        }

        modal.classList.add('active');
    },

    closeModal() {
        const modal = document.getElementById('serviceModal');
        const form = document.getElementById('serviceForm');
        modal.classList.remove('active');
        form.reset();
        document.getElementById('serviceImagePreview').innerHTML = '';
    },

    async saveService() {
        const id = document.getElementById('serviceId').value;
        const name = document.getElementById('serviceName').value;
        const description = document.getElementById('serviceDescription').value;
        const price = parseFloat(document.getElementById('servicePrice').value);
        const category = document.getElementById('serviceCategory').value;
        const imageInput = document.getElementById('serviceImage');
        const imageUrlInput = document.getElementById('serviceImageUrl');

        if (!name || !description || !price) {
            alert('Please fill in all required fields.');
            return;
        }

        const image = await ImageHandler.getImage(imageInput, imageUrlInput);

        const services = window.DataManager.getServices();
        let service;

        if (id) {
            // Update existing
            service = services.find(s => s.id === parseInt(id));
            if (service) {
                service.name = name;
                service.description = description;
                service.price = price;
                service.category = category || '';
                if (image) service.image = image;
            }
        } else {
            // Create new
            const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
            service = {
                id: newId,
                name,
                description,
                price,
                category: category || '',
                image: image || 'https://via.placeholder.com/400x200?text=Service'
            };
            services.push(service);
        }

        localStorage.setItem('services', JSON.stringify(services));
        this.renderServices();
        this.closeModal();
        
        // Refresh services on other pages if they're open
        if (typeof ServicesDisplay !== 'undefined') {
            ServicesDisplay.renderAll();
            ServicesDisplay.renderFeatured();
        }
    },

    editService(id) {
        this.openModal(id);
    },

    deleteService(id) {
        if (confirm('Are you sure you want to delete this service?')) {
            const services = window.DataManager.getServices().filter(s => s.id !== id);
            localStorage.setItem('services', JSON.stringify(services));
            this.renderServices();
            
            // Refresh services on other pages if they're open
            if (typeof ServicesDisplay !== 'undefined') {
                ServicesDisplay.renderAll();
                ServicesDisplay.renderFeatured();
            }
        }
    }
};

// Products Management
const ProductsManager = {
    init() {
        this.renderProducts();
        this.setupEventListeners();
    },

    setupEventListeners() {
        const addBtn = document.getElementById('addProductBtn');
        const form = document.getElementById('productForm');
        const cancelBtn = document.getElementById('cancelProductBtn');
        const modal = document.getElementById('productModal');
        const closeBtn = modal?.querySelector('.close');
        const imageInput = document.getElementById('productImage');
        const imageUrlInput = document.getElementById('productImageUrl');
        const imagePreview = document.getElementById('productImagePreview');

        if (addBtn) {
            addBtn.addEventListener('click', () => this.openModal());
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProduct();
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeModal());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (imageInput) {
            imageInput.addEventListener('change', () => {
                ImageHandler.showPreview(imageInput, imageUrlInput, imagePreview);
            });
        }

        if (imageUrlInput) {
            imageUrlInput.addEventListener('input', () => {
                ImageHandler.showPreview(imageInput, imageUrlInput, imagePreview);
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    },

    renderProducts() {
        const container = document.getElementById('productsList');
        if (!container) return;

        const products = window.DataManager.getProducts();
        
        if (products.length === 0) {
            container.innerHTML = '<p class="text-center">No products yet. Click "Add New Product" to get started.</p>';
            return;
        }

        container.innerHTML = products.map(product => `
            <div class="manage-item">
                <img src="${product.image || 'https://via.placeholder.com/150?text=Product'}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/150?text=Product'">
                <div class="manage-item-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>Price:</strong> $${parseFloat(product.price).toFixed(2)}</p>
                    <p><strong>Stock:</strong> ${product.stock} units</p>
                </div>
                <div class="manage-item-actions">
                    <button class="btn-edit" onclick="ProductsManager.editProduct(${product.id})">Edit</button>
                    <button class="btn-delete" onclick="ProductsManager.deleteProduct(${product.id})">Delete</button>
                </div>
            </div>
        `).join('');
    },

    openModal(productId = null) {
        const modal = document.getElementById('productModal');
        const form = document.getElementById('productForm');
        const title = document.getElementById('productModalTitle');

        if (productId) {
            const product = window.DataManager.getProducts().find(p => p.id === productId);
            if (product) {
                document.getElementById('productId').value = product.id;
                document.getElementById('productName').value = product.name;
                document.getElementById('productDescription').value = product.description;
                document.getElementById('productPrice').value = product.price;
                document.getElementById('productStock').value = product.stock;
                document.getElementById('productImageUrl').value = product.image || '';
                if (product.image) {
                    document.getElementById('productImagePreview').innerHTML = `<img src="${product.image}" alt="Preview">`;
                }
                title.textContent = 'Edit Product';
            }
        } else {
            form.reset();
            document.getElementById('productId').value = '';
            document.getElementById('productImagePreview').innerHTML = '';
            title.textContent = 'Add Product';
        }

        modal.classList.add('active');
    },

    closeModal() {
        const modal = document.getElementById('productModal');
        const form = document.getElementById('productForm');
        modal.classList.remove('active');
        form.reset();
        document.getElementById('productImagePreview').innerHTML = '';
    },

    async saveProduct() {
        const id = document.getElementById('productId').value;
        const name = document.getElementById('productName').value;
        const description = document.getElementById('productDescription').value;
        const price = parseFloat(document.getElementById('productPrice').value);
        const stock = parseInt(document.getElementById('productStock').value);
        const imageInput = document.getElementById('productImage');
        const imageUrlInput = document.getElementById('productImageUrl');

        if (!name || !description || !price || stock < 0) {
            alert('Please fill in all required fields with valid values.');
            return;
        }

        const image = await ImageHandler.getImage(imageInput, imageUrlInput);

        const products = window.DataManager.getProducts();
        let product;

        if (id) {
            // Update existing
            product = products.find(p => p.id === parseInt(id));
            if (product) {
                product.name = name;
                product.description = description;
                product.price = price;
                product.stock = stock;
                if (image) product.image = image;
            }
        } else {
            // Create new
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            product = {
                id: newId,
                name,
                description,
                price,
                stock,
                image: image || 'https://via.placeholder.com/400x200?text=Product'
            };
            products.push(product);
        }

        localStorage.setItem('products', JSON.stringify(products));
        this.renderProducts();
        this.closeModal();
        
        // Refresh products on other pages if they're open
        if (typeof ProductsDisplay !== 'undefined') {
            ProductsDisplay.renderAll();
        }
    },

    editProduct(id) {
        this.openModal(id);
    },

    deleteProduct(id) {
        if (confirm('Are you sure you want to delete this product?')) {
            const products = window.DataManager.getProducts().filter(p => p.id !== id);
            localStorage.setItem('products', JSON.stringify(products));
            this.renderProducts();
            
            // Refresh products on other pages if they're open
            if (typeof ProductsDisplay !== 'undefined') {
                ProductsDisplay.renderAll();
            }
        }
    }
};

// Gallery Management
const GalleryManager = {
    init() {
        this.renderGallery();
        this.setupEventListeners();
    },

    setupEventListeners() {
        const addBtn = document.getElementById('addGalleryBtn');
        const form = document.getElementById('galleryForm');
        const cancelBtn = document.getElementById('cancelGalleryBtn');
        const modal = document.getElementById('galleryModal');
        const closeBtn = modal?.querySelector('.close');
        const imageInput = document.getElementById('galleryImage');
        const imageUrlInput = document.getElementById('galleryImageUrl');
        const imagePreview = document.getElementById('galleryImagePreview');

        if (addBtn) {
            addBtn.addEventListener('click', () => this.openModal());
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveGalleryItem();
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeModal());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (imageInput) {
            imageInput.addEventListener('change', () => {
                ImageHandler.showPreview(imageInput, imageUrlInput, imagePreview);
            });
        }

        if (imageUrlInput) {
            imageUrlInput.addEventListener('input', () => {
                ImageHandler.showPreview(imageInput, imageUrlInput, imagePreview);
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    },

    renderGallery() {
        const container = document.getElementById('galleryList');
        if (!container) return;

        const gallery = window.DataManager.getGallery();
        
        if (gallery.length === 0) {
            container.innerHTML = '<p class="text-center">No gallery images yet. Click "Add New Image" to get started.</p>';
            return;
        }

        container.innerHTML = gallery.map(item => `
            <div class="manage-item">
                <img src="${item.image || 'https://via.placeholder.com/150?text=Gallery'}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/150?text=Gallery'">
                <div class="manage-item-info">
                    <h3>${item.title}</h3>
                    ${item.description ? `<p>${item.description}</p>` : '<p>No description</p>'}
                </div>
                <div class="manage-item-actions">
                    <button class="btn-edit" onclick="GalleryManager.editGalleryItem(${item.id})">Edit</button>
                    <button class="btn-delete" onclick="GalleryManager.deleteGalleryItem(${item.id})">Delete</button>
                </div>
            </div>
        `).join('');
    },

    openModal(itemId = null) {
        const modal = document.getElementById('galleryModal');
        const form = document.getElementById('galleryForm');
        const title = document.getElementById('galleryModalTitle');

        if (itemId) {
            const item = window.DataManager.getGallery().find(g => g.id === itemId);
            if (item) {
                document.getElementById('galleryId').value = item.id;
                document.getElementById('galleryTitle').value = item.title;
                document.getElementById('galleryDescription').value = item.description || '';
                document.getElementById('galleryImageUrl').value = item.image || '';
                if (item.image) {
                    document.getElementById('galleryImagePreview').innerHTML = `<img src="${item.image}" alt="Preview">`;
                }
                title.textContent = 'Edit Gallery Image';
            }
        } else {
            form.reset();
            document.getElementById('galleryId').value = '';
            document.getElementById('galleryImagePreview').innerHTML = '';
            title.textContent = 'Add Gallery Image';
        }

        modal.classList.add('active');
    },

    closeModal() {
        const modal = document.getElementById('galleryModal');
        const form = document.getElementById('galleryForm');
        modal.classList.remove('active');
        form.reset();
        document.getElementById('galleryImagePreview').innerHTML = '';
    },

    async saveGalleryItem() {
        const id = document.getElementById('galleryId').value;
        const title = document.getElementById('galleryTitle').value;
        const description = document.getElementById('galleryDescription').value;
        const imageInput = document.getElementById('galleryImage');
        const imageUrlInput = document.getElementById('galleryImageUrl');

        if (!title) {
            alert('Please enter a title.');
            return;
        }

        const image = await ImageHandler.getImage(imageInput, imageUrlInput);

        if (!image) {
            alert('Please provide an image (file or URL).');
            return;
        }

        const gallery = window.DataManager.getGallery();
        let item;

        if (id) {
            // Update existing
            item = gallery.find(g => g.id === parseInt(id));
            if (item) {
                item.title = title;
                item.description = description || '';
                item.image = image;
            }
        } else {
            // Create new
            const newId = gallery.length > 0 ? Math.max(...gallery.map(g => g.id)) + 1 : 1;
            item = {
                id: newId,
                title,
                description: description || '',
                image
            };
            gallery.push(item);
        }

        localStorage.setItem('gallery', JSON.stringify(gallery));
        this.renderGallery();
        this.closeModal();
        
        // Refresh gallery on other pages if they're open
        if (typeof GalleryDisplay !== 'undefined') {
            GalleryDisplay.render();
        }
    },

    editGalleryItem(id) {
        this.openModal(id);
    },

    deleteGalleryItem(id) {
        if (confirm('Are you sure you want to delete this gallery image?')) {
            const gallery = window.DataManager.getGallery().filter(g => g.id !== id);
            localStorage.setItem('gallery', JSON.stringify(gallery));
            this.renderGallery();
            
            // Refresh gallery on other pages if they're open
            if (typeof GalleryDisplay !== 'undefined') {
                GalleryDisplay.render();
            }
        }
    }
};

// Tab Management
const TabManager = {
    init() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(`${targetTab}Tab`).classList.add('active');
            });
        });
    }
};

// Initialize management page
document.addEventListener('DOMContentLoaded', () => {
    // Make sure DataManager is initialized
    if (window.DataManager) {
        window.DataManager.init();
    }

    // Initialize managers
    ServicesManager.init();
    ProductsManager.init();
    GalleryManager.init();
    TabManager.init();
});

