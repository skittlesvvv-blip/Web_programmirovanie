const API_URL = 'http://localhost:3001';
const TOP_PASSWORDS = ['123456', 'password', '12345678', 'qwerty', '12345', '123456789', '1234', '111111', '1234567', 'dragon', '123123', 'baseball', 'abc123', 'football', 'monkey', 'letmein', 'shadow', 'master', '666666', 'qwertyuiop', '123321', 'mustang', '1234567890', 'michael', '654321', 'superman', '1qaz2wsx', '7777777', '121212', '000000', 'qazwsx', '123qwe', 'killer', 'trustno1', 'jordan', 'jennifer', 'zxcvbnm', 'asdfgh', 'hunter', 'buster', 'soccer', 'harley', 'batman', 'andrew', 'tigger', 'sunshine', 'iloveyou', '2000', 'charlie', 'robert', 'thomas', 'hockey', 'ranger', 'daniel', 'starwars', 'klaster', '112233', 'george', 'computer', 'michelle', 'jessica', 'pepper', '1111', 'zxcvbn', '555555', '11111111', '131313', 'freedom', '777777', 'pass', 'maggie', '159753', 'aaaaaa', 'ginger', 'princess', 'joshua', 'cheese', 'amanda', 'summer', 'love', 'ashley', 'nicole', 'chelsea', 'biteme', 'matthew', 'access', 'yankees', '987654321', 'dallas', 'austin', 'thunder', 'taylor', 'matrix'];

let nicknameAttempts = 0;
let currentNickname = '';
let currentAutoPassword = '';

document.addEventListener('DOMContentLoaded', () => {
    
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    document.getElementById('birthDate').max = maxDate.toISOString().split('T')[0];

    const form = document.getElementById('registerForm');
    
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', () => { validateField(input); checkFormValidity(); });
        input.addEventListener('blur', () => { validateField(input); checkFormValidity(); });
    });

    // переключение между ручным и автоматическим паролем
    document.querySelectorAll('input[name="passwordChoice"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const manualFields = document.getElementById('manualPasswordFields');
            const autoBlock = document.getElementById('autoPasswordBlock');
            
            if (e.target.value === 'manual') {
                manualFields.style.display = 'block';
                autoBlock.style.display = 'none';
                document.getElementById('password').setAttribute('required', 'required');
                document.getElementById('repeatPassword').setAttribute('required', 'required');
                currentAutoPassword = '';
            } else {
                manualFields.style.display = 'none';
                autoBlock.style.display = 'block';
                
                const pwdInput = document.getElementById('password');
                const repeatInput = document.getElementById('repeatPassword');
                pwdInput.removeAttribute('required');
                repeatInput.removeAttribute('required');
                pwdInput.value = '';      
                repeatInput.value = '';   
                
                const pwdGroup = pwdInput.closest('.form-group');
                const repeatGroup = repeatInput.closest('.form-group');
                if (pwdGroup) clearError(pwdGroup);
                if (repeatGroup) clearError(repeatGroup);
                
                currentAutoPassword = generateRandomPassword();
                document.getElementById('autoPasswordText').textContent = currentAutoPassword;
            }
            checkFormValidity();
        });
    });

    //кнопка копирования пароля
    document.getElementById('copyPasswordBtn').addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(currentAutoPassword);
            const btn = document.getElementById('copyPasswordBtn');
            const originalText = btn.textContent;
            btn.textContent = '✅ Скопировано!';
            setTimeout(() => btn.textContent = originalText, 2000);
        } catch (err) {
            alert('Не удалось скопировать. Выделите пароль вручную.');
        }
    });

    //кнопка перегенерации пароля
    document.getElementById('regenPasswordBtn').addEventListener('click', () => {
        currentAutoPassword = generateRandomPassword();
        document.getElementById('autoPasswordText').textContent = currentAutoPassword;
    });

    //автогенерация никнейма
    ['firstName', 'lastName'].forEach(id => {
        document.getElementById(id).addEventListener('input', generateNickname);
    });

    document.getElementById('regenNicknameBtn').addEventListener('click', async () => {
        nicknameAttempts++;
        if (nicknameAttempts >= 5) {
            document.getElementById('nicknameAutoBlock').style.display = 'none';
            document.getElementById('nicknameManualBlock').style.display = 'block';
            document.getElementById('nicknameManual').setAttribute('required', 'required');
        } else {
            await generateNickname();
        }
    });

    document.getElementById('nicknameManual').addEventListener('blur', async () => {
        const nickname = document.getElementById('nicknameManual').value.trim();
        if (nickname) {
            const exists = await checkNicknameExists(nickname);
            const group = document.getElementById('nicknameManualBlock');
            if (exists) showError(group, 'Этот никнейм уже занят');
            else clearError(group);
        }
    });

    document.getElementById('agreement').addEventListener('change', checkFormValidity);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn.disabled) return;

        const passwordChoice = document.querySelector('input[name="passwordChoice"]:checked').value;
        
        const password = passwordChoice === 'manual' 
            ? document.getElementById('password').value 
            : currentAutoPassword;

        if (!password) {
            alert('❌ Ошибка: пароль не был сгенерирован');
            return;
        }

        const userData = {
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            birthDate: document.getElementById('birthDate').value,
            password: password,
            lastName: document.getElementById('lastName').value,
            firstName: document.getElementById('firstName').value,
            middleName: document.getElementById('middleName').value,
            nickname: nicknameAttempts >= 5 ? document.getElementById('nicknameManual').value : currentNickname,
            role: 'client'
        };

        try {
            const res = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (res.ok) {
                const savedUser = await res.json();
                localStorage.setItem('currentUser', JSON.stringify(savedUser));
                
                if (passwordChoice === 'auto') {
                    alert(`✅ Регистрация успешна!\n\nВаш пароль: ${password}\n\nСохраните его!`);
                } else {
                    alert('✅ Регистрация успешна!');
                }
                window.location.href = 'index.html';
            }
        } catch (err) { 
            console.error(err); 
            alert('❌ Ошибка регистрации');
        }
    });

    generateNickname();
    checkFormValidity();
});

