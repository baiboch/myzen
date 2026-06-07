import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminApp from './AdminApp.jsx';
import { applyAdminTheme, getStoredAdminTheme } from './useAdminTheme.js';
import './styles/admin.css';

applyAdminTheme(getStoredAdminTheme());

const rootElement = document.getElementById('root');

if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <AdminApp />
        </StrictMode>,
    );
}
