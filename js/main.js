/* 
 * main.js
 * Общий модуль инициализации сайта
 */

// ===== МОДАЛЬНЫЕ ОКНА =====
const Modal = {
    open(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.warn(`[Modal] Окно #${modalId} не найдено`);
            return;
        }
        this.closeAll();
        modal.showModal();
        document.body.style.overflow = 'hidden';

        const focusable = modal.querySelector('button, [href], input, select, textarea');
        if (focusable) setTimeout(() => focusable.focus(), 100);
    },

    close(modalId) {
        const modal = document.getElementById(modalId);
        if (modal?.open) {
            modal.close();
            document.body.style.overflow = '';
        }
    },

    closeAll() {
        document.querySelectorAll('dialog[open]').forEach(modal => modal.close());
        document.body.style.overflow = '';
    }
};

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(message, type = 'info', duration = 3000) {
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.setAttribute('role', 'alert');

    const icons = { success: '✅', error: '❌', info: 'ℹ️' };

    notification.innerHTML = `
        <span class="notification__icon">${icons[type] || icons.info}</span>
        <span class="notification__text">${message}</span>
        <button class="notification__close">&times;</button>
    `;

    notification.querySelector('.notification__close').addEventListener('click', () => {
        notification.remove();
    });

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) notification.remove();
    }, duration);
}

// ===== ИНИЦИАЛИЗАЦИЯ САЙТА =====
document.addEventListener('DOMContentLoaded', () => {

    // Обновляем счётчики корзины и избранного
    if (typeof Cart?.updateCount === 'function') Cart.updateCount();
    if (typeof Favorites?.updateCount === 'function') Favorites.updateCount();

    // Закрытие модальных окон по data-close-modal
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('dialog');
            if (modal) Modal.close(modal.id);
        });
    });

    // Закрытие модалок по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') Modal.closeAll();
    });

    // Синхронизация между вкладками (вход/выход)
    window.addEventListener('storage', (e) => {
        if (e.key === Storage?.keys?.CURRENT_USER) {
            Auth?.updateUI?.();
            Cart?.updateCount?.();
        }
    });

    console.log('%c[SCÀLA] Сайт инициализирован', 'color:#c9a66b');
});

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Modal, showNotification };
}
// Показывать кнопку Админ-панель только администратору
// ✅ ПРАВИЛЬНО: используем только Auth.getCurrentUser() (синхронный, читает из localStorage)
function showAdminPanelLink() {
    const link = document.getElementById('adminPanelLink');
    if (!link) return;

    // Auth.getCurrentUser() читает из localStorage синхронно — это надёжно
    const user = Auth?.getCurrentUser?.();
    
    if (user && user.role === 'admin') {
        link.style.display = 'flex';
    } else {
        link.style.display = 'none';
    }
}
// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', showAdminPanelLink);

// Обновляем кнопку при входе/выходе
window.addEventListener('storage', (e) => {
    if (e.key === Storage.keys.CURRENT_USER) {
        showAdminPanelLink();
    }

});
// ====================== КОМПАКТНОЕ БУРГЕР-МЕНЮ ======================
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
}

