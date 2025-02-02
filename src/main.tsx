import React, { StrictMode } from 'react'; // Import StrictMode explicitly
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
