import React from 'react';
import { Outlet } from 'react-router-dom';

// component import
import SellerNavbar from '../components/SellerNavbar';
import Footer from '../components/Footer';

const SellerLayout = () => {
  return (
    <div>
      <SellerNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default SellerLayout;