
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductAddForm from '../pages/ProductAddForm';
import ProductDetails from '../pages/ProductDetails';
import Login from '../pages/Login';

import PrivateAdminRoute from '../components/PrivateAdminRoute';
import PrivateUserRoute from '../components/PrivateRoute';
import ProductEditForm from '../pages/ProductEditForm';
import SignUp from '../pages/Signup';
import AddressForm from '../pages/AddressForm';
import MyOrders from '../pages/MyOrders';
import OrderList from '../pages/OrderList';
import Users from '../pages/Users';

const Router = () => {
 
  return (
    <BrowserRouter>
        <Routes>
            <Route path= '/' element = {<Home />}/>
            <Route path = '/cart' element = {<Cart />} />
            <Route path = '/login' element = {<Login />} />
            <Route path = '/signup' element = {<SignUp />} />

            <Route path = '/order-placing-form' 
                element = {
                  <PrivateUserRoute>
                      <AddressForm />
                  </PrivateUserRoute>
                }
            />
            <Route path = '/my-orders' 
                element = {
                  <PrivateUserRoute>
                      <MyOrders />
                  </PrivateUserRoute>
                }
            />
             <Route path = '/admin/users' element = {
                <PrivateAdminRoute>
                  <Users />
                </PrivateAdminRoute>
              } 
            />

            <Route path = '/admin/products' element = {
                <PrivateAdminRoute>
                  <Products />
                </PrivateAdminRoute>
              } 
            />

            <Route path = '/admin/users' element = {
                <PrivateAdminRoute>
                  <Users />
                </PrivateAdminRoute>
              } 
            />
            <Route path = '/admin/product-form' 
                element = {
                  <PrivateAdminRoute>
                      <ProductAddForm />
                  </PrivateAdminRoute>
                }
            />
            <Route path = '/order-list' 
                element = {
                  <PrivateAdminRoute>
                      <OrderList />
                  </PrivateAdminRoute>
                }
            />
            <Route path = '/admin/product-edit-form/:id' 
                element = {
                  <PrivateAdminRoute>
                      <ProductEditForm />
                  </PrivateAdminRoute>
                }
            />
            <Route path = '/products/:id' element = {<ProductDetails />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router