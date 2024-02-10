import React from 'react';
import { Link } from 'react-router-dom';
import { FaCart } from 'react-icons/fa';
import OftoStore from '../assets/images/OftoStore.png';

const BuyerNavbar = () => {
    return (
        <nav className='flex items-center'>
            <div className="flex">
                <img src={OftoStore} alt="Logo" />
                <label>Ofto Store</label>
            </div>
            <ul className='flex'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/'>About</Link></li>
                <li><Link to='/'>New Arrivals</Link></li>
                <li><Link to='/'>Best Seller</Link></li>
                <li><Link to='/'>Wishlist</Link></li>
            </ul>
            <div>
                <span>
                    <FaCart />
                </span>
            </div>
        </nav>
    );
}

export default BuyerNavbar;