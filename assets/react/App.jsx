import BrandLogo from './components/BrandLogo';

const stats = [
    { value: '47 000+', label: 'активных страниц' },
    { value: '120+', label: 'стран мира' },
    { value: '3 мин', label: 'до готовой страницы' },
    { value: '98%', label: 'довольных клиентов' },
];

const useCases = [
    {
        title: 'Портфолио и услуги',
        text: 'Фотографы, дизайнеры и мастера собирают страницу с работами и кнопкой «Записаться».',
        image: '/images/landing/usecase-photo.jpg',
    },
    {
        title: 'Меню и каталог',
        text: 'Кофейни, салоны и магазины публикуют цены, фото и ссылку на заказ в один клик.',
        image: '/images/landing/usecase-cafe.jpg',
    },
    {
        title: 'Эксперт и коуч',
        text: 'Специалисты продают консультации через личную страницу с программой и отзывами.',
        image: '/images/landing/usecase-coach.jpg',
    },
    {
        title: 'Фриланс и команда',
        text: 'Агентства и фрилансеры показывают кейсы, контакты и форму заявки без разработчика.',
        image: '/images/landing/usecase-freelance.jpg',
    },
];

const templates = [
    {
        name: 'Минимализм',
        tag: 'личная страница',
        image: '/images/landing/template-minimal.jpg',
    },
    {
        name: 'Бизнес',
        tag: 'услуги и заявки',
        image: '/images/landing/template-business.jpg',
    },
    {
        name: 'Креатив',
        tag: 'портфолио',
        image: '/images/landing/template-creative.jpg',
    },
];

const steps = [
    {
        number: '01',
        title: 'Выберите шаблон',
        text: 'Более 60 профессиональных шаблонов под любой сценарий.',
        image: '/images/landing/template-minimal.jpg',
    },
    {
        number: '02',
        title: 'Наполните контентом',
        text: 'Текст, фото, ссылки — всё через простой визуальный редактор.',
        image: '/images/landing/hero-editor.jpg',
    },
    {
        number: '03',
        title: 'Опубликуйте',
        text: 'Нажмите «Опубликовать» — страница мгновенно доступна по вашей ссылке.',
        image: '/images/landing/template-business.jpg',
    },
];

const testimonials = [
    {
        quote: '«За 20 минут сделала портфолио, которое раньше не могла собрать годами. Клиенты говорят, что выгляжу как настоящее агентство.»',
        name: 'Анастасия Волкова',
        role: 'Фотограф',
        avatar: '/images/landing/avatar-1.jpg',
    },
    {
        quote: '«Сделал каталог с меню и ценами. Теперь просто кидаю ссылку в мессенджеры — и всё, клиент уже видит всё что нужно.»',
        name: 'Михаил Орлов',
        role: 'Владелец кофейни «Зёрна»',
        avatar: '/images/landing/avatar-2.jpg',
    },
    {
        quote: '«Страница собрала 340 заявок за первый месяц. Вернула стоимость тарифа в первые 3 дня.»',
        name: 'Карина Ли',
        role: 'Нутрициолог',
        avatar: '/images/landing/avatar-3.jpg',
    },
];

const plans = [
    {
        name: 'Старт',
        price: '0 ₽',
        period: 'навсегда',
        features: [
            '1 страница',
            'Базовые блоки',
            'Поддомен .myzen.ru',
            '500 посетителей/мес',
        ],
        cta: 'Начать бесплатно',
        highlighted: false,
    },
    {
        name: 'Про',
        price: '490 ₽',
        period: 'в месяц',
        features: [
            '10 страниц',
            'Все блоки и шаблоны',
            'Свой домен',
            'Аналитика и форма сбора заявок',
            'Без брендинга MyZEN',
            'Неограниченно посетителей',
        ],
        cta: 'Попробовать 14 дней бесплатно',
        highlighted: true,
    },
    {
        name: 'Бизнес',
        price: '1 490 ₽',
        period: 'в месяц',
        features: [
            'Неограниченно страниц',
            'Командный доступ (до 10 чел.)',
            'White-label решение',
            'Приоритетная поддержка',
            'API и интеграции',
            'Кастомный CSS',
        ],
        cta: 'Связаться с нами',
        highlighted: false,
    },
];

