import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout.jsx';
import CreateDesignCard from '../components/CreateDesignCard.jsx';

const sectionMeta = {
    dashboard: {
        title: 'Обзор',
        subtitle: 'Сводка по аккаунту и быстрые действия',
    },
    pages: {
        title: 'Страницы',
        subtitle: 'Ваши опубликованные страницы',
    },
    settings: {
        title: 'Настройки',
        subtitle: 'Данные аккаунта и входа',
    },
};

const providerLabels = {
    google: 'Google',
    facebook: 'Facebook',
    apple: 'Apple',
};

function formatRoles(roles) {
    return roles
        .filter((role) => role !== 'ROLE_USER')
        .map((role) => role.replace('ROLE_', ''))
        .join(', ') || 'Пользователь';
}

function getActiveSectionFromPath() {
    const path = window.location.pathname;

    if (path.startsWith('/admin/designer')) {
        return 'designer';
    }

    if (path === '/admin/pages') {
        return 'pages';
    }

    if (path === '/admin/settings') {
        return 'settings';
    }

    return 'dashboard';
}

export default function AdminApp() {
    const [user, setUser] = useState(null);
    const [activeSection] = useState(getActiveSectionFromPath);
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
        return (
            <div className="admin-layout admin-layout--state">
                <div className="admin-layout__state">Загрузка...</div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="admin-layout admin-layout--state">
                <div className="admin-layout__state">{error || 'Пользователь не найден'}</div>
            </div>
        );
    }

    const providerLabel = providerLabels[user.provider] || user.provider || 'OAuth';
    const meta = sectionMeta[activeSection] || sectionMeta.dashboard;

    return (
        <AdminLayout
            user={user}
            activeSection={activeSection}
            pageTitle={meta.title}
            pageSubtitle={meta.subtitle}
        >
            {activeSection === 'dashboard' && (
                <>
                    <div className="admin-panel__cards">
                        <article className="admin-panel__card">
                            <span className="admin-panel__card-label">Страниц</span>
                            <strong className="admin-panel__card-value">0</strong>
                        </article>
                        <article className="admin-panel__card">
                            <span className="admin-panel__card-label">Статус</span>
                            <strong className="admin-panel__card-value admin-panel__card-value--accent">Активен</strong>
                        </article>
                        <article className="admin-panel__card">
                            <span className="admin-panel__card-label">Вход через</span>
                            <strong className="admin-panel__card-value admin-panel__card-value--sm">{providerLabel}</strong>
                        </article>
                        <article className="admin-panel__card">
                            <span className="admin-panel__card-label">Роль</span>
                            <strong className="admin-panel__card-value admin-panel__card-value--sm">{formatRoles(user.roles)}</strong>
                        </article>
                    </div>

                    <CreateDesignCard />

                    <section className="admin-panel">
                        <h2 className="admin-panel__title">Быстрый старт</h2>
                        <div className="admin-panel__steps">
                            <div className="admin-panel__step">
                                <span>1</span>
                                <div>
                                    <strong>Откройте AI-конструктор</strong>
                                    <p>Опишите страницу в чате с нейросетью.</p>
                                </div>
                            </div>
                            <div className="admin-panel__step">
                                <span>2</span>
                                <div>
                                    <strong>Посмотрите макет</strong>
                                    <p>Справа появится превью HTML/CSS в конструкторе.</p>
                                </div>
                            </div>
                            <div className="admin-panel__step">
                                <span>3</span>
                                <div>
                                    <strong>Опубликуйте</strong>
                                    <p>Поделитесь ссылкой yourname.myzen.ru.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {activeSection === 'pages' && (
                <section className="admin-panel admin-panel--empty">
                    <h2 className="admin-panel__title">Нет страниц</h2>
                    <p className="admin-panel__text">
                        У вас пока нет опубликованных страниц. Создайте первую через AI-конструктор.
                    </p>
                    <a href="/admin/designer" className="admin-panel__btn">✦ Создать дизайн с AI →</a>
                </section>
            )}

            {activeSection === 'settings' && (
                <section className="admin-panel">
                    <h2 className="admin-panel__title">Аккаунт</h2>
                    <div className="admin-panel__profile-head">
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="admin-panel__profile-avatar"
                                referrerPolicy="no-referrer"
                                crossOrigin="anonymous"
                            />
                        ) : (
                            <div className="admin-panel__profile-avatar admin-panel__profile-avatar--placeholder">
                                {user.name.split(' ').slice(0, 2).map((part) => part[0]).join('').toUpperCase()}
                            </div>
                        )}
                        <div>
                            <strong>{user.name}</strong>
                            <p>{providerLabel}</p>
                        </div>
                    </div>
                    <dl className="admin-panel__list">
                        <div>
                            <dt>Имя</dt>
                            <dd>{user.name}</dd>
                        </div>
                        <div>
                            <dt>Email</dt>
                            <dd>{user.email}</dd>
                        </div>
                        <div>
                            <dt>Способ входа</dt>
                            <dd>{providerLabel}</dd>
                        </div>
                        <div>
                            <dt>Роль</dt>
                            <dd>{formatRoles(user.roles)}</dd>
                        </div>
                    </dl>
                </section>
            )}
        </AdminLayout>
    );
}
