import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { TransactionsContextProvider } from './contexts/TransactionsContext.tsx';
import { CryptoContextProvider } from './contexts/CryptoContext.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <ThemeProvider>
        <TransactionsContextProvider>
          <CryptoContextProvider>
            <App />
          </CryptoContextProvider>
        </TransactionsContextProvider>
      </ThemeProvider>
    </>
  </StrictMode>
);
