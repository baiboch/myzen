import { useEffect, useState } from 'react';
import BrandLogo from './BrandLogo.jsx';
import { applyAdminTheme, getStoredAdminTheme, toggleAdminTheme } from '../admin/useAdminTheme.js';

const menuItems = [
    { id: 'dashboard', label: 'Обзор', icon: '▦', href: '/admin' },
    { id: 'pages', label: 'Страницы', icon: '◫', href: '/admin/pages' },
    { id: 'designer', label: 'AI-конструктор', icon: '✦', href: '/admin/designer' },
    { id: 'settings', label: 'Настройки', icon: '⚙', href: '/admin/settings' },
];

const providerLabels = {
    google: 'Google',
    facebook: 'Facebook',
    apple: 'Apple',
};

function getInitials(name) {
    return name
        .split(' ')
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
}

function UserAvatar({ user }) {
    if (user.avatar) {
        return (
            <img
                src={user.avatar}
                alt={user.name}
                className="admin-layout__avatar"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
            />
        );
    }

    return (
        <div
            className={`admin-layout__avatar admin-layout__avatar--placeholder admin-layout__avatar--${user.provider || 'oauth'}`}
            aria-hidden="true"
            title={providerLabels[user.provider] || 'OAuth'}
        >
            {getInitials(user.name)}
        </div>
    );
}

export default function AdminLayout({
    user,
    activeSection,
    pageTitle,
    pageSubtitle,
    children,
}) {
    const [theme, setTheme] = useState(getStoredAdminTheme);

    useEffect(() => {
        applyAdminTheme(theme);
    }, [theme]);

    function handleThemeToggle() {
        setTheme(toggleAdminTheme());
    }

    return (
        <div className="admin-layout">
            <aside className="admin-layout__sidebar">
                <div className="admin-layout__brand">
                    <BrandLogo className="admin-layout__logo" />
                    <span className="admin-layout__badge">Admin</span>
                </div>

                <nav className="admin-layout__nav">
                    {menuItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            className={activeSection === item.id ? 'admin-layout__nav-item admin-layout__nav-item--active' : 'admin-layout__nav-item'}
                        >
                            <span className="admin-layout__nav-icon">{item.icon}</span>
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="admin-layout__sidebar-footer">
                    <button
                        type="button"
                        className="admin-layout__theme-toggle"
                        onClick={handleThemeToggle}
                        aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
                    >
                        <span className="admin-layout__theme-icon">{theme === 'dark' ? '☀' : '☾'}</span>
                        {theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
                    </button>
                    <a href="/" className="admin-layout__footer-link">← На главную</a>
                </div>
            </aside>

            <div className="admin-layout__main">
                <header className="admin-layout__topbar">
                    <div className="admin-layout__topbar-text">
                        <h1>{pageTitle}</h1>
                        {pageSubtitle && <p>{pageSubtitle}</p>}
                    </div>

                    <div className="admin-layout__topbar-actions">
                        <div className="admin-layout__profile">
                            <UserAvatar user={user} />
                            <div>
                                <div className="admin-layout__profile-name">{user.name}</div>
                                <div className="admin-layout__profile-email">{user.email}</div>
                                {user.provider && (
                                    <div className="admin-layout__profile-provider">
                                        через {providerLabels[user.provider] || user.provider}
                                    </div>
                                )}
                            </div>
                        </div>
                        <a href="/logout" className="admin-layout__logout">Выйти</a>
                    </div>
                </header>

                <div className="admin-layout__content">
                    {children}
                </div>
            </div>
        </div>
    );
}
