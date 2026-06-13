// cart.js - Страница корзины
const API_URL = 'http://localhost:3001';  

document.addEventListener('DOMContentLoaded', loadCart);

async function loadCart() {
    const grid = document.getElementById('cartGrid');
    const summary = document.getElementById('cartSummary');
    
    try {
        const cartResponse = await fetch(`${API_URL}/cart`);
        const cartItems = await cartResponse.json();
        
        if (cartItems.length === 0) {
            grid.innerHTML = '<div class="not-found">🛒 Ваша корзина пуста. <a href="catalog.html" style="color: #4b97ef;">Перейти к покупкам</a></div>';
            summary.style.display = 'none';
            return;
        }
        
        const itemsWithDetails = await Promise.all(
            cartItems.map(async item => {
                try {
                    const res = await fetch(`${API_URL}/services/${item.serviceId}`);
                    if (!res.ok) return null;
                    const service = await res.json();
                    return { 
                        ...service, 
                        cartId: item.id,
                        quantity: item.quantity || 1
                    };
                } catch {
                    return null;
                }
            })
        );
        
        const validItems = itemsWithDetails.filter(i => i !== null);
        
        if (validItems.length === 0) {
            grid.innerHTML = '<div class="not-found">⚠️ Не удалось загрузить товары из корзины</div>';
            summary.style.display = 'none';
            return;
        }
        
        renderCart(validItems);
        summary.style.display = 'block';
        
    } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
        grid.innerHTML = '<div class="not-found">❌ Ошибка загрузки данных</div>';
        summary.style.display = 'none';
    }
}

function renderCart(items) {
    const grid = document.getElementById('cartGrid');
    const totalEl = document.getElementById('totalAmount');
    
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalEl.textContent = total;
    
    grid.innerHTML = items.map(item => `
        <div class="cart-item" data-cartid="${item.cartId}">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" onerror="this.src='https://via.placeholder.com/120x120?text=No+Image'">
            <div class="cart-item-info">
                <div class="cart-item-title">${escapeHtml(item.name)}</div>
                <div class="cart-item-category">${escapeHtml(item.category)}</div>
                <div class="cart-item-price">${item.price} BYN за шт.</div>
            </div>
            <div class="cart-item-quantity">
                <label for="qty-${item.cartId}" style="font-size: 14px; color: #5A6A7F;">Кол-во:</label>
                <input type="number" id="qty-${item.cartId}" min="1" value="${item.quantity}" data-cartid="${item.cartId}">
            </div>
            <div class="cart-item-actions">
                <button class="remove-btn" data-cartid="${item.cartId}">🗑️ Удалить</button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.cart-item-quantity input').forEach(input => {
        input.addEventListener('change', (e) => {
            const cartId = e.currentTarget.dataset.cartid;
            const newQty = parseInt(e.currentTarget.value);
            if (newQty >= 1) {
                updateQuantity(cartId, newQty);
            } else {
                e.currentTarget.value = 1;
            }
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const cartId = e.currentTarget.dataset.cartid;
            if (confirm('Удалить этот товар из корзины?')) {
                await removeFromCart(cartId);
            }
        });
    });
}

async function updateQuantity(cartId, quantity) {
    try {
        await fetch(`${API_URL}/cart/${cartId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: parseInt(quantity) })
        });
        await loadCart();
    } catch (error) {
        console.error('Ошибка обновления количества:', error);
        alert('❌ Не удалось обновить количество');
    }
}

async function removeFromCart(cartId) {
    try {
        await fetch(`${API_URL}/cart/${cartId}`, { method: 'DELETE' });
        await loadCart();
    } catch (error) {
        console.error('Ошибка удаления из корзины:', error);
        alert('❌ Не удалось удалить товар');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', async () => {
          
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                alert('❌ Пожалуйста, войдите в систему, чтобы оформить заказ.');
                window.location.href = 'login.html';
                return;
            }

            if (!confirm('Подтверждаете оформление заказа?')) return;
            
            try {
                const cartResponse = await fetch(`${API_URL}/cart`);
                const cartItems = await cartResponse.json();
                
                for (const item of cartItems) {
                    const serviceRes = await fetch(`${API_URL}/services/${item.serviceId}`);
                    const service = await serviceRes.json();
                   
                    await fetch(`${API_URL}/orders`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userId: currentUser.id,
                            serviceId: item.serviceId,
                            quantity: item.quantity,
                            totalPrice: service.price * item.quantity,
                            orderDate: new Date().toISOString()
                        })
                    });
                    
                    await fetch(`${API_URL}/cart/${item.id}`, { method: 'DELETE' });
                }
                
                alert('🎉 Спасибо за покупку! Ваш заказ успешно оформлен.');
                await loadCart();
                
            } catch (error) {
                console.error('Ошибка оформления заказа:', error);
                alert('❌ Произошла ошибка при оформлении заказа');
            }
        });
    }
});

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}