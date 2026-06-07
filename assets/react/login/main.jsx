import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LoginApp from './LoginApp.jsx';
import './styles/login.css';

const rootElement = document.getElementById('root');

if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <LoginApp />
        </StrictMode>,
    );
}
