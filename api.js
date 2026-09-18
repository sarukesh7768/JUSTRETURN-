const isLocalFrontend = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const isDevPort = window.location.port === '5500' || window.location.port === '3000' || window.location.port === '8080';
const API_BASE = (isLocalFrontend && isDevPort) ? 'http://localhost:8000/api/v1' : '/api/v1';

const api = {
    async analyzeDamage(imageFile, confThreshold = 0.25) {
        try {
            const formData = new FormData();
            formData.append('file', imageFile);
            formData.append('confidence_threshold', confThreshold);
            
            const response = await fetch(`${API_BASE}/analyze-damage`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.warn("Backend unavailable, using fallback for analyzeDamage");
            return { success: false, error: error.message };
        }
    },

    async submitReturn(formDataObj, fileAttachment = null) {
        try {
            const formData = new FormData();
            formData.append('order_id', formDataObj.order_id || formDataObj.orderId || 'ORD-2025-001');
            formData.append('damage_type', formDataObj.damage_type || formDataObj.damageType || 'Damaged');
            formData.append('description', formDataObj.description || 'Defect reported during return request.');
            
            if (fileAttachment) {
                formData.append('file', fileAttachment);
            }
            
            const response = await fetch(`${API_BASE}/submit-return`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.warn("Backend submit API error, falling back to mock evaluation:", error.message);
            throw error;
        }
    },

    async getReturns(status = null) {
        try {
            const url = status ? `${API_BASE}/returns?status=${status}` : `${API_BASE}/returns`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    async getReturn(id) {
        try {
            const response = await fetch(`${API_BASE}/returns/${id}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    async getProducts() {
        try {
            const response = await fetch(`${API_BASE}/products`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    async getOrder(orderId) {
        try {
            const response = await fetch(`${API_BASE}/orders/${orderId}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

export default api;

