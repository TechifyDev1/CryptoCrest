import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./Pages/Dashboard_page/DashboardPage";
import LandingPage from "./Pages/Landing_page/LandingPage";
import LoginPage from "./Pages/Login_page/LoginPage";
import PortFolioPage from "./Pages/Portfolio_page/PortfolioPage";
import SettingPage from "./Pages/Setting_page/SettingPage";
import SignUpPage from "./Pages/Signup_page/SignUpPage";
import TransactionPage from "./Pages/Transactions_page/TransactionPage";
import TransactionFormPage from "./Pages/TransactionForm_page/TransactionFormPage";

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
      </Routes>
    </BrowserRouter>
  )
}

export default App;
