import { Navigate } from "react-router-dom";
import {AuthContext} from "../contexts/Auth";
import { useContext } from 'react';

export default function PrivateUserRoute({ children }) {
    const authContext = useContext(AuthContext)
    const isLoggedIn = authContext.isLoggedIn;

    return isLoggedIn ? children : <Navigate to="/" />;
}

{/* <PrivateUserRoute>
    <ChildComponent />
</PrivateUserRoute> */}

