import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../main/App.css';
import App from '../main/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
