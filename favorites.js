// favorites.js - Страница избранного
const API_URL = 'http://localhost:3001';

document.addEventListener('DOMContentLoaded', loadFavorites);

async function loadFavorites() {
    const grid = document.getElementById('favoritesGrid');
    
    try {
        const favResponse = await fetch(`${API_URL}/favorites`);
        const favorites = await favResponse.json();
        
        if (favorites.length === 0) {
            grid.innerHTML = '<div class="not-found">💔 Ваше избранное пусто. <a href="catalog.html" style="color: #4b97ef;">Перейти в каталог</a></div>';
            return;
        }
        
        const services = await Promise.all(
            favorites.map(async fav => {
                try {
                    const res = await fetch(`${API_URL}/services/${fav.serviceId}`);
                    if (!res.ok) return null;
                    const service = await res.json();
                    return { ...service, favId: fav.id };
                } catch {
                    return null;
                }
            })
        );
        
        const validServices = services.filter(s => s !== null);
        
        if (validServices.length === 0) {
            grid.innerHTML = '<div class="not-found">⚠️ Не удалось загрузить товары</div>';
            return;
        }
        
        renderFavorites(validServices);
        
    } catch (error) {
        console.error('Ошибка загрузки избранного:', error);
        grid.innerHTML = '<div class="not-found">❌ Ошибка загрузки данных</div>';
    }
}

function renderFavorites(services) {
    const grid = document.getElementById('favoritesGrid');
    
    grid.innerHTML = services.map(service => `
        <div class="favorite-card">
            <img src="${escapeHtml(service.image)}" alt="${escapeHtml(service.name)}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
            <div class="fav-card-body">
                <div class="fav-card-title">${escapeHtml(service.name)}</div>
                <div style="font-size: 14px; color: #5A6A7F; margin-bottom: 8px;">${escapeHtml(service.category)}</div>
                <div class="fav-card-price">${service.price} BYN</div>
                <div style="font-size: 13px; color: #FFB800; margin-bottom: 10px;">★ ${service.rating}/5</div>
                <button class="remove-fav-btn" data-favid="${service.favId}" data-serviceid="${service.id}">
                    🗑️ Удалить из избранного
                </button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.remove-fav-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const favId = e.currentTarget.dataset.favid;
            if (confirm('Удалить этот товар из избранного?')) {
                await removeFromFavorites(favId);
            }
        });
    });
}

async function removeFromFavorites(favId) {
    try {
        await fetch(`${API_URL}/favorites/${favId}`, { method: 'DELETE' });
        await loadFavorites(); // Перезагружаем список
    } catch (error) {
        console.error('Ошибка удаления из избранного:', error);
        alert('❌ Не удалось удалить товар');
    }
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}