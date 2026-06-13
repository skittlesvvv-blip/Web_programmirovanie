const API_URL = 'http://localhost:3001';

document.addEventListener('DOMContentLoaded', async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) { alert('❌ Войдите в систему'); window.location.href = 'register.html'; return; }
    if (currentUser.role === 'admin') { alert('⚠️ Администраторы не могут оставлять отзывы.'); window.location.href = 'index.html'; return; }

    try {
        const ordersRes = await fetch(`${API_URL}/orders?userId=${currentUser.id}`);
        const orders = await ordersRes.json();
        const serviceIds = [...new Set(orders.map(o => o.serviceId))];
        const servicesRes = await fetch(`${API_URL}/services`);
        const allServices = await servicesRes.json();
        const purchased = allServices.filter(s => serviceIds.includes(s.id));
        
        const select = document.getElementById('serviceSelect');
        if (purchased.length === 0) {
            select.innerHTML = '<option value="">У вас нет купленных услуг</option>';
            document.getElementById('submitFeedbackBtn').disabled = true;
        } else {
            select.innerHTML = '<option value="">Выберите услугу</option>' + purchased.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
        }
    } catch (err) { console.error(err); }

    const form = document.getElementById('feedbackForm');
    const textarea = document.getElementById('feedbackText');
    const select = document.getElementById('serviceSelect');
    
    [textarea, select].forEach(el => {
        el.addEventListener('input', () => { validateFeedbackField(el); checkFeedbackFormValidity(); });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form.checkValidity()) return;
        try {
            await fetch(`${API_URL}/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser.id,
                    serviceId: parseInt(select.value),
                    text: textarea.value.trim(),
                    rating: 5,
                    date: new Date().toISOString()
                })
            });
            alert('✅ Спасибо за отзыв!');
            form.reset();
            checkFeedbackFormValidity();
        } catch (err) { console.error(err); }
    });
});

function validateFeedbackField(el) {
    const group = el.closest('.form-group');
    if (!group) return;
    if (el.id === 'feedbackText' && el.value.trim().length < 10) showError(group, 'Минимум 10 символов');
    else if (el.id === 'serviceSelect' && !el.value) showError(group, 'Выберите услугу');
    else clearError(group);
}
function showError(group, msg) { group.classList.add('is-invalid'); group.querySelector('.error-message').textContent = msg; }
function clearError(group) { group.classList.remove('is-invalid'); }

function checkFeedbackFormValidity() {
    const form = document.getElementById('feedbackForm');
    const btn = document.getElementById('submitFeedbackBtn');
    const hasErrors = form.querySelectorAll('.is-invalid').length > 0;
    btn.disabled = hasErrors || document.getElementById('feedbackText').value.trim().length < 10 || !document.getElementById('serviceSelect').value;
}