// ===== 🎨 ЛР9: 1. ПРЕЛОАДЕР (исчезает после загрузки) =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader')?.classList.add('hidden');
    }, 500);
});

// ===== 🎨 ЛР9: 2. БУРГЕР-МЕНЮ =====
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burgerBtn');
    const menu = document.getElementById('burgerMenu');
    const overlay = document.getElementById('overlay');
    
    if (!burger) return;
    
    const toggleMenu = () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    };
    
    burger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', toggleMenu));
});

// ===== 🎨 ЛР9: 3. УВЕДОМЛЕНИЯ (всплывающие окна вместо alert) =====
function showNotification(msg, type = 'success') {
    const container = document.getElementById('notifications');
    if (!container) return;
    const div = document.createElement('div');
    div.className = `notification ${type}`;
    div.textContent = msg;
    container.appendChild(div);
    setTimeout(() => {
        div.style.opacity = '0';
        setTimeout(() => div.remove(), 300);
    }, 3000);
}

// ===== 🎨 ЛР9: 5. СЛАЙДЕР (Swiper.js) =====
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Swiper !== 'undefined' && document.querySelector('.swiper')) {
        new Swiper('.swiper', {
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            effect: 'fade',
            fadeEffect: { crossFade: true }
        });
    }
});

// ===== 🎨 ЛР9: 6. ПЛАВНАЯ ПРОКРУТКА =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== 🎨 ЛР9: 7. АНИМАЦИЯ ПРИ СКРОЛЛЕ =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== 🎨 ЛР9: 8. ПАРАЛЛАКС (3 слоя + обратное движение) =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;//скока пикселей проскрролилили
    const parallax = document.getElementById('parallax');
    
    if (!parallax) return;
    
    const rect = parallax.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    
    const bg = parallax.querySelector('.parallax-bg');
    const mid = parallax.querySelector('.parallax-mid');
    const front = parallax.querySelector('.parallax-front');
    const reverse = parallax.querySelector('.parallax-reverse');
    
    if (bg) bg.style.transform = `translateY(${scrolled * 0.15}px)`;
    if (mid) mid.style.transform = `translateY(${scrolled * 0.35}px)`;
    if (front) front.style.transform = `translateY(${scrolled * 0.6}px)`;
    if (reverse) reverse.style.transform = `translateY(${scrolled * -0.4}px)`;
});

// ===== 🎨 ЛР9: 9. АНИМИРОВАННЫЕ СЧЁТЧИКИ =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const el = e.target;
            const target = parseInt(el.dataset.target);
            let current = 0;
            const step = target / 60;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(timer); }
                el.textContent = Math.floor(current);
            }, 20);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.counter-num').forEach(el => counterObserver.observe(el));

// ===== 🎨 ЛР9: 10. МЕДИАГАЛЕРЕЯ (медицинские изображения + звуки) =====
let audioContext = null;
let currentVolume = 0.3;

function playMedicalSound(frequency) {//воспр звука
    if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.value = frequency;
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(currentVolume, audioContext.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
    
    osc.start();
    osc.stop(audioContext.currentTime + 1);
}

document.addEventListener('click', (e) => {
    const item = e.target.closest('.media-item');
    
    if (item && item.id === 'videoTrigger') {
        const video = document.getElementById('promoVideo');
        if (video) {
            video.style.display = 'block';
            video.scrollIntoView({ behavior: 'smooth', block: 'center' });
            video.play().catch(err => {
                console.error('Ошибка воспроизведения:', err);
                showNotification('⚠️ Нажмите на видео для запуска', 'error');
            });
            showNotification('▶️ Видео о наших услугах запущено');
        }
        return;
    }
    
    if (item && !item.id) {
        const img = item.querySelector('img');
        const frequency = parseFloat(item.dataset.sound) || 261.63;
        
        item.classList.add('playing');
        setTimeout(() => item.classList.remove('playing'), 600);
        
        playMedicalSound(frequency);
        
        const medicalImages = [
            'images/cardiology.jpg',
            'images/ultrasound.jpg',
            'images/mri.jpg',
            'images/laser.jpg',
            'images/doctor-card.png',
            'images/mobile-app.png'
        ];
        
        const randomImg = medicalImages[Math.floor(Math.random() * medicalImages.length)];
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = randomImg;
            img.style.opacity = '1';
        }, 300);
    }
});

// ===== 🎨 ЛР9: 12. РЕГУЛИРОВКА ГРОМКОСТИ =====
document.addEventListener('DOMContentLoaded', () => {
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    const video = document.getElementById('promoVideo');
    
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            currentVolume = value / 100;
            if (volumeValue) volumeValue.textContent = value + '%';
            if (video) video.volume = currentVolume;
        });
    }
});