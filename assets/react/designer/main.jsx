import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DesignerApp from './DesignerApp.jsx';
import { applyAdminTheme, getStoredAdminTheme } from '../admin/useAdminTheme.js';
import './styles/designer.css';

applyAdminTheme(getStoredAdminTheme());

const rootElement = document.getElementById('root');

if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <DesignerApp />
        </StrictMode>,
    );
}
