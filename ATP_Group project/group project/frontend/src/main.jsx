import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from './components/common/ErrorBoundary'
import AuthProvider from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
        <Toaster
          position='top-right'
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0f172a',
              color: '#e2e8f0',
              borderRadius: '16px',
              border: '1px solid rgba(148,163,184,0.15)',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              iconTheme: { primary: '#06b6d4', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#f43f5e', secondary: '#fff' },
            },
          }}
        />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
)