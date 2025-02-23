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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portfolio" element={<PortFolioPage />} />
        <Route path="/transactions/:id?" element={<TransactionFormPage />} />
        <Route path="/unverified" element={<UnverifiedEmailPage/>} />
        <Route path="/forgotten-password" element={<ForgottenPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
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
