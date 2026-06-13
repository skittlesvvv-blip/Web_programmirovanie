// 🌍 ЛР10: ПЕРЕВОД И ТЕМА

let currentLang = localStorage.getItem('lang') || 'ru';
let currentTheme = localStorage.getItem('theme') || 'light';

function getTranslate(lang) {
    if (typeof i18Obj === 'undefined') {
        console.error('translate.js не загружен!');
        return;
    }
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (i18Obj[lang] && i18Obj[lang][key]) {
            const translation = i18Obj[lang][key];
            if (translation.includes('<')) {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
        }
    });
    
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('lang-btn')) {
        getTranslate(e.target.dataset.lang);
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('theme-toggle')) {
        applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    }
});

window.addEventListener('load', () => {
    getTranslate(currentLang);
    applyTheme(currentTheme);
});

// Модалка профиля
function openProfileModal() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        alert('Войдите в систему');
        return;
    }
    
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    if (!modal || !body) return;
    
    body.innerHTML = `
        <div class="profile-modal-content">
            <h2>👤 ${currentLang === 'ru' ? 'Мой профиль' : 'My profile'}</h2>
            <div class="profile-field"><label>Имя / Name</label><span>${user.firstName || '-'}</span></div>
            <div class="profile-field"><label>Фамилия / Last name</label><span>${user.lastName || '-'}</span></div>
            <div class="profile-field"><label>Email</label><span>${user.email || '-'}</span></div>
            <div class="profile-field"><label>Телефон / Phone</label><span>${user.phone || '-'}</span></div>
            <div class="profile-field"><label>Дата рождения / Birth date</label><span>${user.birthDate || '-'}</span></div>
            <div class="profile-field"><label>Никнейм / Nickname</label><span>${user.nickname || '-'}</span></div>
            <div class="profile-field"><label>Роль / Role</label><span>${user.role === 'admin' ? '👑 Admin' : '👤 Client'}</span></div>
            <div class="profile-actions">
                <button class="btn-reset-settings" onclick="resetSettings()">🔄 Сбросить настройки</button>
                <button class="btn-close-profile" onclick="closeModal()">Закрыть</button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function resetSettings() {
    if (!confirm('Сбросить все настройки?')) return;
    localStorage.removeItem('lang');
    localStorage.removeItem('theme');
    localStorage.removeItem('currentUser');
    location.reload();
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-btn') || e.target.id === 'modal') {
        closeModal();
    }
});