const heroFloats = [
    {
        id: 'menu',
        position: 'left',
        thumb: '/images/landing/usecase-cafe.jpg',
        label: 'Каталог меню',
        preview: '/images/landing/template-business.jpg',
        tip: 'Загрузите фото блюд и цены — отправляйте одну ссылку в WhatsApp, клиенты заказывают сами.',
        tooltipPlacement: 'top',
    },
    {
        id: 'portfolio',
        position: 'right',
        thumb: '/images/landing/usecase-photo.jpg',
        label: 'Портфолио',
        preview: '/images/landing/template-creative.jpg',
        tip: 'Соберите галерею работ и кнопку «Записаться» — выглядите как студия, а не как частник.',
        tooltipPlacement: 'bottom',
    },
    {
        id: 'booking',
        position: 'bottom-right',
        thumb: '/images/landing/usecase-coach.jpg',
        label: 'Онлайн-запись',
        preview: '/images/landing/usecase-coach.jpg',
        tip: 'Добавьте календарь и форму — клиенты сами выбирают время без долгой переписки.',
        tooltipPlacement: 'top',
    },
    {
        id: 'leads',
        position: 'center-left',
        thumb: '/images/landing/usecase-freelance.jpg',
        label: 'Заявки',
        preview: '/images/landing/usecase-freelance.jpg',
        tip: 'Форма заявки приходит на почту — не теряйте лиды из соцсетей и мессенджеров.',
        tooltipPlacement: 'right',
    },
];

function Stars() {
    return (
        <div className="stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
                <span key={index}>★</span>
            ))}
        </div>
    );
}

function BrowserMockup({ image, alt }) {
    return (
        <div className="browser-mockup">
            <div className="browser-mockup__bar">
                <span /><span /><span />
                <div className="browser-mockup__url">yourname.myzen.ru</div>
            </div>
            <img src={image} alt={alt} className="browser-mockup__image" loading="eager" />
        </div>
    );
}

