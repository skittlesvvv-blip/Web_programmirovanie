// 🌍 ЛР10: Файл переводов (объединённый)
const i18Obj = {
    'en': {
        // === ЛОГОТИП И МЕНЮ ===
        'logo': 'HEALTCARE.',
        'home': 'Home',
        'catalog': 'Catalog',
        'login': 'Login',
        'register': 'Register',
        'feedback': 'Feedback',
        'cart': 'Cart',
        'favorites': 'Favorites',
        'get-started': 'Get Started',
        'logout': 'Logout',
        'admin': 'Admin',
        'close': 'Close',
        
        // === HERO СЕКЦИЯ ===
        'hero-title-1': 'Find And Search Your',
        'hero-title-2': "Suitable Doctor's",
        'hero-description': 'Join us and take care of yourself and your family with health services that will make you feel confident and safe in your daily life.',
        'find-doctor': 'Find your doctor',
        'location': 'New York, USA',
        
        // === СЧЁТЧИКИ ===
        'counter-patients': 'Happy patients',
        'counter-doctors': 'Doctors',
        'counter-experience': 'Years of experience',
        'counter-support': 'Hours of support',
        
        // === СЛАЙДЕР ===
        'slider-title': '📸 Our services',
        
        // === 3 ШАГА ===
        'steps-title': '3 Easy Steps and Get Your Solution',
        'step1-title': "Find best doctor's",
        'step1-text': "Find your doctor easily with a minimum of effort. We've kept everything organised for you.",
        'step2-title': 'Get Appointment',
        'step2-text': 'Ask for an appointment of the doctor quickly with almost a single click. We take care of the rest.',
        'step3-title': 'Happy Consultations',
        'step3-text': 'Do consultations and take the service based on your appointment. Get back to good health.',
        
        // === ПАРАЛЛАКС ===
        'parallax-title': 'Your health care is our priority',
        'parallax-text': 'Over 15 years of experience • 50+ specialists • 24/7 support',
        
        // === QUALITY ===
        'quality-title': 'Best quality service with our experience doctors',
        'quality-description': 'With our top doctors, we are able to provide best medical services above average. We have highly experienced doctors, so don\'t worry. They are also very talented in their fields.',
        'quality-list-1': 'Search your specialist & Online consultations anywhere',
        'quality-list-2': 'Consultation our top specialists',
        'quality-list-3': 'Doctors are available 24/7',
        'quality-btn': 'Explore specialists →',
        
        // === НАШИ УСЛУГИ ===
        'services-title': 'Our Service',
        'services-subtitle': 'Our doctors have high qualified skills and are guaranteed to help you recover from your disease.',
        'service-cardiology': 'Cardiology',
        'service-cardiology-desc': 'Our cardiologists are skilled at the diagnosis and testing diseases of the cardiovascular system.',
        'service-pulmonology': 'Pulmonology',
        'service-pulmonology-desc': 'Our Pulmonologist are skilled at diagnosing treating diseases of the Pulmonology system.',
        'service-medicine': 'Medicine',
        'service-medicine-desc': 'Our medicine doctor are skilled at diagnosing treating diseases of the latest medicine system.',
        
        // === МЕДИАГАЛЕРЕЯ ===
        'gallery-title': '🏥 Our medical services',
        'gallery-subtitle': 'Click on the image to learn more',
        
        // === ВРАЧИ ===
        'doctors-title': 'Meet Our Certified Online Doctors',
        'doctors-subtitle': 'Our online doctors have an average of 15 years experience and a 98% satisfaction rating, they really set us apart!',
        'doctor1-name': 'Dr Amanda Linda',
        'doctor1-specialty': 'Dentist Specialist',
        'doctor2-name': 'Dr Alisa Rahman',
        'doctor2-specialty': 'Cardiologist Specialist',
        'doctor3-name': 'Dr Anthony Fauci',
        'doctor3-specialty': 'Neurology Specialist',
        'doctor4-name': 'Dr Khalid Abbed',
        'doctor4-specialty': 'Cancer Specialist',
        'doctors-btn': 'Explore All Doctors',
        
        // === МОБИЛЬНОЕ ПРИЛОЖЕНИЕ ===
        'mobile-title': 'Mobile apps are available<br>Get HealthCare for free!',
        'mobile-description': 'Get on-demand access to a doctor on your phone with the free HealthCare mobile app.',
        
        // === КЛИЕНТЫ ===
        'clients-title': 'Look what our Clients have to say about us',
        
        // === CTA ===
        'cta-title': "It's Time Change Your Life Today",
        'cta-btn': 'Book an Appointment',
        
        // === КАРТА ===
        'map-title': '📍 How to find us',
        'map-address': 'Minsk, Independence Avenue, 65',
        
        // === ФУТЕР ===
        'footer-address': 'Metairie, 3689 Bassel Street, LA, Louisiana',
        'footer-contact': 'Contact us: 225-788-5489',
        'footer-category': 'Category',
        'footer-about': 'About',
        'footer-about-link': 'About',
        'footer-services': 'Services',
        'footer-reviews': 'Reviews',
        'footer-article': 'Article',
        'footer-partners': 'Partners',
        'footer-careers': 'Careers',
        'footer-press': 'Press',
        'footer-community': 'Community',
        'footer-subscribe': 'Subscribe newsletter',
        'footer-subscribe-text': 'Sign up for tips, new destinations, and exclusive promos.',
        
        // === ПЕРЕКЛЮЧАТЕЛИ ===
        'theme-toggle': 'Theme',
        'lang-toggle': 'Language',
        
        // === СТРАНИЦА РЕГИСТРАЦИИ ===
        'register-title': 'Registration',
        'register-phone': 'Phone number',
        'register-email': 'Email',
        'register-birthdate': 'Birth date',
        'register-firstname': 'First name',
        'register-lastname': 'Last name',
        'register-middlename': 'Middle name',
        'register-nickname': 'Nickname',
        'register-password-manual': 'Enter password manually',
        'register-password-auto': 'Generate automatically',
        'register-password': 'Password',
        'register-repeat-password': 'Repeat password',
        'register-agreement': 'I agree with the terms of use',
        'register-submit': 'Register',
        'register-have-account': 'Already have an account?',
        'register-login-link': 'Login',
        
        // === СТРАНИЦА ВХОДА ===
        'login-title': 'Login to your account',
        'login-identifier': 'Email or Phone',
        'login-password': 'Password',
        'login-submit': 'Login',
        'login-no-account': 'Don\'t have an account?',
        'login-register-link': 'Register',
        
        // === СООБЩЕНИЯ ВАЛИДАЦИИ ===
        'error-required': 'This field is required',
        'error-email': 'Invalid email',
        'error-phone': 'Format: +375XXXXXXXXX',
        'error-age': 'Must be at least 16 years old',
        'error-password-length': 'From 8 to 20 characters',
        'error-password-complexity': 'Need uppercase, lowercase, digit and special character',
        'error-password-top': 'Too simple password (in TOP-100)',
        'error-passwords-match': 'Passwords do not match',
        'error-nickname-taken': 'This nickname is already taken',
        
        // === КОРЗИНА ===
        'cart-title': '🛒 Your cart',
        'cart-empty': 'Your cart is empty.',
        'cart-go-shopping': 'Go shopping',
        'cart-quantity': 'Quantity:',
        'cart-remove': '🗑️ Remove',
        'cart-total': 'Total:',
        'cart-currency': 'BYN',
        'cart-checkout': 'Checkout',
        'cart-login-required': 'Please login to place an order.',
        'cart-confirm': 'Confirm order placement?',
        'cart-success': 'Thank you for your purchase! Your order has been placed.',
        'cart-error': 'An error occurred while placing the order',
        
        // === ИЗБРАННОЕ ===
        'favorites-title': '❤️ My favorites',
        
        // === КАТАЛОГ ===
        'catalog-title': 'Catalog of services',
        'catalog-search': 'Search...',
        'catalog-filter': 'Filter',
        'catalog-category': 'Category',
        'catalog-all': 'All',
        'catalog-consultation': 'Consultation',
        'catalog-diagnostics': 'Diagnostics',
        'catalog-treatment': 'Treatment',
        'catalog-prevention': 'Prevention',
        'catalog-surgery': 'Surgery',
        'catalog-sort': 'Sort by',
        'catalog-price-asc': 'Price: low to high',
        'catalog-price-desc': 'Price: high to low',
        'catalog-name-asc': 'Name: A-Z',
        'catalog-rating': 'Rating',
        'catalog-add-cart': 'To cart',
        'catalog-add-fav': 'Favorite',
        'catalog-not-found': 'Nothing found',
        'catalog-reviews': 'Reviews',
        
        // === ОТЗЫВЫ ===
        'feedback-title': 'Leave a review',
        'feedback-page-title': 'Leave a review',
        'feedback-select-service': 'Select a service',
        'feedback-text': 'Your review',
        'feedback-submit': 'Submit review',
        'feedback-min-chars': 'Minimum 10 characters',
        'feedback-success': 'Thank you for your review!',
        'feedback-admin-error': 'Administrators cannot leave reviews.',
        'feedback-login-required': 'Please login to leave a review.',
        'feedback-no-purchases': 'You have no purchased services',
        
        // === СТРАНИЦА ОТЗЫВОВ ===
        'reviews-title': '💬 Reviews of our clients',
        'reviews-subtitle': 'Find out what they say about our services',
        'reviews-write': '✍️ Leave a review',
        'reviews-back-catalog': '← To catalog',
        'reviews-back-home': '← Home',
        
        // === АДМИН-ПАНЕЛЬ ===
        'admin-title': 'Control panel',
        'admin-welcome': 'Administrator',
        'admin-services': '🛠️ Service management',
        'admin-services-title': 'Service management',
        'admin-feedback': '💬 Review management',
        'admin-feedback-title': 'Review management',
        'admin-service-name': 'Name',
        'admin-service-price': 'Price',
        'admin-service-category': 'Category',
        'admin-service-description': 'Description',
        'admin-service-rating': 'Rating',
        'admin-service-image': 'Image path',
        'admin-save': '💾 Save service',
        'admin-edit': 'Edit',
        'admin-delete': 'Delete',
        'admin-filter-service': 'Filter by service',
        'admin-filter-user': 'Filter by user ID',
        'admin-all-services': 'All services',
        'admin-confirm-delete': 'Delete this item?',
        'admin-success-save': 'Service saved successfully!',
        'admin-access-denied': 'Access denied. For administrators only.',
        'admin-back-home': '← Home',
        'admin-back-catalog': 'To catalog',
        
        // === ПРОФИЛЬ ===
        'profile-title': '👤 My profile',
        'profile-edit': 'Edit',
        'profile-save': 'Save changes',
        'profile-reset': '🔄 Reset settings',
        'profile-reset-confirm': 'Reset all settings?',
        
        // === УВЕДОМЛЕНИЯ ===
        'notify-added-cart': 'Added to cart',
        'notify-added-fav': 'Added to favorites',
        'notify-removed': 'Removed',
        'notify-video-started': 'Video started',
        'notify-login-success': 'Welcome',
        'notify-login-error': 'Invalid email/phone or password',
        'notify-register-success': 'Registration successful!',
    },
    
    'ru': {
        // === ЛОГОТИП И МЕНЮ ===
        'logo': 'HEALTCARE.',
        'home': 'Главная',
        'catalog': 'Каталог',
        'login': 'Войти',
        'register': 'Регистрация',
        'feedback': 'Отзывы',
        'cart': 'Корзина',
        'favorites': 'Избранное',
        'get-started': 'Начать',
        'logout': 'Выйти',
        'admin': 'Админ',
        'close': 'Закрыть',
        
        // === HERO СЕКЦИЯ ===
        'hero-title-1': 'Найдите и запишитесь к',
        'hero-title-2': 'подходящему врачу',
        'hero-description': 'Присоединяйтесь к нам и заботьтесь о себе и своей семье с помощью медицинских услуг, которые подарят вам уверенность и безопасность в повседневной жизни.',
        'find-doctor': 'Найти врача',
        'location': 'Минск, Беларусь',
        
        // === СЧЁТЧИКИ ===
        'counter-patients': 'Довольных пациентов',
        'counter-doctors': 'Врачей',
        'counter-experience': 'Лет опыта',
        'counter-support': 'Часа поддержки',
        
        // === СЛАЙДЕР ===
        'slider-title': '📸 Наши услуги',
        
        // === 3 ШАГА ===
        'steps-title': '3 простых шага для решения вашей проблемы',
        'step1-title': 'Найдите лучшего врача',
        'step1-text': 'Легко найдите своего врача с минимальными усилиями. Мы всё организовали для вас.',
        'step2-title': 'Запишитесь на приём',
        'step2-text': 'Запишитесь к врачу быстро, почти одним кликом. Об остальном позаботимся мы.',
        'step3-title': 'Успешные консультации',
        'step3-text': 'Пройдите консультацию и получите услугу по записи. Вернитесь к хорошему здоровью.',
        
        // === ПАРАЛЛАКС ===
        'parallax-title': 'Забота о вашем здоровье — наш приоритет',
        'parallax-text': 'Более 15 лет опыта • 50+ специалистов • 24/7 поддержка',
        
        // === QUALITY ===
        'quality-title': 'Лучшее качество услуг с нашими опытными врачами',
        'quality-description': 'Благодаря нашим лучшим врачам мы можем предоставлять медицинские услуги выше среднего уровня. У нас высококвалифицированные врачи, так что не волнуйтесь. Они также очень талантливы в своих областях.',
        'quality-list-1': 'Поиск специалиста и онлайн-консультации где угодно',
        'quality-list-2': 'Консультации наших лучших специалистов',
        'quality-list-3': 'Врачи доступны 24/7',
        'quality-btn': 'Найти специалистов →',
        
        // === НАШИ УСЛУГИ ===
        'services-title': 'Наши услуги',
        'services-subtitle': 'Наши врачи обладают высокой квалификацией и гарантированно помогут вам выздороветь.',
        'service-cardiology': 'Кардиология',
        'service-cardiology-desc': 'Наши кардиологи специализируются на диагностике и исследовании заболеваний сердечно-сосудистой системы.',
        'service-pulmonology': 'Пульмонология',
        'service-pulmonology-desc': 'Наши пульмонологи специализируются на диагностике и лечении заболеваний лёгких.',
        'service-medicine': 'Терапия',
        'service-medicine-desc': 'Наши терапевты специализируются на диагностике и лечении по новейшим медицинским методикам.',
        
        // === МЕДИАГАЛЕРЕЯ ===
        'gallery-title': '🏥 Наши медицинские услуги',
        'gallery-subtitle': 'Кликните на изображение, чтобы узнать больше',
        
        // === ВРАЧИ ===
        'doctors-title': 'Познакомьтесь с нашими сертифицированными врачами',
        'doctors-subtitle': 'Наши онлайн-врачи имеют в среднем 15 лет опыта и 98% рейтинг удовлетворённости!',
        'doctor1-name': 'Д-р Аманда Линда',
        'doctor1-specialty': 'Стоматолог',
        'doctor2-name': 'Д-р Алиса Рахман',
        'doctor2-specialty': 'Кардиолог',
        'doctor3-name': 'Д-р Энтони Фаучи',
        'doctor3-specialty': 'Невролог',
        'doctor4-name': 'Д-р Халид Аббед',
        'doctor4-specialty': 'Онколог',
        'doctors-btn': 'Все врачи',
        
        // === МОБИЛЬНОЕ ПРИЛОЖЕНИЕ ===
        'mobile-title': 'Мобильное приложение доступно<br>Получите HealthCare бесплатно!',
        'mobile-description': 'Получите доступ к врачу по телефону с бесплатным мобильным приложением HealthCare.',
        
        // === КЛИЕНТЫ ===
        'clients-title': 'Что говорят о нас наши клиенты',
        
        // === CTA ===
        'cta-title': 'Пора изменить свою жизнь уже сегодня',
        'cta-btn': 'Записаться на приём',
        
        // === КАРТА ===
        'map-title': '📍 Как нас найти',
        'map-address': 'г. Минск, проспект Независимости, д. 65',
        
        // === ФУТЕР ===
        'footer-address': 'Минск, проспект Независимости, 65',
        'footer-contact': 'Свяжитесь с нами: +375-29-123-45-67',
        'footer-category': 'Категории',
        'footer-about': 'О нас',
        'footer-about-link': 'О компании',
        'footer-services': 'Услуги',
        'footer-reviews': 'Отзывы',
        'footer-article': 'Статьи',
        'footer-partners': 'Партнёры',
        'footer-careers': 'Карьера',
        'footer-press': 'Пресса',
        'footer-community': 'Сообщество',
        'footer-subscribe': 'Подписаться на рассылку',
        'footer-subscribe-text': 'Подпишитесь на советы и эксклюзивные акции.',
        
        // === ПЕРЕКЛЮЧАТЕЛИ ===
        'theme-toggle': 'Тема',
        'lang-toggle': 'Язык',
        
        // === СТРАНИЦА РЕГИСТРАЦИИ ===
        'register-title': 'Регистрация',
        'register-phone': 'Номер телефона',
        'register-email': 'Email',
        'register-birthdate': 'Дата рождения',
        'register-firstname': 'Имя',
        'register-lastname': 'Фамилия',
        'register-middlename': 'Отчество',
        'register-nickname': 'Никнейм',
        'register-password-manual': 'Ввести пароль вручную',
        'register-password-auto': 'Сгенерировать автоматически',
        'register-password': 'Пароль',
        'register-repeat-password': 'Повторите пароль',
        'register-agreement': 'Я согласен с условиями использования',
        'register-submit': 'Зарегистрироваться',
        'register-have-account': 'Уже есть аккаунт?',
        'register-login-link': 'Войти',
        
        // === СТРАНИЦА ВХОДА ===
        'login-title': 'Вход в аккаунт',
        'login-identifier': 'Email или Телефон',
        'login-password': 'Пароль',
        'login-submit': 'Войти',
        'login-no-account': 'Нет аккаунта?',
        'login-register-link': 'Зарегистрироваться',
        
        // === СООБЩЕНИЯ ВАЛИДАЦИИ ===
        'error-required': 'Это поле обязательно',
        'error-email': 'Некорректный email',
        'error-phone': 'Формат: +375XXXXXXXXX',
        'error-age': 'Должно быть хотя бы 16 лет',
        'error-password-length': 'От 8 до 20 символов',
        'error-password-complexity': 'Нужна заглавная, строчная, цифра и спецсимвол',
        'error-password-top': 'Слишком простой пароль (в TOP-100)',
        'error-passwords-match': 'Пароли не совпадают',
        'error-nickname-taken': 'Этот никнейм уже занят',
        
        // === КОРЗИНА ===
        'cart-title': '🛒 Корзина покупок',
        'cart-empty': 'Ваша корзина пуста.',
        'cart-go-shopping': 'Перейти к покупкам',
        'cart-quantity': 'Кол-во:',
        'cart-remove': '🗑️ Удалить',
        'cart-total': 'Итого:',
        'cart-currency': 'BYN',
        'cart-checkout': 'Оформить заказ',
        'cart-login-required': 'Пожалуйста, войдите в систему, чтобы оформить заказ.',
        'cart-confirm': 'Подтверждаете оформление заказа?',
        'cart-success': 'Спасибо за покупку! Ваш заказ успешно оформлен.',
        'cart-error': 'Произошла ошибка при оформлении заказа',
        
        // === ИЗБРАННОЕ ===
        'favorites-title': '❤️ Моё избранное',
        
        // === КАТАЛОГ ===
        'catalog-title': 'Каталог услуг',
        'catalog-search': 'Поиск...',
        'catalog-filter': 'Фильтр',
        'catalog-category': 'Категория',
        'catalog-all': 'Все',
        'catalog-consultation': 'Консультация',
        'catalog-diagnostics': 'Диагностика',
        'catalog-treatment': 'Лечение',
        'catalog-prevention': 'Профилактика',
        'catalog-surgery': 'Хирургия',
        'catalog-sort': 'Сортировка',
        'catalog-price-asc': 'Цена: по возрастанию',
        'catalog-price-desc': 'Цена: по убыванию',
        'catalog-name-asc': 'Название: А-Я',
        'catalog-rating': 'Рейтинг',
        'catalog-add-cart': 'В корзину',
        'catalog-add-fav': 'В избранное',
        'catalog-not-found': 'Ничего не найдено',
        'catalog-reviews': 'Отзывы',
        
        // === ОТЗЫВЫ ===
        'feedback-title': 'Оставить отзыв',
        'feedback-page-title': 'Оставить отзыв',
        'feedback-select-service': 'Выберите услугу',
        'feedback-text': 'Ваш отзыв',
        'feedback-submit': 'Отправить отзыв',
        'feedback-min-chars': 'Минимум 10 символов',
        'feedback-success': 'Спасибо за отзыв!',
        'feedback-admin-error': 'Администраторы не могут оставлять отзывы.',
        'feedback-login-required': 'Войдите в систему, чтобы оставить отзыв.',
        'feedback-no-purchases': 'У вас нет купленных услуг',
        
        // === СТРАНИЦА ОТЗЫВОВ ===
        'reviews-title': '💬 Отзывы наших клиентов',
        'reviews-subtitle': 'Узнайте, что говорят о наших услугах',
        'reviews-write': '✍️ Оставить отзыв',
        'reviews-back-catalog': '← В каталог',
        'reviews-back-home': '← На главную',
        
        // === АДМИН-ПАНЕЛЬ ===
        'admin-title': 'Панель управления',
        'admin-welcome': 'Администратор',
        'admin-services': '🛠️ Управление услугами',
        'admin-services-title': 'Управление услугами',
        'admin-feedback': '💬 Управление отзывами',
        'admin-feedback-title': 'Управление отзывами',
        'admin-service-name': 'Название',
        'admin-service-price': 'Цена',
        'admin-service-category': 'Категория',
        'admin-service-description': 'Описание',
        'admin-service-rating': 'Рейтинг',
        'admin-service-image': 'Путь к изображению',
        'admin-save': '💾 Сохранить услугу',
        'admin-edit': 'Изменить',
        'admin-delete': 'Удалить',
        'admin-filter-service': 'Фильтр по услуге',
        'admin-filter-user': 'Фильтр по ID пользователя',
        'admin-all-services': 'Все услуги',
        'admin-confirm-delete': 'Удалить этот элемент?',
        'admin-success-save': 'Услуга успешно сохранена!',
        'admin-access-denied': 'Доступ запрещен. Только для администраторов.',
        'admin-back-home': '← На главную',
        'admin-back-catalog': 'В каталог',
        
        // === ПРОФИЛЬ ===
        'profile-title': '👤 Мой профиль',
        'profile-edit': 'Редактировать',
        'profile-save': 'Сохранить изменения',
        'profile-reset': '🔄 Сбросить настройки',
        'profile-reset-confirm': 'Сбросить все настройки?',
        
        // === УВЕДОМЛЕНИЯ ===
        'notify-added-cart': 'Добавлено в корзину',
        'notify-added-fav': 'Добавлено в избранное',
        'notify-removed': 'Удалено',
        'notify-video-started': 'Видео запущено',
        'notify-login-success': 'Добро пожаловать',
        'notify-login-error': 'Неверный email/телефон или пароль',
        'notify-register-success': 'Регистрация успешна!',
    }
};