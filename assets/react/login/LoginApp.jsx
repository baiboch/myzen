import BrandLogo from '../components/BrandLogo';

const providers = [
    {
        id: 'google',
        label: 'Продолжить через Google',
        href: '/connect/google',
        icon: '/images/login/google.svg',
    },
    {
        id: 'facebook',
        label: 'Продолжить через Facebook',
        href: '/connect/facebook',
        icon: '/images/login/facebook.svg',
    },
    {
        id: 'apple',
        label: 'Продолжить через Apple',
        href: '/connect/apple',
        icon: '/images/login/apple.svg',
    },
];

export default function LoginApp() {
    return (
        <div className="login-page">
            <header className="login-page__header">
                <BrandLogo className="login-page__logo" />
            </header>

            <div className="login-page__layout">
                <section className="login-page__visual">
                    <div className="login-page__intro">
                        <div className="login-page__badge">
                            <span>✦</span> Создайте свою страницу
                        </div>
                        <h1 className="login-page__title">
                            Войдите и начните<br />
                            <span>за три минуты</span>
                        </h1>
                        <p className="login-page__text">
                            Авторизуйтесь через удобный сервис — и сразу перейдёте
                            в панель, где можно собрать и опубликовать свою страницу.
                        </p>
                    </div>
                    <div className="login-page__preview">
                        <img
                            src="/images/landing/template-creative.jpg"
                            alt="Пример страницы клиента"
                            loading="eager"
                        />
                    </div>
                </section>

                <aside className="login-page__aside">
                    <section className="login-card">
                    <p className="login-card__label">вход</p>
                    <h2>Добро пожаловать</h2>
                    <p className="login-card__subtitle">
                        Выберите способ входа. После авторизации откроется ваша админка.
                    </p>

                    <div className="login-card__providers">
                        {providers.map((provider) => (
                            <a
                                key={provider.id}
                                href={provider.href}
                                className={`login__provider login__provider--${provider.id}`}
                            >
                                <span className="login__provider-icon">
                                    <img src={provider.icon} alt="" aria-hidden="true" />
                                </span>
                                {provider.label}
                            </a>
                        ))}
                    </div>

                    <p className="login-card__note">
                        Нажимая кнопку входа, вы соглашаетесь с условиями использования MyZEN.
                    </p>
                    </section>
                </aside>
            </div>
        </div>
    );
}
