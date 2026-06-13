const API_URL = 'http://localhost:3001';

document.addEventListener('DOMContentLoaded', async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser || currentUser.role !== 'admin') {
        alert('⛔ Доступ запрещен. Только для администраторов.');
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('adminWelcome').textContent = `Панель управления | Администратор: ${currentUser.firstName}`;
    
    await loadServicesForAdmin();
    await loadFeedbackForAdmin();

    document.getElementById('serviceForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const serviceId = document.getElementById('serviceId').value;
        const data = {
            name: document.getElementById('serviceName').value,
            description: document.getElementById('serviceDesc').value,
            price: parseFloat(document.getElementById('servicePrice').value),
            category: document.getElementById('serviceCategory').value,
            rating: parseFloat(document.getElementById('serviceRating').value),
            image: document.getElementById('serviceImage').value
        };
        
        try {
            const method = serviceId ? 'PUT' : 'POST';
            const url = serviceId ? `${API_URL}/services/${serviceId}` : `${API_URL}/services`;
            
            const res = await fetch(url, { 
                method, 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(data) 
            });
            
            if (res.ok) {
                alert('✅ Услуга успешно сохранена!');
                document.getElementById('serviceForm').reset();
                document.getElementById('serviceId').value = '';
                await loadServicesForAdmin();
            }
        } catch (err) { 
            console.error(err); 
            alert('❌ Ошибка сохранения');
        }
    });

    document.getElementById('filterService').addEventListener('change', loadFeedbackForAdmin);
    document.getElementById('filterUser').addEventListener('input', loadFeedbackForAdmin);
});

async function loadServicesForAdmin() {
    try {
        const res = await fetch(`${API_URL}/services`);
        const services = await res.json();
        
        document.getElementById('servicesTableBody').innerHTML = services.map(s => `
            <tr>
                <td>${s.id}</td>
                <td>${escapeHtml(s.name)}</td>
                <td>${s.price} BYN</td>
                <td>${s.category}</td>
                <td>
                    <button class="action-btn btn-edit" onclick="editService(${s.id})">✏️ Изменить</button>
                    <button class="action-btn btn-delete" onclick="deleteService(${s.id})">🗑️ Удалить</button>
                </td>
            </tr>
        `).join('');
        
        const filterSelect = document.getElementById('filterService');
        filterSelect.innerHTML = '<option value="">Все услуги</option>' + 
            services.map(s => `<option value="${s.id}">${escapeHtml(s.name)}</option>`).join('');
    } catch (err) {
        console.error('Ошибка загрузки услуг:', err);
    }
}

async function editService(id) {
    try {
        const res = await fetch(`${API_URL}/services/${id}`);
        const s = await res.json();
        document.getElementById('serviceId').value = s.id;
        document.getElementById('serviceName').value = s.name;
        document.getElementById('serviceDesc').value = s.description || '';
        document.getElementById('servicePrice').value = s.price;
        document.getElementById('serviceCategory').value = s.category;
        document.getElementById('serviceRating').value = s.rating;
        document.getElementById('serviceImage').value = s.image || '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) { console.error(err); }
}

async function deleteService(id) {
    if (!confirm('Вы уверены, что хотите удалить эту услугу?')) return;
    try {
        await fetch(`${API_URL}/services/${id}`, { method: 'DELETE' });
        await loadServicesForAdmin();
    } catch (err) { console.error(err); }
}

async function loadFeedbackForAdmin() {
    try {
        const [feedbacksRes, usersRes, servicesRes] = await Promise.all([
            fetch(`${API_URL}/feedback`),
            fetch(`${API_URL}/users`),
            fetch(`${API_URL}/services`)
        ]);
        
        let feedbacks = await feedbacksRes.json();
        const users = await usersRes.json();
        const services = await servicesRes.json();
        
        const serviceFilter = document.getElementById('filterService').value;
        const userFilter = document.getElementById('filterUser').value.trim();
        
        if (serviceFilter) feedbacks = feedbacks.filter(f => f.serviceId == serviceFilter);
        if (userFilter) feedbacks = feedbacks.filter(f => f.userId == userFilter);

        const tbody = document.getElementById('feedbackTableBody');
        if (feedbacks.length === 0) { 
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: #757575;">Отзывы не найдены</td></tr>'; 
            return; 
        }
        
        tbody.innerHTML = feedbacks.map(f => {
            const u = users.find(u => u.id == f.userId);
            const s = services.find(s => s.id == f.serviceId);
            const userName = u ? `${u.firstName} ${u.lastName || ''} (ID: ${u.id})` : 'Неизвестно';
            const serviceName = s ? s.name : 'Услуга удалена';
            
            return `<tr>
                <td>${f.id}</td>
                <td>${escapeHtml(userName)}</td>
                <td>${escapeHtml(serviceName)}</td>
                <td>${escapeHtml(f.text.substring(0, 50))}${f.text.length > 50 ? '...' : ''}</td>
                <td><button class="action-btn btn-delete" onclick="deleteFeedback(${f.id})">🗑️ Удалить</button></td>
            </tr>`;
        }).join('');
    } catch (err) { console.error('Ошибка загрузки отзывов:', err); }
}

async function deleteFeedback(id) {
    if (!confirm('Удалить этот отзыв?')) return;
    try {
        await fetch(`${API_URL}/feedback/${id}`, { method: 'DELETE' });
        await loadFeedbackForAdmin();
    } catch (err) { console.error(err); }
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

window.editService = editService;
window.deleteService = deleteService;
window.deleteFeedback = deleteFeedback;