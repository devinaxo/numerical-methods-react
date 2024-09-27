import { ToastWrapper } from 'keep-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastWrapper
      toastOptions={{
        classNames: {
          toast: 'dark:bg-metal-900 border dark:border-metal-800 border-white bg-primary',
          title: 'text-white text-lg font-bold dark:text-white',
          description: 'dark:text-metal-300 text-white',
          actionButton: 'dark:bg-metal-800 bg-metal-900 text-white',
          cancelButton: 'dark:bg-metal-800 bg-metal-900 text-white',
          closeButton: 'dark:bg-metal-800 bg-metal-900 text-white',
          error: 'text-error-500',
          success: 'text-success-500',
          warning: 'text-warning-500',
          info: 'text-primary-500',
        },
      }}
    />
  </React.StrictMode>,
)
