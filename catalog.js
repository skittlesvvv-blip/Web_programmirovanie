// catalog.js - Каталог товаров с серверной фильтрацией
const API_URL = 'http://localhost:3001';

let currentPage = 1;
const ITEMS_PER_PAGE = 6;

document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    fetchCatalog();
    attachEventListeners();
});

function buildCatalogURL(page = currentPage) {
    let url = `${API_URL}/services?_page=${page}&_limit=${ITEMS_PER_PAGE}`;
    
    const search = document.getElementById('searchInput')?.value.trim();
    if (search) url += `&q=${encodeURIComponent(search)}`;
    
    const sortValue = document.getElementById('sortSelect')?.value;
    if (sortValue) {
        const [field, order] = sortValue.split('-');
        url += `&_sort=${field}&_order=${order}`;
    }
    
    const category = document.getElementById('categorySelect')?.value;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    
    const minPrice = document.getElementById('minPrice')?.value;
    const maxPrice = document.getElementById('maxPrice')?.value;
    if (minPrice) url += `&price_gte=${minPrice}`;
    if (maxPrice) url += `&price_lte=${maxPrice}`;
    
    return url;
}

async function fetchCatalog() {
    const grid = document.getElementById('catalogGrid');
    const pagination = document.getElementById('pagination');
    
    try {
        grid.innerHTML = '<div class="loading">Загрузка товаров...</div>';
        
        const url = buildCatalogURL();
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const services = await response.json();
         
        const totalCount = parseInt(response.headers.get('X-Total-Count')) || services.length;
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
        
        if (services.length === 0) {
            grid.innerHTML = '<div class="not-found">😔 По вашим критериям ничего не найдено</div>';
            pagination.innerHTML = '';
            return;
        }
        
        renderCatalog(services);
        renderPagination(totalPages);
        
    } catch (error) {
        console.error('❌ Ошибка загрузки каталога:', error);
        grid.innerHTML = `
            <div class="not-found">
                ❌ Ошибка загрузки данных.<br><br>
                <strong>Возможные причины:</strong><br>
                1. JSON Server не запущен на http://<br>
                2. Открываешь файл напрямую (нужен Live Server)<br><br>
                <a href="#" onclick="location.reload()" class="back-link">🔄 Повторить попытку</a>
            </div>`;
        pagination.innerHTML = '';
    }
}
async function renderCatalog(services) {
    const grid = document.getElementById('catalogGrid');
    
    // Загружаем все отзывы одним запросом
    let allFeedbacks = [];
    try {
        const feedbackRes = await fetch(`${API_URL}/feedback`);
        allFeedbacks = await feedbackRes.json();
    } catch (e) {
        console.error('Не удалось загрузить отзывы:', e);
    }
    
    // Загружаем пользователей для отображения имён
    let allUsers = [];
    try {
        const usersRes = await fetch(`${API_URL}/users`);
        allUsers = await usersRes.json();
    } catch (e) {
        console.error('Не удалось загрузить пользователей:', e);
    }
    
    grid.innerHTML = services.map(service => {
      
        const serviceFeedbacks = allFeedbacks.filter(f => f.serviceId === service.id);
        const feedbackCount = serviceFeedbacks.length;
        
        const recentFeedbacks = serviceFeedbacks.slice(-3).reverse();
        
        //HTML для отзывов
        let feedbacksHTML = '';
        if (feedbackCount > 0) {
            feedbacksHTML = `
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee;">
                    <div style="font-size: 12px; color: #5A6A7F; margin-bottom: 8px;">
                        💬 Отзывы (${feedbackCount})
                    </div>
                    ${recentFeedbacks.map(f => {
                        const user = allUsers.find(u => u.id === f.userId);
                        const userName = user ? user.firstName : 'Гость';
                        return `
                            <div style="background: #f8f9fa; padding: 8px; border-radius: 5px; margin-bottom: 6px; font-size: 12px;">
                                <strong style="color: #1F2A4A;">${escapeHtml(userName)}</strong>
                                <div style="color: #5A6A7F; margin-top: 4px; line-height: 1.3;">
                                    ${escapeHtml(f.text.length > 80 ? f.text.substring(0, 80) + '...' : f.text)}
                                </div>
                            </div>
                        `;
                    }).join('')}
                    ${feedbackCount > 3 ? `<div style="font-size: 11px; color: #4b97ef; text-align: center;">+ ещё ${feedbackCount - 3} отзывов</div>` : ''}
                </div>
            `;
        } else {
            feedbacksHTML = `
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
                    💬 Пока нет отзывов
                </div>
            `;
        }
        
        return `
            <div class="catalog-card" data-id="${service.id}">
                <img src="${escapeHtml(service.image)}" alt="${escapeHtml(service.name)}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
                <div class="card-body">
                    <div class="card-category">${escapeHtml(service.category)}</div>
                    <div class="card-title">${escapeHtml(service.name)}</div>
                    <div class="card-desc">${escapeHtml(service.description.substring(0, 100))}${service.description.length > 100 ? '…' : ''}</div>
                    <div class="card-price">${service.price} BYN</div>
                    <div class="card-rating">★ ${service.rating}/5</div>
                    ${feedbacksHTML}
                    <div class="card-actions">
                        <button class="btn-fav" data-id="${service.id}">❤️ В избранное</button>
                        <button class="btn-cart" data-id="${service.id}">🛒 В корзину</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    document.querySelectorAll('.btn-fav').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            addToFavorites(e.currentTarget.dataset.id);
        });
    });
    
    document.querySelectorAll('.btn-cart').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            addToCart(e.currentTarget.dataset.id);
        });
    });
}

function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    pagination.innerHTML = html;
    
    pagination.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', e => {
            currentPage = parseInt(e.currentTarget.dataset.page);
            fetchCatalog();
        });
    });
}

async function loadCategories() {
    try {
        const res = await fetch(`${API_URL}/services`);
        const services = await res.json();
        const categories = [...new Set(services.map(s => s.category).filter(Boolean))];
        
        const select = document.getElementById('categorySelect');
        const currentValue = select.value;
        
        select.innerHTML = '<option value="">Все категории</option>';
        categories.forEach(cat => {
            select.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
        
        if (currentValue) select.value = currentValue;
    } catch (e) {
        console.error('Ошибка загрузки категорий:', e);
    }
}

async function addToFavorites(serviceId) {
    try {
        const res = await fetch(`${API_URL}/favorites?serviceId=${serviceId}`);
        const existing = await res.json();
        if (existing.length > 0) return alert('⚠️ Уже в избранном');
        
        await fetch(`${API_URL}/favorites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ serviceId: parseInt(serviceId), addedAt: new Date().toISOString() })
        });
        alert('✅ Добавлено в избранное');
    } catch (e) {
        alert('❌ Ошибка добавления в избранное');
    }
}

