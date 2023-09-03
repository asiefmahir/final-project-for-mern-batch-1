import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth';

function Header() {
    const authContext = useContext(AuthContext)
    return (
        <header className="header">
            <div className="container">
                <nav className="header__navbar">
                    <ul>
                        <li>
                            <Link to='/' >
                                Home
                            </Link>
                        </li>
                        {!authContext.isLoggedIn && (
                            <li>
                                <Link to='/signup'>
                                    Sign Up
                                </Link>
                            </li>
                        )}
                        {authContext.isLoggedIn && (authContext?.user?.role === 'super-admin' || authContext?.user?.role === 'admin') && (
                            <li>
                                <Link to='/admin/products' >
                                    Products
                                </Link>
                            </li>
                        )}
                        {authContext.isLoggedIn && (authContext?.user?.role === 'super-admin' || authContext?.user?.role === 'admin') && (
                            <li>
                                <Link to='/admin/users' >
                                    Users
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to='/cart' >
                                Cart
                            </Link>
                        </li>
                        {authContext.isLoggedIn && (authContext?.user?.role === 'super-admin' || authContext?.user?.role === 'admin') && (
                            <li>
                                <Link to='/admin/product-form' >
                                    Add Product
                                </Link>
                            </li>
                        )}
                        {authContext.isLoggedIn && (
                            <li>
                                <Link to='/my-orders' >
                                    My Orders
                                </Link>
                            </li>
                        )}
                        {!authContext.isLoggedIn && (
                            <li>
                                <Link to='/login' >
                                    Login
                                </Link>
                            </li>
                        )}

                        {authContext.isLoggedIn && (authContext?.user?.role === 'super-admin' || authContext?.user?.role === 'admin') && (
                            <li>
                                <Link to='/order-list' >
                                    Order List
                                </Link>
                            </li>
                        )}
                        {authContext.isLoggedIn && (
                            <li>
                                <button onClick={() => authContext.logout()}>Logout</button>
                            </li>
                        )}

                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header