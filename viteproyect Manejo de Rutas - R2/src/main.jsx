// Importamos StrictMode (ayuda a detectar errores en desarrollo)
import { StrictMode } from 'react'
// createRoot renderiza la app en el DOM
import { createRoot } from 'react-dom/client'
// Importamos estilos globales
import './index.css'
// Importamos el componente principal
import App from './App.jsx'

// Renderizamos la aplicación dentro del div con id="root" en index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
