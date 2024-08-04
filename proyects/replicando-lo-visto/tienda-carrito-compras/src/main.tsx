import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { FiltrosProvider } from './context/filters.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FiltrosProvider>
      <App />
    </FiltrosProvider>
  </React.StrictMode>
);