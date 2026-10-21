import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else if (allowedRoles && !allowedRoles.includes(user.role)) {
            navigate("/");
        }
    }, [user, allowedRoles, navigate]);

    if (!user) return null;
    if (allowedRoles && !allowedRoles.includes(user.role)) return null;

    return children;
};

export default ProtectedRoute;
