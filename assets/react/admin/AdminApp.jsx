import { useEffect, useState } from 'react';

const menuItems = [
    { id: 'dashboard', label: 'Обзор' },
    { id: 'users', label: 'Пользователи' },
    { id: 'settings', label: 'Настройки' },
];

export default function AdminApp() {
    const [user, setUser] = useState(null);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/me', { credentials: 'same-origin' })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('Не удалось загрузить профиль');
                }

                return response.json();
            })
            .then((data) => setUser(data))
            .catch(() => setError('Ошибка загрузки данных пользователя'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="admin admin--centered">Загрузка...</div>;
    }

    if (error || !user) {
        return <div className="admin admin--centered">{error || 'Пользователь не найден'}</div>;
    }

    return (
        <div className="admin">
            <aside className="admin__sidebar">
                <div className="admin__brand">MyZen Admin</div>
                <nav className="admin__menu">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className={activeSection === item.id ? 'admin__menu-item admin__menu-item--active' : 'admin__menu-item'}
                            onClick={() => setActiveSection(item.id)}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="admin__main">
                <header className="admin__header">
                    <div>
                        <h1>Минимальная админка</h1>
                        <p>Вы вошли через Google</p>
                    </div>
                    <div className="admin__profile">
                        {user.avatar && (
                            <img src={user.avatar} alt={user.name} className="admin__avatar" />
                        )}
                        <div>
                            <div className="admin__name">{user.name}</div>
                            <div className="admin__email">{user.email}</div>
                        </div>
                        <a href="/logout" className="admin__logout">Выйти</a>
                    </div>
                </header>

                <section className="admin__panel">
                    {activeSection === 'dashboard' && (
                        <>
                            <h2>Обзор</h2>
                            <p>Добро пожаловать, {user.name}. Это стартовая панель управления.</p>
                            <div className="admin__cards">
                                <article className="admin__card">
                                    <span className="admin__card-label">Статус</span>
                                    <strong>Активен</strong>
                                </article>
                                <article className="admin__card">
                                    <span className="admin__card-label">Роль</span>
                                    <strong>{user.roles.join(', ')}</strong>
                                </article>
                                <article className="admin__card">
                                    <span className="admin__card-label">Провайдер</span>
                                    <strong>Google OAuth</strong>
                                </article>
                            </div>
                        </>
                    )}

                    {activeSection === 'users' && (
                        <>
                            <h2>Пользователи</h2>
                            <p>Раздел-заглушка. Здесь позже появится список пользователей.</p>
                        </>
                    )}

                    {activeSection === 'settings' && (
                        <>
                            <h2>Настройки</h2>
                            <p>Раздел-заглушка для будущих настроек проекта.</p>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
}
