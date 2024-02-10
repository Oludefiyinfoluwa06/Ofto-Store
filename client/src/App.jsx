import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

// Layout imports
import BuyerLayout from './layouts/BuyerLayout';
import SellerLayout from './layouts/SellerLayout';

//Page imports
import BuyerHome from './pages/BuyerHome';
import SellerHome from './pages/SellerHome';

//routing
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<BuyerLayout />}>
        <Route index element={<BuyerHome />} />
      </Route>
      <Route path='/seller' element={<SellerLayout />}>
        <Route index element={<SellerHome />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;