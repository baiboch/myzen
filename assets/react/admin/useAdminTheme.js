const STORAGE_KEY = 'myzen-admin-theme';

export function getStoredAdminTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved === 'light' ? 'light' : 'dark';
}

export function applyAdminTheme(theme) {
    document.documentElement.setAttribute('data-admin-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
}

export function toggleAdminTheme() {
    const next = getStoredAdminTheme() === 'dark' ? 'light' : 'dark';
    applyAdminTheme(next);

    return next;
}