function HeroFloat({ float }) {
    return (
        <div
            className={`landing__hero-float landing__hero-float--${float.position}`}
            tabIndex={0}
        >
            <div className="landing__hero-float-inner">
                <img src={float.thumb} alt="" loading="lazy" />
                <span>{float.label}</span>
            </div>
            <div className={`landing__hero-tooltip landing__hero-tooltip--${float.tooltipPlacement}`}>
                <img
                    src={float.preview}
                    alt=""
                    className="landing__hero-tooltip-image"
                    loading="lazy"
                />
                <div className="landing__hero-tooltip-body">
                    <strong>{float.label}</strong>
                    <p>{float.tip}</p>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <div className="landing">
            <header className="landing__header">
                <div className="landing__container landing__header-inner">
                    <BrandLogo />
                    <nav className="landing__nav">
                        <a href="#features">Возможности</a>
                        <a href="#templates">Шаблоны</a>
                        <a href="#pricing">Цены</a>
                        <a href="#examples">Примеры</a>
                    </nav>
                    <div className="landing__header-actions">
                        <a href="/login" className="landing__link">Войти</a>
                        <a href="/login" className="landing__button landing__button--accent">Создать страницу</a>
                    </div>
                </div>
            </header>

            <section className="landing__hero">
                <div className="landing__container landing__hero-grid">
                    <div className="landing__hero-content">
                        <div className="landing__badge">
                            <span className="landing__badge-icon">✦</span>
                            Новый способ заявить о себе
                        </div>
                        <h1 className="landing__title">
                            Ваша страница —<br />
                            <span className="landing__title-accent">за три минуты.</span>
                        </h1>
                        <p className="landing__subtitle">
                            Создайте личную рекламную страницу, каталог товаров или промо-сайт.
                            Без кода, дизайнера и боли. Просто выберите шаблон и заполните своё.
                        </p>
                        <div className="landing__actions">
                            <a href="/login" className="landing__button landing__button--accent landing__button--large">
                                Создать бесплатно →
                            </a>
                            <a href="#examples" className="landing__link landing__link--arrow">
                                Смотреть примеры &gt;
                            </a>
                        </div>
                    </div>
                    <div className="landing__hero-visual">
                        <BrowserMockup
                            image="/images/landing/hero-v2.jpg"
                            alt="Яркий процесс создания страницы в MyZEN — цвета, блоки и готовый результат"
                        />
                        {heroFloats.map((float) => (
                            <HeroFloat key={float.id} float={float} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="landing__stats">
                <div className="landing__container">
                    <div className="landing__stats-grid">
                        {stats.map((item) => (
                            <div key={item.label} className="landing__stat">
                                <div className="landing__stat-value">{item.value}</div>
                                <div className="landing__stat-label">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="landing__section" id="features">
                <div className="landing__container">
                    <p className="landing__section-label">для кого</p>
                    <h2 className="landing__section-title">Один инструмент — бесконечные сценарии</h2>
                    <div className="landing__usecases">
                        {useCases.map((item) => (
                            <article key={item.title} className="landing__usecase">
                                <div className="landing__usecase-image-wrap">
                                    <img src={item.image} alt={item.title} loading="lazy" />
                                </div>
                                <div className="landing__usecase-body">
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="landing__section landing__section--templates" id="templates">
                <div className="landing__container">
                    <p className="landing__section-label">шаблоны</p>
                    <h2 className="landing__section-title">Готовые страницы — осталось добавить себя</h2>
                    <div className="landing__templates">
                        {templates.map((item) => (
                            <article key={item.name} className="landing__template">
                                <div className="landing__template-image">
                                    <img src={item.image} alt={`Шаблон ${item.name}`} loading="lazy" />
                                    <span className="landing__template-tag">{item.tag}</span>
                                </div>
                                <h3>{item.name}</h3>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="landing__section landing__section--steps">
                <div className="landing__container">
                    <p className="landing__section-label">как это работает</p>
                    <h2 className="landing__section-title">Просто. Быстро. Готово.</h2>
                    <div className="landing__steps">
                        {steps.map((step) => (
                            <article key={step.number} className="landing__step">
                                <div className="landing__step-image">
                                    <img src={step.image} alt={step.title} loading="lazy" />
                                </div>
                                <div className="landing__step-number">{step.number}</div>
                                <h3>{step.title}</h3>
                                <p>{step.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="landing__section landing__section--testimonials" id="examples">
                <div className="landing__container">
                    <h2 className="landing__section-title">Говорят те, кто уже запустился</h2>
                    <div className="landing__testimonials">
                        {testimonials.map((item) => (
                            <article key={item.name} className="landing__testimonial">
                                <Stars />
                                <p className="landing__testimonial-quote">{item.quote}</p>
                                <div className="landing__testimonial-author">
                                    <img src={item.avatar} alt={item.name} className="landing__testimonial-avatar" loading="lazy" />
                                    <div>
                                        <div className="landing__testimonial-name">{item.name}</div>
                                        <div className="landing__testimonial-role">{item.role}</div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="landing__section landing__section--pricing" id="pricing">
                <div className="landing__container">
                    <p className="landing__section-label landing__section-label--center">тарифы</p>
                    <h2 className="landing__section-title landing__section-title--center">Честные цены</h2>
                    <div className="landing__pricing">
                        {plans.map((plan) => (
                            <article
                                key={plan.name}
                                className={plan.highlighted ? 'landing__plan landing__plan--highlighted' : 'landing__plan'}
                            >
                                <div className="landing__plan-name">{plan.name}</div>
                                <div className="landing__plan-price">{plan.price}</div>
                                <div className="landing__plan-period">{plan.period}</div>
                                <ul className="landing__plan-features">
                                    {plan.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                                <a
                                    href="/login"
                                    className={plan.highlighted
                                        ? 'landing__button landing__button--dark landing__button--full'
                                        : 'landing__button landing__button--accent landing__button--full'}
                                >
                                    {plan.cta}
                                </a>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="landing__cta">
                <div className="landing__container">
                    <div className="landing__cta-card">
                        <div className="landing__cta-content">
                            <h2>Ваша страница ждёт.</h2>
                            <p>Зарегистрируйтесь бесплатно — кредитная карта не нужна.</p>
                            <a href="/login" className="landing__button landing__button--dark landing__button--cta">
                                Начать сейчас — бесплатно
                            </a>
                        </div>
                        <div className="landing__cta-visual">
                            <img
                                src="/images/landing/hero-editor.jpg"
                                alt="Клиент создаёт свою страницу в визуальном редакторе"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <footer className="landing__footer">
                <div className="landing__container landing__footer-inner">
                    <BrandLogo small />
                    <span className="landing__copyright">© {new Date().getFullYear()} MyZEN. Все права защищены.</span>
                    <nav className="landing__footer-nav">
                        <a href="#terms">Условия</a>
                        <a href="#privacy">Конфиденциальность</a>
                        <a href="#support">Поддержка</a>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
