import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Correct import for React 18
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// Use createRoot directly
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
