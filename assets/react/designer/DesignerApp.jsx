import { useEffect, useMemo, useRef, useState } from 'react';
import AdminLayout from '../components/AdminLayout.jsx';

const starterPrompts = [
    'Лендинг для фотографа с галереей и кнопкой записи',
    'Страница меню для кофейни с ценами и фото',
    'Визитка коуча с программой и формой заявки',
];

function buildPreviewDocument(html, css) {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style></head><body>${html}</body></html>`;
}

function ConstructorPanel({ html, css, previewDocument, activeView, onViewChange, isGenerating }) {
    const hasDesign = Boolean(html || css);

    return (
        <div className="designer__constructor">
            <div className="designer__constructor-header">
                <div>
                    <p className="designer__constructor-label">конструктор</p>
                    <h2>Макет страницы</h2>
                </div>
                <span className={`designer__status ${isGenerating ? 'designer__status--busy' : 'designer__status--ready'}`}>
                    {isGenerating ? 'Сборка...' : hasDesign ? 'Готово' : 'Ожидание'}
                </span>
            </div>

            <div className="designer__constructor-toolbar">
                <div className="designer__tabs">
                    <button
                        type="button"
                        className={activeView === 'builder' ? 'designer__tab designer__tab--active' : 'designer__tab'}
                        onClick={() => onViewChange('builder')}
                    >
                        Конструктор
                    </button>
                    <button
                        type="button"
                        className={activeView === 'html' ? 'designer__tab designer__tab--active' : 'designer__tab'}
                        onClick={() => onViewChange('html')}
                    >
                        HTML
                    </button>
                    <button
                        type="button"
                        className={activeView === 'css' ? 'designer__tab designer__tab--active' : 'designer__tab'}
                        onClick={() => onViewChange('css')}
                    >
                        CSS
                    </button>
                </div>
            </div>

            <div className="designer__constructor-body">
                {activeView === 'builder' && (
                    hasDesign ? (
                        <div className="designer__browser browser-mockup">
                            <div className="browser-mockup__bar">
                                <span /><span /><span />
                                <div className="browser-mockup__url">preview.myzen.ru</div>
                            </div>
                            <iframe
                                title="Конструктор страницы"
                                className="designer__iframe"
                                srcDoc={previewDocument}
                                sandbox="allow-same-origin"
                            />
                        </div>
                    ) : (
                        <div className="designer__empty">
                            <div className="designer__empty-icon">✦</div>
                            <h3>Конструктор пуст</h3>
                            <p>Напишите в чат слева, что за страницу нужно — ИИ соберёт макет здесь.</p>
                        </div>
                    )
                )}

                {activeView === 'html' && (
                    <pre className="designer__code">{html || '<!-- HTML появится после генерации -->'}</pre>
                )}

                {activeView === 'css' && (
                    <pre className="designer__code">{css || '/* CSS появится после генерации */'}</pre>
                )}
            </div>
        </div>
    );
}

export default function DesignerApp() {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [error, setError] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            role: 'assistant',
            content: 'Привет! Я помогу собрать страницу. Опишите задачу — портфолио, меню, визитка — и смотрите результат в конструкторе справа.',
        },
    ]);
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [activeView, setActiveView] = useState('builder');
    const [isDemo, setIsDemo] = useState(false);
    const chatEndRef = useRef(null);

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
            .finally(() => setLoadingUser(false));
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isGenerating]);

    const previewDocument = useMemo(() => buildPreviewDocument(html, css), [html, css]);

    async function handleSubmit(event) {
        event.preventDefault();

        const message = input.trim();
        if (!message || isGenerating) {
            return;
        }

        const userMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: message,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsGenerating(true);
        setActiveView('builder');

        const history = [...messages, userMessage]
            .filter((item) => item.role === 'user' || item.role === 'assistant')
            .slice(-8)
            .map((item) => ({
                role: item.role,
                content: item.content,
            }));

        try {
            const response = await fetch('/api/design/generate', {
                method: 'POST',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, history }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка генерации');
            }

            setHtml(data.html || '');
            setCss(data.css || '');
            setIsDemo(Boolean(data.demo));

            setMessages((prev) => [
                ...prev,
                {
                    id: `assistant-${Date.now()}`,
                    role: 'assistant',
                    content: data.reply || 'Готово! Макет обновлён в конструкторе.',
                },
            ]);
        } catch (submitError) {
            setMessages((prev) => [
                ...prev,
                {
                    id: `assistant-error-${Date.now()}`,
                    role: 'assistant',
                    content: submitError.message || 'Не удалось получить ответ. Попробуйте ещё раз.',
                },
            ]);
        } finally {
            setIsGenerating(false);
        }
    }

    function applyPrompt(prompt) {
        setInput(prompt);
    }

    if (loadingUser) {
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

    return (
        <AdminLayout
            user={user}
            activeSection="designer"
            pageTitle="AI-конструктор"
            pageSubtitle="Чат с ИИ слева — конструктор страницы справа"
        >
            {isDemo && (
                <p className="designer__demo-note">
                    Демо-режим — добавьте <code>OPENAI_API_KEY</code> в .env для реальной генерации
                </p>
            )}

            <div className="designer__grid">
                    <div className="designer__chat">
                        <div className="designer__chat-header">
                            <div>
                                <p className="designer__chat-label">чат</p>
                                <h2>ИИ-ассистент</h2>
                            </div>
                            <span>{isGenerating ? 'Думаю...' : 'Онлайн'}</span>
                        </div>

                        <div className="designer__messages">
                            {messages.map((message) => (
                                <article
                                    key={message.id}
                                    className={message.role === 'user' ? 'designer__message designer__message--user' : 'designer__message designer__message--assistant'}
                                >
                                    {message.content}
                                </article>
                            ))}
                            {isGenerating && (
                                <article className="designer__message designer__message--assistant designer__message--typing">
                                    <span /><span /><span />
                                </article>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="designer__prompts">
                            {starterPrompts.map((prompt) => (
                                <button
                                    key={prompt}
                                    type="button"
                                    className="designer__prompt"
                                    onClick={() => applyPrompt(prompt)}
                                    disabled={isGenerating}
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>

                        <form className="designer__form" onSubmit={handleSubmit}>
                            <textarea
                                className="designer__input"
                                rows={3}
                                placeholder="Опишите страницу: тема, блоки, цвета, кнопки..."
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                disabled={isGenerating}
                            />
                            <button
                                type="submit"
                                className="designer__submit admin-panel__btn"
                                disabled={isGenerating || !input.trim()}
                            >
                                {isGenerating ? 'Собираю макет...' : 'Сгенерировать →'}
                            </button>
                        </form>
                    </div>

                    <ConstructorPanel
                        html={html}
                        css={css}
                        previewDocument={previewDocument}
                        activeView={activeView}
                        onViewChange={setActiveView}
                        isGenerating={isGenerating}
                    />
            </div>
        </AdminLayout>
    );
}
