import React from "react";
import { useAuth } from "../auth/AuthProvider";
import NavbarLogged from "../components/NavbarLogged/NavbarLogged";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import "./styles/styles-Dashboard.css";

export const Dashboard = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingScreen />; // Muestra la pantalla de carga mientras isLoading esté activo
    }

    return (
        <>
            <NavbarLogged />
            <div className="container-dashboard">
                {user && <h1 className="h1-user">Hola, {user.username}</h1>}
                <p className="p">Esta pagina aun esta en proceso de desarrollo</p>
            </div>
        </>
    );
};
