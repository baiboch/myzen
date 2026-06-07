import BrandLogo from './BrandLogo.jsx';

const navItems = [
    { id: 'dashboard', label: 'Обзор', href: '/admin' },
    { id: 'pages', label: 'Страницы', href: '/admin' },
    { id: 'settings', label: 'Настройки', href: '/admin' },
];

function getInitials(name) {
    return name
        .split(' ')
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
}

export default function AdminHeader({
    user,
    activeNav = null,
    onNavClick = null,
    showBackLink = false,
}) {
    return (
        <header className="landing__header">
            <div className="landing__container landing__header-inner">
                <BrandLogo />
                <nav className="landing__nav admin__nav">
                    {navItems.map((item) => (
                        onNavClick ? (
                            <button
                                key={item.id}
                                type="button"
                                className={activeNav === item.id ? 'admin__nav-btn admin__nav-btn--active' : 'admin__nav-btn'}
                                onClick={() => onNavClick(item.id)}
                            >
                                {item.label}
                            </button>
                        ) : (
                            <a
                                key={item.id}
                                href={item.href}
                                className={activeNav === item.id ? 'admin__nav-btn admin__nav-btn--active' : 'admin__nav-btn'}
                            >
                                {item.label}
                            </a>
                        )
                    ))}
                    <a
                        href="/admin/designer"
                        className={activeNav === 'designer' ? 'admin__nav-btn admin__nav-btn--active' : 'admin__nav-btn'}
                    >
                        Конструктор
                    </a>
                </nav>
                <div className="landing__header-actions admin__header-actions">
                    {showBackLink && (
                        <a href="/admin" className="landing__link">← Админка</a>
                    )}
                    <div className="admin__user">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="admin__avatar" />
                        ) : (
                            <div className="admin__avatar admin__avatar--placeholder" aria-hidden="true">
                                {getInitials(user.name)}
                            </div>
                        )}
                        <div className="admin__user-meta">
                            <span className="admin__user-name">{user.name}</span>
                            <span className="admin__user-email">{user.email}</span>
                        </div>
                    </div>
                    <a href="/logout" className="landing__link">Выйти</a>
                    <a href="/admin/designer" className="landing__button landing__button--accent">
                        ✦ Создать дизайн
                    </a>
                </div>
            </div>
        </header>
    );
}
