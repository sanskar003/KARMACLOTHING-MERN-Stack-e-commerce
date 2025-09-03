import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const ProtectedLoginRoute = ({children}) => {
    const isLoggedIn = useSelector((state) => state.auth.token);
    return isLoggedIn ? <Navigate to="/" replace /> : children;
}

export default ProtectedLoginRoute