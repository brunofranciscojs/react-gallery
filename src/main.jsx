import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from './contexto/Auth'
import { CategoriaProvider } from "./Context";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CategoriaProvider>
      <App />
    </CategoriaProvider>
  </AuthProvider>,
)
