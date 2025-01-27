import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from 'sonner';
import { TransactionsContextProvider } from './contexts/TransactionsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <TransactionsContextProvider>
        <App />
        <Toaster
          position="top-center"
          closeButton={true}
          visibleToasts={2}
          theme="system"
          richColors={true}
          toastOptions={{
            style: {
              padding: '.6rem',
              borderRadius: '2rem',
            },
          }}
        />
      </TransactionsContextProvider>
    </>
  </StrictMode>
);
