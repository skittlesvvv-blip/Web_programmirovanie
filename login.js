const API_URL = 'http://localhost:3001';

document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('loginForm');
    const identifierInput = document.getElementById('loginIdentifier');
    const passwordInput = document.getElementById('loginPassword');
    const loginBtn = document.getElementById('loginBtn');

    [identifierInput, passwordInput].forEach(input => {
        input.addEventListener('input', () => {
            clearError(input.closest('.form-group'));
            checkFormValidity();
        });
        input.addEventListener('blur', () => {
            validateField(input);
            checkFormValidity();
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form.checkValidity()) return;

        const identifier = identifierInput.value.trim();
        const password = passwordInput.value;

        try {
            const res = await fetch(`${API_URL}/users`);
            const users = await res.json();
            
            const user = users.find(u => 
                (u.email === identifier || u.phone === identifier) && u.password === password
            );

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert(`✅ Добро пожаловать, ${user.firstName}!`);
                window.location.href = 'index.html';
            } else {
                showError(identifierInput.closest('.form-group'), 'Неверный email/телефон или пароль');
                showError(passwordInput.closest('.form-group'), 'Неверный email/телефон или пароль');
                loginBtn.disabled = true;
            }
        } catch (err) {
            console.error(err);
            alert('❌ Ошибка соединения с сервером. Убедитесь, что node server.js запущен.');
        }
    });


    function validateField(input) {
        const group = input.closest('.form-group');
        if (!group) return;
        
        if (!input.value.trim()) {
            showError(group, 'Это поле обязательно');
        } else {
            clearError(group);
        }
    }

    function showError(group, msg) {
        group.classList.add('is-invalid');
        const errorEl = group.querySelector('.error-message');
        if (errorEl) errorEl.textContent = msg;
    }

    function clearError(group) {
        group.classList.remove('is-invalid');
    }

    function checkFormValidity() {
        const hasErrors = form.querySelectorAll('.is-invalid').length > 0;
        const isFilled = identifierInput.value.trim() !== '' && passwordInput.value.trim() !== '';
        
        loginBtn.disabled = !(form.checkValidity() && !hasErrors && isFilled);
    }
});