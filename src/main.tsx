import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {SneakersEcomerceApp} from './SneakersEcomerceApp.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SneakersEcomerceApp />
    </BrowserRouter>
  </StrictMode>,
)
