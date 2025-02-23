import React, { useState } from 'react';
import NavBar from '../../components/Dashboard/NavBar/NavBar';
import MobileNav from '../../components/Helpers/Mobile_nav/MobileNav';
import SideBar from '../../components/Helpers/Sidebar/SideBar';
import MainSection from '../../components/Transactions_page/Main_section/MainSection';
import AddTransBtn from '../../components/Helpers/Add_trans/AddTransBtn';

const TransactionPage: React.FC = () => {
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  return (
    <div>
      <SideBar toggleNav={toggleNav} currentpage="transaction" />
      <MobileNav />
      <NavBar toggleSideBar={toggleNav} togglenav={setToggleNav} />
      <MainSection toggleSideBar={toggleNav} />
      <AddTransBtn />
    </div>
  );
};

export default TransactionPage;
