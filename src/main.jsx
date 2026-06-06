import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import { ReviewProvider } from './context/ReviewContext';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <ChatProvider>
          <ReviewProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ReviewProvider>
        </ChatProvider>
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);
