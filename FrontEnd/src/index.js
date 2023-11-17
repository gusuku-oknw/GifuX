import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { ThemeProvider, StyleReset } from 'atomize';

const engine = new Styletron();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <StyletronProvider value={engine}>
            <ThemeProvider>
                <StyleReset />
                <App />
            </ThemeProvider>
        </StyletronProvider>
    </React.StrictMode>
);

reportWebVitals();