async function addToCart(serviceId) {
    try {
        const res = await fetch(`${API_URL}/cart?serviceId=${serviceId}`);
        const existing = await res.json();
        
        if (existing.length > 0) {
            const item = existing[0];
            await fetch(`${API_URL}/cart/${item.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...item, quantity: (item.quantity || 1) + 1 })
            });
        } else {
            await fetch(`${API_URL}/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ serviceId: parseInt(serviceId), quantity: 1, addedAt: new Date().toISOString() })
            });
        }
        alert('✅ Добавлено в корзину');
    } catch (e) {
        alert('❌ Ошибка добавления в корзину');
    }
}

function attachEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const categorySelect = document.getElementById('categorySelect');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const clearBtn = document.getElementById('clearFilters');
    
    let timeout;
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => { currentPage = 1; fetchCatalog(); }, 400);
        });
    }
    
    [sortSelect, categorySelect, minPrice, maxPrice].forEach(el => {
        if (el) el.addEventListener('change', () => { currentPage = 1; fetchCatalog(); });
    });
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (sortSelect) sortSelect.value = '';
            if (categorySelect) categorySelect.value = '';
            if (minPrice) minPrice.value = '';
            if (maxPrice) maxPrice.value = '';
            currentPage = 1;
            fetchCatalog();
        });
    }
}

function escapeHtml(str) {
    if (str == null) return '';
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
}