async function generateNickname() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    if (!firstName || !lastName) {
        currentNickname = '';
        document.getElementById('generatedNickname').textContent = 'Введите имя и фамилию';
        return;
    }
    let nickname, exists = true, tries = 0;
    while (exists && tries < 10) {
        const f = firstName.substring(0, Math.min(3, firstName.length));
        const l = lastName.substring(0, Math.min(3, lastName.length));
        const num = Math.floor(Math.random() * 990) + 10;
        const suffixes = ['_x', '_pro', '_md', '_health', ''];
        const suffix = tries > 2 ? suffixes[Math.floor(Math.random() * suffixes.length)] : '';
        nickname = f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() + l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() + num + suffix;
        exists = await checkNicknameExists(nickname);
        tries++;
    }
    currentNickname = nickname;
    document.getElementById('generatedNickname').textContent = nickname;
}

async function checkNicknameExists(nickname) {
    try {
        const res = await fetch(`${API_URL}/users?nickname=${encodeURIComponent(nickname)}`);
        const users = await res.json();
        return users.length > 0;
    } catch { return false; }
}

function validateField(input) {
    const group = input.closest('.form-group');
    if (!group) return;
    let isValid = true, errorMsg = '';

    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false; errorMsg = 'Это поле обязательно';
    } else if (input.type === 'email' && input.value) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) { isValid = false; errorMsg = 'Некорректный email'; }
    } else if (input.id === 'phone' && input.value) {
        if (!/^\+375\d{9}$/.test(input.value)) { isValid = false; errorMsg = 'Формат: +375XXXXXXXXX'; }
    } else if (input.id === 'birthDate' && input.value) {
        const age = new Date().getFullYear() - new Date(input.value).getFullYear();
        if (age < 16) { isValid = false; errorMsg = 'Должно быть хотя бы 16 лет'; }
    } else if (input.id === 'password' && input.value) {
        const pwd = input.value;
        if (pwd.length < 8 || pwd.length > 20) { isValid = false; errorMsg = 'От 8 до 20 символов'; }
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(pwd)) { isValid = false; errorMsg = 'Нужна заглавная, строчная, цифра и спецсимвол'; }
        else if (TOP_PASSWORDS.includes(pwd.toLowerCase())) { isValid = false; errorMsg = 'Слишком простой пароль (в TOP-100)'; }
    } else if (input.id === 'repeatPassword' && input.value) {
        if (input.value !== document.getElementById('password').value) { isValid = false; errorMsg = 'Пароли не совпадают'; }
    }

    if (!isValid) showError(group, errorMsg);
    else clearError(group);
}

function showError(group, msg) {
    group.classList.add('is-invalid');
    const errorEl = group.querySelector('.error-message');
    if (errorEl) errorEl.textContent = msg;
}
function clearError(group) { group.classList.remove('is-invalid'); }

function checkFormValidity() {
    const form = document.getElementById('registerForm');
    const submitBtn = document.getElementById('submitBtn');
    
    // проверка ошибок
    const hasErrors = form.querySelectorAll('.is-invalid').length > 0;
    
    //проверка галочки 
    const agreementChecked = document.getElementById('agreement').checked;
    
    // Проверяем обязательные поля вручную
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const birthDate = document.getElementById('birthDate').value;
    const lastName = document.getElementById('lastName').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    
    const requiredFilled = phone && email && birthDate && lastName && firstName;
    
    const phoneValid = /^\+375\d{9}$/.test(phone);
    
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    // Проверяем возраст
    let ageValid = false;
    if (birthDate) {
        const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
        ageValid = age >= 16;
    }
    
    const pwdChoice = document.querySelector('input[name="passwordChoice"]:checked').value;
    let pwdValid = true;
    
    if (pwdChoice === 'manual') {
        const p1 = document.getElementById('password').value;
        const p2 = document.getElementById('repeatPassword').value;
        pwdValid = p1.length >= 8 && p1 === p2;
    } else {
        // Для авто-пароля проверяем, что он сгенерирован и валиден
        pwdValid = currentAutoPassword.length >= 8;
    }
    
    let nicknameValid = true;
    if (nicknameAttempts >= 5) {
        nicknameValid = document.getElementById('nicknameManual').value.trim() !== '';
    } else {
        nicknameValid = currentNickname !== '';
    }
    
    // Кнопка активна только если ВСЕ условия выполнены
    submitBtn.disabled = !(
        requiredFilled && 
        phoneValid && 
        emailValid && 
        ageValid &&
        !hasErrors && 
        agreementChecked && 
        pwdValid && 
        nicknameValid
    );
}

// генерация пароля
function generateRandomPassword() {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const special = '@$!%*?&';
    const all = upper + lower + digits + special;
    
    // наличие каждого типа символов
    let pwd = '';
    pwd += upper[Math.floor(Math.random() * upper.length)];
    pwd += lower[Math.floor(Math.random() * lower.length)];
    pwd += digits[Math.floor(Math.random() * digits.length)];
    pwd += special[Math.floor(Math.random() * special.length)];
    
    // случ символы до длины 12
    for (let i = 0; i < 8; i++) {
        pwd += all[Math.floor(Math.random() * all.length)];
    }
    
    return pwd.split('').sort(() => 0.5 - Math.random()).join('');
}