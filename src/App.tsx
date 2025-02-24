import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardPage from './Pages/Dashboard_page/DashboardPage';
import LandingPage from './Pages/Landing_page/LandingPage';
import LoginPage from './Pages/Login_page/LoginPage';
import PortFolioPage from './Pages/Portfolio_page/PortfolioPage';
import SettingPage from './Pages/Setting_page/SettingPage';
import SignUpPage from './Pages/Signup_page/SignUpPage';
import TransactionPage from './Pages/Transactions_page/TransactionPage';
import TransactionFormPage from './Pages/TransactionForm_page/TransactionFormPage';
import { Toaster } from 'sonner';
import UnverifiedEmailPage from './Pages/UnverifiedEmail_page/UnverifiedEmailPage';
import ForgottenPasswordPage from './Pages/ForgottenPassword_page/ForgottenPasswordPage';
import ChangePasswordPage from './Pages/ChangePassword_page/ChangePasswordPage';
import ResetPasswordSentPage from './Pages/ResetPasswordSent_page/ResetPasswordSentPage';
import Loading from './components/Helpers/Loading/Loading';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebase-init';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    const unsub = onAuthStateChanged((auth), (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
      setIsLoading(false);
    });
    return () => {
      unsub();
    }
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
        <Route path="/dashboard" element={isUserLoggedIn? (<DashboardPage />): (<LoginPage />)} />
        <Route path="/transactions" element={isUserLoggedIn? (<TransactionPage />) : (<LoginPage />)} />
        <Route path="/settings" element={isUserLoggedIn ? (<SettingPage />) : (<LoginPage/>)} />
        <Route path="/signup" element={isUserLoggedIn ? (<DashboardPage />) : (<SignUpPage />)} />
        <Route path="/login" element={isUserLoggedIn ? (<DashboardPage />) : (<LoginPage />)} />
        <Route path="/portfolio" element={isUserLoggedIn ? (<PortFolioPage />) : (<LoginPage />)} />
        <Route path="/transactions/:id?" element={isUserLoggedIn ? (<TransactionFormPage />) : (<LoginPage />)} />
        <Route path="/unverified" element={isUserLoggedIn ? (<UnverifiedEmailPage />) : (<LoginPage />)} />
        <Route path="/forgotten-password" element={<ForgottenPasswordPage />} />
        <Route path="/change-password" element={isUserLoggedIn ? (<ChangePasswordPage />) : (<LoginPage />)} />
        <Route path="/email-sent" element={isUserLoggedIn ? (<ResetPasswordSentPage />) : (<LoginPage />)} />
      </Routes>
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
    </BrowserRouter>
  );
};

export default App;
