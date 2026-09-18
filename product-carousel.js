export const productsData = [
    { category: 'cars', name: 'Tesla Model 3', price: '$42,990', orderId: 'ORD-2025-101', icon: '🚗' },
    { category: 'cars', name: 'BMW M4 Competition', price: '$74,900', orderId: 'ORD-2025-102', icon: '🚙' },
    { category: 'cars', name: 'Porsche 911 Carrera', price: '$116,950', orderId: 'ORD-2025-103', icon: '🏎️' },
    
    { category: 'bikes', name: 'Ducati Panigale V4', price: '$28,395', orderId: 'ORD-2025-201', icon: '🏍️' },
    { category: 'bikes', name: 'Kawasaki Ninja ZX-10R', price: '$17,399', orderId: 'ORD-2025-202', icon: '🏍️' },
    { category: 'bikes', name: 'Harley Davidson Sportster', price: '$14,499', orderId: 'ORD-2025-203', icon: '🏍️' },
    
    { category: 'mobile', name: 'iPhone 15 Pro Max', price: '$1,199', orderId: 'ORD-2025-301', icon: '📱' },
    { category: 'mobile', name: 'Samsung Galaxy S24 Ultra', price: '$1,299', orderId: 'ORD-2025-302', icon: '📱' },
    { category: 'mobile', name: 'Google Pixel 8 Pro', price: '$999', orderId: 'ORD-2025-303', icon: '📱' },
    
    { category: 'cup', name: 'Artisan Ceramic Mug', price: '$35', orderId: 'ORD-2025-401', icon: '☕' },
    { category: 'cup', name: 'Thermal Travel Cup', price: '$45', orderId: 'ORD-2025-402', icon: '🥤' },
    { category: 'cup', name: 'Japanese Tea Set', price: '$89', orderId: 'ORD-2025-403', icon: '🍵' },
    
    { category: 'ps4', name: 'PS4 Pro Console', price: '$399', orderId: 'ORD-2025-501', icon: '🎮' },
    { category: 'ps4', name: 'DualShock 4 Controller', price: '$59', orderId: 'ORD-2025-502', icon: '🕹️' },
    { category: 'ps4', name: 'PSVR Headset', price: '$299', orderId: 'ORD-2025-503', icon: '🥽' },
    
    { category: 'ps5', name: 'PS5 Digital Edition', price: '$449', orderId: 'ORD-2025-601', icon: '🎮' },
    { category: 'ps5', name: 'DualSense Edge Controller', price: '$199', orderId: 'ORD-2025-602', icon: '🕹️' },
    { category: 'ps5', name: 'Pulse 3D Headset', price: '$99', orderId: 'ORD-2025-603', icon: '🎧' }
];

export function initProductCarousel() {
    const grid = document.getElementById('products-grid');
    const filterButtons = document.querySelectorAll('.products-filter button');
    
    if (!grid) return;
    
    // Render products
    renderProducts('all');
    
    // Setup filters
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            const category = button.getAttribute('data-category');
            renderProducts(category);
        });
    });
    
    function renderProducts(filterCategory) {
        grid.innerHTML = '';
        
        const filteredProducts = filterCategory === 'all' 
            ? productsData 
            : productsData.filter(p => p.category === filterCategory);
            
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-category', product.category);
            
            card.innerHTML = `
                <div class="product-card-image" style="background: linear-gradient(135deg, var(--bg-surface), #2a2a35); display: flex; align-items: center; justify-content: center; font-size: 4rem;">
                    ${product.icon}
                </div>
                <div class="product-card-body">
                    <span class="product-card-category">${product.category.toUpperCase()}</span>
                    <h3 class="product-card-title">${product.name}</h3>
                    <span class="product-card-price">${product.price}</span>
                    <div class="product-card-meta">
                        <span>Order: ${product.orderId}</span>
                        <span>15 days ago</span>
                    </div>
                </div>
                <div class="product-card-overlay">
                    <button class="btn-primary" onclick="window.location.href='#return-form'">File Return</button>
                    <button class="btn-secondary">View Details</button>
                </div>
            `;
            
            grid.appendChild(card);
            
            // Simple animation for new cards
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        });
    }
}
