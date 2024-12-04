import Login from "../components/Login/Login";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";


export const LoginPage = () => {

    const auth = useAuth();

    if (auth.isLoading) {
        return <LoadingScreen />;
    }

    if (auth.isAuthenticated) {
        return <Navigate to="/" />;
    }
    return <Login />;
};