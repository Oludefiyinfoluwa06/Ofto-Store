import React from 'react';
import { Outlet } from 'react-router-dom';

// component import
import BuyerNavbar from '../components/BuyerNavbar';
import Footer from '../components/Footer';

const BuyerLayout = () => {
    return (
        <div>
            <BuyerNavbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default BuyerLayout;