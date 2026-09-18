let returnsData = [
    { id: '1', orderId: 'ORD-2025-092', product: 'Tesla Model 3', category: 'cars', date: '2026-09-15', status: 'approved', confidence: 0.95 },
    { id: '2', orderId: 'ORD-2025-091', product: 'iPhone 15 Pro Max', category: 'mobile', date: '2026-09-14', status: 'review', confidence: 0.65 },
    { id: '3', orderId: 'ORD-2025-090', product: 'Artisan Ceramic Mug', category: 'cup', date: '2026-09-14', status: 'approved', confidence: 0.98 },
    { id: '4', orderId: 'ORD-2025-089', product: 'PS5 Digital Edition', category: 'ps5', date: '2026-09-13', status: 'rejected', confidence: 0.88 },
    { id: '5', orderId: 'ORD-2025-088', product: 'BMW M4 Competition', category: 'cars', date: '2026-09-12', status: 'review', confidence: 0.72 },
    { id: '6', orderId: 'ORD-2025-087', product: 'DualSense Edge Controller', category: 'ps5', date: '2026-09-12', status: 'approved', confidence: 0.94 },
    { id: '7', orderId: 'ORD-2025-086', product: 'Samsung Galaxy S24 Ultra', category: 'mobile', date: '2026-09-11', status: 'approved', confidence: 0.91 },
    { id: '8', orderId: 'ORD-2025-085', product: 'Ducati Panigale V4', category: 'bikes', date: '2026-09-10', status: 'rejected', confidence: 0.85 },
    { id: '9', orderId: 'ORD-2025-084', product: 'Thermal Travel Cup', category: 'cup', date: '2026-09-10', status: 'approved', confidence: 0.97 },
    { id: '10', orderId: 'ORD-2025-083', product: 'PS4 Pro Console', category: 'ps4', date: '2026-09-09', status: 'review', confidence: 0.68 },
    { id: '11', orderId: 'ORD-2025-082', product: 'Google Pixel 8 Pro', category: 'mobile', date: '2026-09-08', status: 'approved', confidence: 0.93 },
    { id: '12', orderId: 'ORD-2025-081', product: 'Japanese Tea Set', category: 'cup', date: '2026-09-07', status: 'approved', confidence: 0.96 },
    { id: '13', orderId: 'ORD-2025-080', product: 'Harley Davidson Sportster', category: 'bikes', date: '2026-09-06', status: 'rejected', confidence: 0.89 },
    { id: '14', orderId: 'ORD-2025-079', product: 'Porsche 911 Carrera', category: 'cars', date: '2026-09-05', status: 'review', confidence: 0.75 },
    { id: '15', orderId: 'ORD-2025-078', product: 'Pulse 3D Headset', category: 'ps5', date: '2026-09-04', status: 'approved', confidence: 0.92 }
];

export function initDashboard() {
    renderDashboard();
    
    // Filter setup
    const filters = document.querySelectorAll('.dashboard-filters button');
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            btn.classList.add('active');
            renderTable(btn.getAttribute('data-filter'));
        });
    });
}

function renderDashboard() {
    updateStats();
    renderTable('all');
    renderChart();
}

export function addReturnToData(newReturn) {
    returnsData.unshift(newReturn); // Add to beginning
    renderDashboard(); // Re-render everything
}

function updateStats() {
    const total = returnsData.length;
    const approved = returnsData.filter(r => r.status === 'approved').length;
    const review = returnsData.filter(r => r.status === 'review').length;
    const rejected = returnsData.filter(r => r.status === 'rejected').length;

    animateValue('stat-total', 0, total, 1000);
    animateValue('stat-approved', 0, approved, 1000);
    animateValue('stat-review', 0, review, 1000);
    animateValue('stat-rejected', 0, rejected, 1000);
}

function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function renderTable(filter) {
    const tbody = document.getElementById('returns-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const filteredData = filter === 'all' ? returnsData : returnsData.filter(r => r.status === filter);
    
    filteredData.forEach(item => {
        const tr = document.createElement('tr');
        
        let statusBadge = '';
        if (item.status === 'approved') statusBadge = '<span style="color: var(--success); background: rgba(16,185,129,0.1); padding: 4px 8px; border-radius: 4px;">Approved</span>';
        if (item.status === 'review') statusBadge = '<span style="color: var(--warning); background: rgba(245,158,11,0.1); padding: 4px 8px; border-radius: 4px;">Review</span>';
        if (item.status === 'rejected') statusBadge = '<span style="color: var(--danger); background: rgba(239,68,68,0.1); padding: 4px 8px; border-radius: 4px;">Rejected</span>';
        
        tr.innerHTML = `
            <td>${item.orderId}</td>
            <td>${item.product}</td>
            <td style="text-transform: capitalize;">${item.category}</td>
            <td>${item.date}</td>
            <td>${statusBadge}</td>
            <td>${(item.confidence * 100).toFixed(0)}% AI Conf.</td>
            <td><button class="btn-secondary" style="padding: 4px 12px; font-size: 0.8rem;">View</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function renderChart() {
    const canvas = document.getElementById('analytics-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth;
    const height = 300;
    canvas.width = width;
    canvas.height = height;
    
    const approved = returnsData.filter(r => r.status === 'approved').length;
    const review = returnsData.filter(r => r.status === 'review').length;
    const rejected = returnsData.filter(r => r.status === 'rejected').length;
    const total = returnsData.length;
    
    if (total === 0) return;

    // Simple horizontal bar chart
    ctx.clearRect(0, 0, width, height);
    
    const maxBarWidth = width - 100;
    const barHeight = 40;
    const startX = 80;
    
    const drawBar = (y, value, color, label) => {
        const barW = (value / total) * maxBarWidth;
        
        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Inter';
        ctx.fillText(label, 10, y + 25);
        
        // Background track
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(startX, y, maxBarWidth, barHeight);
        
        // Fill
        ctx.fillStyle = color;
        ctx.fillRect(startX, y, barW, barHeight);
        
        // Value
        ctx.fillStyle = '#ffffff';
        ctx.fillText(value + ` (${Math.round(value/total*100)}%)`, startX + barW + 10, y + 25);
    };
    
    drawBar(50, approved, '#10b981', 'Approved');
    drawBar(110, review, '#f59e0b', 'Review');
    drawBar(170, rejected, '#ef4444', 'Rejected');
}
