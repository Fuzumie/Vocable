import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { AuthContextProvider } from './context/AuthContext'
import { VocabsContextProvider } from './context/VocabsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <VocabsContextProvider>
        <App />
      </VocabsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);